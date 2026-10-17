"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth/admin";
import { uploadContentImage, deleteContentImage } from "@/lib/cms/images";
import { CONTENT_FOLDER_NAMES } from "@/lib/cms/constants";
import { generateSlug, makeUniqueSlug } from "@/lib/cms/slugs";
import { revalidateContentType } from "@/lib/cms/revalidate";
import type { ActionResult } from "@/lib/cms/types";
import type { SupabaseClient } from "@supabase/supabase-js";

async function handleImageUpload(
  supabase: SupabaseClient,
  imageFile: File | null,
  oldImagePath: string | null,
  removeImage: boolean
) {
  let imagePath: string | null = oldImagePath;

  if (removeImage && oldImagePath) {
    await deleteContentImage(supabase, oldImagePath);
    imagePath = null;
  }

  if (imageFile && imageFile.size > 0) {
    if (oldImagePath) {
      await deleteContentImage(supabase, oldImagePath);
    }

    const uploadResult = await uploadContentImage(
      supabase,
      imageFile,
      CONTENT_FOLDER_NAMES.projects
    );

    if (!uploadResult.ok) {
      return { ok: false as const, error: uploadResult.error, path: null };
    }

    imagePath = uploadResult.path;
  }

  return { ok: true as const, path: imagePath };
}

export async function createProject(formData: FormData): Promise<ActionResult> {
  const sessionResult = await getAdminSession();
  if (!sessionResult.ok) {
    return { ok: false, error: sessionResult.error };
  }

  const { supabase } = sessionResult.session;

  const title = (formData.get("title") as string)?.trim();
  const description = (formData.get("description") as string)?.trim();
  const objectives = (formData.get("objectives") as string)?.trim();
  const status = (formData.get("status") as string) || "planned";
  const startDate = (formData.get("start_date") as string) || null;
  const endDate = (formData.get("end_date") as string) || null;
  const isPublished = formData.get("is_published") === "true";
  const imageFile = formData.get("image") as File | null;

  if (!title) {
    return { ok: false, error: "Title is required." };
  }

  // Generate unique slug
  const baseSlug = generateSlug(title);
  const { data: existingProjects } = await supabase
    .from("projects")
    .select("slug");
  const existingSlugs = (existingProjects || []).map((p: { slug: string }) => p.slug);
  const slug = makeUniqueSlug(baseSlug, existingSlugs);

  const imageResult = await handleImageUpload(supabase, imageFile, null, false);
  if (!imageResult.ok) {
    return { ok: false, error: imageResult.error };
  }

  const { error } = await supabase.from("projects").insert({
    title,
    slug,
    description: description || "",
    objectives: objectives || "",
    status,
    start_date: startDate,
    end_date: endDate,
    image_path: imageResult.path,
    is_published: isPublished,
  });

  if (error) {
    console.error("Create error:", error);
    if (imageResult.path) {
      await deleteContentImage(supabase, imageResult.path);
    }
    return { ok: false, error: "Failed to create project." };
  }

  revalidateContentType("projects");
  revalidatePath("/admin/cms/projects");
  redirect("/admin/cms/projects");
}

export async function updateProject(
  id: string,
  formData: FormData
): Promise<ActionResult> {
  const sessionResult = await getAdminSession();
  if (!sessionResult.ok) {
    return { ok: false, error: sessionResult.error };
  }

  const { supabase } = sessionResult.session;

  const title = (formData.get("title") as string)?.trim();
  const description = (formData.get("description") as string)?.trim();
  const objectives = (formData.get("objectives") as string)?.trim();
  const status = (formData.get("status") as string) || "planned";
  const startDate = (formData.get("start_date") as string) || null;
  const endDate = (formData.get("end_date") as string) || null;
  const isPublished = formData.get("is_published") === "true";
  const imageFile = formData.get("image") as File | null;
  const removeImage = formData.get("remove_image") === "true";

  if (!title) {
    return { ok: false, error: "Title is required." };
  }

  const { data: project } = await supabase
    .from("projects")
    .select("image_path")
    .eq("id", id)
    .maybeSingle();

  if (!project) {
    return { ok: false, error: "Project not found." };
  }

  const imageResult = await handleImageUpload(
    supabase,
    imageFile,
    project.image_path,
    removeImage
  );
  if (!imageResult.ok) {
    return { ok: false, error: imageResult.error };
  }

  const { error } = await supabase
    .from("projects")
    .update({
      title,
      description: description || "",
      objectives: objectives || "",
      status,
      start_date: startDate,
      end_date: endDate,
      image_path: imageResult.path,
      is_published: isPublished,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    console.error("Update error:", error);
    return { ok: false, error: "Failed to update project." };
  }

  revalidateContentType("projects");
  revalidatePath("/admin/cms/projects");

  return {
    ok: true,
    message: isPublished
      ? "Project published successfully."
      : "Project updated successfully.",
  };
}

export async function deleteProject(id: string): Promise<ActionResult> {
  const sessionResult = await getAdminSession();
  if (!sessionResult.ok) {
    return { ok: false, error: sessionResult.error };
  }

  const { supabase } = sessionResult.session;

  const { data: project } = await supabase
    .from("projects")
    .select("image_path")
    .eq("id", id)
    .maybeSingle();

  const { error } = await supabase.from("projects").delete().eq("id", id);

  if (error) {
    console.error("Delete error:", error);
    return { ok: false, error: "Failed to delete project." };
  }

  if (project?.image_path) {
    await deleteContentImage(supabase, project.image_path);
  }

  revalidateContentType("projects");
  revalidatePath("/admin/cms/projects");
  redirect("/admin/cms/projects");
}

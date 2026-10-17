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
  removeImage: boolean,
  folder: string
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

    const uploadResult = await uploadContentImage(supabase, imageFile, folder);

    if (!uploadResult.ok) {
      return { ok: false as const, error: uploadResult.error, path: null };
    }

    imagePath = uploadResult.path;
  }

  return { ok: true as const, path: imagePath };
}

export async function createProgram(formData: FormData): Promise<ActionResult> {
  const sessionResult = await getAdminSession();
  if (!sessionResult.ok) {
    return { ok: false, error: sessionResult.error };
  }

  const { supabase } = sessionResult.session;

  const title = (formData.get("title") as string)?.trim();
  const description = (formData.get("description") as string)?.trim();
  const applicationInfo = (formData.get("application_info") as string)?.trim();
  const startDate = (formData.get("start_date") as string) || null;
  const endDate = (formData.get("end_date") as string) || null;
  const isPublished = formData.get("is_published") === "true";
  const imageFile = formData.get("image") as File | null;

  if (!title) {
    return { ok: false, error: "Title is required." };
  }

  const baseSlug = generateSlug(title);
  const { data: existingPrograms } = await supabase.from("programs").select("slug");
  const existingSlugs = (existingPrograms || []).map((p: { slug: string }) => p.slug);
  const slug = makeUniqueSlug(baseSlug, existingSlugs);

  const imageResult = await handleImageUpload(supabase, imageFile, null, false, CONTENT_FOLDER_NAMES.programs);
  if (!imageResult.ok) {
    return { ok: false, error: imageResult.error };
  }

  const { error } = await supabase.from("programs").insert({
    title,
    slug,
    description: description || "",
    application_info: applicationInfo || "",
    start_date: startDate,
    end_date: endDate,
    image_path: imageResult.path,
    is_published: isPublished,
  });

  if (error) {
    console.error("Create error:", error);
    if (imageResult.path) await deleteContentImage(supabase, imageResult.path);
    return { ok: false, error: "Failed to create program." };
  }

  revalidateContentType("programs");
  revalidatePath("/admin/cms/programs");
  redirect("/admin/cms/programs");
}

export async function updateProgram(id: string, formData: FormData): Promise<ActionResult> {
  const sessionResult = await getAdminSession();
  if (!sessionResult.ok) {
    return { ok: false, error: sessionResult.error };
  }

  const { supabase } = sessionResult.session;

  const title = (formData.get("title") as string)?.trim();
  const description = (formData.get("description") as string)?.trim();
  const applicationInfo = (formData.get("application_info") as string)?.trim();
  const startDate = (formData.get("start_date") as string) || null;
  const endDate = (formData.get("end_date") as string) || null;
  const isPublished = formData.get("is_published") === "true";
  const imageFile = formData.get("image") as File | null;
  const removeImage = formData.get("remove_image") === "true";

  if (!title) {
    return { ok: false, error: "Title is required." };
  }

  const { data: program } = await supabase.from("programs").select("image_path").eq("id", id).maybeSingle();
  if (!program) {
    return { ok: false, error: "Program not found." };
  }

  const imageResult = await handleImageUpload(supabase, imageFile, program.image_path, removeImage, CONTENT_FOLDER_NAMES.programs);
  if (!imageResult.ok) {
    return { ok: false, error: imageResult.error };
  }

  const { error } = await supabase
    .from("programs")
    .update({
      title,
      description: description || "",
      application_info: applicationInfo || "",
      start_date: startDate,
      end_date: endDate,
      image_path: imageResult.path,
      is_published: isPublished,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    console.error("Update error:", error);
    return { ok: false, error: "Failed to update program." };
  }

  revalidateContentType("programs");
  revalidatePath("/admin/cms/programs");

  return { ok: true, message: isPublished ? "Program published successfully." : "Program updated successfully." };
}

export async function deleteProgram(id: string): Promise<ActionResult> {
  const sessionResult = await getAdminSession();
  if (!sessionResult.ok) {
    return { ok: false, error: sessionResult.error };
  }

  const { supabase } = sessionResult.session;

  const { data: program } = await supabase.from("programs").select("image_path").eq("id", id).maybeSingle();
  const { error } = await supabase.from("programs").delete().eq("id", id);

  if (error) {
    console.error("Delete error:", error);
    return { ok: false, error: "Failed to delete program." };
  }

  if (program?.image_path) await deleteContentImage(supabase, program.image_path);

  revalidateContentType("programs");
  revalidatePath("/admin/cms/programs");
  redirect("/admin/cms/programs");
}

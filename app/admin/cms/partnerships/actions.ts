"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth/admin";
import { uploadContentImage, deleteContentImage } from "@/lib/cms/images";
import { CONTENT_FOLDER_NAMES } from "@/lib/cms/constants";
import { validateUrl } from "@/lib/cms/validation";
import { revalidatePublicPages } from "@/lib/cms/revalidate";
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

    const uploadResult = await uploadContentImage(supabase, imageFile, CONTENT_FOLDER_NAMES.partners);

    if (!uploadResult.ok) {
      return { ok: false as const, error: uploadResult.error, path: null };
    }

    imagePath = uploadResult.path;
  }

  return { ok: true as const, path: imagePath };
}

export async function createPartnership(formData: FormData): Promise<ActionResult> {
  const sessionResult = await getAdminSession();
  if (!sessionResult.ok) {
    return { ok: false, error: sessionResult.error };
  }

  const { supabase } = sessionResult.session;

  const name = (formData.get("name") as string)?.trim();
  const description = (formData.get("description") as string)?.trim();
  const websiteUrl = (formData.get("website_url") as string)?.trim();
  const sortOrder = parseInt(formData.get("sort_order") as string, 10) || 0;
  const isPublished = formData.get("is_published") === "true";
  const imageFile = formData.get("image") as File | null;

  if (!name) {
    return { ok: false, error: "Partner name is required." };
  }

  const validatedUrl = websiteUrl ? validateUrl(websiteUrl) : null;

  const imageResult = await handleImageUpload(supabase, imageFile, null, false);
  if (!imageResult.ok) {
    return { ok: false, error: imageResult.error };
  }

  const { error } = await supabase.from("partners").insert({
    name,
    description: description || "",
    website_url: validatedUrl,
    logo_path: imageResult.path,
    is_published: isPublished,
    sort_order: sortOrder,
  });

  if (error) {
    console.error("Create error:", error);
    if (imageResult.path) await deleteContentImage(supabase, imageResult.path);
    return { ok: false, error: "Failed to create partnership." };
  }

  revalidatePublicPages();
  revalidatePath("/admin/cms/partnerships");
  redirect("/admin/cms/partnerships");
}

export async function updatePartnership(id: string, formData: FormData): Promise<ActionResult> {
  const sessionResult = await getAdminSession();
  if (!sessionResult.ok) {
    return { ok: false, error: sessionResult.error };
  }

  const { supabase } = sessionResult.session;

  const name = (formData.get("name") as string)?.trim();
  const description = (formData.get("description") as string)?.trim();
  const websiteUrl = (formData.get("website_url") as string)?.trim();
  const sortOrder = parseInt(formData.get("sort_order") as string, 10) || 0;
  const isPublished = formData.get("is_published") === "true";
  const imageFile = formData.get("image") as File | null;
  const removeImage = formData.get("remove_image") === "true";

  if (!name) {
    return { ok: false, error: "Partner name is required." };
  }

  const validatedUrl = websiteUrl ? validateUrl(websiteUrl) : null;

  const { data: partner } = await supabase.from("partners").select("logo_path").eq("id", id).maybeSingle();
  if (!partner) {
    return { ok: false, error: "Partnership not found." };
  }

  const imageResult = await handleImageUpload(supabase, imageFile, partner.logo_path, removeImage);
  if (!imageResult.ok) {
    return { ok: false, error: imageResult.error };
  }

  const { error } = await supabase
    .from("partners")
    .update({
      name,
      description: description || "",
      website_url: validatedUrl,
      logo_path: imageResult.path,
      is_published: isPublished,
      sort_order: sortOrder,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    console.error("Update error:", error);
    return { ok: false, error: "Failed to update partnership." };
  }

  revalidatePublicPages();
  revalidatePath("/admin/cms/partnerships");

  return { ok: true, message: isPublished ? "Partnership published successfully." : "Partnership updated successfully." };
}

export async function deletePartnership(id: string): Promise<ActionResult> {
  const sessionResult = await getAdminSession();
  if (!sessionResult.ok) {
    return { ok: false, error: sessionResult.error };
  }

  const { supabase } = sessionResult.session;

  const { data: partner } = await supabase.from("partners").select("logo_path").eq("id", id).maybeSingle();
  const { error } = await supabase.from("partners").delete().eq("id", id);

  if (error) {
    console.error("Delete error:", error);
    return { ok: false, error: "Failed to delete partnership." };
  }

  if (partner?.logo_path) await deleteContentImage(supabase, partner.logo_path);

  revalidatePublicPages();
  revalidatePath("/admin/cms/partnerships");
  redirect("/admin/cms/partnerships");
}

"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth/admin";
import {
  uploadContentImage,
  deleteContentImage,
} from "@/lib/cms/images";
import { CONTENT_FOLDER_NAMES } from "@/lib/cms/constants";
import { revalidatePublicPages } from "@/lib/cms/revalidate";
import type { ActionResult } from "@/lib/cms/types";

export async function createDepartment(
  formData: FormData
): Promise<ActionResult> {
  const sessionResult = await getAdminSession();
  if (!sessionResult.ok) {
    return { ok: false, error: sessionResult.error };
  }

  const { supabase } = sessionResult.session;

  const name = (formData.get("name") as string)?.trim();
  const description = (formData.get("description") as string)?.trim();
  const isPublished = formData.get("is_published") === "true";
  const sortOrder = parseInt(formData.get("sort_order") as string, 10) || 0;
  const imageFile = formData.get("image") as File | null;

  if (!name) {
    return { ok: false, error: "Department name is required." };
  }

  if (!description) {
    return { ok: false, error: "Description is required." };
  }

  let imagePath: string | null = null;

  // Handle image upload
  if (imageFile && imageFile.size > 0) {
    const uploadResult = await uploadContentImage(
      supabase,
      imageFile,
      CONTENT_FOLDER_NAMES.departments
    );

    if (!uploadResult.ok) {
      return { ok: false, error: uploadResult.error };
    }

    imagePath = uploadResult.path;
  }

  // Create department
  const { error } = await supabase.from("departments").insert({
    name,
    description,
    image_path: imagePath,
    is_published: isPublished,
    sort_order: sortOrder,
  });

  if (error) {
    console.error("Create error:", error);
    if (imagePath) {
      await deleteContentImage(supabase, imagePath);
    }
    return { ok: false, error: "Failed to create department." };
  }

  revalidatePublicPages();
  revalidatePath("/admin/cms/departments");
  redirect("/admin/cms/departments");
}

export async function updateDepartment(
  id: string,
  formData: FormData
): Promise<ActionResult> {
  const sessionResult = await getAdminSession();
  if (!sessionResult.ok) {
    return { ok: false, error: sessionResult.error };
  }

  const { supabase } = sessionResult.session;

  const name = (formData.get("name") as string)?.trim();
  const description = (formData.get("description") as string)?.trim();
  const isPublished = formData.get("is_published") === "true";
  const sortOrder = parseInt(formData.get("sort_order") as string, 10) || 0;
  const imageFile = formData.get("image") as File | null;
  const removeImage = formData.get("remove_image") === "true";

  if (!name) {
    return { ok: false, error: "Department name is required." };
  }

  if (!description) {
    return { ok: false, error: "Description is required." };
  }

  // Fetch current department
  const { data: department, error: fetchError } = await supabase
    .from("departments")
    .select("image_path")
    .eq("id", id)
    .maybeSingle();

  if (fetchError || !department) {
    return { ok: false, error: "Department not found." };
  }

  let newImagePath: string | null = department.image_path;

  // Handle image removal
  if (removeImage && department.image_path) {
    await deleteContentImage(supabase, department.image_path);
    newImagePath = null;
  }

  // Handle image upload
  if (imageFile && imageFile.size > 0) {
    if (department.image_path) {
      await deleteContentImage(supabase, department.image_path);
    }

    const uploadResult = await uploadContentImage(
      supabase,
      imageFile,
      CONTENT_FOLDER_NAMES.departments
    );

    if (!uploadResult.ok) {
      return { ok: false, error: uploadResult.error };
    }

    newImagePath = uploadResult.path;
  }

  // Update department
  const { error: updateError } = await supabase
    .from("departments")
    .update({
      name,
      description,
      image_path: newImagePath,
      is_published: isPublished,
      sort_order: sortOrder,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (updateError) {
    console.error("Update error:", updateError);
    return { ok: false, error: "Failed to update department." };
  }

  revalidatePublicPages();
  revalidatePath("/admin/cms/departments");

  return {
    ok: true,
    message: isPublished
      ? "Department published successfully."
      : "Department updated successfully.",
  };
}

export async function deleteDepartment(id: string): Promise<ActionResult> {
  const sessionResult = await getAdminSession();
  if (!sessionResult.ok) {
    return { ok: false, error: sessionResult.error };
  }

  const { supabase } = sessionResult.session;

  // Fetch department to get image path
  const { data: department } = await supabase
    .from("departments")
    .select("image_path")
    .eq("id", id)
    .maybeSingle();

  // Delete department
  const { error } = await supabase.from("departments").delete().eq("id", id);

  if (error) {
    console.error("Delete error:", error);
    return { ok: false, error: "Failed to delete department." };
  }

  // Delete image if exists
  if (department?.image_path) {
    await deleteContentImage(supabase, department.image_path);
  }

  revalidatePublicPages();
  revalidatePath("/admin/cms/departments");

  return { ok: true, message: "Department deleted successfully." };
}

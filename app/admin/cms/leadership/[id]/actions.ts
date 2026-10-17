"use server";

import { revalidatePath } from "next/cache";
import { getAdminSession } from "@/lib/auth/admin";
import {
  uploadContentImage,
  deleteContentImage,
} from "@/lib/cms/images";
import { CONTENT_FOLDER_NAMES } from "@/lib/cms/constants";
import { revalidatePublicPages } from "@/lib/cms/revalidate";
import type { ActionResult } from "@/lib/cms/types";

export async function updateLeadershipProfile(
  employeeId: string,
  formData: FormData
): Promise<ActionResult> {
  const sessionResult = await getAdminSession();
  if (!sessionResult.ok) {
    return { ok: false, error: sessionResult.error };
  }

  const { supabase } = sessionResult.session;

  // Extract form data
  const biography = (formData.get("biography") as string)?.trim() || null;
  const showOnLeadership = formData.get("show_on_leadership") === "true";
  const leadershipSortOrder = parseInt(
    formData.get("leadership_sort_order") as string,
    10
  ) || 0;
  const photoFile = formData.get("public_photo") as File | null;
  const removePhoto = formData.get("remove_photo") === "true";

  // Fetch current employee record
  const { data: employee, error: fetchError } = await supabase
    .from("employees")
    .select("id, public_photo_path")
    .eq("id", employeeId)
    .maybeSingle();

  if (fetchError || !employee) {
    return { ok: false, error: "Employee not found." };
  }

  let newPhotoPath: string | null = employee.public_photo_path;

  // Handle photo removal
  if (removePhoto && employee.public_photo_path) {
    await deleteContentImage(supabase, employee.public_photo_path);
    newPhotoPath = null;
  }

  // Handle photo upload
  if (photoFile && photoFile.size > 0) {
    // Delete old photo if exists
    if (employee.public_photo_path) {
      await deleteContentImage(supabase, employee.public_photo_path);
    }

    const uploadResult = await uploadContentImage(
      supabase,
      photoFile,
      CONTENT_FOLDER_NAMES.leaders
    );

    if (!uploadResult.ok) {
      return { ok: false, error: uploadResult.error };
    }

    newPhotoPath = uploadResult.path;
  }

  // Update employee record
  const { error: updateError } = await supabase
    .from("employees")
    .update({
      biography,
      show_on_leadership: showOnLeadership,
      leadership_sort_order: leadershipSortOrder,
      public_photo_path: newPhotoPath,
      updated_at: new Date().toISOString(),
    })
    .eq("id", employeeId);

  if (updateError) {
    console.error("Update error:", updateError);
    return { ok: false, error: "Failed to update leadership profile." };
  }

  // Revalidate pages
  revalidatePublicPages();
  revalidatePath("/admin/cms/leadership");

  return {
    ok: true,
    message: showOnLeadership
      ? "Leadership profile published successfully."
      : "Leadership profile updated successfully.",
  };
}

"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth/admin";
import type { ActionState } from "@/lib/employees/types";
import {
  isUniqueViolation,
  parseEmployeeForm,
} from "@/lib/employees/validation";
import {
  removeEmployeePhoto,
  uploadEmployeePhoto,
  validateEmployeePhoto,
} from "@/lib/employees/photos";

const initialFailure = (message: string, fieldErrors?: ActionState["fieldErrors"]): ActionState => ({
  ok: false,
  message,
  fieldErrors,
});

export async function createEmployee(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const auth = await getAdminSession();
  if (!auth.ok) {
    return initialFailure(auth.error);
  }

  const { supabase } = auth.session;
  const parsed = parseEmployeeForm(formData);
  if (!parsed.ok) {
    return parsed.state;
  }

  const photoCheck = validateEmployeePhoto(formData);
  if (!photoCheck.ok) {
    return initialFailure(photoCheck.error, { photo: photoCheck.error });
  }

  let photoPath: string | null = null;

  if (photoCheck.file) {
    const uploaded = await uploadEmployeePhoto(
      supabase,
      photoCheck.file,
      photoCheck.extension
    );

    if (!uploaded.ok) {
      return initialFailure(uploaded.error, { photo: uploaded.error });
    }

    photoPath = uploaded.path;
  }

  const { data, error } = await supabase
    .from("employees")
    .insert({
      ...parsed.values,
      photo_path: photoPath,
    })
    .select("id")
    .single();

  if (error || !data) {
    if (photoPath) {
      await removeEmployeePhoto(supabase, photoPath);
    }

    if (isUniqueViolation(error)) {
      return initialFailure("That Staff ID is already registered.", {
        staff_id: "That Staff ID is already registered.",
      });
    }

    return initialFailure(
      "Could not save the employee record. Please try again."
    );
  }

  revalidatePath("/employees");
  redirect(`/employees/${data.id}`);
}

export async function updateEmployee(
  employeeId: string,
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const auth = await getAdminSession();
  if (!auth.ok) {
    return initialFailure(auth.error);
  }

  if (!employeeId || typeof employeeId !== "string") {
    return initialFailure("Invalid employee record.");
  }

  const { supabase } = auth.session;

  const { data: existing, error: existingError } = await supabase
    .from("employees")
    .select("id, photo_path")
    .eq("id", employeeId)
    .maybeSingle();

  if (existingError || !existing) {
    return initialFailure("Employee record was not found.");
  }

  const parsed = parseEmployeeForm(formData);
  if (!parsed.ok) {
    return parsed.state;
  }

  const photoCheck = validateEmployeePhoto(formData);
  if (!photoCheck.ok) {
    return initialFailure(photoCheck.error, { photo: photoCheck.error });
  }

  const removePhoto = formData.get("remove_photo") === "on";
  let nextPhotoPath = existing.photo_path as string | null;
  let newlyUploadedPath: string | null = null;

  if (photoCheck.file) {
    const uploaded = await uploadEmployeePhoto(
      supabase,
      photoCheck.file,
      photoCheck.extension
    );

    if (!uploaded.ok) {
      return initialFailure(uploaded.error, { photo: uploaded.error });
    }

    newlyUploadedPath = uploaded.path;
    nextPhotoPath = uploaded.path;
  } else if (removePhoto) {
    nextPhotoPath = null;
  }

  const { error } = await supabase
    .from("employees")
    .update({
      ...parsed.values,
      photo_path: nextPhotoPath,
      updated_at: new Date().toISOString(),
    })
    .eq("id", employeeId);

  if (error) {
    if (newlyUploadedPath) {
      await removeEmployeePhoto(supabase, newlyUploadedPath);
    }

    if (isUniqueViolation(error)) {
      return initialFailure("That Staff ID is already registered.", {
        staff_id: "That Staff ID is already registered.",
      });
    }

    return initialFailure(
      "Could not update the employee record. Please try again."
    );
  }

  if (
    (newlyUploadedPath || removePhoto) &&
    existing.photo_path &&
    existing.photo_path !== nextPhotoPath
  ) {
    await removeEmployeePhoto(supabase, existing.photo_path);
  }

  revalidatePath("/employees");
  revalidatePath(`/employees/${employeeId}`);
  revalidatePath(`/employees/${employeeId}/edit`);
  redirect(`/employees/${employeeId}`);
}

export async function deleteEmployee(employeeId: string): Promise<ActionState> {
  const auth = await getAdminSession();
  if (!auth.ok) {
    return initialFailure(auth.error);
  }

  if (!employeeId || typeof employeeId !== "string") {
    return initialFailure("Invalid employee record.");
  }

  const { supabase } = auth.session;

  const { data: existing, error: existingError } = await supabase
    .from("employees")
    .select("id, photo_path")
    .eq("id", employeeId)
    .maybeSingle();

  if (existingError || !existing) {
    return initialFailure("Employee record was not found.");
  }

  const { error } = await supabase
    .from("employees")
    .delete()
    .eq("id", employeeId);

  if (error) {
    return initialFailure(
      "Could not delete the employee record. Please try again."
    );
  }

  await removeEmployeePhoto(supabase, existing.photo_path);

  revalidatePath("/employees");
  redirect("/employees");
}

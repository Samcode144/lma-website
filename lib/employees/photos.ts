import { randomUUID } from "crypto";
import type { SupabaseClient } from "@supabase/supabase-js";
import {
  EMPLOYEE_PHOTOS_BUCKET,
  MAX_PHOTO_BYTES,
} from "@/lib/employees/constants";

export { EMPLOYEE_PHOTOS_BUCKET, MAX_PHOTO_BYTES };

const ALLOWED_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

export type PhotoValidation =
  | { ok: true; file: File; extension: string }
  | { ok: false; error: string }
  | { ok: true; file: null };

export function validateEmployeePhoto(
  formData: FormData,
  fieldName = "photo"
): PhotoValidation {
  const value = formData.get(fieldName);

  if (!value || !(value instanceof File) || value.size === 0) {
    return { ok: true, file: null };
  }

  const extension = ALLOWED_TYPES[value.type];
  if (!extension) {
    return {
      ok: false,
      error: "Photo must be a JPEG, PNG, or WebP image.",
    };
  }

  if (value.size > MAX_PHOTO_BYTES) {
    return {
      ok: false,
      error: "Photo must be 2 MB or smaller.",
    };
  }

  return { ok: true, file: value, extension };
}

export function buildPhotoObjectPath(extension: string): string {
  return `${randomUUID()}.${extension}`;
}

export async function uploadEmployeePhoto(
  supabase: SupabaseClient,
  file: File,
  extension: string
): Promise<{ ok: true; path: string } | { ok: false; error: string }> {
  const path = buildPhotoObjectPath(extension);
  const buffer = Buffer.from(await file.arrayBuffer());

  const { error } = await supabase.storage
    .from(EMPLOYEE_PHOTOS_BUCKET)
    .upload(path, buffer, {
      contentType: file.type,
      upsert: false,
    });

  if (error) {
    return {
      ok: false,
      error: "Could not upload the employee photo. Please try again.",
    };
  }

  return { ok: true, path };
}

export async function removeEmployeePhoto(
  supabase: SupabaseClient,
  path: string | null | undefined
): Promise<void> {
  if (!path) return;

  await supabase.storage.from(EMPLOYEE_PHOTOS_BUCKET).remove([path]);
}

export async function createEmployeePhotoSignedUrl(
  supabase: SupabaseClient,
  path: string | null | undefined,
  expiresInSeconds = 60 * 30
): Promise<string | null> {
  if (!path) return null;

  const { data, error } = await supabase.storage
    .from(EMPLOYEE_PHOTOS_BUCKET)
    .createSignedUrl(path, expiresInSeconds);

  if (error || !data?.signedUrl) {
    return null;
  }

  return data.signedUrl;
}

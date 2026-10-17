import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * Upload an image to the content-images bucket.
 * Returns the storage path on success or an error message.
 */
export async function uploadContentImage(
  supabase: SupabaseClient,
  file: File,
  folder: string = "general"
): Promise<{ ok: true; path: string } | { ok: false; error: string }> {
  // Validate file type
  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
  if (!allowedTypes.includes(file.type)) {
    return {
      ok: false,
      error: "Invalid file type. Only JPEG, PNG, and WebP images are allowed.",
    };
  }

  // Validate file size (2MB limit)
  const maxSize = 2 * 1024 * 1024;
  if (file.size > maxSize) {
    return {
      ok: false,
      error: "File size exceeds 2MB limit.",
    };
  }

  // Generate unique filename
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 15);
  const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const filename = `${timestamp}-${random}.${extension}`;
  const path = `${folder}/${filename}`;

  try {
    const { error: uploadError } = await supabase.storage
      .from("content-images")
      .upload(path, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      console.error("Upload error:", uploadError);
      return {
        ok: false,
        error: uploadError.message || "Failed to upload image.",
      };
    }

    return { ok: true, path };
  } catch (err) {
    console.error("Upload exception:", err);
    return {
      ok: false,
      error: "An unexpected error occurred during upload.",
    };
  }
}

/**
 * Delete an image from the content-images bucket.
 */
export async function deleteContentImage(
  supabase: SupabaseClient,
  path: string
): Promise<{ ok: true } | { ok: false; error: string }> {
  if (!path) {
    return { ok: true }; // Nothing to delete
  }

  try {
    const { error } = await supabase.storage
      .from("content-images")
      .remove([path]);

    if (error) {
      console.error("Delete error:", error);
      return {
        ok: false,
        error: error.message || "Failed to delete image.",
      };
    }

    return { ok: true };
  } catch (err) {
    console.error("Delete exception:", err);
    return {
      ok: false,
      error: "An unexpected error occurred during deletion.",
    };
  }
}

/**
 * Get the public URL for an image in the content-images bucket.
 */
export function getContentImageUrl(
  supabase: SupabaseClient,
  path: string | null
): string | null {
  if (!path) return null;

  const {
    data: { publicUrl },
  } = supabase.storage.from("content-images").getPublicUrl(path);

  return publicUrl;
}

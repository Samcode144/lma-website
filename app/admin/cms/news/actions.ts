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

    const uploadResult = await uploadContentImage(supabase, imageFile, CONTENT_FOLDER_NAMES.news);

    if (!uploadResult.ok) {
      return { ok: false as const, error: uploadResult.error, path: null };
    }

    imagePath = uploadResult.path;
  }

  return { ok: true as const, path: imagePath };
}

export async function createNewsArticle(formData: FormData): Promise<ActionResult> {
  const sessionResult = await getAdminSession();
  if (!sessionResult.ok) {
    return { ok: false, error: sessionResult.error };
  }

  const { supabase } = sessionResult.session;

  const title = (formData.get("title") as string)?.trim();
  const content = (formData.get("content") as string)?.trim();
  const authorName = (formData.get("author_name") as string)?.trim();
  const isPublished = formData.get("is_published") === "true";
  const imageFile = formData.get("image") as File | null;

  if (!title) {
    return { ok: false, error: "Title is required." };
  }

  const baseSlug = generateSlug(title);
  const { data: existingArticles } = await supabase.from("news_articles").select("slug");
  const existingSlugs = (existingArticles || []).map((a: { slug: string }) => a.slug);
  const slug = makeUniqueSlug(baseSlug, existingSlugs);

  const imageResult = await handleImageUpload(supabase, imageFile, null, false);
  if (!imageResult.ok) {
    return { ok: false, error: imageResult.error };
  }

  const now = new Date().toISOString();

  const { error } = await supabase.from("news_articles").insert({
    title,
    slug,
    content: content || "",
    author_name: authorName,
    cover_path: imageResult.path,
    is_published: isPublished,
    published_at: isPublished ? now : null,
  });

  if (error) {
    console.error("Create error:", error);
    if (imageResult.path) await deleteContentImage(supabase, imageResult.path);
    return { ok: false, error: "Failed to create news article." };
  }

  revalidateContentType("news");
  revalidatePath("/admin/cms/news");
  redirect("/admin/cms/news");
}

export async function updateNewsArticle(id: string, formData: FormData): Promise<ActionResult> {
  const sessionResult = await getAdminSession();
  if (!sessionResult.ok) {
    return { ok: false, error: sessionResult.error };
  }

  const { supabase } = sessionResult.session;

  const title = (formData.get("title") as string)?.trim();
  const content = (formData.get("content") as string)?.trim();
  const authorName = (formData.get("author_name") as string)?.trim();
  const isPublished = formData.get("is_published") === "true";
  const imageFile = formData.get("image") as File | null;
  const removeImage = formData.get("remove_image") === "true";

  if (!title) {
    return { ok: false, error: "Title is required." };
  }

  const { data: article } = await supabase.from("news_articles").select("cover_path, is_published").eq("id", id).maybeSingle();
  if (!article) {
    return { ok: false, error: "Article not found." };
  }

  const imageResult = await handleImageUpload(supabase, imageFile, article.cover_path, removeImage);
  if (!imageResult.ok) {
    return { ok: false, error: imageResult.error };
  }

  const wasUnpublished = !article.is_published;
  const nowPublishing = isPublished && wasUnpublished;

  const { error } = await supabase
    .from("news_articles")
    .update({
      title,
      content: content || "",
      author_name: authorName,
      cover_path: imageResult.path,
      is_published: isPublished,
      published_at: nowPublishing ? new Date().toISOString() : undefined,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    console.error("Update error:", error);
    return { ok: false, error: "Failed to update news article." };
  }

  revalidateContentType("news");
  revalidatePath("/admin/cms/news");

  return { ok: true, message: isPublished ? "News article published successfully." : "News article updated successfully." };
}

export async function deleteNewsArticle(id: string): Promise<ActionResult> {
  const sessionResult = await getAdminSession();
  if (!sessionResult.ok) {
    return { ok: false, error: sessionResult.error };
  }

  const { supabase } = sessionResult.session;

  const { data: article } = await supabase.from("news_articles").select("cover_path").eq("id", id).maybeSingle();
  const { error } = await supabase.from("news_articles").delete().eq("id", id);

  if (error) {
    console.error("Delete error:", error);
    return { ok: false, error: "Failed to delete news article." };
  }

  if (article?.cover_path) await deleteContentImage(supabase, article.cover_path);

  revalidateContentType("news");
  revalidatePath("/admin/cms/news");
  redirect("/admin/cms/news");
}

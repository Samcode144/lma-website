import { revalidatePath } from "next/cache";

/**
 * Revalidate all public pages that display CMS content.
 */
export function revalidatePublicPages() {
  revalidatePath("/", "page");
  revalidatePath("/leadership", "page");
  revalidatePath("/departments", "page");
  revalidatePath("/projects", "layout");
  revalidatePath("/programs", "layout");
  revalidatePath("/partnerships", "page");
  revalidatePath("/news", "layout");
}

/**
 * Revalidate a specific content type's pages.
 */
export function revalidateContentType(type: "projects" | "programs" | "news") {
  revalidatePath("/", "page");
  revalidatePath(`/${type}`, "layout");
}

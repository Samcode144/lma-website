/**
 * Generate a URL-safe slug from a string.
 * Converts to lowercase, removes special characters, and replaces spaces with hyphens.
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/[\s_]+/g, "-") // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens
}

/**
 * Make a slug unique by appending a timestamp if needed.
 */
export function makeUniqueSlug(slug: string, existingSlugs: string[]): string {
  if (!existingSlugs.includes(slug)) {
    return slug;
  }

  const timestamp = Date.now();
  return `${slug}-${timestamp}`;
}

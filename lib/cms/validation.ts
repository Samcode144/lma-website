/**
 * Validate and normalize a URL.
 * Returns null if the URL is invalid.
 */
export function validateUrl(url: string | null | undefined): string | null {
  if (!url || !url.trim()) {
    return null;
  }

  const trimmed = url.trim();

  try {
    // Ensure the URL has a protocol
    const urlWithProtocol = trimmed.match(/^https?:\/\//i)
      ? trimmed
      : `https://${trimmed}`;

    const parsed = new URL(urlWithProtocol);

    // Only allow http and https protocols
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      return null;
    }

    return parsed.toString();
  } catch {
    return null;
  }
}

/**
 * Escape special characters for ILIKE queries in Postgres.
 */
export function escapeIlike(query: string): string {
  return query.replace(/[%_\\]/g, "\\$&");
}

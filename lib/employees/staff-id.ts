/**
 * Normalize a Staff ID from a dynamic route param.
 * Next.js may leave percent-encoding in place (e.g. LMA%20005).
 * Decode at most once, then trim ends while keeping internal spaces.
 */
export function normalizeStaffIdParam(rawParam: string): string | null {
  if (typeof rawParam !== "string") {
    return null;
  }

  let decoded = rawParam;
  if (rawParam.includes("%")) {
    try {
      decoded = decodeURIComponent(rawParam);
    } catch {
      decoded = rawParam;
    }
  }

  const staffId = decoded.trim();

  if (
    staffId.length === 0 ||
    staffId.length > 50 ||
    /[\u0000-\u001f\u007f]/.test(staffId)
  ) {
    return null;
  }

  return staffId;
}

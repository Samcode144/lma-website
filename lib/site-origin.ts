import "server-only";
import { headers } from "next/headers";

function normalizeOrigin(value: string): string {
  const url = new URL(value.includes("://") ? value : `https://${value}`);
  const isLocalHost =
    url.hostname === "localhost" ||
    url.hostname === "127.0.0.1" ||
    url.hostname === "[::1]";

  if (
    (url.protocol !== "https:" && url.protocol !== "http:") ||
    (url.protocol === "http:" && !isLocalHost) ||
    url.username ||
    url.password ||
    url.pathname !== "/" ||
    url.search ||
    url.hash
  ) {
    throw new Error(
      "Site URL must be an HTTPS origin (HTTP is allowed only for localhost).",
    );
  }

  return url.origin;
}

export async function getSiteOrigin(): Promise<string> {
  const configuredOrigin = process.env.NEXT_PUBLIC_SITE_URL;
  if (configuredOrigin) {
    return normalizeOrigin(configuredOrigin);
  }

  const vercelHost = process.env.VERCEL_URL;
  if (vercelHost) {
    return normalizeOrigin(vercelHost);
  }

  const host = (await headers()).get("host");
  if (host && /^(localhost|127\.0\.0\.1|\[::1\])(?::\d{1,5})?$/.test(host)) {
    return normalizeOrigin(`http://${host}`);
  }

  throw new Error(
    "Set NEXT_PUBLIC_SITE_URL to the public site origin to generate staff ID QR codes.",
  );
}

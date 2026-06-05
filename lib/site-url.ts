/** Canonical site URL for metadata, sitemap, and robots. */
export function getSiteUrl(): string {
  const url = process.env.NEXT_PUBLIC_APP_URL?.trim();
  if (url) return url.replace(/\/$/, "");
  if (process.env.NODE_ENV === "development") {
    return "http://localhost:3000";
  }
  return "https://cepoonjar.ac.in";
}
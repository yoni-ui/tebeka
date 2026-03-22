/** Same-origin proxy prefix (see next.config.mjs rewrites). Empty env → /backend → FastAPI. */
export function getPublicApiBase(): string {
  const fromEnv = process.env.NEXT_PUBLIC_API_URL?.trim();
  if (fromEnv) {
    return fromEnv.replace(/\/$/, "");
  }
  return "/backend";
}

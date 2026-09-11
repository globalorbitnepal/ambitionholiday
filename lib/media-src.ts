/** Serve CMS uploads through the API so they still load after Next builds. */
export function mediaSrc(src: string, _cacheKey?: string) {
  if (!src) return src;
  const path = src.split("?")[0];
  if (path.startsWith("/uploads/")) {
    const file = path.slice("/uploads/".length);
    return `/api/media/${file}`;
  }
  return path.startsWith("/api/media/") ? path : src;
}

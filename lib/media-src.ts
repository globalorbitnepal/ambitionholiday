/** Serve CMS uploads through the API so they still load after Next builds. */
export function mediaSrc(src: string, cacheKey?: string) {
  if (!src) return src;
  let path = src.split("?")[0];
  if (path.startsWith("/images/") && /\.(jpe?g|png)$/i.test(path)) {
    path = path.replace(/\.(jpe?g|png)$/i, ".webp");
  }
  let out = path;
  if (path.startsWith("/uploads/")) {
    const file = path.slice("/uploads/".length);
    out = `/api/media/${file}`;
  } else if (path.startsWith("/api/media/")) {
    out = path;
  }
  if (cacheKey && (path.startsWith("/uploads/") || out.startsWith("/api/media/"))) {
    const join = out.includes("?") ? "&" : "?";
    out = `${out}${join}v=${encodeURIComponent(cacheKey)}`;
  }
  return out;
}

/** Authenticated preview URL so Orbit can show every disk image, including /images WebP. */
export function orbitPreviewSrc(src: string) {
  if (!src) return src;
  if (/youtube\.com|youtu\.be|vimeo\.com/i.test(src)) return src;
  return mediaSrc(src);
}

/** Exact library path — do not rewrite jpg→webp or listed files 404 in Orbit. */
export function orbitThumbSrc(src: string) {
  if (!src) return src;
  if (/^https?:\/\//i.test(src) || src.startsWith("data:")) return src;
  const path = src.split("?")[0];
  if (path.startsWith("/uploads/")) {
    return `/api/media/${path.slice("/uploads/".length)}`;
  }
  if (path.startsWith("/api/media/")) return path;
  return path;
}

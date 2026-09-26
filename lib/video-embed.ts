export function normalizeVideoSrc(src: string): string {
  const trimmed = (src || "").trim();
  if (!trimmed) return "";
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  if (/^(www\.)?(youtube\.com|youtu\.be)\//i.test(trimmed) || /^youtu\.be\//i.test(trimmed)) {
    return `https://${trimmed.replace(/^\/+/, "")}`;
  }
  if (/^youtube\.com/i.test(trimmed)) return `https://www.${trimmed}`;
  return trimmed;
}

export function youtubeId(src: string): string | null {
  if (!src) return null;
  const trimmed = normalizeVideoSrc(src);
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) return trimmed;
  try {
    const url = new URL(trimmed);
    const host = url.hostname.replace(/^www\./, "").replace(/^m\./, "");
    if (host === "youtu.be") {
      const id = url.pathname.split("/").filter(Boolean)[0]?.slice(0, 11);
      return id && /^[a-zA-Z0-9_-]{11}$/.test(id) ? id : null;
    }
    if (host === "youtube.com" || host === "youtube-nocookie.com") {
      const v = url.searchParams.get("v");
      if (v && /^[a-zA-Z0-9_-]{11}$/.test(v)) return v;
      const parts = url.pathname.split("/").filter(Boolean);
      const marker = parts.findIndex((p) => ["embed", "shorts", "live"].includes(p));
      if (marker >= 0 && parts[marker + 1]) {
        const id = parts[marker + 1].slice(0, 11);
        if (/^[a-zA-Z0-9_-]{11}$/.test(id)) return id;
      }
    }
  } catch {
    const match = trimmed.match(/(?:v=|youtu\.be\/|embed\/|shorts\/)([a-zA-Z0-9_-]{11})/);
    return match?.[1] ?? null;
  }
  return null;
}

export function vimeoId(src: string): string | null {
  if (!src) return null;
  try {
    const url = new URL(normalizeVideoSrc(src));
    if (!url.hostname.includes("vimeo.com")) return null;
    const match = url.pathname.match(/\/(?:video\/)?(\d+)/);
    return match?.[1] ?? null;
  } catch {
    return null;
  }
}

export function isFileVideo(src: string) {
  return (
    src.startsWith("/uploads/") ||
    src.startsWith("/api/media/") ||
    src.startsWith("/videos/") ||
    /\.(mp4|webm|mov)(\?|$)/i.test(src)
  );
}

export function youtubeEmbedSrc(id: string, origin?: string) {
  const params = new URLSearchParams({
    autoplay: "1",
    rel: "0",
    modestbranding: "1",
    playsinline: "1",
    enablejsapi: "1",
    fs: "1",
  });
  if (origin) params.set("origin", origin);
  return `https://www.youtube-nocookie.com/embed/${id}?${params.toString()}`;
}

export function vimeoEmbedSrc(id: string) {
  return `https://player.vimeo.com/video/${id}?autoplay=1`;
}

import { orbitThumbSrc } from "@/lib/media-src";

/** Resolve a custom board logo URL without rewriting static PNGs to missing webps. */
export function resolveReviewBoardLogoUrl(src: string) {
  const trimmed = src.trim();
  if (!trimmed) return "";
  if (trimmed.startsWith("/images/") && /\.png$/i.test(trimmed.split("?")[0])) {
    return trimmed.split("?")[0];
  }
  return orbitThumbSrc(trimmed);
}

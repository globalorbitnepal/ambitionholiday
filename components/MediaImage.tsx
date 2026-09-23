"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { mediaSrc } from "@/lib/media-src";
import { SECTION_WALLPAPER } from "@/lib/section-wallpaper";

const FALLBACK_SRC = SECTION_WALLPAPER;

type Props = {
  src: string;
  alt: string;
  className?: string;
  sizes: string;
  priority?: boolean;
  objectPosition?: string;
  quality?: number;
  cacheKey?: string;
};

function isRuntimeUpload(src: string) {
  const path = src.split("?")[0];
  return path.startsWith("/uploads/") || path.startsWith("/api/media/");
}

export default function MediaImage({
  src,
  alt,
  className,
  sizes,
  priority = false,
  objectPosition = "center 28%",
  quality,
  cacheKey,
}: Props) {
  const initial = mediaSrc(src, cacheKey) || FALLBACK_SRC;
  const [current, setCurrent] = useState(initial);
  useEffect(() => {
    setCurrent(mediaSrc(src, cacheKey) || FALLBACK_SRC);
  }, [src, cacheKey]);
  const resolved = current || FALLBACK_SRC;
  const style = { objectPosition };
  const imageQuality = quality ?? (priority ? 74 : 68);
  const onError = () => {
    if (resolved !== FALLBACK_SRC) setCurrent(FALLBACK_SRC);
  };

  if (isRuntimeUpload(resolved)) {
    return (
      // Runtime CMS uploads are served from disk, not the build-time public folder.
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={resolved}
        alt={alt}
        className={`absolute inset-0 h-full w-full ${className ?? ""}`}
        style={style}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "low"}
        decoding="async"
        draggable={false}
        onError={onError}
      />
    );
  }

  return (
    <Image
      src={resolved}
      alt={alt}
      fill
      sizes={sizes}
      quality={imageQuality}
      priority={priority}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      draggable={false}
      className={className}
      style={style}
      onError={onError}
    />
  );
}

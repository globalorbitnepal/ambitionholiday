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
  objectFit?: "cover" | "contain";
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
  objectFit = "cover",
  quality,
  cacheKey,
}: Props) {
  const initial = mediaSrc(src, cacheKey) || FALLBACK_SRC;
  const [current, setCurrent] = useState(initial);
  const [loaded, setLoaded] = useState(priority);
  useEffect(() => {
    setCurrent(mediaSrc(src, cacheKey) || FALLBACK_SRC);
    setLoaded(priority);
  }, [src, cacheKey, priority]);
  const resolved = current || FALLBACK_SRC;
  const style = { objectPosition, objectFit };
  const imageQuality = quality ?? (priority ? 74 : 68);
  const fadeClass = priority
    ? className ?? ""
    : `${className ?? ""} media-image-fade ${loaded ? "opacity-100" : "opacity-0"}`.trim();
  const onLoad = () => setLoaded(true);
  const onError = () => {
    if (resolved !== FALLBACK_SRC) setCurrent(FALLBACK_SRC);
    setLoaded(true);
  };

  if (isRuntimeUpload(resolved)) {
    return (
      // Runtime CMS uploads are served from disk, not the build-time public folder.
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={resolved}
        alt={alt}
        className={`absolute inset-0 h-full w-full ${fadeClass}`}
        style={style}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding={priority ? "sync" : "async"}
        draggable={false}
        onLoad={onLoad}
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
      className={fadeClass}
      style={style}
      onLoad={onLoad}
      onError={onError}
    />
  );
}

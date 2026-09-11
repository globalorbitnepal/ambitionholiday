"use client";

import Image from "next/image";
import { mediaSrc } from "@/lib/media-src";

type Props = {
  src: string;
  alt: string;
  className?: string;
  sizes: string;
  priority?: boolean;
  objectPosition?: string;
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
}: Props) {
  const resolved = mediaSrc(src);
  const style = { objectPosition };

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
      />
    );
  }

  return (
    <Image
      src={resolved}
      alt={alt}
      fill
      sizes={sizes}
      quality={priority ? 74 : 68}
      priority={priority}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      draggable={false}
      className={className}
      style={style}
    />
  );
}

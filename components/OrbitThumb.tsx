"use client";

import { useState } from "react";
import { orbitThumbSrc } from "@/lib/media-src";

export default function OrbitThumb({
  src,
  alt = "",
  className = "h-full w-full object-cover",
}: {
  src: string;
  alt?: string;
  className?: string;
}) {
  const [url, setUrl] = useState(() => orbitThumbSrc(src));
  const [failed, setFailed] = useState(false);

  return (
    <span className="absolute inset-0 block bg-[#121820]">
      {url && !failed ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={url}
          alt={alt}
          loading="eager"
          decoding="async"
          className={className}
          onError={() => {
            const original = src.split("?")[0];
            if (url !== original && original.startsWith("/")) {
              setUrl(original);
              return;
            }
            setFailed(true);
          }}
        />
      ) : (
        <span className="flex h-full items-center justify-center px-2 text-center text-[0.58rem] leading-snug text-white/45">
          {(src || "image").split("/").pop()}
        </span>
      )}
    </span>
  );
}

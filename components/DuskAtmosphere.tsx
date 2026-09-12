"use client";

import { useSiteContent } from "@/components/SiteContentProvider";
import { mediaSrc } from "@/lib/media-src";

const FALLBACK = "/images/atmosphere/himalaya-dusk-peaks-v3.jpg";

/** Original dusk Himalayan peaks behind post-hero glass. Not the hero hiker photo. */
export default function DuskAtmosphere() {
  const { atmosphere } = useSiteContent();
  const src = mediaSrc(atmosphere?.imageSrc || FALLBACK) || FALLBACK;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        className="h-full w-full object-cover object-center"
        onError={(event) => {
          event.currentTarget.src = FALLBACK;
        }}
      />
      <div className="absolute inset-0 bg-black/22" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/18 via-transparent to-black/32" />
    </div>
  );
}

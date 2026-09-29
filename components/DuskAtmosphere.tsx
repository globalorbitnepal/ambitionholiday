"use client";

import { useSiteContent } from "@/components/SiteContentProvider";
import { mediaSrc } from "@/lib/media-src";
import { SECTION_WALLPAPER } from "@/lib/section-wallpaper";

const FALLBACK = SECTION_WALLPAPER;

type AtmosphereTone = "dusk" | "bright";

/** Original dusk Himalayan peaks behind post-hero glass. Not the hero hiker photo. */
export default function DuskAtmosphere({ tone = "dusk" }: { tone?: AtmosphereTone }) {
  const { atmosphere } = useSiteContent();
  const src = mediaSrc(atmosphere?.imageSrc || FALLBACK) || FALLBACK;
  const wash =
    tone === "bright"
      ? "absolute inset-0 bg-[linear-gradient(180deg,rgba(236,246,255,0.55)_0%,rgba(214,232,246,0.38)_42%,rgba(198,222,240,0.46)_100%)]"
      : "absolute inset-0 bg-[linear-gradient(180deg,rgba(4,12,20,0.32)_0%,rgba(6,14,22,0.26)_45%,rgba(4,10,16,0.48)_100%)]";

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        className={`media-image-fade h-full w-full object-cover object-[center_38%] opacity-100 ${
          tone === "bright" ? "brightness-[1.18] saturate-[1.08]" : ""
        }`}
        loading="eager"
        decoding="async"
        fetchPriority="high"
        onError={(event) => {
          event.currentTarget.src = FALLBACK;
        }}
      />
      <div className={wash} />
    </div>
  );
}

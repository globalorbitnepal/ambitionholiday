"use client";

import { useSiteContent } from "@/components/SiteContentProvider";
import { mediaSrc } from "@/lib/media-src";
import { FOOTER_ATMOSPHERE } from "@/lib/section-wallpaper";

type AtmosphereTone = "dusk" | "bright";

/** Full panoramic peaks behind the footer — not cropped like post-hero section wallpaper. */
export default function DuskAtmosphere({ tone = "dusk" }: { tone?: AtmosphereTone }) {
  const { atmosphere } = useSiteContent();
  const src = mediaSrc(atmosphere?.footerImageSrc || FOOTER_ATMOSPHERE) || FOOTER_ATMOSPHERE;
  const wash =
    tone === "bright"
      ? "absolute inset-0 bg-[linear-gradient(180deg,rgba(236,246,255,0.55)_0%,rgba(214,232,246,0.38)_42%,rgba(198,222,240,0.46)_100%)]"
      : "dusk-atmosphere-wash absolute inset-0";

  return (
    <div
      aria-hidden="true"
      className="dusk-atmosphere pointer-events-none absolute inset-0 z-0 overflow-hidden bg-[#0a1018]"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        className={`media-image-fade h-full w-full object-contain object-center opacity-100 ${
          tone === "bright" ? "brightness-[1.18] saturate-[1.08]" : ""
        }`}
        loading="eager"
        decoding="async"
        fetchPriority="high"
        onError={(event) => {
          event.currentTarget.src = FOOTER_ATMOSPHERE;
        }}
      />
      <div className={wash} />
    </div>
  );
}

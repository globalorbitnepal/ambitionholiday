"use client";

import MediaImage from "@/components/MediaImage";
import { useSiteContent } from "@/components/SiteContentProvider";
import { SECTION_WALLPAPER } from "@/lib/section-wallpaper";

/** Same crop + overlay on every post-hero glass section. */
export default function SectionWallpaper({ src }: { src?: string }) {
  const { exploreHub, why } = useSiteContent();
  const image = src || exploreHub?.wallpaperSrc || why?.wallpaperSrc || SECTION_WALLPAPER;

  return (
    <div className="absolute inset-0">
      <MediaImage
        src={image}
        alt=""
        sizes="100vw"
        className="h-full w-full object-cover"
        objectPosition="center 38%"
        quality={74}
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,12,20,0.32)_0%,rgba(6,14,22,0.26)_45%,rgba(4,10,16,0.48)_100%)]" />
    </div>
  );
}

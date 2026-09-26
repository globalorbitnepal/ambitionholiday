"use client";

import { OrbitMediaButtons } from "@/components/OrbitMediaPicker";
import type { SiteContent } from "@/lib/content-types";
import { tripPath, type TrekPackage } from "@/lib/trip-packages";

type Props = {
  content: SiteContent;
  setContent: (next: SiteContent) => void;
};

export default function OrbitPackageGalleryEditor({ content, setContent }: Props) {
  function patchPkg(id: string, partial: Partial<TrekPackage>) {
    setContent({
      ...content,
      tripPackages: content.tripPackages.map((pkg) => (pkg.id === id ? { ...pkg, ...partial } : pkg)),
    });
  }

  function patchGallery(pkg: TrekPackage, gallery: string[]) {
    const galleryAlts = [...(pkg.galleryAlts || [])];
    while (galleryAlts.length < gallery.length) galleryAlts.push("");
    if (galleryAlts.length > gallery.length) galleryAlts.length = gallery.length;
    patchPkg(pkg.id, { gallery, galleryAlts });
  }

  return (
    <div className="space-y-8">
      <p className="text-sm text-white/65">
        Hero strip and the Trip Gallery grid (below What&apos;s included) use the same photos. Upload at least eight for a full
        2×4 grid; the last tile opens the full lightbox. Save at the top to publish.
      </p>
      {content.tripPackages.map((pkg) => (
        <div key={pkg.id} className="space-y-4 rounded-2xl border border-white/10 p-4">
          <div>
            <p className="text-xs uppercase tracking-[0.14em] text-white/40">{pkg.country}</p>
            <h2 className="font-[family-name:var(--font-cormorant)] text-2xl">{pkg.title}</h2>
            <p className="text-xs text-white/45">{tripPath(pkg)}</p>
          </div>
          <label className="block space-y-1">
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-white/50">Section title</span>
            <input
              className="w-full rounded-md border border-white/15 bg-black/40 px-3 py-2 text-sm text-white"
              value={pkg.tripGalleryTitle || "Trip Gallery"}
              onChange={(e) => patchPkg(pkg.id, { tripGalleryTitle: e.target.value })}
            />
          </label>
          {pkg.gallery.map((src, index) => (
            <div key={`${pkg.id}-g-${index}`} className="space-y-2 rounded-xl border border-white/10 p-4">
              <p className="text-sm font-semibold text-white">
                Trip gallery photo {index + 1} — upload to replace
              </p>
              {src ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={src} alt="" className="aspect-[4/3] w-full max-w-md rounded-lg object-cover" />
              ) : null}
              <OrbitMediaButtons
                onPicked={async (url) => {
                  patchGallery(pkg, pkg.gallery.map((item, i) => (i === index ? url : item)));
                }}
              />
              <label className="block space-y-1">
                <span className="text-xs text-white/50">Alt text</span>
                <input
                  className="w-full rounded-md border border-white/15 bg-black/40 px-3 py-2 text-sm text-white"
                  value={pkg.galleryAlts?.[index] || ""}
                  onChange={(e) => {
                    const galleryAlts = [...(pkg.galleryAlts || [])];
                    while (galleryAlts.length < pkg.gallery.length) galleryAlts.push("");
                    galleryAlts[index] = e.target.value;
                    patchPkg(pkg.id, { galleryAlts });
                  }}
                />
              </label>
              <button
                type="button"
                className="rounded-md border border-white/20 px-3 py-1.5 text-xs text-white/70"
                onClick={() => patchGallery(pkg, pkg.gallery.filter((_, i) => i !== index))}
              >
                Remove photo
              </button>
            </div>
          ))}
          <button
            type="button"
            className="rounded-md border border-gold/40 px-4 py-2 text-xs font-semibold text-gold"
            onClick={() => patchGallery(pkg, [...pkg.gallery, pkg.heroSrc])}
          >
            Add gallery photo
          </button>
        </div>
      ))}
    </div>
  );
}

"use client";

import { OrbitMediaButtons } from "@/components/OrbitMediaPicker";
import type { SiteContent } from "@/lib/content-types";
import { tripPath, type TrekPackage, type TrekVideo } from "@/lib/trip-packages";

type Props = {
  content: SiteContent;
  setContent: (next: SiteContent) => void;
};

function defaultWatch(pkg: TrekPackage): TrekVideo {
  return (
    pkg.watchVideo ?? {
      id: `watch-${pkg.id}`,
      title: "Watch video",
      subtitle: pkg.title,
      duration: "",
      imageSrc: pkg.heroSrc,
      imageAlt: pkg.heroAlt || pkg.title,
      videoSrc: "",
    }
  );
}

export default function OrbitPackageVideosEditor({ content, setContent }: Props) {
  function patchPkg(id: string, partial: Partial<TrekPackage>) {
    setContent({
      ...content,
      tripPackages: content.tripPackages.map((pkg) => (pkg.id === id ? { ...pkg, ...partial } : pkg)),
    });
  }

  function patchWatch(pkg: TrekPackage, partial: Partial<TrekVideo>) {
    patchPkg(pkg.id, { watchVideo: { ...defaultWatch(pkg), ...partial } });
  }

  return (
    <div className="space-y-8">
      <p className="text-sm text-white/65">
        Watch Video and guest review films on each trek page. Paste a full YouTube or Vimeo URL — thumbnails can be uploaded
        below. Save at the top to publish.
      </p>
      {content.tripPackages.map((pkg) => (
        <div key={pkg.id} className="space-y-4 rounded-2xl border border-white/10 p-4">
          <div>
            <p className="text-xs uppercase tracking-[0.14em] text-white/40">{pkg.country}</p>
            <h2 className="font-[family-name:var(--font-cormorant)] text-2xl">{pkg.title}</h2>
            <p className="text-xs text-white/45">{tripPath(pkg)}</p>
          </div>

          <div className="space-y-3 rounded-xl border border-gold/25 p-4">
            <p className="text-sm font-semibold text-gold">Watch Video (main film)</p>
            <label className="block space-y-1">
              <span className="text-xs text-white/50">Title</span>
              <input
                className="w-full rounded-md border border-white/15 bg-black/40 px-3 py-2 text-sm text-white"
                value={defaultWatch(pkg).title}
                onChange={(e) => patchWatch(pkg, { title: e.target.value })}
              />
            </label>
            <label className="block space-y-1">
              <span className="text-xs text-white/50">YouTube / Vimeo / MP4 URL</span>
              <input
                className="w-full rounded-md border border-white/15 bg-black/40 px-3 py-2 text-sm text-white"
                value={defaultWatch(pkg).videoSrc}
                onChange={(e) => patchWatch(pkg, { videoSrc: e.target.value })}
                placeholder="https://www.youtube.com/watch?v=..."
              />
            </label>
            <label className="block space-y-1">
              <span className="text-xs text-white/50">Duration label</span>
              <input
                className="w-full rounded-md border border-white/15 bg-black/40 px-3 py-2 text-sm text-white"
                value={defaultWatch(pkg).duration}
                onChange={(e) => patchWatch(pkg, { duration: e.target.value })}
              />
            </label>
            <div className="space-y-2">
              <p className="text-xs text-white/50">Thumbnail</p>
              {defaultWatch(pkg).imageSrc ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={defaultWatch(pkg).imageSrc} alt="" className="h-32 w-full max-w-sm rounded-lg object-cover" />
              ) : null}
              <OrbitMediaButtons onPicked={async (url) => patchWatch(pkg, { imageSrc: url })} />
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-semibold text-white">Video reviews</p>
            {(pkg.videoReviews || []).map((video, vi) => (
              <div key={video.id || vi} className="space-y-2 rounded-xl border border-white/10 p-4">
                <label className="block space-y-1">
                  <span className="text-xs text-white/50">Title</span>
                  <input
                    className="w-full rounded-md border border-white/15 bg-black/40 px-3 py-2 text-sm text-white"
                    value={video.title}
                    onChange={(e) => {
                      const videoReviews = [...(pkg.videoReviews || [])];
                      videoReviews[vi] = { ...video, title: e.target.value };
                      patchPkg(pkg.id, { videoReviews });
                    }}
                  />
                </label>
                <label className="block space-y-1">
                  <span className="text-xs text-white/50">Video URL</span>
                  <input
                    className="w-full rounded-md border border-white/15 bg-black/40 px-3 py-2 text-sm text-white"
                    value={video.videoSrc}
                    onChange={(e) => {
                      const videoReviews = [...(pkg.videoReviews || [])];
                      videoReviews[vi] = { ...video, videoSrc: e.target.value };
                      patchPkg(pkg.id, { videoReviews });
                    }}
                  />
                </label>
                <OrbitMediaButtons
                  onPicked={async (url) => {
                    const videoReviews = [...(pkg.videoReviews || [])];
                    videoReviews[vi] = { ...video, imageSrc: url };
                    patchPkg(pkg.id, { videoReviews });
                  }}
                />
                <button
                  type="button"
                  className="rounded-md border border-white/20 px-3 py-1.5 text-xs text-white/70"
                  onClick={() =>
                    patchPkg(pkg.id, { videoReviews: (pkg.videoReviews || []).filter((_, i) => i !== vi) })
                  }
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              className="rounded-md border border-gold/40 px-4 py-2 text-xs font-semibold text-gold"
              onClick={() =>
                patchPkg(pkg.id, {
                  videoReviews: [
                    ...(pkg.videoReviews || []),
                    {
                      id: `vr-${Date.now()}`,
                      title: "Guest video",
                      subtitle: "",
                      duration: "",
                      imageSrc: pkg.heroSrc,
                      imageAlt: pkg.title,
                      videoSrc: "",
                    },
                  ],
                })
              }
            >
              Add video review
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

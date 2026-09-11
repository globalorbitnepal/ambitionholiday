"use client";

import { useEffect, useId, useState } from "react";
import Link from "next/link";
import { useSiteContent } from "@/components/SiteContentProvider";
import MediaImage from "@/components/MediaImage";
import type { JournalVideo } from "@/lib/content-types";
import { mediaSrc } from "@/lib/media-src";

function youtubeId(src: string): string | null {
  if (!src) return null;
  const trimmed = src.trim();
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) return trimmed;
  try {
    const url = new URL(trimmed);
    if (url.hostname.includes("youtu.be")) {
      const id = url.pathname.replace("/", "").slice(0, 11);
      return id || null;
    }
    if (url.hostname.includes("youtube.com") || url.hostname.includes("youtube-nocookie.com")) {
      const v = url.searchParams.get("v");
      if (v) return v;
      const embed = url.pathname.match(/\/embed\/([a-zA-Z0-9_-]{11})/);
      if (embed) return embed[1];
      const shorts = url.pathname.match(/\/shorts\/([a-zA-Z0-9_-]{11})/);
      if (shorts) return shorts[1];
    }
  } catch {
    // not a URL
  }
  return null;
}

function vimeoId(src: string): string | null {
  if (!src) return null;
  try {
    const url = new URL(src.trim());
    if (!url.hostname.includes("vimeo.com")) return null;
    const match = url.pathname.match(/\/(?:video\/)?(\d+)/);
    return match?.[1] ?? null;
  } catch {
    return null;
  }
}

function isFileVideo(src: string) {
  return (
    src.startsWith("/uploads/") ||
    src.startsWith("/api/media/") ||
    src.startsWith("/videos/") ||
    /\.(mp4|webm|mov)(\?|$)/i.test(src)
  );
}

function VideoLightbox({
  video,
  updatedAt,
  onClose,
}: {
  video: JournalVideo;
  updatedAt: string;
  onClose: () => void;
}) {
  const titleId = useId();
  const yt = youtubeId(video.videoSrc);
  const vimeo = vimeoId(video.videoSrc);
  const file = isFileVideo(video.videoSrc);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center bg-black/92 p-2 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-[max(0.75rem,env(safe-area-inset-right))] top-[max(0.75rem,env(safe-area-inset-top))] z-[91] rounded-full border border-white/25 bg-black/50 px-3 py-1.5 text-xs font-semibold text-white hover:border-gold/60 hover:text-gold sm:right-5 sm:top-5"
      >
        Close ✕
      </button>
      <div
        className="relative flex h-[min(92dvh,100%)] w-full max-w-6xl flex-col overflow-hidden rounded-lg border border-gold/25 bg-black shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-2.5">
          <div className="min-w-0">
            <p id={titleId} className="line-clamp-2 font-[family-name:var(--font-cormorant)] text-base text-white sm:text-lg">
              {video.title}
            </p>
            <p className="line-clamp-1 text-[0.7rem] text-gold/90">{video.subtitle}</p>
          </div>
        </div>
        <div className="relative min-h-0 flex-1 bg-black">
          {yt ? (
            <iframe
              title={video.title}
              src={`https://www.youtube.com/embed/${yt}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
              className="absolute inset-0 h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              allowFullScreen
            />
          ) : vimeo ? (
            <iframe
              title={video.title}
              src={`https://player.vimeo.com/video/${vimeo}?autoplay=1`}
              className="absolute inset-0 h-full w-full"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            />
          ) : file ? (
            // eslint-disable-next-line jsx-a11y/media-has-caption
            <video
              className="absolute inset-0 h-full w-full object-contain"
              src={mediaSrc(video.videoSrc, updatedAt)}
              controls
              autoPlay
              playsInline
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center">
              <p className="max-w-md text-sm text-white/80">
                Orbit mein is card ke liye YouTube / Vimeo link ya MP4 upload add karo — phir yahan fullscreen play hoga.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function VideoJournalSection() {
  const { journal, updatedAt } = useSiteContent();
  const [active, setActive] = useState<JournalVideo | null>(null);
  if (!journal?.visible) return null;

  return (
    <section className="relative border-t border-gold/15 px-4 pb-10 pt-6 sm:px-8 sm:pb-12 sm:pt-7 lg:px-10">
      <div className="mx-auto max-w-[88rem]">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-2 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-gold/70 sm:w-14" aria-hidden="true" />
            <span className="h-1 w-1 rotate-45 bg-gold" aria-hidden="true" />
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-gold sm:text-[0.72rem]">
              {journal.eyebrow}
            </p>
            <span className="h-1 w-1 rotate-45 bg-gold" aria-hidden="true" />
            <span className="h-px w-10 bg-gold/70 sm:w-14" aria-hidden="true" />
          </div>
          <h2 className="font-[family-name:var(--font-cormorant)] text-[clamp(1.85rem,5.4vw,3.2rem)] font-semibold leading-[1.12] tracking-tight">
            <span className="text-white">{journal.headlineBefore} </span>
            <span className="text-gold">{journal.headlineGold} </span>
            <span className="text-white">{journal.headlineAfter}</span>
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-[0.88rem] leading-relaxed text-white/78 sm:text-[0.95rem]">
            {journal.body}
          </p>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {(journal.videos ?? []).map((video) => (
            <button
              key={video.id}
              type="button"
              onClick={() => setActive(video)}
              className="group on-photo relative aspect-[16/10] overflow-hidden rounded-[0.85rem] border border-gold/35 text-left transition-transform duration-500 [@media(hover:hover)]:hover:scale-[1.02] hover:border-gold/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            >
              <MediaImage
                src={video.imageSrc}
                alt={video.imageAlt}
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 [@media(hover:hover)]:group-hover:scale-105"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/15"
                aria-hidden="true"
              />
              {/* Single gold play button — thumbnail images must stay clean (no baked-in play) */}
              <span
                className="pointer-events-none absolute left-1/2 top-1/2 flex h-[3.35rem] w-[3.35rem] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-[1.5px] border-gold bg-black/55 shadow-[0_0_20px_rgba(201,162,39,0.28)] transition-transform duration-300 [@media(hover:hover)]:group-hover:scale-110 sm:h-14 sm:w-14"
                aria-hidden="true"
              >
                <svg viewBox="0 0 24 24" className="ml-0.5 h-5 w-5 text-white sm:h-6 sm:w-6" fill="currentColor">
                  <path d="M9.4 7.6v8.8L17.2 12 9.4 7.6Z" />
                </svg>
              </span>
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4">
                <div className="min-w-0">
                  <p className="font-[family-name:var(--font-cormorant)] text-[1.15rem] font-semibold text-white sm:text-[1.25rem]">
                    {video.title}
                  </p>
                  <p className="mt-0.5 text-[0.75rem] text-gold">{video.subtitle}</p>
                </div>
                <p className="shrink-0 text-[0.72rem] text-white/85">{video.duration}</p>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-7 flex justify-center">
          <Link
            href={journal.ctaHref || "#"}
            className="focus-ring inline-flex items-center gap-2 rounded-md border border-gold/80 px-5 py-2.5 text-[0.78rem] font-semibold tracking-[0.1em] text-gold transition-colors hover:bg-gold/10"
          >
            {journal.ctaLabel} <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>

      {active ? (
        <VideoLightbox video={active} updatedAt={updatedAt} onClose={() => setActive(null)} />
      ) : null}
    </section>
  );
}

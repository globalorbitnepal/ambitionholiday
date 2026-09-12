"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import MediaImage from "@/components/MediaImage";
import type { SignatureImage } from "@/lib/content-types";

type Props = {
  images: SignatureImage[];
};

function GoldArrow({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={className} fill="none" aria-hidden="true">
      <path
        d="M7.2 4.8 12.4 10 7.2 15.2"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function SignatureGallery({ images }: Props) {
  const slots = images.slice(0, 6);
  const [start, setStart] = useState(0);

  const visibleCount = Math.min(3, slots.length);

  const move = useCallback(
    (dir: 1 | -1) => {
      if (slots.length <= 1) return;
      setStart((prev) => (prev + dir + slots.length) % slots.length);
    },
    [slots.length],
  );

  if (!slots.length) return null;

  const visible = Array.from({ length: visibleCount }, (_, i) => {
    const image = slots[(start + i) % slots.length];
    return { image, slot: i };
  });

  return (
    <div className="relative min-w-0 w-full">
      <div className="flex items-end justify-center gap-3 sm:gap-4 lg:gap-[1.15rem]">
        {visible.map(({ image, slot }, index) => {
          const featured = slot === 1 || visibleCount === 1;
          const href = image.href || "/luxury-treks";
          const showOnMobile = featured || visibleCount < 3;
          return (
            <Link
              key={`${image.id}-${index}`}
              href={href}
              className={`group relative shrink-0 overflow-hidden rounded-[1.35rem] border-[1.5px] border-[#e0c45a]/85 ${
                showOnMobile ? "block" : "hidden lg:block"
              } ${
                featured
                  ? "z-[1] h-[23.5rem] w-[14.6rem] shadow-[0_0_0_1px_rgba(224,196,90,0.5),0_18px_50px_rgba(0,0,0,0.42),0_0_38px_rgba(201,162,39,0.4)] xl:h-[26.25rem] xl:w-[16rem]"
                  : "h-[20.5rem] w-[12.6rem] shadow-[0_0_0_1px_rgba(224,196,90,0.28),0_14px_36px_rgba(0,0,0,0.35),0_0_22px_rgba(201,162,39,0.22)] xl:h-[22.75rem] xl:w-[13.85rem]"
              }`}
            >
              <MediaImage
                src={image.src}
                alt={image.alt}
                priority={index < 3}
                sizes="(max-width: 640px) 42vw, 260px"
                quality={86}
                className="pointer-events-none select-none object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 px-3.5 pb-3.5 pt-10 sm:px-4 sm:pb-4">
                <div className="min-w-0">
                  <p className="text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-[#e4c35a] sm:text-[0.62rem]">
                    {image.kicker}
                  </p>
                  <p className="mt-1 truncate text-[1.02rem] font-semibold tracking-tight text-white sm:text-[1.12rem]">
                    {image.title || image.alt}
                  </p>
                </div>
                <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#e0c45a]/80 text-[#e0c45a] transition-colors group-hover:bg-[#e0c45a]/15">
                  <GoldArrow className="h-3.5 w-3.5" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {slots.length > 1 ? (
        <>
          <button
            type="button"
            onClick={() => move(-1)}
            className="focus-ring absolute left-1 top-[46%] z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#e0c45a]/80 bg-black/45 text-[#e0c45a] backdrop-blur-md sm:left-2"
            aria-label="Previous packages"
          >
            <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" aria-hidden="true">
              <path d="M12.4 4.8 7.2 10l5.2 5.2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => move(1)}
            className="focus-ring absolute right-1 top-[46%] z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#e0c45a]/80 bg-black/45 text-[#e0c45a] backdrop-blur-md sm:right-2"
            aria-label="Next packages"
          >
            <GoldArrow className="h-4 w-4" />
          </button>
          <div className="mt-5 flex items-center justify-center gap-2">
            {slots.map((image, index) => (
              <button
                key={image.id}
                type="button"
                aria-label={`Show ${image.title || image.alt}`}
                onClick={() => setStart(index)}
                className={`h-1.5 rounded-full transition-all ${
                  index === start ? "w-7 bg-[#e0c45a]" : "w-2.5 bg-white/28 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}

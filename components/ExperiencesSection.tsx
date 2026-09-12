"use client";

import Link from "next/link";
import { useSiteContent } from "@/components/SiteContentProvider";
import MediaImage from "@/components/MediaImage";
import { mediaSrc } from "@/lib/media-src";

function PeakMark({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path
        d="m3.5 17.5 5.4-8.2 3.2 4.4 2.6-3.6L20.5 17.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path d="M4 19.2h16" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export default function ExperiencesSection() {
  const { experiences, updatedAt } = useSiteContent();
  if (!experiences?.visible) return null;

  const theme = experiences.theme;
  const gold = theme?.goldColor && !["#9a7b18", "#7a5e0c"].includes(theme.goldColor) ? theme.goldColor : "#e0c45a";
  const border =
    !theme?.borderColor || theme.borderColor.includes("154,123,24")
      ? "rgba(201,162,39,0.55)"
      : theme.borderColor;
  const textColor =
    !theme?.textColor || theme.textColor === "#151820" || theme.textColor === "#12151c"
      ? "#f7f4ef"
      : theme.textColor;
  const muted =
    !theme?.mutedTextColor || theme.mutedTextColor.includes("21,24,32")
      ? "rgba(247,244,239,0.78)"
      : theme.mutedTextColor;
  const cardBg =
    !theme?.cardBg || theme.cardBg.includes("255,250,240") || theme.cardBg.includes("255,252,247")
      ? "rgba(12,10,8,0.4)"
      : theme.cardBg;

  return (
    <section
      className="relative border-t px-4 pb-[max(2.5rem,env(safe-area-inset-bottom))] pt-10 sm:px-8 sm:pb-12 sm:pt-12 lg:px-10"
      style={{
        backgroundColor: "transparent",
        borderColor: border,
        color: textColor,
      }}
    >
      {theme?.backgroundImageSrc ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[38%] bg-cover bg-bottom bg-no-repeat opacity-25"
          style={{
            backgroundImage: `url(${mediaSrc(theme.backgroundImageSrc, updatedAt)})`,
          }}
        />
      ) : null}

      <div className="relative mx-auto max-w-[88rem]">
        <div className="mx-auto max-w-3xl text-center">
          <div
            className="mb-3 flex flex-wrap items-center justify-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.2em] sm:text-[0.72rem]"
            style={{ color: gold }}
          >
            <span className="h-px w-8 bg-current opacity-60 sm:w-12" aria-hidden="true" />
            <PeakMark className="h-3.5 w-3.5 shrink-0" />
            <span>{experiences.eyebrow}</span>
            <span aria-hidden="true">→</span>
            <span className="h-px w-8 bg-current opacity-60 sm:w-12" aria-hidden="true" />
          </div>

          <h2 className="font-[family-name:var(--font-cormorant)] text-[clamp(2rem,5.8vw,3.45rem)] font-semibold leading-[1.1] tracking-tight">
            <span style={{ color: textColor }}>
              {experiences.headlineWhite}{" "}
            </span>
            <em
              className="font-[family-name:var(--font-cormorant)] italic"
              style={{ color: gold }}
            >
              {experiences.headlineGold}
            </em>
          </h2>

          <p
            className="mx-auto mt-3 max-w-2xl text-[0.9rem] leading-relaxed sm:text-[0.98rem]"
            style={{ color: muted }}
          >
            {experiences.body}
          </p>
        </div>

        <div className="mt-9 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:mt-10 lg:grid-cols-4 lg:gap-5">
          {(experiences.cards ?? []).map((card) => (
            <article
              key={card.id}
              className="hl-card group flex h-full flex-col overflow-hidden rounded-[0.85rem] transition-transform duration-500 [@media(hover:hover)]:hover:-translate-y-1"
              style={{
                backgroundColor: cardBg,
                border: `1px solid ${border}`,
                backdropFilter: "blur(14px)",
                WebkitBackdropFilter: "blur(14px)",
              }}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <MediaImage
                  src={card.imageSrc}
                  alt={card.imageAlt}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 [@media(hover:hover)]:group-hover:scale-105"
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 to-transparent"
                  aria-hidden="true"
                />
              </div>

              <div className="flex flex-1 flex-col px-4 pb-5 pt-4 text-center sm:px-5">
                <h3
                  className="font-[family-name:var(--font-cormorant)] text-[1.35rem] font-semibold leading-snug sm:text-[1.45rem]"
                  style={{ color: textColor }}
                >
                  {card.title}
                </h3>
                {card.countLabel ? (
                  <p
                    className="mt-1 text-[0.68rem] font-semibold uppercase tracking-[0.14em]"
                    style={{ color: gold }}
                  >
                    {card.countLabel}
                  </p>
                ) : null}
                <p
                  className="mt-2.5 flex-1 text-[0.8rem] leading-relaxed sm:text-[0.84rem]"
                  style={{ color: muted }}
                >
                  {card.body}
                </p>
                <Link
                  href={card.href || "/luxury-treks"}
                  className="mx-auto mt-4 inline-flex items-center gap-1.5 border px-4 py-2 text-[0.68rem] font-semibold tracking-[0.12em] transition-colors hover:bg-gold/10"
                  style={{ borderColor: gold, color: gold }}
                >
                  {card.ctaLabel || "EXPLORE MORE"} <span aria-hidden="true">→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="relative mt-10 flex flex-col items-center sm:mt-12">
          <Link
            href={experiences.ctaHref || "/luxury-treks"}
            className="focus-ring inline-flex items-center gap-2.5 border px-7 py-3 text-[0.76rem] font-semibold tracking-[0.14em] transition-colors hover:bg-gold/10 sm:px-9 sm:text-[0.8rem]"
            style={{ borderColor: gold, color: gold }}
          >
            <PeakMark className="h-4 w-4" />
            {experiences.ctaLabel}
            <span aria-hidden="true">→</span>
          </Link>
          <div
            aria-hidden="true"
            className="mt-3 h-px w-[min(100%,22rem)]"
            style={{
              background: `linear-gradient(90deg, transparent, ${gold}, transparent)`,
              boxShadow: `0 0 18px ${gold}55`,
            }}
          />
        </div>
      </div>
    </section>
  );
}

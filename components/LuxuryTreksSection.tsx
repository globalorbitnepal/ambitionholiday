"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import MediaImage from "@/components/MediaImage";
import { useSiteContent } from "@/components/SiteContentProvider";
import type { JourneyCategoryIcon, JourneyPackage } from "@/lib/content-types";

function FilterIcon({ icon }: { icon: JourneyCategoryIcon | "all" }) {
  const cls = "h-[15px] w-[15px] shrink-0";
  if (icon === "helicopter") {
    return (
      <svg viewBox="0 0 24 24" className={cls} fill="none" aria-hidden="true">
        <path d="M4 7h16M12 7v3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        <path
          d="M7 14c.4-2 2.2-3.2 5-3.2s4.6 1.2 5 3.2H7Z"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
        <path d="M12 14v4M8 18h8M5 14H3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className={cls} fill="none" aria-hidden="true">
      <path d="m3 18 6.2-9.5 3.1 4.4L16 8l5 10H3Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 shrink-0 text-gold" fill="none" aria-hidden="true">
      <path
        d="M12 21s6.5-6.1 6.5-11A6.5 6.5 0 0 0 5.5 10c0 4.9 6.5 11 6.5 11Z"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <circle cx="12" cy="10" r="2" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 text-gold" fill="none" aria-hidden="true">
      <rect x="4" y="5" width="16" height="15" rx="2" stroke="currentColor" strokeWidth="1.7" />
      <path d="M8 3.5v4M16 3.5v4M4 10h16" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function PeakIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 text-gold" fill="none" aria-hidden="true">
      <path d="m3 18 6.2-9.5 3.1 4.4L16 8l5 10H3Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    </svg>
  );
}

function SignalIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 text-gold" fill="none" aria-hidden="true">
      <path d="M6 16v2M10 13v5M14 10v8M18 7v11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
      <path
        d="M2.5 12S6 6.5 12 6.5 21.5 12 21.5 12 18 17.5 12 17.5 2.5 12 2.5 12Z"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <circle cx="12" cy="12" r="2.4" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill={filled ? "currentColor" : "none"} aria-hidden="true">
      <path
        d="M12 20s-7-4.4-7-9.2A4.2 4.2 0 0 1 12 7.4a4.2 4.2 0 0 1 7 3.4C19 15.6 12 20 12 20Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GoldOrnament() {
  return (
    <div className="mb-4 flex items-center justify-center gap-3 text-gold" aria-hidden="true">
      <span className="h-px w-10 bg-gradient-to-r from-transparent to-current opacity-70 sm:w-16" />
      <svg viewBox="0 0 56 18" className="h-4 w-14" fill="none">
        <path
          d="M2 13.5 14 5.5 28 13.5 42 5.5 54 13.5"
          stroke="currentColor"
          strokeWidth="1.35"
          strokeLinejoin="round"
        />
        <circle cx="28" cy="9" r="2" fill="currentColor" />
      </svg>
      <span className="h-px w-10 bg-gradient-to-l from-transparent to-current opacity-70 sm:w-16" />
    </div>
  );
}

function PackageCard({
  pkg,
  saved,
  onToggleSave,
  priority,
}: {
  pkg: JourneyPackage;
  saved: boolean;
  onToggleSave: () => void;
  priority?: boolean;
}) {
  return (
    <article className="hl-card group relative flex h-full min-w-0 snap-start flex-col overflow-hidden rounded-[1.25rem] border border-gold/45">
      <span className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-gold/80 to-transparent" aria-hidden="true" />
      <span className="pointer-events-none absolute left-3 top-3 h-3.5 w-3.5 border-l border-t border-gold/70" aria-hidden="true" />
      <span className="pointer-events-none absolute right-3 top-3 h-3.5 w-3.5 border-r border-t border-gold/70" aria-hidden="true" />
      <span className="pointer-events-none absolute bottom-3 left-3 h-3.5 w-3.5 border-b border-l border-gold/55" aria-hidden="true" />
      <span className="pointer-events-none absolute bottom-3 right-3 h-3.5 w-3.5 border-b border-r border-gold/55" aria-hidden="true" />

      <div className="relative mx-3.5 mt-3.5 overflow-hidden rounded-[0.95rem] border border-gold/30 shadow-[0_10px_28px_rgba(120,90,28,0.12)]">
        <div className="relative aspect-[16/10] w-full sm:aspect-[16/9.4]">
          <MediaImage
            src={pkg.imageSrc}
            alt={pkg.imageAlt}
            sizes="(max-width: 640px) 86vw, (max-width: 1024px) 50vw, 640px"
            priority={priority}
            className="object-cover transition-transform duration-700 ease-out [@media(hover:hover)]:group-hover:scale-[1.04]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1a1610]/35 via-transparent to-white/10"
          />
        </div>

        {pkg.badge ? (
          <div className="absolute left-0 top-4">
            <span className="relative inline-flex items-center gap-1.5 bg-gold py-1.5 pl-3 pr-3.5 text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-[#1a1610] shadow-[2px_2px_0_rgba(80,60,10,0.22)]">
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
                <path d="m3 18 6.2-9.5 3.1 4.4L16 8l5 10H3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
              </svg>
              {pkg.badge}
              <span
                aria-hidden="true"
                className="absolute left-0 top-full border-r-[7px] border-t-[7px] border-r-transparent border-t-[#8d7014]"
              />
            </span>
          </div>
        ) : null}

        <button
          type="button"
          onClick={onToggleSave}
          aria-label={saved ? `Remove ${pkg.title} from saved` : `Save ${pkg.title}`}
          className={`focus-ring absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-[#1a1610]/50 text-white backdrop-blur-md transition-colors ${
            saved ? "text-gold" : "hover:text-gold"
          }`}
        >
          <HeartIcon filled={saved} />
        </button>
      </div>

      <div className="flex flex-1 flex-col px-4 pb-4 pt-4 sm:px-5 sm:pb-5">
        <h3 className="font-[family-name:var(--font-cormorant)] text-[1.55rem] font-semibold leading-tight tracking-tight text-white sm:text-[1.75rem]">
          {pkg.title}
        </h3>
        <p className="mt-0.5 font-[family-name:var(--font-cormorant)] text-[1.15rem] font-medium text-gold sm:text-[1.25rem]">
          {pkg.subtitle}
        </p>

        <p className="mt-2.5 flex items-center gap-1.5 text-[0.82rem] text-white/88">
          <PinIcon />
          {pkg.location}
        </p>

        <div className="mt-3.5 grid grid-cols-3 gap-1.5 rounded-xl border border-gold/20 bg-white/25 px-2 py-2.5 backdrop-blur-sm sm:gap-2 sm:px-3">
          <div className="flex min-w-0 items-start gap-1.5 sm:gap-2">
            <CalendarIcon />
            <div className="min-w-0">
              <p className="text-[0.72rem] font-medium leading-snug text-white sm:text-[0.78rem]">{pkg.days} Days</p>
            </div>
          </div>
          <div className="flex min-w-0 items-start gap-1.5 border-l border-gold/20 pl-1.5 sm:gap-2 sm:pl-3">
            <PeakIcon />
            <div className="min-w-0">
              <p className="text-[0.72rem] font-medium leading-snug text-white sm:text-[0.78rem]">{pkg.maxAltitude}</p>
              <p className="mt-0.5 text-[0.58rem] text-white/50 sm:text-[0.62rem]">Max Altitude</p>
            </div>
          </div>
          <div className="flex min-w-0 items-start gap-1.5 border-l border-gold/20 pl-1.5 sm:gap-2 sm:pl-3">
            <SignalIcon />
            <div className="min-w-0">
              <p className="text-[0.72rem] font-medium leading-snug text-white sm:text-[0.78rem]">{pkg.difficulty}</p>
              <p className="mt-0.5 text-[0.58rem] text-white/50 sm:text-[0.62rem]">Difficulty</p>
            </div>
          </div>
        </div>

        <p className="mt-3.5 line-clamp-4 text-[0.84rem] leading-relaxed text-white/72 sm:line-clamp-3 sm:text-[0.86rem]">
          {pkg.description}
        </p>

        <div className="mt-auto flex justify-end pt-4">
          <Link
            href={pkg.href}
            className="focus-ring inline-flex items-center gap-2 rounded-md border border-gold/80 bg-gold/10 px-3.5 py-2 text-[0.78rem] font-semibold tracking-wide text-gold transition-colors hover:border-gold hover:bg-gold/20"
          >
            <EyeIcon />
            View Package
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function LuxuryTreksSection() {
  const { journeys } = useSiteContent();
  const trackRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState("all");
  const [active, setActive] = useState(0);
  const [saved, setSaved] = useState<Record<string, boolean>>({});
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const filters = useMemo(
    () => [
      { id: "all", label: journeys.allLabel, icon: "all" as const },
      ...journeys.categories.map((cat) => ({
        id: cat.id,
        label: cat.label,
        icon: cat.icon,
      })),
    ],
    [journeys.allLabel, journeys.categories],
  );

  const packages = useMemo(
    () =>
      filter === "all"
        ? journeys.packages
        : journeys.packages.filter((pkg) => pkg.categoryIds.includes(filter)),
    [filter, journeys.packages],
  );

  useEffect(() => {
    if (filter !== "all" && !journeys.categories.some((cat) => cat.id === filter)) {
      setFilter("all");
    }
  }, [filter, journeys.categories]);

  const syncNav = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setCanPrev(el.scrollLeft > 8);
    setCanNext(el.scrollLeft < max - 8);
    const cards = Array.from(el.children) as HTMLElement[];
    if (!cards.length) {
      setActive(0);
      return;
    }
    const left = el.scrollLeft;
    let best = 0;
    let dist = Number.POSITIVE_INFINITY;
    cards.forEach((card, index) => {
      const d = Math.abs(card.offsetLeft - left);
      if (d < dist) {
        dist = d;
        best = index;
      }
    });
    setActive(best);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollTo({ left: 0 });
    const id = window.requestAnimationFrame(syncNav);
    return () => window.cancelAnimationFrame(id);
  }, [filter, syncNav]);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    syncNav();
    el.addEventListener("scroll", syncNav, { passive: true });
    window.addEventListener("resize", syncNav);
    return () => {
      el.removeEventListener("scroll", syncNav);
      window.removeEventListener("resize", syncNav);
    };
  }, [packages.length, syncNav]);

  const scrollByCard = (dir: -1 | 1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.children[0] as HTMLElement | undefined;
    const gap = 20;
    const step = card ? card.getBoundingClientRect().width + gap : el.clientWidth * 0.9;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  const scrollToIndex = (index: number) => {
    const el = trackRef.current;
    const card = el?.children[index] as HTMLElement | undefined;
    if (!el || !card) return;
    el.scrollTo({ left: card.offsetLeft, behavior: "smooth" });
  };

  if (!journeys.visible) return null;

  return (
    <section className="relative border-t border-gold/20 px-4 pb-6 pt-10 sm:px-8 sm:pb-8 sm:pt-12 lg:px-10">
      <div className="mx-auto max-w-[88rem]">
        <div className="hl-panel relative mx-auto max-w-3xl overflow-hidden rounded-[1.4rem] border border-gold/35 px-5 py-7 text-center sm:px-10 sm:py-9">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-10 top-0 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent"
          />
          <GoldOrnament />
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-gold sm:text-[0.74rem] sm:tracking-[0.26em]">
            {journeys.eyebrow}
          </p>
          <h2 className="mt-2.5 font-[family-name:var(--font-cormorant)] text-[clamp(1.95rem,5.6vw,3.5rem)] font-semibold leading-[1.1] tracking-tight">
            <span className="text-gold">{journeys.headlineGold}</span>
            <span className="text-white"> {journeys.headlineWhite}</span>
          </h2>
          <div className="mx-auto mt-3 h-px w-16 bg-gold/55" aria-hidden="true" />
          <p className="mt-3.5 text-[0.92rem] leading-relaxed text-white/80 sm:text-[1.02rem]">
            {journeys.line1}
          </p>
          <p className="mt-1 text-[0.9rem] leading-relaxed text-white/70 sm:text-[0.98rem]">
            {journeys.line2}
          </p>
        </div>

        <div className="mt-7 flex justify-center sm:mt-8">
          <div className="inline-flex max-w-full gap-2 overflow-x-auto rounded-full border border-gold/25 bg-white/20 p-1.5 backdrop-blur-md [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {filters.map((item) => {
              const on = filter === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setFilter(item.id)}
                  className={`focus-ring inline-flex shrink-0 items-center gap-2 rounded-full border px-3.5 py-2 text-[0.78rem] font-semibold transition-colors sm:px-4 ${
                    on
                      ? "border-gold bg-gold text-[#1a1610] shadow-[0_6px_18px_rgba(201,162,39,0.28)]"
                      : "border-transparent bg-transparent text-white hover:border-gold/50 hover:bg-white/25"
                  }`}
                >
                  <span className={on ? "text-[#1a1f27]" : "text-gold"}>
                    <FilterIcon icon={item.icon} />
                  </span>
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="relative mt-6 sm:mt-7">
          <button
            type="button"
            aria-label="Previous packages"
            disabled={!canPrev}
            onClick={() => scrollByCard(-1)}
            className={`focus-ring absolute left-0 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border sm:inline-flex ${
              canPrev
                ? "border-gold bg-gold text-[#1a1f27] hover:bg-gold-soft"
                : "border-gold/35 bg-white/70 text-gold/40"
            }`}
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
              <path d="M14.5 6 8.5 12l6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Next packages"
            disabled={!canNext}
            onClick={() => scrollByCard(1)}
            className={`focus-ring absolute right-0 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border sm:inline-flex ${
              canNext
                ? "border-gold bg-gold text-[#1a1f27] hover:bg-gold-soft"
                : "border-gold/35 bg-white/70 text-gold/40"
            }`}
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
              <path d="m9.5 6 6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div
            ref={trackRef}
            className="flex snap-x snap-mandatory gap-5 overflow-x-auto overscroll-x-contain [touch-action:pan-x_pan-y] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:px-12"
          >
            {packages.map((pkg, index) => (
              <div
                key={pkg.id}
                className="w-[min(86vw,22.75rem)] shrink-0 sm:w-[min(78vw,30rem)] lg:w-[calc(50%-0.625rem)]"
              >
                <PackageCard
                  pkg={pkg}
                  priority={index < 2}
                  saved={Boolean(saved[pkg.id])}
                  onToggleSave={() =>
                    setSaved((prev) => ({ ...prev, [pkg.id]: !prev[pkg.id] }))
                  }
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 flex justify-center">
          <div className="flex items-center gap-2" role="tablist" aria-label="Package slides">
            {packages.map((pkg, index) => (
              <button
                key={pkg.id}
                type="button"
                aria-label={`Show ${pkg.title}`}
                aria-current={index === active}
                onClick={() => scrollToIndex(index)}
                className={`h-2 rounded-full transition-all ${
                  index === active ? "w-2.5 bg-gold" : "w-2 bg-white/28 hover:bg-white/45"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

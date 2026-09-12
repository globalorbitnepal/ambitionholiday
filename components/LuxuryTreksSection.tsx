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
        <path d="M7 14c.4-2 2.2-3.2 5-3.2s4.6 1.2 5 3.2H7Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
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

function BadgeMark({ badge }: { badge: string }) {
  const key = badge.toLowerCase();
  if (key.includes("best")) {
    return (
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true">
        <path d="M12 3.2 14.4 8l5.4.7-3.9 3.7.9 5.4L12 15.6 7.2 17.8l.9-5.4L4.2 8.7 9.6 8 12 3.2Z" />
      </svg>
    );
  }
  if (key.includes("exclusive")) {
    return (
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
        <path d="M12 3.5 20.5 12 12 20.5 3.5 12 12 3.5Z" stroke="currentColor" strokeWidth="1.7" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
      <path d="M6 9.5 12 4l6 5.5v4.2L12 20 6 13.7V9.5Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
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
    <article className="journey-card group relative flex h-full min-w-0 flex-col overflow-hidden rounded-[1.55rem] border border-[#e0c45a]/80">
      <div className="relative mx-3 mt-3 overflow-hidden rounded-[1.05rem]">
        <div className="relative aspect-[16/10] w-full">
          <MediaImage
            src={pkg.imageSrc}
            alt={pkg.imageAlt}
            sizes="(max-width: 640px) 86vw, (max-width: 1024px) 50vw, 420px"
            priority={priority}
            quality={86}
            objectPosition="center 35%"
            className="object-cover"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-black/10" />
        </div>

        {pkg.badge ? (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-[#e4c35a] px-3 py-1 text-[0.62rem] font-bold uppercase tracking-[0.12em] text-[#1a1408] shadow-[0_6px_16px_rgba(0,0,0,0.28)]">
            <BadgeMark badge={pkg.badge} />
            {pkg.badge}
          </span>
        ) : null}

        <button
          type="button"
          onClick={onToggleSave}
          aria-label={saved ? `Remove ${pkg.title} from saved` : `Save ${pkg.title}`}
          className={`focus-ring absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/40 bg-black/35 text-white backdrop-blur-md ${
            saved ? "text-[#e4c35a]" : "hover:text-[#e4c35a]"
          }`}
        >
          <HeartIcon filled={saved} />
        </button>
      </div>

      <div className="flex flex-1 flex-col px-4 pb-4 pt-3.5 sm:px-5 sm:pb-5">
        <h3 className="text-[1.38rem] font-semibold leading-tight tracking-tight text-white sm:text-[1.5rem]">
          {pkg.title}
        </h3>
        <p className="mt-0.5 text-[0.95rem] font-medium text-[#e4c35a]">{pkg.subtitle}</p>

        <p className="mt-2 flex items-center gap-1.5 text-[0.8rem] text-[#efe9dc]/88">
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 shrink-0 text-[#e4c35a]" fill="none" aria-hidden="true">
            <path d="M12 21s6.5-6.1 6.5-11A6.5 6.5 0 0 0 5.5 10c0 4.9 6.5 11 6.5 11Z" stroke="currentColor" strokeWidth="1.7" />
            <circle cx="12" cy="10" r="2" stroke="currentColor" strokeWidth="1.7" />
          </svg>
          {pkg.location}
        </p>

        <div className="mt-3.5 grid grid-cols-3 gap-2">
          <div className="flex items-start gap-1.5">
            <svg viewBox="0 0 24 24" className="mt-0.5 h-4 w-4 text-[#e4c35a]" fill="none" aria-hidden="true">
              <rect x="4" y="5" width="16" height="15" rx="2" stroke="currentColor" strokeWidth="1.7" />
              <path d="M8 3.5v4M16 3.5v4M4 10h16" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            </svg>
            <p className="text-[0.78rem] font-medium text-white">{pkg.days} Days</p>
          </div>
          <div className="flex items-start gap-1.5">
            <svg viewBox="0 0 24 24" className="mt-0.5 h-4 w-4 text-[#e4c35a]" fill="none" aria-hidden="true">
              <path d="m3 18 6.2-9.5 3.1 4.4L16 8l5 10H3Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
            </svg>
            <div>
              <p className="text-[0.78rem] font-medium leading-tight text-white">{pkg.maxAltitude}</p>
              <p className="mt-0.5 text-[0.62rem] text-white/50">Max. Altitude</p>
            </div>
          </div>
          <div className="flex items-start gap-1.5">
            <svg viewBox="0 0 24 24" className="mt-0.5 h-4 w-4 text-[#e4c35a]" fill="none" aria-hidden="true">
              <path d="M6 16v2M10 13v5M14 10v8M18 7v11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            <div>
              <p className="text-[0.78rem] font-medium leading-tight text-white">{pkg.difficulty}</p>
              <p className="mt-0.5 text-[0.62rem] text-white/50">Difficulty</p>
            </div>
          </div>
        </div>

        <p className="mt-3.5 line-clamp-3 text-[0.84rem] leading-relaxed text-white/70">
          {pkg.description}
        </p>

        <div className="mt-auto pt-4">
          <Link
            href={pkg.href}
            className="focus-ring inline-flex items-center gap-2.5 rounded-full border border-[#e0c45a] px-4 py-2 text-[0.86rem] font-semibold text-[#e4c35a] transition-colors hover:bg-[#e0c45a]/12"
          >
            View Package
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-[#e0c45a]">
              <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
                <path d="M7.2 4.8 12.4 10 7.2 15.2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
              </svg>
            </span>
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
    <section className="journeys-section relative px-4 pb-8 pt-8 sm:px-8 sm:pb-10 sm:pt-10 lg:px-10">
      <div className="mx-auto max-w-[90rem]">
        <header className="mb-7 text-center sm:mb-8">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.26em] text-[#e0c45a]">
            {journeys.eyebrow}
          </p>
          <h2 className="journeys-display mt-2 text-[clamp(1.9rem,4.4vw,3.15rem)] font-semibold leading-[1.12] tracking-[-0.02em]">
            <span className="text-[#e4c35a]">{journeys.headlineGold}</span>{" "}
            <span className="text-white">{journeys.headlineWhite}</span>
          </h2>
        </header>

        <div className="flex justify-center">
          <div className="inline-flex max-w-full gap-1 overflow-x-auto rounded-full border border-[#e0c45a]/45 bg-black/35 p-1.5 backdrop-blur-md [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {filters.map((item) => {
              const on = filter === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setFilter(item.id)}
                  className={`focus-ring inline-flex shrink-0 items-center gap-2 rounded-full px-3.5 py-2 text-[0.78rem] font-semibold transition-colors sm:px-4 ${
                    on
                      ? "bg-[#e4c35a] text-[#1a1408] shadow-[0_8px_20px_rgba(201,162,39,0.35)]"
                      : "bg-transparent text-[#f4efe4] hover:bg-white/10"
                  }`}
                >
                  <span className={on ? "text-[#1a1408]" : "text-[#e4c35a]"}>
                    <FilterIcon icon={item.icon} />
                  </span>
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="relative mt-8 sm:px-14">
          <button
            type="button"
            aria-label="Previous packages"
            disabled={!canPrev}
            onClick={() => scrollByCard(-1)}
            className="focus-ring absolute left-0 top-[46%] z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#e0c45a]/85 bg-black/40 text-[#e4c35a] backdrop-blur-md sm:inline-flex disabled:opacity-40"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
              <path d="M14.5 6 8.5 12l6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Next packages"
            disabled={!canNext}
            onClick={() => scrollByCard(1)}
            className="focus-ring absolute right-0 top-[46%] z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#e0c45a]/85 bg-black/40 text-[#e4c35a] backdrop-blur-md sm:inline-flex disabled:opacity-40"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
              <path d="m9.5 6 6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>

          <div className="overflow-hidden">
            <div
              ref={trackRef}
              className="flex snap-x snap-mandatory gap-5 overflow-x-auto overscroll-x-contain [touch-action:pan-x_pan-y] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {packages.map((pkg, index) => (
                <div
                  key={pkg.id}
                  className="w-[min(88vw,22.5rem)] shrink-0 snap-start lg:w-[calc((100%-2.5rem)/3)]"
                >
                  <PackageCard
                    pkg={pkg}
                    priority={index < 3}
                    saved={Boolean(saved[pkg.id])}
                    onToggleSave={() =>
                      setSaved((prev) => ({ ...prev, [pkg.id]: !prev[pkg.id] }))
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-5 flex justify-center">
          <div className="flex items-center gap-2" role="tablist" aria-label="Package slides">
            {packages.map((pkg, index) => (
              <button
                key={pkg.id}
                type="button"
                aria-label={`Show ${pkg.title}`}
                aria-current={index === active}
                onClick={() => scrollToIndex(index)}
                className={`h-1.5 rounded-full transition-all ${
                  index === active ? "w-6 bg-[#e4c35a]" : "w-2 bg-white/28 hover:bg-white/45"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

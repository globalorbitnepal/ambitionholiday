"use client";

import { useMemo, useState, type ReactNode } from "react";
import Link from "next/link";
import { useSiteContent } from "@/components/SiteContentProvider";
import MediaImage from "@/components/MediaImage";
import { mediaSrc } from "@/lib/media-src";
import type {
  ExploreHubCardIcon,
  ExploreHubPillarIcon,
  ExploreHubTabId,
} from "@/lib/content-types";

const GOLD = "#e8d07a";

function PillarIcon({ icon, iconSrc }: { icon: ExploreHubPillarIcon; iconSrc?: string }) {
  const cls = "h-[1.35rem] w-[1.35rem]";
  if ((icon === "custom" || iconSrc) && iconSrc) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={mediaSrc(iconSrc)} alt="" className="h-6 w-6 object-contain" />
    );
  }
  if (icon === "people") {
    return (
      <svg viewBox="0 0 24 24" className={cls} fill="none" aria-hidden="true">
        <circle cx="8.2" cy="8" r="2.1" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="15.8" cy="8.4" r="1.8" stroke="currentColor" strokeWidth="1.5" />
        <path d="M4.6 17.4c.4-3 2.1-4.6 3.6-4.6s3.2 1.6 3.6 4.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M12.8 17.2c.3-2.4 1.6-3.6 2.9-3.6 1.4 0 2.7 1.4 3.1 3.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }
  if (icon === "shield") {
    return (
      <svg viewBox="0 0 24 24" className={cls} fill="none" aria-hidden="true">
        <path d="M12 4.4 18.4 6.6v5.2c0 3.6-2.5 6.4-6.4 8-3.9-1.6-6.4-4.4-6.4-8V6.6L12 4.4Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M9.4 12.1 11.2 14l3.6-3.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (icon === "leaf") {
    return (
      <svg viewBox="0 0 24 24" className={cls} fill="none" aria-hidden="true">
        <path d="M6.4 16.8c5.8-1.2 9.2-4.8 11.2-11-6.4 1.4-10.6 5.2-11.2 11Z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M7 16.2 16.6 7.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }
  if (icon === "headset") {
    return (
      <svg viewBox="0 0 24 24" className={cls} fill="none" aria-hidden="true">
        <path d="M6 12.2V11a6 6 0 0 1 12 0v1.2" stroke="currentColor" strokeWidth="1.5" />
        <rect x="4.4" y="11.2" width="3.2" height="4.8" rx="1.1" stroke="currentColor" strokeWidth="1.5" />
        <rect x="16.4" y="11.2" width="3.2" height="4.8" rx="1.1" stroke="currentColor" strokeWidth="1.5" />
        <path d="M19.6 16v.6a4 4 0 0 1-4 4h-1.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="12" cy="19.6" r="1" fill="currentColor" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className={cls} fill="none" aria-hidden="true">
      <path d="M12 4.4 19.4 12 12 19.6 4.6 12 12 4.4Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

function CardMetaIcon({ icon, iconSrc }: { icon: ExploreHubCardIcon; iconSrc?: string }) {
  const cls = "h-3.5 w-3.5";
  if ((icon === "custom" || iconSrc) && iconSrc) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={mediaSrc(iconSrc)} alt="" className="h-3.5 w-3.5 object-contain" />
    );
  }
  if (icon === "temple") {
    return (
      <svg viewBox="0 0 24 24" className={cls} fill="none" aria-hidden="true">
        <path d="M12 4.4 18.6 8H5.4L12 4.4Z" stroke="currentColor" strokeWidth="1.6" />
        <path d="M6.4 8.4h11.2V18H6.4V8.4Z" stroke="currentColor" strokeWidth="1.6" />
        <path d="M4.6 18h14.8" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    );
  }
  if (icon === "globe") {
    return (
      <svg viewBox="0 0 24 24" className={cls} fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="7.2" stroke="currentColor" strokeWidth="1.6" />
        <path d="M5.2 12h13.6M12 4.8c2.2 2.4 2.2 12 0 14.4M12 4.8C9.8 7.2 9.8 16.8 12 19.2" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    );
  }
  if (icon === "calendar") {
    return (
      <svg viewBox="0 0 24 24" className={cls} fill="none" aria-hidden="true">
        <rect x="4.4" y="6.2" width="15.2" height="13.2" rx="1.6" stroke="currentColor" strokeWidth="1.6" />
        <path d="M4.4 10h15.2M8 4.8v2.8M16 4.8v2.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }
  if (icon === "tag") {
    return (
      <svg viewBox="0 0 24 24" className={cls} fill="none" aria-hidden="true">
        <path d="M4.6 12.4 12.2 4.8h7.2v7.2L11.8 19.6 4.6 12.4Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <circle cx="16.2" cy="8.2" r="1.1" fill="currentColor" />
      </svg>
    );
  }
  if (icon === "tent") {
    return (
      <svg viewBox="0 0 24 24" className={cls} fill="none" aria-hidden="true">
        <path d="M4.4 18.4 12 5.6l7.6 12.8H4.4Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M12 18.4V9.6" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className={cls} fill="none" aria-hidden="true">
      <path d="M4.6 16.8 12 6.2l7.4 10.6H4.6Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M8.4 16.8 12 11.2l3.6 5.6" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

const TAB_ICONS: Record<ExploreHubTabId, ReactNode> = {
  destinations: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
      <path d="M4.8 16.8 12 6.4l7.2 10.4H4.8Z" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  ),
  types: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
      <rect x="5" y="6.2" width="5.2" height="5.2" rx="1" stroke="currentColor" strokeWidth="1.6" />
      <rect x="13.8" y="6.2" width="5.2" height="5.2" rx="1" stroke="currentColor" strokeWidth="1.6" />
      <rect x="5" y="14.2" width="5.2" height="5.2" rx="1" stroke="currentColor" strokeWidth="1.6" />
      <rect x="13.8" y="14.2" width="5.2" height="5.2" rx="1" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  ),
  duration: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
      <rect x="4.6" y="6" width="14.8" height="13.2" rx="1.6" stroke="currentColor" strokeWidth="1.6" />
      <path d="M4.6 10h14.8M8 4.6v2.8M16 4.6v2.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  offers: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
      <path d="M4.8 12.2 12.2 4.8h7v7L11.8 19.4 4.8 12.2Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <circle cx="16.2" cy="8.2" r="1.05" fill="currentColor" />
    </svg>
  ),
};

export default function ExploreHubSection() {
  const { exploreHub } = useSiteContent();
  const tabs = exploreHub.tabs;
  const [activeId, setActiveId] = useState<ExploreHubTabId>(tabs[0]?.id ?? "destinations");
  const active = useMemo(
    () => tabs.find((tab) => tab.id === activeId) ?? tabs[0],
    [tabs, activeId],
  );

  if (!exploreHub.visible || !active) return null;

  return (
    <section className="explore-hub relative isolate overflow-hidden">
      <div className="absolute inset-0">
        <MediaImage
          src={exploreHub.wallpaperSrc}
          alt=""
          sizes="100vw"
          className="h-full w-full object-cover"
          objectPosition="center 42%"
          quality={74}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,16,26,0.12)_0%,rgba(8,18,28,0.08)_45%,rgba(6,14,22,0.28)_100%)]" />
      </div>

      <div className="relative mx-auto max-w-[1280px] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="explore-hub-glass rounded-[2rem] px-4 py-6 sm:px-7 sm:py-8 lg:px-9 lg:py-9">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1.2fr)] lg:items-start">
            <div>
              <p className="text-[0.68rem] font-semibold tracking-[0.28em] text-[#d8c37a]">
                {exploreHub.eyebrow}
              </p>
              <h2 className="mt-2 font-[family-name:var(--font-cormorant)] text-[2.15rem] leading-[1.12] font-semibold text-white sm:text-[2.7rem]">
                {exploreHub.headline}
                <br />
                {exploreHub.headlineLine2}
              </h2>
              <p className="mt-3 max-w-md text-[0.95rem] leading-relaxed text-white/78">
                {exploreHub.body}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-x-3 gap-y-5 sm:grid-cols-5 sm:gap-0">
              {exploreHub.pillars.map((pillar, index) => (
                <div
                  key={pillar.id}
                  className={`flex flex-col items-center px-1 text-center sm:px-2 ${
                    index < exploreHub.pillars.length - 1
                      ? "sm:border-r sm:border-white/18"
                      : ""
                  }`}
                >
                  <span
                    className="flex h-12 w-12 items-center justify-center rounded-full border text-[color:var(--icon)]"
                    style={{
                      borderColor: "rgba(232,208,122,0.55)",
                      background: "rgba(255,255,255,0.06)",
                      color: GOLD,
                      boxShadow: "0 0 18px rgba(201,162,39,0.18)",
                    }}
                  >
                    <PillarIcon icon={pillar.icon} iconSrc={pillar.iconSrc} />
                  </span>
                  <p className="mt-2.5 max-w-[7.6rem] text-[0.72rem] font-medium leading-snug text-white/88">
                    {pillar.title}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap items-center gap-2 rounded-full border border-white/12 bg-black/10 p-1.5">
              {tabs.map((tab) => {
                const on = tab.id === active.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveId(tab.id)}
                    className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-[0.8rem] font-semibold transition ${
                      on
                        ? "bg-[#e7c45a] text-[#2a2414] shadow-[0_8px_20px_rgba(201,162,39,0.35)]"
                        : "text-white/80 hover:bg-white/8 hover:text-white"
                    }`}
                  >
                    <span className={on ? "text-[#2a2414]" : "text-[#e7c45a]"}>
                      {TAB_ICONS[tab.id]}
                    </span>
                    {tab.label}
                  </button>
                );
              })}
            </div>
            <p className="hidden font-[family-name:var(--font-cormorant)] text-[1.05rem] italic text-white/70 lg:block">
              {exploreHub.tabHint}
            </p>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {active.cards.map((card) => (
              <Link
                key={card.id}
                href={card.href}
                className="group relative isolate overflow-hidden rounded-[1.35rem] border border-white/18 shadow-[0_16px_40px_rgba(0,0,0,0.28)]"
              >
                <div className="relative aspect-[16/11]">
                  <MediaImage
                    src={card.imageSrc}
                    alt={card.imageAlt}
                    sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                    objectPosition="center 40%"
                    priority
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_12%,rgba(8,16,24,0.22)_58%,rgba(6,12,20,0.72)_100%)]" />
                </div>
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-4">
                  <div>
                    <h3 className="font-[family-name:var(--font-cormorant)] text-[1.45rem] leading-none font-semibold text-white">
                      {card.title}
                    </h3>
                    <p className="mt-1 text-[0.78rem] text-white/78">{card.subtitle}</p>
                    <p className="mt-2 inline-flex items-center gap-1.5 text-[0.72rem] font-medium text-white/80">
                      <span className="text-[#e7c45a]">
                        <CardMetaIcon icon={card.icon} iconSrc={card.iconSrc} />
                      </span>
                      {card.meta}
                    </p>
                  </div>
                  <span className="mb-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/35 bg-white/12 text-white backdrop-blur-md transition group-hover:border-[#e7c45a]/70 group-hover:text-[#e7c45a]">
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
                      <path d="M9 6.8 15.2 12 9 17.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-7 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
            <p className="text-[0.68rem] font-semibold tracking-[0.22em] text-white/45">
              {exploreHub.footLeft}
            </p>
            <Link
              href={exploreHub.ctaHref}
              className="inline-flex items-center gap-2 rounded-full border border-[#e7c45a]/80 bg-[rgba(20,28,22,0.35)] px-7 py-2.5 text-[0.92rem] font-semibold text-white shadow-[0_0_0_1px_rgba(231,196,90,0.15)] backdrop-blur-md transition hover:bg-[#e7c45a] hover:text-[#2a2414]"
            >
              {exploreHub.ctaLabel}
              <span aria-hidden="true">→</span>
            </Link>
            <p className="text-[0.68rem] font-semibold tracking-[0.22em] text-white/45">
              {exploreHub.footRight}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

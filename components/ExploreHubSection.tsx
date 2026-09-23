"use client";

import { useMemo, useState, type ReactNode } from "react";
import Link from "next/link";
import { useSiteContent } from "@/components/SiteContentProvider";
import MediaImage from "@/components/MediaImage";
import SectionWallpaper from "@/components/SectionWallpaper";
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
      <SectionWallpaper />

      <div className="explore-hub-shell relative mx-auto">
        <div className="explore-hub-glass">
          <div className="explore-hub-top">
            <div className="min-w-0">
              <p className="explore-hub-eyebrow">{exploreHub.eyebrow}</p>
              <h2 className="explore-hub-title font-[family-name:var(--font-cormorant)] font-semibold text-white">
                {exploreHub.headline}
                <br />
                {exploreHub.headlineLine2}
              </h2>
              <p className="explore-hub-body">{exploreHub.body}</p>
            </div>

            <div className="explore-hub-pillars">
              {exploreHub.pillars.map((pillar, index) => (
                <div
                  key={pillar.id}
                  className={`explore-hub-pillar ${
                    index < exploreHub.pillars.length - 1 ? "explore-hub-pillar-split" : ""
                  }`}
                >
                  <span className="explore-hub-pillar-icon" style={{ color: GOLD }}>
                    <PillarIcon icon={pillar.icon} iconSrc={pillar.iconSrc} />
                  </span>
                  <p>{pillar.title}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="explore-hub-tabs-row">
            <div className="explore-hub-tabs" role="tablist">
              {tabs.map((tab) => {
                const on = tab.id === active.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={on}
                    onClick={() => setActiveId(tab.id)}
                    className={`explore-hub-tab ${on ? "is-on" : ""}`}
                  >
                    <span className={on ? "text-[#2a2414]" : "text-[#e7c45a]"}>
                      {TAB_ICONS[tab.id]}
                    </span>
                    {tab.label}
                  </button>
                );
              })}
            </div>
            <p className="explore-hub-hint font-[family-name:var(--font-cormorant)]">
              {exploreHub.tabHint}
            </p>
          </div>

          <div className="explore-hub-cards">
            {active.cards.map((card) => (
              <Link key={card.id} href={card.href} className="explore-hub-card group">
                <div className="explore-hub-card-media">
                  <MediaImage
                    src={card.imageSrc}
                    alt={card.imageAlt}
                    sizes="(max-width: 700px) 100vw, (max-width: 1180px) 50vw, 25vw"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                    objectPosition="center 40%"
                    priority
                  />
                  <div className="explore-hub-card-shade" />
                </div>
                <div className="explore-hub-card-copy">
                  <div className="min-w-0">
                    <h3 className="font-[family-name:var(--font-cormorant)] font-semibold text-white">
                      {card.title}
                    </h3>
                    <p className="explore-hub-card-sub">{card.subtitle}</p>
                    <p className="explore-hub-card-meta">
                      <span className="text-[#e7c45a]">
                        <CardMetaIcon icon={card.icon} iconSrc={card.iconSrc} />
                      </span>
                      {card.meta}
                    </p>
                  </div>
                  <span className="explore-hub-card-go">
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
                      <path d="M9 6.8 15.2 12 9 17.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="explore-hub-foot">
            <p>{exploreHub.footLeft}</p>
            <Link href={exploreHub.ctaHref} className="explore-hub-cta">
              {exploreHub.ctaLabel}
              <span aria-hidden="true">→</span>
            </Link>
            <p>{exploreHub.footRight}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

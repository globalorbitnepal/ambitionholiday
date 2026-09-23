"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import MediaImage from "@/components/MediaImage";
import SiteFooter from "@/components/SiteFooter";
import DuskAtmosphere from "@/components/DuskAtmosphere";
import type { NepalContent, NepalPackage } from "@/lib/nepal-defaults";

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
      <rect x="4.2" y="5.4" width="15.6" height="14.2" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8 3.8v3.2M16 3.8v3.2M4.2 9.4h15.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function PeakIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
      <path
        d="m3.6 18 6.2-9.4 3.1 4.3L16.2 8l4.2 10H3.6Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PackageCard({ pkg, priority, cacheKey }: { pkg: NepalPackage; priority?: boolean; cacheKey?: string }) {
  const daysLabel = pkg.days === 1 ? "1 Day" : `${pkg.days} Days`;
  return (
    <Link href={pkg.href || "/contact"} className="nepal-pkg group">
      <MediaImage
        src={pkg.imageSrc}
        alt={pkg.imageAlt}
        sizes="(max-width: 760px) 100vw, (max-width: 1180px) 50vw, 33vw"
        className="nepal-pkg-photo"
        objectPosition="center 42%"
        priority={priority}
        quality={72}
        cacheKey={cacheKey}
      />
      <div className="nepal-pkg-shade" />
      {pkg.badge ? <span className="nepal-pkg-badge">{pkg.badge}</span> : null}
      <div className="nepal-pkg-body">
        <h3 className="font-[family-name:var(--font-cormorant)]">{pkg.title}</h3>
        <p className="nepal-pkg-meta">
          <span>
            <CalendarIcon />
            {daysLabel}
          </span>
          <span>
            <PeakIcon />
            {pkg.difficulty || "Moderate"}
          </span>
        </p>
        <p className="nepal-pkg-desc">{pkg.description || pkg.subtitle}</p>
        <span className="nepal-pkg-cta">
          View Details
          <span className="nepal-pkg-go" aria-hidden="true">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
              <path
                d="M9 6.8 15.2 12 9 17.2"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </span>
      </div>
    </Link>
  );
}

type Props = {
  page: NepalContent;
  coverAlt: string;
  tablistLabel: string;
  showCategories?: boolean;
  cacheKey?: string;
};

export default function DestinationCatalogPage({ page, coverAlt, tablistLabel, showCategories = false, cacheKey }: Props) {
  const categories = useMemo(
    () => (page.categories?.length ? page.categories : []),
    [page.categories],
  );
  const [activeId, setActiveId] = useState(categories[0]?.id || "");
  const active = useMemo(
    () => categories.find((cat) => cat.id === activeId) || categories[0],
    [activeId, categories],
  );
  const listed = useMemo(
    () => (showCategories ? active?.packages || [] : categories.flatMap((cat) => cat.packages || [])),
    [showCategories, active, categories],
  );
  const tabCount = categories.length;

  if (!listed.length && !active) return null;

  return (
    <main className="min-w-0 overflow-x-clip pb-[env(safe-area-inset-bottom)]">
      <section className="nepal-cover relative isolate overflow-hidden">
        <div className="absolute inset-0">
          <MediaImage
            src={page.coverSrc}
            alt={coverAlt}
            priority
            sizes="100vw"
            className="h-full w-full object-cover"
            objectPosition="center 46%"
            quality={80}
            cacheKey={cacheKey}
          />
          <div className="nepal-cover-shade" />
        </div>
        <Header />
        <div className="nepal-cover-copy">
          <p className="explore-hub-eyebrow">{page.eyebrow}</p>
          <h1 className="nepal-cover-title font-[family-name:var(--font-cormorant)]">{page.headline}</h1>
          <p className="nepal-cover-lead">{page.coverLead}</p>
        </div>
      </section>

      <section className="explore-hub visa-hub nepal-hub relative isolate overflow-hidden">
        <div className="absolute inset-0">
          <MediaImage
            src={page.wallpaperSrc || page.coverSrc}
            alt=""
            sizes="100vw"
            className="h-full w-full object-cover"
            objectPosition="center 38%"
            quality={68}
            cacheKey={cacheKey}
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,14,22,0.44)_0%,rgba(8,18,28,0.18)_40%,rgba(6,14,22,0.48)_100%)]" />
        </div>
        <div className="explore-hub-shell nepal-shell relative">
          <div className="explore-hub-glass contact-glass">
            <p className="explore-hub-eyebrow">{page.catalogEyebrow}</p>
            <h2 className="contact-brand font-[family-name:var(--font-cormorant)]">{page.catalogHeadline}</h2>
            <p className="contact-lead">{page.catalogLead}</p>
            {showCategories ? (
              <>
                <div
                  className={`explore-hub-tabs nepal-tabs ${tabCount === 2 ? "nepal-tabs-2" : ""}`}
                  role="tablist"
                  aria-label={tablistLabel}
                >
                  {categories.map((tab) => {
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
                        {tab.label}
                        <span className="nepal-tab-count">{tab.countLabel}</span>
                      </button>
                    );
                  })}
                </div>
                {page.tabHint ? (
                  <p className="explore-hub-hint font-[family-name:var(--font-cormorant)]">{page.tabHint}</p>
                ) : null}
              </>
            ) : null}
          </div>

          <div className="explore-hub-glass contact-glass">
            {showCategories && active ? (
              <div className="nepal-cat-head">
                <h3 className="about-h2 font-[family-name:var(--font-cormorant)]">{active.label}</h3>
                <p className="nepal-cat-count">{active.countLabel}</p>
              </div>
            ) : (
              <div className="nepal-cat-head">
                <h3 className="about-h2 font-[family-name:var(--font-cormorant)]">Luxury Packages</h3>
                <p className="nepal-cat-count">{listed.length} Packages</p>
              </div>
            )}
            <div className="nepal-pkg-grid nepal-pkg-grid-hd">
              {listed.map((pkg, index) => (
                <PackageCard key={pkg.id} pkg={pkg} priority={index < 3} cacheKey={cacheKey} />
              ))}
            </div>
          </div>

          <div className="explore-hub-glass contact-glass about-copy-panel visa-close">
            <h2 className="about-h2 font-[family-name:var(--font-cormorant)]">
              {page.closeTitle || "Craft it privately"}
            </h2>
            <p className="contact-lead">{page.closeBody}</p>
            <Link href={page.ctaHref || "/contact"} className="contact-submit">
              {page.ctaLabel}
            </Link>
          </div>
        </div>
      </section>

      <div className="home-light relative isolate [clip-path:inset(0)] text-[#f7f4ef]">
        <DuskAtmosphere />
        <SiteFooter />
      </div>
    </main>
  );
}

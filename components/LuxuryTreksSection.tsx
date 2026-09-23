"use client";

import Link from "next/link";
import MediaImage from "@/components/MediaImage";
import SectionWallpaper from "@/components/SectionWallpaper";
import { useSiteContent } from "@/components/SiteContentProvider";
import type { JourneyPackage } from "@/lib/content-types";

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
      <rect x="4.2" y="5.4" width="15.6" height="14.2" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8 3.8v3.2M16 3.8v3.2M4.2 9.4h15.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function AltitudeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
      <path d="m3.6 18 6.2-9.4 3.1 4.3L16.2 8l4.2 10H3.6Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

function DifficultyIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
      <path d="M4 16.6c2.4-1.6 4.2-4.8 4.2-7.2 0-2.6 1.6-4.4 3.8-4.4s3.8 1.8 3.8 4.4c0 2.4 1.8 5.6 4.2 7.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function PackageCard({ pkg, priority }: { pkg: JourneyPackage; priority?: boolean }) {
  const daysLabel = pkg.days === 1 ? "1 Day" : `${pkg.days} Days`;
  return (
    <Link href={pkg.href} className="jour-card group">
      <div className="jour-card-media">
        <MediaImage
          src={pkg.imageSrc}
          alt={pkg.imageAlt}
          sizes="(max-width: 700px) 100vw, (max-width: 1180px) 50vw, 25vw"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
          objectPosition="center 40%"
          priority={priority}
        />
        <div className="jour-card-shade" />
      </div>
      {pkg.badge ? <span className="jour-card-badge">{pkg.badge}</span> : null}
      <div className="jour-card-copy">
        <div className="min-w-0">
          <h3 className="font-[family-name:var(--font-cormorant)]">{pkg.title}</h3>
          <p className="jour-card-sub">{pkg.subtitle}</p>
          <p className="jour-card-desc">{pkg.description}</p>
        </div>
        <span className="jour-card-go" aria-hidden="true">
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
            <path d="M9 6.8 15.2 12 9 17.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
      <p className="jour-card-meta">
        <span>
          <CalendarIcon />
          {daysLabel}
        </span>
        <span>
          <AltitudeIcon />
          {pkg.maxAltitude}
        </span>
        <span>
          <DifficultyIcon />
          {pkg.difficulty}
        </span>
      </p>
    </Link>
  );
}

export default function LuxuryTreksSection() {
  const { journeys } = useSiteContent();
  if (!journeys.visible) return null;

  return (
    <section className="jour-hub explore-hub relative isolate overflow-hidden">
      <SectionWallpaper />

      <div className="explore-hub-shell relative">
        <div className="explore-hub-glass">
          <header className="jour-hub-head">
            <p className="explore-hub-eyebrow">{journeys.eyebrow}</p>
            <h2 className="jour-hub-title font-[family-name:var(--font-cormorant)]">
              <span>{journeys.headlineGold}</span> {journeys.headlineWhite}
            </h2>
            <p className="jour-hub-line1 font-[family-name:var(--font-cormorant)]">{journeys.line1}</p>
            <p className="jour-hub-line2">{journeys.line2}</p>
          </header>

          <div className="jour-grid">
            {journeys.packages.map((pkg, index) => (
              <PackageCard key={pkg.id} pkg={pkg} priority={index < 4} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

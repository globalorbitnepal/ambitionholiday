"use client";

import type { ReactNode } from "react";
import { OrbitMediaButtons } from "@/components/OrbitMediaPicker";
import OrbitThumb from "@/components/OrbitThumb";
import type { SiteContent } from "@/lib/content-types";
import type { DestShowcaseCard, HeaderNavContent } from "@/lib/header-nav";
import type { LuxuryMegaCountry, LuxuryMegaCountryId } from "@/lib/luxury-mega";
import { headerLogoSrc } from "@/lib/media-src";

const SIZE = {
  logo: "Recommended: 1200 × 320 px (or wider) · WebP/JPG · transparent or dark background",
  destCard: "Recommended: 800 × 640 px (5:4 ratio) · WebP · landscape crop centered",
  luxuryThumb: "Recommended: 720 × 420 px · WebP · sidebar country strip background",
  luxuryFlag: "Recommended: 128 × 128 px · WebP/PNG · square flag icon",
  luxuryPackage: "Recommended: 960 × 600 px (16:10) · WebP · tour card cover",
} as const;

function Card({
  title,
  hint,
  children,
}: {
  title: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-xl border border-white/10 bg-black/25 p-4 sm:p-5">
      <h3 className="font-[family-name:var(--font-cormorant)] text-xl font-semibold text-white">{title}</h3>
      {hint ? <p className="mt-1 text-xs leading-relaxed text-white/50">{hint}</p> : null}
      <div className="mt-4 space-y-4">{children}</div>
    </section>
  );
}

function ImageField({
  label,
  sizeHint,
  value,
  alt,
  onImage,
  onAlt,
  previewClass = "h-28",
}: {
  label: string;
  sizeHint: string;
  value: string;
  alt?: string;
  onImage: (src: string) => void;
  onAlt?: (alt: string) => void;
  previewClass?: string;
}) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
      <p className="text-sm font-semibold text-white">{label}</p>
      <p className="mt-0.5 text-[0.68rem] text-gold/85">{sizeHint}</p>
      <div className={`relative mt-3 overflow-hidden rounded-md border border-white/10 bg-[#0b1018] ${previewClass}`}>
        {value ? <OrbitThumb src={value} alt={alt || label} /> : null}
      </div>
      <p className="mt-2 truncate text-[0.65rem] text-white/40">{value || "No image selected"}</p>
      <div className="mt-3">
        <OrbitMediaButtons onPicked={(url) => onImage(url)} />
      </div>
      {onAlt ? (
        <label className="mt-3 block text-xs text-white/60">
          Alt text (accessibility)
          <input
            value={alt ?? ""}
            onChange={(e) => onAlt(e.target.value)}
            className="mt-1 w-full rounded-md border border-white/15 bg-black/35 px-2.5 py-2 text-sm text-white outline-none focus:border-gold/50"
          />
        </label>
      ) : null}
    </div>
  );
}

type Props = {
  content: SiteContent;
  onChange: (next: SiteContent) => void;
};

export default function OrbitHeaderEditor({ content, onChange }: Props) {
  const nav = content.headerNav;

  function patchNav(next: HeaderNavContent) {
    onChange({ ...content, headerNav: next });
  }

  function patchDestinations(destinations: DestShowcaseCard[]) {
    patchNav({ ...nav, destinations });
  }

  function patchLuxuryCountries(luxuryCountries: LuxuryMegaCountry[]) {
    patchNav({ ...nav, luxuryCountries });
  }

  function updateDest(index: number, patch: Partial<DestShowcaseCard>) {
    const destinations = nav.destinations.map((row, i) => (i === index ? { ...row, ...patch } : row));
    patchDestinations(destinations);
  }

  function updateCountry(id: LuxuryMegaCountryId, patch: Partial<LuxuryMegaCountry>) {
    const luxuryCountries = nav.luxuryCountries.map((row) =>
      row.id === id ? { ...row, ...patch } : row,
    );
    patchLuxuryCountries(luxuryCountries);
  }

  function updatePackage(
    countryId: LuxuryMegaCountryId,
    pkgIndex: number,
    patch: Partial<LuxuryMegaCountry["packages"][number]>,
  ) {
    const luxuryCountries = nav.luxuryCountries.map((country) => {
      if (country.id !== countryId) return country;
      const packages = country.packages.map((pkg, i) =>
        i === pkgIndex ? { ...pkg, ...patch } : pkg,
      );
      return { ...country, packages };
    });
    patchLuxuryCountries(luxuryCountries);
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-gold">Header page</p>
        <h2 className="mt-1 font-[family-name:var(--font-cormorant)] text-2xl font-semibold">
          Logo & navigation images
        </h2>
        <p className="mt-1.5 max-w-2xl text-sm text-white/55">
          Every image in the site header mega menus — Destinations cards and Luxury Tour & Trek panels.
          Upload replacements or pick from the media library. Save changes when finished.
        </p>
      </div>

      <Card title="Site logo" hint={SIZE.logo}>
        <div className="relative h-24 max-w-md overflow-hidden rounded-md border border-white/10 bg-black/40">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={headerLogoSrc(content.header.logoSrc, content.updatedAt)}
            alt="Logo preview"
            className="h-full w-full object-contain p-2"
          />
        </div>
        <OrbitMediaButtons
          onPicked={(url) => onChange({ ...content, header: { ...content.header, logoSrc: url } })}
        />
        <button
          type="button"
          className="text-xs text-white/55 underline hover:text-gold"
          onClick={() =>
            onChange({
              ...content,
              header: { ...content.header, logoSrc: "/images/ambition-holiday-logo.webp" },
            })
          }
        >
          Reset to default logo
        </button>
      </Card>

      <Card
        title="Destinations mega menu — 4 region cards"
        hint="Shown when visitors open Destinations in the header. Use the sizes below for sharp cards on desktop and mobile."
      >
        <div className="grid gap-4 lg:grid-cols-2">
          {nav.destinations.map((dest, index) => (
            <ImageField
              key={dest.id}
              label={`${dest.title} — ${dest.subtitle}`}
              sizeHint={SIZE.destCard}
              value={dest.imageSrc}
              alt={dest.imageAlt}
              onImage={(imageSrc) => updateDest(index, { imageSrc })}
              onAlt={(imageAlt) => updateDest(index, { imageAlt })}
              previewClass="aspect-[5/4] h-auto"
            />
          ))}
        </div>
      </Card>

      <Card
        title="Below-hero atmosphere wallpaper"
        hint="Shared dusk background on inner pages (not the hero video). Recommended: 2400 × 1350 px WebP, landscape."
      >
        <div className="relative h-32 overflow-hidden rounded-md border border-white/10 bg-black/40">
          <OrbitThumb
            src={content.atmosphere?.imageSrc || "/images/atmosphere/ebc-premium-section.webp"}
            alt=""
          />
        </div>
        <OrbitMediaButtons
          onPicked={(url) => onChange({ ...content, atmosphere: { imageSrc: url } })}
        />
      </Card>

      {nav.luxuryCountries.map((country) => (
        <Card
          key={country.id}
          title={`Luxury Tour & Trek — ${country.title}`}
          hint="Sidebar strip, flag circle, and six tour cards in the mega menu."
        >
          <div className="grid gap-4 md:grid-cols-2">
            <ImageField
              label="Country sidebar background"
              sizeHint={SIZE.luxuryThumb}
              value={country.thumbSrc}
              onImage={(thumbSrc) => updateCountry(country.id, { thumbSrc })}
              previewClass="aspect-[16/10] h-auto"
            />
            <ImageField
              label="Flag icon (circle)"
              sizeHint={SIZE.luxuryFlag}
              value={country.flagSrc}
              onImage={(flagSrc) => updateCountry(country.id, { flagSrc })}
              previewClass="aspect-square h-32 w-32"
            />
          </div>
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-white/70">
            Tour cards ({country.packages.length})
          </p>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {country.packages.map((pkg, pkgIndex) => (
              <ImageField
                key={`${country.id}-${pkg.title}`}
                label={pkg.title}
                sizeHint={SIZE.luxuryPackage}
                value={pkg.imageSrc}
                alt={pkg.imageAlt}
                onImage={(imageSrc) => updatePackage(country.id, pkgIndex, { imageSrc })}
                onAlt={(imageAlt) => updatePackage(country.id, pkgIndex, { imageAlt })}
                previewClass="aspect-[16/10] h-auto"
              />
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
}

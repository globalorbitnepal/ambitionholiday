import { DEST_SHOWCASE } from "@/lib/dest-showcase";
import {
  LUXURY_MEGA_COUNTRIES,
  LUXURY_MEGA_PACKAGE_COUNT,
  type LuxuryMegaCountry,
  type LuxuryMegaCountryId,
  type LuxuryMegaPackage,
} from "@/lib/luxury-mega";

export type DestShowcaseCard = {
  id: string;
  title: string;
  subtitle: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
};

export type HeaderNavContent = {
  destinations: DestShowcaseCard[];
  luxuryCountries: LuxuryMegaCountry[];
};

export const DEFAULT_HEADER_NAV: HeaderNavContent = {
  destinations: DEST_SHOWCASE.map((item) => ({ ...item })),
  luxuryCountries: structuredClone(LUXURY_MEGA_COUNTRIES),
};

function mergeDestinations(
  parsed?: DestShowcaseCard[],
): DestShowcaseCard[] {
  return DEFAULT_HEADER_NAV.destinations.map((fallback, index) => {
    const row = parsed?.[index];
    if (!row) return { ...fallback };
    return {
      ...fallback,
      ...row,
      id: row.id || fallback.id,
      href: row.href || fallback.href,
      imageSrc: row.imageSrc || fallback.imageSrc,
      imageAlt: row.imageAlt || fallback.imageAlt,
    };
  });
}

function megaHrefKey(href: string) {
  return (href || "").replace(/^\//, "").split("?")[0].toLowerCase();
}

/** Match CMS rows to code defaults by URL — never by slot index (prevents duplicates when a new package is inserted). */
function mergePackages(
  parsed?: LuxuryMegaPackage[],
  fallback: LuxuryMegaPackage[] = [],
): LuxuryMegaPackage[] {
  const parsedByHref = new Map<string, LuxuryMegaPackage>();
  for (const row of parsed ?? []) {
    const key = megaHrefKey(row.href);
    if (!key || !row.title?.trim()) continue;
    parsedByHref.set(key, row);
  }

  const out: LuxuryMegaPackage[] = [];
  const seen = new Set<string>();

  for (const base of fallback) {
    if (out.length >= LUXURY_MEGA_PACKAGE_COUNT) break;
    const key = megaHrefKey(base.href);
    if (!key || seen.has(key)) continue;
    const row = parsedByHref.get(key);
    seen.add(key);
    out.push(
      row
        ? {
            ...base,
            ...row,
            href: row.href || base.href,
            imageSrc: row.imageSrc || base.imageSrc,
            imageAlt: row.imageAlt || base.imageAlt,
          }
        : { ...base },
    );
  }

  for (const row of parsed ?? []) {
    if (out.length >= LUXURY_MEGA_PACKAGE_COUNT) break;
    const key = megaHrefKey(row.href);
    if (!key || seen.has(key) || !row.title?.trim()) continue;
    seen.add(key);
    out.push({ ...row });
  }

  return out.filter((pkg) => pkg.title.trim().length > 0);
}

function mergeLuxuryCountries(parsed?: LuxuryMegaCountry[]): LuxuryMegaCountry[] {
  return DEFAULT_HEADER_NAV.luxuryCountries.map((fallback) => {
    const row = parsed?.find((c) => c.id === fallback.id);
    if (!row) return { ...fallback, packages: [...fallback.packages] };
    return {
      ...fallback,
      ...row,
      id: fallback.id,
      href: row.href || fallback.href,
      flagSrc: row.flagSrc || fallback.flagSrc,
      thumbSrc: row.thumbSrc || fallback.thumbSrc,
      packages: mergePackages(row.packages, fallback.packages),
    };
  });
}

export function mergeHeaderNav(parsed?: Partial<HeaderNavContent>): HeaderNavContent {
  return {
    destinations: mergeDestinations(parsed?.destinations),
    luxuryCountries: mergeLuxuryCountries(parsed?.luxuryCountries),
  };
}

export function luxuryCountryById(
  countries: LuxuryMegaCountry[],
  id: LuxuryMegaCountryId,
): LuxuryMegaCountry {
  return countries.find((c) => c.id === id) ?? countries[0];
}

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

function mergePackages(
  parsed?: LuxuryMegaPackage[],
  fallback: LuxuryMegaPackage[] = [],
): LuxuryMegaPackage[] {
  const length = Math.min(
    LUXURY_MEGA_PACKAGE_COUNT,
    Math.max(fallback.length, parsed?.length ?? 0),
  );
  return Array.from({ length }, (_, i) => {
    const base = fallback[i];
    const row = parsed?.[i];
    if (!base && row) return { ...row };
    if (!row && base) return { ...base };
    if (!base && !row) {
      return {
        title: "",
        days: "",
        difficulty: "",
        href: "/nepal",
        imageSrc: fallback[0]?.imageSrc || "/images/nepal/nepal-cover.webp",
        imageAlt: "",
      };
    }
    return {
      ...base,
      ...row,
      href: row!.href || base!.href,
      imageSrc: row!.imageSrc || base!.imageSrc,
      imageAlt: row!.imageAlt || base!.imageAlt,
    };
  }).filter((pkg) => pkg.title.trim().length > 0);
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

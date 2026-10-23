import {
  isAmaDablamPackage,
  isEbcHelicopterTourPackage,
  isEverestPanoramaPackage,
  isEverestViewPackage,
  isGhorepaniPoonhillLuxuryPackage,
  isPoonHillLuxuryPackage,
  type TrekPackage,
} from "@/lib/trip-packages";

export type TrekTocItem = { id: string; label: string };

/** Labels aligned with the Everest View Luxury Trek section nav (reference). */
export const PANORAMA_EXTENDED_TOC: TrekTocItem[] = [
  { id: "overview", label: "Overview" },
  { id: "book", label: "Availability" },
  { id: "highlights", label: "Highlights" },
  { id: "why-us", label: "Why us" },
  { id: "trip-info", label: "Trip info" },
  { id: "the-journey", label: "The Journey" },
  { id: "about", label: "About" },
  { id: "itinerary", label: "Itinerary" },
  { id: "trip-map", label: "Trip Map" },
  { id: "altitude", label: "Altitude" },
  { id: "weather", label: "Weather" },
  { id: "includes", label: "Includes" },
  { id: "trip-gallery", label: "Gallery" },
  { id: "packing", label: "Packing" },
  { id: "flights", label: "Flights" },
  { id: "faqs", label: "FAQs" },
];

export function isPremiumKhumbuTrekPackage(pkg: Pick<TrekPackage, "id" | "slug" | "catalogId">) {
  return (
    isEverestViewPackage(pkg) ||
    isEverestPanoramaPackage(pkg) ||
    isAmaDablamPackage(pkg) ||
    isPoonHillLuxuryPackage(pkg) ||
    isGhorepaniPoonhillLuxuryPackage(pkg)
  );
}

/** Everest View / Panorama / helicopter day tours — same title + booking layout on the public page. */
export function isPremiumNepalPackagePage(pkg: Pick<TrekPackage, "id" | "slug" | "catalogId">) {
  return isPremiumKhumbuTrekPackage(pkg) || isEbcHelicopterTourPackage(pkg);
}

/** Everest Panorama keeps 16 sections; other treks use the provided standard list. */
export function buildPackageSectionToc(
  pkg: TrekPackage,
  show: Record<string, boolean>,
  hasJourneyNav: boolean,
  standardToc: TrekTocItem[],
): TrekTocItem[] {
  const source =
    hasJourneyNav && (isEverestPanoramaPackage(pkg) || isAmaDablamPackage(pkg))
      ? PANORAMA_EXTENDED_TOC
      : standardToc;
  return source.filter((item) => show[item.id]);
}

/** Horizontal sticky section nav on viewports below desktop (reference + Panorama). */
export function useScrollableSectionNav(
  pkg: Pick<TrekPackage, "id" | "slug" | "catalogId">,
  hasJourneyNav: boolean,
) {
  return isPremiumKhumbuTrekPackage(pkg) || isEbcHelicopterTourPackage(pkg) || hasJourneyNav;
}

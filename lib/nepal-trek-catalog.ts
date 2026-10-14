import type { JourneyPackage } from "@/lib/content-types";
import type { LuxuryMegaPackage } from "@/lib/luxury-mega";
import type { NepalContent, NepalPackage } from "@/lib/nepal-defaults";
import type { SiteContent } from "@/lib/content-types";
import {
  cardLinkedToPackage,
  enrichCatalogCard,
  findPublishedTripForCard,
  tripPath,
  type TrekPackage,
} from "@/lib/trip-packages";

export const NEPAL_TREKKING_CATEGORY_ID = "trekking";

export function nepalTrekkingCategory(nepal: NepalContent) {
  return nepal.categories?.find((cat) => cat.id === NEPAL_TREKKING_CATEGORY_ID);
}

/** Catalog cards on the Nepal trekking tab that have a published trek page. */
export function publishedNepalTrekCatalogCards(nepal: NepalContent, tripPackages: TrekPackage[]): NepalPackage[] {
  const trekking = nepalTrekkingCategory(nepal);
  if (!trekking?.packages?.length) return [];
  return trekking.packages
    .map((card) => enrichCatalogCard(card, tripPackages))
    .filter((card) => Boolean(findPublishedTripForCard(card, tripPackages)));
}

function packageCountLabel(count: number) {
  if (count <= 0) return "Packages";
  return count === 1 ? "1 Package" : `${count} Packages`;
}

export function catalogCardToJourney(card: NepalPackage): JourneyPackage {
  const days = typeof card.days === "number" ? card.days : parseInt(String(card.days), 10) || 0;
  return {
    id: card.id,
    title: card.title,
    subtitle: card.subtitle || "Luxury Package",
    location: "Nepal",
    categoryIds: ["everest"],
    badge: card.badge,
    days,
    maxAltitude: "",
    difficulty: card.difficulty,
    description: card.description || card.subtitle,
    href: card.href,
    imageSrc: card.imageSrc,
    imageAlt: card.imageAlt,
  };
}

export function catalogCardToMega(card: NepalPackage): LuxuryMegaPackage {
  const days = typeof card.days === "number" ? card.days : parseInt(String(card.days), 10) || 0;
  const daysLabel = days === 1 ? "1 Day" : `${days} Days`;
  return {
    title: card.title,
    days: daysLabel,
    difficulty: card.difficulty || "Moderate",
    href: card.href,
    imageSrc: card.imageSrc,
    imageAlt: card.imageAlt,
  };
}

/** Trip package pages listed under Nepal → Luxury Trekking (admin sidebar + public catalogs). */
export function tripPackagesForNepalTrekkingCatalog(nepal: NepalContent, tripPackages: TrekPackage[]): TrekPackage[] {
  const trekking = nepalTrekkingCategory(nepal);
  if (!trekking?.packages?.length) return [];
  const seen = new Set<string>();
  const ordered: TrekPackage[] = [];
  for (const card of trekking.packages) {
    const trip = findPublishedTripForCard(card, tripPackages);
    if (!trip || trip.status !== "published" || seen.has(trip.id)) continue;
    seen.add(trip.id);
    ordered.push(trip);
  }
  return ordered;
}

export function isNepalTrekkingAdminPackage(pkg: TrekPackage, nepal: NepalContent) {
  const trekking = nepalTrekkingCategory(nepal);
  if (!trekking) return false;
  return trekking.packages.some((card) => cardLinkedToPackage(card, pkg));
}

/** One public Nepal trekking list → Nepal page, homepage journeys, header mega menu. */
export function syncNepalTrekkingCatalogSurfaces(content: SiteContent): SiteContent {
  const publishedCards = publishedNepalTrekCatalogCards(content.nepal, content.tripPackages).map((card) => {
    const trip = findPublishedTripForCard(card, content.tripPackages);
    if (!trip) return card;
    return {
      ...card,
      title: trip.title,
      subtitle: trip.subtitle || card.subtitle,
      description: trip.subtitle || card.description,
      badge: trip.badge || card.badge,
    };
  });
  const trekking = nepalTrekkingCategory(content.nepal);
  const countLabel = packageCountLabel(publishedCards.length);

  const nepal: NepalContent = {
    ...content.nepal,
    tabHint:
      publishedCards.length <= 2
        ? "Private Himalayan treks — published packages only."
        : content.nepal.tabHint,
    categories: trekking
      ? [
          {
            ...trekking,
            packages: publishedCards,
            countLabel,
          },
        ]
      : content.nepal.categories,
  };

  const journeyPackages = publishedCards.map((card) => {
    const journey = catalogCardToJourney(card);
    const trip = findPublishedTripForCard(card, content.tripPackages);
    if (trip) {
      journey.subtitle = trip.subtitle || journey.subtitle;
      journey.badge = trip.badge || journey.badge;
      if (trip.maxAltitude) {
        journey.maxAltitude = trip.maxAltitude.split("/")[0].trim();
      }
    }
    return journey;
  });
  const megaPackages = publishedCards.map(catalogCardToMega);

  const headerNav = content.headerNav
    ? {
        ...content.headerNav,
        luxuryCountries: content.headerNav.luxuryCountries.map((country) =>
          country.id === "nepal"
            ? {
                ...country,
                countLabel,
                packages: megaPackages,
              }
            : country,
        ),
      }
    : content.headerNav;

  return {
    ...content,
    nepal,
    journeys: {
      ...content.journeys,
      packages: journeyPackages.length ? journeyPackages : content.journeys.packages,
    },
    headerNav,
  };
}

export function ensureNepalTrekkingCatalogCard(content: SiteContent, pkg: TrekPackage): SiteContent {
  if (pkg.country !== "nepal" || pkg.status !== "published") return content;
  const trekking = nepalTrekkingCategory(content.nepal);
  if (!trekking) return content;
  if (trekking.packages.some((card) => cardLinkedToPackage(card, pkg))) return content;

  const newCard: NepalPackage = {
    id: pkg.catalogId || pkg.id,
    title: pkg.title,
    days: pkg.days,
    subtitle: pkg.subtitle,
    difficulty: pkg.difficulty,
    description: pkg.subtitle,
    badge: pkg.badge || "",
    href: tripPath(pkg),
    imageSrc: pkg.heroSrc,
    imageAlt: pkg.heroAlt || pkg.title,
  };

  const categories = content.nepal.categories.map((cat) =>
    cat.id === NEPAL_TREKKING_CATEGORY_ID
      ? {
          ...cat,
          packages: [...cat.packages, newCard],
          countLabel: packageCountLabel(cat.packages.length + 1),
        }
      : cat,
  );

  return syncNepalTrekkingCatalogSurfaces({
    ...content,
    nepal: { ...content.nepal, categories },
  });
}

import type { JourneyPackage } from "@/lib/content-types";
import type { LuxuryMegaPackage } from "@/lib/luxury-mega";
import { DEFAULT_NEPAL, type NepalContent, type NepalPackage } from "@/lib/nepal-defaults";
import type { SiteContent } from "@/lib/content-types";
import {
  cardLinkedToPackage,
  enrichCatalogCard,
  findPublishedTripForCard,
  isEbcHelicopterTourPackage,
  tripPath,
  type TrekPackage,
} from "@/lib/trip-packages";
import { LUXURY_MEGA_PACKAGE_COUNT } from "@/lib/luxury-mega";

export const NEPAL_TREKKING_CATEGORY_ID = "trekking";

/** Merge saved Nepal CMS data with code defaults for Luxury Trekking (new catalog ids append in order). */
export function coerceNepalContent(savedRaw?: Partial<NepalContent>): NepalContent {
  const saved = { ...DEFAULT_NEPAL, ...savedRaw };
  const cats = saved.categories?.length ? saved.categories : DEFAULT_NEPAL.categories;
  const defById = new Map(DEFAULT_NEPAL.categories.flatMap((cat) => cat.packages.map((pkg) => [pkg.id, pkg])));
  return {
    ...saved,
    coverSrc: saved.coverSrc || DEFAULT_NEPAL.coverSrc,
    wallpaperSrc: saved.wallpaperSrc || DEFAULT_NEPAL.wallpaperSrc,
    closeTitle: saved.closeTitle || DEFAULT_NEPAL.closeTitle,
    closeBody: saved.closeBody || DEFAULT_NEPAL.closeBody,
    categories: cats.map((cat) => {
      const defCat = DEFAULT_NEPAL.categories.find((c) => c.id === cat.id);
      const syncFromDefaults = cat.id === NEPAL_TREKKING_CATEGORY_ID && defCat?.packages?.length;
      const packageList = syncFromDefaults ? defCat!.packages : cat.packages || [];
      return {
        ...cat,
        countLabel: syncFromDefaults ? defCat!.countLabel : cat.countLabel,
        packages: packageList.map((pkg) => {
          const savedPkg = (cat.packages || []).find((p) => p.id === pkg.id);
          const merged = savedPkg ? { ...pkg, ...savedPkg } : pkg;
          const fallback = defById.get(merged.id) ?? defById.get(pkg.id);
          return {
            ...fallback,
            ...merged,
            badge: merged.badge ?? fallback?.badge ?? "",
            difficulty: merged.difficulty || fallback?.difficulty || "Moderate",
            description: merged.description || fallback?.description || merged.subtitle,
            href:
              fallback?.href &&
              !fallback.href.includes("interest=") &&
              (merged.href || "").includes("interest=")
                ? fallback.href
                : merged.href || fallback?.href || "",
          };
        }),
      };
    }),
  };
}

export function nepalTrekkingCategory(nepal: NepalContent) {
  return nepal.categories?.find((cat) => cat.id === NEPAL_TREKKING_CATEGORY_ID);
}

/** Canonical slot order for Nepal header / journeys — new packages are appended here, never inserted at the top. */
export function defaultNepalTrekkingCatalogOrder(): string[] {
  return (
    DEFAULT_NEPAL.categories
      .find((cat) => cat.id === NEPAL_TREKKING_CATEGORY_ID)
      ?.packages.map((card) => card.id) ?? []
  );
}

/** Keep flagship cards in catalog order; any extra published cards follow at the end (3rd, 4th, …). */
export function nepalCatalogDefaultCard(cardId: string): NepalPackage | undefined {
  for (const cat of DEFAULT_NEPAL.categories) {
    const hit = cat.packages.find((p) => p.id === cardId);
    if (hit) return hit;
  }
  return undefined;
}

export function orderNepalTrekCatalogCards(cards: NepalPackage[]): NepalPackage[] {
  const rank = new Map(defaultNepalTrekkingCatalogOrder().map((id, index) => [id, index]));
  const known: NepalPackage[] = [];
  const extras: NepalPackage[] = [];
  for (const card of cards) {
    if (rank.has(card.id)) known.push(card);
    else extras.push(card);
  }
  known.sort((a, b) => (rank.get(a.id) ?? 0) - (rank.get(b.id) ?? 0));
  return [...known, ...extras];
}

/** Catalog cards on the Nepal trekking tab that have a published trek page. */
export function publishedNepalTrekCatalogCards(nepal: NepalContent, tripPackages: TrekPackage[]): NepalPackage[] {
  const trekking = nepalTrekkingCategory(nepal);
  if (!trekking?.packages?.length) return [];
  const published = trekking.packages
    .map((card) => enrichCatalogCard(card, tripPackages))
    .filter((card) => Boolean(findPublishedTripForCard(card, tripPackages)));
  return orderNepalTrekCatalogCards(published);
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
    const catalogDef = nepalCatalogDefaultCard(card.id);
    if (!trip) return card;
    return {
      ...card,
      title: trip.title,
      subtitle: catalogDef?.subtitle || card.subtitle,
      description: catalogDef?.description || catalogDef?.subtitle || card.description,
      badge: trip.badge || card.badge,
    };
  });
  const trekking = nepalTrekkingCategory(content.nepal);
  const countLabel = packageCountLabel(publishedCards.length);

  const nepal: NepalContent = {
    ...content.nepal,
    tabHint:
      publishedCards.length <= 2
        ? "Private Himalayan treks and day experiences — published packages only."
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
    const catalogDef = nepalCatalogDefaultCard(card.id);
    journey.subtitle = catalogDef?.subtitle || card.subtitle || journey.subtitle;
    journey.description = "";
    if (trip) {
      journey.badge = trip.badge || journey.badge;
      if (isEbcHelicopterTourPackage(trip)) {
        journey.maxAltitude = trip.startEndLabel || "Kathmandu";
      } else if (trip.maxAltitude) {
        journey.maxAltitude = trip.maxAltitude.split("/")[0].trim();
      }
    }
    return journey;
  });
  const megaPackages = publishedCards.map(catalogCardToMega).slice(0, LUXURY_MEGA_PACKAGE_COUNT);

  const headerNav = content.headerNav
    ? {
        ...content.headerNav,
        luxuryCountries: content.headerNav.luxuryCountries.map((country) =>
          country.id === "nepal"
            ? {
                ...country,
                countLabel,
                packages: megaPackages.slice(0, LUXURY_MEGA_PACKAGE_COUNT),
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

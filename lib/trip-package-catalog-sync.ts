import type { JourneyPackage, SiteContent } from "@/lib/content-types";
import type { NepalContent } from "@/lib/nepal-defaults";
import {
  cardLinkedToPackage,
  enrichCatalogCard,
  resolveCatalogHref,
  tripPath,
  type TrekPackage,
} from "@/lib/trip-packages";

function rewriteDestCatalog(dest: NepalContent, packages: TrekPackage[]): NepalContent {
  return {
    ...dest,
    categories: (dest.categories || []).map((cat) => ({
      ...cat,
      packages: (cat.packages || []).map((card) =>
        enrichCatalogCard(
          {
            ...card,
            href: resolveCatalogHref({ id: card.id, href: card.href, title: card.title }, packages),
          },
          packages,
        ),
      ),
    })),
  };
}

/** Keep catalog cards (homepage grid, mega menu, destination pages) aligned with live trek pages. */
export function applyPublishedPackageHrefs(content: SiteContent): SiteContent {
  const pkgs = content.tripPackages || [];
  const nav = content.headerNav;
  return {
    ...content,
    headerNav: nav
      ? {
          ...nav,
          destinations: (nav.destinations || []).map((dest) =>
            enrichCatalogCard(
              {
                ...dest,
                href: resolveCatalogHref({ id: dest.id, href: dest.href, title: dest.title }, pkgs),
              },
              pkgs,
            ),
          ),
          luxuryCountries: (nav.luxuryCountries || []).map((country) => ({
            ...country,
            packages: country.packages.map((card) =>
              enrichCatalogCard(
                {
                  ...card,
                  href: resolveCatalogHref({ id: "", href: card.href, title: card.title }, pkgs),
                },
                pkgs,
              ),
            ),
          })),
        }
      : nav,
    nepal: rewriteDestCatalog(content.nepal, pkgs),
    bhutan: rewriteDestCatalog(content.bhutan, pkgs),
    tibet: rewriteDestCatalog(content.tibet, pkgs),
    multi: rewriteDestCatalog(content.multi, pkgs),
    helicopter: rewriteDestCatalog(content.helicopter, pkgs),
    photography: rewriteDestCatalog(content.photography, pkgs),
    journeys: {
      ...content.journeys,
      packages: (content.journeys?.packages || []).map((card) =>
        enrichCatalogCard(
          {
            ...card,
            href: resolveCatalogHref({ id: card.id, href: card.href, title: card.title }, pkgs),
          },
          pkgs,
        ),
      ),
    },
    footer: {
      ...content.footer,
      trekLinks: (content.footer?.trekLinks || []).map((link) => ({
        ...link,
        href: resolveCatalogHref({ id: link.id, href: link.href, title: link.label }, pkgs),
      })),
    },
  };
}

/** After saving a trek page in admin — persist catalog cover, slug and stats everywhere that card appears. */
export function applyTripPackageToSiteContent(
  content: SiteContent,
  pkg: TrekPackage,
  extraHrefs: Iterable<string> = [],
): SiteContent {
  const linked = (card: { id?: string; href: string; title?: string }) => cardLinkedToPackage(card, pkg, extraHrefs);
  const cardPatch = {
    title: pkg.title,
    days: pkg.days,
    difficulty: pkg.difficulty,
    description: pkg.subtitle,
    badge: pkg.badge,
    href: tripPath(pkg),
    imageSrc: pkg.heroSrc,
    imageAlt: pkg.heroAlt,
  };
  const journeyPatch: Partial<JourneyPackage> = {
    ...cardPatch,
    maxAltitude: (pkg.maxAltitude || "").split("/")[0].trim(),
    subtitle: "Luxury Package",
  };
  const syncDest = (dest: NepalContent) => ({
    ...dest,
    categories: dest.categories.map((cat) => ({
      ...cat,
      packages: cat.packages.map((card) => (linked(card) ? { ...card, ...cardPatch } : card)),
    })),
  });
  const merged: SiteContent = {
    ...content,
    tripPackages: content.tripPackages.some((item) => item.id === pkg.id)
      ? content.tripPackages.map((item) => (item.id === pkg.id ? pkg : item))
      : [...content.tripPackages, pkg],
    nepal: syncDest(content.nepal),
    bhutan: syncDest(content.bhutan),
    tibet: syncDest(content.tibet),
    multi: syncDest(content.multi),
    journeys: {
      ...content.journeys,
      packages: content.journeys.packages.map((card) => (linked(card) ? { ...card, ...journeyPatch } : card)),
    },
    headerNav: {
      ...content.headerNav,
      destinations: (content.headerNav?.destinations || []).map((card) =>
        linked(card) ? { ...card, href: tripPath(pkg), title: pkg.title, imageSrc: pkg.heroSrc, imageAlt: pkg.heroAlt } : card,
      ),
      luxuryCountries: (content.headerNav?.luxuryCountries || []).map((country) => ({
        ...country,
        packages: country.packages.map((card) =>
          linked(card)
            ? {
                ...card,
                title: pkg.title,
                days: pkg.duration || card.days,
                difficulty: pkg.difficulty,
                href: tripPath(pkg),
                imageSrc: pkg.heroSrc || card.imageSrc,
                imageAlt: pkg.heroAlt || card.imageAlt,
              }
            : card,
        ),
      })),
    },
    footer: {
      ...content.footer,
      trekLinks: (content.footer?.trekLinks || []).map((link) =>
        linked({ id: link.id, href: link.href, title: link.label })
          ? { ...link, href: tripPath(pkg), label: pkg.title }
          : link,
      ),
    },
  };
  return applyPublishedPackageHrefs(merged);
}

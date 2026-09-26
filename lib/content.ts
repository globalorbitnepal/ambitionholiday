import { promises as fs } from "fs";
import path from "path";
import { contentFileCandidates } from "@/lib/cms-paths";
import { DEFAULT_HEADER_NAV, mergeHeaderNav } from "@/lib/header-nav";
import { headerLogoSrc } from "@/lib/media-src";
import { SECTION_WALLPAPER } from "@/lib/section-wallpaper";
import { JOURNAL_POSTS } from "@/lib/journal-defaults";
import { decorateBlogPost } from "@/lib/blog";
import {
  DEFAULT_CONTENT,
  type ExploreHubTab,
  type ExploreHubTabId,
  type JourneyPackage,
  type ReviewBoard,
  type SiteContent,
  type TravelerReview,
} from "@/lib/content-types";
import { DEFAULT_NEPAL } from "@/lib/nepal-defaults";
import { DEFAULT_BHUTAN } from "@/lib/bhutan-defaults";
import { DEFAULT_TIBET } from "@/lib/tibet-defaults";
import { DEFAULT_MULTI } from "@/lib/multi-defaults";
import { DEFAULT_HELICOPTER } from "@/lib/helicopter-defaults";
import { DEFAULT_PHOTOGRAPHY } from "@/lib/photography-defaults";
import type { NepalContent } from "@/lib/nepal-defaults";
import { coerceTripPackages } from "@/lib/trip-packages";

const GRID_JOURNEY_IDS = ["ebc", "abc", "mustang", "manaslu", "langtang", "gokyo", "heli", "mardi"];

function coerceDestinationCatalog(
  savedRaw: Partial<NepalContent> | undefined,
  defaults: NepalContent,
  options?: { flatten?: boolean },
): NepalContent {
  const saved = { ...defaults, ...savedRaw };
  let cats = saved.categories?.length ? saved.categories : defaults.categories;
  if (options?.flatten && cats.length > 1) {
    const packages = cats.flatMap((cat) => cat.packages || []);
    cats = [
      {
        id: "all",
        label: "Luxury Packages",
        countLabel: `${packages.length} Packages`,
        packages,
      },
    ];
  }
  const defById = new Map(defaults.categories.flatMap((cat) => cat.packages.map((pkg) => [pkg.id, pkg])));
  return {
    ...saved,
    coverSrc: saved.coverSrc || defaults.coverSrc,
    wallpaperSrc: saved.wallpaperSrc || defaults.wallpaperSrc,
    closeTitle: saved.closeTitle || defaults.closeTitle,
    closeBody: saved.closeBody || defaults.closeBody,
    categories: cats.map((cat) => ({
      ...cat,
      packages: (cat.packages || []).map((pkg) => {
        const fallback = defById.get(pkg.id);
        return {
          ...fallback,
          ...pkg,
          badge: pkg.badge ?? fallback?.badge ?? "",
          difficulty: pkg.difficulty || fallback?.difficulty || "Moderate",
          description: pkg.description || fallback?.description || pkg.subtitle,
          href:
            fallback?.href &&
            !fallback.href.includes("interest=") &&
            (pkg.href || "").includes("interest=")
              ? fallback.href
              : pkg.href || fallback?.href || "",
        };
      }),
    })),
  };
}

function stripDestinationMedia(content: NepalContent | undefined, defaults: NepalContent, publicPath: string): NepalContent {
  const page = content ?? defaults;
  return {
    ...page,
    coverSrc: page.coverSrc === publicPath ? defaults.coverSrc : page.coverSrc,
    wallpaperSrc: page.wallpaperSrc === publicPath ? defaults.wallpaperSrc : page.wallpaperSrc || defaults.wallpaperSrc,
    categories: (page.categories ?? []).map((cat) => ({
      ...cat,
      packages: (cat.packages ?? []).map((pkg) => ({
        ...pkg,
        imageSrc: pkg.imageSrc === publicPath ? "" : pkg.imageSrc,
      })),
    })),
  };
}

function withSharedSectionWallpaper(content: SiteContent): SiteContent {
  return {
    ...content,
    atmosphere: { ...content.atmosphere, imageSrc: SECTION_WALLPAPER },
    exploreHub: { ...content.exploreHub, wallpaperSrc: SECTION_WALLPAPER },
    signature: { ...content.signature, wallpaperSrc: SECTION_WALLPAPER },
    journeys: { ...content.journeys, wallpaperSrc: SECTION_WALLPAPER },
    why: { ...content.why, wallpaperSrc: SECTION_WALLPAPER },
    experiences: { ...content.experiences, wallpaperSrc: SECTION_WALLPAPER },
    availability: { ...content.availability, wallpaperSrc: SECTION_WALLPAPER },
    about: { ...content.about, wallpaperSrc: SECTION_WALLPAPER },
    legalDocuments: { ...content.legalDocuments, wallpaperSrc: SECTION_WALLPAPER },
    visa: { ...content.visa, wallpaperSrc: SECTION_WALLPAPER },
    bestTime: { ...content.bestTime, wallpaperSrc: SECTION_WALLPAPER },
    packing: { ...content.packing, wallpaperSrc: SECTION_WALLPAPER },
    altitude: { ...content.altitude, wallpaperSrc: SECTION_WALLPAPER },
    permits: { ...content.permits, wallpaperSrc: SECTION_WALLPAPER },
  };
}

function isUploadSrc(src: string) {
  return src.startsWith("/uploads/") || src.startsWith("/api/media/");
}

function decorateJourneyPackages(packages: JourneyPackage[]): JourneyPackage[] {
  const defaults = DEFAULT_CONTENT.journeys.packages;
  const hasGrid =
    packages.some((pkg) => pkg.id === "langtang") &&
    packages.some((pkg) => pkg.id === "gokyo") &&
    packages.some((pkg) => pkg.id === "mardi");
  const byId = new Map(packages.map((pkg) => [pkg.id, pkg]));

  const merged = defaults.map((def) => {
    const pkg = byId.get(def.id);
    if (!pkg) return def;
    const fromUpload = isUploadSrc(pkg.imageSrc);
    const staleImage = !fromUpload && (pkg.imageSrc.startsWith("/images/packages/") || !pkg.imageSrc);
    return {
      ...def,
      ...pkg,
      imageSrc: fromUpload ? pkg.imageSrc : staleImage ? def.imageSrc : pkg.imageSrc || def.imageSrc,
      title: hasGrid ? pkg.title : def.title,
      subtitle: hasGrid ? pkg.subtitle : def.subtitle,
      badge: hasGrid ? pkg.badge : def.badge,
      days: hasGrid ? pkg.days : def.days,
      maxAltitude: hasGrid ? pkg.maxAltitude : def.maxAltitude,
      difficulty: hasGrid ? pkg.difficulty : def.difficulty,
      description: hasGrid ? pkg.description : def.description,
      location: hasGrid ? pkg.location : def.location,
    };
  });

  const extras = hasGrid
    ? packages
        .filter((pkg) => !GRID_JOURNEY_IDS.includes(pkg.id))
        .map((pkg) => {
          const fromUpload = isUploadSrc(pkg.imageSrc);
          return {
            ...pkg,
            imageSrc:
              fromUpload || pkg.imageSrc
                ? pkg.imageSrc
                : DEFAULT_CONTENT.journeys.packages[0].imageSrc,
          };
        })
    : [];

  return [...merged, ...extras];
}

function decorateReviewBoards(boards: ReviewBoard[]): ReviewBoard[] {
  if (!boards.length) return DEFAULT_CONTENT.why.boards;
  return boards.map((board, index) => {
    const fallback = DEFAULT_CONTENT.why.boards[index];
    const platform = board.platform === "tripadvisor" ? "tripadvisor" : "google";
    return {
      ...fallback,
      ...board,
      platform,
      logoSrc:
        board.logoSrc ||
        fallback?.logoSrc ||
        (platform === "tripadvisor" ? "/images/reviews/tripadvisor-owl.png" : undefined),
    };
  });
}

function decorateReviews(reviews: TravelerReview[]): TravelerReview[] {
  if (!reviews.length) return DEFAULT_CONTENT.why.reviews;
  return reviews.map((review) => {
    const fallback = DEFAULT_CONTENT.why.reviews.find((item) => item.id === review.id);
    const fromUpload = review.avatarSrc.startsWith("/uploads/") || review.avatarSrc.startsWith("/api/media/");
    return {
      ...fallback,
      ...review,
      platform: review.platform === "tripadvisor" ? "tripadvisor" : "google",
      avatarSrc: fromUpload || review.avatarSrc ? review.avatarSrc : fallback?.avatarSrc || "",
    };
  });
}

export async function ensureContentFile(): Promise<void> {
  for (const file of contentFileCandidates()) {
    try {
      await fs.access(file);
      return;
    } catch {
      // try next candidate
    }
  }
  const fallback = contentFileCandidates().at(-1);
  if (!fallback) return;
  await fs.mkdir(path.dirname(fallback), { recursive: true });
  await fs.writeFile(fallback, JSON.stringify(DEFAULT_CONTENT, null, 2), "utf8");
}

async function readNewestContentFile(): Promise<SiteContent> {
  let best: SiteContent | null = null;
  for (const file of contentFileCandidates()) {
    try {
      const raw = await fs.readFile(file, "utf8");
      const parsed = JSON.parse(raw) as SiteContent;
      if (!best || String(parsed.updatedAt || "") > String(best.updatedAt || "")) {
        best = parsed;
      }
    } catch {
      // unreadable / missing
    }
  }
  if (!best) throw new Error("No site content file");
  return best;
}

export async function readContent(): Promise<SiteContent> {
  try {
    await ensureContentFile();
    const parsed = await readNewestContentFile();
    return withSharedSectionWallpaper({
      ...DEFAULT_CONTENT,
      ...parsed,
      header: {
        ...DEFAULT_CONTENT.header,
        ...parsed.header,
        logoSrc: headerLogoSrc(parsed.header?.logoSrc),
      },
      headerNav: mergeHeaderNav(parsed.headerNav),
      mediaCatalog: {
        ...DEFAULT_CONTENT.mediaCatalog,
        ...(parsed.mediaCatalog ?? {}),
      },
      atmosphere: { ...DEFAULT_CONTENT.atmosphere, ...parsed.atmosphere },
      hero: {
        ...DEFAULT_CONTENT.hero,
        ...parsed.hero,
        stats: parsed.hero?.stats ?? DEFAULT_CONTENT.hero.stats,
        taglineWords:
          !parsed.hero?.taglineWords?.length ||
          parsed.hero.taglineWords.join(" ") === "Discover Your Luxury Trek"
            ? DEFAULT_CONTENT.hero.taglineWords
            : parsed.hero.taglineWords,
      },
      exploreHub: {
        ...DEFAULT_CONTENT.exploreHub,
        ...parsed.exploreHub,
        pillars:
          parsed.exploreHub?.pillars?.length
            ? parsed.exploreHub.pillars.map((pillar, index) => ({
                ...DEFAULT_CONTENT.exploreHub.pillars[index],
                ...pillar,
              }))
            : DEFAULT_CONTENT.exploreHub.pillars,
        tabs: (parsed.exploreHub?.tabs?.length
          ? parsed.exploreHub.tabs
          : DEFAULT_CONTENT.exploreHub.tabs
        ).map((tab, tabIndex) => {
          const fallback = DEFAULT_CONTENT.exploreHub.tabs[tabIndex] as ExploreHubTab | undefined;
          return {
            ...fallback,
            ...tab,
            id: (tab.id || fallback?.id || "destinations") as ExploreHubTabId,
            label: tab.label || fallback?.label || "Tab",
            cards: (tab.cards?.length ? tab.cards : fallback?.cards ?? []).map((card, cardIndex) => ({
              ...fallback?.cards?.[cardIndex],
              ...card,
              href:
                card.href === "/himalayan-multi-countries"
                  ? "/himalayan-multi-countries-tour"
                  : card.href || fallback?.cards?.[cardIndex]?.href || "/",
              imageSrc:
                card.imageSrc ||
                fallback?.cards?.[cardIndex]?.imageSrc ||
                DEFAULT_CONTENT.exploreHub.wallpaperSrc,
            })),
          };
        }),
      },
      signature: {
        ...DEFAULT_CONTENT.signature,
        ...parsed.signature,
        wallpaperSrc:
          parsed.signature && "wallpaperSrc" in parsed.signature && parsed.signature.wallpaperSrc
            ? parsed.signature.wallpaperSrc
            : DEFAULT_CONTENT.signature.wallpaperSrc,
        kicker: parsed.signature?.kicker || DEFAULT_CONTENT.signature.kicker,
        scriptRight: parsed.signature?.scriptRight || DEFAULT_CONTENT.signature.scriptRight,
        eyebrow:
          !parsed.signature?.eyebrow ||
          parsed.signature.eyebrow === "OUR SIGNATURE OF ADVENTURE"
            ? DEFAULT_CONTENT.signature.eyebrow
            : parsed.signature.eyebrow,
        headlineWhite:
          !parsed.signature?.headlineWhite ||
          parsed.signature.headlineWhite === "Beyond the Trail."
            ? DEFAULT_CONTENT.signature.headlineWhite
            : parsed.signature.headlineWhite,
        headlineGold:
          !parsed.signature?.headlineGold ||
          parsed.signature.headlineGold === "Luxury Meets Ambition"
            ? DEFAULT_CONTENT.signature.headlineGold
            : parsed.signature.headlineGold,
        sisterLabel: parsed.signature?.sisterLabel || DEFAULT_CONTENT.signature.sisterLabel,
        sisterName: parsed.signature?.sisterName || DEFAULT_CONTENT.signature.sisterName,
        body:
          !parsed.signature?.body ||
          parsed.signature.body.startsWith("Experience Nepal through the art of luxury trekking")
            ? DEFAULT_CONTENT.signature.body
            : parsed.signature.body,
        ctaLabel:
          !parsed.signature?.ctaLabel || parsed.signature.ctaLabel === "Explore Luxury Treks"
            ? DEFAULT_CONTENT.signature.ctaLabel
            : parsed.signature.ctaLabel,
        stats:
          parsed.signature?.stats?.length
            ? parsed.signature.stats.map((stat, index) => ({
                ...DEFAULT_CONTENT.signature.stats[index],
                ...stat,
              }))
            : DEFAULT_CONTENT.signature.stats,
        cards:
          parsed.signature?.cards?.length
            ? parsed.signature.cards.map((card, index) => ({
                ...DEFAULT_CONTENT.signature.cards[index],
                ...card,
                imageSrc:
                  card.imageSrc ||
                  DEFAULT_CONTENT.signature.cards[index]?.imageSrc ||
                  DEFAULT_CONTENT.signature.wallpaperSrc,
              }))
            : DEFAULT_CONTENT.signature.cards,
        footItems:
          parsed.signature?.footItems?.length
            ? parsed.signature.footItems.map((item, index) => ({
                ...DEFAULT_CONTENT.signature.footItems[index],
                ...item,
              }))
            : DEFAULT_CONTENT.signature.footItems,
        footScript: parsed.signature?.footScript || DEFAULT_CONTENT.signature.footScript,
      },
      journeys: {
        ...DEFAULT_CONTENT.journeys,
        ...parsed.journeys,
        wallpaperSrc:
          parsed.journeys && "wallpaperSrc" in parsed.journeys && parsed.journeys.wallpaperSrc
            ? parsed.journeys.wallpaperSrc
            : DEFAULT_CONTENT.journeys.wallpaperSrc,
        categories: parsed.journeys?.categories ?? DEFAULT_CONTENT.journeys.categories,
        packages: decorateJourneyPackages(
          parsed.journeys?.packages ?? DEFAULT_CONTENT.journeys.packages,
        ),
        eyebrow:
          !parsed.journeys?.eyebrow || parsed.journeys.eyebrow === "OUR SIGNATURE JOURNEYS"
            ? DEFAULT_CONTENT.journeys.eyebrow
            : parsed.journeys.eyebrow,
        headlineGold:
          !parsed.journeys?.headlineGold ||
          parsed.journeys.headlineGold === "Luxury Treks" ||
          parsed.journeys.headlineGold === "Luxury Treks & Tour"
            ? DEFAULT_CONTENT.journeys.headlineGold
            : parsed.journeys.headlineGold,
        headlineWhite: parsed.journeys?.headlineWhite || DEFAULT_CONTENT.journeys.headlineWhite,
        line1:
          !parsed.journeys?.line1 ||
          parsed.journeys.line1.includes("Handpicked routes")
            ? DEFAULT_CONTENT.journeys.line1
            : parsed.journeys.line1,
        line2:
          !parsed.journeys?.line2 ||
          parsed.journeys.line2.includes("most loved luxury")
            ? DEFAULT_CONTENT.journeys.line2
            : parsed.journeys.line2,
      },
      why: {
        ...DEFAULT_CONTENT.why,
        ...parsed.why,
        wallpaperSrc:
          parsed.why && "wallpaperSrc" in parsed.why && parsed.why.wallpaperSrc
            ? parsed.why.wallpaperSrc
            : DEFAULT_CONTENT.why.wallpaperSrc,
        eyebrow:
          !parsed.why?.eyebrow ||
          parsed.why.eyebrow === "OUR HERITAGE" ||
          parsed.why.eyebrow === "WHY TRAVEL WITH US"
            ? DEFAULT_CONTENT.why.eyebrow
            : parsed.why.eyebrow,
        headlineWhite:
          !parsed.why?.headlineWhite ||
          parsed.why.headlineWhite === "Backed by" ||
          parsed.why.headlineWhite === "Why Ambition Holidays"
            ? DEFAULT_CONTENT.why.headlineWhite
            : parsed.why.headlineWhite,
        headlineGold:
          !parsed.why?.headlineGold || parsed.why.headlineGold === "Himalayan Experience"
            ? DEFAULT_CONTENT.why.headlineGold
            : parsed.why.headlineGold,
        boards: decorateReviewBoards(
          parsed.why && "boards" in parsed.why && parsed.why.boards?.length
            ? parsed.why.boards
            : DEFAULT_CONTENT.why.boards,
        ),
        reviews: decorateReviews(
          parsed.why && "reviews" in parsed.why && parsed.why.reviews?.length
            ? parsed.why.reviews
            : DEFAULT_CONTENT.why.reviews,
        ),
        stats:
          parsed.why && "stats" in parsed.why && parsed.why.stats?.length
            ? parsed.why.stats
            : DEFAULT_CONTENT.why.stats,
        quote: parsed.why && "quote" in parsed.why && parsed.why.quote
          ? parsed.why.quote
          : DEFAULT_CONTENT.why.quote,
        quoteBy: parsed.why && "quoteBy" in parsed.why && parsed.why.quoteBy
          ? parsed.why.quoteBy
          : DEFAULT_CONTENT.why.quoteBy,
      },
      experiences: {
        ...DEFAULT_CONTENT.experiences,
        ...parsed.experiences,
        wallpaperSrc:
          parsed.experiences && "wallpaperSrc" in parsed.experiences && parsed.experiences.wallpaperSrc
            ? parsed.experiences.wallpaperSrc
            : DEFAULT_CONTENT.experiences.wallpaperSrc,
        ctaLabel:
          !parsed.experiences?.ctaLabel || parsed.experiences.ctaLabel === "EXPLORE ALL EXPERIENCES"
            ? DEFAULT_CONTENT.experiences.ctaLabel
            : parsed.experiences.ctaLabel,
        theme: {
          ...DEFAULT_CONTENT.experiences.theme,
          ...parsed.experiences?.theme,
          sectionBg: "transparent",
          cardBg:
            !parsed.experiences?.theme?.cardBg ||
            parsed.experiences.theme.cardBg === "#121820" ||
            parsed.experiences.theme.cardBg === "#0c1016"
              ? DEFAULT_CONTENT.experiences.theme.cardBg
              : parsed.experiences.theme.cardBg,
          textColor:
            !parsed.experiences?.theme?.textColor ||
            parsed.experiences.theme.textColor === "#ffffff" ||
            parsed.experiences.theme.textColor === "#fff"
              ? DEFAULT_CONTENT.experiences.theme.textColor
              : parsed.experiences.theme.textColor,
          mutedTextColor:
            !parsed.experiences?.theme?.mutedTextColor ||
            parsed.experiences.theme.mutedTextColor.includes("255,255,255")
              ? DEFAULT_CONTENT.experiences.theme.mutedTextColor
              : parsed.experiences.theme.mutedTextColor,
          goldColor:
            !parsed.experiences?.theme?.goldColor ||
            parsed.experiences.theme.goldColor === "#c9a227"
              ? DEFAULT_CONTENT.experiences.theme.goldColor
              : parsed.experiences.theme.goldColor,
          borderColor:
            !parsed.experiences?.theme?.borderColor ||
            parsed.experiences.theme.borderColor.includes("201,162,39")
              ? DEFAULT_CONTENT.experiences.theme.borderColor
              : parsed.experiences.theme.borderColor,
        },
        cards: (() => {
          const defaults = DEFAULT_CONTENT.experiences.cards;
          const removed = new Set(["heli", "wellness"]);
          const fromSaved = (parsed.experiences?.cards ?? []).filter(
            (card) =>
              !removed.has(card.id) &&
              !/helicopter experience/i.test(card.title) &&
              !/wellness journey/i.test(card.title),
          );
          const byId = new Map(fromSaved.map((card) => [card.id, card]));
          const merged = defaults.map((def) => {
            const card = byId.get(def.id);
            if (!card) return def;
            const fromUpload =
              card.imageSrc.startsWith("/uploads/") || card.imageSrc.startsWith("/api/media/");
            const staleImage = !fromUpload && !card.imageSrc.includes("/images/experiences/exp-");
            const staleCopy = !card.countLabel?.includes("+");
            return {
              ...def,
              ...card,
              imageSrc: fromUpload ? card.imageSrc : staleImage ? def.imageSrc : card.imageSrc,
              countLabel: staleCopy ? def.countLabel : card.countLabel,
              body: staleCopy ? def.body : card.body,
            };
          });
          const extras = fromSaved.filter((card) => !defaults.some((def) => def.id === card.id));
          return [...merged, ...extras];
        })(),
      },
      availability: {
        ...DEFAULT_CONTENT.availability,
        ...parsed.availability,
        wallpaperSrc:
          parsed.availability && "wallpaperSrc" in parsed.availability && parsed.availability.wallpaperSrc
            ? parsed.availability.wallpaperSrc
            : DEFAULT_CONTENT.availability.wallpaperSrc,
        ctaLabel: parsed.availability?.ctaLabel || DEFAULT_CONTENT.availability.ctaLabel,
        ctaHref: parsed.availability?.ctaHref || DEFAULT_CONTENT.availability.ctaHref,
        cards: (() => {
          const defaults = DEFAULT_CONTENT.availability.cards;
          const saved = parsed.availability?.cards ?? [];
          const byId = new Map(saved.map((card) => [card.id, card]));
          const merged = defaults.map((def) => {
            const card = byId.get(def.id);
            if (!card) return def;
            const fromUpload =
              card.imageSrc.startsWith("/uploads/") || card.imageSrc.startsWith("/api/media/");
            const staleImage =
              !fromUpload &&
              (card.imageSrc === `/images/availability/${def.id}.jpg` ||
                !card.imageSrc.includes("/images/availability/avail-"));
            return {
              ...def,
              ...card,
              imageSrc: fromUpload ? card.imageSrc : staleImage ? def.imageSrc : card.imageSrc,
              title: card.title || def.title,
              body: card.body || def.body,
              live: card.live !== false,
              visible: card.visible !== false,
            };
          });
          const extras = saved
            .filter((card) => !defaults.some((def) => def.id === card.id))
            .map((card) => ({
              ...card,
              title: card.title || card.monthFull,
              body: card.body || "",
              live: card.live !== false,
              visible: card.visible !== false,
            }));
          return [...merged, ...extras];
        })(),
        footItems: parsed.availability?.footItems ?? DEFAULT_CONTENT.availability.footItems,
      },
      journal: {
        ...DEFAULT_CONTENT.journal,
        ...parsed.journal,
        videos: parsed.journal?.videos ?? DEFAULT_CONTENT.journal.videos,
        features: parsed.journal?.features ?? DEFAULT_CONTENT.journal.features,
      },
      blog: {
        ...DEFAULT_CONTENT.blog,
        ...parsed.blog,
        ctaHref:
          !parsed.blog?.ctaHref || parsed.blog.ctaHref === "/blog"
            ? "/journal"
            : parsed.blog.ctaHref,
        posts: (parsed.blog?.posts?.length ? parsed.blog.posts : JOURNAL_POSTS).map((post) => {
          const fallback = JOURNAL_POSTS.find((item) => item.id === post.id || item.slug === post.slug);
          return decorateBlogPost(post, fallback);
        }),
        featured: parsed.blog?.featured ?? DEFAULT_CONTENT.blog.featured,
        sidePosts: parsed.blog?.sidePosts ?? DEFAULT_CONTENT.blog.sidePosts,
        features: parsed.blog?.features ?? DEFAULT_CONTENT.blog.features,
      },
      about: {
        ...DEFAULT_CONTENT.about,
        ...parsed.about,
        pillars: parsed.about?.pillars?.length ? parsed.about.pillars : DEFAULT_CONTENT.about.pillars,
        stats: parsed.about?.stats?.length ? parsed.about.stats : DEFAULT_CONTENT.about.stats,
        licenses: parsed.about?.licenses?.length ? parsed.about.licenses : DEFAULT_CONTENT.about.licenses,
      },
      legalDocuments: {
        ...DEFAULT_CONTENT.legalDocuments,
        ...parsed.legalDocuments,
        documents: parsed.legalDocuments?.documents?.length
          ? parsed.legalDocuments.documents
          : DEFAULT_CONTENT.legalDocuments.documents,
      },
      visa: (() => {
        const saved = parsed.visa;
        const dolpoFee = saved?.restricted?.find((item) => item.id === "udolpo")?.fee || "";
        const staleFees =
          !saved ||
          /500/.test(dolpoFee) ||
          (saved.restricted?.length || 0) < 12 ||
          !(saved.parkFees || []).some((row) => row.id === "chitwan") ||
          !(saved.permitCards || []).some((card) => card.id === "tims");
        if (staleFees) {
          return {
            ...DEFAULT_CONTENT.visa,
            wallpaperSrc: saved?.wallpaperSrc || DEFAULT_CONTENT.visa.wallpaperSrc,
            visible: saved?.visible ?? DEFAULT_CONTENT.visa.visible,
          };
        }
        return {
          ...DEFAULT_CONTENT.visa,
          ...saved,
          visaFees: saved.visaFees?.length ? saved.visaFees : DEFAULT_CONTENT.visa.visaFees,
          permitCards: saved.permitCards?.length ? saved.permitCards : DEFAULT_CONTENT.visa.permitCards,
          parkFees: saved.parkFees?.length ? saved.parkFees : DEFAULT_CONTENT.visa.parkFees,
          restricted: saved.restricted?.length ? saved.restricted : DEFAULT_CONTENT.visa.restricted,
          airportSteps: saved.airportSteps?.length ? saved.airportSteps : DEFAULT_CONTENT.visa.airportSteps,
          countries: saved.countries?.length ? saved.countries : DEFAULT_CONTENT.visa.countries,
        };
      })(),
      bestTime: {
        ...DEFAULT_CONTENT.bestTime,
        ...parsed.bestTime,
        months: parsed.bestTime?.months?.length ? parsed.bestTime.months : DEFAULT_CONTENT.bestTime.months,
        seasons: parsed.bestTime?.seasons?.length ? parsed.bestTime.seasons : DEFAULT_CONTENT.bestTime.seasons,
        regions: parsed.bestTime?.regions?.length ? parsed.bestTime.regions : DEFAULT_CONTENT.bestTime.regions,
        altitudes: parsed.bestTime?.altitudes?.length
          ? parsed.bestTime.altitudes
          : DEFAULT_CONTENT.bestTime.altitudes,
      },
      packing: {
        ...DEFAULT_CONTENT.packing,
        ...parsed.packing,
        checks: parsed.packing?.checks?.length ? parsed.packing.checks : DEFAULT_CONTENT.packing.checks,
        groups: parsed.packing?.groups?.length ? parsed.packing.groups : DEFAULT_CONTENT.packing.groups,
        documents: parsed.packing?.documents?.length ? parsed.packing.documents : DEFAULT_CONTENT.packing.documents,
        provided: parsed.packing?.provided?.length ? parsed.packing.provided : DEFAULT_CONTENT.packing.provided,
        seasons: parsed.packing?.seasons?.length ? parsed.packing.seasons : DEFAULT_CONTENT.packing.seasons,
      },
      altitude: {
        ...DEFAULT_CONTENT.altitude,
        ...parsed.altitude,
        checks: parsed.altitude?.checks?.length ? parsed.altitude.checks : DEFAULT_CONTENT.altitude.checks,
        groups: parsed.altitude?.groups?.length ? parsed.altitude.groups : DEFAULT_CONTENT.altitude.groups,
        documents: parsed.altitude?.documents?.length ? parsed.altitude.documents : DEFAULT_CONTENT.altitude.documents,
        provided: parsed.altitude?.provided?.length ? parsed.altitude.provided : DEFAULT_CONTENT.altitude.provided,
        seasons: parsed.altitude?.seasons?.length ? parsed.altitude.seasons : DEFAULT_CONTENT.altitude.seasons,
      },
      permits: {
        ...DEFAULT_CONTENT.permits,
        ...parsed.permits,
        families: parsed.permits?.families?.length ? parsed.permits.families : DEFAULT_CONTENT.permits.families,
        routes: parsed.permits?.routes?.length ? parsed.permits.routes : DEFAULT_CONTENT.permits.routes,
        parkFees: parsed.permits?.parkFees?.length ? parsed.permits.parkFees : DEFAULT_CONTENT.permits.parkFees,
        restricted: parsed.permits?.restricted?.length ? parsed.permits.restricted : DEFAULT_CONTENT.permits.restricted,
        peaks: parsed.permits?.peaks?.length ? parsed.permits.peaks : DEFAULT_CONTENT.permits.peaks,
      },
      nepal: coerceDestinationCatalog(parsed.nepal, DEFAULT_NEPAL),
      bhutan: coerceDestinationCatalog(parsed.bhutan, DEFAULT_BHUTAN, { flatten: true }),
      tibet: coerceDestinationCatalog(parsed.tibet, DEFAULT_TIBET, { flatten: true }),
      multi: coerceDestinationCatalog(parsed.multi, DEFAULT_MULTI, { flatten: true }),
      helicopter: coerceDestinationCatalog(parsed.helicopter, DEFAULT_HELICOPTER, { flatten: true }),
      photography: coerceDestinationCatalog(parsed.photography, DEFAULT_PHOTOGRAPHY, { flatten: true }),
      tripPackages: coerceTripPackages(parsed.tripPackages as SiteContent["tripPackages"]),
      footer: {
        ...DEFAULT_CONTENT.footer,
        ...parsed.footer,
        members:
          parsed.footer?.members?.some((m) => m.imageSrc)
            ? parsed.footer.members
            : DEFAULT_CONTENT.footer.members,
        socials: parsed.footer?.socials ?? DEFAULT_CONTENT.footer.socials,
        payments:
          parsed.footer?.payments?.some((p) => p.imageSrc)
            ? parsed.footer.payments
            : DEFAULT_CONTENT.footer.payments,
        phones: parsed.footer?.phones ?? DEFAULT_CONTENT.footer.phones,
        usefulLinks: (() => {
          const links = (parsed.footer?.usefulLinks ?? DEFAULT_CONTENT.footer.usefulLinks).map((link) =>
            link.href === "/about-us" ? { ...link, href: "/company", label: "Company" } : link,
          );
          const extras = [
            { id: "u7", label: "Packing Guide", href: "/packing-guide" },
            { id: "u8", label: "Altitude Tips", href: "/altitude-tips" },
            { id: "u9", label: "Permits & Fees", href: "/permits-and-fees" },
          ];
          const missing = extras.filter((item) => !links.some((link) => link.href === item.href));
          return missing.length ? [...links, ...missing] : links;
        })(),
        adventureLinks: parsed.footer?.adventureLinks ?? DEFAULT_CONTENT.footer.adventureLinks,
        trekLinks: parsed.footer?.trekLinks ?? DEFAULT_CONTENT.footer.trekLinks,
        legalLinks: (parsed.footer?.legalLinks ?? DEFAULT_CONTENT.footer.legalLinks).map((link) =>
          link.href === "/privacy"
            ? { ...link, href: "/privacy-policy" }
            : link.href === "/terms"
              ? { ...link, href: "/terms-and-conditions" }
              : link,
        ),
        landscapeImageSrc:
          !parsed.footer?.landscapeImageSrc ||
          parsed.footer.landscapeImageSrc.includes("luxury-himalaya") ||
          parsed.footer.landscapeImageSrc.includes("ambition-luxury-scene") ||
          parsed.footer.landscapeImageSrc.includes("ambition-silhouette") ||
          parsed.footer.landscapeImageSrc.includes("ambition-art-clean")
            ? DEFAULT_CONTENT.footer.landscapeImageSrc
            : parsed.footer.landscapeImageSrc,
        creditPrefix: parsed.footer?.creditPrefix ?? DEFAULT_CONTENT.footer.creditPrefix,
        creditName: parsed.footer?.creditName ?? DEFAULT_CONTENT.footer.creditName,
        creditHref: parsed.footer?.creditHref ?? DEFAULT_CONTENT.footer.creditHref,
      },
    });
  } catch {
    return withSharedSectionWallpaper(structuredClone(DEFAULT_CONTENT));
  }
}

export async function writeContent(content: SiteContent): Promise<SiteContent> {
  const next: SiteContent = withSharedSectionWallpaper({
    ...content,
    header: {
      ...content.header,
      logoSrc: headerLogoSrc(content.header?.logoSrc),
    },
    headerNav: mergeHeaderNav(content.headerNav),
    updatedAt: new Date().toISOString(),
  });
  const payload = JSON.stringify(next, null, 2);
  let wrote = 0;
  let lastError: unknown;
  for (const CONTENT_FILE of contentFileCandidates()) {
    try {
      await fs.mkdir(path.dirname(CONTENT_FILE), { recursive: true });
      const tmp = `${CONTENT_FILE}.${process.pid}.tmp`;
      await fs.writeFile(tmp, payload, "utf8");
      await fs.rename(tmp, CONTENT_FILE);
      wrote += 1;
    } catch (err) {
      lastError = err;
    }
  }
  if (!wrote) {
    throw lastError instanceof Error ? lastError : new Error("Could not save site content");
  }
  return next;
}

export function scrubUploadRefs(content: SiteContent, publicPath: string): SiteContent {
  const fallbackLogo = DEFAULT_CONTENT.header.logoSrc;
  const nav = mergeHeaderNav(content.headerNav);

  return {
    ...content,
    header: {
      logoSrc: content.header.logoSrc === publicPath ? fallbackLogo : content.header.logoSrc,
    },
    headerNav: {
      destinations: nav.destinations.map((dest, index) => ({
        ...dest,
        imageSrc:
          dest.imageSrc === publicPath
            ? DEFAULT_HEADER_NAV.destinations[index]?.imageSrc ?? dest.imageSrc
            : dest.imageSrc,
      })),
      luxuryCountries: nav.luxuryCountries.map((country) => {
        const def = DEFAULT_HEADER_NAV.luxuryCountries.find((c) => c.id === country.id);
        return {
          ...country,
          flagSrc:
            country.flagSrc === publicPath ? def?.flagSrc ?? country.flagSrc : country.flagSrc,
          thumbSrc:
            country.thumbSrc === publicPath ? def?.thumbSrc ?? country.thumbSrc : country.thumbSrc,
          packages: country.packages.map((pkg, index) => ({
            ...pkg,
            imageSrc:
              pkg.imageSrc === publicPath
                ? def?.packages[index]?.imageSrc ?? pkg.imageSrc
                : pkg.imageSrc,
          })),
        };
      }),
    },
    atmosphere: {
      imageSrc:
        content.atmosphere?.imageSrc === publicPath
          ? DEFAULT_CONTENT.atmosphere.imageSrc
          : content.atmosphere?.imageSrc || DEFAULT_CONTENT.atmosphere.imageSrc,
    },
    hero: {
      ...content.hero,
      posterSrc:
        content.hero.posterSrc === publicPath
          ? DEFAULT_CONTENT.hero.posterSrc
          : content.hero.posterSrc,
      videoSrc:
        content.hero.videoSrc === publicPath
          ? DEFAULT_CONTENT.hero.videoSrc
          : content.hero.videoSrc,
      stats: content.hero.stats
        .map((stat) =>
          stat.iconSrc === publicPath ? { ...stat, iconSrc: undefined, iconKey: "custom" as const } : stat,
        )
        .filter((stat) => !(stat.iconSrc === undefined && stat.iconKey === "custom" && !stat.label)),
    },
    exploreHub: {
      ...content.exploreHub,
      wallpaperSrc:
        content.exploreHub?.wallpaperSrc === publicPath
          ? DEFAULT_CONTENT.exploreHub.wallpaperSrc
          : content.exploreHub?.wallpaperSrc ?? DEFAULT_CONTENT.exploreHub.wallpaperSrc,
      pillars: (content.exploreHub?.pillars ?? []).map((pillar) => ({
        ...pillar,
        iconSrc: pillar.iconSrc === publicPath ? undefined : pillar.iconSrc,
      })),
      tabs: (content.exploreHub?.tabs ?? []).map((tab, tabIndex) => ({
        ...tab,
        cards: tab.cards.map((card, cardIndex) => ({
          ...card,
          imageSrc:
            card.imageSrc === publicPath
              ? DEFAULT_CONTENT.exploreHub.tabs[tabIndex]?.cards[cardIndex]?.imageSrc ??
                DEFAULT_CONTENT.exploreHub.wallpaperSrc
              : card.imageSrc,
          iconSrc: card.iconSrc === publicPath ? undefined : card.iconSrc,
        })),
      })),
    },
    signature: {
      ...content.signature,
      wallpaperSrc:
        content.signature?.wallpaperSrc === publicPath
          ? DEFAULT_CONTENT.signature.wallpaperSrc
          : content.signature?.wallpaperSrc ?? DEFAULT_CONTENT.signature.wallpaperSrc,
      stats: (content.signature?.stats ?? []).map((stat) => ({
        ...stat,
        iconSrc: stat.iconSrc === publicPath ? undefined : stat.iconSrc,
      })),
      cards: (content.signature?.cards ?? []).map((card, index) => ({
        ...card,
        imageSrc:
          card.imageSrc === publicPath
            ? DEFAULT_CONTENT.signature.cards[index]?.imageSrc ??
              DEFAULT_CONTENT.signature.wallpaperSrc
            : card.imageSrc,
        iconSrc: card.iconSrc === publicPath ? undefined : card.iconSrc,
      })),
      footItems: (content.signature?.footItems ?? []).map((item) => ({
        ...item,
        iconSrc: item.iconSrc === publicPath ? undefined : item.iconSrc,
      })),
    },
    journeys: {
      ...content.journeys,
      wallpaperSrc:
        content.journeys?.wallpaperSrc === publicPath
          ? DEFAULT_CONTENT.journeys.wallpaperSrc
          : content.journeys?.wallpaperSrc ?? DEFAULT_CONTENT.journeys.wallpaperSrc,
      packages: content.journeys.packages.map((pkg, index) =>
        pkg.imageSrc === publicPath
          ? {
              ...pkg,
              imageSrc:
                DEFAULT_CONTENT.journeys.packages[index]?.imageSrc ??
                DEFAULT_CONTENT.journeys.packages[0].imageSrc,
            }
          : pkg,
      ),
    },
    why: {
      ...content.why,
      wallpaperSrc:
        content.why?.wallpaperSrc === publicPath
          ? DEFAULT_CONTENT.why.wallpaperSrc
          : content.why?.wallpaperSrc ?? DEFAULT_CONTENT.why.wallpaperSrc,
      boards: (content.why?.boards ?? []).map((board) => ({
        ...board,
        logoSrc: board.logoSrc === publicPath ? undefined : board.logoSrc,
      })),
      reviews: (content.why?.reviews ?? []).map((review, index) => ({
        ...review,
        avatarSrc:
          review.avatarSrc === publicPath
            ? DEFAULT_CONTENT.why.reviews[index]?.avatarSrc ?? ""
            : review.avatarSrc,
      })),
    },
    experiences: {
      ...content.experiences,
      wallpaperSrc:
        content.experiences?.wallpaperSrc === publicPath
          ? DEFAULT_CONTENT.experiences.wallpaperSrc
          : content.experiences?.wallpaperSrc ?? DEFAULT_CONTENT.experiences.wallpaperSrc,
      theme: {
        ...content.experiences?.theme,
        backgroundImageSrc:
          content.experiences?.theme?.backgroundImageSrc === publicPath
            ? ""
            : content.experiences?.theme?.backgroundImageSrc ?? "",
      },
      cards: (content.experiences?.cards ?? []).map((card, index) => ({
        ...card,
        imageSrc:
          card.imageSrc === publicPath
            ? DEFAULT_CONTENT.experiences.cards[index]?.imageSrc ??
              DEFAULT_CONTENT.experiences.cards[0].imageSrc
            : card.imageSrc,
        iconSrc: card.iconSrc === publicPath ? undefined : card.iconSrc,
      })),
    },
    availability: {
      ...content.availability,
      wallpaperSrc:
        content.availability?.wallpaperSrc === publicPath
          ? DEFAULT_CONTENT.availability.wallpaperSrc
          : content.availability?.wallpaperSrc ?? DEFAULT_CONTENT.availability.wallpaperSrc,
      cards: (content.availability?.cards ?? []).map((card, index) => ({
        ...card,
        imageSrc:
          card.imageSrc === publicPath
            ? DEFAULT_CONTENT.availability.cards[index]?.imageSrc ??
              DEFAULT_CONTENT.availability.cards[0].imageSrc
            : card.imageSrc,
        routes: (card.routes ?? []).map((route) => ({
          ...route,
          iconSrc: route.iconSrc === publicPath ? undefined : route.iconSrc,
        })),
      })),
      footItems: (content.availability?.footItems ?? []).map((item) => ({
        ...item,
        iconSrc: item.iconSrc === publicPath ? undefined : item.iconSrc,
      })),
    },
    journal: {
      ...content.journal,
      videos: (content.journal?.videos ?? []).map((video, index) => ({
        ...video,
        imageSrc:
          video.imageSrc === publicPath
            ? DEFAULT_CONTENT.journal.videos[index]?.imageSrc ??
              DEFAULT_CONTENT.journal.videos[0].imageSrc
            : video.imageSrc,
        videoSrc: video.videoSrc === publicPath ? "" : video.videoSrc,
      })),
      features: (content.journal?.features ?? []).map((feature) => ({
        ...feature,
        iconSrc: feature.iconSrc === publicPath ? undefined : feature.iconSrc,
      })),
    },
    blog: {
      ...content.blog,
      featured: (content.blog?.featured ?? []).map((post, index) => ({
        ...post,
        imageSrc:
          post.imageSrc === publicPath
            ? DEFAULT_CONTENT.blog.featured[index]?.imageSrc ??
              DEFAULT_CONTENT.blog.featured[0].imageSrc
            : post.imageSrc,
        authorAvatarSrc:
          post.authorAvatarSrc === publicPath
            ? DEFAULT_CONTENT.blog.featured[0].authorAvatarSrc
            : post.authorAvatarSrc,
      })),
      sidePosts: (content.blog?.sidePosts ?? []).map((post, index) => ({
        ...post,
        imageSrc:
          post.imageSrc === publicPath
            ? DEFAULT_CONTENT.blog.sidePosts[index]?.imageSrc ??
              DEFAULT_CONTENT.blog.sidePosts[0].imageSrc
            : post.imageSrc,
        authorAvatarSrc:
          post.authorAvatarSrc === publicPath ? "" : post.authorAvatarSrc,
      })),
      posts: (content.blog?.posts ?? []).map((post) => ({
        ...post,
        imageSrc: post.imageSrc === publicPath ? JOURNAL_POSTS[0].imageSrc : post.imageSrc,
        authorAvatarSrc:
          post.authorAvatarSrc === publicPath
            ? "/images/ambition-holiday-logo.webp"
            : post.authorAvatarSrc,
      })),
      features: (content.blog?.features ?? []).map((feature) => ({
        ...feature,
        iconSrc: feature.iconSrc === publicPath ? undefined : feature.iconSrc,
      })),
    },
    about: {
      ...content.about,
      wallpaperSrc:
        content.about?.wallpaperSrc === publicPath
          ? DEFAULT_CONTENT.about.wallpaperSrc
          : content.about?.wallpaperSrc || DEFAULT_CONTENT.about.wallpaperSrc,
      storyImageSrc:
        content.about?.storyImageSrc === publicPath
          ? DEFAULT_CONTENT.about.storyImageSrc
          : content.about?.storyImageSrc || DEFAULT_CONTENT.about.storyImageSrc,
      sisterImageSrc:
        content.about?.sisterImageSrc === publicPath
          ? DEFAULT_CONTENT.about.sisterImageSrc
          : content.about?.sisterImageSrc || DEFAULT_CONTENT.about.sisterImageSrc,
      pillars: (content.about?.pillars ?? []).map((pillar, index) => ({
        ...pillar,
        imageSrc:
          pillar.imageSrc === publicPath
            ? DEFAULT_CONTENT.about.pillars[index]?.imageSrc ?? DEFAULT_CONTENT.about.pillars[0].imageSrc
            : pillar.imageSrc,
      })),
    },
    legalDocuments: {
      ...content.legalDocuments,
      wallpaperSrc:
        content.legalDocuments?.wallpaperSrc === publicPath
          ? DEFAULT_CONTENT.legalDocuments.wallpaperSrc
          : content.legalDocuments?.wallpaperSrc || DEFAULT_CONTENT.legalDocuments.wallpaperSrc,
      documents: (content.legalDocuments?.documents ?? DEFAULT_CONTENT.legalDocuments.documents).map(
        (doc, index) => ({
          ...doc,
          imageSrc:
            doc.imageSrc === publicPath
              ? DEFAULT_CONTENT.legalDocuments.documents[index]?.imageSrc ?? ""
              : doc.imageSrc,
        }),
      ),
    },
    visa: {
      ...content.visa,
      wallpaperSrc:
        content.visa?.wallpaperSrc === publicPath
          ? DEFAULT_CONTENT.visa.wallpaperSrc
          : content.visa?.wallpaperSrc || DEFAULT_CONTENT.visa.wallpaperSrc,
      visaImageSrc:
        content.visa?.visaImageSrc === publicPath
          ? DEFAULT_CONTENT.visa.visaImageSrc
          : content.visa?.visaImageSrc || DEFAULT_CONTENT.visa.visaImageSrc,
      permitImageSrc:
        content.visa?.permitImageSrc === publicPath
          ? DEFAULT_CONTENT.visa.permitImageSrc
          : content.visa?.permitImageSrc || DEFAULT_CONTENT.visa.permitImageSrc,
      restrictedImageSrc:
        content.visa?.restrictedImageSrc === publicPath
          ? DEFAULT_CONTENT.visa.restrictedImageSrc
          : content.visa?.restrictedImageSrc || DEFAULT_CONTENT.visa.restrictedImageSrc,
      airportImageSrc:
        content.visa?.airportImageSrc === publicPath
          ? DEFAULT_CONTENT.visa.airportImageSrc
          : content.visa?.airportImageSrc || DEFAULT_CONTENT.visa.airportImageSrc,
      countries: (content.visa?.countries ?? []).map((country, index) => ({
        ...country,
        imageSrc:
          country.imageSrc === publicPath
            ? DEFAULT_CONTENT.visa.countries[index]?.imageSrc ?? DEFAULT_CONTENT.visa.countries[0].imageSrc
            : country.imageSrc,
      })),
    },
    bestTime: {
      ...content.bestTime,
      wallpaperSrc:
        content.bestTime?.wallpaperSrc === publicPath
          ? DEFAULT_CONTENT.bestTime.wallpaperSrc
          : content.bestTime?.wallpaperSrc || DEFAULT_CONTENT.bestTime.wallpaperSrc,
    },
    packing: {
      ...content.packing,
      wallpaperSrc:
        content.packing?.wallpaperSrc === publicPath
          ? DEFAULT_CONTENT.packing.wallpaperSrc
          : content.packing?.wallpaperSrc || DEFAULT_CONTENT.packing.wallpaperSrc,
    },
    altitude: {
      ...content.altitude,
      wallpaperSrc:
        content.altitude?.wallpaperSrc === publicPath
          ? DEFAULT_CONTENT.altitude.wallpaperSrc
          : content.altitude?.wallpaperSrc || DEFAULT_CONTENT.altitude.wallpaperSrc,
    },
    permits: {
      ...content.permits,
      wallpaperSrc:
        content.permits?.wallpaperSrc === publicPath
          ? DEFAULT_CONTENT.permits.wallpaperSrc
          : content.permits?.wallpaperSrc || DEFAULT_CONTENT.permits.wallpaperSrc,
    },
    nepal: stripDestinationMedia(content.nepal, DEFAULT_CONTENT.nepal, publicPath),
    bhutan: stripDestinationMedia(content.bhutan, DEFAULT_CONTENT.bhutan, publicPath),
    tibet: stripDestinationMedia(content.tibet, DEFAULT_CONTENT.tibet, publicPath),
    multi: stripDestinationMedia(content.multi, DEFAULT_CONTENT.multi, publicPath),
    helicopter: stripDestinationMedia(content.helicopter, DEFAULT_CONTENT.helicopter, publicPath),
    photography: stripDestinationMedia(content.photography, DEFAULT_CONTENT.photography, publicPath),
    tripPackages: (content.tripPackages ?? []).map((pkg) => ({
      ...pkg,
      heroSrc: pkg.heroSrc === publicPath ? "" : pkg.heroSrc,
      gallery: (pkg.gallery ?? []).filter((src) => src !== publicPath),
    })),
    footer: {
      ...content.footer,
      logoSrc: content.footer?.logoSrc === publicPath ? "" : content.footer?.logoSrc ?? "",
      landscapeImageSrc:
        content.footer?.landscapeImageSrc === publicPath
          ? DEFAULT_CONTENT.footer.landscapeImageSrc
          : content.footer?.landscapeImageSrc ?? DEFAULT_CONTENT.footer.landscapeImageSrc,
      members: (content.footer?.members ?? []).map((m) => ({
        ...m,
        imageSrc: m.imageSrc === publicPath ? "" : m.imageSrc,
      })),
      payments: (content.footer?.payments ?? []).map((p) => ({
        ...p,
        imageSrc: p.imageSrc === publicPath ? "" : p.imageSrc,
      })),
      socials: (content.footer?.socials ?? []).map((s) => ({
        ...s,
        iconSrc: s.iconSrc === publicPath ? undefined : s.iconSrc,
      })),
    },
  };
}

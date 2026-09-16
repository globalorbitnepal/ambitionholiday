import { promises as fs } from "fs";
import { contentDataDir, contentFilePath } from "@/lib/cms-paths";
import {
  DEFAULT_CONTENT,
  type ExploreHubTab,
  type ExploreHubTabId,
  type JourneyPackage,
  type ReviewBoard,
  type SiteContent,
  type TravelerReview,
} from "@/lib/content-types";

const GRID_JOURNEY_IDS = ["ebc", "abc", "mustang", "manaslu", "langtang", "gokyo", "heli", "mardi"];

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
  return boards.map((board, index) => ({
    ...DEFAULT_CONTENT.why.boards[index],
    ...board,
    platform: board.platform === "tripadvisor" ? "tripadvisor" : "google",
  }));
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
  const DATA_DIR = contentDataDir();
  const CONTENT_FILE = contentFilePath();
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(CONTENT_FILE);
  } catch {
    await fs.writeFile(CONTENT_FILE, JSON.stringify(DEFAULT_CONTENT, null, 2), "utf8");
  }
}

export async function readContent(): Promise<SiteContent> {
  try {
    await ensureContentFile();
    const raw = await fs.readFile(contentFilePath(), "utf8");
    const parsed = JSON.parse(raw) as SiteContent;
    return {
      ...DEFAULT_CONTENT,
      ...parsed,
      header: { ...DEFAULT_CONTENT.header, ...parsed.header },
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
        featured: parsed.blog?.featured ?? DEFAULT_CONTENT.blog.featured,
        sidePosts: parsed.blog?.sidePosts ?? DEFAULT_CONTENT.blog.sidePosts,
        features: parsed.blog?.features ?? DEFAULT_CONTENT.blog.features,
      },
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
        usefulLinks: parsed.footer?.usefulLinks ?? DEFAULT_CONTENT.footer.usefulLinks,
        adventureLinks: parsed.footer?.adventureLinks ?? DEFAULT_CONTENT.footer.adventureLinks,
        trekLinks: parsed.footer?.trekLinks ?? DEFAULT_CONTENT.footer.trekLinks,
        legalLinks: parsed.footer?.legalLinks ?? DEFAULT_CONTENT.footer.legalLinks,
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
    };
  } catch {
    return structuredClone(DEFAULT_CONTENT);
  }
}

export async function writeContent(content: SiteContent): Promise<SiteContent> {
  const DATA_DIR = contentDataDir();
  const CONTENT_FILE = contentFilePath();
  await fs.mkdir(DATA_DIR, { recursive: true });
  const next: SiteContent = {
    ...content,
    updatedAt: new Date().toISOString(),
  };
  const tmp = `${CONTENT_FILE}.${process.pid}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(next, null, 2), "utf8");
  await fs.rename(tmp, CONTENT_FILE);
  return next;
}

export function scrubUploadRefs(content: SiteContent, publicPath: string): SiteContent {
  const fallbackLogo = DEFAULT_CONTENT.header.logoSrc;

  return {
    ...content,
    header: {
      logoSrc: content.header.logoSrc === publicPath ? fallbackLogo : content.header.logoSrc,
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
      features: (content.blog?.features ?? []).map((feature) => ({
        ...feature,
        iconSrc: feature.iconSrc === publicPath ? undefined : feature.iconSrc,
      })),
    },
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

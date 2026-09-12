import { promises as fs } from "fs";
import { contentDataDir, contentFilePath } from "@/lib/cms-paths";
import { DEFAULT_CONTENT, type JourneyPackage, type SiteContent, type WhyCard } from "@/lib/content-types";

const FEATURED_JOURNEY_ORDER = ["ebc", "abc", "mustang"];

const LEGACY_PACKAGE_IMAGES: Record<string, string> = {
  "/images/packages/everest.jpg": "/images/packages/everest-v2.jpg",
  "/images/packages/annapurna.jpg": "/images/packages/annapurna-v2.jpg",
  "/images/packages/mustang.jpg": "/images/packages/mustang-v2.jpg",
};

function decorateJourneyPackages(packages: JourneyPackage[]): JourneyPackage[] {
  const mapped = packages.map((pkg) => {
    const fallback = DEFAULT_CONTENT.journeys.packages.find((item) => item.id === pkg.id);
    const fromUpload = pkg.imageSrc.startsWith("/uploads/") || pkg.imageSrc.startsWith("/api/media/");
    const imageSrc = fromUpload
      ? pkg.imageSrc
      : LEGACY_PACKAGE_IMAGES[pkg.imageSrc] || fallback?.imageSrc || pkg.imageSrc;
    return {
      ...fallback,
      ...pkg,
      imageSrc,
      badge: pkg.id === "mustang" && !pkg.badge ? fallback?.badge || pkg.badge : pkg.badge,
      subtitle: pkg.id === "mustang" && pkg.subtitle === "Luxury Journey" ? fallback?.subtitle || pkg.subtitle : pkg.subtitle,
      description:
        pkg.id === "ebc" && pkg.description.includes("private Himalayan trails")
          ? fallback?.description || pkg.description
          : pkg.id === "mustang" && pkg.description.includes("forbidden kingdom")
            ? fallback?.description || pkg.description
            : pkg.description,
      days: pkg.id === "mustang" && pkg.days === 11 ? fallback?.days || pkg.days : pkg.days,
      maxAltitude:
        pkg.id === "mustang" && pkg.maxAltitude === "4,200 m"
          ? fallback?.maxAltitude || pkg.maxAltitude
          : pkg.maxAltitude,
    };
  });

  return mapped.sort((a, b) => {
    const ai = FEATURED_JOURNEY_ORDER.indexOf(a.id);
    const bi = FEATURED_JOURNEY_ORDER.indexOf(b.id);
    if (ai === -1 && bi === -1) return 0;
    if (ai === -1) return 1;
    if (bi === -1) return -1;
    return ai - bi;
  });
}

const LEGACY_WHY_IMAGES: Record<string, string> = {
  "/images/why/years-photo.jpg": "/images/why/years-v2.jpg",
  "/images/why/reviews-photo.jpg": "/images/why/reviews-v2.jpg",
  "/images/why/guides-photo.jpg": "/images/why/guides-v2.jpg",
  "/images/why/stays-photo.jpg": "/images/why/stays-v2.jpg",
  "/images/why/support-photo.jpg": "/images/why/support-v2.jpg",
  "/images/why/responsible-photo.jpg": "/images/why/responsible-v2.jpg",
};

function decorateWhyCards(cards: WhyCard[]): WhyCard[] {
  return cards.map((card) => {
    const fallback = DEFAULT_CONTENT.why.cards.find((item) => item.id === card.id);
    const fromUpload = card.imageSrc.startsWith("/uploads/") || card.imageSrc.startsWith("/api/media/");
    return {
      ...fallback,
      ...card,
      imageSrc: fromUpload
        ? card.imageSrc
        : LEGACY_WHY_IMAGES[card.imageSrc] || fallback?.imageSrc || card.imageSrc,
      title: fallback?.title || card.title,
      body: fallback?.body || card.body,
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
      signature: {
        ...DEFAULT_CONTENT.signature,
        ...parsed.signature,
        images: (parsed.signature?.images ?? DEFAULT_CONTENT.signature.images).map(
          (image, index) => {
            const fallback = DEFAULT_CONTENT.signature.images[index];
            const legacy =
              image.src === "/images/signature/sig-live-1.webp" ||
              image.src === "/images/signature/sig-live-2.webp" ||
              image.src === "/images/signature/sig-live-3.jpg";
            return {
              ...fallback,
              ...image,
              src: legacy && fallback ? fallback.src : image.src,
              kicker: image.kicker || fallback?.kicker,
              title: image.title || fallback?.title,
              href: image.href || fallback?.href,
            };
          },
        ),
        highlights:
          parsed.signature?.highlights ?? DEFAULT_CONTENT.signature.highlights,
        features: (parsed.signature?.features ?? DEFAULT_CONTENT.signature.features).map(
          (feature, index) => {
            const fallback = DEFAULT_CONTENT.signature.features[index];
            return {
              ...fallback,
              ...feature,
              href: feature.href || fallback?.href,
            };
          },
        ),
      },
      journeys: {
        ...DEFAULT_CONTENT.journeys,
        ...parsed.journeys,
        categories: parsed.journeys?.categories ?? DEFAULT_CONTENT.journeys.categories,
        packages: decorateJourneyPackages(
          parsed.journeys?.packages ?? DEFAULT_CONTENT.journeys.packages,
        ),
        headlineGold:
          !parsed.journeys?.headlineGold ||
          parsed.journeys.headlineGold === "Luxury Treks"
            ? DEFAULT_CONTENT.journeys.headlineGold
            : parsed.journeys.headlineGold,
        headlineWhite:
          !parsed.journeys?.headlineWhite || parsed.journeys.headlineWhite === "in Nepal"
            ? DEFAULT_CONTENT.journeys.headlineWhite
            : parsed.journeys.headlineWhite,
      },
      why: {
        ...DEFAULT_CONTENT.why,
        ...parsed.why,
        eyebrow:
          !parsed.why?.eyebrow || parsed.why.eyebrow === "WHY TRAVEL WITH US"
            ? DEFAULT_CONTENT.why.eyebrow
            : parsed.why.eyebrow,
        headline:
          !parsed.why?.headline || parsed.why.headline === "Why Ambition Holidays"
            ? DEFAULT_CONTENT.why.headline
            : parsed.why.headline,
        headlineWhite: DEFAULT_CONTENT.why.headlineWhite,
        headlineGold: DEFAULT_CONTENT.why.headlineGold,
        body:
          !parsed.why?.body || parsed.why.body.includes("We don't just organize trips")
            ? DEFAULT_CONTENT.why.body
            : parsed.why.body,
        ctaLabel: parsed.why?.ctaLabel || DEFAULT_CONTENT.why.ctaLabel,
        ctaHref: parsed.why?.ctaHref || DEFAULT_CONTENT.why.ctaHref,
        awardTitle:
          !parsed.why?.awardTitle || parsed.why.awardTitle === "Proudly Recognized for Excellence"
            ? DEFAULT_CONTENT.why.awardTitle
            : parsed.why.awardTitle,
        awardSubtitle:
          !parsed.why?.awardSubtitle || parsed.why.awardSubtitle.includes("Awarded by TripAdvisor")
            ? DEFAULT_CONTENT.why.awardSubtitle
            : parsed.why.awardSubtitle,
        cards: decorateWhyCards(parsed.why?.cards ?? DEFAULT_CONTENT.why.cards),
        ratings: (parsed.why?.ratings ?? DEFAULT_CONTENT.why.ratings).map((rating) =>
          rating.id === "ta" && rating.value === "410+ Reviews"
            ? { ...rating, value: "400+ Reviews" }
            : rating,
        ),
      },
      experiences: {
        ...DEFAULT_CONTENT.experiences,
        ...parsed.experiences,
        theme: {
          ...DEFAULT_CONTENT.experiences.theme,
          ...parsed.experiences?.theme,
          // Homepage light luxury theme: coerce legacy dark CMS colors.
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
          const removed = new Set(["heli", "wellness"]);
          const fromSaved = (parsed.experiences?.cards ?? [])
            .filter((card) => !removed.has(card.id))
            .filter(
              (card) =>
                !/helicopter experience/i.test(card.title) &&
                !/wellness journey/i.test(card.title),
            );
          const source =
            fromSaved.length > 0 ? fromSaved : DEFAULT_CONTENT.experiences.cards;
          return source.map((card, index) => ({
            ...DEFAULT_CONTENT.experiences.cards[index],
            ...card,
            countLabel:
              card.countLabel ??
              DEFAULT_CONTENT.experiences.cards[index]?.countLabel ??
              "",
            ctaLabel:
              card.ctaLabel ??
              DEFAULT_CONTENT.experiences.cards[index]?.ctaLabel ??
              "EXPLORE MORE",
          }));
        })(),
      },
      availability: {
        ...DEFAULT_CONTENT.availability,
        ...parsed.availability,
        cards: parsed.availability?.cards ?? DEFAULT_CONTENT.availability.cards,
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
    signature: {
      ...content.signature,
      images: content.signature.images.filter((img) => img.src !== publicPath),
    },
    journeys: {
      ...content.journeys,
      packages: content.journeys.packages.map((pkg) =>
        pkg.imageSrc === publicPath
          ? { ...pkg, imageSrc: DEFAULT_CONTENT.journeys.packages[0]?.imageSrc ?? pkg.imageSrc }
          : pkg,
      ),
    },
    why: {
      ...content.why,
      cards: content.why.cards.map((card, index) => ({
        ...card,
        imageSrc:
          card.imageSrc === publicPath
            ? DEFAULT_CONTENT.why.cards[index]?.imageSrc ?? DEFAULT_CONTENT.why.cards[0].imageSrc
            : card.imageSrc,
        iconSrc: card.iconSrc === publicPath ? undefined : card.iconSrc,
      })),
      ratings: content.why.ratings.map((rating) => ({
        ...rating,
        logoSrc: rating.logoSrc === publicPath ? undefined : rating.logoSrc,
      })),
    },
    experiences: {
      ...content.experiences,
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

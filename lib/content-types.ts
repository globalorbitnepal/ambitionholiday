export type StatItem = {
  id: string;
  label: string;
  iconKey: "tripadvisor" | "years" | "price" | "responsible" | "custom";
  iconSrc?: string;
};

export type SignatureImage = {
  id: string;
  src: string;
  alt: string;
  kicker?: string;
  title?: string;
  href?: string;
};

export type SignatureHighlight = {
  id: string;
  icon: "peaks" | "compass" | "heart";
  title: string;
  subtitle: string;
};

export type SignatureFeature = {
  id: string;
  icon: "hiker" | "peaks" | "lodge";
  title: string;
  subtitle: string;
  href?: string;
};

export type JourneyCategoryIcon = "peaks" | "helicopter";

export type JourneyCategory = {
  id: string;
  label: string;
  icon: JourneyCategoryIcon;
};

export type JourneyPackage = {
  id: string;
  title: string;
  subtitle: string;
  location: string;
  categoryIds: string[];
  badge: string;
  days: number;
  maxAltitude: string;
  difficulty: string;
  description: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
};

export type JourneysContent = {
  visible: boolean;
  wallpaperSrc: string;
  eyebrow: string;
  headlineGold: string;
  headlineWhite: string;
  line1: string;
  line2: string;
  allLabel: string;
  categories: JourneyCategory[];
  packages: JourneyPackage[];
};

export type ReviewPlatform = "google" | "tripadvisor";

export type ReviewBoard = {
  id: string;
  platform: ReviewPlatform;
  title: string;
  ratingValue: string;
  ratingCount: string;
  ctaLabel: string;
  ctaHref: string;
  logoSrc?: string;
};

export type TravelerReview = {
  id: string;
  platform: ReviewPlatform;
  name: string;
  avatarSrc: string;
  avatarAlt: string;
  meta: string;
  rating: number;
  dateLabel: string;
  title: string;
  body: string;
  moreLabel: string;
  moreHref: string;
  trekEyebrow: string;
  trekName: string;
};

export type WhyContent = {
  visible: boolean;
  wallpaperSrc: string;
  kickerLeft: string;
  kickerRight: string;
  eyebrow: string;
  headlineWhite: string;
  headlineGold: string;
  subtitle: string;
  sisterLine: string;
  stats: string[];
  boards: ReviewBoard[];
  reviews: TravelerReview[];
  quote: string;
  quoteBy: string;
};

export type ExperienceIcon =
  | "heli"
  | "lodge"
  | "culture"
  | "flight"
  | "wellness"
  | "wildlife"
  | "custom";

export type ExperienceCard = {
  id: string;
  title: string;
  /** e.g. "12 Experiences" */
  countLabel: string;
  body: string;
  imageSrc: string;
  imageAlt: string;
  icon: ExperienceIcon;
  iconSrc?: string;
  href: string;
  ctaLabel: string;
};

export type ExperiencesTheme = {
  sectionBg: string;
  cardBg: string;
  textColor: string;
  mutedTextColor: string;
  goldColor: string;
  borderColor: string;
  /** Optional mountain / art band at section bottom */
  backgroundImageSrc: string;
  showBackgroundArt: boolean;
};

export type ExperiencesContent = {
  visible: boolean;
  wallpaperSrc: string;
  eyebrow: string;
  headlineWhite: string;
  headlineGold: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
  theme: ExperiencesTheme;
  cards: ExperienceCard[];
};

export type AvailabilityRouteIcon = "peaks" | "temple" | "trek" | "heli" | "custom";

export type AvailabilityRoute = {
  id: string;
  label: string;
  icon: AvailabilityRouteIcon;
  iconSrc?: string;
};

export type AvailabilityCard = {
  id: string;
  monthShort: string;
  monthFull: string;
  badge: string;
  title: string;
  body: string;
  imageSrc: string;
  imageAlt: string;
  routes: AvailabilityRoute[];
  availableCount: number;
  availableLabel: string;
  ctaLabel: string;
  ctaHref: string;
  /** Animated LIVE badge on the card */
  live: boolean;
  /** Show this month on the homepage */
  visible: boolean;
};

export type AvailabilityFootItem = {
  id: string;
  title: string;
  body: string;
  icon: "calendar" | "secure" | "concierge" | "custom";
  iconSrc?: string;
};

export type AvailabilityContent = {
  visible: boolean;
  wallpaperSrc: string;
  eyebrow: string;
  headlineBefore: string;
  headlineGold: string;
  headlineAfter: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
  cards: AvailabilityCard[];
  footItems: AvailabilityFootItem[];
  liveLabel: string;
  liveTimestamp: string;
};

export type JournalVideo = {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  /** Poster / thumbnail image */
  imageSrc: string;
  imageAlt: string;
  /**
   * YouTube watch/share URL or ID, or uploaded /uploads/*.mp4 path.
   * Empty = preview-only until Orbit adds a video.
   */
  videoSrc: string;
};

export type JournalFeatureIcon = "peaks" | "camera" | "play" | "heart" | "custom";

export type JournalFeature = {
  id: string;
  title: string;
  body: string;
  icon: JournalFeatureIcon;
  iconSrc?: string;
};

export type JournalContent = {
  visible: boolean;
  eyebrow: string;
  headlineBefore: string;
  headlineGold: string;
  headlineAfter: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
  videos: JournalVideo[];
  features: JournalFeature[];
};

export type BlogBadgeStyle = "featured" | "outline" | "none";

export type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  /** Top-left badge on featured cards, e.g. "★ FEATURED" */
  badge: string;
  badgeStyle: BlogBadgeStyle;
  date: string;
  readTime: string;
  authorName: string;
  authorAvatarSrc: string;
  imageSrc: string;
  imageAlt: string;
  href: string;
};

export type BlogFeatureIcon = "pen" | "camera" | "peaks" | "compass" | "custom";

export type BlogFeature = {
  id: string;
  title: string;
  body: string;
  icon: BlogFeatureIcon;
  iconSrc?: string;
};

export type BlogContent = {
  visible: boolean;
  eyebrow: string;
  /** e.g. Stories */
  headlineBefore: string;
  /** e.g. from the — rendered in gold italic script */
  headlineScript: string;
  /** e.g. Himalayas */
  headlineAfter: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
  /** Large image cards (typically 2) */
  featured: BlogPost[];
  /** Compact list column (typically 3) */
  sidePosts: BlogPost[];
  features: BlogFeature[];
};

export type FooterLink = {
  id: string;
  label: string;
  href: string;
};

export type FooterSocialNetwork =
  | "facebook"
  | "twitter"
  | "instagram"
  | "youtube"
  | "linkedin"
  | "custom";

export type FooterSocial = {
  id: string;
  label: string;
  href: string;
  network: FooterSocialNetwork;
  iconSrc?: string;
};

export type FooterBrandLogo = {
  id: string;
  label: string;
  imageSrc: string;
  href: string;
};

export type FooterContent = {
  visible: boolean;
  membersTitle: string;
  members: FooterBrandLogo[];
  socialTitle: string;
  socials: FooterSocial[];
  paymentsTitle: string;
  payments: FooterBrandLogo[];
  payNowLabel: string;
  payNowHref: string;
  showLandscape: boolean;
  /** Luxury Himalayan silhouette scene (stupa, trekker, elephant, peaks) */
  landscapeImageSrc: string;
  /** Brand-row award / art (replaces mountain mark) */
  brandArtSrc: string;
  helpTitle: string;
  helpBody: string;
  phones: FooterLink[];
  email: string;
  emailHref: string;
  hours: string;
  usefulTitle: string;
  usefulLinks: FooterLink[];
  adventuresTitle: string;
  adventureLinks: FooterLink[];
  treksTitle: string;
  trekLinks: FooterLink[];
  newsletterTitle: string;
  newsletterPlaceholder: string;
  newsletterNote: string;
  /** Falls back to header logo when empty */
  logoSrc: string;
  brandTagline: string;
  mission: string;
  missionScript: string;
  copyright: string;
  legalLinks: FooterLink[];
  creditPrefix: string;
  creditName: string;
  creditHref: string;
};

export type SignatureStatIcon = "luggage" | "tripadvisor" | "headset" | "guide" | "custom";
export type SignatureCardIcon = "peaks" | "heli" | "lodge" | "temple" | "custom";
export type SignatureFootIcon = "leaf" | "people" | "shield" | "pin" | "globe" | "custom";

export type SignatureStat = {
  id: string;
  icon: SignatureStatIcon;
  iconSrc?: string;
  value: string;
  title: string;
  subtitle: string;
};

export type SignatureStoryCard = {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
  icon: SignatureCardIcon;
  iconSrc?: string;
};

export type SignatureFootItem = {
  id: string;
  icon: SignatureFootIcon;
  iconSrc?: string;
  title: string;
  subtitle: string;
};

export type SignatureContent = {
  visible: boolean;
  wallpaperSrc: string;
  kicker: string;
  scriptRight: string;
  eyebrow: string;
  headlineWhite: string;
  headlineGold: string;
  sisterLabel: string;
  sisterName: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
  stats: SignatureStat[];
  cards: SignatureStoryCard[];
  footItems: SignatureFootItem[];
  footScript: string;
};

export type ExploreHubPillarIcon =
  | "diamond"
  | "people"
  | "shield"
  | "leaf"
  | "headset"
  | "custom";

export type ExploreHubCardIcon =
  | "mountain"
  | "temple"
  | "globe"
  | "calendar"
  | "tag"
  | "tent"
  | "custom";

export type ExploreHubTabId = "destinations" | "types" | "duration" | "offers";

export type ExploreHubPillar = {
  id: string;
  title: string;
  icon: ExploreHubPillarIcon;
  iconSrc?: string;
};

export type ExploreHubCard = {
  id: string;
  title: string;
  subtitle: string;
  meta: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
  icon: ExploreHubCardIcon;
  iconSrc?: string;
};

export type ExploreHubTab = {
  id: ExploreHubTabId;
  label: string;
  cards: ExploreHubCard[];
};

export type ExploreHubContent = {
  visible: boolean;
  wallpaperSrc: string;
  eyebrow: string;
  headline: string;
  headlineLine2: string;
  body: string;
  pillars: ExploreHubPillar[];
  tabs: ExploreHubTab[];
  tabHint: string;
  ctaLabel: string;
  ctaHref: string;
  footLeft: string;
  footRight: string;
};

export type SiteContent = {
  updatedAt: string;
  header: {
    logoSrc: string;
  };
  atmosphere: {
    imageSrc: string;
  };
  hero: {
    visible: boolean;
    taglineWords: string[];
    headline: string;
    searchPlaceholder: string;
    videoSrc: string;
    posterSrc: string;
    statsVisible: boolean;
    stats: StatItem[];
  };
  exploreHub: ExploreHubContent;
  signature: SignatureContent;
  journeys: JourneysContent;
  why: WhyContent;
  experiences: ExperiencesContent;
  availability: AvailabilityContent;
  journal: JournalContent;
  blog: BlogContent;
  footer: FooterContent;
};

export const DEFAULT_CONTENT: SiteContent = {
  updatedAt: new Date(0).toISOString(),
  header: {
    logoSrc: "/images/ambition-holiday-logo.png",
  },
  atmosphere: {
    imageSrc: "/images/atmosphere/himalaya-dusk-peaks-v3.jpg",
  },
  hero: {
    visible: true,
    taglineWords: ["Discover", "Your", "Luxury", "Tour", "&", "Trek"],
    headline: "Start Planning Your Journey",
    searchPlaceholder: "Find an Adventure",
    videoSrc: "/videos/hero-bg.mp4",
    posterSrc: "/images/hero-video-poster.jpg",
    statsVisible: true,
    stats: [
      { id: "tripadvisor", label: "410+ TripAdvisor reviews", iconKey: "tripadvisor" },
      { id: "years", label: "11+ years of experience", iconKey: "years" },
      { id: "price", label: "Best price guarantee", iconKey: "price" },
      { id: "responsible", label: "Responsible tourism", iconKey: "responsible" },
    ],
  },
  signature: {
    visible: true,
    wallpaperSrc: "/images/signature/sig-wallpaper.jpg",
    kicker: "EXPLORE  |  EXPERIENCE  |  BELONG",
    scriptRight: "More Than a Trip, A Deeper Connection.",
    eyebrow: "LUXURY TRAVEL EXPERIENCES",
    headlineWhite: "Ambition",
    headlineGold: "Holidays",
    sisterLabel: "Sister Company of",
    sisterName: "Ambition Himalaya Treks and Expeditions",
    body: "Your gateway to extraordinary journeys across Nepal, Bhutan, Tibet and beyond. Curated luxury experiences with local expertise, authentic encounters and unforgettable memories.",
    ctaLabel: "Explore All Packages",
    ctaHref: "/luxury-treks",
    stats: [
      {
        id: "st-packages",
        icon: "luggage",
        value: "40+",
        title: "Luxury Packages",
        subtitle: "Handpicked for You",
      },
      {
        id: "st-reviews",
        icon: "tripadvisor",
        value: "415+",
        title: "Tripadvisor Reviews",
        subtitle: "4.9/5",
      },
      {
        id: "st-support",
        icon: "headset",
        value: "24/7",
        title: "Customer Support",
        subtitle: "Always Here for You",
      },
      {
        id: "st-guides",
        icon: "guide",
        value: "Expert",
        title: "Local Guides",
        subtitle: "Born in the Himalayas",
      },
    ],
    cards: [
      {
        id: "sc-everest",
        badge: "12+ Packages",
        title: "Everest Region",
        subtitle: "Trek to the Top of the World",
        href: "/everest-region",
        imageSrc: "/images/signature/sig-everest.jpg",
        imageAlt: "Trekker on a ridge facing Everest peaks",
        icon: "peaks",
      },
      {
        id: "sc-heli",
        badge: "8+ Packages",
        title: "Helicopter Tours",
        subtitle: "See the Himalayas Like Never Before",
        href: "/luxury-helicopter-treks",
        imageSrc: "/images/signature/sig-heli.jpg",
        imageAlt: "Helicopter flying over Himalayan peaks",
        icon: "heli",
      },
      {
        id: "sc-lodge",
        badge: "10+ Packages",
        title: "Luxury Getaways",
        subtitle: "Premium Stays in Breathtaking Locations",
        href: "/luxury-lodges-stays",
        imageSrc: "/images/signature/sig-lodge.jpg",
        imageAlt: "Luxury lodge infinity pool facing snow mountains",
        icon: "lodge",
      },
      {
        id: "sc-culture",
        badge: "10+ Packages",
        title: "Cultural Journeys",
        subtitle: "Heritage, Spirituality and Living Traditions",
        href: "/cultural-tours",
        imageSrc: "/images/signature/sig-culture.jpg",
        imageAlt: "Buddhist stupa with prayer flags in the Himalayas",
        icon: "temple",
      },
    ],
    footItems: [
      {
        id: "sf-1",
        icon: "leaf",
        title: "Sustainable Travel",
        subtitle: "Leave a Positive Impact",
      },
      {
        id: "sf-2",
        icon: "people",
        title: "Small Groups",
        subtitle: "More Personal Experiences",
      },
      {
        id: "sf-3",
        icon: "shield",
        title: "Safe & Hassle-Free",
        subtitle: "Your Safety, Our Priority",
      },
      {
        id: "sf-4",
        icon: "pin",
        title: "Local Communities",
        subtitle: "Travel with a Purpose",
      },
      {
        id: "sf-5",
        icon: "globe",
        title: "Multi-Country Tours",
        subtitle: "Nepal, Bhutan, Tibet & Beyond",
      },
    ],
    footScript: "Extraordinary Journeys Await",
  },
  exploreHub: {
    visible: true,
    wallpaperSrc: "/images/explore-hub/hub-wallpaper.jpg",
    eyebrow: "WHY TRAVEL WITH US",
    headline: "More Than a Trip,",
    headlineLine2: "A Meaningful Journey",
    body: "Handpicked experiences, local expertise and dedicated support to make your Himalayan journey unforgettable.",
    pillars: [
      { id: "p1", title: "Curated Luxury Experiences", icon: "diamond" },
      { id: "p2", title: "Local Experts & Guides", icon: "people" },
      { id: "p3", title: "Safe & Seamless Travel", icon: "shield" },
      { id: "p4", title: "Responsible Tourism", icon: "leaf" },
      { id: "p5", title: "24/7 Support", icon: "headset" },
    ],
    tabHint: "Explore a world of extraordinary journeys.",
    ctaLabel: "View All Packages",
    ctaHref: "/luxury-treks",
    footLeft: "DISCOVER  ·  EXPLORE  ·  EXPERIENCE",
    footRight: "JOURNEYS BEYOND LIMITS",
    tabs: [
      {
        id: "destinations",
        label: "Popular Destinations",
        cards: [
          {
            id: "dest-nepal",
            title: "Nepal",
            subtitle: "The Heart of the Himalayas",
            meta: "20+ Packages",
            href: "/nepal",
            imageSrc: "/images/explore-hub/hub-nepal.jpg",
            imageAlt: "Golden stupa among pines with Himalayan peaks",
            icon: "mountain",
          },
          {
            id: "dest-bhutan",
            title: "Bhutan",
            subtitle: "The Land of Gross National Happiness",
            meta: "12+ Packages",
            href: "/bhutan",
            imageSrc: "/images/explore-hub/hub-bhutan.jpg",
            imageAlt: "Tiger's Nest monastery on a cliff in Bhutan",
            icon: "mountain",
          },
          {
            id: "dest-tibet",
            title: "Tibet",
            subtitle: "Roof of the World",
            meta: "10+ Packages",
            href: "/tibet",
            imageSrc: "/images/explore-hub/hub-tibet.jpg",
            imageAlt: "Potala Palace against snow mountains",
            icon: "temple",
          },
          {
            id: "dest-multi",
            title: "Multi-Country",
            subtitle: "One Journey, Many Worlds",
            meta: "8+ Packages",
            href: "/himalayan-multi-countries",
            imageSrc: "/images/explore-hub/hub-multi.jpg",
            imageAlt: "Stupa with prayer flags and Himalayan peaks",
            icon: "globe",
          },
        ],
      },
      {
        id: "types",
        label: "Tour Types",
        cards: [
          {
            id: "type-lodge",
            title: "Luxury Lodge Treks",
            subtitle: "Refined comfort on the trail",
            meta: "18+ Packages",
            href: "/luxury-lodges-stays",
            imageSrc: "/images/explore-hub/hub-tour-lodge.jpg",
            imageAlt: "Luxury Himalayan lodge overlooking snow peaks",
            icon: "tent",
          },
          {
            id: "type-culture",
            title: "Cultural Tours",
            subtitle: "Temples, heritage and living tradition",
            meta: "14+ Packages",
            href: "/cultural-tours",
            imageSrc: "/images/explore-hub/hub-tour-culture.jpg",
            imageAlt: "Historic temple square in Nepal",
            icon: "temple",
          },
          {
            id: "type-safari",
            title: "Wildlife Safaris",
            subtitle: "Jungles, rhinos and river plains",
            meta: "9+ Packages",
            href: "/wildlife-safari",
            imageSrc: "/images/explore-hub/hub-tour-safari.jpg",
            imageAlt: "One-horned rhino in grassland safari",
            icon: "mountain",
          },
          {
            id: "type-heli",
            title: "Helicopter Experiences",
            subtitle: "Peaks, glaciers and sky-high views",
            meta: "7+ Packages",
            href: "/luxury-helicopter-treks",
            imageSrc: "/images/explore-hub/hub-tour-heli.jpg",
            imageAlt: "Helicopter flying over Himalayan glaciers",
            icon: "globe",
          },
        ],
      },
      {
        id: "duration",
        label: "By Duration",
        cards: [
          {
            id: "dur-short",
            title: "1–3 Days",
            subtitle: "Short escapes & scenic flights",
            meta: "16+ Packages",
            href: "/short-tours",
            imageSrc: "/images/explore-hub/hub-dur-short.jpg",
            imageAlt: "Forest trail viewpoint over a Himalayan valley",
            icon: "calendar",
          },
          {
            id: "dur-week",
            title: "4–7 Days",
            subtitle: "Classic week-long journeys",
            meta: "22+ Packages",
            href: "/week-tours",
            imageSrc: "/images/explore-hub/hub-dur-week.jpg",
            imageAlt: "Alpine meadow with prayer flags and peaks",
            icon: "calendar",
          },
          {
            id: "dur-fortnight",
            title: "8–14 Days",
            subtitle: "Signature treks & circuits",
            meta: "19+ Packages",
            href: "/luxury-treks",
            imageSrc: "/images/explore-hub/hub-dur-fortnight.jpg",
            imageAlt: "High mountain pass and glaciers",
            icon: "mountain",
          },
          {
            id: "dur-long",
            title: "15+ Days",
            subtitle: "Expeditions without compromise",
            meta: "8+ Packages",
            href: "/expeditions",
            imageSrc: "/images/explore-hub/hub-dur-long.jpg",
            imageAlt: "High-altitude camp near a snow peak at dusk",
            icon: "tent",
          },
        ],
      },
      {
        id: "offers",
        label: "Special Offers",
        cards: [
          {
            id: "offer-everest",
            title: "Early Bird Everest",
            subtitle: "Reserve the season’s finest lodges",
            meta: "Limited Season",
            href: "/luxury-everest-base-camp-trek",
            imageSrc: "/images/explore-hub/hub-offer-everest.jpg",
            imageAlt: "Sunrise over Everest region peaks",
            icon: "tag",
          },
          {
            id: "offer-bhutan",
            title: "Shoulder Season Bhutan",
            subtitle: "Quieter trails, richer light",
            meta: "Save on Festivals",
            href: "/bhutan",
            imageSrc: "/images/explore-hub/hub-offer-bhutan.jpg",
            imageAlt: "Bhutan valley monastery in misty hills",
            icon: "tag",
          },
          {
            id: "offer-festival",
            title: "Festival Specials",
            subtitle: "Sacred days, living colour",
            meta: "Seasonal Dates",
            href: "/festivals",
            imageSrc: "/images/explore-hub/hub-offer-festival.jpg",
            imageAlt: "Monastery courtyard with prayer flags",
            icon: "temple",
          },
          {
            id: "offer-honeymoon",
            title: "Honeymoon Escape",
            subtitle: "Private lodges and sunset peaks",
            meta: "Couples Only",
            href: "/honeymoon",
            imageSrc: "/images/explore-hub/hub-offer-honeymoon.jpg",
            imageAlt: "Luxury lodge balcony overlooking snow mountains",
            icon: "globe",
          },
        ],
      },
    ],
  },
  journeys: {
    visible: true,
    wallpaperSrc: "/images/journeys/journeys-wallpaper.jpg",
    eyebrow: "HANDCRAFTED JOURNEYS",
    headlineGold: "Luxury Tour & Treks",
    headlineWhite: "in Nepal",
    line1: "Premium Experiences in the Himalayas",
    line2: "Iconic destinations. Luxury stays. Expert guides. Unforgettable journeys.",
    allLabel: "All Treks",
    categories: [
      { id: "everest", label: "Everest Region", icon: "peaks" },
      { id: "annapurna", label: "Annapurna Region", icon: "peaks" },
      { id: "mustang", label: "Mustang Region", icon: "peaks" },
      { id: "helicopter", label: "Helicopter Experiences", icon: "helicopter" },
    ],
    packages: [
      {
        id: "ebc",
        title: "Everest Base Camp Trek",
        subtitle: "Luxury Package",
        location: "Everest Region, Nepal",
        categoryIds: ["everest"],
        badge: "Most Popular",
        days: 14,
        maxAltitude: "5,364 m",
        difficulty: "Moderate",
        description: "A Journey to the World's Highest Dreams",
        href: "/luxury-everest-base-camp-trek",
        imageSrc: "/images/journeys/j-ebc.jpg",
        imageAlt: "Trekker watching sunrise over Everest peaks",
      },
      {
        id: "abc",
        title: "Annapurna Base Camp Trek",
        subtitle: "Luxury Package",
        location: "Annapurna Region, Nepal",
        categoryIds: ["annapurna"],
        badge: "Best Seller",
        days: 12,
        maxAltitude: "4,130 m",
        difficulty: "Moderate",
        description: "Sanctuary of Majestic Peaks",
        href: "/luxury-annapurna-base-camp-trek",
        imageSrc: "/images/journeys/j-abc.jpg",
        imageAlt: "Luxury Annapurna lodge terrace with a fire pit at dusk",
      },
      {
        id: "mustang",
        title: "Upper Mustang Trek",
        subtitle: "Luxury Package",
        location: "Mustang Region, Nepal",
        categoryIds: ["mustang"],
        badge: "Exclusive",
        days: 16,
        maxAltitude: "3,840 m",
        difficulty: "Moderate",
        description: "The Last Forbidden Kingdom",
        href: "/luxury-upper-mustang-trek",
        imageSrc: "/images/journeys/j-mustang.jpg",
        imageAlt: "White-walled monastery on ochre Mustang cliffs",
      },
      {
        id: "manaslu",
        title: "Manaslu Circuit Trek",
        subtitle: "Luxury Package",
        location: "Manaslu Region, Nepal",
        categoryIds: ["everest"],
        badge: "Heritage Journey",
        days: 14,
        maxAltitude: "5,160 m",
        difficulty: "Challenging",
        description: "Raw Beauty, Rare Encounters",
        href: "/luxury-manaslu-circuit-trek",
        imageSrc: "/images/journeys/j-manaslu.jpg",
        imageAlt: "Prayer flags on the Manaslu circuit with snow peaks",
      },
      {
        id: "langtang",
        title: "Langtang Valley Trek",
        subtitle: "Luxury Package",
        location: "Langtang Region, Nepal",
        categoryIds: ["annapurna"],
        badge: "Hidden Gem",
        days: 8,
        maxAltitude: "3,870 m",
        difficulty: "Moderate",
        description: "Close to Nature, Far from Ordinary",
        href: "/langtang-region",
        imageSrc: "/images/journeys/j-langtang.jpg",
        imageAlt: "Langtang valley village beneath snow peaks",
      },
      {
        id: "gokyo",
        title: "Gokyo Lakes Trek",
        subtitle: "Luxury Package",
        location: "Everest Region, Nepal",
        categoryIds: ["everest"],
        badge: "Stunning Lakes",
        days: 12,
        maxAltitude: "5,357 m",
        difficulty: "Challenging",
        description: "Turquoise Lakes, Towering Giants",
        href: "/everest-region",
        imageSrc: "/images/journeys/j-gokyo.jpg",
        imageAlt: "Turquoise Gokyo lakes surrounded by Himalayan peaks",
      },
      {
        id: "heli",
        title: "Everest Helicopter Tour",
        subtitle: "Luxury Package",
        location: "Everest Region, Nepal",
        categoryIds: ["helicopter", "everest"],
        badge: "Helicopter Experience",
        days: 1,
        maxAltitude: "5,500 m",
        difficulty: "Easy",
        description: "Majesty from the Skies",
        href: "/luxury-helicopter-treks",
        imageSrc: "/images/journeys/j-heli.jpg",
        imageAlt: "Red helicopter flying over snow-capped Himalayan peaks",
      },
      {
        id: "mardi",
        title: "Mardi Himal Trek",
        subtitle: "Luxury Package",
        location: "Annapurna Region, Nepal",
        categoryIds: ["annapurna"],
        badge: "Cultural & Spiritual",
        days: 7,
        maxAltitude: "4,500 m",
        difficulty: "Moderate",
        description: "A Short Trek to Stunning Views",
        href: "/annapurna-region",
        imageSrc: "/images/journeys/j-mardi.jpg",
        imageAlt: "Hiker on the Mardi Himal ridge at sunrise",
      },
    ],
  },
  why: {
    visible: true,
    wallpaperSrc: "/images/reviews/reviews-wallpaper.jpg",
    kickerLeft: "Authentic Reviews from Real Journeys",
    kickerRight: "Mountains Create Better Humans",
    eyebrow: "REAL TRAVELERS. REAL STORIES",
    headlineWhite: "What Our",
    headlineGold: "Travelers Say",
    subtitle: "Reviews for Ambition Himalaya Treks and Expeditions",
    sisterLine: "Proud sister company of Ambition Holidays",
    stats: [
      "10+ Years of Experience",
      "Thousands of Happy Travelers",
      "Trusted by Adventurers Worldwide",
    ],
    boards: [
      {
        id: "google",
        platform: "google",
        title: "Google Reviews",
        ratingValue: "4.9/5",
        ratingCount: "From 120+ Google Reviews",
        ctaLabel: "View All on Google",
        ctaHref: "https://www.google.com/maps/search/?api=1&query=Ambition+Himalaya+Treks+and+Expeditions",
      },
      {
        id: "tripadvisor",
        platform: "tripadvisor",
        title: "Tripadvisor Reviews",
        ratingValue: "4.8/5",
        ratingCount: "From 295+ Tripadvisor Reviews",
        ctaLabel: "View All on Tripadvisor",
        ctaHref: "https://www.tripadvisor.com/Search?q=Ambition%20Himalaya%20Treks%20and%20Expeditions",
        logoSrc: "/images/reviews/tripadvisor-owl.png",
      },
    ],
    reviews: [
      {
        id: "g-alexandra",
        platform: "google",
        name: "Alexandra G",
        avatarSrc: "",
        avatarAlt: "Alexandra G",
        meta: "Local Guide · 21 reviews · 13 photos",
        rating: 5,
        dateLabel: "4 months ago",
        title: "",
        body: "One of the most memorable experiences of my life. From day one, Shishir was incredibly welcoming and friendly, organising a fantastic day tour of Kathmandu for us...",
        moreLabel: "Read more",
        moreHref: "https://www.google.com/maps/search/?api=1&query=Ambition+Himalaya+Treks+and+Expeditions",
        trekEyebrow: "Traveled with Ambition Himalaya",
        trekName: "Everest Base Camp Trek",
      },
      {
        id: "g-robert",
        platform: "google",
        name: "Robert McCann",
        avatarSrc: "",
        avatarAlt: "Robert McCann",
        meta: "Local Guide · 20 reviews · 53 photos",
        rating: 5,
        dateLabel: "Edited a year ago",
        title: "",
        body: "I used Ambition Himalaya for an Everest Base Camp trek recently and it was the perfect trip from start to finish. Shishir was very quick and helpful in answering my questions...",
        moreLabel: "Read more",
        moreHref: "https://www.google.com/maps/search/?api=1&query=Ambition+Himalaya+Treks+and+Expeditions",
        trekEyebrow: "Traveled with Ambition Himalaya",
        trekName: "Everest Base Camp Trek",
      },
      {
        id: "ta-wanda",
        platform: "tripadvisor",
        name: "Wanda J Estes",
        avatarSrc: "/images/reviews/avatar-wanda.jpg",
        avatarAlt: "Wanda J Estes",
        meta: "1 contribution",
        rating: 5,
        dateLabel: "Sep 2026 · Friends",
        title: "Never thought my first trek would Be ebc",
        body: "I never thought my first trek would turn out this good. everest base camp was challenging for me, but having the ambition himalaya team made a big difference...",
        moreLabel: "Read more",
        moreHref: "https://www.tripadvisor.com/Search?q=Ambition%20Himalaya%20Treks%20and%20Expeditions",
        trekEyebrow: "Traveled with Ambition Himalaya",
        trekName: "14 days Everest Base Camp Trek",
      },
      {
        id: "ta-daniel",
        platform: "tripadvisor",
        name: "Daniel",
        avatarSrc: "/images/reviews/avatar-daniel.jpg",
        avatarAlt: "Daniel",
        meta: "4 contributions",
        rating: 5,
        dateLabel: "Jul 2026 · Friends",
        title: "45 Days in nepal, and this became my...",
        body: "After 45 days of traveling around nepal, this trek was easily one of my favorite experiences. the annapurna views were incredible, and the people we met were so warm and welcoming...",
        moreLabel: "Read more",
        moreHref: "https://www.tripadvisor.com/Search?q=Ambition%20Himalaya%20Treks%20and%20Expeditions",
        trekEyebrow: "Traveled with Ambition Himalaya",
        trekName: "Annapurna Base Camp Trek",
      },
    ],
    quote: "More than a trek, it's a connection to a bigger you.",
    quoteBy: "Ambition Himalaya Treks and Expeditions",
  },
  experiences: {
    visible: true,
    wallpaperSrc: "/images/experiences/exp-wallpaper.jpg",
    eyebrow: "OUR SIGNATURE EXPERIENCES",
    headlineWhite: "More Than Treks.",
    headlineGold: "Extraordinary Experiences.",
    body: "Go beyond the ordinary and discover the Himalayas in the most exclusive ways. Curated experiences that elevate your journey and create memories for a lifetime.",
    ctaLabel: "Explore All Experiences",
    ctaHref: "/luxury-treks",
    theme: {
      sectionBg: "transparent",
      cardBg: "rgba(18,14,10,0.55)",
      textColor: "#f7f4ef",
      mutedTextColor: "rgba(247,244,239,0.78)",
      goldColor: "#e0c45a",
      borderColor: "rgba(201,162,39,0.55)",
      backgroundImageSrc: "",
      showBackgroundArt: true,
    },
    cards: [
      {
        id: "lodges",
        title: "Luxury Lodges & Stays",
        countLabel: "10+ EXPERIENCES",
        body: "Handpicked luxury lodges and boutique hotels offering comfort, elegance and world-class hospitality in the Himalayas.",
        imageSrc: "/images/experiences/exp-lodges.jpg",
        imageAlt: "Luxury Himalayan lodge bedroom with mountain views",
        icon: "lodge",
        href: "/luxury-lodge-treks",
        ctaLabel: "EXPLORE MORE",
      },
      {
        id: "culture",
        title: "Private Cultural Journeys",
        countLabel: "9+ EXPERIENCES",
        body: "Immerse in authentic local culture, heritage sites and spiritual experiences with private guides and curated itineraries.",
        imageSrc: "/images/experiences/exp-culture.jpg",
        imageAlt: "Travelers at Kathmandu temples with a private guide",
        icon: "culture",
        href: "/cultural-journeys",
        ctaLabel: "EXPLORE MORE",
      },
      {
        id: "flights",
        title: "Mountain Flights",
        countLabel: "8+ EXPERIENCES",
        body: "Breathtaking scenic flights over Everest and the Himalayas for unforgettable panoramic views.",
        imageSrc: "/images/experiences/exp-flights.jpg",
        imageAlt: "Airplane window view of Himalayan snow peaks",
        icon: "flight",
        href: "/luxury-helicopter-treks",
        ctaLabel: "EXPLORE MORE",
      },
      {
        id: "wildlife",
        title: "Wildlife & Jungle Safaris",
        countLabel: "6+ EXPERIENCES",
        body: "Explore Nepal's rich wildlife with private jungle safaris in Chitwan, Bardia and beyond.",
        imageSrc: "/images/experiences/exp-wildlife.jpg",
        imageAlt: "Rhino on a jungle safari track in Nepal",
        icon: "wildlife",
        href: "/luxury-treks",
        ctaLabel: "EXPLORE MORE",
      },
    ],
  },
  availability: {
    visible: true,
    wallpaperSrc: "/images/availability/avail-wallpaper.jpg",
    eyebrow: "LIVE AVAILABILITY",
    headlineBefore: "YOUR",
    headlineGold: "JOURNEY",
    headlineAfter: "AWAITS",
    body: "Secure your private Himalayan escape while your preferred dates are available.",
    ctaLabel: "Explore All Experiences",
    ctaHref: "/luxury-treks",
    cards: [
      {
        id: "sep",
        monthShort: "SEP",
        monthFull: "September",
        badge: "PEAK SEASON",
        title: "Luxury Lodges & Stays",
        body: "Handpicked luxury lodges and boutique hotels offering comfort, elegance and world-class hospitality in the Himalayas.",
        imageSrc: "/images/availability/avail-sep.jpg",
        imageAlt: "Luxury Himalayan lodge bedroom with mountain views",
        routes: [
          { id: "sep-1", label: "Everest Base Camp", icon: "peaks" },
          { id: "sep-2", label: "Annapurna Luxury Trek", icon: "temple" },
          { id: "sep-3", label: "Upper Mustang", icon: "trek" },
          { id: "sep-4", label: "Private Helicopter Experiences", icon: "heli" },
        ],
        availableCount: 12,
        availableLabel: "JOURNEYS AVAILABLE",
        ctaLabel: "VIEW AVAILABILITY",
        ctaHref: "/luxury-treks",
        live: true,
        visible: true,
      },
      {
        id: "oct",
        monthShort: "OCT",
        monthFull: "October",
        badge: "PRIME SEASON",
        title: "Private Cultural Journeys",
        body: "Immerse in authentic local culture, heritage sites and spiritual experiences with private guides and curated itineraries.",
        imageSrc: "/images/availability/avail-oct.jpg",
        imageAlt: "Candlelit lodge terrace dining at golden hour",
        routes: [
          { id: "oct-1", label: "Everest Region", icon: "peaks" },
          { id: "oct-2", label: "Annapurna Region", icon: "temple" },
          { id: "oct-3", label: "Manaslu", icon: "trek" },
          { id: "oct-4", label: "Luxury Mustang Escape", icon: "heli" },
        ],
        availableCount: 18,
        availableLabel: "JOURNEYS AVAILABLE",
        ctaLabel: "VIEW AVAILABILITY",
        ctaHref: "/luxury-treks",
        live: true,
        visible: true,
      },
      {
        id: "nov",
        monthShort: "NOV",
        monthFull: "November",
        badge: "GOLDEN SEASON",
        title: "Wildlife & Jungle Safaris",
        body: "Explore Nepal's rich wildlife with private jungle safaris in Chitwan, Bardia and beyond.",
        imageSrc: "/images/availability/avail-nov.jpg",
        imageAlt: "Sunset terrace dining above Himalayan clouds",
        routes: [
          { id: "nov-1", label: "Everest", icon: "peaks" },
          { id: "nov-2", label: "Annapurna", icon: "temple" },
          { id: "nov-3", label: "Unique Cultural Journeys", icon: "trek" },
          { id: "nov-4", label: "Private Mountain Escapes", icon: "heli" },
        ],
        availableCount: 14,
        availableLabel: "JOURNEYS AVAILABLE",
        ctaLabel: "VIEW AVAILABILITY",
        ctaHref: "/luxury-treks",
        live: true,
        visible: true,
      },
    ],
    footItems: [
      {
        id: "live",
        title: "LIVE AVAILABILITY",
        body: "Real-time updates from our booking system",
        icon: "calendar",
      },
      {
        id: "secure",
        title: "SECURE YOUR DATE",
        body: "Limited departures. Book early to secure your date.",
        icon: "secure",
      },
      {
        id: "concierge",
        title: "PERSONAL CONCIERGE",
        body: "Our travel experts are here to craft your perfect journey.",
        icon: "concierge",
      },
    ],
    liveLabel: "UPDATED LIVE",
    liveTimestamp: "24 May 2025, 10:30 AM NPT",
  },
  journal: {
    visible: true,
    eyebrow: "VIDEO JOURNAL",
    headlineBefore: "HIMALAYAN",
    headlineGold: "TRAVEL",
    headlineAfter: "MOMENTS",
    body: "Real journeys. Real experiences. Witness the Himalayas through the eyes of our travellers.",
    ctaLabel: "EXPLORE ALL VIDEOS",
    ctaHref: "#",
    videos: [
      {
        id: "everest",
        title: "Everest Base Camp Trek",
        subtitle: "14 Days Journey",
        duration: "04:28",
        imageSrc: "/images/journal/everest-clean.jpg",
        imageAlt: "Hikers at sunset on the Everest Base Camp trail",
        videoSrc: "",
      },
      {
        id: "annapurna",
        title: "Annapurna Circuit Trek",
        subtitle: "16 Days Adventure",
        duration: "05:12",
        imageSrc: "/images/journal/annapurna-clean.jpg",
        imageAlt: "Traveller overlooking Annapurna peaks",
        videoSrc: "",
      },
      {
        id: "mustang",
        title: "Upper Mustang Expedition",
        subtitle: "13 Days Journey",
        duration: "03:55",
        imageSrc: "/images/journal/mustang-clean.jpg",
        imageAlt: "Stupa and prayer flags with Himalayan peaks",
        videoSrc: "",
      },
    ],
    features: [
      {
        id: "real",
        title: "REAL EXPERIENCES",
        body: "Authentic stories from travellers like you.",
        icon: "peaks",
      },
      {
        id: "moments",
        title: "BEAUTIFUL MOMENTS",
        body: "Capturing the raw beauty of the Himalayas.",
        icon: "camera",
      },
      {
        id: "expert",
        title: "EXPERTLY CREATED",
        body: "Professional videos crafted by our travel experts.",
        icon: "play",
      },
      {
        id: "passion",
        title: "MADE WITH PASSION",
        body: "Our love for the mountains in every frame.",
        icon: "heart",
      },
    ],
  },
  blog: {
    visible: true,
    eyebrow: "OUR BLOG",
    headlineBefore: "Stories",
    headlineScript: "from the",
    headlineAfter: "Himalayas",
    body: "Inspiring journeys, travel tips, and Himalayan tales from our explorers and local experts.",
    ctaLabel: "View All Articles",
    ctaHref: "/blog",
    featured: [
      {
        id: "ebc-guide",
        title: "The Ultimate Guide to Everest Base Camp Trek",
        excerpt:
          "Everything you need to know before embarking on the world's most iconic Himalayan adventure — from preparation to peak experiences.",
        category: "TREKKING GUIDE",
        badge: "★ FEATURED",
        badgeStyle: "featured",
        date: "March 15, 2025",
        readTime: "8 min read",
        authorName: "Rajesh Thapa",
        authorAvatarSrc: "/images/ambition-holiday-logo.png",
        imageSrc: "/images/journal/everest-clean.jpg",
        imageAlt: "Trekkers on the trail toward Everest Base Camp at sunset",
        href: "/blog/everest-base-camp-guide",
      },
      {
        id: "annapurna-hidden",
        title: "Hidden Gems of the Annapurna Circuit",
        excerpt:
          "Discover secret villages, untouched trails, and authentic experiences beyond the well-trodden path of Nepal's classic circuit.",
        category: "DESTINATIONS",
        badge: "DESTINATIONS",
        badgeStyle: "outline",
        date: "March 10, 2025",
        readTime: "6 min read",
        authorName: "Priya Sharma",
        authorAvatarSrc: "/images/ambition-holiday-logo.png",
        imageSrc: "/images/journal/annapurna-clean.jpg",
        imageAlt: "Traveller overlooking Annapurna peaks from a ridge",
        href: "/blog/annapurna-hidden-gems",
      },
    ],
    sidePosts: [
      {
        id: "altitude",
        title: "How to Prepare for High Altitude Trekking",
        excerpt: "",
        category: "TRAVEL TIPS",
        badge: "",
        badgeStyle: "none",
        date: "Mar 5, 2025",
        readTime: "5 min",
        authorName: "",
        authorAvatarSrc: "",
        imageSrc: "/images/why/guides-photo.jpg",
        imageAlt: "Trekkers walking toward a snow peak",
        href: "/blog/high-altitude-preparation",
      },
      {
        id: "mustang-culture",
        title: "Cultural Etiquette in Mustang Region",
        excerpt: "",
        category: "CULTURE",
        badge: "",
        badgeStyle: "none",
        date: "Feb 28, 2025",
        readTime: "4 min",
        authorName: "",
        authorAvatarSrc: "",
        imageSrc: "/images/experiences/culture-photo.jpg",
        imageAlt: "Nepalese stupa and temples at sunset",
        href: "/blog/mustang-cultural-etiquette",
      },
      {
        id: "pack-list",
        title: "Essential Packing List for Nepal Treks",
        excerpt: "",
        category: "GEAR GUIDE",
        badge: "",
        badgeStyle: "none",
        date: "Feb 20, 2025",
        readTime: "7 min",
        authorName: "",
        authorAvatarSrc: "",
        imageSrc: "/images/packages/everest.jpg",
        imageAlt: "Luxury lodge terrace with Himalayan peak views",
        href: "/blog/nepal-trek-packing-list",
      },
    ],
    features: [],
  },
  footer: {
    visible: true,
    membersTitle: "PROUDLY MEMBER OF",
    members: [
      {
        id: "m1",
        label: "Nepal Emblem",
        imageSrc: "/images/footer/members/01-nepal-emblem.png",
        href: "#",
      },
      {
        id: "m2",
        label: "NMA",
        imageSrc: "/images/footer/members/02-nma.png",
        href: "#",
      },
      {
        id: "m3",
        label: "NTB",
        imageSrc: "/images/footer/members/03-ntb.png",
        href: "#",
      },
      {
        id: "m4",
        label: "TAAN",
        imageSrc: "/images/footer/members/04-taan.png",
        href: "#",
      },
      {
        id: "m5",
        label: "KEEP",
        imageSrc: "/images/footer/members/05-keep.png",
        href: "#",
      },
    ],
    socialTitle: "FIND & FOLLOW US",
    socials: [
      { id: "fb", label: "Facebook", href: "https://facebook.com", network: "facebook" },
      { id: "tw", label: "X / Twitter", href: "https://x.com", network: "twitter" },
      { id: "ig", label: "Instagram", href: "https://instagram.com", network: "instagram" },
      { id: "yt", label: "YouTube", href: "https://youtube.com", network: "youtube" },
      { id: "li", label: "LinkedIn", href: "https://linkedin.com", network: "linkedin" },
    ],
    paymentsTitle: "WE ACCEPT",
    payments: [
      {
        id: "visa",
        label: "Visa",
        imageSrc: "/images/footer/payments/visa.png",
        href: "#",
      },
      {
        id: "mc",
        label: "Mastercard",
        imageSrc: "/images/footer/payments/mastercard.png",
        href: "#",
      },
      {
        id: "amex",
        label: "American Express",
        imageSrc: "/images/footer/payments/amex.png",
        href: "#",
      },
    ],
    payNowLabel: "Pay Now",
    payNowHref: "/contact",
    showLandscape: true,
    landscapeImageSrc: "/images/footer/ambition-art-hq.jpg",
    brandArtSrc: "/images/footer/tripadvisor-awards.png",
    helpTitle: "NEED HELP?",
    helpBody:
      "Our Himalayan specialists are here to craft your private journey — from first enquiry to the trail.",
    phones: [
      { id: "p1", label: "+977-1-4000000", href: "tel:+97714000000" },
      { id: "p2", label: "+977-9800000000", href: "tel:+9779800000000" },
    ],
    email: "info@ambitionholidays.com",
    emailHref: "mailto:info@ambitionholidays.com",
    hours: "9:00 AM – 6:00 PM Nepal Time",
    usefulTitle: "USEFUL LINKS",
    usefulLinks: [
      { id: "u1", label: "About Us", href: "/about-us" },
      { id: "u2", label: "Travel Guide", href: "/travel-guide" },
      { id: "u3", label: "Journal", href: "/journal" },
      { id: "u4", label: "Contact", href: "/contact" },
      { id: "u5", label: "Visa & Entry", href: "/visa-and-entry" },
      { id: "u6", label: "Best Time to Visit", href: "/best-time-to-visit" },
    ],
    adventuresTitle: "DESTINATIONS",
    adventureLinks: [
      { id: "a1", label: "Everest Region", href: "/everest-region" },
      { id: "a2", label: "Annapurna Region", href: "/annapurna-region" },
      { id: "a3", label: "Manaslu Region", href: "/manaslu-region" },
      { id: "a4", label: "Langtang Region", href: "/langtang-region" },
      { id: "a5", label: "Mustang", href: "/mustang" },
      { id: "a6", label: "Helicopter Tours", href: "/helicopter-tours" },
    ],
    treksTitle: "POPULAR TREKS",
    trekLinks: [
      { id: "t1", label: "Luxury Everest Base Camp", href: "/luxury-everest-base-camp-trek" },
      { id: "t2", label: "Luxury Annapurna Base Camp", href: "/luxury-annapurna-base-camp-trek" },
      { id: "t3", label: "Luxury Annapurna Circuit", href: "/luxury-annapurna-circuit" },
      { id: "t4", label: "Luxury Manaslu Circuit", href: "/luxury-manaslu-circuit-trek" },
      { id: "t5", label: "Luxury Upper Mustang", href: "/luxury-upper-mustang-trek" },
      { id: "t6", label: "Luxury Helicopter Treks", href: "/luxury-helicopter-treks" },
    ],
    newsletterTitle: "STAY UPDATED",
    newsletterPlaceholder: "Your email address",
    newsletterNote: "I agree to receive travel inspiration and updates from Ambition Holidays.",
    logoSrc: "",
    brandTagline: "LUXURY TREKS & EXPEDITIONS",
    mission:
      "Crafting luxury Himalayan experiences with passion, expertise and a deep commitment to responsible tourism.",
    missionScript: "Beyond the ordinary.",
    copyright: "© 2026 Ambition Holidays Pvt. Ltd. All Rights Reserved.",
    legalLinks: [
      { id: "l1", label: "Privacy Policy", href: "/privacy" },
      { id: "l2", label: "Terms & Conditions", href: "/terms" },
      { id: "l3", label: "Sitemap", href: "/sitemap" },
    ],
    creditPrefix: "Developed By",
    creditName: "The Global Orbit",
    creditHref: "https://theglobalorbit.com/",
  },
};

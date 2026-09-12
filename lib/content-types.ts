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
  eyebrow: string;
  headlineGold: string;
  headlineWhite: string;
  line1: string;
  line2: string;
  allLabel: string;
  categories: JourneyCategory[];
  packages: JourneyPackage[];
};

export type WhyCardIcon =
  | "years"
  | "tripadvisor"
  | "guide"
  | "stay"
  | "support"
  | "responsible"
  | "custom";

export type WhyCard = {
  id: string;
  title: string;
  body: string;
  imageSrc: string;
  imageAlt: string;
  icon: WhyCardIcon;
  iconSrc?: string;
  href?: string;
  ctaLabel?: string;
};

export type WhyRating = {
  id: string;
  label: string;
  value: string;
  brand: "tripadvisor" | "google" | "facebook" | "instagram" | "custom";
  logoSrc?: string;
};

export type WhyContent = {
  visible: boolean;
  eyebrow: string;
  headline: string;
  body: string;
  cards: WhyCard[];
  awardTitle: string;
  awardSubtitle: string;
  ratings: WhyRating[];
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
  imageSrc: string;
  imageAlt: string;
  routes: AvailabilityRoute[];
  availableCount: number;
  availableLabel: string;
  ctaLabel: string;
  ctaHref: string;
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
  eyebrow: string;
  headlineBefore: string;
  headlineGold: string;
  headlineAfter: string;
  body: string;
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

export type SiteContent = {
  updatedAt: string;
  header: {
    logoSrc: string;
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
  signature: {
    visible: boolean;
    eyebrow: string;
    headlineWhite: string;
    headlineGold: string;
    body: string;
    ctaLabel: string;
    ctaHref: string;
    images: SignatureImage[];
    highlights: SignatureHighlight[];
    features: SignatureFeature[];
  };
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
  hero: {
    visible: true,
    taglineWords: ["Discover", "Your", "Luxury", "Trek"],
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
    eyebrow: "OUR SIGNATURE OF ADVENTURE",
    headlineWhite: "Beyond the Trail.",
    headlineGold: "Luxury Meets Ambition",
    body: "Experience Nepal through the art of luxury trekking. From private Himalayan trails and secluded mountain escapes to exceptional stays and authentic local encounters, Ambition Holidays curates extraordinary journeys where adventure meets refined comfort, every step of the way.",
    ctaLabel: "Explore Luxury Treks",
    ctaHref: "/luxury-treks",
    images: [
      {
        id: "sig-1",
        src: "/images/signature/sig-card-everest.jpg",
        alt: "Helicopter flying past snow-capped Everest peaks",
        kicker: "Scenic Flights",
        title: "Everest Region",
        href: "/everest-region",
      },
      {
        id: "sig-3",
        src: "/images/signature/sig-card-annapurna.jpg",
        alt: "Trekker on iconic trails in the Annapurna range",
        kicker: "Iconic Trails",
        title: "Annapurna Region",
        href: "/annapurna-region",
      },
      {
        id: "sig-1786895806235",
        src: "/images/signature/sig-card-mustang.jpg",
        alt: "Luxury terrace overlooking a Himalayan lake in Mustang",
        kicker: "Exclusive Journeys",
        title: "Mustang Region",
        href: "/mustang",
      },
      {
        id: "sig-1786895886212",
        src: "/images/signature/sig-live-4.jpg",
        alt: "Signature image",
        kicker: "Private Trails",
        title: "Himalayan Escapes",
        href: "/luxury-treks",
      },
      {
        id: "sig-1786897478111",
        src: "/images/signature/sig-live-5.jpg",
        alt: "Signature image",
        kicker: "Refined Stays",
        title: "Luxury Lodges",
        href: "/luxury-lodges-stays",
      },
      {
        id: "sig-1786897672121",
        src: "/images/signature/sig-live-6.jpg",
        alt: "Signature image",
        kicker: "Cultural Journeys",
        title: "Hidden Nepal",
        href: "/destinations",
      },
    ],
    highlights: [
      { id: "hi-1", icon: "peaks", title: "100+", subtitle: "Curated Routes" },
      { id: "hi-2", icon: "compass", title: "Expert", subtitle: "Local Guides" },
      { id: "hi-3", icon: "heart", title: "Unforgettable", subtitle: "Experiences" },
    ],
    features: [
      {
        id: "feat-1",
        icon: "hiker",
        title: "Private Journeys",
        subtitle: "Tailored Exclusively to You",
        href: "/luxury-treks",
      },
      {
        id: "feat-2",
        icon: "peaks",
        title: "Expert Local Guides",
        subtitle: "Local Knowledge, Exceptional Care",
        href: "/about-us",
      },
      {
        id: "feat-3",
        icon: "lodge",
        title: "Handpicked Stays",
        subtitle: "Refined Comfort in the Himalayas",
        href: "/luxury-lodges-stays",
      },
    ],
  },
  journeys: {
    visible: true,
    eyebrow: "OUR SIGNATURE JOURNEYS",
    headlineGold: "Luxury Treks & Tour",
    headlineWhite: "in Nepal",
    line1: "Handpicked routes. Exceptional comfort. Unforgettable experiences.",
    line2: "Explore our most loved luxury trekking packages.",
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
        title: "Everest Base Camp",
        subtitle: "Luxury Trek",
        location: "Everest Region, Nepal",
        categoryIds: ["everest", "helicopter"],
        badge: "Most Popular",
        days: 12,
        maxAltitude: "5,364 m",
        difficulty: "Moderate",
        description:
          "Walk legendary trails to Everest Base Camp with premium lodges, expert guides, and unforgettable mountain views.",
        href: "/luxury-everest-base-camp-trek",
        imageSrc: "/images/packages/everest-v2.jpg",
        imageAlt: "Trekker watching sunrise over Everest peaks",
      },
      {
        id: "abc",
        title: "Annapurna Base Camp",
        subtitle: "Luxury Trek",
        location: "Annapurna Region, Nepal",
        categoryIds: ["annapurna"],
        badge: "Best Seller",
        days: 10,
        maxAltitude: "4,130 m",
        difficulty: "Moderate",
        description:
          "A refined sanctuary-to-sanctuary journey through rhododendron forests and amphitheatre peaks, staying in elevated lodges with firelit evenings and exceptional local cuisine.",
        href: "/luxury-annapurna-base-camp-trek",
        imageSrc: "/images/packages/annapurna-v2.jpg",
        imageAlt: "Luxury Annapurna lodge terrace with a fire pit at dusk",
      },
      {
        id: "annapurna-circuit",
        title: "Annapurna Circuit",
        subtitle: "Luxury Trek",
        location: "Annapurna Region, Nepal",
        categoryIds: ["annapurna"],
        badge: "",
        days: 14,
        maxAltitude: "5,416 m",
        difficulty: "Moderate",
        description:
          "Cross Thorong La in comfort with private guiding, carefully paced acclimatisation, and the finest available lodges on Nepal’s most legendary high-pass circuit.",
        href: "/luxury-annapurna-circuit",
        imageSrc: "/images/packages/annapurna-circuit.jpg",
        imageAlt: "Prayer flags on the Annapurna Circuit with snow peaks beyond",
      },
      {
        id: "mustang",
        title: "Upper Mustang",
        subtitle: "Luxury Tour",
        location: "Mustang Region, Nepal",
        categoryIds: ["mustang"],
        badge: "Exclusive",
        days: 14,
        maxAltitude: "3,840 m",
        difficulty: "Moderate",
        description:
          "Explore the mystical kingdom of Lo with exclusive access, cultural immersion, and luxury stays in one of Nepal’s most remote and breathtaking regions.",
        href: "/luxury-upper-mustang-trek",
        imageSrc: "/images/packages/mustang-v2.jpg",
        imageAlt: "White-walled monastery on ochre Mustang cliffs at golden hour",
      },
      {
        id: "heli",
        title: "Everest Helicopter",
        subtitle: "Luxury Experience",
        location: "Everest Region, Nepal",
        categoryIds: ["helicopter", "everest"],
        badge: "",
        days: 5,
        maxAltitude: "5,364 m",
        difficulty: "Easy",
        description:
          "A short, spectacular Himalayan escape — scenic helicopter flights, Everest views, and nights in premium lodges without long trail days.",
        href: "/luxury-helicopter-treks",
        imageSrc: "/images/packages/helicopter.jpg",
        imageAlt: "Helicopter on a luxury lodge helipad in the Everest region",
      },
    ],
  },
  why: {
    visible: true,
    eyebrow: "WHY TRAVEL WITH US",
    headline: "Why Ambition Holidays",
    body: "We don't just organize trips — we craft transformative journeys with unmatched care, local expertise, and a passion for the Himalayas.",
    awardTitle: "Proudly Recognized for Excellence",
    awardSubtitle: "Awarded by TripAdvisor & our incredible guests",
    cards: [
      {
        id: "years",
        title: "11+ Years of Experience",
        body: "Over a decade of crafting extraordinary Himalayan journeys with excellence and passion.",
        imageSrc: "/images/why/years-photo.jpg",
        imageAlt: "Hiker watching a Himalayan sunrise",
        icon: "years",
        href: "/about-us",
        ctaLabel: "LEARN MORE",
      },
      {
        id: "reviews",
        title: "410+ TripAdvisor Reviews",
        body: "Consistently trusted by hundreds of happy travelers who recommend us for our service and reliability.",
        imageSrc: "/images/why/reviews-photo.jpg",
        imageAlt: "Luxury lodge terrace at dusk",
        icon: "tripadvisor",
        href: "/about-us",
        ctaLabel: "LEARN MORE",
      },
      {
        id: "guides",
        title: "Expert Local Guides",
        body: "Our professional, certified local guides ensure your journey is safe, insightful, and unforgettable.",
        imageSrc: "/images/why/guides-photo.jpg",
        imageAlt: "Trekkers walking toward a snow peak",
        icon: "guide",
        href: "/about-us",
        ctaLabel: "LEARN MORE",
      },
      {
        id: "stays",
        title: "Handpicked Stays",
        body: "Carefully selected luxury lodges and hotels that offer comfort, character, and exceptional service.",
        imageSrc: "/images/why/stays-photo.jpg",
        imageAlt: "Warmly lit mountain lodge at night",
        icon: "stay",
        href: "/luxury-lodge-treks",
        ctaLabel: "LEARN MORE",
      },
      {
        id: "support",
        title: "24/7 Guest Support",
        body: "We're with you at every step of your journey with round-the-clock care and personal attention.",
        imageSrc: "/images/why/support-photo.jpg",
        imageAlt: "Guest support planning a Himalayan journey",
        icon: "support",
        href: "/contact",
        ctaLabel: "LEARN MORE",
      },
      {
        id: "responsible",
        title: "Responsible Tourism",
        body: "We travel with purpose—supporting local communities and preserving the natural beauty of Nepal.",
        imageSrc: "/images/why/responsible-photo.jpg",
        imageAlt: "Local community in a Himalayan village",
        icon: "responsible",
        href: "/about-us",
        ctaLabel: "LEARN MORE",
      },
    ],
    ratings: [
      { id: "ta", label: "Tripadvisor", value: "410+ Reviews", brand: "tripadvisor" },
      { id: "google", label: "Google", value: "4.9 Rating", brand: "google" },
      { id: "facebook", label: "Facebook", value: "4.8 Rating", brand: "facebook" },
      { id: "instagram", label: "Instagram", value: "4.9 Rating", brand: "instagram" },
    ],
  },
  experiences: {
    visible: true,
    eyebrow: "OUR SIGNATURE EXPERIENCES",
    headlineWhite: "More Than Treks.",
    headlineGold: "Extraordinary Experiences.",
    body: "Go beyond the ordinary and discover the Himalayas in the most exclusive ways. Curated experiences that elevate your journey and create memories for a lifetime.",
    ctaLabel: "EXPLORE ALL EXPERIENCES",
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
        countLabel: "10 Experiences",
        body: "Handpicked luxury lodges and hotels offering comfort, elegance and world-class hospitality.",
        imageSrc: "/images/experiences/lodges-photo.jpg",
        imageAlt: "Luxury mountain lodge interior with a fireplace and peak views",
        icon: "lodge",
        href: "/luxury-treks",
        ctaLabel: "EXPLORE MORE",
      },
      {
        id: "culture",
        title: "Private Cultural Journeys",
        countLabel: "9 Experiences",
        body: "Immerse in authentic local culture, heritage sites and spiritual experiences with private guides.",
        imageSrc: "/images/experiences/culture-photo.jpg",
        imageAlt: "Nepalese stupa and temples at sunset",
        icon: "culture",
        href: "/luxury-treks",
        ctaLabel: "EXPLORE MORE",
      },
      {
        id: "flights",
        title: "Mountain Flights",
        countLabel: "8 Experiences",
        body: "Breathtaking scenic flights over Everest and the Himalayas for unforgettable views.",
        imageSrc: "/images/experiences/flights-photo.jpg",
        imageAlt: "Small aircraft flying past Himalayan snow peaks",
        icon: "flight",
        href: "/luxury-helicopter-treks",
        ctaLabel: "EXPLORE MORE",
      },
      {
        id: "wildlife",
        title: "Wildlife & Jungle Safaris",
        countLabel: "6 Experiences",
        body: "Explore Nepal's rich wildlife with private jungle safaris in Chitwan and beyond.",
        imageSrc: "/images/experiences/wildlife-photo.jpg",
        imageAlt: "Rhinoceros in tall grass during a jungle safari",
        icon: "wildlife",
        href: "/luxury-treks",
        ctaLabel: "EXPLORE MORE",
      },
    ],
  },
  availability: {
    visible: true,
    eyebrow: "LIVE AVAILABILITY",
    headlineBefore: "YOUR",
    headlineGold: "JOURNEY",
    headlineAfter: "AWAITS",
    body: "Secure your private Himalayan escape while your preferred dates are available.",
    cards: [
      {
        id: "sep",
        monthShort: "SEP",
        monthFull: "September",
        badge: "PEAK SEASON",
        imageSrc: "/images/availability/sep.jpg",
        imageAlt: "Luxury lodge patio with fire pit overlooking Himalayan peaks at dusk",
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
      },
      {
        id: "oct",
        monthShort: "OCT",
        monthFull: "October",
        badge: "PRIME SEASON",
        imageSrc: "/images/availability/oct.jpg",
        imageAlt: "Mountain terrace with stupa overlooking a Himalayan valley",
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
      },
      {
        id: "nov",
        monthShort: "NOV",
        monthFull: "November",
        badge: "GOLDEN SEASON",
        imageSrc: "/images/availability/nov.jpg",
        imageAlt: "Helicopter flying beside a sunlit Himalayan peak",
        routes: [
          { id: "nov-1", label: "Everest", icon: "peaks" },
          { id: "nov-2", label: "Annapurna", icon: "temple" },
          { id: "nov-3", label: "Luxury Cultural Journeys", icon: "trek" },
          { id: "nov-4", label: "Private Mountain Escapes", icon: "heli" },
        ],
        availableCount: 14,
        availableLabel: "JOURNEYS AVAILABLE",
        ctaLabel: "VIEW AVAILABILITY",
        ctaHref: "/luxury-treks",
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

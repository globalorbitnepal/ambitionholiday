import { DEFAULT_HEADER_NAV, type HeaderNavContent } from "@/lib/header-nav";
import { SECTION_WALLPAPER } from "@/lib/section-wallpaper";
import { DEFAULT_NEPAL, type NepalContent } from "@/lib/nepal-defaults";
import { DEFAULT_BHUTAN } from "@/lib/bhutan-defaults";
import { DEFAULT_TIBET } from "@/lib/tibet-defaults";
import { DEFAULT_MULTI } from "@/lib/multi-defaults";
import { DEFAULT_HELICOPTER } from "@/lib/helicopter-defaults";
import { DEFAULT_PHOTOGRAPHY } from "@/lib/photography-defaults";
import { DEFAULT_TRIP_PACKAGES, type TrekPackage } from "@/lib/trip-packages";

export type { NepalCategory, NepalContent, NepalPackage } from "@/lib/nepal-defaults";
export type { TrekItineraryDay, TrekPackage } from "@/lib/trip-packages";

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

export type BlogSection = {
  id: string;
  heading: string;
  body: string;
};

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
  slug?: string;
  status?: "draft" | "published";
  metaTitle?: string;
  metaDescription?: string;
  sections?: BlogSection[];
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
  /** Canonical journal articles (Orbit). */
  posts?: BlogPost[];
  features: BlogFeature[];
};

export type AboutStat = {
  id: string;
  value: string;
  label: string;
};

export type AboutPillar = {
  id: string;
  title: string;
  body: string;
  imageSrc: string;
  imageAlt: string;
};

export type AboutLicense = {
  id: string;
  label: string;
  value: string;
};

export type AboutContent = {
  visible: boolean;
  wallpaperSrc: string;
  eyebrow: string;
  headline: string;
  lead: string;
  experienceKicker: string;
  experienceTitle: string;
  experienceBody: string;
  storyImageSrc: string;
  storyImageAlt: string;
  sisterEyebrow: string;
  sisterName: string;
  sisterBody: string;
  sisterHref: string;
  sisterCta: string;
  sisterImageSrc: string;
  sisterImageAlt: string;
  storyTitle: string;
  storyBody: string;
  pillars: AboutPillar[];
  stats: AboutStat[];
  licensesTitle: string;
  licenses: AboutLicense[];
  promiseTitle: string;
  promiseBody: string;
  formEyebrow: string;
  formTitle: string;
  formSubtitle: string;
  formCta: string;
  formSuccess: string;
  asideTitle: string;
  addressLabel: string;
  address: string;
  officePhone: string;
  mobilePhone: string;
  email: string;
  whatsappHref: string;
  metaTitle: string;
  metaDescription: string;
};

export type LegalDocumentItem = {
  id: string;
  title: string;
  body: string;
  imageSrc: string;
  imageAlt: string;
};

export type LegalDocumentsContent = {
  visible: boolean;
  wallpaperSrc: string;
  eyebrow: string;
  headline: string;
  lead: string;
  introTitle: string;
  introBody: string;
  documentsTitle: string;
  documents: LegalDocumentItem[];
  noteTitle: string;
  noteBody: string;
  formEyebrow: string;
  formTitle: string;
  formSubtitle: string;
  formCta: string;
  formSuccess: string;
  asideTitle: string;
  addressLabel: string;
  address: string;
  officePhone: string;
  mobilePhone: string;
  email: string;
  whatsappHref: string;
  metaTitle: string;
  metaDescription: string;
};

export type VisaFee = {
  id: string;
  days: string;
  amount: string;
};

export type VisaCard = {
  id: string;
  title: string;
  body: string;
};

export type VisaParkFee = {
  id: string;
  name: string;
  nepali: string;
  saarc: string;
  foreign: string;
};

export type VisaRestricted = {
  id: string;
  name: string;
  body: string;
  fee: string;
};

export type VisaStep = {
  id: string;
  title: string;
  body: string;
};

export type VisaCountry = {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  imageSrc: string;
  imageAlt: string;
};

export type VisaContent = {
  visible: boolean;
  wallpaperSrc: string;
  eyebrow: string;
  headline: string;
  lead: string;
  updatedLabel: string;
  introTitle: string;
  introBody: string;
  nepalEyebrow: string;
  nepalTitle: string;
  nepalBody: string;
  visaTitle: string;
  visaBody: string;
  visaImageSrc: string;
  visaImageAlt: string;
  visaFees: VisaFee[];
  visaNote: string;
  permitTitle: string;
  permitBody: string;
  permitImageSrc: string;
  permitImageAlt: string;
  permitCards: VisaCard[];
  onlineTitle: string;
  onlineBody: string;
  parkTitle: string;
  parkIntro: string;
  parkFees: VisaParkFee[];
  restrictedTitle: string;
  restrictedIntro: string;
  restrictedImageSrc: string;
  restrictedImageAlt: string;
  restricted: VisaRestricted[];
  airportTitle: string;
  airportBody: string;
  airportImageSrc: string;
  airportImageAlt: string;
  airportSteps: VisaStep[];
  registerTitle: string;
  registerBody: string;
  countries: VisaCountry[];
  closeTitle: string;
  closeBody: string;
  ctaLabel: string;
  ctaHref: string;
  metaTitle: string;
  metaDescription: string;
};

export type BestTimeMonth = {
  id: string;
  month: string;
  weather: string;
  temp: string;
  crowds: string;
  bestFor: string;
};

export type BestTimeSeason = {
  id: string;
  eyebrow: string;
  title: string;
  meta: string;
  body: string;
  highlights: string[];
};

export type BestTimeRegion = {
  id: string;
  title: string;
  body: string;
};

export type BestTimeAltitude = {
  id: string;
  zone: string;
  place: string;
  spring: string;
  monsoon: string;
  autumn: string;
  winter: string;
};

export type BestTimeContent = {
  visible: boolean;
  wallpaperSrc: string;
  eyebrow: string;
  headline: string;
  lead: string;
  updatedLabel: string;
  introTitle: string;
  introBody: string;
  calendarTitle: string;
  calendarIntro: string;
  months: BestTimeMonth[];
  seasonsTitle: string;
  seasons: BestTimeSeason[];
  regionsTitle: string;
  regionsIntro: string;
  regions: BestTimeRegion[];
  altitudeTitle: string;
  altitudeIntro: string;
  altitudes: BestTimeAltitude[];
  luxuryTitle: string;
  luxuryBody: string;
  closeTitle: string;
  closeBody: string;
  ctaLabel: string;
  ctaHref: string;
  metaTitle: string;
  metaDescription: string;
};

export type PackingCheck = {
  id: string;
  title: string;
  body: string;
};

export type PackingGroup = {
  id: string;
  title: string;
  body: string;
  items: string[];
};

export type PackingNote = {
  id: string;
  title: string;
  body: string;
};

export type PackingContent = {
  visible: boolean;
  wallpaperSrc: string;
  eyebrow: string;
  headline: string;
  lead: string;
  updatedLabel: string;
  introTitle: string;
  introBody: string;
  beforeTitle: string;
  beforeIntro: string;
  checks: PackingCheck[];
  kitTitle: string;
  groups: PackingGroup[];
  documentsTitle: string;
  documentsIntro: string;
  documents: string[];
  providedTitle: string;
  providedBody: string;
  provided: string[];
  seasonTitle: string;
  seasonIntro: string;
  seasons: PackingNote[];
  luxuryTitle: string;
  luxuryBody: string;
  closeTitle: string;
  closeBody: string;
  ctaLabel: string;
  ctaHref: string;
  metaTitle: string;
  metaDescription: string;
};

export type PermitsPeak = {
  id: string;
  name: string;
  height: string;
  range: string;
  spring: string;
  autumn: string;
  winter: string;
  summer: string;
};

export type PermitsRoute = {
  id: string;
  title: string;
  body: string;
};

export type PermitsContent = {
  visible: boolean;
  wallpaperSrc: string;
  eyebrow: string;
  headline: string;
  lead: string;
  updatedLabel: string;
  introTitle: string;
  introBody: string;
  familiesTitle: string;
  familiesIntro: string;
  families: VisaCard[];
  routesTitle: string;
  routesIntro: string;
  routes: PermitsRoute[];
  parkTitle: string;
  parkIntro: string;
  parkFees: VisaParkFee[];
  restrictedTitle: string;
  restrictedIntro: string;
  restricted: VisaRestricted[];
  peakTitle: string;
  peakIntro: string;
  peaks: PermitsPeak[];
  fileTitle: string;
  fileBody: string;
  closeTitle: string;
  closeBody: string;
  ctaLabel: string;
  ctaHref: string;
  metaTitle: string;
  metaDescription: string;
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

export type MediaCatalogEntry = {
  displayName?: string;
  altText?: string;
};

export type SiteContent = {
  updatedAt: string;
  header: {
    logoSrc: string;
  };
  headerNav: HeaderNavContent;
  mediaCatalog: Record<string, MediaCatalogEntry>;
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
  about: AboutContent;
  legalDocuments: LegalDocumentsContent;
  visa: VisaContent;
  bestTime: BestTimeContent;
  packing: PackingContent;
  altitude: PackingContent;
  permits: PermitsContent;
  nepal: NepalContent;
  bhutan: NepalContent;
  tibet: NepalContent;
  multi: NepalContent;
  helicopter: NepalContent;
  photography: NepalContent;
  tripPackages: TrekPackage[];
  footer: FooterContent;
};

export const DEFAULT_CONTENT: SiteContent = {
  updatedAt: new Date(0).toISOString(),
  header: {
    logoSrc: "/images/ambition-holiday-logo.webp",
  },
  headerNav: DEFAULT_HEADER_NAV,
  mediaCatalog: {},
  atmosphere: {
    imageSrc: SECTION_WALLPAPER,
  },
  hero: {
    visible: true,
    taglineWords: ["Discover", "Your", "Luxury", "Tour", "&", "Trek"],
    headline: "Start Planning Your Journey",
    searchPlaceholder: "Find an Adventure",
    videoSrc: "/videos/hero-bg.mp4",
    posterSrc: "/images/hero-video-poster.webp",
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
    wallpaperSrc: SECTION_WALLPAPER,
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
        imageSrc: "/images/signature/sig-everest.webp",
        imageAlt: "Trekker on a ridge facing Everest peaks",
        icon: "peaks",
      },
      {
        id: "sc-heli",
        badge: "8+ Packages",
        title: "Helicopter Tours",
        subtitle: "See the Himalayas Like Never Before",
        href: "/luxury-helicopter-treks",
        imageSrc: "/images/signature/sig-heli.webp",
        imageAlt: "Helicopter flying over Himalayan peaks",
        icon: "heli",
      },
      {
        id: "sc-lodge",
        badge: "10+ Packages",
        title: "Luxury Getaways",
        subtitle: "Premium Stays in Breathtaking Locations",
        href: "/luxury-lodges-stays",
        imageSrc: "/images/signature/sig-lodge.webp",
        imageAlt: "Luxury lodge infinity pool facing snow mountains",
        icon: "lodge",
      },
      {
        id: "sc-culture",
        badge: "10+ Packages",
        title: "Cultural Journeys",
        subtitle: "Heritage, Spirituality and Living Traditions",
        href: "/cultural-tours",
        imageSrc: "/images/signature/sig-culture.webp",
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
    wallpaperSrc: SECTION_WALLPAPER,
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
            imageSrc: "/images/explore-hub/hub-nepal.webp",
            imageAlt: "Golden stupa among pines with Himalayan peaks",
            icon: "mountain",
          },
          {
            id: "dest-bhutan",
            title: "Bhutan",
            subtitle: "The Land of Gross National Happiness",
            meta: "12+ Packages",
            href: "/bhutan",
            imageSrc: "/images/explore-hub/hub-bhutan.webp",
            imageAlt: "Tiger's Nest monastery on a cliff in Bhutan",
            icon: "mountain",
          },
          {
            id: "dest-tibet",
            title: "Tibet",
            subtitle: "Roof of the World",
            meta: "10+ Packages",
            href: "/tibet",
            imageSrc: "/images/explore-hub/hub-tibet.webp",
            imageAlt: "Potala Palace against snow mountains",
            icon: "temple",
          },
          {
            id: "dest-multi",
            title: "Multi-Country",
            subtitle: "One Journey, Many Worlds",
            meta: "8+ Packages",
            href: "/himalayan-multi-countries-tour",
            imageSrc: "/images/explore-hub/hub-multi.webp",
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
            imageSrc: "/images/explore-hub/hub-tour-lodge.webp",
            imageAlt: "Luxury Himalayan lodge overlooking snow peaks",
            icon: "tent",
          },
          {
            id: "type-culture",
            title: "Cultural Tours",
            subtitle: "Temples, heritage and living tradition",
            meta: "14+ Packages",
            href: "/cultural-tours",
            imageSrc: "/images/explore-hub/hub-tour-culture.webp",
            imageAlt: "Historic temple square in Nepal",
            icon: "temple",
          },
          {
            id: "type-safari",
            title: "Wildlife Safaris",
            subtitle: "Jungles, rhinos and river plains",
            meta: "9+ Packages",
            href: "/wildlife-safari",
            imageSrc: "/images/explore-hub/hub-tour-safari.webp",
            imageAlt: "One-horned rhino in grassland safari",
            icon: "mountain",
          },
          {
            id: "type-heli",
            title: "Helicopter Experiences",
            subtitle: "Peaks, glaciers and sky-high views",
            meta: "7+ Packages",
            href: "/luxury-helicopter-treks",
            imageSrc: "/images/explore-hub/hub-tour-heli.webp",
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
            imageSrc: "/images/explore-hub/hub-dur-short.webp",
            imageAlt: "Forest trail viewpoint over a Himalayan valley",
            icon: "calendar",
          },
          {
            id: "dur-week",
            title: "4–7 Days",
            subtitle: "Classic week-long journeys",
            meta: "22+ Packages",
            href: "/week-tours",
            imageSrc: "/images/explore-hub/hub-dur-week.webp",
            imageAlt: "Alpine meadow with prayer flags and peaks",
            icon: "calendar",
          },
          {
            id: "dur-fortnight",
            title: "8–14 Days",
            subtitle: "Signature treks & circuits",
            meta: "19+ Packages",
            href: "/luxury-treks",
            imageSrc: "/images/explore-hub/hub-dur-fortnight.webp",
            imageAlt: "High mountain pass and glaciers",
            icon: "mountain",
          },
          {
            id: "dur-long",
            title: "15+ Days",
            subtitle: "Expeditions without compromise",
            meta: "8+ Packages",
            href: "/expeditions",
            imageSrc: "/images/explore-hub/hub-dur-long.webp",
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
            href: "/everest-base-camp-trek",
            imageSrc: "/images/explore-hub/hub-offer-everest.webp",
            imageAlt: "Sunrise over Everest region peaks",
            icon: "tag",
          },
          {
            id: "offer-bhutan",
            title: "Shoulder Season Bhutan",
            subtitle: "Quieter trails, richer light",
            meta: "Save on Festivals",
            href: "/bhutan",
            imageSrc: "/images/explore-hub/hub-offer-bhutan.webp",
            imageAlt: "Bhutan valley monastery in misty hills",
            icon: "tag",
          },
          {
            id: "offer-festival",
            title: "Festival Specials",
            subtitle: "Sacred days, living colour",
            meta: "Seasonal Dates",
            href: "/festivals",
            imageSrc: "/images/explore-hub/hub-offer-festival.webp",
            imageAlt: "Monastery courtyard with prayer flags",
            icon: "temple",
          },
          {
            id: "offer-honeymoon",
            title: "Honeymoon Escape",
            subtitle: "Private lodges and sunset peaks",
            meta: "Couples Only",
            href: "/honeymoon",
            imageSrc: "/images/explore-hub/hub-offer-honeymoon.webp",
            imageAlt: "Luxury lodge balcony overlooking snow mountains",
            icon: "globe",
          },
        ],
      },
    ],
  },
  journeys: {
    visible: true,
    wallpaperSrc: SECTION_WALLPAPER,
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
        href: "/everest-base-camp-trek",
        imageSrc: "/images/journeys/j-ebc.webp",
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
        imageSrc: "/images/journeys/j-abc.webp",
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
        imageSrc: "/images/journeys/j-mustang.webp",
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
        imageSrc: "/images/journeys/j-manaslu.webp",
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
        imageSrc: "/images/journeys/j-langtang.webp",
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
        imageSrc: "/images/journeys/j-gokyo.webp",
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
        imageSrc: "/images/journeys/j-heli.webp",
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
        imageSrc: "/images/journeys/j-mardi.webp",
        imageAlt: "Hiker on the Mardi Himal ridge at sunrise",
      },
    ],
  },
  why: {
    visible: true,
    wallpaperSrc: SECTION_WALLPAPER,
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
        avatarSrc: "/images/reviews/avatar-wanda.webp",
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
        avatarSrc: "/images/reviews/avatar-daniel.webp",
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
    wallpaperSrc: SECTION_WALLPAPER,
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
        imageSrc: "/images/experiences/exp-lodges.webp",
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
        imageSrc: "/images/experiences/exp-culture.webp",
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
        imageSrc: "/images/experiences/exp-flights.webp",
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
        imageSrc: "/images/experiences/exp-wildlife.webp",
        imageAlt: "Rhino on a jungle safari track in Nepal",
        icon: "wildlife",
        href: "/luxury-treks",
        ctaLabel: "EXPLORE MORE",
      },
    ],
  },
  availability: {
    visible: true,
    wallpaperSrc: SECTION_WALLPAPER,
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
        imageSrc: "/images/availability/avail-sep.webp",
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
        imageSrc: "/images/availability/avail-oct.webp",
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
        imageSrc: "/images/availability/avail-nov.webp",
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
        imageSrc: "/images/journal/everest-clean.webp",
        imageAlt: "Hikers at sunset on the Everest Base Camp trail",
        videoSrc: "",
      },
      {
        id: "annapurna",
        title: "Annapurna Circuit Trek",
        subtitle: "16 Days Adventure",
        duration: "05:12",
        imageSrc: "/images/journal/annapurna-clean.webp",
        imageAlt: "Traveller overlooking Annapurna peaks",
        videoSrc: "",
      },
      {
        id: "mustang",
        title: "Upper Mustang Expedition",
        subtitle: "13 Days Journey",
        duration: "03:55",
        imageSrc: "/images/journal/mustang-clean.webp",
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
    ctaHref: "/journal",
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
        authorAvatarSrc: "/images/ambition-holiday-logo.webp",
        imageSrc: "/images/journal/everest-clean.webp",
        imageAlt: "Trekkers on the trail toward Everest Base Camp at sunset",
        href: "/journal/luxury-everest-base-camp-guide",
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
        authorAvatarSrc: "/images/ambition-holiday-logo.webp",
        imageSrc: "/images/journal/annapurna-clean.webp",
        imageAlt: "Traveller overlooking Annapurna peaks from a ridge",
        href: "/journal/high-himalayan-pass-adventures",
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
        href: "/journal/best-lake-treks-in-nepal",
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
        imageSrc: "/images/experiences/culture-photo.webp",
        imageAlt: "Nepalese stupa and temples at sunset",
        href: "/journal/short-luxury-adventures-in-nepal",
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
        imageSrc: "/images/packages/everest.webp",
        imageAlt: "Luxury lodge terrace with Himalayan peak views",
        href: "/journal/best-lake-treks-in-nepal",
      },
    ],
    features: [],
  },
  about: {
    visible: true,
    wallpaperSrc: SECTION_WALLPAPER,
    eyebrow: "About Us",
    headline: "Ambition Holidays",
    lead:
      "A luxury tour and trek house with more than 10 years of Himalayan experience — private itineraries, specialist guiding, and lodges chosen for comfort as much as altitude.",
    experienceKicker: "10+ years",
    experienceTitle: "A decade of Himalayan craft",
    experienceBody:
      "Ambition Holidays is a 10+ year experience company. We design luxury journeys across Nepal, Bhutan, Tibet and the wider Himalaya — paced for comfort, staffed by specialists, and backed by the same field team that has walked these trails for over a decade.\n\nWe began as a small specialist house. Dedication to private service, honest altitude planning and beautiful hosting has grown into a luxury brand trusted by travellers who want the mountains without the scramble.",
    storyImageSrc: "/images/about/about-story.webp",
    storyImageAlt: "Ambition Holidays specialists planning a luxury Himalayan journey at golden hour",
    sisterEyebrow: "Sister company",
    sisterName: "Ambition Himalaya Treks and Expeditions",
    sisterBody:
      "Ambition Holidays is the luxury sister company of Ambition Himalaya Treks and Expeditions — a licensed Nepal trekking and expedition house with more than ten years on the trail.\n\nRegistered with the Government of Nepal and a member of TAAN and the Nepal Mountaineering Association, Ambition Himalaya specialises in Everest Base Camp, Annapurna Circuit, Langtang and Helambu, Manaslu, Ghorepani Poon Hill, Upper Mustang, Chitwan safari and mountain expeditions. The field network of guides, lodges and planners that built that reputation now powers Ambition Holidays’ private luxury programmes.\n\nGuests of Ambition Holidays inherit that decade of know-how: area-specific guides you can speak with before you book, high repeat travel, and operations that take weather, acclimatisation and remote logistics seriously — then wrap them in boutique lodges, helicopter options and specialist hosting.",
    sisterHref: "https://ambitionhimalaya.com/",
    sisterCta: "Visit sister company",
    sisterImageSrc: "/images/about/about-sister.webp",
    sisterImageAlt: "Heritage trekking office in Thamel, Kathmandu",
    storyTitle: "Why travellers choose us",
    storyBody:
      "Trekking in Nepal is never only a path. Weather, altitude, remoteness and the quality of the night that follows each day decide whether a journey feels ambitious or merely hard. Our duty is to remove the friction — and keep the wonder.",
    pillars: [
      {
        id: "guides",
        title: "Specialists who have walked it",
        body: "You can speak with an area-specific guide before you book. Our leaders know the weather windows, the lodge kitchens, and when to hold a day for acclimatisation.",
        imageSrc: "/images/about/about-guides.webp",
        imageAlt: "Experienced Himalayan guides on a high ridge at sunrise",
      },
      {
        id: "lodges",
        title: "Luxury that belongs in the mountains",
        body: "Boutique lodges, private dining and helicopter access where it serves the journey — never as a gimmick. Comfort is part of how we keep you strong at altitude.",
        imageSrc: "/images/about/about-luxury.webp",
        imageAlt: "Luxury Himalayan lodge dining room facing snow peaks",
      },
    ],
    stats: [
      { id: "years", value: "10+", label: "Years of Himalayan experience" },
      { id: "guests", value: "4,000+", label: "Travellers hosted from 70 countries" },
      { id: "reviews", value: "410+", label: "Tripadvisor reviews" },
      { id: "license", value: "1058/066", label: "Nepal tourism licence" },
    ],
    licensesTitle: "Licensed. Member. Accountable.",
    licenses: [
      {
        id: "gov",
        label: "Government of Nepal",
        value: "Ministry of Tourism & Civil Aviation · Licence 1058/066",
      },
      {
        id: "reg",
        label: "Registered as",
        value: "Ambition Himalaya Treks and Expeditions",
      },
      {
        id: "taan",
        label: "Memberships",
        value: "TAAN · Nepal Mountaineering Association",
      },
      {
        id: "media",
        label: "Mentioned by",
        value: "Lonely Planet · Tripadvisor",
      },
    ],
    promiseTitle: "Our promise",
    promiseBody:
      "Keep building on a solid foundation, guest by guest. Honest advice before you fly. Calm logistics on the trail. A private journey that still feels like Nepal.",
    formEyebrow: "Have Questions?",
    formTitle: "Ask your valuable questions here",
    formSubtitle:
      "Write to a specialist. We reply with clear answers — dates, altitude, lodges, helicopters, or a fully private outline.",
    formCta: "Send question",
    formSuccess: "Received. A specialist will reply to your email shortly.",
    asideTitle: "Talk to us",
    addressLabel: "Office",
    address: "Thamel - 26, Kathmandu, Nepal",
    officePhone: "+97714518413",
    mobilePhone: "+9779851148898",
    email: "info@ambitionholidays.com",
    whatsappHref: "https://wa.me/9779851148898",
    metaTitle: "About Us | Ambition Holidays",
    metaDescription:
      "Ambition Holidays is a 10+ year luxury tour and trek company — sister company of Ambition Himalaya Treks and Expeditions. Private Himalayan journeys from Thamel, Kathmandu.",
  },
  legalDocuments: {
    visible: true,
    wallpaperSrc: SECTION_WALLPAPER,
    eyebrow: "Company",
    headline: "Legal Documents",
    lead:
      "A lawful Nepal tour and trek house holds registration and licences from the authorities below. Ambition Holidays is the luxury sister company of Ambition Himalaya Treks and Expeditions — these papers belong to that licensed house.",
    introTitle: "Licensed to operate. Ready to file your journey.",
    introBody:
      "In Nepal, a trekking and travel company must be registered with the Government of Nepal and hold the approvals listed here. Ambition Holidays operates as the luxury sister of Ambition Himalaya Treks and Expeditions, a government-registered operator in Thamel, Kathmandu.\n\nThese documents are why we can obtain TIMS, park tickets and restricted-area permits on your behalf. Copies can be shown on request at our office or sent ahead of a booking.",
    documentsTitle: "Company papers",
    documents: [
      {
        id: "registration",
        title: "Certificate of Company Registration",
        body: "Office of the Company Registrar — proof that the house is a legally incorporated Nepal company.",
        imageSrc: "/images/legal/company-registration.webp",
        imageAlt: "Certificate of Company Registration for Ambition Himalaya Treks and Expeditions, sister company of Ambition Holidays",
      },
      {
        id: "pan",
        title: "PAN Registration Certificate",
        body: "Inland Revenue Department permanent account number — required for invoicing and tax.",
        imageSrc: "/images/legal/pan-registration.webp",
        imageAlt: "PAN registration certificate for the licensed sister company",
      },
      {
        id: "tourism",
        title: "Licence from the Department of Tourism",
        body: "Ministry of Culture, Tourism and Civil Aviation — the tourism-industry licence that lets us operate treks and tours.",
        imageSrc: "/images/legal/tourism-licence.webp",
        imageAlt: "Department of Tourism licence for the sister company of Ambition Holidays",
      },
      {
        id: "cottage",
        title: "Department of Cottage & Small Industries",
        body: "Cottage and small-industry registration for the operating house in Kathmandu.",
        imageSrc: "/images/legal/cottage-industry.webp",
        imageAlt: "Department of Cottage and Small Industries certificate",
      },
      {
        id: "forex",
        title: "Foreign Exchange Certificate",
        body: "Authorisation to handle foreign-currency receipts for international guests.",
        imageSrc: "/images/legal/foreign-exchange.webp",
        imageAlt: "Foreign exchange certificate for the licensed Nepal operator",
      },
    ],
    noteTitle: "How to request a copy",
    noteBody:
      "Write to info@ambitionholidays.com or use the form below. Name the document you need and your travel dates. Our office is Thamel-26, Kathmandu. Office +977 1 4518413 · mobile / WhatsApp +977 9851148898.",
    formEyebrow: "Have Questions?",
    formTitle: "Ask your valuable questions here",
    formSubtitle:
      "Licences, memberships, or a copy of a document before you book — we reply from Thamel.",
    formCta: "Send question",
    formSuccess: "Received. A specialist will reply from info@ambitionholidays.com.",
    asideTitle: "Talk to us",
    addressLabel: "Office",
    address: "Thamel-26, Kathmandu, Nepal",
    officePhone: "+97714518413",
    mobilePhone: "+9779851148898",
    email: "info@ambitionholidays.com",
    whatsappHref: "https://wa.me/9779851148898",
    metaTitle: "Legal Documents | Ambition Holidays",
    metaDescription:
      "Company registration, PAN, Department of Tourism licence and other legal documents for Ambition Holidays — sister company of Ambition Himalaya Treks and Expeditions.",
  },
  visa: {
    visible: true,
    wallpaperSrc: SECTION_WALLPAPER,
    eyebrow: "Travel Guide",
    headline: "Visa & Entry",
    lead:
      "Official Nepal tourist-visa, TIMS, park-entry and restricted-area permit figures for Ambition Holidays guests — then India and Bhutan. Fees below are taken from the Department of Immigration and the Nepal Tourism Board. We still re-check them when we file your papers, because governments can update a schedule without notice.",
    updatedLabel: "Verified 16 September 2026 against official sources",
    introTitle: "We file the papers. You keep the journey.",
    introBody:
      "Visas and permits are the first practical question on a Himalayan itinerary. Ambition Holidays — sister company of Ambition Himalaya Treks and Expeditions — is a government-registered operator. We obtain TIMS, park tickets and restricted-area permits in Kathmandu as part of a private programme.\n\nThis page quotes published government rates, not operator estimates. Always confirm the live schedule on immigration.gov.np and ntb.gov.np before you fly. Your specialist will also confirm the payable amount for your exact route and nationality.",
    nepalEyebrow: "Nepal",
    nepalTitle: "Tourist visa",
    nepalBody:
      "Every foreign visitor except Indian nationals needs a tourist visa to enter Nepal. Visa on arrival is issued at Tribhuvan International Airport in Kathmandu, Pokhara International Airport, Gautam Buddha International Airport in Lumbini, and designated land entry points. You may also apply at a Nepalese diplomatic mission before travel. The most reliable source is the Department of Immigration: immigration.gov.np.",
    visaTitle: "On-arrival tourist visa (multiple-entry)",
    visaBody:
      "Complete the online tourist-visa form at nepaliport.immigration.gov.np before you fly (the barcode is valid for 15 days) or use the kiosk on arrival. Bring a passport valid for your stay, a passport-size photograph with a light background, and the fee in US dollars or another convertible currency. International cards are accepted at many counters; cash in USD is still the fastest at peak hours.\n\nTourist visas issued on arrival are multiple-entry. If you obtained a visa at a Nepalese mission abroad, you must enter Nepal within six months of the issue date; your stay is counted from the day you arrive.\n\nIndian nationals do not need a Nepal visa. Carry a valid Indian passport, Election Commission voter card, or other documents listed by the Department of Immigration. Aadhaar is not accepted as a travel document for Nepal.\n\nVisa on arrival is not available to nationals of Nigeria, Ghana, Zimbabwe, Eswatini (Swaziland), Cameroon, Somalia, Liberia, Ethiopia, Iraq, Palestine, Afghanistan, Syria, or to holders of refugee travel documents. Iran is also listed by several Nepal missions as requiring a visa in advance. These travellers must obtain a visa from a Nepalese diplomatic mission (or the official mission portal) before flying.\n\nGratis (free) tourist visa: children below 10 years except US citizens; SAARC citizens except Afghanistan for up to 30 days on the first visit in a visa year; Chinese nationals; and NRN card holders issued by the Ministry of Foreign Affairs or a Nepalese mission. Afghan citizens may receive a gratis visa on arrival only with a Department of Immigration recommendation.",
    visaImageSrc: "",
    visaImageAlt: "",
    visaFees: [
      { id: "15", days: "15-day multiple-entry", amount: "USD 30" },
      { id: "30", days: "30-day multiple-entry", amount: "USD 50" },
      { id: "90", days: "90-day multiple-entry", amount: "USD 125" },
    ],
    visaNote:
      "Source: Nepal Tourism Board and Department of Immigration tourist-visa schedule. Extension at the Department of Immigration in Kathmandu or Pokhara: minimum 15 days at USD 45, then USD 3 per additional day. Late extension (up to 150 days) adds USD 5 per day as a fine. A tourist visa cannot exceed 150 days in a visa year. Confirm live rates on immigration.gov.np before you travel.",
    permitTitle: "Trekking permits",
    permitBody:
      "Most Himalayan routes now require a licensed guide and a TIMS card issued through a government-registered trekking agency (revised TIMS provision, 31 March 2023). You then add the protected-area ticket for each park or conservation area you enter. Restricted valleys also need a Department of Immigration trekking permit, filed in Kathmandu on your passport.",
    permitImageSrc: "",
    permitImageAlt: "",
    permitCards: [
      {
        id: "tims",
        title: "TIMS card",
        body: "Trekkers’ Information Management System. Nepal Tourism Board: NPR 2,000 per person for non-SAARC nationals; NPR 1,000 for SAARC nationals; paid online by the agency. In the Khumbu (Everest) region the rural municipality Trek Card is used at Lukla instead of TIMS: NPR 3,000 for other countries; NPR 2,000 for SAARC countries and China (Khumbu Pasang Lhamu Rural Municipality).",
      },
      {
        id: "protected",
        title: "Protected-area entry",
        body: "National parks, wildlife reserves and conservation areas. One entry fee per area, published by the Nepal Tourism Board. Children below 10 years are free. Tickets are issued at the Nepal Tourism Board Tourist Service Centre, Bhrikutimandap, at designated gates, or through your operator. Official table: ntb.gov.np park entry fees.",
      },
      {
        id: "restricted",
        title: "Restricted-area permits",
        body: "Border and culturally sensitive valleys. Issued only by the Department of Immigration, Kalikasthan, Kathmandu, through a registered trekking agency. Independent travel is not permitted. Carry the permit on the trail and show it to immigration or police on request. Official table: ntb.gov.np trekking permits.",
      },
    ],
    onlineTitle: "How Ambition Holidays files your permits",
    onlineBody:
      "We complete TIMS on the official agency portal, conservation-area tickets (ACAP, MCAP, GCAP and others) at the Nepal Tourism Board or NTNC e-permit desk, Sagarmatha and Langtang park tickets at Bhrikutimandap or the trail gate, and restricted-area permits at the Department of Immigration. You need a clear passport scan and your dates. Incomplete files are rejected; we do not send you to the counter.\n\nUseful official links: immigration.gov.np · nepaliport.immigration.gov.np · ntb.gov.np · epermit.ntnc.org.np.",
    parkTitle: "Protected-area entry fees",
    parkIntro:
      "Per person, per entry, as published by the Nepal Tourism Board (figures provided by the concerned department). Children below 10 years: free. Some field counters add 13% VAT — we confirm the exact payable amount when we issue your ticket.",
    parkFees: [
      { id: "chitwan", name: "Chitwan National Park", nepali: "NPR 150", saarc: "NPR 1,000", foreign: "NPR 2,000" },
      { id: "sagarmatha", name: "Sagarmatha National Park", nepali: "NPR 100", saarc: "NPR 1,500", foreign: "NPR 3,000" },
      { id: "banke", name: "Banke National Park", nepali: "NPR 100", saarc: "NPR 750", foreign: "NPR 1,500" },
      { id: "bardia", name: "Bardia National Park", nepali: "NPR 100", saarc: "NPR 750", foreign: "NPR 1,500" },
      { id: "khaptad", name: "Khaptad National Park", nepali: "NPR 100", saarc: "NPR 1,500", foreign: "NPR 3,000" },
      { id: "langtang", name: "Langtang National Park", nepali: "NPR 100", saarc: "NPR 1,500", foreign: "NPR 3,000" },
      { id: "makalu", name: "Makalu-Barun National Park", nepali: "NPR 100", saarc: "NPR 1,500", foreign: "NPR 3,000" },
      { id: "parsa", name: "Parsa National Park", nepali: "NPR 100", saarc: "NPR 750", foreign: "NPR 1,500" },
      { id: "rara", name: "Rara National Park", nepali: "NPR 100", saarc: "NPR 1,500", foreign: "NPR 3,000" },
      { id: "shey", name: "Shey-Phoksundo National Park", nepali: "NPR 100", saarc: "NPR 1,500", foreign: "NPR 3,000" },
      { id: "shivapuri", name: "Shivapuri-Nagarjun National Park", nepali: "NPR 100", saarc: "NPR 600", foreign: "NPR 1,000" },
      { id: "shukla", name: "Shuklaphanta National Park", nepali: "NPR 100", saarc: "NPR 750", foreign: "NPR 1,500" },
      { id: "koshi", name: "Koshi Tappu Wildlife Reserve", nepali: "NPR 100", saarc: "NPR 750", foreign: "NPR 1,500" },
      { id: "api", name: "Api Nampa Conservation Area", nepali: "NPR 100", saarc: "NPR 500", foreign: "NPR 2,000" },
      { id: "acap", name: "Annapurna Conservation Area", nepali: "NPR 100", saarc: "NPR 1,000", foreign: "NPR 3,000" },
      { id: "blackbuck", name: "Blackbuck Conservation Area", nepali: "NPR 100", saarc: "NPR 500", foreign: "NPR 2,000" },
      { id: "gauri", name: "Gaurishankar Conservation Area", nepali: "NPR 100", saarc: "NPR 1,000", foreign: "NPR 3,000" },
      { id: "kanch", name: "Kanchenjunga Conservation Area", nepali: "NPR 100", saarc: "NPR 500", foreign: "NPR 2,000" },
      { id: "manaslu", name: "Manaslu Conservation Area", nepali: "NPR 100", saarc: "NPR 1,000", foreign: "NPR 3,000" },
      { id: "dhorpatan", name: "Dhorpatan Hunting Reserve", nepali: "NPR 100", saarc: "NPR 1,500", foreign: "NPR 3,000" },
    ],
    restrictedTitle: "Restricted-area trekking permits",
    restrictedIntro:
      "Department of Immigration fees via a registered agency, as published by the Nepal Tourism Board. Amounts are per person. A “week” is seven days. We file the exact wards your itinerary enters — walking outside the permitted route is a legal offence.",
    restrictedImageSrc: "",
    restrictedImageAlt: "",
    restricted: [
      { id: "mustang", name: "Upper Mustang", body: "Lomanthang RM wards 1–5; Lo-Ghekar Damodarkunda RM wards 1–5; Baragung Muktichetra RM ward 3 and Satang village of ward 5.", fee: "USD 50 per person per day" },
      { id: "udolpo", name: "Upper Dolpo", body: "Dolpo Buddha RM wards 4–6; Shey Phoksundo RM wards 1–7; Charka Tangsong RM wards 1–6.", fee: "USD 50 per person per day" },
      { id: "manaslu", name: "Gorkha — Manaslu area", body: "Chumnubri Rural Municipality wards 1, 2, 3 and 4.", fee: "Sep–Nov: USD 100 per person per week, then USD 15 per person per day. Dec–Aug: USD 75 per person per week, then USD 10 per person per day" },
      { id: "humla", name: "Humla", body: "Simikot RM wards 1, 6 and 7; Namkha RM wards 1–6; Changkheli RM wards 3–5.", fee: "USD 50 per person per week, then USD 10 per person per day" },
      { id: "kanch", name: "Taplejung — Kanchenjunga area", body: "Phaktanglung RM wards 6 and 7; Mikwakhola RM ward 5; Sirijunga RM ward 8.", fee: "USD 20 per person per week for the first 4 weeks, then USD 25 per person per week" },
      { id: "ldolpo", name: "Lower Dolpo", body: "Thulibheri and Tripurasundari municipalities; listed wards of Dolpo Buddha, Shey Phoksundo, Jagdulla, Mudkechula and Kaike rural municipalities.", fee: "USD 20 per person per week, then USD 5 per person per week" },
      { id: "dolakha", name: "Dolakha (listed wards)", body: "Gaurishankar RM ward 9; Bigu RM ward 1.", fee: "USD 20 per person per week" },
      { id: "tsum", name: "Gorkha — Tsum Valley", body: "Sirdibas–Lokpa–Chumling–Chekampar–Nile–Chule; Chumnubri RM wards 3, 6 and 7.", fee: "Sep–Nov: USD 40 per person per week, then USD 7 per person per day. Dec–Aug: USD 30 per person per week, then USD 7 per person per day" },
      { id: "sankhu", name: "Sankhuwasabha (listed wards)", body: "Bhotkhola RM wards 1–5; Makalu RM ward 4.", fee: "USD 20 per person per week for the first 4 weeks, then USD 25 per person per week" },
      { id: "khumbu-rap", name: "Solukhumbu — Khumbu Pasang Lhamu RM ward 5", body: "This is the Immigration restricted-area fee for the listed ward only. It is separate from the Khumbu Trek Card charged at Lukla for the main Everest trails.", fee: "USD 20 per person per week for the first 4 weeks, then USD 25 per person per week" },
      { id: "rasuwa", name: "Rasuwa — Gosaikunda RM", body: "Gosaikunda Rural Municipality ward 1 and part of ward 2.", fee: "USD 20 per person per week" },
      { id: "narphu", name: "Manang — Nar / Phu", body: "Narpa RM wards 1–5; Nasho RM wards 6 and 7.", fee: "Sep–Nov: USD 100 per person per week, then USD 15 per person per day. Dec–Aug: USD 75 per person per week, then USD 15 per person per day" },
      { id: "bajhang", name: "Bajhang — Saipal", body: "Saipal Rural Municipality wards 1–5.", fee: "USD 90 per person for the first week, then USD 15 per person per day" },
      { id: "mugu", name: "Mugu — Mugum Karmarong", body: "Mugum Karmarong Rural Municipality wards 1–9.", fee: "USD 100 per person per week, then USD 15 per person per day" },
      { id: "darchula", name: "Darchula — Byas RM ward 1", body: "Byas Rural Municipality ward 1.", fee: "USD 90 per person per week, then USD 15 per person per day" },
    ],
    airportTitle: "Arriving at Tribhuvan International Airport",
    airportBody:
      "Visa on arrival is straightforward; queues grow in October and April. Your Ambition Holidays host waits landside with your nameboard. The sequence below follows Department of Immigration practice.",
    airportImageSrc: "",
    airportImageAlt: "",
    airportSteps: [
      { id: "s1", title: "Online form or kiosk", body: "If you completed nepaliport.immigration.gov.np, bring the printed barcode. Otherwise fill the tourist-visa form on the arrival kiosk. Choose 15, 30 or 90 days and keep the ticket." },
      { id: "s2", title: "Pay the visa fee", body: "Pay USD 30, 50 or 125 (or equivalent convertible currency) at the bank counter. Card is accepted when the terminal is working; USD cash is the reliable backup. Keep the receipt." },
      { id: "s3", title: "Immigration desk", body: "Present passport, visa form or kiosk ticket, and payment receipt. The stamp is multiple-entry for the duration you paid." },
      { id: "s4", title: "Baggage and exit", body: "Collect checked bags, complete any customs declaration, and walk out to the arrivals forecourt." },
      { id: "s5", title: "Meet your host", body: "Your driver waits with the hotel and agency pick-ups. Prepaid taxis and SIM desks are by the door if you have asked us not to meet the flight." },
    ],
    registerTitle: "A quiet extra: embassy or Himalayan Rescue Association",
    registerBody:
      "Leave your name, passport number, emergency contact and itinerary with your embassy in Kathmandu, or with the Himalayan Rescue Association (himalayanrescue.org). Include your hotel and the Ambition Holidays office numbers +977 1 4518413 and +977 9851148898. It speeds any medical evacuation should you ever need one.",
    countries: [
      {
        id: "india",
        eyebrow: "India",
        title: "Visa and inner-line permits",
        body: "Apply only on the Government of India website: indianvisaonline.gov.in. Do not use third-party visa shops. Most leisure travel uses an e-Visa; some nationalities must apply at a mission. High Himalayan districts that sit on an inner line (parts of Uttarakhand, Himachal Pradesh, Sikkim and the far north-east) need a separate Inner Line Permit or Protected Area Permit issued in India. Those papers are arranged with a local partner against original passports, photographs and a day-by-day itinerary — not at the airport on a holiday morning.",
        imageSrc: "",
        imageAlt: "",
      },
      {
        id: "bhutan",
        eyebrow: "Bhutan",
        title: "Visa, SDF and licensed travel",
        body: "Independent tourist travel and independent trekking are not permitted. A visa is processed in advance through a licensed Bhutanese operator (visit.doi.gov.bt). The visa fee is USD 40 per person, non-refundable. In addition, USD-paying visitors pay a Sustainable Development Fee of USD 100 per person per night (a 50% incentive on the USD 200 rate, published by Bhutan Immigration as valid through 31 August 2027). Children aged 6–12 pay half; children under 6 are exempt. Indian passport holders use an entry permit and pay SDF of BTN/INR 1,200 per person per night. When you book Bhutan with Ambition Holidays, visa clearance and SDF are built into the hosted itinerary.",
        imageSrc: "",
        imageAlt: "",
      },
    ],
    closeTitle: "Let us file it",
    closeBody:
      "Send your dates and the ranges you wish to walk. Ambition Holidays prepares the correct Nepal TIMS, park tickets and restricted-area permits, briefs you on visa on arrival, and coordinates Bhutan (and, where relevant, Tibet) paperwork with licensed partners.",
    ctaLabel: "Ask a specialist",
    ctaHref: "/contact",
    metaTitle: "Visa & Entry | Ambition Holidays",
    metaDescription:
      "Official Nepal tourist visa fees (USD 30 / 50 / 125), TIMS, national-park and restricted-area permit rates, Kathmandu airport arrival, India and Bhutan entry — Ambition Holidays.",
  },
  bestTime: {
    visible: true,
    wallpaperSrc: SECTION_WALLPAPER,
    eyebrow: "Travel Guide",
    headline: "Best Time to Visit",
    lead:
      "For most Nepal treks and luxury journeys, spring (March to May) and autumn (September to November) are the clearest, most stable windows. October is usually the finest single month; April is the warmest spring month, with rhododendron forests in bloom. Ambition Holidays times private itineraries around weather, festivals and lodge availability — not a generic calendar.",
    updatedLabel: "Season briefing for 2026 journeys",
    introTitle: "Two peak seasons. Four ways to travel.",
    introBody:
      "Nepal’s climate is shaped by altitude as much as by the monsoon. Kathmandu and Pokhara sit in the mid-hills; Everest Base Camp and Thorong La sit more than 5,000 metres higher, where nights can freeze even in October. There is no single “perfect week” for the whole country — only the right window for your route.\n\nAutumn, after the monsoon, typically brings the sharpest mountain views. Spring brings longer days, blooming hills and the start of the 8,000-metre expedition season. Winter is quiet and excellent below about 4,000 metres. The monsoon (June to August) is lush and empty on most trails, and it is the classic season for rain-shadow Mustang and Dolpo.\n\nAmbition Holidays — sister company of Ambition Himalaya Treks and Expeditions — designs around your dates: private lodges, helicopter support, and a Plan B if a pass or a flight is closed.",
    calendarTitle: "Month-by-month calendar",
    calendarIntro:
      "Temperatures are typical daytime ranges on the trail, not city forecasts. Crowds refer to classic routes such as Everest Base Camp and the Annapurna Circuit. High passes can still close after a single storm in any month.",
    months: [
      { id: "jan", month: "January", weather: "Cold, often clear; snow above ~3,000 m", temp: "−10°C to 15°C", crowds: "Very low", bestFor: "Poon Hill, lower Annapurna, Kathmandu heritage" },
      { id: "feb", month: "February", weather: "Cold mornings, slowly warming days", temp: "−5°C to 18°C", crowds: "Low", bestFor: "Short Annapurna and Langtang itineraries" },
      { id: "mar", month: "March", weather: "Spring opening; first rhododendrons", temp: "5°C to 22°C", crowds: "Medium", bestFor: "Annapurna Circuit, Everest, Mardi Himal" },
      { id: "apr", month: "April", weather: "Warm days, forests in full bloom", temp: "8°C to 25°C", crowds: "High", bestFor: "ABC, Everest, photography, rhododendron trails" },
      { id: "may", month: "May", weather: "Hot in the valleys; haze can build", temp: "12°C to 28°C", crowds: "Medium", bestFor: "Upper Mustang, Tilicho, high Khumbu" },
      { id: "jun", month: "June", weather: "Monsoon begins on the southern slopes", temp: "15°C to 30°C", crowds: "Very low", bestFor: "Mustang, Dolpo, Chitwan lodges" },
      { id: "jul", month: "July", weather: "Peak monsoon; trails can be slippery", temp: "18°C to 30°C", crowds: "Very low", bestFor: "Rain-shadow Mustang and Upper Dolpo" },
      { id: "aug", month: "August", weather: "Late monsoon; occasional clear spells", temp: "17°C to 29°C", crowds: "Very low", bestFor: "Mustang (Yartung), luxury wildlife" },
      { id: "sep", month: "September", weather: "Monsoon withdrawing; trails drying", temp: "10°C to 25°C", crowds: "Medium", bestFor: "Mardi Himal, Langtang, early Annapurna" },
      { id: "oct", month: "October", weather: "Clearest skies of the year after monsoon", temp: "5°C to 22°C", crowds: "Very high", bestFor: "EBC, Annapurna Circuit, Manaslu — book lodges early" },
      { id: "nov", month: "November", weather: "Cool, crisp, still very clear", temp: "0°C to 18°C", crowds: "High", bestFor: "All classic treks; quieter teahouses than October" },
      { id: "dec", month: "December", weather: "Cold; snow on high passes", temp: "−8°C to 12°C", crowds: "Low", bestFor: "Poon Hill, Lower Mustang, short luxury treks" },
    ],
    seasonsTitle: "The four seasons",
    seasons: [
      {
        id: "spring",
        eyebrow: "March – May",
        title: "Spring",
        meta: "Typically 10°C–25°C in the mid-hills · crowds medium to high · rhododendrons and longer days",
        body:
          "Spring is the second great trekking season. Days lengthen, snow recedes on the lower trails, and rhododendron forests — Nepal’s national flower — colour Ghorepani, Ghorepani–Poon Hill, Mardi Himal and parts of Langtang, usually peaking in April. March is cooler and quieter. April is the busiest spring month. By May the valleys heat up and haze can soften distant views, while high camps and Mustang stay excellent.\n\nThis is also the main spring climbing window on Everest and other 8,000-metre peaks. Luxury guests should reserve Everest-view lodges and helicopter seats early. Festivals often include Holi (date moves), Nepali New Year around 14 April, and Buddha Jayanti in May.",
        highlights: ["Rhododendron bloom", "Everest expedition season", "Nepali New Year", "Warm spring days"],
      },
      {
        id: "monsoon",
        eyebrow: "June – August",
        title: "Monsoon",
        meta: "Lush, quiet trails · heavy rain on the southern slopes · rain-shadow Mustang and Dolpo stay viable",
        body:
          "The summer monsoon feeds Nepal’s rivers and turns the hills emerald. It is not the season for first-time Everest or Annapurna Base Camp walks: flights delay, leeches appear below about 2,000 metres, and stone staircases become slick. It is, however, a superb private season if you choose the rain shadow.\n\nUpper Mustang and Upper Dolpo sit north of the Annapurna–Dhaulagiri wall and receive a fraction of Pokhara’s rainfall (Pokhara often exceeds 3,000 mm a year; Mustang’s high desert is typically a few hundred millimetres). Lo Manthang’s Yartung horse festival is usually in August. Chitwan and Bardia national parks are green and uncrowded; some jungle tracks close after heavy rain, so we keep vehicle and lodge plans flexible.\n\nA licensed guide is still required on most Himalayan routes. We watch aviation weather daily — monsoon helicopters fly on windows, not on hope.",
        highlights: ["Upper Mustang", "Upper Dolpo", "Wildlife lodges", "Empty trails"],
      },
      {
        id: "autumn",
        eyebrow: "September – November",
        title: "Autumn",
        meta: "The premier season · clearest views after monsoon · Dashain and Tihar · October is peak",
        body:
          "Autumn is the finest all-round season for trekking and luxury touring in Nepal. Late September is when the monsoon usually releases its hold; trails dry, waterfalls still run, and the first stable views return. October typically offers the sharpest visibility of the year — and the fullest lodges. November is cooler, still clear, and slightly calmer in the dining rooms.\n\nDashain and Tihar (dates follow the lunar calendar, usually October–November) are Nepal’s great harvest festivals. Cities and villages glow; some family-run teahouses run on a thinner staff, which is another reason we pre-book rooms and private vehicles.\n\nIf you want Everest Base Camp, the Annapurna Circuit, Manaslu or a helicopter-assisted luxury trek, autumn is the default recommendation — with lodge reservations made months ahead for October.",
        highlights: ["Clearest mountain views", "Dashain & Tihar", "All major routes open", "Book lodges early"],
      },
      {
        id: "winter",
        eyebrow: "December – February",
        title: "Winter",
        meta: "Quiet trails · brilliant low-angle light · high passes often closed · ideal below ~4,000 m",
        body:
          "Winter is underrated for a luxury short trek. Days are short and nights are cold, but the air is often crystalline and the trails are yours. Ghorepani–Poon Hill, lower Mardi Himal, Pikey Peak, Lower Mustang and Kathmandu Valley heritage walks remain excellent with proper down layers.\n\nHigh crossings are a different matter. Thorong La (5,416 m) on the Annapurna Circuit and Larkya La (5,106 m) on Manaslu frequently hold deep snow from December through February; we do not force those itineraries in mid-winter. Cho La and Renjo La in the Khumbu can close after storms.\n\nWinter is also a prime mountaineering season on certain peaks. For guests, it is the easiest time to find space in signature lodges and to pair a short trek with a helicopter or a wildlife add-on in the Terai, where days are mild.",
        highlights: ["Poon Hill & short treks", "Quiet luxury lodges", "Sharp winter light", "Avoid high passes"],
      },
    ],
    regionsTitle: "Best season by region",
    regionsIntro:
      "Spring and autumn suit almost every classic walk. The exceptions are the rain-shadow north and the Terai wildlife parks, which have their own logic.",
    regions: [
      {
        id: "annapurna",
        title: "Annapurna",
        body: "Best months: October–November and March–April. Spring for rhododendron on Ghorepani, ABC and Mardi Himal. Autumn for Annapurna South, Machhapuchhre and Dhaulagiri views. Monsoon: shift to Lower or Upper Mustang. Winter: Poon Hill and lower Mardi remain realistic with ice on the dawn viewpoints.",
      },
      {
        id: "everest",
        title: "Everest / Khumbu",
        body: "Best months: October–November and March–May. Autumn has the clearest Everest views; spring has longer days and the spectacle of Base Camp in expedition season. Lukla flights are weather-sensitive year-round — we build buffer days or a helicopter backup. Cho La and Renjo La are least reliable in deep winter.",
      },
      {
        id: "langtang",
        title: "Langtang & Helambu",
        body: "Best months: October–November and March–May. Closest major mountain region to Kathmandu, which helps luxury guests on a shorter stay. Langtang Valley to Kyanjin Gompa is often still walkable in December with cold nights. Gosaikunda in winter needs ice experience and a conservative plan.",
      },
      {
        id: "manaslu",
        title: "Manaslu",
        body: "Best months: September–November and March–May. A restricted-area circuit: permits only through a registered agency, with a licensed guide. Larkya La (5,106 m) is commonly closed or unsafe December–February. Combine with Tsum Valley in spring or autumn for a quieter cultural add-on.",
      },
      {
        id: "mustang",
        title: "Upper Mustang & Dolpo",
        body: "Best months: May–October, including monsoon. These high deserts sit in the Himalayan rain shadow. Tiji in Lo Manthang usually falls in spring (Tibetan lunar calendar, often May). Restricted-area permits are required. We time jeep-and-trek combinations so you are not sitting in a Kathmandu storm when the north is dry.",
      },
      {
        id: "wildlife",
        title: "Chitwan, Bardia & the Terai",
        body: "The lowlands run hot before the monsoon (April–May often above 35°C). October–March is the most comfortable safari window, with cooler mornings and better wildlife viewing. Peak monsoon can flood tracks; we confirm lodge access before you fly. A natural pairing after a mountain trek.",
      },
    ],
    altitudeTitle: "Typical temperatures by altitude",
    altitudeIntro:
      "Indicative daytime ranges. Wind, shade and a clear night can swing several degrees either way. Sleeping bags and lodge heating matter more than the midday number.",
    altitudes: [
      { id: "pokhara", zone: "~800 m", place: "Pokhara / lakeside", spring: "15–30°C", monsoon: "22–32°C", autumn: "15–28°C", winter: "8–20°C" },
      { id: "mid", zone: "~2,000 m", place: "Ghandruk / Namche approach", spring: "10–22°C", monsoon: "15–25°C", autumn: "8–20°C", winter: "2–15°C" },
      { id: "three", zone: "~3,000 m", place: "Namche, Ghorepani, forest camps", spring: "5–15°C", monsoon: "10–18°C", autumn: "3–14°C", winter: "−5–8°C" },
      { id: "four", zone: "~4,000 m", place: "ABC, Dingboche, high camps", spring: "0–10°C", monsoon: "5–12°C", autumn: "−2–8°C", winter: "−15–2°C" },
      { id: "five", zone: "5,000 m+", place: "Everest Base Camp, Thorong La", spring: "−5–8°C", monsoon: "0–10°C", autumn: "−8–5°C", winter: "−20–0°C" },
    ],
    luxuryTitle: "How Ambition Holidays times a private journey",
    luxuryBody:
      "Peak October is magnificent and busy. If you want the same views without sharing every dining room, we often place luxury guests in the last ten days of September, throughout November, or in March. Helicopter-assisted Everest and Annapurna programmes compress acclimatisation — we still respect altitude science and keep spare weather days.\n\nTell us the month you can travel. We will answer with a route that is honest about snow, rain, festivals and lodge quality, then file the correct Nepal permits.",
    closeTitle: "Choose the month. We will choose the mountain.",
    closeBody:
      "Write to Ambition Holidays in Thamel with your dates, fitness and whether you prefer a classic teahouse trail, a private lodge, or a helicopter-supported circuit. A specialist will reply with a season-true outline.",
    ctaLabel: "Plan my dates",
    ctaHref: "/contact",
    metaTitle: "Best Time to Visit Nepal | Ambition Holidays",
    metaDescription:
      "Best time to trek and travel in Nepal: spring (March–May) and autumn (September–November), plus monsoon rain-shadow and winter short treks. A luxury season guide from Ambition Holidays.",
  },
  packing: {
    visible: true,
    wallpaperSrc: SECTION_WALLPAPER,
    eyebrow: "Travel Guide",
    headline: "Packing Guide",
    lead:
      "Pack for altitude, not for a packing list you found in a hurry. Nepal moves from warm Kathmandu mornings to freezing high camps in a single day. Ambition Holidays keeps your duffel honest: layers that work, documents that pass a checkpoint, and nothing that a porter should not have to lift.",
    updatedLabel: "Luxury trek kit briefing",
    introTitle: "Travel light. Dress in layers.",
    introBody:
      "The Himalaya rewards a small, well-chosen kit. Cotton next to the skin stays wet and cold. Merino or synthetic base layers dry on a lodge line. A waterproof shell matters more than a third pair of jeans.\n\nOn a private Ambition Holidays trek you carry a daypack (water, camera, spare layer, documents). A porter carries your duffel. We keep loads within responsible limits — typically one duffel of about 10–12 kg of personal kit per guest, plus any sleeping bag we have issued. City clothes stay in Kathmandu at the hotel.\n\nSeason still decides the last 20 percent: monsoon gaiters, winter down and microspikes, spring sun at 5,000 metres. Tell us your month and maximum altitude; we will trim this list to your itinerary.",
    beforeTitle: "Decide these before you pack",
    beforeIntro:
      "A packing list without a route is just shopping. Answer these six points first — then open the suitcase.",
    checks: [
      { id: "season", title: "Season", body: "Spring and autumn need a full layering system. Monsoon needs a serious shell and dry-bags. Winter below 4,000 m is manageable; high passes need expedition-weight down and a conservative plan." },
      { id: "style", title: "Style of journey", body: "A three-day Poon Hill walk is not Everest Base Camp. Helicopter-assisted luxury lodges mean less sleeping-bag drama. A camping or restricted-area circuit does not." },
      { id: "altitude", title: "Highest sleep", body: "Note the highest night, not only the pass. Dingboche, ABC and Thorong High Camp behave like winter even in October after sunset." },
      { id: "culture", title: "Culture on the trail", body: "Covered shoulders and knees in monasteries and villages. A light scarf or shirt over a vest is enough. Leave military-style clothing at home." },
      { id: "daynight", title: "Day-to-night swing", body: "Namche can be 15°C at lunch and near freezing at 5 a.m. Pack for both, not for the brochure photograph." },
      { id: "trail", title: "Trail underfoot", body: "Stone staircases, dust, monsoon mud, or hard snow. That choice decides boots versus a second pair of trail shoes, and whether gaiters earn their weight." },
    ],
    kitTitle: "What to pack",
    groups: [
      {
        id: "head",
        title: "Head, face and neck",
        body: "The Himalayan sun is fierce even when the air is cold. Protect eyes, lips and the back of the neck.",
        items: [
          "Category 3 or 4 sunglasses with full UV protection (side cover or glacier glasses above 4,500 m)",
          "Sun hat or cap, plus a warm beanie for mornings",
          "Neck gaiter or light scarf (dust, sun, monastery visits)",
          "SPF 30–50 sunscreen and SPF lip balm",
          "Simple moisturiser — high, dry air cracks skin",
        ],
      },
      {
        id: "torso",
        title: "Torso and hands",
        body: "Three layers beat one heavy coat: a wicking base, an insulating mid-layer, a waterproof shell. Add down for dawn starts and high camps.",
        items: [
          "2 merino or synthetic base-layer tops (one spare)",
          "1 light fleece or light down sweater",
          "1 expedition-weight down jacket for 4,000 m+ evenings",
          "1 waterproof, windproof shell (hooded)",
          "2–3 trekking shirts, short and long sleeve",
          "Light liner gloves for the day; insulated gloves for dawn and the pass",
        ],
      },
      {
        id: "legs",
        title: "Legs and feet",
        body: "Boots should already be walked-in. New boots on day one of Everest are a classic way to end a holiday early.",
        items: [
          "Broken-in waterproof trekking boots with ankle support",
          "Light shoes or sandals for lodges and Kathmandu",
          "2 pairs of trekking trousers (stretch, quick-dry)",
          "1 warm pair for the evening (fleece or merino)",
          "Thermal bottoms for high camps and winter",
          "3–4 pairs of merino trekking socks plus liner socks if you blister easily",
          "Gaiters for monsoon mud or winter snow; microspikes only if we confirm ice on your pass",
        ],
      },
      {
        id: "carry",
        title: "On the trail",
        body: "You walk with a daypack. The duffel is not a shopping trolley. If it does not earn its weight on a 5,000-metre morning, leave it in Thamel.",
        items: [
          "Daypack 20–30 L with a rain cover (water, camera, layer, first aid, documents)",
          "Duffel 50–70 L for the porter — we can issue one",
          "Head torch with spare batteries (lodges still lose power)",
          "Trekking poles with rubber tips for stone steps",
          "Insulated bottle plus a backup bottle or bladder; purification tablets or a filter",
          "Sleeping bag rated to about −15°C if your itinerary includes basic teahouses or high camps (luxury lodges supply bedding — we will say which)",
          "Dry-bags or zip pouches for electronics and a spare set of clothes",
        ],
      },
    ],
    documentsTitle: "Papers, money and health",
    documentsIntro:
      "Checkpoints and Lukla check-in are unimpressed by a phone gallery. Carry paper and a second digital copy.",
    documents: [
      "Passport with at least six months’ validity and extra copies",
      "Two extra passport photographs for permits (we also keep scans)",
      "Nepal visa proof or USD cash for visa on arrival (see Visa & Entry)",
      "Travel insurance that names helicopter evacuation and trekking to your maximum altitude — send us the policy before you fly",
      "International tickets and a printed copy of the first hotel night",
      "Credit card plus USD cash for the visa desk; NPR for teahouses, tips and small shops",
      "Universal adaptor (Nepal uses a mix of types C, D and M) and a power bank",
      "Personal medicines in original packaging, plus a simple blister kit; any altitude medication only with your own doctor’s advice",
    ],
    providedTitle: "What Ambition Holidays can issue",
    providedBody:
      "Say what you would rather not buy at home. We issue or rent kit in Kathmandu and collect it after the trek. Branded expedition pieces are easier to rent here than to fly in.",
    provided: [
      "Porter duffel bag",
      "Sleeping bag (season-rated for your itinerary)",
      "Down jacket on request",
      "First-aid kit carried by the guide",
      "Permits, TIMS and park tickets — already on your file",
    ],
    seasonTitle: "Season adjustments",
    seasonIntro:
      "Keep the core list. Add only what the month demands.",
    seasons: [
      { id: "spring", title: "Spring (March–May)", body: "Full sun kit and a solid down jacket for high camps. Nights at ABC and Everest Base Camp are still cold. A light rain shell for afternoon build-ups in May." },
      { id: "monsoon", title: "Monsoon (June–August)", body: "Serious waterproof shell, pack covers, dry-bags, and gaiters. Quick-dry everything. Leech socks below about 2,000 m on forest trails. Mustang and Dolpo guests can pack more like a high desert and less like a rainforest." },
      { id: "autumn", title: "Autumn (September–November)", body: "The standard luxury list. October mornings are sharp; November needs warmer gloves and a heavier down at 5,000 m. Dust on the trail — a buff earns its place." },
      { id: "winter", title: "Winter (December–February)", body: "Expedition down, warmest gloves, a colder sleeping-bag rating, and spare socks. We will tell you if microspikes are justified. High passes are often off the menu; pack for short, cold, beautiful days instead." },
    ],
    luxuryTitle: "How we pack a private journey",
    luxuryBody:
      "After you confirm dates, a specialist sends a route-true list — not a generic PDF. If you are combining Kathmandu heritage, a helicopter and two nights in a luxury Khumbu lodge, you do not need the same bag as a fourteen-day camping circuit.\n\nWe can walk Thamel with you the afternoon before departure for fuel, SPF and any missing glove. Leave fashion luggage at the hotel. The mountain notices weight, not logos.",
    closeTitle: "Send your dates. We will send the list.",
    closeBody:
      "Write to Ambition Holidays — sister company of Ambition Himalaya Treks and Expeditions — with your month, route and whether you prefer teahouses or private lodges. We reply with a trimmed packing list and what we will issue in Kathmandu.",
    ctaLabel: "Ask a specialist",
    ctaHref: "/contact",
    metaTitle: "Packing Guide for Nepal Treks | Ambition Holidays",
    metaDescription:
      "Luxury packing list for Nepal trekking: layers, boots, documents, porter duffels and season extras. What Ambition Holidays issues in Kathmandu — and what to leave at the hotel.",
  },
  altitude: {
    visible: true,
    wallpaperSrc: SECTION_WALLPAPER,
    eyebrow: "Travel Guide",
    headline: "Altitude Tips",
    lead:
      "Going too high, too fast is the usual cause of altitude illness — not fitness, not age, not how many Alps you have walked. Ambition Holidays builds rest days into private itineraries, and our guides will turn a group around. This page is a briefing, not a diagnosis. Your doctor before you fly, and your guide on the trail, have the last word.",
    updatedLabel: "Aligned with WMS 2024 and Himalayan Rescue Association practice",
    introTitle: "Air is thinner. Plans must be slower.",
    introBody:
      "As you gain height, each breath carries less oxygen. Most people feel that above about 2,500 m: a faster pulse, lighter sleep, the need to pause on stone steps. That is expected. Acute mountain sickness (AMS) is different. It is illness — typically a headache plus nausea, unusual fatigue or dizziness — and it is the body’s warning that you have outrun acclimatisation.\n\nKathmandu sits near 1,400 m. Namche Bazaar is about 3,440 m. Everest Base Camp is about 5,364 m. Annapurna Base Camp is about 4,130 m. Thorong La is 5,416 m. Helicopters and luxury lodges do not cancel physics. If you sleep high, you still have to acclimatise.\n\nAmbition Holidays — sister company of Ambition Himalaya Treks and Expeditions — designs Everest, Annapurna and Manaslu programmes with extra nights where they matter (Namche, Dingboche, Manang). We would rather add a day than call a helicopter.",
    beforeTitle: "Rules that actually protect you",
    beforeIntro:
      "These are the Wilderness Medical Society and Himalayan Rescue Association ideas we plan around — not folklore.",
    checks: [
      { id: "sleep", title: "Sleeping altitude is what counts", body: "Above about 3,000 m, do not raise the altitude at which you sleep by more than about 500 m in a night. You may walk higher in the day if you come back down to sleep — climb high, sleep low." },
      { id: "rest", title: "Rest days are medicine", body: "Plan an extra night at the same sleeping height every 3–4 days, or after about 1,000 m of gain. Namche and Manang exist for this reason. Skipping them to “save a day” is how AMS starts." },
      { id: "no-higher", title: "Never go higher with AMS", body: "If you have a persistent altitude headache plus other AMS symptoms, stay put. If symptoms worsen, go down. Staying at the same height while you get worse is not rest — it is delay." },
      { id: "descend", title: "Descent is the treatment", body: "AMS usually eases after a descent of 300–1,000 m. HACE and HAPE need immediate descent, oxygen if available, and evacuation. No tablet replaces walking downhill." },
      { id: "pace", title: "The slowest person sets the pace", body: "Fitness at sea level does not predict who gets AMS. Previous altitude illness does raise risk. The itinerary moves at the slowest safe speed, not the strongest guest’s speed." },
      { id: "habits", title: "Do not depress your breathing", body: "Drink enough that urine stays pale (often 3–4 litres a day). Avoid alcohol, strong sleeping pills and other sedatives at altitude — they flatten overnight breathing. Eat, even if appetite dips; carbohydrates help." },
    ],
    kitTitle: "How it feels — and when it is illness",
    groups: [
      {
        id: "normal",
        title: "Expected at height (not automatically AMS)",
        body: "Most guests notice some of these above 3,000 m even on a well-paced trek. They should ease with rest, fluids and a slower day. Tell your guide anyway — patterns matter more than any single feeling.",
        items: [
          "Breathlessness on steep steps, easing at rest",
          "Needing more sleep, or vivid dreams",
          "Passing more urine (often a good sign of acclimatisation)",
          "Mild loss of appetite on the first high night",
          "A dry cough in cold, dry air",
        ],
      },
      {
        id: "ams",
        title: "Mild AMS — do not go higher",
        body: "Doctors usually define AMS as a headache at altitude plus at least one of: nausea or vomiting, unusual fatigue or weakness, dizziness. A runny nose or a cold is not AMS. Admit the symptoms early. Pride is a poor climbing partner.",
        items: [
          "Persistent headache that is not just “tired from the walk”",
          "Nausea, or vomiting",
          "Unusual weakness or exhaustion",
          "Dizziness or light-headedness at rest",
          "Symptoms that worsen overnight instead of easing",
        ],
      },
      {
        id: "serious",
        title: "Serious signs — descend now",
        body: "These can mean high-altitude cerebral oedema (HACE) or high-altitude pulmonary oedema (HAPE). Both can kill. There is no “push through until breakfast.” Wake the guide. Go down. Call for evacuation.",
        items: [
          "Severe, relentless headache or repeated vomiting",
          "Ataxia — cannot walk a straight line, looks drunk",
          "Confusion, not staying awake, or not understanding simple instructions",
          "Breathlessness at rest, wet cough, pink frothy sputum, or a rattling sound in the chest",
          "Blue lips or face, extreme lethargy, a very high resting pulse",
        ],
      },
    ],
    documentsTitle: "How we prevent it on an Ambition itinerary",
    documentsIntro:
      "Prevention is almost entirely about the calendar. Medicines are a supplement, never a substitute for rest days.",
    documents: [
      "Start walking from a sensible height. Flying into Lukla (~2,860 m) still needs a Namche rest, not a race to Tengboche the next morning.",
      "Sleeping altitude gain of about 500 m or less per night above 3,000 m, with rest nights built in.",
      "Easy afternoon walks on rest days (climb high, sleep low) rather than lying still all day.",
      "Guides carry a pulse oximeter as one tool among others — numbers are interpreted with symptoms, not as a scoreboard.",
      "Tell the guide the truth at breakfast. We would rather rearrange lodges than manage HAPE at dusk.",
      "Travel insurance must name helicopter evacuation to your maximum sleeping altitude. We check the policy before you fly.",
    ],
    providedTitle: "What we do on the mountain",
    providedBody:
      "Luxury is not skipping acclimatisation. It is having the time, the staff and the helicopter option if the mountain disagrees.",
    provided: [
      "Itineraries with spare nights, not the shortest brochure",
      "Licensed guides trained to stop an ascent",
      "Pulse oximeter and a simple first-aid kit with the team",
      "Himalayan Rescue Association posts used when we are in range (seasonal clinics such as Pheriche and Manang)",
      "Helicopter evacuation coordinated when insurance and weather allow",
    ],
    seasonTitle: "HACE, HAPE and prescription medicines",
    seasonIntro:
      "Read this once. Then book a conversation with your own doctor. We will not issue altitude drugs from the office WhatsApp.",
    seasons: [
      { id: "hace", title: "HACE", body: "Fluid around the brain. It can follow ignored AMS. Ataxia (unsteady, “drunk” walking) is the classic warning. Coma can develop in hours to a couple of days. Treatment is immediate descent, oxygen if you have it, and emergency dexamethasone only as a clinician or a trained guide directs — then get lower. A portable hyperbaric bag, if one is present, is a bridge, not a destination." },
      { id: "hape", title: "HAPE", body: "Fluid in the lungs. Breathlessness at rest and a wet cough are the alarms. It can move faster than HACE. Oxygen and descent save lives. Other drugs used in clinics (for example nifedipine) are not a guest self-treatment. Do not wait for morning “to see if it clears.”" },
      { id: "meds", title: "Acetazolamide and dexamethasone", body: "Acetazolamide (often known as Diamox) is the usual prescription prevention drug. The Himalayan Rescue Association commonly discusses 125 mg twice daily, started before a big gain in height. It is related to sulfa drugs; allergy can be severe; tingling lips and a change in taste are common. It does not hide AMS — it helps you breathe more at night. Dexamethasone can be life-saving in HACE in trained hands; it is not a daily vitamin for tourists and it can mask symptoms. Neither drug replaces descent. Only your physician can prescribe, and a trial of acetazolamide at home is wise if you have never taken it." },
    ],
    luxuryTitle: "Helicopters, lodges and honesty",
    luxuryBody:
      "A private lodge in the Khumbu does not lower Everest. If we fly you to a high hotel, we still respect sleeping altitude. If a guest wants to skip Dingboche to “make the summit window,” we refuse. That is the luxury: a company that will disappoint a schedule rather than a family.\n\nBefore you leave home, see a travel-medicine doctor, especially if you have heart or lung disease, sleep apnoea, are pregnant, or have had AMS before. Bring your own blister kit and everyday pain relief. Leave the antibiotics and the guesswork to professionals.",
    closeTitle: "Walk with a margin.",
    closeBody:
      "Send Ambition Holidays your dates and the highest place you hope to sleep. We will answer with an honest itinerary, rest-day logic, and the insurance wording your policy needs. On the trail, tell us the moment a headache stops being ordinary.",
    ctaLabel: "Ask a specialist",
    ctaHref: "/contact",
    metaTitle: "Altitude Tips for Nepal Treks | Ambition Holidays",
    metaDescription:
      "Altitude sickness briefing for Nepal: AMS, HACE, HAPE, rest days, 500 m sleeping-altitude rule, and how Ambition Holidays paces luxury treks. Not a substitute for your doctor.",
  },
  permits: {
    visible: true,
    wallpaperSrc: SECTION_WALLPAPER,
    eyebrow: "Travel Guide",
    headline: "Permits & Fees",
    lead:
      "Most Himalayan walks need more than a tourist visa. Ambition Holidays files TIMS, park tickets and restricted-area permits in Kathmandu as part of a private itinerary. Figures below are the Nepal Tourism Board, Department of Immigration and Nepal Mountaineering Association schedules we work from — we re-check the payable amount when we issue your papers.",
    updatedLabel: "Verified against NTB, Immigration and NMA schedules",
    introTitle: "Four kinds of paper. One operator.",
    introBody:
      "A Nepal tourist visa gets you into the country. It does not get you onto the trail. Classic routes then add a TIMS card and a protected-area ticket. Restricted valleys add a Department of Immigration permit that only a registered agency can obtain. Trekking peaks add an NMA climbing royalty.\n\nIndependent walking on most Himalayan routes has not been the rule since 31 March 2023: a licensed guide and an agency-issued TIMS are required on the listed trails. Ambition Holidays — sister company of Ambition Himalaya Treks and Expeditions — is that agency.\n\nTourist visa fees live on our Visa & Entry page. This page is the mountain paperwork.",
    familiesTitle: "What you actually buy",
    familiesIntro:
      "Your route determines the stack. Everest is not Annapurna. Mustang is not a park ticket with a different name.",
    families: [
      {
        id: "tims",
        title: "TIMS card",
        body: "Trekkers’ Information Management System, issued online through a registered agency. Nepal Tourism Board: NPR 2,000 per person for non-SAARC nationals; NPR 1,000 for SAARC nationals. In the Khumbu, the rural municipality Trek Card at Lukla replaces TIMS: NPR 3,000 for other countries; NPR 2,000 for SAARC countries and China.",
      },
      {
        id: "park",
        title: "Protected-area entry",
        body: "National parks, wildlife reserves and conservation areas. One fee per area you enter, as published by the Nepal Tourism Board. Children below 10 years are free. Some field counters add 13% VAT — we confirm the exact NPR amount when we buy the ticket.",
      },
      {
        id: "rap",
        title: "Restricted-area permit",
        body: "Border and culturally sensitive wards. Issued only by the Department of Immigration, Kalikasthan, through a registered trekking agency. Independent travel is not permitted. Carry the permit on the trail. Walking outside the listed wards is a legal offence.",
      },
      {
        id: "nma",
        title: "NMA trekking-peak royalty",
        body: "Island Peak, Mera, Lobuche East and other NMA peaks need a climbing permit on top of trek paperwork. Fees are per person, by season, from the Nepal Mountaineering Association. Garbage deposits and liaison rules apply. We quote the live NMA figure before we file.",
      },
    ],
    routesTitle: "Typical stacks on luxury itineraries",
    routesIntro:
      "These are the usual combinations, not a quote. Restricted-area days are counted on the permit, not on the lodge night.",
    routes: [
      { id: "ebc", title: "Everest Base Camp / Gokyo", body: "Sagarmatha National Park entry (NPR 3,000 foreign) plus the Khumbu Pasang Lhamu Trek Card (NPR 3,000 other countries / NPR 2,000 SAARC and China). TIMS is not used on the main Lukla trails. Add an NMA royalty if you climb Island Peak or Lobuche East." },
      { id: "annapurna", title: "Annapurna Base Camp, Circuit, Mardi, Poon Hill", body: "TIMS plus the Annapurna Conservation Area Permit (NPR 3,000 foreign / NPR 1,000 SAARC). If the circuit continues into Nar–Phu, add the Manang restricted-area permit." },
      { id: "langtang", title: "Langtang Valley / Gosaikunda", body: "TIMS plus Langtang National Park (NPR 3,000 foreign). Listed wards of Gosaikunda Rural Municipality also carry a USD 20 per person per week Immigration permit." },
      { id: "manaslu", title: "Manaslu Circuit / Tsum", body: "Restricted-area permit (seasonal USD weekly rates) plus Manaslu Conservation Area (NPR 3,000 foreign) plus TIMS. Tsum uses a separate Gorkha RAP schedule. A licensed guide is mandatory." },
      { id: "mustang", title: "Upper Mustang", body: "USD 50 per person per day (NTB / Immigration schedule — there is no 10-day USD 500 package). Plus ACAP if you enter through the Annapurna conservation area, plus TIMS. Filed only through a registered agency." },
    ],
    parkTitle: "Protected-area entry fees",
    parkIntro:
      "Per person, per entry, Nepal Tourism Board table (figures from the concerned department). Children below 10 years: free.",
    parkFees: [
      { id: "chitwan", name: "Chitwan National Park", nepali: "NPR 150", saarc: "NPR 1,000", foreign: "NPR 2,000" },
      { id: "sagarmatha", name: "Sagarmatha National Park", nepali: "NPR 100", saarc: "NPR 1,500", foreign: "NPR 3,000" },
      { id: "banke", name: "Banke National Park", nepali: "NPR 100", saarc: "NPR 750", foreign: "NPR 1,500" },
      { id: "bardia", name: "Bardia National Park", nepali: "NPR 100", saarc: "NPR 750", foreign: "NPR 1,500" },
      { id: "khaptad", name: "Khaptad National Park", nepali: "NPR 100", saarc: "NPR 1,500", foreign: "NPR 3,000" },
      { id: "langtang", name: "Langtang National Park", nepali: "NPR 100", saarc: "NPR 1,500", foreign: "NPR 3,000" },
      { id: "makalu", name: "Makalu-Barun National Park", nepali: "NPR 100", saarc: "NPR 1,500", foreign: "NPR 3,000" },
      { id: "parsa", name: "Parsa National Park", nepali: "NPR 100", saarc: "NPR 750", foreign: "NPR 1,500" },
      { id: "rara", name: "Rara National Park", nepali: "NPR 100", saarc: "NPR 1,500", foreign: "NPR 3,000" },
      { id: "shey", name: "Shey-Phoksundo National Park", nepali: "NPR 100", saarc: "NPR 1,500", foreign: "NPR 3,000" },
      { id: "shivapuri", name: "Shivapuri-Nagarjun National Park", nepali: "NPR 100", saarc: "NPR 600", foreign: "NPR 1,000" },
      { id: "shukla", name: "Shuklaphanta National Park", nepali: "NPR 100", saarc: "NPR 750", foreign: "NPR 1,500" },
      { id: "koshi", name: "Koshi Tappu Wildlife Reserve", nepali: "NPR 100", saarc: "NPR 750", foreign: "NPR 1,500" },
      { id: "api", name: "Api Nampa Conservation Area", nepali: "NPR 100", saarc: "NPR 500", foreign: "NPR 2,000" },
      { id: "acap", name: "Annapurna Conservation Area", nepali: "NPR 100", saarc: "NPR 1,000", foreign: "NPR 3,000" },
      { id: "blackbuck", name: "Blackbuck Conservation Area", nepali: "NPR 100", saarc: "NPR 500", foreign: "NPR 2,000" },
      { id: "gauri", name: "Gaurishankar Conservation Area", nepali: "NPR 100", saarc: "NPR 1,000", foreign: "NPR 3,000" },
      { id: "kanch", name: "Kanchenjunga Conservation Area", nepali: "NPR 100", saarc: "NPR 500", foreign: "NPR 2,000" },
      { id: "manaslu", name: "Manaslu Conservation Area", nepali: "NPR 100", saarc: "NPR 1,000", foreign: "NPR 3,000" },
      { id: "dhorpatan", name: "Dhorpatan Hunting Reserve", nepali: "NPR 100", saarc: "NPR 1,500", foreign: "NPR 3,000" },
    ],
    restrictedTitle: "Restricted-area trekking permits",
    restrictedIntro:
      "Department of Immigration fees via a registered agency, as published by the Nepal Tourism Board. Per person. A week is seven days. Upper Mustang and Upper Dolpo are USD 50 per person per day — not a 10-day lump sum.",
    restricted: [
      { id: "mustang", name: "Upper Mustang", body: "Lomanthang RM wards 1–5; Lo-Ghekar Damodarkunda RM wards 1–5; Baragung Muktichetra RM ward 3 and Satang village of ward 5.", fee: "USD 50 per person per day" },
      { id: "udolpo", name: "Upper Dolpo", body: "Dolpo Buddha RM wards 4–6; Shey Phoksundo RM wards 1–7; Charka Tangsong RM wards 1–6.", fee: "USD 50 per person per day" },
      { id: "manaslu", name: "Gorkha — Manaslu area", body: "Chumnubri Rural Municipality wards 1, 2, 3 and 4.", fee: "Sep–Nov: USD 100 per person per week, then USD 15 per person per day. Dec–Aug: USD 75 per person per week, then USD 10 per person per day" },
      { id: "humla", name: "Humla", body: "Simikot RM wards 1, 6 and 7; Namkha RM wards 1–6; Changkheli RM wards 3–5.", fee: "USD 50 per person per week, then USD 10 per person per day" },
      { id: "kanch", name: "Taplejung — Kanchenjunga area", body: "Phaktanglung RM wards 6 and 7; Mikwakhola RM ward 5; Sirijunga RM ward 8.", fee: "USD 20 per person per week for the first 4 weeks, then USD 25 per person per week" },
      { id: "ldolpo", name: "Lower Dolpo", body: "Thulibheri and Tripurasundari municipalities; listed wards of Dolpo Buddha, Shey Phoksundo, Jagdulla, Mudkechula and Kaike rural municipalities.", fee: "USD 20 per person per week, then USD 5 per person per week" },
      { id: "dolakha", name: "Dolakha (listed wards)", body: "Gaurishankar RM ward 9; Bigu RM ward 1.", fee: "USD 20 per person per week" },
      { id: "tsum", name: "Gorkha — Tsum Valley", body: "Sirdibas–Lokpa–Chumling–Chekampar–Nile–Chule; Chumnubri RM wards 3, 6 and 7.", fee: "Sep–Nov: USD 40 per person per week, then USD 7 per person per day. Dec–Aug: USD 30 per person per week, then USD 7 per person per day" },
      { id: "sankhu", name: "Sankhuwasabha (listed wards)", body: "Bhotkhola RM wards 1–5; Makalu RM ward 4.", fee: "USD 20 per person per week for the first 4 weeks, then USD 25 per person per week" },
      { id: "khumbu-rap", name: "Solukhumbu — Khumbu Pasang Lhamu RM ward 5", body: "Immigration RAP for the listed ward only — separate from the Khumbu Trek Card at Lukla.", fee: "USD 20 per person per week for the first 4 weeks, then USD 25 per person per week" },
      { id: "rasuwa", name: "Rasuwa — Gosaikunda RM", body: "Gosaikunda Rural Municipality ward 1 and part of ward 2.", fee: "USD 20 per person per week" },
      { id: "narphu", name: "Manang — Nar / Phu", body: "Narpa RM wards 1–5; Nasho RM wards 6 and 7.", fee: "Sep–Nov: USD 100 per person per week, then USD 15 per person per day. Dec–Aug: USD 75 per person per week, then USD 15 per person per day" },
      { id: "bajhang", name: "Bajhang — Saipal", body: "Saipal Rural Municipality wards 1–5.", fee: "USD 90 per person for the first week, then USD 15 per person per day" },
      { id: "mugu", name: "Mugu — Mugum Karmarong", body: "Mugum Karmarong Rural Municipality wards 1–9.", fee: "USD 100 per person per week, then USD 15 per person per day" },
      { id: "darchula", name: "Darchula — Byas RM ward 1", body: "Byas Rural Municipality ward 1.", fee: "USD 90 per person per week, then USD 15 per person per day" },
    ],
    peakTitle: "NMA trekking peaks (foreign climbers)",
    peakIntro:
      "Per person, Nepal Mountaineering Association. Spring is March–May; autumn September–November; winter December–February; summer June–August. Garbage deposit and liaison rules are extra. We confirm the live NMA row before payment.",
    peaks: [
      { id: "island", name: "Imja Tse (Island Peak)", height: "6,165 m", range: "Khumbu", spring: "USD 350", autumn: "USD 175", winter: "USD 175", summer: "USD 175" },
      { id: "mera", name: "Mera Peak", height: "6,470 m", range: "Khumbu", spring: "USD 350", autumn: "USD 175", winter: "USD 175", summer: "USD 175" },
      { id: "lobuche", name: "Lobuje East", height: "6,119 m", range: "Khumbu", spring: "USD 350", autumn: "USD 175", winter: "USD 175", summer: "USD 175" },
      { id: "pisang", name: "Pisang Peak", height: "6,091 m", range: "Damodar / Manang", spring: "USD 350", autumn: "USD 175", winter: "USD 175", summer: "USD 175" },
      { id: "chulu-w", name: "Chulu West", height: "6,419 m", range: "Damodar", spring: "USD 350", autumn: "USD 175", winter: "USD 175", summer: "USD 175" },
      { id: "chulu-e", name: "Chulu East", height: "6,584 m", range: "Damodar", spring: "USD 500", autumn: "USD 250", winter: "USD 200", summer: "USD 200" },
      { id: "singu", name: "Singu Chuli (Fluted Peak)", height: "6,501 m", range: "Annapurna", spring: "USD 500", autumn: "USD 250", winter: "USD 200", summer: "USD 200" },
      { id: "hiunchuli", name: "Hiun Chuli", height: "6,434 m", range: "Annapurna", spring: "USD 350", autumn: "USD 175", winter: "USD 175", summer: "USD 175" },
    ],
    fileTitle: "How Ambition Holidays files it",
    fileBody:
      "Send a clear passport scan and your dates. We complete TIMS on the agency portal, conservation tickets at the Nepal Tourism Board or NTNC, park tickets at Bhrikutimandap or the gate, restricted-area permits at the Department of Immigration, and NMA royalties for peaks. You do not stand in the Thamel queue.\n\nOfficial sources we follow: ntb.gov.np (park entry and trekking permits), immigration.gov.np, nepalmountaineering.org. Tourist visa on arrival is separate — see Visa & Entry.",
    closeTitle: "Tell us the route. We will itemise the stamps.",
    closeBody:
      "Write to Ambition Holidays in Thamel with the ranges you wish to walk or climb. A specialist will reply with the exact permit stack and the current payable amount — not a brochure guess.",
    ctaLabel: "Ask a specialist",
    ctaHref: "/contact",
    metaTitle: "Trekking Permits & Fees in Nepal | Ambition Holidays",
    metaDescription:
      "Official Nepal TIMS, national-park, restricted-area and NMA peak permit fees for luxury treks — filed by Ambition Holidays in Kathmandu.",
  },
  nepal: DEFAULT_NEPAL,
  bhutan: DEFAULT_BHUTAN,
  tibet: DEFAULT_TIBET,
  multi: DEFAULT_MULTI,
  helicopter: DEFAULT_HELICOPTER,
  photography: DEFAULT_PHOTOGRAPHY,
  tripPackages: DEFAULT_TRIP_PACKAGES,
  footer: {
    visible: true,
    membersTitle: "PROUDLY MEMBER OF",
    members: [
      {
        id: "m1",
        label: "Nepal Emblem",
        imageSrc: "/images/footer/members/01-nepal-emblem.webp",
        href: "#",
      },
      {
        id: "m2",
        label: "NMA",
        imageSrc: "/images/footer/members/02-nma.webp",
        href: "#",
      },
      {
        id: "m3",
        label: "NTB",
        imageSrc: "/images/footer/members/03-ntb.webp",
        href: "#",
      },
      {
        id: "m4",
        label: "TAAN",
        imageSrc: "/images/footer/members/04-taan.webp",
        href: "#",
      },
      {
        id: "m5",
        label: "KEEP",
        imageSrc: "/images/footer/members/05-keep.webp",
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
        imageSrc: "/images/footer/payments/visa.webp",
        href: "#",
      },
      {
        id: "mc",
        label: "Mastercard",
        imageSrc: "/images/footer/payments/mastercard.webp",
        href: "#",
      },
      {
        id: "amex",
        label: "American Express",
        imageSrc: "/images/footer/payments/amex.webp",
        href: "#",
      },
    ],
    payNowLabel: "Pay Now",
    payNowHref: "/contact",
    showLandscape: true,
    landscapeImageSrc: "/images/footer/ambition-art-hq.webp",
    brandArtSrc: "/images/footer/tripadvisor-awards.webp",
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
      { id: "u1", label: "Company", href: "/company" },
      { id: "u2", label: "Travel Guide", href: "/travel-guide" },
      { id: "u3", label: "Journal", href: "/journal" },
      { id: "u4", label: "Contact", href: "/contact" },
      { id: "u5", label: "Visa & Entry", href: "/visa-and-entry" },
      { id: "u6", label: "Best Time to Visit", href: "/best-time-to-visit" },
      { id: "u7", label: "Packing Guide", href: "/packing-guide" },
      { id: "u8", label: "Altitude Tips", href: "/altitude-tips" },
      { id: "u9", label: "Permits & Fees", href: "/permits-and-fees" },
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
      { id: "t1", label: "Luxury Everest Base Camp", href: "/everest-base-camp-trek" },
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
      { id: "l1", label: "Privacy Policy", href: "/privacy-policy" },
      { id: "l2", label: "Terms & Conditions", href: "/terms-and-conditions" },
      { id: "l3", label: "Sitemap", href: "/sitemap" },
    ],
    creditPrefix: "Developed By",
    creditName: "The Global Orbit",
    creditHref: "https://theglobalorbit.com/",
  },
};

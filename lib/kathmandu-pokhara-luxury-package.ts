import type { TrekPackage } from "./trip-packages";
import {
  KATHMANDU_POKHARA_EXCLUSIONS,
  KATHMANDU_POKHARA_GROUP_PRICES,
  KATHMANDU_POKHARA_INCLUDE_NOTE,
  KATHMANDU_POKHARA_INCLUSIONS,
  KATHMANDU_POKHARA_ITINERARY,
  KATHMANDU_POKHARA_ITINERARY_INTRO,
  KATHMANDU_POKHARA_LUXURY_EXPERIENCE,
  KATHMANDU_POKHARA_SLUG,
  KATHMANDU_POKHARA_TRANSPORT_NOTE,
} from "./kathmandu-pokhara-luxury-content";

const HERO = "/images/nepal/nepal-cult-pokhara.webp";

export const KATHMANDU_POKHARA_LUXURY_TRIP_PACKAGE: TrekPackage = {
  id: "ktp-lux",
  catalogId: "kathmandu-pokhara-lux",
  slug: KATHMANDU_POKHARA_SLUG,
  country: "nepal",
  status: "published",
  featured: true,
  badge: "PRIVATE LUXURY TOUR IN NEPAL",
  title: "Kathmandu Pokhara Luxury Tour",
  subtitle:
    "Discover Nepal's cultural heritage, charming hilltop villages, and spectacular Himalayan scenery on an unforgettable 7-day luxury journey.",
  duration: "7 Days / 6 Nights",
  days: 7,
  difficulty: "Easy",
  destination: "Nepal · Kathmandu · Bandipur · Pokhara",
  maxAltitude: "Sarangkot viewpoint · ~1,600 m (approx.)",
  maxAltitudeFt: "",
  countryLabel: "Nepal",
  activityLabel: "Private luxury tour · cultural & scenic",
  accommodationLabel:
    "Confirmed hotel categories in Kathmandu, Bandipur and Pokhara — subject to availability on booking",
  mealsLabel: "As per confirmed board basis on your signed confirmation",
  startEndLabel: "Kathmandu",
  groupSize: "Private or group departures — enquire for dates",
  bestSeason: "October–April (clearer views; monsoon affects roads and flights)",
  priceUsd: 1199,
  groupPrices: [...KATHMANDU_POKHARA_GROUP_PRICES],
  pricingDisclaimer: "",
  heroCtaPrimary: "",
  heroCtaSecondary: "",
  luxuryExperience: KATHMANDU_POKHARA_LUXURY_EXPERIENCE,
  overview:
    "The Kathmandu Pokhara Luxury Tour links the valley's living heritage with the preserved lanes of Bandipur and Pokhara's lakeside setting — by private road when included, and with a domestic flight from Pokhara to Kathmandu on Day 6 when listed on your quote.\n\nAfter arrival and a cultural sightseeing day in Kathmandu, you travel overland to Bandipur for village time, then continue to Pokhara for leisure and a full day of landmarks including Sarangkot, the World Peace Pagoda, Pumdikot and Devi's Fall as confirmed on your itinerary. Mountain panoramas depend on weather; flight sectors depend on airline schedules.\n\nLuxury here means private coordination and suitable hotel standards when included — not guaranteed five-star properties, included guides, entrance fees or flight tickets unless your signed confirmation says so.",
  highlights: [
    "Seven days across Kathmandu, Bandipur and Pokhara.",
    "Kathmandu heritage sightseeing on a confirmed route.",
    "Traditional atmosphere and architecture in Bandipur.",
    "Scenic private road transfers when included on your quote.",
    "Pokhara lakeside leisure and Phewa Lake views.",
    "Sarangkot panoramas when visibility allows.",
    "World Peace Pagoda above Phewa Lake.",
    "Shiva statue at Pumdikot when on the confirmed route.",
    "Devi's Fall and Pokhara landmarks.",
    "Domestic flight Pokhara–Kathmandu on Day 6 when included.",
  ],
  inclusions: KATHMANDU_POKHARA_INCLUSIONS,
  exclusions: KATHMANDU_POKHARA_EXCLUSIONS,
  gallery: [
    HERO,
    "/images/journal/blog-lakes.webp",
    "/images/nepal/nepal-cult-ktm.webp",
    "/images/nepal/nepal-cult-heritage.webp",
    "/images/journal/annapurna-clean.webp",
    "/images/nepal/nepal-cult-ktmpokchit.webp",
  ],
  tripGalleryTitle: "Kathmandu Pokhara Luxury Tour Gallery",
  galleryAlts: [
    "Phewa Lake and Pokhara valley with Annapurna peaks beyond",
    "Lakeside reflections on Phewa Lake at Pokhara",
    "Kathmandu Valley heritage architecture",
    "Traditional Newari square and temple detail",
    "Himalayan panorama from a Pokhara viewpoint area",
    "Scenic road journey through Nepal's hills toward Pokhara",
  ],
  heroSrc: HERO,
  heroAlt: "Phewa Lake at Pokhara with Annapurna peaks on the horizon",
  altitudeChartM: "",
  altitudeChartFt: "",
  altitudeGainSrc: "",
  routeMapSrc: "",
  weatherDailySrc: "",
  weatherMonthlySrc: "",
  routeMapFile: "kathmandu-pokhara-luxury-tour-route-map",
  altitudeMFile: "kathmandu-pokhara-luxury-tour-altitude-meters",
  altitudeFtFile: "kathmandu-pokhara-luxury-tour-altitude-feet",
  weatherDailyFile: "kathmandu-pokhara-luxury-tour-daily-temperature",
  weatherMonthlyFile: "kathmandu-pokhara-luxury-tour-monthly-temperature",
  itineraryIntro: KATHMANDU_POKHARA_ITINERARY_INTRO,
  itinerary: KATHMANDU_POKHARA_ITINERARY,
  faqs: [
    {
      q: "How many days does the Kathmandu Pokhara Luxury Tour take?",
      a: "Seven days / six nights from arrival through sightseeing, Bandipur, Pokhara, the return flight when included and departure.",
    },
    {
      q: "Which destinations are covered?",
      a: "Kathmandu, Bandipur and Pokhara, with the published Day 2 and Day 5 sightseeing stops when included on your confirmation.",
    },
    {
      q: "Is transportation provided between Kathmandu, Bandipur and Pokhara?",
      a: "Private road transfers apply when listed on your signed quote — confirm vehicle type and driving plans with your coordinator.",
    },
    {
      q: "Is the Pokhara-to-Kathmandu flight included in the price?",
      a: "Only when explicitly included on your invoice. This page describes Day 6 as a domestic flight sector subject to airline terms and availability.",
    },
    {
      q: "Which attractions are visited in Kathmandu?",
      a: "The typical plan may include Swayambhunath, Kathmandu Durbar Square, Boudhanath and Pashupatinath — final order and entrances follow your confirmed itinerary.",
    },
    {
      q: "What can we see in Bandipur?",
      a: "Traditional streets, Newari architecture and hilltop atmosphere — largely independent exploration unless a guide is included on your quote.",
    },
    {
      q: "Which Pokhara sights are included?",
      a: "Sarangkot, World Peace Pagoda, Pumdikot Shiva statue and Devi's Fall when on the operator's confirmed Day 5 route.",
    },
    {
      q: "Can this tour be customized for a private group?",
      a: "Yes — enquire with your dates, party size and any route changes you need.",
    },
    {
      q: "Are accommodation and meals included?",
      a: "Only as stated on your signed confirmation and board basis.",
    },
    {
      q: "What if weather affects mountain views or flights?",
      a: "Sarangkot visibility and domestic flights are weather-dependent. Delays may require road alternatives or extra nights — discuss contingency on your quote.",
    },
    {
      q: "Are entrance fees included?",
      a: "Only when explicitly listed on your signed documents.",
    },
    {
      q: "How do I request a booking or quotation?",
      a: "Use Book now, Check availability or the enquiry form with your travel dates and group size.",
    },
  ],
  whyItems: [
    {
      title: "Valley to lakeside",
      body: "Heritage in Kathmandu, village calm in Bandipur and Pokhara scenery in one coordinated week.",
    },
    {
      title: "Private road pace",
      body: "Overland links when included — no invented driving times on this page.",
    },
    {
      title: "Flight when quoted",
      body: "Day 6 air sector included only if your invoice says so.",
    },
    {
      title: "Honest Sarangkot copy",
      body: "Panoramas are possible, never guaranteed.",
    },
    {
      title: "Leisure built in",
      body: "Free time in Pokhara before the landmark sightseeing day.",
    },
    {
      title: "Draft pricing",
      body: "From USD 1,199 is a starting point for review — your signed quote is binding.",
    },
  ],
  weatherBody:
    "Autumn and spring generally suit valley sightseeing and Pokhara lake weather. Monsoon months bring rain on hill roads and higher domestic flight disruption risk. Winter can be clear at Sarangkot but cold at dawn.",
  altitudeBody: "",
  packingItems: [],
  packingIntro:
    "Pack modest layers for temples, comfortable shoes for cobbled squares and village lanes, a light jacket for Sarangkot mornings, and a day bag for sightseeing.",
  packingGroups: [
    {
      id: "ktp-clothing",
      title: "Clothing",
      items: [
        "Modest temple-appropriate layers",
        "Comfortable walking shoes",
        "Warm layer for Sarangkot dawn if scheduled",
        "Light rain jacket (seasonal)",
      ],
    },
    {
      id: "ktp-personal",
      title: "Personal",
      items: [
        "Passport and visa",
        "Travel insurance documents",
        "Sunscreen and sunglasses",
        "Reusable water bottle",
        "Power adapter",
      ],
    },
  ],
  suitableBody:
    "Suited to travellers who want an easy-paced cultural and scenic tour with private road travel and a domestic flight when included — without multi-day trekking.",
  trainingBody: "",
  khumbuBody: "",
  flightBody: KATHMANDU_POKHARA_TRANSPORT_NOTE,
  bufferBody:
    "Allow buffer on international tickets around Day 6 domestic flights and monsoon-season road delays between Kathmandu, Bandipur and Pokhara.",
  heliBody: "",
  beforeItems: [
    "Confirm whether the Day 6 Pokhara–Kathmandu flight is included on your quote.",
    "Verify Pokhara sightseeing order and entrance fees before travel.",
    "Tips for guide and driver teams are customary and your choice.",
  ],
  permitsLabel: "",
  regionLabel: "Kathmandu · Bandipur · Pokhara · Sarangkot",
  startLabel: "Kathmandu → Bandipur → Pokhara → Kathmandu",
  flightTitle: "Road transfers and domestic flight",
  notesTitle: "Driving times and Day 6 flight inclusion",
  luklaNoteTitle: "",
  aboutTitle: "Bandipur, Pokhara and Himalayan views",
  aboutLead:
    "Bandipur's pedestrian lanes and Pokhara's lakeside sit on a classic westward route from Kathmandu — Sarangkot adds a dawn or daytime viewpoint when your operator schedules it and weather allows.",
  aboutSections: [
    {
      id: "ktp-scenic",
      title: "Scenic and cultural highlights",
      body:
        "Kathmandu Valley sites on Day 2 introduce Nepal's layered faiths and architecture. Bandipur offers a slower hill-town rhythm before Pokhara's lakeside and the Day 5 circuit of pagodas, viewpoints and falls on the confirmed plan.\n\nWe describe Sarangkot and flight inclusion honestly — your coordinator publishes the final route, entrances and whether the domestic sector is part of your package price.",
    },
  ],
  whyTitle: "Why choose this seven-day tour?",
  khumbuTitle: "",
  mapBody: "",
  weatherNote: "",
  metaTitle: "Kathmandu Pokhara Luxury Tour – 7 Days | Ambition Holidays",
  metaDescription:
    "Discover Nepal on a 7-day Kathmandu Pokhara Luxury Tour featuring cultural heritage, Bandipur village, scenic lakeside experiences, Sarangkot, and Pokhara sightseeing.",
  metaKeywords:
    "Kathmandu Pokhara Luxury Tour, Kathmandu Pokhara Tour 7 Days, Nepal Luxury Cultural Tour, Bandipur Pokhara Tour, Sarangkot Pokhara Package, Kathmandu to Pokhara Luxury Tour, Phewa Lake Tour Nepal, Luxury Tour Package Nepal",
  focusKeyword: "Kathmandu Pokhara Luxury Tour",
  tripadvisorLabel: "Tripadvisor",
  tripadvisorScore: "",
  tripadvisorCount: "View reviews",
  tripadvisorHref:
    "https://www.tripadvisor.com/Search?q=Ambition%20Himalaya%20Treks%20and%20Expeditions",
  tripadvisorLogoSrc: "/images/reviews/tripadvisor-owl.png",
  googleLabel: "Google",
  googleScore: "",
  googleCount: "View on Maps",
  googleHref:
    "https://www.google.com/maps/search/?api=1&query=Ambition+Himalaya+Treks+and+Expeditions",
  googleLogoSrc: "",
  watchVideo: {
    id: "ktp-watch",
    title: "",
    subtitle: "",
    duration: "",
    imageSrc: "",
    imageAlt: "",
    videoSrc: "",
  },
  videoReviews: [],
  reviews: [],
  tripInfoTitle: "Kathmandu Pokhara Luxury Tour – Trip Information",
  tripInfo: [
    { id: "ti-name", title: "Tour name", body: "Kathmandu Pokhara Luxury Tour." },
    { id: "ti-duration", title: "Duration", body: "7 days / 6 nights." },
    { id: "ti-country", title: "Country", body: "Nepal." },
    { id: "ti-dest", title: "Destinations", body: "Kathmandu, Bandipur and Pokhara." },
    { id: "ti-style", title: "Tour style", body: "Cultural, scenic and leisure." },
    {
      id: "ti-transport",
      title: "Transportation",
      body: "Private road transfers when included; domestic flight Pokhara–Kathmandu on Day 6 when included on your quote.",
    },
    {
      id: "ti-acc",
      title: "Accommodation",
      body: "According to the confirmed package category — stated on your booking confirmation.",
    },
    {
      id: "ti-diff",
      title: "Difficulty",
      body: "Easy sightseeing tour; walking on cobbles, village lanes and viewpoint steps may vary.",
    },
    {
      id: "ti-season",
      title: "Best season",
      body: "October–April generally suits sightseeing and flights; monsoon brings rain and possible schedule changes.",
    },
    {
      id: "ti-group",
      title: "Group type",
      body: "Private parties or group departures according to availability.",
    },
  ],
  optionalAddons: [
    "Extra Kathmandu or Pokhara hotel nights.",
    "Single-room supplement where available.",
    "Optional paragliding or spa — quoted separately when verified.",
  ],
  includeNote: KATHMANDU_POKHARA_INCLUDE_NOTE,
  luklaNote: KATHMANDU_POKHARA_TRANSPORT_NOTE,
  reviewsWallpaperSrc: "/images/atmosphere/ebc-premium-section.webp",
  slugHistory: [],
  ogTitle: "Kathmandu Pokhara Luxury Tour – 7 Days | Ambition Holidays",
  ogDescription:
    "Seven-day luxury tour — Kathmandu heritage, Bandipur village, Pokhara lakeside, Sarangkot and return flight when included.",
  ogImageSrc: HERO,
};

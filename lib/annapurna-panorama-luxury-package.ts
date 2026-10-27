import type { TrekPackage } from "./trip-packages";
import {
  ANNAPURNA_PANORAMA_EXCLUSIONS,
  ANNAPURNA_PANORAMA_FLIGHT_NOTE,
  ANNAPURNA_PANORAMA_GROUP_PRICES,
  ANNAPURNA_PANORAMA_INCLUDE_NOTE,
  ANNAPURNA_PANORAMA_INCLUSIONS,
  ANNAPURNA_PANORAMA_ITINERARY,
  ANNAPURNA_PANORAMA_ITINERARY_INTRO,
  ANNAPURNA_PANORAMA_LUXURY_EXPERIENCE,
  ANNAPURNA_PANORAMA_SLUG,
} from "./annapurna-panorama-luxury-content";

const HERO = "/images/journal/annapurna-clean.webp";

export const ANNAPURNA_PANORAMA_LUXURY_TRIP_PACKAGE: TrekPackage = {
  id: "apn-pan",
  catalogId: "annapurna-panorama-lux",
  slug: ANNAPURNA_PANORAMA_SLUG,
  country: "nepal",
  status: "published",
  featured: true,
  badge: "LUXURY TREKKING IN THE ANNAPURNA REGION",
  title: "Annapurna Panorama Luxury Trek – 10 Days",
  subtitle:
    "Experience the spectacular landscapes of Nepal on a ten-day Annapurna journey combining Kathmandu sightseeing, a flight to Pokhara, traditional mountain villages, the sunrise viewpoint at Poon Hill and scenic trails through Ghorepani, Tadapani, Ghandruk, Tolkha and Dhampus.",
  duration: "10 Days / 9 Nights",
  days: 10,
  difficulty: "Moderate",
  destination: "Nepal · Annapurna region",
  maxAltitude: "Poon Hill — approx. 3,210 m",
  maxAltitudeFt: "10,531 ft",
  countryLabel: "Nepal",
  activityLabel: "Private Luxury Trek",
  accommodationLabel:
    "Confirmed Kathmandu and Pokhara hotels + best suitable mountain lodges on trek nights, subject to availability",
  mealsLabel: "As per confirmed board basis on your signed confirmation",
  startEndLabel: "Kathmandu",
  groupSize: "Private or group departures — enquire for dates",
  bestSeason: "March–May · September–November (weather dependent)",
  priceUsd: 1199,
  groupPrices: [...ANNAPURNA_PANORAMA_GROUP_PRICES],
  pricingDisclaimer: "",
  heroCtaPrimary: "Book This Trip",
  heroCtaSecondary: "Explore Itinerary",
  luxuryExperience: ANNAPURNA_PANORAMA_LUXURY_EXPERIENCE,
  overview:
    "The Annapurna Panorama Luxury Trek spreads the classic Ghorepani–Poon Hill experience across ten days with time for Kathmandu, efficient flights to Pokhara and a longer descent through Gurung villages to Tolkha and Dhampus.\n\nYou begin with cultural sightseeing in the Kathmandu Valley, then fly west to Pokhara and enter the foothills towards Ulleri and Ghorepani. A pre-dawn walk to Poon Hill offers panoramic scenery when weather allows; forest trails continue to Tadapani and Ghandruk before the route turns through Tolkha towards Dhampus and returns to Pokhara by road.\n\nLuxury on this journey means private coordination, experienced guiding and the best suitable lodges available — not five-star resorts on every ridge. Flights, road access, walking durations and room categories are confirmed on your signed booking, not assumed from this page.",
  highlights: [
    "Kathmandu cultural discovery on a guided sightseeing day.",
    "Morning Kathmandu–Pokhara flight when included on Day 3.",
    "Scenic road access towards the Ulleri trekking area.",
    "Trekking through Ghorepani and rhododendron forest.",
    "Sunrise experience at Poon Hill when visibility permits.",
    "Forested trails between Ghorepani and Tadapani.",
    "Traditional Gurung culture in Ghandruk village.",
    "Village-to-village walking to Tolkha.",
    "Ridge trails towards Dhampus before returning to Pokhara.",
    "Return domestic flight to Kathmandu on Day 9 when included.",
  ],
  inclusions: ANNAPURNA_PANORAMA_INCLUSIONS,
  exclusions: ANNAPURNA_PANORAMA_EXCLUSIONS,
  gallery: [
    HERO,
    "/images/journal/annapurna.webp",
    "/images/journal/blog-lakes.webp",
    "/images/nepal/nepal-cult-ktm.webp",
    "/images/nepal/nepal-cover.webp",
  ],
  tripGalleryTitle: "Annapurna Panorama Luxury Trek Gallery",
  galleryAlts: [
    "Wide Annapurna panorama from the Poon Hill viewpoint area",
    "Rhododendron forest on the trail near Ghorepani",
    "Phewa Lake and Pokhara valley at the start of the trek",
    "Kathmandu Valley heritage on a cultural sightseeing day",
    "Terraced hillsides in the Annapurna foothills",
  ],
  heroSrc: HERO,
  heroAlt: "Sunrise light on Annapurna peaks above the Ghorepani–Poon Hill trail",
  altitudeChartM: "",
  altitudeChartFt: "",
  altitudeGainSrc: "",
  routeMapSrc: "",
  weatherDailySrc: "",
  weatherMonthlySrc: "",
  routeMapFile: "annapurna-panorama-luxury-trek-route-map",
  altitudeMFile: "annapurna-panorama-luxury-trek-altitude-meters",
  altitudeFtFile: "annapurna-panorama-luxury-trek-altitude-feet",
  weatherDailyFile: "annapurna-panorama-luxury-trek-daily-temperature",
  weatherMonthlyFile: "annapurna-panorama-luxury-trek-monthly-temperature",
  itineraryIntro: ANNAPURNA_PANORAMA_ITINERARY_INTRO,
  itinerary: ANNAPURNA_PANORAMA_ITINERARY,
  faqs: [
    {
      q: "How long is the Annapurna Panorama Luxury Trek?",
      a: "Ten days from arrival in Kathmandu through sightseeing, the Pokhara flight when included, trekking days, the return flight on Day 9 when included, and departure on Day 10.",
    },
    {
      q: "Is Day 3 a flight or a drive from Kathmandu?",
      a: "Day 3 is a morning domestic flight from Kathmandu to Pokhara when included on your quote, followed by road travel towards the Ulleri area — not a full-day road transfer from Kathmandu.",
    },
    {
      q: "What is the highest point?",
      a: "Poon Hill at approximately 3,210 m — a sunrise viewpoint above Ghorepani. It is a walk, not a technical climb.",
    },
    {
      q: "Will I see clear views from Poon Hill?",
      a: "Panoramas are possible when weather allows. Cloud and season affect visibility — clear skies are never guaranteed.",
    },
    {
      q: "How difficult is the trek?",
      a: "Moderate, subject to operator assessment. Expect several trekking days with forest ascents, village steps and a pre-dawn walk to Poon Hill.",
    },
    {
      q: "What villages does this trek visit?",
      a: "The published route includes Ulleri, Ghorepani, Tadapani, Ghandruk, Tolkha and Dhampus, in the order shown on the day-by-day itinerary.",
    },
    {
      q: "What accommodation is provided?",
      a: "Confirmed-category hotels in Kathmandu and Pokhara when included, and the best suitable mountain lodges on trek nights — stated on your booking confirmation.",
    },
    {
      q: "Are meals included?",
      a: "Only as stated on your signed confirmation and board basis.",
    },
    {
      q: "What is the best season?",
      a: "Spring and autumn are most popular. Monsoon brings rain and flight disruption risk; winter mornings at Ghorepani can be cold.",
    },
    {
      q: "What needs operational confirmation?",
      a: "Day 3 road access to Ulleri, Day 8 trek endpoint and vehicle pickup from Dhampus, sightseeing sites on Day 2, and exact walking durations — your coordinator confirms before travel.",
    },
    {
      q: "How do I book?",
      a: "Use Book now, Check availability or the enquiry form with your dates and group size. Published USD rates are draft until verified on your invoice.",
    },
  ],
  whyItems: [
    {
      title: "Longer Annapurna panorama",
      body: "Ten days allow Tolkha and Dhampus beyond the classic Ghorepani loop — without rushing Kathmandu or Pokhara.",
    },
    {
      title: "Flights where it matters",
      body: "Day 3 flies to Pokhara when included; we do not describe that sector as a road transfer from Kathmandu.",
    },
    {
      title: "Village heritage",
      body: "Ghandruk, Tolkha and Dhampus showcase Gurung foothill culture at a measured pace.",
    },
    {
      title: "Honest sunrise copy",
      body: "Poon Hill is a highlight, not a guarantee — weather decides what you see.",
    },
    {
      title: "Private coordination",
      body: "One team handles permits, lodges, flights and road timing where included.",
    },
    {
      title: "Draft pricing",
      body: "From USD 1,199 is a starting point; your signed quote is binding.",
    },
  ],
  weatherBody:
    "Spring and autumn generally offer the most stable trekking weather in the Annapurna foothills. Poon Hill pre-dawn walks can be cold; Pokhara is milder. Monsoon months bring rain on forest trails and higher domestic flight cancellation risk.",
  altitudeBody:
    "You reach Poon Hill (~3,210 m) on foot from Ghorepani; other overnights are lower. Pace steadily, stay hydrated and tell your guide if altitude symptoms persist.",
  packingItems: [],
  packingIntro:
    "Pack for warm Pokhara afternoons, cold Ghorepani mornings and rain in forest sections. Broken-in boots and a headlamp for Poon Hill are essential.",
  packingGroups: [
    {
      id: "apn-core",
      title: "Core gear",
      items: [
        "Waterproof trekking boots",
        "Daypack with rain cover",
        "Trekking poles",
        "Headlamp for Poon Hill",
        "Reusable water bottles",
      ],
    },
    {
      id: "apn-clothing",
      title: "Clothing",
      items: [
        "Layered base and mid-layers",
        "Insulated jacket",
        "Waterproof shell and trousers",
        "Warm hat and gloves",
        "Sun hat and trekking socks",
      ],
    },
    {
      id: "apn-docs",
      title: "Documents & personal",
      items: [
        "Passport, visa and permits",
        "Travel insurance documents",
        "Personal medication",
        "Sunscreen and sunglasses",
        "Power bank",
      ],
    },
  ],
  suitableBody:
    "Suited to travellers who want a moderate Annapurna trek with Poon Hill, extended village trails and comfortable city nights when included on the quote.",
  trainingBody:
    "Train on hills or stairs with a daypack for several weeks before travel. The Poon Hill pre-dawn walk and stepped village paths reward steady fitness.",
  khumbuBody:
    "The route crosses the Annapurna Conservation Area from Pokhara through Ghorepani and Poon Hill, then descends via Ghandruk, Tolkha and Dhampus — a panorama-focused foothill itinerary without high passes.",
  flightBody: ANNAPURNA_PANORAMA_FLIGHT_NOTE,
  bufferBody:
    "Allow buffer on international tickets around Day 9 domestic flights and any same-day connections. Weather can delay Pokhara sectors.",
  heliBody: "",
  beforeItems: [
    "Travel insurance with trekking and evacuation cover is mandatory.",
    "Day 3 includes a flight to Pokhara when included — not a drive from Kathmandu that day.",
    "Confirm Dhampus pickup and Day 2 sightseeing with your coordinator before travel.",
    "Tips for guide, porter and drivers are customary and your choice.",
  ],
  permitsLabel: "Annapurna Conservation Area + trekking permits when included",
  regionLabel: "Annapurna — Ulleri, Ghorepani, Poon Hill, Tadapani, Ghandruk, Tolkha, Dhampus",
  startLabel:
    "Kathmandu → Pokhara → Ulleri → Ghorepani → Poon Hill → Tadapani → Ghandruk → Tolkha → Dhampus → Pokhara → Kathmandu",
  flightTitle: "Domestic flights and road transfers",
  notesTitle: "Flights, road access and buffer days",
  luklaNoteTitle: "",
  aboutTitle: "About the Annapurna Panorama Luxury Trek",
  whyTitle: "Why choose this ten-day Annapurna itinerary?",
  khumbuTitle: "The route you follow",
  mapBody:
    "Schematic route: Kathmandu (sightseeing) → flight to Pokhara → Ulleri → Ghorepani → Poon Hill → Tadapani → Ghandruk → Tolkha → Dhampus → Pokhara → flight to Kathmandu. Illustrative only — confirm trekking endpoints and transfers operationally.",
  weatherNote:
    "Indicative month-by-month temperatures for Ghorepani / Poon Hill elevations — not a daily forecast.",
  metaTitle: "Annapurna Panorama Luxury Trek – 10 Days | Ambition Holidays",
  metaDescription:
    "Explore Nepal on a 10-day Annapurna Panorama Luxury Trek featuring Poon Hill sunrise, Ghorepani, Tadapani, Ghandruk, Tolkha and Dhampus.",
  metaKeywords:
    "Annapurna Panorama Luxury Trek, Annapurna Panorama Trek 10 Days, Annapurna Luxury Trek Nepal, Poon Hill Luxury Trek, Ghorepani Tadapani Trek, Ghandruk Tolkha Dhampus Trek, Luxury Trekking in Annapurna, Private Annapurna Panorama Trek, Nepal Luxury Trekking Package",
  focusKeyword: "Annapurna Panorama Luxury Trek",
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
    id: "apn-watch",
    title: "",
    subtitle: "",
    duration: "",
    imageSrc: "",
    imageAlt: "",
    videoSrc: "",
  },
  videoReviews: [],
  reviews: [],
  tripInfoTitle: "Annapurna Panorama Luxury Trek – Trip Information",
  tripInfo: [
    { id: "ti-duration", title: "Duration", body: "10 days / 9 nights in Nepal." },
    { id: "ti-country", title: "Country", body: "Nepal." },
    { id: "ti-region", title: "Region", body: "Annapurna Conservation Area." },
    {
      id: "ti-dest",
      title: "Trekking destinations",
      body: "Ulleri, Ghorepani, Poon Hill, Tadapani, Ghandruk, Tolkha and Dhampus — with Kathmandu and Pokhara city nights.",
    },
    { id: "ti-alt", title: "Maximum altitude", body: "Approximately 3,210 m at Poon Hill (viewpoint)." },
    { id: "ti-diff", title: "Difficulty", body: "Moderate — pending operational review." },
    {
      id: "ti-acc",
      title: "Accommodation",
      body: "Confirmed hotel category in cities and best suitable mountain lodges on trek nights — stated on your booking confirmation.",
    },
    {
      id: "ti-transport",
      title: "Transportation",
      body: "Kathmandu–Pokhara and Pokhara–Kathmandu domestic flights when included; road transfers to and from the trek as specified. Day 3 is not a road transfer from Kathmandu.",
    },
    {
      id: "ti-season",
      title: "Best season",
      body: "Spring and autumn are most popular; expect cold dawn at Poon Hill and possible monsoon disruption in summer.",
    },
    {
      id: "ti-group",
      title: "Group type",
      body: "Private parties or group departures according to availability — enquire for dates.",
    },
    {
      id: "ti-insurance",
      title: "Travel insurance",
      body: "Mandatory comprehensive cover including trekking and emergency evacuation.",
    },
  ],
  optionalAddons: [
    "Extra Kathmandu or Pokhara hotel nights.",
    "Single-room supplement where available.",
    "Private charter or helicopter alternatives — quoted separately.",
  ],
  includeNote: ANNAPURNA_PANORAMA_INCLUDE_NOTE,
  luklaNote: ANNAPURNA_PANORAMA_FLIGHT_NOTE,
  reviewsWallpaperSrc: "/images/atmosphere/ebc-premium-section.webp",
  slugHistory: [],
  ogTitle: "Annapurna Panorama Luxury Trek – 10 Days | Ambition Holidays",
  ogDescription:
    "Ten-day luxury Annapurna trek — Kathmandu heritage, Pokhara flights, Poon Hill sunrise, Ghandruk, Tolkha, Dhampus and return flight when included.",
  ogImageSrc: HERO,
};

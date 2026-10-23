import type { TrekPackage } from "./trip-packages";
import {
  GHOREPANI_POONHILL_EXCLUSIONS,
  GHOREPANI_POONHILL_FLIGHT_NOTE,
  GHOREPANI_POONHILL_GROUP_PRICES,
  GHOREPANI_POONHILL_INCLUDE_NOTE,
  GHOREPANI_POONHILL_INCLUSIONS,
  GHOREPANI_POONHILL_ITINERARY,
  GHOREPANI_POONHILL_ITINERARY_INTRO,
  GHOREPANI_POONHILL_LUXURY_EXPERIENCE,
  GHOREPANI_POONHILL_SLUG,
} from "./ghorepani-poonhill-luxury-content";

const HERO = "/images/journal/annapurna.webp";

export const GHOREPANI_POONHILL_LUXURY_TRIP_PACKAGE: TrekPackage = {
  id: "gph-lux",
  catalogId: "ghorepani-poonhill-lux",
  slug: GHOREPANI_POONHILL_SLUG,
  country: "nepal",
  status: "published",
  featured: true,
  badge: "LUXURY TREKKING IN NEPAL",
  title: "Ghorepani Poon Hill Luxury Trek – 9 Days",
  subtitle:
    "Discover the beauty of Nepal's Annapurna region on a nine-day journey combining Kathmandu's cultural heritage, a scenic drive to Pokhara, traditional mountain villages and an unforgettable sunrise from Poon Hill.",
  duration: "9 Days / 8 Nights",
  days: 9,
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
  priceUsd: 999,
  groupPrices: [...GHOREPANI_POONHILL_GROUP_PRICES],
  pricingDisclaimer: "",
  luxuryExperience: GHOREPANI_POONHILL_LUXURY_EXPERIENCE,
  overview:
    "This nine-day itinerary opens in Kathmandu with guided visits to Swayambhunath, Boudhanath and Pashupatinath — a measured introduction to Nepal's spiritual heritage before you head west by private car to Pokhara.\n\nFrom Pokhara you enter the classic Ghorepani corridor: road to Hile, stone steps towards Ulleri, rhododendron forests to Ghorepani, and a pre-dawn walk to Poon Hill when weather allows. The route continues through Tadapani to Ghandruk, a Gurung village above terraced hills, before you return to Pokhara and fly to Kathmandu ahead of departure.\n\nLuxury here means private coordination, experienced guiding, thoughtful pacing and the best suitable lodges available — not five-star resorts in every mountain village. Road times, flight schedules and room categories are confirmed on your signed booking, not assumed from this page.",
  highlights: [
    "Kathmandu UNESCO-listed cultural landmarks on Day 2.",
    "Private overland journey from Kathmandu to Pokhara — not a flight on Day 3.",
    "Trekking through Ulleri and Ghorepani on the Annapurna foothill trail.",
    "Sunrise experience at Poon Hill when visibility permits.",
    "Forest trails between Ghorepani, Tadapani and Ghandruk.",
    "Traditional Gurung heritage in Ghandruk village.",
    "Return domestic flight from Pokhara to Kathmandu when included on your quote.",
    "Private guiding and trip coordination throughout.",
  ],
  inclusions: GHOREPANI_POONHILL_INCLUSIONS,
  exclusions: GHOREPANI_POONHILL_EXCLUSIONS,
  gallery: [
    HERO,
    "/images/journal/annapurna-clean.webp",
    "/images/nepal/nepal-cult-ktm.webp",
    "/images/journal/blog-lakes.webp",
    "/images/nepal/nepal-cover.webp",
  ],
  tripGalleryTitle: "Ghorepani Poon Hill Luxury Trek Gallery",
  galleryAlts: [
    "Annapurna peaks above rhododendron forest near Ghorepani",
    "Wide Himalayan panorama from the Poon Hill viewpoint area",
    "Kathmandu Valley heritage architecture on a cultural sightseeing day",
    "Phewa Lake and Pokhara valley before the trek",
    "Terraced hillsides in the Annapurna foothills",
  ],
  heroSrc: HERO,
  heroAlt: "Himalayan sunrise light over the Annapurna region from the Ghorepani–Poon Hill trail",
  altitudeChartM: "",
  altitudeChartFt: "",
  altitudeGainSrc: "",
  routeMapSrc: "",
  weatherDailySrc: "",
  weatherMonthlySrc: "",
  routeMapFile: "ghorepani-poonhill-luxury-trek-route-map",
  altitudeMFile: "ghorepani-poonhill-luxury-trek-altitude-meters",
  altitudeFtFile: "ghorepani-poonhill-luxury-trek-altitude-feet",
  weatherDailyFile: "ghorepani-poonhill-luxury-trek-daily-temperature",
  weatherMonthlyFile: "ghorepani-poonhill-luxury-trek-monthly-temperature",
  itineraryIntro: GHOREPANI_POONHILL_ITINERARY_INTRO,
  itinerary: GHOREPANI_POONHILL_ITINERARY,
  faqs: [
    {
      q: "How long is the Ghorepani Poon Hill Luxury Trek?",
      a: "Nine days from arrival in Kathmandu through cultural sightseeing, the road journey to Pokhara, trekking days, the Pokhara–Kathmandu flight when included, and departure on Day 9.",
    },
    {
      q: "Is Day 3 a flight to Pokhara?",
      a: "No. Day 3 is a private road transfer from Kathmandu to Pokhara. The domestic flight is on Day 8 from Pokhara to Kathmandu when included on your confirmed itinerary.",
    },
    {
      q: "What is the highest point?",
      a: "Poon Hill at approximately 3,210 m — a sunrise viewpoint above Ghorepani, not a technical climb. Your highest overnight is typically around Ghorepani or Tadapani depending on the published night order.",
    },
    {
      q: "Will I see clear mountain views from Poon Hill?",
      a: "Panoramas are possible when weather and visibility allow. Cloud, mist and season affect what you see — clear skies are never guaranteed.",
    },
    {
      q: "How difficult is the trek?",
      a: "Moderate. Expect stepped trails, forest ascents and several hours on foot on trekking days. Ulleri's stone steps and the pre-dawn Poon Hill walk require reasonable fitness.",
    },
    {
      q: "What accommodation is provided?",
      a: "Confirmed-category hotels in Kathmandu and Pokhara when included, and the best suitable mountain lodges on trek nights — subject to availability. Room standard is stated on your booking confirmation.",
    },
    {
      q: "Are meals included?",
      a: "Only as stated on your signed confirmation and board basis. This page does not assume full board on every day.",
    },
    {
      q: "What permits are required?",
      a: "Trekking in the Annapurna Conservation Area requires applicable permits. When included in your package, Ambition Holidays arranges them for your confirmed dates.",
    },
    {
      q: "What is the best season?",
      a: "Spring (March–May) and autumn (September–November) are popular. Winter can be cold at Ghorepani; monsoon brings rain, cloud and road or flight disruption risk.",
    },
    {
      q: "Can the itinerary be customised?",
      a: "Extra nights in Kathmandu or Pokhara, private charter alternatives, or adjusted pacing can be quoted separately. Contact us with dates and party size.",
    },
    {
      q: "What still needs operational confirmation?",
      a: "Day 4 road access to Hile/trailhead, Day 7 trek endpoint and vehicle pickup, exact walking durations, and included meals/transfers — your coordinator confirms these before travel.",
    },
    {
      q: "How do I book?",
      a: "Use Book now, Check availability or the enquiry form on this page with your preferred dates and group size. Published USD rates are draft until verified on your invoice.",
    },
  ],
  whyItems: [
    {
      title: "Culture before the trail",
      body: "Kathmandu sightseeing is built into the journey — not an optional add-on squeezed into arrival day.",
    },
    {
      title: "Honest logistics",
      body: "Private car to Pokhara on Day 3; flight back on Day 8 when included — we do not describe the drive as a flight.",
    },
    {
      title: "Classic Annapurna villages",
      body: "Ghorepani, Tadapani and Ghandruk in order — a full foothill experience beyond a short Poon Hill dash.",
    },
    {
      title: "Sunrise without hype",
      body: "Poon Hill is a highlight, not a guarantee — we explain weather realities before you book.",
    },
    {
      title: "Private coordination",
      body: "One team handles permits, lodges, road timing and flight buffers where included.",
    },
    {
      title: "Draft pricing, clear confirmation",
      body: "Published group rates are starting points; your signed quote is the binding price.",
    },
  ],
  weatherBody:
    "Spring and autumn generally offer the most stable trekking weather in the Annapurna foothills. Ghorepani and Poon Hill can be cold before dawn; Pokhara is milder. Monsoon months bring rain on forest trails and higher flight-cancellation risk on the Pokhara–Kathmandu sector.",
  altitudeBody:
    "You reach Poon Hill (~3,210 m) on foot from Ghorepani; overnight elevations are lower. Pace steadily, drink fluids and tell your guide if headache or nausea persist — descent is the correct response to serious altitude symptoms.",
  packingItems: [],
  packingIntro:
    "Pack for warm Pokhara afternoons, cold Ghorepani mornings and rain showers in forest sections. Broken-in boots and a headlamp for Poon Hill are essential.",
  packingGroups: [
    {
      id: "gph-core",
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
      id: "gph-clothing",
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
      id: "gph-docs",
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
    "Suited to travellers who want Annapurna culture, a moderate trek and Poon Hill within a nine-day frame — including Kathmandu sightseeing and a Pokhara flight when included.",
  trainingBody:
    "Walk hills or stairs with a daypack for several weeks before travel. The Ulleri steps and Poon Hill pre-dawn walk reward steady fitness more than speed.",
  khumbuBody:
    "The published route links Kathmandu heritage, Pokhara's lake valley and the Ghorepani–Ghandruk loop inside the Annapurna Conservation Area — a classic mid-hill itinerary without high passes.",
  flightBody: GHOREPANI_POONHILL_FLIGHT_NOTE,
  bufferBody:
    "Allow buffer time on international tickets around the Day 8 domestic flight and any same-day connections. Road delays on Day 3 can also affect arrival time in Pokhara.",
  heliBody: "",
  beforeItems: [
    "Travel insurance with trekking and evacuation cover is mandatory.",
    "Day 3 is by road; do not pack expecting a flight to Pokhara that day.",
    "Operational details for Hile access and Ghandruk pickup are confirmed before departure.",
    "Tips for guide, porter and drivers are customary and your choice.",
  ],
  permitsLabel: "Annapurna Conservation Area + trekking permits when included",
  regionLabel: "Annapurna — Ghorepani, Poon Hill, Tadapani, Ghandruk",
  startLabel: "Kathmandu → Pokhara → Ulleri → Ghorepani → Poon Hill → Tadapani → Ghandruk → Pokhara → Kathmandu",
  flightTitle: "Road and air transfers",
  notesTitle: "Road times, flights and buffer days",
  luklaNoteTitle: "",
  aboutTitle: "About the Ghorepani Poon Hill Luxury Trek",
  whyTitle: "Why choose this nine-day Annapurna itinerary?",
  khumbuTitle: "The route you follow",
  mapBody:
    "Schematic route: Kathmandu (sightseeing) → private road to Pokhara → Hile → Ulleri → Ghorepani → Poon Hill viewpoint → Tadapani → Ghandruk → Pokhara → flight to Kathmandu. Illustrative only — confirm driving and trekking segments operationally.",
  weatherNote:
    "Indicative month-by-month temperatures for Ghorepani / Poon Hill elevations — not a daily forecast.",
  metaTitle: "Ghorepani Poon Hill Luxury Trek – 9 Days | Ambition Holidays",
  metaDescription:
    "Explore Nepal on a 9-day Ghorepani Poon Hill Luxury Trek featuring Kathmandu sightseeing, a private drive to Pokhara, Himalayan sunrise views and traditional Annapurna-region villages.",
  metaKeywords:
    "Ghorepani Poon Hill Luxury Trek, Ghorepani Poon Hill Trek 9 Days, Poon Hill Luxury Trek Nepal, Luxury Annapurna Trek, Ghorepani Trek Package, Poon Hill Sunrise Trek, Private Poon Hill Trek, Tadapani and Ghandruk Trek, Luxury Trekking in Nepal",
  focusKeyword: "Ghorepani Poon Hill Luxury Trek",
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
    id: "gph-watch",
    title: "",
    subtitle: "",
    duration: "",
    imageSrc: "",
    imageAlt: "",
    videoSrc: "",
  },
  videoReviews: [],
  reviews: [],
  tripInfoTitle: "Ghorepani Poon Hill Luxury Trek – Trip Information",
  tripInfo: [
    { id: "ti-duration", title: "Duration", body: "9 days / 8 nights in Nepal." },
    { id: "ti-country", title: "Country", body: "Nepal." },
    { id: "ti-region", title: "Region", body: "Annapurna Conservation Area." },
    {
      id: "ti-dest",
      title: "Destination",
      body: "Ghorepani, Poon Hill, Tadapani and Ghandruk — with Kathmandu and Pokhara city nights.",
    },
    { id: "ti-alt", title: "Maximum altitude", body: "Approximately 3,210 m at Poon Hill (viewpoint)." },
    { id: "ti-diff", title: "Difficulty", body: "Moderate — stepped trails and several trekking days." },
    {
      id: "ti-acc",
      title: "Accommodation",
      body: "Confirmed hotel category in cities and best suitable mountain lodges on trek nights — stated on your booking confirmation.",
    },
    {
      id: "ti-transport",
      title: "Transportation",
      body: "Private road transfers as specified; Pokhara–Kathmandu domestic flight on Day 8 when included. Day 3 is by road, not air.",
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
    "Helicopter charter or private flight alternatives — quoted separately.",
  ],
  includeNote: GHOREPANI_POONHILL_INCLUDE_NOTE,
  luklaNote: GHOREPANI_POONHILL_FLIGHT_NOTE,
  reviewsWallpaperSrc: "/images/atmosphere/ebc-premium-section.webp",
  slugHistory: [],
  ogTitle: "Ghorepani Poon Hill Luxury Trek – 9 Days | Ambition Holidays",
  ogDescription:
    "Nine-day luxury Annapurna trek — Kathmandu heritage, private drive to Pokhara, Poon Hill sunrise, Tadapani, Ghandruk and return flight when included.",
  ogImageSrc: HERO,
};

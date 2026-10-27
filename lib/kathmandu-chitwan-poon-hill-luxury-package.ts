import type { TrekPackage } from "./trip-packages";
import {
  KATHMANDU_CHITWAN_POON_HILL_EXCLUSIONS,
  KATHMANDU_CHITWAN_POON_HILL_FLIGHT_NOTE,
  KATHMANDU_CHITWAN_POON_HILL_GROUP_PRICES,
  KATHMANDU_CHITWAN_POON_HILL_INCLUDE_NOTE,
  KATHMANDU_CHITWAN_POON_HILL_INCLUSIONS,
  KATHMANDU_CHITWAN_POON_HILL_ITINERARY,
  KATHMANDU_CHITWAN_POON_HILL_ITINERARY_INTRO,
  KATHMANDU_CHITWAN_POON_HILL_LUXURY_EXPERIENCE,
  KATHMANDU_CHITWAN_POON_HILL_SLUG,
} from "./kathmandu-chitwan-poon-hill-luxury-content";

const HERO = "/images/nepal/nepal-wild-chitpok.webp";

export const KATHMANDU_CHITWAN_POON_HILL_LUXURY_TRIP_PACKAGE: TrekPackage = {
  id: "kcp-lux",
  catalogId: "kathmandu-chitwan-poonhill-lux",
  slug: KATHMANDU_CHITWAN_POON_HILL_SLUG,
  country: "nepal",
  status: "published",
  featured: true,
  badge: "NEPAL LUXURY ADVENTURE",
  title: "Kathmandu – Chitwan – Poon Hill Luxury Tour",
  subtitle:
    "Discover three sides of Nepal on a ten-day journey combining Kathmandu's cultural heritage, Chitwan's wildlife experiences and a scenic Himalayan trek to Ghorepani and Poon Hill.",
  duration: "10 Days / 9 Nights",
  days: 10,
  difficulty: "Moderate — confirm with operator",
  destination: "Nepal · Kathmandu · Chitwan · Pokhara · Annapurna foothills",
  maxAltitude: "Poon Hill — approx. 3,210 m",
  maxAltitudeFt: "10,531 ft",
  countryLabel: "Nepal",
  activityLabel: "Private Luxury Tour",
  accommodationLabel:
    "Confirmed Kathmandu, Chitwan and Pokhara hotels + best suitable mountain lodges on trek nights, subject to availability",
  mealsLabel: "As per confirmed board basis on your signed confirmation",
  startEndLabel: "Kathmandu",
  groupSize: "Private or group departures — enquire for dates",
  bestSeason: "March–May · September–November (weather dependent; Terai and flights vary by season)",
  priceUsd: 1799,
  groupPrices: [...KATHMANDU_CHITWAN_POON_HILL_GROUP_PRICES],
  pricingDisclaimer: "",
  heroCtaPrimary: "",
  heroCtaSecondary: "",
  luxuryExperience: KATHMANDU_CHITWAN_POON_HILL_LUXURY_EXPERIENCE,
  overview:
    "This ten-day luxury tour threads together three distinct Nepali landscapes: the Kathmandu Valley's temples and courtyards, the lowland rivers and grasslands of the Chitwan area, and the rhododendron ridges of the Annapurna foothills above Pokhara.\n\nAfter arrival and a cultural sightseeing day in Kathmandu, you fly to the Chitwan region for lodge nights and wildlife activities on the operator's confirmed programme — without promising specific animals or activities unless they are listed on your quote. A further domestic flight brings you to Pokhara before a road transfer towards Hile and the trek through Ulleri and Ghorepani to Poon Hill.\n\nLuxury here means private coordination, experienced guiding on trek nights, suitable lodge standards and efficient air links where included — not guaranteed wildlife sightings, mountain visibility or a fixed schedule on the demanding Day 8 sequence from Poon Hill back to Pokhara. Flights, jungle activities, walking durations and room categories are confirmed on your signed booking.",
  highlights: [
    "Ten days across culture, wildlife and Himalayan foothills.",
    "Kathmandu cultural sightseeing on an approved programme.",
    "Domestic flight to the Chitwan area when included.",
    "Wildlife and nature experiences on your confirmed Chitwan package.",
    "Domestic flight to Pokhara when included.",
    "Private road transfer towards Hile and trekking through Ulleri.",
    "Mountain scenery around Ghorepani in the Annapurna region.",
    "Sunrise experience at Poon Hill when visibility permits.",
    "Return to Pokhara after the trek.",
    "Flight back to Kathmandu when included on Day 9.",
  ],
  inclusions: KATHMANDU_CHITWAN_POON_HILL_INCLUSIONS,
  exclusions: KATHMANDU_CHITWAN_POON_HILL_EXCLUSIONS,
  gallery: [
    HERO,
    "/images/nepal/nepal-wild-chitwan.webp",
    "/images/nepal/nepal-cult-ktm.webp",
    "/images/journal/annapurna-clean.webp",
    "/images/journal/blog-lakes.webp",
  ],
  tripGalleryTitle: "Kathmandu – Chitwan – Poon Hill Luxury Tour Gallery",
  galleryAlts: [
    "Jungle river and Pokhara lake with Annapurna peaks beyond",
    "One-horned rhinoceros in Chitwan grassland",
    "Kathmandu Valley heritage on a cultural sightseeing day",
    "Annapurna panorama from the Poon Hill trail area",
    "Phewa Lake and Pokhara valley at dusk",
  ],
  heroSrc: HERO,
  heroAlt: "Chitwan jungle river and Pokhara lakeside with Himalayan peaks on the horizon",
  altitudeChartM: "",
  altitudeChartFt: "",
  altitudeGainSrc: "",
  routeMapSrc: "",
  weatherDailySrc: "",
  weatherMonthlySrc: "",
  routeMapFile: "kathmandu-chitwan-poon-hill-luxury-tour-route-map",
  altitudeMFile: "kathmandu-chitwan-poon-hill-luxury-tour-altitude-meters",
  altitudeFtFile: "kathmandu-chitwan-poon-hill-luxury-tour-altitude-feet",
  weatherDailyFile: "kathmandu-chitwan-poon-hill-luxury-tour-daily-temperature",
  weatherMonthlyFile: "kathmandu-chitwan-poon-hill-luxury-tour-monthly-temperature",
  itineraryIntro: KATHMANDU_CHITWAN_POON_HILL_ITINERARY_INTRO,
  itinerary: KATHMANDU_CHITWAN_POON_HILL_ITINERARY,
  faqs: [
    {
      q: "How long is the Kathmandu – Chitwan – Poon Hill Luxury Tour?",
      a: "Ten days from arrival in Kathmandu through sightseeing, Chitwan, Pokhara, trekking days, return flights when included and departure on Day 10.",
    },
    {
      q: "Does this tour include trekking?",
      a: "Yes — from Day 6 you trek through Ulleri and Ghorepani towards Poon Hill, with a return descent and road transfer to Pokhara on Day 8 as published.",
    },
    {
      q: "What wildlife will I see in Chitwan?",
      a: "Wildlife viewing depends on season, habitat and luck. Activities follow your confirmed Chitwan programme — we do not guarantee rhino, tiger or other sightings.",
    },
    {
      q: "How many domestic flights are included?",
      a: "When included on your quote, expect Kathmandu–Chitwan (Day 3), Chitwan–Pokhara (Day 5) and Pokhara–Kathmandu (Day 9). All are weather-dependent.",
    },
    {
      q: "What is the highest point?",
      a: "Poon Hill at approximately 3,210 m — a sunrise viewpoint above Ghorepani.",
    },
    {
      q: "Is Day 8 feasible in one day?",
      a: "Poon Hill, trek back towards Ulleri and a road transfer to Pokhara can make a long day. Local operations must validate timing before this sequence is marketed with fixed schedules.",
    },
    {
      q: "What is the starting price?",
      a: "From USD 1,799 per person for larger groups is a draft selling price. Your signed invoice reflects verified costs and group size.",
    },
    {
      q: "What is the best season?",
      a: "Spring and autumn suit trekking and flights. The Terai can be hot before the monsoon; monsoon months bring rain and higher flight disruption risk.",
    },
    {
      q: "How do I book?",
      a: "Use Book now, Check availability or the enquiry form with your dates and group size.",
    },
  ],
  whyItems: [
    {
      title: "Three regions in one journey",
      body: "Valley culture, Terai wildlife and Annapurna foothills without designing the logistics yourself.",
    },
    {
      title: "Flights where included",
      body: "Domestic air sectors between Kathmandu, Chitwan and Pokhara when on your quote — confirm airports operationally.",
    },
    {
      title: "Measured trekking",
      body: "A focused Ghorepani–Poon Hill corridor after Pokhara — not a full circuit.",
    },
    {
      title: "Honest wildlife copy",
      body: "Chitwan activities and sightings follow your booked programme, not marketing promises.",
    },
    {
      title: "Private coordination",
      body: "One team handles city hotels, jungle nights, permits and trek logistics.",
    },
    {
      title: "Draft pricing",
      body: "Published USD tiers are for review until supplier costs are verified.",
    },
  ],
  weatherBody:
    "Spring and autumn generally offer the most stable trekking weather on the Poon Hill trail. Pokhara is milder; Chitwan lowlands run warmer. Monsoon brings rain on forest trails and higher domestic flight cancellation risk. Winter dawn at Poon Hill can be cold.",
  altitudeBody:
    "You reach Poon Hill (~3,210 m) on foot from Ghorepani; Chitwan nights are near sea level. Pace steadily on ascent days, stay hydrated and tell your guide if altitude symptoms persist.",
  packingItems: [],
  packingIntro:
    "Pack for warm Terai afternoons, Pokhara lakeside evenings, cold Ghorepani mornings and rain in forest sections. Broken-in boots and a headlamp for Poon Hill are essential.",
  packingGroups: [
    {
      id: "kcp-core",
      title: "Core gear",
      items: [
        "Waterproof trekking boots",
        "Daypack with rain cover",
        "Trekking poles",
        "Headlamp for Poon Hill",
        "Reusable water bottles",
        "Neutral clothing for jungle activities",
      ],
    },
    {
      id: "kcp-clothing",
      title: "Clothing",
      items: [
        "Layered base and mid-layers",
        "Insulated jacket",
        "Waterproof shell and trousers",
        "Warm hat and gloves",
        "Sun hat and trekking socks",
        "Light breathable layers for Chitwan",
      ],
    },
    {
      id: "kcp-docs",
      title: "Documents & personal",
      items: [
        "Passport, visa and permits",
        "Travel insurance documents",
        "Personal medication",
        "Sunscreen and sunglasses",
        "Power bank",
        "Insect repellent for Terai nights",
      ],
    },
  ],
  suitableBody:
    "Suited to travellers who want Kathmandu culture, a Chitwan wildlife stay on a confirmed programme and a moderate foothill trek to Poon Hill with city and flight connections when included.",
  trainingBody:
    "Train on hills or stairs with a daypack for several weeks before travel. Day 8 can be long — steady fitness helps on the Poon Hill pre-dawn walk and descent.",
  khumbuBody:
    "The trekking section follows the Annapurna Conservation Area from the Pokhara side through Ulleri and Ghorepani to Poon Hill — a foothill itinerary without high passes.",
  flightBody: KATHMANDU_CHITWAN_POON_HILL_FLIGHT_NOTE,
  bufferBody:
    "Allow buffer on international tickets around multiple domestic sectors and the long Day 8 schedule. Weather can delay Pokhara and Chitwan flights.",
  heliBody: "",
  beforeItems: [
    "Travel insurance with trekking and evacuation cover is mandatory for the trek section.",
    "Confirm Chitwan activities, airports and Day 8 timing with your coordinator before travel.",
    "Tips for guide, driver and lodge teams are customary and your choice.",
    "Draft inclusions on this page require operator verification on your signed confirmation.",
  ],
  permitsLabel: "Annapurna Conservation Area + trekking permits when included",
  regionLabel: "Kathmandu · Chitwan · Pokhara · Ulleri · Ghorepani · Poon Hill",
  startLabel:
    "Kathmandu → Chitwan → Pokhara → Hile / Ulleri → Ghorepani → Poon Hill → Pokhara → Kathmandu",
  flightTitle: "Domestic flights and road transfers",
  notesTitle: "Flights, jungle programme and buffer days",
  luklaNoteTitle: "",
  aboutTitle: "Chitwan wildlife experiences",
  aboutLead:
    "Chitwan National Park and its buffer communities offer lowland contrast to the Himalaya — rivers, sal forest and grassland where your lodge team arranges the activities confirmed on your booking.",
  aboutSections: [
    {
      id: "kcp-chitwan",
      title: "What to expect on your Chitwan programme",
      body:
        "Wildlife and nature days are shaped by the operator's confirmed package — which may include guided walks, river or jeep activities, lodge briefings or cultural encounters when appropriate and listed on your quote.\n\nWe describe the experience accurately without guaranteeing rhino, deer, crocodile, bird species or other sightings. Heat, season and park regulations affect comfort and access.\n\nIf you need specific activities (for example canoe, jeep safari or village visit), name them when you enquire so we can match a lodge programme and quote accordingly.",
    },
  ],
  whyTitle: "Why choose this ten-day Nepal combination?",
  khumbuTitle: "The route you follow",
  mapBody:
    "Schematic route: Kathmandu (sightseeing) → flight to Chitwan → jungle programme → flight to Pokhara → road to Hile / Ulleri → Ghorepani → Poon Hill → Ulleri → Pokhara → flight to Kathmandu. Illustrative only — confirm airports, trek endpoints and Day 8 timing operationally.",
  weatherNote:
    "Indicative month-by-month temperatures for Ghorepani / Poon Hill elevations — not a daily forecast for Chitwan or Pokhara.",
  metaTitle: "Kathmandu Chitwan Poon Hill Luxury Tour – 10 Days | Ambition Holidays",
  metaDescription:
    "Experience Nepal on a 10-day luxury tour combining Kathmandu sightseeing, Chitwan wildlife experiences, a scenic flight to Pokhara and a Himalayan trek to Ghorepani and Poon Hill.",
  metaKeywords:
    "Kathmandu Chitwan Poon Hill Luxury Tour, Kathmandu Chitwan Poon Hill Tour, Nepal Luxury Tour 10 Days, Chitwan Wildlife and Poon Hill Trek, Luxury Nepal Wildlife Tour, Poon Hill Luxury Trek Nepal, Kathmandu Chitwan Pokhara Tour, Ghorepani Poon Hill Package, Nepal Luxury Adventure Tour",
  focusKeyword: "Kathmandu Chitwan Poon Hill Luxury Tour",
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
    id: "kcp-watch",
    title: "",
    subtitle: "",
    duration: "",
    imageSrc: "",
    imageAlt: "",
    videoSrc: "",
  },
  videoReviews: [],
  reviews: [],
  tripInfoTitle: "Kathmandu – Chitwan – Poon Hill Luxury Tour – Trip Information",
  tripInfo: [
    { id: "ti-duration", title: "Duration", body: "10 days / 9 nights in Nepal." },
    { id: "ti-country", title: "Country", body: "Nepal." },
    {
      id: "ti-dest",
      title: "Destinations",
      body: "Kathmandu, Chitwan, Pokhara and the Annapurna region.",
    },
    {
      id: "ti-trek",
      title: "Trekking destinations",
      body: "Hile, Ulleri, Ghorepani and Poon Hill.",
    },
    { id: "ti-alt", title: "Maximum altitude", body: "Approximately 3,210 m at Poon Hill (viewpoint)." },
    {
      id: "ti-diff",
      title: "Difficulty",
      body: "Moderate for the trek section — confirm with the operator after reviewing the full route and Day 8 schedule.",
    },
    {
      id: "ti-transport",
      title: "Transportation",
      body: "Domestic flights and road transfers as specified on your confirmation — including Kathmandu–Chitwan, Chitwan–Pokhara and Pokhara–Kathmandu when included.",
    },
    {
      id: "ti-acc",
      title: "Accommodation",
      body: "Confirmed hotel or lodge categories in cities and jungle; best suitable mountain lodges on trek nights — stated on your booking confirmation.",
    },
    {
      id: "ti-wildlife",
      title: "Wildlife activities",
      body: "Based on the booked Chitwan programme — activities and sightings are not guaranteed.",
    },
    {
      id: "ti-season",
      title: "Best season",
      body: "Spring and autumn suit trekking and flights; Terai heat peaks before the monsoon. Expect weather caveats on Poon Hill and domestic air sectors.",
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
    "Extra Kathmandu, Chitwan or Pokhara hotel nights.",
    "Single-room supplement where available.",
    "Extended Chitwan programme or Bardia extension — quoted separately.",
  ],
  includeNote: KATHMANDU_CHITWAN_POON_HILL_INCLUDE_NOTE,
  luklaNote: KATHMANDU_CHITWAN_POON_HILL_FLIGHT_NOTE,
  reviewsWallpaperSrc: "/images/atmosphere/ebc-premium-section.webp",
  slugHistory: [],
  ogTitle: "Kathmandu Chitwan Poon Hill Luxury Tour – 10 Days | Ambition Holidays",
  ogDescription:
    "Ten-day luxury Nepal tour — Kathmandu heritage, Chitwan wildlife programme, Pokhara flights and a trek to Ghorepani and Poon Hill.",
  ogImageSrc: HERO,
};

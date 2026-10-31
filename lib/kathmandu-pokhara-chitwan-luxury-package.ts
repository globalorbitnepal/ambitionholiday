import type { TrekPackage } from "./trip-packages";
import {
  KATHMANDU_POKHARA_CHITWAN_EXCLUSIONS,
  KATHMANDU_POKHARA_CHITWAN_GROUP_PRICES,
  KATHMANDU_POKHARA_CHITWAN_INCLUDE_NOTE,
  KATHMANDU_POKHARA_CHITWAN_INCLUSIONS,
  KATHMANDU_POKHARA_CHITWAN_ITINERARY,
  KATHMANDU_POKHARA_CHITWAN_ITINERARY_INTRO,
  KATHMANDU_POKHARA_CHITWAN_LUXURY_EXPERIENCE,
  KATHMANDU_POKHARA_CHITWAN_SLUG,
  KATHMANDU_POKHARA_CHITWAN_TRANSPORT_NOTE,
} from "./kathmandu-pokhara-chitwan-luxury-content";

const HERO = "/images/nepal/nepal-cult-ktmpokchit.webp";

export const KATHMANDU_POKHARA_CHITWAN_LUXURY_TRIP_PACKAGE: TrekPackage = {
  id: "kpc9-lux",
  catalogId: "kathmandu-pokhara-chitwan-lux",
  slug: KATHMANDU_POKHARA_CHITWAN_SLUG,
  country: "nepal",
  status: "published",
  featured: true,
  badge: "NEPAL LUXURY ADVENTURE",
  title: "Kathmandu – Pokhara – Chitwan Luxury Tour",
  subtitle:
    "Experience Nepal's cultural treasures, breathtaking Himalayan scenery, and unforgettable jungle adventures on a nine-day journey through Kathmandu, Nagarkot, Pokhara, and Chitwan.",
  duration: "9 Days / 8 Nights",
  days: 9,
  difficulty: "Easy",
  destination: "Nepal · Kathmandu · Nagarkot · Pokhara · Chitwan",
  maxAltitude: "Nagarkot · ~2,175 m (approx.)",
  maxAltitudeFt: "",
  countryLabel: "Nepal",
  activityLabel: "Private luxury tour · culture, scenery & wildlife",
  accommodationLabel:
    "Confirmed hotels in Kathmandu, Nagarkot and Pokhara + Chitwan lodge — subject to availability",
  mealsLabel: "As per confirmed board basis on your signed confirmation",
  startEndLabel: "Kathmandu",
  groupSize: "Private or group departures — enquire for dates",
  bestSeason: "October–April (wildlife and flights; monsoon affects roads and air sectors)",
  priceUsd: 1799,
  groupPrices: [...KATHMANDU_POKHARA_CHITWAN_GROUP_PRICES],
  pricingDisclaimer: "",
  heroCtaPrimary: "",
  heroCtaSecondary: "",
  luxuryExperience: KATHMANDU_POKHARA_CHITWAN_LUXURY_EXPERIENCE,
  overview:
    "The Kathmandu – Pokhara – Chitwan Luxury Tour weaves valley UNESCO heritage, a Nagarkot hill night, Pokhara's lakeside setting and Terai jungle programme into nine days — with domestic flights when included on your quote, not assumed on this page.\n\nTwo Kathmandu nights open with Durbar Square, Swayambhunath, Boudhanath and Pashupatinath on a confirmed route. Patan and Bhaktapur lead to Nagarkot before you fly to Pokhara for Sarangkot and landmark sightseeing. Day 6 moves toward Chitwan by air only after the operator verifies the Pokhara–Chitwan sector; jungle days follow the booked lodge plan before a return flight to Kathmandu.\n\nLuxury means private coordination and suitable lodge standards when listed — not guaranteed Himalayan views, wildlife sightings, included entrance fees or flight tickets unless your signed confirmation states them.",
  highlights: [
    "Nine days across culture, hills, lakeside and jungle.",
    "Kathmandu Durbar Square and major valley stupas.",
    "Pashupatinath and living pilgrimage sites.",
    "Patan and Bhaktapur Durbar Squares.",
    "Scenic overnight in Nagarkot when weather allows.",
    "Domestic flight to Pokhara when included on Day 4.",
    "Sarangkot sunrise and Pokhara sightseeing when confirmed.",
    "Pokhara–Chitwan flight on Day 6 — verify route operationally.",
    "Chitwan jungle programme per booked lodge plan.",
    "Return flight to Kathmandu when included on Day 8.",
  ],
  inclusions: KATHMANDU_POKHARA_CHITWAN_INCLUSIONS,
  exclusions: KATHMANDU_POKHARA_CHITWAN_EXCLUSIONS,
  gallery: [
    HERO,
    "/images/nepal/nepal-cult-ktm.webp",
    "/images/nepal/nepal-cult-heritage.webp",
    "/images/journal/blog-lakes.webp",
    "/images/nepal/nepal-wild-chitwan.webp",
    "/images/journal/annapurna-clean.webp",
  ],
  tripGalleryTitle: "Kathmandu – Pokhara – Chitwan Luxury Tour Gallery",
  galleryAlts: [
    "Phewa Lake Pokhara with jungle and mountain journey theme",
    "Kathmandu Durbar Square heritage architecture",
    "Bhaktapur temple square and Newari detail",
    "Phewa Lake at Pokhara",
    "Rhino in Chitwan grassland",
    "Himalayan panorama from a Pokhara viewpoint area",
  ],
  heroSrc: HERO,
  heroAlt: "Pokhara lake and Nepal hills representing culture and jungle on one journey",
  altitudeChartM: "",
  altitudeChartFt: "",
  altitudeGainSrc: "",
  routeMapSrc: "",
  weatherDailySrc: "",
  weatherMonthlySrc: "",
  routeMapFile: "kathmandu-pokhara-chitwan-luxury-tour-route-map",
  altitudeMFile: "kathmandu-pokhara-chitwan-luxury-tour-altitude-meters",
  altitudeFtFile: "kathmandu-pokhara-chitwan-luxury-tour-altitude-feet",
  weatherDailyFile: "kathmandu-pokhara-chitwan-luxury-tour-daily-temperature",
  weatherMonthlyFile: "kathmandu-pokhara-chitwan-luxury-tour-monthly-temperature",
  itineraryIntro: KATHMANDU_POKHARA_CHITWAN_ITINERARY_INTRO,
  itinerary: KATHMANDU_POKHARA_CHITWAN_ITINERARY,
  faqs: [
    {
      q: "How many days does the Kathmandu–Pokhara–Chitwan tour take?",
      a: "Nine days / eight nights with overnight stays in Kathmandu (3), Nagarkot (1), Pokhara (2) and Chitwan (2) as published.",
    },
    {
      q: "Which destinations are included?",
      a: "Kathmandu, Patan, Bhaktapur, Nagarkot, Pokhara and the Chitwan area on the confirmed programme.",
    },
    {
      q: "Is accommodation included for all eight nights?",
      a: "When included on your quote — eight nights on the published plan. Room category is stated on your signed confirmation.",
    },
    {
      q: "Are domestic flights included in the tour price?",
      a: "Only sectors explicitly listed on your invoice. This page describes Day 4, Day 6 and Day 8 air travel subject to confirmation.",
    },
    {
      q: "Is a direct flight available from Pokhara to Chitwan?",
      a: "Not guaranteed. Day 6 must be verified with the operator for route, schedule and airport before the itinerary is marketed as confirmed.",
    },
    {
      q: "What sightseeing is included in Kathmandu?",
      a: "Typically Durbar Square, Swayambhunath, Boudhanath and Pashupatinath on Day 2 — final routing and entrances follow your confirmed plan.",
    },
    {
      q: "Will we visit Patan and Bhaktapur?",
      a: "Yes on Day 3 before the road transfer to Nagarkot, subject to operational timing.",
    },
    {
      q: "Can we see the Himalayas from Nagarkot and Sarangkot?",
      a: "Panoramas are possible when weather allows — never guaranteed.",
    },
    {
      q: "What activities are available in Chitwan?",
      a: "Those offered by your booked lodge and park rules — walks, canoe, cultural visits or jeep activities only when included on your quote.",
    },
    {
      q: "Are wildlife sightings guaranteed?",
      a: "No. Wildlife viewing depends on season, habitat and luck.",
    },
    {
      q: "How can I request a private-tour quotation?",
      a: "Use Book now, Check availability or the enquiry form with your dates and group size.",
    },
  ],
  whyItems: [
    {
      title: "One coordinated journey",
      body: "Valley temples, hill light, Pokhara and Chitwan without designing logistics yourself.",
    },
    {
      title: "Verified flights",
      body: "Especially Day 6 Pokhara–Chitwan — confirm before selling fixed schedules.",
    },
    {
      title: "Eight nights mapped",
      body: "Kathmandu, Nagarkot, Pokhara and Chitwan nights align with the published plan.",
    },
    {
      title: "Honest jungle copy",
      body: "Activities and sightings follow your lodge programme, not marketing promises.",
    },
    {
      title: "Private coordination",
      body: "One team handles hotels, flights and Chitwan lodge when included.",
    },
    {
      title: "Draft pricing",
      body: "From USD 1,799 is for operator review — your signed quote is binding.",
    },
  ],
  weatherBody:
    "Autumn and spring suit valley sightseeing, Nagarkot views and Chitwan comfort. Monsoon brings rain on roads and higher flight disruption risk. Terai afternoons can be hot before the monsoon.",
  altitudeBody: "",
  packingItems: [],
  packingIntro:
    "Pack modest temple clothing, comfortable walking shoes, a warm layer for Nagarkot and Sarangkot mornings, insect repellent for Chitwan, and a day bag for sightseeing.",
  packingGroups: [
    {
      id: "kpc9-core",
      title: "Essentials",
      items: [
        "Modest temple layers",
        "Walking shoes for cobbled squares",
        "Warm layer for hill mornings",
        "Insect repellent for Terai",
        "Sun hat and reusable water bottle",
      ],
    },
    {
      id: "kpc9-docs",
      title: "Documents",
      items: ["Passport and visa", "Travel insurance", "Flight confirmations when issued"],
    },
  ],
  suitableBody:
    "Suited to travellers wanting an easy-paced combination of heritage, scenic flights when included, Pokhara viewpoints and a Chitwan lodge programme on confirmed terms.",
  trainingBody: "",
  khumbuBody: "",
  flightBody: KATHMANDU_POKHARA_CHITWAN_TRANSPORT_NOTE,
  bufferBody:
    "Allow buffer on international tickets around multiple domestic sectors and monsoon-season delays. Day 6 may require an operator-approved alternative if the Pokhara–Chitwan flight is unavailable.",
  heliBody: "",
  beforeItems: [
    "Verify Pokhara–Chitwan flight inclusion and route before travel.",
    "Confirm Chitwan lodge programme and included jungle activities on your quote.",
    "Tips for guide, driver and lodge teams are customary and your choice.",
  ],
  permitsLabel: "",
  regionLabel: "Kathmandu · Patan · Bhaktapur · Nagarkot · Pokhara · Chitwan",
  startLabel: "Kathmandu → Nagarkot → Pokhara → Chitwan → Kathmandu",
  flightTitle: "Domestic flights and road transfers",
  notesTitle: "Flight routes and Day 6 verification",
  luklaNoteTitle: "",
  aboutTitle: "Chitwan wildlife experiences",
  aboutLead:
    "After Pokhara, the Terai offers a contrast of rivers, sal forest and grassland — your lodge team delivers the programme confirmed on your booking, not generic safari promises.",
  aboutSections: [
    {
      id: "kpc9-chitwan",
      title: "Jungle programme expectations",
      body:
        "Days 6–7 follow the selected lodge plan — which may include briefings, walks, canoe or jeep activities when appropriate, listed on your quote.\n\nWe do not guarantee rhino, tiger, deer or bird species. Heat, season and park regulations affect comfort and access.\n\nOptional extras must be priced separately when not included on your signed documents.",
    },
  ],
  whyTitle: "Why choose this nine-day combination?",
  khumbuTitle: "",
  mapBody: "",
  weatherNote: "",
  metaTitle: "Kathmandu Pokhara Chitwan Luxury Tour – 9 Days | Ambition Holidays",
  metaDescription:
    "Explore Nepal on a 9-day Kathmandu Pokhara Chitwan tour featuring historic temples, Patan and Bhaktapur, Nagarkot mountain views, Pokhara sightseeing, and Chitwan jungle experiences.",
  metaKeywords:
    "Kathmandu Pokhara Chitwan Luxury Tour, Kathmandu Pokhara Chitwan Tour 9 Days, Nepal Luxury Cultural Tour, Nagarkot Pokhara Chitwan Package, Chitwan Wildlife Tour Nepal, Luxury Tour Package Nepal",
  focusKeyword: "Kathmandu Pokhara Chitwan Luxury Tour",
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
    id: "kpc9-watch",
    title: "",
    subtitle: "",
    duration: "",
    imageSrc: "",
    imageAlt: "",
    videoSrc: "",
  },
  videoReviews: [],
  reviews: [],
  tripInfoTitle: "Kathmandu – Pokhara – Chitwan Luxury Tour – Trip Information",
  tripInfo: [
    { id: "ti-name", title: "Tour name", body: "Kathmandu – Pokhara – Chitwan Luxury Tour." },
    { id: "ti-duration", title: "Duration", body: "9 days / 8 nights." },
    { id: "ti-country", title: "Country", body: "Nepal." },
    {
      id: "ti-dest",
      title: "Main destinations",
      body: "Kathmandu, Patan, Bhaktapur, Nagarkot, Pokhara and Chitwan.",
    },
    { id: "ti-style", title: "Tour style", body: "Cultural, scenic and wildlife." },
    {
      id: "ti-transport",
      title: "Transportation",
      body: "Road transfers and domestic flights subject to confirmation on your quote — verify Day 6 Pokhara–Chitwan routing.",
    },
    {
      id: "ti-acc",
      title: "Accommodation",
      body: "Eight nights per published plan — category confirmed on booking.",
    },
    {
      id: "ti-wildlife",
      title: "Wildlife viewing",
      body: "Subject to natural conditions and lodge programme — not guaranteed.",
    },
    {
      id: "ti-diff",
      title: "Difficulty",
      body: "Generally suitable for sightseeing travellers; walking on cobbles and lodge trails varies.",
    },
    {
      id: "ti-season",
      title: "Best season",
      body: "October–April broadly suits sightseeing, flights and Terai comfort.",
    },
    {
      id: "ti-group",
      title: "Group type",
      body: "Private or group departures — enquire for dates.",
    },
  ],
  optionalAddons: [
    "Extra Kathmandu or Pokhara nights.",
    "Single-room supplement where available.",
    "Extended Chitwan programme — quoted separately.",
  ],
  includeNote: KATHMANDU_POKHARA_CHITWAN_INCLUDE_NOTE,
  luklaNote: KATHMANDU_POKHARA_CHITWAN_TRANSPORT_NOTE,
  reviewsWallpaperSrc: "/images/atmosphere/ebc-premium-section.webp",
  slugHistory: [],
  ogTitle: "Kathmandu Pokhara Chitwan Luxury Tour – 9 Days | Ambition Holidays",
  ogDescription:
    "Nine-day luxury tour — valley heritage, Nagarkot, Pokhara, Chitwan jungle and domestic flights when included.",
  ogImageSrc: HERO,
};

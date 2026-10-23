import type { TrekPackage } from "./trip-packages";
import {
  POON_HILL_EXCLUSIONS,
  POON_HILL_FLIGHT_NOTE,
  POON_HILL_INCLUDE_NOTE,
  POON_HILL_INCLUSIONS,
  POON_HILL_ITINERARY,
  POON_HILL_ITINERARY_INTRO,
  POON_HILL_LUXURY_EXPERIENCE,
  POON_HILL_GROUP_PRICES,
  POON_HILL_PRICING_DISCLAIMER,
  POON_HILL_SLUG,
} from "./poon-hill-luxury-content";

const HERO = "/images/journal/annapurna-clean.webp";

export const POON_HILL_LUXURY_TRIP_PACKAGE: TrekPackage = {
  id: "phl-lux",
  catalogId: "poon-hill-lux",
  slug: POON_HILL_SLUG,
  country: "nepal",
  status: "published",
  featured: true,
  badge: "PRIVATE ANNAPURNA REGION EXPERIENCE",
  title: "Poon Hill Luxury Trek – 5 Days",
  subtitle:
    "Discover the beauty of Nepal's Annapurna region on a five-day trekking escape from Kathmandu. Travel to Pokhara, walk through traditional hillside villages and rhododendron forests, and experience sunrise over the Himalayan peaks from Poon Hill. Enjoy private trip coordination, a knowledgeable local guide and carefully selected accommodation along the journey.",
  duration: "5 Days / 4 Nights",
  days: 5,
  difficulty: "Moderate to challenging",
  destination: "Nepal · Annapurna region",
  maxAltitude: "Poon Hill — approx. 3,210 m (sunrise viewpoint)",
  maxAltitudeFt: "10,531 ft",
  countryLabel: "Nepal",
  activityLabel: "Private Luxury Trek",
  accommodationLabel:
    "Confirmed Pokhara stays + best suitable mountain lodges on trek nights, subject to availability",
  mealsLabel: "As per confirmed board basis on your signed confirmation",
  startEndLabel: "Kathmandu",
  groupSize: "Private departures",
  bestSeason: "March–May · September–November (weather dependent)",
  priceUsd: 799,
  groupPrices: [...POON_HILL_GROUP_PRICES],
  pricingDisclaimer: POON_HILL_PRICING_DISCLAIMER,
  luxuryExperience: POON_HILL_LUXURY_EXPERIENCE,
  overview:
    "The Poon Hill Luxury Trek compresses one of Nepal's most celebrated short viewpoints into five days with flights between Kathmandu and Pokhara when included on your confirmed quote. You walk the classic foothill corridor through Ulleri and Ghorepani, with an early-morning ascent to Poon Hill for sunrise panoramas when weather allows.\n\nLuxury here means private guiding, coordinated flights and transfers, honest pacing on steep stone steps, and the best suitable lodges available — not five-star resorts in every village. Mountain views, flight operations and room availability depend on season and supplier confirmation.\n\nAbout Poon Hill: the viewpoint sits above Ghorepani on a forested ridge, looking towards the Annapurna and Dhaulagiri massifs when clouds lift. It is a popular sunrise walk, not a high pass or technical climb. Clear skies and named peaks are never guaranteed on any morning.",
  highlights: [
    "Kathmandu–Pokhara scenic domestic flights, subject to confirmation on your quote.",
    "A private journey through the Annapurna region.",
    "Traditional villages and hillside landscapes.",
    "Rhododendron and forest trails — especially vivid in spring.",
    "Sunrise experience at Poon Hill.",
    "Panoramic mountain views when weather permits.",
    "Private guiding and personalised trip coordination.",
    "Carefully selected accommodation, subject to local availability.",
  ],
  inclusions: POON_HILL_INCLUSIONS,
  exclusions: POON_HILL_EXCLUSIONS,
  gallery: [
    HERO,
    "/images/journal/annapurna.webp",
    "/images/nepal/nepal-cover.webp",
    "/images/journal/blog-lakes.webp",
  ],
  tripGalleryTitle: "Poon Hill Luxury Trek Gallery",
  galleryAlts: [
    "Annapurna peaks seen from a ridge in the Nepal Himalaya",
    "Rhododendron forest trail in the Annapurna foothills",
    "Himalayan foothills and valley light in Nepal",
    "Phewa Lake area near Pokhara at the start of the journey",
  ],
  heroSrc: HERO,
  heroAlt: "Sunrise Himalayan panorama from the Annapurna region near Poon Hill",
  altitudeChartM: "",
  altitudeChartFt: "",
  altitudeGainSrc: "",
  routeMapSrc: "",
  weatherDailySrc: "",
  weatherMonthlySrc: "",
  routeMapFile: "poon-hill-luxury-trek-route-map",
  altitudeMFile: "poon-hill-luxury-trek-altitude-meters",
  altitudeFtFile: "poon-hill-luxury-trek-altitude-feet",
  weatherDailyFile: "poon-hill-luxury-trek-daily-temperature",
  weatherMonthlyFile: "poon-hill-luxury-trek-monthly-temperature",
  itineraryIntro: POON_HILL_ITINERARY_INTRO,
  itinerary: POON_HILL_ITINERARY,
  faqs: [
    {
      q: "How long is the Poon Hill Luxury Trek?",
      a: "Five days from Kathmandu with four overnight stays, following the published day order: Pokhara, trekking nights, return to Pokhara when included, and the flight back to Kathmandu on Day 5.",
    },
    {
      q: "What is the highest viewpoint?",
      a: "Poon Hill at approximately 3,210 m — a sunrise walk from Ghorepani, not an overnight elevation. Your highest sleep is typically around Ghorepani at roughly 2,860–2,875 m.",
    },
    {
      q: "Is the trip suitable for beginners?",
      a: "Fit first-time trekkers can complete it with preparation. Day 2 includes steep stone steps towards Ulleri, and Day 4 is long with an early start and substantial descent. Prior hill walking and a regular fitness routine are recommended.",
    },
    {
      q: "How demanding is Day 4?",
      a: "It is the most demanding day: pre-dawn walking to Poon Hill, breakfast in Ghorepani, then a long descent towards Hile and a road transfer to Pokhara. Total walking time is confirmed operationally before you travel — expect a full day on your feet.",
    },
    {
      q: "Are Kathmandu–Pokhara flights included?",
      a: "Only when stated on your signed quotation and in the Includes list for your booking. This page does not assume flights are in the selling price until your package configuration is approved.",
    },
    {
      q: "What accommodation is available along the trail?",
      a: "Best available suitable mountain lodges on trekking nights and confirmed Pokhara accommodation on city nights when included. Remote rooms are simpler than city hotels — ensuite bathrooms and heating are not guaranteed every night.",
    },
    {
      q: "Are meals included?",
      a: "Meals follow the board basis confirmed in writing on your booking. Drinks and snacks outside that plan are excluded unless your confirmation says otherwise.",
    },
    {
      q: "Is a private guide included?",
      a: "Yes — this is designed as a private guided trek. Porter support is included only when named on your confirmed service plan.",
    },
    {
      q: "What is the best season?",
      a: "Spring (March–May) and autumn (September–November) are popular for rhododendron colour and clearer mornings. Winter can be cold at Ghorepani; monsoon brings cloud, rain and flight disruption risk.",
    },
    {
      q: "What happens if a flight is delayed?",
      a: "Domestic flights may reschedule or cancel for weather. Your coordinator assists with rebooking when airlines permit. Extra nights, meals, road transfers and insurance claims follow your booking confirmation and insurer — not automatic refunds unless your documents state them.",
    },
    {
      q: "What should I pack?",
      a: "Trekking boots, layered clothing, waterproof shell, warm jacket, gloves, sun protection, daypack, water bottle, headlamp, personal medication and travel documents. See the packing list on this page.",
    },
    {
      q: "What travel insurance is recommended?",
      a: "Comprehensive cover for trekking up to your highest planned elevation, including emergency helicopter evacuation, is mandatory. Carry policy details and emergency contacts on the trail.",
    },
    {
      q: "Can the trip be customised?",
      a: "Yes — extra Kathmandu or Pokhara nights, private vehicle alternatives to flights, or adjusted pacing can be quoted separately. Contact Ambition Holidays with dates and group size.",
    },
    {
      q: "How can I confirm availability?",
      a: "Use Book now, Check availability or WhatsApp on this page, or email your preferred dates. Lodge space and flight seats are held only after deposit and written confirmation.",
    },
  ],
  whyItems: [
    {
      title: "Annapurna specialists",
      body: "Guides who know Ulleri steps, Ghorepani pacing and realistic sunrise timing on Poon Hill.",
    },
    {
      title: "Honest luxury",
      body: "Private logistics and selected lodges with clear language about what foothill villages can provide.",
    },
    {
      title: "Flight transparency",
      body: "We explain Kathmandu–Pokhara delay realities before you buy tickets — and what your confirmation includes.",
    },
    {
      title: "Day 4 clarity",
      body: "Long descent days are flagged early; operational walking times are confirmed before travel.",
    },
    {
      title: "Private pace",
      body: "Your party sets the rhythm on village trails and photography stops.",
    },
    {
      title: "Coordinator support",
      body: "One point of contact from enquiry through permits, flights and lodge holds.",
    },
  ],
  weatherBody:
    "Ghorepani and Poon Hill sit in the mid-hills where temperatures swing sharply between sun and shade. Spring mornings can be hazy until clouds lift; autumn often brings the clearest panoramas but cold pre-dawn walks. Pokhara is warmer and wetter year-round. Chart values on this page are indicative — the morning you climb Poon Hill can be windier, cloudier or clearer than averages.",
  altitudeBody:
    "You sleep near Ghorepani (~2,870 m) before the Poon Hill viewpoint (~3,210 m). The viewpoint is a few hundred metres above lodge level — still altitude that rewards slow pacing, fluids and warm layers. Descent on Day 4 is long; protect knees on stone steps.",
  packingItems: [],
  packingIntro:
    "Pack for warm Pokhara afternoons and cold Ghorepani mornings in the same week. Waterproof shell and broken-in boots matter more than fashion.",
  packingGroups: [
    {
      id: "phl-core",
      title: "Core gear",
      items: [
        "Waterproof trekking boots (broken in)",
        "Daypack with rain cover",
        "Trekking poles — recommended for Ulleri steps and Day 4 descent",
        "Headlamp for the Poon Hill pre-dawn walk",
        "Reusable water bottle",
      ],
    },
    {
      id: "phl-clothing",
      title: "Clothing",
      items: [
        "Moisture-wicking base layers",
        "Warm mid-layers and insulated jacket",
        "Waterproof and wind-resistant shell",
        "Trekking trousers",
        "Warm hat and gloves",
        "Comfortable trekking socks",
      ],
    },
    {
      id: "phl-personal",
      title: "Personal equipment & documents",
      items: [
        "Sunglasses and high-SPF sunscreen",
        "Personal toiletries",
        "Power bank",
        "Personal medication",
        "Travel insurance documents",
        "Passport copies and visa",
      ],
    },
  ],
  suitableBody:
    "Suited to travellers who want a classic Annapurna viewpoint within a short private itinerary — couples and friends' groups are typical.",
  trainingBody:
    "Train on stairs or hills with a daypack for several weeks before travel. Day 2 and Day 4 reward leg strength more than speed.",
  khumbuBody:
    "The Annapurna Conservation Area protects much of this foothill corridor. Villages such as Ulleri and Ghorepani sit on stone-step trails above terraced hills — a cultural landscape as much as a mountain walk.",
  flightBody: POON_HILL_FLIGHT_NOTE,
  bufferBody:
    "Allow at least one buffer day on international tickets if you plan same-day connections around the Kathmandu–Pokhara flights. Road transfer alternatives may add hours — your coordinator states timing on the final itinerary.",
  heliBody: "",
  beforeItems: [
    "Travel insurance with trekking and evacuation cover is mandatory.",
    "Flights and lodge nights are confirmed only on your signed booking — not from website text alone.",
    "Rooms are typically twin-sharing unless a single supplement is confirmed where lodges allow.",
    "Tips for guide and porters are customary and entirely your choice.",
  ],
  permitsLabel: "Annapurna Conservation Area + trekking permits when included",
  regionLabel: "Annapurna region (Ghorepani–Poon Hill)",
  startLabel: "Kathmandu → Pokhara → Ulleri → Ghorepani → Poon Hill → Pokhara → Kathmandu",
  flightTitle: "Kathmandu ↔ Pokhara flights",
  notesTitle: "Flights, buffer days & road alternatives",
  luklaNoteTitle: "",
  aboutTitle: "About the Poon Hill Luxury Trek",
  whyTitle: "Why choose this Poon Hill itinerary?",
  khumbuTitle: "The Annapurna foothills you walk",
  mapBody:
    "Route: Kathmandu → Pokhara → Hile → Ulleri → Ghorepani → Poon Hill (viewpoint) → Hile → Pokhara → Kathmandu. Dashed lines indicate domestic flights. Distances and driving routes follow operational confirmation.",
  weatherNote:
    "Month-by-month reference for Ghorepani / Poon Hill elevations — not a daily forecast. Pokhara is warmer and wetter at lake level.",
  metaTitle: "Poon Hill Luxury Trek – 5 Days | Ambition Holidays",
  metaDescription:
    "Experience the Poon Hill Luxury Trek in 5 days with flights between Kathmandu and Pokhara, a sunrise Himalayan viewpoint, private guiding and carefully selected accommodation.",
  metaKeywords:
    "Poon Hill Luxury Trek, Poon Hill Trek 5 Days, Luxury Poon Hill Trek Nepal, Ghorepani Poon Hill Luxury Trek, Private Poon Hill Trek, Poon Hill Sunrise Trek, Luxury Trekking in Nepal, Annapurna Region Luxury Trek",
  focusKeyword: "Poon Hill Luxury Trek",
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
    id: "phl-watch",
    title: "",
    subtitle: "",
    duration: "",
    imageSrc: "",
    imageAlt: "",
    videoSrc: "",
  },
  videoReviews: [],
  reviews: [],
  tripInfoTitle: "Poon Hill Luxury Trek – Trip Information",
  tripInfo: [
    {
      id: "ti-duration",
      title: "Duration",
      body: "5 days / 4 nights · private trek in the Annapurna foothills, subject to the final accommodation plan.",
    },
    {
      id: "ti-region",
      title: "Region",
      body: "Annapurna Conservation Area — Pokhara, Ulleri, Ghorepani and Poon Hill viewpoint.",
    },
    {
      id: "ti-viewpoint",
      title: "Highest viewpoint",
      body: "Poon Hill — approximately 3,210 m (sunrise walk from Ghorepani). Not an overnight elevation.",
    },
    {
      id: "ti-diff",
      title: "Difficulty",
      body: "Moderate to challenging — steep steps on Day 2 and a long descent on Day 4 depending on fitness.",
    },
    {
      id: "ti-walk",
      title: "Walking days",
      body: "Three main trekking days (Days 2–4) plus travel days with flights when included.",
    },
    {
      id: "ti-acc",
      title: "Accommodation",
      body: "Confirmed Pokhara accommodation on included city nights and best suitable mountain lodges on trek nights — subject to availability. Not five-star in remote villages.",
    },
    {
      id: "ti-meals",
      title: "Meals",
      body: "According to the board basis confirmed at booking only.",
    },
    {
      id: "ti-flights",
      title: "Flights",
      body: "Kathmandu ↔ Pokhara domestic sectors when included on your signed quote — subject to airline operations and weather.",
    },
    {
      id: "ti-transport",
      title: "Transport",
      body: "Private transfers between Pokhara, trailheads and airports when stated on your confirmation.",
    },
    {
      id: "ti-permits",
      title: "Permits",
      body: "Annapurna Conservation Area permit and applicable local fees when included in your package.",
    },
    {
      id: "ti-season",
      title: "Best season",
      body: "Spring and autumn are popular; winter is cold at Ghorepani; monsoon increases cloud and flight-cancellation risk.",
    },
    {
      id: "ti-fitness",
      title: "Fitness",
      body: "Comfort walking uphill on stone steps with a daypack and completing a long descent day. Train on hills or stairs before travel.",
    },
    {
      id: "ti-insurance",
      title: "Travel insurance",
      body: "Mandatory comprehensive cover including trekking elevation and emergency evacuation.",
    },
  ],
  optionalAddons: [
    "Extra Kathmandu or Pokhara hotel nights.",
    "Single-room supplement where lodges can provide one.",
    "Private road transfer Kathmandu–Pokhara instead of flights when quoted.",
  ],
  includeNote: POON_HILL_INCLUDE_NOTE,
  luklaNote: POON_HILL_FLIGHT_NOTE,
  reviewsWallpaperSrc: "/images/atmosphere/ebc-premium-section.webp",
  slugHistory: [],
  ogTitle: "Poon Hill Luxury Trek – 5 Days | Ambition Holidays",
  ogDescription:
    "Discover the Annapurna region on a five-day private trek featuring the sunrise from Poon Hill, traditional mountain villages and carefully planned comfort.",
  ogImageSrc: HERO,
};

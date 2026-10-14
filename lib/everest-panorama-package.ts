import type { TrekPackage } from "./trip-packages";
import {
  EVEREST_PANORAMA_ABOUT_LEAD,
  EVEREST_PANORAMA_ABOUT_SECTIONS,
  EVEREST_PANORAMA_EXCLUSIONS,
  EVEREST_PANORAMA_INCLUDE_NOTE,
  EVEREST_PANORAMA_INCLUSIONS,
  EVEREST_PANORAMA_ITINERARY,
  EVEREST_PANORAMA_ITINERARY_INTRO,
  EVEREST_PANORAMA_JOURNEY_STAGES,
  EVEREST_PANORAMA_LUKLA_NOTE,
  EVEREST_PANORAMA_SLUG,
} from "./everest-panorama-content";

const HERO = "/images/journeys/j-ebc.webp";

export const EVEREST_PANORAMA_TRIP_PACKAGE: TrekPackage = {
  id: "ept-pan",
  catalogId: "everest-panorama",
  slug: EVEREST_PANORAMA_SLUG,
  country: "nepal",
  status: "published",
  featured: true,
  badge: "LUXURY HIMALAYAN JOURNEYS",
  title: "Everest Panorama Trek – 11 Days",
  subtitle:
    "Discover Nepal's Everest region on an 11-day Himalayan journey through Namche Bazaar, Khumjung Village, Everest View Hotel and Tengboche, with Kathmandu sightseeing and spectacular mountain scenery when visibility allows.",
  duration: "11 Days / 10 Nights",
  days: 11,
  difficulty: "Moderate",
  destination: "Everest Region, Nepal",
  maxAltitude: "Everest View Hotel area — approx. 3,880 m",
  maxAltitudeFt: "12,730 ft",
  countryLabel: "Nepal",
  activityLabel: "Himalayan trekking",
  accommodationLabel: "Hotels in Kathmandu + mountain lodges on trek + Everest View Hotel night when confirmed",
  mealsLabel: "As per confirmed itinerary",
  startEndLabel: "Kathmandu",
  groupSize: "Private or small group — enquire for dates",
  bestSeason: "March–May · September–November",
  priceUsd: 0,
  groupPrices: [{ id: "p1", label: "Per person", priceUsd: 0 }],
  overview:
    "Discover the beauty of Nepal's Everest region on an 11-day Himalayan journey that combines Kathmandu's cultural heritage with mountain trails, traditional Sherpa settlements and remarkable Himalayan viewpoints. Fly to Lukla, explore Namche Bazaar and Khumjung Village, spend a night at Everest View Hotel and visit the historic Tengboche Monastery before returning to Kathmandu.\n\nThis is not an Everest Base Camp trek. The walking line stays in the lower and middle Khumbu. Mountain views, flight operations and lodge availability depend on season and weather — your coordinator confirms commercial details on your quote.",
  highlights: [
    "Kathmandu Valley cultural sightseeing on a confirmed heritage plan",
    "Scenic flight to Lukla — subject to weather and airline operations",
    "Dudh Koshi River trails and suspension bridges",
    "Mountain villages between Lukla and Namche Bazaar",
    "Namche Bazaar — Sherpa trading centre and acclimatization hub",
    "Khumjung Village exploration when trail conditions allow",
    "Overnight at Everest View Hotel when confirmed at booking",
    "Himalayan panoramic viewpoints when visibility allows",
    "Tengboche Monastery visit subject to opening hours",
    "Return journey through Monjo and Lukla to Kathmandu",
  ],
  inclusions: EVEREST_PANORAMA_INCLUSIONS,
  exclusions: EVEREST_PANORAMA_EXCLUSIONS,
  gallery: [
    HERO,
    "/images/nepal/nepal-trek-ebc.webp",
    "/images/journeys/j-gokyo.webp",
    "/images/nepal/nepal-cover.webp",
    "/images/journeys/j-ebc.webp",
  ],
  tripGalleryTitle: "Everest Panorama Trek Gallery",
  galleryAlts: [
    "Himalayan peaks above the Khumbu valley",
    "Forest trail and prayer flags in the Everest region",
    "Snow peaks and ridge light in the Khumbu",
    "Kathmandu Valley scenery",
    "Trekking trail toward the Everest region",
  ],
  hotelEverestViewStatus: "pending",
  hotelEverestViewAdminNote:
    "Confirm Everest View Hotel night: date, room category and rate before marking confirmed on the public page.",
  hotelEverestViewPublicNote:
    "The Everest View Hotel overnight is subject to confirmed availability and will be stated on your booking confirmation.",
  heroSrc: HERO,
  heroAlt: "Himalayan panorama above the Khumbu valley on the Everest Panorama Trek",
  altitudeChartM: "",
  altitudeChartFt: "",
  altitudeGainSrc: "",
  routeMapSrc: "",
  weatherDailySrc: "",
  weatherMonthlySrc: "",
  routeMapFile: "everest-panorama-trek-route-map",
  altitudeMFile: "everest-panorama-trek-altitude-meters",
  altitudeFtFile: "everest-panorama-trek-altitude-feet",
  weatherDailyFile: "everest-panorama-trek-daily-temperature",
  weatherMonthlyFile: "everest-panorama-trek-monthly-temperature",
  itineraryIntro: EVEREST_PANORAMA_ITINERARY_INTRO,
  itinerary: EVEREST_PANORAMA_ITINERARY,
  journeyTitle: "The Journey",
  journeySubheading: "From Kathmandu's Heritage Streets to the Heart of the Khumbu",
  journeyIntro:
    "The Everest Panorama Trek begins in Kathmandu, where centuries-old temples, traditional neighbourhoods and everyday city life introduce you to Nepal's cultural richness. After exploring the Kathmandu Valley, the journey continues with a scenic flight to Lukla and the first steps along the trails of the Everest region.\n\nThe trail follows the Dudh Koshi River through small mountain settlements towards Namche Bazaar, the lively Sherpa trading centre surrounded by Himalayan landscapes. From here, the journey continues through Khumjung Village to Everest View Hotel, offering time to appreciate the mountain environment and experience an overnight stay in this distinctive setting.\n\nThe route then leads towards Tengboche, known for its monastery and mountain surroundings, before descending through familiar settlements to Monjo and returning to Lukla. After the flight back to Kathmandu, a free day provides time to rest, explore and reflect on the journey before departure.",
  journeyStages: EVEREST_PANORAMA_JOURNEY_STAGES,
  aboutLead: EVEREST_PANORAMA_ABOUT_LEAD,
  aboutSections: EVEREST_PANORAMA_ABOUT_SECTIONS,
  faqs: [
    {
      q: "How many days is the Everest Panorama Trek?",
      a: "Eleven days from arrival in Kathmandu through departure, including Kathmandu sightseeing, eight trekking nights, return flights and a free day in the capital.",
    },
    {
      q: "What is the highest altitude on the itinerary?",
      a: "The planned Everest View Hotel area overnight is approximately 3,880 m. Tengboche is approximately 3,860 m. Khumjung Village is approximately 3,780 m.",
    },
    {
      q: "Is this trek suitable for beginners?",
      a: "Fit first-time trekkers can enjoy it with preparation, but moderate fitness, hill walking practice and respect for altitude are essential. Your guide sets the daily pace.",
    },
    {
      q: "What is the best season?",
      a: "Spring (March–May) and autumn (September–November) are the most popular windows for Khumbu trekking and Lukla flights. Winter and monsoon bring more cold, cloud or rain.",
    },
    {
      q: "Does the trek include an overnight stay at Everest View Hotel?",
      a: "Yes — Day 5 includes a planned overnight at Everest View Hotel when confirmed on your booking documents.",
    },
    {
      q: "Will we visit Khumjung Village?",
      a: "Yes — Day 5 routes through the Namche area and Khumjung Village toward Everest View Hotel when trail conditions allow.",
    },
    {
      q: "Does the itinerary include Tengboche Monastery?",
      a: "Day 6 includes trekking to Tengboche with a monastery visit subject to opening hours and local conditions.",
    },
    {
      q: "Are Kathmandu sightseeing and the free day included?",
      a: "Day 2 is dedicated to Kathmandu Valley sightseeing per your confirmed plan. Day 10 is a free day in Kathmandu before departure on Day 11.",
    },
    {
      q: "What happens if the Lukla flight is delayed?",
      a: "Flights on Days 3 and 9 are weather-dependent. Delays are common. Extra nights, meals and transport costs follow your booking terms and insurance coverage.",
    },
    {
      q: "What should I pack?",
      a: "Layered trekking clothing, waterproof shell, broken-in boots, daypack, headlamp, sun protection and personal medication. See the packing section on this page.",
    },
    {
      q: "Is travel insurance recommended or required by the operator?",
      a: "Comprehensive travel insurance with helicopter evacuation cover is strongly recommended for high-altitude trekking in Nepal and may be required on your confirmation.",
    },
    {
      q: "Can I request a private trip?",
      a: "Yes — contact Ambition Holidays with preferred dates and traveller count for a private quote.",
    },
    {
      q: "Are meals included?",
      a: "Meals follow the board basis confirmed at booking. Ask for the exact meal plan when you request availability.",
    },
    {
      q: "What accommodation is provided?",
      a: "Hotels in Kathmandu on city nights, mountain lodges on most trekking nights, and Everest View Hotel on Night 5 when confirmed.",
    },
    {
      q: "How do I request availability and pricing?",
      a: "Use the availability form on this page or contact Ambition Holidays with your dates and group size.",
    },
  ],
  whyItems: [
    {
      title: "Personalised trek planning",
      body: "We align sightseeing, flights and lodge nights with your dates and pace — not a one-size-fits-all departure list.",
    },
    {
      title: "Local destination knowledge",
      body: "Guides and coordinators who work the Khumbu trail regularly and explain realistic lodge and flight conditions.",
    },
    {
      title: "Clear pre-trip communication",
      body: "Written confirmation for Lukla flights, Everest View Hotel nights and inclusions before you travel.",
    },
    {
      title: "Trek coordination",
      body: "Permits, domestic flights and lodge logistics handled as stated on your package confirmation.",
    },
    {
      title: "Responsible travel practices",
      body: "Respect for monasteries, porter welfare and leave-no-trace guidance on the trail.",
    },
    {
      title: "Support during the trip",
      body: "A single coordinator line for delays, health concerns and itinerary questions while you are in Nepal.",
    },
  ],
  weatherBody:
    "Spring and autumn generally offer the most stable trekking weather in the Khumbu, though wind, cloud and cold nights still vary by week. Winter brings colder temperatures at Namche and Tengboche. Monsoon months raise humidity, rain on lower trails and flight-cancellation risk. Layer clothing, carry rain protection and expect Lukla schedules to change with visibility.",
  altitudeBody:
    "The itinerary climbs gradually to Namche (~3,440 m), then higher nights at Khumjung, Everest View Hotel (~3,880 m) and Tengboche (~3,860 m) before descending. Drink steadily, eat regularly and report persistent headache, nausea or dizziness to your guide — descent is the correct response to serious altitude illness.",
  packingIntro:
    "Pack for warm valley afternoons and cold lodge mornings in the same week. Broken-in boots and a reliable waterproof shell matter more than extra gadgets.",
  packingItems: [],
  packingGroups: [
    {
      id: "ept-core",
      title: "Trekking clothing & layers",
      items: [
        "Moisture-wicking base layers",
        "Warm mid-layers and insulated jacket",
        "Waterproof jacket and trousers",
        "Trekking trousers and comfortable camp clothes",
        "Warm hat and gloves",
      ],
    },
    {
      id: "ept-foot",
      title: "Footwear & carry",
      items: ["Waterproof trekking boots", "Trekking socks", "Daypack", "Trekking poles (optional)", "Water bottle or hydration system"],
    },
    {
      id: "ept-kit",
      title: "Essentials",
      items: [
        "Sunglasses and high-SPF sunscreen",
        "Headlamp",
        "Personal medication and first-aid basics",
        "Toiletries",
        "Passport and travel documents",
        "Insurance documents",
        "Cash and power bank",
      ],
    },
  ],
  suitableBody:
    "Walkers who want Everest-region culture and viewpoints within eleven days without a Base Camp commitment. Prior hill walking helps for the Namche climb and higher ridge nights.",
  trainingBody:
    "Train on hills or stairs with a daypack for several weeks before travel. Back-to-back walking days prepare you for consecutive trekking stages.",
  khumbuBody:
    "The Khumbu links Lukla, the Dudh Koshi, Namche, side valleys such as Khumjung and the main trail toward Tengboche. This panorama itinerary explores that band — not the glacier camps beneath Everest.",
  flightBody: EVEREST_PANORAMA_LUKLA_NOTE,
  bufferBody:
    "Allow buffer time on international tickets around both Lukla sectors. Weather delays are normal; your coordinator assists with rebooking when airlines permit.",
  heliBody:
    "Helicopter charter is available for emergencies or private returns when weather allows — priced separately, not included in the standard walking quote.",
  beforeItems: [
    "Travel insurance with helicopter evacuation cover is strongly recommended.",
    "Everest View Hotel requires advance confirmation — do not assume availability from website text alone.",
    "Tips for guide and porters are customary and entirely your choice.",
  ],
  permitsLabel: "Sagarmatha National Park + trekking permits",
  regionLabel: "Everest Region (Khumbu)",
  startLabel: "Kathmandu → Lukla → Namche → Khumjung → Everest View Hotel → Tengboche → Lukla → Kathmandu",
  flightTitle: "Kathmandu ↔ Lukla flights",
  notesTitle: "Flights & buffer days",
  luklaNoteTitle: "Lukla flight information",
  aboutTitle: "About the Everest Panorama Trek",
  whyTitle: "Why travel with Ambition Holidays",
  mapBody:
    "Schematic route — not to scale. Kathmandu → Lukla → Phakding → Namche Bazaar → Khumjung Village → Everest View Hotel → Tengboche → Monjo → Lukla → Kathmandu. Dashed lines indicate flights. Does not include Everest Base Camp, Gorak Shep, Kala Patthar, Dingboche or Lobuche.",
  weatherNote:
    "Month-by-month Khumbu reference temperatures for planning — not a live forecast. Syangboche and Tengboche can be colder or windier than Namche on the same day.",
  metaTitle: "Everest Panorama Trek – 11 Days | Ambition Holidays",
  metaDescription:
    "Discover Nepal's Everest Panorama Trek on an 11-day Himalayan journey through Namche Bazaar, Khumjung Village, Everest View Hotel and Tengboche, with Kathmandu sightseeing and spectacular mountain scenery.",
  metaKeywords:
    "Everest Panorama Trek, Everest Panorama Trek 11 Days, Everest Panorama Trek Nepal, Everest View Hotel Trek, Khumjung Village Trek, Namche Bazaar Trek, Tengboche Monastery Trek, Luxury Trekking in Nepal",
  focusKeyword: "Everest Panorama Trek",
  ogTitle: "Everest Panorama Trek – 11 Days | Ambition Holidays",
  ogDescription:
    "Eleven days from Kathmandu through the Khumbu — Namche, Khumjung, Everest View Hotel and Tengboche. Request availability with Ambition Holidays.",
  ogImageSrc: HERO,
  tripadvisorLabel: "Tripadvisor",
  tripadvisorScore: "",
  tripadvisorCount: "View reviews",
  tripadvisorHref: "",
  googleLabel: "Google",
  googleScore: "",
  googleCount: "View on Google",
  googleHref: "",
  googleLogoSrc: "",
  tripadvisorLogoSrc: "/images/reviews/tripadvisor-owl.png",
  watchVideo: {
    id: "ept-watch",
    title: "",
    subtitle: "",
    duration: "",
    imageSrc: "",
    imageAlt: "",
    videoSrc: "",
  },
  videoReviews: [],
  reviews: [],
  tripInfoTitle: "Everest Panorama Trek – Trip information",
  tripInfo: [
    {
      id: "ti-duration",
      title: "Duration",
      body: "11 days / 10 nights from arrival in Kathmandu through departure, including two Kathmandu hotel blocks, eight trekking nights and domestic flights on Days 3 and 9 when included on your quote.",
    },
    {
      id: "ti-dest",
      title: "Destination & style",
      body: "Everest Region (Khumbu), Nepal — cultural sightseeing in Kathmandu plus guided lodge trekking. Not an Everest Base Camp itinerary.",
    },
    {
      id: "ti-alt",
      title: "Maximum altitude",
      body: "Approximately 3,880 m at the Everest View Hotel area; Tengboche approximately 3,860 m. Altitudes are approximate reference points.",
    },
    {
      id: "ti-acc",
      title: "Accommodation",
      body: "Hotels in Kathmandu on city nights; mountain lodges on trekking nights; Everest View Hotel on Day 5 when confirmed at booking.",
    },
    {
      id: "ti-transport",
      title: "Transportation",
      body: "Private airport transfers in Kathmandu when included; domestic flights Kathmandu ↔ Lukla; walking between trail villages.",
    },
    {
      id: "ti-meals",
      title: "Meals",
      body: "Follow the board basis on your confirmation — typically breakfast in Kathmandu and fuller board on trekking days when included.",
    },
    {
      id: "ti-permits",
      title: "Permits & crew",
      body: "Sagarmatha National Park and trekking permits arranged when included. Licensed guide and porter support per your confirmed package.",
    },
    {
      id: "ti-season",
      title: "Best seasons",
      body: "March–May and September–November are the usual windows for Khumbu trekking and Lukla operations.",
    },
    {
      id: "ti-fitness",
      title: "Fitness & insurance",
      body: "Moderate trekking fitness recommended. Comprehensive travel insurance with evacuation cover is strongly recommended.",
    },
    {
      id: "ti-price",
      title: "Pricing & departures",
      body: "Request availability for current pricing, private departures and group size. Published rates apply only when shown on your written quote.",
    },
  ],
  optionalAddons: [],
  includeNote: EVEREST_PANORAMA_INCLUDE_NOTE,
  luklaNote: EVEREST_PANORAMA_LUKLA_NOTE,
  reviewsWallpaperSrc: "/images/atmosphere/ebc-premium-section.webp",
  slugHistory: [],
};

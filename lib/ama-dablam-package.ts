import type { TrekPackage } from "./trip-packages";
import {
  AMA_DABLAM_ABOUT_LEAD,
  AMA_DABLAM_ABOUT_SECTIONS,
  AMA_DABLAM_EXCLUSIONS,
  AMA_DABLAM_INCLUDE_NOTE,
  AMA_DABLAM_INCLUSIONS,
  AMA_DABLAM_ITINERARY,
  AMA_DABLAM_ITINERARY_INTRO,
  AMA_DABLAM_JOURNEY_STAGES,
  AMA_DABLAM_LUKLA_NOTE,
  AMA_DABLAM_SLUG,
} from "./ama-dablam-content";
import {
  AMA_DABLAM_GROUP_PRICES,
  AMA_DABLAM_LUXURY_EXPERIENCE,
  AMA_DABLAM_PRICING_DISCLAIMER,
} from "./ama-dablam-luxury-content";

const HERO = "/images/journeys/j-gokyo.webp";

export const AMA_DABLAM_TRIP_PACKAGE: TrekPackage = {
  id: "adb-lux",
  catalogId: "ama-dablam-lux",
  slug: AMA_DABLAM_SLUG,
  country: "nepal",
  status: "published",
  featured: true,
  badge: "PRIVATE HIMALAYAN JOURNEYS",
  title: "Ama Dablam Base Camp Luxury Trek – 12 Days",
  subtitle:
    "Journey into the heart of the Khumbu on a private trekking experience beneath Ama Dablam, one of Nepal’s most recognisable Himalayan peaks. Follow the classic trail through Namche Bazaar and Tengboche, discover Sherpa village life in Pangboche, and make a memorable excursion to Ama Dablam Base Camp, surrounded by dramatic mountain scenery.",
  duration: "12 Days / 11 Nights",
  days: 12,
  difficulty: "Challenging",
  destination: "Khumbu, Everest Region, Nepal",
  maxAltitude: "Ama Dablam Base Camp area — approx. 4,600 m (Day 7 excursion)",
  maxAltitudeFt: "15,092 ft",
  countryLabel: "Nepal",
  activityLabel: "Private luxury trekking",
  accommodationLabel:
    "Confirmed Kathmandu accommodation + best suitable mountain lodges on trekking nights, subject to availability",
  mealsLabel: "As per confirmed board basis on your signed confirmation",
  startEndLabel: "Kathmandu",
  groupSize: "Private parties — enquire for dates and group size",
  bestSeason: "March–May · September–November (weather dependent)",
  priceUsd: 0,
  groupPrices: [...AMA_DABLAM_GROUP_PRICES],
  pricingDisclaimer: AMA_DABLAM_PRICING_DISCLAIMER,
  luxuryExperience: AMA_DABLAM_LUXURY_EXPERIENCE,
  overview:
    "This twelve-day private trek follows the established Khumbu corridor from Lukla through Namche Bazaar, Tengboche and Pangboche, with a guided high excursion toward Ama Dablam Base Camp. Luxury here means private coordination, experienced guiding, planned acclimatisation and the best suitable accommodation available at each stop — not easy terrain or five-star facilities in every mountain village.\n\nThe route does not continue to Everest Base Camp, Kala Patthar, Gorak Shep, Dingboche or Lobuche. Mountain views, flight operations and lodge availability depend on season and weather. Commercial rates are confirmed on your signed quotation.",
  highlights: [
    "Trekking through the Khumbu and Everest region on private guiding",
    "Acclimatisation day in Namche Bazaar with a guided viewpoint walk when conditions allow",
    "Panoramic Himalayan viewpoints when visibility permits — never guaranteed daily",
    "Tengboche and its cultural significance — monastery visit when open",
    "Sherpa village experience in Pangboche",
    "Excursion toward Ama Dablam Base Camp — demanding, guide-led, subject to safety and weather",
    "Private guiding and personal trip coordination",
    "Carefully selected accommodation where available, confirmed in writing",
  ],
  inclusions: AMA_DABLAM_INCLUSIONS,
  exclusions: AMA_DABLAM_EXCLUSIONS,
  gallery: [
    HERO,
    "/images/nepal/nepal-trek-ebc.webp",
    "/images/journeys/j-ebc.webp",
    "/images/nepal/nepal-cover.webp",
  ],
  tripGalleryTitle: "Ama Dablam Base Camp Luxury Trek Gallery",
  galleryAlts: [
    "Ama Dablam and Himalayan ridges above the Khumbu",
    "Trail and prayer flags in the Everest region",
    "Suspension bridge and forest trail in the Khumbu",
    "Kathmandu Valley at the start or end of the journey",
  ],
  heroSrc: HERO,
  heroAlt: "Snow peaks and ridgelines in the Khumbu on the Ama Dablam Base Camp Luxury Trek",
  altitudeChartM: "",
  altitudeChartFt: "",
  altitudeGainSrc: "",
  routeMapSrc: "",
  weatherDailySrc: "",
  weatherMonthlySrc: "",
  routeMapFile: "ama-dablam-base-camp-luxury-trek-route-map",
  altitudeMFile: "ama-dablam-base-camp-luxury-trek-altitude-meters",
  altitudeFtFile: "ama-dablam-base-camp-luxury-trek-altitude-feet",
  weatherDailyFile: "ama-dablam-base-camp-luxury-trek-daily-temperature",
  weatherMonthlyFile: "ama-dablam-base-camp-luxury-trek-monthly-temperature",
  itineraryIntro: AMA_DABLAM_ITINERARY_INTRO,
  itinerary: AMA_DABLAM_ITINERARY,
  journeyTitle: "The Journey",
  journeySubheading: "From Kathmandu to the Foot of Ama Dablam",
  journeyIntro:
    "Begin in Kathmandu with briefing and preparation, then fly to Lukla when operations allow and walk the Dudh Koshi toward Namche Bazaar. A full acclimatisation day in Namche prepares you for higher trails to Tengboche and Pangboche.\n\nFrom Pangboche, an early start leads toward the rugged base camp area beneath Ama Dablam — a highlight of the trek and a demanding high-altitude day. The return follows familiar Khumbu trails through Namche and Lukla before the flight back to Kathmandu and a flexible leisure day ahead of departure.",
  journeyStages: AMA_DABLAM_JOURNEY_STAGES,
  aboutLead: AMA_DABLAM_ABOUT_LEAD,
  aboutSections: AMA_DABLAM_ABOUT_SECTIONS,
  faqs: [
    {
      q: "Is this an Everest Base Camp trek?",
      a: "No. The itinerary visits Namche, Tengboche, Pangboche and makes an excursion toward Ama Dablam Base Camp. It does not include Everest Base Camp, Gorak Shep, Kala Patthar, Dingboche or Lobuche.",
    },
    {
      q: "Do we climb Ama Dablam?",
      a: "No. This is a trekking package to the base camp area. Summiting Ama Dablam requires separate expedition permits, technical climbing and logistics.",
    },
    {
      q: "Will everyone reach the exact base camp point on Day 7?",
      a: "Not necessarily. The excursion is guide-led and depends on weather, trail conditions, fitness and altitude response. The guide may shorten, modify or cancel the walk for safety.",
    },
    {
      q: "What makes this a luxury trek?",
      a: "Private coordination, licensed guiding, planned acclimatisation and the best suitable lodges available — not guaranteed five-star facilities in remote villages.",
    },
    {
      q: "What accommodation should I expect?",
      a: "Confirmed Kathmandu hotels on included city nights and the best suitable mountain lodges on trekking nights. Ensuite rooms and heating are not guaranteed every night in the Khumbu.",
    },
    {
      q: "Are Kathmandu–Lukla flights included?",
      a: "Return flights are included when listed on your signed confirmation. All sectors are weather- and operations-dependent.",
    },
    {
      q: "How difficult is the trek?",
      a: "Challenging: sustained ascent to Namche, higher nights at Tengboche and Pangboche, and a demanding Day 7 excursion toward approximately 4,600 m.",
    },
    {
      q: "What travel insurance is required?",
      a: "Comprehensive insurance with high-altitude trekking and emergency evacuation cover is strongly recommended. This page is not medical advice.",
    },
    {
      q: "What is included in the price?",
      a: "See Includes and Not included on this page. Only services on your signed confirmation are guaranteed.",
    },
    {
      q: "How do I get a private quotation?",
      a: "Use Check availability or Inquire on this page, or contact Ambition Holidays with dates, traveller count and room preferences.",
    },
  ],
  whyItems: [
    {
      title: "Private Khumbu expertise",
      body: "Coordinators and guides who know Namche, Pangboche and realistic lodge conditions on the Ama Dablam approach trails.",
    },
    {
      title: "Honest altitude planning",
      body: "Acclimatisation in Namche and a safety-first approach to the base camp excursion.",
    },
    {
      title: "Clear confirmations",
      body: "Written detail for flights, lodge nights and inclusions before you travel.",
    },
    {
      title: "Respectful cultural travel",
      body: "Guidance for monastery visits and Sherpa communities along the trail.",
    },
    {
      title: "Responsive support",
      body: "One coordinator line for delays, health concerns and itinerary questions in Nepal.",
    },
    {
      title: "Responsible trekking",
      body: "Porter welfare, leave-no-trace practices and realistic expectations about mountain weather.",
    },
  ],
  weatherBody:
    "Spring and autumn are generally preferred trekking seasons in the Khumbu, though wind, cloud, cold nights and flight cancellations still occur. Winter brings colder temperatures at Namche and Pangboche. Monsoon months increase rain on lower trails and aviation disruption. Clear skies and uninterrupted views are never guaranteed.",
  altitudeBody:
    "The trek climbs to Namche (~3,440 m), Tengboche (~3,860 m) and Pangboche (~3,930–3,985 m). Day 7 adds a high excursion toward ~4,600 m at Ama Dablam Base Camp — separate from overnight elevations. Report headache, nausea, dizziness or unusual fatigue to your guide immediately; descent is the correct response to serious altitude illness. This is practical guidance, not medical advice.",
  packingIntro:
    "Pack for valley warmth, lodge cold mornings and a demanding high day. Broken-in boots, layered clothing and waterproof shells are essential.",
  packingItems: [],
  packingGroups: [
    {
      id: "adb-core",
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
      id: "adb-foot",
      title: "Footwear & carry",
      items: [
        "Waterproof trekking boots",
        "Trekking socks",
        "Daypack with rain cover",
        "Trekking poles (recommended for descent)",
        "Reusable water bottles — hydration is critical",
      ],
    },
    {
      id: "adb-kit",
      title: "Essentials",
      items: [
        "Sunglasses and high-SPF sunscreen",
        "Headlamp and spare batteries",
        "Personal medication and basic first-aid supplies",
        "Toiletries and hand sanitiser",
        "Passport, permits copy, insurance and emergency contacts",
        "Power bank for lodges with limited charging",
      ],
    },
  ],
  suitableBody:
    "Fit trekkers seeking Ama Dablam scenery and Sherpa culture without an Everest Base Camp commitment. Prior hill walking with a loaded daypack helps for Namche and the Day 7 excursion.",
  trainingBody:
    "Train on hills or stairs with a daypack for several weeks before travel. Practice consecutive walking days to mirror trekking blocks in the Khumbu.",
  khumbuBody:
    "The Khumbu links Lukla, the Dudh Koshi, Namche and the main trail toward Tengboche and Pangboche — the gateway valleys for views of Ama Dablam. This itinerary explores that corridor without continuing to the Everest glacier camps.",
  flightBody: AMA_DABLAM_LUKLA_NOTE,
  bufferBody:
    "Allow buffer time on international tickets around both Lukla sectors. Day 11 in Kathmandu provides flexibility if domestic flights were delayed.",
  heliBody:
    "Helicopter charter may be arranged separately for emergencies or private returns when weather allows — quoted apart from the standard walking package.",
  beforeItems: [
    "Travel insurance with helicopter evacuation cover is strongly recommended.",
    "The Day 7 excursion is demanding — discuss fitness and altitude history with your coordinator.",
    "Tips for guide and porters are customary and entirely your choice.",
  ],
  permitsLabel: "Sagarmatha National Park + local trekking permits",
  regionLabel: "Khumbu (Everest Region)",
  startLabel:
    "Kathmandu → Lukla → Phakding → Namche → Tengboche → Pangboche → Ama Dablam BC excursion → Lukla → Kathmandu",
  flightTitle: "Kathmandu ↔ Lukla flights",
  notesTitle: "Flights & buffer days",
  luklaNoteTitle: "Lukla flight information",
  aboutTitle: "About the Ama Dablam Base Camp Luxury Trek",
  whyTitle: "Why travel with Ambition Holidays",
  mapBody:
    "Schematic route — not to scale. Kathmandu → Lukla → Phakding → Namche Bazaar → Tengboche → Pangboche → Ama Dablam Base Camp (Day 7 excursion) → return via Namche and Lukla → Kathmandu. Dashed lines indicate flights. Does not include Everest Base Camp, Kala Patthar, Gorak Shep, Dingboche or Lobuche.",
  weatherNote:
    "Month-by-month Khumbu reference temperatures for planning — not a live forecast. Higher ridges and the base camp excursion can be colder or windier than Namche on the same day.",
  metaTitle: "Ama Dablam Base Camp Luxury Trek – 12 Days | Ambition Holidays",
  metaDescription:
    "Explore the Ama Dablam Base Camp Luxury Trek in 12 days, with private guiding, Sherpa village experiences, Namche acclimatisation and spectacular views of one of Nepal’s most iconic Himalayan peaks.",
  metaKeywords:
    "Ama Dablam Base Camp Luxury Trek, Ama Dablam Base Camp Trek 12 Days, Luxury Ama Dablam Trek Nepal, Ama Dablam Base Camp Nepal, Private Ama Dablam Trek, Luxury Trekking in the Everest Region, Pangboche Trek Nepal, Khumbu Valley Luxury Trek, Ama Dablam Trekking Package",
  focusKeyword: "Ama Dablam Base Camp Luxury Trek",
  ogTitle: "Ama Dablam Base Camp Luxury Trek – 12 Days | Ambition Holidays",
  ogDescription:
    "Follow a private Himalayan journey through Namche Bazaar, Tengboche and Pangboche to the spectacular base camp beneath Ama Dablam.",
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
    id: "adb-watch",
    title: "",
    subtitle: "",
    duration: "",
    imageSrc: "",
    imageAlt: "",
    videoSrc: "",
  },
  videoReviews: [],
  reviews: [],
  tripInfoTitle: "Ama Dablam Base Camp Luxury Trek – Trip Information",
  tripInfo: [
    {
      id: "ti-duration",
      title: "Duration",
      body: "12 days / 11 nights from arrival in Kathmandu through departure, subject to final accommodation and flight schedule.",
    },
    {
      id: "ti-dest",
      title: "Destination & style",
      body: "Khumbu, Everest Region, Nepal — private luxury trekking. Not an Everest Base Camp or Ama Dablam summit expedition.",
    },
    {
      id: "ti-alt",
      title: "Highest elevation",
      body: "Approximately 4,600 m on the Day 7 base camp excursion; overnight elevations are lower. Figures are approximate.",
    },
    {
      id: "ti-walk",
      title: "Walking days",
      body: "Eight main trekking days plus acclimatisation in Namche and a flexible leisure day in Kathmandu, per the confirmed itinerary.",
    },
    {
      id: "ti-acc",
      title: "Accommodation",
      body: "Confirmed Kathmandu accommodation on included city nights; best suitable mountain lodges on trekking nights, subject to availability.",
    },
    {
      id: "ti-meals",
      title: "Meal plan",
      body: "Follow the board basis on your signed confirmation — typically breakfast in Kathmandu and fuller board on trekking days when included.",
    },
    {
      id: "ti-flights",
      title: "Domestic flights",
      body: "Kathmandu ↔ Lukla sectors when included — weather- and operations-dependent.",
    },
    {
      id: "ti-permits",
      title: "Required permits",
      body: "Sagarmatha National Park and applicable local permits arranged when included on your quote.",
    },
    {
      id: "ti-season",
      title: "Best seasons",
      body: "Spring and autumn are generally preferred; exact conditions vary by week.",
    },
    {
      id: "ti-fitness",
      title: "Fitness expectations",
      body: "Challenging trekking fitness recommended, especially for Namche ascent and the Day 7 excursion.",
    },
    {
      id: "ti-insurance",
      title: "Travel insurance",
      body: "Comprehensive cover including high-altitude trekking and emergency evacuation is strongly recommended.",
    },
    {
      id: "ti-booking",
      title: "Booking & cancellation",
      body: "Payment terms and cancellation policy are stated on your written confirmation.",
    },
  ],
  optionalAddons: [],
  includeNote: AMA_DABLAM_INCLUDE_NOTE,
  luklaNote: AMA_DABLAM_LUKLA_NOTE,
  reviewsWallpaperSrc: "/images/atmosphere/ebc-premium-section.webp",
  slugHistory: [],
};

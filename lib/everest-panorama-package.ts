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
import {
  EVEREST_PANORAMA_GROUP_PRICES,
  EVEREST_PANORAMA_LUXURY_EXPERIENCE,
  EVEREST_PANORAMA_PRICING_DISCLAIMER,
} from "./everest-panorama-luxury-content";

const HERO = "/images/journeys/j-ebc.webp";

export const EVEREST_PANORAMA_TRIP_PACKAGE: TrekPackage = {
  id: "ept-pan",
  catalogId: "everest-panorama",
  slug: EVEREST_PANORAMA_SLUG,
  country: "nepal",
  status: "published",
  featured: true,
  badge: "PRIVATE LUXURY TREK",
  title: "Everest Panorama Luxury Trek – 11 Days",
  subtitle:
    "Private Himalayan journeys, exceptional mountain panoramas and carefully considered comfort in the heart of the Khumbu.",
  duration: "11 Days / 10 Nights",
  days: 11,
  difficulty: "Moderate",
  destination: "Everest Region, Nepal",
  maxAltitude: "Everest viewpoint area — approx. 3,880 m",
  maxAltitudeFt: "12,730 ft",
  countryLabel: "Nepal",
  activityLabel: "Private luxury trekking",
  accommodationLabel:
    "Premium city accommodation + carefully selected upgraded mountain lodges; premium mountain-view night when confirmed",
  mealsLabel: "As per confirmed board basis on your signed confirmation",
  startEndLabel: "Kathmandu",
  groupSize: "Private parties — enquire for dates and group size",
  bestSeason: "March–May · September–November (weather dependent)",
  priceUsd: 0,
  groupPrices: [...EVEREST_PANORAMA_GROUP_PRICES],
  pricingDisclaimer: EVEREST_PANORAMA_PRICING_DISCLAIMER,
  luxuryExperience: EVEREST_PANORAMA_LUXURY_EXPERIENCE,
  overview:
    "Discover the Everest region at a thoughtful pace, from Kathmandu's cultural heritage to Sherpa villages, forested trails, peaceful monasteries and sweeping Himalayan viewpoints. Enjoy private guiding, carefully selected accommodation and personalised trip coordination throughout your journey.\n\nThis is not an Everest Base Camp trek. The walking line stays in the lower and middle Khumbu. Mountain views, flight operations and accommodation availability depend on season and weather — your coordinator confirms commercial details on your signed confirmation.",
  highlights: [
    "Private luxury trekking for your confirmed booking party",
    "Premium city accommodation in Kathmandu on included nights",
    "Private Kathmandu heritage experience with transportation where included",
    "Scenic flight to Lukla — subject to weather and airline operations",
    "Dudh Koshi River trails and suspension bridges",
    "Namche Bazaar — Sherpa trading centre and acclimatization hub",
    "Khumjung Village when trail conditions allow",
    "Premium mountain-view overnight in the Everest viewpoint area when confirmed",
    "Tengboche Monastery visit subject to opening hours",
    "Personalised trip coordination from arrival to departure",
  ],
  inclusions: EVEREST_PANORAMA_INCLUSIONS,
  exclusions: EVEREST_PANORAMA_EXCLUSIONS,
  gallery: [
    HERO,
    "/images/nepal/nepal-trek-ebc.webp",
    "/images/journeys/j-gokyo.webp",
    "/images/nepal/nepal-cover.webp",
  ],
  tripGalleryTitle: "Everest Panorama Luxury Trek Gallery",
  galleryAlts: [
    "Himalayan peaks above the Khumbu valley",
    "Forest trail and prayer flags in the Everest region",
    "Snow peaks and ridge light in the Khumbu",
    "Kathmandu Valley cultural scenery",
  ],
  heroSrc: HERO,
  heroAlt: "Himalayan panorama above the Khumbu on the Everest Panorama Luxury Trek",
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
    "The Everest Panorama Luxury Trek begins in Kathmandu, where centuries-old temples, traditional neighbourhoods and everyday city life introduce Nepal's cultural richness. After a private heritage day in the valley, the journey continues with a scenic flight to Lukla and the first steps along the trails of the Everest region.\n\nThe trail follows the Dudh Koshi River through mountain settlements towards Namche Bazaar. From here, the journey continues through Khumjung Village to a premium mountain-view night in the Everest viewpoint area when confirmed on your booking.\n\nThe route leads towards Tengboche before descending through Monjo to Lukla. After the return flight to Kathmandu, a leisure day provides time to rest before departure.",
  journeyStages: EVEREST_PANORAMA_JOURNEY_STAGES,
  aboutLead: EVEREST_PANORAMA_ABOUT_LEAD,
  aboutSections: EVEREST_PANORAMA_ABOUT_SECTIONS,
  faqs: [
    {
      q: "What makes this a luxury trek?",
      a: "Private guiding for your party, premium city accommodation, carefully selected upgraded mountain lodges, personalised trip coordination and thoughtful pacing — rather than a budget group departure or mass-market schedule.",
    },
    {
      q: "Is this Everest Base Camp?",
      a: "No. The itinerary stays in the lower and middle Khumbu with panoramic viewpoints. It does not continue to Everest Base Camp, Gorak Shep or Kala Patthar.",
    },
    {
      q: "What accommodation standard should guests expect?",
      a: "Premium city accommodation in Kathmandu and the best suitable upgraded mountain lodges on trekking nights, subject to availability. Mountain nights are more basic than city nights; ensuite facilities and heating are not guaranteed every night.",
    },
    {
      q: "Are individual lodge or hotel names provided?",
      a: "No property names are published on this page. Your signed confirmation states the confirmed accommodation plan, room categories and overnight locations.",
    },
    {
      q: "Are private guides included?",
      a: "A licensed private trekking guide is included when stated on your signed confirmation. Porter support follows the confirmed service ratio for your group size.",
    },
    {
      q: "What meals are included?",
      a: "Meals follow the board basis on your signed confirmation — typically breakfast in Kathmandu and fuller board on trekking days when included. Beverages and speciality items outside the plan are excluded unless stated.",
    },
    {
      q: "Are Kathmandu–Lukla flights included?",
      a: "Return domestic flights are included when listed on your signed confirmation. All sectors are weather- and operations-dependent.",
    },
    {
      q: "What happens if flights are delayed?",
      a: "Delays and cancellations are common. Your coordinator assists with rebooking when airlines permit. Extra nights, meals and transport costs follow your booking terms and insurance policy unless explicitly covered.",
    },
    {
      q: "Is a helicopter upgrade available?",
      a: "Helicopter charter may be arranged separately for emergencies or private returns when weather allows — quoted apart from the standard walking package.",
    },
    {
      q: "How difficult is the trek?",
      a: "Moderate: several days of walking on stone steps and valley trails with significant ascent into Namche and higher nights in the viewpoint area and at Tengboche. Prior hill walking helps.",
    },
    {
      q: "What is the maximum altitude?",
      a: "Approximately 3,880 m in the Everest viewpoint accommodation area; Tengboche is approximately 3,860 m. Figures are approximate reference points.",
    },
    {
      q: "What fitness level is required?",
      a: "Moderate trekking fitness with practice on hills or stairs carrying a daypack. Altitude affects everyone differently — communicate openly with your guide.",
    },
    {
      q: "What is the best season?",
      a: "Spring (March–May) and autumn (September–November) are the usual windows. Weather, cloud and flight operations still vary week by week.",
    },
    {
      q: "What travel insurance is required?",
      a: "Comprehensive travel insurance with high-altitude trekking and emergency evacuation cover is strongly recommended and may be required on your confirmation. Evacuation is not included in the package price.",
    },
    {
      q: "Are solo travellers accepted?",
      a: "Yes — solo travellers are welcome. Per-person rates vary by group size; see the private group pricing table or request a quotation.",
    },
    {
      q: "How does group pricing work?",
      a: "Published rates are per person in USD and decrease as party size increases. Final pricing depends on dates, accommodation availability and the confirmed service plan.",
    },
    {
      q: "Can the itinerary be customised?",
      a: "Private departures can be adjusted within operational limits. Discuss preferred dates, pacing and optional experiences with your coordinator.",
    },
    {
      q: "What if premium accommodation is unavailable?",
      a: "Your coordinator offers the best available alternative at the same stop or adjusts the plan with your agreement. Mountain availability changes quickly in season.",
    },
    {
      q: "What is included and excluded from the price?",
      a: "See the Includes and Not included sections on this page. Only items on your signed confirmation are guaranteed.",
    },
    {
      q: "How can guests request a private quotation?",
      a: "Use Plan Your Private Journey or the availability form on this page, or contact Ambition Holidays with dates, traveller count and room preferences.",
    },
  ],
  whyItems: [
    {
      title: "Private journey design",
      body: "We align sightseeing, flights and lodge nights with your dates and pace — not a fixed mass departure list.",
    },
    {
      title: "Local destination knowledge",
      body: "Guides and coordinators who work the Khumbu trail regularly and explain realistic lodge and flight conditions.",
    },
    {
      title: "Clear pre-trip communication",
      body: "Written confirmation for Lukla flights, mountain nights and inclusions before you travel.",
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
    "Spring and autumn generally offer the most stable trekking weather in the Khumbu, though wind, cloud and cold nights still vary by week. Winter brings colder temperatures at Namche and Tengboche. Monsoon months raise humidity, rain on lower trails and flight-cancellation risk. Clear skies, specific temperatures and uninterrupted flights are never guaranteed.",
  altitudeBody:
    "The itinerary climbs gradually to Namche (~3,440 m), then higher nights at Khumjung, the Everest viewpoint area (~3,880 m) and Tengboche (~3,860 m) before descending. Drink steadily, eat regularly and report persistent headache, nausea or dizziness to your guide. This section is practical guidance, not medical advice — descent is the correct response to serious altitude illness.",
  packingIntro:
    "Pack for warm valley afternoons and cold lodge mornings in the same week. Broken-in boots, layered clothing and a reliable waterproof shell matter more than extra gadgets.",
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
      items: [
        "Waterproof trekking boots",
        "Trekking socks",
        "Daypack",
        "Trekking poles (optional)",
        "Reusable water bottle",
      ],
    },
    {
      id: "ept-kit",
      title: "Essentials",
      items: [
        "Sunglasses and high-SPF sunscreen",
        "Headlamp and spare batteries",
        "Personal medication and basic first-aid supplies",
        "Toiletries",
        "Passport, travel documents and insurance details",
        "Charging equipment and power bank",
      ],
    },
  ],
  suitableBody:
    "Travellers who want Everest-region culture and panoramas within eleven days without a Base Camp commitment. Prior hill walking helps for the Namche climb and higher ridge nights.",
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
    "Premium mountain-view nights require advance confirmation — do not assume availability from website text alone.",
    "Tips for guide and porters are customary and entirely your choice.",
  ],
  permitsLabel: "Sagarmatha National Park + trekking permits",
  regionLabel: "Everest Region (Khumbu)",
  startLabel: "Kathmandu → Lukla → Phakding → Namche → Khumjung → Everest viewpoint area → Tengboche → Lukla → Kathmandu",
  flightTitle: "Kathmandu ↔ Lukla flights",
  notesTitle: "Flights & buffer days",
  luklaNoteTitle: "Lukla flight information",
  aboutTitle: "About the Everest Panorama Luxury Trek",
  whyTitle: "Why travel with Ambition Holidays",
  mapBody:
    "Schematic route — not to scale. Kathmandu → Lukla → Phakding → Namche Bazaar → Khumjung Village → Everest viewpoint area → Tengboche → Monjo → Lukla → Kathmandu. Dashed lines indicate flights. Does not include Everest Base Camp, Gorak Shep, Kala Patthar, Dingboche or Lobuche.",
  weatherNote:
    "Month-by-month Khumbu reference temperatures for planning — not a live forecast. Higher ridges can be colder or windier than Namche on the same day.",
  metaTitle: "Everest Panorama Luxury Trek – 11 Days | Ambition Holidays",
  metaDescription:
    "Discover the Everest Panorama Luxury Trek in 11 days with private guiding, carefully selected mountain accommodation, premium Kathmandu stays and panoramic Khumbu views.",
  metaKeywords:
    "Everest Panorama Luxury Trek, Luxury Everest Panorama Trek, Everest View Luxury Trek, Private Everest Region Trek, Luxury Trekking in Nepal, 11 Day Everest Panorama Trek, Premium Khumbu Trek, Private Luxury Trek Nepal",
  focusKeyword: "Everest Panorama Luxury Trek",
  ogTitle: "Everest Panorama Luxury Trek – 11 Days | Ambition Holidays",
  ogDescription:
    "Eleven-day private luxury trek in the Khumbu — Namche, Khumjung, Everest viewpoints and Tengboche. Plan your private journey with Ambition Holidays.",
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
  tripInfoTitle: "Everest Panorama Luxury Trek – Trip Information",
  tripInfo: [
    {
      id: "ti-duration",
      title: "Duration",
      body: "11 days / 10 nights from arrival in Kathmandu through departure, subject to confirmation against the final accommodation plan.",
    },
    {
      id: "ti-dest",
      title: "Destination & style",
      body: "Everest Region (Khumbu), Nepal — private luxury trekking with cultural sightseeing in Kathmandu. Not an Everest Base Camp itinerary.",
    },
    {
      id: "ti-alt",
      title: "Maximum altitude",
      body: "Approximately 3,880 m in the Everest viewpoint accommodation area; Tengboche approximately 3,860 m. Altitudes are approximate reference points.",
    },
    {
      id: "ti-acc",
      title: "Accommodation",
      body: "Premium city accommodation on Kathmandu nights; best available upgraded mountain lodges on trekking nights; premium mountain-view night when confirmed on your booking. Upgrades depend on availability.",
    },
    {
      id: "ti-transport",
      title: "Transportation",
      body: "Private airport transfers in Kathmandu when included; domestic flights Kathmandu ↔ Lukla; walking between trail villages.",
    },
    {
      id: "ti-meals",
      title: "Meals",
      body: "Follow the board basis on your signed confirmation — typically breakfast in Kathmandu and fuller board on trekking days when included.",
    },
    {
      id: "ti-permits",
      title: "Permits & crew",
      body: "Sagarmatha National Park and trekking permits arranged when included. Licensed private guide and porter support per your confirmed package.",
    },
    {
      id: "ti-season",
      title: "Best seasons",
      body: "March–May and September–November are the usual windows; exact dates depend on weather, trail conditions and flight operations.",
    },
    {
      id: "ti-fitness",
      title: "Fitness & insurance",
      body: "Moderate trekking fitness recommended. Comprehensive travel insurance with evacuation cover is strongly recommended.",
    },
    {
      id: "ti-booking",
      title: "Booking & payment",
      body: "Confirm dates, group size and room preferences with your coordinator. Payment terms and cancellation policy are stated on your written confirmation.",
    },
    {
      id: "ti-emergency",
      title: "Emergency contact",
      body: "Your guide and trip coordinator are the first points of contact on the trail. Keep insurance emergency numbers accessible. Evacuation is not automatically included in the package price.",
    },
  ],
  optionalAddons: [],
  includeNote: EVEREST_PANORAMA_INCLUDE_NOTE,
  luklaNote: EVEREST_PANORAMA_LUKLA_NOTE,
  reviewsWallpaperSrc: "/images/atmosphere/ebc-premium-section.webp",
  slugHistory: [],
};

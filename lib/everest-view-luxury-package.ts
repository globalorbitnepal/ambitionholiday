import type { TrekPackage } from "./trip-packages";
import {
  EVEREST_VIEW_ADDONS,
  EVEREST_VIEW_EXCLUSIONS,
  EVEREST_VIEW_INCLUDE_NOTE,
  EVEREST_VIEW_INCLUSIONS,
  EVEREST_VIEW_ITINERARY,
  EVEREST_VIEW_ITINERARY_INTRO,
  EVEREST_VIEW_LUKLA_NOTE,
  EVEREST_VIEW_SLUG,
} from "./everest-view-luxury-content";

const HERO = "/images/journeys/j-ebc.webp";

export const EVEREST_VIEW_LUXURY_TRIP_PACKAGE: TrekPackage = {
  id: "evl-lux",
  catalogId: "everest-view-lux",
  slug: EVEREST_VIEW_SLUG,
  country: "nepal",
  status: "published",
  featured: true,
  badge: "PRIVATE EVEREST REGION EXPERIENCE",
  title: "Everest View Luxury Trek – 7 Days",
  subtitle:
    "Experience the Everest Region, Sherpa Culture and Spectacular Himalayan Views — a private seven-day journey to Namche Bazaar, Khumjung Village and Syangboche ridge area, without trekking to Everest Base Camp.",
  duration: "7 Days / 6 Nights",
  days: 7,
  difficulty: "Moderate",
  destination: "Nepal · Everest Region",
  maxAltitude: "Syangboche ridge area — approx. 3,880 m",
  maxAltitudeFt: "12,730 ft",
  countryLabel: "Nepal",
  activityLabel: "Private Luxury Trek",
  accommodationLabel: "Mountain lodges + selected ridge-area lodge (when confirmed)",
  mealsLabel: "As per confirmed itinerary",
  startEndLabel: "Kathmandu",
  groupSize: "Private departures",
  bestSeason: "March–May · September–November",
  priceUsd: 1899,
  groupPrices: [
    { id: "p1", label: "1 Pax (solo)", priceUsd: 2999 },
    { id: "p2", label: "2–3 Pax", priceUsd: 2499 },
    { id: "p3", label: "4–5 Pax", priceUsd: 2299 },
    { id: "p4", label: "6–9 Pax", priceUsd: 2099 },
    { id: "p5", label: "10–14 Pax", priceUsd: 1899 },
  ],
  overview:
    "The Everest View Luxury Trek is designed for travellers who want the atmosphere of the Khumbu — Lukla flights, Sherpa villages, Namche Bazaar and panoramic viewpoints — within a shorter, private itinerary.\n\nOver six nights you walk the lower Everest trail: Phakding, two nights in Namche for acclimatization, Khumjung Village and a planned night in the Syangboche ridge panorama area when lodge availability is confirmed. The route then descends through Monjo and Lukla before the return flight to Kathmandu.\n\nThis is not an Everest Base Camp trek. You do not walk to Gorak Shep, Kala Patthar, Dingboche or Lobuche. Mountain views depend on season, weather and visibility. Luxury here means private guiding, thoughtful pacing, selected lodges and honest communication about what remote Khumbu accommodation can provide — not five-star resorts at every stop.",
  highlights: [
    "Scenic flight into the Everest region via Lukla, subject to weather and operational routing.",
    "Namche Bazaar — Sherpa culture, mountain-town atmosphere and acclimatization time.",
    "Dedicated acclimatization day in Namche with flexible local exploration.",
    "Khumjung Village and its monastery when open and accessible.",
    "Planned overnight in the Syangboche ridge panorama area when lodge rooms are confirmed.",
    "Himalayan panoramas when visibility allows — Everest and neighbouring peaks are never guaranteed daily.",
    "Local culture, monasteries and life in high-altitude communities along the lower Khumbu trail.",
    "Private guided experience with a pace tailored to your group.",
  ],
  inclusions: EVEREST_VIEW_INCLUSIONS,
  exclusions: EVEREST_VIEW_EXCLUSIONS,
  gallery: [
    HERO,
    "/images/nepal/nepal-trek-ebc.webp",
    "/images/journeys/j-ebc.webp",
    "/images/nepal/nepal-cover.webp",
    "/images/journeys/j-gokyo.webp",
  ],
  tripGalleryTitle: "Everest View Trek Gallery",
  galleryAlts: [
    "Trekker on a Himalayan ridge in the Everest region of Nepal",
    "Snow peaks above a Khumbu valley trail",
    "Prayer flags on a forest trail in the lower Khumbu",
    "Nepal Himalayan foothills and prayer flags",
    "Mountain flight approach toward the Everest region",
  ],
  hotelEverestViewStatus: "pending",
  hotelEverestViewAdminNote:
    "Confirm Day 4 ridge-area lodge: room category, date and rate before marking confirmed on the public page (do not publish a property name).",
  hotelEverestViewPublicNote:
    "Overnight in the Syangboche ridge panorama area is subject to confirmed lodge availability and will be stated on your booking confirmation.",
  heroSrc: HERO,
  heroAlt: "Trekker watching sunrise over Himalayan peaks near the Everest region",
  altitudeChartM: "",
  altitudeChartFt: "",
  altitudeGainSrc: "",
  routeMapSrc: "",
  weatherDailySrc: "",
  weatherMonthlySrc: "",
  routeMapFile: "everest-view-luxury-trek-route-map",
  altitudeMFile: "everest-view-luxury-trek-altitude-meters",
  altitudeFtFile: "everest-view-luxury-trek-altitude-feet",
  weatherDailyFile: "everest-view-luxury-trek-daily-temperature",
  weatherMonthlyFile: "everest-view-luxury-trek-monthly-temperature",
  itineraryIntro: EVEREST_VIEW_ITINERARY_INTRO,
  itinerary: EVEREST_VIEW_ITINERARY,
  faqs: [
    {
      q: "What is the Everest View Luxury Trek?",
      a: "A private seven-day, six-night itinerary in the lower Khumbu — Lukla, Phakding, Namche Bazaar, Khumjung and Syangboche ridge area when confirmed — without continuing to Everest Base Camp.",
    },
    {
      q: "How many days does the trek take?",
      a: "Seven days from the Kathmandu–Lukla flight through the return flight to Kathmandu, with six overnight stays on the trail.",
    },
    {
      q: "Is this trek suitable for beginners?",
      a: "Fit first-time trekkers can complete it with preparation. The itinerary lists approximate walking times of about three to seven hours on trekking days, plus a full acclimatisation day in Namche before higher ground. Prior hill walking, moderate fitness and following your guide’s altitude advice are essential.",
    },
    {
      q: "How difficult is the Everest View Trek?",
      a: "Moderate. Expect several hours of walking on stone steps and valley trails, with a significant climb into Namche and a higher overnight near Syangboche ridge area. No technical climbing.",
    },
    {
      q: "What is the highest altitude on this itinerary?",
      a: "The planned ridge-area overnight is approximately 3,880 m at the Syangboche panorama viewpoint area. Khumjung Village is approximately 3,780 m.",
    },
    {
      q: "Is acclimatization included?",
      a: "Yes. Day 3 is a dedicated acclimatisation day in Namche Bazaar (~3,440 m). Your guide may lead optional short walks (typically about two to five kilometres) to support adjustment before Day 4 toward Khumjung and the Syangboche ridge area (~3,880 m). Report headache, nausea or dizziness promptly.",
    },
    {
      q: "Will I definitely see Mount Everest?",
      a: "No. Views depend on weather, cloud and season. Clear panoramas are possible but never guaranteed on any day.",
    },
    {
      q: "Is the Day 4 ridge-area lodge night guaranteed?",
      a: "Not until the lodge, date and room category are confirmed in writing at booking. If unavailable, alternatives are agreed with you — not substituted silently.",
    },
    {
      q: "Are flights to Lukla included?",
      a: "Kathmandu ↔ Lukla flights are included when stated on your confirmed quote and itinerary. Routing via Ramechhap/Manthali may apply during some operational periods.",
    },
    {
      q: "Can Lukla flights be delayed or cancelled?",
      a: "Yes. Everest-region flights depend on weather and visibility; delays and cancellations are common. Allow buffer days on international tickets. Extra lodge nights, meals, road transfers (including Ramechhap/Manthali routing when used) and insurance claims follow your signed booking confirmation, airline rules and your travel insurance — not automatic refunds unless your documents state them.",
    },
    {
      q: "What happens if flights are disrupted?",
      a: "Your coordinator assists with rebooking when airlines permit. Extra nights, meals, ground transfers and insurance claims are handled under your booking confirmation, supplier policies and insurer — see the Flights section on this page and your written confirmation for what is and is not included.",
    },
    {
      q: "What accommodation is provided during the trek?",
      a: "Mountain lodges on most nights and Syangboche ridge area on Night 4 when confirmed. Standards vary in remote areas — private bathrooms and heating are not guaranteed every night.",
    },
    {
      q: "Are meals included?",
      a: "Meals are included only as stated on your signed booking confirmation and in the Includes list on this page (board basis per the agreed package plan). Drinks, snacks and items outside that plan are excluded unless your confirmation says otherwise. Confirm the exact meal plan with your coordinator before you travel.",
    },
    {
      q: "What permits are required?",
      a: "Sagarmatha National Park entry and applicable local trekking permits are required for this route. When permits are included in your package, Ambition Holidays arranges them for your confirmed dates. Carry your passport and permit copies on the trail.",
    },
    {
      q: "What should I pack?",
      a: "Layered clothing, waterproof shell, broken-in boots, daypack, headlamp, sun protection and personal medication. See the packing checklist on this page for a practical list.",
    },
    {
      q: "Can I book a private departure?",
      a: "Yes — this package is designed as a private guided trek. Contact us with dates and group size for a quote.",
    },
    {
      q: "Are group discounts available?",
      a: "Pricing is quoted per party size when approved rates exist. If no published price is available, request a private quote.",
    },
    {
      q: "Does this trek reach Everest Base Camp?",
      a: "No. The itinerary stops in the Namche–Khumjung–Syangboche ridge area and returns via Monjo and Lukla. It does not visit Base Camp, Kala Patthar, Gorak Shep, Dingboche or Lobuche.",
    },
    {
      q: "What fitness level is recommended?",
      a: "Comfort walking about four to six hours on uneven, stepped trails on consecutive trekking days, in line with the approximate hours shown in the itinerary. Train on hills or stairs with a daypack for several weeks before travel.",
    },
    {
      q: "How can I request a quote or customise the trip?",
      a: "Use the enquiry form on this page or contact Ambition Holidays with your preferred dates, traveller count and any Syangboche ridge area preferences.",
    },
    {
      q: "What travel insurance is required?",
      a: "Comprehensive insurance covering high-altitude trekking (to at least your highest planned overnight) and emergency helicopter evacuation is mandatory. Evacuation costs are not prepaid in the package price — your insurer coordinates rescue when a claim is approved.",
    },
    {
      q: "What is the cancellation and refund policy?",
      a: "Our published Terms and Conditions (/terms-and-conditions) state that cancellation and refund details appear there and in your booking letter. Deposit, payment schedule, notice periods and refund eligibility are confirmed in writing on your invoice before you pay — this trek page does not list percentages, deadlines or penalties. Read /terms-and-conditions and your confirmation, or ask your coordinator before payment.",
    },
    {
      q: "What happens in a medical emergency on the trail?",
      a: "Your guide coordinates descent and local emergency response. Helicopter evacuation is arranged when medically necessary and weather permits, through your travel insurer or a private charter — not as an automatic included service.",
    },
    {
      q: "What if the Syangboche ridge-area lodge is unavailable?",
      a: "Your coordinator proposes an agreed alternative (such as a confirmed lodge night in Namche or Khumjung, or a revised ridge-day plan) before you travel. We do not substitute accommodation without your approval.",
    },
  ],
  whyItems: [
    {
      title: "Lower Khumbu specialists",
      body: "Guides who know Namche pacing, Khumjung side trails and when the Syangboche ridge viewpoint is sensible — without pushing you toward Base Camp.",
    },
    {
      title: "Honest luxury",
      body: "Private logistics and selected lodges, with clear language about what remote mountain rooms can and cannot offer.",
    },
    {
      title: "Acclimatization built in",
      body: "Two nights in Namche before the higher Syangboche ridge area night — time for your body, not just photos.",
    },
    {
      title: "Flight coordination",
      body: "We track Lukla operations, Ramechhap transfers when required, and explain delay realities before you fly.",
    },
    {
      title: "Ridge lodge transparency",
      body: "The panorama-area night is highlighted on the itinerary but confirmed only when lodge rooms are secured.",
    },
    {
      title: "Private pace",
      body: "Your group sets the rhythm — cultural stops, photography and rest days negotiated with your lead guide.",
    },
  ],
  weatherBody:
    "Spring (March–May) and autumn (September–November) are the most popular Everest-region trekking seasons — generally stable walking weather, though cloud and wind still vary. Winter brings cold nights in Namche and possible snow on the Khumjung ridge. Monsoon (June–August) raises humidity, cloud and flight-cancellation risk. Khumbu reference temperatures on this page are indicative; the day you walk can be colder or clearer than averages.",
  altitudeBody:
    "You sleep twice at Namche (~3,440 m) before the Syangboche ridge area night (~3,880 m). Drink steadily, eat regularly and tell your guide if headache, nausea or dizziness persist — descent is the correct response to serious altitude illness, not pushing for a viewpoint.",
  packingItems: [],
  packingIntro:
    "Pack for warm valley afternoons and cold Namche mornings in the same week. Layers, waterproof shell and broken-in boots matter more than fashion.",
  packingGroups: [
    {
      id: "evl-core",
      title: "Core gear",
      items: ["Waterproof trekking boots", "Daypack with rain cover", "Trekking poles", "Headlamp", "Water bottles or purification"],
    },
    {
      id: "evl-clothing",
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
      id: "evl-personal",
      title: "Personal equipment & documents",
      items: [
        "Sunglasses and high-SPF sunscreen",
        "Lip balm",
        "Personal toiletries",
        "Power bank",
        "Personal medication",
        "Travel insurance documents",
        "Passport copies",
      ],
    },
  ],
  suitableBody:
    "Suited to walkers who want Everest-region culture and views within a week, without the longer Base Camp commitment. Couples and private friends’ groups are typical.",
  trainingBody:
    "Hike hills with a daypack weekly for four to six weeks before departure. Stair sessions help prepare for the Namche climb and descent days.",
  khumbuBody:
    "The lower Khumbu links Lukla, the Dudh Koshi valley, Namche Bazaar and side valleys such as Khumjung. Sagarmatha National Park protects much of the trail. This itinerary explores that cultural and scenic band — not the glacier camps beneath Everest.",
  flightBody: EVEREST_VIEW_LUKLA_NOTE,
  bufferBody:
    "Allow at least one buffer day on international tickets on each side of the Lukla sectors. Weather delays are normal in the Everest region. If Ramechhap/Manthali routing applies, road-transfer days also need flexibility — your coordinator states timing on the final itinerary.",
  heliBody:
    "Helicopter charter from the Khumbu is available for emergencies or private returns when weather permits — priced per aircraft, not included in the standard walking quote.",
  beforeItems: [
    "Travel insurance with helicopter evacuation cover is mandatory.",
    "The ridge-area lodge night requires advance confirmation — do not assume availability from the website text alone.",
    "Rooms are typically twin-sharing unless a single supplement is confirmed where lodges allow.",
    "Tips for guide and porters are customary and entirely your choice.",
  ],
  permitsLabel: "Sagarmatha National Park + trekking permits",
  regionLabel: "Everest Region (lower Khumbu)",
  startLabel: "Kathmandu → Lukla → Namche → Khumjung → Lukla → Kathmandu",
  flightTitle: "Kathmandu ↔ Lukla flights",
  notesTitle: "Flights, buffer days & upgrades",
  luklaNoteTitle: "Lukla flight information",
  aboutTitle: "About the Everest View Luxury Trek",
  whyTitle: "Why choose this Everest View itinerary?",
  khumbuTitle: "The lower Khumbu you walk",
  mapBody:
    "Walking route: Lukla → Phakding → Namche Bazaar → Khumjung Village → Syangboche ridge area → Monjo → Lukla. Dashed lines indicate flights between Kathmandu and Lukla. This map does not include Everest Base Camp, Gorak Shep, Kala Patthar, Dingboche or Lobuche.",
  weatherNote:
    "Month-by-month Khumbu reference for Namche and the lower trail. Syangboche ridge area can be windier and colder than Namche on the same calendar day.",
  metaTitle: "Everest View Luxury Trek 7 Days | Namche & Khumjung",
  metaDescription:
    "Private seven-day Everest View Luxury Trek — Namche Bazaar, Khumjung and Syangboche ridge panoramas without Everest Base Camp. Flights, lodges and pacing confirmed on your booking.",
  metaKeywords:
    "Everest View Luxury Trek, Everest View Trek Nepal, 7 Days Everest View Trek, Namche Bazaar Trek, Khumjung Village Trek, Everest panorama trek, private Everest trek",
  focusKeyword: "Everest View Luxury Trek",
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
    id: "evl-watch",
    title: "",
    subtitle: "",
    duration: "",
    imageSrc: "",
    imageAlt: "",
    videoSrc: "",
  },
  videoReviews: [],
  reviews: [],
  tripInfoTitle: "Everest View Luxury Trek – Trip Information",
  tripInfo: [
    {
      id: "ti-duration",
      title: "Duration",
      body: "7 days / 6 nights · private guided trek in the Everest region.",
    },
    {
      id: "ti-dest",
      title: "Destination",
      body: "Everest Region, Nepal — Lukla, Phakding, Namche Bazaar, Khumjung, Syangboche ridge area (when confirmed), Monjo.",
    },
    {
      id: "ti-style",
      title: "Trek style",
      body: "Private guided trek; does not continue to Everest Base Camp.",
    },
    {
      id: "ti-diff",
      title: "Difficulty",
      body: "Moderate — subject to guide assessment and your fitness.",
    },
    {
      id: "ti-high",
      title: "Highest planned overnight",
      body: "Syangboche ridge area — approximately 3,880 m, subject to property verification and confirmation.",
    },
    {
      id: "ti-acc",
      title: "Accommodation",
      body: "Nights 1–3 & 5–6: mountain lodges (twin rooms typical). Night 4: Syangboche ridge area when confirmed in writing. If unavailable, an agreed alternative is confirmed before travel — not a silent swap. Ensuite heating and Wi-Fi are not guaranteed every night.",
    },
    {
      id: "ti-meals",
      title: "Meals",
      body: "According to the board basis confirmed at booking.",
    },
    {
      id: "ti-transport",
      title: "Transport",
      body: "Kathmandu ↔ Lukla flights and trekking transfers as confirmed; road transfers when Ramechhap/Manthali routing applies.",
    },
    {
      id: "ti-season",
      title: "Best season",
      body: "Spring and autumn are popular; winter and monsoon bring additional cold, cloud or rain risk.",
    },
    {
      id: "ti-permits",
      title: "Permits",
      body: "Sagarmatha National Park and applicable trekking permits when included in your quote.",
    },
    {
      id: "ti-insurance",
      title: "Travel insurance",
      body: "Mandatory comprehensive cover including high-altitude trekking and helicopter evacuation. Carry policy documents and emergency contact numbers on the trail.",
    },
    {
      id: "ti-cancel",
      title: "Cancellation & refunds",
      body: "Payment schedule, cancellation windows and refund treatment are on your signed confirmation — not summarised on this page. Flight disruptions also follow airline and local operator rules.",
    },
    {
      id: "ti-evac",
      title: "Emergency evacuation",
      body: "Not included in the standard package rate. Arranged when medically necessary through your insurer or private charter, subject to weather and aircraft availability.",
    },
  ],
  optionalAddons: EVEREST_VIEW_ADDONS,
  includeNote: EVEREST_VIEW_INCLUDE_NOTE,
  luklaNote: EVEREST_VIEW_LUKLA_NOTE,
  reviewsWallpaperSrc: "/images/atmosphere/ebc-premium-section.webp",
  slugHistory: [
    "everest-base-camp-trek",
    "everest-base-camp-luxury-trek",
    "luxury-everest-base-camp-trek",
  ],
  ogTitle: "Everest View Luxury Trek – 7 Days",
  ogDescription:
    "Private seven-day Everest View Luxury Trek — Namche Bazaar, Khumjung and Syangboche ridge panoramas when lodge nights are confirmed. Lower Khumbu · no Base Camp.",
  ogImageSrc: HERO,
};

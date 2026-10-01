import type { TrekPackage } from "./trip-packages";
import {
  LANGTANG_ADDONS,
  LANGTANG_EXCLUSIONS,
  LANGTANG_INCLUDE_NOTE,
  LANGTANG_INCLUSIONS,
  LANGTANG_ITINERARY,
  LANGTANG_ITINERARY_INTRO,
  LANGTANG_SLUG,
  LANGTANG_TRANSPORT_NOTE,
} from "./langtang-luxury-content";
import { EBC_WATCH_VIDEO } from "./trek-films";

const HERO = "/images/nepal/nepal-trek-langtang.webp";

export const LANGTANG_LUXURY_TRIP_PACKAGE: TrekPackage = {
  id: "langtang-lux",
  catalogId: "langtang-lux",
  slug: LANGTANG_SLUG,
  country: "nepal",
  status: "published",
  featured: true,
  badge: "HIDDEN GEM",
  title: "Langtang Valley Luxury Trek",
  subtitle:
    "A private Himalayan escape from Kathmandu into the Langtang Valley, where Tamang villages, rhododendron forests and high mountain landscapes lead to Kyanjin beneath the Langtang peaks.",
  duration: "10 Days / 9 Nights",
  days: 10,
  difficulty: "Moderate",
  destination: "Nepal · Langtang Valley",
  maxAltitude: "Kyanjin Ri — approx. 4,773 m / 15,659 ft",
  maxAltitudeFt: "15,659 ft",
  countryLabel: "Nepal",
  activityLabel: "Private luxury trek",
  accommodationLabel: "Luxury Kathmandu hotel + premium mountain lodges",
  mealsLabel: "As per itinerary",
  startEndLabel: "Kathmandu",
  groupSize: "Private · 2–10 guests",
  bestSeason: "March–May · September–November",
  priceUsd: 0,
  groupPrices: [
    { id: "p1", label: "Private quote", priceUsd: 0 },
  ],
  overview:
    "The Langtang Valley offers a different Himalayan rhythm from the crowded Everest and Annapurna corridors. This ten-day, nine-night private programme leaves Kathmandu by private 4WD and climbs north toward Syabrubesi, where the walking trail enters oak, rhododendron and bamboo forest beside the Langtang Khola.\n\nAs the valley rises, traditional Tamang settlements give way to open alpine country. The final approach to Kyanjin Gompa unfolds beneath Langtang Lirung and neighbouring peaks — close enough to feel the scale of the range without the flight logistics of other regions.\n\nLuxury on Langtang is not about five-star resorts at 4,000 metres. It means private road transfers, a dedicated guide, carefully selected lodges, better Kathmandu accommodation, flexible pacing and honest cultural time in villages that still farm and host guests along the trail.",
  highlights: [
    "Private 4WD between Kathmandu and the Langtang trailhead at Syabrubesi.",
    "Forest walking through oak, rhododendron and bamboo beside the Langtang Khola.",
    "Tamang villages and cultural life in Langtang Village.",
    "Kyanjin Gompa beneath Langtang Lirung and surrounding peaks.",
    "Optional Kyanjin Ri excursion for wide Himalayan views when your guide agrees it is safe.",
    "Dedicated time in Kyanjin rather than a single rushed overnight.",
    "Carefully selected premium mountain lodges on the route.",
    "Two Kathmandu hotel nights before the road north and a comfortable return night after the trek.",
    "Langtang National Park permit and trekking registration handled before you walk.",
    "Return to Kathmandu by private 4WD — no domestic flights required.",
  ],
  inclusions: LANGTANG_INCLUSIONS,
  exclusions: LANGTANG_EXCLUSIONS,
  gallery: [
    HERO,
    "/images/journeys/j-langtang.webp",
    "/images/nepal/nepal-cover.webp",
    "/images/nepal/nepal-trek-langtang.webp",
    "/images/journeys/j-langtang.webp",
  ],
  tripGalleryTitle: "Trip Gallery",
  galleryAlts: [
    "Langtang Valley trail through rhododendron forest",
    "Snow peaks above a Langtang village",
    "Nepal Himalayan foothills near Langtang",
    "Pine forest and peaks in the Langtang region",
    "Langtang valley village beneath snow peaks",
  ],
  heroSrc: HERO,
  heroAlt: "Langtang Valley pine forest and snow peaks on a luxury trek",
  altitudeChartM: "",
  altitudeChartFt: "",
  altitudeGainSrc: "",
  routeMapSrc: "",
  weatherDailySrc: "",
  weatherMonthlySrc: "",
  routeMapFile: "langtang-valley-luxury-trek-route-map",
  altitudeMFile: "langtang-valley-luxury-trek-altitude-meters",
  altitudeFtFile: "langtang-valley-luxury-trek-altitude-feet",
  weatherDailyFile: "langtang-valley-luxury-trek-daily-temperature",
  weatherMonthlyFile: "langtang-valley-luxury-trek-monthly-temperature",
  itineraryIntro: LANGTANG_ITINERARY_INTRO,
  itinerary: LANGTANG_ITINERARY,
  faqs: [
    {
      q: "How difficult is the Langtang Valley Luxury Trek?",
      a: "Moderate. Expect five to six hours on most walking days with steady forest climbs and a high point near Kyanjin Ri if you choose the excursion. Reasonable fitness and honest communication about altitude matter more than technical skill.",
    },
    {
      q: "How many days is the trek?",
      a: "10 days / 9 nights from arrival in Kathmandu through departure on Day 10.",
    },
    {
      q: "What is the highest point?",
      a: "Kyanjin Ri at approximately 4,773 m / 15,659 ft, if weather, fitness and your guide’s assessment allow the viewpoint hike. It is an excursion, not an overnight camp.",
    },
    {
      q: "What is the highest overnight?",
      a: "Kyanjin Gompa at approximately 3,870 m / 12,697 ft.",
    },
    {
      q: "Is Kyanjin Ri mandatory?",
      a: "No. Your guide may advise rest in Kyanjin instead if weather, snow or how you feel does not suit the climb.",
    },
    {
      q: "How do we reach Langtang from Kathmandu?",
      a: "Private 4WD transfer to Syabrubesi — included in the package. There are no domestic flights on this itinerary.",
    },
    {
      q: "Is Langtang suitable for first-time trekkers?",
      a: "Fit first-time trekkers can enjoy it with preparation, but the walking days and altitude still demand training and respect for the guide’s pacing.",
    },
    {
      q: "What does luxury mean on this trek?",
      a: "Private vehicle, private guide, better Kathmandu hotel nights, selected mountain lodges and flexible logistics — not five-star hotels at 4,000 m.",
    },
    {
      q: "What permits are required?",
      a: "Langtang National Park entry and applicable trekking registration such as TIMS where required. Ambition Holidays arranges these in Kathmandu.",
    },
    {
      q: "Does the trek start and end in Kathmandu?",
      a: "Yes — airport transfers and the road journey to Syabrubesi are coordinated from the capital.",
    },
  ],
  whyItems: [
    {
      title: "Private Himalayan journey",
      body: "Your days follow your party’s rhythm — photography stops, cultural pauses and rest when altitude asks for it.",
    },
    {
      title: "Private 4WD transfers",
      body: "Travel Kathmandu–Syabrubesi in your own vehicle rather than a crowded shared jeep.",
    },
    {
      title: "Selected mountain stays",
      body: "We reserve the best available rooms along the valley while keeping expectations honest for remote lodges.",
    },
    {
      title: "Experienced local guide",
      body: "Guides who know Tamang communities, forest weather and when Kyanjin Ri is worth attempting.",
    },
    {
      title: "Flexible Kyanjin day",
      body: "A full day around Kyanjin for viewpoints, rest or short walks — not a dash through the alpine section.",
    },
    {
      title: "Comfort without pretence",
      body: "Thoughtful service and privacy where the mountains allow — without claiming resorts that do not exist at altitude.",
    },
  ],
  weatherBody:
    "March to May brings rhododendron colour in the lower forest and often clear mornings beneath Langtang Lirung. September to November is the other prime window — crisp air and stable trekking days. Winter at Kyanjin is cold, especially before sunrise. Monsoon rain can affect the Kathmandu–Syabrubesi road and the lower trail; landslides and wet roots slow progress — we do not sell June–August as a luxury-season walk.",
  altitudeBody:
    "You sleep no higher than Kyanjin Gompa near 3,870 m. Kyanjin Ri is a day excursion, not a sleep altitude. Drink steadily, eat even when appetite fades, and tell your guide if headache or nausea persists — descent is the correct response to serious altitude illness, not pushing for the viewpoint.",
  packingItems: [],
  packingIntro:
    "Pack for warm forest afternoons and freezing Kyanjin mornings in the same week. Layers, waterproof shell and broken-in boots matter more than fashion.",
  packingGroups: [
    {
      id: "lt-core",
      title: "Core gear",
      items: ["Waterproof trekking boots", "Daypack with rain cover", "Trekking poles", "Headlamp", "Water bottle / purification"],
    },
    {
      id: "lt-clothing",
      title: "Clothing",
      items: ["Base layers", "Fleece", "Down jacket", "Waterproof shell", "Trekking trousers", "Warm hat", "Gloves", "Warm socks"],
    },
    {
      id: "lt-alt",
      title: "High altitude & documents",
      items: ["Sunglasses", "High-SPF sunscreen", "Lip balm", "Buff", "Personal medication", "Passport copies", "Travel insurance certificate"],
    },
  ],
  suitableBody:
    "Suited to walkers who enjoy forest trails, cultural villages and moderate altitude without technical climbing. Couples and private friends’ groups are typical; honesty about fitness helps your guide set the right pace toward Kyanjin.",
  trainingBody:
    "Hike hills with a daypack weekly for six weeks before departure. Stair sessions mimic the steady climbs out of Syabrubesi and Lama Hotel.",
  khumbuBody:
    "Langtang National Park protects the valley north of Kathmandu. Tamang communities farm and host guests along the trail; Langtang Village and Kyanjin Gompa anchor the cultural and alpine sections. Langtang Lirung (7,227 m) dominates the skyline from Kyanjin — a different drama from the Khumbu or Annapurna sanctuary, and far less crowded.",
  flightBody: LANGTANG_TRANSPORT_NOTE,
  bufferBody:
    "Allow buffer on international tickets around the Syabrubesi road days — landslides or traffic can delay the 4WD. Your coordinator adjusts departure times when needed.",
  heliBody:
    "Helicopter charter from Kyanjin or Syabrubesi is available for emergencies or private returns when weather permits — priced per aircraft, not included in the walking package.",
  beforeItems: [
    "Travel insurance with helicopter evacuation is mandatory.",
    "Kyanjin Ri is optional — never compulsory.",
    "Rooms are twin-sharing unless a single supplement is confirmed where lodges allow.",
    "Tips for guide and porters are customary and entirely your choice.",
    "Hot showers and charging may cost extra in mountain lodges.",
  ],
  permitsLabel: "Langtang National Park + TIMS",
  regionLabel: "Langtang Valley",
  startLabel: "Kathmandu → Syabrubesi (4WD) → Kyanjin",
  flightTitle: "Private road transfers",
  notesTitle: "Road travel & upgrades",
  luklaNoteTitle: "Kathmandu ↔ Syabrubesi",
  aboutTitle: "About the Langtang Valley Luxury Trek",
  whyTitle: "Why travel Langtang in luxury?",
  khumbuTitle: "The valley you actually walk",
  mapBody:
    "Private 4WD links Kathmandu and Syabrubesi. The walking route runs Syabrubesi–Lama Hotel–Langtang Village–Kyanjin Gompa, with an optional Kyanjin Ri excursion, then returns via Lama Hotel and Syabrubesi to Kathmandu by private vehicle.",
  metaTitle: "Langtang Valley Luxury Trek 10 Days | Private Trek Nepal",
  metaDescription:
    "Experience a private Langtang Valley Luxury Trek from Kathmandu through Tamang villages, rhododendron forests and high Himalayan landscapes to Kyanjin Gompa and Kyanjin Ri.",
  metaKeywords:
    "Langtang Valley luxury trek, private Langtang trek, Kyanjin Gompa trek, Kyanjin Ri, Langtang trek 10 days, Ambition Holidays",
  focusKeyword: "Langtang Valley Luxury Trek",
  tripadvisorLabel: "Excellent",
  tripadvisorScore: "5.0",
  tripadvisorCount: "120+ Reviews",
  tripadvisorHref: "https://www.tripadvisor.com",
  tripadvisorLogoSrc: "/images/reviews/tripadvisor-owl.png",
  googleLabel: "Excellent",
  googleScore: "5.0",
  googleCount: "140+ Reviews",
  googleHref: "https://www.google.com/maps",
  googleLogoSrc: "",
  watchVideo: { ...EBC_WATCH_VIDEO, id: "langtang-watch", subtitle: "Langtang Valley Luxury Trek" },
  videoReviews: [],
  reviews: [],
  tripInfoTitle: "Langtang Valley Luxury Trek – Trip Information",
  tripInfo: [
    {
      id: "ti-season",
      title: "Best season",
      body: "March–May and September–November. Spring rhododendron; autumn clarity. Winter is cold at Kyanjin. Monsoon affects the road and lower forest — plan flexibility.",
    },
    { id: "ti-duration", title: "Duration", body: "10 days / 9 nights · private luxury trek." },
    { id: "ti-diff", title: "Difficulty", body: "Moderate — long forest days and optional high viewpoint." },
    { id: "ti-high", title: "Highest point", body: "Kyanjin Ri — approx. 4,773 m (excursion)." },
    { id: "ti-overnight", title: "Highest overnight", body: "Kyanjin Gompa — approx. 3,870 m." },
    { id: "ti-dist", title: "Distance", body: "Approx. 60–70 km walking, depending on the Kyanjin viewpoint route and final lodge stops." },
    { id: "ti-acc", title: "Accommodation", body: "Luxury Kathmandu hotel + premium/best-available mountain lodges." },
    { id: "ti-meals", title: "Meals", body: "Breakfast in Kathmandu; full board on trekking days as listed." },
    { id: "ti-transport", title: "Transportation", body: "Private 4WD Kathmandu ↔ Syabrubesi. No domestic flights." },
    { id: "ti-group", title: "Group style", body: "Private." },
    { id: "ti-permits", title: "Permits", body: "Langtang National Park and applicable trekking registration." },
    { id: "ti-lux", title: "Optional upgrades", body: "Extra Kathmandu nights, spa, helicopter return when operational, photography pacing, single rooms where available." },
  ],
  optionalAddons: LANGTANG_ADDONS,
  includeNote: LANGTANG_INCLUDE_NOTE,
  luklaNote: LANGTANG_TRANSPORT_NOTE,
  reviewsWallpaperSrc: "/images/atmosphere/ebc-premium-section.webp",
  slugHistory: [],
  ogTitle: "Langtang Valley Luxury Trek – 10 Days",
  ogDescription:
    "Discover Langtang Valley on a private 10-day luxury trek from Kathmandu, with private 4WD transfers, selected mountain lodges, Kyanjin Gompa and Himalayan viewpoints.",
  ogImageSrc: HERO,
};

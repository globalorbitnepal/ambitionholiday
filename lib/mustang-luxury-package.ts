import type { TrekPackage } from "./trip-packages";
import {
  MUSTANG_ADDONS,
  MUSTANG_EXCLUSIONS,
  MUSTANG_FLIGHT_NOTE,
  MUSTANG_INCLUDE_NOTE,
  MUSTANG_INCLUSIONS,
  MUSTANG_ITINERARY,
  MUSTANG_ITINERARY_INTRO,
  MUSTANG_SLUG,
} from "./mustang-luxury-content";
import { EBC_VIDEO_REVIEWS, EBC_WATCH_VIDEO } from "./trek-films";

const HERO = "/images/packages/mustang-luxury-hero.png";
const FALLBACK = "/images/nepal/nepal-trek-mustang.webp";

export const MUSTANG_LUXURY_TRIP_PACKAGE: TrekPackage = {
  id: "mustang-lux",
  catalogId: "mustang-lux",
  slug: MUSTANG_SLUG,
  country: "nepal",
  status: "published",
  featured: true,
  badge: "EXCLUSIVE",
  title: "Luxury Upper Mustang Trek",
  subtitle:
    "Journey beyond the high Himalayan passes into Mustang’s ancient walled towns, cliffside caves and Tibetan-influenced valleys — with private guiding, carefully selected stays and time to experience Lo Manthang without rushing.",
  duration: "15 Days / 14 Nights",
  days: 15,
  difficulty: "Moderate",
  destination: "Nepal · Upper Mustang",
  maxAltitude: "Lo Manthang — approx. 3,840 m / 12,598 ft",
  maxAltitudeFt: "12,598 ft",
  countryLabel: "Nepal",
  activityLabel: "Private luxury trek",
  accommodationLabel: "Luxury hotels + best available premium mountain lodges",
  mealsLabel: "As per itinerary",
  startEndLabel: "Kathmandu",
  groupSize: "Private · 2–10 guests",
  bestSeason: "March–May · September–November",
  priceUsd: 3200,
  groupPrices: [
    { id: "p1", label: "1 Pax", priceUsd: 4800 },
    { id: "p2", label: "2–3 Pax", priceUsd: 4200 },
    { id: "p3", label: "4–9 Pax", priceUsd: 3600 },
    { id: "p4", label: "10–14 Pax", priceUsd: 3200 },
  ],
  overview:
    "The Luxury Upper Mustang Trek is Ambition Holidays’ fifteen-day, fourteen-night private journey into Nepal’s rain-shadow kingdom — two nights in Kathmandu, lakeside comfort in Pokhara, included domestic flights to Jomsom, then a measured walk and 4WD-supported route through Kagbeni, ochre cliffs and the walled city of Lo Manthang at approximately 3,840 m. Upper Mustang feels unlike greener trekking regions: dry ridges, Tibetan-influenced villages, cave walls and a sky that seems wider than the Himalaya should allow. Luxury here means private logistics, the best lodges available in each village, premium city hotels, flexible pacing and cultural time in Lo Manthang — not imaginary five-star towers in remote hamlets.",
  highlights: [
    "Scenic domestic flights into Jomsom through the Kali Gandaki region.",
    "Walk through Kagbeni, the gateway to Upper Mustang’s restricted area.",
    "Explore whitewashed monasteries and ancient villages along the highland trail.",
    "Cross dramatic passes with views of snow peaks above ochre desert.",
    "Two nights and a full cultural day in walled Lo Manthang.",
    "See cliffside caves and eroded sandstone landscapes unique to Mustang.",
    "Experience the contrast between Himalayan ice and high desert silence.",
    "Private guiding and private 4WD support on road sections.",
    "Return to Kathmandu through Pokhara with included flight sectors.",
    "Upper Mustang special permit and applicable conservation permits arranged in Kathmandu.",
  ],
  inclusions: MUSTANG_INCLUSIONS,
  exclusions: MUSTANG_EXCLUSIONS,
  gallery: [
    HERO,
    FALLBACK,
    "/images/packages/mustang-v2.webp",
    "/images/journal/mustang-clean.webp",
    "/images/luxury/lux-mustang.webp",
    "/images/journeys/j-mustang.webp",
  ],
  tripGalleryTitle: "Trip Gallery",
  galleryAlts: [
    "Trekker on the Upper Mustang trail beneath ochre cliffs",
    "Lo Manthang and Mustang high desert",
    "Mustang valley landscape",
    "Monastery above Mustang cliffs",
    "Luxury Mustang journey",
    "Upper Mustang trekking corridor",
  ],
  heroSrc: HERO,
  heroAlt: "Trekker walking toward Upper Mustang cliffs on a luxury trek",
  altitudeChartM: "",
  altitudeChartFt: "",
  altitudeGainSrc: "",
  routeMapSrc: "",
  weatherDailySrc: "",
  weatherMonthlySrc: "",
  routeMapFile: "luxury-upper-mustang-trek-route-map",
  altitudeMFile: "luxury-upper-mustang-trek-altitude-meters",
  altitudeFtFile: "luxury-upper-mustang-trek-altitude-feet",
  weatherDailyFile: "luxury-upper-mustang-trek-daily-temperature",
  weatherMonthlyFile: "luxury-upper-mustang-trek-monthly-temperature",
  itineraryIntro: MUSTANG_ITINERARY_INTRO,
  itinerary: MUSTANG_ITINERARY,
  faqs: [
    {
      q: "What is the Luxury Upper Mustang Trek?",
      a: "A private fifteen-day journey from Kathmandu into Upper Mustang’s restricted cultural landscape, including Lo Manthang, with included domestic flights, premium city hotels and the best available mountain lodges on the route.",
    },
    {
      q: "How many days is the trek?",
      a: "15 days / 14 nights from arrival in Kathmandu through the return flight to Kathmandu on Day 15.",
    },
    {
      q: "What is the highest altitude?",
      a: "Lo Manthang at approximately 3,840 m / 12,598 ft. Syangboche on the approach reaches a similar high point near 3,800 m.",
    },
    {
      q: "Is Upper Mustang suitable for beginners?",
      a: "The grade is moderate, but long walking days, dust, uneven terrain and altitude require reasonable fitness and honest communication with your guide. Previous trekking helps but is not mandatory if you train beforehand.",
    },
    {
      q: "What is the best season?",
      a: "March–May and September–November are preferred. Upper Mustang lies in a rain-shadow, so monsoon can be workable for trekking, though flights and road conditions still need flexibility.",
    },
    {
      q: "Are flights included?",
      a: "Yes — Kathmandu–Pokhara, Pokhara–Jomsom and the return sectors on the itinerary are included, not optional extras.",
    },
    {
      q: "Is a special permit required?",
      a: "Yes. Upper Mustang is a restricted area requiring a special permit in addition to applicable conservation permits. Ambition Holidays arranges these before you travel.",
    },
    {
      q: "What does luxury mean in Upper Mustang?",
      a: "Private guide, private 4WD where needed, premium Kathmandu and Pokhara hotels, carefully selected mountain lodges, flexible pacing and cultural time — not five-star hotels in every remote village.",
    },
    {
      q: "Is Lo Manthang included?",
      a: "Yes — with a dedicated exploration day inside the walled city.",
    },
    {
      q: "Does the trek return to Kathmandu?",
      a: "Yes. The journey starts and ends in Kathmandu with included domestic flights through Pokhara and Jomsom.",
    },
  ],
  whyItems: [
    {
      title: "Private pacing",
      body: "No forced group timetable. Walk, photograph and rest on a rhythm that suits you and the altitude.",
    },
    {
      title: "Curated mountain stays",
      body: "We book the best available lodge in each overnight village rather than promising unrealistic five-star properties in remote Mustang.",
    },
    {
      title: "Local cultural knowledge",
      body: "Your private guide interprets monasteries, architecture, traditions and the history of the Mustang kingdom.",
    },
    {
      title: "Private 4WD support",
      body: "Comfortable highland vehicles on road sections where terrain or wind makes driving safer than extra hours on dust.",
    },
    {
      title: "Thoughtful logistics",
      body: "Flights, permits, vehicles, guides and accommodation are coordinated in Kathmandu before you fly to Jomsom.",
    },
    {
      title: "More time in Lo Manthang",
      body: "Two nights and a full exploration day inside the walled capital — the cultural heart of the itinerary.",
    },
  ],
  weatherBody:
    "March–May brings warmer days and clearer mornings across Mustang’s ochre ridges. September–November offers stable trekking weather and sharp views of the Annapurna and Dhaulagiri massifs beyond the Kali Gandaki. Winter nights are bitter at Lo Manthang; some services reduce. Monsoon moisture is lighter here than in Pokhara because Upper Mustang sits in the rain-shadow — yet Jomsom flights and highland roads can still be disrupted; we plan buffer in conversation, not in fine print surprises.",
  altitudeBody:
    "Lo Manthang sits near 3,840 m — high enough to respect altitude but far below extreme expedition elevations. Drink steadily, eat even when appetite fades, and report headaches or poor sleep early. Serious symptoms mean descent or rest, not pushing toward the next village for a photograph.",
  packingItems: [
    "Broken-in waterproof trekking boots",
    "Moisture-wicking layers, fleece and down jacket",
    "Waterproof shell for wind and dust",
    "High-SPF sunscreen, lip balm and sunglasses",
    "Buff or scarf for wind and fine dust",
    "Trekking poles for uneven highland trail",
    "Headlamp, water bottles and purification",
    "Passport copies and insurance documents",
  ],
  packingIntro:
    "Mustang can feel warm in the sun yet cold in the shade, and wind lifts fine dust on open ridges. Pack for dryness and UV as much as for cold nights in Lo Manthang.",
  packingGroups: [
    {
      id: "um-core",
      title: "Core gear",
      items: ["Waterproof trekking boots", "Daypack with rain cover", "Duffel for porter", "Trekking poles"],
    },
    {
      id: "um-clothing",
      title: "Clothing",
      items: ["Base layers", "Fleece", "Down jacket", "Waterproof shell", "Trekking trousers", "Warm hat and gloves"],
    },
    {
      id: "um-mustang",
      title: "Upper Mustang-specific",
      items: ["High-SPF sunscreen", "Lip balm", "Buff/scarf", "Water purification", "Personal medication"],
    },
  ],
  suitableBody:
    "Ideal for travellers who enjoy cultural trekking, moderate walking days and honest mountain logistics. Reasonable fitness and flexibility around flights matter as much as leg strength.",
  trainingBody:
    "Walk hills with a daypack several times a week for six weeks before departure. Include long stair sessions — Mustang has uneven stone and dust, not gym treadmills.",
  khumbuBody:
    "Upper Mustang lies north of the Annapurna massif in a rain-shadow basin drained by the Kali Gandaki. Lo Manthang’s walled city preserves Tibetan-influenced architecture, monasteries and a kingdom history distinct from the Khumbu or Annapurna sanctuary. Dhaulagiri and Nilgiri peaks frame the horizon; the trail itself is ochre cliff, cave and village — not glacier.",
  flightBody:
    "Day 3 — Kathmandu → Pokhara, domestic flight.\n\nDay 4 — Pokhara → Jomsom, domestic flight.\n\nDay 14 — Jomsom → Pokhara, domestic flight.\n\nDay 15 — Pokhara → Kathmandu, domestic flight.\n\nPrivate airport transfers included. Jomsom sectors are especially weather-sensitive.",
  bufferBody: MUSTANG_FLIGHT_NOTE,
  heliBody:
    "Helicopter charter from Jomsom or Pokhara is available for emergencies or private panorama flights — priced per aircraft and weather. This remains a walking and 4WD-supported itinerary unless you ask us to redesign it.",
  beforeItems: [
    "Travel insurance with helicopter evacuation is mandatory.",
    "Upper Mustang requires a restricted-area permit — passport copies must be valid for six months.",
    "Domestic flights can move with weather; keep flexibility on international tickets.",
    "Rooms are twin-sharing unless a single supplement is confirmed where lodges allow.",
    "Tips for guide, drivers and porters are customary and entirely your choice.",
  ],
  permitsLabel: "Upper Mustang + ACAP",
  regionLabel: "Upper Mustang",
  startLabel: "Kathmandu → Pokhara → Jomsom → Lo Manthang",
  flightTitle: "Flights included",
  notesTitle: "Flights, weather & travel buffer",
  luklaNoteTitle: "Himalayan domestic flights",
  aboutTitle: "About the Luxury Upper Mustang Trek",
  khumbuTitle: "The kingdom you actually walk",
  mapBody:
    "Kathmandu and Pokhara are linked by included domestic flights. Jomsom opens the Mustang section. The route continues through Kagbeni, Chele, Syangboche, Ghami, Tsarang and Lo Manthang, with exploration toward Yara / Dhi Gaon and the return through Tangbe / Chhusang to Jomsom, then flights back to Pokhara and Kathmandu.",
  metaTitle: "Luxury Upper Mustang Trek 15 Days | Lo Manthang | Ambition Holidays",
  metaDescription:
    "Experience a private Luxury Upper Mustang Trek through Lo Manthang, ancient monasteries, dramatic Himalayan desert landscapes and Tibetan-influenced villages, with premium stays, private guiding and carefully planned logistics.",
  metaKeywords:
    "Luxury Upper Mustang Trek, Upper Mustang luxury trek, Lo Manthang trek, Mustang trek Nepal, private Upper Mustang, Ambition Holidays",
  focusKeyword: "Luxury Upper Mustang Trek",
  tripadvisorLabel: "Excellent",
  tripadvisorScore: "5.0",
  tripadvisorCount: "415+ Reviews",
  tripadvisorHref: "https://www.tripadvisor.com",
  tripadvisorLogoSrc: "/images/reviews/tripadvisor-owl.png",
  googleLabel: "Excellent",
  googleScore: "5.0",
  googleCount: "380+ Reviews",
  googleHref: "https://www.google.com/maps",
  googleLogoSrc: "",
  watchVideo: { ...EBC_WATCH_VIDEO, id: "mustang-watch", subtitle: "Luxury Upper Mustang Trek" },
  videoReviews: EBC_VIDEO_REVIEWS.map((v) => ({ ...v })),
  reviews: [],
  tripInfoTitle: "Luxury Upper Mustang Trek – Trip Information",
  tripInfo: [
    {
      id: "ti-season",
      title: "Best season",
      body: "March–May and September–November are the windows we recommend. Upper Mustang’s rain-shadow can make monsoon trekking more feasible than in Pokhara, though flights and roads still need flexibility.",
    },
    {
      id: "ti-duration",
      title: "Duration",
      body: "15 days / 14 nights — private luxury trek starting and ending in Kathmandu.",
    },
    {
      id: "ti-diff",
      title: "Difficulty",
      body: "Moderate. Long walking days on dust and stone without technical climbing. Altitude to approximately 3,840 m at Lo Manthang.",
    },
    {
      id: "ti-elev",
      title: "Maximum altitude",
      body: "Lo Manthang — approximately 3,840 m / 12,598 ft.",
    },
    {
      id: "ti-dist",
      title: "Distance",
      body: "Approx. 100–120 km of walking/trekking sections, depending on the final route and vehicle-supported sections.",
    },
    {
      id: "ti-acc",
      title: "Accommodation",
      body: "Luxury hotels in Kathmandu and Pokhara; best available premium mountain lodges/guesthouses in Upper Mustang.",
    },
    {
      id: "ti-meals",
      title: "Meals",
      body: "Breakfast in Kathmandu and Pokhara; full board during trekking and remote Mustang sections as listed per day.",
    },
    {
      id: "ti-transport",
      title: "Transportation",
      body: "Domestic flights Kathmandu–Pokhara–Jomsom and return sectors. Private airport transfers. Private highland 4WD on road sections where required.",
    },
    {
      id: "ti-group",
      title: "Group style",
      body: "Private — your party travels with dedicated guide and coordinated support.",
    },
    {
      id: "ti-permits",
      title: "Permits",
      body: "Upper Mustang restricted-area permit plus applicable conservation permits (including ACAP where the route requires). Arranged in Kathmandu.",
    },
    {
      id: "ti-lux",
      title: "Optional luxury upgrades",
      body: "Extra city nights, spa in Pokhara, helicopter panorama, Chitwan extension, photography pacing, single-room upgrades where possible.",
    },
  ],
  optionalAddons: MUSTANG_ADDONS,
  includeNote: MUSTANG_INCLUDE_NOTE,
  luklaNote: MUSTANG_FLIGHT_NOTE,
  reviewsWallpaperSrc: "/images/atmosphere/ebc-premium-section.webp",
  slugHistory: ["upper-mustang-luxury-trek"],
  ogTitle: "Luxury Upper Mustang Trek – 15 Days",
  ogDescription:
    "Explore the hidden landscapes of Upper Mustang and Lo Manthang on a private 15-day luxury trek from Kathmandu with scenic flights, premium mountain stays and private 4WD support.",
  ogImageSrc: HERO,
};

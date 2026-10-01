import {
  EBC_ADDONS,
  EBC_EXCLUSIONS,
  EBC_INCLUDE_NOTE,
  EBC_INCLUSIONS,
  EBC_ITINERARY,
  EBC_ITINERARY_INTRO,
  EBC_LUKLA_NOTE,
} from "./ebc-luxury-content";
import { ABC_LUXURY_TRIP_PACKAGE } from "./abc-luxury-package";
import { EBC_VIDEO_REVIEWS, EBC_WATCH_VIDEO } from "./trek-films";

export type TrekItineraryDay = {
  id: string;
  day: number;
  title: string;
  altitude: string;
  duration: string;
  meals: string;
  stay: string;
  distance?: string;
  body: string;
  imageSrc?: string;
  imageAlt?: string;
};

export type TrekVideo = {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  imageSrc: string;
  imageAlt: string;
  videoSrc: string;
};

export type TrekReview = {
  id: string;
  platform: "google" | "tripadvisor";
  name: string;
  avatarSrc: string;
  avatarAlt?: string;
  rating: number;
  dateLabel: string;
  meta: string;
  title: string;
  body: string;
  moreLabel?: string;
  moreHref?: string;
  trekEyebrow?: string;
  trekName?: string;
};

export type TrekGroupPrice = {
  id: string;
  label: string;
  priceUsd: number;
};

export type TrekPackage = {
  id: string;
  catalogId: string;
  slug: string;
  country: "nepal" | "bhutan" | "tibet" | "multi";
  status: "published" | "draft";
  featured: boolean;
  badge: string;
  title: string;
  subtitle: string;
  duration: string;
  days: number;
  difficulty: string;
  destination: string;
  maxAltitude: string;
  groupSize: string;
  bestSeason: string;
  priceUsd: number;
  groupPrices: TrekGroupPrice[];
  overview: string;
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  gallery: string[];
  galleryAlts: string[];
  tripGalleryTitle: string;
  heroSrc: string;
  heroAlt: string;
  countryLabel: string;
  activityLabel: string;
  accommodationLabel: string;
  mealsLabel: string;
  startEndLabel: string;
  maxAltitudeFt: string;
  altitudeChartM: string;
  altitudeChartFt: string;
  altitudeGainSrc: string;
  routeMapSrc: string;
  weatherDailySrc: string;
  weatherMonthlySrc: string;
  routeMapFile: string;
  altitudeMFile: string;
  altitudeFtFile: string;
  weatherDailyFile: string;
  weatherMonthlyFile: string;
  itineraryIntro: string;
  itinerary: TrekItineraryDay[];
  faqs: { q: string; a: string }[];
  whyItems: { title: string; body: string }[];
  weatherBody: string;
  altitudeBody: string;
  packingItems: string[];
  packingIntro: string;
  packingGroups: { id: string; title: string; items: string[] }[];
  flightBody: string;
  bufferBody: string;
  heliBody: string;
  beforeItems: string[];
  suitableBody: string;
  trainingBody: string;
  khumbuBody: string;
  permitsLabel: string;
  regionLabel: string;
  startLabel: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  tripadvisorLabel: string;
  tripadvisorScore: string;
  tripadvisorCount: string;
  tripadvisorHref: string;
  tripadvisorLogoSrc: string;
  googleLabel: string;
  googleScore: string;
  googleCount: string;
  googleHref: string;
  watchVideo: TrekVideo;
  videoReviews: TrekVideo[];
  reviews: TrekReview[];
  slugHistory?: string[];
  tripInfoTitle: string;
  tripInfo: { id: string; title: string; body: string }[];
  optionalAddons: string[];
  includeNote: string;
  luklaNote: string;
  reviewsWallpaperSrc: string;
  /** SEO */
  focusKeyword?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImageSrc?: string;
  noindex?: boolean;
  updatedAt?: string;
  /** Editable section headings — empty uses the default wording. */
  aboutTitle?: string;
  whyTitle?: string;
  fitTitle?: string;
  khumbuTitle?: string;
  mapBody?: string;
  weatherNote?: string;
  luklaNoteTitle?: string;
  notesTitle?: string;
  flightTitle?: string;
  bufferTitle?: string;
  heliTitle?: string;
};

export const EBC_PACKAGE_ID = "ebc-lux";
export const ABC_PACKAGE_ID = "abc-lux";

/** The built-in Everest map, altitude and weather charts only describe the Everest trail. */
export function isEbcPackage(pkg: Pick<TrekPackage, "id">) {
  return pkg.id === EBC_PACKAGE_ID;
}

export function isAbcPackage(pkg: Pick<TrekPackage, "id" | "slug">) {
  return pkg.id === ABC_PACKAGE_ID || /annapurna-base-camp/i.test(pkg.slug || "");
}

export function packageHeadings(pkg: TrekPackage) {
  const ebc = isEbcPackage(pkg);
  const pick = (value: string | undefined, ebcDefault: string, generic: string) =>
    value?.trim() || (ebc ? ebcDefault : generic);
  return {
    about: pick(pkg.aboutTitle, "About this luxury trek", "About this journey"),
    why: pick(pkg.whyTitle, "Why this luxury Everest Base Camp trek", "Why travel with Ambition Holidays"),
    fit: pick(pkg.fitTitle, "Is this trek for you?", "Is this journey for you?"),
    khumbu: pick(pkg.khumbuTitle, "The Khumbu you actually walk", "The region you travel through"),
    mapBody: pick(
      pkg.mapBody,
      "The luxury walking line from Lukla to Everest Base Camp, with Kala Patthar marked for sunrise.",
      "",
    ),
    weatherNote: pick(
      pkg.weatherNote,
      "Month-by-month Khumbu reference only. The day you walk can be colder, windier or clearer than the chart.",
      "",
    ),
    luklaNote: pick(pkg.luklaNoteTitle, "Special information for Lukla flights", "Special travel information"),
    notes: pick(pkg.notesTitle, "Lukla, buffer days and helicopter", "Flights, buffer days and upgrades"),
    flight: pick(pkg.flightTitle, "Kathmandu to Lukla", "Flights and transfers"),
    buffer: pick(pkg.bufferTitle, "Buffer days", "Buffer days"),
    heli: pick(pkg.heliTitle, "Helicopter upgrade", "Helicopter upgrade"),
  };
}

export const TREK_DAY_DISTANCE: Record<number, string> = {
  1: "Airport transfer",
  2: "8 km / 5 mi",
  3: "10–11 km / 6.5 mi",
  4: "4–6 km / 3 mi",
  5: "9–10 km / 6 mi",
  6: "10 km / 6.2 mi",
  7: "4–5 km / 3 mi",
  8: "8 km / 5 mi",
  9: "13 km / 8 mi",
  10: "15 km / 9.3 mi",
  11: "17.7 km / 11 mi",
  12: "19 km / 11.8 mi",
  13: "Mountain flight",
  14: "Airport transfer",
};

const IMG = "/images/nepal/nepal-trek-ebc.webp";

export const DEFAULT_TRIP_PACKAGES: TrekPackage[] = [
  {
    id: "ebc-lux",
    catalogId: "ebc-lux",
    slug: "everest-base-camp-trek",
    country: "nepal",
    status: "published",
    featured: true,
    badge: "Most Popular",
    title: "Everest Base Camp Luxury Trek",
    subtitle: "Follow the Khumbu trail to the base of the world’s highest peak, with private lodge nights.",
    duration: "14 Days / 13 Nights",
    days: 14,
    difficulty: "Challenging",
    destination: "Nepal · Everest / Khumbu",
    maxAltitude: "5,545 m / 18,192 ft",
    maxAltitudeFt: "18,192 ft",
    countryLabel: "Nepal",
    activityLabel: "Trekking / Hiking",
    accommodationLabel: "Luxury hotel + premium lodges",
    mealsLabel: "Included on trek",
    startEndLabel: "Kathmandu",
    groupSize: "Private · 2–10 guests",
    bestSeason: "March–May · September–November",
    priceUsd: 2450,
    groupPrices: [
      { id: "p1", label: "1 Pax", priceUsd: 2680 },
      { id: "p2", label: "2–3 Pax", priceUsd: 2450 },
      { id: "p3", label: "4–9 Pax", priceUsd: 2320 },
      { id: "p4", label: "10–14 Pax", priceUsd: 2190 },
    ],
    overview:
      "This is Ambition Holidays’ private-lodge Everest Base Camp journey: fourteen days from Kathmandu to the Khumbu Icefall and back, with upgraded rooms, a dedicated guide team, and unhurried acclimatization in Namche Bazaar and Dingboche. You walk the classic trail through Phakding, Namche, Tengboche, Dingboche, Lobuche and Gorakshep. Base Camp itself sits at 5,364 m; the panoramic Everest view is from Kala Patthar at 5,545 m the day before. The walking is not technical, but it is demanding — five to seven hours on most days, thin air above 4,000 m, and a long Day 10 that pairs the glacier walk with the descent. We design the nights around comfort so the trail stays the adventure. Permits for Sagarmatha National Park and the Khumbu Pasang Lhamu Rural Municipality are arranged before you fly. Sister company Ambition Himalaya Treks and Expeditions has worked this route for more than a decade; Ambition Holidays layers private lodges and a quieter guest-to-staff ratio on that same Himalayan experience.",
    highlights: [
      "Fourteen luxury days on the Khumbu trail, opening with the mountain hop into Lukla — one of the most watched short runways in the Himalaya.",
      "Walk with Sherpa hosts through Namche, Tengboche and Dingboche, and learn the pace of highland life rather than rushing the altitude.",
      "Enter Sagarmatha National Park, a UNESCO World Heritage landscape of ice, forest and prayer walls.",
      "Visit the Sherpa Culture Museum in Namche for the first proper look at highland artefacts and climbing history.",
      "On the Namche acclimatization day, walk to Hotel Everest View for a sit-down look at Everest, Lhotse and Ama Dablam.",
      "Tengboche Monastery sits on a saddle under Ama Dablam — one of the great gompas of the Khumbu.",
      "Stand at Everest Base Camp, 5,364 m, on the Khumbu Glacier, then climb Kala Patthar at 5,545 m for the dawn pyramid Base Camp itself cannot give.",
      "Pass the Hillary School in Khumjung, named for Sir Edmund Hillary, on the Namche rest loop when weather and energy allow.",
      "Walk the lateral moraine of the Khumbu Glacier — ice, granite and prayer flags on the last high days.",
    ],
    inclusions: EBC_INCLUSIONS,
    exclusions: EBC_EXCLUSIONS,
    gallery: [
      IMG,
      "/images/nepal/nepal-cover.webp",
      "/images/nepal/nepal-heli-ebc.webp",
      "/images/nepal/nepal-trek-gokyo.webp",
      "/images/nepal/nepal-trek-abc.webp",
      "/images/nepal/nepal-trek-manaslu.webp",
    ],
    tripGalleryTitle: "Trip Gallery",
    galleryAlts: [
      "Khumbu glacier trail toward Everest at dusk",
      "Everest region mountain cover",
      "Helicopter above the Everest trail",
      "Gokyo lakes under high peaks",
      "Annapurna sanctuary ridge",
      "Manaslu circuit mountain trail",
    ],
    heroSrc: IMG,
    heroAlt: "Khumbu glacier trail toward Everest at dusk",
    altitudeChartM: "",
    altitudeChartFt: "",
    altitudeGainSrc: "",
    routeMapSrc: "/images/packages/everest-base-camp-luxury-trek-route-map.webp",
    weatherDailySrc: "",
    weatherMonthlySrc: "",
    routeMapFile: "everest-base-camp-trek-route-map",
    altitudeMFile: "everest-base-camp-trek-altitude-meters",
    altitudeFtFile: "everest-base-camp-trek-altitude-feet",
    weatherDailyFile: "everest-base-camp-trek-daily-temperature",
    weatherMonthlyFile: "everest-base-camp-trek-monthly-temperature",
    itineraryIntro: EBC_ITINERARY_INTRO,
    itinerary: EBC_ITINERARY,
    faqs: [
      {
        q: "How hard is the Everest Base Camp Luxury Trek?",
        a: "Moderate for guests who already walk four to six hours on uneven ground. It is not a climb. Altitude is the real difficulty. Two acclimatization nights are built in; we turn around if a guest is not safe to continue. Guides and porters are paid for the full trip either way.",
      },
      {
        q: "What is the highest point?",
        a: "Kala Patthar at 5,545 m for the Everest view. Everest Base Camp is 5,364 m. You do not go onto the mountain.",
      },
      {
        q: "When should I travel?",
        a: "March to May and September to November are the reliable windows. Winter is possible for strong walkers who accept cold lodges and a quieter trail. Monsoon (June–August) means clouds, leeches in the lower forest, and more Lukla delays.",
      },
      {
        q: "Which permits do I need?",
        a: "Sagarmatha National Park entry and the Khumbu Pasang Lhamu Rural Municipality permit. Ambition Holidays arranges both before you fly. TIMS is not used on this route under current Khumbu rules.",
      },
      {
        q: "What if the Lukla flight is cancelled?",
        a: "We rebook the next weather window. Keep two to three spare days after Day 14. A shared helicopter can be quoted on the day if you choose not to wait.",
      },
      {
        q: "Can I actually do this trek?",
        a: "Yes, if you can walk five to seven hours a day on uneven ground for two weeks and you take altitude seriously. It is not technical climbing. Fitness helps; rushing does not. We keep Namche and Dingboche as two-night stops so the ascent stays honest.",
      },
      {
        q: "Will I see Everest from Base Camp?",
        a: "No. The Khumbu Icefall and the surrounding ridges block the summit from Base Camp. That is why Kala Patthar is in the itinerary — it is the viewpoint. Base Camp is the glacier, the prayer flags and, in spring, the expedition tents.",
      },
      {
        q: "What does “luxury” mean on this trail?",
        a: "Selected private lodges and upgraded rooms where the Khumbu allows, a quieter guest-to-staff ratio, Kathmandu hotel nights, and a dedicated guide team. Above Lobuche the buildings are simpler because that is the mountain. We do not invent five-star hotels at 5,000 m.",
      },
      {
        q: "Do I need travel insurance?",
        a: "Yes. Your policy must cover trekking to 6,000 m and helicopter evacuation. We will not put a guest on the Lukla flight without proof of cover.",
      },
    ],
    whyItems: [
      {
        title: "Khumbu-seasoned guides",
        body: "Your lead guide knows this trail in both seasons, carries first-aid training, and checks oxygen saturation on the higher nights. Porters are insured and paid for the full journey whether you finish or turn around.",
      },
      {
        title: "Thamel briefing, not a WhatsApp dump",
        body: "The evening before Lukla we sit in Kathmandu: route, weather window, gear, altitude protocol, and every question you have. Sister company Ambition Himalaya Treks and Expeditions has walked this corridor for more than a decade.",
      },
      {
        title: "Private lodges where they exist",
        body: "We book upgraded rooms and quieter dining where the Khumbu has them — Namche, Dingboche, selected lodges on the way. The trail stays the adventure; the nights are designed so you can sleep.",
      },
      {
        title: "Acclimatization that is not optional",
        body: "Two nights in Namche Bazaar and two in Dingboche. Guests who ask to cut these days are usually the ones who struggle above Lobuche. We keep them.",
      },
      {
        title: "No summit pressure",
        body: "Nobody on the team is paid extra to push you to Base Camp. If a guest should descend, we descend. The itinerary is a plan, not a dare.",
      },
      {
        title: "Lukla backup, quoted cleanly",
        body: "If the mountain airport closes, we wait with you or arrange a helicopter at a private quote. We do not hide weather in the small print.",
      },
    ],
    weatherBody:
      "Spring (March–May) brings longer days, rhododendron in the lower forest, and busier lodges; mornings are often clearer than afternoons. Autumn (September–November) is the sharpest visibility and the coldest nights above Dingboche. Winter is possible for strong walkers who accept quiet lodges and hard frost. June to August is monsoon: cloud, wet trail below Namche, and more Lukla delays — we do not sell this as a luxury window.",
    altitudeBody:
      "You sleep no higher than Gorakshep (5,164 m). The highest walk is Kala Patthar at 5,545 m. Base Camp is 5,364 m. Acute mountain sickness can still appear below these numbers. We climb high and sleep lower on the Namche and Dingboche days, drink more than you think you need, and carry a pulse oximeter. The descent after Base Camp is routed through Pheriche, where the Himalayan Rescue Association has run a seasonal clinic since the 1970s. No itinerary removes altitude risk; a good one refuses to pretend it does.",
    packingItems: [
      "Broken-in boots and a 30–40 L daypack",
      "Down jacket, insulated mid-layer, and a waterproof shell",
      "Four-season sleeping bag rated to at least −15 °C (lodges are cold above 4,000 m)",
      "Microspikes only if we warn you of ice; trekking poles recommended",
      "Headlamp, sunglasses, high-SPF cream, personal first aid",
      "Water bottles or a bladder totalling 2 litres; purification tablets or a filter",
      "Warm hat, gloves, and a buff for the glacier wind",
      "Passport, insurance certificate, and spare passport photos for permits",
    ],
    packingIntro:
      "Treat this as a working list, not a shopping dare. Layers matter more than logos. We issue a porter duffel at the Thamel briefing (20 kg cap). Sleeping bags and down jackets can be rented in Kathmandu if you would rather not fly with bulk. Thamel stocks almost everything if you land a day early.",
    packingGroups: [
      {
        id: "pg-general",
        title: "General",
        items: [
          "Four-season sleeping bag (about −15 °C); rental available in Kathmandu",
          "Sleeping bag liner",
          "Puffy down jacket; rental available in Kathmandu",
          "Daypack 30–40 L with a rain cover",
        ],
      },
      {
        id: "pg-upper",
        title: "Head and hands",
        items: [
          "Sun cap and a warm beanie",
          "Buff or neck gaiter for glacier wind",
          "Headlamp with spare batteries",
          "Category 3–4 sunglasses",
          "Light liner gloves plus insulated outer gloves",
        ],
      },
      {
        id: "pg-torso",
        title: "Torso",
        items: [
          "Technical base layer (light for spring, heavier for late autumn)",
          "Two short-sleeve and two long-sleeve trekking shirts",
          "Waterproof, windproof shell",
          "Fleece or light insulated mid-layer",
        ],
      },
      {
        id: "pg-legs",
        title: "Lower body",
        items: [
          "Technical base layer for colder nights",
          "Two pairs of hiking trousers",
          "Soft lodge trousers",
          "Waterproof shell trousers",
          "Optional hiking shorts for Lukla–Namche heat",
        ],
      },
      {
        id: "pg-feet",
        title: "Feet",
        items: [
          "Broken-in waterproof boots",
          "Wool hiking socks plus liner socks",
          "Lodge shoes or light sandals",
          "Microspikes from November to March if we warn of ice",
          "Optional gaiters for dust or snow",
        ],
      },
      {
        id: "pg-med",
        title: "First aid and sun",
        items: [
          "Personal medications; guides carry a group kit, not your prescriptions",
          "High-SPF cream and lip balm",
          "Simple cough syrup for dry Khumbu air",
          "Blister kit and any tape you already trust",
        ],
      },
      {
        id: "pg-kit",
        title: "Documents and trail kit",
        items: [
          "Passport, insurance certificate, spare passport photos",
          "Two-litre bottles or a bladder plus purification",
          "Dry bags for documents and electronics",
          "Toiletries, small towel, two rolls of tissue",
          "High-protein snacks",
          "Trekking poles",
        ],
      },
      {
        id: "pg-opt",
        title: "Optional",
        items: [
          "Power bank, camera, spare batteries",
          "Book or cards for lodge evenings",
          "Thermos",
          "Pee bottle if you prefer not to leave a sleeping bag at 5,000 m",
        ],
      },
    ],
    suitableBody:
      "This luxury trek suits guests who already walk four to six hours on uneven ground and who will take altitude seriously. It is not technical climbing. Families, private pairs and small groups all walk it when the pace stays honest. If you have never walked a long day with a daypack, start that habit before you fly. We can add extra support — a closer guide ratio, a slower Namche loop — if you tell us at booking. Age is less important than patience on the climbs and the will to turn around if a night goes badly.",
    trainingBody:
      "Most walking days are five to seven hours. Train the legs and the lungs, not a gym aesthetic. Walk hills with a 5–7 kg daypack three or four times a week in the two months before departure. Add simple strength for quads, glutes and calves. Cardio that lasts forty minutes without stopping is more useful than short sprints. Mentally expect cold lodges, basic toilets above Namche, and days when the view is cloud. The guests who arrive already used to long walks are the ones who enjoy Dingboche rather than endure it.",
    khumbuBody:
      "The Khumbu is not only ice. The trail starts in pine and rhododendron, follows the Dudh Koshi, then leaves the trees for yak pasture, moraine and glacier. Sherpa towns — Namche, Khumjung, Tengboche, Pangboche — sit on that line, with gompas, mani walls and a Saturday market when the dates match. From the trail you see Everest when the ridges allow, plus Lhotse, Nuptse, Ama Dablam, Thamserku, and on the Dingboche day often Makalu. Base Camp is the glacier and the prayer flags; Kala Patthar is the viewpoint. You stay on the Nepal side of a mountain that belongs to two countries.",
    flightBody:
      "In peak spring and autumn, Lukla flights often leave from Manthali (Ramechhap), not Kathmandu’s domestic terminal. That means a pre-dawn road transfer of about four hours. We confirm the airport the night of your briefing. Off-peak months can still fly Kathmandu–Lukla. Either way the mountain hop is short, scenic, and weather-owned.",
    bufferBody:
      "Keep two to three spare days after Day 14. Lukla closes in cloud, wind and, in spring, traffic. If your international ticket is the morning after Day 14, you are gambling. We rebook the next weather window; a shared or private helicopter is a paid option when you would rather not wait.",
    heliBody:
      "A private helicopter can shorten the walk out from Gorakshep or cover a cancelled Lukla flight. Cost depends on aircraft, load and the day’s weather — we quote before you commit, never as a surprise add-on at 5,000 m. This remains a walking journey unless you ask us to redesign it.",
    beforeItems: [
      "Travel insurance with helicopter evacuation to 6,000 m is mandatory before the Lukla morning.",
      "You will not stand on the 8,848 m summit. This trek ends at Base Camp and Kala Patthar.",
      "Rooms above Namche are twin-sharing unless you pay for a private room where lodges have them.",
      "Porter loads are capped at 20 kg. Extra weight is either left in Kathmandu or carried by you.",
      "Hot showers, charging and Wi-Fi on the trail are lodge extras, not inclusions.",
      "Tips for guide and porter are customary and entirely your decision at the Lukla dinner.",
    ],
    permitsLabel: "Sagarmatha NP + Khumbu Rural Municipality",
    regionLabel: "Everest · Khumbu",
    startLabel: "Kathmandu → Lukla",
    metaTitle: "Everest Base Camp Luxury Trek 14 Days | Ambition Holidays",
    metaDescription:
      "Private-lodge Everest Base Camp trek in 14 days. Moderate Khumbu trail to 5,364 m, Kala Patthar sunrise, Namche and Dingboche acclimatization. Ambition Holidays, Kathmandu.",
    metaKeywords:
      "Everest Base Camp luxury trek, 14 days EBC, private lodge Khumbu, Kala Patthar, Namche Bazaar, Ambition Holidays Nepal",
    tripadvisorLabel: "Excellent",
    tripadvisorScore: "5.0",
    tripadvisorCount: "180+ Reviews",
    tripadvisorHref: "https://www.tripadvisor.com",
    tripadvisorLogoSrc: "/images/reviews/tripadvisor-owl.png",
    googleLabel: "Excellent",
    googleScore: "5.0",
    googleCount: "210+ Reviews",
    googleHref: "https://www.google.com/maps",
    watchVideo: EBC_WATCH_VIDEO,
    videoReviews: EBC_VIDEO_REVIEWS,
    reviews: [
      {
        id: "g-alexandra",
        platform: "google",
        name: "Alexandra G",
        avatarSrc: "",
        rating: 5,
        dateLabel: "4 months ago",
        meta: "Local Guide · 21 reviews",
        title: "",
        body: "One of the most memorable experiences of my life. From day one the team was welcoming, organised, and honest about altitude. The private lodges on the Khumbu nights made the long days possible.",
      },
      {
        id: "g-robert",
        platform: "google",
        name: "Robert McCann",
        avatarSrc: "",
        rating: 5,
        dateLabel: "A year ago",
        meta: "Local Guide · 20 reviews",
        title: "",
        body: "The Everest Base Camp itinerary was paced properly — Namche and Dingboche rest days were not optional, and that is why we reached Base Camp feeling well. Briefing in Thamel was thorough.",
      },
      {
        id: "ta-wanda",
        platform: "tripadvisor",
        name: "Wanda J Estes",
        avatarSrc: "/images/reviews/avatar-wanda.webp",
        rating: 5,
        dateLabel: "Reviewed",
        meta: "1 contribution",
        title: "Private lodges, real trail",
        body: "Luxury on this route means quieter rooms and a guide who will turn around if the night goes badly. We felt looked after without being hurried to the glacier.",
      },
      {
        id: "ta-daniel",
        platform: "tripadvisor",
        name: "Daniel K",
        avatarSrc: "/images/reviews/avatar-daniel.webp",
        rating: 5,
        dateLabel: "Reviewed",
        meta: "3 contributions",
        title: "Kala Patthar was the day",
        body: "Base Camp is the glacier; Kala Patthar is the mountain. The team timed the climb for a clear window and the descent to Pheriche was honest about tired legs.",
      },
    ],
    tripInfoTitle: "Luxury Everest Base Camp Trek – Trip Information",
    tripInfo: [
      {
        id: "ti-season",
        title: "Best season",
        body: "Spring (March–May) and autumn (September–November) are the windows we recommend: clearer ridges, more honest lodge service, and a Lukla schedule that usually holds. Winter is possible for guests who accept hard frost and quiet dining rooms. Monsoon is not a luxury month on this trail — cloud, wet forest below Namche, and more cancelled mountain flights.\n\nThe Khumbu stays the Khumbu. What changes with Ambition Holidays is the night: upgraded rooms where they exist, a slower briefing in Thamel, and a guest-to-staff ratio that lets the day finish without a scramble.",
      },
      {
        id: "ti-elev",
        title: "Elevation & trekking distance",
        body: "Everest Base Camp sits at 5,364 m on the Khumbu Glacier. Kala Patthar, the viewpoint, is 5,545 m. Gorakshep, the last overnight, is 5,164 m. The classic luxury itinerary is fourteen days including the Lukla hop, two acclimatization nights, the glacier walk, and the return.\n\nFrom Lukla the walking line is about 65 km through Phakding, Namche Bazaar, Tengboche, Dingboche, Lobuche and Gorakshep. The destination is not the only point. The journey is designed so the lodges, meals and pacing match the altitude rather than fighting it.",
      },
      {
        id: "ti-hours",
        title: "Maximum / minimum walking per day",
        body: "Most days are four to seven hours on the trail, depending on terrain, weather and how the group is moving. The longest efforts sit around Base Camp and Kala Patthar. Namche and Dingboche are built as rest-and-climb-high days so you are not rushed into thin air.",
      },
      {
        id: "ti-diff",
        title: "Difficulty",
        body: "This remains a high-altitude walk, even with private lodges and a dedicated team. There is no technical climbing, but you will walk for hours on stone, dust, ice and suspension bridges, often in cold wind. Luxury here is the night and the support — not a shortcut around altitude.",
      },
      {
        id: "ti-begin",
        title: "Can a beginner join the luxury EBC trek?",
        body: "Yes, if you already walk several hours on uneven ground and will take the acclimatization nights seriously. Previous high-altitude trekking is not required. A positive pace and the will to turn around if a night goes badly matter more than a gym aesthetic. Our guides brief you in Thamel and stay with you on the trail.",
      },
      {
        id: "ti-fit",
        title: "Your health & fitness",
        body: "Prepare the legs, lungs and patience. Walk hills with a daypack, climb stairs, cycle or swim in the weeks before you fly. Luxury lodges do not replace thin air. Guests who arrive already used to long walks are the ones who enjoy Dingboche rather than endure it.",
      },
      {
        id: "ti-prep",
        title: "Preparation & training",
        body: "Start at least several weeks out. Regular walking, hiking, running or cycling builds the endurance the Khumbu asks for. Short lower-elevation hikes teach you how a six-hour day feels. Simple breathing work helps on the climbs. We issue a porter duffel at briefing; you still carry a daypack.",
      },
      {
        id: "ti-alt",
        title: "Alternate routes",
        body: "The Everest region can be rewritten around your time and taste: Base Camp with Gokyo Lakes, the Three Passes (Kongma La, Cho La, Renjo La), an approach via Jiri, or Gokyo Ri with the turquoise lakes. We quote these as private luxury itineraries — not as a last-minute add-on at 5,000 m.",
      },
      {
        id: "ti-acclim",
        title: "Altitude & acclimatization",
        body: "Two nights in Namche Bazaar and two in Dingboche are not optional. Your guide watches pacing, hydration and how you sleep. If symptoms become serious, the correct move is down. No itinerary removes altitude risk; a good one refuses to pretend it does.",
      },
      {
        id: "ti-food",
        title: "Food & dining",
        body: "Trail menus mix Nepali, Indian, Tibetan, Chinese and simple international plates, limited by what the lodge can cook at that height. Breakfast, lunch and dinner on trek days are included as listed. We choose dining rooms for comfort where the Khumbu allows it. Kathmandu lunches and dinners stay your own unless we have booked otherwise.",
      },
      {
        id: "ti-net",
        title: "Internet & device charging",
        body: "Wi-Fi and charging appear in many lodges, then grow slower and dearer as you climb. Carry a power bank. Treat connectivity as a lodge extra, not an inclusion.",
      },
      {
        id: "ti-permits",
        title: "Permits",
        body: "The classic route needs a Sagarmatha National Park entry permit and a Khumbu Pasang Lhamu Rural Municipality permit. We arrange both before the Lukla morning as part of the package preparation.",
      },
      {
        id: "ti-day",
        title: "A typical day on your luxury trek",
        body: "Breakfast, then the trail: Sherpa villages, mani walls, yak trains, suspension bridges and the next lodge. After walking you wash, eat, and let the Khumbu night take over — a sky without city light. The briefing you had in Thamel is the map; the day is the mountain.",
      },
      {
        id: "ti-lux",
        title: "The luxury difference",
        body: "Premium Kathmandu nights, selected mountain lodges, private airport transfers, an experienced guide, porter support, planned acclimatization, quality meals on trek days, permit handling, and a pre-trek briefing that is a conversation, not a WhatsApp dump. Private or small-group pacing. The trail stays the adventure; the nights are designed so you can sleep.",
      },
    ],
    optionalAddons: EBC_ADDONS,
    includeNote: EBC_INCLUDE_NOTE,
    luklaNote: EBC_LUKLA_NOTE,
    reviewsWallpaperSrc: "/images/atmosphere/ebc-premium-section.webp",
    slugHistory: ["everest-base-camp-luxury-trek"],
  },
  ABC_LUXURY_TRIP_PACKAGE,
];

export const RESERVED_PACKAGE_SLUGS = [
  "admin",
  "orbit",
  "trip",
  "packages",
  "saved",
  "journal",
  "contact",
  "blog",
  "about-us",
  "company",
  "nepal",
  "bhutan",
  "tibet",
  "himalayan-multi-countries-tour",
  "helicopter-tours",
  "photography-treks",
  "legal-documents",
  "how-to-book",
  "become-a-partner",
  "privacy-policy",
  "terms-and-conditions",
  "visa-and-entry",
  "best-time-to-visit",
  "packing-guide",
  "altitude-tips",
  "permits-and-fees",
  "experiences",
  "himalayan-multi-countries",
  "everest-base-camp-luxury-trek",
  "privacy",
  "terms",
  "api",
  "orbit-login",
  "uploads",
  "images",
  "sitemap.xml",
  "robots.txt",
];

/** Live-typing friendly slug cleanup: keeps a trailing hyphen so the user can keep typing. */
export function cleanSlugInput(value: string) {
  return value
    .toLowerCase()
    .replace(/^\/+/, "")
    .replace(/^trip\//, "")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/-{2,}/g, "-")
    .replace(/^-/, "")
    .slice(0, 90);
}

export function isValidPackageSlug(slug: string) {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
}

/** Returns an error message, or "" when the slug can be used by this package. */
export function packageSlugProblem(slug: string, packages: TrekPackage[], selfId: string) {
  if (!slug) return "Add a URL slug.";
  if (!isValidPackageSlug(slug)) return "Use lowercase letters, numbers and hyphens only (e.g. annapurna-base-camp-trek).";
  if (RESERVED_PACKAGE_SLUGS.includes(slug)) return `/${slug} is used by another site page. Choose a different slug.`;
  if (packages.some((pkg) => pkg.id !== selfId && (pkg.slug === slug || packageLookupSlugs(pkg).has(slug)))) {
    return `Another package already uses /${slug}.`;
  }
  return "";
}

type CatalogCardLike = { id: string; href: string; title?: string };

/** Where a country-page card should link: its published trek page, otherwise an enquiry. */
export function resolveCatalogHref(card: CatalogCardLike, packages: TrekPackage[]) {
  const href = card.href || "";
  const cleanSlug = href.replace(/^\//, "").replace(/^trip\//, "");
  const published = packages.filter((pkg) => pkg.status === "published");
  const byId = published.find((pkg) => pkg.catalogId === card.id || pkg.id === card.id);
  if (byId) return tripPath(byId);
  const bySlug = published.find((pkg) => pkg.slug === cleanSlug || (cleanSlug && packageLookupSlugs(pkg).has(cleanSlug)));
  if (bySlug) return tripPath(bySlug);
  const title = (card.title || "").trim();
  if (title.length > 6) {
    const wanted = compactTitle(title);
    const byTitle = published.find((pkg) => {
      const have = compactTitle(pkg.title);
      return have === wanted || have.includes(wanted) || wanted.includes(have);
    });
    if (byTitle) return tripPath(byTitle);
  }
  const unpublished = packages.some(
    (pkg) => pkg.catalogId === card.id || (cleanSlug && (pkg.slug === cleanSlug || packageLookupSlugs(pkg).has(cleanSlug))),
  );
  if (unpublished || !href) return `/contact?interest=${encodeURIComponent(card.id)}`;
  return href;
}

export function cardLinkedToPackage(
  card: { id?: string; href: string; title?: string },
  pkg: TrekPackage,
  extraHrefs: Iterable<string> = [],
) {
  if (card.id && (card.id === pkg.catalogId || card.id === pkg.id || card.id === `trip-${pkg.catalogId}`)) return true;
  const href = (card.href || "").replace(/^\//, "");
  if (href && (pkg.slug === href || packageLookupSlugs(pkg).has(href))) return true;
  for (const extra of extraHrefs) {
    if (extra && extra.replace(/^\//, "") === href) return true;
  }
  return false;
}

export function packageSeoInput(pkg: TrekPackage) {
  const itineraryText = (pkg.itinerary ?? []).map((day) => `${day.title} ${day.body}`).join(" ");
  const infoText = (pkg.tripInfo ?? []).map((block) => block.body).join(" ");
  const faqText = (pkg.faqs ?? []).map((faq) => `${faq.q} ${faq.a}`).join(" ");
  return {
    focusKeyword: pkg.focusKeyword || "",
    title: pkg.title,
    metaTitle: pkg.metaTitle || "",
    metaDescription: pkg.metaDescription || "",
    slug: pkg.slug,
    intro: `${pkg.subtitle} ${pkg.overview.split(/\n{2,}/)[0] || ""}`,
    body: [pkg.overview, ...(pkg.highlights ?? []), itineraryText, infoText, faqText].join(" "),
    headings: [
      `Highlights of ${pkg.title}`,
      `${pkg.title} itinerary`,
      pkg.tripInfoTitle || "",
      ...(pkg.tripInfo ?? []).map((block) => block.title),
      ...(pkg.faqs ?? []).map((faq) => faq.q),
    ].filter(Boolean),
    imageSrc: pkg.heroSrc,
    imageAlt: pkg.heroAlt || "",
  };
}

export function tripPath(pkg: Pick<TrekPackage, "slug">) {
  return `/${pkg.slug.replace(/^\//, "")}`;
}

export function tripSlugAliases(slug: string) {
  const s = (slug || "").replace(/^\//, "");
  const aliases = new Set<string>(s ? [s] : []);
  if (s === "everest-base-camp-trek" || s === "everest-base-camp-luxury-trek") {
    aliases.add("everest-base-camp-trek");
    aliases.add("everest-base-camp-luxury-trek");
  }
  if (
    s === "annapurna-base-camp-luxury-trek" ||
    s === "luxury-annapurna-base-camp-trek" ||
    s === "annapurna-base-camp-trek"
  ) {
    aliases.add("annapurna-base-camp-luxury-trek");
    aliases.add("luxury-annapurna-base-camp-trek");
    aliases.add("annapurna-base-camp-trek");
  }
  return aliases;
}

function compactTitle(value: string) {
  return value
    .toLowerCase()
    .replace(/luxury|trek|tour/g, " ")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function withSlugHistory<T extends Pick<TrekPackage, "slug" | "slugHistory">>(
  next: T,
  previous?: Pick<TrekPackage, "slug" | "slugHistory"> | null,
): T {
  const hist = [...(next.slugHistory || []), ...(previous?.slugHistory || [])];
  if (previous?.slug && previous.slug !== next.slug) hist.push(previous.slug);
  const unique = [...new Set(hist.map((item) => item.replace(/^\//, "")).filter((item) => item && item !== next.slug))];
  return { ...next, slugHistory: unique.slice(-24) };
}

export function packageLookupSlugs(pkg: Pick<TrekPackage, "slug" | "slugHistory">) {
  const slugs = tripSlugAliases(pkg.slug);
  for (const old of pkg.slugHistory || []) {
    for (const alias of tripSlugAliases(old)) slugs.add(alias);
  }
  return slugs;
}

export function packagesSharePage(
  a: Pick<TrekPackage, "id" | "catalogId" | "slug" | "slugHistory">,
  b: Pick<TrekPackage, "id" | "catalogId" | "slug" | "slugHistory">,
) {
  if (a.id === b.id) return true;
  const aIds = new Set([a.id, a.catalogId, a.catalogId ? `trip-${a.catalogId}` : ""].filter(Boolean));
  if (aIds.has(b.id) || (b.catalogId && (aIds.has(b.catalogId) || aIds.has(`trip-${b.catalogId}`)))) return true;
  const defA = DEFAULT_TRIP_PACKAGES.find(
    (d) => d.id === a.id || (a.catalogId && d.catalogId === a.catalogId) || a.id === `trip-${d.catalogId}`,
  );
  const defB = DEFAULT_TRIP_PACKAGES.find(
    (d) => d.id === b.id || (b.catalogId && d.catalogId === b.catalogId) || b.id === `trip-${d.catalogId}`,
  );
  if (defA && defB && defA.id !== defB.id) return false;
  if (!a.slug || !b.slug) return false;
  const aliases = packageLookupSlugs(a);
  return [...packageLookupSlugs(b)].some((item) => aliases.has(item));
}

export function findTripBySlug(packages: TrekPackage[], slug: string) {
  const needle = (slug || "").replace(/^\//, "");
  if (!needle) return undefined;
  const published = packages.filter((pkg) => pkg.status === "published");
  const exact = published.find((pkg) => pkg.slug === needle);
  if (exact) return exact;
  return published.find((pkg) => packageLookupSlugs(pkg).has(needle));
}

function foldDuplicateTripPackages(packages: TrekPackage[]): TrekPackage[] {
  const out: TrekPackage[] = [];
  for (const pkg of packages) {
    const idx = out.findIndex((keep) => packagesSharePage(keep, pkg));
    if (idx < 0) {
      out.push(pkg);
      continue;
    }
    const keep = out[idx];
    const canonical = DEFAULT_TRIP_PACKAGES.find((d) => packagesSharePage(d, keep) || packagesSharePage(d, pkg));
    out[idx] = {
      ...keep,
      ...pkg,
      id: canonical?.id ?? keep.id,
      catalogId: canonical?.catalogId ?? keep.catalogId ?? pkg.catalogId,
      slug: pkg.slug || keep.slug || canonical?.slug || pkg.slug,
      groupPrices: pkg.groupPrices?.length ? pkg.groupPrices : keep.groupPrices,
      priceUsd: typeof pkg.priceUsd === "number" ? pkg.priceUsd : keep.priceUsd,
    };
  }
  return out;
}

export function coerceTripPackages(saved: TrekPackage[] | undefined): TrekPackage[] {
  const incoming = Array.isArray(saved) ? saved : [];
  const usedIds = new Set<string>();
  const merged = DEFAULT_TRIP_PACKAGES.map((def) => {
    const matches = incoming.filter((pkg) => pkg.id === def.id || packagesSharePage(pkg, def));
    for (const match of matches) usedIds.add(match.id);
    const item = matches.reduce<TrekPackage | undefined>((acc, next) => {
      if (!acc) return next;
      return {
        ...acc,
        ...next,
        id: def.id,
        catalogId: def.catalogId,
        groupPrices: next.groupPrices?.length ? next.groupPrices : acc.groupPrices,
        priceUsd: typeof next.priceUsd === "number" ? next.priceUsd : acc.priceUsd,
      };
    }, undefined);
    if (!item) return def;
    const mergedPkg: TrekPackage = {
      ...def,
      ...item,
      slug: item.slug === "everest-base-camp-luxury-trek" || !item.slug ? def.slug : item.slug,
      highlights: item.highlights?.some((h) => h.length > 90) ? item.highlights : def.highlights,
      inclusions: item.inclusions?.some((line) => /5-star|Yeti Mountain/i.test(line)) ? item.inclusions : def.inclusions,
      exclusions: item.exclusions?.some((line) => /USD 30|\$ 30 for 15/i.test(line)) ? item.exclusions : def.exclusions,
      gallery: item.gallery?.length ? item.gallery : def.gallery,
      galleryAlts: item.galleryAlts?.length ? item.galleryAlts : def.galleryAlts,
      tripGalleryTitle: item.tripGalleryTitle?.trim() || def.tripGalleryTitle,
      groupPrices: item.groupPrices?.length ? item.groupPrices : def.groupPrices,
      itinerary:
        def.id === EBC_PACKAGE_ID
          ? /sightseeing/i.test(item.itinerary?.[1]?.title || "")
            ? item.itinerary.map((day, index) => ({
                ...def.itinerary[index],
                ...day,
                distance: day.distance || def.itinerary[index]?.distance || "",
              }))
            : def.itinerary
          : item.itinerary?.length >= def.itinerary.length &&
              item.itinerary.every((day) => day.title?.trim() && day.body?.trim())
            ? item.itinerary.map((day, index) => ({
                ...def.itinerary[index],
                ...day,
                distance: day.distance || def.itinerary[index]?.distance || "",
              }))
            : def.itinerary,
      itineraryIntro: /personalized and comfortable/i.test(item.itineraryIntro || "") ? item.itineraryIntro : def.itineraryIntro,
      faqs: item.faqs?.length ? item.faqs : def.faqs,
      whyItems: item.whyItems?.length ? item.whyItems : def.whyItems,
      packingItems: item.packingItems?.length ? item.packingItems : def.packingItems,
      packingGroups: item.packingGroups?.length ? item.packingGroups : def.packingGroups,
      packingIntro: item.packingIntro || def.packingIntro,
      suitableBody: item.suitableBody || def.suitableBody,
      trainingBody: item.trainingBody || def.trainingBody,
      khumbuBody: item.khumbuBody || def.khumbuBody,
      beforeItems: item.beforeItems?.length ? item.beforeItems : def.beforeItems,
      weatherBody: item.weatherBody || def.weatherBody,
      altitudeBody: item.altitudeBody || def.altitudeBody,
      flightBody: item.flightBody || def.flightBody,
      bufferBody: item.bufferBody || def.bufferBody,
      heliBody: item.heliBody || def.heliBody,
      tripadvisorCount: item.tripadvisorCount || def.tripadvisorCount,
      tripadvisorScore: item.tripadvisorScore || def.tripadvisorScore,
      googleCount: item.googleCount || def.googleCount,
      watchVideo: item.watchVideo
        ? {
            ...def.watchVideo,
            ...item.watchVideo,
            videoSrc: (() => {
              const src = (item.watchVideo.videoSrc || "").trim();
              if (!src) return "";
              return src && !/^https?:\/\//i.test(src) && /youtube|youtu\.be/i.test(src)
                ? `https://${src.replace(/^\/+/, "")}`
                : src;
            })(),
            imageSrc: (item.watchVideo.imageSrc || "").trim(),
            duration: (item.watchVideo.duration || "").trim(),
          }
        : def.watchVideo,
      videoReviews: (Array.isArray(item.videoReviews) ? item.videoReviews : def.videoReviews).map((video) => {
        const src = (video.videoSrc || "").trim();
        return {
          ...video,
          videoSrc:
            src && !/^https?:\/\//i.test(src) && /youtube|youtu\.be/i.test(src)
              ? `https://${src.replace(/^\/+/, "")}`
              : src,
        };
      }),
      reviews: item.reviews?.length ? item.reviews : def.reviews,
      tripInfoTitle: item.tripInfoTitle || def.tripInfoTitle,
      tripInfo: item.tripInfo?.length ? item.tripInfo : def.tripInfo,
      optionalAddons: item.optionalAddons?.length ? item.optionalAddons : def.optionalAddons,
      includeNote: item.includeNote || def.includeNote,
      luklaNote: item.luklaNote || def.luklaNote,
      routeMapSrc: item.routeMapSrc || def.routeMapSrc,
      altitudeChartM: item.altitudeChartM || def.altitudeChartM,
      altitudeChartFt: item.altitudeChartFt || def.altitudeChartFt,
      weatherMonthlySrc: item.weatherMonthlySrc || def.weatherMonthlySrc,
      reviewsWallpaperSrc: item.reviewsWallpaperSrc || def.reviewsWallpaperSrc,
      slugHistory: withSlugHistory(
        { slug: item.slug || def.slug, slugHistory: item.slugHistory || [] },
        def,
      ).slugHistory,
    };
    if (def.id === ABC_PACKAGE_ID) {
      return {
        ...mergedPkg,
        duration: def.duration,
        days: def.days,
        itinerary: def.itinerary,
        itineraryIntro: def.itineraryIntro,
        inclusions: def.inclusions,
        exclusions: def.exclusions,
        optionalAddons: def.optionalAddons,
        includeNote: def.includeNote,
        luklaNote: def.luklaNote,
        highlights: def.highlights,
        overview: def.overview,
        faqs: def.faqs,
        tripInfo: def.tripInfo,
        tripInfoTitle: def.tripInfoTitle,
        whyItems: def.whyItems,
        khumbuBody: def.khumbuBody,
        flightBody: def.flightBody,
        bufferBody: def.bufferBody,
        beforeItems: def.beforeItems,
        flightTitle: def.flightTitle,
        notesTitle: def.notesTitle,
        luklaNoteTitle: def.luklaNoteTitle,
        aboutTitle: def.aboutTitle,
        khumbuTitle: def.khumbuTitle,
        mapBody: def.mapBody,
        weatherBody: def.weatherBody,
        altitudeBody: def.altitudeBody,
        heliBody: def.heliBody,
        packingItems: def.packingItems,
        packingIntro: def.packingIntro,
        packingGroups: def.packingGroups,
        suitableBody: def.suitableBody,
        trainingBody: def.trainingBody,
        startLabel: def.startLabel,
        accommodationLabel: def.accommodationLabel,
        mealsLabel: def.mealsLabel,
        regionLabel: def.regionLabel,
        permitsLabel: def.permitsLabel,
        metaTitle: def.metaTitle,
        metaDescription: def.metaDescription,
        metaKeywords: def.metaKeywords,
        focusKeyword: def.focusKeyword,
        weatherMonthlySrc: "",
        altitudeChartM: "",
        altitudeChartFt: "",
        routeMapSrc: "",
        groupPrices: item.groupPrices?.length ? item.groupPrices : def.groupPrices,
        priceUsd: typeof item.priceUsd === "number" && item.priceUsd > 0 ? item.priceUsd : def.priceUsd,
      };
    }
    return mergedPkg;
  });
  const extras = incoming.filter(
    (pkg) => !usedIds.has(pkg.id) && !DEFAULT_TRIP_PACKAGES.some((d) => packagesSharePage(d, pkg)),
  );
  return foldDuplicateTripPackages([...merged, ...extras]);
}

export function cloneTrekTemplate(fields: {
  title: string;
  slug: string;
  country: TrekPackage["country"];
  catalogId?: string;
  heroSrc?: string;
  heroAlt?: string;
  days?: number;
  difficulty?: string;
  subtitle?: string;
  badge?: string;
  status?: TrekPackage["status"];
}): TrekPackage {
  const catalogId = fields.catalogId || `pkg-${Date.now()}`;
  const id = DEFAULT_TRIP_PACKAGES.find((d) => d.catalogId === catalogId || d.id === catalogId)?.id || catalogId;
  const base = DEFAULT_TRIP_PACKAGES[0];
  const slug = fields.slug.replace(/^\//, "").replace(/^trip\//, "").replace(/\s+/g, "-").toLowerCase();
  const days = fields.days && fields.days > 0 ? fields.days : 7;
  const countryLabel = { nepal: "Nepal", bhutan: "Bhutan", tibet: "Tibet", multi: "Nepal · Bhutan · Tibet" }[fields.country];
  const heroSrc = fields.heroSrc || base.heroSrc;
  const heroAlt = fields.heroAlt || fields.title;
  const summary = fields.subtitle || `${fields.title} with Ambition Holidays — private guiding, handpicked stays and unhurried pacing.`;
  const itinerary: TrekItineraryDay[] = Array.from({ length: days }, (_, index) => ({
    id: `d${index + 1}`,
    day: index + 1,
    title: index === 0 ? "Arrival and welcome" : index === days - 1 ? "Departure" : `Day ${index + 1}`,
    altitude: "",
    duration: "",
    meals: index === 0 ? "D" : index === days - 1 ? "B" : "B L D",
    stay: "",
    distance: "",
    body: "",
  }));
  return {
    ...base,
    id,
    catalogId,
    title: fields.title,
    slug,
    country: fields.country,
    status: fields.status || "draft",
    featured: false,
    badge: fields.badge || "",
    subtitle: summary,
    duration: `${days} Days / ${Math.max(days - 1, 0)} Nights`,
    days,
    difficulty: fields.difficulty || "Moderate",
    destination: countryLabel,
    maxAltitude: "",
    maxAltitudeFt: "",
    countryLabel,
    activityLabel: "Luxury tour & trek",
    accommodationLabel: "Luxury hotels + premium lodges",
    mealsLabel: "As per itinerary",
    startEndLabel: fields.country === "bhutan" ? "Paro" : fields.country === "tibet" ? "Lhasa" : "Kathmandu",
    groupSize: "Private · 2–10 guests",
    bestSeason: "March–May · September–November",
    priceUsd: 0,
    groupPrices: [
      { id: "p1", label: "1 Pax", priceUsd: 0 },
      { id: "p2", label: "2–3 Pax", priceUsd: 0 },
      { id: "p3", label: "4–9 Pax", priceUsd: 0 },
    ],
    overview: summary,
    highlights: [],
    inclusions: [
      "Private airport transfers on arrival and departure",
      "Handpicked luxury hotel nights as per the itinerary",
      "Experienced licensed guide throughout the journey",
      "Permits and entrance fees listed in the itinerary",
      "Meals as listed day by day",
    ],
    exclusions: [
      "International flights and visa fees",
      "Travel insurance with evacuation cover",
      "Personal expenses, drinks and tips",
    ],
    gallery: [heroSrc],
    galleryAlts: [heroAlt],
    tripGalleryTitle: "Trip Gallery",
    heroSrc,
    heroAlt,
    altitudeChartM: "",
    altitudeChartFt: "",
    altitudeGainSrc: "",
    routeMapSrc: "",
    weatherDailySrc: "",
    weatherMonthlySrc: "",
    routeMapFile: `${slug}-route-map`,
    altitudeMFile: `${slug}-altitude-meters`,
    altitudeFtFile: `${slug}-altitude-feet`,
    weatherDailyFile: `${slug}-daily-temperature`,
    weatherMonthlyFile: `${slug}-monthly-temperature`,
    itineraryIntro: "",
    itinerary,
    faqs: [],
    whyItems: [],
    weatherBody: "",
    altitudeBody: "",
    packingItems: [],
    packingIntro: "",
    packingGroups: [],
    flightBody: "",
    bufferBody: "",
    heliBody: "",
    beforeItems: [],
    suitableBody: "",
    trainingBody: "",
    khumbuBody: "",
    permitsLabel: "",
    regionLabel: countryLabel,
    startLabel: "",
    metaTitle: `${fields.title} | Ambition Holidays`,
    metaDescription: summary.slice(0, 158),
    metaKeywords: `${fields.title}, luxury ${countryLabel} tour, Ambition Holidays`,
    focusKeyword: fields.title.replace(/^luxury\s+/i, ""),
    watchVideo: {
      id: `watch-${catalogId}`,
      title: "Watch video",
      subtitle: fields.title,
      duration: "",
      imageSrc: "",
      imageAlt: fields.title,
      videoSrc: "",
    },
    videoReviews: [],
    reviews: [],
    slugHistory: [],
    tripInfoTitle: `${fields.title} – Trip Information`,
    tripInfo: [],
    optionalAddons: [],
    includeNote: "",
    luklaNote: "",
    reviewsWallpaperSrc: base.reviewsWallpaperSrc,
    ogTitle: "",
    ogDescription: "",
    ogImageSrc: "",
  };
}

/** Copy an existing package as a new draft with its own id and slug. */
export function duplicateTrekPackage(pkg: TrekPackage, packages: TrekPackage[]): TrekPackage {
  const id = `pkg-${Date.now()}`;
  let slug = `${pkg.slug}-copy`;
  let n = 2;
  while (packages.some((item) => item.slug === slug)) {
    slug = `${pkg.slug}-copy-${n}`;
    n += 1;
  }
  return {
    ...structuredClone(pkg),
    id,
    catalogId: id,
    slug,
    title: `${pkg.title} (copy)`,
    status: "draft",
    featured: false,
  };
}

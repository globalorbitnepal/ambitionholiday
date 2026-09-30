import type { TrekPackage } from "./trip-packages"; // type-only — no runtime cycle
import {
  ABC_ADDONS,
  ABC_EXCLUSIONS,
  ABC_INCLUDE_NOTE,
  ABC_INCLUSIONS,
  ABC_ITINERARY,
  ABC_ITINERARY_INTRO,
  ABC_LUKLA_NOTE,
  ABC_SLUG,
} from "./abc-luxury-content";

import { EBC_VIDEO_REVIEWS, EBC_WATCH_VIDEO } from "./trek-films";

const IMG = "/images/nepal/nepal-trek-abc.webp";

/** Default published Annapurna Base Camp Luxury Trek — merged with CMS unless a full custom save exists. */
export const ABC_LUXURY_TRIP_PACKAGE: TrekPackage = {
  id: "abc-lux",
  catalogId: "abc-lux",
  slug: ABC_SLUG,
  country: "nepal",
  status: "published",
  featured: true,
  badge: "Best Seller",
  title: "Annapurna Base Camp Luxury Trek",
  subtitle: "A private sanctuary walk through rhododendron forests to the foot of Annapurna.",
  duration: "12 Days / 11 Nights",
  days: 12,
  difficulty: "Moderate",
  destination: "Nepal · Annapurna Sanctuary",
  maxAltitude: "4,130 m / 13,550 ft",
  maxAltitudeFt: "13,550 ft",
  countryLabel: "Nepal",
  activityLabel: "Private luxury trek",
  accommodationLabel: "Luxury hotels + premium mountain lodges",
  mealsLabel: "As per itinerary",
  startEndLabel: "Kathmandu",
  groupSize: "Private · 2–10 guests",
  bestSeason: "March–May · September–November",
  priceUsd: 2600,
  groupPrices: [
    { id: "p1", label: "1 Pax", priceUsd: 3800 },
    { id: "p2", label: "2–3 Pax", priceUsd: 3400 },
    { id: "p3", label: "4–9 Pax", priceUsd: 3000 },
    { id: "p4", label: "10–14 Pax", priceUsd: 2600 },
  ],
  overview:
    "The Annapurna Base Camp Luxury Trek is Ambition Holidays’ twelve-day, eleven-night private journey into the sanctuary — two nights in Kathmandu, included domestic flights to and from Pokhara, then a measured walk through Gurung villages, bamboo forest and alpine basin to 4,130 m beneath Annapurna I, Annapurna South, Hiunchuli and Machhapuchare. The walking is moderate: long days on stone steps and forest trail, with no technical climbing. We book the best lodges available on the route, keep group sizes small, and pair the ascent with honest pacing so the sanctuary sunrise feels earned rather than rushed. Private pacing, carefully selected lodges and seamless logistics run throughout the Annapurna Sanctuary.",
  highlights: [
    "Twelve days / eleven nights from Kathmandu to Annapurna Base Camp, with lakeside hotel nights in Pokhara.",
    "Domestic flights between Kathmandu and Pokhara, with private ground transfers for the trekking approach and return.",
    "Walk through Ghandruk (1,940 m) and Chhomrong — stone villages with direct views of Annapurna South and Machhapuchare.",
    "Enter the Modi Khola gorge: bamboo, rhododendron and waterfall days on the sanctuary approach.",
    "Day 8 reaches Machhapuchare Base Camp (3,700 m) and Annapurna Base Camp (4,130 m) on the same walking day.",
    "Sunrise from Base Camp before the long descent — light on ice and granite you cannot see from Pokhara.",
    "Natural hot springs at Jhinu Danda after the high nights — a quiet reward before returning to the lake.",
    "ACAP permit and TIMS handled before you leave Kathmandu; no queueing at the trail gate.",
    "Kathmandu valley sightseeing with Pashupatinath, Boudhanath and Swayambhunath on Day 2.",
  ],
  inclusions: ABC_INCLUSIONS,
  exclusions: ABC_EXCLUSIONS,
  gallery: [
    IMG,
    "/images/packages/annapurna-v2.webp",
    "/images/nepal/nepal-cover.webp",
    "/images/journal/annapurna-clean.webp",
    "/images/packages/annapurna-circuit.webp",
    "/images/nepal/nepal-trek-manaslu.webp",
  ],
  tripGalleryTitle: "Trip Gallery",
  galleryAlts: [
    "Machapuchare above the Annapurna Sanctuary",
    "Annapurna peaks from the sanctuary trail",
    "Nepal Himalayan foothills",
    "Traveller overlooking Annapurna ridges",
    "High Annapurna circuit scenery",
    "Forest trail in the Nepal Himalaya",
  ],
  heroSrc: IMG,
  heroAlt: "Machapuchare above the Annapurna Sanctuary",
  altitudeChartM: "",
  altitudeChartFt: "",
  altitudeGainSrc: "",
  routeMapSrc: "",
  weatherDailySrc: "",
  weatherMonthlySrc: "",
  routeMapFile: "annapurna-base-camp-luxury-trek-route-map",
  altitudeMFile: "annapurna-base-camp-luxury-trek-altitude-meters",
  altitudeFtFile: "annapurna-base-camp-luxury-trek-altitude-feet",
  weatherDailyFile: "annapurna-base-camp-luxury-trek-daily-temperature",
  weatherMonthlyFile: "annapurna-base-camp-luxury-trek-monthly-temperature",
  itineraryIntro: ABC_ITINERARY_INTRO,
  itinerary: ABC_ITINERARY,
  faqs: [
    {
      q: "How difficult is the Annapurna Base Camp Luxury Trek?",
      a: "Moderate. Expect five to six hours on most walking days with stone steps and forest. The highest sleep is Annapurna Base Camp at 4,130 m. Fitness matters; technical skills do not. Guests who already hike regularly and respect altitude finish comfortably.",
    },
    {
      q: "What is the highest point?",
      a: "Annapurna Base Camp at 4,130 m / 13,550 ft. Machhapuchare Base Camp (3,700 m) is reached on Day 8 before you continue to Base Camp the same day. There is no glacier climbing — you walk to the camp and back.",
    },
    {
      q: "When is the best time to go?",
      a: "March to May for rhododendron and clear ridges; September to November for crisp air and sharp peaks. Winter is possible for experienced walkers who accept cold lodges. Monsoon (June–August) brings cloud, leeches in the forest and slick stone — we do not sell it as a luxury window.",
    },
    {
      q: "Which permits are required?",
      a: "Annapurna Conservation Area Permit (ACAP) and TIMS. Ambition Holidays arranges both before you leave Kathmandu.",
    },
    {
      q: "How do I travel between Kathmandu and Pokhara?",
      a: "Domestic flights both ways are included: Kathmandu → Pokhara on Day 3 and Pokhara → Kathmandu on Day 12, with private airport transfers. The package does not use Kathmandu–Pokhara road transport.",
    },
    {
      q: "What does luxury mean on this trek?",
      a: "Premium Kathmandu and Pokhara hotel nights, selected mountain lodges on the trail, private transfers, a dedicated guide and porter support. Above Deurali the buildings are simpler because that is the mountain — we do not promise five-star walls inside the sanctuary.",
    },
    {
      q: "Is travel insurance required?",
      a: "Yes. Your policy must cover trekking to at least 4,500 m and helicopter evacuation. We cannot put you on the trail without proof of cover.",
    },
    {
      q: "Can beginners join?",
      a: "Yes, if you can walk four to six hours on uneven ground several weeks before you fly and you will listen when the guide slows the pace. Previous high-altitude trekking helps but is not mandatory.",
    },
  ],
  whyItems: [
    {
      title: "Sanctuary specialists",
      body: "Your lead guide knows the Modi Khola steps, the Chhomrong descent, and how fast the weather closes in above Deurali. Briefings are in person — route, kit, altitude, lodge plan — not a PDF the night before.",
    },
    {
      title: "Lakeside bookends",
      body: "Pokhara nights are part of the design. You fly in rested and return to a real hotel before the flight to Kathmandu — not a rush straight to the airport.",
    },
    {
      title: "Lodges chosen, not random",
      body: "We reserve the best available rooms on the ABC corridor each season. In peak weeks that means booking early; your confirmation lists the lodge standard we target.",
    },
    {
      title: "Pacing without ego",
      body: "Nobody on the team is paid to drag you to Base Camp if the night went badly. We turn around when altitude says so. The sanctuary is the goal; safety is the rule.",
    },
    {
      title: "Permits done in Kathmandu",
      body: "ACAP and TIMS are on your file before you fly to Pokhara. You walk through the check post with paperwork already stamped.",
    },
    {
      title: "Sister-company trail knowledge",
      body: "Ambition Holidays designs this luxury programme. Guiding on the sanctuary corridor is supported by Ambition Himalaya Treks and Expeditions, our sister trekking company.",
    },
  ],
  weatherBody:
    "Spring (March–May) paints the lower forest in rhododendron and keeps afternoons warmer on the steps to Chhomrong. Autumn (September–November) trades flowers for the sharpest views of Machapuchare and the south face of Annapurna. Winter treks are quiet but cold above Bamboo. Monsoon moisture rises from Pokhara — cloud, rain and leeches below 2,500 m make June–August a poor fit for a luxury-labelled walk.",
  altitudeBody:
    "You sleep no higher than Annapurna Base Camp at 4,130 m. The gain is steady rather than extreme, but the sanctuary is still thin air. Drink more than you think you need, eat even when appetite fades, and tell your guide if sleep or headache changes. There is no helicopter shortcut through the amphitheatre — the correct response to serious altitude illness is descent, not a faster ascent.",
  packingItems: [
    "Broken-in waterproof boots and trekking socks",
    "Layered clothing: base, fleece, down jacket, waterproof shell",
    "Sleeping bag rated to −10 °C for lodge nights (rental available)",
    "Daypack 30–35 L with rain cover",
    "Trekking poles for stone steps and descent days",
    "Sun hat, warm beanie, UV sunglasses",
    "Headlamp, refillable bottles, purification tablets",
    "Personal first aid and prescribed medicines",
  ],
  packingIntro:
    "Pack for forest heat and sanctuary cold in the same week. We issue a porter duffel at the Kathmandu briefing (20 kg cap). Down jackets and sleeping bags can be rented if you prefer not to fly with bulk.",
  packingGroups: [
    {
      id: "abc-general",
      title: "Core kit",
      items: [
        "Four-season sleeping bag or rental from Kathmandu",
        "Down jacket; rental available",
        "Daypack with rain cover",
        "Broken-in waterproof boots",
      ],
    },
    {
      id: "abc-layers",
      title: "Clothing",
      items: [
        "Moisture-wicking base layers",
        "Fleece or light insulated mid-layer",
        "Waterproof jacket and trousers",
        "Trekking trousers and one soft evening set",
        "Warm hat and gloves for Base Camp morning",
      ],
    },
    {
      id: "abc-trail",
      title: "On the trail",
      items: [
        "Trekking poles",
        "Two-litre water capacity plus purification",
        "High-SPF sunscreen and lip balm",
        "Small towel and toiletries",
        "Passport copies and insurance certificate",
      ],
    },
  ],
  suitableBody:
    "This trek suits guests who enjoy long walking days on stone and forest trail and who will communicate honestly about how they feel above 3,000 m. It is not a climb. Couples, families with trekking teenagers, and private friends’ groups all walk it when the pace stays human. If stairs wind you after twenty minutes, build that fitness before you book.",
  trainingBody:
    "Walk hills with a daypack three or four times a week in the two months before departure. Include long stair sessions — Chhomrong’s steps are the real training test. Cardio that lasts forty-five minutes matters more than gym mirrors. If you can manage six hours on feet with breaks, you are in the right zone.",
  khumbuBody:
    "The Annapurna Sanctuary is a glacial basin walled by Annapurna I (8,091 m), Annapurna South (7,219 m), Hiunchuli (6,441 m) and the sacred fishtail of Machhapuchare (6,993 m). Dhaulagiri (8,167 m) stands west of the range. Below Deurali the trail is forest and river; inside the basin it is open moraine and vertical granite. Gurung villages on the approach still farm terraces and host guests in stone lodges. You are inside a conservation area — respect firewood limits and leave no trace above the tree line.",
  flightBody:
    "Day 3 — Kathmandu → Pokhara, domestic flight.\n\nDay 12 — Pokhara → Kathmandu, domestic flight.\n\nPrivate airport transfers are included. Domestic flight schedules are subject to airline operations and weather conditions.",
  bufferBody:
    "Hold a little flexibility at the end of your international ticket. The included Pokhara–Kathmandu flight can move with weather or airline timing; we rebook the next available seat when that happens.",
  heliBody:
    "Helicopter charters from Pokhara or the sanctuary are available for emergencies or private panorama flights — priced per aircraft and weather. This remains a walking itinerary unless you ask us to redesign it.",
  beforeItems: [
    "Travel insurance with helicopter evacuation is mandatory before Day 4.",
    "You will not summit Annapurna I. This trek ends at Base Camp inside the sanctuary.",
    "Rooms on trek are twin-sharing unless you pay for a private room where lodges offer one.",
    "Porter loads are capped at 20 kg per duffel.",
    "Hot showers and charging are lodge extras on many nights.",
    "Tips for guide and porter are customary and entirely your choice at the end.",
  ],
  permitsLabel: "ACAP + TIMS",
  regionLabel: "Annapurna Sanctuary",
  startLabel: "Kathmandu → Pokhara (flight) → ABC",
  flightTitle: "Flights included",
  notesTitle: "Flights, buffer days and upgrades",
  luklaNoteTitle: "Kathmandu ↔ Pokhara flights",
  aboutTitle: "About this luxury Annapurna trek",
  khumbuTitle: "The sanctuary you actually walk",
  mapBody:
    "Kathmandu and Pokhara are linked by included domestic flights. Private ground transfers cover Pokhara–Ghandruk and Jhinu Danda–Pokhara. The walking route runs Ghandruk–Chhomrong–Bamboo–Deurali–Machhapuchare Base Camp–Annapurna Base Camp and back via Bamboo and Jhinu Danda.",
  metaTitle: "Annapurna Base Camp Luxury Trek 12 Days | Ambition Holidays",
  metaDescription:
    "Private 12-day Annapurna Base Camp luxury trek to 4,130 m. Moderate sanctuary walk via Ghandruk, Chhomrong and Pokhara lakeside hotels. Ambition Holidays, Kathmandu.",
  metaKeywords:
    "Annapurna Base Camp luxury trek, ABC trek 12 days, private lodge Annapurna, Machapuchare sanctuary, Pokhara, Ambition Holidays Nepal",
  focusKeyword: "Annapurna Base Camp luxury trek",
  tripadvisorLabel: "Excellent",
  tripadvisorScore: "5.0",
  tripadvisorCount: "140+ Reviews",
  tripadvisorHref: "https://www.tripadvisor.com",
  tripadvisorLogoSrc: "/images/reviews/tripadvisor-owl.png",
  googleLabel: "Excellent",
  googleScore: "5.0",
  googleCount: "165+ Reviews",
  googleHref: "https://www.google.com/maps",
  watchVideo: {
    ...EBC_WATCH_VIDEO,
    id: "abc-watch",
    subtitle: "Annapurna Base Camp Luxury Trek",
  },
  videoReviews: EBC_VIDEO_REVIEWS.map((video) => ({ ...video })),
  reviews: [
    {
      id: "g-abc-sarah",
      platform: "google",
      name: "Sarah L",
      avatarSrc: "",
      rating: 5,
      dateLabel: "5 months ago",
      meta: "12 reviews",
      title: "",
      body: "The sanctuary sunrise was worth every step on the Chhomrong stairs. Lodges were the best available each night and the Pokhara finish felt like a real holiday.",
    },
    {
      id: "g-abc-mark",
      platform: "google",
      name: "Mark T",
      avatarSrc: "",
      rating: 5,
      dateLabel: "8 months ago",
      meta: "Local Guide · 9 reviews",
      title: "",
      body: "Private pacing made the 4,130 m night manageable. Guide checked in every afternoon about altitude — no pressure to push when the headache appeared.",
    },
  ],
  tripInfoTitle: "Annapurna Base Camp Luxury Trek – Trip Information",
  tripInfo: [
    {
      id: "ti-season",
      title: "Best season",
      body: "March to May and September to November are the windows we recommend for this sanctuary walk. Spring adds rhododendron colour on the approach; autumn brings the clearest Machapuchare profiles. Winter is quieter and cold above Bamboo. Monsoon is cloud, rain on stone steps and leeches in the forest — not aligned with a luxury-paced itinerary.",
    },
    {
      id: "ti-elev",
      title: "Elevation & distance",
      body: "Annapurna Base Camp sits at 4,130 m inside the sanctuary. Machhapuchare Base Camp (3,700 m) is reached on the same day (Day 8). Ghandruk is 1,940 m. The walking line from Ghandruk through Chhomrong, Bamboo, Deurali and back is roughly 80–90 km depending on lodge stops. Kathmandu nights sit at 1,400 m; Pokhara nights at 822 m.",
    },
    {
      id: "ti-diff",
      title: "Difficulty",
      body: "Moderate. Long days on stone steps and forest trail without technical climbing. The Chhomrong descent and ascent test knees more than lungs until Deurali. Luxury here means hotel bookends and selected lodges — not a shortened trail.",
    },
    {
      id: "ti-acc",
      title: "Accommodation",
      body: "11 nights in total: Kathmandu 2 nights (Day 1–2), Pokhara 2 nights (Day 3 and Day 11), Ghandruk 1, Chhomrong 1, Bamboo 2, Deurali 1, Annapurna Base Camp 1, Jhinu Danda 1. Luxury hotels in Kathmandu and Pokhara; premium or best-available mountain lodges on trek. Rooms are twin-sharing unless you request a single supplement where lodges can provide one.",
    },
    {
      id: "ti-meals",
      title: "Meals",
      body: "Breakfast in hotels; full board on trekking days as listed in the itinerary. Lodge menus blend Nepali, Tibetan and simple international dishes. Vegetarian and most common dietary needs are accommodated when we know at booking.",
    },
    {
      id: "ti-transport",
      title: "Transportation",
      body: "Kathmandu → Pokhara — domestic flight (included).\n\nPokhara → Kathmandu — domestic flight (included).\n\nPrivate airport transfers.\n\nPrivate Pokhara → Ghandruk ground transfer.\n\nPrivate Jhinu Danda → Pokhara ground transfer.\n\nTrailhead and local transfers as required by the itinerary.",
    },
    {
      id: "ti-safety",
      title: "Trek safety & altitude",
      body: "Guides carry a group first-aid kit and monitor pace, hydration and sleep. Serious altitude symptoms mean descent — not a faster push to Base Camp. Your insurance must fund helicopter evacuation if required.",
    },
    {
      id: "ti-permits",
      title: "Permits",
      body: "Annapurna Conservation Area Permit and TIMS are included and arranged in Kathmandu before you travel to Pokhara.",
    },
    {
      id: "ti-lux",
      title: "Optional luxury upgrades",
      body: "Extra hotel nights, spa time in Pokhara, helicopter panorama, or a Chitwan extension. Quote at booking so rooms and guides are held. Kathmandu–Pokhara flights are already in the package.",
    },
  ],
  optionalAddons: ABC_ADDONS,
  includeNote: ABC_INCLUDE_NOTE,
  luklaNote: ABC_LUKLA_NOTE,
  reviewsWallpaperSrc: "/images/atmosphere/ebc-premium-section.webp",
  ogTitle: "",
  ogDescription: "",
  ogImageSrc: "",
};

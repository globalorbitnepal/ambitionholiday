import type { TrekItineraryDay } from "./trip-packages";
import type { TrekLuxuryExperience } from "./trip-packages";

export const GHOREPANI_POONHILL_SLUG = "ghorepani-poonhill-luxury-trek";

export const GHOREPANI_POONHILL_GROUP_PRICES = [
  { id: "gph-g1", label: "1 person", priceUsd: 1899 },
  { id: "gph-g2", label: "2 people", priceUsd: 1399 },
  { id: "gph-g3", label: "3–4 people", priceUsd: 1249 },
  { id: "gph-g4", label: "5–7 people", priceUsd: 1099 },
  { id: "gph-g5", label: "8+ people", priceUsd: 999 },
] as const;

export const GHOREPANI_POONHILL_ITINERARY_INTRO =
  "Nine days from arrival in Kathmandu through cultural sightseeing, a private road journey to Pokhara, trekking via Ulleri and Ghorepani to Poon Hill, forest trails to Tadapani and Ghandruk, and a return flight to Kathmandu before departure. Road times, trekking hours and included meals follow your signed booking confirmation — this page does not replace operational briefs from your coordinator.";

export const GHOREPANI_POONHILL_ITINERARY: TrekItineraryDay[] = [
  {
    id: "gph-d1",
    day: 1,
    title: "Arrival in Kathmandu",
    altitude: "Kathmandu ~1,400 m",
    duration: "Arrival day — rest and settle in",
    distance: "Airport transfer only",
    meals: "As per confirmed package",
    stay: "Confirmed Kathmandu accommodation, subject to booking",
    body:
      "Arrive at Tribhuvan International Airport in Kathmandu. Your arrival transfer is arranged according to the confirmed service plan on your booking.\n\nAllow time to settle in and rest after your international journey. Briefing timing, welcome arrangements and meals follow the inclusions stated on your signed confirmation — not assumed from this page alone.",
  },
  {
    id: "gph-d2",
    day: 2,
    title: "Kathmandu cultural sightseeing",
    altitude: "Kathmandu ~1,400 m",
    duration: "Full day sightseeing — timing varies with traffic and site access",
    distance: "City transfers between sites",
    meals: "As per confirmed package",
    stay: "Confirmed Kathmandu accommodation",
    body:
      "Explore three important cultural and religious landmarks with your guide:\n\n• Swayambhunath Stupa — the hilltop “Monkey Temple” overlooking the Kathmandu Valley.\n• Boudhanath Stupa — one of the largest Buddhist stupas in Nepal and a centre of Tibetan heritage.\n• Pashupatinath Temple — a sacred Hindu site on the Bagmati River (viewed from designated visitor areas according to local rules).\n\nThe day is paced for photography, short walks between viewpoints and respectful observation. Exact order and duration depend on traffic, festivals and site opening times.",
  },
  {
    id: "gph-d3",
    day: 3,
    title: "Drive from Kathmandu to Pokhara by private car",
    altitude: "Pokhara ~820 m",
    duration: "Private road transfer — typically most of the day; confirm timing operationally",
    distance: "Kathmandu–Pokhara highway (road kilometres confirmed locally)",
    meals: "As per confirmed package",
    stay: "Confirmed Pokhara accommodation",
    body:
      "Travel from Kathmandu to Pokhara by private car, following the scenic Prithvi Highway through river valleys and hillside landscapes.\n\nThis is a road journey, not a flight. Duration varies with traffic, road works and weather — your coordinator states realistic timing before you travel. Evening in Pokhara to prepare for the trek ahead.",
  },
  {
    id: "gph-d4",
    day: 4,
    title: "Drive to Hile and trek to Ulleri",
    altitude: "Ulleri ~2,050 m (approx.)",
    duration: "Road + trek — full day; walking time confirmed with your guide",
    distance: "Trekking distance confirmed after trailhead selection",
    meals: "As per confirmed package",
    stay: "Best available suitable mountain accommodation, subject to confirmation",
    body:
      "Continue by road from Pokhara towards Hile (or the operationally confirmed trailhead), then begin the trek to Ulleri.\n\nThe trail moves from valley roads into stepped village paths and forested hillsides — a clear transition into Annapurna foothill trekking. Ulleri is known for its stone steps and Magar village atmosphere.\n\nConfirm final transport arrangements, trailhead access and expected walking duration with the operations team before publishing exact timings to guests.",
  },
  {
    id: "gph-d5",
    day: 5,
    title: "Trek from Ulleri to Ghorepani",
    altitude: "Ghorepani ~2,860–2,875 m",
    duration: "Trekking day — allow a full day on trail",
    distance: "Approximate distance confirmed on operational brief",
    meals: "As per confirmed package",
    stay: "Best available suitable mountain accommodation, subject to confirmation",
    body:
      "Continue uphill through forested trails and traditional settlements towards Ghorepani. Rhododendron forests are especially colourful in spring; winter mornings can be cold at this elevation.\n\nThe ascent is steady rather than technical — pacing and hydration matter as you gain height. Overnight in Ghorepani in preparation for the early walk to Poon Hill.",
  },
  {
    id: "gph-d6",
    day: 6,
    title: "Poon Hill sunrise and trek to Tadapani",
    altitude: "Poon Hill ~3,210 m · sleep Tadapani ~2,630 m (approx.)",
    duration: "Pre-dawn Poon Hill visit (~2 hours at viewpoint when specified) + trekking day",
    distance: "Viewpoint ascent plus forest trail to Tadapani — distances confirmed locally",
    meals: "As per confirmed package",
    stay: "Best available suitable mountain accommodation at Tadapani, subject to confirmation",
    body:
      "Start early for the climb to Poon Hill, approximately 3,210 m, for the sunrise experience. Allow roughly two hours for the viewpoint visit as specified in your operational plan — return to Ghorepani for breakfast when included.\n\nThen trek through forested trails towards Tadapani. Panoramic views of the Annapurna and Dhaulagiri ranges are possible when visibility allows; cloud, mist and season affect what you see — nothing is guaranteed.\n\nOvernight at Tadapani amid rhododendron and oak forest.",
  },
  {
    id: "gph-d7",
    day: 7,
    title: "Trek to Ghandruk and drive to Pokhara",
    altitude: "Ghandruk ~1,940 m · Pokhara ~820 m",
    duration: "Trekking morning + road transfer — confirm endpoint and pickup with operations",
    distance: "Descent to Ghandruk then vehicle transfer to Pokhara",
    meals: "As per confirmed package",
    stay: "Confirmed Pokhara accommodation when included",
    body:
      "Trek from Tadapani to Ghandruk, a traditional Gurung village with stone lanes, terraced fields and Annapurna-region scenery.\n\nAfter the trek, travel by road to Pokhara from the confirmed pickup point. Verify trekking endpoint, road access and private transport arrangements with the operations team before travel.\n\nEvening in Pokhara to rest before the flight to Kathmandu.",
  },
  {
    id: "gph-d8",
    day: 8,
    title: "Fly from Pokhara to Kathmandu",
    altitude: "Kathmandu ~1,400 m",
    duration: "Domestic flight subject to operations · airport transfers as confirmed",
    distance: "Pokhara–Kathmandu flight sector",
    meals: "As per confirmed package",
    stay: "Confirmed Kathmandu accommodation when included",
    body:
      "Transfer to Pokhara Airport and take the scheduled domestic flight to Kathmandu, subject to airline operations and weather.\n\nBaggage rules, reporting times and any alternative road routing follow airline and local operator instructions. Accommodation and meals in Kathmandu reflect your signed booking — not assumed here.",
  },
  {
    id: "gph-d9",
    day: 9,
    title: "Departure from Kathmandu",
    altitude: "—",
    duration: "Departure day",
    distance: "Airport transfer if included on confirmation",
    meals: "As per confirmed package",
    stay: "—",
    body:
      "Transfer to Tribhuvan International Airport according to your confirmed departure arrangements.\n\nBreakfast, porter assistance and extra hotel services apply only when listed on your booking confirmation. Depart Nepal with memories of the Kathmandu Valley and the Annapurna foothills.",
  },
];

export const GHOREPANI_POONHILL_INCLUSIONS = [
  "Arrival and departure airport transfers when included on your signed confirmation.",
  "Kathmandu cultural sightseeing transport and guiding for the listed sites when included.",
  "Private Kathmandu–Pokhara road transfer (Day 3) — not a flight.",
  "Pokhara–Hile (or confirmed trailhead) road transport when included.",
  "Trekking guide and applicable porter support per confirmed service ratio.",
  "Annapurna Conservation Area permit and applicable trekking fees when included in your quote.",
  "Accommodation and meals according to the board basis confirmed in writing.",
  "Pokhara–Kathmandu domestic flight when listed on your confirmed itinerary.",
  "Private road transfers tied to the confirmed trekking plan where stated.",
];

export const GHOREPANI_POONHILL_EXCLUSIONS = [
  "International flights and Nepal entry visa fees.",
  "Travel insurance and emergency helicopter evacuation (mandatory for trekking).",
  "Personal trekking equipment and clothing.",
  "Meals, drinks and services outside the confirmed board basis.",
  "Tips and gratuities for guide, porter and driver teams.",
  "Extra accommodation or meals caused by flight delays, weather or road disruption.",
  "Optional activities in Kathmandu or Pokhara not named as included.",
  "Any service not explicitly listed as included on your signed booking documents.",
];

export const GHOREPANI_POONHILL_INCLUDE_NOTE =
  "Draft inclusion list for operator verification. Published package terms are those on your signed confirmation.";

export const GHOREPANI_POONHILL_FLIGHT_NOTE =
  "Day 3 is a private road transfer to Pokhara — not a flight. The Pokhara–Kathmandu sector on Day 8 is a domestic flight subject to weather and airline schedules. Allow buffer time on international connections if you fly the same day.";

export const GHOREPANI_POONHILL_LUXURY_EXPERIENCE: TrekLuxuryExperience = {
  title: "What makes this a luxury trek?",
  intro:
    "A nine-day Annapurna journey combining Kathmandu heritage, private road transfers, lodge trekking and a Poon Hill sunrise — coordinated privately with experienced guiding and the best suitable accommodation available at each stop.",
  pillars: [
    {
      title: "Culture and comfort",
      items: [
        "UNESCO-listed Kathmandu sightseeing before the trek",
        "Private car between Kathmandu and Pokhara",
        "Confirmed city hotels when included on your quote",
        "Best suitable mountain lodges on trek nights — subject to availability",
      ],
    },
    {
      title: "Trail experience",
      items: [
        "Ulleri, Ghorepani, Poon Hill, Tadapani and Ghandruk in published order",
        "Licensed guide and pacing suited to your party",
        "Forest trails and Gurung village heritage without unsupported peak-name promises",
      ],
    },
    {
      title: "Logistics",
      items: [
        "Domestic flight Pokhara–Kathmandu when included — not assumed on Day 3",
        "Permit handling when part of your package price",
        "Clear communication on road times and flight delay realities",
      ],
    },
  ],
};

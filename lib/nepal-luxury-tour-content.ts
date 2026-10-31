import type { TrekItineraryDay, TrekLuxuryExperience } from "./trip-packages";

export const NEPAL_LUXURY_TOUR_SLUG = "nepal-luxury-tour";

export const NEPAL_LUXURY_TOUR_GROUP_PRICES = [
  { id: "nlt-g1", label: "1 person", priceUsd: 3499 },
  { id: "nlt-g2", label: "2 people", priceUsd: 2999 },
  { id: "nlt-g3", label: "3–4 people", priceUsd: 2699 },
  { id: "nlt-g4", label: "5–7 people", priceUsd: 2499 },
  { id: "nlt-g5", label: "8+ people", priceUsd: 2299 },
] as const;

export const NEPAL_LUXURY_TOUR_ITINERARY_INTRO =
  "Thirteen days and twelve nights from arrival in Kathmandu through valley heritage, Nagarkot, Chitwan, Lumbini, Pokhara, Bandipur and return to Kathmandu before departure. Road timings, guide services, entrance fees, jungle programme and meals follow your signed booking confirmation — not assumed from this page.";

export const NEPAL_LUXURY_TOUR_ITINERARY: TrekItineraryDay[] = [
  {
    id: "nlt-d1",
    day: 1,
    title: "Arrival in Kathmandu",
    altitude: "Kathmandu ~1,400 m",
    duration: "Arrival day",
    distance: "Airport transfer if included on confirmation",
    meals: "As per confirmed package",
    stay: "Confirmed Kathmandu accommodation — Night 1 of 12",
    body:
      "Arrive in Kathmandu and transfer to your hotel according to the confirmed package when an airport transfer is listed on your quote.\n\nEnjoy leisure time to rest after your journey. Do not promise airport pickup unless included in the final package.",
  },
  {
    id: "nlt-d2",
    day: 2,
    title: "Kathmandu sightseeing",
    altitude: "Kathmandu ~1,400 m",
    duration: "Full sightseeing day",
    distance: "Valley transfers between sites",
    meals: "As per confirmed package",
    stay: "Confirmed Kathmandu accommodation — Night 2 of 12",
    body:
      "Visit Kathmandu's major landmarks on the operator's confirmed schedule — typically Kathmandu Durbar Square, Swayambhunath Stupa, Boudhanath Stupa and Pashupatinath Temple, subject to opening hours and practical routing.\n\nEntrance fees and guide services apply only when listed on your signed documents.",
  },
  {
    id: "nlt-d3",
    day: 3,
    title: "Patan, Bhaktapur and Nagarkot",
    altitude: "Nagarkot ~2,175 m (approx.)",
    duration: "Sightseeing + road day",
    distance: "Patan → Bhaktapur → Nagarkot",
    meals: "As per confirmed package",
    stay: "Confirmed Nagarkot accommodation — Night 3 of 12",
    body:
      "Explore Patan Durbar Square and Bhaktapur Durbar Square before travelling by road to Nagarkot for the overnight stay.\n\nHimalayan views from Nagarkot depend on weather — never guaranteed.",
  },
  {
    id: "nlt-d4",
    day: 4,
    title: "Travel to Chitwan",
    altitude: "Chitwan / Terai ~150 m (approx.)",
    duration: "Road day — confirm duration operationally",
    distance: "Nagarkot/Kathmandu area → Chitwan",
    meals: "As per confirmed package",
    stay: "Confirmed Chitwan lodge or hotel — Night 4 of 12",
    body:
      "Travel to Chitwan and check in at the confirmed hotel or jungle lodge.\n\nDriving time varies with season, road conditions and start point — verify with operations before publishing fixed schedules.",
  },
  {
    id: "nlt-d5",
    day: 5,
    title: "Chitwan jungle experiences",
    altitude: "Chitwan / Terai ~150 m (approx.)",
    duration: "Full day — lodge programme",
    distance: "Activities per confirmed jungle package",
    meals: "As per confirmed package",
    stay: "Confirmed Chitwan accommodation — Night 5 of 12",
    body:
      "Enjoy the confirmed jungle activity programme. Possible components — subject to park rules and lodge plan — may include guided nature experiences, birdwatching and wildlife observation.\n\nDo not promise rhino, tiger or other sightings. Distinguish included activities from optional extras.",
  },
  {
    id: "nlt-d6",
    day: 6,
    title: "Chitwan to Lumbini",
    altitude: "Lumbini ~150 m (approx.)",
    duration: "Road day — verify journey time",
    distance: "Chitwan → Lumbini by road when included",
    meals: "As per confirmed package",
    stay: "Confirmed Lumbini accommodation — Night 6 of 12",
    body:
      "Travel by road to Lumbini and enjoy the remaining time at leisure after check-in according to confirmed hotel arrangements.\n\nVerify journey duration and transport plan with the operator before travel.",
  },
  {
    id: "nlt-d7",
    day: 7,
    title: "Lumbini sightseeing",
    altitude: "Lumbini ~150 m (approx.)",
    duration: "Sightseeing day",
    distance: "Sacred garden and monasteries per confirmed plan",
    meals: "As per confirmed package",
    stay: "Confirmed Lumbini accommodation — Night 7 of 12",
    body:
      "Explore Maya Devi Temple, the Sacred Garden and Buddhist monasteries or other sites included in the confirmed itinerary.\n\nRespectful dress and site access rules apply. Entrance arrangements follow your signed confirmation.",
  },
  {
    id: "nlt-d8",
    day: 8,
    title: "Lumbini to Pokhara",
    altitude: "Pokhara ~820 m",
    duration: "Road day — operational verification required",
    distance: "Lumbini → Pokhara",
    meals: "As per confirmed package",
    stay: "Confirmed Pokhara accommodation — Night 8 of 12",
    body:
      "Travel to Pokhara by road according to confirmed arrangements.\n\nOperational check: verify Lumbini–Pokhara journey duration, rest stops and whether a domestic flight alternative is more appropriate — obtain operator approval before changing the published transport mode.",
  },
  {
    id: "nlt-d9",
    day: 9,
    title: "Pokhara sightseeing",
    altitude: "Sarangkot ~1,600 m (viewpoint, approx.)",
    duration: "Pre-dawn / full sightseeing day",
    distance: "Pokhara area per confirmed plan",
    meals: "As per confirmed package",
    stay: "Confirmed Pokhara accommodation — Night 9 of 12",
    body:
      "Include a Sarangkot sunrise visit when scheduled on your confirmation — weather permitting.\n\nRemaining sightseeing may include Phewa Lake, World Peace Pagoda and other established attractions only when confirmed on your Day 9 plan.",
  },
  {
    id: "nlt-d10",
    day: 10,
    title: "Pokhara to Bandipur",
    altitude: "Bandipur ~1,030 m (approx.)",
    duration: "Road day",
    distance: "Pokhara → Bandipur",
    meals: "As per confirmed package",
    stay: "Confirmed Bandipur accommodation — Night 10 of 12",
    body:
      "Travel to Bandipur and explore the traditional village atmosphere at a comfortable pace after check-in.",
  },
  {
    id: "nlt-d11",
    day: 11,
    title: "Bandipur village experience",
    altitude: "Bandipur ~1,030 m (approx.)",
    duration: "Leisure / village day",
    distance: "On foot in Bandipur",
    meals: "As per confirmed package",
    stay: "Confirmed Bandipur accommodation — Night 11 of 12",
    body:
      "Enjoy village walks, traditional Newari architecture, local culture and scenic viewpoints where conditions permit.\n\nGuided village tours apply only when included on your quote.",
  },
  {
    id: "nlt-d12",
    day: 12,
    title: "Bandipur to Kathmandu",
    altitude: "Kathmandu ~1,400 m",
    duration: "Road day — verify duration and routing",
    distance: "Bandipur → Kathmandu",
    meals: "As per confirmed package",
    stay: "Confirmed Kathmandu accommodation — Night 12 of 12",
    body:
      "Return to Kathmandu by road according to confirmed arrangements.\n\nOperational check: verify Bandipur–Kathmandu driving time and whether flight or alternate routing is appropriate — flag for operator review before publishing fixed timings.",
  },
  {
    id: "nlt-d13",
    day: 13,
    title: "Departure from Kathmandu",
    altitude: "—",
    duration: "Departure day",
    distance: "Airport transfer if included on confirmation",
    meals: "As per confirmed package",
    stay: "—",
    body:
      "Prepare for departure according to your international flight schedule. Airport transfer is included only if confirmed on your signed documents.\n\nThank you for choosing Ambition Holidays for your journey through Nepal's heritage, wildlife, sacred sites and hill villages.",
  },
];

export const NEPAL_LUXURY_TOUR_INCLUSIONS = [
  "Twelve nights of accommodation on confirmed room category.",
  "Airport transfers when included on your signed confirmation.",
  "Scheduled road transportation for the published route when listed on your quote.",
  "Kathmandu, Lumbini and Pokhara sightseeing transport when included.",
  "Licensed guide services when included in the confirmed plan.",
  "Applicable heritage-site entrance fees when explicitly listed.",
  "Chitwan accommodation and jungle programme per booked lodge plan when included.",
  "Meals according to the board basis confirmed in writing.",
];

export const NEPAL_LUXURY_TOUR_EXCLUSIONS = [
  "International airfare and Nepal visa fees.",
  "Travel insurance.",
  "Personal expenses and optional activities.",
  "Tips and gratuities.",
  "Meals and drinks outside the confirmed board basis.",
  "Domestic flights unless explicitly included on your invoice.",
  "Any service not listed as included on your signed booking documents.",
];

export const NEPAL_LUXURY_TOUR_INCLUDE_NOTE =
  "Draft inclusion list for operator verification. Road durations for Lumbini–Pokhara and Bandipur–Kathmandu must be confirmed before publication.";

export const NEPAL_LUXURY_TOUR_TRANSPORT_NOTE =
  "This thirteen-day circuit is primarily overland when road transport is included on your quote. Verify Lumbini–Pokhara (Day 8) and Bandipur–Kathmandu (Day 12) driving times with operations. Domestic flights are not assumed unless listed on your signed confirmation.";

export const NEPAL_LUXURY_TOUR_LUXURY_EXPERIENCE: TrekLuxuryExperience = {
  title: "What makes this a luxury Nepal circuit?",
  intro:
    "Twelve nights linking valley UNESCO sites, Terai wildlife, Lumbini's sacred garden, Pokhara lakeside and Bandipur's lanes — privately coordinated with suitable hotels and honest copy on weather, wildlife and road timing.",
  pillars: [
    {
      title: "Breadth of Nepal",
      items: [
        "Heritage, jungle, spirituality and lakeside in one measured circuit",
        "Nagarkot and Sarangkot — views weather-dependent",
        "Bandipur village pace before return to Kathmandu",
      ],
    },
    {
      title: "Verified logistics",
      items: [
        "Day 8 and Day 12 road durations require operator sign-off",
        "Chitwan programme per booked lodge only",
        "Draft USD pricing until suppliers verified",
      ],
    },
    {
      title: "Editable journey",
      items: [
        "Full itinerary manageable in admin",
        "Inclusions and entrances confirmed on quote only",
      ],
    },
  ],
};

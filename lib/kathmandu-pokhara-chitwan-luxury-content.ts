import type { TrekItineraryDay, TrekLuxuryExperience } from "./trip-packages";

export const KATHMANDU_POKHARA_CHITWAN_SLUG = "kathmandu-pokhara-chitwan-luxury-tour";

export const KATHMANDU_POKHARA_CHITWAN_GROUP_PRICES = [
  { id: "kpc9-g1", label: "1 person", priceUsd: 2799 },
  { id: "kpc9-g2", label: "2 people", priceUsd: 2099 },
  { id: "kpc9-g3", label: "3–4 people", priceUsd: 1899 },
  { id: "kpc9-g4", label: "5–7 people", priceUsd: 1799 },
  { id: "kpc9-g5", label: "8+ people", priceUsd: 1649 },
] as const;

export const KATHMANDU_POKHARA_CHITWAN_ITINERARY_INTRO =
  "Nine days from arrival in Kathmandu through valley sightseeing, Patan and Bhaktapur, Nagarkot, domestic flights to Pokhara and the Chitwan area when included on your quote, jungle programme nights, and return to Kathmandu before departure. Flight routes — especially Pokhara to Chitwan — entrance fees, guide services and jungle activities follow your signed booking confirmation, not assumed from this page.";

export const KATHMANDU_POKHARA_CHITWAN_ITINERARY: TrekItineraryDay[] = [
  {
    id: "kpc9-d1",
    day: 1,
    title: "Arrival in Kathmandu",
    altitude: "Kathmandu ~1,400 m",
    duration: "Arrival day",
    distance: "Airport transfer if included on confirmation",
    meals: "As per confirmed package",
    stay: "Confirmed Kathmandu accommodation — Night 1 of 8",
    body:
      "Arrive in Kathmandu and transfer to the hotel according to the confirmed package arrangements when an airport transfer is listed on your quote.\n\nThe rest of the day is available for relaxing after the journey or exploring the surrounding area independently.\n\nDo not promise airport pickup unless it is included in the final package.",
  },
  {
    id: "kpc9-d2",
    day: 2,
    title: "Kathmandu sightseeing tour",
    altitude: "Kathmandu ~1,400 m",
    duration: "Full sightseeing day",
    distance: "Valley transfers between sites",
    meals: "As per confirmed package",
    stay: "Confirmed Kathmandu accommodation — Night 2 of 8",
    body:
      "Explore Kathmandu's important cultural and religious landmarks on the operator's confirmed route.\n\nKathmandu Durbar Square — historic palaces, courtyards and Newari architecture.\n\nSwayambhunath Stupa — hilltop Buddhist site with valley views when weather allows.\n\nBoudhanath Stupa — major pilgrimage centre and surrounding monasteries.\n\nPashupatinath Temple — sacred Hindu complex on the Bagmati River; respect dress codes and access rules.\n\nCheck practical routing and opening hours when finalizing the operational itinerary. Entrance fees and guide services apply only when confirmed on your signed documents.",
  },
  {
    id: "kpc9-d3",
    day: 3,
    title: "Patan and Bhaktapur sightseeing, drive to Nagarkot",
    altitude: "Nagarkot ~2,175 m (approx.)",
    duration: "Sightseeing + road day",
    distance: "Kathmandu area → Patan → Bhaktapur → Nagarkot",
    meals: "As per confirmed package",
    stay: "Confirmed Nagarkot accommodation — Night 3 of 8",
    body:
      "Begin with Patan Durbar Square — historic architecture, temples and artistic heritage.\n\nContinue to Bhaktapur Durbar Square — traditional Newari squares and courtyards.\n\nAfter sightseeing, travel by road to Nagarkot for an overnight hilltop stay.\n\nAllow realistic travel time between stops. Mountain views depend on weather and visibility — never guaranteed.",
  },
  {
    id: "kpc9-d4",
    day: 4,
    title: "Drive to Kathmandu domestic airport and fly to Pokhara",
    altitude: "Pokhara ~820 m",
    duration: "Flight day — subject to airline schedule",
    distance: "Nagarkot/Kathmandu area → Pokhara air sector when included",
    meals: "As per confirmed package",
    stay: "Confirmed Pokhara accommodation — Night 4 of 8",
    body:
      "Travel to Kathmandu's domestic airport and board a scheduled domestic flight to Pokhara, subject to confirmed arrangements.\n\nOn arrival, transfer to the hotel when included and enjoy remaining time at leisure — Lakeside, Phewa Lake atmosphere or rest at the hotel.\n\nDo not invent flight times, airlines or schedules. Confirm whether the flight, baggage allowance, airport transfers and fees are included before treating them as package inclusions.",
  },
  {
    id: "kpc9-d5",
    day: 5,
    title: "Pokhara sightseeing with Sarangkot sunrise view",
    altitude: "Sarangkot ~1,600 m (viewpoint, approx.)",
    duration: "Pre-dawn / full sightseeing day",
    distance: "Pokhara area per confirmed plan",
    meals: "As per confirmed package",
    stay: "Confirmed Pokhara accommodation — Night 5 of 8",
    body:
      "Enjoy a sightseeing day in Pokhara including an early visit to Sarangkot when scheduled on your confirmation — sunrise and Himalayan panoramas depend on weather.\n\nRemaining Pokhara sightseeing follows the operator's confirmed itinerary. Suggested options may include Phewa Lake, World Peace Pagoda and Devi's Fall — but do not treat every attraction as included until your coordinator approves the Day 5 schedule.",
  },
  {
    id: "kpc9-d6",
    day: 6,
    title: "Fly from Pokhara to Chitwan and transfer to the hotel",
    altitude: "Chitwan / Terai ~150 m (approx.)",
    duration: "Flight day — operational verification required",
    distance: "Pokhara → Chitwan air sector when available",
    meals: "As per confirmed package",
    stay: "Confirmed Chitwan lodge or hotel — Night 6 of 8",
    body:
      "Travel from Pokhara toward Chitwan by domestic flight, subject to actual route availability and confirmed flight arrangements — not by assuming a sector that may not operate on your date.\n\nUpon arrival at the appropriate airport, transfer to the jungle lodge or hotel. Introductory activities follow the confirmed accommodation programme (briefing, village visit or nature activity when listed on your quote).\n\nOperational check: verify the current Pokhara–Chitwan flight route, schedule, destination airport and availability before publishing this day as a confirmed itinerary. If the route is unavailable, the operator must approve an alternative — do not silently replace the requested flight with road transport without guest approval.",
  },
  {
    id: "kpc9-d7",
    day: 7,
    title: "Jungle activities in Chitwan National Park area",
    altitude: "Chitwan / Terai ~150 m (approx.)",
    duration: "Full day — lodge programme",
    distance: "Activities per confirmed jungle package",
    meals: "As per confirmed package",
    stay: "Confirmed Chitwan accommodation — Night 7 of 8",
    body:
      "Spend the day on the jungle and wildlife experiences available through your selected accommodation and its confirmed activity programme.\n\nPossible components — subject to park rules, season and lodge plan — may include guided walks, birdwatching, canoe trips where permitted, wildlife observation or cultural experiences.\n\nClearly distinguish included activities from optional extras. Do not promise sightings of tigers, rhinos, elephants or other species — wildlife depends on natural conditions.",
  },
  {
    id: "kpc9-d8",
    day: 8,
    title: "Fly back to Kathmandu",
    altitude: "Kathmandu ~1,400 m",
    duration: "Domestic flight day",
    distance: "Chitwan-area → Kathmandu air sector when included",
    meals: "As per confirmed package",
    stay: "Confirmed Kathmandu accommodation — Night 8 of 8",
    body:
      "Transfer to the appropriate airport and take a domestic flight back to Kathmandu, subject to confirmed route availability.\n\nOn arrival, transfer to the hotel when included. Use remaining time for shopping, relaxing or independent exploration.\n\nVerify departure airport and airline details on your invoice — do not invent schedules.",
  },
  {
    id: "kpc9-d9",
    day: 9,
    title: "Departure from Kathmandu",
    altitude: "—",
    duration: "Departure day",
    distance: "Airport transfer if included on confirmation",
    meals: "As per confirmed package",
    stay: "—",
    body:
      "Enjoy breakfast and prepare for departure according to your international flight schedule when meals are included on your confirmation.\n\nProvide an airport transfer only if listed as included.\n\nThank you for choosing Ambition Holidays — we hope the valley heritage, Nagarkot light, Pokhara lakeside and Chitwan programme stay with you.",
  },
];

export const KATHMANDU_POKHARA_CHITWAN_INCLUSIONS = [
  "Eight nights of accommodation on confirmed room category.",
  "Arrival and departure airport transfers when included on your signed confirmation.",
  "Scheduled road transportation for sightseeing and Nagarkot transfer when listed on your quote.",
  "Domestic flights included in the final confirmed itinerary (Kathmandu–Pokhara and Chitwan-area sectors when applicable).",
  "Kathmandu Valley sightseeing transport when included.",
  "Licensed guide services when included in the confirmed plan.",
  "Applicable sightseeing entrance fees when explicitly listed.",
  "Chitwan accommodation and jungle programme per the booked lodge plan when included.",
  "Meals according to the board basis confirmed in writing.",
];

export const KATHMANDU_POKHARA_CHITWAN_EXCLUSIONS = [
  "International airfare and Nepal visa fees.",
  "Travel insurance.",
  "Personal expenses and optional activities.",
  "Tips and gratuities.",
  "Meals and beverages outside the confirmed board basis.",
  "Additional baggage charges where applicable.",
  "Jungle activities not named as included on your signed documents.",
  "Any service not explicitly listed as included.",
];

export const KATHMANDU_POKHARA_CHITWAN_INCLUDE_NOTE =
  "Draft inclusion list for operator verification. Pokhara–Chitwan flight routing must be confirmed before publication.";

export const KATHMANDU_POKHARA_CHITWAN_TRANSPORT_NOTE =
  "This itinerary uses multiple domestic flights when included on your quote: typically Kathmandu–Pokhara (Day 4), Pokhara–Chitwan (Day 6 — verify route exists), and Chitwan–Kathmandu (Day 8). Road sectors cover Patan, Bhaktapur and Nagarkot. All air sectors remain subject to airline schedules, weather and confirmed inclusion on your invoice.";

export const KATHMANDU_POKHARA_CHITWAN_LUXURY_EXPERIENCE: TrekLuxuryExperience = {
  title: "What makes this a luxury Nepal combination?",
  intro:
    "Nine days linking UNESCO-listed valley heritage, Nagarkot hill light, Pokhara lakeside and Sarangkot viewpoints with Chitwan jungle nights — privately coordinated with suitable hotels and honest copy on flights, weather and wildlife.",
  pillars: [
    {
      title: "Heritage and hills",
      items: [
        "Kathmandu, Patan and Bhaktapur on confirmed routes",
        "Overnight Nagarkot — views weather-dependent",
        "Eight nights across city, hill, lake and jungle",
      ],
    },
    {
      title: "Flights and Pokhara",
      items: [
        "Domestic sectors when included on your quote",
        "Day 6 Pokhara–Chitwan requires operational verification",
        "Sarangkot sunrise — never guaranteed",
      ],
    },
    {
      title: "Chitwan programme",
      items: [
        "Jungle activities per booked lodge plan only",
        "No guaranteed wildlife sightings",
        "Draft USD pricing until suppliers verified",
      ],
    },
  ],
};

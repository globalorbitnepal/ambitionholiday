import type { TrekItineraryDay, TrekLuxuryExperience } from "./trip-packages";

export const KATHMANDU_HERITAGE_SLUG = "kathmandu-heritage-luxury-tour";

export const KATHMANDU_HERITAGE_GROUP_PRICES = [
  { id: "kmh-g1", label: "1 person", priceUsd: 1399 },
  { id: "kmh-g2", label: "2 people", priceUsd: 999 },
  { id: "kmh-g3", label: "3–4 people", priceUsd: 899 },
  { id: "kmh-g4", label: "5–7 people", priceUsd: 799 },
  { id: "kmh-g5", label: "8+ people", priceUsd: 699 },
] as const;

export const KATHMANDU_HERITAGE_ITINERARY_INTRO =
  "Five days from arrival in Kathmandu through two full days of valley heritage sightseeing, a leisure day and departure. Sites, route order, guide arrangements and included services follow your signed booking confirmation — not assumed from this page.";

export const KATHMANDU_HERITAGE_ITINERARY: TrekItineraryDay[] = [
  {
    id: "kmh-d1",
    day: 1,
    title: "Arrival in Kathmandu",
    altitude: "Kathmandu ~1,400 m",
    duration: "Arrival day",
    distance: "Airport transfer if included on confirmation",
    meals: "As per confirmed package",
    stay: "Confirmed Kathmandu accommodation, subject to booking",
    body:
      "Arrive at Tribhuvan International Airport in Kathmandu.\n\nTransfer to your hotel according to the confirmed package plan when an airport transfer is listed on your quote. Allow time to check in, rest and settle into the city.\n\nDo not assume an airport transfer, room upgrade or welcome meal unless they appear on your signed confirmation.",
  },
  {
    id: "kmh-d2",
    day: 2,
    title: "Swayambhunath, Kathmandu Durbar Square and Patan Durbar Square",
    altitude: "Kathmandu Valley ~1,300–1,400 m",
    duration: "Full sightseeing day — timing varies with traffic",
    distance: "Valley transfers between sites",
    meals: "As per confirmed package",
    stay: "Confirmed Kathmandu accommodation",
    body:
      "Explore three important cultural landmarks in Kathmandu Valley on the operator's confirmed route.\n\nSwayambhunath Stupa — discover this hilltop Buddhist site, its architecture and spiritual atmosphere with views over Kathmandu when weather allows.\n\nKathmandu Durbar Square — walk the historic royal square, traditional architecture and surrounding heritage lanes.\n\nPatan Durbar Square — visit the square in Lalitpur known for Newari craftsmanship, temples and courtyard architecture.\n\nExact visiting order, duration, entrance fees and guide services are not fixed on this page until your coordinator publishes the approved schedule.",
  },
  {
    id: "kmh-d3",
    day: 3,
    title: "Bhaktapur Durbar Square, Pashupatinath Temple and Boudhanath Stupa",
    altitude: "Kathmandu Valley",
    duration: "Full sightseeing day",
    distance: "Valley transfers — confirm route operationally",
    meals: "As per confirmed package",
    stay: "Confirmed Kathmandu accommodation",
    body:
      "Continue through Kathmandu Valley's cultural and religious heritage.\n\nBhaktapur Durbar Square — traditional Newari architecture, historic temples and the atmosphere of the old city.\n\nPashupatinath Temple — visit the important Hindu complex on the Bagmati River. Respect religious customs, dress codes and access restrictions that apply to visitors.\n\nBoudhanath Stupa — explore a major Buddhist pilgrimage site and its surrounding neighbourhood.\n\nThe operator must confirm practical routing, traffic allowances and visiting arrangements for these three locations before publishing fixed timings to guests.",
  },
  {
    id: "kmh-d4",
    day: 4,
    title: "Leisure, relaxation and shopping",
    altitude: "Kathmandu ~1,400 m",
    duration: "Free day",
    distance: "Independent exploration",
    meals: "As per confirmed package",
    stay: "Confirmed Kathmandu accommodation",
    body:
      "Enjoy a free day to relax, explore Kathmandu independently or shop for souvenirs and local handicrafts.\n\nOptional activities may be offered through your coordinator but must be labelled optional and priced only when verified — we do not automatically include spa treatments, private excursions or shopping transfers on this page.",
  },
  {
    id: "kmh-d5",
    day: 5,
    title: "Departure from Kathmandu",
    altitude: "—",
    duration: "Departure day",
    distance: "Airport transfer if included on confirmation",
    meals: "As per confirmed package",
    stay: "—",
    body:
      "Transfer to Tribhuvan International Airport according to your confirmed departure arrangements.\n\nDepart Nepal after your cultural journey. Do not promise an airport transfer or meals unless they are listed as included on your signed documents.",
  },
];

export const KATHMANDU_HERITAGE_INCLUSIONS = [
  "Arrival and departure airport transfers when included on your signed confirmation.",
  "Accommodation on confirmed nights and room category.",
  "Kathmandu Valley sightseeing transport when listed on your quote.",
  "Licensed tour guide when included in the confirmed service plan.",
  "Sightseeing entrance fees when explicitly listed as included.",
  "Meals according to the board basis confirmed in writing.",
];

export const KATHMANDU_HERITAGE_EXCLUSIONS = [
  "International flights and Nepal entry visa fees.",
  "Travel insurance.",
  "Personal expenses, laundry and shopping.",
  "Tips and gratuities for guide and driver teams.",
  "Meals and drinks outside the confirmed board basis.",
  "Optional activities on the leisure day unless booked and paid separately.",
  "Any service not explicitly listed as included on your signed booking documents.",
];

export const KATHMANDU_HERITAGE_INCLUDE_NOTE =
  "Draft inclusion list for operator verification. Published package terms are those on your signed confirmation.";

export const KATHMANDU_HERITAGE_TRANSFER_NOTE =
  "Airport transfers and sightseeing transport apply only when included on your quote. Valley traffic can affect timing between Durbar Squares, Pashupatinath and Boudhanath — your coordinator confirms the practical route.";

export const KATHMANDU_HERITAGE_LUXURY_EXPERIENCE: TrekLuxuryExperience = {
  title: "What makes this a luxury cultural tour?",
  intro:
    "Five days in the Kathmandu Valley with time for landmark squares, sacred sites and a free day — privately coordinated with suitable hotel standards and experienced guiding when included on your confirmation.",
  pillars: [
    {
      title: "Living heritage",
      items: [
        "Swayambhunath, three Durbar Squares and major valley stupas in published order",
        "Pacing suited to photography and courtyard exploration",
        "Respectful copy around Pashupatinath and active pilgrimage sites",
      ],
    },
    {
      title: "Comfort and time",
      items: [
        "Confirmed hotel category on city nights",
        "Day 4 free for shopping or rest",
        "No rushed trekking content — valley sightseeing focus",
      ],
    },
    {
      title: "Honest inclusions",
      items: [
        "Guides, entrances and meals only when listed on your quote",
        "Draft USD pricing until supplier costs are verified",
      ],
    },
  ],
};

import type { TrekItineraryDay, TrekLuxuryExperience } from "./trip-packages";

export const KATHMANDU_POKHARA_SLUG = "kathmandu-pokhara-luxury-tour";

export const KATHMANDU_POKHARA_GROUP_PRICES = [
  { id: "ktp-g1", label: "1 person", priceUsd: 1899 },
  { id: "ktp-g2", label: "2 people", priceUsd: 1499 },
  { id: "ktp-g3", label: "3–4 people", priceUsd: 1299 },
  { id: "ktp-g4", label: "5–7 people", priceUsd: 1199 },
  { id: "ktp-g5", label: "8+ people", priceUsd: 1099 },
] as const;

export const KATHMANDU_POKHARA_ITINERARY_INTRO =
  "Seven days from arrival in Kathmandu through valley sightseeing, private road transfers to Bandipur and Pokhara, a full day of Pokhara landmarks, a domestic flight to Kathmandu when included on your quote, and departure. Routes, guide services, entrance fees and the Pokhara–Kathmandu flight follow your signed booking confirmation — not assumed from this page.";

export const KATHMANDU_POKHARA_ITINERARY: TrekItineraryDay[] = [
  {
    id: "ktp-d1",
    day: 1,
    title: "Arrival in Kathmandu",
    altitude: "Kathmandu ~1,400 m",
    duration: "Arrival day",
    distance: "Airport transfer if included on confirmation",
    meals: "As per confirmed package",
    stay: "Confirmed Kathmandu accommodation, subject to booking",
    body:
      "Arrive in Kathmandu and transfer to your hotel according to the confirmed package arrangements when an airport transfer is listed on your quote.\n\nSpend the remainder of the day relaxing after your journey or exploring nearby surroundings independently.\n\nDo not promise an airport pickup unless it appears on your signed confirmation.",
  },
  {
    id: "ktp-d2",
    day: 2,
    title: "Kathmandu sightseeing",
    altitude: "Kathmandu ~1,400 m",
    duration: "Full sightseeing day — timing varies with traffic",
    distance: "Valley transfers between sites",
    meals: "As per confirmed package",
    stay: "Confirmed Kathmandu accommodation",
    body:
      "Explore Kathmandu's cultural and historical attractions on the operator's confirmed route.\n\nPotential stops include Swayambhunath Stupa, Kathmandu Durbar Square, Boudhanath Stupa and Pashupatinath Temple — organised for practical travel time, opening hours and the final approved schedule.\n\nEntrance fees, licensed guide services and meals apply only when explicitly listed on your signed documents.",
  },
  {
    id: "ktp-d3",
    day: 3,
    title: "Drive to Bandipur village",
    altitude: "Bandipur ~1,030 m (approx.)",
    duration: "Road day — approximate duration confirmed operationally",
    distance: "Kathmandu → Bandipur by private vehicle when included",
    meals: "As per confirmed package",
    stay: "Confirmed Bandipur accommodation, subject to booking",
    body:
      "Travel by private vehicle from Kathmandu toward Bandipur, a traditional hilltop settlement known for preserved architecture, cultural atmosphere and scenic surroundings.\n\nAfter arrival, enjoy free time to walk village streets, discover local heritage and relax at a comfortable pace.\n\nDo not promise specific mountain views or guided village activities unless confirmed on your quote.",
  },
  {
    id: "ktp-d4",
    day: 4,
    title: "Drive to Pokhara and leisure time",
    altitude: "Pokhara ~820 m",
    duration: "Road day — confirm driving time with operations",
    distance: "Bandipur → Pokhara by private vehicle when included",
    meals: "As per confirmed package",
    stay: "Confirmed Pokhara accommodation when included",
    body:
      "Travel by private vehicle from Bandipur to Pokhara. Check in according to confirmed hotel arrangements and enjoy the rest of the day at leisure.\n\nYou may explore Lakeside, enjoy Phewa Lake views, visit local cafés or relax at the hotel — independent time unless optional activities are booked and priced separately.",
  },
  {
    id: "ktp-d5",
    day: 5,
    title: "Pokhara sightseeing",
    altitude: "Pokhara · Sarangkot ~1,600 m (viewpoint, approx.)",
    duration: "Full sightseeing day",
    distance: "Pokhara area transfers per confirmed plan",
    meals: "As per confirmed package",
    stay: "Confirmed Pokhara accommodation",
    body:
      "Discover Pokhara's scenic attractions on the operator's confirmed sightseeing plan.\n\nSarangkot — panoramic views of the Annapurna range and Pokhara Valley when weather allows; pre-dawn visits only when included and scheduled on your confirmation.\n\nWorld Peace Pagoda — hilltop monument overlooking Phewa Lake.\n\nShiva statue at Pumdikot — subject to final route and access arrangements.\n\nDevi's Fall — well-known natural attraction in Pokhara.\n\nAdditional stops apply only after the operator confirms route, timing and entrance fees.",
  },
  {
    id: "ktp-d6",
    day: 6,
    title: "Fly from Pokhara to Kathmandu",
    altitude: "Kathmandu ~1,400 m",
    duration: "Domestic flight day — subject to airline schedule",
    distance: "Pokhara → Kathmandu air sector when included",
    meals: "As per confirmed package",
    stay: "Confirmed Kathmandu accommodation when included",
    body:
      "Transfer to Pokhara Airport and take a domestic flight to Kathmandu, subject to flight availability and your confirmed booking arrangements.\n\nOn arrival, transfer to the hotel when included. Use remaining time for shopping, relaxing or independent exploration.\n\nDo not invent flight numbers, airlines or departure times. Clearly confirm on your quote whether the domestic flight is included in the package price. Schedules and baggage rules follow airline terms.",
  },
  {
    id: "ktp-d7",
    day: 7,
    title: "Departure from Kathmandu",
    altitude: "—",
    duration: "Departure day",
    distance: "Airport transfer if included on confirmation",
    meals: "As per confirmed package",
    stay: "—",
    body:
      "Enjoy breakfast and prepare for departure according to your travel schedule when meals are included on your confirmation.\n\nAirport transfer applies only when listed as included.\n\nThank you for travelling with Ambition Holidays — we hope the valley heritage, Bandipur lanes and Pokhara lakeside stay with you.",
  },
];

export const KATHMANDU_POKHARA_INCLUSIONS = [
  "Arrival and departure airport transfers when included on your signed confirmation.",
  "Accommodation for six nights on confirmed room category.",
  "Private vehicle for scheduled Kathmandu–Bandipur–Pokhara road transfers when listed on your quote.",
  "Kathmandu and Pokhara sightseeing transport when included.",
  "Domestic flight from Pokhara to Kathmandu on Day 6 when included on your quote.",
  "Licensed sightseeing guide when included in the confirmed service plan.",
  "Entrance fees for listed attractions when explicitly included.",
  "Meals according to the board basis confirmed in writing.",
];

export const KATHMANDU_POKHARA_EXCLUSIONS = [
  "International airfare and Nepal visa fees.",
  "Travel insurance.",
  "Personal expenses, laundry and shopping.",
  "Tips and gratuities for guide and driver teams.",
  "Meals and beverages outside the confirmed board basis.",
  "Optional activities and spa services unless booked separately.",
  "Any service not explicitly listed as included on your signed booking documents.",
];

export const KATHMANDU_POKHARA_INCLUDE_NOTE =
  "Draft inclusion list for operator verification. Published package terms are those on your signed confirmation.";

export const KATHMANDU_POKHARA_TRANSPORT_NOTE =
  "Private road transfers connect Kathmandu, Bandipur and Pokhara when included on your quote. Day 6 is a Pokhara–Kathmandu domestic flight — confirm inclusion, airline and reporting times on your invoice, not from this page.";

export const KATHMANDU_POKHARA_LUXURY_EXPERIENCE: TrekLuxuryExperience = {
  title: "What makes this a luxury scenic tour?",
  intro:
    "Seven days combining Kathmandu heritage, the hilltop calm of Bandipur and Pokhara's lakeside setting with Sarangkot viewpoints and a return flight when included — privately coordinated with suitable hotels and honest copy on weather and flight inclusion.",
  pillars: [
    {
      title: "Culture and scenery",
      items: [
        "Valley temples and squares on Day 2 when included",
        "Bandipur village time at a measured pace",
        "Pokhara landmarks on a confirmed sightseeing plan",
      ],
    },
    {
      title: "Comfort and leisure",
      items: [
        "Lakeside free time on Day 4",
        "Draft hotel category — confirmed on booking",
        "No trekking charts — road and flight logistics focus",
      ],
    },
    {
      title: "Honest logistics",
      items: [
        "Domestic flight inclusion stated on your quote only",
        "Mountain views at Sarangkot — weather dependent",
        "Draft USD pricing until supplier costs verified",
      ],
    },
  ],
};

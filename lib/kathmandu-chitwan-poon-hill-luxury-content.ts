import type { TrekItineraryDay, TrekLuxuryExperience } from "./trip-packages";

export const KATHMANDU_CHITWAN_POON_HILL_SLUG = "kathmandu-chitwan-poon-hill-luxury-tour";

export const KATHMANDU_CHITWAN_POON_HILL_GROUP_PRICES = [
  { id: "kcp-g1", label: "1 person", priceUsd: 2799 },
  { id: "kcp-g2", label: "2 people", priceUsd: 2099 },
  { id: "kcp-g3", label: "3–4 people", priceUsd: 1899 },
  { id: "kcp-g4", label: "5–7 people", priceUsd: 1799 },
  { id: "kcp-g5", label: "8+ people", priceUsd: 1649 },
] as const;

export const KATHMANDU_CHITWAN_POON_HILL_ITINERARY_INTRO =
  "Ten days from arrival in Kathmandu through cultural sightseeing, domestic flights to the Chitwan area and Pokhara, jungle activities on the confirmed Chitwan programme, trekking via Hile and Ulleri to Ghorepani and Poon Hill, and return flights to Kathmandu before departure. Flight times, jungle activities, road access, walking durations and included meals follow your signed booking confirmation — not assumed from this page.";

export const KATHMANDU_CHITWAN_POON_HILL_ITINERARY: TrekItineraryDay[] = [
  {
    id: "kcp-d1",
    day: 1,
    title: "Arrival in Kathmandu",
    altitude: "Kathmandu ~1,400 m",
    duration: "Arrival day",
    distance: "Airport transfer if included on confirmation",
    meals: "As per confirmed package",
    stay: "Confirmed Kathmandu accommodation, subject to booking",
    body:
      "Arrive at Tribhuvan International Airport in Kathmandu. Transfer to your hotel according to the confirmed package plan and allow time to rest after your international journey.\n\nMeals, room category and any welcome briefing follow your signed confirmation — not assumed from this page.",
  },
  {
    id: "kcp-d2",
    day: 2,
    title: "Kathmandu sightseeing",
    altitude: "Kathmandu ~1,400 m",
    duration: "Full day — timing varies with traffic and site access",
    distance: "City transfers between sites",
    meals: "As per confirmed package",
    stay: "Confirmed Kathmandu accommodation",
    body:
      "Explore Kathmandu's cultural heritage through the approved sightseeing itinerary.\n\nThe exact sites, order and duration come from the operator's confirmed plan and opening arrangements — we do not list entrance fees, guide arrangements or additional attractions as included unless they appear on your signed quote.\n\nThe day balances photography, short walks and respectful observation at valley landmarks.",
  },
  {
    id: "kcp-d3",
    day: 3,
    title: "Fly to Chitwan and transfer to the hotel",
    altitude: "Chitwan / Terai ~150 m (approx.)",
    duration: "Flight + transfer — confirm timings operationally",
    distance: "Kathmandu–Chitwan air sector + lodge transfer",
    meals: "As per confirmed package",
    stay: "Confirmed Chitwan hotel or lodge, subject to booking",
    body:
      "Take the scheduled flight to the Chitwan area and transfer to the booked hotel or lodge.\n\nThe tour's Chitwan programme begins after arrival and transfer. Confirm the actual airport, airline, flight schedule, transfer time and accommodation location with your coordinator before publishing exact timings to guests.\n\nDomestic flights remain subject to weather and airline operations.",
  },
  {
    id: "kcp-d4",
    day: 4,
    title: "Jungle activities in Chitwan National Park",
    altitude: "Chitwan / Terai ~150 m (approx.)",
    duration: "Full day — activity schedule per confirmed programme",
    distance: "Activities within the booked Chitwan package",
    meals: "As per confirmed package",
    stay: "Confirmed Chitwan accommodation",
    body:
      "Enjoy the jungle activities included in the confirmed Chitwan package.\n\nPresent this as a wildlife and nature experience — the exact activities must come from the operator's confirmed arrangements. Do not assume elephant activities, jeep safaris, canoe trips, nature walks, cultural performances or wildlife sightings unless they are confirmed and appropriate for your booked departure.\n\nSightings of rhino, deer, birds or other species are never guaranteed.",
  },
  {
    id: "kcp-d5",
    day: 5,
    title: "Fly to Pokhara and transfer to the hotel",
    altitude: "Pokhara ~820 m",
    duration: "Flight + transfer day",
    distance: "Chitwan-area–Pokhara air sector",
    meals: "As per confirmed package",
    stay: "Confirmed Pokhara accommodation when included",
    body:
      "After breakfast, travel to the airport and take the scheduled flight to Pokhara, subject to flight availability and weather conditions.\n\nTransfer to the hotel and allow time to relax. Confirm the actual departure airport, airline and road transfer details with operations before travel — sectors may vary by season and booking.",
  },
  {
    id: "kcp-d6",
    day: 6,
    title: "Drive to Hile and trek to Ulleri",
    altitude: "Ulleri ~2,050 m (approx.)",
    duration: "Road + trekking day — full day",
    distance: "Pokhara–Hile road sector + trek to Ulleri",
    meals: "As per confirmed package",
    stay: "Best suitable mountain accommodation near Ulleri, subject to confirmation",
    body:
      "Travel by road from Pokhara to Hile and begin trekking towards Ulleri.\n\nThis day marks the shift from road travel to the mountain trail. Confirm road access, the trekking start point and the expected walking schedule with the local operations team — do not treat unverified step counts or hours from third-party blogs as package facts.",
  },
  {
    id: "kcp-d7",
    day: 7,
    title: "Trek to Ghorepani",
    altitude: "Ghorepani ~2,860–2,875 m",
    duration: "Trekking day",
    distance: "Trail distance confirmed on operational brief",
    meals: "As per confirmed package",
    stay: "Best suitable mountain accommodation, subject to confirmation",
    body:
      "Continue trekking towards Ghorepani through mountain villages and forested trails in the Annapurna region.\n\nRhododendron colour peaks in spring; nights feel cooler at this elevation. Walking hours, lodge standard and meal arrangements are stated on your signed confirmation.",
  },
  {
    id: "kcp-d8",
    day: 8,
    title: "Visit Poon Hill, trek to Ulleri and drive to Pokhara",
    altitude: "Poon Hill ~3,210 m (viewpoint); Pokhara ~820 m",
    duration: "Long day — operational verification required",
    distance: "Poon Hill visit + descent + road to Pokhara",
    meals: "As per confirmed package",
    stay: "Confirmed Pokhara accommodation when included",
    body:
      "Visit Poon Hill for the sunrise experience when weather and trail conditions allow — panoramic scenery is possible but never guaranteed.\n\nAfter breakfast, trek back towards Ulleri and continue by road to Pokhara according to the confirmed pickup and vehicle plan.\n\nOperational note: Combining a Poon Hill visit, descent to Ulleri and a road transfer to Pokhara in one day can be demanding. Have the local trekking operator validate route, walking duration, transport pickup and feasibility before making this itinerary bookable. Do not publish fixed timings until that review is complete.",
  },
  {
    id: "kcp-d9",
    day: 9,
    title: "Fly to Kathmandu",
    altitude: "Kathmandu ~1,400 m",
    duration: "Domestic flight day — subject to weather",
    distance: "Pokhara–Kathmandu air sector",
    meals: "As per confirmed package",
    stay: "Confirmed Kathmandu accommodation when included",
    body:
      "Transfer to Pokhara Airport and take the scheduled flight to Kathmandu, subject to availability and weather.\n\nArrange onward transfer and accommodation according to the confirmed booking. Allow buffer on international connections if you plan to depart Nepal soon after this sector.",
  },
  {
    id: "kcp-d10",
    day: 10,
    title: "Departure from Kathmandu",
    altitude: "—",
    duration: "Departure day",
    distance: "Airport transfer if included on confirmation",
    meals: "As per confirmed package",
    stay: "—",
    body:
      "Transfer to Tribhuvan International Airport according to your confirmed departure arrangements and fly home.\n\nDo not promise meals or transfers unless they are confirmed package inclusions on your signed documents.",
  },
];

export const KATHMANDU_CHITWAN_POON_HILL_INCLUSIONS = [
  "Arrival and departure airport transfers in Kathmandu when included on your signed confirmation.",
  "Kathmandu cultural sightseeing transport and guiding when listed on your quote.",
  "Kathmandu–Chitwan-area domestic flight when included on Day 3.",
  "Chitwan-area–Pokhara domestic flight when included on Day 5.",
  "Pokhara–Kathmandu domestic flight when included on Day 9.",
  "Chitwan hotel or lodge accommodation on confirmed nights.",
  "Chitwan jungle activities per the booked programme when listed as included.",
  "Pokhara hotel accommodation when included on city nights.",
  "Trekking accommodation on mountain nights — best suitable lodges subject to availability.",
  "Licensed trekking guide and applicable staff per confirmed service ratio.",
  "Required trekking permits when included in your package price.",
  "Road transfers to and from the trekking route when specified.",
  "Meals according to the board basis confirmed in writing.",
];

export const KATHMANDU_CHITWAN_POON_HILL_EXCLUSIONS = [
  "International flights and Nepal entry visa fees.",
  "Travel insurance and emergency helicopter evacuation (mandatory for trekking sections).",
  "Personal expenses, laundry and optional purchases.",
  "Tips and gratuities for guide, driver and lodge teams.",
  "Meals, drinks and services outside the confirmed board basis.",
  "Extra accommodation or meals caused by flight delays, weather or road disruption.",
  "Optional activities in Kathmandu, Chitwan or Pokhara not named as included.",
  "Any service not explicitly listed as included on your signed booking documents.",
];

export const KATHMANDU_CHITWAN_POON_HILL_INCLUDE_NOTE =
  "Draft inclusion list for operator verification. Published package terms are those on your signed confirmation.";

export const KATHMANDU_CHITWAN_POON_HILL_FLIGHT_NOTE =
  "This tour uses multiple domestic flights when included on your quote: Kathmandu to the Chitwan area (Day 3), Chitwan area to Pokhara (Day 5) and Pokhara to Kathmandu (Day 9). All sectors are subject to airline schedules, baggage rules and weather. Road transfers connect Pokhara with the trek and Chitwan lodges with airports — confirm airports and timings operationally.";

export const KATHMANDU_CHITWAN_POON_HILL_LUXURY_EXPERIENCE: TrekLuxuryExperience = {
  title: "What makes this a luxury adventure?",
  intro:
    "Ten days combining Kathmandu's living heritage, Terai wildlife experiences on your confirmed Chitwan programme, efficient domestic flights, lakeside recovery in Pokhara and a measured Annapurna foothill trek to Ghorepani and Poon Hill — privately coordinated with experienced guiding and suitable lodge standards.",
  pillars: [
    {
      title: "Culture and cities",
      items: [
        "Kathmandu sightseeing on an approved valley programme",
        "Domestic flights when included — not assumed road transfers between regions",
        "Confirmed hotel categories on city and jungle nights",
        "Pokhara time before and after the trek",
      ],
    },
    {
      title: "Wildlife and mountains",
      items: [
        "Chitwan activities per your booked programme only",
        "Trekking through Ulleri and Ghorepani",
        "Poon Hill sunrise when conditions allow",
        "Honest copy — wildlife and mountain views are never guaranteed",
      ],
    },
    {
      title: "Logistics",
      items: [
        "Permit handling when part of your package price",
        "Day 8 route and timing validated with local operations",
        "Draft USD pricing until supplier costs are verified",
      ],
    },
  ],
};

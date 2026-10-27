import type { TrekItineraryDay, TrekLuxuryExperience } from "./trip-packages";

export const ANNAPURNA_PANORAMA_SLUG = "annapurna-panorama-luxury-trek";

export const ANNAPURNA_PANORAMA_GROUP_PRICES = [
  { id: "apn-g1", label: "1 person", priceUsd: 2099 },
  { id: "apn-g2", label: "2 people", priceUsd: 1499 },
  { id: "apn-g3", label: "3–4 people", priceUsd: 1349 },
  { id: "apn-g4", label: "5–7 people", priceUsd: 1199 },
  { id: "apn-g5", label: "8+ people", priceUsd: 1099 },
] as const;

export const ANNAPURNA_PANORAMA_ITINERARY_INTRO =
  "Ten days from arrival in Kathmandu through cultural sightseeing, a morning flight to Pokhara, trekking via Ulleri and Ghorepani to Poon Hill, village trails through Tadapani, Ghandruk, Tolkha and Dhampus, and a return flight to Kathmandu before departure. Flight times, road access to trailheads, walking durations and included meals follow your signed booking confirmation — not assumed from this page.";

export const ANNAPURNA_PANORAMA_ITINERARY: TrekItineraryDay[] = [
  {
    id: "apn-d1",
    day: 1,
    title: "Arrival in Kathmandu",
    altitude: "Kathmandu ~1,400 m",
    duration: "Arrival day",
    distance: "Airport transfer if included on confirmation",
    meals: "As per confirmed package",
    stay: "Confirmed Kathmandu accommodation, subject to booking",
    body:
      "Arrive at Tribhuvan International Airport in Kathmandu and transfer to your hotel according to the confirmed package arrangements.\n\nAllow time to settle in, rest after your international journey and receive any trip briefing scheduled by your coordinator. Meals, room category and welcome services apply only when listed on your signed confirmation.",
  },
  {
    id: "apn-d2",
    day: 2,
    title: "Kathmandu sightseeing",
    altitude: "Kathmandu ~1,400 m",
    duration: "Full day — timing varies with traffic and site access",
    distance: "City transfers between sites",
    meals: "As per confirmed package",
    stay: "Confirmed Kathmandu accommodation",
    body:
      "Explore Kathmandu's cultural heritage on a guided sightseeing programme shaped by the operator's confirmed plan and opening arrangements.\n\nTypical visits may include major valley landmarks such as Swayambhunath, Boudhanath or Pashupatinath — but the exact order, duration and sites are not fixed on this page until your coordinator publishes the approved schedule.\n\nThe day balances photography, short walks and respectful observation without inventing attractions that have not been confirmed for your departure.",
  },
  {
    id: "apn-d3",
    day: 3,
    title: "Morning flight to Pokhara and drive towards Ulleri village",
    altitude: "Ulleri ~2,050 m (approx.)",
    duration: "Flight + road — full day; confirm timings operationally",
    distance: "KTM–PKR air sector + road to trailhead area",
    meals: "As per confirmed package",
    stay: "Best suitable mountain accommodation near Ulleri, subject to confirmation",
    body:
      "Take the morning domestic flight from Kathmandu to Pokhara, subject to airline schedules and weather.\n\nFrom Pokhara, continue by road towards Ulleri village according to confirmed vehicle access and trekking arrangements. Practical routing may use a trailhead near Hile or Nayapul — your operations team confirms whether the road reaches Ulleri directly or where the trek begins.\n\nThis day combines air travel with a hillside transfer. Do not assume exact driving hours or step counts until briefed locally.",
  },
  {
    id: "apn-d4",
    day: 4,
    title: "Trek to Ghorepani",
    altitude: "Ghorepani ~2,860–2,875 m",
    duration: "Trekking day — allow a full day on trail",
    distance: "Distance confirmed on operational brief",
    meals: "As per confirmed package",
    stay: "Best suitable mountain accommodation, subject to confirmation",
    body:
      "Continue trekking towards Ghorepani through mountain settlements, forested trails and scenic sections of the Annapurna foothills.\n\nRhododendron colour peaks in spring; winter mornings can feel cold at this elevation. The ascent is steady rather than technical — pacing and hydration matter as you gain height.\n\nWalking hours, lodge standard and meal arrangements are stated on your signed confirmation, not invented here.",
  },
  {
    id: "apn-d5",
    day: 5,
    title: "Poon Hill sunrise and trek to Tadapani",
    altitude: "Poon Hill ~3,210 m (viewpoint); overnight Tadapani ~2,630 m",
    duration: "Pre-dawn walk + trekking day — allow ~2 hours at viewpoint when specified",
    distance: "Trekking distance confirmed with your guide",
    meals: "As per confirmed package",
    stay: "Best suitable mountain accommodation, subject to confirmation",
    body:
      "Begin early for a visit to Poon Hill when weather and trail conditions allow — panoramic Himalayan scenery is possible but never guaranteed.\n\nReturn for breakfast, then continue trekking to Tadapani through mixed forest and ridge sections with views that change with cloud and season.\n\nYour guide sets a safe pace for the pre-dawn section. Exact sunrise timing and visibility depend on conditions on the day.",
  },
  {
    id: "apn-d6",
    day: 6,
    title: "Trek to Ghandruk",
    altitude: "Ghandruk ~1,940 m",
    duration: "Trekking day",
    distance: "Distance confirmed operationally",
    meals: "As per confirmed package",
    stay: "Best suitable mountain accommodation, subject to confirmation",
    body:
      "Trek from Tadapani to Ghandruk, a traditional Gurung village known for stone lanes, terraced hillsides and Annapurna-region scenery.\n\nThe descent eases elevation while keeping you in active mountain country. Village museums and cultural stops may be possible when open — confirm with your guide.\n\nWalking duration and lodge allocation are verified before travel, not assumed from this page.",
  },
  {
    id: "apn-d7",
    day: 7,
    title: "Trek from Ghandruk to Tolkha",
    altitude: "Tolkha ~1,700 m (approx.)",
    duration: "Trekking day — village-to-village",
    distance: "Trail distance confirmed locally",
    meals: "As per confirmed package",
    stay: "Best suitable mountain accommodation, subject to confirmation",
    body:
      "Continue from Ghandruk to Tolkha on scenic village trails through the Annapurna foothills.\n\nThe day is paced as a cultural landscape walk rather than a summit push — intermediate stops, trail conditions and walking hours follow the operational route your team confirms.\n\nDo not treat unverified side paths or timing claims on third-party blogs as part of this package until your coordinator approves them.",
  },
  {
    id: "apn-d8",
    day: 8,
    title: "Trek from Tolkha to Dhampus and drive to Pokhara",
    altitude: "Dhampus ~1,650 m; Pokhara ~820 m",
    duration: "Trek + road — full day",
    distance: "Trek endpoint and road sector confirmed before departure",
    meals: "As per confirmed package",
    stay: "Confirmed Pokhara accommodation when included",
    body:
      "Trek from Tolkha towards Dhampus, then travel by road to Pokhara according to the confirmed trail endpoint and vehicle pickup.\n\nThe transition from ridge trails to Pokhara's lakeside setting marks the end of the trekking section. Exact walking duration, road access from Dhampus or an alternate pickup point, and hotel check-in timing must be confirmed with operations before publication to guests.\n\nEvening in Pokhara to rest before the flight back to Kathmandu.",
  },
  {
    id: "apn-d9",
    day: 9,
    title: "Flight from Pokhara to Kathmandu",
    altitude: "Kathmandu ~1,400 m",
    duration: "Domestic flight day — subject to weather",
    distance: "Pokhara–Kathmandu air sector",
    meals: "As per confirmed package",
    stay: "Confirmed Kathmandu accommodation when included",
    body:
      "Transfer to Pokhara Airport and take the scheduled flight to Kathmandu, subject to confirmed availability and weather.\n\nReporting times, baggage rules and any road alternative during cancellations follow airline and operator instructions. Allow buffer on international connections if you plan to depart Nepal soon after this flight.",
  },
  {
    id: "apn-d10",
    day: 10,
    title: "Departure from Kathmandu",
    altitude: "—",
    duration: "Departure day",
    distance: "Airport transfer if included on confirmation",
    meals: "As per confirmed package",
    stay: "—",
    body:
      "Transfer to Tribhuvan International Airport according to your confirmed departure arrangements.\n\nBreakfast, porter assistance or extra hotel services apply only when listed on your booking confirmation. Depart Nepal after ten days in the Kathmandu Valley and the Annapurna foothills.",
  },
];

export const ANNAPURNA_PANORAMA_INCLUSIONS = [
  "Arrival and departure airport transfers when included on your signed confirmation.",
  "Kathmandu cultural sightseeing transport and guiding when listed on your quote.",
  "Kathmandu–Pokhara domestic flight on Day 3 when included — morning sector subject to operations.",
  "Pokhara–Kathmandu domestic flight on Day 9 when included.",
  "Road transport between Pokhara and the trekking trailhead / Ulleri area when specified.",
  "Road transfer from the trekking endpoint to Pokhara on Day 8 when included.",
  "Licensed trekking guide and applicable porter support per confirmed service ratio.",
  "Annapurna Conservation Area permit and applicable trekking fees when included in your price.",
  "Accommodation and meals according to the board basis confirmed in writing.",
];

export const ANNAPURNA_PANORAMA_EXCLUSIONS = [
  "International flights and Nepal entry visa fees.",
  "Travel insurance and emergency helicopter evacuation (mandatory for trekking).",
  "Personal trekking equipment, laundry and optional purchases.",
  "Meals, drinks and services outside the confirmed board basis.",
  "Tips and gratuities for guide, porter and driver teams.",
  "Extra accommodation or meals caused by flight delays, weather or road disruption.",
  "Optional activities in Kathmandu or Pokhara not named as included.",
  "Any service not explicitly listed as included on your signed booking documents.",
];

export const ANNAPURNA_PANORAMA_INCLUDE_NOTE =
  "Draft inclusion list for operator verification. Published package terms are those on your signed confirmation.";

export const ANNAPURNA_PANORAMA_FLIGHT_NOTE =
  "Day 3 includes a morning Kathmandu–Pokhara flight when included on your quote — not a full-day road transfer from Kathmandu. Day 9 is the Pokhara–Kathmandu return flight, both subject to weather and airline schedules. Road segments connect Pokhara with the trek; confirm trailheads and pickup points operationally.";

export const ANNAPURNA_PANORAMA_LUXURY_EXPERIENCE: TrekLuxuryExperience = {
  title: "What makes this a luxury trek?",
  intro:
    "A ten-day Annapurna panorama combining Kathmandu heritage, efficient flights to Pokhara, the Poon Hill sunrise corridor and an extended village trail through Ghandruk, Tolkha and Dhampus — privately coordinated with experienced guiding and the best suitable lodges available.",
  pillars: [
    {
      title: "Culture and access",
      items: [
        "Kathmandu sightseeing before the mountains",
        "Morning flight to Pokhara on Day 3 when included",
        "Confirmed city hotels when listed on your quote",
        "Best suitable mountain lodges on trek nights — subject to availability",
      ],
    },
    {
      title: "Panorama trail",
      items: [
        "Ghorepani, Poon Hill, Tadapani and Ghandruk in published order",
        "Extended foothill walking through Tolkha and Dhampus",
        "Licensed guide and pacing suited to your party",
        "Views described honestly — weather decides clarity",
      ],
    },
    {
      title: "Logistics",
      items: [
        "Return Pokhara–Kathmandu flight when included on Day 9",
        "Permit handling when part of your package price",
        "Road timings and trail endpoints confirmed before travel",
      ],
    },
  ],
};

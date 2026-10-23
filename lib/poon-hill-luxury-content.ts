import type { TrekItineraryDay } from "./trip-packages";
import type { TrekLuxuryExperience } from "./trip-packages";

export const POON_HILL_SLUG = "poon-hill-luxury-trek";

export const POON_HILL_PRICING_DISCLAIMER =
  "Published USD rates per person for private departures. Final invoice reflects confirmed flights, lodge availability, meals and services on your signed booking confirmation.";

export const POON_HILL_GROUP_PRICES = [
  { id: "phl-g1", label: "1 person", priceUsd: 1499 },
  { id: "phl-g2", label: "2 people", priceUsd: 1099 },
  { id: "phl-g3", label: "3–4 people", priceUsd: 999 },
  { id: "phl-g4", label: "5–7 people", priceUsd: 899 },
  { id: "phl-g5", label: "8+ people", priceUsd: 799 },
] as const;

export const POON_HILL_ITINERARY_INTRO =
  "Five days and four nights from Kathmandu through Pokhara, the Annapurna foothills and the Poon Hill sunrise viewpoint — a private itinerary subject to confirmed flights, road access and lodge availability. Walking times on Day 4 will be stated on your final operational brief once the descent route and vehicle pickup are verified for your travel dates.";

export const POON_HILL_ITINERARY: TrekItineraryDay[] = [
  {
    id: "phl-d1",
    day: 1,
    title: "Fly from Kathmandu to Pokhara",
    altitude: "Kathmandu ~1,400 m · Pokhara ~820 m",
    duration: "Domestic flight subject to operations · free afternoon",
    distance: "No trekking — Kathmandu–Pokhara flight sector only",
    meals: "As per confirmed package",
    stay: "Confirmed Pokhara accommodation",
    body:
      "Take the scheduled domestic flight from Kathmandu to Pokhara, subject to airline operations and weather.\n\nAfter arrival, transfer to the confirmed accommodation and enjoy a free afternoon. Guests may relax by the lake, explore the surroundings or choose an optional activity.\n\nOvernight: confirmed Pokhara accommodation.",
  },
  {
    id: "phl-d2",
    day: 2,
    title: "Drive to Hile and trek to Ulleri",
    altitude: "Ulleri ~2,050 m (approx.)",
    duration: "Road transfer + trekking — allow a full day; exact hours confirmed operationally",
    distance: "Walking distance confirmed with your guide after trailhead selection",
    meals: "As per confirmed package",
    stay: "Best available suitable mountain accommodation, subject to confirmation",
    body:
      "Travel by private vehicle from Pokhara towards Hile, subject to road conditions and the confirmed trailhead.\n\nBegin the trek through hillside settlements, terraced fields and forested sections. Continue towards Ulleri, known for its steep stone steps and traditional Magar village setting.\n\nThe ascent can be demanding — allow time for breaks and follow your guide's recommended pace.\n\nApproximate overnight elevation around 2,050 m, depending on the exact accommodation location.",
  },
  {
    id: "phl-d3",
    day: 3,
    title: "Trek from Ulleri to Ghorepani",
    altitude: "Ghorepani ~2,860–2,875 m",
    duration: "Approx. 5–7 hours walking (typical; confirm on trek)",
    distance: "Approx. 8–11 km / 5–7 mi when following the main Ghorepani trail",
    meals: "As per confirmed package",
    stay: "Best available suitable mountain accommodation, subject to confirmation",
    body:
      "Continue uphill through forested trails and traditional settlements towards Ghorepani. Rhododendron forests are particularly attractive during spring, while mountain visibility varies with weather and season.\n\nArrive at Ghorepani and rest in preparation for the early morning walk to Poon Hill.\n\nOvernight at best available suitable mountain accommodation, subject to confirmation.",
  },
  {
    id: "phl-d4",
    day: 4,
    title: "Sunrise at Poon Hill, return to Hile and drive to Pokhara",
    altitude: "Poon Hill ~3,210 m (viewpoint) · sleep Pokhara ~820 m when included",
    duration: "Early start · long day — total walking time confirmed operationally before travel",
    distance: "Poon Hill ascent plus substantial descent towards Hile — distances confirmed on brief",
    meals: "As per confirmed package",
    stay: "Confirmed Pokhara accommodation when part of the approved package",
    body:
      "Start early for the climb to Poon Hill, approximately 3,210 m, to experience sunrise and panoramic views of the Annapurna and Dhaulagiri ranges when visibility permits.\n\nReturn to Ghorepani for breakfast, then begin the descent towards Hile. Arrange a vehicle transfer back to Pokhara after reaching the confirmed road pickup point.\n\nThis is a long and physically demanding day involving an early start and substantial downhill walking. Your coordinator will communicate expected walking duration after the route has been operationally verified for your dates.\n\nSunrise conditions and clear mountain views are never guaranteed.",
  },
  {
    id: "phl-d5",
    day: 5,
    title: "Fly from Pokhara to Kathmandu",
    altitude: "Kathmandu ~1,400 m",
    duration: "Domestic flight subject to operations · no trekking",
    distance: "Pokhara–Kathmandu flight sector only",
    meals: "As per confirmed package",
    stay: "—",
    body:
      "Transfer to Pokhara airport and take the scheduled flight to Kathmandu, subject to airline operations and weather.\n\nArrange airport transfers according to the confirmed package inclusions.\n\nThe trip ends in Kathmandu.",
  },
];

export const POON_HILL_INCLUSIONS = [
  "Private trip coordination and pre-departure briefing from Ambition Holidays.",
  "Licensed trekking guide — and porter support when included on your signed confirmation.",
  "Kathmandu–Pokhara domestic flights when listed as included on your confirmed quote.",
  "Pokhara accommodation on included city nights, subject to availability.",
  "Best available suitable mountain accommodation on trekking nights, subject to confirmation.",
  "Private ground transfers to and from the trail when stated on your booking confirmation.",
  "Meals according to the board basis confirmed in writing — not assumed from this page.",
  "Annapurna Conservation Area permit and applicable local trekking fees when included in your quote.",
  "Airport transfers tied to the confirmed flight plan when included.",
  "Applicable government taxes and service charges only where named on your invoice.",
];

export const POON_HILL_EXCLUSIONS = [
  "International flights and Nepal entry visa fees.",
  "Travel insurance (mandatory) including trekking cover and emergency evacuation.",
  "Personal trekking clothing, boots and equipment.",
  "Extra drinks, snacks, hot showers, Wi-Fi and charging where lodges charge separately.",
  "Tips and gratuities for guide and porter team.",
  "Optional activities in Pokhara or Kathmandu not named as included.",
  "Additional nights, meals or road transfers caused by flight delays or weather disruption unless your confirmation states them.",
  "Any service not explicitly listed as included on your signed booking documents.",
];

export const POON_HILL_INCLUDE_NOTE =
  "Inclusions follow your signed confirmation. Flights, meals and lodge nights are not guaranteed in the selling price until your approved package configuration confirms them.";

export const POON_HILL_FLIGHT_NOTE =
  "Kathmandu ↔ Pokhara sectors operate on domestic schedules that change with weather, visibility and airline load. Morning flights are typical but not promised. Allow buffer time on international tickets if you connect the same day. Road transfer between Kathmandu and Pokhara is an operational alternative when airlines cancel — any extra cost follows your booking terms.";

export const POON_HILL_LUXURY_EXPERIENCE: TrekLuxuryExperience = {
  title: "What makes this a luxury trek?",
  intro:
    "A private Annapurna foothills journey with experienced guiding, thoughtful pacing and the best suitable accommodation available at each stop — not five-star resorts in every mountain village.",
  pillars: [
    {
      title: "Private coordination",
      items: [
        "Dedicated trip coordinator before you travel",
        "Pre-departure briefing and packing guidance",
        "Licensed guide for your private party",
        "Porter support per confirmed service ratio",
        "Contingency planning for weather and flight changes",
      ],
    },
    {
      title: "Comfort along the route",
      items: [
        "Confirmed Pokhara accommodation on included city nights",
        "Best available suitable lodges on trekking nights — subject to local availability",
        "No property names published until confirmed for your dates",
        "Ensuite rooms and guaranteed hot showers are not promised in remote villages",
      ],
    },
    {
      title: "Logistics",
      items: [
        "Flight arrangements between Kathmandu and Pokhara when included on your quote",
        "Private vehicle access to the trailhead when confirmed",
        "Permit handling when included in the package price",
        "Dietary requests handled where feasible — advise at booking",
      ],
    },
  ],
};

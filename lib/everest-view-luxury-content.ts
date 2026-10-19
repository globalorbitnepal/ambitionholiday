import type { TrekItineraryDay } from "./trip-packages";

export const EVEREST_VIEW_SLUG = "everest-view-luxury-trek";

export const EVEREST_VIEW_ITINERARY_INTRO =
  "Seven days and six nights in the lower Khumbu — a private walking itinerary from Lukla through the Dudh Koshi valley to Namche Bazaar, Khumjung Village and the Syangboche ridge panorama area, subject to confirmed lodge availability. This route does not continue to Everest Base Camp, Kala Patthar, Gorak Shep, Dingboche or Lobuche. Flights, pacing and lodge nights follow your confirmed booking terms.";

export const EVEREST_VIEW_ITINERARY: TrekItineraryDay[] = [
  {
    id: "evl-d1",
    day: 1,
    title: "Kathmandu → Lukla flight & trek to Phakding",
    altitude: "Lukla ~2,860 m · Phakding ~2,610 m",
    duration: "Flight + approx. 3–4 hours walking",
    distance: "Approx. 8 km / 5 mi (Lukla–Phakding) · net descent ~250 m",
    meals: "As per confirmed package",
    stay: "Mountain lodge, Phakding",
    body:
      "Travel from Kathmandu to Lukla by scheduled or chartered flight according to your confirmed arrangements and operational conditions. After meeting the trekking team in Lukla, begin the walk toward Phakding along the established lower Everest trail.\n\nThe path follows the Dudh Koshi valley through forest, suspension bridges and small settlements. Day one is designed as a measured introduction — not a race to gain distance.\n\nOvernight in Phakding. Flight departure airport (Kathmandu or Ramechhap/Manthali with road transfer) will be confirmed in your final itinerary.",
  },
  {
    id: "evl-d2",
    day: 2,
    title: "Phakding → Monjo → Namche Bazaar",
    altitude: "Monjo ~2,835 m · Namche Bazaar ~3,440 m",
    duration: "Approx. 5–7 hours walking",
    distance: "Approx. 11–12 km / 7 mi (Phakding–Monjo–Namche) · ascent ~830 m",
    meals: "As per confirmed package",
    stay: "Mountain lodge, Namche Bazaar",
    body:
      "Continue along the river valley through Monjo and Jorsale, crossing bridges beside the Dudh Koshi. Where applicable, Sagarmatha National Park entry formalities are completed on the trail.\n\nThe final climb into Namche Bazaar is steep; walk at a controlled pace with regular fluids. Namche is the main Sherpa trading and cultural hub of the Khumbu — shops, cafés and mountain atmosphere without continuing to the high glacier camps.\n\nOvernight in Namche Bazaar.",
  },
  {
    id: "evl-d3",
    day: 3,
    title: "Acclimatization & cultural exploration in Namche Bazaar",
    altitude: "Sleep Namche ~3,440 m",
    duration: "Flexible local day (typically 2–4 hours on trail if walking)",
    distance: "Optional acclimatisation walks — approx. 2–5 km when guided",
    meals: "As per confirmed package",
    stay: "Mountain lodge, Namche Bazaar",
    body:
      "A dedicated acclimatization day in and around Namche Bazaar. Explore the town, nearby viewpoints or monastery areas at a comfortable pace when weather, health and opening times allow.\n\nYour guide may suggest a short uphill walk to aid altitude adjustment — this is not a compulsory strenuous hike. Report headaches, nausea, dizziness or other symptoms promptly; acclimatization is the purpose of the day, not sightseeing alone.\n\nSecond night in Namche Bazaar.",
  },
  {
    id: "evl-d4",
    day: 4,
    title: "Namche Bazaar → Khumjung / Syangboche ridge area",
    altitude: "Khumjung ~3,780 m · Syangboche ridge area ~3,880 m",
    duration: "Approx. 4–6 hours walking",
    distance: "Approx. 5–7 km / 3–4 mi (Namche–Khumjung–ridge area) · ascent ~440 m",
    meals: "As per confirmed package",
    stay: "Selected mountain lodge — Syangboche ridge area (subject to confirmation)",
    body:
      "After breakfast, follow the upper trail from Namche toward the Syangboche area and Khumjung Village. Explore the village and visit the local monastery when it is open and access is available.\n\nContinue toward the Syangboche ridge panorama area for the planned higher overnight. Panoramic views of Everest and neighbouring peaks depend on weather and visibility — they are never guaranteed.\n\nThe ridge-area lodge night is included only when the lodge, date, room category and route have been verified and confirmed in writing at booking. If your chosen lodge is unavailable, your coordinator will agree an alternative before travel — we do not silently substitute without approval.",
  },
  {
    id: "evl-d5",
    day: 5,
    title: "Syangboche ridge area → Monjo",
    altitude: "Monjo ~2,835 m",
    duration: "Approx. 5–7 hours walking",
    distance: "Approx. 14–16 km / 9–10 mi descent · loss ~1,045 m to Monjo",
    meals: "As per confirmed package",
    stay: "Mountain lodge, Monjo",
    body:
      "After breakfast, descend through the upper Namche area and continue down the established trail toward Monjo. Significant elevation loss today — steady footing and trekking poles help on stone steps.\n\nPass familiar settlements and river-valley scenery as you return to lower Khumbu air. Overnight in Monjo.",
  },
  {
    id: "evl-d6",
    day: 6,
    title: "Monjo → Phakding → Lukla",
    altitude: "Lukla ~2,860 m",
    duration: "Approx. 5–7 hours walking",
    distance: "Approx. 13–15 km / 8–9 mi (Monjo–Phakding–Lukla) · gentle net ascent to Lukla",
    meals: "As per confirmed package",
    stay: "Mountain lodge, Lukla",
    body:
      "Walk through the Dudh Koshi valley, passing Phakding and other settlements on the return to Lukla. Allow time for breaks and any arrangements required for the following day’s flight.\n\nEvening in Lukla with the trekking team. Domestic flight times for Day 7 are not guaranteed until operations confirm.",
  },
  {
    id: "evl-d7",
    day: 7,
    title: "Lukla → Kathmandu flight",
    altitude: "Kathmandu ~1,400 m",
    duration: "No trekking · domestic flight approx. 35–40 min when operated (weather dependent)",
    distance: "No walking distance · Lukla–Kathmandu flight sector only",
    meals: "As per confirmed package",
    stay: "—",
    body:
      "Board the scheduled or chartered flight according to confirmed operations — typically Lukla to Kathmandu, or to the operationally assigned airport with ground transfer if required.\n\nEverest-region flights are weather-dependent and may be delayed, rescheduled or cancelled. Extra nights, meals, transport and insurance claims from disruption follow your published booking terms and policy coverage.\n\nThe trekking portion of the Everest View Luxury Trek ends upon arrival in Kathmandu unless you have booked additional services.",
  },
];

export const EVEREST_VIEW_INCLUSIONS = [
  "Licensed private trekking guide — salary, insurance, meals and lodging on trek according to applicable requirements.",
  "Porter support according to the confirmed porter-to-client ratio and baggage limit.",
  "Kathmandu ↔ Lukla flights as listed in your confirmed itinerary (subject to operational routing).",
  "Ground transfers tied to the confirmed flight plan (including Ramechhap/Manthali road transfers when operations require them).",
  "Six nights of mountain accommodation along the published route (Phakding, Namche ×2, Syangboche ridge area when confirmed, Monjo, Lukla).",
  "Meals according to the agreed package plan — confirm board basis at booking.",
  "Sagarmatha National Park entry and applicable trekking permits where required.",
  "Government taxes and service charges only where included in your quote.",
  "Pre-trek briefing and coordination from Ambition Holidays.",
];

export const EVEREST_VIEW_EXCLUSIONS = [
  "International flights and Nepal entry visa fees.",
  "Travel and helicopter evacuation insurance (mandatory for trekking).",
  "Personal trekking clothing and equipment.",
  "Extra accommodation, meals and transport caused by flight delays or weather disruption.",
  "Additional drinks, snacks, hot showers, Wi-Fi and charging where lodges charge extra.",
  "Tips and gratuities for guide and porter team.",
  "Optional activities, helicopter charter or services not named as included.",
  "Any lodge night not confirmed in your final invoice.",
];

export const EVEREST_VIEW_ADDONS = [
  "Extra Kathmandu hotel nights before or after the trek.",
  "Single-room upgrade where lodges along the route can provide one.",
  "Private helicopter return from the Khumbu when operational (priced separately).",
  "Photography-focused pacing with additional rest days.",
  "Spa or wellness time in Kathmandu on extension nights.",
];

export const EVEREST_VIEW_INCLUDE_NOTE =
  "The Syangboche ridge panorama overnight is a distinctive highlight but not guaranteed until lodge availability, room category and route are confirmed in writing. Lukla flights may operate via Ramechhap/Manthali during some periods — road transfers and timing will be stated on your final itinerary. This package does not include Everest Base Camp, Kala Patthar, Gorak Shep, Dingboche or Lobuche.";

export const EVEREST_VIEW_LUKLA_NOTE =
  "Domestic flights between Kathmandu and Lukla depend on weather, visibility and airline operations. Delays, diversions and cancellations are common — especially during monsoon and in winter.\n\nDuring busy trekking seasons, Lukla sectors are sometimes operated from Ramechhap (Manthali) Airport instead of Kathmandu. When that routing applies, an early-morning road transfer from Kathmandu (typically about four to five hours each way) replaces the Kathmandu–Lukla flight sector on the schedule your coordinator confirms. Pick-up times, baggage limits and ticket routing are stated on your final itinerary.\n\nAllow buffer days on international tickets. Extra hotel nights, meals, road transfers and insurance claims from disruption follow your signed booking terms and policy coverage unless explicitly included on your confirmation.";

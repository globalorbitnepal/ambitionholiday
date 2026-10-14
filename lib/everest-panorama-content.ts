import type { TrekAboutBlock, TrekItineraryDay, TrekJourneyStage } from "./trip-packages";

export const EVEREST_PANORAMA_SLUG = "everest-panorama-trek";

export const EVEREST_PANORAMA_ITINERARY_INTRO =
  "Eleven days / ten nights from arrival in Kathmandu through cultural sightseeing, Lukla flights, Khumbu trekking to Namche Bazaar, Khumjung Village, a premium mountain-view night in the Everest viewpoint area, Tengboche Monastery and the return to Kathmandu — with a leisure day before departure. This is a private luxury trek on the lower and middle Khumbu trail. It does not continue to Everest Base Camp, Gorak Shep, Kala Patthar, Dingboche or Lobuche. Flights, accommodation, meals and pacing follow your signed confirmation.";

export const EVEREST_PANORAMA_JOURNEY_STAGES: TrekJourneyStage[] = [
  {
    id: "ept-s1",
    title: "Stage 1 — Kathmandu: Culture and Arrival",
    body:
      "Welcome at the airport, private transfer to premium city accommodation and a personal trip briefing. The following day explores Kathmandu Valley heritage with private transportation where included.",
    imageSrc: "/images/nepal/nepal-cover.webp",
    imageAlt: "Kathmandu Valley heritage and city streets",
  },
  {
    id: "ept-s2",
    title: "Stage 2 — Into the Mountains",
    body: "Fly to Lukla and trek to Phakding, beginning the walking portion along the lower Khumbu trail.",
    imageSrc: "/images/journeys/j-ebc.webp",
    imageAlt: "Mountain flight approach toward the Everest region",
  },
  {
    id: "ept-s3",
    title: "Stage 3 — The Trail to Namche",
    body: "Follow the Dudh Koshi valley, cross suspension bridges and continue through Monjo towards Namche Bazaar at a measured pace.",
    imageSrc: "/images/nepal/nepal-trek-ebc.webp",
    imageAlt: "Suspension bridge and forest trail in the Khumbu",
  },
  {
    id: "ept-s4",
    title: "Stage 4 — Khumjung and Everest Viewpoints",
    body:
      "Explore the Namche area, visit Khumjung Village and continue to the Everest viewpoint area for a premium mountain-view overnight — location and room category confirmed on your booking documents.",
    imageSrc: "/images/journeys/j-gokyo.webp",
    imageAlt: "Himalayan panorama above a Khumbu valley",
  },
  {
    id: "ept-s5",
    title: "Stage 5 — Tengboche",
    body:
      "Trek towards Tengboche and visit the monastery when accessible, respecting local customs and opening times.",
    imageSrc: "/images/nepal/nepal-trek-ebc.webp",
    imageAlt: "Mountain trail toward Tengboche in the Everest region",
  },
  {
    id: "ept-s6",
    title: "Stage 6 — The Return Through Khumbu",
    body: "Descend through Monjo to Lukla and take the return flight to Kathmandu.",
    imageSrc: "/images/journeys/j-ebc.webp",
    imageAlt: "Khumbu valley trail on the return walk",
  },
  {
    id: "ept-s7",
    title: "Stage 7 — Time in Kathmandu",
    body: "Enjoy a flexible leisure day before departure — rest, shop or explore independently.",
    imageSrc: "/images/nepal/nepal-cover.webp",
    imageAlt: "Kathmandu city life at the end of the journey",
  },
];

export const EVEREST_PANORAMA_ABOUT_LEAD =
  "The Everest Panorama Luxury Trek is an eleven-day private journey through Nepal's Khumbu region, combining cultural sightseeing in Kathmandu with a carefully paced walking experience in the Everest area. The route focuses on Sherpa villages, monasteries and panoramic viewpoints — not an ascent to Everest Base Camp.";

export const EVEREST_PANORAMA_ABOUT_SECTIONS: TrekAboutBlock[] = [
  {
    id: "ept-about-main",
    title: "About the Everest Panorama Luxury Trek",
    body:
      "After exploring Kathmandu Valley, travellers fly to Lukla and walk through mountain villages along the Dudh Koshi River. Phakding and Monjo introduce the region's trails and settlements, while Namche Bazaar offers insight into Sherpa trading life.\n\nThe journey continues to Khumjung Village and a premium mountain-view night in the Everest viewpoint area when confirmed on your booking. Panoramic scenery depends on weather and visibility.\n\nFrom there, the trek leads to Tengboche, known for its Buddhist monastery and cultural landscape. The return route descends through the Khumbu valley to Monjo and Lukla before the flight back to Kathmandu.\n\nWalking conditions depend on weather, trail conditions, group pace and your guide's advice.",
  },
  {
    id: "ept-khumbu",
    title: "The Khumbu Region",
    body:
      "The Khumbu is the Everest region of northeastern Nepal — deep valleys carved by rivers such as the Dudh Koshi, forested lower slopes and high ridges with views toward major peaks when skies are clear. Sagarmatha National Park protects much of the trekking corridor between Lukla and Tengboche.",
  },
  {
    id: "ept-sherpa",
    title: "Sherpa Culture and Mountain Communities",
    body:
      "Sherpa communities have lived and traded in the Khumbu for generations. Namche Bazaar remains an important centre for supplies and services on the Everest trail. Monasteries, mani walls and prayer flags appear along the route; visits depend on opening hours and local customs.",
  },
  {
    id: "ept-viewpoint",
    title: "Everest Viewpoint Overnight",
    body:
      "The itinerary includes a premium mountain-view overnight in the Everest viewpoint area when confirmed at booking. Room category, services and views vary with season and operations. Panoramic mountain views are possible when visibility allows — they are never guaranteed for any single night. Your coordinator confirms the exact overnight location before travel.",
  },
  {
    id: "ept-tengboche",
    title: "Tengboche and Buddhist Heritage",
    body:
      "Tengboche Monastery is one of the most recognised religious sites on the main Everest trail. Monastery access and ceremonies depend on daily schedules and local conditions; your guide will advise what is appropriate during your visit.",
  },
  {
    id: "ept-who",
    title: "Who Is This Trek For?",
    body:
      "The trek is rated moderate: several days of walking on stone steps and valley trails, with significant ascent into Namche and higher nights in the viewpoint area and at Tengboche. Prior hill walking helps. Altitude affects everyone differently — honest communication with your guide matters.",
  },
  {
    id: "ept-responsible",
    title: "Responsible Travel",
    body:
      "Carry out litter, respect monastery rules, stay on established trails and follow your guide's advice. Support local lodges and porters fairly; tipping is customary but always your choice. Comprehensive travel insurance with evacuation cover is strongly recommended.",
  },
];

export const EVEREST_PANORAMA_ITINERARY: TrekItineraryDay[] = [
  {
    id: "ept-d1",
    day: 1,
    title: "Arrive in Kathmandu",
    altitude: "Kathmandu ~1,400 m",
    duration: "Arrival day",
    meals: "As per confirmed package",
    stay: "Premium city accommodation",
    distance: "Private airport transfer",
    body:
      "Welcome at Tribhuvan International Airport and private transfer to your confirmed premium city accommodation. Allow time to rest after the international journey.\n\nYour coordinator provides a personal trip briefing, assistance with arrangements and a welcome experience according to the final package.",
  },
  {
    id: "ept-d2",
    day: 2,
    title: "Private Kathmandu Heritage Experience",
    altitude: "Kathmandu ~1,400 m",
    duration: "Full-day sightseeing",
    meals: "As per confirmed package",
    stay: "Premium city accommodation",
    distance: "Private city touring where included",
    body:
      "Explore selected Kathmandu World Heritage attractions with a knowledgeable local guide — temples, courtyards, architecture and heritage sites at a comfortable pace with private transportation where included.\n\nEntry tickets, meals and optional experiences are included only when listed on your signed confirmation.",
  },
  {
    id: "ept-d3",
    day: 3,
    title: "Fly to Lukla and Trek to Phakding",
    altitude: "Lukla ~2,860 m · Phakding ~2,610 m",
    duration: "Flight + walking day",
    meals: "As per confirmed package",
    stay: "Best available upgraded mountain accommodation, subject to confirmation",
    distance: "Dudh Koshi valley walk",
    body:
      "Take the scheduled flight to Lukla, subject to weather and airline operations. Meet the trekking team and begin walking towards Phakding along the Dudh Koshi valley through villages, suspension bridges and mountain scenery.\n\nFlight routing via Ramechhap/Manthali with road transfer may apply during some operational periods.",
  },
  {
    id: "ept-d4",
    day: 4,
    title: "Phakding to Namche Bazaar",
    altitude: "Monjo ~2,835 m · Namche Bazaar ~3,440 m",
    duration: "Walking day",
    meals: "As per confirmed package",
    stay: "Best available upgraded mountain accommodation, subject to confirmation",
    distance: "Valley trail with ascent to Namche",
    body:
      "Follow the trail beside the Dudh Koshi River, cross suspension bridges and enter Sagarmatha National Park before continuing towards Namche Bazaar at a measured pace with breaks arranged by your guide.",
  },
  {
    id: "ept-d5",
    day: 5,
    title: "Namche, Khumjung and Everest Viewpoint Experience",
    altitude: "Khumjung ~3,780 m · Viewpoint area ~3,880 m",
    duration: "Walking day",
    meals: "As per confirmed package",
    stay: "Premium mountain-view accommodation, subject to availability",
    distance: "Upper trail via Khumjung",
    body:
      "Explore the Namche area and continue towards Khumjung Village and the Everest viewpoint area. Allow time for panoramic scenery, Sherpa culture and a relaxed afternoon.\n\nThe overnight stay is described as premium mountain-view accommodation in the Everest viewpoint area. The exact location, room category and views are confirmed on your booking documents — not promised on the website alone.",
  },
  {
    id: "ept-d6",
    day: 6,
    title: "Trek to Tengboche",
    altitude: "Tengboche ~3,860 m",
    duration: "Walking day",
    meals: "As per confirmed package",
    stay: "Best available upgraded mountain accommodation, subject to confirmation",
    distance: "Forest and ridge trail",
    body:
      "Walk through mountain landscapes and forested trails towards Tengboche. Visit the monastery when accessible and appropriate, respecting local customs and opening times.",
  },
  {
    id: "ept-d7",
    day: 7,
    title: "Trek from Tengboche to Monjo",
    altitude: "Monjo ~2,835 m",
    duration: "Walking day",
    meals: "As per confirmed package",
    stay: "Best available upgraded mountain accommodation, subject to confirmation",
    distance: "Descent through forest and villages",
    body:
      "Retrace the trail through forested slopes and Sherpa settlements, descending towards the lower Khumbu with regular breaks for changing trail conditions.",
  },
  {
    id: "ept-d8",
    day: 8,
    title: "Trek from Monjo to Lukla",
    altitude: "Lukla ~2,860 m",
    duration: "Walking day",
    meals: "As per confirmed package",
    stay: "Best available upgraded mountain accommodation, subject to confirmation",
    distance: "Dudh Koshi valley via Phakding",
    body:
      "Continue through the Dudh Koshi valley, passing villages and suspension bridges on the return to Lukla. Use the afternoon for rest ahead of the flight the following day.",
  },
  {
    id: "ept-d9",
    day: 9,
    title: "Fly from Lukla to Kathmandu",
    altitude: "Kathmandu ~1,400 m",
    duration: "Flight day",
    meals: "As per confirmed package",
    stay: "Premium city accommodation",
    distance: "Mountain flight — weather dependent",
    body:
      "Return flight to Kathmandu, subject to weather and operational conditions. On arrival, private transfer to premium city accommodation. The remainder of the day is flexible for rest or optional experiences.",
  },
  {
    id: "ept-d10",
    day: 10,
    title: "Leisure Day in Kathmandu",
    altitude: "Kathmandu ~1,400 m",
    duration: "Flexible",
    meals: "As per confirmed package",
    stay: "Premium city accommodation",
    distance: "Independent time",
    body:
      "Enjoy a flexible day for relaxation, shopping, a private cultural experience or an optional activity. Optional paid activities are separate from package inclusions.\n\nThis day also serves as contingency buffer for possible domestic flight delays; the schedule may shift if weather disrupts Lukla operations.",
  },
  {
    id: "ept-d11",
    day: 11,
    title: "Departure from Kathmandu",
    altitude: "—",
    duration: "Departure day",
    meals: "As per confirmed package and flight timing",
    stay: "—",
    distance: "Private airport transfer",
    body:
      "Private airport transfer according to your confirmed package and international flight schedule. Departure assistance and farewell according to your booking.",
  },
];

export const EVEREST_PANORAMA_INCLUSIONS = [
  "Airport pickup and departure transfer in Kathmandu when included on your confirmation",
  "Private Kathmandu ground transportation for the specified sightseeing itinerary when included",
  "Premium city accommodation for the specified Kathmandu nights",
  "Best available upgraded mountain accommodation for specified trekking nights",
  "Premium mountain-view accommodation in the Everest viewpoint area on the confirmed night when included",
  "Return domestic flights between Kathmandu and Lukla when included on your quote",
  "Licensed private trekking guide",
  "Porter support according to the confirmed service ratio and baggage allowance",
  "Meals explicitly specified in your signed confirmation",
  "Required trekking permits and confirmed local fees when included",
  "Pre-trip consultation and trip briefing",
  "Trip coordination and agreed support services",
  "Government taxes and service charges where applicable and stated on your invoice",
];

export const EVEREST_PANORAMA_EXCLUSIONS = [
  "International flights to and from Nepal",
  "Nepal visa fees",
  "Travel insurance, including high-altitude trekking and emergency evacuation cover",
  "Personal purchases and expenses",
  "Alcohol, speciality drinks and snacks outside the included meal plan",
  "Additional meals and optional experiences",
  "Optional helicopter services or private aviation upgrades",
  "Personal equipment and clothing",
  "Tips for guides, porters and service staff",
  "Additional accommodation or transportation from personal itinerary changes",
  "Costs arising from flight delays or cancellations except where explicitly covered by your agreed policy",
  "Emergency rescue or evacuation unless arranged and paid separately",
];

export const EVEREST_PANORAMA_LUKLA_NOTE =
  "Two domestic flight sectors are planned: Kathmandu to Lukla on Day 3 and Lukla to Kathmandu on Day 9. Everest-region flights depend on weather, visibility and airline operations. Departure airport and routing may change operationally. Delays, cancellations and re-routing via Ramechhap/Manthali with road transfer may occur. Build flexibility into international tickets.";

export const EVEREST_PANORAMA_INCLUDE_NOTE =
  "Inclusions follow the board basis and room categories on your signed confirmation. Mountain accommodation is more limited than city accommodation; ensuite bathrooms, heating and guaranteed views are not promised every night. Upgrades depend on availability.";

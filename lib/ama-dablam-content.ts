import type { TrekAboutBlock, TrekItineraryDay, TrekJourneyStage } from "./trip-packages";

export const AMA_DABLAM_SLUG = "ama-dablam-base-camp-luxury-trek";

export const AMA_DABLAM_ITINERARY_INTRO =
  "Twelve days / eleven nights from arrival in Kathmandu through Lukla flights, Khumbu trekking to Namche Bazaar, Tengboche, Pangboche and a guided excursion toward Ama Dablam Base Camp, then the return to Kathmandu with a flexible leisure day. This is a private luxury trek — not an Everest Base Camp itinerary and not a climb of Ama Dablam. Flights, meals, accommodation and pacing follow your signed confirmation.";

export const AMA_DABLAM_JOURNEY_STAGES: TrekJourneyStage[] = [
  {
    id: "adb-s1",
    title: "Stage 1 — Kathmandu arrival and briefing",
    body: "Meet your representative, transfer to confirmed city accommodation and review the route, equipment and domestic flight plan.",
    imageSrc: "/images/nepal/nepal-cover.webp",
    imageAlt: "Kathmandu Valley at the start of the journey",
  },
  {
    id: "adb-s2",
    title: "Stage 2 — Into the Khumbu",
    body: "Fly to Lukla when operations allow and walk the Dudh Koshi valley towards Phakding.",
    imageSrc: "/images/journeys/j-ebc.webp",
    imageAlt: "Approach flight toward the Everest region",
  },
  {
    id: "adb-s3",
    title: "Stage 3 — Namche and acclimatisation",
    body: "Ascend to Namche Bazaar and take a guided acclimatisation walk toward the Everest viewpoint area when weather permits.",
    imageSrc: "/images/nepal/nepal-trek-ebc.webp",
    imageAlt: "Trail and bridges in the lower Khumbu",
  },
  {
    id: "adb-s4",
    title: "Stage 4 — Tengboche",
    body: "Continue through forested slopes to Tengboche and visit the monastery respectfully when open.",
    imageSrc: "/images/journeys/j-gokyo.webp",
    imageAlt: "Himalayan ridgeline above the Khumbu",
  },
  {
    id: "adb-s5",
    title: "Stage 5 — Pangboche village life",
    body: "Settle into Pangboche and explore Sherpa village culture at a comfortable pace.",
    imageSrc: "/images/nepal/nepal-trek-ebc.webp",
    imageAlt: "Khumbu village and mountain scenery",
  },
  {
    id: "adb-s6",
    title: "Stage 6 — Ama Dablam Base Camp excursion",
    body: "Early start for the high excursion beneath Ama Dablam, returning to Pangboche — subject to guide approval, weather and fitness.",
    imageSrc: "/images/journeys/j-ebc.webp",
    imageAlt: "Dramatic Himalayan peaks in the Everest region",
  },
  {
    id: "adb-s7",
    title: "Stage 7 — Return to Kathmandu",
    body: "Descend through Namche and Lukla, fly back to Kathmandu and enjoy a flexible leisure day before departure.",
    imageSrc: "/images/nepal/nepal-cover.webp",
    imageAlt: "Kathmandu at journey end",
  },
];

export const AMA_DABLAM_ABOUT_LEAD =
  "Ama Dablam is one of the most recognisable peaks in the Himalaya — a steep, elegant pyramid above the Khumbu. This private trek visits the base camp area beneath the mountain through Namche Bazaar, Tengboche and Pangboche. It is a trekking journey, not a mountaineering expedition to the summit.";

export const AMA_DABLAM_ABOUT_SECTIONS: TrekAboutBlock[] = [
  {
    id: "adb-about-mountain",
    title: "About Ama Dablam",
    body:
      "Rising above the Imja Khola valley, Ama Dablam’s ridges and faces have drawn mountaineers for decades. From the trekking corridor near Pangboche, the mountain’s profile dominates the skyline when clouds allow.\n\nThis package follows established Khumbu trails to the base camp area used by expedition teams — a demanding high walk, not a technical climb. Your guide sets the exact line, timing and turnaround point according to conditions.",
  },
  {
    id: "adb-khumbu",
    title: "The Khumbu and Everest region",
    body:
      "The Khumbu is Nepal’s Everest region: Sherpa villages, monasteries, suspension bridges and trails shared with traders and trekkers. Sagarmatha National Park protects much of the walking corridor between Lukla and the higher valleys.",
  },
  {
    id: "adb-culture",
    title: "Sherpa communities",
    body:
      "Namche Bazaar remains a hub for supplies and services on the main Everest trail. Pangboche and Tengboche reflect centuries of Buddhist heritage — visit monasteries only when open and follow local guidance.",
  },
  {
    id: "adb-not-summit",
    title: "Trekking, not summiting",
    body:
      "Ambition Holidays coordinates a private trekking experience. Climbing Ama Dablam requires separate permits, technical skills and expedition logistics. This itinerary does not include a summit attempt.",
  },
  {
    id: "adb-who",
    title: "Who is this trek for?",
    body:
      "Challenging trekking fitness is recommended: long days on stone steps, significant ascent to Namche and a demanding Day 7 excursion toward 4,600 m. Prior hill walking with a loaded daypack helps. Altitude affects everyone differently.",
  },
];

export const AMA_DABLAM_INCLUSIONS = [
  "Airport transfers in Kathmandu when listed on your signed confirmation",
  "Kathmandu accommodation on included nights per your booking",
  "Return Kathmandu–Lukla flights when included — subject to weather and airline operations",
  "Trekking accommodation on walking nights — best suitable category confirmed in writing",
  "Licensed trekking guide and porter support per confirmed service ratio",
  "Meals according to the board basis on your signed confirmation",
  "Sagarmatha National Park and applicable local permits when included in the quote",
  "Pre-trek briefing and trip coordination",
  "Applicable taxes and service charges only where confirmed in the quotation",
];

export const AMA_DABLAM_EXCLUSIONS = [
  "International flights",
  "Nepal visa fees",
  "Travel insurance and emergency evacuation cover",
  "Personal trekking equipment and purchases",
  "Alcohol, bottled drinks and items outside the included meal plan",
  "Tips for guides, porters and lodge staff",
  "Optional cultural activities or city tours not named as included",
  "Additional nights or transport caused by flight delays, unless covered by your policy or quote",
  "Any service not explicitly listed on your signed confirmation",
];

export const AMA_DABLAM_INCLUDE_NOTE =
  "Inclusions vary by travel date and supplier contract. Lodge standards in remote villages are more basic than in Kathmandu. Nothing is guaranteed as included until it appears on your signed confirmation.";

export const AMA_DABLAM_LUKLA_NOTE =
  "Lukla flights are weather-dependent. Delays and cancellations are common. Your coordinator assists with rebooking when airlines permit; extra costs follow your booking terms unless explicitly covered.";

export const AMA_DABLAM_ITINERARY: TrekItineraryDay[] = [
  {
    id: "adb-d1",
    day: 1,
    title: "Arrival in Kathmandu",
    altitude: "Kathmandu ~1,400 m",
    duration: "Arrival day",
    meals: "As per confirmation",
    stay: "Confirmed Kathmandu accommodation",
    distance: "Airport transfer",
    body:
      "Arrive in Kathmandu and meet the local representative according to the confirmed arrival arrangements. Transfer to the booked accommodation, settle in and rest after the international journey.\n\nIf time allows, receive a personal trek briefing and review the route, equipment and upcoming domestic flight.",
  },
  {
    id: "adb-d2",
    day: 2,
    title: "Fly to Lukla and trek to Phakding",
    altitude: "Lukla 2,860 m · Phakding 2,610 m",
    duration: "Flight + trek",
    meals: "As per confirmation",
    stay: "Best available suitable mountain accommodation",
    distance: "Approx. 3–4 hours walking",
    body:
      "Transfer to the domestic airport for the flight to Lukla, subject to weather and airline operations. After meeting the trekking team, begin walking through the Dudh Koshi valley towards Phakding.\n\nThe trail passes mountain villages, suspension bridges and forested sections — a gentle introduction to trekking in the Khumbu.",
  },
  {
    id: "adb-d3",
    day: 3,
    title: "Trek from Phakding to Namche Bazaar",
    altitude: "Namche Bazaar 3,440 m",
    duration: "5–6 hours (approx.)",
    meals: "As per confirmation",
    stay: "Best available suitable mountain accommodation",
    distance: "Valley ascent",
    body:
      "Follow the Dudh Koshi River through settlements and forest. Cross suspension bridges and pass the Monjo area before the sustained ascent towards Namche Bazaar.\n\nWalk at a measured pace with breaks arranged by the guide. Namche is an important Sherpa trading centre and a key place to prepare for higher elevations.",
  },
  {
    id: "adb-d4",
    day: 4,
    title: "Acclimatisation in Namche Bazaar",
    altitude: "Namche 3,440 m",
    duration: "Acclimatisation walk",
    meals: "As per confirmation",
    stay: "Namche Bazaar",
    distance: "Viewpoint hike",
    body:
      "Spend the day allowing the body to adjust to altitude. Take a guided acclimatisation walk towards the Everest viewpoint area and enjoy views of surrounding peaks when weather permits.\n\nReturn to Namche for the night. Keep the afternoon relaxed for local exploration. The walk must be paced appropriately and adjusted if symptoms of altitude illness appear.",
  },
  {
    id: "adb-d5",
    day: 5,
    title: "Trek from Namche Bazaar to Tengboche",
    altitude: "Tengboche ~3,860 m",
    duration: "5–6 hours (approx.)",
    meals: "As per confirmation",
    stay: "Best available suitable mountain accommodation",
    distance: "Ridge and forest trail",
    body:
      "Leave Namche and follow the trail along mountain slopes through forest and Sherpa settlements, with panoramic views on clear days.\n\nContinue towards Tengboche, known for its monastery and dramatic setting. If the monastery is open, visit respectfully and follow local customs.",
  },
  {
    id: "adb-d6",
    day: 6,
    title: "Trek to Pangboche and explore the village",
    altitude: "Pangboche ~3,930–3,985 m",
    duration: "4–5 hours (approx.)",
    meals: "As per confirmation",
    stay: "Pangboche",
    distance: "Khumbu trail",
    body:
      "Continue towards Pangboche through the Khumbu landscape. On arrival, settle into the accommodation and explore the village and surrounding area at a comfortable pace.\n\nLearn about Sherpa culture and the mountain environment. Monastery visits depend on access and opening arrangements.",
  },
  {
    id: "adb-d7",
    day: 7,
    title: "Excursion to Ama Dablam Base Camp and return to Pangboche",
    altitude: "High point ~4,600 m",
    duration: "Long day — variable",
    meals: "As per confirmation",
    stay: "Pangboche",
    distance: "Excursion — guide-led",
    body:
      "Set out early for the excursion towards Ama Dablam Base Camp, following the guide-approved route and trail conditions.\n\nThe landscape becomes more rugged as the trail approaches the mountain’s base camp area. Enjoy views of Ama Dablam’s ridges and surrounding scenery, allowing adequate time for rest and photographs, then return to Pangboche.\n\nThis is a demanding high-altitude day. The guide may modify or cancel the excursion for safety. Reaching the exact base camp point is not guaranteed for every guest.",
  },
  {
    id: "adb-d8",
    day: 8,
    title: "Trek from Pangboche to Namche Bazaar",
    altitude: "Namche 3,440 m",
    duration: "6–7 hours (approx.)",
    meals: "As per confirmation",
    stay: "Best available suitable mountain accommodation",
    distance: "Descent with ups and downs",
    body:
      "Retrace the route through the Khumbu valley towards Namche Bazaar. The day includes descents, trail variations and possible uphill sections — allow time for a comfortable pace and arrive in Namche for a well-earned rest.",
  },
  {
    id: "adb-d9",
    day: 9,
    title: "Trek from Namche Bazaar to Lukla",
    altitude: "Lukla 2,860 m",
    duration: "6–7 hours (approx.)",
    meals: "As per confirmation",
    stay: "Best available suitable mountain accommodation",
    distance: "Lower Khumbu trail",
    body:
      "Begin the return trek through the Dudh Koshi valley. Pass suspension bridges and settlements along the established trail towards Lukla. The walk can be long — arrange breaks and manage pace with the guide.",
  },
  {
    id: "adb-d10",
    day: 10,
    title: "Fly from Lukla to Kathmandu",
    altitude: "Kathmandu ~1,400 m",
    duration: "Flight day",
    meals: "As per confirmation",
    stay: "Confirmed Kathmandu accommodation",
    distance: "Flight + transfer",
    body:
      "Transfer to the airport for the return flight to Kathmandu, subject to weather and airline operations.\n\nOn arrival, transfer to city accommodation. Keep the remainder of the day flexible for rest and possible flight delays.",
  },
  {
    id: "adb-d11",
    day: 11,
    title: "Free day in Kathmandu",
    altitude: "Kathmandu",
    duration: "Flexible",
    meals: "As per confirmation",
    stay: "Confirmed Kathmandu accommodation",
    distance: "Optional city activities",
    body:
      "Enjoy a flexible day for rest, shopping, optional cultural experiences or a private city activity. This day also provides schedule flexibility if domestic flights were disrupted.\n\nOptional activities are not included unless stated on your confirmation.",
  },
  {
    id: "adb-d12",
    day: 12,
    title: "Departure from Kathmandu",
    altitude: "Kathmandu",
    duration: "Departure",
    meals: "As per confirmation",
    stay: "—",
    distance: "Airport transfer if included",
    body:
      "Arrange the airport transfer according to the confirmed international flight schedule and package inclusions. Conclude the journey with departure assistance and final coordination.",
  },
];

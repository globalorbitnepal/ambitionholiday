import type { TrekItineraryDay } from "./trip-packages";

export const MUSTANG_SLUG = "luxury-upper-mustang-trek";

export const MUSTANG_ITINERARY_INTRO =
  "Fifteen private days and fourteen nights from Kathmandu into Upper Mustang’s rain-shadow kingdom — included domestic flights link Kathmandu, Pokhara and Jomsom; private 4WD support carries you where the highland road demands it. The pace stays measured through Kagbeni, ochre cliffs and the walled capital of Lo Manthang at approximately 3,840 m. Lodge nights are the best available in each village — we do not promise five-star walls in remote Mustang, but we do promise thoughtful logistics and time to explore.";

export const MUSTANG_ITINERARY: TrekItineraryDay[] = [
  {
    id: "um-d1",
    day: 1,
    title: "Day 1 — Arrival in Kathmandu",
    altitude: "1,400 m",
    duration: "Arrival day",
    distance: "Airport transfer only",
    meals: "Welcome dinner",
    stay: "Luxury Kathmandu hotel",
    body:
      "Arrive in Kathmandu and meet your private Ambition Holidays representative at the airport. A comfortable transfer carries you to your luxury hotel in the capital.\n\nThe afternoon and evening remain open — rest after the flight, a quiet walk if you are awake, or simply settle into Nepal at an easy pace. Tomorrow begins the cultural preparation for Mustang.",
  },
  {
    id: "um-d2",
    day: 2,
    title: "Day 2 — Kathmandu Heritage & Upper Mustang Preparation",
    altitude: "1,400 m",
    duration: "Sightseeing + preparation",
    distance: "Local sightseeing",
    meals: "Breakfast",
    stay: "Luxury Kathmandu hotel",
    body:
      "After breakfast your private guide leads a selective Kathmandu heritage morning — Pashupatinath on the Bagmati, the great mandala of Boudhanath, or another site suited to timing and crowd flow.\n\nReturn for lunch and downtime. In the afternoon your Mustang trekking guide reviews kit, permits, flight sectors and the rhythm of the highland days ahead. Questions about altitude, dust and pacing are answered in person, not by message the night before you fly.",
  },
  {
    id: "um-d3",
    day: 3,
    title: "Day 3 — Kathmandu → Pokhara by Flight",
    altitude: "Pokhara — 822 m",
    duration: "Flight + leisure",
    distance: "Flight sector",
    meals: "Breakfast",
    stay: "Luxury lakeside Pokhara hotel",
    body:
      "A private transfer takes you to Kathmandu’s domestic terminal for the included flight to Pokhara.\n\nOn landing, transfer to your lakeside luxury hotel. Keep the afternoon relaxed beside Phewa Lake or at the hotel — tomorrow’s sector toward Jomsom benefits from an early night and calm legs.",
  },
  {
    id: "um-d4",
    day: 4,
    title: "Day 4 — Pokhara → Jomsom → Kagbeni",
    altitude: "Kagbeni — approx. 2,800 m",
    duration: "Flight + transfer/walk",
    distance: "Short trekking / transfer section",
    meals: "Breakfast, Lunch, Dinner",
    stay: "Premium mountain lodge",
    body:
      "Fly Pokhara to Jomsom in the morning, subject to mountain weather and airline operations. Your Mustang support team meets you on arrival.\n\nContinue by private highland 4WD and on foot toward Kagbeni, the gateway village where the restricted Upper Mustang permit line begins. Green valley gives way to dry cliffs and wind-sculpted ridges — the first unmistakable Mustang day.",
  },
  {
    id: "um-d5",
    day: 5,
    title: "Day 5 — Kagbeni → Chele",
    altitude: "Chele — approx. 3,050 m",
    duration: "Approx. 5–6 hours",
    distance: "Approx. 12 km",
    meals: "Breakfast, Lunch, Dinner",
    stay: "Premium mountain lodge",
    body:
      "Walk deeper into Upper Mustang along the Kali Gandaki corridor. Prayer walls, ochre slopes and traditional homes mark the approach to Chele.\n\nThe air is drier and the light sharper than on the Pokhara lakeshore. Your guide sets a pace that respects the new elevation and the dust that afternoon wind can lift.",
  },
  {
    id: "um-d6",
    day: 6,
    title: "Day 6 — Chele → Syangboche",
    altitude: "Syangboche — approx. 3,800 m",
    duration: "Approx. 6–7 hours",
    distance: "Approx. 15 km",
    meals: "Breakfast, Lunch, Dinner",
    stay: "Premium mountain lodge",
    body:
      "A day of passes and open highland views. The trail crosses dramatic ridges where snow peaks frame Mustang’s sculpted desert.\n\nSyangboche sits in thin, clear air — hydrate, eat well, and tell your guide if sleep or headache shifts. Luxury here means a measured day, not a race to the next bed.",
  },
  {
    id: "um-d7",
    day: 7,
    title: "Day 7 — Syangboche → Ghami",
    altitude: "Ghami — approx. 3,520 m",
    duration: "Approx. 5–6 hours",
    distance: "Approx. 10–12 km",
    meals: "Breakfast, Lunch, Dinner",
    stay: "Premium mountain lodge",
    body:
      "Descend slightly into Ghami’s dry valley. Whitewashed walls, chortens and mani stones give the village a strong Tibetan Buddhist character.\n\nTake time to walk the lanes before dinner — Ghami rewards curiosity more than a quick check-in photograph.",
  },
  {
    id: "um-d8",
    day: 8,
    title: "Day 8 — Ghami → Tsarang",
    altitude: "Tsarang — approx. 3,560 m",
    duration: "Approx. 4–5 hours",
    distance: "Approx. 11 km",
    meals: "Breakfast, Lunch, Dinner",
    stay: "Premium mountain lodge",
    body:
      "Red cliffs, dry gullies and wide Himalayan sky accompany the walk toward Tsarang. The historic monastery and traditional settlement deserve an unhurried hour before the sun leaves the walls.\n\nYour lodge is chosen for comfort within what remote Mustang can honestly offer.",
  },
  {
    id: "um-d9",
    day: 9,
    title: "Day 9 — Tsarang → Lo Manthang",
    altitude: "Lo Manthang — approx. 3,840 m",
    duration: "Approx. 4–5 hours",
    distance: "Approx. 12 km",
    body:
      "The trail opens onto the high plain that guards Lo Manthang, the walled capital of Upper Mustang. Ochre ramparts and distant snow peaks announce the cultural heart of the journey.\n\nArrive with enough light for a first walk inside the old city — tomorrow is dedicated to deeper exploration.",
    meals: "Breakfast, Lunch, Dinner",
    stay: "Best available premium lodge",
  },
  {
    id: "um-d10",
    day: 10,
    title: "Day 10 — Lo Manthang Cultural Exploration",
    altitude: "Approx. 3,840 m",
    duration: "Full-day exploration",
    distance: "Local walking",
    meals: "Breakfast, Lunch, Dinner",
    stay: "Best available premium lodge",
    body:
      "A full day with your private local guide inside and around Lo Manthang — monasteries, courtyards, prayer halls and the rhythm of a city that still feels like a kingdom.\n\nPhotography, quiet corners and conversation with your guide replace a rigid hour-by-hour march. This is why the luxury itinerary builds two nights here.",
  },
  {
    id: "um-d11",
    day: 11,
    title: "Day 11 — Lo Manthang → Yara / Dhi Gaon",
    altitude: "Approx. 3,600 m",
    duration: "Approx. 5–7 hours",
    distance: "Route-dependent",
    meals: "Breakfast, Lunch, Dinner",
    stay: "Best available local lodge",
    body:
      "Leave the main walled city for more remote Mustang — layered cliffs, caves and isolated hamlets that few rushed groups reach.\n\nRoad and trail conditions can shift the exact line; your team chooses the safest, most scenic option for the day.",
  },
  {
    id: "um-d12",
    day: 12,
    title: "Day 12 — Return Toward Tangbe / Chhusang",
    altitude: "Approx. 3,000 m",
    duration: "Approx. 5–6 hours",
    distance: "Route-dependent",
    meals: "Breakfast, Lunch, Dinner",
    stay: "Premium mountain lodge",
    body:
      "Begin the southward journey through traditional villages and eroded canyon walls. Architecture and light change with every hour as you drop toward the Kali Gandaki.\n\nPrivate 4WD may shorten certain sectors when wind or road conditions favour wheels over boots — your guide decides on the ground.",
  },
  {
    id: "um-d13",
    day: 13,
    title: "Day 13 — Chhusang / Tangbe → Jomsom",
    altitude: "Jomsom — approx. 2,720 m",
    duration: "Approx. 5–6 hours",
    distance: "Route-dependent",
    meals: "Breakfast, Lunch, Dinner",
    stay: "Premium Jomsom hotel/lodge",
    body:
      "Continue south into greener air as the high desert recedes. Jomsom’s airstrip and river valley mark the last full night in the Mustang region before the flight back to Pokhara.\n\nCelebrate quietly — the Kali Gandaki wind is famous, and an early bed helps tomorrow’s winged departure.",
  },
  {
    id: "um-d14",
    day: 14,
    title: "Day 14 — Jomsom → Pokhara by Flight",
    altitude: "Pokhara — 822 m",
    duration: "Flight + leisure",
    distance: "Flight sector",
    meals: "Breakfast",
    stay: "Luxury lakeside Pokhara hotel",
    body:
      "Morning flight from Jomsom to Pokhara, subject to weather and airline operations — among the most weather-sensitive sectors in Nepal.\n\nCheck into your lakeside hotel and enjoy an unscripted afternoon: spa, lake, café, or simply a balcony without dust in the air.",
  },
  {
    id: "um-d15",
    day: 15,
    title: "Day 15 — Pokhara → Kathmandu by Flight",
    altitude: "Kathmandu — 1,400 m",
    duration: "Flight + departure",
    distance: "Flight sector",
    meals: "Breakfast",
    stay: "—",
    body:
      "After breakfast, private transfer to Pokhara Airport for the included domestic flight to Kathmandu.\n\nOn arrival your airport transfer completes the journey. International departures or extra Kathmandu nights can be arranged in advance.",
  },
];

export const MUSTANG_INCLUSIONS = [
  "Luxury hotel accommodation in Kathmandu with breakfast.",
  "Luxury lakeside accommodation in Pokhara with breakfast.",
  "Domestic flights on the itinerary: Kathmandu–Pokhara–Jomsom and return sectors as listed.",
  "Private airport transfers in Kathmandu and Pokhara.",
  "Private Upper Mustang 4WD support on road sections where required.",
  "Experienced private trekking guide — salary, insurance, meals and lodging on trek.",
  "Porter support where included by the confirmed package.",
  "Best available premium mountain lodges/guesthouses during the Mustang trek.",
  "Full board during remote Mustang trekking sections as specified in the daily plan.",
  "Breakfast in Kathmandu and Pokhara on hotel nights.",
  "Upper Mustang restricted-area permit and applicable conservation permits for the route.",
  "Pre-trek briefing, equipment check and permit handling in Kathmandu.",
  "First-aid kit carried by the guiding team; emergency coordination (insurance-funded evacuation).",
  "Achievement certificate on request where company policy applies.",
];

export const MUSTANG_EXCLUSIONS = [
  "International flights and Nepal visa fees.",
  "Travel insurance including helicopter evacuation (mandatory).",
  "Emergency helicopter costs not covered by your policy.",
  "Personal expenses, bar drinks, laundry and tips.",
  "Personal trekking equipment.",
  "Meals in cities unless listed in the itinerary.",
  "Any service not named under What’s included unless confirmed in writing at booking.",
];

export const MUSTANG_ADDONS = [
  "Extra nights in Kathmandu or Pokhara with private guiding.",
  "Spa or wellness stay in Pokhara.",
  "Helicopter panorama flight where operational.",
  "Chitwan wildlife extension.",
  "Private photography-focused pacing.",
  "Single-room upgrades where accommodation allows.",
];

export const MUSTANG_INCLUDE_NOTE =
  "Kathmandu–Pokhara–Jomsom flight sectors central to this itinerary are included, not sold as optional add-ons. Jomsom flights are especially weather-dependent — keep flexibility on international tickets.";

export const MUSTANG_FLIGHT_NOTE =
  "Domestic flight schedules in the Himalayan region change with weather and airline operations. We recommend reasonable flexibility around Jomsom sectors; your coordinator rebooks the next available seat when delays occur.";

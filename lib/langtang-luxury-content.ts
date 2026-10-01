import type { TrekItineraryDay } from "./trip-packages";

export const LANGTANG_SLUG = "langtang-valley-luxury-trek";

export const LANGTANG_ITINERARY_INTRO =
  "Ten private days and nine nights from Kathmandu into the Langtang Valley — private 4WD to Syabrubesi, then a measured walk through Tamang villages, rhododendron forest and alpine meadows to Kyanjin Gompa at approximately 3,870 m. A dedicated day around Kyanjin allows an optional Kyanjin Ri viewpoint when weather, fitness and your guide agree. Lodge nights use the best available rooms on the route; luxury here means private logistics and pacing, not five-star walls at altitude.";

export const LANGTANG_ITINERARY: TrekItineraryDay[] = [
  {
    id: "lt-d1",
    day: 1,
    title: "Day 1 — Arrival in Kathmandu",
    altitude: "1,400 m",
    duration: "Arrival day",
    distance: "Airport transfer only",
    meals: "Welcome dinner",
    stay: "Luxury Kathmandu hotel",
    body:
      "Arrive in Kathmandu and meet your private Ambition Holidays representative at the airport.\n\nA comfortable transfer carries you to your luxury hotel. The evening stays open — rest, a light stroll if you wish, and time to adjust before the road north toward Langtang tomorrow.",
  },
  {
    id: "lt-d2",
    day: 2,
    title: "Day 2 — Kathmandu Heritage & Trek Preparation",
    altitude: "1,400 m",
    duration: "Sightseeing + preparation",
    distance: "Local sightseeing",
    meals: "Breakfast",
    stay: "Luxury Kathmandu hotel",
    body:
      "After breakfast your private guide leads a selective heritage morning — Pashupatinath, Boudhanath or Swayambhunath according to timing and crowd flow.\n\nReturn for lunch and a Langtang briefing: boots, layers, daypack weight and the rhythm of the forest days ahead. Your guide confirms the private 4WD departure time for Syabrubesi.",
  },
  {
    id: "lt-d3",
    day: 3,
    title: "Day 3 — Kathmandu → Syabrubesi by Private 4WD",
    altitude: "Syabrubesi — approx. 1,550 m",
    duration: "Approx. full day transfer",
    distance: "Road transfer",
    meals: "Breakfast, Lunch, Dinner",
    stay: "Premium mountain lodge",
    body:
      "Leave Kathmandu after breakfast in a private 4WD. The road climbs through hillside settlements and changing scenery — this is a full-day journey, not a quick hop. Traffic, road works and weather can extend the hours.\n\nReach Syabrubesi, the gateway to Langtang National Park, check into your lodge and prepare for the first walking day along the Langtang Khola.",
  },
  {
    id: "lt-d4",
    day: 4,
    title: "Day 4 — Syabrubesi → Lama Hotel",
    altitude: "Lama Hotel — approx. 2,380 m",
    duration: "Approx. 5–6 hours",
    distance: "Approx. 11–12 km",
    meals: "Breakfast, Lunch, Dinner",
    stay: "Premium mountain lodge",
    body:
      "Enter the forest trail beside the Langtang Khola. Oak, rhododendron and bamboo shade the path; waterfalls and river crossings set the pace.\n\nLama Hotel sits in a quieter section of the valley — an early night helps legs and lungs before the climb toward Langtang Village.",
  },
  {
    id: "lt-d5",
    day: 5,
    title: "Day 5 — Lama Hotel → Langtang Village",
    altitude: "Langtang Village — approx. 3,430 m",
    duration: "Approx. 5–6 hours",
    distance: "Approx. 14 km",
    meals: "Breakfast, Lunch, Dinner",
    stay: "Premium mountain lodge",
    body:
      "The forest thins and the peaks begin to dominate the horizon. Pass smaller hamlets before Langtang Village, a Tamang community central to the valley’s identity.\n\nTake time to walk the lanes — this is cultural trekking as much as altitude gain.",
  },
  {
    id: "lt-d6",
    day: 6,
    title: "Day 6 — Langtang Village → Kyanjin Gompa",
    altitude: "Kyanjin Gompa — approx. 3,870 m",
    duration: "Approx. 3–4 hours",
    distance: "Approx. 7 km",
    meals: "Breakfast, Lunch, Dinner",
    stay: "Best available premium mountain lodge",
    body:
      "Above the tree line the valley opens beneath Langtang Lirung and neighbouring summits. The walk to Kyanjin is shorter in distance but significant in atmosphere.\n\nSettle into your lodge, hydrate well and let your guide outline tomorrow’s optional viewpoint plan.",
  },
  {
    id: "lt-d7",
    day: 7,
    title: "Day 7 — Kyanjin Valley Exploration & Kyanjin Ri",
    altitude: "Kyanjin Ri — approx. 4,773 m (excursion)",
    duration: "Approx. 4–6 hours depending on viewpoint",
    distance: "Route-dependent",
    meals: "Breakfast, Lunch, Dinner",
    stay: "Best available premium mountain lodge",
    body:
      "A flexible acclimatization day in Kyanjin. If weather, fitness and your guide’s assessment allow, an early start toward Kyanjin Ri opens a wide panorama of the Langtang Himal.\n\nThe summit is never guaranteed — ice, wind or how you slept matter. Return to Kyanjin for a slower afternoon; cheese factory visits and short walks are alternatives if the ridge is off limits.",
  },
  {
    id: "lt-d8",
    day: 8,
    title: "Day 8 — Kyanjin Gompa → Lama Hotel",
    altitude: "Lama Hotel — approx. 2,380 m",
    duration: "Approx. 5–6 hours",
    distance: "Approx. 14–15 km",
    meals: "Breakfast, Lunch, Dinner",
    stay: "Premium mountain lodge",
    body:
      "Descend through alpine meadows back into forest. Knees and quads work harder than lungs today.\n\nLama Hotel feels almost tropical after Kyanjin’s thin air — enjoy the warmer night and an unhurried dinner.",
  },
  {
    id: "lt-d9",
    day: 9,
    title: "Day 9 — Lama Hotel → Syabrubesi → Kathmandu",
    altitude: "Kathmandu — 1,400 m",
    duration: "Trek + private 4WD transfer",
    distance: "Route-dependent",
    meals: "Breakfast, Lunch",
    stay: "Luxury Kathmandu hotel",
    body:
      "Complete the descent to Syabrubesi and meet your private 4WD for the return to Kathmandu. The drive can again take much of the day.\n\nCheck into your luxury hotel, send laundry if you wish, and celebrate a valley well walked.",
  },
  {
    id: "lt-d10",
    day: 10,
    title: "Day 10 — Kathmandu Departure",
    altitude: "1,400 m",
    duration: "Departure day",
    distance: "Airport transfer only",
    meals: "Breakfast",
    stay: "—",
    body:
      "Breakfast at the hotel, then your private airport transfer. The Langtang Valley Luxury Trek concludes in Kathmandu unless you have arranged extra nights with us in advance.",
  },
];

export const LANGTANG_INCLUSIONS = [
  "Private airport transfers in Kathmandu on arrival and departure.",
  "Two nights in a luxury Kathmandu hotel with breakfast (Day 1–2) and one night after the trek (Day 9).",
  "Private 4WD Kathmandu → Syabrubesi and Syabrubesi → Kathmandu.",
  "Premium or best-available mountain lodges on trek nights.",
  "Private licensed trekking guide — salary, insurance, meals and lodging on trek.",
  "Porter support according to the confirmed package.",
  "Full board on trekking days as listed in the itinerary.",
  "Breakfast at the Kathmandu hotel on listed mornings.",
  "Langtang National Park entry permit and applicable trekking registration (e.g. TIMS where required).",
  "Kyanjin acclimatization / viewpoint day with flexible pacing.",
  "Kathmandu valley sightseeing by private vehicle with entrance fees on Day 2.",
  "Pre-trek briefing and equipment check.",
  "First-aid kit carried by the guiding team; emergency coordination (insurance-funded evacuation).",
];

export const LANGTANG_EXCLUSIONS = [
  "International flights and Nepal visa fees.",
  "Travel insurance with helicopter evacuation cover (mandatory).",
  "Helicopter evacuation costs not covered by your policy.",
  "Personal expenses, bar drinks, bottled water and snacks.",
  "Hot showers, Wi-Fi and device charging where lodges charge extra.",
  "Tips for guide and porter team.",
  "Personal trekking equipment.",
  "Services not named under What’s included unless confirmed in writing at booking.",
];

export const LANGTANG_ADDONS = [
  "Extra Kathmandu hotel nights with private guiding.",
  "Spa or wellness time in Kathmandu.",
  "Helicopter return from Langtang when operational and weather permits.",
  "Private photography-focused pacing.",
  "Single-room upgrade where lodges can provide one.",
];

export const LANGTANG_INCLUDE_NOTE =
  "Private 4WD transfers between Kathmandu and Syabrubesi are included in the core package — not optional add-ons. Road time varies with traffic and conditions; your coordinator keeps you informed on departure days.";

export const LANGTANG_TRANSPORT_NOTE =
  "This itinerary does not use domestic flights. All travel between Kathmandu and the Langtang trailhead is by private 4WD. Allow a full day each way for the mountain road.";

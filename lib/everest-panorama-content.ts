import type { TrekAboutBlock, TrekItineraryDay, TrekJourneyStage } from "./trip-packages";

export const EVEREST_PANORAMA_SLUG = "everest-panorama-trek";

export const EVEREST_PANORAMA_ITINERARY_INTRO =
  "Eleven days from arrival in Kathmandu through cultural sightseeing, Lukla flights, Khumbu trekking to Namche Bazaar, Khumjung Village, Everest View Hotel, Tengboche Monastery and the return to Kathmandu — with a free day before departure. Walking days follow the lower Everest trail; this itinerary does not continue to Everest Base Camp, Gorak Shep, Kala Patthar, Dingboche or Lobuche. Flights, lodge nights and meals follow your confirmed booking documents.";

export const EVEREST_PANORAMA_JOURNEY_INTRO =
  "The Everest Panorama Trek begins in Kathmandu, where centuries-old temples, traditional neighbourhoods and everyday city life introduce you to Nepal's cultural richness. After exploring the Kathmandu Valley, the journey continues with a scenic flight to Lukla and the first steps along the trails of the Everest region.\n\nThe trail follows the Dudh Koshi River through small mountain settlements towards Namche Bazaar, the lively Sherpa trading centre surrounded by Himalayan landscapes. From here, the journey continues through Khumjung Village to Everest View Hotel, offering time to appreciate the mountain environment and experience an overnight stay in this distinctive setting.\n\nThe route then leads towards Tengboche, known for its monastery and mountain surroundings, before descending through familiar settlements to Monjo and returning to Lukla. After the flight back to Kathmandu, a free day provides time to rest, explore and reflect on the journey before departure.";

export const EVEREST_PANORAMA_JOURNEY_STAGES: TrekJourneyStage[] = [
  {
    id: "ept-s1",
    title: "Stage 1 — Kathmandu: Culture and Arrival",
    body:
      "Arrival, hotel transfer and an introduction to Kathmandu. The following day is dedicated to cultural sightseeing in the Kathmandu Valley according to your confirmed plan.",
    imageSrc: "/images/nepal/nepal-cover.webp",
    imageAlt: "Kathmandu Valley heritage and city streets",
  },
  {
    id: "ept-s2",
    title: "Stage 2 — Into the Mountains",
    body: "Fly to Lukla and trek to Phakding, beginning the walking portion of the trip along the lower Khumbu trail.",
    imageSrc: "/images/journeys/j-ebc.webp",
    imageAlt: "Mountain flight approach toward the Everest region",
  },
  {
    id: "ept-s3",
    title: "Stage 3 — The Trail to Namche",
    body:
      "Follow the Dudh Koshi valley, cross suspension bridges and continue through Monjo towards Namche Bazaar.",
    imageSrc: "/images/nepal/nepal-trek-ebc.webp",
    imageAlt: "Suspension bridge and forest trail in the Khumbu",
  },
  {
    id: "ept-s4",
    title: "Stage 4 — Khumjung and Everest View Hotel",
    body:
      "Explore the Namche area, visit Khumjung Village and continue to Everest View Hotel for the planned overnight stay.",
    imageSrc: "/images/journeys/j-gokyo.webp",
    imageAlt: "Himalayan panorama above a Khumbu valley",
  },
  {
    id: "ept-s5",
    title: "Stage 5 — Tengboche",
    body:
      "Trek towards Tengboche and experience the area's mountain scenery and Buddhist heritage when conditions allow.",
    imageSrc: "/images/nepal/nepal-trek-ebc.webp",
    imageAlt: "Mountain trail toward Tengboche in the Everest region",
  },
  {
    id: "ept-s6",
    title: "Stage 6 — The Return Through Khumbu",
    body: "Descend to Monjo, continue to Lukla and take the return flight to Kathmandu.",
    imageSrc: "/images/journeys/j-ebc.webp",
    imageAlt: "Khumbu valley trail on the return walk",
  },
  {
    id: "ept-s7",
    title: "Stage 7 — Time in Kathmandu",
    body: "Enjoy a free day before departure — rest, shop or explore independently.",
    imageSrc: "/images/nepal/nepal-cover.webp",
    imageAlt: "Kathmandu city life at the end of the journey",
  },
];

export const EVEREST_PANORAMA_ABOUT_LEAD =
  "The Everest Panorama Trek is an 11-day journey through Nepal's Khumbu region, combining cultural sightseeing in Kathmandu with a guided walking experience in the Everest area. The itinerary is designed around the landscapes and settlements of the lower Khumbu rather than a trek to Everest Base Camp.";

export const EVEREST_PANORAMA_ABOUT_SECTIONS: TrekAboutBlock[] = [
  {
    id: "ept-about-main",
    title: "About the Everest Panorama Trek",
    body:
      "After exploring Kathmandu Valley, travellers fly to Lukla and begin walking through mountain villages along the Dudh Koshi River. Phakding and Monjo provide an introduction to the region's settlements and trails, while Namche Bazaar offers a closer look at the trading centre and cultural life of the Sherpa community.\n\nThe journey continues to Khumjung Village and Everest View Hotel, where the itinerary includes an overnight stay. The surrounding landscape provides opportunities to appreciate the scale of the Himalayan mountains when weather and visibility allow.\n\nFrom there, the trek leads to Tengboche, known for its Buddhist monastery and its place in the cultural landscape of the Everest region. The return route descends through the Khumbu valley to Monjo and Lukla before the flight back to Kathmandu.\n\nThis itinerary combines mountain scenery, village visits and cultural experiences with time in Nepal's capital. Walking conditions depend on weather, trail conditions, the group's pace and the guide's advice.",
  },
  {
    id: "ept-khumbu",
    title: "The Khumbu Region",
    body:
      "The Khumbu is the Everest region of northeastern Nepal — deep valleys carved by rivers such as the Dudh Koshi, forested lower slopes and high ridges with views toward major peaks when skies are clear. Sagarmatha National Park protects much of the trekking corridor you walk between Lukla and Tengboche. Settlements are spaced along the trail rather than in a single resort hub; lodges, teahouses and local farms shape the rhythm of each day.",
  },
  {
    id: "ept-sherpa",
    title: "Sherpa Culture and Mountain Communities",
    body:
      "Sherpa communities have lived and traded in the Khumbu for generations. Namche Bazaar remains an important centre for supplies and services on the Everest trail. Monasteries, mani walls and prayer flags appear along the route; visits depend on opening hours, local customs and your guide's guidance. Respect photography rules inside religious buildings and ask before photographing people at close range.",
  },
  {
    id: "ept-evh",
    title: "Everest View Hotel Experience",
    body:
      "The itinerary includes an overnight stay at Everest View Hotel in the Syangboche ridge area when confirmed at booking. Room category, services and views vary with season and operations. Panoramic mountain views are possible when visibility allows — they are never guaranteed for any single night. Your coordinator confirms lodge availability before travel.",
  },
  {
    id: "ept-tengboche",
    title: "Tengboche and Buddhist Heritage",
    body:
      "Tengboche Monastery is one of the most recognised religious sites on the main Everest trail. The monastery and its surroundings hold cultural importance for local communities. Monastery access and ceremonies depend on daily schedules, maintenance and local conditions; your guide will advise what is appropriate during your visit.",
  },
  {
    id: "ept-who",
    title: "Who Is This Trek For?",
    body:
      "The trek is rated moderate: several days of walking on stone steps and valley trails, with significant ascent into Namche and higher nights near Everest View Hotel and Tengboche. Prior hill walking or stair training helps. Altitude affects everyone differently — honest communication with your guide matters more than a fixed fitness label.",
  },
  {
    id: "ept-responsible",
    title: "Responsible Travel",
    body:
      "Carry out litter, respect monastery rules, stay on established trails and follow your guide's advice on wildlife and water sources. Support local lodges and porters fairly; tipping is customary but always your choice. Travel insurance with helicopter evacuation cover is strongly recommended for high-altitude trekking in Nepal.",
  },
];

export const EVEREST_PANORAMA_ITINERARY: TrekItineraryDay[] = [
  {
    id: "ept-d1",
    day: 1,
    title: "Arrival in Kathmandu",
    altitude: "Kathmandu ~1,400 m",
    duration: "Arrival day",
    meals: "As per confirmed package",
    stay: "Hotel, Kathmandu",
    distance: "Airport transfer",
    body:
      "Arrive at Tribhuvan International Airport, meet the local representative and transfer to the hotel.\n\nYour coordinator confirms sightseeing timing, domestic flight arrangements and any questions about the days ahead.",
  },
  {
    id: "ept-d2",
    day: 2,
    title: "Kathmandu Valley Sightseeing",
    altitude: "Kathmandu ~1,400 m",
    duration: "Full-day sightseeing",
    meals: "As per confirmed package",
    stay: "Hotel, Kathmandu",
    distance: "City touring",
    body:
      "Explore selected cultural and historical attractions in Kathmandu Valley, including UNESCO World Heritage Sites according to the confirmed sightseeing plan.\n\nPacing and sites visited follow the arrangement stated on your booking confirmation.",
  },
  {
    id: "ept-d3",
    day: 3,
    title: "Flight to Lukla and Trek to Phakding",
    altitude: "Lukla ~2,860 m · Phakding ~2,610 m",
    duration: "Flight + approx. 3–4 hours walking",
    meals: "As per confirmed package",
    stay: "Mountain lodge, Phakding",
    distance: "Introductory valley walk",
    body:
      "Fly to Lukla, approximately 2,860 m, subject to weather and flight operations. Begin trekking along mountain trails towards Phakding.\n\nThe path follows the Dudh Koshi valley through forest and villages. Flight routing via Ramechhap/Manthali with road transfer may apply during some operational periods.",
  },
  {
    id: "ept-d4",
    day: 4,
    title: "Phakding to Namche Bazaar",
    altitude: "Monjo ~2,835 m · Namche Bazaar ~3,440 m",
    duration: "Approx. 5–7 hours walking",
    meals: "As per confirmed package",
    stay: "Mountain lodge, Namche Bazaar",
    distance: "Valley trail with ascent to Namche",
    body:
      "Follow the Dudh Koshi River, cross suspension bridges and pass through Monjo before continuing towards Namche Bazaar.\n\nThe final climb into Namche is steep — walk steadily and drink regularly.",
  },
  {
    id: "ept-d5",
    day: 5,
    title: "Namche Bazaar via Khumjung to Everest View Hotel",
    altitude: "Khumjung ~3,780 m · Everest View Hotel area ~3,880 m",
    duration: "Approx. 4–6 hours walking",
    meals: "As per confirmed package",
    stay: "Everest View Hotel (subject to confirmation)",
    distance: "Upper trail via Khumjung",
    body:
      "Explore the Namche Bazaar area, continue to Khumjung Village and proceed to Everest View Hotel for the planned overnight stay.\n\nMountain views depend on weather and visibility. The hotel night is confirmed only when stated on your booking documents.",
  },
  {
    id: "ept-d6",
    day: 6,
    title: "Everest View Hotel to Tengboche",
    altitude: "Tengboche ~3,860 m",
    duration: "Approx. 4–6 hours walking",
    meals: "As per confirmed package",
    stay: "Mountain lodge, Tengboche",
    distance: "Ridge and forest trail",
    body:
      "Trek towards Tengboche and visit Tengboche Monastery subject to opening hours and local conditions.\n\nThe monastery and its surroundings are culturally significant; follow your guide's guidance on photography and conduct.",
  },
  {
    id: "ept-d7",
    day: 7,
    title: "Tengboche to Monjo",
    altitude: "Monjo ~2,835 m",
    duration: "Approx. 5–7 hours walking",
    meals: "As per confirmed package",
    stay: "Mountain lodge, Monjo",
    distance: "Descent through forest and villages",
    body:
      "Descend through forested trails and Sherpa settlements, passing the Namche Bazaar area before continuing to Monjo.\n\nSignificant elevation loss today — use trekking poles if you prefer on stone steps.",
  },
  {
    id: "ept-d8",
    day: 8,
    title: "Monjo to Lukla",
    altitude: "Lukla ~2,860 m",
    duration: "Approx. 5–7 hours walking",
    meals: "As per confirmed package",
    stay: "Mountain lodge, Lukla",
    distance: "Valley trail via Phakding",
    body:
      "Follow the Dudh Koshi River trail, passing Phakding and returning to Lukla.\n\nEvening in Lukla ahead of the return flight.",
  },
  {
    id: "ept-d9",
    day: 9,
    title: "Flight from Lukla to Kathmandu",
    altitude: "Kathmandu ~1,400 m",
    duration: "Flight day",
    meals: "As per confirmed package",
    stay: "Hotel, Kathmandu",
    distance: "Mountain flight — weather dependent",
    body:
      "Return to Kathmandu by flight, subject to weather and flight operations.\n\nDelays and reschedules are common; extra costs from disruption follow your booking terms and insurance policy.",
  },
  {
    id: "ept-d10",
    day: 10,
    title: "Free Day in Kathmandu",
    altitude: "Kathmandu ~1,400 m",
    duration: "Flexible",
    meals: "As per confirmed package",
    stay: "Hotel, Kathmandu",
    distance: "Independent time",
    body:
      "Enjoy free time to relax, shop, visit local markets or explore independently.\n\nOptional activities or extra nights can be arranged in advance with your coordinator.",
  },
  {
    id: "ept-d11",
    day: 11,
    title: "Departure from Kathmandu",
    altitude: "—",
    duration: "Departure day",
    meals: "Breakfast if included",
    stay: "—",
    distance: "Airport transfer",
    body: "Transfer to Tribhuvan International Airport for the onward journey.\n\nEnd of trip.",
  },
];

export const EVEREST_PANORAMA_INCLUSIONS = [
  "Airport transfers in Kathmandu as stated on your confirmed itinerary",
  "Kathmandu hotel nights per confirmed room category",
  "Kathmandu Valley sightseeing per confirmed plan",
  "Kathmandu ↔ Lukla domestic flights when included on your quote",
  "Licensed trekking guide and porter support when included on your quote",
  "Sagarmatha National Park and applicable trekking permits when included",
  "Mountain lodge accommodation on trekking nights",
  "Meals on trek days per confirmed board basis",
  "Everest View Hotel overnight when confirmed at booking",
  "Applicable government taxes when stated on your invoice",
];

export const EVEREST_PANORAMA_EXCLUSIONS = [
  "International airfare to and from Nepal",
  "Nepal visa fees",
  "Travel and emergency evacuation insurance (strongly recommended)",
  "Personal expenses, drinks and snacks",
  "Tips for guide, porter and lodge staff",
  "Extra accommodation, meals and transport from flight delays or weather",
  "Optional activities not listed on your confirmation",
];

export const EVEREST_PANORAMA_LUKLA_NOTE =
  "Two domestic flight sectors are planned: Kathmandu to Lukla on Day 3 and Lukla to Kathmandu on Day 9. Everest-region flights depend on weather, visibility and airline operations. Delays, cancellations and re-routing via Ramechhap/Manthali with road transfer may occur. Build flexibility into international tickets and read your booking conditions for delay costs.";

export const EVEREST_PANORAMA_INCLUDE_NOTE =
  "Inclusions follow the board basis and room categories on your signed confirmation. Lodge standards vary in remote Khumbu villages; private bathrooms and heating are not guaranteed every night.";

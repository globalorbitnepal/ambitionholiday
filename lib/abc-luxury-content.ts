import type { TrekItineraryDay } from "./trip-packages";

export const ABC_SLUG = "annapurna-base-camp-luxury-trek";

export const ABC_ITINERARY_INTRO =
  "Twelve private days and eleven nights from Kathmandu into the Annapurna Sanctuary at 4,130 m. Domestic flights link Kathmandu and Pokhara; private ground transfers cover the Pokhara–Ghandruk approach and the Jhinu Danda return. On the trail the pace stays measured — Gurung villages, bamboo forest and the amphitheatre of peaks above Annapurna Base Camp. Lodge nights are chosen for comfort where the trail allows.";

export const ABC_ITINERARY: TrekItineraryDay[] = [
  {
    id: "abc-d1",
    day: 1,
    title: "Arrival in Kathmandu – private airport transfer",
    altitude: "Kathmandu — 1,400 m / 4,593 ft",
    duration: "Arrival & private transfer",
    distance: "Approx. 6 km airport transfer",
    meals: "Breakfast",
    stay: "Luxury Hotel, Kathmandu",
    body: "Land at Tribhuvan International Airport and meet your Ambition Holidays representative on the kerb — no queueing for a generic shuttle.\n\nA private transfer carries you to your luxury hotel in Kathmandu. Check in, shower, and let the flight fade. The afternoon is deliberately open: rest in the room, a short stroll through Thamel if you are awake, or tea on the terrace.\n\nYour journey coordinator confirms tomorrow’s sightseeing and leaves you with a direct line for anything you need tonight.",
  },
  {
    id: "abc-d2",
    day: 2,
    title: "Kathmandu Valley sightseeing & trek preparation",
    altitude: "Kathmandu — 1,400 m / 4,593 ft",
    duration: "Private sightseeing",
    distance: "Valley sightseeing",
    meals: "Breakfast",
    stay: "Luxury Hotel, Kathmandu",
    body: "After breakfast, a private vehicle and guide take you through the valley’s living heritage — Pashupatinath on the Bagmati, the great mandala of Boudhanath, and Swayambhunath watching over the city from its hill.\n\nReturn to the hotel for a slow lunch and downtime. In the afternoon your trekking guide reviews boots, layers and daypack contents, then walks through altitude, daily rhythm and the lodge plan for the Annapurna section.\n\nDinner is yours to choose in the city. Tomorrow you fly to Pokhara.",
  },
  {
    id: "abc-d3",
    day: 3,
    title: "Kathmandu → Pokhara by Flight",
    altitude: "Pokhara — 822 m / 2,697 ft",
    duration: "Domestic flight",
    distance: "Kathmandu–Pokhara domestic flight",
    meals: "Breakfast",
    stay: "Luxury Lakeside Hotel, Pokhara",
    body: "A private transfer takes you to Kathmandu’s domestic terminal for the included flight to Pokhara.\n\nThe short hop is scenic when the weather is open — Himalayan ridges may be visible depending on visibility that morning. On landing, a private transfer carries you from Pokhara Airport to your lakeside luxury hotel.\n\nCheck in, settle, and use the afternoon to rest and prepare for the trek. This is the last full evening of city comfort before the hills.",
  },
  {
    id: "abc-d4",
    day: 4,
    title: "Pokhara → Ghandruk by private ground transfer",
    altitude: "Ghandruk — 1,940 m / 6,365 ft",
    duration: "Private ground transfer",
    distance: "Pokhara to Ghandruk by private vehicle",
    meals: "Breakfast, Lunch & Dinner",
    stay: "Premium Mountain Lodge, Ghandruk",
    body: "After breakfast a private vehicle takes you from Pokhara toward Ghandruk, the start of the walking line.\n\nGhandruk is one of the Annapurna’s finest Gurung villages — slate roofs, carved balconies, and a wide view toward Machhapuchare and Annapurna South. Settle into your lodge, watch the light leave the peaks, and feel the pace of the mountains take over.",
  },
  {
    id: "abc-d5",
    day: 5,
    title: "Ghandruk → Chhomrong",
    altitude: "Chhomrong — 2,170 m / 7,120 ft",
    duration: "5–6 hours trekking",
    distance: "Approx. 10–12 km",
    meals: "Breakfast, Lunch & Dinner",
    stay: "Premium Mountain Lodge, Chhomrong",
    body: "The path rolls through terraced fields and oak forest, dipping and climbing as the Modi Khola valley deepens below.\n\nChhomrong sits on a ridge with sudden drama — Annapurna South and Hiunchuli close enough to read the snow texture. Your lodge faces the line you will walk into tomorrow. Evening is for a warm meal, a briefing on the descent to the river, and an early bed.",
  },
  {
    id: "abc-d6",
    day: 6,
    title: "Chhomrong → Bamboo",
    altitude: "Bamboo — 2,310 m / 7,579 ft",
    duration: "5–6 hours trekking",
    distance: "Approx. 10–11 km",
    meals: "Breakfast, Lunch & Dinner",
    stay: "Selected Mountain Lodge, Bamboo",
    body: "Stone steps lead down to the suspension bridge, then the trail follows the Modi Khola into a green tunnel of bamboo, rhododendron and oak.\n\nWaterfalls cut the cliff faces; the river noise becomes the day’s soundtrack. Bamboo village is narrow and shaded — a halfway house between the cultivated ridges and the sanctuary walls above. The air cools; pack layers for the morning.",
  },
  {
    id: "abc-d7",
    day: 7,
    title: "Bamboo → Deurali",
    altitude: "Deurali — 3,230 m / 10,597 ft",
    duration: "5–6 hours trekking",
    distance: "Approx. 9–11 km",
    meals: "Breakfast, Lunch & Dinner",
    stay: "Selected Mountain Lodge, Deurali",
    body: "Trees thin; the valley tightens. Avalanche chutes and waterfalls mark the walls of the sanctuary approach.\n\nDeurali is the last comfortable stop before the high basin — lodges tucked against the slope, mist often curling through the pines. Your guide reviews tomorrow’s early start and the altitude gain through Machhapuchare Base Camp to Annapurna Base Camp. Hydrate, eat well, sleep deep.",
  },
  {
    id: "abc-d8",
    day: 8,
    title: "Deurali → Machhapuchare Base Camp → Annapurna Base Camp",
    altitude: "Deurali 3,230 m · MBC 3,700 m · ABC 4,130 m",
    duration: "5–7 hours trekking",
    distance: "Approx. 10–12 km",
    meals: "Breakfast, Lunch & Dinner",
    stay: "Mountain Lodge, Annapurna Base Camp",
    body: "Leave Deurali in clear morning air. The trail opens into alpine grass and moraine. You reach Machhapuchare Base Camp (3,700 m) first — a pause for tea and photographs beneath the fishtail — then continue to Annapurna Base Camp at 4,130 m the same day.\n\nThe sanctuary amphitheatre closes around you: Annapurna I (8,091 m), Annapurna South (7,219 m), Hiunchuli (6,441 m) and Machhapuchare (6,993 m). Flags, ice and vertical granite. You sleep inside the bowl of peaks you have been walking toward for a week. There is no separate day for MBC; both camps sit on Day 8.",
  },
  {
    id: "abc-d9",
    day: 9,
    title: "Annapurna Base Camp → Bamboo",
    altitude: "Bamboo — 2,310 m / 7,579 ft",
    duration: "6–7 hours trekking",
    distance: "Approx. 14–16 km",
    meals: "Breakfast, Lunch & Dinner",
    stay: "Selected Mountain Lodge, Bamboo",
    body: "A pre-dawn wake for light on Annapurna South and the ice flutes of the sanctuary walls — bring every layer you carried.\n\nAfter breakfast the trail drops through Machhapuchare Base Camp and Deurali back into forest. Knees and quads earn their keep on the long descent to Bamboo (2,310 m). The lodge feels almost tropical after last night’s frost; rest well.",
  },
  {
    id: "abc-d10",
    day: 10,
    title: "Bamboo → Jhinu Danda",
    altitude: "Jhinu Danda — 1,780 m / 5,840 ft",
    duration: "5–6 hours trekking",
    distance: "Approx. 11–13 km",
    meals: "Breakfast, Lunch & Dinner",
    stay: "Premium Mountain Lodge, Jhinu Danda",
    body: "More downhill through rhododendron and river gorge until Jhinu Danda appears on its ridge at 1,780 m.\n\nThe natural hot springs beside the Modi Khola are the reward — soak tired calves in mineral water while the forest steams around you. It is the softest landing after the sanctuary. Dinner with the group; keep the night quiet so legs recover for tomorrow’s transfer.",
  },
  {
    id: "abc-d11",
    day: 11,
    title: "Jhinu Danda → Pokhara by private ground transfer",
    altitude: "Pokhara — 822 m / 2,697 ft",
    duration: "Private ground transfer",
    distance: "Jhinu Danda to Pokhara by private vehicle",
    meals: "Breakfast",
    stay: "Luxury Lakeside Hotel, Pokhara",
    body: "A shorter walk to the vehicle point, then your private ground transfer to Pokhara.\n\nCheck into the lakeside hotel, send laundry, rest. The afternoon is unscripted — a boat on Phewa, a café on the promenade, or simply a balcony with Machhapuchare in the distance. You have earned a night that feels like a holiday again.",
  },
  {
    id: "abc-d12",
    day: 12,
    title: "Pokhara → Kathmandu by Flight",
    altitude: "Kathmandu — 1,400 m / 4,593 ft",
    duration: "Domestic flight",
    distance: "Pokhara–Kathmandu domestic flight",
    meals: "Breakfast",
    stay: "Departure — no hotel night unless an extra night is booked",
    body: "Breakfast at the hotel, then a private transfer to Pokhara Airport for the included domestic flight to Kathmandu.\n\nOn arrival a private airport transfer meets you. The twelve-day journey concludes in Kathmandu. We can take you to the international terminal or to a hotel for extra nights arranged in advance. Domestic flight schedules are subject to airline operations and weather.",
  },
];

export const ABC_INCLUSIONS = [
  "Private airport transfers in Kathmandu on arrival and, on Day 12, as required.",
  "Two nights in a luxury Kathmandu hotel with breakfast (Day 1 and Day 2).",
  "Two nights in a premium lakeside Pokhara hotel with breakfast (Day 3 and Day 11).",
  "Domestic flights Kathmandu–Pokhara–Kathmandu, including applicable airport transfers.",
  "Private Pokhara → Ghandruk ground transfer and private Jhinu Danda → Pokhara ground transfer.",
  "Trailhead and local transfers as required by the itinerary.",
  "Annapurna Conservation Area Permit (ACAP) and TIMS — arranged before you walk.",
  "Selected premium and best-available mountain lodges on trek nights (11 nights in total).",
  "Breakfast, lunch and dinner on trekking days as listed in the itinerary.",
  "Licensed trekking guide — salary, insurance, meals and lodging on trek.",
  "Porter support (one porter per two guests) including wages, food and insurance.",
  "Down jacket, sleeping bag and duffel for use on the trek (returned in Pokhara).",
  "Kathmandu valley sightseeing by private vehicle with entrance fees on Day 2.",
  "Pre-trek equipment check and route briefing with your lead guide.",
  "First-aid kit carried by the guiding team; emergency evacuation coordination (insurance-funded).",
  "Ambition Holidays achievement certificate on request.",
];

export const ABC_EXCLUSIONS = [
  "International flights and Nepal visa fees.",
  "Travel insurance with helicopter evacuation cover (mandatory).",
  "Lunches and dinners in Kathmandu and Pokhara unless listed.",
  "Bar drinks, bottled water and personal snacks on trek.",
  "Hot showers, Wi-Fi and device charging where lodges charge extra.",
  "Tips for guide and porter team.",
  "Spa, laundry and personal expenses.",
  "Any service not named under What’s included unless confirmed in writing at booking.",
];

export const ABC_ADDONS = [
  "Extra nights in Kathmandu or Pokhara with private guiding.",
  "Helicopter panorama or private charter on departure day.",
  "Chitwan or Bardia wildlife extension after Pokhara.",
];

export const ABC_INCLUDE_NOTE =
  "Kathmandu–Pokhara–Kathmandu domestic flights are included. Private airport transfers and the Pokhara–Ghandruk / Jhinu Danda–Pokhara ground transfers are also included. Domestic flight times follow the airline and the weather that morning.";

export const ABC_LUKLA_NOTE =
  "This itinerary does not use Lukla. Kathmandu and Pokhara are linked by included domestic flights. Schedules can shift with airline operations and mountain weather; your coordinator tracks the day’s plan and moves transfers when needed.";

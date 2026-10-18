import type { TrekLuxuryExperience } from "./trip-packages";

export const AMA_DABLAM_PRICING_DISCLAIMER =
  "Proposed retail rates per person in USD. Final pricing depends on confirmed travel dates, accommodation availability, flight operations and the service configuration on your signed confirmation. Single-room supplements and helicopter upgrades are quoted separately unless explicitly included.";

export const AMA_DABLAM_GROUP_PRICES = [
  { id: "g1", label: "1 traveller", priceUsd: 3999 },
  { id: "g2", label: "2–3 travellers", priceUsd: 3299 },
  { id: "g3", label: "4–5 travellers", priceUsd: 3099 },
  { id: "g4", label: "6–9 travellers", priceUsd: 2899 },
  { id: "g5", label: "10–14 travellers", priceUsd: 2699 },
] as const;

export const AMA_DABLAM_LUXURY_EXPERIENCE: TrekLuxuryExperience = {
  title: "What makes this a luxury trek?",
  intro:
    "A private, coordinator-led Khumbu journey with experienced guiding, planned acclimatisation and the best suitable accommodation available at each stop — not a budget group departure or a summit expedition on Ama Dablam.",
  pillars: [
    {
      title: "Private coordination",
      items: [
        "Private itinerary for your confirmed party",
        "Pre-departure briefing and equipment review",
        "Dedicated trip coordinator",
        "Licensed guide arrangements appropriate to group size",
        "Porter support per confirmed service ratio",
        "Clear communication before and during the trek",
      ],
    },
    {
      title: "Accommodation standards",
      items: [
        "Confirmed Kathmandu accommodation on included city nights",
        "Best suitable mountain lodges on trekking nights, subject to availability",
        "Room category confirmed on your signed booking — not property names on this page",
        "Ensuite facilities where available; not guaranteed every mountain night",
        "Remote villages are more basic than the city — luxury means service and planning, not five-star lodges throughout",
      ],
    },
    {
      title: "Altitude and pacing",
      items: [
        "Acclimatisation day in Namche Bazaar",
        "Measured ascent with guide-led pacing",
        "Day 7 base camp excursion only when conditions and fitness allow",
        "Guide may modify or cancel the excursion for safety",
        "Comprehensive travel insurance with evacuation cover strongly recommended",
      ],
    },
  ],
};

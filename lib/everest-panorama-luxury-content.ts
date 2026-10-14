import type { TrekLuxuryExperience } from "./trip-packages";

export const EVEREST_PANORAMA_LUXURY_EXPERIENCE: TrekLuxuryExperience = {
  title: "What makes this a luxury trek?",
  intro:
    "This is a private luxury trek — not a budget tea-house departure or a mass-market group tour. The emphasis is on personalised coordination, carefully selected accommodation, thoughtful pacing and clear communication from enquiry through departure.",
  pillars: [
    {
      title: "Private, personalised travel",
      items: [
        "Private itinerary for your confirmed booking party",
        "Personalised pre-trip consultation",
        "Dedicated trip coordinator",
        "Private guiding arrangements appropriate to group size",
        "Flexible pacing where trail conditions and logistics allow",
        "Clear communication before, during and after the journey",
      ],
    },
    {
      title: "Elevated accommodation",
      items: [
        "Premium accommodation in Kathmandu on city nights",
        "Carefully selected upgraded mountain lodges on trekking nights",
        "Best suitable room category available at each stop, subject to availability",
        "Ensuite facilities where confirmed and available — not guaranteed every mountain night",
        "Premium mountain-view night in the Everest viewpoint area when confirmed on your booking",
        "Room upgrades depend on supplier availability; mountain options are more limited than in the city",
      ],
    },
    {
      title: "Thoughtful dining",
      items: [
        "Meal plan follows the board basis on your signed confirmation",
        "Dietary requests discussed in advance where possible",
        "Quality and cleanliness prioritised at included meals",
        "Premium dining experiences only where they can genuinely be arranged",
        "Beverages, speciality meals and extras outside the included plan are not covered unless stated",
      ],
    },
    {
      title: "Comfort and convenience",
      items: [
        "Private airport transfers in Kathmandu when included",
        "Assistance with domestic flight arrangements",
        "Porter support according to the confirmed package",
        "Pre-departure briefing and packing guidance",
        "Assistance with luggage logistics and flight disruptions",
        "Reliable communication and a documented emergency plan",
      ],
    },
    {
      title: "Responsible altitude management",
      items: [
        "Gradual ascent where the route allows",
        "Experienced guide oversight on walking days",
        "Daily communication about symptoms and pace",
        "Clear emergency response and descent guidance",
        "Contingency guidance for weather and domestic flight delays",
        "Altitude illness cannot be prevented; evacuation is not automatically included in the package price",
      ],
    },
  ],
};

export const EVEREST_PANORAMA_PRICING_DISCLAIMER =
  "Proposed retail rates per person in USD. Final pricing depends on confirmed travel dates, accommodation availability, flight operations and the service configuration on your signed confirmation. Single-room supplements and helicopter upgrades are quoted separately unless explicitly included. Supplier costs should be re-audited before treating these figures as confirmed commercial rates.";

export const EVEREST_PANORAMA_GROUP_PRICES = [
  { id: "g1", label: "1 traveller", priceUsd: 3499 },
  { id: "g2", label: "2–3 travellers", priceUsd: 2899 },
  { id: "g3", label: "4–5 travellers", priceUsd: 2699 },
  { id: "g4", label: "6–9 travellers", priceUsd: 2549 },
  { id: "g5", label: "10–14 travellers", priceUsd: 2399 },
] as const;

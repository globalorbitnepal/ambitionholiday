import type { TrekPackage } from "./trip-packages";
import { isEverestViewPackage } from "./trip-packages";

/** Strip lodge/hotel property names from visitor-facing copy (admin may still use internal fields). */
export function stripEverestViewPropertyNames(text: string): string {
  if (!text) return text;
  return text
    .replace(/Hotel Everest View/gi, "premium ridge viewpoint stay")
    .replace(/\bHEV\b/g, "premium ridge stay")
    .replace(/hotel everest view/gi, "premium ridge viewpoint stay");
}

function mapStrings<T>(value: T, fn: (s: string) => string): T {
  if (typeof value === "string") return fn(value) as T;
  if (Array.isArray(value)) return value.map((item) => mapStrings(item, fn)) as T;
  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value)) {
      if (k === "hotelEverestViewAdminNote") continue;
      out[k] = mapStrings(v, fn);
    }
    return out as T;
  }
  return value;
}

/** Public trek page model — never shows property names even if CMS reintroduces them. */
export function everestViewPublicPackage(pkg: TrekPackage): TrekPackage {
  const cleaned = mapStrings(pkg, stripEverestViewPropertyNames);
  return {
    ...cleaned,
    hotelEverestViewPublicNote: stripEverestViewPropertyNames(
      pkg.hotelEverestViewPublicNote ||
        "The planned higher-elevation overnight is subject to confirmed availability and will be stated on your booking confirmation.",
    ),
  };
}

export function resolveTripPackageForPage(pkg: TrekPackage): TrekPackage {
  return isEverestViewPackage(pkg) ? everestViewPublicPackage(pkg) : pkg;
}

export const EVEREST_VIEW_ACCOMMODATION_SECTION = {
  title: "Accommodation & comfort on the trail",
  intro:
    "This is a private guided trek in the lower Khumbu. Nights are arranged along the walking route in comfortable mountain lodges unless your booking confirmation states a selected premium stay on the ridge above Namche.",
  blocks: [
    {
      heading: "Mountain lodges (most nights)",
      body:
        "Phakding, Namche Bazaar (two nights), Monjo and Lukla use established teahouse-style lodges on the main trail. Room type is typically twin-sharing; private rooms may be available for a supplement where lodges allow. Heating, attached bathrooms and hot showers are not guaranteed every night.",
      status: "Included when named on your confirmed itinerary",
    },
    {
      heading: "Higher-elevation night (Day 4)",
      body:
        "After Khumjung Village, the itinerary may include one night at a premium ridge viewpoint area near Syangboche when rooms are confirmed. This is a highlight, not a guaranteed branded property — alternatives are agreed with you if availability changes.",
      status: "Subject to confirmation at booking",
    },
    {
      heading: "Meals",
      body:
        "Meals follow the board basis on your quote (commonly breakfast, lunch and dinner on trek days). Confirm exact inclusions when you request pricing.",
      status: "Per confirmed package plan",
    },
    {
      heading: "Private guide & porter support",
      body:
        "Licensed private guide throughout; porter assistance according to the confirmed baggage limit and porter ratio on your invoice.",
      status: "Included when listed on your quote",
    },
    {
      heading: "Transfers & flights",
      body:
        "Kathmandu ↔ Lukla flights and linked ground transfers as on your confirmed plan, including Ramechhap/Manthali road transfers when operations require them.",
      status: "Included when listed on your quote",
    },
  ],
};

export const EVEREST_VIEW_SAFETY_SECTION = {
  title: "Altitude, safety & Lukla flights",
  blocks: [
    {
      heading: "Highest planned point",
      body:
        "The highest planned overnight on this route is approximately 3,880 m on the ridge above Namche, with Khumjung Village near 3,780 m. These figures follow the published itinerary and may be adjusted if your confirmed accommodation differs.",
    },
    {
      heading: "Acclimatisation",
      body:
        "Day 3 is a rest and acclimatisation day in Namche before climbing to Khumjung and the ridge. Walk slowly, drink regularly and report headache, nausea, dizziness or worsening fatigue to your guide promptly.",
    },
    {
      heading: "If symptoms persist",
      body:
        "Do not ascend with serious altitude symptoms. Your guide will advise rest, descent or medical assessment. Emergency helicopter evacuation requires appropriate travel insurance — we do not guarantee rescue timing or weather for aircraft.",
    },
    {
      heading: "Lukla flights & buffer time",
      body:
        "Mountain flights are weather-dependent; delays and cancellations are common. Buffer days on international tickets are strongly recommended. Extra nights and meals from disruption are not included unless stated on your booking.",
    },
    {
      heading: "Insurance",
      body:
        "Comprehensive travel insurance with high-altitude trekking and emergency evacuation cover is mandatory. Check policy altitude limits against this itinerary before you travel.",
    },
  ],
};

export const EVEREST_VIEW_PRICING_NOTE =
  "Per-person pricing depends on group size and season. Request a private quote for current rates — we do not display unverified prices on this page.";

import { DEFAULT_NEPAL, type NepalContent, type NepalPackage } from "@/lib/nepal-defaults";

const CONTACT = "/contact";

const PHOTO_IDS = [
  "ebc-lux",
  "gokyo-lux",
  "abc-lux",
  "mustang-lux",
  "mardi-lux",
  "langtang-lux",
  "threepass-lux",
  "khopra-lux",
];

const PHOTO_COPY: Record<string, { subtitle: string; description: string }> = {
  "ebc-lux": {
    subtitle: "Khumbu light, prayer flags and the icefall",
    description:
      "Photograph the Khumbu trail at luxury pace — dawn on the icefall, prayer-flag ridges and Everest’s south wall.",
  },
  "gokyo-lux": {
    subtitle: "Turquoise lakes and Gokyo Ri sunrise",
    description:
      "Gokyo’s glacial lakes and Cho Oyu at sunrise — one of Nepal’s richest photography lines, with private lodge nights.",
  },
  "abc-lux": {
    subtitle: "Fishtail light in the Annapurna Sanctuary",
    description:
      "Machapuchare and the Sanctuary amphitheatre — rhododendron forest, alpine dawn and private lodges.",
  },
  "mustang-lux": {
    subtitle: "Ochre cliffs, caves and Lo Manthang",
    description:
      "Upper Mustang’s rain-shadow desert — walled Lo Manthang, cave temples and cinematic ochre light.",
  },
  "mardi-lux": {
    subtitle: "Short ridge, huge Annapurna views",
    description:
      "Mardi Himal’s ridge walk for first-light Annapurna frames without a long expedition.",
  },
  "langtang-lux": {
    subtitle: "Close Himalaya, Tamang villages",
    description:
      "Langtang’s pine valleys and village life — a quieter photography trek close to Kathmandu.",
  },
  "threepass-lux": {
    subtitle: "Three high passes, one Khumbu horseshoe",
    description:
      "Kongma La, Cho La and Renjo La — the full Khumbu horseshoe for photographers who want every angle.",
  },
  "khopra-lux": {
    subtitle: "Dhaulagiri panorama from the ridge",
    description:
      "Khopra Ridge lodges facing Dhaulagiri — sunset alpenglow and community-lodge nights.",
  },
};

const treks = DEFAULT_NEPAL.categories.find((cat) => cat.id === "trekking")?.packages ?? [];
const packages: NepalPackage[] = PHOTO_IDS.map((id) => {
  const base = treks.find((pkg) => pkg.id === id);
  const extra = PHOTO_COPY[id];
  if (!base) {
    return {
      id,
      title: "Luxury Photography Trek",
      days: 10,
      subtitle: extra?.subtitle || "Nepal",
      difficulty: "Moderate",
      description: extra?.description || "A private Nepal photography trek.",
      badge: "Photography",
      href: `${CONTACT}?interest=${id}`,
      imageSrc: "/images/nepal/nepal-cover.webp",
      imageAlt: "Nepal Himalaya photography trek",
    };
  }
  return {
    ...base,
    badge: base.badge || "Photography",
    subtitle: extra?.subtitle || base.subtitle,
    description: extra?.description || base.description,
  };
});

export const DEFAULT_PHOTOGRAPHY: NepalContent = {
  visible: true,
  coverSrc: "/images/photography/photo-cover.webp",
  wallpaperSrc: "/images/photography/photo-cover.webp",
  eyebrow: "Nepal",
  headline: "Photography Treks",
  coverLead: "Private lodge treks chosen for Himalayan light — lakes, passes, desert cliffs and dawn peaks.",
  catalogEyebrow: "Private journeys",
  catalogHeadline: "Luxury Nepal Photography Treks",
  catalogLead:
    "Drawn from our Nepal collection — the treks with the strongest frames: Everest, Gokyo, Annapurna, Mustang, Mardi, Langtang, Three Passes and Khopra.",
  tabHint: "",
  ctaLabel: "Plan this journey",
  ctaHref: CONTACT,
  closeTitle: "Craft it privately",
  closeBody:
    "Ambition Holidays designs every photography trek from Thamel, Kathmandu — sister company of Ambition Himalaya Treks and Expeditions. We pace dawn starts, lodge rooms with views and porter support around your shooting days.",
  metaTitle: "Luxury Nepal Photography Treks | Ambition Holidays",
  metaDescription:
    "Luxury Nepal photography treks by Ambition Holidays: Everest, Gokyo Lakes, Annapurna, Upper Mustang, Mardi Himal, Langtang, Three Passes and Khopra Ridge.",
  categories: [
    {
      id: "all",
      label: "Luxury Photography Treks",
      countLabel: `${packages.length} Packages`,
      packages,
    },
  ],
};

import { DEFAULT_NEPAL, type NepalContent } from "@/lib/nepal-defaults";

const CONTACT = "/contact";
const heli =
  DEFAULT_NEPAL.categories.find((cat) => cat.id === "helicopter")?.packages ?? [];

export const DEFAULT_HELICOPTER: NepalContent = {
  visible: true,
  coverSrc: "/images/helicopter/heli-cover.webp",
  wallpaperSrc: "/images/helicopter/heli-cover.webp",
  eyebrow: "Nepal",
  headline: "Helicopter Tours",
  coverLead: "Private Himalayan air days — Everest, Annapurna and exclusive Nepal escapes from Kathmandu.",
  catalogEyebrow: "Private journeys",
  catalogHeadline: "Luxury Nepal Helicopter Tours",
  catalogLead:
    "The same Nepal helicopter collection as our Nepal page — Kala Patthar landings, mountain flights and exclusive Himalayan air days, paced as private luxury.",
  tabHint: "",
  ctaLabel: "Plan this journey",
  ctaHref: CONTACT,
  closeTitle: "Craft it privately",
  closeBody:
    "Ambition Holidays designs every Nepal helicopter day from Thamel, Kathmandu — sister company of Ambition Himalaya Treks and Expeditions. We hold aircraft windows, landing permits and lodge nights around your dates.",
  metaTitle: "Luxury Nepal Helicopter Tours | Ambition Holidays",
  metaDescription:
    "Luxury Nepal helicopter tours by Ambition Holidays: Everest Base Camp heli, mountain flight, Annapurna, Muktinath and exclusive Himalayan air days.",
  categories: [
    {
      id: "all",
      label: "Luxury Helicopter Tours",
      countLabel: `${heli.length} Packages`,
      packages: heli,
    },
  ],
};

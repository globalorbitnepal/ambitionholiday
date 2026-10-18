export type NepalPackage = {
  id: string;
  title: string;
  days: number;
  subtitle: string;
  difficulty: string;
  description: string;
  badge: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
};

export type NepalCategory = {
  id: string;
  label: string;
  countLabel: string;
  packages: NepalPackage[];
};

export type NepalContent = {
  visible: boolean;
  coverSrc: string;
  wallpaperSrc: string;
  eyebrow: string;
  headline: string;
  coverLead: string;
  catalogEyebrow: string;
  catalogHeadline: string;
  catalogLead: string;
  tabHint: string;
  ctaLabel: string;
  ctaHref: string;
  closeTitle: string;
  closeBody: string;
  metaTitle: string;
  metaDescription: string;
  categories: NepalCategory[];
};

const CONTACT = "/contact";

function pkg(
  id: string,
  title: string,
  days: number,
  imageSrc: string,
  imageAlt: string,
  subtitle: string,
  difficulty: string,
  description: string,
  badge: string,
  href?: string,
): NepalPackage {
  return {
    id,
    title,
    days,
    subtitle,
    difficulty,
    description,
    badge,
    href: href || `${CONTACT}?interest=${id}`,
    imageSrc,
    imageAlt,
  };
}

export const DEFAULT_NEPAL: NepalContent = {
  visible: true,
  coverSrc: "/images/nepal/nepal-cover.webp",
  wallpaperSrc: "/images/nepal/nepal-cover.webp",
  eyebrow: "Destination",
  headline: "Nepal",
  coverLead: "Luxury tours and private Himalayan treks, crafted in Kathmandu.",
  catalogEyebrow: "Private journeys",
  catalogHeadline: "Luxury Nepal Packages",
  catalogLead:
    "Thirty handcrafted itineraries across four collections — lodges, heritage suites, wildlife camps and exclusive helicopter days. Choose a category, then tell us the dates.",
  tabHint: "Four collections. Two flagship Everest treks. Eighteen exclusive tours.",
  ctaLabel: "Plan this journey",
  ctaHref: CONTACT,
  closeTitle: "Craft it privately",
  closeBody:
    "Ambition Holidays designs every Nepal journey from Thamel, Kathmandu — sister company of Ambition Himalaya Treks and Expeditions. Tell us the collection you want and we lock lodges, permits and air days.",
  metaTitle: "Luxury Nepal Tours & Treks | Ambition Holidays",
  metaDescription:
    "Luxury Nepal packages by Ambition Holidays: Everest View and Everest Panorama treks, heritage tours, Chitwan and Bardia safaris, and exclusive helicopter days. Sister company of Ambition Himalaya Treks and Expeditions.",
  categories: [
    {
      id: "trekking",
      label: "Luxury Trekking",
      countLabel: "2 Packages",
      packages: [
        pkg(
          "everest-view-lux",
          "Everest View Luxury Trek",
          7,
          "/images/nepal/nepal-trek-ebc.webp",
          "Himalayan panorama above the Khumbu valley",
          "Namche, Khumjung & Syangboche ridge",
          "Moderate",
          "Private seven-day Everest region trek — Sherpa culture and panoramic views without Base Camp.",
          "Most Popular",
          "/everest-view-luxury-trek",
        ),
        pkg(
          "ept-pan",
          "Everest Panorama Luxury Trek – 11 Days",
          11,
          "/images/journeys/j-gokyo.webp",
          "Snow peaks and ridge light in the Khumbu",
          "Private luxury · Everest viewpoints · Tengboche",
          "Moderate",
          "Eleven-day private luxury Khumbu journey through Namche, Khumjung, Everest viewpoints and Tengboche Monastery.",
          "New",
          "/everest-panorama-trek",
        ),
      ],
    },
    {
      id: "cultural",
      label: "Luxury Cultural & Heritage",
      countLabel: "6 Packages",
      packages: [
        pkg(
          "ktm-valley-lux",
          "Kathmandu Valley Luxury Tour",
          5,
          "/images/nepal/nepal-cult-ktm.webp",
          "Kathmandu Durbar Square temples at dusk",
          "Palaces, courtyards and boutique stays",
          "Easy",
          "Palaces, courtyards and boutique stays across Kathmandu’s living heritage.",
          "Most Popular",
        ),
        pkg(
          "heritage-lux",
          "Nepal Heritage Luxury Tour",
          8,
          "/images/nepal/nepal-cult-heritage.webp",
          "Bhaktapur Nyatapola temple square",
          "Kathmandu, Bhaktapur and Patan in depth",
          "Easy",
          "Kathmandu, Bhaktapur and Patan in depth — brick squares and private guiding.",
          "Best Seller",
        ),
        pkg(
          "ktm-pok-chit-lux",
          "Kathmandu, Pokhara & Chitwan Luxury Tour",
          10,
          "/images/nepal/nepal-cult-ktmpokchit.webp",
          "Phewa Lake Pokhara with Annapurna at dusk",
          "Valley temples, lakeside and jungle nights",
          "Easy",
          "Valley temples, Pokhara lakeside and Chitwan jungle nights in one private tour.",
          "Exclusive",
        ),
        pkg(
          "spiritual-lux",
          "Nepal Spiritual & Cultural Luxury Journey",
          9,
          "/images/nepal/nepal-cult-spiritual.webp",
          "Boudhanath stupa at night with prayer flags",
          "Stupas, monasteries and quiet heritage hotels",
          "Easy",
          "Stupas, monasteries and quiet heritage hotels on a slower cultural circuit.",
          "Hidden Gem",
        ),
        pkg(
          "lumbini-lux",
          "Lumbini Heritage Luxury Tour",
          6,
          "/images/nepal/nepal-cult-lumbini.webp",
          "Lumbini peace park and monastic dusk",
          "Buddha’s birthplace with private guiding",
          "Easy",
          "Buddha’s birthplace with private guiding through the monastic peace park.",
          "Exclusive",
        ),
        pkg(
          "pokhara-lux",
          "Pokhara Luxury Escape",
          5,
          "/images/nepal/nepal-cult-pokhara.webp",
          "Luxury lakeside Pokhara with mountain backdrop",
          "Phewa Lake, spa nights and mountain light",
          "Easy",
          "Phewa Lake, spa nights and mountain light — a private lakeside escape.",
          "Best Seller",
        ),
      ],
    },
    {
      id: "wildlife",
      label: "Luxury Wildlife & Nature",
      countLabel: "6 Packages",
      packages: [
        pkg(
          "chitwan-lux",
          "Chitwan Luxury Wildlife Safari",
          4,
          "/images/nepal/nepal-wild-chitwan.webp",
          "One-horned rhinoceros in Chitwan grassland",
          "Rhino grassland and river lodge nights",
          "Easy",
          "Rhino grassland, river canoe and luxury lodge nights in Chitwan National Park.",
          "Most Popular",
        ),
        pkg(
          "bardia-lux",
          "Bardia Luxury Wildlife Escape",
          5,
          "/images/nepal/nepal-wild-bardia.webp",
          "Tiger on a Bardia riverbank at dusk",
          "West Nepal tiger country, exclusive camps",
          "Easy",
          "West Nepal tiger country — exclusive camps on the Karnali floodplain.",
          "Exclusive",
        ),
        pkg(
          "chit-pok-lux",
          "Chitwan & Pokhara Luxury Journey",
          8,
          "/images/nepal/nepal-wild-chitpok.webp",
          "Jungle river and Pokhara lake mountains",
          "Safari dawn, then lakeside recovery",
          "Easy",
          "Safari dawn in Chitwan, then lakeside recovery under the Annapurnas.",
          "Best Seller",
        ),
        pkg(
          "wildlife-nature-lux",
          "Nepal Wildlife & Nature Luxury Tour",
          7,
          "/images/nepal/nepal-wild-nature.webp",
          "Misty Nepal jungle river at dusk",
          "Parks, rivers and quiet nature lodges",
          "Easy",
          "Parks, rivers and quiet nature lodges — a private wildlife and landscape tour.",
          "Hidden Gem",
        ),
        pkg(
          "chit-bard-lux",
          "Chitwan & Bardia Luxury Safari",
          8,
          "/images/nepal/nepal-wild-chitbard.webp",
          "Rhino grassland and tiger jungle safari",
          "Two parks, one private wildlife itinerary",
          "Easy",
          "Two parks, one private safari — rhino grassland and Bardia tiger country.",
          "Exclusive",
        ),
        pkg(
          "himalaya-wild-lux",
          "Nepal Himalayan & Wildlife Luxury Journey",
          11,
          "/images/nepal/nepal-wild-himalaya.webp",
          "Himalayan peaks above Chitwan jungle",
          "Peaks first, then Terai safari nights",
          "Moderate",
          "Peaks first, then Terai safari nights — Himalaya and jungle in one journey.",
          "Best Seller",
        ),
      ],
    },
    {
      id: "helicopter",
      label: "Luxury Helicopter & Exclusive",
      countLabel: "6 Packages",
      packages: [
        pkg(
          "ebc-heli-tour",
          "Everest Base Camp Helicopter Tour – 1 Day",
          1,
          "/images/nepal/nepal-heli-ebc.webp",
          "Helicopter approaching the Everest region on a one-day tour from Kathmandu",
          "Group sharing or private charter · same-day return",
          "Easy",
          "Scenic helicopter day from Kathmandu — group seats or private charter, subject to weather and operator confirmation.",
          "Most Popular",
        ),
        pkg(
          "everest-flight-lux",
          "Everest Mountain Flight Luxury Experience",
          1,
          "/images/nepal/nepal-heli-flight.webp",
          "Everest mountain flight over snow peaks",
          "Sunrise scenic flight from Kathmandu",
          "Easy",
          "A sunrise scenic flight from Kathmandu along the high Himalayan wall.",
          "Best Seller",
        ),
        pkg(
          "anna-heli-lux",
          "Annapurna Helicopter Luxury Tour",
          1,
          "/images/nepal/nepal-heli-anna.webp",
          "Helicopter over the Annapurna range",
          "Fishtail and Sanctuary from the air",
          "Easy",
          "Fishtail and the Annapurna Sanctuary from the air — a private helicopter day.",
          "Exclusive",
        ),
        pkg(
          "mukti-heli-lux",
          "Muktinath Helicopter Luxury Tour",
          2,
          "/images/nepal/nepal-heli-mukti.webp",
          "Muktinath temple and Mustang from the air",
          "Pilgrimage flight into the rain shadow",
          "Easy",
          "A pilgrimage flight into the rain shadow — Muktinath and Mustang from the air.",
          "Hidden Gem",
        ),
        pkg(
          "himal-heli-lux",
          "Everest & Himalayan Helicopter Experience",
          3,
          "/images/nepal/nepal-heli-himal.webp",
          "Luxury helicopter over Himalayan glaciers",
          "Multi-day exclusive air days in the Khumbu",
          "Easy",
          "Multi-day exclusive air days over Khumbu glaciers and high Himalayan ridges.",
          "Exclusive",
        ),
        pkg(
          "ktm-pok-chit-heli-lux",
          "Kathmandu–Pokhara–Chitwan Luxury Escape",
          7,
          "/images/nepal/nepal-heli-escape.webp",
          "Luxury Nepal escape from valley to lake to jungle",
          "Temple city, lake and jungle by private transfer",
          "Easy",
          "Temple city, lake and jungle by private transfer — a seven-day Nepal escape.",
          "Best Seller",
        ),
      ],
    },
  ],
};

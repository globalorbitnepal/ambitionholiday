export type LuxuryMegaCountryId = "nepal" | "bhutan" | "tibet" | "multi";

export type LuxuryMegaPackage = {
  title: string;
  days: string;
  difficulty: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
};

export type LuxuryMegaCountry = {
  id: LuxuryMegaCountryId;
  title: string;
  countLabel: string;
  tagline: string;
  href: string;
  flagSrc: string;
  thumbSrc: string;
  viewAllLabel: string;
  packages: LuxuryMegaPackage[];
};

export const LUXURY_MEGA_COUNTRIES: LuxuryMegaCountry[] = [
  {
    id: "nepal",
    title: "Nepal",
    countLabel: "20+ Packages",
    tagline: "Mountains. Culture. Wildlife. Extraordinary Journeys.",
    href: "/nepal",
    flagSrc: "/images/flags/flag-nepal.webp",
    thumbSrc: "/images/luxury/lux-ebc.webp",
    viewAllLabel: "View All Nepal Packages",
    packages: [
      {
        title: "Everest Base Camp Trek",
        days: "14 Days",
        difficulty: "Moderate",
        href: "/everest-base-camp-trek",
        imageSrc: "/images/luxury/lux-ebc.webp",
        imageAlt: "Snow peaks of Everest",
      },
      {
        title: "Annapurna Base Camp Trek",
        days: "12 Days",
        difficulty: "Moderate",
        href: "/luxury-annapurna-base-camp-trek",
        imageSrc: "/images/luxury/lux-abc.webp",
        imageAlt: "Annapurna mountain range",
      },
      {
        title: "Upper Mustang Tour",
        days: "15 Days",
        difficulty: "Moderate",
        href: "/luxury-upper-mustang-trek",
        imageSrc: "/images/luxury/lux-mustang.webp",
        imageAlt: "Mustang monastery in the hills",
      },
      {
        title: "Kathmandu Valley Tour",
        days: "6 Days",
        difficulty: "Easy",
        href: "/kathmandu-valley-tour",
        imageSrc: "/images/luxury/lux-kathmandu.webp",
        imageAlt: "Kathmandu pagoda temples",
      },
      {
        title: "Chitwan Wildlife Tour",
        days: "4 Days",
        difficulty: "Easy",
        href: "/chitwan-wildlife-tour",
        imageSrc: "/images/luxury/lux-chitwan.webp",
        imageAlt: "Rhinos in Chitwan grassland",
      },
      {
        title: "Helicopter Everest Tour",
        days: "1 Day",
        difficulty: "Easy",
        href: "/luxury-helicopter-treks",
        imageSrc: "/images/luxury/lux-heli.webp",
        imageAlt: "Helicopter flying past Everest",
      },
    ],
  },
  {
    id: "bhutan",
    title: "Bhutan",
    countLabel: "12+ Packages",
    tagline: "Dzongs. Festivals. Himalayan Happiness.",
    href: "/bhutan",
    flagSrc: "/images/flags/flag-bhutan.webp",
    thumbSrc: "/images/luxury/lux-bhutan-taktsang.webp",
    viewAllLabel: "View All Bhutan Packages",
    packages: [
      {
        title: "Paro Taktsang Journey",
        days: "8 Days",
        difficulty: "Moderate",
        href: "/paro-taktsang",
        imageSrc: "/images/luxury/lux-bhutan-taktsang.webp",
        imageAlt: "Tiger's Nest monastery in Bhutan",
      },
      {
        title: "Punakha Dzong Tour",
        days: "7 Days",
        difficulty: "Easy",
        href: "/thimphu-and-punakha",
        imageSrc: "/images/luxury/lux-bhutan-punakha.webp",
        imageAlt: "Punakha Dzong fortress",
      },
      {
        title: "Bhutan Festival Tour",
        days: "10 Days",
        difficulty: "Easy",
        href: "/bhutan-cultural-tour",
        imageSrc: "/images/luxury/lux-bhutan-festival.webp",
        imageAlt: "Bhutanese festival dancers",
      },
      {
        title: "Luxury Bhutan Lodge Stay",
        days: "6 Days",
        difficulty: "Easy",
        href: "/luxury-bhutan-journey",
        imageSrc: "/images/luxury/lux-bhutan-lodge.webp",
        imageAlt: "Luxury lodge in Bhutan",
      },
      {
        title: "Bhutan Himalayan Hike",
        days: "9 Days",
        difficulty: "Moderate",
        href: "/luxury-bhutan-journey",
        imageSrc: "/images/luxury/lux-bhutan-hike.webp",
        imageAlt: "Bhutan forest trail with chortens",
      },
      {
        title: "Thimphu Buddha Tour",
        days: "5 Days",
        difficulty: "Easy",
        href: "/thimphu-and-punakha",
        imageSrc: "/images/luxury/lux-bhutan-buddha.webp",
        imageAlt: "Giant Buddha statue in Thimphu",
      },
    ],
  },
  {
    id: "tibet",
    title: "Tibet",
    countLabel: "10+ Packages",
    tagline: "Palaces. Pilgrimage. Roof of the World.",
    href: "/tibet",
    flagSrc: "/images/flags/flag-tibet.webp",
    thumbSrc: "/images/luxury/lux-tibet-potala.webp",
    viewAllLabel: "View All Tibet Packages",
    packages: [
      {
        title: "Lhasa Potala Tour",
        days: "7 Days",
        difficulty: "Easy",
        href: "/lhasa-cultural-tour",
        imageSrc: "/images/luxury/lux-tibet-potala.webp",
        imageAlt: "Potala Palace at sunrise",
      },
      {
        title: "Mount Kailash Journey",
        days: "15 Days",
        difficulty: "Challenging",
        href: "/mount-kailash",
        imageSrc: "/images/luxury/lux-tibet-kailash.webp",
        imageAlt: "Mount Kailash and prayer flags",
      },
      {
        title: "Jokhang Temple Tour",
        days: "6 Days",
        difficulty: "Easy",
        href: "/lhasa-cultural-tour",
        imageSrc: "/images/luxury/lux-tibet-jokhang.webp",
        imageAlt: "Jokhang Temple golden roofs",
      },
      {
        title: "Everest North Face",
        days: "12 Days",
        difficulty: "Moderate",
        href: "/everest-north-face",
        imageSrc: "/images/luxury/lux-tibet-everest.webp",
        imageAlt: "Everest North Face from Tibet",
      },
      {
        title: "Yamdrok Lake Tour",
        days: "8 Days",
        difficulty: "Easy",
        href: "/tibet-overland-journey",
        imageSrc: "/images/luxury/lux-tibet-yamdrok.webp",
        imageAlt: "Turquoise Yamdrok Lake",
      },
      {
        title: "Tibet Monastery Circuit",
        days: "10 Days",
        difficulty: "Moderate",
        href: "/tibet-overland-journey",
        imageSrc: "/images/luxury/lux-tibet-monks.webp",
        imageAlt: "Tibetan monks and monastery",
      },
    ],
  },
  {
    id: "multi",
    title: "Multi-Country",
    countLabel: "8+ Packages",
    tagline: "One Journey. Many Worlds.",
    href: "/himalayan-multi-countries-tour",
    flagSrc: "/images/flags/flag-multi.webp",
    thumbSrc: "/images/luxury/lux-multi-stupa.webp",
    viewAllLabel: "View All Multi-Country Packages",
    packages: [
      {
        title: "Nepal Bhutan Tibet",
        days: "18 Days",
        difficulty: "Moderate",
        href: "/nepal-bhutan-tibet",
        imageSrc: "/images/luxury/lux-multi-three.webp",
        imageAlt: "Himalayan multi-country landscape",
      },
      {
        title: "Nepal & Bhutan Tour",
        days: "14 Days",
        difficulty: "Easy",
        href: "/nepal-and-bhutan-tour",
        imageSrc: "/images/luxury/lux-multi-nepal-bhutan.webp",
        imageAlt: "Nepal and Bhutan journey",
      },
      {
        title: "Nepal & Tibet Tour",
        days: "16 Days",
        difficulty: "Moderate",
        href: "/nepal-and-tibet-tour",
        imageSrc: "/images/luxury/lux-multi-nepal-tibet.webp",
        imageAlt: "Nepal Tibet overland peaks",
      },
      {
        title: "Bhutan Tibet Journey",
        days: "15 Days",
        difficulty: "Moderate",
        href: "/bhutan-tibet-journey",
        imageSrc: "/images/luxury/lux-multi-bhutan-tibet.webp",
        imageAlt: "Bhutan Tibet mountain pass",
      },
      {
        title: "Himalayan Helicopter Circuit",
        days: "8 Days",
        difficulty: "Easy",
        href: "/luxury-helicopter-treks",
        imageSrc: "/images/luxury/lux-multi-heli.webp",
        imageAlt: "Helicopter over Himalayan peaks",
      },
      {
        title: "Sacred Stupa Circuit",
        days: "12 Days",
        difficulty: "Easy",
        href: "/himalayan-multi-countries-tour",
        imageSrc: "/images/luxury/lux-multi-stupa.webp",
        imageAlt: "Boudhanath stupa and Himalaya",
      },
    ],
  },
];

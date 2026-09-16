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
    flagSrc: "/images/flags/flag-nepal.png",
    thumbSrc: "/images/luxury/lux-ebc.jpg",
    viewAllLabel: "View All Nepal Packages",
    packages: [
      {
        title: "Everest Base Camp Trek",
        days: "14 Days",
        difficulty: "Moderate",
        href: "/luxury-everest-base-camp-trek",
        imageSrc: "/images/luxury/lux-ebc.jpg",
        imageAlt: "Snow peaks of Everest",
      },
      {
        title: "Annapurna Base Camp Trek",
        days: "12 Days",
        difficulty: "Moderate",
        href: "/luxury-annapurna-base-camp-trek",
        imageSrc: "/images/luxury/lux-abc.jpg",
        imageAlt: "Annapurna mountain range",
      },
      {
        title: "Upper Mustang Tour",
        days: "15 Days",
        difficulty: "Moderate",
        href: "/luxury-upper-mustang-trek",
        imageSrc: "/images/luxury/lux-mustang.jpg",
        imageAlt: "Mustang monastery in the hills",
      },
      {
        title: "Kathmandu Valley Tour",
        days: "6 Days",
        difficulty: "Easy",
        href: "/kathmandu-valley-tour",
        imageSrc: "/images/luxury/lux-kathmandu.jpg",
        imageAlt: "Kathmandu pagoda temples",
      },
      {
        title: "Chitwan Wildlife Tour",
        days: "4 Days",
        difficulty: "Easy",
        href: "/chitwan-wildlife-tour",
        imageSrc: "/images/luxury/lux-chitwan.jpg",
        imageAlt: "Rhinos in Chitwan grassland",
      },
      {
        title: "Helicopter Everest Tour",
        days: "1 Day",
        difficulty: "Easy",
        href: "/luxury-helicopter-treks",
        imageSrc: "/images/luxury/lux-heli.jpg",
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
    flagSrc: "/images/flags/flag-bhutan.png",
    thumbSrc: "/images/luxury/lux-bhutan-taktsang.jpg",
    viewAllLabel: "View All Bhutan Packages",
    packages: [
      {
        title: "Paro Taktsang Journey",
        days: "8 Days",
        difficulty: "Moderate",
        href: "/paro-taktsang",
        imageSrc: "/images/luxury/lux-bhutan-taktsang.jpg",
        imageAlt: "Tiger's Nest monastery in Bhutan",
      },
      {
        title: "Punakha Dzong Tour",
        days: "7 Days",
        difficulty: "Easy",
        href: "/thimphu-and-punakha",
        imageSrc: "/images/luxury/lux-bhutan-punakha.jpg",
        imageAlt: "Punakha Dzong fortress",
      },
      {
        title: "Bhutan Festival Tour",
        days: "10 Days",
        difficulty: "Easy",
        href: "/bhutan-cultural-tour",
        imageSrc: "/images/luxury/lux-bhutan-festival.jpg",
        imageAlt: "Bhutanese festival dancers",
      },
      {
        title: "Luxury Bhutan Lodge Stay",
        days: "6 Days",
        difficulty: "Easy",
        href: "/luxury-bhutan-journey",
        imageSrc: "/images/luxury/lux-bhutan-lodge.jpg",
        imageAlt: "Luxury lodge in Bhutan",
      },
      {
        title: "Bhutan Himalayan Hike",
        days: "9 Days",
        difficulty: "Moderate",
        href: "/luxury-bhutan-journey",
        imageSrc: "/images/luxury/lux-bhutan-hike.jpg",
        imageAlt: "Bhutan forest trail with chortens",
      },
      {
        title: "Thimphu Buddha Tour",
        days: "5 Days",
        difficulty: "Easy",
        href: "/thimphu-and-punakha",
        imageSrc: "/images/luxury/lux-bhutan-buddha.jpg",
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
    flagSrc: "/images/flags/flag-tibet.png",
    thumbSrc: "/images/luxury/lux-tibet-potala.jpg",
    viewAllLabel: "View All Tibet Packages",
    packages: [
      {
        title: "Lhasa Potala Tour",
        days: "7 Days",
        difficulty: "Easy",
        href: "/lhasa-cultural-tour",
        imageSrc: "/images/luxury/lux-tibet-potala.jpg",
        imageAlt: "Potala Palace at sunrise",
      },
      {
        title: "Mount Kailash Journey",
        days: "15 Days",
        difficulty: "Challenging",
        href: "/mount-kailash",
        imageSrc: "/images/luxury/lux-tibet-kailash.jpg",
        imageAlt: "Mount Kailash and prayer flags",
      },
      {
        title: "Jokhang Temple Tour",
        days: "6 Days",
        difficulty: "Easy",
        href: "/lhasa-cultural-tour",
        imageSrc: "/images/luxury/lux-tibet-jokhang.jpg",
        imageAlt: "Jokhang Temple golden roofs",
      },
      {
        title: "Everest North Face",
        days: "12 Days",
        difficulty: "Moderate",
        href: "/everest-north-face",
        imageSrc: "/images/luxury/lux-tibet-everest.jpg",
        imageAlt: "Everest North Face from Tibet",
      },
      {
        title: "Yamdrok Lake Tour",
        days: "8 Days",
        difficulty: "Easy",
        href: "/tibet-overland-journey",
        imageSrc: "/images/luxury/lux-tibet-yamdrok.jpg",
        imageAlt: "Turquoise Yamdrok Lake",
      },
      {
        title: "Tibet Monastery Circuit",
        days: "10 Days",
        difficulty: "Moderate",
        href: "/tibet-overland-journey",
        imageSrc: "/images/luxury/lux-tibet-monks.jpg",
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
    flagSrc: "/images/flags/flag-multi.png",
    thumbSrc: "/images/luxury/lux-multi-stupa.jpg",
    viewAllLabel: "View All Multi-Country Packages",
    packages: [
      {
        title: "Nepal Bhutan Tibet",
        days: "18 Days",
        difficulty: "Moderate",
        href: "/nepal-bhutan-tibet",
        imageSrc: "/images/luxury/lux-multi-three.jpg",
        imageAlt: "Himalayan multi-country landscape",
      },
      {
        title: "Nepal & Bhutan Tour",
        days: "14 Days",
        difficulty: "Easy",
        href: "/nepal-and-bhutan-tour",
        imageSrc: "/images/luxury/lux-multi-nepal-bhutan.jpg",
        imageAlt: "Nepal and Bhutan journey",
      },
      {
        title: "Nepal & Tibet Tour",
        days: "16 Days",
        difficulty: "Moderate",
        href: "/nepal-and-tibet-tour",
        imageSrc: "/images/luxury/lux-multi-nepal-tibet.jpg",
        imageAlt: "Nepal Tibet overland peaks",
      },
      {
        title: "Bhutan Tibet Journey",
        days: "15 Days",
        difficulty: "Moderate",
        href: "/bhutan-tibet-journey",
        imageSrc: "/images/luxury/lux-multi-bhutan-tibet.jpg",
        imageAlt: "Bhutan Tibet mountain pass",
      },
      {
        title: "Himalayan Helicopter Circuit",
        days: "8 Days",
        difficulty: "Easy",
        href: "/luxury-helicopter-treks",
        imageSrc: "/images/luxury/lux-multi-heli.jpg",
        imageAlt: "Helicopter over Himalayan peaks",
      },
      {
        title: "Sacred Stupa Circuit",
        days: "12 Days",
        difficulty: "Easy",
        href: "/himalayan-multi-countries-tour",
        imageSrc: "/images/luxury/lux-multi-stupa.jpg",
        imageAlt: "Boudhanath stupa and Himalaya",
      },
    ],
  },
];

"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import MediaImage from "@/components/MediaImage";
import DuskAtmosphere from "@/components/DuskAtmosphere";
import SiteFooter from "@/components/SiteFooter";
import WhyAmbitionSection from "@/components/WhyAmbitionSection";
import { AltitudeProfileChart, MonthlyWeatherChart, TrekRouteMap, UploadedChart } from "@/components/TrekCharts";
import { EverestViewAltitudeProfile } from "@/components/everest-view/EverestViewAltitudeProfile";
import { EverestViewMonthlyWeather } from "@/components/everest-view/EverestViewMonthlyWeather";
import { ABC_ALTITUDE_STOPS } from "@/lib/abc-charts";
import { LANGTANG_ALTITUDE_STOPS } from "@/lib/langtang-charts";
import { MUSTANG_ALTITUDE_STOPS } from "@/lib/mustang-charts";
import { EVEREST_VIEW_ALTITUDE_STOPS } from "@/lib/everest-view-charts";
import PackageActions from "@/components/PackageActions";
import type { TrekPackage, TrekVideo } from "@/lib/trip-packages";
import {
  isAbcPackage,
  isEbcPackage,
  isEbcHelicopterTourPackage,
  isAmaDablamPackage,
  isEverestPanoramaPackage,
  isEverestViewPackage,
  isAnnapurnaPanoramaLuxuryPackage,
  isGhorepaniPoonhillLuxuryPackage,
  isKathmanduChitwanPoonHillLuxuryTourPackage,
  isKathmanduHeritageLuxuryTourPackage,
  isPoonHillLuxuryPackage,
  isLangtangPackage,
  isMustangPackage,
  packageHeadings,
  TREK_DAY_DISTANCE,
} from "@/lib/trip-packages";
import { AMA_DABLAM_ALTITUDE_STOPS } from "@/lib/ama-dablam-charts";
import { POON_HILL_ALTITUDE_STOPS, POON_HILL_MONTHLY_WEATHER } from "@/lib/poon-hill-charts";
import {
  GHOREPANI_POONHILL_ALTITUDE_STOPS,
  GHOREPANI_POONHILL_MONTHLY_WEATHER,
} from "@/lib/ghorepani-poonhill-charts";
import {
  ANNAPURNA_PANORAMA_ALTITUDE_STOPS,
  ANNAPURNA_PANORAMA_MONTHLY_WEATHER,
} from "@/lib/annapurna-panorama-charts";
import {
  KATHMANDU_CHITWAN_POON_HILL_ALTITUDE_STOPS,
  KATHMANDU_CHITWAN_POON_HILL_MONTHLY_WEATHER,
} from "@/lib/kathmandu-chitwan-poon-hill-charts";
import { EVEREST_PANORAMA_ALTITUDE_STOPS } from "@/lib/everest-panorama-charts";
import TrekVideoLightbox from "@/components/TrekVideoLightbox";
import TripPhotoLightbox from "@/components/TripPhotoLightbox";
import { mediaSrc } from "@/lib/media-src";
import { ItineraryMetaIcon } from "@/components/itinerary-meta-icons";
import { normalizeVideoSrc, youtubeId } from "@/lib/video-embed";
import { buildHelicopterTourSectionToc } from "@/lib/helicopter-tour-layout";
import {
  buildPackageSectionToc,
  isPremiumKhumbuTrekPackage,
  isPremiumNepalPackagePage,
  useScrollableSectionNav,
} from "@/lib/premium-khumbu-trek-layout";

const STANDARD_TOC = [
  { id: "overview", label: "Overview" },
  { id: "book", label: "Availability" },
  { id: "highlights", label: "Highlights" },
  { id: "why-us", label: "Why us" },
  { id: "video", label: "Video" },
  { id: "vreviews", label: "Video reviews" },
  { id: "trip-info", label: "Trip info" },
  { id: "itinerary", label: "Itinerary" },
  { id: "trip-map", label: "Trip Map" },
  { id: "altitude", label: "Altitude" },
  { id: "weather", label: "Weather" },
  { id: "includes", label: "Includes" },
  { id: "trip-gallery", label: "Gallery" },
  { id: "packing", label: "Packing" },
  { id: "flights", label: "Flights" },
  { id: "reviews", label: "Reviews" },
  { id: "faqs", label: "FAQs" },
];

function teaserOf(body: string) {
  const first = body.split(/\n{2,}/)[0] || body;
  return first.length > 230 ? `${first.slice(0, 220).trim()}…` : first;
}

function scrollToId(id: string) {
  const targetId =
    id === "book" && typeof window !== "undefined" && window.matchMedia("(max-width: 1099px)").matches
      ? "book-mobile"
      : id;
  const el = document.getElementById(targetId);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

/** Keep altitude units on the same line as the number (e.g. 5,000 m). */
function preserveListPhrasing(text: string) {
  return text.replace(
    /(\d[\d,]*)\s+(m|km|ft|metres?|meters?)\b/gi,
    (_, num, unit) => `${num}\u00a0${unit}`,
  );
}

export default function TripPackagePage({ pkg }: { pkg: TrekPackage }) {
  const [openDay, setOpenDay] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);
  const [showGroups, setShowGroups] = useState(true);
  const [altUnit, setAltUnit] = useState<"m" | "ft">("m");
  const [lightIndex, setLightIndex] = useState<number | null>(null);
  const [activeToc, setActiveToc] = useState("overview");
  const [tocFloating, setTocFloating] = useState(false);
  const [activeVideo, setActiveVideo] = useState<TrekVideo | null>(null);
  const heliTour = isEbcHelicopterTourPackage(pkg);
  const heritageTour = isKathmanduHeritageLuxuryTourPackage(pkg);
  const heliOptions = pkg.helicopterOptions?.length ? pkg.helicopterOptions : [];
  const [heliOptionId, setHeliOptionId] = useState(heliOptions[0]?.id || "sharing");
  const selectedHeliOption = heliOptions.find((opt) => opt.id === heliOptionId) || heliOptions[0];
  const enquire = `/contact?interest=${encodeURIComponent(pkg.catalogId || pkg.id)}${
    heliTour && selectedHeliOption ? `&tourOption=${encodeURIComponent(selectedHeliOption.id)}` : ""
  }`;
  const whatsAppHref = `https://wa.me/9779851148898?text=${encodeURIComponent(
    `Hello Ambition Holidays — I'm interested in ${pkg.title}.`,
  )}`;
  const gallery = useMemo(() => {
    const raw = pkg.gallery?.length ? pkg.gallery : [pkg.heroSrc];
    const unique = [pkg.heroSrc, ...raw.filter((src) => src !== pkg.heroSrc)];
    return unique.filter(Boolean);
  }, [pkg.gallery, pkg.heroSrc]);
  const heroStrip = useMemo(() => {
    const strip = gallery.slice(0, 3);
    while (strip.length < 3) {
      strip.push(gallery[strip.length % gallery.length] || pkg.heroSrc);
    }
    return strip;
  }, [gallery, pkg.heroSrc]);
  const groups = pkg.groupPrices?.length
    ? pkg.groupPrices
    : [{ id: "p1", label: "Per person", priceUsd: pkg.priceUsd }];
  const heads = packageHeadings(pkg);
  const highlightHeading = heliTour
    ? "Experience highlights"
    : /\d+\s*Days?/i.test(pkg.title)
      ? `Highlights of ${pkg.title}`
      : `Highlights of ${pkg.title} – ${pkg.days} Days`;
  const hotelEverestViewNotice =
    isEverestViewPackage(pkg) && pkg.hotelEverestViewStatus
      ? pkg.hotelEverestViewStatus === "confirmed"
        ? pkg.hotelEverestViewPublicNote ||
          "Your Day 4 ridge-area lodge night is confirmed on your booking documents."
        : pkg.hotelEverestViewStatus === "unavailable"
          ? pkg.hotelEverestViewPublicNote ||
            "The planned ridge-area lodge is not available for this departure. Your coordinator will confirm any alternative before you travel."
          : pkg.hotelEverestViewPublicNote ||
            "The Syangboche ridge-area overnight is subject to confirmed lodge availability and will be stated on your booking confirmation."
      : "";
  const langtangCharts = isLangtangPackage(pkg);
  const mustangCharts = isMustangPackage(pkg);
  const abcCharts = isAbcPackage(pkg);
  const everestViewCharts = isEverestViewPackage(pkg);
  const everestPanoramaCharts = isEverestPanoramaPackage(pkg);
  const amaDablamCharts = isAmaDablamPackage(pkg);
  const poonHillCharts = isPoonHillLuxuryPackage(pkg);
  const ghorepaniPoonhillCharts = isGhorepaniPoonhillLuxuryPackage(pkg);
  const annapurnaPanoramaCharts = isAnnapurnaPanoramaLuxuryPackage(pkg);
  const kcpTourCharts = isKathmanduChitwanPoonHillLuxuryTourPackage(pkg);
  const annapurnaPoonCharts = poonHillCharts || ghorepaniPoonhillCharts || annapurnaPanoramaCharts || kcpTourCharts;
  const khumbuSchematicCharts =
    everestPanoramaCharts ||
    amaDablamCharts ||
    poonHillCharts ||
    ghorepaniPoonhillCharts ||
    annapurnaPanoramaCharts ||
    kcpTourCharts;
  const premiumKhumbuTrek = isPremiumKhumbuTrekPackage(pkg);
  const premiumNepalPage = isPremiumNepalPackagePage(pkg);
  const premiumNav = Boolean(pkg.journeyStages?.length);
  const scrollableSectionNav = useScrollableSectionNav(pkg, premiumNav);
  const builtInCharts =
    isEbcPackage(pkg) ||
    abcCharts ||
    mustangCharts ||
    langtangCharts ||
    everestViewCharts ||
    khumbuSchematicCharts ||
    annapurnaPoonCharts;
  const chartStops = everestPanoramaCharts
    ? EVEREST_PANORAMA_ALTITUDE_STOPS
    : amaDablamCharts
      ? AMA_DABLAM_ALTITUDE_STOPS
    : kcpTourCharts
      ? KATHMANDU_CHITWAN_POON_HILL_ALTITUDE_STOPS
    : annapurnaPanoramaCharts
      ? ANNAPURNA_PANORAMA_ALTITUDE_STOPS
    : ghorepaniPoonhillCharts
      ? GHOREPANI_POONHILL_ALTITUDE_STOPS
    : poonHillCharts
      ? POON_HILL_ALTITUDE_STOPS
    : everestViewCharts
    ? EVEREST_VIEW_ALTITUDE_STOPS
    : langtangCharts
      ? LANGTANG_ALTITUDE_STOPS
      : mustangCharts
        ? MUSTANG_ALTITUDE_STOPS
        : abcCharts
          ? ABC_ALTITUDE_STOPS
          : undefined;
  const chartMaxM = annapurnaPoonCharts
    ? 3400
    : amaDablamCharts
    ? 4800
    : everestPanoramaCharts
    ? 4200
    : everestViewCharts
    ? 4200
    : langtangCharts
      ? 5000
      : mustangCharts
        ? 4000
        : abcCharts
          ? 4300
          : undefined;
  const chartMinM = kcpTourCharts
    ? 0
    : annapurnaPoonCharts
    ? 600
    : khumbuSchematicCharts
    ? 1200
    : everestViewCharts
    ? 1200
    : langtangCharts
      ? 1200
      : mustangCharts
        ? 700
        : abcCharts
          ? 700
          : undefined;
  const chartFile = kcpTourCharts
    ? "kathmandu-chitwan-poon-hill-luxury-tour-altitude-profile"
    : annapurnaPanoramaCharts
    ? "annapurna-panorama-luxury-trek-altitude-profile"
    : ghorepaniPoonhillCharts
    ? "ghorepani-poonhill-luxury-trek-altitude-profile"
    : poonHillCharts
    ? "poon-hill-luxury-trek-altitude-profile"
    : amaDablamCharts
    ? "ama-dablam-base-camp-luxury-trek-altitude-profile"
    : everestPanoramaCharts
    ? "everest-panorama-trek-altitude-profile"
    : everestViewCharts
    ? "everest-view-luxury-trek-altitude-profile"
    : langtangCharts
      ? "langtang-valley-luxury-trek-altitude-profile"
      : mustangCharts
        ? "mustang-altitude-profile"
        : abcCharts
          ? "abc-altitude-profile"
          : "ebc-altitude-profile";
  const mapVariant = kcpTourCharts
    ? "kathmandu-chitwan-poon-hill"
    : annapurnaPanoramaCharts
    ? "annapurna-panorama"
    : ghorepaniPoonhillCharts
    ? "ghorepani-poonhill"
    : poonHillCharts
    ? "poon-hill"
    : amaDablamCharts
    ? "ama-dablam"
    : everestPanoramaCharts
    ? "everest-panorama"
    : everestViewCharts
    ? "everest-view"
    : langtangCharts
      ? "langtang"
      : mustangCharts
        ? "mustang"
        : abcCharts
          ? "abc"
          : "ebc";
  const packingGroups = pkg.packingGroups?.length
    ? pkg.packingGroups
    : pkg.packingItems?.length
      ? [{ id: "all", title: "Kit", items: pkg.packingItems }]
      : [];
  const show: Record<string, boolean> = {
    overview: true,
    book: true,
    highlights: Boolean(pkg.highlights?.length),
    "why-us": Boolean(pkg.whyItems?.length),
    video: !heliTour && Boolean(pkg.watchVideo?.imageSrc || pkg.watchVideo?.videoSrc),
    vreviews: !heliTour && Boolean(pkg.videoReviews?.length),
    "trip-info": Boolean(pkg.tripInfo?.length || pkg.luxuryExperience?.pillars?.length),
    "the-journey": !heliTour && Boolean(pkg.journeyStages?.length),
    about: !heliTour && Boolean(pkg.aboutSections?.length || pkg.aboutLead?.trim()),
    "tour-options": heliTour && Boolean(heliOptions.length),
    itinerary: Boolean(pkg.itinerary?.length),
    "trip-map": !heliTour && Boolean(pkg.routeMapSrc || builtInCharts),
    "flight-route": heliTour && Boolean(pkg.mapBody?.trim()),
    altitude: !heliTour && Boolean(pkg.altitudeChartM || pkg.altitudeChartFt || pkg.altitudeBody || builtInCharts),
    "landing-options": heliTour && Boolean(pkg.khumbuBody?.trim()),
    weather: Boolean(pkg.weatherMonthlySrc || pkg.weatherBody || (heliTour && pkg.weatherBody)),
    includes: Boolean(pkg.inclusions?.length || pkg.exclusions?.length),
    "trip-gallery": gallery.length > 0,
    packing: !heliTour && packingGroups.some((group) => group.items.length),
    flights: !heliTour && Boolean(pkg.flightBody || pkg.bufferBody || pkg.heliBody || pkg.beforeItems?.length),
    safety: heliTour && Boolean(pkg.heliBody?.trim() || pkg.beforeItems?.length),
    "booking-policy": heliTour && Boolean(pkg.bufferBody?.trim()),
    reviews: Boolean(pkg.reviews?.length),
    faqs: Boolean(pkg.faqs?.length),
  };
  const toc = heliTour
    ? buildHelicopterTourSectionToc(show)
    : buildPackageSectionToc(pkg, show, premiumNav, STANDARD_TOC);
  const useReferenceOverviewBlock = premiumKhumbuTrek || heliTour || heritageTour || !premiumNav;
  const tocKey = toc.map((item) => item.id).join("|");
  const fromPrice = groups.filter((row) => row.priceUsd > 0).reduce((min, row) => Math.min(min, row.priceUsd), Infinity);
  const hasFromPrice = Number.isFinite(fromPrice);
  const hasPrice = hasFromPrice || pkg.priceUsd > 0;

  const facts = [
    { icon: "globe", label: "Country", value: pkg.countryLabel || "Nepal" },
    { icon: "cal", label: "Duration", value: pkg.duration },
    { icon: "gauge", label: "Difficulty", value: pkg.difficulty },
    { icon: "hike", label: "Activity", value: pkg.activityLabel || "Trekking / Hiking" },
    {
      icon: "peak",
      label: heliTour || heritageTour ? "Region" : "Max. altitude",
      value: pkg.maxAltitude,
    },
    { icon: "cloud", label: "Best season", value: pkg.bestSeason },
    { icon: "bed", label: "Accommodation", value: pkg.accommodationLabel || "Lodge & hotel" },
    { icon: "meal", label: "Meals", value: pkg.mealsLabel || "Included on trek" },
    { icon: "pin", label: "Start / End", value: pkg.startEndLabel || pkg.startLabel },
  ];

  useEffect(() => {
    const ids = tocKey.split("|");
    const nodes = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (!nodes.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActiveToc(visible.target.id);
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: [0.15, 0.4] },
    );
    nodes.forEach((n) => obs.observe(n));
    return () => obs.disconnect();
  }, [tocKey]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1100px)");
    const onScroll = () => {
      if (!mq.matches) {
        setTocFloating(false);
        return;
      }
      setTocFloating(window.scrollY > 320);
    };
    onScroll();
    mq.addEventListener("change", onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      mq.removeEventListener("change", onScroll);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  function openVideo(video: TrekVideo) {
    const videoSrc = normalizeVideoSrc(video.videoSrc || "");
    if (!videoSrc) return;
    setActiveVideo({ ...video, videoSrc });
  }

  function galleryAlt(index: number) {
    return pkg.galleryAlts?.[index] || (index === 0 ? pkg.heroAlt : `${pkg.title} ${index + 1}`);
  }

  const heliCharterSelected = heliTour && heliOptionId === "charter";
  const heliUseGroupTable = heliTour && !heliCharterSelected && groups.some((row) => row.priceUsd > 0 || row.label);

  const bookingPanel = (
    <div className="lux-price">
      <PackageActions pkg={pkg} />
      {pkg.pricePanelImageSrc ? (
        <div className="lux-price-visual">
          <MediaImage
            src={pkg.pricePanelImageSrc}
            alt={pkg.pricePanelImageAlt || `${pkg.title} pricing`}
            sizes="(min-width: 1100px) 320px, 92vw"
            className="lux-price-panel-img lux-photo"
            objectFit="contain"
            objectPosition="center center"
            priority={false}
          />
        </div>
      ) : null}
      {heliTour && heliOptions.length ? (
        <div className="lux-heli-options" role="group" aria-label="Tour option">
          {heliOptions.map((opt) => (
            <button
              key={opt.id}
              type="button"
              className={heliOptionId === opt.id ? "is-on" : undefined}
              onClick={() => setHeliOptionId(opt.id)}
            >
              {opt.id === "charter" ? "Private charter" : "Group sharing"}
            </button>
          ))}
        </div>
      ) : null}
      <p
        className={`lux-price-main${
          heliCharterSelected && selectedHeliOption && !(selectedHeliOption.priceUsd > 0)
            ? " lux-price-main--quote"
            : ""
        }`}
      >
        {heliCharterSelected && selectedHeliOption ? (
          selectedHeliOption.priceUsd > 0 ? (
            <>
              USD {selectedHeliOption.priceUsd.toLocaleString()}
              <span> / charter</span>
            </>
          ) : (
            selectedHeliOption.priceLabel || "Charter on request"
          )
        ) : heliTour && hasFromPrice ? (
          <>
            From USD {fromPrice.toLocaleString()} <span>/ person</span>
          </>
        ) : hasFromPrice ? (
          <>
            From USD {fromPrice.toLocaleString()} <span>/ person</span>
          </>
        ) : hasPrice ? (
          <>
            USD {pkg.priceUsd.toLocaleString()} <span>/ person</span>
          </>
        ) : (
          "Request Private Quote"
        )}
      </p>
      {(!heliTour || heliUseGroupTable) && groups.some((row) => row.priceUsd > 0) ? (
        <button type="button" className="lux-price-toggle" onClick={() => setShowGroups((v) => !v)}>
          See group booking discount{" "}
          {showGroups ? "▴" : "▾"}
        </button>
      ) : null}
      {(!heliTour || heliUseGroupTable) && showGroups && groups.length ? (
        <table className="lux-price-table">
          <thead>
            <tr>
              <th>No. of people</th>
              <th>Price per person (USD)</th>
            </tr>
          </thead>
          <tbody>
            {groups.map((row) => (
              <tr key={row.id}>
                <td>{row.label}</td>
                <td>
                  {row.priceUsd > 0
                    ? `USD ${row.priceUsd.toLocaleString()}`
                    : heliTour
                      ? "Request a quote"
                      : "On request"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}
      {pkg.pricingDisclaimer ? <p className="lux-price-foot">{pkg.pricingDisclaimer}</p> : null}
      <Link href={enquire} className="lux-btn lux-btn-solid">
        Book now
      </Link>
      <Link href={`${enquire}&intent=availability`} className="lux-btn lux-btn-gold">
        Check availability
      </Link>
      <Link href={enquire} className="lux-btn lux-btn-ghost">
        Inquire now
      </Link>
      <a className="lux-wa" href={whatsAppHref} target="_blank" rel="noreferrer">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12.04 2C6.58 2 2.15 6.4 2.15 11.83c0 1.74.46 3.44 1.34 4.95L2 22l5.37-1.4a10 10 0 0 0 4.67 1.18h.01c5.46 0 9.89-4.4 9.89-9.84C21.94 6.4 17.5 2 12.04 2Zm5.48 14.05c-.23.64-1.34 1.18-1.86 1.26-.48.07-1.08.1-1.74-.11-.4-.12-.91-.3-1.57-.59-2.76-1.19-4.55-3.96-4.69-4.15-.14-.18-1.15-1.52-1.15-2.9 0-1.37.7-2.05.95-2.33.23-.26.62-.37.98-.37.12 0 .23 0 .33.01.29.01.44.03.63.49.23.55.78 1.9.85 2.04.07.14.12.3.02.49-.09.18-.14.3-.28.46-.14.16-.29.35-.41.47-.14.14-.28.29-.12.56.16.26.7 1.15 1.5 1.86 1.03.92 1.9 1.21 2.18 1.35.26.13.42.11.58-.07.16-.18.7-.8.88-1.08.18-.26.37-.22.62-.13.26.08 1.64.77 1.92.91.28.14.46.21.53.33.07.12.07.7-.16 1.34Z" />
        </svg>
        WhatsApp +977 9851148898
      </a>
    </div>
  );

  return (
    <>
    <div className="lux-root lux-root--sky home-light min-w-0 overflow-x-clip">
      <div className="lux-dusk-stage" aria-hidden="true">
        <div className="lux-dusk-art" />
      </div>
      <div className="lux-sky-content relative z-[1]">
      <div className="lux-top lux-top--sky">
        <Header surface="dark" />
        <section className="lux-gallery lux-gallery--trip" aria-label="Journey photos">
          <div className="lux-gallery-row">
            {heroStrip.map((src, index) => (
              <figure
                key={`${src}-${index}`}
                className="lux-gallery-pane"
                onClick={() => setLightIndex(index)}
              >
                <span className="lux-gallery-media">
                  <MediaImage
                    src={src}
                    alt={galleryAlt(index)}
                    sizes={index === 0 ? "44vw" : "22vw"}
                    priority
                    className="lux-gallery-photo lux-photo"
                    objectFit="cover"
                    objectPosition={index === 0 ? "center 62%" : "center 55%"}
                    quality={index === 0 ? 86 : 78}
                  />
                </span>
                {index === 0 ? (
                  <div className="lux-mosaic-actions">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setLightIndex(0);
                      }}
                    >
                      View all {gallery.length} photos
                    </button>
                  </div>
                ) : null}
              </figure>
            ))}
          </div>
        </section>
      </div>

      <div className="lux-wrap">
        <section className="lux-spec" aria-label="Trip facts">
          {facts.map((fact) => (
            <div key={fact.label} className="lux-spec-item">
              <FactIcon name={fact.icon} />
              <div>
                <span>{fact.label}</span>
                <strong>{fact.value}</strong>
              </div>
            </div>
          ))}
        </section>

        <nav
          className={`lux-toc${scrollableSectionNav ? " lux-toc--premium" : ""}${tocFloating ? " is-floating" : ""}`}
          aria-label="On this page"
        >
          {toc.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={activeToc === item.id ? "is-on" : undefined}
              onClick={(e) => {
                e.preventDefault();
                setActiveToc(item.id);
                scrollToId(item.id);
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="lux-layout">
          <div className="lux-main">
            <header id="overview" className="lux-card lux-title-card">
              {pkg.badge ? <p className="lux-kicker">{pkg.badge}</p> : null}
              <h1>{pkg.title}</h1>
              <p className="lux-lead">{pkg.subtitle}</p>
              {premiumNepalPage && (pkg.heroCtaPrimary || pkg.heroCtaSecondary) ? (
                <div className="lux-hero-ctas">
                  {pkg.heroCtaPrimary ? (
                    <Link href={enquire} className="lux-btn lux-btn-solid">
                      {pkg.heroCtaPrimary}
                    </Link>
                  ) : null}
                  {pkg.heroCtaSecondary ? (
                    <button
                      type="button"
                      className="lux-btn lux-btn-gold"
                      onClick={() => {
                        setActiveToc("itinerary");
                        scrollToId("itinerary");
                      }}
                    >
                      {pkg.heroCtaSecondary}
                    </button>
                  ) : null}
                </div>
              ) : premiumNav && !premiumNepalPage ? (
                <div className="lux-hero-ctas">
                  <Link href={enquire} className="lux-btn lux-btn-solid">
                    Plan Your Trek
                  </Link>
                  <button
                    type="button"
                    className="lux-btn lux-btn-gold"
                    onClick={() => {
                      setActiveToc("the-journey");
                      scrollToId("the-journey");
                    }}
                  >
                    Explore the Journey
                  </button>
                </div>
              ) : null}
              <div className="lux-rates">
                <a className="lux-rate" href={pkg.tripadvisorHref || "#"} target="_blank" rel="noreferrer">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={pkg.tripadvisorLogoSrc || "/images/reviews/tripadvisor-owl.png"} alt="" />
                  <span>
                    <strong>{pkg.tripadvisorLabel || "Tripadvisor"}</strong>
                    {pkg.tripadvisorScore?.trim() ? (
                      <span className="lux-owls" aria-hidden="true">
                        {Array.from({ length: 5 }, (_, i) => (
                          <i key={i} className={`lux-owl${i < 5 ? " is-on" : ""}`} />
                        ))}
                      </span>
                    ) : null}
                    <em>{pkg.tripadvisorCount || "View reviews"}</em>
                  </span>
                </a>
                <a className="lux-rate" href={pkg.googleHref || "#"} target="_blank" rel="noreferrer">
                  <GoogleG />
                  <span>
                    <strong>{pkg.googleLabel || "Google"}</strong>
                    <em>
                      {[pkg.googleScore, pkg.googleCount].filter((part) => part?.trim()).join(" · ") ||
                        "View on Google"}
                    </em>
                  </span>
                </a>
                {pkg.watchVideo?.imageSrc || pkg.watchVideo?.videoSrc ? (
                  <button type="button" className="lux-watch-btn" onClick={() => openVideo(pkg.watchVideo)}>
                    Watch Video
                  </button>
                ) : null}
              </div>
            </header>

            <article className="lux-card">
              <p className="lux-kicker">{useReferenceOverviewBlock ? "The journey" : "Overview"}</p>
              <h2>{useReferenceOverviewBlock ? heads.about : "Overview"}</h2>
              {pkg.overview.split(/\n{2,}/).map((para) => (
                <p key={para.slice(0, 48)}>{para}</p>
              ))}
              {hotelEverestViewNotice ? <p className="lux-note">{hotelEverestViewNotice}</p> : null}
            </article>

            <aside id="book-mobile" className="lux-aside lux-aside--inline" aria-label="Book this trip">
              {bookingPanel}
            </aside>

            {show["tour-options"] && heliOptions.length ? (
              <article id="tour-options" className="lux-card">
                <p className="lux-kicker">How to travel</p>
                <h2>Tour options</h2>
                <p className="lux-lead" style={{ marginBottom: "1rem" }}>
                  Choose group sharing (per seat) or a private charter. Pricing and landing details are confirmed before
                  you pay.
                </p>
                <div className="lux-heli-tour-grid">
                  {heliOptions.map((opt) => (
                    <div key={opt.id} id={`tour-option-${opt.id}`} className="lux-heli-tour-card">
                      <h3>{opt.label}</h3>
                      <p>{opt.summary}</p>
                      <p className="lux-meta-price">
                        <strong>
                          {opt.id === "charter"
                            ? opt.priceUsd > 0
                              ? `USD ${opt.priceUsd.toLocaleString()} / charter`
                              : opt.priceLabel || "Charter on request"
                            : hasFromPrice
                              ? `From USD ${fromPrice.toLocaleString()} / person`
                              : opt.priceLabel || "Price on request"}
                        </strong>
                      </p>
                      <Link
                        href={`${enquire}&tourOption=${encodeURIComponent(opt.id)}`}
                        className="lux-btn lux-btn-gold lux-heli-tour-cta"
                      >
                        {opt.id === "charter" ? "Request charter quote" : "Request seat price"}
                      </Link>
                    </div>
                  ))}
                </div>
              </article>
            ) : null}

            {show.highlights ? (
              <article id="highlights" className="lux-card">
                {heliTour ? <p className="lux-kicker">Why this tour</p> : null}
                <h2>{highlightHeading}</h2>
                <span className="lux-hi-rule" aria-hidden="true" />
                <ul className="lux-checks">
                  {pkg.highlights.map((item) => (
                    <li key={item}>
                      <CheckMark />
                      <span>{preserveListPhrasing(item)}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ) : null}

            {pkg.whyItems?.length ? (
              <article id="why-us" className="lux-card">
                <p className="lux-kicker">{heliTour ? "Why us" : "Why walk with us"}</p>
                <h2>{heads.why}</h2>
                <div className="lux-why">
                  {pkg.whyItems.map((item) => (
                    <div key={item.title}>
                      <h3>{item.title}</h3>
                      <p>{item.body}</p>
                    </div>
                  ))}
                </div>
              </article>
            ) : null}

            {!pkg.tripInfo?.length && (pkg.suitableBody || pkg.trainingBody || pkg.khumbuBody) ? (
              <article id="fit" className="lux-card">
                <p className="lux-kicker">Before you commit</p>
                <h2>{heads.fit}</h2>
                {pkg.suitableBody ? <p>{pkg.suitableBody}</p> : null}
                {pkg.trainingBody ? (
                  <>
                    <h3>How to train</h3>
                    <p>{pkg.trainingBody}</p>
                  </>
                ) : null}
                {pkg.khumbuBody ? (
                  <>
                    <h3>{heads.khumbu}</h3>
                    <p>{pkg.khumbuBody}</p>
                  </>
                ) : null}
              </article>
            ) : null}

            {pkg.watchVideo?.imageSrc || pkg.watchVideo?.videoSrc ? (
              <article id="video" className="lux-card">
                <p className="lux-kicker">Film</p>
                <h2>Watch video</h2>
                <button type="button" className="lux-film" style={{ width: "100%" }} onClick={() => openVideo(pkg.watchVideo)}>
                  <FilmStill
                    src={pkg.watchVideo.imageSrc || pkg.heroSrc}
                    alt={pkg.watchVideo.imageAlt || pkg.watchVideo.title}
                    videoSrc={pkg.watchVideo.videoSrc}
                  />
                  {pkg.watchVideo.duration ? <span className="lux-film-time">{pkg.watchVideo.duration}</span> : null}
                  <span className="lux-film-play" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                      <path d="M9.4 7.6v8.8L17.2 12 9.4 7.6Z" />
                    </svg>
                  </span>
                  <span className="lux-film-cap">
                    <strong>{pkg.watchVideo.title}</strong>
                    <span>{pkg.watchVideo.duration}</span>
                  </span>
                </button>
              </article>
            ) : null}

            {pkg.videoReviews?.length ? (
              <article id="vreviews" className="lux-card">
                <p className="lux-kicker">Guests on camera</p>
                <h2>Video reviews</h2>
                <div className="lux-films">
                  {pkg.videoReviews.map((video) => (
                    <button
                      key={video.id}
                      type="button"
                      className="lux-film"
                      aria-label={`Play video: ${video.title}`}
                      onClick={() => openVideo(video)}
                    >
                      <FilmStill
                        src={video.imageSrc || pkg.heroSrc}
                        alt={video.imageAlt || video.title}
                        videoSrc={video.videoSrc}
                      />
                      {video.duration ? <span className="lux-film-time">{video.duration}</span> : null}
                      <span className="lux-film-play lux-film-play--sm" aria-hidden="true">
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                          <path d="M9.4 7.6v8.8L17.2 12 9.4 7.6Z" />
                        </svg>
                      </span>
                      <span className="lux-film-cap">
                        <strong>{video.title}</strong>
                        {video.duration ? <span>{video.duration}</span> : null}
                      </span>
                    </button>
                  ))}
                </div>
              </article>
            ) : null}

            {pkg.tripInfo?.length || pkg.luxuryExperience?.pillars?.length ? (
              <article id="trip-info" className="lux-card">
                <p className="lux-kicker">{heliTour ? "Trip essentials" : "Know the trail"}</p>
                <h2>{pkg.tripInfoTitle || `${pkg.title} – Trip Information`}</h2>
                {pkg.luxuryExperience?.title || pkg.luxuryExperience?.intro ? (
                  <div className="lux-info-block">
                    {pkg.luxuryExperience.title ? <h3>{pkg.luxuryExperience.title}</h3> : null}
                    {pkg.luxuryExperience.intro ? <p>{pkg.luxuryExperience.intro}</p> : null}
                  </div>
                ) : null}
                {pkg.luxuryExperience?.pillars?.map((pillar) => (
                  <div key={pillar.title} className="lux-info-block">
                    <h3>{pillar.title}</h3>
                    <ul className="lux-checks">
                      {pillar.items.map((line) => (
                        <li key={line}>
                          <CheckMark />
                          <span>{line}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                {pkg.tripInfo?.map((block) => (
                  <div key={block.id} className="lux-info-block">
                    <h3>{block.title}</h3>
                    {block.body.split(/\n{2,}/).map((para) => (
                      <p key={para.slice(0, 48)}>{para}</p>
                    ))}
                  </div>
                ))}
              </article>
            ) : null}

            {show["the-journey"] && pkg.journeyStages?.length ? (
              <article id="the-journey" className="lux-card lux-journey">
                <p className="lux-kicker">Route story</p>
                <h2>{pkg.journeyTitle || "The Journey"}</h2>
                {pkg.journeySubheading ? <p className="lux-journey-sub">{pkg.journeySubheading}</p> : null}
                {(pkg.journeyIntro || "")
                  .split(/\n{2,}/)
                  .filter(Boolean)
                  .map((para) => (
                    <p key={para.slice(0, 48)}>{para}</p>
                  ))}
                <div className="lux-journey-stages">
                  {pkg.journeyStages.map((stage, index) => (
                    <div key={stage.id} className="lux-journey-stage">
                      {stage.imageSrc ? (
                        <figure className="lux-journey-stage-media">
                          <MediaImage
                            src={stage.imageSrc}
                            alt={stage.imageAlt || stage.title}
                            sizes="(max-width: 720px) 100vw, 320px"
                            className="lux-photo"
                            objectFit="cover"
                          />
                        </figure>
                      ) : null}
                      <div>
                        <span className="lux-journey-stage-num">Stage {index + 1}</span>
                        <h3>{stage.title}</h3>
                        <p>{stage.body}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  className="lux-btn lux-btn-gold"
                  style={{ marginTop: "1.25rem" }}
                  onClick={() => {
                    setActiveToc("itinerary");
                    scrollToId("itinerary");
                  }}
                >
                  View the Full Itinerary
                </button>
              </article>
            ) : null}

            {show.about && (pkg.aboutSections?.length || pkg.aboutLead) ? (
              <article id="about" className="lux-card lux-about">
                <p className="lux-kicker">Destination</p>
                <h2>{pkg.aboutTitle || heads.about}</h2>
                {pkg.aboutLead ? <p className="lux-about-lead">{pkg.aboutLead}</p> : null}
                {pkg.aboutSections?.map((block) => (
                  <div key={block.id} className="lux-about-block">
                    <h3>{block.title}</h3>
                    {block.body.split(/\n{2,}/).map((para) => (
                      <p key={para.slice(0, 48)}>{para}</p>
                    ))}
                  </div>
                ))}
              </article>
            ) : null}

            {show.itinerary ? (
            <article id="itinerary" className="lux-card">
              <p className="lux-kicker">{heliTour ? "Experience timeline" : `${pkg.days}-day plan`}</p>
              <h2>{heliTour ? "Detailed itinerary" : `${pkg.title} itinerary`}</h2>
              {pkg.itineraryIntro ? <p>{pkg.itineraryIntro}</p> : null}
              <div className="lux-days">
                {pkg.itinerary.map((day) => {
                  const open = openDay === day.day;
                  const distance = day.distance || (isEbcPackage(pkg) ? TREK_DAY_DISTANCE[day.day] : "") || "—";
                  return (
                    <div key={day.id} className={`lux-day${open ? " is-open" : ""}`}>
                      <div className="lux-day-line">
                        <span className="lux-plan-day">{heliTour ? `Step ${day.day}` : `Day ${day.day}`}</span>
                        <strong>{day.title}</strong>
                      </div>
                      {!open ? <p className="lux-teaser">{teaserOf(day.body)}</p> : null}
                      {open ? (
                        <div className="lux-day-body">
                          {day.body.split(/\n{2,}/).map((para) => (
                            <p key={para.slice(0, 40)}>{para}</p>
                          ))}
                          <div className="lux-info-bar" aria-label="Day details">
                            {!heliTour ? (
                              <>
                                <ItineraryMetaItem icon="meal" label="Meals" value={day.meals} />
                                <ItineraryMetaItem icon="bed" label="Accommodation" value={day.stay} />
                              </>
                            ) : null}
                            <ItineraryMetaItem icon="duration" label="Duration" value={day.duration} />
                            <ItineraryMetaItem icon="altitude" label={heliTour ? "Location" : "Altitude"} value={day.altitude} />
                            {!heliTour ? (
                              <ItineraryMetaItem icon="distance" label="Distance" value={distance} />
                            ) : null}
                          </div>
                        </div>
                      ) : null}
                      <button type="button" className="lux-more" onClick={() => setOpenDay(open ? 0 : day.day)}>
                        {open ? "Show less" : "Read more"}
                      </button>
                    </div>
                  );
                })}
              </div>
            </article>
            ) : null}

            {show["flight-route"] ? (
              <article id="flight-route" className="lux-card">
                <p className="lux-kicker">In the air</p>
                <h2>Flight route and mountain views</h2>
                {pkg.mapBody?.split(/\n{2,}/).map((para) => (
                  <p key={para.slice(0, 48)}>{para}</p>
                ))}
              </article>
            ) : null}

            {show["landing-options"] ? (
              <article id="landing-options" className="lux-card">
                <p className="lux-kicker">On the ground</p>
                <h2>{pkg.khumbuTitle || "Landing options"}</h2>
                {pkg.khumbuBody?.split(/\n{2,}/).map((para) => (
                  <p key={para.slice(0, 48)}>{para}</p>
                ))}
              </article>
            ) : null}

            {show["trip-map"] ? (
            <article id="trip-map" className="lux-card">
              <p className="lux-kicker">The line on the map</p>
              <h2>Trip map</h2>
              {heads.mapBody ? <p>{heads.mapBody}</p> : null}
              {pkg.routeMapSrc ? (
                <UploadedChart
                  variant="map"
                  title={`${pkg.title} map`}
                  src={pkg.routeMapSrc}
                  file={pkg.routeMapFile || `${pkg.slug}-route-map`}
                />
              ) : (
                <TrekRouteMap title={`${pkg.title} map`} variant={mapVariant} />
              )}
            </article>
            ) : null}

            {show.altitude ? (
            <article id="altitude" className="lux-card">
              <p className="lux-kicker">Thin air</p>
              <h2>Altitude profile of {pkg.title}</h2>
              {pkg.altitudeBody ? <p>{pkg.altitudeBody}</p> : null}
              {pkg.altitudeChartM || pkg.altitudeChartFt ? (
                <>
                  <div className="lux-unit">
                    <span>Altitude in:</span>
                    <button type="button" className={altUnit === "m" ? "on" : ""} onClick={() => setAltUnit("m")}>
                      Meter
                    </button>
                    <button type="button" className={altUnit === "ft" ? "on" : ""} onClick={() => setAltUnit("ft")}>
                      Feet
                    </button>
                  </div>
                  <UploadedChart
                    title={altUnit === "ft" ? "Altitude in feet" : "Altitude in metres"}
                    src={
                      altUnit === "ft"
                        ? pkg.altitudeChartFt || pkg.altitudeChartM
                        : pkg.altitudeChartM || pkg.altitudeChartFt
                    }
                    file={`${pkg.slug}-altitude-${altUnit}`}
                  />
                </>
              ) : everestViewCharts ? (
                <EverestViewAltitudeProfile sectionTitle={`Altitude profile of ${pkg.title}`} />
              ) : khumbuSchematicCharts ? (
                <AltitudeProfileChart
                  title={`Altitude profile of ${pkg.title}`}
                  stops={chartStops}
                  maxM={chartMaxM}
                  minM={chartMinM}
                  fileName={chartFile}
                />
              ) : builtInCharts ? (
                <AltitudeProfileChart
                  title={`Altitude profile of ${pkg.title}`}
                  stops={chartStops}
                  maxM={chartMaxM}
                  minM={chartMinM}
                  fileName={chartFile}
                />
              ) : null}
            </article>
            ) : null}

            {show.weather ? (
            <article id="weather" className="lux-card">
              <p className="lux-kicker">Seasons</p>
              <h2>{heliTour ? "Weather and best season" : `Weather on ${pkg.title}`}</h2>
              {pkg.weatherBody ? <p>{pkg.weatherBody}</p> : null}
              {heads.weatherNote ? <p className="lux-note">{heads.weatherNote}</p> : null}
              {pkg.weatherMonthlySrc ? (
                <UploadedChart title={`Weather on ${pkg.title}`} src={pkg.weatherMonthlySrc} file={`${pkg.slug}-monthly-weather`} />
              ) : everestViewCharts ? (
                <EverestViewMonthlyWeather sectionTitle={`Weather on ${pkg.title}`} />
              ) : kcpTourCharts ? (
                <MonthlyWeatherChart
                  title={`Weather on ${pkg.title}`}
                  months={KATHMANDU_CHITWAN_POON_HILL_MONTHLY_WEATHER}
                  minT={-4}
                  maxT={26}
                  downloadName="kathmandu-chitwan-poon-hill-luxury-tour-monthly-weather"
                />
              ) : annapurnaPanoramaCharts ? (
                <MonthlyWeatherChart
                  title={`Weather on ${pkg.title}`}
                  months={ANNAPURNA_PANORAMA_MONTHLY_WEATHER}
                  minT={-4}
                  maxT={26}
                  downloadName="annapurna-panorama-luxury-trek-monthly-weather"
                />
              ) : ghorepaniPoonhillCharts ? (
                <MonthlyWeatherChart
                  title={`Weather on ${pkg.title}`}
                  months={GHOREPANI_POONHILL_MONTHLY_WEATHER}
                  minT={-4}
                  maxT={26}
                  downloadName="ghorepani-poonhill-luxury-trek-monthly-weather"
                />
              ) : poonHillCharts ? (
                <MonthlyWeatherChart
                  title={`Weather on ${pkg.title}`}
                  months={POON_HILL_MONTHLY_WEATHER}
                  minT={-4}
                  maxT={26}
                  downloadName="poon-hill-luxury-trek-monthly-weather"
                />
              ) : khumbuSchematicCharts ? (
                <EverestViewMonthlyWeather sectionTitle={`Weather on ${pkg.title}`} />
              ) : isEbcPackage(pkg) ? (
                <MonthlyWeatherChart title={`Weather on ${pkg.title}`} />
              ) : null}
            </article>
            ) : null}

            {show.includes ? (
            <article id="includes" className="lux-card">
              <p className="lux-kicker">Practicalities</p>
              <h2>What’s included</h2>
              <div className="lux-inc">
                <div className="lux-inc-box">
                  <h3>Includes</h3>
                  <ul>
                    {pkg.inclusions.map((item) => (
                      <li key={item}>{preserveListPhrasing(item)}</li>
                    ))}
                  </ul>
                </div>
                <div className="lux-inc-box">
                  <h3>Not included</h3>
                  <ul>
                    {pkg.exclusions.map((item) => (
                      <li key={item}>{preserveListPhrasing(item)}</li>
                    ))}
                  </ul>
                </div>
              </div>
              {pkg.optionalAddons?.length ? (
                <div className="lux-inc-box" style={{ marginTop: "1rem" }}>
                  <h3>Optional add-ons</h3>
                  <p>Available at extra cost if you wish to upgrade.</p>
                  <ul>
                    {pkg.optionalAddons.map((item) => (
                      <li key={item}>{preserveListPhrasing(item)}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
              {pkg.includeNote ? (
                <>
                  <h3>Important note</h3>
                  <p>{pkg.includeNote}</p>
                </>
              ) : null}
              {pkg.luklaNote ? (
                <>
                  <h3>{heads.luklaNote}</h3>
                  <p>{pkg.luklaNote}</p>
                </>
              ) : null}
            </article>
            ) : null}

            {gallery.length ? (
              <section id="trip-gallery" className="lux-trip-gallery" aria-labelledby="trip-gallery-heading">
                <h2 id="trip-gallery-heading" className="lux-trip-gallery-title">
                  {pkg.tripGalleryTitle || "Trip Gallery"}
                </h2>
                <div className="lux-trip-gallery-grid">
                  {gallery.slice(0, 7).map((src, index) => (
                    <button
                      key={`${src}-${index}`}
                      type="button"
                      className="lux-trip-gallery-tile"
                      onClick={() => setLightIndex(index)}
                    >
                      <img
                        src={mediaSrc(src)}
                        alt={pkg.galleryAlts?.[index] || (index === 0 ? pkg.heroAlt : `${pkg.title} ${index + 1}`)}
                        loading="lazy"
                        className="lux-trip-gallery-img"
                      />
                      <span className="lux-trip-gallery-mark" aria-hidden="true">
                        <img src="/images/ambition-holiday-logo.webp" alt="" />
                      </span>
                    </button>
                  ))}
                  <button
                    type="button"
                    className="lux-trip-gallery-tile lux-trip-gallery-more"
                    onClick={() => setLightIndex(0)}
                  >
                    {gallery[7] ? (
                      <img
                        src={mediaSrc(gallery[7])}
                        alt=""
                        loading="lazy"
                        className="lux-trip-gallery-img"
                        aria-hidden="true"
                      />
                    ) : gallery[0] ? (
                      <img src={mediaSrc(gallery[0])} alt="" loading="lazy" className="lux-trip-gallery-img" aria-hidden="true" />
                    ) : null}
                    <span className="lux-trip-gallery-more-label">More Photos</span>
                  </button>
                </div>
              </section>
            ) : null}

            {show.safety ? (
              <article id="safety" className="lux-card">
                <p className="lux-kicker">Aviation</p>
                <h2>{pkg.heliTitle || "Safety and flight information"}</h2>
                {pkg.heliBody?.split(/\n{2,}/).map((para) => (
                  <p key={para.slice(0, 48)}>{para}</p>
                ))}
                {pkg.beforeItems?.length ? (
                  <>
                    <h3>Read before you book</h3>
                    <ul>
                      {pkg.beforeItems.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </>
                ) : null}
              </article>
            ) : null}

            {show["booking-policy"] ? (
              <article id="booking-policy" className="lux-card">
                <p className="lux-kicker">Policies</p>
                <h2>{pkg.bufferTitle || pkg.notesTitle || "Booking and cancellation policy"}</h2>
                {pkg.bufferBody?.split(/\n{2,}/).map((para) => (
                  <p key={para.slice(0, 48)}>{para}</p>
                ))}
              </article>
            ) : null}

            {show.packing ? (
            <article id="packing" className="lux-card">
              <p className="lux-kicker">Gear</p>
              <h2>Packing list for the {pkg.title}</h2>
              {pkg.packingIntro ? <p>{pkg.packingIntro}</p> : null}
              <div className="lux-pack-grid">
                {packingGroups.map((group) => (
                  <div key={group.id} className="lux-pack-col">
                    <h3>{group.title}</h3>
                    <ul>
                      {group.items.map((item) => (
                        <li key={item}>{preserveListPhrasing(item)}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </article>
            ) : null}

            {show.flights ? (
            <article id="flights" className="lux-card">
              <p className="lux-kicker">Flights</p>
              <h2>{heads.notes}</h2>
              {pkg.flightBody ? (
                <>
                  <h3>{heads.flight}</h3>
                  {pkg.flightBody.split(/\n{2,}/).map((para) => (
                    <p key={para.slice(0, 48)}>{para}</p>
                  ))}
                </>
              ) : null}
              {pkg.bufferBody ? (
                <>
                  <h3>{heads.buffer}</h3>
                  <p>{pkg.bufferBody}</p>
                </>
              ) : null}
              {pkg.heliBody ? (
                <>
                  <h3>{heads.heli}</h3>
                  <p>{pkg.heliBody}</p>
                </>
              ) : null}
              {pkg.beforeItems?.length ? (
                <>
                  <h3>Read before you book</h3>
                  <ul>
                    {pkg.beforeItems.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </>
              ) : null}
            </article>
            ) : null}

            {pkg.faqs.length ? (
              <article id="faqs" className="lux-card">
                <p className="lux-kicker">Good questions</p>
                <h2>Frequently asked</h2>
                {pkg.faqs.map((faq, index) => {
                  const open = openFaq === index;
                  return (
                    <div key={faq.q} className={`lux-faq${open ? " is-open" : ""}`}>
                      <button type="button" onClick={() => setOpenFaq(open ? -1 : index)}>
                        <strong>{faq.q}</strong>
                        <span className="lux-faq-icon" aria-hidden="true">
                          {open ? "−" : "+"}
                        </span>
                      </button>
                      {open ? <p className="lux-faq-a">{faq.a}</p> : null}
                    </div>
                  );
                })}
              </article>
            ) : null}
          </div>

          <aside id="book" className="lux-aside lux-aside--sidebar" aria-label="Book this trip">
            {bookingPanel}
          </aside>
        </div>
      </div>

      <div className="lux-mobile-bar">
        <div>
          <strong>
            {heliCharterSelected && selectedHeliOption
              ? selectedHeliOption.priceUsd > 0
                ? `USD ${selectedHeliOption.priceUsd.toLocaleString()}`
                : selectedHeliOption.priceLabel || "Charter on request"
              : heliTour && hasFromPrice
                ? `From USD ${fromPrice.toLocaleString()}`
              : hasFromPrice
                ? `From USD ${fromPrice.toLocaleString()}`
                : hasPrice
                  ? `USD ${pkg.priceUsd.toLocaleString()}`
                  : "Request Private Quote"}
          </strong>
          {heliTour && selectedHeliOption?.priceUsd > 0 ? (
            <span>{selectedHeliOption.id === "charter" ? "/ charter" : "/ person"}</span>
          ) : hasPrice && !heliTour ? (
            <span>/ person</span>
          ) : null}
        </div>
        <Link href={enquire}>{premiumNepalPage ? "Book now" : "Inquire"}</Link>
      </div>

      <div id="reviews" className="lux-reviews-band">
        <WhyAmbitionSection embedded trekPackage={pkg} />
      </div>

      <div className="home-light relative isolate [clip-path:inset(0)] text-[#f7f4ef]">
        <DuskAtmosphere />
        <SiteFooter />
      </div>
      </div>
    </div>

      {activeVideo ? <TrekVideoLightbox video={activeVideo} onClose={() => setActiveVideo(null)} /> : null}
      {lightIndex !== null ? (
        <TripPhotoLightbox
          images={gallery}
          index={lightIndex}
          altForIndex={galleryAlt}
          onClose={() => setLightIndex(null)}
          onIndexChange={setLightIndex}
        />
      ) : null}
    </>
  );
}

function FilmStill({ src, alt, videoSrc }: { src: string; alt: string; videoSrc?: string }) {
  const resolved = mediaSrc(src);
  const yt = youtubeId(videoSrc || "");
  const fallback = yt ? `https://i.ytimg.com/vi/${yt}/hqdefault.jpg` : "";
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={resolved}
      alt={alt}
      className="lux-photo"
      loading="eager"
      decoding="async"
      draggable={false}
      onError={(e) => {
        if (fallback && e.currentTarget.src !== fallback) e.currentTarget.src = fallback;
      }}
    />
  );
}

function GoogleG() {
  return (
    <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
      <path fill="#4285F4" d="M23.5 12.27c0-.82-.07-1.6-.21-2.36H12v4.47h6.46a5.52 5.52 0 0 1-2.4 3.62v3h3.88c2.27-2.09 3.56-5.17 3.56-8.73Z" />
      <path fill="#34A853" d="M12 24c3.24 0 5.96-1.07 7.95-2.9l-3.88-3c-1.08.72-2.47 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.95H1.27v3.09A12 12 0 0 0 12 24Z" />
      <path fill="#FBBC05" d="M5.27 14.3A7.2 7.2 0 0 1 4.9 12c0-.8.14-1.57.37-2.3V6.61H1.27A12 12 0 0 0 0 12c0 1.94.46 3.77 1.27 5.39l4-3.09Z" />
      <path fill="#EA4335" d="M12 4.75c1.76 0 3.34.6 4.58 1.79l3.43-3.43C17.95 1.19 15.23 0 12 0 7.31 0 3.26 2.69 1.27 6.61l4 3.09C6.22 6.86 8.87 4.75 12 4.75Z" />
    </svg>
  );
}

function ItineraryMetaItem({
  icon,
  label,
  value,
}: {
  icon: "meal" | "bed" | "duration" | "altitude" | "distance";
  label: string;
  value: string;
}) {
  return (
    <div className="lux-info-item">
      <span className="lux-info-icon" aria-hidden="true">
        <ItineraryMetaIcon name={icon} size={22} strokeWidth={icon === "meal" || icon === "bed" ? 2 : 1.75} />
      </span>
      <span className="lux-info-copy">
        <strong>{label}</strong>
        <em>{value || "—"}</em>
      </span>
    </div>
  );
}

function CheckMark() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="10" stroke="#c9a227" strokeWidth="1.8" />
      <path d="M7.5 12.4l3 3.1 6-6.4" stroke="#c9a227" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FactIcon({ name }: { name: string }) {
  const common = {
    width: 26,
    height: 26,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  if (name === "globe") {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
        <circle cx="12" cy="12" r="2.2" />
      </svg>
    );
  }
  if (name === "cal") {
    return (
      <svg {...common}>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M8 3v4M16 3v4M3 10h18" />
      </svg>
    );
  }
  if (name === "gauge") {
    return (
      <svg {...common}>
        <path d="M6 16a6 6 0 1 1 12 0" />
        <path d="M12 16V11" />
        <circle cx="12" cy="16" r="1.4" fill="currentColor" />
      </svg>
    );
  }
  if (name === "hike") {
    return (
      <svg {...common}>
        <circle cx="14" cy="5" r="2" />
        <path d="M4 21l5-9 3 4 4-7 4 12" />
      </svg>
    );
  }
  if (name === "peak") {
    return (
      <svg {...common}>
        <path d="M3 19l6-10 3 5 3-4 6 9H3z" />
        <path d="M14 10l2-3 2 3" />
      </svg>
    );
  }
  if (name === "cloud") {
    return (
      <svg {...common}>
        <path d="M7 17h10a4 4 0 0 0 0-8 6 6 0 0 0-11-1A4 4 0 0 0 7 17z" />
      </svg>
    );
  }
  if (name === "bed") {
    return <ItineraryMetaIcon name="bed" size={26} strokeWidth={1.6} />;
  }
  if (name === "meal") {
    return <ItineraryMetaIcon name="meal" size={26} strokeWidth={1.6} />;
  }
  return (
    <svg {...common}>
      <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.2" />
    </svg>
  );
}

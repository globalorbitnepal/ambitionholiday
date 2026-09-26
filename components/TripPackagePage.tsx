"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import MediaImage from "@/components/MediaImage";
import SiteFooter from "@/components/SiteFooter";
import DuskAtmosphere from "@/components/DuskAtmosphere";
import WhyAmbitionSection from "@/components/WhyAmbitionSection";
import { AltitudeProfileChart, MonthlyWeatherChart, TrekRouteMap, UploadedChart } from "@/components/TrekCharts";
import PackageActions from "@/components/PackageActions";
import type { TrekPackage, TrekVideo } from "@/lib/trip-packages";
import { TREK_DAY_DISTANCE } from "@/lib/trip-packages";
import { isFileVideo, vimeoEmbedSrc, vimeoId, youtubeEmbedSrc, youtubeId } from "@/lib/video-embed";
import { mediaSrc } from "@/lib/media-src";

const TOC = [
  { id: "overview", label: "Overview" },
  { id: "book", label: "Availability" },
  { id: "highlights", label: "Highlights" },
  { id: "why", label: "Why us" },
  { id: "video", label: "Video" },
  { id: "vreviews", label: "Video reviews" },
  { id: "info", label: "Trip info" },
  { id: "itinerary", label: "Itinerary" },
  { id: "map", label: "Trip Map" },
  { id: "altitude", label: "Altitude" },
  { id: "weather", label: "Weather" },
  { id: "includes", label: "Includes" },
  { id: "packing", label: "Packing" },
  { id: "notes", label: "Flights" },
  { id: "reviews", label: "Reviews" },
  { id: "faq", label: "FAQs" },
];

function teaserOf(body: string) {
  const first = body.split(/\n{2,}/)[0] || body;
  return first.length > 230 ? `${first.slice(0, 220).trim()}…` : first;
}

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function TripPackagePage({ pkg }: { pkg: TrekPackage }) {
  const [openDay, setOpenDay] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);
  const [showGroups, setShowGroups] = useState(true);
  const [altUnit, setAltUnit] = useState<"m" | "ft">("m");
  const [lightIndex, setLightIndex] = useState<number | null>(null);
  const [activeToc, setActiveToc] = useState("overview");
  const [activeVideo, setActiveVideo] = useState<TrekVideo | null>(null);
  const enquire = `/contact?interest=${pkg.catalogId || pkg.id}`;
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

  const facts = [
    { icon: "globe", label: "Country", value: pkg.countryLabel || "Nepal" },
    { icon: "cal", label: "Duration", value: pkg.duration },
    { icon: "gauge", label: "Difficulty", value: pkg.difficulty },
    { icon: "hike", label: "Activity", value: pkg.activityLabel || "Trekking / Hiking" },
    { icon: "peak", label: "Max. altitude", value: pkg.maxAltitude },
    { icon: "cloud", label: "Best season", value: pkg.bestSeason },
    { icon: "bed", label: "Accommodation", value: pkg.accommodationLabel || "Lodge & hotel" },
    { icon: "meal", label: "Meals", value: pkg.mealsLabel || "Included on trek" },
    { icon: "pin", label: "Start / End", value: pkg.startEndLabel || pkg.startLabel },
  ];

  useEffect(() => {
    const ids = TOC.map((item) => item.id);
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
  }, []);

  useEffect(() => {
    if (lightIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightIndex(null);
      if (e.key === "ArrowRight") setLightIndex((i) => (i === null ? i : (i + 1) % gallery.length));
      if (e.key === "ArrowLeft") setLightIndex((i) => (i === null ? i : (i - 1 + gallery.length) % gallery.length));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightIndex, gallery.length]);

  return (
    <>
    <main className="lux-root">
      <div className="lux-top">
        <Header />
        <section className="lux-gallery lux-gallery--trip" aria-label="Journey photos">
          <div className="lux-mosaic-tools">
            <PackageActions pkg={pkg} compact />
          </div>
          <div className="lux-gallery-row">
            {heroStrip.map((src, index) => (
              <figure
                key={`${src}-${index}`}
                className={`lux-gallery-pane${index === 0 ? " is-lead" : ""}`}
                onClick={() => setLightIndex(index)}
              >
                <span className="lux-gallery-media">
                  <MediaImage
                    src={src}
                    alt={pkg.galleryAlts?.[index] || (index === 0 ? pkg.heroAlt : `${pkg.title} ${index + 1}`)}
                    sizes={index === 0 ? "44vw" : "22vw"}
                    priority={index === 0}
                    className="lux-gallery-photo lux-photo"
                    objectPosition="center 40%"
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

        <nav className="lux-toc" aria-label="On this page">
          {TOC.map((item) => (
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
              <div className="lux-rates">
                <a className="lux-rate" href={pkg.tripadvisorHref || "#"} target="_blank" rel="noreferrer">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={pkg.tripadvisorLogoSrc || "/images/reviews/tripadvisor-owl.png"} alt="" />
                  <span>
                    <strong>{pkg.tripadvisorLabel || "Excellent"}</strong>
                    <span className="lux-owls" aria-hidden="true">
                      {Array.from({ length: 5 }, (_, i) => (
                        <i key={i} className={`lux-owl${i < 5 ? " is-on" : ""}`} />
                      ))}
                    </span>
                    <em>{pkg.tripadvisorCount}</em>
                  </span>
                </a>
                <a className="lux-rate" href={pkg.googleHref || "#"} target="_blank" rel="noreferrer">
                  <GoogleG />
                  <span>
                    <strong>{pkg.googleLabel || "Excellent"}</strong>
                    <em>
                      {pkg.googleScore} · {pkg.googleCount}
                    </em>
                  </span>
                </a>
                {pkg.watchVideo?.imageSrc ? (
                  <button type="button" className="lux-watch-btn" onClick={() => setActiveVideo(pkg.watchVideo)}>
                    Watch Video
                  </button>
                ) : null}
              </div>
            </header>

            <article className="lux-card">
              <p className="lux-kicker">The journey</p>
              <h2>About this luxury trek</h2>
              {pkg.overview.split(/\n{2,}/).map((para) => (
                <p key={para.slice(0, 48)}>{para}</p>
              ))}
            </article>

            <article id="highlights" className="lux-card">
              <h2>
                Highlights of {pkg.title} – {pkg.days} Days
              </h2>
              <span className="lux-hi-rule" aria-hidden="true" />
              <ul className="lux-checks">
                {pkg.highlights.map((item) => (
                  <li key={item}>
                    <CheckMark />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>

            {pkg.whyItems?.length ? (
              <article id="why" className="lux-card">
                <p className="lux-kicker">Why walk with us</p>
                <h2>Why this luxury Everest Base Camp trek</h2>
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
                <h2>Is this trek for you?</h2>
                {pkg.suitableBody ? <p>{pkg.suitableBody}</p> : null}
                {pkg.trainingBody ? (
                  <>
                    <h3>How to train</h3>
                    <p>{pkg.trainingBody}</p>
                  </>
                ) : null}
                {pkg.khumbuBody ? (
                  <>
                    <h3>The Khumbu you actually walk</h3>
                    <p>{pkg.khumbuBody}</p>
                  </>
                ) : null}
              </article>
            ) : null}

            {pkg.watchVideo?.imageSrc || pkg.watchVideo?.videoSrc ? (
              <article id="video" className="lux-card">
                <p className="lux-kicker">Film</p>
                <h2>Watch video</h2>
                <button type="button" className="lux-film" style={{ width: "100%" }} onClick={() => setActiveVideo(pkg.watchVideo)}>
                  <MediaImage src={pkg.watchVideo.imageSrc || pkg.heroSrc} alt={pkg.watchVideo.imageAlt || pkg.watchVideo.title} sizes="80vw" className="lux-photo" />
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
                    <button key={video.id} type="button" className="lux-film" onClick={() => setActiveVideo(video)}>
                      <MediaImage src={video.imageSrc} alt={video.imageAlt || video.title} sizes="30vw" className="lux-photo" />
                      <span className="lux-yt" aria-hidden="true">
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                          <path d="M8 6.8v10.4L18 12 8 6.8Z" />
                        </svg>
                      </span>
                    </button>
                  ))}
                </div>
              </article>
            ) : null}

            {pkg.tripInfo?.length ? (
              <article id="info" className="lux-card">
                <p className="lux-kicker">Know the trail</p>
                <h2>{pkg.tripInfoTitle || `${pkg.title} – Trip information`}</h2>
                {pkg.tripInfo.map((block) => (
                  <div key={block.id} className="lux-info-block">
                    <h3>{block.title}</h3>
                    {block.body.split(/\n{2,}/).map((para) => (
                      <p key={para.slice(0, 48)}>{para}</p>
                    ))}
                  </div>
                ))}
              </article>
            ) : null}

            <article id="itinerary" className="lux-card">
              <p className="lux-kicker">{pkg.days}-day plan</p>
              <h2>{pkg.title} itinerary</h2>
              <p>{pkg.itineraryIntro}</p>
              <div className="lux-days">
                {pkg.itinerary.map((day) => {
                  const open = openDay === day.day;
                  const distance = day.distance || TREK_DAY_DISTANCE[day.day] || "—";
                  return (
                    <div key={day.id} className={`lux-day${open ? " is-open" : ""}`}>
                      <div className="lux-day-line">
                        <span className="lux-plan-day">Day {day.day}</span>
                        <strong>{day.title}</strong>
                      </div>
                      {!open ? <p className="lux-teaser">{teaserOf(day.body)}</p> : null}
                      {open ? (
                        <div className="lux-day-body">
                          {day.body.split(/\n{2,}/).map((para) => (
                            <p key={para.slice(0, 40)}>{para}</p>
                          ))}
                          <div className="lux-info-bar" aria-label="Day details">
                            <span>
                              <b>Meals:</b> {day.meals}
                            </span>
                            <span>
                              <b>Accommodation:</b> {day.stay}
                            </span>
                            <span>
                              <b>Duration:</b> {day.duration}
                            </span>
                            <span>
                              <b>Altitude:</b> {day.altitude}
                            </span>
                            <span>
                              <b>Distance:</b> {distance}
                            </span>
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

            <article id="map" className="lux-card">
              <p className="lux-kicker">The line on the map</p>
              <h2>Trip map</h2>
              <p>The luxury walking line from Lukla to Everest Base Camp, with Kala Patthar marked for sunrise.</p>
              {pkg.routeMapSrc ? (
                <UploadedChart title={`${pkg.title} map`} src={pkg.routeMapSrc} file={`${pkg.slug}-route-map`} />
              ) : (
                <TrekRouteMap title={`${pkg.title} map`} />
              )}
            </article>

            <article id="altitude" className="lux-card">
              <p className="lux-kicker">Thin air</p>
              <h2>Altitude profile of {pkg.title}</h2>
              <p>{pkg.altitudeBody}</p>
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
              ) : (
                <AltitudeProfileChart title={`Altitude profile of ${pkg.title}`} />
              )}
            </article>

            <article id="weather" className="lux-card">
              <p className="lux-kicker">Seasons</p>
              <h2>Weather on {pkg.title}</h2>
              <p>{pkg.weatherBody}</p>
              <p className="lux-note">Month-by-month Khumbu reference only. The day you walk can be colder, windier or clearer than the chart.</p>
              {pkg.weatherMonthlySrc ? (
                <UploadedChart title={`Weather on ${pkg.title}`} src={pkg.weatherMonthlySrc} file={`${pkg.slug}-monthly-weather`} />
              ) : (
                <MonthlyWeatherChart title={`Weather on ${pkg.title}`} />
              )}
            </article>

            <article id="includes" className="lux-card">
              <p className="lux-kicker">Practicalities</p>
              <h2>What’s included</h2>
              <div className="lux-inc">
                <div className="lux-inc-box">
                  <h3>Includes</h3>
                  <ul>
                    {pkg.inclusions.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="lux-inc-box">
                  <h3>Not included</h3>
                  <ul>
                    {pkg.exclusions.map((item) => (
                      <li key={item}>{item}</li>
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
                      <li key={item}>{item}</li>
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
                  <h3>Special information for Lukla flights</h3>
                  <p>{pkg.luklaNote}</p>
                </>
              ) : null}
            </article>

            <article id="packing" className="lux-card">
              <p className="lux-kicker">Gear</p>
              <h2>Packing list for the {pkg.title}</h2>
              <p>{pkg.packingIntro || "Layers matter more than logos. We issue a porter duffel at the Thamel briefing."}</p>
              <div className="lux-pack-grid">
                {(pkg.packingGroups?.length
                  ? pkg.packingGroups
                  : [{ id: "all", title: "Kit", items: pkg.packingItems || [] }]
                ).map((group) => (
                  <div key={group.id} className="lux-pack-col">
                    <h3>{group.title}</h3>
                    <ul>
                      {group.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </article>

            <article id="notes" className="lux-card">
              <p className="lux-kicker">Flights</p>
              <h2>Lukla, buffer days and helicopter</h2>
              <h3>Kathmandu to Lukla</h3>
              <p>{pkg.flightBody}</p>
              <h3>Buffer days</h3>
              <p>{pkg.bufferBody}</p>
              <h3>Helicopter upgrade</h3>
              <p>{pkg.heliBody}</p>
              <h3>Read before you book</h3>
              <ul>
                {(pkg.beforeItems || []).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>

            {pkg.faqs.length ? (
              <article id="faq" className="lux-card">
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

          <aside id="book" className="lux-aside">
            <div className="lux-price">
              <PackageActions pkg={pkg} />
              <p className="lux-price-main">
                USD {pkg.priceUsd.toLocaleString()} <span>/ person</span>
              </p>
              <button type="button" className="lux-price-toggle" onClick={() => setShowGroups((v) => !v)}>
                See group booking discount {showGroups ? "▴" : "▾"}
              </button>
              {showGroups ? (
                <table className="lux-price-table">
                  <thead>
                    <tr>
                      <th>No. of people</th>
                      <th>Price per person</th>
                    </tr>
                  </thead>
                  <tbody>
                    {groups.map((row) => (
                      <tr key={row.id}>
                        <td>{row.label}</td>
                        <td>USD {row.priceUsd.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : null}
              <Link href={enquire} className="lux-btn lux-btn-solid">
                Book now
              </Link>
              <Link href={`${enquire}&intent=availability`} className="lux-btn lux-btn-gold">
                Check availability
              </Link>
              <Link href={enquire} className="lux-btn lux-btn-ghost">
                Inquire now
              </Link>
              <a className="lux-wa" href="https://wa.me/9779851148898" target="_blank" rel="noreferrer">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12.04 2C6.58 2 2.15 6.4 2.15 11.83c0 1.74.46 3.44 1.34 4.95L2 22l5.37-1.4a10 10 0 0 0 4.67 1.18h.01c5.46 0 9.89-4.4 9.89-9.84C21.94 6.4 17.5 2 12.04 2Zm5.48 14.05c-.23.64-1.34 1.18-1.86 1.26-.48.07-1.08.1-1.74-.11-.4-.12-.91-.3-1.57-.59-2.76-1.19-4.55-3.96-4.69-4.15-.14-.18-1.15-1.52-1.15-2.9 0-1.37.7-2.05.95-2.33.23-.26.62-.37.98-.37.12 0 .23 0 .33.01.29.01.44.03.63.49.23.55.78 1.9.85 2.04.07.14.12.3.02.49-.09.18-.14.3-.28.46-.14.16-.29.35-.41.47-.14.14-.28.29-.12.56.16.26.7 1.15 1.5 1.86 1.03.92 1.9 1.21 2.18 1.35.26.13.42.11.58-.07.16-.18.7-.8.88-1.08.18-.26.37-.22.62-.13.26.08 1.64.77 1.92.91.28.14.46.21.53.33.07.12.07.7-.16 1.34Z" />
                </svg>
                WhatsApp +977 9851148898
              </a>
            </div>
          </aside>
        </div>
      </div>

      <div className="lux-mobile-bar">
        <div>
          <strong>USD {pkg.priceUsd.toLocaleString()}</strong>
          <span>/ person</span>
        </div>
        <Link href={enquire}>Inquire</Link>
      </div>

      {activeVideo ? (
        <div className="lux-light" role="dialog" aria-modal="true" onClick={() => setActiveVideo(null)}>
          <button type="button" className="lux-light-close" onClick={() => setActiveVideo(null)}>
            Close
          </button>
          <div className="lux-video-frame" onClick={(e) => e.stopPropagation()}>
            <VideoFrame video={activeVideo} />
          </div>
        </div>
      ) : null}

      {lightIndex !== null ? (
        <div className="lux-light" role="dialog" aria-modal="true">
          <button type="button" className="lux-light-close" onClick={() => setLightIndex(null)}>
            Close
          </button>
          <button
            type="button"
            className="lux-light-nav lux-light-prev"
            aria-label="Previous photo"
            onClick={() => setLightIndex((i) => (i === null ? 0 : (i - 1 + gallery.length) % gallery.length))}
          >
            ‹
          </button>
          <img src={gallery[lightIndex]} alt={`${pkg.title} ${lightIndex + 1}`} />
          <button
            type="button"
            className="lux-light-nav lux-light-next"
            aria-label="Next photo"
            onClick={() => setLightIndex((i) => (i === null ? 0 : (i + 1) % gallery.length))}
          >
            ›
          </button>
          <p className="lux-light-count">
            {lightIndex + 1} / {gallery.length}
          </p>
        </div>
      ) : null}

    </main>

    <div id="reviews" className="home-light relative isolate">
      <WhyAmbitionSection />
    </div>

    <div className="home-light lux-foot relative isolate [clip-path:inset(0)] text-[#f7f4ef]">
      <DuskAtmosphere />
      <SiteFooter />
    </div>
    </>
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

function VideoFrame({ video }: { video: TrekVideo }) {
  const yt = youtubeId(video.videoSrc);
  const vimeo = vimeoId(video.videoSrc);
  const file = isFileVideo(video.videoSrc);
  if (yt) {
    return (
      <iframe
        title={video.title}
        src={youtubeEmbedSrc(yt)}
        className="lux-video-iframe"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
        allowFullScreen
      />
    );
  }
  if (vimeo) {
    return <iframe title={video.title} src={vimeoEmbedSrc(vimeo)} className="lux-video-iframe" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen />;
  }
  if (file) {
    return <video className="lux-video-iframe" src={mediaSrc(video.videoSrc)} controls autoPlay playsInline />;
  }
  return <p className="lux-slot-empty">Add a YouTube link in /admin → Packages → Reviews.</p>;
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
    return (
      <svg {...common}>
        <path d="M3 18V9h8a5 5 0 0 1 5 5v4" />
        <path d="M3 14h18M3 18h18" />
      </svg>
    );
  }
  if (name === "meal") {
    return (
      <svg {...common}>
        <path d="M4 21V8m0 0c0-3 2-5 4-5M8 8v5M12 21V4h2a4 4 0 0 1 0 8h-2" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.2" />
    </svg>
  );
}

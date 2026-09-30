"use client";

import Link from "next/link";
import { useState } from "react";
import { OrbitField, orbitInputClass, orbitTextareaClass } from "@/components/orbit/OrbitField";
import { OrbitMediaButtons } from "@/components/OrbitMediaPicker";
import SeoPanel, { SeoLengthHint } from "@/components/SeoPanel";
import { CHART_FRAMES, chartFrameLine } from "@/lib/chart-frames";
import type { SiteContent } from "@/lib/content-types";
import {
  cleanSlugInput,
  packageSeoInput,
  tripPath,
  type TrekItineraryDay,
  type TrekPackage,
} from "@/lib/trip-packages";

type Props = {
  content: SiteContent;
  setContent: (next: SiteContent) => void;
};

type SubTab =
  | "basic"
  | "itinerary"
  | "photos"
  | "charts"
  | "seo"
  | "faq"
  | "includes"
  | "tripinfo"
  | "guide";

const SUB_TABS: { id: SubTab; label: string }[] = [
  { id: "basic", label: "Basics & overview" },
  { id: "itinerary", label: "Itinerary" },
  { id: "photos", label: "Hero & gallery" },
  { id: "charts", label: "Map & charts" },
  { id: "seo", label: "SEO" },
  { id: "faq", label: "FAQ" },
  { id: "includes", label: "Included / excluded" },
  { id: "tripinfo", label: "Trip information" },
  { id: "guide", label: "Why, packing & notes" },
];

function syncCatalog(content: SiteContent, pkg: TrekPackage): SiteContent {
  const cardPatch = {
    title: pkg.title,
    days: pkg.days,
    difficulty: pkg.difficulty,
    description: pkg.subtitle,
    badge: pkg.badge,
    href: tripPath(pkg),
    imageSrc: pkg.heroSrc,
    imageAlt: pkg.heroAlt,
  };
  const link = (card: { id: string; href: string }) => card.id === pkg.catalogId || card.href === tripPath(pkg);
  const syncDest = (dest: SiteContent["nepal"]) => ({
    ...dest,
    categories: dest.categories.map((cat) => ({
      ...cat,
      packages: cat.packages.map((card) => (link(card) ? { ...card, ...cardPatch } : card)),
    })),
  });
  return {
    ...content,
    nepal: syncDest(content.nepal),
    bhutan: syncDest(content.bhutan),
    tibet: syncDest(content.tibet),
    multi: syncDest(content.multi),
    journeys: {
      ...content.journeys,
      packages: content.journeys.packages.map((card) =>
        link(card) || card.id === pkg.catalogId
          ? {
              ...card,
              title: pkg.title,
              href: tripPath(pkg),
              imageSrc: pkg.heroSrc,
              imageAlt: pkg.heroAlt,
              days: pkg.days,
              difficulty: pkg.difficulty,
              description: pkg.subtitle,
              badge: pkg.badge,
            }
          : card,
      ),
    },
  };
}

function ChartBlock({
  label,
  hint,
  value,
  onChange,
}: {
  label: string;
  hint: string;
  value: string;
  onChange: (next: string) => void;
}) {
  return (
    <div className="space-y-2 rounded-xl border border-white/10 p-4">
      <p className="text-sm font-semibold text-white">{label}</p>
      <p className="text-[0.75rem] leading-relaxed text-gold/90">{hint}</p>
      {value ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={value} alt="" className="h-44 w-full rounded-lg bg-white/5 object-contain" />
      ) : (
        <p className="text-xs text-white/45">No upload — built-in chart or section hidden until you add one.</p>
      )}
      <OrbitMediaButtons onPicked={async (url) => onChange(url)} />
      {value ? (
        <button
          type="button"
          className="rounded-md border border-white/20 px-3 py-1.5 text-xs text-white/70"
          onClick={() => onChange("")}
        >
          Clear image
        </button>
      ) : null}
    </div>
  );
}

export default function OrbitTripPackageEditor({ content, setContent }: Props) {
  const packages = content.tripPackages;
  const defaultId =
    packages.find((p) => p.id === "abc-lux" || p.slug === "annapurna-base-camp-luxury-trek")?.id || packages[0]?.id || "";
  const [packageId, setPackageId] = useState(defaultId);
  const [subTab, setSubTab] = useState<SubTab>("basic");

  const pkg = packages.find((p) => p.id === packageId);

  function patch(partial: Partial<TrekPackage>) {
    if (!pkg) return;
    const nextPkg: TrekPackage = {
      ...pkg,
      ...partial,
      updatedAt: new Date().toISOString(),
    };
    const withPackages = {
      ...content,
      tripPackages: content.tripPackages.map((p) => (p.id === pkg.id ? nextPkg : p)),
    };
    setContent(syncCatalog(withPackages, nextPkg));
  }

  function patchItinerary(dayIndex: number, partial: Partial<TrekItineraryDay>) {
    if (!pkg) return;
    patch({
      itinerary: pkg.itinerary.map((day, i) => (i === dayIndex ? { ...day, ...partial } : day)),
    });
  }

  const liveUrl = pkg ? tripPath(pkg) : "/";

  if (!packages.length) {
    return (
      <p className="text-sm text-white/70">
        No trek pages yet. Create one from{" "}
        <Link href="/admin/packages" className="text-gold underline">
          Admin → Packages
        </Link>
        .
      </p>
    );
  }

  if (!pkg) {
    return <p className="text-sm text-white/70">Select a package below.</p>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="min-w-[220px] flex-1">
          <OrbitField label="Trek package page">
            <select
              className={orbitInputClass}
              value={packageId}
              onChange={(e) => setPackageId(e.target.value)}
            >
              {packages.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.title} ({tripPath(p)})
                </option>
              ))}
            </select>
          </OrbitField>
        </div>
        <div className="flex flex-wrap gap-2">
          <a
            href={liveUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-md border border-gold/50 bg-gold/10 px-3 py-2 text-xs font-semibold text-gold"
          >
            View live ↗
          </a>
          <Link
            href={`/admin/packages/${pkg.id}`}
            className="rounded-md border border-white/20 px-3 py-2 text-xs text-white/80"
          >
            Advanced admin
          </Link>
        </div>
      </div>

      <p className="text-sm text-white/60">
        Edit every section of <strong className="text-white">{pkg.title}</strong> — text, photos, map, itinerary gold
        boxes, SEO. Click <span className="text-gold">Save changes</span> at the top of Orbit to go live.
      </p>

      <div className="flex flex-wrap gap-2">
        {SUB_TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setSubTab(t.id)}
            className={`rounded-full px-3 py-1.5 text-xs font-bold ${
              subTab === t.id ? "bg-gold/25 text-gold" : "bg-white/5 text-white/60 hover:bg-white/10"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {subTab === "basic" ? (
        <div className="grid gap-4 lg:grid-cols-2">
          <OrbitField label="Package title">
            <input className={orbitInputClass} value={pkg.title} onChange={(e) => patch({ title: e.target.value })} />
          </OrbitField>
          <OrbitField label="URL slug">
            <input
              className={orbitInputClass}
              value={pkg.slug}
              onChange={(e) => patch({ slug: cleanSlugInput(e.target.value) })}
            />
            <span className="text-xs text-white/45">{tripPath(pkg)}</span>
          </OrbitField>
          <OrbitField label="Status">
            <select
              className={orbitInputClass}
              value={pkg.status}
              onChange={(e) => patch({ status: e.target.value as TrekPackage["status"] })}
            >
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </OrbitField>
          <OrbitField label="Badge (e.g. Best Seller)">
            <input className={orbitInputClass} value={pkg.badge} onChange={(e) => patch({ badge: e.target.value })} />
          </OrbitField>
          <OrbitField label="Subtitle / card line">
            <textarea className={orbitTextareaClass} value={pkg.subtitle} onChange={(e) => patch({ subtitle: e.target.value })} />
          </OrbitField>
          <OrbitField label="Difficulty">
            <input className={orbitInputClass} value={pkg.difficulty} onChange={(e) => patch({ difficulty: e.target.value })} />
          </OrbitField>
          <OrbitField label="Days">
            <input
              type="number"
              className={orbitInputClass}
              value={pkg.days}
              onChange={(e) => patch({ days: Number(e.target.value) || 0 })}
            />
          </OrbitField>
          <OrbitField label="Duration label">
            <input className={orbitInputClass} value={pkg.duration} onChange={(e) => patch({ duration: e.target.value })} />
          </OrbitField>
          <OrbitField label="Max altitude">
            <input className={orbitInputClass} value={pkg.maxAltitude} onChange={(e) => patch({ maxAltitude: e.target.value })} />
          </OrbitField>
          <OrbitField label="Destination line">
            <input className={orbitInputClass} value={pkg.destination} onChange={(e) => patch({ destination: e.target.value })} />
          </OrbitField>
          <OrbitField label="Price USD (0 = on request)">
            <input
              type="number"
              className={orbitInputClass}
              value={pkg.priceUsd}
              onChange={(e) => patch({ priceUsd: Math.max(0, Number(e.target.value) || 0) })}
            />
          </OrbitField>
          <OrbitField label="Best season">
            <input className={orbitInputClass} value={pkg.bestSeason} onChange={(e) => patch({ bestSeason: e.target.value })} />
          </OrbitField>
          <div className="lg:col-span-2">
            <OrbitField label="Overview (main story)">
              <textarea
                className={`${orbitTextareaClass} min-h-[200px]`}
                value={pkg.overview}
                onChange={(e) => patch({ overview: e.target.value })}
              />
            </OrbitField>
          </div>
          <div className="lg:col-span-2">
            <OrbitField label="Highlights (one per line)">
              <textarea
                className={`${orbitTextareaClass} min-h-[140px]`}
                value={pkg.highlights.join("\n")}
                onChange={(e) =>
                  patch({ highlights: e.target.value.split("\n").map((s) => s.trim()).filter(Boolean) })
                }
              />
            </OrbitField>
          </div>
        </div>
      ) : null}

      {subTab === "itinerary" ? (
        <div className="space-y-4">
          <OrbitField label="Itinerary intro">
            <textarea
              className={orbitTextareaClass}
              value={pkg.itineraryIntro}
              onChange={(e) => patch({ itineraryIntro: e.target.value })}
            />
          </OrbitField>
          {pkg.itinerary.map((day, index) => (
            <details key={day.id} className="rounded-xl border border-white/10 p-4" open={index < 2}>
              <summary className="cursor-pointer font-semibold text-gold">
                Day {day.day}: {day.title || "Untitled"}
              </summary>
              <div className="mt-4 grid gap-3 lg:grid-cols-2">
                <OrbitField label="Title">
                  <input
                    className={orbitInputClass}
                    value={day.title}
                    onChange={(e) => patchItinerary(index, { title: e.target.value })}
                  />
                </OrbitField>
                <OrbitField label="Meals (gold box)">
                  <input
                    className={orbitInputClass}
                    value={day.meals}
                    onChange={(e) => patchItinerary(index, { meals: e.target.value })}
                  />
                </OrbitField>
                <OrbitField label="Accommodation">
                  <input
                    className={orbitInputClass}
                    value={day.stay}
                    onChange={(e) => patchItinerary(index, { stay: e.target.value })}
                  />
                </OrbitField>
                <OrbitField label="Duration">
                  <input
                    className={orbitInputClass}
                    value={day.duration}
                    onChange={(e) => patchItinerary(index, { duration: e.target.value })}
                  />
                </OrbitField>
                <OrbitField label="Altitude">
                  <input
                    className={orbitInputClass}
                    value={day.altitude}
                    onChange={(e) => patchItinerary(index, { altitude: e.target.value })}
                  />
                </OrbitField>
                <OrbitField label="Distance">
                  <input
                    className={orbitInputClass}
                    value={day.distance || ""}
                    onChange={(e) => patchItinerary(index, { distance: e.target.value })}
                  />
                </OrbitField>
                <div className="lg:col-span-2">
                  <OrbitField label="Description (shown when day is expanded)">
                    <textarea
                      className={`${orbitTextareaClass} min-h-[120px]`}
                      value={day.body}
                      onChange={(e) => patchItinerary(index, { body: e.target.value })}
                    />
                  </OrbitField>
                </div>
                <div className="lg:col-span-2 space-y-2">
                  <p className="text-xs text-white/50">Optional day photo</p>
                  {day.imageSrc ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={day.imageSrc} alt="" className="h-32 max-w-md rounded-lg object-cover" />
                  ) : null}
                  <OrbitMediaButtons onPicked={async (url) => patchItinerary(index, { imageSrc: url })} />
                </div>
              </div>
            </details>
          ))}
          <button
            type="button"
            className="rounded-md border border-white/20 px-3 py-2 text-xs text-white/80"
            onClick={() =>
              patch({
                itinerary: [
                  ...pkg.itinerary,
                  {
                    id: `d${pkg.itinerary.length + 1}-${Date.now()}`,
                    day: pkg.itinerary.length + 1,
                    title: "",
                    altitude: "",
                    duration: "",
                    meals: "",
                    stay: "",
                    distance: "",
                    body: "",
                  },
                ],
              })
            }
          >
            Add day
          </button>
        </div>
      ) : null}

      {subTab === "photos" ? (
        <div className="space-y-6">
          <div className="rounded-xl border border-white/10 p-4 space-y-3">
            <p className="text-sm font-semibold text-white">Hero / cover image</p>
            {pkg.heroSrc ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={pkg.heroSrc} alt="" className="aspect-[21/9] max-h-56 w-full rounded-lg object-cover" />
            ) : null}
            <OrbitMediaButtons onPicked={async (url) => patch({ heroSrc: url, heroAlt: pkg.heroAlt || pkg.title })} />
            <OrbitField label="Hero alt text">
              <input className={orbitInputClass} value={pkg.heroAlt} onChange={(e) => patch({ heroAlt: e.target.value })} />
            </OrbitField>
          </div>
          <OrbitField label="Trip gallery section title">
            <input
              className={orbitInputClass}
              value={pkg.tripGalleryTitle || "Trip Gallery"}
              onChange={(e) => patch({ tripGalleryTitle: e.target.value })}
            />
          </OrbitField>
          {pkg.gallery.map((src, index) => (
            <div key={`${pkg.id}-g-${index}`} className="rounded-xl border border-white/10 p-4 space-y-2">
              <p className="text-sm font-semibold">Gallery photo {index + 1}</p>
              {src ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={src} alt="" className="aspect-[4/3] max-w-md rounded-lg object-cover" />
              ) : null}
              <OrbitMediaButtons
                onPicked={async (url) => {
                  const gallery = pkg.gallery.map((item, i) => (i === index ? url : item));
                  const galleryAlts = [...(pkg.galleryAlts || [])];
                  while (galleryAlts.length < gallery.length) galleryAlts.push("");
                  patch({ gallery, galleryAlts });
                }}
              />
              <input
                className={orbitInputClass}
                placeholder="Alt text"
                value={pkg.galleryAlts?.[index] || ""}
                onChange={(e) => {
                  const galleryAlts = [...(pkg.galleryAlts || [])];
                  while (galleryAlts.length < pkg.gallery.length) galleryAlts.push("");
                  galleryAlts[index] = e.target.value;
                  patch({ galleryAlts });
                }}
              />
            </div>
          ))}
          <button
            type="button"
            className="rounded-md border border-gold/40 px-3 py-2 text-xs font-semibold text-gold"
            onClick={() => patch({ gallery: [...pkg.gallery, pkg.heroSrc || ""] })}
          >
            Add gallery photo
          </button>
        </div>
      ) : null}

      {subTab === "charts" ? (
        <div className="space-y-4">
          <div className="rounded-xl border border-gold/30 bg-gold/10 p-4 text-sm text-gold">
            <p className="font-semibold">Recommended sizes</p>
            <ul className="mt-2 space-y-1 text-white/80">
              <li>Map — {chartFrameLine(CHART_FRAMES.map)}</li>
              <li>Altitude — {chartFrameLine(CHART_FRAMES.altitude)}</li>
              <li>Weather — {chartFrameLine(CHART_FRAMES.weather)}</li>
            </ul>
          </div>
          <ChartBlock
            label="Trip map"
            hint={CHART_FRAMES.map.hint}
            value={pkg.routeMapSrc || ""}
            onChange={(routeMapSrc) => patch({ routeMapSrc })}
          />
          <ChartBlock
            label="Altitude — metres"
            hint={CHART_FRAMES.altitude.hint}
            value={pkg.altitudeChartM || ""}
            onChange={(altitudeChartM) => patch({ altitudeChartM })}
          />
          <ChartBlock
            label="Altitude — feet"
            hint="1960 × 1040 px · JPG or PNG"
            value={pkg.altitudeChartFt || ""}
            onChange={(altitudeChartFt) => patch({ altitudeChartFt })}
          />
          <ChartBlock
            label="Monthly weather"
            hint={CHART_FRAMES.weather.hint}
            value={pkg.weatherMonthlySrc || ""}
            onChange={(weatherMonthlySrc) => patch({ weatherMonthlySrc })}
          />
          <OrbitField label="Altitude section note">
            <textarea className={orbitTextareaClass} value={pkg.altitudeBody || ""} onChange={(e) => patch({ altitudeBody: e.target.value })} />
          </OrbitField>
          <OrbitField label="Weather section note">
            <textarea className={orbitTextareaClass} value={pkg.weatherBody || ""} onChange={(e) => patch({ weatherBody: e.target.value })} />
          </OrbitField>
        </div>
      ) : null}

      {subTab === "seo" ? (
        <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
          <div className="space-y-4">
            <OrbitField label="Focus keyword">
              <input
                className={orbitInputClass}
                value={pkg.focusKeyword || ""}
                onChange={(e) => patch({ focusKeyword: e.target.value })}
              />
            </OrbitField>
            <OrbitField label="SEO title">
              <input className={orbitInputClass} value={pkg.metaTitle} onChange={(e) => patch({ metaTitle: e.target.value })} />
              <SeoLengthHint value={pkg.metaTitle || pkg.title} kind="title" theme="dark" />
            </OrbitField>
            <OrbitField label="Meta description">
              <textarea
                className={orbitTextareaClass}
                value={pkg.metaDescription}
                onChange={(e) => patch({ metaDescription: e.target.value })}
              />
              <SeoLengthHint value={pkg.metaDescription || pkg.subtitle} kind="description" theme="dark" />
            </OrbitField>
            <OrbitField label="Meta keywords">
              <input className={orbitInputClass} value={pkg.metaKeywords} onChange={(e) => patch({ metaKeywords: e.target.value })} />
            </OrbitField>
            <OrbitField label="OG title">
              <input className={orbitInputClass} value={pkg.ogTitle || ""} onChange={(e) => patch({ ogTitle: e.target.value })} />
            </OrbitField>
            <OrbitField label="OG description">
              <textarea
                className={orbitTextareaClass}
                value={pkg.ogDescription || ""}
                onChange={(e) => patch({ ogDescription: e.target.value })}
              />
            </OrbitField>
            <div className="space-y-2">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-white/50">OG image</p>
              {pkg.ogImageSrc ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={pkg.ogImageSrc} alt="" className="h-32 rounded-lg object-cover" />
              ) : null}
              <OrbitMediaButtons onPicked={async (url) => patch({ ogImageSrc: url })} />
            </div>
            <label className="flex items-center gap-2 text-sm text-white/80">
              <input type="checkbox" checked={Boolean(pkg.noindex)} onChange={(e) => patch({ noindex: e.target.checked })} />
              Hide from Google (noindex)
            </label>
          </div>
          <SeoPanel
            theme="dark"
            input={packageSeoInput(pkg)}
            path={tripPath(pkg)}
            ogTitle={pkg.ogTitle}
            ogDescription={pkg.ogDescription}
            ogImageSrc={pkg.ogImageSrc || pkg.heroSrc}
          />
        </div>
      ) : null}

      {subTab === "faq" ? (
        <div className="space-y-4">
          {(pkg.faqs || []).map((faq, fi) => (
            <div key={fi} className="rounded-xl border border-white/10 p-4 space-y-2">
              <OrbitField label="Question">
                <input
                  className={orbitInputClass}
                  value={faq.q}
                  onChange={(e) =>
                    patch({ faqs: pkg.faqs.map((item, i) => (i === fi ? { ...item, q: e.target.value } : item)) })
                  }
                />
              </OrbitField>
              <OrbitField label="Answer">
                <textarea
                  className={orbitTextareaClass}
                  value={faq.a}
                  onChange={(e) =>
                    patch({ faqs: pkg.faqs.map((item, i) => (i === fi ? { ...item, a: e.target.value } : item)) })
                  }
                />
              </OrbitField>
              <button
                type="button"
                className="text-xs text-red-300"
                onClick={() => patch({ faqs: pkg.faqs.filter((_, i) => i !== fi) })}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            className="rounded-md border border-white/20 px-3 py-2 text-xs"
            onClick={() => patch({ faqs: [...(pkg.faqs || []), { q: "", a: "" }] })}
          >
            Add FAQ
          </button>
        </div>
      ) : null}

      {subTab === "includes" ? (
        <div className="grid gap-4 lg:grid-cols-2">
          <OrbitField label="What's included (one per line)">
            <textarea
              className={`${orbitTextareaClass} min-h-[200px]`}
              value={pkg.inclusions.join("\n")}
              onChange={(e) => patch({ inclusions: e.target.value.split("\n").map((s) => s.trim()).filter(Boolean) })}
            />
          </OrbitField>
          <OrbitField label="Not included (one per line)">
            <textarea
              className={`${orbitTextareaClass} min-h-[200px]`}
              value={pkg.exclusions.join("\n")}
              onChange={(e) => patch({ exclusions: e.target.value.split("\n").map((s) => s.trim()).filter(Boolean) })}
            />
          </OrbitField>
          <div className="lg:col-span-2">
            <OrbitField label="Optional upgrades (one per line)">
              <textarea
                className={orbitTextareaClass}
                value={(pkg.optionalAddons || []).join("\n")}
                onChange={(e) =>
                  patch({ optionalAddons: e.target.value.split("\n").map((s) => s.trim()).filter(Boolean) })
                }
              />
            </OrbitField>
          </div>
        </div>
      ) : null}

      {subTab === "tripinfo" ? (
        <div className="space-y-4">
          <OrbitField label="Section title">
            <input className={orbitInputClass} value={pkg.tripInfoTitle || ""} onChange={(e) => patch({ tripInfoTitle: e.target.value })} />
          </OrbitField>
          {(pkg.tripInfo || []).map((block, bi) => (
            <div key={block.id} className="rounded-xl border border-white/10 p-4 space-y-2">
              <OrbitField label="Heading">
                <input
                  className={orbitInputClass}
                  value={block.title}
                  onChange={(e) =>
                    patch({
                      tripInfo: pkg.tripInfo!.map((item, i) => (i === bi ? { ...item, title: e.target.value } : item)),
                    })
                  }
                />
              </OrbitField>
              <OrbitField label="Body">
                <textarea
                  className={orbitTextareaClass}
                  value={block.body}
                  onChange={(e) =>
                    patch({
                      tripInfo: pkg.tripInfo!.map((item, i) => (i === bi ? { ...item, body: e.target.value } : item)),
                    })
                  }
                />
              </OrbitField>
            </div>
          ))}
          <button
            type="button"
            className="rounded-md border border-white/20 px-3 py-2 text-xs"
            onClick={() =>
              patch({
                tripInfo: [...(pkg.tripInfo || []), { id: `ti-${Date.now()}`, title: "New block", body: "" }],
              })
            }
          >
            Add block
          </button>
        </div>
      ) : null}

      {subTab === "guide" ? (
        <div className="space-y-4">
          {(pkg.whyItems || []).map((item, wi) => (
            <div key={wi} className="rounded-xl border border-white/10 p-4 space-y-2">
              <OrbitField label="Why — title">
                <input
                  className={orbitInputClass}
                  value={item.title}
                  onChange={(e) => {
                    const whyItems = [...(pkg.whyItems || [])];
                    whyItems[wi] = { ...item, title: e.target.value };
                    patch({ whyItems });
                  }}
                />
              </OrbitField>
              <OrbitField label="Why — body">
                <textarea
                  className={orbitTextareaClass}
                  value={item.body}
                  onChange={(e) => {
                    const whyItems = [...(pkg.whyItems || [])];
                    whyItems[wi] = { ...item, body: e.target.value };
                    patch({ whyItems });
                  }}
                />
              </OrbitField>
            </div>
          ))}
          <button
            type="button"
            className="rounded-md border border-white/20 px-3 py-2 text-xs"
            onClick={() => patch({ whyItems: [...(pkg.whyItems || []), { title: "New point", body: "" }] })}
          >
            Add why point
          </button>
          <OrbitField label="Is this trek for you?">
            <textarea className={orbitTextareaClass} value={pkg.suitableBody || ""} onChange={(e) => patch({ suitableBody: e.target.value })} />
          </OrbitField>
          <OrbitField label="Trail / region notes">
            <textarea className={orbitTextareaClass} value={pkg.khumbuBody || ""} onChange={(e) => patch({ khumbuBody: e.target.value })} />
          </OrbitField>
          <OrbitField label="Packing intro">
            <textarea className={orbitTextareaClass} value={pkg.packingIntro || ""} onChange={(e) => patch({ packingIntro: e.target.value })} />
          </OrbitField>
          {(pkg.packingGroups || []).map((group, gi) => (
            <div key={group.id} className="rounded-xl border border-white/10 p-4 space-y-2">
              <OrbitField label="Packing group title">
                <input
                  className={orbitInputClass}
                  value={group.title}
                  onChange={(e) => {
                    const packingGroups = [...(pkg.packingGroups || [])];
                    packingGroups[gi] = { ...group, title: e.target.value };
                    patch({ packingGroups });
                  }}
                />
              </OrbitField>
              <OrbitField label="Items (one per line)">
                <textarea
                  className={orbitTextareaClass}
                  value={group.items.join("\n")}
                  onChange={(e) => {
                    const packingGroups = [...(pkg.packingGroups || [])];
                    packingGroups[gi] = {
                      ...group,
                      items: e.target.value.split("\n").map((s) => s.trim()).filter(Boolean),
                    };
                    patch({ packingGroups });
                  }}
                />
              </OrbitField>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

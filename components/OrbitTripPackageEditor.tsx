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
  packageHeadings,
  packageSeoInput,
  tripPath,
  type TrekItineraryDay,
  type TrekPackage,
  type TrekVideo,
} from "@/lib/trip-packages";

const HEADING_FIELDS: {
  key: keyof TrekPackage;
  label: string;
  head: keyof ReturnType<typeof packageHeadings>;
  multiline?: boolean;
}[] = [
  { key: "aboutTitle", label: "Overview section title", head: "about" },
  { key: "whyTitle", label: "Why us section title", head: "why" },
  { key: "fitTitle", label: "Is this for you? title", head: "fit" },
  { key: "khumbuTitle", label: "Trail / region notes title", head: "khumbu" },
  { key: "mapBody", label: "Text above trip map", head: "mapBody", multiline: true },
  { key: "weatherNote", label: "Small note under weather chart", head: "weatherNote", multiline: true },
  { key: "luklaNoteTitle", label: "Special note heading (inclusions)", head: "luklaNote" },
  { key: "notesTitle", label: "Travel notes section title", head: "notes" },
  { key: "flightTitle", label: "Flights sub-heading", head: "flight" },
  { key: "bufferTitle", label: "Buffer days sub-heading", head: "buffer" },
  { key: "heliTitle", label: "Helicopter sub-heading", head: "heli" },
];

function defaultWatch(pkg: TrekPackage): TrekVideo {
  return (
    pkg.watchVideo ?? {
      id: `watch-${pkg.id}`,
      title: "Watch video",
      subtitle: pkg.title,
      duration: "",
      imageSrc: pkg.heroSrc,
      imageAlt: pkg.heroAlt || pkg.title,
      videoSrc: "",
    }
  );
}

function groupTiers(pkg: TrekPackage) {
  return pkg.groupPrices?.length
    ? pkg.groupPrices
    : [{ id: "p1", label: "Per person", priceUsd: pkg.priceUsd }];
}

type Props = {
  content: SiteContent;
  setContent: (next: SiteContent) => void;
};

type SubTab =
  | "basics"
  | "pricing"
  | "facts"
  | "headings"
  | "overview"
  | "why"
  | "video"
  | "tripinfo"
  | "itinerary"
  | "charts"
  | "includes"
  | "photos"
  | "packing"
  | "travel"
  | "faq"
  | "ratings"
  | "seo";

/** Same order as the live trek page menu (Overview → Book → … → FAQ). */
const SUB_TABS: { id: SubTab; label: string }[] = [
  { id: "basics", label: "1 · Title & URL" },
  { id: "pricing", label: "2 · Price & groups" },
  { id: "facts", label: "3 · Trip facts bar" },
  { id: "headings", label: "4 · Section titles" },
  { id: "overview", label: "5 · Overview" },
  { id: "why", label: "6 · Why & fit" },
  { id: "video", label: "7 · Videos" },
  { id: "tripinfo", label: "8 · Trip info" },
  { id: "itinerary", label: "9 · Itinerary" },
  { id: "charts", label: "10 · Map & charts" },
  { id: "includes", label: "11 · Includes" },
  { id: "photos", label: "12 · Gallery" },
  { id: "packing", label: "13 · Packing" },
  { id: "travel", label: "14 · Travel notes" },
  { id: "faq", label: "15 · FAQ" },
  { id: "ratings", label: "16 · TripAdvisor / Google" },
  { id: "seo", label: "17 · SEO" },
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
  const [subTab, setSubTab] = useState<SubTab>("basics");

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
        Full page editor for <strong className="text-white">{pkg.title}</strong> — every block on the live trek page,
        including sidebar price, group discounts, facts, videos, map, and SEO. Press{" "}
        <span className="text-gold">Save changes</span> at the top of Orbit when done.
      </p>

      <div className="flex max-h-32 flex-wrap gap-1.5 overflow-y-auto rounded-lg border border-white/10 bg-black/20 p-2">
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

      {subTab === "basics" ? (
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
              <option value="published">Published (live)</option>
              <option value="draft">Draft (hidden)</option>
            </select>
          </OrbitField>
          <OrbitField label="Country page">
            <select
              className={orbitInputClass}
              value={pkg.country}
              onChange={(e) => patch({ country: e.target.value as TrekPackage["country"] })}
            >
              <option value="nepal">Nepal</option>
              <option value="bhutan">Bhutan</option>
              <option value="tibet">Tibet</option>
              <option value="multi">Multi country</option>
            </select>
          </OrbitField>
          <OrbitField label="Homepage featured card">
            <select
              className={orbitInputClass}
              value={pkg.featured ? "yes" : "no"}
              onChange={(e) => patch({ featured: e.target.value === "yes" })}
            >
              <option value="yes">Show on homepage</option>
              <option value="no">Catalog only</option>
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
          <OrbitField label="Duration label (facts + hero)">
            <input className={orbitInputClass} value={pkg.duration} onChange={(e) => patch({ duration: e.target.value })} />
          </OrbitField>
          <OrbitField label="Destination line (under title)">
            <input className={orbitInputClass} value={pkg.destination} onChange={(e) => patch({ destination: e.target.value })} />
          </OrbitField>
        </div>
      ) : null}

      {subTab === "pricing" ? (
        <div className="space-y-5">
          <p className="text-sm text-white/55">
            Sidebar &quot;Book now&quot; box — main price and group discount table (0 = &quot;On request&quot;).
          </p>
          <OrbitField label="Main price USD per person">
            <input
              type="number"
              min={0}
              className={orbitInputClass}
              value={pkg.priceUsd}
              onChange={(e) => patch({ priceUsd: Math.max(0, Number(e.target.value) || 0) })}
            />
          </OrbitField>
          <div className="space-y-3">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-white/50">Group booking discounts</p>
            {groupTiers(pkg).map((row, index) => (
              <div key={row.id} className="grid gap-2 rounded-xl border border-white/10 p-3 lg:grid-cols-[1fr_140px_auto]">
                <input
                  className={orbitInputClass}
                  placeholder="e.g. 2–3 Pax"
                  value={row.label}
                  onChange={(e) => {
                    const groupPrices = groupTiers(pkg).map((item, i) =>
                      i === index ? { ...item, label: e.target.value } : item,
                    );
                    patch({ groupPrices });
                  }}
                />
                <input
                  type="number"
                  min={0}
                  className={orbitInputClass}
                  placeholder="USD"
                  value={row.priceUsd}
                  onChange={(e) => {
                    const groupPrices = groupTiers(pkg).map((item, i) =>
                      i === index ? { ...item, priceUsd: Math.max(0, Number(e.target.value) || 0) } : item,
                    );
                    patch({ groupPrices });
                  }}
                />
                <button
                  type="button"
                  className="rounded-md border border-red-400/30 px-2 py-1 text-xs text-red-200"
                  onClick={() => patch({ groupPrices: groupTiers(pkg).filter((_, i) => i !== index) })}
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              className="rounded-md border border-gold/40 px-3 py-2 text-xs font-semibold text-gold"
              onClick={() =>
                patch({
                  groupPrices: [
                    ...groupTiers(pkg),
                    { id: `p-${Date.now()}`, label: "4–6 Pax", priceUsd: pkg.priceUsd },
                  ],
                })
              }
            >
              Add group tier
            </button>
          </div>
        </div>
      ) : null}

      {subTab === "facts" ? (
        <div className="grid gap-4 lg:grid-cols-2">
          <OrbitField label="Country (facts grid)">
            <input className={orbitInputClass} value={pkg.countryLabel || ""} onChange={(e) => patch({ countryLabel: e.target.value })} />
          </OrbitField>
          <OrbitField label="Activity">
            <input className={orbitInputClass} value={pkg.activityLabel || ""} onChange={(e) => patch({ activityLabel: e.target.value })} />
          </OrbitField>
          <OrbitField label="Max altitude (facts)">
            <input className={orbitInputClass} value={pkg.maxAltitude} onChange={(e) => patch({ maxAltitude: e.target.value })} />
          </OrbitField>
          <OrbitField label="Max altitude (feet label, optional)">
            <input className={orbitInputClass} value={pkg.maxAltitudeFt || ""} onChange={(e) => patch({ maxAltitudeFt: e.target.value })} />
          </OrbitField>
          <OrbitField label="Best season">
            <input className={orbitInputClass} value={pkg.bestSeason} onChange={(e) => patch({ bestSeason: e.target.value })} />
          </OrbitField>
          <OrbitField label="Accommodation">
            <input
              className={orbitInputClass}
              value={pkg.accommodationLabel || ""}
              onChange={(e) => patch({ accommodationLabel: e.target.value })}
            />
          </OrbitField>
          <OrbitField label="Meals">
            <input className={orbitInputClass} value={pkg.mealsLabel || ""} onChange={(e) => patch({ mealsLabel: e.target.value })} />
          </OrbitField>
          <OrbitField label="Start / end">
            <input className={orbitInputClass} value={pkg.startEndLabel || ""} onChange={(e) => patch({ startEndLabel: e.target.value })} />
          </OrbitField>
          <OrbitField label="Group size">
            <input className={orbitInputClass} value={pkg.groupSize} onChange={(e) => patch({ groupSize: e.target.value })} />
          </OrbitField>
          <OrbitField label="Permits line">
            <input className={orbitInputClass} value={pkg.permitsLabel || ""} onChange={(e) => patch({ permitsLabel: e.target.value })} />
          </OrbitField>
          <OrbitField label="Region label">
            <input className={orbitInputClass} value={pkg.regionLabel || ""} onChange={(e) => patch({ regionLabel: e.target.value })} />
          </OrbitField>
          <OrbitField label="Start label">
            <input className={orbitInputClass} value={pkg.startLabel || ""} onChange={(e) => patch({ startLabel: e.target.value })} />
          </OrbitField>
        </div>
      ) : null}

      {subTab === "headings" ? (
        <div className="space-y-4">
          <p className="text-sm text-white/55">Custom section headings on the public page. Leave empty for defaults.</p>
          {HEADING_FIELDS.map((field) => {
            const fallback = packageHeadings({ ...pkg, [field.key]: "" })[field.head];
            const value = (pkg[field.key] as string | undefined) || "";
            return (
              <OrbitField key={field.key} label={field.label}>
                {field.multiline ? (
                  <textarea
                    className={orbitTextareaClass}
                    placeholder={fallback}
                    value={value}
                    onChange={(e) => patch({ [field.key]: e.target.value } as Partial<TrekPackage>)}
                  />
                ) : (
                  <input
                    className={orbitInputClass}
                    placeholder={fallback}
                    value={value}
                    onChange={(e) => patch({ [field.key]: e.target.value } as Partial<TrekPackage>)}
                  />
                )}
              </OrbitField>
            );
          })}
        </div>
      ) : null}

      {subTab === "overview" ? (
        <div className="space-y-4">
          <OrbitField label="Overview (main story under title)">
            <textarea
              className={`${orbitTextareaClass} min-h-[220px]`}
              value={pkg.overview}
              onChange={(e) => patch({ overview: e.target.value })}
            />
          </OrbitField>
          <OrbitField label="Highlights (one per line)">
            <textarea
              className={`${orbitTextareaClass} min-h-[160px]`}
              value={pkg.highlights.join("\n")}
              onChange={(e) =>
                patch({ highlights: e.target.value.split("\n").map((s) => s.trim()).filter(Boolean) })
              }
            />
          </OrbitField>
        </div>
      ) : null}

      {subTab === "why" ? (
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
              <button
                type="button"
                className="text-xs text-red-300"
                onClick={() => patch({ whyItems: (pkg.whyItems || []).filter((_, i) => i !== wi) })}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            className="rounded-md border border-white/20 px-3 py-2 text-xs"
            onClick={() => patch({ whyItems: [...(pkg.whyItems || []), { title: "New reason", body: "" }] })}
          >
            Add why point
          </button>
          <OrbitField label="Is this trek for you? (body)">
            <textarea className={orbitTextareaClass} value={pkg.suitableBody || ""} onChange={(e) => patch({ suitableBody: e.target.value })} />
          </OrbitField>
          <OrbitField label="How to train / prepare">
            <textarea className={orbitTextareaClass} value={pkg.trainingBody || ""} onChange={(e) => patch({ trainingBody: e.target.value })} />
          </OrbitField>
          <OrbitField label="Trail / region notes (Khumbu / sanctuary text)">
            <textarea className={orbitTextareaClass} value={pkg.khumbuBody || ""} onChange={(e) => patch({ khumbuBody: e.target.value })} />
          </OrbitField>
        </div>
      ) : null}

      {subTab === "video" ? (
        <div className="space-y-6">
          <div className="space-y-3 rounded-xl border border-gold/25 p-4">
            <p className="text-sm font-semibold text-gold">Watch video (main film)</p>
            <OrbitField label="Title">
              <input
                className={orbitInputClass}
                value={defaultWatch(pkg).title}
                onChange={(e) => patch({ watchVideo: { ...defaultWatch(pkg), title: e.target.value } })}
              />
            </OrbitField>
            <OrbitField label="YouTube / Vimeo / MP4 URL">
              <input
                className={orbitInputClass}
                value={defaultWatch(pkg).videoSrc}
                onChange={(e) => patch({ watchVideo: { ...defaultWatch(pkg), videoSrc: e.target.value } })}
                placeholder="https://www.youtube.com/watch?v=..."
              />
            </OrbitField>
            <OrbitField label="Duration label">
              <input
                className={orbitInputClass}
                value={defaultWatch(pkg).duration}
                onChange={(e) => patch({ watchVideo: { ...defaultWatch(pkg), duration: e.target.value } })}
              />
            </OrbitField>
            <div className="space-y-2">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-white/50">Thumbnail</p>
              {defaultWatch(pkg).imageSrc ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={defaultWatch(pkg).imageSrc} alt="" className="h-32 max-w-sm rounded-lg object-cover" />
              ) : null}
              <OrbitMediaButtons
                onPicked={async (url) => patch({ watchVideo: { ...defaultWatch(pkg), imageSrc: url } })}
              />
            </div>
          </div>
          <div className="space-y-3">
            <p className="text-sm font-semibold text-white">Video reviews</p>
            {(pkg.videoReviews || []).map((video, vi) => (
              <div key={video.id || vi} className="space-y-2 rounded-xl border border-white/10 p-4">
                <OrbitField label="Title">
                  <input
                    className={orbitInputClass}
                    value={video.title}
                    onChange={(e) => {
                      const videoReviews = [...(pkg.videoReviews || [])];
                      videoReviews[vi] = { ...video, title: e.target.value };
                      patch({ videoReviews });
                    }}
                  />
                </OrbitField>
                <OrbitField label="Video URL">
                  <input
                    className={orbitInputClass}
                    value={video.videoSrc}
                    onChange={(e) => {
                      const videoReviews = [...(pkg.videoReviews || [])];
                      videoReviews[vi] = { ...video, videoSrc: e.target.value };
                      patch({ videoReviews });
                    }}
                  />
                </OrbitField>
                <OrbitMediaButtons
                  onPicked={async (url) => {
                    const videoReviews = [...(pkg.videoReviews || [])];
                    videoReviews[vi] = { ...video, imageSrc: url };
                    patch({ videoReviews });
                  }}
                />
                <button
                  type="button"
                  className="text-xs text-red-300"
                  onClick={() => patch({ videoReviews: (pkg.videoReviews || []).filter((_, i) => i !== vi) })}
                >
                  Remove video
                </button>
              </div>
            ))}
            <button
              type="button"
              className="rounded-md border border-white/20 px-3 py-2 text-xs"
              onClick={() =>
                patch({
                  videoReviews: [
                    ...(pkg.videoReviews || []),
                    {
                      id: `vr-${Date.now()}`,
                      title: "Guest video",
                      subtitle: pkg.title,
                      duration: "03:00",
                      imageSrc: pkg.heroSrc,
                      imageAlt: pkg.title,
                      videoSrc: "",
                    },
                  ],
                })
              }
            >
              Add video review
            </button>
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
          <ChartBlock
            label="Daily weather (optional)"
            hint="Optional second weather graphic."
            value={pkg.weatherDailySrc || ""}
            onChange={(weatherDailySrc) => patch({ weatherDailySrc })}
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
          <div className="lg:col-span-2">
            <OrbitField label="Important note (under inclusions list)">
              <textarea className={orbitTextareaClass} value={pkg.includeNote || ""} onChange={(e) => patch({ includeNote: e.target.value })} />
            </OrbitField>
          </div>
          <div className="lg:col-span-2">
            <OrbitField label="Special flight / travel note (full paragraph)">
              <textarea className={orbitTextareaClass} value={pkg.luklaNote || ""} onChange={(e) => patch({ luklaNote: e.target.value })} />
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
              <button
                type="button"
                className="text-xs text-red-300"
                onClick={() => patch({ tripInfo: (pkg.tripInfo || []).filter((_, i) => i !== bi) })}
              >
                Remove block
              </button>
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

      {subTab === "packing" ? (
        <div className="space-y-4">
          <OrbitField label="Packing list intro">
            <textarea className={orbitTextareaClass} value={pkg.packingIntro || ""} onChange={(e) => patch({ packingIntro: e.target.value })} />
          </OrbitField>
          <OrbitField label="Simple packing list (one per line, if no groups)">
            <textarea
              className={orbitTextareaClass}
              value={(pkg.packingItems || []).join("\n")}
              onChange={(e) =>
                patch({ packingItems: e.target.value.split("\n").map((s) => s.trim()).filter(Boolean) })
              }
            />
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
              <button
                type="button"
                className="text-xs text-red-300"
                onClick={() => patch({ packingGroups: (pkg.packingGroups || []).filter((_, i) => i !== gi) })}
              >
                Remove group
              </button>
            </div>
          ))}
          <button
            type="button"
            className="rounded-md border border-white/20 px-3 py-2 text-xs"
            onClick={() =>
              patch({
                packingGroups: [
                  ...(pkg.packingGroups || []),
                  { id: `pg-${Date.now()}`, title: "New group", items: [] },
                ],
              })
            }
          >
            Add packing group
          </button>
        </div>
      ) : null}

      {subTab === "travel" ? (
        <div className="space-y-4">
          <p className="text-sm text-white/55">&quot;Flights&quot; section — transfers, buffer days, helicopter (titles in Section titles tab).</p>
          <OrbitField label="Flights / transfers body">
            <textarea className={orbitTextareaClass} value={pkg.flightBody || ""} onChange={(e) => patch({ flightBody: e.target.value })} />
          </OrbitField>
          <OrbitField label="Buffer days body">
            <textarea className={orbitTextareaClass} value={pkg.bufferBody || ""} onChange={(e) => patch({ bufferBody: e.target.value })} />
          </OrbitField>
          <OrbitField label="Helicopter upgrade body">
            <textarea className={orbitTextareaClass} value={pkg.heliBody || ""} onChange={(e) => patch({ heliBody: e.target.value })} />
          </OrbitField>
          <OrbitField label="Read before you book (one per line)">
            <textarea
              className={orbitTextareaClass}
              value={(pkg.beforeItems || []).join("\n")}
              onChange={(e) =>
                patch({ beforeItems: e.target.value.split("\n").map((s) => s.trim()).filter(Boolean) })
              }
            />
          </OrbitField>
        </div>
      ) : null}

      {subTab === "ratings" ? (
        <div className="grid gap-4 lg:grid-cols-2">
          <p className="lg:col-span-2 text-sm text-white/55">
            Scores under the package title on the live page. Guest review wall uses the shared Reviews tab in Orbit →
            Traveler reviews.
          </p>
          <OrbitField label="Tripadvisor label">
            <input className={orbitInputClass} value={pkg.tripadvisorLabel || ""} onChange={(e) => patch({ tripadvisorLabel: e.target.value })} />
          </OrbitField>
          <OrbitField label="Tripadvisor score">
            <input className={orbitInputClass} value={pkg.tripadvisorScore || ""} onChange={(e) => patch({ tripadvisorScore: e.target.value })} />
          </OrbitField>
          <OrbitField label="Tripadvisor review count">
            <input className={orbitInputClass} value={pkg.tripadvisorCount || ""} onChange={(e) => patch({ tripadvisorCount: e.target.value })} />
          </OrbitField>
          <OrbitField label="Tripadvisor URL">
            <input className={orbitInputClass} value={pkg.tripadvisorHref || ""} onChange={(e) => patch({ tripadvisorHref: e.target.value })} />
          </OrbitField>
          <div className="lg:col-span-2 space-y-2">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-white/50">Tripadvisor logo</p>
            {pkg.tripadvisorLogoSrc ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={pkg.tripadvisorLogoSrc} alt="" className="h-12 object-contain" />
            ) : null}
            <OrbitMediaButtons onPicked={async (url) => patch({ tripadvisorLogoSrc: url })} />
          </div>
          <OrbitField label="Google label">
            <input className={orbitInputClass} value={pkg.googleLabel || ""} onChange={(e) => patch({ googleLabel: e.target.value })} />
          </OrbitField>
          <OrbitField label="Google score">
            <input className={orbitInputClass} value={pkg.googleScore || ""} onChange={(e) => patch({ googleScore: e.target.value })} />
          </OrbitField>
          <OrbitField label="Google review count">
            <input className={orbitInputClass} value={pkg.googleCount || ""} onChange={(e) => patch({ googleCount: e.target.value })} />
          </OrbitField>
          <OrbitField label="Google URL">
            <input className={orbitInputClass} value={pkg.googleHref || ""} onChange={(e) => patch({ googleHref: e.target.value })} />
          </OrbitField>
        </div>
      ) : null}
    </div>
  );
}

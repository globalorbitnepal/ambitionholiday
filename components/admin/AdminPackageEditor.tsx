"use client";

import { useEffect, useRef, useState } from "react";
import { applyTripPackageToSiteContent } from "@/lib/trip-package-catalog-sync";
import { reconcileTripPackageForSave } from "@/lib/trip-package-save";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import AdminMediaField from "@/components/admin/AdminMediaField";
import { useAdminContent } from "@/components/admin/useAdminContent";
import {
  cleanSlugInput,
  isEbcPackage,
  packageHeadings,
  packageSeoInput,
  packageSlugProblem,
  packagesSharePage,
  withSlugHistory,
  tripPath,
  type TrekItineraryDay,
  type TrekPackage,
  type TrekReview,
} from "@/lib/trip-packages";
import { CHART_FRAMES } from "@/lib/chart-frames";
import SeoPanel, { SeoLengthHint } from "@/components/SeoPanel";

const TABS = [
  ["basics", "1 · Title & URL"],
  ["pricing", "2 · Price & groups"],
  ["facts", "3 · Trip facts"],
  ["headings", "4 · Section titles"],
  ["overview", "5 · Overview"],
  ["why", "6 · Why & fit"],
  ["video", "7 · Videos"],
  ["info", "8 · Trip info"],
  ["itinerary", "9 · Itinerary"],
  ["charts", "10 · Map & charts"],
  ["includes", "11 · Includes"],
  ["photos", "12 · Gallery"],
  ["packing", "13 · Packing"],
  ["travel", "14 · Travel notes"],
  ["faq", "15 · FAQ"],
  ["ratings", "16 · Ratings"],
  ["reviews", "17 · Reviews"],
  ["seo", "18 · SEO"],
] as const;
type TabId = (typeof TABS)[number][0];

function groupTiers(pkg: TrekPackage) {
  return pkg.groupPrices?.length ? pkg.groupPrices : [{ id: "p1", label: "Per person", priceUsd: pkg.priceUsd }];
}

const HEADING_FIELDS: { key: keyof TrekPackage; label: string; head: keyof ReturnType<typeof packageHeadings>; multiline?: boolean }[] = [
  { key: "aboutTitle", label: "Overview heading", head: "about" },
  { key: "whyTitle", label: "“Why” section heading", head: "why" },
  { key: "fitTitle", label: "Suitability heading", head: "fit" },
  { key: "khumbuTitle", label: "Trail notes heading", head: "khumbu" },
  { key: "mapBody", label: "Text above the trip map", head: "mapBody", multiline: true },
  { key: "weatherNote", label: "Small note under weather", head: "weatherNote", multiline: true },
  { key: "luklaNoteTitle", label: "Heading for the special flight note", head: "luklaNote" },
  { key: "notesTitle", label: "Travel notes section heading", head: "notes" },
  { key: "flightTitle", label: "Flight sub-heading", head: "flight" },
  { key: "bufferTitle", label: "Buffer days sub-heading", head: "buffer" },
  { key: "heliTitle", label: "Helicopter / upgrade sub-heading", head: "heli" },
];

const emptyDay = (n: number): TrekItineraryDay => ({
  id: `d${n}-${Date.now()}`,
  day: n,
  title: "",
  altitude: "",
  duration: "",
  meals: "B L D",
  stay: "",
  distance: "",
  body: "",
  imageSrc: "",
});

function blankPackageReview(platform: TrekReview["platform"], title: string): TrekReview {
  return {
    id: `rev-${Date.now()}`,
    platform,
    name: "Guest name",
    avatarSrc: "",
    avatarAlt: "",
    rating: 5,
    dateLabel: "Recently",
    meta: "1 review",
    title: "",
    body: "",
    moreLabel: "Read more",
    moreHref: "",
    trekEyebrow: "Traveled with Ambition Holidays",
    trekName: title,
  };
}

export default function AdminPackageEditor() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { content, loaded, saveMerged, busy, status } = useAdminContent();
  const [tab, setTab] = useState<TabId>("basics");
  const [pkg, setPkg] = useState<TrekPackage | null>(null);
  const baselineRef = useRef<TrekPackage | null>(null);

  useEffect(() => {
    if (!loaded) return;
    const found = content.tripPackages.find((item) => item.id === params.id);
    if (!found) {
      const fallback = content.tripPackages.find(
        (item) =>
          item.id === params.id.replace(/^trip-/, "") ||
          packagesSharePage(item, { id: params.id, catalogId: params.id.replace(/^trip-/, ""), slug: "" }),
      );
      if (fallback) {
        router.replace(`/admin/packages/${fallback.id}`);
        return;
      }
      setPkg(null);
      baselineRef.current = null;
      return;
    }
    setPkg((cur) => {
      if (cur && cur.id === found.id) return cur;
      baselineRef.current = structuredClone(found);
      return { ...found };
    });
    if (!baselineRef.current || baselineRef.current.id !== found.id) {
      baselineRef.current = structuredClone(found);
    }
  }, [loaded, params.id, content.tripPackages, router]);

  function defaultWatch(cur: TrekPackage) {
    return (
      cur.watchVideo ?? {
        id: `watch-${cur.id}`,
        title: "Watch video",
        subtitle: cur.title,
        duration: "",
        imageSrc: cur.heroSrc,
        imageAlt: cur.heroAlt || cur.title,
        videoSrc: "",
      }
    );
  }

  if (!loaded) return <p>Loading editor…</p>;
  if (!pkg) return <p>Package not found.</p>;

  function patch(partial: Partial<TrekPackage>) {
    setPkg((cur) => (cur ? { ...cur, ...partial } : cur));
  }

  async function onSave(publish = false) {
    if (!pkg) return;
    const slug = pkg.slug.replace(/-+$/, "");
    const problem = packageSlugProblem(slug, content.tripPackages, pkg.id);
    if (problem) {
      setTab("basics");
      window.alert(problem);
      return;
    }
    if (!pkg.title.trim()) {
      setTab("basics");
      window.alert("Add a package title.");
      return;
    }
    const local: TrekPackage = withSlugHistory(
      {
        ...pkg,
        slug,
        groupPrices: groupTiers(pkg),
        status: publish ? "published" : pkg.status,
        updatedAt: new Date().toISOString(),
      },
      baselineRef.current,
    );
    const oldPaths = new Set([tripPath(local), baselineRef.current ? tripPath(baselineRef.current) : ""].filter(Boolean));
    let pkgToSave = local;
    const ok = await saveMerged((latest) => {
      const serverPkg = latest.tripPackages.find((item) => item.id === local.id);
      pkgToSave = serverPkg ? reconcileTripPackageForSave(serverPkg, local, baselineRef.current) : local;
      const withPkg: typeof latest = {
        ...latest,
        tripPackages: serverPkg
          ? latest.tripPackages.map((item) => (item.id === pkgToSave.id ? pkgToSave : item))
          : [...latest.tripPackages, pkgToSave],
      };
      return applyTripPackageToSiteContent(withPkg, pkgToSave, oldPaths);
    });
    if (ok) {
      setPkg(pkgToSave);
      baselineRef.current = structuredClone(pkgToSave);
      router.refresh();
    }
  }

  return (
    <>
      <p className="admin-lead" style={{ marginBottom: 4 }}>
        <Link href="/admin/packages">← All packages</Link>
      </p>
      <div className="admin-editor-head">
        <div>
          <h1>{pkg.title || "Untitled package"}</h1>
          <p className="admin-lead admin-row-actions">
            <span className={`admin-badge admin-badge--${pkg.status === "published" ? "good" : "draft"}`}>{pkg.status}</span>
            <span className="admin-permalink">{tripPath(pkg)}</span>
            {pkg.status === "published" ? (
              <a href={tripPath(pkg)} target="_blank" rel="noreferrer">
                View live ↗
              </a>
            ) : (
              <span>Draft — publish to show this page on the website.</span>
            )}
          </p>
        </div>
        <div className="admin-sticky-save">
          {status ? <span className={status.startsWith("Live") || status === "Saved" ? "admin-ok" : "admin-error"}>{status}</span> : null}
          {pkg.status !== "published" ? (
            <button type="button" className="admin-btn admin-btn-ghost" disabled={busy} onClick={() => void onSave(false)}>
              Save draft
            </button>
          ) : null}
          <button type="button" className="admin-btn admin-btn-gold" disabled={busy} onClick={() => void onSave(true)}>
            {busy ? "Updating…" : "Save & update live"}
          </button>
        </div>
      </div>
      <div className="admin-tabs admin-tabs--sections">
        {TABS.map(([id, label]) => (
          <button key={id} type="button" className={tab === id ? "on" : ""} onClick={() => setTab(id)}>
            {label}
          </button>
        ))}
      </div>

      {tab === "basics" ? (
        <div className="admin-card">
          <label className="admin-field">
            <span>Package title</span>
            <input value={pkg.title} onChange={(e) => patch({ title: e.target.value })} />
          </label>
          <label className="admin-field">
            <span>URL slug (live page is /{pkg.slug})</span>
            <input value={pkg.slug} onChange={(e) => patch({ slug: cleanSlugInput(e.target.value) })} />
            {(() => {
              const problem = packageSlugProblem(pkg.slug.replace(/-+$/, ""), content.tripPackages, pkg.id);
              return problem ? <small className="admin-warn">{problem}</small> : null;
            })()}
          </label>
          <div className="admin-grid-3">
            <label className="admin-field">
              <span>Country page</span>
              <select value={pkg.country} onChange={(e) => patch({ country: e.target.value as TrekPackage["country"] })}>
                <option value="nepal">Nepal</option>
                <option value="bhutan">Bhutan</option>
                <option value="tibet">Tibet</option>
                <option value="multi">Multi country</option>
              </select>
            </label>
            <label className="admin-field">
              <span>Status</span>
              <select value={pkg.status} onChange={(e) => patch({ status: e.target.value as TrekPackage["status"] })}>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </label>
            <label className="admin-field">
              <span>Homepage / header card</span>
              <select value={pkg.featured ? "yes" : "no"} onChange={(e) => patch({ featured: e.target.value === "yes" })}>
                <option value="yes">Show on homepage</option>
                <option value="no">Catalog only</option>
              </select>
            </label>
          </div>
          <label className="admin-field">
            <span>Short card text</span>
            <textarea value={pkg.subtitle} onChange={(e) => patch({ subtitle: e.target.value })} />
          </label>
          <div className="admin-grid-3">
            <label className="admin-field">
              <span>Destination line (under title)</span>
              <input value={pkg.destination} onChange={(e) => patch({ destination: e.target.value })} />
            </label>
            <label className="admin-field">
              <span>Duration label</span>
              <input value={pkg.duration} onChange={(e) => patch({ duration: e.target.value })} />
            </label>
            <label className="admin-field">
              <span>Days (number)</span>
              <input type="number" value={pkg.days} onChange={(e) => patch({ days: Number(e.target.value) || 0 })} />
            </label>
            <label className="admin-field">
              <span>Difficulty</span>
              <input value={pkg.difficulty} onChange={(e) => patch({ difficulty: e.target.value })} />
            </label>
            <label className="admin-field">
              <span>Badge</span>
              <input value={pkg.badge} onChange={(e) => patch({ badge: e.target.value })} />
            </label>
          </div>
        </div>
      ) : null}

      {tab === "pricing" ? (
        <div className="admin-card">
          <p className="admin-muted">Guests see this on the Book now box. Change the main price and every matching group row, then press Save &amp; update live.</p>
          <label className="admin-field">
            <span>Main price USD per person</span>
            <input
              type="number"
              min={0}
              value={pkg.priceUsd}
              onChange={(e) => {
                const priceUsd = Math.max(0, Number(e.target.value) || 0);
                const prev = pkg.priceUsd;
                const groupPrices = groupTiers(pkg).map((item) =>
                  item.priceUsd === prev ? { ...item, priceUsd } : item,
                );
                patch({ priceUsd, groupPrices });
              }}
            />
          </label>
          <p className="admin-side-group-label" style={{ margin: "12px 0 8px", color: "#344054" }}>Group booking discounts</p>
          {groupTiers(pkg).map((row, index) => (
            <div key={row.id} className="admin-pricing-row">
              <input
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
                className="admin-btn admin-btn-sm admin-btn-danger"
                onClick={() => patch({ groupPrices: groupTiers(pkg).filter((_, i) => i !== index) })}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            className="admin-btn admin-btn-ghost admin-btn-sm"
            onClick={() =>
              patch({
                groupPrices: [...groupTiers(pkg), { id: `p-${Date.now()}`, label: "4–6 Pax", priceUsd: pkg.priceUsd }],
              })
            }
          >
            Add group tier
          </button>
        </div>
      ) : null}

      {tab === "facts" ? (
        <div className="admin-card">
          <p className="admin-muted">Gold info bar and trip facts grid on the live page.</p>
          <div className="admin-grid-3">
            <label className="admin-field">
              <span>Country (facts grid)</span>
              <input value={pkg.countryLabel || ""} onChange={(e) => patch({ countryLabel: e.target.value })} />
            </label>
            <label className="admin-field">
              <span>Activity</span>
              <input value={pkg.activityLabel || ""} onChange={(e) => patch({ activityLabel: e.target.value })} />
            </label>
            <label className="admin-field">
              <span>Best season</span>
              <input value={pkg.bestSeason} onChange={(e) => patch({ bestSeason: e.target.value })} />
            </label>
            <label className="admin-field">
              <span>Accommodation</span>
              <input value={pkg.accommodationLabel || ""} onChange={(e) => patch({ accommodationLabel: e.target.value })} />
            </label>
            <label className="admin-field">
              <span>Meals</span>
              <input value={pkg.mealsLabel || ""} onChange={(e) => patch({ mealsLabel: e.target.value })} />
            </label>
            <label className="admin-field">
              <span>Start / end</span>
              <input value={pkg.startEndLabel || ""} onChange={(e) => patch({ startEndLabel: e.target.value })} />
            </label>
            <label className="admin-field">
              <span>Max altitude (metres label)</span>
              <input value={pkg.maxAltitude} onChange={(e) => patch({ maxAltitude: e.target.value })} />
            </label>
            <label className="admin-field">
              <span>Max altitude (feet label)</span>
              <input value={pkg.maxAltitudeFt || ""} onChange={(e) => patch({ maxAltitudeFt: e.target.value })} />
            </label>
          </div>
        </div>
      ) : null}

      {tab === "overview" ? (
        <div className="admin-card">
          <label className="admin-field">
            <span>Overview (main story)</span>
            <textarea style={{ minHeight: 160 }} value={pkg.overview} onChange={(e) => patch({ overview: e.target.value })} />
          </label>
          <label className="admin-field">
            <span>Highlights (one per line)</span>
            <textarea
              value={pkg.highlights.join("\n")}
              onChange={(e) => patch({ highlights: e.target.value.split("\n").map((s) => s.trim()).filter(Boolean) })}
            />
          </label>
        </div>
      ) : null}

      {tab === "includes" ? (
        <div className="admin-card">
          <div className="admin-grid-2" style={{ gridTemplateColumns: "1fr 1fr" }}>
            <label className="admin-field">
              <span>Inclusions (one per line)</span>
              <textarea
                style={{ minHeight: 200 }}
                value={pkg.inclusions.join("\n")}
                onChange={(e) => patch({ inclusions: e.target.value.split("\n").map((s) => s.trim()).filter(Boolean) })}
              />
            </label>
            <label className="admin-field">
              <span>Exclusions (one per line)</span>
              <textarea
                style={{ minHeight: 200 }}
                value={pkg.exclusions.join("\n")}
                onChange={(e) => patch({ exclusions: e.target.value.split("\n").map((s) => s.trim()).filter(Boolean) })}
              />
            </label>
          </div>
          <label className="admin-field">
            <span>Optional add-ons (one per line)</span>
            <textarea
              value={(pkg.optionalAddons || []).join("\n")}
              onChange={(e) => patch({ optionalAddons: e.target.value.split("\n").map((s) => s.trim()).filter(Boolean) })}
            />
          </label>
          <label className="admin-field">
            <span>Important note under inclusions</span>
            <textarea value={pkg.includeNote || ""} onChange={(e) => patch({ includeNote: e.target.value })} />
          </label>
          <label className="admin-field">
            <span>Special flight / travel note (full paragraph)</span>
            <textarea value={pkg.luklaNote || ""} onChange={(e) => patch({ luklaNote: e.target.value })} />
          </label>
        </div>
      ) : null}

      {tab === "itinerary" ? (
        <div className="admin-card">
          <label className="admin-field">
            <span>Itinerary intro</span>
            <textarea value={pkg.itineraryIntro} onChange={(e) => patch({ itineraryIntro: e.target.value })} />
          </label>
          {pkg.itinerary.map((day, index) => (
            <div key={day.id} className="admin-day">
              <strong>Day {day.day}</strong>
              <label className="admin-field">
                <span>Title</span>
                <input
                  value={day.title}
                  onChange={(e) =>
                    patch({
                      itinerary: pkg.itinerary.map((item, i) =>
                        i === index ? { ...item, title: e.target.value } : item,
                      ),
                    })
                  }
                />
              </label>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                <input
                  value={day.altitude}
                  placeholder="Altitude"
                  onChange={(e) =>
                    patch({
                      itinerary: pkg.itinerary.map((item, i) =>
                        i === index ? { ...item, altitude: e.target.value } : item,
                      ),
                    })
                  }
                />
                <input
                  value={day.duration}
                  placeholder="Duration"
                  onChange={(e) =>
                    patch({
                      itinerary: pkg.itinerary.map((item, i) =>
                        i === index ? { ...item, duration: e.target.value } : item,
                      ),
                    })
                  }
                />
                <input
                  value={day.meals}
                  placeholder="Meals"
                  onChange={(e) =>
                    patch({
                      itinerary: pkg.itinerary.map((item, i) =>
                        i === index ? { ...item, meals: e.target.value } : item,
                      ),
                    })
                  }
                />
                <input
                  value={day.stay}
                  placeholder="Stay"
                  onChange={(e) =>
                    patch({
                      itinerary: pkg.itinerary.map((item, i) =>
                        i === index ? { ...item, stay: e.target.value } : item,
                      ),
                    })
                  }
                />
                <input
                  value={day.distance || ""}
                  placeholder="Distance (e.g. 17.7 km / 11 mi)"
                  onChange={(e) =>
                    patch({
                      itinerary: pkg.itinerary.map((item, i) =>
                        i === index ? { ...item, distance: e.target.value } : item,
                      ),
                    })
                  }
                />
              </div>
              <textarea
                style={{ marginTop: 8 }}
                value={day.body}
                onChange={(e) =>
                  patch({
                    itinerary: pkg.itinerary.map((item, i) =>
                      i === index ? { ...item, body: e.target.value } : item,
                    ),
                  })
                }
              />
              <AdminMediaField
                label={`Day ${day.day} image`}
                value={day.imageSrc || ""}
                onChange={(imageSrc) =>
                  patch({
                    itinerary: pkg.itinerary.map((item, i) =>
                      i === index ? { ...item, imageSrc } : item,
                    ),
                  })
                }
              />
              <label className="admin-field">
                <span>Day {day.day} image alt text</span>
                <input
                  value={day.imageAlt || ""}
                  onChange={(e) =>
                    patch({
                      itinerary: pkg.itinerary.map((item, i) =>
                        i === index ? { ...item, imageAlt: e.target.value } : item,
                      ),
                    })
                  }
                />
              </label>
              <button
                type="button"
                className="admin-btn admin-btn-ghost"
                onClick={() => patch({ itinerary: pkg.itinerary.filter((_, i) => i !== index) })}
              >
                Remove day
              </button>
            </div>
          ))}
          <button
            type="button"
            className="admin-btn admin-btn-ghost"
            onClick={() => patch({ itinerary: [...pkg.itinerary, emptyDay(pkg.itinerary.length + 1)] })}
          >
            Add day
          </button>
        </div>
      ) : null}

      {tab === "photos" ? (
        <div className="admin-card">
          <AdminMediaField label="Cover / hero image" value={pkg.heroSrc} onChange={(heroSrc) => patch({ heroSrc, heroAlt: pkg.heroAlt || pkg.title })} />
          <label className="admin-field">
            <span>Hero alt text</span>
            <input value={pkg.heroAlt} onChange={(e) => patch({ heroAlt: e.target.value })} />
          </label>
          <p className="admin-lead">
            Gallery — top hero strip and Trip Gallery grid below What&apos;s included (2×4 on desktop; last tile opens all photos).
          </p>
          <label className="admin-field">
            <span>Trip Gallery section title</span>
            <input
              value={pkg.tripGalleryTitle || "Trip Gallery"}
              onChange={(e) => patch({ tripGalleryTitle: e.target.value })}
            />
          </label>
          {pkg.gallery.map((src, index) => (
            <div key={`${src}-${index}`}>
              <AdminMediaField
                label={`Trip gallery photo ${index + 1} (upload to replace)`}
                value={src}
                onChange={(next) =>
                  patch({ gallery: pkg.gallery.map((item, i) => (i === index ? next : item)) })
                }
              />
              <label className="admin-field">
                <span>Photo {index + 1} alt text</span>
                <input
                  value={pkg.galleryAlts?.[index] || ""}
                  onChange={(e) => {
                    const galleryAlts = [...(pkg.galleryAlts || [])];
                    while (galleryAlts.length < pkg.gallery.length) galleryAlts.push("");
                    galleryAlts[index] = e.target.value;
                    patch({ galleryAlts });
                  }}
                />
              </label>
            </div>
          ))}
          <button
            type="button"
            className="admin-btn admin-btn-ghost"
            onClick={() => patch({ gallery: [...pkg.gallery, pkg.heroSrc] })}
          >
            Add gallery photo
          </button>
          {pkg.gallery.length > 1 ? (
            <button
              type="button"
              className="admin-btn admin-btn-ghost"
              onClick={() => {
                const gallery = pkg.gallery.slice(0, -1);
                const galleryAlts = (pkg.galleryAlts || []).slice(0, gallery.length);
                patch({ gallery, galleryAlts });
              }}
            >
              Remove last photo
            </button>
          ) : null}
        </div>
      ) : null}

      {tab === "charts" ? (
        <div className="admin-card">
          <p className="admin-lead">
            {isEbcPackage(pkg)
              ? "Built-in Everest graphs show until you upload a replacement. JPG and PNG only. Empty a field to restore the drawn chart."
              : "Upload this package's own map, altitude and weather graphics (JPG or PNG). A section stays hidden until it has an image or a note."}
          </p>
          <AdminMediaField
            label="Trip map (full graphic)"
            hint={`${CHART_FRAMES.map.hint} Shown full width on the trek page with a download button.`}
            accept={CHART_FRAMES.map.accept}
            fit="contain"
            value={pkg.routeMapSrc || ""}
            onChange={(routeMapSrc) => patch({ routeMapSrc })}
          />
          <AdminMediaField
            label="Altitude chart — metres"
            hint={CHART_FRAMES.altitude.hint}
            accept={CHART_FRAMES.altitude.accept}
            fit="contain"
            value={pkg.altitudeChartM || ""}
            onChange={(altitudeChartM) => patch({ altitudeChartM })}
          />
          <AdminMediaField
            label="Altitude chart — feet"
            hint="Same size as metres: 1960 × 1040 px · JPG or PNG · under 900 KB."
            accept={CHART_FRAMES.altitude.accept}
            fit="contain"
            value={pkg.altitudeChartFt || ""}
            onChange={(altitudeChartFt) => patch({ altitudeChartFt })}
          />
          <AdminMediaField
            label="Monthly weather replacement"
            hint={CHART_FRAMES.weather.hint}
            accept={CHART_FRAMES.weather.accept}
            fit="contain"
            value={pkg.weatherMonthlySrc || ""}
            onChange={(weatherMonthlySrc) => patch({ weatherMonthlySrc })}
          />
          <AdminMediaField
            label="Daily weather (optional)"
            hint="Optional second weather graphic."
            accept={CHART_FRAMES.weather.accept}
            fit="contain"
            value={pkg.weatherDailySrc || ""}
            onChange={(weatherDailySrc) => patch({ weatherDailySrc })}
          />
          <label className="admin-field">
            <span>Altitude section note</span>
            <textarea value={pkg.altitudeBody || ""} onChange={(e) => patch({ altitudeBody: e.target.value })} />
          </label>
          <label className="admin-field">
            <span>Weather section note</span>
            <textarea value={pkg.weatherBody || ""} onChange={(e) => patch({ weatherBody: e.target.value })} />
          </label>
        </div>
      ) : null}

      {tab === "why" ? (
        <div className="admin-card">
          <p className="admin-muted">Why Ambition, suitability and trail notes — matches the live page menu.</p>
          {(pkg.whyItems || []).map((item, wi) => (
            <div key={`${item.title}-${wi}`} className="admin-day">
              <label className="admin-field">
                <span>Why — title</span>
                <input
                  value={item.title}
                  onChange={(e) => {
                    const whyItems = [...(pkg.whyItems || [])];
                    whyItems[wi] = { ...item, title: e.target.value };
                    patch({ whyItems });
                  }}
                />
              </label>
              <label className="admin-field">
                <span>Why — body</span>
                <textarea
                  value={item.body}
                  onChange={(e) => {
                    const whyItems = [...(pkg.whyItems || [])];
                    whyItems[wi] = { ...item, body: e.target.value };
                    patch({ whyItems });
                  }}
                />
              </label>
              <button type="button" className="admin-btn admin-btn-ghost admin-btn-sm" onClick={() => patch({ whyItems: (pkg.whyItems || []).filter((_, i) => i !== wi) })}>
                Remove
              </button>
            </div>
          ))}
          <button type="button" className="admin-btn admin-btn-ghost admin-btn-sm" onClick={() => patch({ whyItems: [...(pkg.whyItems || []), { title: "New reason", body: "" }] })}>
            Add why point
          </button>
          <label className="admin-field">
            <span>Is this trek for you</span>
            <textarea value={pkg.suitableBody || ""} onChange={(e) => patch({ suitableBody: e.target.value })} />
          </label>
          <label className="admin-field">
            <span>How to train / prepare</span>
            <textarea value={pkg.trainingBody || ""} onChange={(e) => patch({ trainingBody: e.target.value })} />
          </label>
          <label className="admin-field">
            <span>Trail / region notes</span>
            <textarea value={pkg.khumbuBody || ""} onChange={(e) => patch({ khumbuBody: e.target.value })} />
          </label>
        </div>
      ) : null}

      {tab === "packing" ? (
        <div className="admin-card">
          <label className="admin-field">
            <span>Packing intro</span>
            <textarea value={pkg.packingIntro || ""} onChange={(e) => patch({ packingIntro: e.target.value })} />
          </label>
          <label className="admin-field">
            <span>Simple packing list (one per line, if no groups)</span>
            <textarea
              value={(pkg.packingItems || []).join("\n")}
              onChange={(e) =>
                patch({ packingItems: e.target.value.split("\n").map((s) => s.trim()).filter(Boolean) })
              }
            />
          </label>
          {(pkg.packingGroups || []).map((group, gi) => (
            <div key={group.id} className="admin-day">
              <label className="admin-field">
                <span>Packing group title</span>
                <input
                  value={group.title}
                  onChange={(e) => {
                    const packingGroups = [...(pkg.packingGroups || [])];
                    packingGroups[gi] = { ...group, title: e.target.value };
                    patch({ packingGroups });
                  }}
                />
              </label>
              <label className="admin-field">
                <span>Items (one per line)</span>
                <textarea
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
              </label>
              <button type="button" className="admin-btn admin-btn-ghost admin-btn-sm" onClick={() => patch({ packingGroups: (pkg.packingGroups || []).filter((_, i) => i !== gi) })}>
                Remove group
              </button>
            </div>
          ))}
          <button
            type="button"
            className="admin-btn admin-btn-ghost admin-btn-sm"
            onClick={() =>
              patch({
                packingGroups: [...(pkg.packingGroups || []), { id: `pg-${Date.now()}`, title: "New group", items: [] }],
              })
            }
          >
            Add packing group
          </button>
        </div>
      ) : null}

      {tab === "travel" ? (
        <div className="admin-card">
          <p className="admin-muted">Flights &amp; travel notes section — sub-headings are in section titles tab.</p>
          <label className="admin-field">
            <span>Flights / transfers body</span>
            <textarea value={pkg.flightBody || ""} onChange={(e) => patch({ flightBody: e.target.value })} />
          </label>
          <label className="admin-field">
            <span>Buffer days body</span>
            <textarea value={pkg.bufferBody || ""} onChange={(e) => patch({ bufferBody: e.target.value })} />
          </label>
          <label className="admin-field">
            <span>Helicopter upgrade body</span>
            <textarea value={pkg.heliBody || ""} onChange={(e) => patch({ heliBody: e.target.value })} />
          </label>
          <label className="admin-field">
            <span>Read before you book (one per line)</span>
            <textarea
              value={(pkg.beforeItems || []).join("\n")}
              onChange={(e) =>
                patch({ beforeItems: e.target.value.split("\n").map((s) => s.trim()).filter(Boolean) })
              }
            />
          </label>
        </div>
      ) : null}

      {tab === "ratings" ? (
        <div className="admin-card">
          <p className="admin-lead">Tripadvisor and Google badges under the package title. Edit score, count, URL and logo.</p>
          <div className="admin-grid-2">
            <label className="admin-field">
              <span>Tripadvisor label</span>
              <input value={pkg.tripadvisorLabel || ""} onChange={(e) => patch({ tripadvisorLabel: e.target.value })} />
            </label>
            <label className="admin-field">
              <span>Tripadvisor score</span>
              <input value={pkg.tripadvisorScore || ""} onChange={(e) => patch({ tripadvisorScore: e.target.value })} />
            </label>
            <label className="admin-field">
              <span>Tripadvisor review count</span>
              <input value={pkg.tripadvisorCount || ""} onChange={(e) => patch({ tripadvisorCount: e.target.value })} />
            </label>
            <label className="admin-field">
              <span>Tripadvisor URL</span>
              <input value={pkg.tripadvisorHref || ""} onChange={(e) => patch({ tripadvisorHref: e.target.value })} />
            </label>
            <label className="admin-field">
              <span>Google label</span>
              <input value={pkg.googleLabel || ""} onChange={(e) => patch({ googleLabel: e.target.value })} />
            </label>
            <label className="admin-field">
              <span>Google score</span>
              <input value={pkg.googleScore || ""} onChange={(e) => patch({ googleScore: e.target.value })} />
            </label>
            <label className="admin-field">
              <span>Google review count</span>
              <input value={pkg.googleCount || ""} onChange={(e) => patch({ googleCount: e.target.value })} />
            </label>
            <label className="admin-field">
              <span>Google URL</span>
              <input value={pkg.googleHref || ""} onChange={(e) => patch({ googleHref: e.target.value })} />
            </label>
          </div>
          <AdminMediaField
            label="Tripadvisor owl / logo"
            value={pkg.tripadvisorLogoSrc || ""}
            onChange={(tripadvisorLogoSrc) => patch({ tripadvisorLogoSrc })}
          />
        </div>
      ) : null}

      {tab === "video" ? (
        <div className="admin-card">
          <p className="admin-lead">One Watch Video film, then separate Video reviews (YouTube thumbnails) — same as the homepage journal cards.</p>
          <h2 style={{ marginTop: 8 }}>Watch Video</h2>
          <label className="admin-field">
            <span>Title</span>
            <input
              value={pkg.watchVideo?.title || ""}
              onChange={(e) => patch({ watchVideo: { ...defaultWatch(pkg), title: e.target.value } })}
            />
          </label>
          <label className="admin-field">
            <span>YouTube / Vimeo / MP4 URL</span>
            <input
              value={pkg.watchVideo?.videoSrc || ""}
              onChange={(e) => patch({ watchVideo: { ...defaultWatch(pkg), videoSrc: e.target.value } })}
            />
          </label>
          <label className="admin-field">
            <span>Duration</span>
            <input
              value={pkg.watchVideo?.duration || ""}
              onChange={(e) => patch({ watchVideo: { ...defaultWatch(pkg), duration: e.target.value } })}
            />
          </label>
          <AdminMediaField
            label="Watch Video thumbnail"
            value={pkg.watchVideo?.imageSrc || ""}
            onChange={(imageSrc) => patch({ watchVideo: { ...defaultWatch(pkg), imageSrc } })}
          />

          <h2 style={{ marginTop: 24 }}>Video reviews</h2>
          {(pkg.videoReviews || []).map((video, vi) => (
            <div key={video.id} className="admin-card" style={{ margin: "12px 0", padding: 12 }}>
              <label className="admin-field">
                <span>Title</span>
                <input
                  value={video.title}
                  onChange={(e) => {
                    const videoReviews = [...(pkg.videoReviews || [])];
                    videoReviews[vi] = { ...video, title: e.target.value };
                    patch({ videoReviews });
                  }}
                />
              </label>
              <label className="admin-field">
                <span>YouTube / video URL</span>
                <input
                  value={video.videoSrc}
                  onChange={(e) => {
                    const videoReviews = [...(pkg.videoReviews || [])];
                    videoReviews[vi] = { ...video, videoSrc: e.target.value };
                    patch({ videoReviews });
                  }}
                />
              </label>
              <AdminMediaField
                label="Thumbnail"
                value={video.imageSrc}
                onChange={(imageSrc) => {
                  const videoReviews = [...(pkg.videoReviews || [])];
                  videoReviews[vi] = { ...video, imageSrc };
                  patch({ videoReviews });
                }}
              />
              <label className="admin-field">
                <span>Duration (shown on thumbnail)</span>
                <input
                  value={video.duration || ""}
                  onChange={(e) => {
                    const videoReviews = [...(pkg.videoReviews || [])];
                    videoReviews[vi] = { ...video, duration: e.target.value };
                    patch({ videoReviews });
                  }}
                />
              </label>
              <button
                type="button"
                className="admin-btn admin-btn-sm admin-btn-danger"
                onClick={() => patch({ videoReviews: (pkg.videoReviews || []).filter((_, i) => i !== vi) })}
              >
                Remove this video
              </button>
            </div>
          ))}
          <button
            type="button"
            className="admin-btn"
            onClick={() =>
              patch({
                videoReviews: [
                  ...(pkg.videoReviews || []),
                  {
                    id: `vr-${Date.now()}`,
                    title: "New video",
                    subtitle: "Guest film",
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
      ) : null}

      {tab === "reviews" ? (
        <div className="admin-card">
          <p className="admin-lead">
            These reviews appear only on this package page. The homepage “What Our Travelers Say” block is edited separately under Reviews.
          </p>
          <AdminMediaField
            label="Reviews section wallpaper (optional)"
            value={pkg.reviewsWallpaperSrc || ""}
            onChange={(reviewsWallpaperSrc) => patch({ reviewsWallpaperSrc })}
          />
          <div style={{ display: "flex", gap: 8, margin: "12px 0", flexWrap: "wrap" }}>
            <button
              type="button"
              className="admin-btn admin-btn-ghost"
              onClick={() => patch({ reviews: [...(pkg.reviews || []), blankPackageReview("google", pkg.title)] })}
            >
              Add Google review
            </button>
            <button
              type="button"
              className="admin-btn admin-btn-ghost"
              onClick={() => patch({ reviews: [...(pkg.reviews || []), blankPackageReview("tripadvisor", pkg.title)] })}
            >
              Add Tripadvisor review
            </button>
          </div>
          {(pkg.reviews || []).map((review, index) => (
            <div key={review.id} className="admin-card" style={{ margin: "12px 0", padding: 12 }}>
              <AdminMediaField
                label="Traveler photo"
                value={review.avatarSrc || ""}
                onChange={(avatarSrc) => {
                  const reviews = [...(pkg.reviews || [])];
                  reviews[index] = { ...review, avatarSrc };
                  patch({ reviews });
                }}
              />
              <div className="admin-grid-2">
                <label className="admin-field">
                  <span>Name</span>
                  <input
                    value={review.name}
                    onChange={(e) => {
                      const reviews = [...(pkg.reviews || [])];
                      reviews[index] = { ...review, name: e.target.value };
                      patch({ reviews });
                    }}
                  />
                </label>
                <label className="admin-field">
                  <span>Platform</span>
                  <select
                    value={review.platform}
                    onChange={(e) => {
                      const reviews = [...(pkg.reviews || [])];
                      reviews[index] = { ...review, platform: e.target.value as TrekReview["platform"] };
                      patch({ reviews });
                    }}
                  >
                    <option value="google">Google</option>
                    <option value="tripadvisor">Tripadvisor</option>
                  </select>
                </label>
                <label className="admin-field">
                  <span>Meta (e.g. 12 reviews)</span>
                  <input
                    value={review.meta}
                    onChange={(e) => {
                      const reviews = [...(pkg.reviews || [])];
                      reviews[index] = { ...review, meta: e.target.value };
                      patch({ reviews });
                    }}
                  />
                </label>
                <label className="admin-field">
                  <span>Date</span>
                  <input
                    value={review.dateLabel}
                    onChange={(e) => {
                      const reviews = [...(pkg.reviews || [])];
                      reviews[index] = { ...review, dateLabel: e.target.value };
                      patch({ reviews });
                    }}
                  />
                </label>
                <label className="admin-field">
                  <span>Stars (1–5)</span>
                  <input
                    type="number"
                    min={1}
                    max={5}
                    value={review.rating}
                    onChange={(e) => {
                      const reviews = [...(pkg.reviews || [])];
                      reviews[index] = { ...review, rating: Number(e.target.value) || 5 };
                      patch({ reviews });
                    }}
                  />
                </label>
                <label className="admin-field">
                  <span>Headline (optional)</span>
                  <input
                    value={review.title}
                    onChange={(e) => {
                      const reviews = [...(pkg.reviews || [])];
                      reviews[index] = { ...review, title: e.target.value };
                      patch({ reviews });
                    }}
                  />
                </label>
                <label className="admin-field">
                  <span>Trek label</span>
                  <input
                    value={review.trekName || pkg.title}
                    onChange={(e) => {
                      const reviews = [...(pkg.reviews || [])];
                      reviews[index] = { ...review, trekName: e.target.value };
                      patch({ reviews });
                    }}
                  />
                </label>
                <label className="admin-field">
                  <span>Read more URL (optional)</span>
                  <input
                    value={review.moreHref || ""}
                    onChange={(e) => {
                      const reviews = [...(pkg.reviews || [])];
                      reviews[index] = { ...review, moreHref: e.target.value };
                      patch({ reviews });
                    }}
                  />
                </label>
              </div>
              <label className="admin-field">
                <span>Review text</span>
                <textarea
                  value={review.body}
                  onChange={(e) => {
                    const reviews = [...(pkg.reviews || [])];
                    reviews[index] = { ...review, body: e.target.value };
                    patch({ reviews });
                  }}
                />
              </label>
              <button
                type="button"
                className="admin-btn"
                onClick={() => patch({ reviews: (pkg.reviews || []).filter((_, i) => i !== index) })}
              >
                Remove review
              </button>
            </div>
          ))}
        </div>
      ) : null}

      {tab === "info" ? (
        <div className="admin-card">
          <p className="admin-lead">Trip information blocks on the public page. Add, rewrite or remove any heading.</p>
          <label className="admin-field">
            <span>Section title</span>
            <input value={pkg.tripInfoTitle || ""} onChange={(e) => patch({ tripInfoTitle: e.target.value })} />
          </label>
          {(pkg.tripInfo || []).map((block, bi) => (
            <div key={block.id} className="admin-card" style={{ margin: "12px 0", padding: 12 }}>
              <label className="admin-field">
                <span>Heading</span>
                <input
                  value={block.title}
                  onChange={(e) => {
                    const tripInfo = [...(pkg.tripInfo || [])];
                    tripInfo[bi] = { ...block, title: e.target.value };
                    patch({ tripInfo });
                  }}
                />
              </label>
              <label className="admin-field">
                <span>Body</span>
                <textarea
                  value={block.body}
                  onChange={(e) => {
                    const tripInfo = [...(pkg.tripInfo || [])];
                    tripInfo[bi] = { ...block, body: e.target.value };
                    patch({ tripInfo });
                  }}
                />
              </label>
              <button type="button" className="admin-btn" onClick={() => patch({ tripInfo: (pkg.tripInfo || []).filter((_, i) => i !== bi) })}>
                Remove block
              </button>
            </div>
          ))}
          <button
            type="button"
            className="admin-btn"
            onClick={() =>
              patch({
                tripInfo: [...(pkg.tripInfo || []), { id: `ti-${Date.now()}`, title: "New heading", body: "" }],
              })
            }
          >
            Add information block
          </button>
        </div>
      ) : null}

      {tab === "headings" ? (
        <div className="admin-card">
          <p className="admin-lead">
            Section headings on the public page. Leave a field empty to use the default shown in grey.
          </p>
          {HEADING_FIELDS.map((field) => {
            const fallback = packageHeadings({ ...pkg, [field.key]: "" })[field.head];
            const value = (pkg[field.key] as string | undefined) || "";
            return (
              <label key={field.key} className="admin-field">
                <span>{field.label}</span>
                {field.multiline ? (
                  <textarea value={value} placeholder={fallback} onChange={(e) => patch({ [field.key]: e.target.value } as Partial<TrekPackage>)} />
                ) : (
                  <input value={value} placeholder={fallback} onChange={(e) => patch({ [field.key]: e.target.value } as Partial<TrekPackage>)} />
                )}
              </label>
            );
          })}
        </div>
      ) : null}

      {tab === "faq" ? (
        <div className="admin-card">
          <p className="admin-lead">Questions shown in the FAQ section. The section is hidden when the list is empty.</p>
          {(pkg.faqs || []).map((faq, fi) => (
            <div key={fi} className="admin-card" style={{ margin: "12px 0", padding: 12 }}>
              <label className="admin-field">
                <span>Question {fi + 1}</span>
                <input
                  value={faq.q}
                  onChange={(e) => patch({ faqs: pkg.faqs.map((item, i) => (i === fi ? { ...item, q: e.target.value } : item)) })}
                />
              </label>
              <label className="admin-field">
                <span>Answer</span>
                <textarea
                  value={faq.a}
                  onChange={(e) => patch({ faqs: pkg.faqs.map((item, i) => (i === fi ? { ...item, a: e.target.value } : item)) })}
                />
              </label>
              <div className="admin-row-actions">
                <button
                  type="button"
                  className="admin-btn admin-btn-sm"
                  disabled={fi === 0}
                  onClick={() => {
                    const faqs = [...pkg.faqs];
                    [faqs[fi - 1], faqs[fi]] = [faqs[fi], faqs[fi - 1]];
                    patch({ faqs });
                  }}
                >
                  Move up
                </button>
                <button
                  type="button"
                  className="admin-btn admin-btn-sm admin-btn-danger"
                  onClick={() => patch({ faqs: pkg.faqs.filter((_, i) => i !== fi) })}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <button type="button" className="admin-btn" onClick={() => patch({ faqs: [...(pkg.faqs || []), { q: "", a: "" }] })}>
            Add question
          </button>
        </div>
      ) : null}

      {tab === "seo" ? (
        <div className="admin-editor">
          <div className="admin-card">
            <label className="admin-field">
              <span>Focus keyword</span>
              <input
                value={pkg.focusKeyword || ""}
                placeholder="e.g. luxury everest base camp trek"
                onChange={(e) => patch({ focusKeyword: e.target.value })}
              />
            </label>
            <label className="admin-field">
              <span>SEO title</span>
              <input value={pkg.metaTitle} placeholder={pkg.title} onChange={(e) => patch({ metaTitle: e.target.value })} />
              <SeoLengthHint value={pkg.metaTitle || pkg.title} kind="title" />
            </label>
            <label className="admin-field">
              <span>Meta description</span>
              <textarea value={pkg.metaDescription} placeholder={pkg.subtitle} onChange={(e) => patch({ metaDescription: e.target.value })} />
              <SeoLengthHint value={pkg.metaDescription || pkg.subtitle} kind="description" />
            </label>
            <label className="admin-field">
              <span>Meta keywords (comma separated)</span>
              <input value={pkg.metaKeywords} onChange={(e) => patch({ metaKeywords: e.target.value })} />
            </label>
            <h2 style={{ marginTop: 20 }}>Social sharing (Facebook, WhatsApp, X)</h2>
            <label className="admin-field">
              <span>OG title</span>
              <input value={pkg.ogTitle || ""} placeholder={pkg.metaTitle || pkg.title} onChange={(e) => patch({ ogTitle: e.target.value })} />
            </label>
            <label className="admin-field">
              <span>OG description</span>
              <textarea
                value={pkg.ogDescription || ""}
                placeholder={pkg.metaDescription || pkg.subtitle}
                onChange={(e) => patch({ ogDescription: e.target.value })}
              />
            </label>
            <AdminMediaField
              label="OG share image (1200 × 630 recommended — empty uses the hero image)"
              value={pkg.ogImageSrc || ""}
              clearLabel="Use hero image"
              onChange={(ogImageSrc) => patch({ ogImageSrc })}
            />
            <label className="admin-check">
              <input type="checkbox" checked={Boolean(pkg.noindex)} onChange={(e) => patch({ noindex: e.target.checked })} />
              <span>Hide from Google (noindex)</span>
            </label>
          </div>
          <div className="admin-editor-side">
            <SeoPanel
              input={packageSeoInput(pkg)}
              path={tripPath(pkg)}
              ogTitle={pkg.ogTitle}
              ogDescription={pkg.ogDescription}
              ogImageSrc={pkg.ogImageSrc || pkg.heroSrc}
            />
          </div>
        </div>
      ) : null}

      <div className="admin-sticky-save admin-sticky-save--bottom">
        {status ? <span className={status.startsWith("Live") || status === "Saved" ? "admin-ok" : "admin-error"}>{status}</span> : null}
        {pkg.status !== "published" ? (
          <button type="button" className="admin-btn admin-btn-ghost" disabled={busy} onClick={() => void onSave(false)}>
            Save draft
          </button>
        ) : null}
        <button type="button" className="admin-btn admin-btn-gold" disabled={busy} onClick={() => void onSave(true)}>
          {busy ? "Updating…" : "Save & update live"}
        </button>
      </div>
    </>
  );
}

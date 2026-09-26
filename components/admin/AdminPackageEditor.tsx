"use client";

import { useEffect, useRef, useState } from "react";
import { reconcileTripPackageForSave } from "@/lib/trip-package-save";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import AdminMediaField from "@/components/admin/AdminMediaField";
import { useAdminContent } from "@/components/admin/useAdminContent";
import { tripPath, type TrekItineraryDay, type TrekPackage } from "@/lib/trip-packages";
import { CHART_FRAMES } from "@/lib/chart-frames";

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

export default function AdminPackageEditor() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { content, loaded, save, busy, status } = useAdminContent();
  const [tab, setTab] = useState<
    "basic" | "ratings" | "itinerary" | "media" | "charts" | "guide" | "video" | "reviews" | "info" | "seo"
  >("basic");
  const [pkg, setPkg] = useState<TrekPackage | null>(null);
  const baselineRef = useRef<TrekPackage | null>(null);

  useEffect(() => {
    if (!loaded) return;
    const found = content.tripPackages.find((item) => item.id === params.id);
    const next = found ? { ...found } : null;
    setPkg(next);
    baselineRef.current = next ? structuredClone(next) : null;
  }, [loaded, params.id]);

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

  async function onSave() {
    if (!pkg) return;
    let pkgToSave = pkg;
    try {
      const res = await fetch(`/api/content?t=${Date.now()}`, { cache: "no-store", credentials: "include" });
      if (res.ok) {
        const latest = (await res.json()) as typeof content;
        const serverPkg = latest.tripPackages.find((item) => item.id === pkg.id);
        if (serverPkg) {
          pkgToSave = reconcileTripPackageForSave(serverPkg, pkg, baselineRef.current);
        }
      }
    } catch {
      // save with local copy if refresh fails
    }
    const cardPatch = {
      title: pkgToSave.title,
      days: pkgToSave.days,
      difficulty: pkgToSave.difficulty,
      description: pkgToSave.subtitle,
      badge: pkgToSave.badge,
      href: tripPath(pkgToSave),
      imageSrc: pkgToSave.heroSrc,
      imageAlt: pkgToSave.heroAlt,
    };
    const syncDest = (dest: typeof content.nepal) => ({
      ...dest,
      categories: dest.categories.map((cat) => ({
        ...cat,
        packages: cat.packages.map((card) =>
          card.id === pkgToSave.catalogId ||
          card.href.endsWith(`/${pkgToSave.slug}`) ||
          card.href === tripPath(pkgToSave)
            ? { ...card, ...cardPatch }
            : card,
        ),
      })),
    });
    const next = {
      ...content,
      tripPackages: content.tripPackages.map((item) => (item.id === pkgToSave.id ? pkgToSave : item)),
      nepal: syncDest(content.nepal),
      bhutan: syncDest(content.bhutan),
      tibet: syncDest(content.tibet),
      multi: syncDest(content.multi),
      journeys: {
        ...content.journeys,
        packages: content.journeys.packages.map((card) =>
          card.href.includes(pkgToSave.slug) || card.id === pkgToSave.catalogId
            ? {
                ...card,
                title: pkgToSave.title,
                href: tripPath(pkgToSave),
                imageSrc: pkgToSave.heroSrc,
                imageAlt: pkgToSave.heroAlt,
                days: pkgToSave.days,
                difficulty: pkgToSave.difficulty,
                description: pkgToSave.subtitle,
                badge: pkgToSave.badge,
              }
            : card,
        ),
      },
    };
    const ok = await save(next);
    if (ok) {
      setPkg(pkgToSave);
      baselineRef.current = structuredClone(pkgToSave);
      router.refresh();
    }
  }

  return (
    <>
      <h1>{pkg.title}</h1>
      <p className="admin-lead">
        Full trek builder — section by section. Save to publish instantly on {tripPath(pkg)}
      </p>
      <div className="admin-tabs">
        {(
          ["basic", "ratings", "itinerary", "media", "charts", "guide", "video", "reviews", "info", "seo"] as const
        ).map((id) => (
          <button key={id} type="button" className={tab === id ? "on" : ""} onClick={() => setTab(id)}>
            {id[0].toUpperCase() + id.slice(1)}
          </button>
        ))}
      </div>

      {tab === "basic" ? (
        <div className="admin-card">
          <label className="admin-field">
            <span>Package title</span>
            <input value={pkg.title} onChange={(e) => patch({ title: e.target.value })} />
          </label>
          <label className="admin-field">
            <span>URL slug (live page is /{pkg.slug} — no /trip/)</span>
            <input value={pkg.slug} onChange={(e) => patch({ slug: e.target.value.replace(/^\//, "").replace(/^trip\//, "") })} />
          </label>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
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
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
            <label className="admin-field">
              <span>Destination</span>
              <input value={pkg.destination} onChange={(e) => patch({ destination: e.target.value })} />
            </label>
            <label className="admin-field">
              <span>Duration</span>
              <input value={pkg.duration} onChange={(e) => patch({ duration: e.target.value })} />
            </label>
            <label className="admin-field">
              <span>Days</span>
              <input
                type="number"
                value={pkg.days}
                onChange={(e) => patch({ days: Number(e.target.value) || 0 })}
              />
            </label>
            <label className="admin-field">
              <span>Difficulty</span>
              <input value={pkg.difficulty} onChange={(e) => patch({ difficulty: e.target.value })} />
            </label>
            <label className="admin-field">
              <span>Max altitude</span>
              <input value={pkg.maxAltitude} onChange={(e) => patch({ maxAltitude: e.target.value })} />
            </label>
            <label className="admin-field">
              <span>Badge</span>
              <input value={pkg.badge} onChange={(e) => patch({ badge: e.target.value })} />
            </label>
            <label className="admin-field">
              <span>Price (USD)</span>
              <input
                type="number"
                value={pkg.priceUsd}
                onChange={(e) => patch({ priceUsd: Number(e.target.value) || 0 })}
              />
            </label>
              {(pkg.groupPrices || []).map((row, index) => (
              <div key={row.id} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                <input
                  value={row.label}
                  onChange={(e) =>
                    patch({
                      groupPrices: pkg.groupPrices.map((item, i) =>
                        i === index ? { ...item, label: e.target.value } : item,
                      ),
                    })
                  }
                />
                <input
                  type="number"
                  value={row.priceUsd}
                  onChange={(e) =>
                    patch({
                      groupPrices: pkg.groupPrices.map((item, i) =>
                        i === index ? { ...item, priceUsd: Number(e.target.value) || 0 } : item,
                      ),
                    })
                  }
                />
              </div>
            ))}
            <label className="admin-field">
              <span>Status</span>
              <select
                value={pkg.status}
                onChange={(e) => patch({ status: e.target.value as TrekPackage["status"] })}
              >
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </label>
            <label className="admin-field">
              <span>Best season</span>
              <input value={pkg.bestSeason} onChange={(e) => patch({ bestSeason: e.target.value })} />
            </label>
            <label className="admin-field">
              <span>Country</span>
              <input value={pkg.countryLabel || ""} onChange={(e) => patch({ countryLabel: e.target.value })} />
            </label>
            <label className="admin-field">
              <span>Activity</span>
              <input value={pkg.activityLabel || ""} onChange={(e) => patch({ activityLabel: e.target.value })} />
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
              <span>Start / End</span>
              <input value={pkg.startEndLabel || ""} onChange={(e) => patch({ startEndLabel: e.target.value })} />
            </label>
            <label className="admin-field">
              <span>Max altitude (feet label)</span>
              <input value={pkg.maxAltitudeFt || ""} onChange={(e) => patch({ maxAltitudeFt: e.target.value })} />
            </label>
          </div>
          <label className="admin-field">
            <span>Overview</span>
            <textarea style={{ minHeight: 160 }} value={pkg.overview} onChange={(e) => patch({ overview: e.target.value })} />
          </label>
          <label className="admin-field">
            <span>Highlights (one per line)</span>
            <textarea
              value={pkg.highlights.join("\n")}
              onChange={(e) => patch({ highlights: e.target.value.split("\n").map((s) => s.trim()).filter(Boolean) })}
            />
          </label>
          <label className="admin-field">
            <span>Inclusions (one per line)</span>
            <textarea
              value={pkg.inclusions.join("\n")}
              onChange={(e) => patch({ inclusions: e.target.value.split("\n").map((s) => s.trim()).filter(Boolean) })}
            />
          </label>
          <label className="admin-field">
            <span>Exclusions (one per line)</span>
            <textarea
              value={pkg.exclusions.join("\n")}
              onChange={(e) => patch({ exclusions: e.target.value.split("\n").map((s) => s.trim()).filter(Boolean) })}
            />
          </label>
          <label className="admin-field">
            <span>Optional add-ons (one per line)</span>
            <textarea
              value={(pkg.optionalAddons || []).join("\n")}
              onChange={(e) => patch({ optionalAddons: e.target.value.split("\n").map((s) => s.trim()).filter(Boolean) })}
            />
          </label>
          <label className="admin-field">
            <span>Important note (Lukla weather / helicopter)</span>
            <textarea value={pkg.includeNote || ""} onChange={(e) => patch({ includeNote: e.target.value })} />
          </label>
          <label className="admin-field">
            <span>Special Lukla / Ramechhap note</span>
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

      {tab === "media" ? (
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
            Built-in graphs show until you upload a replacement. JPG and PNG only. Empty a field to restore the drawn chart. Same frames on every package.
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

      {tab === "guide" ? (
        <div className="admin-card">
          <p className="admin-lead">Why us, suitability, Khumbu notes and grouped packing list shown on the public trek page.</p>
          <label className="admin-field">
            <span>Packing intro</span>
            <textarea value={pkg.packingIntro || ""} onChange={(e) => patch({ packingIntro: e.target.value })} />
          </label>
          {(pkg.packingGroups || []).map((group, gi) => (
            <div key={group.id} className="admin-card" style={{ margin: "12px 0", padding: 12 }}>
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
              <button
                type="button"
                className="admin-btn"
                onClick={() => patch({ packingGroups: (pkg.packingGroups || []).filter((_, i) => i !== gi) })}
              >
                Remove group
              </button>
            </div>
          ))}
          <button
            type="button"
            className="admin-btn"
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

          <h2 style={{ marginTop: 24 }}>Why this trek</h2>
          {(pkg.whyItems || []).map((item, wi) => (
            <div key={`${item.title}-${wi}`} className="admin-card" style={{ margin: "12px 0", padding: 12 }}>
              <label className="admin-field">
                <span>Title</span>
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
                <span>Body</span>
                <textarea
                  value={item.body}
                  onChange={(e) => {
                    const whyItems = [...(pkg.whyItems || [])];
                    whyItems[wi] = { ...item, body: e.target.value };
                    patch({ whyItems });
                  }}
                />
              </label>
              <button type="button" className="admin-btn" onClick={() => patch({ whyItems: (pkg.whyItems || []).filter((_, i) => i !== wi) })}>
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            className="admin-btn"
            onClick={() => patch({ whyItems: [...(pkg.whyItems || []), { title: "New reason", body: "" }] })}
          >
            Add why point
          </button>

          <label className="admin-field" style={{ marginTop: 20 }}>
            <span>Is this trek for you</span>
            <textarea value={pkg.suitableBody || ""} onChange={(e) => patch({ suitableBody: e.target.value })} />
          </label>
          <label className="admin-field">
            <span>How to train</span>
            <textarea value={pkg.trainingBody || ""} onChange={(e) => patch({ trainingBody: e.target.value })} />
          </label>
          <label className="admin-field">
            <span>Khumbu trail notes</span>
            <textarea value={pkg.khumbuBody || ""} onChange={(e) => patch({ khumbuBody: e.target.value })} />
          </label>
        </div>
      ) : null}

      {tab === "ratings" ? (
        <div className="admin-card">
          <p className="admin-lead">Tripadvisor and Google badges under the package title. Edit score, count, URL and logo.</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
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
              <button type="button" className="admin-btn" onClick={() => patch({ videoReviews: (pkg.videoReviews || []).filter((_, i) => i !== vi) })}>
                Remove video
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
            This package uses the homepage reviews hub — wallpaper, logos and traveler photos. Edit them in Reviews (same uploads as Orbit).
          </p>
          <Link className="admin-btn admin-btn-gold" href="/admin/reviews" style={{ display: "inline-block", width: "auto" }}>
            Open reviews editor
          </Link>
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

      {tab === "seo" ? (
        <div className="admin-card">
          <label className="admin-field">
            <span>Meta title</span>
            <input value={pkg.metaTitle} onChange={(e) => patch({ metaTitle: e.target.value })} />
          </label>
          <label className="admin-field">
            <span>Meta description</span>
            <textarea value={pkg.metaDescription} onChange={(e) => patch({ metaDescription: e.target.value })} />
          </label>
          <label className="admin-field">
            <span>Meta keywords</span>
            <input value={pkg.metaKeywords} onChange={(e) => patch({ metaKeywords: e.target.value })} />
          </label>
        </div>
      ) : null}

      <div className="admin-save-row">
        {status ? <span className={status === "Saved" ? "admin-ok" : "admin-error"}>{status}</span> : null}
        <button type="button" className="admin-btn admin-btn-gold" style={{ width: "auto" }} disabled={busy} onClick={() => void onSave()}>
          Save changes
        </button>
      </div>
    </>
  );
}

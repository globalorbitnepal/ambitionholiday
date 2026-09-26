"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import OrbitJourneysEditor from "@/components/OrbitJourneysEditor";
import OrbitWhyEditor from "@/components/OrbitWhyEditor";
import OrbitExploreHubEditor from "@/components/OrbitExploreHubEditor";
import OrbitSignatureEditor from "@/components/OrbitSignatureEditor";
import OrbitExperiencesEditor from "@/components/OrbitExperiencesEditor";
import OrbitAvailabilityEditor from "@/components/OrbitAvailabilityEditor";
import OrbitJournalEditor from "@/components/OrbitJournalEditor";
import OrbitBlogEditor from "@/components/OrbitBlogEditor";
import OrbitAboutEditor from "@/components/OrbitAboutEditor";
import OrbitLegalEditor from "@/components/OrbitLegalEditor";
import OrbitVisaEditor from "@/components/OrbitVisaEditor";
import OrbitBestTimeEditor from "@/components/OrbitBestTimeEditor";
import OrbitPackingEditor from "@/components/OrbitPackingEditor";
import OrbitAltitudeEditor from "@/components/OrbitAltitudeEditor";
import OrbitPermitsEditor from "@/components/OrbitPermitsEditor";
import OrbitNepalEditor from "@/components/OrbitNepalEditor";
import OrbitFooterEditor from "@/components/OrbitFooterEditor";
import OrbitTrekChartsEditor from "@/components/OrbitTrekChartsEditor";
import OrbitMediaLibrary from "@/components/OrbitMediaLibrary";
import { OrbitMediaButtons } from "@/components/OrbitMediaPicker";
import type { SiteContent, StatItem } from "@/lib/content-types";
import OrbitHeaderEditor from "@/components/OrbitHeaderEditor";
import { postOrbitUpload } from "@/lib/orbit-upload-client";

type Props = {
  initial: SiteContent;
  /** Inside /admin shell — hide duplicate Orbit chrome */
  embedded?: boolean;
};

async function uploadFile(file: File, crop?: "9x16"): Promise<string> {
  return postOrbitUpload(file, crop);
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block space-y-1.5">
      <span className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-white/50">
        {label}
      </span>
      {children}
    </label>
  );
}

const inputClass =
  "w-full rounded-md border border-white/15 bg-black/35 px-3 py-2 text-sm text-white outline-none focus:border-gold/50";

export default function OrbitDashboard({ initial, embedded = false }: Props) {
  const [content, setContent] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState("");
  const [tab, setTab] = useState<
    | "hero"
    | "header"
    | "stats"
    | "signature"
    | "exploreHub"
    | "journeys"
    | "why"
    | "experiences"
    | "availability"
    | "journal"
    | "blog"
    | "about"
    | "legalDocuments"
    | "visa"
    | "bestTime"
    | "packing"
    | "altitude"
    | "permits"
    | "nepal"
    | "bhutan"
    | "tibet"
    | "multi"
    | "helicopter"
    | "photography"
    | "trekCharts"
    | "footer"
    | "media"
  >("journeys");
  const updatedLabel = useMemo(() => {
    try {
      return new Date(content.updatedAt).toLocaleString();
    } catch {
      return content.updatedAt;
    }
  }, [content.updatedAt]);

  async function save(next: SiteContent) {
    setSaving(true);
    setStatus("");
    try {
      const res = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(next),
      });
      if (!res.ok) {
        const err = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(err.error || "Save failed");
      }
      const saved = (await res.json()) as SiteContent;
      setContent(saved);
      setStatus("Saved — live site updates instantly.");
    } catch (err) {
      setStatus(err instanceof Error ? err.message : "Save failed.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className={embedded ? "admin-orbit-embed" : "min-h-screen"}>
      {!embedded ? (
        <header className="sticky top-0 z-40 border-b border-white/10 bg-[#070a10]/95 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4">
            <div>
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-gold">Orbit Control</p>
              <h1 className="font-[family-name:var(--font-cormorant)] text-2xl font-semibold">Ambition Holidays</h1>
            </div>
            <Link
              href="/"
              target="_blank"
              className="rounded-md border border-white/15 px-3 py-2 text-xs font-semibold text-white/80 hover:border-gold/40 hover:text-gold"
            >
              Open site
            </Link>
          </div>
        </header>
      ) : null}

      <div className={embedded ? "admin-orbit-inner" : "mx-auto max-w-6xl px-5 py-8"}>
        <div className="mb-6 flex flex-wrap gap-2">
          {(
            [
              ["hero", "Hero"],
              ["header", "Header page"],
              ["stats", "Trust bar"],
              ["signature", "Ambition glass"],
              ["exploreHub", "Explore Hub"],
              ["journeys", "Handcrafted journeys"],
              ["why", "Traveler reviews"],
              ["experiences", "Experiences"],
              ["availability", "Availability"],
              ["journal", "Video Journal"],
              ["blog", "Journal / Blog"],
              ["about", "Company"],
              ["legalDocuments", "Legal documents"],
              ["visa", "Visa & Entry"],
              ["bestTime", "Best Time"],
              ["packing", "Packing Guide"],
              ["altitude", "Altitude Tips"],
              ["permits", "Permits & Fees"],
              ["nepal", "Nepal packages"],
              ["bhutan", "Bhutan packages"],
              ["tibet", "Tibet packages"],
              ["multi", "Multi-country"],
              ["helicopter", "Helicopter tours"],
              ["photography", "Photography treks"],
              ["trekCharts", "Trek charts"],
              ["footer", "Footer"],
              ["media", "Media library"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              className={`rounded-full px-4 py-2 text-xs font-bold tracking-wide ${
                tab === id
                  ? "bg-gold/20 text-gold"
                  : "bg-white/5 text-white/65 hover:bg-white/10"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs text-white/45">Last saved: {updatedLabel}</p>
          <div className="flex items-center gap-3">
            {status ? <p className="text-xs text-gold/90">{status}</p> : null}
            <button
              type="button"
              disabled={saving}
              onClick={() => void save(content)}
              className="rounded-md border border-gold/70 bg-gold/15 px-4 py-2 text-xs font-bold tracking-wide text-gold hover:bg-gold/25 disabled:opacity-50"
            >
              {saving ? "Saving…" : "Save changes"}
            </button>
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
          {tab === "header" ? (
            <OrbitHeaderEditor content={content} onChange={setContent} />
          ) : null}

          {tab === "hero" ? (
            <div className="space-y-5">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={content.hero.visible}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      hero: { ...content.hero, visible: e.target.checked },
                    })
                  }
                />
                Show hero section
              </label>
              <Field label="Tagline words (comma separated)">
                <input
                  className={inputClass}
                  value={content.hero.taglineWords.join(", ")}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      hero: {
                        ...content.hero,
                        taglineWords: e.target.value
                          .split(",")
                          .map((w) => w.trim())
                          .filter(Boolean),
                      },
                    })
                  }
                />
              </Field>
              <Field label="Headline">
                <input
                  className={inputClass}
                  value={content.hero.headline}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      hero: { ...content.hero, headline: e.target.value },
                    })
                  }
                />
              </Field>
              <Field label="Search placeholder">
                <input
                  className={inputClass}
                  value={content.hero.searchPlaceholder}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      hero: {
                        ...content.hero,
                        searchPlaceholder: e.target.value,
                      },
                    })
                  }
                />
              </Field>

              <div className="grid gap-4 lg:grid-cols-2">
                <div className="space-y-2">
                  <p className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-white/50">
                    Hero video
                  </p>
                  <video
                    key={content.hero.videoSrc}
                    className="aspect-video w-full rounded-md border border-white/10 bg-black object-cover"
                    src={content.hero.videoSrc}
                    poster={content.hero.posterSrc}
                    muted
                    playsInline
                    controls
                    preload="metadata"
                  />
                  <label className="inline-flex cursor-pointer rounded-md border border-gold/40 px-3 py-2 text-xs font-semibold text-gold">
                    Upload video (MP4, max 32MB)
                    <input
                      type="file"
                      accept="video/mp4,video/webm,video/quicktime"
                      className="hidden"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        e.target.value = "";
                        if (!file) return;
                        try {
                          const url = await uploadFile(file);
                          const next = {
                            ...content,
                            hero: { ...content.hero, videoSrc: url },
                          };
                          setContent(next);
                          await save(next);
                        } catch {
                          setStatus("Video upload failed. Use an MP4 under 32MB.");
                        }
                      }}
                    />
                  </label>
                  <OrbitMediaButtons
                    kind="video"
                    onPicked={async (url) => {
                      const next = {
                        ...content,
                        hero: { ...content.hero, videoSrc: url },
                      };
                      setContent(next);
                      await save(next);
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <p className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-white/50">
                    Hero poster image
                  </p>
                  <div className="relative aspect-video overflow-hidden rounded-md border border-white/10 bg-black/40">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={content.hero.posterSrc}
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  </div>
                  <label className="inline-flex cursor-pointer rounded-md border border-gold/40 px-3 py-2 text-xs font-semibold text-gold">
                    Upload poster image
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        e.target.value = "";
                        if (!file) return;
                        try {
                          const url = await uploadFile(file);
                          const next = {
                            ...content,
                            hero: { ...content.hero, posterSrc: url },
                          };
                          setContent(next);
                          await save(next);
                        } catch {
                          setStatus("Poster upload failed. Try a JPG or PNG.");
                        }
                      }}
                    />
                  </label>
                  <OrbitMediaButtons
                    onPicked={async (url) => {
                      const next = {
                        ...content,
                        hero: { ...content.hero, posterSrc: url },
                      };
                      setContent(next);
                      await save(next);
                    }}
                  />
                </div>
              </div>

              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={content.hero.statsVisible}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      hero: { ...content.hero, statsVisible: e.target.checked },
                    })
                  }
                />
                Show trust / stats bar
              </label>
            </div>
          ) : null}

          {tab === "stats" ? (
            <div className="space-y-4">
              {content.hero.stats.map((stat, index) => (
                <div
                  key={stat.id}
                  className="rounded-lg border border-white/10 p-4 space-y-3"
                >
                  <Field label="Label">
                    <input
                      className={inputClass}
                      value={stat.label}
                      onChange={(e) => {
                        const stats = [...content.hero.stats];
                        stats[index] = { ...stat, label: e.target.value };
                        setContent({
                          ...content,
                          hero: { ...content.hero, stats },
                        });
                      }}
                    />
                  </Field>
                  <Field label="Icon key">
                    <select
                      className={inputClass}
                      value={stat.iconKey}
                      onChange={(e) => {
                        const stats = [...content.hero.stats];
                        stats[index] = {
                          ...stat,
                          iconKey: e.target.value as StatItem["iconKey"],
                        };
                        setContent({
                          ...content,
                          hero: { ...content.hero, stats },
                        });
                      }}
                    >
                      <option value="tripadvisor">tripadvisor</option>
                      <option value="years">years</option>
                      <option value="price">price</option>
                      <option value="responsible">responsible</option>
                      <option value="custom">custom</option>
                    </select>
                  </Field>
                  <div className="flex flex-wrap gap-2">
                    <label className="cursor-pointer rounded-md border border-gold/40 px-3 py-1.5 text-xs text-gold">
                      Upload custom icon
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          const url = await uploadFile(file);
                          const stats = [...content.hero.stats];
                          stats[index] = {
                            ...stat,
                            iconKey: "custom",
                            iconSrc: url,
                          };
                          const next = {
                            ...content,
                            hero: { ...content.hero, stats },
                          };
                          setContent(next);
                          await save(next);
                        }}
                      />
                    </label>
                    <button
                      type="button"
                      className="rounded-md border border-red-400/30 px-3 py-1.5 text-xs text-red-200"
                      onClick={async () => {
                        const stats = content.hero.stats.filter(
                          (_, i) => i !== index,
                        );
                        const next = {
                          ...content,
                          hero: { ...content.hero, stats },
                        };
                        setContent(next);
                        await save(next);
                      }}
                    >
                      Delete item
                    </button>
                  </div>
                </div>
              ))}
              <button
                type="button"
                className="rounded-md border border-white/20 px-3 py-2 text-xs"
                onClick={() => {
                  setContent({
                    ...content,
                    hero: {
                      ...content.hero,
                      stats: [
                        ...content.hero.stats,
                        {
                          id: `stat-${Date.now()}`,
                          label: "New trust item",
                          iconKey: "years",
                        },
                      ],
                    },
                  });
                }}
              >
                Add trust item
              </button>
            </div>
          ) : null}

          {tab === "exploreHub" ? (
            <OrbitExploreHubEditor content={content} setContent={setContent} save={save} />
          ) : null}

          {tab === "journeys" ? (
            <OrbitJourneysEditor
              content={content}
              setContent={setContent}
              save={save}
            />
          ) : null}

          {tab === "why" ? (
            <OrbitWhyEditor content={content} setContent={setContent} save={save} />
          ) : null}

          {tab === "experiences" ? (
            <OrbitExperiencesEditor content={content} setContent={setContent} save={save} />
          ) : null}

          {tab === "availability" ? (
            <OrbitAvailabilityEditor content={content} setContent={setContent} save={save} />
          ) : null}

          {tab === "journal" ? (
            <OrbitJournalEditor content={content} setContent={setContent} save={save} />
          ) : null}

          {tab === "blog" ? (
            <OrbitBlogEditor content={content} setContent={setContent} save={save} />
          ) : null}

          {tab === "about" ? (
            <OrbitAboutEditor content={content} setContent={setContent} save={save} />
          ) : null}

          {tab === "legalDocuments" ? (
            <OrbitLegalEditor content={content} setContent={setContent} save={save} />
          ) : null}

          {tab === "visa" ? (
            <OrbitVisaEditor content={content} setContent={setContent} save={save} />
          ) : null}

          {tab === "bestTime" ? (
            <OrbitBestTimeEditor content={content} setContent={setContent} save={save} />
          ) : null}

          {tab === "packing" ? (
            <OrbitPackingEditor content={content} setContent={setContent} save={save} />
          ) : null}

          {tab === "altitude" ? (
            <OrbitAltitudeEditor content={content} setContent={setContent} save={save} />
          ) : null}

          {tab === "permits" ? (
            <OrbitPermitsEditor content={content} setContent={setContent} save={save} />
          ) : null}

          {tab === "nepal" ? (
            <OrbitNepalEditor field="nepal" content={content} setContent={setContent} save={save} />
          ) : null}

          {tab === "bhutan" ? (
            <OrbitNepalEditor field="bhutan" content={content} setContent={setContent} save={save} />
          ) : null}

          {tab === "tibet" ? (
            <OrbitNepalEditor field="tibet" content={content} setContent={setContent} save={save} />
          ) : null}

          {tab === "multi" ? (
            <OrbitNepalEditor field="multi" content={content} setContent={setContent} save={save} />
          ) : null}

          {tab === "helicopter" ? (
            <OrbitNepalEditor field="helicopter" content={content} setContent={setContent} save={save} />
          ) : null}

          {tab === "photography" ? (
            <OrbitNepalEditor field="photography" content={content} setContent={setContent} save={save} />
          ) : null}

          {tab === "trekCharts" ? <OrbitTrekChartsEditor content={content} setContent={setContent} /> : null}

          {tab === "footer" ? (
            <OrbitFooterEditor content={content} setContent={setContent} save={save} />
          ) : null}

          {tab === "signature" ? (
            <OrbitSignatureEditor content={content} setContent={setContent} save={save} />
          ) : null}

          {tab === "media" ? <OrbitMediaLibrary /> : null}
        </div>
      </div>
    </div>
  );
}

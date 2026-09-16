"use client";

import type {
  JourneyCategoryIcon,
  JourneyPackage,
  SiteContent,
} from "@/lib/content-types";
import { slugify } from "@/lib/nav";
import { OrbitMediaButtons } from "@/components/OrbitMediaPicker";

const inputClass =
  "w-full rounded-md border border-white/15 bg-black/35 px-3 py-2 text-sm text-white outline-none focus:border-gold/50";

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

async function uploadFile(file: File): Promise<string> {
  const form = new FormData();
  form.append("file", file);
  const res = await fetch("/api/orbit/upload", { method: "POST", body: form });
  if (!res.ok) throw new Error("Upload failed");
  const data = (await res.json()) as { url: string };
  return data.url;
}

function blankPackage(): JourneyPackage {
  return {
    id: `pkg-${Date.now()}`,
    title: "New Luxury Trek",
    subtitle: "Luxury Package",
    location: "Nepal",
    categoryIds: [],
    badge: "",
    days: 10,
    maxAltitude: "4,000 m",
    difficulty: "Moderate",
    description: "Describe this luxury journey.",
    href: "/luxury-treks",
    imageSrc: "/images/journeys/j-ebc.jpg",
    imageAlt: "Luxury trek in Nepal",
  };
}

type Props = {
  content: SiteContent;
  setContent: (next: SiteContent) => void;
  save: (next: SiteContent) => Promise<void>;
};

export default function OrbitJourneysEditor({ content, setContent, save }: Props) {
  const journeys = content.journeys;

  function patch(partial: Partial<SiteContent["journeys"]>) {
    setContent({
      ...content,
      journeys: { ...journeys, ...partial },
    });
  }

  function updatePackage(index: number, next: JourneyPackage) {
    const packages = [...journeys.packages];
    packages[index] = next;
    patch({ packages });
  }

  return (
    <div className="space-y-8">
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={journeys.visible}
          onChange={(e) => patch({ visible: e.target.checked })}
        />
        Show luxury treks section
      </label>

      <Field label="Wallpaper image">
        <div className="space-y-2">
          <input
            className={inputClass}
            value={journeys.wallpaperSrc}
            onChange={(e) => patch({ wallpaperSrc: e.target.value })}
          />
          <OrbitMediaButtons
            onPicked={async (url) => {
              const next = { ...content, journeys: { ...journeys, wallpaperSrc: url } };
              setContent(next);
              await save(next);
            }}
          />
        </div>
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Eyebrow">
          <input
            className={inputClass}
            value={journeys.eyebrow}
            onChange={(e) => patch({ eyebrow: e.target.value })}
          />
        </Field>
        <Field label="All Treks label">
          <input
            className={inputClass}
            value={journeys.allLabel}
            onChange={(e) => patch({ allLabel: e.target.value })}
          />
        </Field>
        <Field label="Headline (gold)">
          <input
            className={inputClass}
            value={journeys.headlineGold}
            onChange={(e) => patch({ headlineGold: e.target.value })}
          />
        </Field>
        <Field label="Headline (white)">
          <input
            className={inputClass}
            value={journeys.headlineWhite}
            onChange={(e) => patch({ headlineWhite: e.target.value })}
          />
        </Field>
      </div>
      <Field label="Line 1">
        <input
          className={inputClass}
          value={journeys.line1}
          onChange={(e) => patch({ line1: e.target.value })}
        />
      </Field>
      <Field label="Line 2">
        <input
          className={inputClass}
          value={journeys.line2}
          onChange={(e) => patch({ line2: e.target.value })}
        />
      </Field>

      <div>
        <div className="mb-3 flex items-center justify-between gap-3">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-white/50">
            Categories
          </p>
          <button
            type="button"
            className="rounded-md border border-white/20 px-3 py-1.5 text-xs"
            onClick={() => {
              const label = "New Region";
              let id = slugify(label) || `cat-${Date.now()}`;
              const used = new Set(journeys.categories.map((c) => c.id));
              if (used.has(id) || id === "all") id = `${id}-${Date.now()}`;
              patch({
                categories: [
                  ...journeys.categories,
                  { id, label, icon: "peaks" },
                ],
              });
            }}
          >
            Add category
          </button>
        </div>
        <div className="space-y-3">
          {journeys.categories.map((cat, index) => (
            <div
              key={cat.id}
              className="grid gap-3 rounded-lg border border-white/10 p-3 sm:grid-cols-[1fr_9rem_auto]"
            >
              <input
                className={inputClass}
                value={cat.label}
                onChange={(e) => {
                  const categories = [...journeys.categories];
                  categories[index] = { ...cat, label: e.target.value };
                  patch({ categories });
                }}
              />
              <select
                className={inputClass}
                value={cat.icon}
                onChange={(e) => {
                  const categories = [...journeys.categories];
                  categories[index] = {
                    ...cat,
                    icon: e.target.value as JourneyCategoryIcon,
                  };
                  patch({ categories });
                }}
              >
                <option value="peaks">Mountain icon</option>
                <option value="helicopter">Helicopter icon</option>
              </select>
              <button
                type="button"
                className="rounded-md border border-red-400/30 px-3 py-2 text-xs text-red-200"
                onClick={async () => {
                  const categories = journeys.categories.filter((_, i) => i !== index);
                  const packages = journeys.packages.map((pkg) => ({
                    ...pkg,
                    categoryIds: pkg.categoryIds.filter((id) => id !== cat.id),
                  }));
                  const next = {
                    ...content,
                    journeys: { ...journeys, categories, packages },
                  };
                  setContent(next);
                  await save(next);
                }}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
        <p className="mt-2 text-xs text-white/40">
          “{journeys.allLabel}” always stays first on the site. New categories appear after it.
        </p>
      </div>

      <div>
        <div className="mb-3 flex items-center justify-between gap-3">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-white/50">
            Packages
          </p>
          <button
            type="button"
            className="rounded-md border border-white/20 px-3 py-1.5 text-xs"
            onClick={() => patch({ packages: [...journeys.packages, blankPackage()] })}
          >
            Add package
          </button>
        </div>

        <div className="space-y-5">
          {journeys.packages.map((pkg, index) => (
            <div key={pkg.id} className="space-y-4 rounded-xl border border-white/10 p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <p className="font-[family-name:var(--font-cormorant)] text-xl text-white">
                  {pkg.title || "Untitled package"}
                </p>
                <button
                  type="button"
                  className="rounded-md border border-red-400/30 px-3 py-1.5 text-xs text-red-200"
                  onClick={async () => {
                    const packages = journeys.packages.filter((_, i) => i !== index);
                    const next = {
                      ...content,
                      journeys: { ...journeys, packages },
                    };
                    setContent(next);
                    await save(next);
                  }}
                >
                  Delete package
                </button>
              </div>

              <div className="grid gap-4 lg:grid-cols-[20rem_1fr]">
                <div className="space-y-2">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-md border border-white/10 bg-black/40">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={pkg.imageSrc}
                      alt={pkg.imageAlt}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  </div>
                  <label className="inline-flex cursor-pointer rounded-md border border-gold/40 px-3 py-1.5 text-[0.7rem] text-gold">
                    Upload image
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={async (e) => {
                        const input = e.currentTarget;
                        const file = input.files?.[0];
                        if (!file) return;
                        try {
                          const url = await uploadFile(file);
                          const packages = [...journeys.packages];
                          packages[index] = { ...pkg, imageSrc: url };
                          const next = {
                            ...content,
                            journeys: { ...journeys, packages },
                          };
                          setContent(next);
                          await save(next);
                        } catch {
                          window.alert("Image upload failed. Try a JPG or PNG under 12MB.");
                        } finally {
                          input.value = "";
                        }
                      }}
                    />
                  </label>
                  <OrbitMediaButtons
                    onPicked={async (url) => {
                      const packages = [...journeys.packages];
                      packages[index] = { ...pkg, imageSrc: url };
                      const next = {
                        ...content,
                        journeys: { ...journeys, packages },
                      };
                      setContent(next);
                      await save(next);
                    }}
                  />
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <Field label="Title">
                    <input
                      className={inputClass}
                      value={pkg.title}
                      onChange={(e) => updatePackage(index, { ...pkg, title: e.target.value })}
                    />
                  </Field>
                  <Field label="Subtitle">
                    <input
                      className={inputClass}
                      value={pkg.subtitle}
                      onChange={(e) => updatePackage(index, { ...pkg, subtitle: e.target.value })}
                    />
                  </Field>
                  <Field label="Location">
                    <input
                      className={inputClass}
                      value={pkg.location}
                      onChange={(e) => updatePackage(index, { ...pkg, location: e.target.value })}
                    />
                  </Field>
                  <Field label="Badge (optional)">
                    <input
                      className={inputClass}
                      value={pkg.badge}
                      placeholder="Most Popular"
                      onChange={(e) => updatePackage(index, { ...pkg, badge: e.target.value })}
                    />
                  </Field>
                  <Field label="Days">
                    <input
                      className={inputClass}
                      type="number"
                      min={1}
                      value={pkg.days}
                      onChange={(e) =>
                        updatePackage(index, { ...pkg, days: Number(e.target.value) || 1 })
                      }
                    />
                  </Field>
                  <Field label="Max altitude">
                    <input
                      className={inputClass}
                      value={pkg.maxAltitude}
                      onChange={(e) =>
                        updatePackage(index, { ...pkg, maxAltitude: e.target.value })
                      }
                    />
                  </Field>
                  <Field label="Difficulty">
                    <input
                      className={inputClass}
                      value={pkg.difficulty}
                      onChange={(e) =>
                        updatePackage(index, { ...pkg, difficulty: e.target.value })
                      }
                    />
                  </Field>
                  <Field label="Package page URL">
                    <input
                      className={inputClass}
                      value={pkg.href}
                      onChange={(e) => updatePackage(index, { ...pkg, href: e.target.value })}
                    />
                  </Field>
                </div>
              </div>

              <Field label="Image alt text">
                <input
                  className={inputClass}
                  value={pkg.imageAlt}
                  onChange={(e) => updatePackage(index, { ...pkg, imageAlt: e.target.value })}
                />
              </Field>
              <Field label="Description">
                <textarea
                  className={`${inputClass} min-h-24`}
                  value={pkg.description}
                  onChange={(e) =>
                    updatePackage(index, { ...pkg, description: e.target.value })
                  }
                />
              </Field>

              <div>
                <p className="mb-2 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-white/50">
                  Categories for this package
                </p>
                <div className="flex flex-wrap gap-2">
                  {journeys.categories.map((cat) => {
                    const on = pkg.categoryIds.includes(cat.id);
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => {
                          const categoryIds = on
                            ? pkg.categoryIds.filter((id) => id !== cat.id)
                            : [...pkg.categoryIds, cat.id];
                          updatePackage(index, { ...pkg, categoryIds });
                        }}
                        className={`rounded-full border px-3 py-1.5 text-xs ${
                          on
                            ? "border-gold bg-gold/20 text-gold"
                            : "border-white/15 text-white/65 hover:border-gold/40"
                        }`}
                      >
                        {cat.label}
                      </button>
                    );
                  })}
                  {!journeys.categories.length ? (
                    <p className="text-xs text-white/40">Add a category first.</p>
                  ) : null}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

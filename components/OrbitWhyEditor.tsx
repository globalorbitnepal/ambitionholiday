"use client";

import type { SiteContent, WhyCard, WhyCardIcon, WhyRating } from "@/lib/content-types";
import { mediaSrc } from "@/lib/media-src";
import { OrbitMediaButtons } from "@/components/OrbitMediaPicker";

const inputClass =
  "w-full rounded-md border border-white/15 bg-black/35 px-3 py-2 text-sm text-white outline-none focus:border-gold/50";

const ICON_OPTIONS: { id: WhyCardIcon; label: string }[] = [
  { id: "years", label: "Mountain / years" },
  { id: "tripadvisor", label: "TripAdvisor owl" },
  { id: "guide", label: "Guide / hiker" },
  { id: "stay", label: "Lodge / bed" },
  { id: "support", label: "24/7 support" },
  { id: "responsible", label: "Responsible / heart" },
  { id: "custom", label: "Custom uploaded icon" },
];

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
  const data = (await res.json()) as { url?: string; error?: string };
  if (!data.url) throw new Error(data.error || "Upload failed");
  return data.url;
}

type Props = {
  content: SiteContent;
  setContent: (next: SiteContent) => void;
  save: (next: SiteContent) => Promise<void>;
};

export default function OrbitWhyEditor({ content, setContent, save }: Props) {
  const why = content.why;

  function patch(partial: Partial<SiteContent["why"]>) {
    setContent({ ...content, why: { ...why, ...partial } });
  }

  function updateCard(index: number, next: WhyCard) {
    const cards = [...why.cards];
    cards[index] = next;
    patch({ cards });
  }

  function updateRating(index: number, next: WhyRating) {
    const ratings = [...why.ratings];
    ratings[index] = next;
    patch({ ratings });
  }

  return (
    <div className="space-y-8">
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={why.visible}
          onChange={(e) => patch({ visible: e.target.checked })}
        />
        Show Why Ambition Holidays section
      </label>

      <Field label="Eyebrow">
        <input
          className={inputClass}
          value={why.eyebrow}
          onChange={(e) => patch({ eyebrow: e.target.value })}
        />
      </Field>
      <Field label="Headline (white)">
        <input
          className={inputClass}
          value={why.headlineWhite}
          onChange={(e) => patch({ headlineWhite: e.target.value, headline: `${e.target.value} ${why.headlineGold}`.trim() })}
        />
      </Field>
      <Field label="Headline (gold)">
        <input
          className={inputClass}
          value={why.headlineGold}
          onChange={(e) => patch({ headlineGold: e.target.value, headline: `${why.headlineWhite} ${e.target.value}`.trim() })}
        />
      </Field>
      <Field label="Intro text">
        <textarea
          className={`${inputClass} min-h-24`}
          value={why.body}
          onChange={(e) => patch({ body: e.target.value })}
        />
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Button label">
          <input
            className={inputClass}
            value={why.ctaLabel}
            onChange={(e) => patch({ ctaLabel: e.target.value })}
          />
        </Field>
        <Field label="Button link">
          <input
            className={inputClass}
            value={why.ctaHref}
            onChange={(e) => patch({ ctaHref: e.target.value })}
          />
        </Field>
      </div>

      <div>
        <p className="mb-3 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-white/50">
          Six feature boxes
        </p>
        <div className="grid gap-4 lg:grid-cols-2">
          {why.cards.map((card, index) => (
            <div key={card.id} className="space-y-3 rounded-lg border border-white/10 p-4">
              <p className="text-xs font-semibold text-gold">Box {index + 1}</p>
              <div className="relative aspect-[16/10] overflow-hidden rounded-md bg-black/40">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={mediaSrc(card.imageSrc, content.updatedAt)}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
              <label className="inline-flex cursor-pointer rounded-md border border-gold/40 px-3 py-2 text-xs font-semibold text-gold">
                Replace image
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
                      const nextCard = { ...card, imageSrc: url };
                      const cards = [...why.cards];
                      cards[index] = nextCard;
                      const next = { ...content, why: { ...why, cards } };
                      setContent(next);
                      await save(next);
                    } catch {
                      window.alert("Image upload failed. Try a JPG or PNG under 12MB.");
                    }
                  }}
                />
              </label>
              <OrbitMediaButtons
                onPicked={async (url) => {
                  const cards = [...why.cards];
                  cards[index] = { ...card, imageSrc: url };
                  const next = { ...content, why: { ...why, cards } };
                  setContent(next);
                  await save(next);
                }}
              />
              <Field label="Title">
                <input
                  className={inputClass}
                  value={card.title}
                  onChange={(e) => updateCard(index, { ...card, title: e.target.value })}
                />
              </Field>
              <Field label="Description">
                <textarea
                  className={`${inputClass} min-h-20`}
                  value={card.body}
                  onChange={(e) => updateCard(index, { ...card, body: e.target.value })}
                />
              </Field>
              <Field label="Image alt text">
                <input
                  className={inputClass}
                  value={card.imageAlt}
                  onChange={(e) => updateCard(index, { ...card, imageAlt: e.target.value })}
                />
              </Field>
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Box button label">
                  <input
                    className={inputClass}
                    value={card.ctaLabel || "LEARN MORE"}
                    onChange={(e) => updateCard(index, { ...card, ctaLabel: e.target.value })}
                  />
                </Field>
                <Field label="Box link">
                  <input
                    className={inputClass}
                    value={card.href || ""}
                    onChange={(e) => updateCard(index, { ...card, href: e.target.value })}
                  />
                </Field>
              </div>
              <Field label="Icon style">
                <select
                  className={inputClass}
                  value={card.icon}
                  onChange={(e) =>
                    updateCard(index, { ...card, icon: e.target.value as WhyCardIcon })
                  }
                >
                  {ICON_OPTIONS.map((opt) => (
                    <option key={opt.id} value={opt.id}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </Field>
              <label className="inline-flex cursor-pointer rounded-md border border-white/20 px-3 py-2 text-xs text-white/80">
                Upload custom icon
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    e.target.value = "";
                    if (!file) return;
                    const url = await uploadFile(file);
                    const nextCard = { ...card, icon: "custom" as const, iconSrc: url };
                    const cards = [...why.cards];
                    cards[index] = nextCard;
                    const next = { ...content, why: { ...why, cards } };
                    setContent(next);
                    await save(next);
                  }}
                />
              </label>
              <button
                type="button"
                className="rounded-md border border-red-400/30 px-3 py-1.5 text-xs text-red-200"
                onClick={() => patch({ cards: why.cards.filter((_, i) => i !== index) })}
              >
                Delete box
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          className="mt-3 rounded-md border border-white/20 px-3 py-2 text-xs"
          onClick={() =>
            patch({
              cards: [
                ...why.cards,
                {
                  id: `why-${Date.now()}`,
                  title: "New highlight",
                  body: "Add a short description for this box.",
                  imageSrc: why.cards[0]?.imageSrc || "/images/why/years-v2.jpg",
                  imageAlt: "Heritage highlight",
                  icon: "years",
                  href: "/about-us",
                  ctaLabel: "LEARN MORE",
                },
              ],
            })
          }
        >
          Add box
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Award title">
          <input
            className={inputClass}
            value={why.awardTitle}
            onChange={(e) => patch({ awardTitle: e.target.value })}
          />
        </Field>
        <Field label="Award subtitle">
          <input
            className={inputClass}
            value={why.awardSubtitle}
            onChange={(e) => patch({ awardSubtitle: e.target.value })}
          />
        </Field>
      </div>

      <div>
        <p className="mb-3 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-white/50">
          Rating logos
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          {why.ratings.map((rating, index) => (
            <div key={rating.id} className="space-y-3 rounded-lg border border-white/10 p-4">
              <Field label="Platform name">
                <input
                  className={inputClass}
                  value={rating.label}
                  onChange={(e) => updateRating(index, { ...rating, label: e.target.value })}
                />
              </Field>
              <Field label="Value (reviews / rating)">
                <input
                  className={inputClass}
                  value={rating.value}
                  onChange={(e) => updateRating(index, { ...rating, value: e.target.value })}
                />
              </Field>
              <label className="inline-flex cursor-pointer rounded-md border border-gold/40 px-3 py-2 text-xs font-semibold text-gold">
                Replace logo
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    e.target.value = "";
                    if (!file) return;
                    const url = await uploadFile(file);
                    const nextRating = { ...rating, brand: "custom" as const, logoSrc: url };
                    const ratings = [...why.ratings];
                    ratings[index] = nextRating;
                    const next = { ...content, why: { ...why, ratings } };
                    setContent(next);
                    await save(next);
                  }}
                />
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

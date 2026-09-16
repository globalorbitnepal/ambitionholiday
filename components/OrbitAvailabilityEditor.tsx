"use client";

import { useState } from "react";
import {
  DEFAULT_CONTENT,
  type AvailabilityCard,
  type AvailabilityRoute,
  type AvailabilityRouteIcon,
  type SiteContent,
} from "@/lib/content-types";
import { mediaSrc } from "@/lib/media-src";
import { OrbitMediaButtons } from "@/components/OrbitMediaPicker";

const inputClass =
  "w-full rounded-md border border-white/15 bg-black/35 px-3 py-2 text-sm text-white outline-none focus:border-gold/50";

const ROUTE_ICON_OPTIONS: { id: AvailabilityRouteIcon; label: string }[] = [
  { id: "peaks", label: "Mountain peaks" },
  { id: "temple", label: "Temple / culture" },
  { id: "trek", label: "Trekker" },
  { id: "heli", label: "Helicopter" },
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

export default function OrbitAvailabilityEditor({ content, setContent, save }: Props) {
  const availability = content.availability ?? DEFAULT_CONTENT.availability;
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);

  function patch(partial: Partial<SiteContent["availability"]>) {
    setContent({ ...content, availability: { ...availability, ...partial } });
  }

  function updateCard(index: number, next: AvailabilityCard) {
    const cards = [...availability.cards];
    cards[index] = next;
    patch({ cards });
  }

  function updateRoute(cardIndex: number, routeIndex: number, next: AvailabilityRoute) {
    const card = availability.cards[cardIndex];
    const routes = [...card.routes];
    routes[routeIndex] = next;
    updateCard(cardIndex, { ...card, routes });
  }

  async function replaceImage(index: number, file: File) {
    setUploadingIndex(index);
    try {
      const url = await uploadFile(file);
      const cards = [...availability.cards];
      cards[index] = { ...cards[index], imageSrc: url };
      const next = { ...content, availability: { ...availability, cards } };
      setContent(next);
      await save(next);
    } catch {
      window.alert("Image upload failed. Try a JPG or PNG under 12MB.");
    } finally {
      setUploadingIndex(null);
    }
  }

  return (
    <div className="space-y-8">
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={availability.visible}
          onChange={(e) => patch({ visible: e.target.checked })}
        />
        Show Live Availability section
      </label>

      <Field label="Wallpaper image">
        <div className="space-y-2">
          <input
            className={inputClass}
            value={availability.wallpaperSrc}
            onChange={(e) => patch({ wallpaperSrc: e.target.value })}
          />
          <OrbitMediaButtons
            onPicked={async (url) => {
              const next = { ...content, availability: { ...availability, wallpaperSrc: url } };
              setContent(next);
              await save(next);
            }}
          />
        </div>
      </Field>

      <Field label="Eyebrow">
        <input
          className={inputClass}
          value={availability.eyebrow}
          onChange={(e) => patch({ eyebrow: e.target.value })}
        />
      </Field>
      <div className="grid gap-4 sm:grid-cols-3">
        <Field label="Headline before (white)">
          <input
            className={inputClass}
            value={availability.headlineBefore}
            onChange={(e) => patch({ headlineBefore: e.target.value })}
          />
        </Field>
        <Field label="Headline gold">
          <input
            className={inputClass}
            value={availability.headlineGold}
            onChange={(e) => patch({ headlineGold: e.target.value })}
          />
        </Field>
        <Field label="Headline after (white)">
          <input
            className={inputClass}
            value={availability.headlineAfter}
            onChange={(e) => patch({ headlineAfter: e.target.value })}
          />
        </Field>
      </div>
      <Field label="Intro text">
        <textarea
          className={`${inputClass} min-h-20`}
          value={availability.body}
          onChange={(e) => patch({ body: e.target.value })}
        />
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Bottom button label">
          <input
            className={inputClass}
            value={availability.ctaLabel}
            onChange={(e) => patch({ ctaLabel: e.target.value })}
          />
        </Field>
        <Field label="Bottom button link">
          <input
            className={inputClass}
            value={availability.ctaHref}
            onChange={(e) => patch({ ctaHref: e.target.value })}
          />
        </Field>
      </div>

      <div>
        <p className="mb-3 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-white/50">
          Month cards
        </p>
        <div className="space-y-5">
          {availability.cards.map((card, index) => (
            <div key={card.id} className="space-y-3 rounded-lg border border-white/10 p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-xs font-semibold text-gold">
                  {card.monthShort} · {card.monthFull}
                </p>
                <button
                  type="button"
                  className="rounded border border-red-400/30 px-2 py-1 text-[0.65rem] text-red-200"
                  onClick={() =>
                    patch({ cards: availability.cards.filter((_, i) => i !== index) })
                  }
                >
                  Remove month
                </button>
              </div>
              <div className="flex flex-wrap gap-5 text-sm">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={card.visible !== false}
                    onChange={(e) => updateCard(index, { ...card, visible: e.target.checked })}
                  />
                  Show on homepage
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={card.live !== false}
                    onChange={(e) => updateCard(index, { ...card, live: e.target.checked })}
                  />
                  LIVE badge (animated)
                </label>
              </div>
              <div className="relative aspect-[16/10] overflow-hidden rounded-md bg-black/40">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={mediaSrc(card.imageSrc, content.updatedAt)}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
              <p className="text-[0.68rem] text-white/45">
                Card image fills the top of the box edge-to-edge (month + badge overlay on photo).
              </p>
              <label
                className={`inline-flex cursor-pointer rounded-md border border-gold/40 px-3 py-2 text-xs font-semibold text-gold ${
                  uploadingIndex === index ? "opacity-50" : ""
                }`}
              >
                {uploadingIndex === index ? "Uploading…" : "Replace card image"}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  disabled={uploadingIndex !== null}
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    e.target.value = "";
                    if (!file) return;
                    await replaceImage(index, file);
                  }}
                />
              </label>
              <OrbitMediaButtons
                onPicked={async (url) => {
                  const cards = [...availability.cards];
                  cards[index] = { ...card, imageSrc: url };
                  const next = { ...content, availability: { ...availability, cards } };
                  setContent(next);
                  await save(next);
                }}
              />
              <Field label="Image URL">
                <input
                  className={inputClass}
                  value={card.imageSrc}
                  onChange={(e) => updateCard(index, { ...card, imageSrc: e.target.value })}
                />
              </Field>
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Month short (SEP)">
                  <input
                    className={inputClass}
                    value={card.monthShort}
                    onChange={(e) => updateCard(index, { ...card, monthShort: e.target.value })}
                  />
                </Field>
                <Field label="Month full">
                  <input
                    className={inputClass}
                    value={card.monthFull}
                    onChange={(e) => updateCard(index, { ...card, monthFull: e.target.value })}
                  />
                </Field>
                <Field label="Season badge">
                  <input
                    className={inputClass}
                    value={card.badge}
                    onChange={(e) => updateCard(index, { ...card, badge: e.target.value })}
                  />
                </Field>
                <Field label="Card title">
                  <input
                    className={inputClass}
                    value={card.title}
                    onChange={(e) => updateCard(index, { ...card, title: e.target.value })}
                  />
                </Field>
                <Field label="Available count">
                  <input
                    className={inputClass}
                    type="number"
                    value={card.availableCount}
                    onChange={(e) =>
                      updateCard(index, {
                        ...card,
                        availableCount: Number(e.target.value) || 0,
                      })
                    }
                  />
                </Field>
                <Field label="Available label">
                  <input
                    className={inputClass}
                    value={card.availableLabel}
                    onChange={(e) => updateCard(index, { ...card, availableLabel: e.target.value })}
                  />
                </Field>
                <Field label="Image alt">
                  <input
                    className={inputClass}
                    value={card.imageAlt}
                    onChange={(e) => updateCard(index, { ...card, imageAlt: e.target.value })}
                  />
                </Field>
                <Field label="Button label">
                  <input
                    className={inputClass}
                    value={card.ctaLabel}
                    onChange={(e) => updateCard(index, { ...card, ctaLabel: e.target.value })}
                  />
                </Field>
                <Field label="Button link">
                  <input
                    className={inputClass}
                    value={card.ctaHref}
                    onChange={(e) => updateCard(index, { ...card, ctaHref: e.target.value })}
                  />
                </Field>
              </div>
              <Field label="Card body">
                <textarea
                  className={`${inputClass} min-h-20`}
                  value={card.body}
                  onChange={(e) => updateCard(index, { ...card, body: e.target.value })}
                />
              </Field>

              <div className="space-y-3">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-white/45">
                  Routes / journeys list
                </p>
                {card.routes.map((route, routeIndex) => (
                  <div key={route.id} className="grid gap-2 rounded-md border border-white/10 p-3 sm:grid-cols-[1fr_10rem_auto]">
                    <Field label="Label">
                      <input
                        className={inputClass}
                        value={route.label}
                        onChange={(e) =>
                          updateRoute(index, routeIndex, { ...route, label: e.target.value })
                        }
                      />
                    </Field>
                    <Field label="Icon">
                      <select
                        className={inputClass}
                        value={route.icon}
                        onChange={(e) =>
                          updateRoute(index, routeIndex, {
                            ...route,
                            icon: e.target.value as AvailabilityRouteIcon,
                          })
                        }
                      >
                        {ROUTE_ICON_OPTIONS.map((opt) => (
                          <option key={opt.id} value={opt.id}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </Field>
                    <button
                      type="button"
                      className="self-end rounded border border-white/15 px-2 py-2 text-[0.65rem] text-white/70"
                      onClick={() =>
                        updateCard(index, {
                          ...card,
                          routes: card.routes.filter((_, i) => i !== routeIndex),
                        })
                      }
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className="rounded-md border border-white/20 px-3 py-2 text-xs"
                  onClick={() =>
                    updateCard(index, {
                      ...card,
                      routes: [
                        ...card.routes,
                        {
                          id: `route-${Date.now()}`,
                          label: "New journey",
                          icon: "peaks",
                        },
                      ],
                    })
                  }
                >
                  Add route
                </button>
              </div>
            </div>
          ))}
        </div>
        <button
          type="button"
          className="mt-4 rounded-md border border-white/20 px-3 py-2 text-xs"
          onClick={() =>
            patch({
              cards: [
                ...availability.cards,
                {
                  id: `avail-${Date.now()}`,
                  monthShort: "DEC",
                  monthFull: "December",
                  badge: "WINTER SEASON",
                  title: "New month journeys",
                  body: "Describe this month’s available luxury journeys.",
                  imageSrc: DEFAULT_CONTENT.availability.cards[0].imageSrc,
                  imageAlt: "Availability image",
                  routes: [
                    { id: `r-${Date.now()}`, label: "Everest Region", icon: "peaks" },
                  ],
                  availableCount: 8,
                  availableLabel: "JOURNEYS AVAILABLE",
                  ctaLabel: "VIEW AVAILABILITY",
                  ctaHref: "/luxury-treks",
                  live: true,
                  visible: true,
                },
              ],
            })
          }
        >
          Add month card
        </button>
      </div>
    </div>
  );
}

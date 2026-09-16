"use client";

import { DEFAULT_CONTENT, type ExperienceCard, type ExperiencesTheme, type SiteContent } from "@/lib/content-types";
import { mediaSrc } from "@/lib/media-src";
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
  const data = (await res.json()) as { url?: string; error?: string };
  if (!data.url) throw new Error(data.error || "Upload failed");
  return data.url;
}

type Props = {
  content: SiteContent;
  setContent: (next: SiteContent) => void;
  save: (next: SiteContent) => Promise<void>;
};

export default function OrbitExperiencesEditor({ content, setContent, save }: Props) {
  const experiences = content.experiences ?? DEFAULT_CONTENT.experiences;
  const theme = experiences.theme ?? DEFAULT_CONTENT.experiences.theme;

  function patch(partial: Partial<SiteContent["experiences"]>) {
    setContent({ ...content, experiences: { ...experiences, ...partial } });
  }

  function patchTheme(partial: Partial<ExperiencesTheme>) {
    patch({ theme: { ...theme, ...partial } });
  }

  function updateCard(index: number, next: ExperienceCard) {
    const cards = [...experiences.cards];
    cards[index] = next;
    patch({ cards });
  }

  async function replaceImage(index: number, file: File) {
    const url = await uploadFile(file);
    const cards = [...experiences.cards];
    cards[index] = { ...cards[index], imageSrc: url };
    const next = { ...content, experiences: { ...experiences, cards } };
    setContent(next);
    await save(next);
  }

  async function replaceBackground(file: File) {
    const url = await uploadFile(file);
    const next = {
      ...content,
      experiences: {
        ...experiences,
        theme: { ...theme, backgroundImageSrc: url, showBackgroundArt: true },
      },
    };
    setContent(next);
    await save(next);
  }

  function moveCard(index: number, dir: -1 | 1) {
    const nextIndex = index + dir;
    if (nextIndex < 0 || nextIndex >= experiences.cards.length) return;
    const cards = [...experiences.cards];
    const [item] = cards.splice(index, 1);
    cards.splice(nextIndex, 0, item);
    patch({ cards });
  }

  return (
    <div className="space-y-8">
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={experiences.visible}
          onChange={(e) => patch({ visible: e.target.checked })}
        />
        Show Signature Experiences section
      </label>

      <Field label="Wallpaper image">
        <div className="space-y-2">
          <input
            className={inputClass}
            value={experiences.wallpaperSrc}
            onChange={(e) => patch({ wallpaperSrc: e.target.value })}
          />
          <OrbitMediaButtons
            onPicked={async (url) => {
              const next = { ...content, experiences: { ...experiences, wallpaperSrc: url } };
              setContent(next);
              await save(next);
            }}
          />
        </div>
      </Field>

      <div className="rounded-lg border border-white/10 p-4">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-gold">
          Section text
        </p>
        <div className="space-y-4">
          <Field label="Eyebrow label">
            <input
              className={inputClass}
              value={experiences.eyebrow}
              onChange={(e) => patch({ eyebrow: e.target.value })}
            />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Headline (white)">
              <input
                className={inputClass}
                value={experiences.headlineWhite}
                onChange={(e) => patch({ headlineWhite: e.target.value })}
              />
            </Field>
            <Field label="Headline (gold italic)">
              <input
                className={inputClass}
                value={experiences.headlineGold}
                onChange={(e) => patch({ headlineGold: e.target.value })}
              />
            </Field>
          </div>
          <Field label="Intro text">
            <textarea
              className={`${inputClass} min-h-24`}
              value={experiences.body}
              onChange={(e) => patch({ body: e.target.value })}
            />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Bottom button label">
              <input
                className={inputClass}
                value={experiences.ctaLabel}
                onChange={(e) => patch({ ctaLabel: e.target.value })}
              />
            </Field>
            <Field label="Bottom button link">
              <input
                className={inputClass}
                value={experiences.ctaHref}
                onChange={(e) => patch({ ctaHref: e.target.value })}
              />
            </Field>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-white/10 p-4">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-gold">
          Theme &amp; colors
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Field label="Section background">
            <input
              type="color"
              className="h-10 w-full cursor-pointer rounded border border-white/15 bg-transparent"
              value={theme.sectionBg.startsWith("#") ? theme.sectionBg : "#0c1016"}
              onChange={(e) => patchTheme({ sectionBg: e.target.value })}
            />
            <input
              className={`${inputClass} mt-2`}
              value={theme.sectionBg}
              onChange={(e) => patchTheme({ sectionBg: e.target.value })}
            />
          </Field>
          <Field label="Card background">
            <input
              type="color"
              className="h-10 w-full cursor-pointer rounded border border-white/15 bg-transparent"
              value={theme.cardBg.startsWith("#") ? theme.cardBg : "#121820"}
              onChange={(e) => patchTheme({ cardBg: e.target.value })}
            />
            <input
              className={`${inputClass} mt-2`}
              value={theme.cardBg}
              onChange={(e) => patchTheme({ cardBg: e.target.value })}
            />
          </Field>
          <Field label="Text color">
            <input
              type="color"
              className="h-10 w-full cursor-pointer rounded border border-white/15 bg-transparent"
              value={theme.textColor.startsWith("#") ? theme.textColor : "#ffffff"}
              onChange={(e) => patchTheme({ textColor: e.target.value })}
            />
            <input
              className={`${inputClass} mt-2`}
              value={theme.textColor}
              onChange={(e) => patchTheme({ textColor: e.target.value })}
            />
          </Field>
          <Field label="Muted text color">
            <input
              className={inputClass}
              value={theme.mutedTextColor}
              onChange={(e) => patchTheme({ mutedTextColor: e.target.value })}
              placeholder="rgba(255,255,255,0.72)"
            />
          </Field>
          <Field label="Gold accent">
            <input
              type="color"
              className="h-10 w-full cursor-pointer rounded border border-white/15 bg-transparent"
              value={theme.goldColor.startsWith("#") ? theme.goldColor : "#c9a227"}
              onChange={(e) => patchTheme({ goldColor: e.target.value })}
            />
            <input
              className={`${inputClass} mt-2`}
              value={theme.goldColor}
              onChange={(e) => patchTheme({ goldColor: e.target.value })}
            />
          </Field>
          <Field label="Border color">
            <input
              className={inputClass}
              value={theme.borderColor}
              onChange={(e) => patchTheme({ borderColor: e.target.value })}
              placeholder="rgba(201,162,39,0.55)"
            />
          </Field>
        </div>

        <div className="mt-4 space-y-3">
          <label className="flex items-center gap-2 text-sm text-white/80">
            <input
              type="checkbox"
              checked={theme.showBackgroundArt}
              onChange={(e) => patchTheme({ showBackgroundArt: e.target.checked })}
            />
            Show bottom mountain / background art
          </label>
          {theme.backgroundImageSrc ? (
            <div className="relative aspect-[21/6] overflow-hidden rounded-md border border-white/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={mediaSrc(theme.backgroundImageSrc, content.updatedAt)}
                alt=""
                className="h-full w-full object-cover object-bottom"
              />
            </div>
          ) : null}
          <Field label="Background image URL (optional)">
            <input
              className={inputClass}
              value={theme.backgroundImageSrc}
              onChange={(e) => patchTheme({ backgroundImageSrc: e.target.value })}
              placeholder="Leave empty for built-in mountain band"
            />
          </Field>
          <label className="inline-flex cursor-pointer rounded-md border border-gold/40 px-3 py-2 text-xs font-semibold text-gold">
            Upload background image
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                e.target.value = "";
                if (!file) return;
                await replaceBackground(file);
              }}
            />
          </label>
        </div>
      </div>

      <div>
        <p className="mb-3 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-white/50">
          Experience cards
        </p>
        <div className="grid gap-4 lg:grid-cols-2">
          {experiences.cards.map((card, index) => (
            <div key={card.id} className="space-y-3 rounded-lg border border-white/10 p-4">
              <div className="flex items-center justify-between gap-2">
                <p className="text-xs font-semibold text-gold">Card {index + 1}</p>
                <div className="flex gap-1">
                  <button
                    type="button"
                    className="rounded border border-white/15 px-2 py-1 text-[0.65rem] text-white/70"
                    onClick={() => moveCard(index, -1)}
                  >
                    Up
                  </button>
                  <button
                    type="button"
                    className="rounded border border-white/15 px-2 py-1 text-[0.65rem] text-white/70"
                    onClick={() => moveCard(index, 1)}
                  >
                    Down
                  </button>
                  <button
                    type="button"
                    className="rounded border border-red-400/30 px-2 py-1 text-[0.65rem] text-red-200"
                    onClick={() =>
                      patch({ cards: experiences.cards.filter((_, i) => i !== index) })
                    }
                  >
                    Remove
                  </button>
                </div>
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-black/40">
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
                    await replaceImage(index, file);
                  }}
                />
              </label>
              <OrbitMediaButtons
                onPicked={async (url) => {
                  const cards = [...experiences.cards];
                  cards[index] = { ...card, imageSrc: url };
                  const next = { ...content, experiences: { ...experiences, cards } };
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
              <Field label="Title">
                <input
                  className={inputClass}
                  value={card.title}
                  onChange={(e) => updateCard(index, { ...card, title: e.target.value })}
                />
              </Field>
              <Field label="Count label (e.g. 12 Experiences)">
                <input
                  className={inputClass}
                  value={card.countLabel ?? ""}
                  onChange={(e) => updateCard(index, { ...card, countLabel: e.target.value })}
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
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Card button label">
                  <input
                    className={inputClass}
                    value={card.ctaLabel ?? "EXPLORE MORE"}
                    onChange={(e) => updateCard(index, { ...card, ctaLabel: e.target.value })}
                  />
                </Field>
                <Field label="Card link">
                  <input
                    className={inputClass}
                    value={card.href}
                    onChange={(e) => updateCard(index, { ...card, href: e.target.value })}
                  />
                </Field>
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
                ...experiences.cards,
                {
                  id: `exp-${Date.now()}`,
                  title: "New experience",
                  countLabel: "0 Experiences",
                  body: "Add a short description.",
                  imageSrc: DEFAULT_CONTENT.experiences.cards[0].imageSrc,
                  imageAlt: "Experience image",
                  icon: "heli",
                  href: "/luxury-treks",
                  ctaLabel: "EXPLORE MORE",
                },
              ],
            })
          }
        >
          Add card
        </button>
      </div>
    </div>
  );
}

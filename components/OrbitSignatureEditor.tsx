"use client";

import type { ReactNode } from "react";
import type {
  SignatureCardIcon,
  SignatureFootIcon,
  SignatureStat,
  SignatureStatIcon,
  SignatureStoryCard,
  SiteContent,
} from "@/lib/content-types";
import { OrbitMediaButtons } from "@/components/OrbitMediaPicker";

const inputClass =
  "w-full rounded-md border border-white/15 bg-black/35 px-3 py-2 text-sm text-white outline-none focus:border-gold/50";

const STAT_ICONS: { id: SignatureStatIcon; label: string }[] = [
  { id: "luggage", label: "Luggage" },
  { id: "tripadvisor", label: "Tripadvisor" },
  { id: "headset", label: "Support" },
  { id: "guide", label: "Guide" },
  { id: "custom", label: "Custom icon" },
];

const CARD_ICONS: { id: SignatureCardIcon; label: string }[] = [
  { id: "peaks", label: "Peaks" },
  { id: "heli", label: "Helicopter" },
  { id: "lodge", label: "Lodge" },
  { id: "temple", label: "Temple" },
  { id: "custom", label: "Custom icon" },
];

const FOOT_ICONS: { id: SignatureFootIcon; label: string }[] = [
  { id: "leaf", label: "Leaf" },
  { id: "people", label: "People" },
  { id: "shield", label: "Shield" },
  { id: "pin", label: "Pin" },
  { id: "globe", label: "Globe" },
  { id: "custom", label: "Custom icon" },
];

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block space-y-1.5">
      <span className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-white/50">
        {label}
      </span>
      {children}
    </label>
  );
}

type Props = {
  content: SiteContent;
  setContent: (next: SiteContent) => void;
  save: (next: SiteContent) => Promise<void>;
};

export default function OrbitSignatureEditor({ content, setContent, save }: Props) {
  const sig = content.signature;

  function patch(partial: Partial<SiteContent["signature"]>) {
    setContent({ ...content, signature: { ...sig, ...partial } });
  }

  return (
    <div className="space-y-8">
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={sig.visible}
          onChange={(e) => patch({ visible: e.target.checked })}
        />
        Show Ambition Holidays glass section (below Why Travel)
      </label>

      <Field label="Wallpaper">
        <div className="space-y-2">
          <input className={inputClass} value={sig.wallpaperSrc} onChange={(e) => patch({ wallpaperSrc: e.target.value })} />
          <OrbitMediaButtons
            onPicked={async (url) => {
              const next = { ...content, signature: { ...sig, wallpaperSrc: url } };
              setContent(next);
              await save(next);
            }}
          />
        </div>
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Top kicker">
          <input className={inputClass} value={sig.kicker} onChange={(e) => patch({ kicker: e.target.value })} />
        </Field>
        <Field label="Right script line">
          <input className={inputClass} value={sig.scriptRight} onChange={(e) => patch({ scriptRight: e.target.value })} />
        </Field>
        <Field label="Eyebrow">
          <input className={inputClass} value={sig.eyebrow} onChange={(e) => patch({ eyebrow: e.target.value })} />
        </Field>
        <Field label="Footer script">
          <input className={inputClass} value={sig.footScript} onChange={(e) => patch({ footScript: e.target.value })} />
        </Field>
        <Field label="Headline (white)">
          <input className={inputClass} value={sig.headlineWhite} onChange={(e) => patch({ headlineWhite: e.target.value })} />
        </Field>
        <Field label="Headline (gold)">
          <input className={inputClass} value={sig.headlineGold} onChange={(e) => patch({ headlineGold: e.target.value })} />
        </Field>
        <Field label="Sister label">
          <input className={inputClass} value={sig.sisterLabel} onChange={(e) => patch({ sisterLabel: e.target.value })} />
        </Field>
        <Field label="Sister name">
          <input className={inputClass} value={sig.sisterName} onChange={(e) => patch({ sisterName: e.target.value })} />
        </Field>
        <Field label="Button label">
          <input className={inputClass} value={sig.ctaLabel} onChange={(e) => patch({ ctaLabel: e.target.value })} />
        </Field>
        <Field label="Button link">
          <input className={inputClass} value={sig.ctaHref} onChange={(e) => patch({ ctaHref: e.target.value })} />
        </Field>
      </div>
      <Field label="Intro text">
        <textarea className={`${inputClass} min-h-24`} value={sig.body} onChange={(e) => patch({ body: e.target.value })} />
      </Field>

      <div>
        <h3 className="mb-3 text-sm font-semibold text-gold">Top stats</h3>
        <div className="grid gap-3 lg:grid-cols-2">
          {sig.stats.map((stat, index) => (
            <div key={stat.id} className="space-y-2 rounded-lg border border-white/10 p-3">
              <Field label="Value">
                <input
                  className={inputClass}
                  value={stat.value}
                  onChange={(e) => {
                    const stats = [...sig.stats];
                    stats[index] = { ...stat, value: e.target.value };
                    patch({ stats });
                  }}
                />
              </Field>
              <Field label="Title">
                <input
                  className={inputClass}
                  value={stat.title}
                  onChange={(e) => {
                    const stats = [...sig.stats];
                    stats[index] = { ...stat, title: e.target.value };
                    patch({ stats });
                  }}
                />
              </Field>
              <Field label="Subtitle">
                <input
                  className={inputClass}
                  value={stat.subtitle}
                  onChange={(e) => {
                    const stats = [...sig.stats];
                    stats[index] = { ...stat, subtitle: e.target.value };
                    patch({ stats });
                  }}
                />
              </Field>
              <Field label="Icon">
                <select
                  className={inputClass}
                  value={stat.icon}
                  onChange={(e) => {
                    const stats = [...sig.stats];
                    stats[index] = { ...stat, icon: e.target.value as SignatureStatIcon };
                    patch({ stats });
                  }}
                >
                  {STAT_ICONS.map((opt) => (
                    <option key={opt.id} value={opt.id}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </Field>
              <OrbitMediaButtons
                onPicked={async (url) => {
                  const stats: SignatureStat[] = [...sig.stats];
                  stats[index] = { ...stat, icon: "custom", iconSrc: url };
                  const next = { ...content, signature: { ...sig, stats } };
                  setContent(next);
                  await save(next);
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gold">Experience cards</h3>
          <button
            type="button"
            className="rounded-md border border-gold/40 px-3 py-1.5 text-xs font-semibold text-gold"
            onClick={() =>
              patch({
                cards: [
                  ...sig.cards,
                  {
                    id: `sc-${Date.now()}`,
                    badge: "New",
                    title: "New card",
                    subtitle: "Add a short line",
                    href: "/",
                    imageSrc: sig.wallpaperSrc,
                    imageAlt: "Signature card",
                    icon: "peaks",
                  },
                ],
              })
            }
          >
            Add card
          </button>
        </div>
        <div className="space-y-4">
          {sig.cards.map((card, index) => (
            <div key={card.id} className="rounded-lg border border-white/10 p-3">
              <div className="mb-2 flex justify-between">
                <p className="text-xs text-white/50">Card {index + 1}</p>
                <button
                  type="button"
                  className="text-xs text-red-300"
                  onClick={() => patch({ cards: sig.cards.filter((_, i) => i !== index) })}
                >
                  Remove
                </button>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Title">
                  <input
                    className={inputClass}
                    value={card.title}
                    onChange={(e) => {
                      const cards = [...sig.cards];
                      cards[index] = { ...card, title: e.target.value };
                      patch({ cards });
                    }}
                  />
                </Field>
                <Field label="Subtitle">
                  <input
                    className={inputClass}
                    value={card.subtitle}
                    onChange={(e) => {
                      const cards = [...sig.cards];
                      cards[index] = { ...card, subtitle: e.target.value };
                      patch({ cards });
                    }}
                  />
                </Field>
                <Field label="Badge">
                  <input
                    className={inputClass}
                    value={card.badge}
                    onChange={(e) => {
                      const cards = [...sig.cards];
                      cards[index] = { ...card, badge: e.target.value };
                      patch({ cards });
                    }}
                  />
                </Field>
                <Field label="Link">
                  <input
                    className={inputClass}
                    value={card.href}
                    onChange={(e) => {
                      const cards = [...sig.cards];
                      cards[index] = { ...card, href: e.target.value };
                      patch({ cards });
                    }}
                  />
                </Field>
                <Field label="Image alt">
                  <input
                    className={inputClass}
                    value={card.imageAlt}
                    onChange={(e) => {
                      const cards = [...sig.cards];
                      cards[index] = { ...card, imageAlt: e.target.value };
                      patch({ cards });
                    }}
                  />
                </Field>
                <Field label="Icon">
                  <select
                    className={inputClass}
                    value={card.icon}
                    onChange={(e) => {
                      const cards = [...sig.cards];
                      cards[index] = { ...card, icon: e.target.value as SignatureCardIcon };
                      patch({ cards });
                    }}
                  >
                    {CARD_ICONS.map((opt) => (
                      <option key={opt.id} value={opt.id}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={card.imageSrc} alt="" className="h-20 w-16 rounded object-cover" />
                <OrbitMediaButtons
                  onPicked={async (url) => {
                    const cards: SignatureStoryCard[] = [...sig.cards];
                    cards[index] = { ...card, imageSrc: url };
                    const next = { ...content, signature: { ...sig, cards } };
                    setContent(next);
                    await save(next);
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-semibold text-gold">Footer items</h3>
        <div className="grid gap-3 lg:grid-cols-2">
          {sig.footItems.map((item, index) => (
            <div key={item.id} className="space-y-2 rounded-lg border border-white/10 p-3">
              <Field label="Title">
                <input
                  className={inputClass}
                  value={item.title}
                  onChange={(e) => {
                    const footItems = [...sig.footItems];
                    footItems[index] = { ...item, title: e.target.value };
                    patch({ footItems });
                  }}
                />
              </Field>
              <Field label="Subtitle">
                <input
                  className={inputClass}
                  value={item.subtitle}
                  onChange={(e) => {
                    const footItems = [...sig.footItems];
                    footItems[index] = { ...item, subtitle: e.target.value };
                    patch({ footItems });
                  }}
                />
              </Field>
              <Field label="Icon">
                <select
                  className={inputClass}
                  value={item.icon}
                  onChange={(e) => {
                    const footItems = [...sig.footItems];
                    footItems[index] = { ...item, icon: e.target.value as SignatureFootIcon };
                    patch({ footItems });
                  }}
                >
                  {FOOT_ICONS.map((opt) => (
                    <option key={opt.id} value={opt.id}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </Field>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

"use client";

import type {
  ExploreHubCard,
  ExploreHubCardIcon,
  ExploreHubPillar,
  ExploreHubPillarIcon,
  ExploreHubTab,
  SiteContent,
} from "@/lib/content-types";
import type { ReactNode } from "react";
import { OrbitMediaButtons } from "@/components/OrbitMediaPicker";

const inputClass =
  "w-full rounded-md border border-white/15 bg-black/35 px-3 py-2 text-sm text-white outline-none focus:border-gold/50";

const PILLAR_ICONS: { id: ExploreHubPillarIcon; label: string }[] = [
  { id: "diamond", label: "Diamond / luxury" },
  { id: "people", label: "Guides" },
  { id: "shield", label: "Safety" },
  { id: "leaf", label: "Responsible" },
  { id: "headset", label: "24/7 support" },
  { id: "custom", label: "Custom icon" },
];

const CARD_ICONS: { id: ExploreHubCardIcon; label: string }[] = [
  { id: "mountain", label: "Mountain" },
  { id: "temple", label: "Temple" },
  { id: "globe", label: "Globe" },
  { id: "calendar", label: "Calendar" },
  { id: "tag", label: "Offer tag" },
  { id: "tent", label: "Tent / lodge" },
  { id: "custom", label: "Custom icon" },
];

function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
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

type Props = {
  content: SiteContent;
  setContent: (next: SiteContent) => void;
  save: (next: SiteContent) => Promise<void>;
};

export default function OrbitExploreHubEditor({ content, setContent, save }: Props) {
  const hub = content.exploreHub;

  function patch(partial: Partial<SiteContent["exploreHub"]>) {
    setContent({ ...content, exploreHub: { ...hub, ...partial } });
  }

  function updatePillar(index: number, next: ExploreHubPillar) {
    const pillars = [...hub.pillars];
    pillars[index] = next;
    patch({ pillars });
  }

  function updateTab(index: number, next: ExploreHubTab) {
    const tabs = [...hub.tabs];
    tabs[index] = next;
    patch({ tabs });
  }

  function updateCard(tabIndex: number, cardIndex: number, next: ExploreHubCard) {
    const tabs = [...hub.tabs];
    const cards = [...tabs[tabIndex].cards];
    cards[cardIndex] = next;
    tabs[tabIndex] = { ...tabs[tabIndex], cards };
    patch({ tabs });
  }

  return (
    <div className="space-y-8">
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={hub.visible}
          onChange={(e) => patch({ visible: e.target.checked })}
        />
        Show Explore Hub (below hero)
      </label>

      <Field label="Wallpaper image">
        <div className="space-y-2">
          <input
            className={inputClass}
            value={hub.wallpaperSrc}
            onChange={(e) => patch({ wallpaperSrc: e.target.value })}
          />
          <OrbitMediaButtons
            onPicked={async (url) => {
              const next = { ...content, exploreHub: { ...hub, wallpaperSrc: url } };
              setContent(next);
              await save(next);
            }}
          />
        </div>
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Eyebrow">
          <input className={inputClass} value={hub.eyebrow} onChange={(e) => patch({ eyebrow: e.target.value })} />
        </Field>
        <Field label="Hint line (right of tabs)">
          <input className={inputClass} value={hub.tabHint} onChange={(e) => patch({ tabHint: e.target.value })} />
        </Field>
        <Field label="Headline line 1">
          <input className={inputClass} value={hub.headline} onChange={(e) => patch({ headline: e.target.value })} />
        </Field>
        <Field label="Headline line 2">
          <input
            className={inputClass}
            value={hub.headlineLine2}
            onChange={(e) => patch({ headlineLine2: e.target.value })}
          />
        </Field>
      </div>
      <Field label="Intro text">
        <textarea className={`${inputClass} min-h-24`} value={hub.body} onChange={(e) => patch({ body: e.target.value })} />
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Button label">
          <input className={inputClass} value={hub.ctaLabel} onChange={(e) => patch({ ctaLabel: e.target.value })} />
        </Field>
        <Field label="Button link">
          <input className={inputClass} value={hub.ctaHref} onChange={(e) => patch({ ctaHref: e.target.value })} />
        </Field>
        <Field label="Footer left">
          <input className={inputClass} value={hub.footLeft} onChange={(e) => patch({ footLeft: e.target.value })} />
        </Field>
        <Field label="Footer right">
          <input className={inputClass} value={hub.footRight} onChange={(e) => patch({ footRight: e.target.value })} />
        </Field>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-semibold text-gold">Why pillars</h3>
        <div className="grid gap-3 lg:grid-cols-2">
          {hub.pillars.map((pillar, index) => (
            <div key={pillar.id} className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
              <Field label={`Pillar ${index + 1} title`}>
                <input
                  className={inputClass}
                  value={pillar.title}
                  onChange={(e) => updatePillar(index, { ...pillar, title: e.target.value })}
                />
              </Field>
              <div className="mt-2 grid gap-2 sm:grid-cols-2">
                <Field label="Icon">
                  <select
                    className={inputClass}
                    value={pillar.icon}
                    onChange={(e) =>
                      updatePillar(index, { ...pillar, icon: e.target.value as ExploreHubPillarIcon })
                    }
                  >
                    {PILLAR_ICONS.map((opt) => (
                      <option key={opt.id} value={opt.id}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Custom icon">
                  <OrbitMediaButtons
                    onPicked={async (url) => {
                      const pillars = [...hub.pillars];
                      pillars[index] = { ...pillar, icon: "custom", iconSrc: url };
                      const next = { ...content, exploreHub: { ...hub, pillars } };
                      setContent(next);
                      await save(next);
                    }}
                  />
                </Field>
              </div>
            </div>
          ))}
        </div>
      </div>

      {hub.tabs.map((tab, tabIndex) => (
        <div key={tab.id} className="rounded-xl border border-white/10 bg-black/20 p-4">
          <div className="mb-4 grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
            <Field label={`${tab.label} tab name`}>
              <input
                className={inputClass}
                value={tab.label}
                onChange={(e) => updateTab(tabIndex, { ...tab, label: e.target.value })}
              />
            </Field>
            <button
              type="button"
              className="rounded-md border border-gold/40 px-3 py-2 text-xs font-semibold text-gold"
              onClick={() => {
                updateTab(tabIndex, {
                  ...tab,
                  cards: [
                    ...tab.cards,
                    {
                      id: `card-${Date.now()}`,
                      title: "New card",
                      subtitle: "Add a short line",
                      meta: "New",
                      href: "/",
                      imageSrc: hub.wallpaperSrc,
                      imageAlt: "Explore hub card",
                      icon: "mountain",
                    },
                  ],
                });
              }}
            >
              Add card
            </button>
          </div>

          <div className="space-y-4">
            {tab.cards.map((card, cardIndex) => (
              <div key={card.id} className="rounded-lg border border-white/10 p-3">
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-xs text-white/50">Card {cardIndex + 1}</p>
                  <button
                    type="button"
                    className="text-xs text-red-300"
                    onClick={() => {
                      updateTab(tabIndex, {
                        ...tab,
                        cards: tab.cards.filter((_, i) => i !== cardIndex),
                      });
                    }}
                  >
                    Remove
                  </button>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Field label="Title">
                    <input
                      className={inputClass}
                      value={card.title}
                      onChange={(e) => updateCard(tabIndex, cardIndex, { ...card, title: e.target.value })}
                    />
                  </Field>
                  <Field label="Subtitle">
                    <input
                      className={inputClass}
                      value={card.subtitle}
                      onChange={(e) => updateCard(tabIndex, cardIndex, { ...card, subtitle: e.target.value })}
                    />
                  </Field>
                  <Field label="Meta (packages / offer)">
                    <input
                      className={inputClass}
                      value={card.meta}
                      onChange={(e) => updateCard(tabIndex, cardIndex, { ...card, meta: e.target.value })}
                    />
                  </Field>
                  <Field label="Link">
                    <input
                      className={inputClass}
                      value={card.href}
                      onChange={(e) => updateCard(tabIndex, cardIndex, { ...card, href: e.target.value })}
                    />
                  </Field>
                  <Field label="Image alt">
                    <input
                      className={inputClass}
                      value={card.imageAlt}
                      onChange={(e) => updateCard(tabIndex, cardIndex, { ...card, imageAlt: e.target.value })}
                    />
                  </Field>
                  <Field label="Card icon">
                    <select
                      className={inputClass}
                      value={card.icon}
                      onChange={(e) =>
                        updateCard(tabIndex, cardIndex, {
                          ...card,
                          icon: e.target.value as ExploreHubCardIcon,
                        })
                      }
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
                  <img src={card.imageSrc} alt="" className="h-16 w-24 rounded object-cover" />
                  <OrbitMediaButtons
                    onPicked={async (url) => {
                      const tabs = [...hub.tabs];
                      const cards = [...tabs[tabIndex].cards];
                      cards[cardIndex] = { ...card, imageSrc: url };
                      tabs[tabIndex] = { ...tabs[tabIndex], cards };
                      const next = { ...content, exploreHub: { ...hub, tabs } };
                      setContent(next);
                      await save(next);
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

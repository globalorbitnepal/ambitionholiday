"use client";

import { DEFAULT_CONTENT, type SiteContent } from "@/lib/content-types";

const inputClass =
  "w-full rounded-md border border-white/15 bg-black/35 px-3 py-2 text-sm text-white outline-none focus:border-gold/50";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block space-y-1.5">
      <span className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-white/50">{label}</span>
      {children}
    </label>
  );
}

type Props = {
  content: SiteContent;
  setContent: (next: SiteContent) => void;
  save: (next: SiteContent) => Promise<void>;
};

export default function OrbitPackingEditor({ content, setContent }: Props) {
  const page = content.packing ?? DEFAULT_CONTENT.packing;

  function patch(partial: Partial<SiteContent["packing"]>) {
    setContent({ ...content, packing: { ...page, ...partial } });
  }

  return (
    <div className="space-y-8">
      <p className="rounded-lg border border-gold/25 bg-black/25 px-3 py-2 text-sm text-white/75">
        Public page <strong className="text-gold">/packing-guide</strong> — glass travel-guide copy, no content photos.
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Eyebrow">
          <input className={inputClass} value={page.eyebrow} onChange={(e) => patch({ eyebrow: e.target.value })} />
        </Field>
        <Field label="Headline">
          <input className={inputClass} value={page.headline} onChange={(e) => patch({ headline: e.target.value })} />
        </Field>
        <Field label="Updated label">
          <input className={inputClass} value={page.updatedLabel} onChange={(e) => patch({ updatedLabel: e.target.value })} />
        </Field>
        <Field label="Intro title">
          <input className={inputClass} value={page.introTitle} onChange={(e) => patch({ introTitle: e.target.value })} />
        </Field>
      </div>
      <Field label="Lead">
        <textarea className={`${inputClass} min-h-20`} value={page.lead} onChange={(e) => patch({ lead: e.target.value })} />
      </Field>
      <Field label="Intro body">
        <textarea className={`${inputClass} min-h-28`} value={page.introBody} onChange={(e) => patch({ introBody: e.target.value })} />
      </Field>
      <Field label="Before title">
        <input className={inputClass} value={page.beforeTitle} onChange={(e) => patch({ beforeTitle: e.target.value })} />
      </Field>
      <Field label="Before intro">
        <textarea className={`${inputClass} min-h-16`} value={page.beforeIntro} onChange={(e) => patch({ beforeIntro: e.target.value })} />
      </Field>
      {page.checks.map((item, index) => (
        <div key={item.id} className="space-y-2 rounded-md border border-white/10 p-3">
          <input className={inputClass} value={item.title} onChange={(e) => {
            const checks = [...page.checks];
            checks[index] = { ...item, title: e.target.value };
            patch({ checks });
          }} />
          <textarea className={`${inputClass} min-h-16`} value={item.body} onChange={(e) => {
            const checks = [...page.checks];
            checks[index] = { ...item, body: e.target.value };
            patch({ checks });
          }} />
        </div>
      ))}
      <Field label="Kit title">
        <input className={inputClass} value={page.kitTitle} onChange={(e) => patch({ kitTitle: e.target.value })} />
      </Field>
      {page.groups.map((group, index) => (
        <div key={group.id} className="space-y-2 rounded-md border border-white/10 p-3">
          <input className={inputClass} value={group.title} onChange={(e) => {
            const groups = [...page.groups];
            groups[index] = { ...group, title: e.target.value };
            patch({ groups });
          }} />
          <textarea className={`${inputClass} min-h-16`} value={group.body} onChange={(e) => {
            const groups = [...page.groups];
            groups[index] = { ...group, body: e.target.value };
            patch({ groups });
          }} />
          <textarea className={`${inputClass} min-h-28`} value={group.items.join("\n")} onChange={(e) => {
            const groups = [...page.groups];
            groups[index] = { ...group, items: e.target.value.split("\n").map((line) => line.trim()).filter(Boolean) };
            patch({ groups });
          }} />
        </div>
      ))}
      <Field label="Documents title">
        <input className={inputClass} value={page.documentsTitle} onChange={(e) => patch({ documentsTitle: e.target.value })} />
      </Field>
      <Field label="Documents intro">
        <textarea className={`${inputClass} min-h-16`} value={page.documentsIntro} onChange={(e) => patch({ documentsIntro: e.target.value })} />
      </Field>
      <Field label="Documents (one per line)">
        <textarea className={`${inputClass} min-h-32`} value={page.documents.join("\n")} onChange={(e) => patch({ documents: e.target.value.split("\n").map((line) => line.trim()).filter(Boolean) })} />
      </Field>
      <Field label="Provided title">
        <input className={inputClass} value={page.providedTitle} onChange={(e) => patch({ providedTitle: e.target.value })} />
      </Field>
      <Field label="Provided body">
        <textarea className={`${inputClass} min-h-16`} value={page.providedBody} onChange={(e) => patch({ providedBody: e.target.value })} />
      </Field>
      <Field label="Provided items (one per line)">
        <textarea className={`${inputClass} min-h-20`} value={page.provided.join("\n")} onChange={(e) => patch({ provided: e.target.value.split("\n").map((line) => line.trim()).filter(Boolean) })} />
      </Field>
      <Field label="Season title">
        <input className={inputClass} value={page.seasonTitle} onChange={(e) => patch({ seasonTitle: e.target.value })} />
      </Field>
      <Field label="Season intro">
        <textarea className={`${inputClass} min-h-16`} value={page.seasonIntro} onChange={(e) => patch({ seasonIntro: e.target.value })} />
      </Field>
      {page.seasons.map((item, index) => (
        <div key={item.id} className="space-y-2 rounded-md border border-white/10 p-3">
          <input className={inputClass} value={item.title} onChange={(e) => {
            const seasons = [...page.seasons];
            seasons[index] = { ...item, title: e.target.value };
            patch({ seasons });
          }} />
          <textarea className={`${inputClass} min-h-16`} value={item.body} onChange={(e) => {
            const seasons = [...page.seasons];
            seasons[index] = { ...item, body: e.target.value };
            patch({ seasons });
          }} />
        </div>
      ))}
      <Field label="Luxury title">
        <input className={inputClass} value={page.luxuryTitle} onChange={(e) => patch({ luxuryTitle: e.target.value })} />
      </Field>
      <Field label="Luxury body">
        <textarea className={`${inputClass} min-h-24`} value={page.luxuryBody} onChange={(e) => patch({ luxuryBody: e.target.value })} />
      </Field>
      <Field label="Close title">
        <input className={inputClass} value={page.closeTitle} onChange={(e) => patch({ closeTitle: e.target.value })} />
      </Field>
      <Field label="Close body">
        <textarea className={`${inputClass} min-h-16`} value={page.closeBody} onChange={(e) => patch({ closeBody: e.target.value })} />
      </Field>
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Button">
          <input className={inputClass} value={page.ctaLabel} onChange={(e) => patch({ ctaLabel: e.target.value })} />
        </Field>
        <Field label="Button link">
          <input className={inputClass} value={page.ctaHref} onChange={(e) => patch({ ctaHref: e.target.value })} />
        </Field>
        <Field label="SEO title">
          <input className={inputClass} value={page.metaTitle} onChange={(e) => patch({ metaTitle: e.target.value })} />
        </Field>
      </div>
      <Field label="SEO description">
        <textarea className={`${inputClass} min-h-16`} value={page.metaDescription} onChange={(e) => patch({ metaDescription: e.target.value })} />
      </Field>
    </div>
  );
}

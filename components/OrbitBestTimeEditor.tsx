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

export default function OrbitBestTimeEditor({ content, setContent }: Props) {
  const page = content.bestTime ?? DEFAULT_CONTENT.bestTime;

  function patch(partial: Partial<SiteContent["bestTime"]>) {
    setContent({ ...content, bestTime: { ...page, ...partial } });
  }

  return (
    <div className="space-y-8">
      <p className="rounded-lg border border-gold/25 bg-black/25 px-3 py-2 text-sm text-white/75">
        Public page <strong className="text-gold">/best-time-to-visit</strong> — glass travel-guide copy, no content photos.
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
        <textarea className={`${inputClass} min-h-24`} value={page.lead} onChange={(e) => patch({ lead: e.target.value })} />
      </Field>
      <Field label="Intro body">
        <textarea className={`${inputClass} min-h-32`} value={page.introBody} onChange={(e) => patch({ introBody: e.target.value })} />
      </Field>
      <Field label="Calendar title">
        <input className={inputClass} value={page.calendarTitle} onChange={(e) => patch({ calendarTitle: e.target.value })} />
      </Field>
      <Field label="Calendar intro">
        <textarea className={`${inputClass} min-h-16`} value={page.calendarIntro} onChange={(e) => patch({ calendarIntro: e.target.value })} />
      </Field>
      <p className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-white/50">Months</p>
      {page.months.map((row, index) => (
        <div key={row.id} className="grid gap-2 sm:grid-cols-5">
          <input className={inputClass} value={row.month} onChange={(e) => {
            const months = [...page.months];
            months[index] = { ...row, month: e.target.value };
            patch({ months });
          }} />
          <input className={inputClass} value={row.weather} onChange={(e) => {
            const months = [...page.months];
            months[index] = { ...row, weather: e.target.value };
            patch({ months });
          }} />
          <input className={inputClass} value={row.temp} onChange={(e) => {
            const months = [...page.months];
            months[index] = { ...row, temp: e.target.value };
            patch({ months });
          }} />
          <input className={inputClass} value={row.crowds} onChange={(e) => {
            const months = [...page.months];
            months[index] = { ...row, crowds: e.target.value };
            patch({ months });
          }} />
          <input className={inputClass} value={row.bestFor} onChange={(e) => {
            const months = [...page.months];
            months[index] = { ...row, bestFor: e.target.value };
            patch({ months });
          }} />
        </div>
      ))}
      <Field label="Seasons title">
        <input className={inputClass} value={page.seasonsTitle} onChange={(e) => patch({ seasonsTitle: e.target.value })} />
      </Field>
      {page.seasons.map((season, index) => (
        <div key={season.id} className="space-y-2 rounded-md border border-white/10 p-3">
          <input className={inputClass} value={season.eyebrow} onChange={(e) => {
            const seasons = [...page.seasons];
            seasons[index] = { ...season, eyebrow: e.target.value };
            patch({ seasons });
          }} />
          <input className={inputClass} value={season.title} onChange={(e) => {
            const seasons = [...page.seasons];
            seasons[index] = { ...season, title: e.target.value };
            patch({ seasons });
          }} />
          <input className={inputClass} value={season.meta} onChange={(e) => {
            const seasons = [...page.seasons];
            seasons[index] = { ...season, meta: e.target.value };
            patch({ seasons });
          }} />
          <textarea className={`${inputClass} min-h-28`} value={season.body} onChange={(e) => {
            const seasons = [...page.seasons];
            seasons[index] = { ...season, body: e.target.value };
            patch({ seasons });
          }} />
          <input className={inputClass} value={season.highlights.join(" · ")} onChange={(e) => {
            const seasons = [...page.seasons];
            seasons[index] = {
              ...season,
              highlights: e.target.value.split("·").map((item) => item.trim()).filter(Boolean),
            };
            patch({ seasons });
          }} />
        </div>
      ))}
      <Field label="Regions title">
        <input className={inputClass} value={page.regionsTitle} onChange={(e) => patch({ regionsTitle: e.target.value })} />
      </Field>
      <Field label="Regions intro">
        <textarea className={`${inputClass} min-h-16`} value={page.regionsIntro} onChange={(e) => patch({ regionsIntro: e.target.value })} />
      </Field>
      {page.regions.map((region, index) => (
        <div key={region.id} className="space-y-2 rounded-md border border-white/10 p-3">
          <input className={inputClass} value={region.title} onChange={(e) => {
            const regions = [...page.regions];
            regions[index] = { ...region, title: e.target.value };
            patch({ regions });
          }} />
          <textarea className={`${inputClass} min-h-20`} value={region.body} onChange={(e) => {
            const regions = [...page.regions];
            regions[index] = { ...region, body: e.target.value };
            patch({ regions });
          }} />
        </div>
      ))}
      <Field label="Altitude title">
        <input className={inputClass} value={page.altitudeTitle} onChange={(e) => patch({ altitudeTitle: e.target.value })} />
      </Field>
      <Field label="Altitude intro">
        <textarea className={`${inputClass} min-h-16`} value={page.altitudeIntro} onChange={(e) => patch({ altitudeIntro: e.target.value })} />
      </Field>
      {page.altitudes.map((row, index) => (
        <div key={row.id} className="grid gap-2 sm:grid-cols-6">
          <input className={inputClass} value={row.zone} onChange={(e) => {
            const altitudes = [...page.altitudes];
            altitudes[index] = { ...row, zone: e.target.value };
            patch({ altitudes });
          }} />
          <input className={inputClass} value={row.place} onChange={(e) => {
            const altitudes = [...page.altitudes];
            altitudes[index] = { ...row, place: e.target.value };
            patch({ altitudes });
          }} />
          <input className={inputClass} value={row.spring} onChange={(e) => {
            const altitudes = [...page.altitudes];
            altitudes[index] = { ...row, spring: e.target.value };
            patch({ altitudes });
          }} />
          <input className={inputClass} value={row.monsoon} onChange={(e) => {
            const altitudes = [...page.altitudes];
            altitudes[index] = { ...row, monsoon: e.target.value };
            patch({ altitudes });
          }} />
          <input className={inputClass} value={row.autumn} onChange={(e) => {
            const altitudes = [...page.altitudes];
            altitudes[index] = { ...row, autumn: e.target.value };
            patch({ altitudes });
          }} />
          <input className={inputClass} value={row.winter} onChange={(e) => {
            const altitudes = [...page.altitudes];
            altitudes[index] = { ...row, winter: e.target.value };
            patch({ altitudes });
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

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

export default function OrbitPermitsEditor({ content, setContent }: Props) {
  const page = content.permits ?? DEFAULT_CONTENT.permits;

  function patch(partial: Partial<SiteContent["permits"]>) {
    setContent({ ...content, permits: { ...page, ...partial } });
  }

  return (
    <div className="space-y-8">
      <p className="rounded-lg border border-gold/25 bg-black/25 px-3 py-2 text-sm text-white/75">
        Public page <strong className="text-gold">/permits-and-fees</strong> — official NTB / Immigration / NMA figures. No content photos.
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
      <Field label="Families title">
        <input className={inputClass} value={page.familiesTitle} onChange={(e) => patch({ familiesTitle: e.target.value })} />
      </Field>
      <Field label="Families intro">
        <textarea className={`${inputClass} min-h-16`} value={page.familiesIntro} onChange={(e) => patch({ familiesIntro: e.target.value })} />
      </Field>
      {page.families.map((card, index) => (
        <div key={card.id} className="space-y-2 rounded-md border border-white/10 p-3">
          <input className={inputClass} value={card.title} onChange={(e) => {
            const families = [...page.families];
            families[index] = { ...card, title: e.target.value };
            patch({ families });
          }} />
          <textarea className={`${inputClass} min-h-16`} value={card.body} onChange={(e) => {
            const families = [...page.families];
            families[index] = { ...card, body: e.target.value };
            patch({ families });
          }} />
        </div>
      ))}
      <Field label="Routes title">
        <input className={inputClass} value={page.routesTitle} onChange={(e) => patch({ routesTitle: e.target.value })} />
      </Field>
      <Field label="Routes intro">
        <textarea className={`${inputClass} min-h-16`} value={page.routesIntro} onChange={(e) => patch({ routesIntro: e.target.value })} />
      </Field>
      {page.routes.map((item, index) => (
        <div key={item.id} className="space-y-2 rounded-md border border-white/10 p-3">
          <input className={inputClass} value={item.title} onChange={(e) => {
            const routes = [...page.routes];
            routes[index] = { ...item, title: e.target.value };
            patch({ routes });
          }} />
          <textarea className={`${inputClass} min-h-16`} value={item.body} onChange={(e) => {
            const routes = [...page.routes];
            routes[index] = { ...item, body: e.target.value };
            patch({ routes });
          }} />
        </div>
      ))}
      <Field label="Park title">
        <input className={inputClass} value={page.parkTitle} onChange={(e) => patch({ parkTitle: e.target.value })} />
      </Field>
      <Field label="Park intro">
        <textarea className={`${inputClass} min-h-16`} value={page.parkIntro} onChange={(e) => patch({ parkIntro: e.target.value })} />
      </Field>
      {page.parkFees.map((row, index) => (
        <div key={row.id} className="grid gap-2 sm:grid-cols-4">
          <input className={inputClass} value={row.name} onChange={(e) => {
            const parkFees = [...page.parkFees];
            parkFees[index] = { ...row, name: e.target.value };
            patch({ parkFees });
          }} />
          <input className={inputClass} value={row.nepali} onChange={(e) => {
            const parkFees = [...page.parkFees];
            parkFees[index] = { ...row, nepali: e.target.value };
            patch({ parkFees });
          }} />
          <input className={inputClass} value={row.saarc} onChange={(e) => {
            const parkFees = [...page.parkFees];
            parkFees[index] = { ...row, saarc: e.target.value };
            patch({ parkFees });
          }} />
          <input className={inputClass} value={row.foreign} onChange={(e) => {
            const parkFees = [...page.parkFees];
            parkFees[index] = { ...row, foreign: e.target.value };
            patch({ parkFees });
          }} />
        </div>
      ))}
      <Field label="Restricted title">
        <input className={inputClass} value={page.restrictedTitle} onChange={(e) => patch({ restrictedTitle: e.target.value })} />
      </Field>
      <Field label="Restricted intro">
        <textarea className={`${inputClass} min-h-16`} value={page.restrictedIntro} onChange={(e) => patch({ restrictedIntro: e.target.value })} />
      </Field>
      {page.restricted.map((item, index) => (
        <div key={item.id} className="space-y-2 rounded-md border border-white/10 p-3">
          <input className={inputClass} value={item.name} onChange={(e) => {
            const restricted = [...page.restricted];
            restricted[index] = { ...item, name: e.target.value };
            patch({ restricted });
          }} />
          <input className={inputClass} value={item.fee} onChange={(e) => {
            const restricted = [...page.restricted];
            restricted[index] = { ...item, fee: e.target.value };
            patch({ restricted });
          }} />
          <textarea className={`${inputClass} min-h-16`} value={item.body} onChange={(e) => {
            const restricted = [...page.restricted];
            restricted[index] = { ...item, body: e.target.value };
            patch({ restricted });
          }} />
        </div>
      ))}
      <Field label="Peak title">
        <input className={inputClass} value={page.peakTitle} onChange={(e) => patch({ peakTitle: e.target.value })} />
      </Field>
      <Field label="Peak intro">
        <textarea className={`${inputClass} min-h-16`} value={page.peakIntro} onChange={(e) => patch({ peakIntro: e.target.value })} />
      </Field>
      {page.peaks.map((row, index) => (
        <div key={row.id} className="grid gap-2 sm:grid-cols-4">
          <input className={inputClass} value={row.name} onChange={(e) => {
            const peaks = [...page.peaks];
            peaks[index] = { ...row, name: e.target.value };
            patch({ peaks });
          }} />
          <input className={inputClass} value={row.height} onChange={(e) => {
            const peaks = [...page.peaks];
            peaks[index] = { ...row, height: e.target.value };
            patch({ peaks });
          }} />
          <input className={inputClass} value={row.spring} onChange={(e) => {
            const peaks = [...page.peaks];
            peaks[index] = { ...row, spring: e.target.value };
            patch({ peaks });
          }} />
          <input className={inputClass} value={row.autumn} onChange={(e) => {
            const peaks = [...page.peaks];
            peaks[index] = { ...row, autumn: e.target.value };
            patch({ peaks });
          }} />
        </div>
      ))}
      <Field label="How we file title">
        <input className={inputClass} value={page.fileTitle} onChange={(e) => patch({ fileTitle: e.target.value })} />
      </Field>
      <Field label="How we file body">
        <textarea className={`${inputClass} min-h-24`} value={page.fileBody} onChange={(e) => patch({ fileBody: e.target.value })} />
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

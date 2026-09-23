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

export default function OrbitVisaEditor({ content, setContent }: Props) {
  const visa = content.visa ?? DEFAULT_CONTENT.visa;

  function patch(partial: Partial<SiteContent["visa"]>) {
    setContent({ ...content, visa: { ...visa, ...partial } });
  }

  return (
    <div className="space-y-8">
      <p className="rounded-lg border border-gold/25 bg-black/25 px-3 py-2 text-sm text-white/75">
        Public page <strong className="text-gold">/visa-and-entry</strong> — text only, no content photos. Fee tables follow official Immigration / NTB figures.
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Eyebrow">
          <input className={inputClass} value={visa.eyebrow} onChange={(e) => patch({ eyebrow: e.target.value })} />
        </Field>
        <Field label="Headline">
          <input className={inputClass} value={visa.headline} onChange={(e) => patch({ headline: e.target.value })} />
        </Field>
        <Field label="Updated label">
          <input className={inputClass} value={visa.updatedLabel} onChange={(e) => patch({ updatedLabel: e.target.value })} />
        </Field>
        <Field label="Intro title">
          <input className={inputClass} value={visa.introTitle} onChange={(e) => patch({ introTitle: e.target.value })} />
        </Field>
      </div>
      <Field label="Lead">
        <textarea className={`${inputClass} min-h-20`} value={visa.lead} onChange={(e) => patch({ lead: e.target.value })} />
      </Field>
      <Field label="Intro body">
        <textarea className={`${inputClass} min-h-28`} value={visa.introBody} onChange={(e) => patch({ introBody: e.target.value })} />
      </Field>
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Nepal eyebrow">
          <input className={inputClass} value={visa.nepalEyebrow} onChange={(e) => patch({ nepalEyebrow: e.target.value })} />
        </Field>
        <Field label="Nepal title">
          <input className={inputClass} value={visa.nepalTitle} onChange={(e) => patch({ nepalTitle: e.target.value })} />
        </Field>
      </div>
      <Field label="Nepal body">
        <textarea className={`${inputClass} min-h-20`} value={visa.nepalBody} onChange={(e) => patch({ nepalBody: e.target.value })} />
      </Field>
      <Field label="Visa title">
        <input className={inputClass} value={visa.visaTitle} onChange={(e) => patch({ visaTitle: e.target.value })} />
      </Field>
      <Field label="Visa body">
        <textarea className={`${inputClass} min-h-24`} value={visa.visaBody} onChange={(e) => patch({ visaBody: e.target.value })} />
      </Field>
      <Field label="Visa note">
        <textarea className={`${inputClass} min-h-16`} value={visa.visaNote} onChange={(e) => patch({ visaNote: e.target.value })} />
      </Field>

      <div>
        <p className="mb-2 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-white/50">On-arrival visa fees</p>
        {visa.visaFees.map((fee, index) => (
          <div key={fee.id} className="mb-2 grid gap-2 sm:grid-cols-2">
            <input className={inputClass} value={fee.days} onChange={(e) => {
              const visaFees = [...visa.visaFees];
              visaFees[index] = { ...fee, days: e.target.value };
              patch({ visaFees });
            }} />
            <input className={inputClass} value={fee.amount} onChange={(e) => {
              const visaFees = [...visa.visaFees];
              visaFees[index] = { ...fee, amount: e.target.value };
              patch({ visaFees });
            }} />
          </div>
        ))}
      </div>

      <Field label="Permit title">
        <input className={inputClass} value={visa.permitTitle} onChange={(e) => patch({ permitTitle: e.target.value })} />
      </Field>
      <Field label="Permit body">
        <textarea className={`${inputClass} min-h-20`} value={visa.permitBody} onChange={(e) => patch({ permitBody: e.target.value })} />
      </Field>
      {visa.permitCards.map((card, index) => (
        <div key={card.id} className="space-y-2 rounded-md border border-white/10 p-3">
          <input className={inputClass} value={card.title} onChange={(e) => {
            const permitCards = [...visa.permitCards];
            permitCards[index] = { ...card, title: e.target.value };
            patch({ permitCards });
          }} />
          <textarea className={`${inputClass} min-h-16`} value={card.body} onChange={(e) => {
            const permitCards = [...visa.permitCards];
            permitCards[index] = { ...card, body: e.target.value };
            patch({ permitCards });
          }} />
        </div>
      ))}

      <Field label="Online permits title">
        <input className={inputClass} value={visa.onlineTitle} onChange={(e) => patch({ onlineTitle: e.target.value })} />
      </Field>
      <Field label="Online permits body">
        <textarea className={`${inputClass} min-h-24`} value={visa.onlineBody} onChange={(e) => patch({ onlineBody: e.target.value })} />
      </Field>
      <Field label="Park table title">
        <input className={inputClass} value={visa.parkTitle} onChange={(e) => patch({ parkTitle: e.target.value })} />
      </Field>
      <Field label="Park intro">
        <textarea className={`${inputClass} min-h-16`} value={visa.parkIntro} onChange={(e) => patch({ parkIntro: e.target.value })} />
      </Field>
      {visa.parkFees.map((row, index) => (
        <div key={row.id} className="grid gap-2 sm:grid-cols-4">
          <input className={inputClass} value={row.name} onChange={(e) => {
            const parkFees = [...visa.parkFees];
            parkFees[index] = { ...row, name: e.target.value };
            patch({ parkFees });
          }} />
          <input className={inputClass} value={row.nepali} onChange={(e) => {
            const parkFees = [...visa.parkFees];
            parkFees[index] = { ...row, nepali: e.target.value };
            patch({ parkFees });
          }} />
          <input className={inputClass} value={row.saarc} onChange={(e) => {
            const parkFees = [...visa.parkFees];
            parkFees[index] = { ...row, saarc: e.target.value };
            patch({ parkFees });
          }} />
          <input className={inputClass} value={row.foreign} onChange={(e) => {
            const parkFees = [...visa.parkFees];
            parkFees[index] = { ...row, foreign: e.target.value };
            patch({ parkFees });
          }} />
        </div>
      ))}

      <Field label="Restricted title">
        <input className={inputClass} value={visa.restrictedTitle} onChange={(e) => patch({ restrictedTitle: e.target.value })} />
      </Field>
      <Field label="Restricted intro">
        <textarea className={`${inputClass} min-h-16`} value={visa.restrictedIntro} onChange={(e) => patch({ restrictedIntro: e.target.value })} />
      </Field>
      {visa.restricted.map((item, index) => (
        <div key={item.id} className="space-y-2 rounded-md border border-white/10 p-3">
          <input className={inputClass} value={item.name} onChange={(e) => {
            const restricted = [...visa.restricted];
            restricted[index] = { ...item, name: e.target.value };
            patch({ restricted });
          }} />
          <input className={inputClass} value={item.fee} onChange={(e) => {
            const restricted = [...visa.restricted];
            restricted[index] = { ...item, fee: e.target.value };
            patch({ restricted });
          }} />
          <textarea className={`${inputClass} min-h-16`} value={item.body} onChange={(e) => {
            const restricted = [...visa.restricted];
            restricted[index] = { ...item, body: e.target.value };
            patch({ restricted });
          }} />
        </div>
      ))}

      <Field label="Airport title">
        <input className={inputClass} value={visa.airportTitle} onChange={(e) => patch({ airportTitle: e.target.value })} />
      </Field>
      <Field label="Airport body">
        <textarea className={`${inputClass} min-h-16`} value={visa.airportBody} onChange={(e) => patch({ airportBody: e.target.value })} />
      </Field>
      {visa.airportSteps.map((step, index) => (
        <div key={step.id} className="space-y-2 rounded-md border border-white/10 p-3">
          <input className={inputClass} value={step.title} onChange={(e) => {
            const airportSteps = [...visa.airportSteps];
            airportSteps[index] = { ...step, title: e.target.value };
            patch({ airportSteps });
          }} />
          <textarea className={`${inputClass} min-h-16`} value={step.body} onChange={(e) => {
            const airportSteps = [...visa.airportSteps];
            airportSteps[index] = { ...step, body: e.target.value };
            patch({ airportSteps });
          }} />
        </div>
      ))}

      <Field label="Register title">
        <input className={inputClass} value={visa.registerTitle} onChange={(e) => patch({ registerTitle: e.target.value })} />
      </Field>
      <Field label="Register body">
        <textarea className={`${inputClass} min-h-16`} value={visa.registerBody} onChange={(e) => patch({ registerBody: e.target.value })} />
      </Field>
      {visa.countries.map((country, index) => (
        <div key={country.id} className="space-y-2 rounded-md border border-white/10 p-3">
          <input className={inputClass} value={country.eyebrow} onChange={(e) => {
            const countries = [...visa.countries];
            countries[index] = { ...country, eyebrow: e.target.value };
            patch({ countries });
          }} />
          <input className={inputClass} value={country.title} onChange={(e) => {
            const countries = [...visa.countries];
            countries[index] = { ...country, title: e.target.value };
            patch({ countries });
          }} />
          <textarea className={`${inputClass} min-h-20`} value={country.body} onChange={(e) => {
            const countries = [...visa.countries];
            countries[index] = { ...country, body: e.target.value };
            patch({ countries });
          }} />
        </div>
      ))}

      <Field label="Close title">
        <input className={inputClass} value={visa.closeTitle} onChange={(e) => patch({ closeTitle: e.target.value })} />
      </Field>
      <Field label="Close body">
        <textarea className={`${inputClass} min-h-16`} value={visa.closeBody} onChange={(e) => patch({ closeBody: e.target.value })} />
      </Field>
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Button">
          <input className={inputClass} value={visa.ctaLabel} onChange={(e) => patch({ ctaLabel: e.target.value })} />
        </Field>
        <Field label="Button link">
          <input className={inputClass} value={visa.ctaHref} onChange={(e) => patch({ ctaHref: e.target.value })} />
        </Field>
        <Field label="SEO title">
          <input className={inputClass} value={visa.metaTitle} onChange={(e) => patch({ metaTitle: e.target.value })} />
        </Field>
      </div>
      <Field label="SEO description">
        <textarea className={`${inputClass} min-h-16`} value={visa.metaDescription} onChange={(e) => patch({ metaDescription: e.target.value })} />
      </Field>
    </div>
  );
}

"use client";

import { useState } from "react";
import { DEFAULT_CONTENT, type AboutLicense, type AboutPillar, type SiteContent } from "@/lib/content-types";
import { mediaSrc } from "@/lib/media-src";
import { OrbitMediaButtons } from "@/components/OrbitMediaPicker";
import { postOrbitUpload } from "@/lib/orbit-upload-client";

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

async function uploadFile(file: File): Promise<string> {
  return postOrbitUpload(file);
}

type Props = {
  content: SiteContent;
  setContent: (next: SiteContent) => void;
  save: (next: SiteContent) => Promise<void>;
};

export default function OrbitAboutEditor({ content, setContent, save }: Props) {
  const about = content.about ?? DEFAULT_CONTENT.about;
  const [busy, setBusy] = useState<string | null>(null);

  function patch(partial: Partial<SiteContent["about"]>) {
    setContent({ ...content, about: { ...about, ...partial } });
  }

  async function replaceImage(field: "wallpaperSrc" | "storyImageSrc" | "sisterImageSrc", file: File) {
    setBusy(field);
    try {
      const url = await uploadFile(file);
      const next = { ...content, about: { ...about, [field]: url } };
      setContent(next);
      await save(next);
    } catch {
      window.alert("Upload failed. Try a JPG or PNG under 12MB.");
    } finally {
      setBusy(null);
    }
  }

  async function replacePillarImage(index: number, file: File) {
    setBusy(`pillar-${index}`);
    try {
      const url = await uploadFile(file);
      const pillars = [...about.pillars];
      pillars[index] = { ...pillars[index], imageSrc: url };
      const next = { ...content, about: { ...about, pillars } };
      setContent(next);
      await save(next);
    } catch {
      window.alert("Upload failed. Try a JPG or PNG under 12MB.");
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className="space-y-8">
      <p className="rounded-lg border border-gold/25 bg-black/25 px-3 py-2 text-sm text-white/75">
        Edits the public <strong className="text-gold">/company</strong> page — About Us lives inside Company, with 10+ years, sister company, and the questions form.
      </p>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={about.visible} onChange={(e) => patch({ visible: e.target.checked })} />
        Page visible
      </label>

      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Eyebrow">
          <input className={inputClass} value={about.eyebrow} onChange={(e) => patch({ eyebrow: e.target.value })} />
        </Field>
        <Field label="Headline">
          <input className={inputClass} value={about.headline} onChange={(e) => patch({ headline: e.target.value })} />
        </Field>
        <Field label="Experience kicker (e.g. 10+ years)">
          <input className={inputClass} value={about.experienceKicker} onChange={(e) => patch({ experienceKicker: e.target.value })} />
        </Field>
        <Field label="Experience title">
          <input className={inputClass} value={about.experienceTitle} onChange={(e) => patch({ experienceTitle: e.target.value })} />
        </Field>
      </div>
      <Field label="Lead">
        <textarea className={`${inputClass} min-h-20`} value={about.lead} onChange={(e) => patch({ lead: e.target.value })} />
      </Field>
      <Field label="Experience body (blank line = new paragraph)">
        <textarea className={`${inputClass} min-h-32`} value={about.experienceBody} onChange={(e) => patch({ experienceBody: e.target.value })} />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        {([
          ["wallpaperSrc", "Wallpaper"],
          ["storyImageSrc", "Story image"],
          ["sisterImageSrc", "Sister company image"],
        ] as const).map(([field, label]) => (
          <div key={field} className="space-y-2">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-white/50">{label}</p>
            <div className="relative aspect-video overflow-hidden rounded-md bg-black/40">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={mediaSrc(about[field], content.updatedAt)} alt="" className="absolute inset-0 h-full w-full object-cover" />
            </div>
            <label className="inline-flex cursor-pointer rounded-md border border-gold/40 px-3 py-2 text-xs font-semibold text-gold">
              {busy === field ? "Uploading…" : "Replace"}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                disabled={busy !== null}
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  e.target.value = "";
                  if (file) await replaceImage(field, file);
                }}
              />
            </label>
            <OrbitMediaButtons onPicked={(url) => patch({ [field]: url })} />
            <Field label={`${label} alt`}>
              <input
                className={inputClass}
                value={field === "storyImageSrc" ? about.storyImageAlt : field === "sisterImageSrc" ? about.sisterImageAlt : ""}
                onChange={(e) =>
                  field === "storyImageSrc"
                    ? patch({ storyImageAlt: e.target.value })
                    : field === "sisterImageSrc"
                      ? patch({ sisterImageAlt: e.target.value })
                      : undefined
                }
              />
            </Field>
          </div>
        ))}
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Sister eyebrow">
          <input className={inputClass} value={about.sisterEyebrow} onChange={(e) => patch({ sisterEyebrow: e.target.value })} />
        </Field>
        <Field label="Sister company name">
          <input className={inputClass} value={about.sisterName} onChange={(e) => patch({ sisterName: e.target.value })} />
        </Field>
        <Field label="Sister website">
          <input className={inputClass} value={about.sisterHref} onChange={(e) => patch({ sisterHref: e.target.value })} />
        </Field>
        <Field label="Sister button">
          <input className={inputClass} value={about.sisterCta} onChange={(e) => patch({ sisterCta: e.target.value })} />
        </Field>
      </div>
      <Field label="Sister company details">
        <textarea className={`${inputClass} min-h-36`} value={about.sisterBody} onChange={(e) => patch({ sisterBody: e.target.value })} />
      </Field>

      <Field label="How we work title">
        <input className={inputClass} value={about.storyTitle} onChange={(e) => patch({ storyTitle: e.target.value })} />
      </Field>
      <Field label="How we work intro">
        <textarea className={`${inputClass} min-h-20`} value={about.storyBody} onChange={(e) => patch({ storyBody: e.target.value })} />
      </Field>

      <div>
        <div className="mb-3 flex items-center justify-between">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-white/50">Stats</p>
          <button
            type="button"
            className="rounded border border-white/20 px-2 py-1 text-[0.65rem]"
            onClick={() => patch({ stats: [...about.stats, { id: `st-${Date.now()}`, value: "10+", label: "New stat" }] })}
          >
            Add stat
          </button>
        </div>
        <div className="space-y-3">
          {about.stats.map((stat, index) => (
            <div key={stat.id} className="grid gap-2 rounded-md border border-white/10 p-3 sm:grid-cols-[7rem_1fr_auto]">
              <input className={inputClass} value={stat.value} onChange={(e) => {
                const stats = [...about.stats];
                stats[index] = { ...stat, value: e.target.value };
                patch({ stats });
              }} />
              <input className={inputClass} value={stat.label} onChange={(e) => {
                const stats = [...about.stats];
                stats[index] = { ...stat, label: e.target.value };
                patch({ stats });
              }} />
              <button type="button" className="text-[0.65rem] text-red-200" onClick={() => patch({ stats: about.stats.filter((_, i) => i !== index) })}>
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="mb-3 flex items-center justify-between">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-white/50">Pillars</p>
          <button
            type="button"
            className="rounded border border-white/20 px-2 py-1 text-[0.65rem]"
            onClick={() =>
              patch({
                pillars: [
                  ...about.pillars,
                  {
                    id: `p-${Date.now()}`,
                    title: "New pillar",
                    body: "",
                    imageSrc: DEFAULT_CONTENT.about.pillars[0].imageSrc,
                    imageAlt: "",
                  } satisfies AboutPillar,
                ],
              })
            }
          >
            Add pillar
          </button>
        </div>
        <div className="space-y-4">
          {about.pillars.map((pillar, index) => (
            <div key={pillar.id} className="space-y-2 rounded-lg border border-white/10 p-4">
              <div className="flex justify-between">
                <p className="text-xs text-gold">{pillar.title || `Pillar ${index + 1}`}</p>
                <button type="button" className="text-[0.65rem] text-red-200" onClick={() => patch({ pillars: about.pillars.filter((_, i) => i !== index) })}>
                  Delete
                </button>
              </div>
              <div className="relative aspect-video overflow-hidden rounded-md bg-black/40">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={mediaSrc(pillar.imageSrc, content.updatedAt)} alt="" className="absolute inset-0 h-full w-full object-cover" />
              </div>
              <label className="inline-flex cursor-pointer rounded-md border border-gold/40 px-3 py-2 text-xs font-semibold text-gold">
                {busy === `pillar-${index}` ? "Uploading…" : "Replace image"}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  disabled={busy !== null}
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    e.target.value = "";
                    if (file) await replacePillarImage(index, file);
                  }}
                />
              </label>
              <OrbitMediaButtons
                onPicked={(url) => {
                  const pillars = [...about.pillars];
                  pillars[index] = { ...pillar, imageSrc: url };
                  patch({ pillars });
                }}
              />
              <input className={inputClass} value={pillar.title} onChange={(e) => {
                const pillars = [...about.pillars];
                pillars[index] = { ...pillar, title: e.target.value };
                patch({ pillars });
              }} />
              <textarea className={`${inputClass} min-h-20`} value={pillar.body} onChange={(e) => {
                const pillars = [...about.pillars];
                pillars[index] = { ...pillar, body: e.target.value };
                patch({ pillars });
              }} />
              <input className={inputClass} value={pillar.imageAlt} placeholder="Image alt" onChange={(e) => {
                const pillars = [...about.pillars];
                pillars[index] = { ...pillar, imageAlt: e.target.value };
                patch({ pillars });
              }} />
            </div>
          ))}
        </div>
      </div>

      <Field label="Licences title">
        <input className={inputClass} value={about.licensesTitle} onChange={(e) => patch({ licensesTitle: e.target.value })} />
      </Field>
      <div>
        <div className="mb-3 flex items-center justify-between">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-white/50">Licences / memberships</p>
          <button
            type="button"
            className="rounded border border-white/20 px-2 py-1 text-[0.65rem]"
            onClick={() => patch({ licenses: [...about.licenses, { id: `lic-${Date.now()}`, label: "Label", value: "Value" } satisfies AboutLicense] })}
          >
            Add
          </button>
        </div>
        {about.licenses.map((item, index) => (
          <div key={item.id} className="mb-2 grid gap-2 sm:grid-cols-[12rem_1fr_auto]">
            <input className={inputClass} value={item.label} onChange={(e) => {
              const licenses = [...about.licenses];
              licenses[index] = { ...item, label: e.target.value };
              patch({ licenses });
            }} />
            <input className={inputClass} value={item.value} onChange={(e) => {
              const licenses = [...about.licenses];
              licenses[index] = { ...item, value: e.target.value };
              patch({ licenses });
            }} />
            <button type="button" className="text-[0.65rem] text-red-200" onClick={() => patch({ licenses: about.licenses.filter((_, i) => i !== index) })}>
              Remove
            </button>
          </div>
        ))}
      </div>

      <Field label="Promise title">
        <input className={inputClass} value={about.promiseTitle} onChange={(e) => patch({ promiseTitle: e.target.value })} />
      </Field>
      <Field label="Promise body">
        <textarea className={`${inputClass} min-h-20`} value={about.promiseBody} onChange={(e) => patch({ promiseBody: e.target.value })} />
      </Field>

      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Form eyebrow">
          <input className={inputClass} value={about.formEyebrow} onChange={(e) => patch({ formEyebrow: e.target.value })} />
        </Field>
        <Field label="Form title">
          <input className={inputClass} value={about.formTitle} onChange={(e) => patch({ formTitle: e.target.value })} />
        </Field>
        <Field label="Form button">
          <input className={inputClass} value={about.formCta} onChange={(e) => patch({ formCta: e.target.value })} />
        </Field>
        <Field label="Success message">
          <input className={inputClass} value={about.formSuccess} onChange={(e) => patch({ formSuccess: e.target.value })} />
        </Field>
      </div>
      <Field label="Form subtitle">
        <textarea className={`${inputClass} min-h-16`} value={about.formSubtitle} onChange={(e) => patch({ formSubtitle: e.target.value })} />
      </Field>

      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Aside title">
          <input className={inputClass} value={about.asideTitle} onChange={(e) => patch({ asideTitle: e.target.value })} />
        </Field>
        <Field label="Address label">
          <input className={inputClass} value={about.addressLabel} onChange={(e) => patch({ addressLabel: e.target.value })} />
        </Field>
        <Field label="Address">
          <input className={inputClass} value={about.address} onChange={(e) => patch({ address: e.target.value })} />
        </Field>
        <Field label="Office phone">
          <input className={inputClass} value={about.officePhone} onChange={(e) => patch({ officePhone: e.target.value })} />
        </Field>
        <Field label="Mobile">
          <input className={inputClass} value={about.mobilePhone} onChange={(e) => patch({ mobilePhone: e.target.value })} />
        </Field>
        <Field label="Email">
          <input className={inputClass} value={about.email} onChange={(e) => patch({ email: e.target.value })} />
        </Field>
        <Field label="WhatsApp link">
          <input className={inputClass} value={about.whatsappHref} onChange={(e) => patch({ whatsappHref: e.target.value })} />
        </Field>
        <Field label="SEO title">
          <input className={inputClass} value={about.metaTitle} onChange={(e) => patch({ metaTitle: e.target.value })} />
        </Field>
      </div>
      <Field label="SEO description">
        <textarea className={`${inputClass} min-h-16`} value={about.metaDescription} onChange={(e) => patch({ metaDescription: e.target.value })} />
      </Field>
    </div>
  );
}

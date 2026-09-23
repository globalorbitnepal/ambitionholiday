"use client";

import { useState } from "react";
import { DEFAULT_CONTENT, type LegalDocumentItem, type SiteContent } from "@/lib/content-types";
import { mediaSrc } from "@/lib/media-src";
import { OrbitMediaPicker } from "@/components/OrbitMediaPicker";
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

type Props = {
  content: SiteContent;
  setContent: (next: SiteContent) => void;
  save: (next: SiteContent) => Promise<void>;
};

export default function OrbitLegalEditor({ content, setContent, save }: Props) {
  const page = content.legalDocuments ?? DEFAULT_CONTENT.legalDocuments;
  const [busy, setBusy] = useState<string | null>(null);
  const [libraryFor, setLibraryFor] = useState<"wallpaper" | number | null>(null);

  function patch(partial: Partial<SiteContent["legalDocuments"]>) {
    setContent({ ...content, legalDocuments: { ...page, ...partial } });
  }

  function commit(partial: Partial<SiteContent["legalDocuments"]>) {
    const next = { ...content, legalDocuments: { ...page, ...partial } };
    setContent(next);
    void save(next);
  }

  function patchDoc(index: number, partial: Partial<LegalDocumentItem>, persist = false) {
    const documents = page.documents.map((doc, i) => (i === index ? { ...doc, ...partial } : doc));
    if (persist) commit({ documents });
    else patch({ documents });
  }

  async function uploadDocument(index: number, file: File) {
    setBusy(`doc-${index}`);
    try {
      const url = await postOrbitUpload(file);
      patchDoc(index, { imageSrc: url }, true);
    } catch (err) {
      window.alert(err instanceof Error ? err.message : "Upload failed. Try a JPG, PNG or WebP.");
    } finally {
      setBusy(null);
    }
  }

  async function uploadWallpaper(file: File) {
    setBusy("wallpaper");
    try {
      commit({ wallpaperSrc: await postOrbitUpload(file) });
    } catch (err) {
      window.alert(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className="space-y-8">
      <p className="rounded-lg border border-gold/25 bg-black/25 px-3 py-2 text-sm text-white/75">
        Public page <strong className="text-gold">/legal-documents</strong> — full text, wallpaper, document scans (upload or media library), form and office details. Save from the top bar.
      </p>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={page.visible} onChange={(e) => patch({ visible: e.target.checked })} />
        Page visible
      </label>

      <div>
        <p className="mb-2 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-white/50">Page background</p>
        {page.wallpaperSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={mediaSrc(page.wallpaperSrc)} alt="" className="mb-2 h-24 w-full max-w-md rounded-md object-cover" />
        ) : null}
        <div className="flex flex-wrap gap-2">
          <label className="cursor-pointer rounded-md border border-gold/40 px-3 py-1.5 text-xs font-semibold text-gold">
            {busy === "wallpaper" ? "Uploading…" : page.wallpaperSrc ? "Replace background" : "Upload background"}
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp,image/jpg"
              className="hidden"
              disabled={busy === "wallpaper"}
              onChange={(e) => {
                const file = e.target.files?.[0];
                e.target.value = "";
                if (file) void uploadWallpaper(file);
              }}
            />
          </label>
          <button
            type="button"
            className="rounded-md border border-white/20 px-3 py-1.5 text-xs text-white/80"
            onClick={() => setLibraryFor("wallpaper")}
          >
            Media library
          </button>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Eyebrow">
          <input className={inputClass} value={page.eyebrow} onChange={(e) => patch({ eyebrow: e.target.value })} />
        </Field>
        <Field label="Headline">
          <input className={inputClass} value={page.headline} onChange={(e) => patch({ headline: e.target.value })} />
        </Field>
      </div>
      <Field label="Lead">
        <textarea className={`${inputClass} min-h-20`} value={page.lead} onChange={(e) => patch({ lead: e.target.value })} />
      </Field>
      <Field label="Intro title">
        <input className={inputClass} value={page.introTitle} onChange={(e) => patch({ introTitle: e.target.value })} />
      </Field>
      <Field label="Intro body">
        <textarea className={`${inputClass} min-h-28`} value={page.introBody} onChange={(e) => patch({ introBody: e.target.value })} />
      </Field>
      <Field label="Documents section title">
        <input className={inputClass} value={page.documentsTitle} onChange={(e) => patch({ documentsTitle: e.target.value })} />
      </Field>

      <div className="space-y-6">
        {page.documents.map((doc, index) => (
          <div key={doc.id} className="rounded-xl border border-white/10 bg-black/20 p-4">
            <div className="mb-3 flex items-center justify-between gap-2">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gold">Document {index + 1}</p>
              <button
                type="button"
                className="text-xs text-red-200/80"
                onClick={() => commit({ documents: page.documents.filter((_, i) => i !== index) })}
              >
                Remove
              </button>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Title">
                <input className={inputClass} value={doc.title} onChange={(e) => patchDoc(index, { title: e.target.value })} />
              </Field>
              <Field label="Image alt">
                <input className={inputClass} value={doc.imageAlt} onChange={(e) => patchDoc(index, { imageAlt: e.target.value })} />
              </Field>
            </div>
            <Field label="Caption">
              <textarea className={`${inputClass} mt-3 min-h-16`} value={doc.body} onChange={(e) => patchDoc(index, { body: e.target.value })} />
            </Field>
            <p className="mt-3 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-white/50">Document scan</p>
            {doc.imageSrc ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={mediaSrc(doc.imageSrc)}
                alt=""
                className="mt-2 max-h-[22rem] w-full max-w-sm rounded-md object-contain bg-black/40"
              />
            ) : (
              <p className="mt-2 text-sm text-white/45">No scan yet — upload or replace from the library.</p>
            )}
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <label className="cursor-pointer rounded-md border border-gold/40 px-3 py-1.5 text-xs font-semibold text-gold">
                {busy === `doc-${index}` ? "Uploading…" : doc.imageSrc ? "Replace document" : "Upload document"}
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/jpg"
                  className="hidden"
                  disabled={busy === `doc-${index}`}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    e.target.value = "";
                    if (file) void uploadDocument(index, file);
                  }}
                />
              </label>
              <button
                type="button"
                className="rounded-md border border-white/20 px-3 py-1.5 text-xs text-white/80"
                onClick={() => setLibraryFor(index)}
              >
                Media library
              </button>
            </div>
            <p className="mt-1 text-[0.65rem] text-white/40">{doc.imageSrc || "No file yet"}</p>
          </div>
        ))}
        <button
          type="button"
          className="rounded-md border border-gold/40 px-3 py-2 text-xs font-semibold text-gold"
          onClick={() =>
            commit({
              documents: [
                ...page.documents,
                {
                  id: `doc-${Date.now()}`,
                  title: "New document",
                  body: "Describe this certificate.",
                  imageSrc: "",
                  imageAlt: "",
                },
              ],
            })
          }
        >
          Add document
        </button>
      </div>

      <Field label="Request-copy title">
        <input className={inputClass} value={page.noteTitle} onChange={(e) => patch({ noteTitle: e.target.value })} />
      </Field>
      <Field label="Request-copy body">
        <textarea className={`${inputClass} min-h-20`} value={page.noteBody} onChange={(e) => patch({ noteBody: e.target.value })} />
      </Field>

      <p className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-gold">Questions form</p>
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Form eyebrow">
          <input className={inputClass} value={page.formEyebrow} onChange={(e) => patch({ formEyebrow: e.target.value })} />
        </Field>
        <Field label="Form title">
          <input className={inputClass} value={page.formTitle} onChange={(e) => patch({ formTitle: e.target.value })} />
        </Field>
        <Field label="Form button">
          <input className={inputClass} value={page.formCta} onChange={(e) => patch({ formCta: e.target.value })} />
        </Field>
        <Field label="Success message">
          <input className={inputClass} value={page.formSuccess} onChange={(e) => patch({ formSuccess: e.target.value })} />
        </Field>
      </div>
      <Field label="Form subtitle">
        <textarea className={`${inputClass} min-h-16`} value={page.formSubtitle} onChange={(e) => patch({ formSubtitle: e.target.value })} />
      </Field>

      <p className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-gold">Office sidebar</p>
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Aside title">
          <input className={inputClass} value={page.asideTitle} onChange={(e) => patch({ asideTitle: e.target.value })} />
        </Field>
        <Field label="Address label">
          <input className={inputClass} value={page.addressLabel} onChange={(e) => patch({ addressLabel: e.target.value })} />
        </Field>
        <Field label="Address">
          <input className={inputClass} value={page.address} onChange={(e) => patch({ address: e.target.value })} />
        </Field>
        <Field label="Office phone">
          <input className={inputClass} value={page.officePhone} onChange={(e) => patch({ officePhone: e.target.value })} />
        </Field>
        <Field label="Mobile / WhatsApp">
          <input className={inputClass} value={page.mobilePhone} onChange={(e) => patch({ mobilePhone: e.target.value })} />
        </Field>
        <Field label="Email">
          <input className={inputClass} value={page.email} onChange={(e) => patch({ email: e.target.value })} />
        </Field>
        <Field label="WhatsApp link">
          <input className={inputClass} value={page.whatsappHref} onChange={(e) => patch({ whatsappHref: e.target.value })} />
        </Field>
      </div>

      <p className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-gold">SEO</p>
      <Field label="Meta title">
        <input className={inputClass} value={page.metaTitle} onChange={(e) => patch({ metaTitle: e.target.value })} />
      </Field>
      <Field label="Meta description">
        <textarea className={`${inputClass} min-h-16`} value={page.metaDescription} onChange={(e) => patch({ metaDescription: e.target.value })} />
      </Field>

      <OrbitMediaPicker
        open={libraryFor !== null}
        kind="image"
        onClose={() => setLibraryFor(null)}
        onSelect={(path) => {
          if (libraryFor === "wallpaper") commit({ wallpaperSrc: path });
          else if (typeof libraryFor === "number") patchDoc(libraryFor, { imageSrc: path }, true);
          setLibraryFor(null);
        }}
      />
    </div>
  );
}

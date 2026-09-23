"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import Header from "@/components/Header";
import MediaImage from "@/components/MediaImage";
import SiteFooter from "@/components/SiteFooter";
import DuskAtmosphere from "@/components/DuskAtmosphere";
import { useSiteContent } from "@/components/SiteContentProvider";
import { DEFAULT_CONTENT } from "@/lib/content-types";
import { mediaSrc } from "@/lib/media-src";

function paragraphs(body: string) {
  return body
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean);
}

function telHref(value: string) {
  return `tel:${value.replace(/[^\d+]/g, "")}`;
}

function formatPhone(value: string) {
  if (value === "+97714518413") return "+977 1 4518413";
  if (value === "+9779851148898") return "+977 9851148898";
  return value;
}

export default function LegalDocumentsPage() {
  const { legalDocuments: raw } = useSiteContent();
  const page = { ...DEFAULT_CONTENT.legalDocuments, ...raw, documents: raw?.documents?.length ? raw.documents : DEFAULT_CONTENT.legalDocuments.documents };
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          source: "legal-documents",
          message: data.question,
          interest: "Legal documents question",
        }),
      });
      if (!res.ok) throw new Error("Could not send.");
      form.reset();
      setStatus("ok");
    } catch {
      setStatus("error");
      setError("Could not send. Please email info@ambitionholidays.com.");
    }
  }

  return (
    <main className="min-w-0 overflow-x-clip pb-[env(safe-area-inset-bottom)]">
      <section className="explore-hub visa-hub relative isolate overflow-hidden">
        <div className="absolute inset-0">
          <MediaImage
            src={page.wallpaperSrc || "/images/atmosphere/ebc-premium-section.webp"}
            alt=""
            priority
            sizes="100vw"
            className="h-full w-full object-cover"
            objectPosition="center 38%"
            quality={74}
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,14,22,0.44)_0%,rgba(8,18,28,0.18)_40%,rgba(6,14,22,0.48)_100%)]" />
        </div>
        <Header />
        <div className="explore-hub-shell contact-shell relative">
          <div className="explore-hub-glass contact-glass">
            <p className="explore-hub-eyebrow">{page.eyebrow}</p>
            <h1 className="contact-brand font-[family-name:var(--font-cormorant)]">{page.headline}</h1>
            <p className="contact-lead">{page.lead}</p>
          </div>

          <div className="explore-hub-glass contact-glass about-copy-panel">
            <h2 className="about-h2 font-[family-name:var(--font-cormorant)]">{page.introTitle}</h2>
            {paragraphs(page.introBody).map((para) => (
              <p key={para.slice(0, 48)}>{para}</p>
            ))}
          </div>

          <div className="explore-hub-glass contact-glass about-copy-panel">
            <h2 className="about-h2 font-[family-name:var(--font-cormorant)]">{page.documentsTitle}</h2>
            <ul className="legal-docs">
              {page.documents.map((doc) => (
                <li key={doc.id} className="legal-doc">
                  <div className="legal-doc-frame">
                    {doc.imageSrc ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={mediaSrc(doc.imageSrc)}
                        alt={doc.imageAlt || doc.title}
                        draggable={false}
                        onDragStart={(event) => event.preventDefault()}
                      />
                    ) : (
                      <span className="legal-doc-empty">Scan coming soon</span>
                    )}
                  </div>
                  <div className="legal-doc-copy">
                    <h3 className="font-[family-name:var(--font-cormorant)]">{doc.title}</h3>
                    <p>{doc.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="explore-hub-glass contact-glass about-copy-panel">
            <h2 className="about-h2 font-[family-name:var(--font-cormorant)]">{page.noteTitle}</h2>
            {paragraphs(page.noteBody).map((para) => (
              <p key={para.slice(0, 48)}>{para}</p>
            ))}
          </div>

          <div className="about-split about-form-split">
            <div className="explore-hub-glass contact-glass">
              <p className="explore-hub-eyebrow">{page.formEyebrow}</p>
              <h2 className="about-h2 font-[family-name:var(--font-cormorant)]">{page.formTitle}</h2>
              <p className="contact-lead">{page.formSubtitle}</p>
              <form className="contact-form" onSubmit={onSubmit}>
                <div className="contact-form-row">
                  <label>
                    Full name *
                    <input name="name" required autoComplete="name" placeholder="Your name" />
                  </label>
                  <label>
                    Email *
                    <input name="email" type="email" required autoComplete="email" placeholder="you@email.com" />
                  </label>
                </div>
                <div className="contact-form-row">
                  <label>
                    Phone / WhatsApp
                    <input name="phone" type="tel" autoComplete="tel" placeholder="+977 …" />
                  </label>
                  <label>
                    Country
                    <input name="country" autoComplete="country-name" placeholder="Where are you writing from?" />
                  </label>
                </div>
                <label>
                  Your question *
                  <textarea
                    name="question"
                    required
                    placeholder="Ask for a licence copy, membership proof, or a document for your booking."
                  />
                </label>
                <div className="contact-form-actions">
                  <button type="submit" className="contact-submit" disabled={status === "sending"}>
                    {status === "sending" ? "Sending…" : page.formCta}
                  </button>
                  <a href={page.whatsappHref} className="contact-whatsapp" target="_blank" rel="noopener noreferrer">
                    WhatsApp
                  </a>
                  {status === "ok" ? <p className="contact-form-note is-ok">{page.formSuccess}</p> : null}
                  {status === "error" ? <p className="contact-form-note is-err">{error}</p> : null}
                </div>
              </form>
            </div>

            <aside className="explore-hub-glass contact-glass">
              <p className="explore-hub-eyebrow">Office</p>
              <h2 className="about-h2 font-[family-name:var(--font-cormorant)]">{page.asideTitle}</h2>
              <ul className="contact-aside-list">
                <li>
                  <span>{page.addressLabel}</span>
                  <strong>{page.address}</strong>
                </li>
                <li>
                  <span>Office</span>
                  <a href={telHref(page.officePhone)}>{formatPhone(page.officePhone)}</a>
                </li>
                <li>
                  <span>Mobile / WhatsApp</span>
                  <a href={telHref(page.mobilePhone)}>{formatPhone(page.mobilePhone)}</a>
                </li>
                <li>
                  <span>Email</span>
                  <a href={`mailto:${page.email}`}>{page.email}</a>
                </li>
              </ul>
              <Link href="/contact" className="contact-map-link">
                Open contact page
              </Link>
            </aside>
          </div>
        </div>
      </section>

      <div className="home-light relative isolate [clip-path:inset(0)] text-[#f7f4ef]">
        <DuskAtmosphere />
        <SiteFooter />
      </div>
    </main>
  );
}

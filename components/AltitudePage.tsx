"use client";

import Link from "next/link";
import Header from "@/components/Header";
import MediaImage from "@/components/MediaImage";
import SiteFooter from "@/components/SiteFooter";
import DuskAtmosphere from "@/components/DuskAtmosphere";
import { useSiteContent } from "@/components/SiteContentProvider";
import { DEFAULT_CONTENT } from "@/lib/content-types";

function paragraphs(body: string) {
  return body
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean);
}

export default function AltitudePage() {
  const { altitude: raw } = useSiteContent();
  const page = { ...DEFAULT_CONTENT.altitude, ...raw };

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
            <p className="about-experience-chip">{page.updatedLabel}</p>
            <p className="contact-lead">{page.lead}</p>
          </div>

          <div className="explore-hub-glass contact-glass about-copy-panel">
            <h2 className="about-h2 font-[family-name:var(--font-cormorant)]">{page.introTitle}</h2>
            {paragraphs(page.introBody).map((para) => (
              <p key={para.slice(0, 48)}>{para}</p>
            ))}
          </div>

          <div className="explore-hub-glass contact-glass about-copy-panel">
            <h2 className="about-h2 font-[family-name:var(--font-cormorant)]">{page.beforeTitle}</h2>
            <p className="contact-lead">{page.beforeIntro}</p>
            <ul className="about-licenses">
              {page.checks.map((item) => (
                <li key={item.id}>
                  <span>{item.title}</span>
                  <em>{item.body}</em>
                </li>
              ))}
            </ul>
          </div>

          {page.groups.map((group, index) => (
            <div key={group.id} className="explore-hub-glass contact-glass about-copy-panel">
              {index === 0 ? (
                <h2 className="about-h2 font-[family-name:var(--font-cormorant)]">{page.kitTitle}</h2>
              ) : null}
              <h3 className="visa-h3 font-[family-name:var(--font-cormorant)]">{group.title}</h3>
              <p className="contact-lead">{group.body}</p>
              <ul className="packing-list">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}

          <div className="explore-hub-glass contact-glass about-copy-panel">
            <h2 className="about-h2 font-[family-name:var(--font-cormorant)]">{page.documentsTitle}</h2>
            <p className="contact-lead">{page.documentsIntro}</p>
            <ul className="packing-list">
              {page.documents.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="explore-hub-glass contact-glass about-copy-panel">
            <h2 className="about-h2 font-[family-name:var(--font-cormorant)]">{page.providedTitle}</h2>
            {paragraphs(page.providedBody).map((para) => (
              <p key={para.slice(0, 48)}>{para}</p>
            ))}
            <ul className="seasons-chips packing-provided">
              {page.provided.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="explore-hub-glass contact-glass about-copy-panel">
            <h2 className="about-h2 font-[family-name:var(--font-cormorant)]">{page.seasonTitle}</h2>
            <p className="contact-lead">{page.seasonIntro}</p>
            <ul className="about-licenses">
              {page.seasons.map((item) => (
                <li key={item.id}>
                  <span>{item.title}</span>
                  <em>{item.body}</em>
                </li>
              ))}
            </ul>
          </div>

          <div className="explore-hub-glass contact-glass about-copy-panel">
            <h2 className="about-h2 font-[family-name:var(--font-cormorant)]">{page.luxuryTitle}</h2>
            {paragraphs(page.luxuryBody).map((para) => (
              <p key={para.slice(0, 48)}>{para}</p>
            ))}
          </div>

          <div className="explore-hub-glass contact-glass about-copy-panel visa-close">
            <h2 className="about-h2 font-[family-name:var(--font-cormorant)]">{page.closeTitle}</h2>
            {paragraphs(page.closeBody).map((para) => (
              <p key={para.slice(0, 48)}>{para}</p>
            ))}
            <Link href={page.ctaHref || "/contact"} className="contact-submit">
              {page.ctaLabel}
            </Link>
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

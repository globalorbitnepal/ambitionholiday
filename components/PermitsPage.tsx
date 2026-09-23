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

export default function PermitsPage() {
  const { permits: raw } = useSiteContent();
  const page = { ...DEFAULT_CONTENT.permits, ...raw };

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
            <p className="visa-note">
              Tourist visa on arrival is on{" "}
              <Link href="/visa-and-entry" className="contact-map-link">
                Visa &amp; Entry
              </Link>
              .
            </p>
          </div>

          <div className="explore-hub-glass contact-glass about-copy-panel">
            <h2 className="about-h2 font-[family-name:var(--font-cormorant)]">{page.familiesTitle}</h2>
            <p className="contact-lead">{page.familiesIntro}</p>
            <ul className="about-pillars visa-cards permits-families">
              {page.families.map((card) => (
                <li key={card.id} className="about-pillar">
                  <h3 className="font-[family-name:var(--font-cormorant)]">{card.title}</h3>
                  <p>{card.body}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="explore-hub-glass contact-glass about-copy-panel">
            <h2 className="about-h2 font-[family-name:var(--font-cormorant)]">{page.routesTitle}</h2>
            <p className="contact-lead">{page.routesIntro}</p>
            <ul className="about-licenses">
              {page.routes.map((item) => (
                <li key={item.id}>
                  <span>{item.title}</span>
                  <em>{item.body}</em>
                </li>
              ))}
            </ul>
          </div>

          <div className="explore-hub-glass contact-glass">
            <h2 className="about-h2 font-[family-name:var(--font-cormorant)]">{page.parkTitle}</h2>
            <p className="contact-lead">{page.parkIntro}</p>
            <div className="visa-table-wrap">
              <table className="visa-table">
                <thead>
                  <tr>
                    <th>Area</th>
                    <th>Nepali</th>
                    <th>SAARC</th>
                    <th>Foreign</th>
                  </tr>
                </thead>
                <tbody>
                  {page.parkFees.map((row) => (
                    <tr key={row.id}>
                      <td>{row.name}</td>
                      <td>{row.nepali}</td>
                      <td>{row.saarc}</td>
                      <td>{row.foreign}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="explore-hub-glass contact-glass about-copy-panel">
            <h2 className="about-h2 font-[family-name:var(--font-cormorant)]">{page.restrictedTitle}</h2>
            {paragraphs(page.restrictedIntro).map((para) => (
              <p key={para.slice(0, 48)}>{para}</p>
            ))}
            <ul className="about-licenses">
              {page.restricted.map((item) => (
                <li key={item.id}>
                  <span>{item.name}</span>
                  <strong>{item.fee}</strong>
                  <em>{item.body}</em>
                </li>
              ))}
            </ul>
          </div>

          <div className="explore-hub-glass contact-glass">
            <h2 className="about-h2 font-[family-name:var(--font-cormorant)]">{page.peakTitle}</h2>
            <p className="contact-lead">{page.peakIntro}</p>
            <div className="visa-table-wrap">
              <table className="visa-table">
                <thead>
                  <tr>
                    <th>Peak</th>
                    <th>Height</th>
                    <th>Range</th>
                    <th>Spring</th>
                    <th>Autumn</th>
                    <th>Winter</th>
                    <th>Summer</th>
                  </tr>
                </thead>
                <tbody>
                  {page.peaks.map((row) => (
                    <tr key={row.id}>
                      <td>{row.name}</td>
                      <td>{row.height}</td>
                      <td>{row.range}</td>
                      <td>{row.spring}</td>
                      <td>{row.autumn}</td>
                      <td>{row.winter}</td>
                      <td>{row.summer}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="explore-hub-glass contact-glass about-copy-panel">
            <h2 className="about-h2 font-[family-name:var(--font-cormorant)]">{page.fileTitle}</h2>
            {paragraphs(page.fileBody).map((para) => (
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

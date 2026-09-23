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

export default function VisaPage() {
  const { visa: raw } = useSiteContent();
  const visa = { ...DEFAULT_CONTENT.visa, ...raw };

  return (
    <main className="min-w-0 overflow-x-clip pb-[env(safe-area-inset-bottom)]">
      <section className="explore-hub visa-hub relative isolate overflow-hidden">
        <div className="absolute inset-0">
          <MediaImage
            src={visa.wallpaperSrc || "/images/atmosphere/ebc-premium-section.webp"}
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
            <p className="explore-hub-eyebrow">{visa.eyebrow}</p>
            <h1 className="contact-brand font-[family-name:var(--font-cormorant)]">{visa.headline}</h1>
            <p className="about-experience-chip">{visa.updatedLabel}</p>
            <p className="contact-lead">{visa.lead}</p>
          </div>

          <div className="explore-hub-glass contact-glass about-copy-panel">
            <h2 className="about-h2 font-[family-name:var(--font-cormorant)]">{visa.introTitle}</h2>
            {paragraphs(visa.introBody).map((para) => (
              <p key={para.slice(0, 40)}>{para}</p>
            ))}
          </div>

          <div className="explore-hub-glass contact-glass about-copy-panel">
            <p className="explore-hub-eyebrow">{visa.nepalEyebrow}</p>
            <h2 className="about-h2 font-[family-name:var(--font-cormorant)]">{visa.nepalTitle}</h2>
            {paragraphs(visa.nepalBody).map((para) => (
              <p key={para.slice(0, 40)}>{para}</p>
            ))}
            <h3 className="visa-h3 font-[family-name:var(--font-cormorant)]">{visa.visaTitle}</h3>
            {paragraphs(visa.visaBody).map((para) => (
              <p key={para.slice(0, 40)}>{para}</p>
            ))}
            <ul className="about-stats visa-fee-row">
              {visa.visaFees.map((fee) => (
                <li key={fee.id}>
                  <strong>{fee.amount}</strong>
                  <span>{fee.days}</span>
                </li>
              ))}
            </ul>
            <p className="visa-note">{visa.visaNote}</p>
          </div>

          <div className="explore-hub-glass contact-glass about-copy-panel">
            <h2 className="about-h2 font-[family-name:var(--font-cormorant)]">{visa.permitTitle}</h2>
            {paragraphs(visa.permitBody).map((para) => (
              <p key={para.slice(0, 40)}>{para}</p>
            ))}
            <ul className="about-pillars visa-cards">
              {visa.permitCards.map((card) => (
                <li key={card.id} className="about-pillar">
                  <h3 className="font-[family-name:var(--font-cormorant)]">{card.title}</h3>
                  <p>{card.body}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="explore-hub-glass contact-glass about-copy-panel">
            <h2 className="about-h2 font-[family-name:var(--font-cormorant)]">{visa.onlineTitle}</h2>
            {paragraphs(visa.onlineBody).map((para) => (
              <p key={para.slice(0, 40)}>{para}</p>
            ))}
          </div>

          <div className="explore-hub-glass contact-glass">
            <h2 className="about-h2 font-[family-name:var(--font-cormorant)]">{visa.parkTitle}</h2>
            <p className="contact-lead">{visa.parkIntro}</p>
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
                  {visa.parkFees.map((row) => (
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
            <h2 className="about-h2 font-[family-name:var(--font-cormorant)]">{visa.restrictedTitle}</h2>
            {paragraphs(visa.restrictedIntro).map((para) => (
              <p key={para.slice(0, 40)}>{para}</p>
            ))}
            <ul className="about-licenses">
              {visa.restricted.map((item) => (
                <li key={item.id}>
                  <span>{item.name}</span>
                  <strong>{item.fee}</strong>
                  <em>{item.body}</em>
                </li>
              ))}
            </ul>
          </div>

          <div className="explore-hub-glass contact-glass about-copy-panel">
            <h2 className="about-h2 font-[family-name:var(--font-cormorant)]">{visa.airportTitle}</h2>
            {paragraphs(visa.airportBody).map((para) => (
              <p key={para.slice(0, 40)}>{para}</p>
            ))}
          </div>

          <ol className="visa-steps">
            {visa.airportSteps.map((step, index) => (
              <li key={step.id} className="explore-hub-glass contact-glass">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3 className="font-[family-name:var(--font-cormorant)]">{step.title}</h3>
                <p>{step.body}</p>
              </li>
            ))}
          </ol>

          <div className="explore-hub-glass contact-glass about-copy-panel">
            <h2 className="about-h2 font-[family-name:var(--font-cormorant)]">{visa.registerTitle}</h2>
            {paragraphs(visa.registerBody).map((para) => (
              <p key={para.slice(0, 40)}>{para}</p>
            ))}
          </div>

          <ul className="visa-countries">
            {visa.countries.map((country) => (
              <li key={country.id} className="explore-hub-glass contact-glass">
                <p className="explore-hub-eyebrow">{country.eyebrow}</p>
                <h2 className="about-h2 font-[family-name:var(--font-cormorant)]">{country.title}</h2>
                {paragraphs(country.body).map((para) => (
                  <p key={para.slice(0, 40)} className="visa-country-p">{para}</p>
                ))}
              </li>
            ))}
          </ul>

          <div className="explore-hub-glass contact-glass about-copy-panel visa-close">
            <h2 className="about-h2 font-[family-name:var(--font-cormorant)]">{visa.closeTitle}</h2>
            {paragraphs(visa.closeBody).map((para) => (
              <p key={para.slice(0, 40)}>{para}</p>
            ))}
            <Link href={visa.ctaHref || "/contact"} className="contact-submit">
              {visa.ctaLabel}
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

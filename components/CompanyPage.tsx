"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import Header from "@/components/Header";
import MediaImage from "@/components/MediaImage";
import SiteFooter from "@/components/SiteFooter";
import DuskAtmosphere from "@/components/DuskAtmosphere";
import { useSiteContent } from "@/components/SiteContentProvider";
import { DEFAULT_CONTENT } from "@/lib/content-types";

const SECTIONS = [
  { id: "about", label: "About Us" },
  { id: "story", label: "Our story" },
  { id: "sister", label: "Sister company" },
  { id: "work", label: "How we work" },
  { id: "credentials", label: "Credentials" },
  { id: "questions", label: "Questions" },
] as const;

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

export default function CompanyPage() {
  const { about: raw } = useSiteContent();
  const about = { ...DEFAULT_CONTENT.about, ...raw };
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [error, setError] = useState("");
  const [active, setActive] = useState<(typeof SECTIONS)[number]["id"]>("about");

  useEffect(() => {
    const nodes = SECTIONS.map((section) => document.getElementById(section.id)).filter(
      (node): node is HTMLElement => Boolean(node),
    );
    if (!nodes.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) {
          setActive(visible.target.id as (typeof SECTIONS)[number]["id"]);
        }
      },
      { rootMargin: "-28% 0px -55% 0px", threshold: [0.12, 0.35, 0.6] },
    );
    nodes.forEach((node) => io.observe(node));
    return () => io.disconnect();
  }, []);

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
          source: "company",
          message: data.question,
          interest: "Company page question",
        }),
      });
      const json = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setStatus("error");
        setError(json.error || "Something went wrong. Please try WhatsApp.");
        return;
      }
      setStatus("ok");
      form.reset();
    } catch {
      setStatus("error");
      setError("Could not send right now. Please call or WhatsApp us.");
    }
  }

  return (
    <main className="min-w-0 overflow-x-clip pb-[env(safe-area-inset-bottom)]">
      <section className="nepal-cover relative isolate overflow-hidden">
        <div className="absolute inset-0">
          <MediaImage
            src={about.wallpaperSrc || "/images/atmosphere/ebc-premium-section.webp"}
            alt="Ambition Holidays company cover"
            priority
            sizes="100vw"
            className="h-full w-full object-cover"
            objectPosition="center 42%"
            quality={80}
          />
          <div className="nepal-cover-shade" />
        </div>
        <Header />
        <div className="nepal-cover-copy">
          <p className="explore-hub-eyebrow">Ambition Holidays</p>
          <h1 className="nepal-cover-title font-[family-name:var(--font-cormorant)]">Company</h1>
          <p className="nepal-cover-lead">
            {about.experienceKicker} Himalayan experience — sister company of {about.sisterName}.
          </p>
        </div>
      </section>

      <nav className="company-rail" aria-label="Company sections">
        <div className="company-rail-inner">
          {SECTIONS.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={`company-rail-link ${active === section.id ? "is-on" : ""}`}
            >
              {section.label}
            </a>
          ))}
        </div>
      </nav>

      <section className="explore-hub visa-hub nepal-hub relative isolate overflow-hidden">
        <div className="absolute inset-0">
          <MediaImage
            src={about.wallpaperSrc || "/images/atmosphere/ebc-premium-section.webp"}
            alt=""
            sizes="100vw"
            className="h-full w-full object-cover"
            objectPosition="center 38%"
            quality={68}
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,14,22,0.44)_0%,rgba(8,18,28,0.18)_40%,rgba(6,14,22,0.48)_100%)]" />
        </div>
        <div className="explore-hub-shell contact-shell relative">
          <article id="about" className="explore-hub-glass contact-glass company-section">
            <p className="explore-hub-eyebrow">{about.eyebrow || "About Us"}</p>
            <h2 className="contact-brand font-[family-name:var(--font-cormorant)]">{about.headline}</h2>
            <p className="about-experience-chip">{about.experienceKicker} Himalayan experience</p>
            <p className="contact-sister">
              Sister company of <strong>{about.sisterName}</strong>
            </p>
            <p className="contact-lead">{about.lead}</p>
            <ul className="about-stats">
              {about.stats.map((stat) => (
                <li key={stat.id}>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </li>
              ))}
            </ul>
          </article>

          <article id="story" className="explore-hub-glass contact-glass about-copy-panel company-section">
            <p className="explore-hub-eyebrow">{about.experienceKicker}</p>
            <h2 className="about-h2 font-[family-name:var(--font-cormorant)]">{about.experienceTitle}</h2>
            {paragraphs(about.experienceBody).map((para) => (
              <p key={para.slice(0, 48)}>{para}</p>
            ))}
          </article>

          <article id="sister" className="explore-hub-glass contact-glass about-copy-panel company-section">
            <p className="explore-hub-eyebrow">{about.sisterEyebrow}</p>
            <h2 className="about-h2 font-[family-name:var(--font-cormorant)]">{about.sisterName}</h2>
            {paragraphs(about.sisterBody).map((para) => (
              <p key={para.slice(0, 48)}>{para}</p>
            ))}
            {about.sisterHref ? (
              <a href={about.sisterHref} target="_blank" rel="noopener noreferrer" className="contact-map-link">
                {about.sisterCta}
              </a>
            ) : null}
          </article>

          <article id="work" className="explore-hub-glass contact-glass company-section">
            <p className="explore-hub-eyebrow">How we work</p>
            <h2 className="about-h2 font-[family-name:var(--font-cormorant)]">{about.storyTitle}</h2>
            <p className="contact-lead">{about.storyBody}</p>
            <ul className="about-pillars">
              {about.pillars.map((pillar) => (
                <li key={pillar.id} className="about-pillar">
                  <h3 className="font-[family-name:var(--font-cormorant)]">{pillar.title}</h3>
                  <p>{pillar.body}</p>
                </li>
              ))}
            </ul>
          </article>

          <div id="credentials" className="about-split company-section">
            <div className="explore-hub-glass contact-glass about-copy-panel">
              <h2 className="about-h2 font-[family-name:var(--font-cormorant)]">{about.licensesTitle}</h2>
              <ul className="about-licenses">
                {about.licenses.map((item) => (
                  <li key={item.id}>
                    <span>{item.label}</span>
                    <strong>{item.value}</strong>
                  </li>
                ))}
              </ul>
            </div>
            <div className="explore-hub-glass contact-glass about-copy-panel">
              <h2 className="about-h2 font-[family-name:var(--font-cormorant)]">{about.promiseTitle}</h2>
              {paragraphs(about.promiseBody).map((para) => (
                <p key={para.slice(0, 48)}>{para}</p>
              ))}
            </div>
          </div>

          <div id="questions" className="about-split about-form-split company-section">
            <div className="explore-hub-glass contact-glass">
              <p className="explore-hub-eyebrow">{about.formEyebrow}</p>
              <h2 className="about-h2 font-[family-name:var(--font-cormorant)]">{about.formTitle}</h2>
              <p className="contact-lead">{about.formSubtitle}</p>
              <form className="contact-form" onSubmit={onSubmit}>
                <input type="hidden" name="source" value="company" />
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
                    placeholder="Ask about dates, altitude, luxury lodges, sister-company operations, or a private itinerary."
                  />
                </label>
                <div className="contact-form-actions">
                  <button type="submit" className="contact-submit" disabled={status === "sending"}>
                    {status === "sending" ? "Sending…" : about.formCta}
                  </button>
                  <a href={about.whatsappHref} className="contact-whatsapp" target="_blank" rel="noopener noreferrer">
                    WhatsApp
                  </a>
                  {status === "ok" ? <p className="contact-form-note is-ok">{about.formSuccess}</p> : null}
                  {status === "error" ? <p className="contact-form-note is-err">{error}</p> : null}
                </div>
              </form>
            </div>

            <aside className="explore-hub-glass contact-glass">
              <p className="explore-hub-eyebrow">Office</p>
              <h2 className="about-h2 font-[family-name:var(--font-cormorant)]">{about.asideTitle}</h2>
              <ul className="contact-aside-list">
                <li>
                  <span>{about.addressLabel}</span>
                  <strong>{about.address}</strong>
                </li>
                <li>
                  <span>Office</span>
                  <a href={telHref(about.officePhone)}>{formatPhone(about.officePhone)}</a>
                </li>
                <li>
                  <span>Mobile / WhatsApp</span>
                  <a href={telHref(about.mobilePhone)}>{formatPhone(about.mobilePhone)}</a>
                </li>
                <li>
                  <span>Email</span>
                  <a href={`mailto:${about.email}`}>{about.email}</a>
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

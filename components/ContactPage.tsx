"use client";

import { FormEvent, useState } from "react";
import Header from "@/components/Header";
import MediaImage from "@/components/MediaImage";
import SiteFooter from "@/components/SiteFooter";
import DuskAtmosphere from "@/components/DuskAtmosphere";
import { SECTION_WALLPAPER } from "@/lib/section-wallpaper";

const WALLPAPER = SECTION_WALLPAPER;
const MAP_SHARE = "https://maps.app.goo.gl/J5TESrb72UgkTWhZ6";
const MAP_EMBED =
  "https://maps.google.com/maps?q=27.715113,85.312188&z=17&output=embed";
const OFFICE_TEL = "+97714518413";
const MOBILE_TEL = "+9779851148898";
const EMAIL = "info@ambitionholidays.com";
const WHATSAPP = "https://wa.me/9779851148898";

const INTERESTS = [
  "Luxury Tour & Trek",
  "Helicopter Experience",
  "Multi-Country Journey",
  "Cultural Tour",
  "Custom Private Journey",
];

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <path
        d="M7.2 4.6h2.4l1.1 3.2-1.6 1.1a12.5 12.5 0 0 0 6 6l1.1-1.6 3.2 1.1v2.4c0 .8-.7 1.5-1.5 1.5C9.8 18.3 5.7 14.2 5.7 6.1c0-.8.7-1.5 1.5-1.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <rect x="4" y="6.2" width="16" height="11.6" rx="1.6" stroke="currentColor" strokeWidth="1.5" />
      <path d="m5 7.4 7 5.4 7-5.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <path
        d="M12 21s6.4-6.1 6.4-11A6.4 6.4 0 0 0 12 3.6 6.4 6.4 0 0 0 5.6 10c0 4.9 6.4 11 6.4 11Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="12" cy="10" r="1.9" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export default function ContactPage() {
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
        body: JSON.stringify(data),
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
    <main className="contact-page min-w-0 overflow-x-clip pb-[env(safe-area-inset-bottom)]">
      <section className="explore-hub contact-hub relative isolate overflow-hidden">
        <div className="absolute inset-0">
          <MediaImage
            src={WALLPAPER}
            alt=""
            priority
            sizes="100vw"
            className="h-full w-full object-cover"
            objectPosition="center 38%"
            quality={76}
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,14,22,0.42)_0%,rgba(8,18,28,0.18)_38%,rgba(6,14,22,0.46)_100%)]" />
        </div>

        <Header />

        <div className="explore-hub-shell contact-shell relative">
          <div className="explore-hub-glass contact-glass">
            <p className="explore-hub-eyebrow">Get in touch</p>
            <h1 className="contact-brand font-[family-name:var(--font-cormorant)]">
              Ambition Holidays
            </h1>
            <p className="contact-sister">
              Sister company of{" "}
              <strong>Ambition Himalaya Treks and Expeditions</strong>
            </p>
            <p className="contact-lead">
              Speak with a Himalayan specialist. We craft private luxury tours and treks
              across Nepal, Bhutan, Tibet and beyond — from first enquiry to the trail.
            </p>

            <ul className="contact-info-grid">
              <li className="contact-info-card">
                <span className="contact-info-icon">
                  <PhoneIcon />
                </span>
                <p className="contact-info-label">Office</p>
                <a href={`tel:${OFFICE_TEL}`} className="contact-info-value">
                  +977 1 4518413
                </a>
              </li>
              <li className="contact-info-card">
                <span className="contact-info-icon">
                  <PhoneIcon />
                </span>
                <p className="contact-info-label">Mobile / WhatsApp</p>
                <a href={`tel:${MOBILE_TEL}`} className="contact-info-value">
                  +977 9851148898
                </a>
              </li>
              <li className="contact-info-card">
                <span className="contact-info-icon">
                  <MailIcon />
                </span>
                <p className="contact-info-label">Email</p>
                <a href={`mailto:${EMAIL}`} className="contact-info-value contact-info-email">
                  {EMAIL}
                </a>
              </li>
              <li className="contact-info-card">
                <span className="contact-info-icon">
                  <PinIcon />
                </span>
                <p className="contact-info-label">Office address</p>
                <a href={MAP_SHARE} target="_blank" rel="noopener noreferrer" className="contact-info-value">
                  Thamel - 26
                  <span>Kathmandu, Nepal</span>
                </a>
              </li>
            </ul>
          </div>

          <div className="contact-split">
            <div className="explore-hub-glass contact-glass contact-form-panel">
              <p className="explore-hub-eyebrow">Plan your journey</p>
              <h2 className="contact-panel-title font-[family-name:var(--font-cormorant)]">
                Write to our specialists
              </h2>
              <p className="contact-panel-copy">
                Share a few details and we will design a private itinerary around your dates,
                pace and the way you want to experience the Himalayas.
              </p>

              <form className="contact-form" onSubmit={onSubmit}>
                <label>
                  Full name *
                  <input name="name" type="text" required autoComplete="name" placeholder="Your name" />
                </label>
                <div className="contact-form-row">
                  <label>
                    Email *
                    <input name="email" type="email" required autoComplete="email" placeholder="you@email.com" />
                  </label>
                  <label>
                    Phone
                    <input name="phone" type="tel" autoComplete="tel" placeholder="+977 …" />
                  </label>
                </div>
                <div className="contact-form-row">
                  <label>
                    Country
                    <input name="country" type="text" autoComplete="country-name" placeholder="Where are you travelling from?" />
                  </label>
                  <label>
                    Preferred dates
                    <input name="dates" type="text" placeholder="e.g. Oct 2026 · 12 days" />
                  </label>
                </div>
                <div className="contact-form-row">
                  <label>
                    Travelers
                    <input name="travelers" type="text" placeholder="2 adults" />
                  </label>
                  <label>
                    Interested in
                    <select name="interest" defaultValue="">
                      <option value="" disabled>
                        Select a journey
                      </option>
                      {INTERESTS.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                <label>
                  Message *
                  <textarea
                    name="message"
                    required
                    rows={6}
                    placeholder="Tell us about the journey you have in mind — region, style of travel, lodges, helicopter, or a custom private itinerary."
                  />
                </label>

                {status === "ok" ? (
                  <p className="contact-form-note is-ok">
                    Thank you. Our team will reply from {EMAIL}.
                  </p>
                ) : null}
                {status === "error" ? <p className="contact-form-note is-err">{error}</p> : null}

                <div className="contact-form-actions">
                  <button type="submit" className="contact-submit" disabled={status === "sending"}>
                    {status === "sending" ? "Sending…" : "Send enquiry"}
                  </button>
                  <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="contact-whatsapp">
                    WhatsApp us
                  </a>
                </div>
              </form>
            </div>

            <aside className="explore-hub-glass contact-glass contact-aside">
              <p className="explore-hub-eyebrow">Visit & talk</p>
              <h2 className="contact-panel-title font-[family-name:var(--font-cormorant)]">
                Kathmandu office
              </h2>
              <p className="contact-panel-copy">
                Meet us in Thamel for a quiet planning session over tea — or call, email and
                WhatsApp from anywhere in the world.
              </p>
              <ul className="contact-aside-list">
                <li>
                  <span>Hours</span>
                  <strong>9:00 AM – 6:00 PM</strong>
                  <em>Nepal Time</em>
                </li>
                <li>
                  <span>Office</span>
                  <a href={`tel:${OFFICE_TEL}`}>+977 1 4518413</a>
                </li>
                <li>
                  <span>Mobile</span>
                  <a href={`tel:${MOBILE_TEL}`}>+977 9851148898</a>
                </li>
                <li>
                  <span>Email</span>
                  <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
                </li>
                <li>
                  <span>Address</span>
                  <strong>Thamel - 26</strong>
                  <em>Kathmandu, Nepal</em>
                </li>
              </ul>
              <a href={MAP_SHARE} target="_blank" rel="noopener noreferrer" className="contact-map-link">
                Open location in Google Maps
              </a>
            </aside>
          </div>

          <div className="explore-hub-glass contact-glass contact-map-panel">
            <div className="contact-map-head">
              <div>
                <p className="explore-hub-eyebrow">Find us</p>
                <h2 className="contact-panel-title font-[family-name:var(--font-cormorant)]">
                  Ambition Holidays · Thamel
                </h2>
                <p className="contact-panel-copy">
                  Thamel - 26, Kathmandu, Nepal — sister company of Ambition Himalaya Treks and
                  Expeditions.
                </p>
              </div>
              <a href={MAP_SHARE} target="_blank" rel="noopener noreferrer" className="contact-map-link">
                Open in Google Maps
              </a>
            </div>
            <div className="contact-map-frame">
              <iframe
                title="Ambition Holidays office in Thamel, Kathmandu"
                src={MAP_EMBED}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
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

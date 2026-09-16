"use client";

import Link from "next/link";
import { useSiteContent } from "@/components/SiteContentProvider";
import MediaImage from "@/components/MediaImage";
import type { AvailabilityRouteIcon } from "@/lib/content-types";

function RouteIcon({ icon, iconSrc }: { icon: AvailabilityRouteIcon; iconSrc?: string }) {
  const cls = "h-3.5 w-3.5 shrink-0";
  if (icon === "custom" && iconSrc) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={iconSrc} alt="" className="h-3.5 w-3.5 object-contain" />
    );
  }
  return (
    <svg viewBox="0 0 24 24" className={cls} fill="none" aria-hidden="true">
      <path
        d="m4 17.5 5.8-8.6 2.8 4L15.4 8l4.6 9.5H4Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function AvailabilitySection() {
  const { availability } = useSiteContent();
  if (!availability?.visible) return null;

  const months = (availability.cards ?? []).filter((card) => card.visible !== false);

  return (
    <section className="avail-hub explore-hub relative isolate overflow-hidden">
      <div className="absolute inset-0">
        <MediaImage
          src={availability.wallpaperSrc}
          alt=""
          sizes="100vw"
          className="h-full w-full object-cover"
          objectPosition="center 36%"
          quality={74}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,16,26,0.14)_0%,rgba(8,18,28,0.08)_45%,rgba(6,14,22,0.3)_100%)]" />
      </div>

      <div className="explore-hub-shell relative">
        <div className="explore-hub-glass">
          <header className="avail-head">
            <p className="explore-hub-eyebrow">{availability.eyebrow}</p>
            <h2 className="avail-title font-[family-name:var(--font-cormorant)]">
              {availability.headlineBefore} <span>{availability.headlineGold}</span> {availability.headlineAfter}
            </h2>
            <p className="avail-body">{availability.body}</p>
          </header>

          <div className="avail-grid">
            {months.map((card) => (
              <article key={card.id} className="avail-card">
                <div className="avail-card-media">
                  <MediaImage
                    src={card.imageSrc}
                    alt={card.imageAlt}
                    sizes="(max-width: 700px) 100vw, (max-width: 1180px) 50vw, 33vw"
                    className="h-full w-full object-cover"
                    objectPosition="center 40%"
                    priority
                  />
                  <div className="avail-card-shade" />
                  {card.live ? (
                    <span className="avail-live">
                      <span className="avail-live-dot" aria-hidden="true">
                        <span className="avail-live-pulse" />
                        <span className="avail-live-core" />
                      </span>
                      LIVE
                    </span>
                  ) : (
                    <span className="avail-off">OFF</span>
                  )}
                  {card.badge ? <span className="avail-badge">{card.badge}</span> : null}
                  <div className="avail-month">
                    <p className="font-[family-name:var(--font-cormorant)]">{card.monthShort}</p>
                    <span>{card.monthFull}</span>
                  </div>
                </div>

                <div className="avail-card-copy">
                  <h3 className="font-[family-name:var(--font-cormorant)]">{card.title}</h3>
                  <p>{card.body}</p>
                  <div className="avail-split">
                    <ul>
                      {(card.routes ?? []).map((route) => (
                        <li key={route.id}>
                          <RouteIcon icon={route.icon} iconSrc={route.iconSrc} />
                          {route.label}
                        </li>
                      ))}
                    </ul>
                    <div className="avail-count">
                      <span>{card.availableLabel}</span>
                      <strong className="font-[family-name:var(--font-cormorant)]">{card.availableCount}</strong>
                    </div>
                  </div>
                  <Link href={card.ctaHref || "/luxury-treks"} className="avail-card-cta">
                    {card.ctaLabel}
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {availability.ctaLabel ? (
            <div className="avail-foot">
              <Link href={availability.ctaHref || "/luxury-treks"} className="avail-all">
                {availability.ctaLabel}
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

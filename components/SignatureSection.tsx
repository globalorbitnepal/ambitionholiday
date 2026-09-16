"use client";

import Link from "next/link";
import { useSiteContent } from "@/components/SiteContentProvider";
import MediaImage from "@/components/MediaImage";
import { mediaSrc } from "@/lib/media-src";
import type {
  SignatureCardIcon,
  SignatureFootIcon,
  SignatureStatIcon,
} from "@/lib/content-types";

function StatIcon({ icon, iconSrc }: { icon: SignatureStatIcon; iconSrc?: string }) {
  const cls = "h-6 w-6";
  if ((icon === "custom" || iconSrc) && iconSrc) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={mediaSrc(iconSrc)} alt="" className="h-6 w-6 object-contain" />
    );
  }
  if (icon === "tripadvisor") {
    return (
      <svg viewBox="0 0 24 24" className={cls} fill="none" aria-hidden="true">
        <circle cx="8.2" cy="13" r="3.1" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="15.8" cy="13" r="3.1" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="8.2" cy="13" r="1" fill="currentColor" />
        <circle cx="15.8" cy="13" r="1" fill="currentColor" />
        <path d="M5.2 13h3M15.8 10V7.4h2.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    );
  }
  if (icon === "headset") {
    return (
      <svg viewBox="0 0 24 24" className={cls} fill="none" aria-hidden="true">
        <path d="M6 12.2V11a6 6 0 0 1 12 0v1.2" stroke="currentColor" strokeWidth="1.5" />
        <rect x="4.4" y="11.2" width="3.2" height="4.8" rx="1.1" stroke="currentColor" strokeWidth="1.5" />
        <rect x="16.4" y="11.2" width="3.2" height="4.8" rx="1.1" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="12" cy="19.4" r="1.1" fill="currentColor" />
      </svg>
    );
  }
  if (icon === "guide") {
    return (
      <svg viewBox="0 0 24 24" className={cls} fill="none" aria-hidden="true">
        <circle cx="12" cy="8.2" r="2.4" stroke="currentColor" strokeWidth="1.5" />
        <path d="M7 18.6c.5-3.2 2.2-4.8 5-4.8s4.5 1.6 5 4.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M16.6 8.8 18.8 7l.2 2.6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className={cls} fill="none" aria-hidden="true">
      <path d="M7.4 19.2V9.4h9.2v9.8" stroke="currentColor" strokeWidth="1.5" />
      <path d="M6 19.2h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M9.2 9.4V7.2L12 5l2.8 2.2v2.2" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

function CardIcon({ icon, iconSrc }: { icon: SignatureCardIcon; iconSrc?: string }) {
  const cls = "h-3.5 w-3.5";
  if ((icon === "custom" || iconSrc) && iconSrc) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={mediaSrc(iconSrc)} alt="" className="h-3.5 w-3.5 object-contain" />
    );
  }
  if (icon === "heli") {
    return (
      <svg viewBox="0 0 24 24" className={cls} fill="none" aria-hidden="true">
        <path d="M4 8.2h16M12 8.2v2.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M7.4 10.6h9.4l1.4 4.2H6l1.4-4.2Z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8.2 18.4h7.6M12 14.8v3.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }
  if (icon === "lodge") {
    return (
      <svg viewBox="0 0 24 24" className={cls} fill="none" aria-hidden="true">
        <path d="M4.6 18V11.4h14.8V18" stroke="currentColor" strokeWidth="1.5" />
        <path d="M7.2 11.4V8.6c0-1.5 2-2.6 4.8-2.6s4.8 1.1 4.8 2.6v2.8" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    );
  }
  if (icon === "temple") {
    return (
      <svg viewBox="0 0 24 24" className={cls} fill="none" aria-hidden="true">
        <path d="M12 4.2 18.6 8H5.4L12 4.2Z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M6.6 8.4h10.8V18H6.6V8.4Z" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className={cls} fill="none" aria-hidden="true">
      <path d="M4.6 17.2 12 6.4l7.4 10.8H4.6Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

function FootIcon({ icon, iconSrc }: { icon: SignatureFootIcon; iconSrc?: string }) {
  const cls = "h-5 w-5";
  if ((icon === "custom" || iconSrc) && iconSrc) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={mediaSrc(iconSrc)} alt="" className="h-5 w-5 object-contain" />
    );
  }
  if (icon === "people") {
    return (
      <svg viewBox="0 0 24 24" className={cls} fill="none" aria-hidden="true">
        <circle cx="8.4" cy="8" r="2" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="15.6" cy="8.4" r="1.7" stroke="currentColor" strokeWidth="1.5" />
        <path d="M5 17.4c.4-2.8 1.9-4.2 3.4-4.2s3 1.4 3.4 4.2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M13 17.2c.3-2.2 1.5-3.4 2.7-3.4 1.3 0 2.5 1.2 2.9 3.4" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    );
  }
  if (icon === "shield") {
    return (
      <svg viewBox="0 0 24 24" className={cls} fill="none" aria-hidden="true">
        <path d="M12 4.4 18.2 6.6v5c0 3.4-2.4 6.2-6.2 7.8-3.8-1.6-6.2-4.4-6.2-7.8v-5L12 4.4Z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M9.5 12.1 11.2 14l3.5-3.7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }
  if (icon === "pin") {
    return (
      <svg viewBox="0 0 24 24" className={cls} fill="none" aria-hidden="true">
        <path d="M12 20.2s6.2-5.4 6.2-10A6.2 6.2 0 0 0 5.8 10.2c0 4.6 6.2 10 6.2 10Z" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="12" cy="10.2" r="1.8" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    );
  }
  if (icon === "globe") {
    return (
      <svg viewBox="0 0 24 24" className={cls} fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="7" stroke="currentColor" strokeWidth="1.5" />
        <path d="M5.4 12h13.2M12 5c2.1 2.3 2.1 11.7 0 14M12 5c-2.1 2.3-2.1 11.7 0 14" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className={cls} fill="none" aria-hidden="true">
      <path d="M6.4 16.6c5.6-1.1 9-4.6 10.8-10.6-6.2 1.3-10.3 5-10.8 10.6Z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M7 16 16.2 7.4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export default function SignatureSection() {
  const { signature } = useSiteContent();
  if (!signature.visible) return null;

  return (
    <section className="sig-story explore-hub relative isolate overflow-hidden">
      <div className="absolute inset-0">
        <MediaImage
          src={signature.wallpaperSrc}
          alt=""
          sizes="100vw"
          className="h-full w-full object-cover"
          objectPosition="center 38%"
          quality={74}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,16,26,0.12)_0%,rgba(8,18,28,0.08)_45%,rgba(6,14,22,0.28)_100%)]" />
      </div>

      <div className="explore-hub-shell relative">
        <div className="explore-hub-glass">
          <div className="sig-story-top">
            <p className="sig-story-kicker">{signature.kicker}</p>
            <div className="sig-story-stats">
              {signature.stats.map((stat) => (
                <div key={stat.id} className="sig-story-stat">
                  <span className="sig-story-stat-icon">
                    <StatIcon icon={stat.icon} iconSrc={stat.iconSrc} />
                  </span>
                  <div>
                    <p className="sig-story-stat-value">
                      {stat.value} <span>{stat.title}</span>
                    </p>
                    <p className="sig-story-stat-sub">{stat.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="sig-story-script font-[family-name:var(--font-cormorant)]">
              {signature.scriptRight}
            </p>
          </div>

          <div className="sig-story-main">
            <div className="sig-story-copy">
              <p className="explore-hub-eyebrow">{signature.eyebrow}</p>
              <h2 className="sig-story-title font-[family-name:var(--font-cormorant)]">
                <span>{signature.headlineWhite}</span>
                <span>{signature.headlineGold}</span>
              </h2>
              <p className="sig-story-sister">
                {signature.sisterLabel}
                <br />
                <strong>{signature.sisterName}</strong>
              </p>
              <p className="explore-hub-body sig-story-body">{signature.body}</p>
              <Link href={signature.ctaHref} className="sig-story-cta">
                {signature.ctaLabel}
                <span aria-hidden="true">→</span>
              </Link>
            </div>

            <div className="sig-story-cards">
              {signature.cards.map((card) => (
                <Link key={card.id} href={card.href} className="sig-story-card group">
                  <div className="sig-story-card-media">
                    <MediaImage
                      src={card.imageSrc}
                      alt={card.imageAlt}
                      sizes="(max-width: 700px) 100vw, (max-width: 1180px) 50vw, 22vw"
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                      objectPosition="center 40%"
                      priority
                    />
                    <div className="sig-story-card-shade" />
                  </div>
                  <span className="sig-story-badge">
                    <CardIcon icon={card.icon} iconSrc={card.iconSrc} />
                    {card.badge}
                  </span>
                  <div className="sig-story-card-copy">
                    <div className="min-w-0">
                      <h3 className="font-[family-name:var(--font-cormorant)]">{card.title}</h3>
                      <p>{card.subtitle}</p>
                    </div>
                    <span className="sig-story-go" aria-hidden="true">
                      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
                        <path d="M9 6.8 15.2 12 9 17.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="sig-story-foot">
            {signature.footItems.map((item) => (
              <div key={item.id} className="sig-story-foot-item">
                <span>
                  <FootIcon icon={item.icon} iconSrc={item.iconSrc} />
                </span>
                <p>
                  <strong>{item.title}</strong>
                  <span>{item.subtitle}</span>
                </p>
              </div>
            ))}
            <p className="sig-story-foot-script font-[family-name:var(--font-cormorant)]">
              {signature.footScript}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import { useSiteContent } from "@/components/SiteContentProvider";
import MediaImage from "@/components/MediaImage";

export default function ExperiencesSection() {
  const { experiences } = useSiteContent();
  if (!experiences?.visible) return null;

  return (
    <section className="exp-hub explore-hub relative isolate overflow-hidden">
      <div className="absolute inset-0">
        <MediaImage
          src={experiences.wallpaperSrc}
          alt=""
          sizes="100vw"
          className="h-full w-full object-cover"
          objectPosition="center 38%"
          quality={74}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,16,26,0.14)_0%,rgba(8,18,28,0.08)_45%,rgba(6,14,22,0.3)_100%)]" />
      </div>

      <div className="explore-hub-shell relative">
        <div className="explore-hub-glass">
          <header className="exp-head">
            <p className="explore-hub-eyebrow">{experiences.eyebrow}</p>
            <h2 className="exp-title font-[family-name:var(--font-cormorant)]">
              {experiences.headlineWhite}{" "}
              <span>{experiences.headlineGold}</span>
            </h2>
            <p className="exp-body">{experiences.body}</p>
          </header>

          <div className="exp-grid">
            {(experiences.cards ?? []).map((card, index) => (
              <article key={card.id} className="exp-card">
                <div className="exp-card-media">
                  <MediaImage
                    src={card.imageSrc}
                    alt={card.imageAlt}
                    sizes="(max-width: 700px) 100vw, (max-width: 1180px) 50vw, 25vw"
                    className="h-full w-full object-cover"
                    objectPosition="center 40%"
                    priority={index < 2}
                  />
                </div>
                <div className="exp-card-copy">
                  <h3 className="font-[family-name:var(--font-cormorant)]">{card.title}</h3>
                  {card.countLabel ? <p className="exp-count">{card.countLabel}</p> : null}
                  <p>{card.body}</p>
                  <Link href={card.href || "/luxury-treks"} className="exp-card-cta">
                    {card.ctaLabel || "EXPLORE MORE"}
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="exp-foot">
            <Link href={experiences.ctaHref || "/luxury-treks"} className="exp-all">
              {experiences.ctaLabel}
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

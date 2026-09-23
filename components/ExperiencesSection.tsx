"use client";

import Link from "next/link";
import { useSiteContent } from "@/components/SiteContentProvider";
import MediaImage from "@/components/MediaImage";
import SectionWallpaper from "@/components/SectionWallpaper";

export default function ExperiencesSection() {
  const { experiences } = useSiteContent();
  if (!experiences?.visible) return null;

  return (
    <section className="exp-hub explore-hub relative isolate overflow-hidden">
      <SectionWallpaper />

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

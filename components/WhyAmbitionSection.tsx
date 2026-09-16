"use client";

import { useMemo, useState } from "react";
import MediaImage from "@/components/MediaImage";
import { useSiteContent } from "@/components/SiteContentProvider";
import { mediaSrc } from "@/lib/media-src";
import type { ReviewBoard, ReviewPlatform, TravelerReview } from "@/lib/content-types";

function GoogleMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path fill="#4285F4" d="M23.5 12.27c0-.82-.07-1.6-.21-2.36H12v4.47h6.46a5.52 5.52 0 0 1-2.4 3.62v3h3.88c2.27-2.09 3.56-5.17 3.56-8.73Z" />
      <path fill="#34A853" d="M12 24c3.24 0 5.96-1.07 7.95-2.9l-3.88-3c-1.08.72-2.47 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.95H1.27v3.09A12 12 0 0 0 12 24Z" />
      <path fill="#FBBC05" d="M5.27 14.3A7.2 7.2 0 0 1 4.9 12c0-.8.14-1.57.37-2.3V6.61H1.27A12 12 0 0 0 0 12c0 1.94.46 3.77 1.27 5.39l4-3.09Z" />
      <path fill="#EA4335" d="M12 4.75c1.76 0 3.34.6 4.58 1.79l3.43-3.43C17.95 1.19 15.23 0 12 0 7.31 0 3.26 2.69 1.27 6.61l4 3.09C6.22 6.86 8.87 4.75 12 4.75Z" />
    </svg>
  );
}

const TRIPADVISOR_OWL = "/images/reviews/tripadvisor-owl.png";

function TripadvisorMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={TRIPADVISOR_OWL} alt="Tripadvisor" className={`${className} object-contain`} />
  );
}

function PlatformLogo({ board }: { board: ReviewBoard }) {
  if (board.logoSrc) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={mediaSrc(board.logoSrc)} alt="" className="h-9 w-9 object-contain" />
    );
  }
  return board.platform === "tripadvisor" ? <TripadvisorMark /> : <GoogleMark />;
}

function GoogleStars({ count }: { count: number }) {
  return (
    <span className="rev-stars" aria-label={`${count} stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} viewBox="0 0 24 24" className="h-3.5 w-3.5" aria-hidden="true">
          <path
            fill={i < count ? "#FABB05" : "rgba(255,255,255,0.22)"}
            d="M12 3.2 14.5 8.4l5.8.8-4.2 4.1 1 5.8L12 16.3 6.9 19.1l1-5.8L3.7 9.2l5.8-.8L12 3.2Z"
          />
        </svg>
      ))}
    </span>
  );
}

function OwlBubbles({ count }: { count: number }) {
  return (
    <span className="rev-stars" aria-label={`${count} of 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={`rev-owl ${i < count ? "is-on" : ""}`} />
      ))}
    </span>
  );
}

function Avatar({ review }: { review: TravelerReview }) {
  if (review.avatarSrc) {
    return (
      <span className="rev-avatar">
        <MediaImage
          src={review.avatarSrc}
          alt={review.avatarAlt || review.name}
          sizes="56px"
          className="h-full w-full object-cover"
          objectPosition="center 22%"
        />
      </span>
    );
  }
  const letter = review.name.trim().charAt(0).toUpperCase() || "A";
  const palette = ["#4285F4", "#EA4335", "#FBBC05", "#34A853", "#8ab4f8"];
  const color = palette[letter.charCodeAt(0) % palette.length];
  return (
    <span className="rev-avatar rev-avatar-letter" style={{ background: color }}>
      {letter}
    </span>
  );
}

function visibleSlice(list: TravelerReview[], start: number, count: number) {
  if (!list.length) return [];
  return Array.from({ length: Math.min(count, list.length) }, (_, i) => list[(start + i) % list.length]);
}

function ReviewCard({ review }: { review: TravelerReview }) {
  const google = review.platform === "google";
  return (
    <article className="rev-card">
      <div className="rev-card-top">
        <Avatar review={review} />
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <p className="rev-name">{review.name}</p>
            {google ? <GoogleMark className="h-5 w-5 shrink-0" /> : <TripadvisorMark className="h-6 w-6 shrink-0" />}
          </div>
          <p className="rev-meta">{review.meta}</p>
        </div>
      </div>
      <div className="rev-rate-row">
        {google ? <GoogleStars count={review.rating} /> : <OwlBubbles count={review.rating} />}
        <span>{review.dateLabel}</span>
      </div>
      {review.title ? <p className="rev-title">{review.title}</p> : null}
      <p className="rev-body">
        {review.body}{" "}
        {review.moreHref ? (
          <a href={review.moreHref} target="_blank" rel="noreferrer" className="rev-more">
            {review.moreLabel || "Read more"}
          </a>
        ) : null}
      </p>
      <p className="rev-trek">
        <span className="rev-trek-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
            <path d="m3.5 18 6.4-9.6 3.1 4.4L16.4 8 20.5 18H3.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          </svg>
        </span>
        <span>
          {review.trekEyebrow}
          <strong>{review.trekName}</strong>
        </span>
      </p>
    </article>
  );
}

function BoardPanel({
  board,
  reviews,
  start,
  onShift,
}: {
  board: ReviewBoard;
  reviews: TravelerReview[];
  start: number;
  onShift: (dir: -1 | 1) => void;
}) {
  const shown = visibleSlice(reviews, start, 2);
  return (
    <div className={`rev-board rev-board-${board.platform}`}>
      <div className="rev-board-head">
        <div className="flex min-w-0 items-center gap-3">
          <PlatformLogo board={board} />
          <div className="min-w-0">
            <p className="rev-board-title">{board.title}</p>
            <p className="rev-board-score">
              {board.platform === "google" ? (
                <GoogleStars count={5} />
              ) : (
                <OwlBubbles count={5} />
              )}
              <strong>{board.ratingValue}</strong>
              <span>{board.ratingCount}</span>
            </p>
          </div>
        </div>
        {board.ctaHref ? (
          <a href={board.ctaHref} target="_blank" rel="noreferrer" className="rev-board-cta">
            {board.ctaLabel}
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
              <path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            </svg>
          </a>
        ) : null}
      </div>
      <div className="rev-card-grid">
        {shown.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
      {reviews.length > 2 ? (
        <div className="rev-board-nav">
          <button type="button" aria-label={`Previous ${board.title}`} onClick={() => onShift(-1)}>
            ‹
          </button>
          <button type="button" aria-label={`Next ${board.title}`} onClick={() => onShift(1)}>
            ›
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default function WhyAmbitionSection() {
  const { why } = useSiteContent();
  const [starts, setStarts] = useState<Record<string, number>>({});

  const reviewsByPlatform = useMemo(() => {
    const map: Record<ReviewPlatform, TravelerReview[]> = { google: [], tripadvisor: [] };
    for (const review of why.reviews ?? []) {
      map[review.platform].push(review);
    }
    return map;
  }, [why.reviews]);

  if (!why?.visible) return null;

  const shiftAll = (dir: -1 | 1) => {
    setStarts((prev) => {
      const next = { ...prev };
      for (const board of why.boards) {
        const list = reviewsByPlatform[board.platform];
        if (!list.length) continue;
        next[board.id] = ((prev[board.id] ?? 0) + dir + list.length) % list.length;
      }
      return next;
    });
  };

  return (
    <section className="rev-hub explore-hub relative isolate overflow-hidden">
      <div className="absolute inset-0">
        <MediaImage
          src={why.wallpaperSrc}
          alt=""
          sizes="100vw"
          className="h-full w-full object-cover"
          objectPosition="center 42%"
          quality={74}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,16,26,0.16)_0%,rgba(8,18,28,0.1)_45%,rgba(6,14,22,0.32)_100%)]" />
      </div>

      <div className="explore-hub-shell relative">
        <div className="explore-hub-glass">
          <div className="rev-kickers">
            <p>{why.kickerLeft}</p>
            <p className="font-[family-name:var(--font-cormorant)]">{why.kickerRight}</p>
          </div>

          <header className="rev-head">
            <p className="explore-hub-eyebrow">{why.eyebrow}</p>
            <h2 className="rev-title-display font-[family-name:var(--font-cormorant)]">
              {why.headlineWhite} <span>{why.headlineGold}</span>
            </h2>
            <p className="rev-subtitle">{why.subtitle}</p>
            <p className="rev-sister">{why.sisterLine}</p>
            {why.stats?.length ? (
              <p className="rev-stats">
                {why.stats.map((item, index) => (
                  <span key={`${item}-${index}`}>
                    {index > 0 ? <i aria-hidden="true">•</i> : null}
                    {item}
                  </span>
                ))}
              </p>
            ) : null}
          </header>

          <div className="rev-stage">
            <button type="button" className="rev-arrow rev-arrow-prev" aria-label="Previous reviews" onClick={() => shiftAll(-1)}>
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
                <path d="M14.5 6.8 8.8 12l5.7 5.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <div className="rev-boards">
              {(why.boards ?? []).map((board) => (
                <BoardPanel
                  key={board.id}
                  board={board}
                  reviews={reviewsByPlatform[board.platform]}
                  start={starts[board.id] ?? 0}
                  onShift={(dir) => {
                    const list = reviewsByPlatform[board.platform];
                    if (!list.length) return;
                    setStarts((prev) => ({
                      ...prev,
                      [board.id]: ((prev[board.id] ?? 0) + dir + list.length) % list.length,
                    }));
                  }}
                />
              ))}
            </div>

            <button type="button" className="rev-arrow rev-arrow-next" aria-label="Next reviews" onClick={() => shiftAll(1)}>
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
                <path d="M9.5 6.8 15.2 12l-5.7 5.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          <footer className="rev-quote">
            <p className="font-[family-name:var(--font-cormorant)]">“{why.quote}”</p>
            <span>— {why.quoteBy}</span>
          </footer>
        </div>
      </div>
    </section>
  );
}

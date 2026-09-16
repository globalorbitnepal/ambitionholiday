"use client";

import type { ReviewBoard, ReviewPlatform, SiteContent, TravelerReview } from "@/lib/content-types";
import { mediaSrc } from "@/lib/media-src";
import { OrbitMediaButtons } from "@/components/OrbitMediaPicker";

const inputClass =
  "w-full rounded-md border border-white/15 bg-black/35 px-3 py-2 text-sm text-white outline-none focus:border-gold/50";

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block space-y-1.5">
      <span className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-white/50">
        {label}
      </span>
      {children}
    </label>
  );
}

function blankBoard(): ReviewBoard {
  return {
    id: `board-${Date.now()}`,
    platform: "google",
    title: "Google Reviews",
    ratingValue: "5.0/5",
    ratingCount: "From 0 reviews",
    ctaLabel: "View All",
    ctaHref: "https://www.google.com",
  };
}

function blankReview(platform: ReviewPlatform): TravelerReview {
  return {
    id: `rev-${Date.now()}`,
    platform,
    name: "New traveler",
    avatarSrc: "",
    avatarAlt: "Traveler photo",
    meta: "1 review",
    rating: 5,
    dateLabel: "Recently",
    title: "",
    body: "Write the review copy here.",
    moreLabel: "Read more",
    moreHref: "",
    trekEyebrow: "Traveled with Ambition Himalaya",
    trekName: "Everest Base Camp Trek",
  };
}

type Props = {
  content: SiteContent;
  setContent: (next: SiteContent) => void;
  save: (next: SiteContent) => Promise<void>;
};

export default function OrbitWhyEditor({ content, setContent, save }: Props) {
  const why = content.why;

  function patch(partial: Partial<SiteContent["why"]>) {
    setContent({ ...content, why: { ...why, ...partial } });
  }

  function updateBoard(index: number, next: ReviewBoard) {
    const boards = [...why.boards];
    boards[index] = next;
    patch({ boards });
  }

  function updateReview(index: number, next: TravelerReview) {
    const reviews = [...why.reviews];
    reviews[index] = next;
    patch({ reviews });
  }

  return (
    <div className="space-y-8">
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={why.visible}
          onChange={(e) => patch({ visible: e.target.checked })}
        />
        Show traveler reviews section
      </label>

      <Field label="Wallpaper image">
        <div className="space-y-2">
          <input className={inputClass} value={why.wallpaperSrc} onChange={(e) => patch({ wallpaperSrc: e.target.value })} />
          <OrbitMediaButtons
            onPicked={async (url) => {
              const next = { ...content, why: { ...why, wallpaperSrc: url } };
              setContent(next);
              await save(next);
            }}
          />
        </div>
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Left kicker">
          <input className={inputClass} value={why.kickerLeft} onChange={(e) => patch({ kickerLeft: e.target.value })} />
        </Field>
        <Field label="Right script kicker">
          <input className={inputClass} value={why.kickerRight} onChange={(e) => patch({ kickerRight: e.target.value })} />
        </Field>
        <Field label="Eyebrow">
          <input className={inputClass} value={why.eyebrow} onChange={(e) => patch({ eyebrow: e.target.value })} />
        </Field>
        <Field label="Sister line">
          <input className={inputClass} value={why.sisterLine} onChange={(e) => patch({ sisterLine: e.target.value })} />
        </Field>
        <Field label="Headline (white)">
          <input className={inputClass} value={why.headlineWhite} onChange={(e) => patch({ headlineWhite: e.target.value })} />
        </Field>
        <Field label="Headline (gold)">
          <input className={inputClass} value={why.headlineGold} onChange={(e) => patch({ headlineGold: e.target.value })} />
        </Field>
      </div>
      <Field label="Subtitle">
        <input className={inputClass} value={why.subtitle} onChange={(e) => patch({ subtitle: e.target.value })} />
      </Field>
      <Field label="Quote">
        <input className={inputClass} value={why.quote} onChange={(e) => patch({ quote: e.target.value })} />
      </Field>
      <Field label="Quote credit">
        <input className={inputClass} value={why.quoteBy} onChange={(e) => patch({ quoteBy: e.target.value })} />
      </Field>

      <div>
        <div className="mb-3 flex items-center justify-between gap-3">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-white/50">Stats pills</p>
          <button
            type="button"
            className="rounded-md border border-white/20 px-3 py-1.5 text-xs"
            onClick={() => patch({ stats: [...why.stats, "New highlight"] })}
          >
            Add stat
          </button>
        </div>
        <div className="space-y-2">
          {why.stats.map((stat, index) => (
            <div key={`${stat}-${index}`} className="flex gap-2">
              <input
                className={inputClass}
                value={stat}
                onChange={(e) => {
                  const stats = [...why.stats];
                  stats[index] = e.target.value;
                  patch({ stats });
                }}
              />
              <button
                type="button"
                className="rounded-md border border-red-400/30 px-3 text-xs text-red-200"
                onClick={() => patch({ stats: why.stats.filter((_, i) => i !== index) })}
              >
                Del
              </button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="mb-3 flex items-center justify-between gap-3">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-white/50">
            Review boards (Google / Tripadvisor)
          </p>
          <button
            type="button"
            className="rounded-md border border-white/20 px-3 py-1.5 text-xs"
            onClick={() => patch({ boards: [...why.boards, blankBoard()] })}
          >
            Add board
          </button>
        </div>
        <div className="space-y-5">
          {why.boards.map((board, index) => (
            <div key={board.id} className="space-y-3 rounded-xl border border-white/10 p-4">
              <div className="flex justify-between gap-3">
                <p className="font-[family-name:var(--font-cormorant)] text-xl">{board.title}</p>
                <button
                  type="button"
                  className="rounded-md border border-red-400/30 px-3 py-1.5 text-xs text-red-200"
                  onClick={() => patch({ boards: why.boards.filter((_, i) => i !== index) })}
                >
                  Delete board
                </button>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Platform">
                  <select
                    className={inputClass}
                    value={board.platform}
                    onChange={(e) => updateBoard(index, { ...board, platform: e.target.value as ReviewPlatform })}
                  >
                    <option value="google">Google</option>
                    <option value="tripadvisor">Tripadvisor</option>
                  </select>
                </Field>
                <Field label="Title">
                  <input className={inputClass} value={board.title} onChange={(e) => updateBoard(index, { ...board, title: e.target.value })} />
                </Field>
                <Field label="Rating value">
                  <input className={inputClass} value={board.ratingValue} onChange={(e) => updateBoard(index, { ...board, ratingValue: e.target.value })} />
                </Field>
                <Field label="Rating count line">
                  <input className={inputClass} value={board.ratingCount} onChange={(e) => updateBoard(index, { ...board, ratingCount: e.target.value })} />
                </Field>
                <Field label="CTA label">
                  <input className={inputClass} value={board.ctaLabel} onChange={(e) => updateBoard(index, { ...board, ctaLabel: e.target.value })} />
                </Field>
                <Field label="Google / Tripadvisor link">
                  <input className={inputClass} value={board.ctaHref} onChange={(e) => updateBoard(index, { ...board, ctaHref: e.target.value })} />
                </Field>
              </div>
              <Field label="Custom logo (optional — leave empty for real Google / Tripadvisor mark)">
                <div className="space-y-2">
                  <input className={inputClass} value={board.logoSrc || ""} onChange={(e) => updateBoard(index, { ...board, logoSrc: e.target.value })} />
                  <OrbitMediaButtons
                    onPicked={async (url) => {
                      const boards = [...why.boards];
                      boards[index] = { ...board, logoSrc: url };
                      const next = { ...content, why: { ...why, boards } };
                      setContent(next);
                      await save(next);
                    }}
                  />
                </div>
              </Field>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-white/50">Customer reviews</p>
          <div className="flex gap-2">
            <button
              type="button"
              className="rounded-md border border-white/20 px-3 py-1.5 text-xs"
              onClick={() => patch({ reviews: [...why.reviews, blankReview("google")] })}
            >
              Add Google review
            </button>
            <button
              type="button"
              className="rounded-md border border-white/20 px-3 py-1.5 text-xs"
              onClick={() => patch({ reviews: [...why.reviews, blankReview("tripadvisor")] })}
            >
              Add Tripadvisor review
            </button>
          </div>
        </div>
        <div className="space-y-5">
          {why.reviews.map((review, index) => (
            <div key={review.id} className="space-y-3 rounded-xl border border-white/10 p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <p className="font-[family-name:var(--font-cormorant)] text-xl">{review.name}</p>
                <button
                  type="button"
                  className="rounded-md border border-red-400/30 px-3 py-1.5 text-xs text-red-200"
                  onClick={() => patch({ reviews: why.reviews.filter((_, i) => i !== index) })}
                >
                  Delete review
                </button>
              </div>
              <div className="grid gap-4 lg:grid-cols-[8rem_1fr]">
                <div className="space-y-2">
                  <div className="relative aspect-square overflow-hidden rounded-full border border-white/10 bg-black/40">
                    {review.avatarSrc ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={mediaSrc(review.avatarSrc)} alt="" className="h-full w-full object-cover" />
                    ) : (
                      <p className="grid h-full place-items-center text-xs text-white/40">Initials</p>
                    )}
                  </div>
                  <OrbitMediaButtons
                    onPicked={async (url) => {
                      const reviews = [...why.reviews];
                      reviews[index] = { ...review, avatarSrc: url };
                      const next = { ...content, why: { ...why, reviews } };
                      setContent(next);
                      await save(next);
                    }}
                  />
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Field label="Platform">
                    <select
                      className={inputClass}
                      value={review.platform}
                      onChange={(e) => updateReview(index, { ...review, platform: e.target.value as ReviewPlatform })}
                    >
                      <option value="google">Google</option>
                      <option value="tripadvisor">Tripadvisor</option>
                    </select>
                  </Field>
                  <Field label="Name">
                    <input className={inputClass} value={review.name} onChange={(e) => updateReview(index, { ...review, name: e.target.value })} />
                  </Field>
                  <Field label="Meta line">
                    <input className={inputClass} value={review.meta} onChange={(e) => updateReview(index, { ...review, meta: e.target.value })} />
                  </Field>
                  <Field label="Date / trip type">
                    <input className={inputClass} value={review.dateLabel} onChange={(e) => updateReview(index, { ...review, dateLabel: e.target.value })} />
                  </Field>
                  <Field label="Star rating (1–5)">
                    <input
                      className={inputClass}
                      type="number"
                      min={1}
                      max={5}
                      value={review.rating}
                      onChange={(e) => updateReview(index, { ...review, rating: Number(e.target.value) || 5 })}
                    />
                  </Field>
                  <Field label="Review title">
                    <input className={inputClass} value={review.title} onChange={(e) => updateReview(index, { ...review, title: e.target.value })} />
                  </Field>
                  <Field label="Read more label">
                    <input className={inputClass} value={review.moreLabel} onChange={(e) => updateReview(index, { ...review, moreLabel: e.target.value })} />
                  </Field>
                  <Field label="Read more / profile link">
                    <input className={inputClass} value={review.moreHref} onChange={(e) => updateReview(index, { ...review, moreHref: e.target.value })} />
                  </Field>
                  <Field label="Trek eyebrow">
                    <input className={inputClass} value={review.trekEyebrow} onChange={(e) => updateReview(index, { ...review, trekEyebrow: e.target.value })} />
                  </Field>
                  <Field label="Trek name">
                    <input className={inputClass} value={review.trekName} onChange={(e) => updateReview(index, { ...review, trekName: e.target.value })} />
                  </Field>
                </div>
              </div>
              <Field label="Review text">
                <textarea
                  className={`${inputClass} min-h-28`}
                  value={review.body}
                  onChange={(e) => updateReview(index, { ...review, body: e.target.value })}
                />
              </Field>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

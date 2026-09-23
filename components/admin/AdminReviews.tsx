"use client";

import AdminMediaField from "@/components/admin/AdminMediaField";
import { useAdminContent } from "@/components/admin/useAdminContent";
import type { ReviewBoard, ReviewPlatform, TravelerReview } from "@/lib/content-types";

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

export default function AdminReviews() {
  const { content, loaded, save, busy, status, setContent } = useAdminContent();
  if (!loaded) return <p>Loading reviews…</p>;
  const why = content.why;

  function patch(partial: Partial<typeof why>) {
    setContent({ ...content, why: { ...why, ...partial } });
  }

  return (
    <>
      <h1>Reviews</h1>
      <p className="admin-lead">
        Same homepage hub used on every trek page. Upload the mountain wallpaper, board logos and traveler photos here — the same fields as Orbit.
      </p>
      <div className="admin-card">
        <label className="admin-field" style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <input type="checkbox" checked={why.visible} onChange={(e) => patch({ visible: e.target.checked })} />
          <span>Show traveler reviews section</span>
        </label>
        <AdminMediaField label="Section wallpaper (mountain photo)" value={why.wallpaperSrc} onChange={(wallpaperSrc) => patch({ wallpaperSrc })} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <label className="admin-field">
            <span>Left kicker</span>
            <input value={why.kickerLeft} onChange={(e) => patch({ kickerLeft: e.target.value })} />
          </label>
          <label className="admin-field">
            <span>Right script kicker</span>
            <input value={why.kickerRight} onChange={(e) => patch({ kickerRight: e.target.value })} />
          </label>
          <label className="admin-field">
            <span>Eyebrow</span>
            <input value={why.eyebrow} onChange={(e) => patch({ eyebrow: e.target.value })} />
          </label>
          <label className="admin-field">
            <span>Sister line</span>
            <input value={why.sisterLine} onChange={(e) => patch({ sisterLine: e.target.value })} />
          </label>
          <label className="admin-field">
            <span>Headline (white)</span>
            <input value={why.headlineWhite} onChange={(e) => patch({ headlineWhite: e.target.value })} />
          </label>
          <label className="admin-field">
            <span>Headline (gold)</span>
            <input value={why.headlineGold} onChange={(e) => patch({ headlineGold: e.target.value })} />
          </label>
        </div>
        <label className="admin-field">
          <span>Subtitle</span>
          <input value={why.subtitle} onChange={(e) => patch({ subtitle: e.target.value })} />
        </label>
        <label className="admin-field">
          <span>Quote</span>
          <input value={why.quote} onChange={(e) => patch({ quote: e.target.value })} />
        </label>
        <label className="admin-field">
          <span>Quote credit</span>
          <input value={why.quoteBy} onChange={(e) => patch({ quoteBy: e.target.value })} />
        </label>
      </div>

      <div className="admin-card">
        <h2>Google & Tripadvisor boards</h2>
        {why.boards.map((board, index) => (
          <div key={board.id} className="admin-card" style={{ margin: "12px 0", padding: 12 }}>
            <AdminMediaField
              label="Logo photo (leave empty for Google / Tripadvisor mark)"
              value={board.logoSrc || ""}
              onChange={(logoSrc) => {
                const boards = [...why.boards];
                boards[index] = { ...board, logoSrc };
                patch({ boards });
              }}
            />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <label className="admin-field">
                <span>Platform</span>
                <select
                  value={board.platform}
                  onChange={(e) => {
                    const boards = [...why.boards];
                    boards[index] = { ...board, platform: e.target.value as ReviewPlatform };
                    patch({ boards });
                  }}
                >
                  <option value="google">Google</option>
                  <option value="tripadvisor">Tripadvisor</option>
                </select>
              </label>
              <label className="admin-field">
                <span>Title</span>
                <input
                  value={board.title}
                  onChange={(e) => {
                    const boards = [...why.boards];
                    boards[index] = { ...board, title: e.target.value };
                    patch({ boards });
                  }}
                />
              </label>
              <label className="admin-field">
                <span>Rating value</span>
                <input
                  value={board.ratingValue}
                  onChange={(e) => {
                    const boards = [...why.boards];
                    boards[index] = { ...board, ratingValue: e.target.value };
                    patch({ boards });
                  }}
                />
              </label>
              <label className="admin-field">
                <span>Rating count line</span>
                <input
                  value={board.ratingCount}
                  onChange={(e) => {
                    const boards = [...why.boards];
                    boards[index] = { ...board, ratingCount: e.target.value };
                    patch({ boards });
                  }}
                />
              </label>
              <label className="admin-field">
                <span>Button label</span>
                <input
                  value={board.ctaLabel}
                  onChange={(e) => {
                    const boards = [...why.boards];
                    boards[index] = { ...board, ctaLabel: e.target.value };
                    patch({ boards });
                  }}
                />
              </label>
              <label className="admin-field">
                <span>Google / Tripadvisor link</span>
                <input
                  value={board.ctaHref}
                  onChange={(e) => {
                    const boards = [...why.boards];
                    boards[index] = { ...board, ctaHref: e.target.value };
                    patch({ boards });
                  }}
                />
              </label>
            </div>
          </div>
        ))}
        <button type="button" className="admin-btn admin-btn-ghost" onClick={() => patch({ boards: [...why.boards, blankBoard()] })}>
          Add board
        </button>
      </div>

      <div className="admin-card">
        <h2>Traveler reviews</h2>
        <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
          <button type="button" className="admin-btn admin-btn-ghost" onClick={() => patch({ reviews: [...why.reviews, blankReview("google")] })}>
            Add Google review
          </button>
          <button type="button" className="admin-btn admin-btn-ghost" onClick={() => patch({ reviews: [...why.reviews, blankReview("tripadvisor")] })}>
            Add Tripadvisor review
          </button>
        </div>
        {why.reviews.map((review, index) => (
          <div key={review.id} className="admin-card" style={{ margin: "12px 0", padding: 12 }}>
            <AdminMediaField
              label="Traveler photo"
              value={review.avatarSrc || ""}
              onChange={(avatarSrc) => {
                const reviews = [...why.reviews];
                reviews[index] = { ...review, avatarSrc };
                patch({ reviews });
              }}
            />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <label className="admin-field">
                <span>Name</span>
                <input
                  value={review.name}
                  onChange={(e) => {
                    const reviews = [...why.reviews];
                    reviews[index] = { ...review, name: e.target.value };
                    patch({ reviews });
                  }}
                />
              </label>
              <label className="admin-field">
                <span>Platform</span>
                <select
                  value={review.platform}
                  onChange={(e) => {
                    const reviews = [...why.reviews];
                    reviews[index] = { ...review, platform: e.target.value as ReviewPlatform };
                    patch({ reviews });
                  }}
                >
                  <option value="google">Google</option>
                  <option value="tripadvisor">Tripadvisor</option>
                </select>
              </label>
              <label className="admin-field">
                <span>Meta</span>
                <input
                  value={review.meta}
                  onChange={(e) => {
                    const reviews = [...why.reviews];
                    reviews[index] = { ...review, meta: e.target.value };
                    patch({ reviews });
                  }}
                />
              </label>
              <label className="admin-field">
                <span>Date</span>
                <input
                  value={review.dateLabel}
                  onChange={(e) => {
                    const reviews = [...why.reviews];
                    reviews[index] = { ...review, dateLabel: e.target.value };
                    patch({ reviews });
                  }}
                />
              </label>
              <label className="admin-field">
                <span>Stars (1–5)</span>
                <input
                  type="number"
                  min={1}
                  max={5}
                  value={review.rating}
                  onChange={(e) => {
                    const reviews = [...why.reviews];
                    reviews[index] = { ...review, rating: Number(e.target.value) || 5 };
                    patch({ reviews });
                  }}
                />
              </label>
              <label className="admin-field">
                <span>Trek name</span>
                <input
                  value={review.trekName}
                  onChange={(e) => {
                    const reviews = [...why.reviews];
                    reviews[index] = { ...review, trekName: e.target.value };
                    patch({ reviews });
                  }}
                />
              </label>
            </div>
            <label className="admin-field">
              <span>Review text</span>
              <textarea
                value={review.body}
                onChange={(e) => {
                  const reviews = [...why.reviews];
                  reviews[index] = { ...review, body: e.target.value };
                  patch({ reviews });
                }}
              />
            </label>
            <button
              type="button"
              className="admin-btn"
              onClick={() => patch({ reviews: why.reviews.filter((_, i) => i !== index) })}
            >
              Remove review
            </button>
          </div>
        ))}
      </div>

      <div className="admin-save-row">
        {status ? <span className={status === "Saved" ? "admin-ok" : "admin-error"}>{status}</span> : null}
        <button type="button" className="admin-btn admin-btn-gold" style={{ width: "auto" }} disabled={busy} onClick={() => void save(content)}>
          Save reviews
        </button>
      </div>
    </>
  );
}

"use client";

import { useState } from "react";
import { tripPath, type TrekPackage } from "@/lib/trip-packages";
import { useFavorites } from "@/lib/use-favorites";

export default function PackageActions({ pkg, compact }: { pkg: TrekPackage; compact?: boolean }) {
  const { has, toggle } = useFavorites();
  const saved = has(pkg.id);
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const url = typeof window !== "undefined" ? `${window.location.origin}${tripPath(pkg)}` : tripPath(pkg);
  const text = `${pkg.title} — Ambition Holidays`;

  function shareNative() {
    if (navigator.share) {
      void navigator.share({ title: pkg.title, text, url });
      return;
    }
    setOpen((v) => !v);
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      setOpen(true);
    }
  }

  return (
    <div className={`lux-actions${compact ? " is-compact" : ""}`}>
      <button
        type="button"
        className={`lux-heart${saved ? " is-on" : ""}`}
        aria-pressed={saved}
        aria-label={saved ? "Remove from saved" : "Save this package"}
        onClick={() => toggle({ id: pkg.id, slug: pkg.slug, title: pkg.title, heroSrc: pkg.heroSrc, priceUsd: pkg.priceUsd })}
      >
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
          <path
            d="M12 20.4S4.8 15.7 4.8 10.4A3.95 3.95 0 0 1 12 7.35a3.95 3.95 0 0 1 7.2 3.05c0 5.3-7.2 10-7.2 10Z"
            fill={saved ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
        </svg>
        {compact ? null : <span>{saved ? "Saved" : "Save"}</span>}
      </button>
      <div className="lux-share-wrap">
        <button type="button" className="lux-share" aria-label="Share this package" onClick={shareNative}>
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
            <path d="M8 12v7h12V8h-6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            <path d="M14 4h6v6M20 4l-9 9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
          </svg>
          {compact ? null : <span>Share</span>}
        </button>
        {open ? (
          <div className="lux-share-menu">
            <a href={`https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`} target="_blank" rel="noreferrer">
              WhatsApp
            </a>
            <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`} target="_blank" rel="noreferrer">
              Facebook
            </a>
            <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`} target="_blank" rel="noreferrer">
              X
            </a>
            <button type="button" onClick={() => void copyLink()}>
              {copied ? "Copied" : "Copy link"}
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

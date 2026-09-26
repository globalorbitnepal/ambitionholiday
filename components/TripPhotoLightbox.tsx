"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { mediaSrc } from "@/lib/media-src";

type Props = {
  images: string[];
  index: number;
  altForIndex: (i: number) => string;
  onClose: () => void;
  onIndexChange: (next: number) => void;
};

export default function TripPhotoLightbox({ images, index, altForIndex, onClose, onIndexChange }: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onIndexChange((index + 1) % images.length);
      if (e.key === "ArrowLeft") onIndexChange((index - 1 + images.length) % images.length);
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [images.length, index, onClose, onIndexChange]);

  if (!mounted || !images.length) return null;

  const src = images[index];

  return createPortal(
    <div className="lux-light" role="dialog" aria-modal="true" onClick={onClose}>
      <button
        type="button"
        className="lux-light-close"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
      >
        Close
      </button>
      <button
        type="button"
        className="lux-light-nav lux-light-prev"
        aria-label="Previous photo"
        onClick={(e) => {
          e.stopPropagation();
          onIndexChange((index - 1 + images.length) % images.length);
        }}
      >
        ‹
      </button>
      <img
        src={mediaSrc(src)}
        alt={altForIndex(index)}
        onClick={(e) => e.stopPropagation()}
      />
      <button
        type="button"
        className="lux-light-nav lux-light-next"
        aria-label="Next photo"
        onClick={(e) => {
          e.stopPropagation();
          onIndexChange((index + 1) % images.length);
        }}
      >
        ›
      </button>
      <p className="lux-light-count" onClick={(e) => e.stopPropagation()}>
        {index + 1} / {images.length}
      </p>
    </div>,
    document.body,
  );
}

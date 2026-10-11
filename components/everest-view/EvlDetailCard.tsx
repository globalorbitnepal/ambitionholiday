"use client";

import { useEffect, useRef } from "react";
import { formatElevationM } from "./evl-chart-utils";

type EvlDetailCardProps = {
  name: string;
  elevationM?: number;
  day: string;
  description: string;
  pinned: boolean;
  onClose: () => void;
  style: { left: number; top: number };
};

export function EvlDetailCard({ name, elevationM, day, description, pinned, onClose, style }: EvlDetailCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!pinned) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [pinned, onClose]);

  return (
    <div
      ref={ref}
      className={`evl-detail-card${pinned ? " is-pinned" : ""}`}
      style={{ left: style.left, top: style.top }}
      role={pinned ? "dialog" : "tooltip"}
      aria-live="polite"
    >
      <div className="evl-detail-card-head">
        <div>
          <p className="evl-detail-card-day">{day}</p>
          <p className="evl-detail-card-title">{name}</p>
          {typeof elevationM === "number" && elevationM > 0 ? (
            <p className="evl-detail-card-elev">{formatElevationM(elevationM)}</p>
          ) : null}
        </div>
        {pinned ? (
          <button type="button" className="evl-detail-card-close" onClick={onClose} aria-label="Close stop details">
            ×
          </button>
        ) : null}
      </div>
      <p className="evl-detail-card-copy">{description}</p>
    </div>
  );
}

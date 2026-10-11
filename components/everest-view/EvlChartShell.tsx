"use client";

import type { ReactNode } from "react";

type EvlChartShellProps = {
  sectionTitle: string;
  downloadLabel: string;
  onDownload: () => void;
  children: ReactNode;
  variant: "map" | "altitude";
};

export function EvlChartShell({ sectionTitle, downloadLabel, onDownload, children, variant }: EvlChartShellProps) {
  return (
    <div className={`lux-graph lux-graph--map evl-infographic evl-infographic--${variant}`}>
      <div className="lux-graph-head">
        <h3>{sectionTitle}</h3>
        <button type="button" className="lux-chart-dl" onClick={onDownload}>
          {downloadLabel}
        </button>
      </div>
      <div className="evl-infographic-scroll">{children}</div>
    </div>
  );
}

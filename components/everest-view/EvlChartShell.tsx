"use client";

import { useState, type ReactNode } from "react";

type EvlChartShellProps = {
  sectionTitle: string;
  downloadLabel: string;
  onDownload: () => Promise<void>;
  children: ReactNode;
  footer?: ReactNode;
  variant: "map" | "altitude";
};

export function EvlChartShell({
  sectionTitle,
  downloadLabel,
  onDownload,
  children,
  footer,
  variant,
}: EvlChartShellProps) {
  const [downloading, setDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState("");

  async function handleDownload() {
    setDownloadError("");
    setDownloading(true);
    try {
      await onDownload();
    } catch (err) {
      setDownloadError(err instanceof Error ? err.message : "Download failed. Please try again.");
    } finally {
      setDownloading(false);
    }
  }

  return (
    <div className={`lux-graph lux-graph--map evl-infographic evl-infographic--atlas evl-infographic--${variant}`}>
      <div className="lux-graph-head">
        <h3>{sectionTitle}</h3>
        <button type="button" className="lux-chart-dl" onClick={handleDownload} disabled={downloading}>
          {downloading ? "Preparing…" : downloadLabel}
        </button>
      </div>
      {downloadError ? <p className="evl-download-err" role="alert">{downloadError}</p> : null}
      <div className="evl-infographic-scroll">{children}</div>
      {footer ? <div className="evl-chart-footer">{footer}</div> : null}
    </div>
  );
}

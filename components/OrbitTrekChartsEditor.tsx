"use client";

import { OrbitMediaButtons } from "@/components/OrbitMediaPicker";
import { CHART_FRAMES, chartFrameLine } from "@/lib/chart-frames";
import type { SiteContent } from "@/lib/content-types";
import { tripPath, type TrekPackage } from "@/lib/trip-packages";

type Props = {
  content: SiteContent;
  setContent: (next: SiteContent) => void;
};

function ChartUpload({
  label,
  hint,
  value,
  onChange,
}: {
  label: string;
  hint: string;
  value: string;
  onChange: (next: string) => void;
}) {
  return (
    <div className="space-y-2 rounded-xl border border-white/10 p-4">
      <p className="text-sm font-semibold text-white">{label}</p>
      <p className="text-[0.75rem] leading-relaxed text-gold/90">{hint}</p>
      {value ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={value} alt="" className="h-40 w-full rounded-lg bg-white/5 object-contain" />
      ) : (
        <p className="text-xs text-white/45">No upload — the built-in chart stays live.</p>
      )}
      <OrbitMediaButtons
        onPicked={async (url) => {
          onChange(url);
        }}
      />
      {value ? (
        <button type="button" className="rounded-md border border-white/20 px-3 py-1.5 text-xs text-white/70" onClick={() => onChange("")}>
          Clear — use built-in chart
        </button>
      ) : null}
    </div>
  );
}

export default function OrbitTrekChartsEditor({ content, setContent }: Props) {
  function patchPkg(id: string, partial: Partial<TrekPackage>) {
    setContent({
      ...content,
      tripPackages: content.tripPackages.map((pkg) => (pkg.id === id ? { ...pkg, ...partial } : pkg)),
    });
  }

  return (
    <div className="space-y-8">
      <p className="text-sm text-white/65">
        Replace trek map and charts on any package. WebP, JPG or PNG. Trip map shows full width with a download button. Save at the top to publish.
      </p>
      <div className="rounded-xl border border-gold/30 bg-gold/10 p-4 text-sm text-gold">
        <p className="font-semibold">Perfect frame sizes</p>
        <ul className="mt-2 space-y-1 text-white/80">
          <li>Trip map — {chartFrameLine(CHART_FRAMES.map)}</li>
          <li>Altitude (metres and feet) — {chartFrameLine(CHART_FRAMES.altitude)}</li>
          <li>Monthly weather — {chartFrameLine(CHART_FRAMES.weather)}</li>
        </ul>
      </div>
      {content.tripPackages.map((pkg) => (
        <div key={pkg.id} className="space-y-4 rounded-2xl border border-white/10 p-4">
          <div>
            <p className="text-xs uppercase tracking-[0.14em] text-white/40">{pkg.country}</p>
            <h2 className="font-[family-name:var(--font-cormorant)] text-2xl">{pkg.title}</h2>
            <p className="text-xs text-white/45">{tripPath(pkg)}</p>
          </div>
          <ChartUpload
            label="Trip map"
            hint={CHART_FRAMES.map.hint}
            value={pkg.routeMapSrc || ""}
            onChange={(routeMapSrc) => patchPkg(pkg.id, { routeMapSrc })}
          />
          <ChartUpload
            label="Altitude — metres"
            hint={CHART_FRAMES.altitude.hint}
            value={pkg.altitudeChartM || ""}
            onChange={(altitudeChartM) => patchPkg(pkg.id, { altitudeChartM })}
          />
          <ChartUpload
            label="Altitude — feet"
            hint="Same size as metres: 1960 × 1040 px · JPG or PNG · under 900 KB."
            value={pkg.altitudeChartFt || ""}
            onChange={(altitudeChartFt) => patchPkg(pkg.id, { altitudeChartFt })}
          />
          <ChartUpload
            label="Monthly weather"
            hint={CHART_FRAMES.weather.hint}
            value={pkg.weatherMonthlySrc || ""}
            onChange={(weatherMonthlySrc) => patchPkg(pkg.id, { weatherMonthlySrc })}
          />
        </div>
      ))}
    </div>
  );
}

"use client";

import { useId, useMemo, useRef, useState } from "react";
import {
  EVL_CHART_COLORS,
  EVL_KHUMBU_MONTHLY_WEATHER,
  EVL_WEATHER_SUBTITLE,
  EVL_WEATHER_TITLE,
} from "@/lib/everest-view-charts";
import { cToF } from "@/lib/ebc-charts";
import { EvlChartShell } from "./EvlChartShell";
import { EvlDetailCard } from "./EvlDetailCard";
import { downloadSvgAsPng } from "./evl-chart-utils";
import { EvlChartFooter, EvlChartHeader, EvlLegendStrip, EvlPlotArea, EvlSvgBackground, EVL_LAYOUT } from "./evl-chart-theme";
import { useEvlInteraction } from "./useEvlInteraction";
import { useSvgCardPosition } from "./useSvgCardPosition";

const W = 1100;
const H = 500;

export function EverestViewMonthlyWeather({ sectionTitle }: { sectionTitle?: string }) {
  const [unit, setUnit] = useState<"c" | "f">("c");
  const svgRef = useRef<SVGSVGElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const gid = useId().replace(/:/g, "");
  const { activeId, onPointerEnter, onPointerLeave, onActivate, dismiss, isPinned } = useEvlInteraction();

  const pad = { l: 54, r: 36, t: EVL_LAYOUT.plotTop, b: 78 };
  const innerW = W - pad.l - pad.r;
  const innerH = H - pad.t - pad.b;
  const minT = -18;
  const maxT = 20;
  const suffix = unit === "c" ? "°C" : "°F";
  const months = EVL_KHUMBU_MONTHLY_WEATHER;

  const yOf = (c: number) => pad.t + (1 - (c - minT) / (maxT - minT)) * innerH;
  const xOf = (i: number) => pad.l + (i / (months.length - 1)) * innerW;

  const points = useMemo(
    () =>
      months.map((m, i) => ({
        ...m,
        id: m.month,
        x: xOf(i),
        yMax: yOf(m.maxC),
        yMin: yOf(m.minC),
        maxV: unit === "c" ? m.maxC : cToF(m.maxC),
        minV: unit === "c" ? m.minC : cToF(m.minC),
      })),
    [unit, innerW, innerH, pad.t],
  );

  const maxLine = points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.yMax}`).join(" ");
  const minLine = points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.yMin}`).join(" ");

  const active = activeId ? points.find((p) => p.id === activeId) : null;
  const cardPos = useSvgCardPosition(svgRef, stageRef, active?.x ?? 0, active?.yMax ?? 0, Boolean(active));

  return (
    <EvlChartShell
      sectionTitle={sectionTitle || "Monthly weather reference"}
      downloadLabel="Download PNG"
      variant="altitude"
      onDownload={async () => {
        await downloadSvgAsPng(svgRef.current, "ambition-holidays-everest-view-trek-monthly-weather", { scale: 3 });
      }}
    >
      <div className="lux-unit evl-alt-unit">
        <span>Temperature in:</span>
        <button type="button" className={unit === "c" ? "on" : ""} onClick={() => setUnit("c")}>Celsius</button>
        <button type="button" className={unit === "f" ? "on" : ""} onClick={() => setUnit("f")}>Fahrenheit</button>
      </div>
      <div className="evl-map-stage" ref={stageRef}>
        <svg ref={svgRef} className="evl-infographic-svg" viewBox={`0 0 ${W} ${H}`} role="img" data-export-root="true">
          <title>{EVL_WEATHER_TITLE}</title>
          <EvlSvgBackground gid={gid} w={W} h={H} />
          <EvlChartHeader title={EVL_WEATHER_TITLE} subtitle={EVL_WEATHER_SUBTITLE} w={W} />
          <EvlPlotArea x={pad.l - 6} y={pad.t - 6} width={innerW + 12} height={innerH + 12} />

          {[-15, -5, 5, 15].map((c) => (
            <g key={c}>
              <line x1={pad.l} x2={W - pad.r} y1={yOf(c)} y2={yOf(c)} stroke={EVL_CHART_COLORS.grid} strokeWidth="1" />
              <text x={pad.l - 6} y={yOf(c) + 4} textAnchor="end" fill={EVL_CHART_COLORS.textMuted} fontSize="10" fontWeight="600">
                {unit === "c" ? c : cToF(c)}{suffix}
              </text>
            </g>
          ))}

          <path d={maxLine} fill="none" stroke={EVL_CHART_COLORS.flight} strokeWidth="2.6" strokeLinejoin="round" />
          <path d={minLine} fill="none" stroke={EVL_CHART_COLORS.gold} strokeWidth="2.6" strokeLinejoin="round" />

          {points.map((p, i) => {
            const showMaxLabel = i % 3 === 0 || i === points.length - 1;
            const showMinLabel = i % 3 === 1;
            return (
              <g key={p.month}>
                <circle cx={p.x} cy={p.yMax} r="3.5" fill={EVL_CHART_COLORS.flight} />
                <circle cx={p.x} cy={p.yMin} r="3.5" fill={EVL_CHART_COLORS.gold} />
                {showMaxLabel ? (
                  <text x={p.x} y={p.yMax - 8} textAnchor="middle" fill={EVL_CHART_COLORS.flight} fontSize="8.5" fontWeight="700">
                    {p.maxV}{suffix}
                  </text>
                ) : null}
                {showMinLabel ? (
                  <text x={p.x} y={p.yMin + 14} textAnchor="middle" fill={EVL_CHART_COLORS.goldSoft} fontSize="8.5" fontWeight="700">
                    {p.minV}{suffix}
                  </text>
                ) : null}
                <text x={p.x} y={H - pad.b + 16} textAnchor="middle" fill={EVL_CHART_COLORS.textMuted} fontSize="10.5" fontWeight="600">
                  {p.month}
                </text>
                <g className="evl-no-export">
                  <rect
                    x={p.x - 16}
                    y={pad.t}
                    width={32}
                    height={innerH}
                    fill="transparent"
                    className="evl-hit"
                    role="button"
                    tabIndex={0}
                    aria-label={`${p.month} reference temperatures`}
                    onMouseEnter={() => onPointerEnter(p.id)}
                    onMouseLeave={onPointerLeave}
                    onFocus={() => onPointerEnter(p.id)}
                    onBlur={onPointerLeave}
                    onClick={() => onActivate(p.id)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        onActivate(p.id);
                      }
                    }}
                  />
                </g>
              </g>
            );
          })}

          <EvlLegendStrip
            w={W}
            y={H - 64}
            items={[
              { kind: "line-flight", label: "Daytime high (indicative)" },
              { kind: "line-gold", label: "Night low (indicative)" },
            ]}
            note="Khumbu reference only — not a daily forecast."
          />
          <EvlChartFooter w={W} h={H} />
        </svg>
        {active ? (
          <EvlDetailCard
            name={active.month}
            elevationM={0}
            day="Monthly reference"
            description={`Daytime high: ${active.maxV}${suffix} · Night low: ${active.minV}${suffix}. Indicative Khumbu temperatures for trip planning.`}
            pinned={isPinned}
            onClose={dismiss}
            style={cardPos}
          />
        ) : null}
      </div>
    </EvlChartShell>
  );
}

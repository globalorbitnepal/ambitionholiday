"use client";

import { useId, useMemo, useRef, useState } from "react";
import {
  EVL_KHUMBU_MONTHLY_WEATHER,
  EVL_WEATHER_SUBTITLE,
  EVL_WEATHER_TITLE,
} from "@/lib/everest-view-charts";
import { EVL_ATLAS, EVL_ATLAS_EXPORT_BG } from "@/lib/everest-view-atlas-colors";
import { cToF } from "@/lib/ebc-charts";
import { EvlChartShell } from "./EvlChartShell";
import { EvlDetailCard } from "./EvlDetailCard";
import { downloadSvgAsPng } from "./evl-chart-utils";
import { AtlasChartFooter, AtlasChartFrame, AtlasPlotRect } from "./evl-atlas-theme";
import { useEvlInteraction } from "./useEvlInteraction";
import { useSvgCardPosition } from "./useSvgCardPosition";

const W = 1000;
const H = 520;

export function EverestViewMonthlyWeather({ sectionTitle }: { sectionTitle?: string }) {
  const [unit, setUnit] = useState<"c" | "f">("c");
  const svgRef = useRef<SVGSVGElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const gid = useId().replace(/:/g, "");
  const { activeId, onPointerEnter, onPointerLeave, onActivate, dismiss, isPinned } = useEvlInteraction();

  const pad = { l: 54, r: 40, t: 72, b: 88 };
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
    [unit, innerW, pad.t],
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
        await downloadSvgAsPng(svgRef.current, "ambition-holidays-everest-view-trek-monthly-weather", {
          scale: 3,
          background: EVL_ATLAS_EXPORT_BG,
        });
      }}
    >
      <div className="lux-unit evl-alt-unit">
        <span>Temperature in:</span>
        <button type="button" className={unit === "c" ? "on" : ""} onClick={() => setUnit("c")}>Celsius</button>
        <button type="button" className={unit === "f" ? "on" : ""} onClick={() => setUnit("f")}>Fahrenheit</button>
      </div>
      <div className="evl-map-stage evl-atlas-map" ref={stageRef}>
        <svg ref={svgRef} className="evl-infographic-svg evl-atlas-svg" viewBox={`0 0 ${W} ${H}`} role="img" data-export-root="true">
          <AtlasChartFrame gid={gid} w={W} h={H} title={EVL_WEATHER_TITLE} subtitle={EVL_WEATHER_SUBTITLE} />
          <AtlasPlotRect x={pad.l - 8} y={pad.t - 8} width={innerW + 16} height={innerH + 16} />

          {[-15, -5, 5, 15].map((c) => (
            <g key={c}>
              <line x1={pad.l} x2={W - pad.r} y1={yOf(c)} y2={yOf(c)} stroke={EVL_ATLAS.grid} strokeWidth="1" />
              <text x={pad.l - 6} y={yOf(c) + 4} textAnchor="end" fill={EVL_ATLAS.textElev} fontSize="10" fontWeight="600">
                {unit === "c" ? c : cToF(c)}{suffix}
              </text>
            </g>
          ))}

          <path d={maxLine} fill="none" stroke={EVL_ATLAS.flight} strokeWidth="2.8" strokeLinejoin="round" />
          <path d={minLine} fill="none" stroke={EVL_ATLAS.gold} strokeWidth="2.8" strokeLinejoin="round" />

          {points.map((p, i) => {
            const showMax = i % 3 === 0 || i === points.length - 1;
            const showMin = i % 3 === 1;
            return (
              <g key={p.month}>
                <circle cx={p.x} cy={p.yMax} r="3.5" fill={EVL_ATLAS.flight} />
                <circle cx={p.x} cy={p.yMin} r="3.5" fill={EVL_ATLAS.gold} />
                {showMax ? (
                  <text x={p.x} y={p.yMax - 8} textAnchor="middle" fill={EVL_ATLAS.flight} fontSize="8.5" fontWeight="700">
                    {p.maxV}{suffix}
                  </text>
                ) : null}
                {showMin ? (
                  <text x={p.x} y={p.yMin + 14} textAnchor="middle" fill={EVL_ATLAS.gold} fontSize="8.5" fontWeight="700">
                    {p.minV}{suffix}
                  </text>
                ) : null}
                <text x={p.x} y={H - pad.b + 14} textAnchor="middle" fill={EVL_ATLAS.textMuted} fontSize="10.5" fontWeight="600">
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

          <g transform={`translate(${pad.l}, ${H - 78})`}>
            <rect width={340} height={34} rx="6" fill={EVL_ATLAS.panel} stroke={EVL_ATLAS.panelStroke} />
            <line x1={14} y1={17} x2={44} y2={17} stroke={EVL_ATLAS.flight} strokeWidth="3" />
            <text x={52} y={21} fill={EVL_ATLAS.textMuted} fontSize="10">Daytime high (indicative)</text>
            <line x1={188} y1={17} x2={218} y2={17} stroke={EVL_ATLAS.gold} strokeWidth="3" />
            <text x={226} y={21} fill={EVL_ATLAS.textMuted} fontSize="10">Night low (indicative)</text>
          </g>
          <text x={W / 2} y={H - 22} textAnchor="middle" fill={EVL_ATLAS.textElev} fontSize="8.5" fontStyle="italic">
            Khumbu reference only — not a daily forecast
          </text>
          <AtlasChartFooter w={W} y={H - 8} />
        </svg>
        {active ? (
          <EvlDetailCard
            name={active.month}
            elevationM={0}
            day="Monthly reference"
            description={`Daytime high: ${active.maxV}${suffix} · Night low: ${active.minV}${suffix}. Indicative Khumbu temperatures.`}
            pinned={isPinned}
            onClose={dismiss}
            style={cardPos}
          />
        ) : null}
      </div>
    </EvlChartShell>
  );
}

"use client";

import { useId, useMemo, useRef, useState } from "react";
import {
  EVL_ALT_SUBTITLE,
  EVL_ALT_TITLE,
  EVL_FLIGHT_ALTITUDE,
  EVL_TREK_ALTITUDE_POINTS,
} from "@/lib/everest-view-charts";
import { EVL_ATLAS, EVL_ATLAS_EXPORT_BG } from "@/lib/everest-view-atlas-colors";
import { metresToFeet } from "@/lib/ebc-charts";
import { EvlChartShell } from "./EvlChartShell";
import { EvlDetailCard } from "./EvlDetailCard";
import { downloadSvgAsPng, formatElevationM } from "./evl-chart-utils";
import { AtlasChartFooter, AtlasChartFrame, AtlasPlotRect } from "./evl-atlas-theme";
import { useEvlInteraction } from "./useEvlInteraction";
import { useSvgCardPosition } from "./useSvgCardPosition";

const W = 1000;
const H = 580;
const HIDE_AXIS = new Set(["phakding2", "monjo2", "namche2"]);

export function EverestViewAltitudeProfile({
  sectionTitle = "Altitude profile — Everest View Luxury Trek",
}: {
  sectionTitle?: string;
}) {
  const [unit, setUnit] = useState<"m" | "ft">("m");
  const svgRef = useRef<SVGSVGElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const gid = useId().replace(/:/g, "");
  const { activeId, onPointerEnter, onPointerLeave, onActivate, dismiss, isPinned } = useEvlInteraction();

  const minM = 1200;
  const maxM = 4000;
  const pad = { l: 56, r: 44, t: 88, b: 108 };
  const innerW = W - pad.l - pad.r;
  const innerH = H - pad.t - pad.b;
  const flightW = 56;
  const gap = 18;
  const trekCount = EVL_TREK_ALTITUDE_POINTS.length;
  const trekInnerW = innerW - flightW * 2 - gap * 2;
  const axisY = H - 62;

  const points = useMemo(() => {
    return EVL_TREK_ALTITUDE_POINTS.map((stop, i) => {
      const x = pad.l + flightW + gap + (i / (trekCount - 1)) * trekInnerW;
      const y = pad.t + (1 - (stop.m - minM) / (maxM - minM)) * innerH;
      const value = unit === "m" ? stop.m : metresToFeet(stop.m);
      return { ...stop, x, y, value, elevY: stop.isPeak ? y - 20 : y - 12 };
    });
  }, [innerH, pad.l, pad.t, trekCount, trekInnerW, unit]);

  const line = points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
  const ktmX = pad.l + flightW / 2;
  const ktmY = pad.t + (1 - (EVL_FLIGHT_ALTITUDE.m - minM) / (maxM - minM)) * innerH;
  const luklaFirst = points[0];
  const luklaLast = points[points.length - 1];
  const returnKtmX = pad.l + innerW - flightW / 2;
  const yTicks = [1400, 2000, 2600, 3200, 3800];
  const peak = points.find((p) => p.isPeak);
  const activePoint = activeId ? points.find((p) => p.id === activeId) : null;
  const cardPos = useSvgCardPosition(svgRef, stageRef, activePoint?.x ?? 0, activePoint?.y ?? 0, Boolean(activePoint));
  const peakCallout =
    unit === "m"
      ? "Syangboche ridge area · approximately 3,880 m"
      : `Syangboche ridge area · approximately ${metresToFeet(3880).toLocaleString("en-US")} ft`;

  return (
    <EvlChartShell
      sectionTitle={sectionTitle}
      downloadLabel="Download PNG"
      variant="altitude"
      onDownload={async () => {
        await downloadSvgAsPng(svgRef.current, "ambition-holidays-everest-view-trek-altitude-profile", {
          scale: 3,
          background: EVL_ATLAS_EXPORT_BG,
        });
      }}
    >
      <div className="lux-unit evl-alt-unit">
        <span>Altitude in:</span>
        <button type="button" className={unit === "m" ? "on" : ""} onClick={() => setUnit("m")}>Metres</button>
        <button type="button" className={unit === "ft" ? "on" : ""} onClick={() => setUnit("ft")}>Feet</button>
      </div>
      <div className="evl-map-stage evl-atlas-map" ref={stageRef}>
        <svg ref={svgRef} className="evl-infographic-svg evl-atlas-svg" viewBox={`0 0 ${W} ${H}`} role="img" data-export-root="true">
          <AtlasChartFrame gid={gid} w={W} h={H} title={EVL_ALT_TITLE} subtitle={EVL_ALT_SUBTITLE} />
          <AtlasPlotRect x={pad.l - 8} y={pad.t - 8} width={innerW + 16} height={innerH + 16} />

          {yTicks.map((m) => {
            const y = pad.t + (1 - (m - minM) / (maxM - minM)) * innerH;
            const label = unit === "m" ? `${m.toLocaleString("en-US")} m` : `${metresToFeet(m).toLocaleString("en-US")} ft`;
            return (
              <g key={m}>
                <line x1={pad.l} x2={W - pad.r} y1={y} y2={y} stroke={EVL_ATLAS.grid} strokeWidth="1" />
                <text x={pad.l - 6} y={y + 4} textAnchor="end" fill={EVL_ATLAS.textElev} fontSize="10" fontWeight="600">{label}</text>
              </g>
            );
          })}

          <line x1={ktmX} y1={ktmY} x2={luklaFirst.x - 6} y2={luklaFirst.y} stroke={EVL_ATLAS.flight} strokeWidth="2.5" strokeDasharray="7 5" />
          <line x1={luklaLast.x + 6} y1={luklaLast.y} x2={returnKtmX} y2={ktmY} stroke={EVL_ATLAS.flight} strokeWidth="2.5" strokeDasharray="7 5" />
          <circle cx={ktmX} cy={ktmY} r="5" fill={EVL_ATLAS.flight} stroke="#fff" strokeWidth="1.25" />
          <text x={ktmX} y={ktmY - 10} textAnchor="middle" fill={EVL_ATLAS.textMuted} fontSize="9" fontWeight="600">Kathmandu</text>
          <circle cx={returnKtmX} cy={ktmY} r="5" fill={EVL_ATLAS.flight} stroke="#fff" strokeWidth="1.25" />
          <text x={returnKtmX} y={ktmY - 10} textAnchor="middle" fill={EVL_ATLAS.textMuted} fontSize="9" fontWeight="600">Kathmandu</text>

          <path d={line} fill="none" stroke={EVL_ATLAS.route} strokeWidth="4" strokeLinejoin="round" strokeLinecap="round" opacity={activeId ? 0.45 : 1} />

          {peak ? (
            <g>
              <line x1={peak.x + 8} y1={peak.y} x2={peak.x + 96} y2={peak.y - 38} stroke={EVL_ATLAS.gold} strokeWidth="1" />
              <text x={peak.x + 100} y={peak.y - 34} textAnchor="start" fill={EVL_ATLAS.gold} fontSize="9.5" fontWeight="700">
                {peakCallout}
              </text>
            </g>
          ) : null}

          {points.map((p) => {
            const isActive = activeId === p.id;
            const showAxis = !HIDE_AXIS.has(p.id);
            return (
              <g key={p.id}>
                {!p.isPeak ? (
                  <text x={p.x} y={p.elevY} textAnchor="middle" fill={EVL_ATLAS.text} fontSize="9.5" fontWeight="700">
                    {p.value.toLocaleString("en-US")} {unit}
                  </text>
                ) : null}
                {showAxis ? (
                  <text
                    x={p.x}
                    y={axisY}
                    textAnchor="end"
                    fill={EVL_ATLAS.textMuted}
                    fontSize="9.5"
                    fontWeight="600"
                    transform={`rotate(-46, ${p.x}, ${axisY})`}
                  >
                    {p.shortLabel || p.label}
                  </text>
                ) : null}
                {isActive ? <circle cx={p.x} cy={p.y} r={12} fill={EVL_ATLAS.gold} opacity="0.25" className="evl-no-export" /> : null}
                <circle cx={p.x} cy={p.y} r={p.isPeak ? 6 : 5} fill={p.isPeak ? EVL_ATLAS.gold : EVL_ATLAS.markerTrek} stroke="#fff" strokeWidth="1.5" />
                <g className="evl-no-export">
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={20}
                    fill="transparent"
                    className="evl-hit"
                    role="button"
                    tabIndex={0}
                    aria-label={`${p.label}, ${formatElevationM(p.m)}`}
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

          <g transform={`translate(${pad.l}, ${H - 94})`}>
            <rect width={300} height={36} rx="6" fill={EVL_ATLAS.panel} stroke={EVL_ATLAS.panelStroke} />
            <line x1={14} y1={18} x2={44} y2={18} stroke={EVL_ATLAS.route} strokeWidth="4" />
            <text x={52} y={22} fill={EVL_ATLAS.textMuted} fontSize="10">Trekking elevation</text>
            <line x1={168} y1={18} x2={198} y2={18} stroke={EVL_ATLAS.flight} strokeWidth="2.5" strokeDasharray="6 4" />
            <text x={206} y={22} fill={EVL_ATLAS.textMuted} fontSize="10">Flight</text>
          </g>
          <text x={W / 2} y={H - 22} textAnchor="middle" fill={EVL_ATLAS.textElev} fontSize="8.5" fontStyle="italic">
            Approximate trekking reference only
          </text>
          <AtlasChartFooter w={W} y={H - 8} />
        </svg>
        {activePoint ? (
          <EvlDetailCard
            name={activePoint.label}
            elevationM={activePoint.m}
            day={activePoint.dayNote || "Trek"}
            description={activePoint.description}
            pinned={isPinned}
            onClose={dismiss}
            style={cardPos}
          />
        ) : null}
      </div>
    </EvlChartShell>
  );
}

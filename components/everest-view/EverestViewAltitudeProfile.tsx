"use client";

import { useId, useMemo, useRef, useState } from "react";
import {
  EVL_ALT_SUBTITLE,
  EVL_ALT_TITLE,
  EVL_CHART_COLORS,
  EVL_FLIGHT_ALTITUDE,
  EVL_TREK_ALTITUDE_POINTS,
} from "@/lib/everest-view-charts";
import { metresToFeet } from "@/lib/ebc-charts";
import { EvlChartShell } from "./EvlChartShell";
import { EvlDetailCard } from "./EvlDetailCard";
import { downloadSvgAsPng, formatElevationM } from "./evl-chart-utils";
import { useEvlInteraction } from "./useEvlInteraction";
import { useSvgCardPosition } from "./useSvgCardPosition";

const W = 1100;
const H = 600;

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
  const maxM = 4200;
  const pad = { l: 58, r: 36, t: 88, b: 96 };
  const innerW = W - pad.l - pad.r;
  const innerH = H - pad.t - pad.b;
  const flightW = 64;
  const gap = 24;
  const trekCount = EVL_TREK_ALTITUDE_POINTS.length;
  const trekInnerW = innerW - flightW * 2 - gap * 2;

  const points = useMemo(() => {
    return EVL_TREK_ALTITUDE_POINTS.map((stop, i) => {
      const x = pad.l + flightW + gap + (i / (trekCount - 1)) * trekInnerW;
      const y = pad.t + (1 - (stop.m - minM) / (maxM - minM)) * innerH;
      const value = unit === "m" ? stop.m : metresToFeet(stop.m);
      const labelY = H - pad.b + (i % 2 === 0 ? 12 : 28);
      return { ...stop, x, y, value, labelY };
    });
  }, [innerH, pad.b, pad.l, pad.t, trekCount, trekInnerW, unit]);

  const line = points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");

  const ktmX = pad.l + flightW / 2;
  const ktmY = pad.t + (1 - (EVL_FLIGHT_ALTITUDE.m - minM) / (maxM - minM)) * innerH;
  const luklaFirst = points[0];
  const luklaLast = points[points.length - 1];
  const returnKtmX = pad.l + innerW - flightW / 2;
  const yTicks = [1400, 2000, 2600, 3200, 3800, 4200];

  const activePoint = activeId ? points.find((p) => p.id === activeId) : null;
  const cardPos = useSvgCardPosition(svgRef, stageRef, activePoint?.x ?? 0, activePoint?.y ?? 0, Boolean(activePoint));

  const desc =
    "Interactive trekking elevation profile. Kathmandu–Lukla transfers are flights and shown separately from the walking profile.";

  return (
    <EvlChartShell
      sectionTitle={sectionTitle}
      downloadLabel="Download PNG"
      variant="altitude"
      onDownload={async () => {
        await downloadSvgAsPng(svgRef.current, "ambition-holidays-everest-view-trek-altitude-profile", { scale: 3 });
      }}
    >
      <div className="lux-unit evl-alt-unit">
        <span>Altitude in:</span>
        <button type="button" className={unit === "m" ? "on" : ""} onClick={() => setUnit("m")}>Metres</button>
        <button type="button" className={unit === "ft" ? "on" : ""} onClick={() => setUnit("ft")}>Feet</button>
      </div>
      <div className="evl-map-stage" ref={stageRef}>
        <svg
          ref={svgRef}
          className="evl-infographic-svg"
          viewBox={`0 0 ${W} ${H}`}
          role="img"
          aria-labelledby={`${gid}-title`}
          aria-describedby={`${gid}-desc`}
          data-export-root="true"
        >
          <title id={`${gid}-title`}>{EVL_ALT_TITLE}</title>
          <desc id={`${gid}-desc`}>{desc}</desc>
          <defs>
            <linearGradient id={`${gid}-bg`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={EVL_CHART_COLORS.bgTop} />
              <stop offset="100%" stopColor={EVL_CHART_COLORS.bgBottom} />
            </linearGradient>
            <linearGradient id={`${gid}-gold`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#a8841f" />
              <stop offset="100%" stopColor={EVL_CHART_COLORS.goldSoft} />
            </linearGradient>
          </defs>
          <rect width={W} height={H} fill={`url(#${gid}-bg)`} />
          <text x={W / 2} y={H * 0.44} textAnchor="middle" fill={EVL_CHART_COLORS.text} opacity="0.07" fontSize="48" fontWeight="700" letterSpacing="0.3em" fontFamily="Cormorant Garamond, Georgia, serif">
            AMBITION HOLIDAYS
          </text>
          <text x={W / 2} y={40} textAnchor="middle" fill={EVL_CHART_COLORS.text} fontSize="22" fontWeight="700" letterSpacing="0.06em" fontFamily="Cormorant Garamond, Georgia, serif">
            {EVL_ALT_TITLE}
          </text>
          <text x={W / 2} y={62} textAnchor="middle" fill={EVL_CHART_COLORS.textMuted} fontSize="12" fontWeight="600">
            {EVL_ALT_SUBTITLE}
          </text>

          {yTicks.map((m) => {
            const y = pad.t + (1 - (m - minM) / (maxM - minM)) * innerH;
            const label = unit === "m" ? m.toLocaleString("en-US") : metresToFeet(m).toLocaleString("en-US");
            return (
              <g key={m}>
                <line x1={pad.l} x2={W - pad.r} y1={y} y2={y} stroke={EVL_CHART_COLORS.grid} strokeWidth="1" />
                <text x={pad.l - 8} y={y + 4} textAnchor="end" fill={EVL_CHART_COLORS.textMuted} fontSize="10" fontWeight="600">{label}</text>
              </g>
            );
          })}

          <rect x={pad.l} y={pad.t} width={flightW + gap} height={innerH} fill="rgba(91,159,212,0.06)" stroke="rgba(91,159,212,0.2)" strokeDasharray="4 4" rx="6" />
          <rect x={pad.l + innerW - flightW - gap} y={pad.t} width={flightW + gap} height={innerH} fill="rgba(91,159,212,0.06)" stroke="rgba(91,159,212,0.2)" strokeDasharray="4 4" rx="6" />

          <line x1={ktmX} y1={ktmY} x2={luklaFirst.x - 8} y2={luklaFirst.y} stroke={EVL_CHART_COLORS.flight} strokeWidth="2" strokeDasharray="8 6" />
          <line x1={luklaLast.x + 8} y1={luklaLast.y} x2={returnKtmX} y2={ktmY} stroke={EVL_CHART_COLORS.flight} strokeWidth="2" strokeDasharray="8 6" />

          <g>
            <circle cx={ktmX} cy={ktmY} r="6" fill={EVL_CHART_COLORS.flight} stroke="#fff" strokeWidth="1.5" />
            <text x={ktmX} y={ktmY - 14} textAnchor="middle" fill={EVL_CHART_COLORS.text} fontSize="10" fontWeight="700">Kathmandu</text>
            <text x={ktmX} y={ktmY + 22} textAnchor="middle" fill={EVL_CHART_COLORS.flight} fontSize="8" fontWeight="700">FLIGHT</text>
          </g>
          <g>
            <circle cx={returnKtmX} cy={ktmY} r="6" fill={EVL_CHART_COLORS.flight} stroke="#fff" strokeWidth="1.5" />
            <text x={returnKtmX} y={ktmY - 14} textAnchor="middle" fill={EVL_CHART_COLORS.text} fontSize="10" fontWeight="700">Kathmandu</text>
            <text x={returnKtmX} y={ktmY + 22} textAnchor="middle" fill={EVL_CHART_COLORS.flight} fontSize="8" fontWeight="700">FLIGHT</text>
          </g>

          <path
            d={line}
            fill="none"
            stroke={`url(#${gid}-gold)`}
            strokeWidth={activeId ? 2.5 : 3.5}
            strokeLinejoin="round"
            strokeLinecap="round"
            opacity={activeId ? 0.5 : 1}
          />

          {points.map((p) => {
            const isActive = activeId === p.id;
            const elevLabelY = p.isPeak ? p.y - 56 : p.y - 14;
            return (
              <g key={p.id}>
                {p.isPeak ? (
                  <g>
                    <rect x={p.x - 76} y={p.y - 72} width={152} height={22} rx="6" fill="rgba(201,162,39,0.2)" stroke={EVL_CHART_COLORS.gold} />
                    <text x={p.x} y={p.y - 57} textAnchor="middle" fill={EVL_CHART_COLORS.goldSoft} fontSize="10" fontWeight="700">
                      Highest ~{unit === "m" ? "3,880 m" : `${metresToFeet(3880).toLocaleString("en-US")} ft`}
                    </text>
                  </g>
                ) : null}
                <text x={p.x} y={elevLabelY} textAnchor="middle" fill={EVL_CHART_COLORS.text} fontSize="9" fontWeight="700">
                  {p.value.toLocaleString("en-US")} {unit}
                </text>
                <text x={p.x} y={p.labelY} textAnchor="middle" fill={EVL_CHART_COLORS.textMuted} fontSize="9.5" fontWeight="600">
                  {p.shortLabel || p.label}
                </text>
                {isActive ? <circle cx={p.x} cy={p.y} r={14} fill={EVL_CHART_COLORS.gold} opacity="0.22" className="evl-no-export" /> : null}
                <circle cx={p.x} cy={p.y} r={p.isPeak ? 7 : 5.5} fill={p.isPeak ? EVL_CHART_COLORS.goldSoft : EVL_CHART_COLORS.gold} stroke="#fff" strokeWidth="1.5" />
                <g className="evl-no-export">
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={22}
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

          <g transform={`translate(${pad.l}, ${H - 44})`}>
            <rect width={380} height={48} rx="8" fill={EVL_CHART_COLORS.panel} stroke={EVL_CHART_COLORS.panelStroke} />
            <line x1={14} y1={18} x2={42} y2={18} stroke={EVL_CHART_COLORS.gold} strokeWidth="3" />
            <text x={50} y={22} fill={EVL_CHART_COLORS.textMuted} fontSize="10">Gold — Trekking route</text>
            <line x1={14} y1={34} x2={42} y2={34} stroke={EVL_CHART_COLORS.flight} strokeWidth="2" strokeDasharray="6 4" />
            <text x={50} y={38} fill={EVL_CHART_COLORS.textMuted} fontSize="10">Blue dash — Flight connection</text>
          </g>
          <text x={W - pad.r} y={H - 18} textAnchor="end" fill={EVL_CHART_COLORS.textMuted} fontSize="9" fontStyle="italic">
            Elevations are approximate and provided for trekking reference.
          </text>
          <text x={W / 2} y={H - 4} textAnchor="middle" fill={EVL_CHART_COLORS.textMuted} fontSize="9" fontWeight="600" letterSpacing="0.16em">
            AMBITION HOLIDAYS | NEPAL TREKKING
          </text>
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
      <p className="evl-map-hint evl-no-export">Tap or click a point for elevation and day details.</p>
    </EvlChartShell>
  );
}

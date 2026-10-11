"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import {
  EVL_ALT_SUBTITLE,
  EVL_ALT_TITLE,
  EVL_CHART_COLORS,
  EVL_FLIGHT_ALTITUDE,
  EVL_TREK_ALTITUDE_POINTS,
} from "@/lib/everest-view-charts";
import { metresToFeet } from "@/lib/ebc-charts";
import { EvlChartShell } from "./EvlChartShell";
import { downloadSvgAsPng, formatElevationM } from "./evl-chart-utils";

const W = 1100;
const H = 620;

function useNarrowLayout() {
  const [narrow, setNarrow] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const sync = () => setNarrow(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return narrow;
}

export function EverestViewAltitudeProfile({
  sectionTitle = "Altitude profile — Everest View Luxury Trek",
}: {
  sectionTitle?: string;
}) {
  const [unit, setUnit] = useState<"m" | "ft">("m");
  const svgRef = useRef<SVGSVGElement>(null);
  const gid = useId().replace(/:/g, "");
  const narrow = useNarrowLayout();

  const minM = 1200;
  const maxM = 4200;
  const pad = narrow ? { l: 52, r: 28, t: 96, b: 72 } : { l: 64, r: 40, t: 100, b: 88 };
  const innerW = W - pad.l - pad.r;
  const innerH = H - pad.t - pad.b;

  const flightW = narrow ? 56 : 72;
  const gap = narrow ? 18 : 28;
  const trekCount = EVL_TREK_ALTITUDE_POINTS.length;
  const trekInnerW = innerW - flightW * 2 - gap * 2;

  const points = useMemo(() => {
    return EVL_TREK_ALTITUDE_POINTS.map((stop, i) => {
      const x = pad.l + flightW + gap + (i / (trekCount - 1)) * trekInnerW;
      const y = pad.t + (1 - (stop.m - minM) / (maxM - minM)) * innerH;
      const value = unit === "m" ? stop.m : metresToFeet(stop.m);
      return { ...stop, x, y, value };
    });
  }, [flightW, gap, innerH, pad.l, pad.t, trekCount, trekInnerW, unit]);

  const line = points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");

  const ktmX = pad.l + flightW / 2;
  const ktmY = pad.t + (1 - (EVL_FLIGHT_ALTITUDE.m - minM) / (maxM - minM)) * innerH;
  const luklaFirst = points[0];
  const luklaLast = points[points.length - 1];
  const returnKtmX = pad.l + innerW - flightW / 2;

  const yTicks = [1400, 2000, 2600, 3200, 3800, 4200];

  const desc =
    "Approximate trekking elevation profile for the seven-day Everest View Luxury Trek. Kathmandu–Lukla transfers are flights and shown separately from the walking profile.";

  return (
    <EvlChartShell
      sectionTitle={sectionTitle}
      downloadLabel="Download PNG"
      variant="altitude"
      onDownload={() => downloadSvgAsPng(svgRef.current, "everest-view-luxury-trek-altitude-profile")}
    >
      <div className="lux-unit evl-alt-unit">
        <span>Altitude in:</span>
        <button type="button" className={unit === "m" ? "on" : ""} onClick={() => setUnit("m")}>
          Metres
        </button>
        <button type="button" className={unit === "ft" ? "on" : ""} onClick={() => setUnit("ft")}>
          Feet
        </button>
      </div>
      <svg
        ref={svgRef}
        className="evl-infographic-svg"
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-labelledby={`${gid}-title`}
        aria-describedby={`${gid}-desc`}
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
        <text
          x={W / 2}
          y={H * 0.42}
          textAnchor="middle"
          fill={EVL_CHART_COLORS.text}
          opacity="0.07"
          fontSize="52"
          fontWeight="700"
          letterSpacing="0.32em"
          style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
        >
          AMBITION HOLIDAYS
        </text>

        <text
          x={W / 2}
          y={44}
          textAnchor="middle"
          fill={EVL_CHART_COLORS.text}
          fontSize={narrow ? 20 : 24}
          fontWeight="700"
          letterSpacing="0.06em"
          style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
        >
          {EVL_ALT_TITLE}
        </text>
        <text
          x={W / 2}
          y={68}
          textAnchor="middle"
          fill={EVL_CHART_COLORS.textMuted}
          fontSize="12"
          fontWeight="600"
        >
          {EVL_ALT_SUBTITLE}
        </text>

        {yTicks.map((m) => {
          const y = pad.t + (1 - (m - minM) / (maxM - minM)) * innerH;
          const label = unit === "m" ? `${m.toLocaleString("en-US")}` : `${metresToFeet(m).toLocaleString("en-US")}`;
          return (
            <g key={m}>
              <line x1={pad.l} x2={W - pad.r} y1={y} y2={y} stroke={EVL_CHART_COLORS.grid} strokeWidth="1" />
              <text x={pad.l - 10} y={y + 4} textAnchor="end" fill={EVL_CHART_COLORS.textMuted} fontSize="10" fontWeight="600">
                {label}
              </text>
            </g>
          );
        })}
        <text
          x={16}
          y={pad.t + innerH / 2}
          textAnchor="middle"
          fill={EVL_CHART_COLORS.textMuted}
          fontSize="10"
          fontWeight="700"
          transform={`rotate(-90 16 ${pad.t + innerH / 2})`}
        >
          {unit === "m" ? "METRES" : "FEET"}
        </text>

        {/* Flight zones — not part of walking profile */}
        <rect
          x={pad.l}
          y={pad.t}
          width={flightW + gap}
          height={innerH}
          fill="rgba(91,159,212,0.06)"
          stroke="rgba(91,159,212,0.2)"
          strokeDasharray="4 4"
          rx="6"
        />
        <rect
          x={pad.l + innerW - flightW - gap}
          y={pad.t}
          width={flightW + gap}
          height={innerH}
          fill="rgba(91,159,212,0.06)"
          stroke="rgba(91,159,212,0.2)"
          strokeDasharray="4 4"
          rx="6"
        />

        <line
          x1={ktmX}
          y1={ktmY}
          x2={luklaFirst.x - 6}
          y2={luklaFirst.y}
          stroke={EVL_CHART_COLORS.flight}
          strokeWidth="2"
          strokeDasharray="8 6"
        />
        <line
          x1={luklaLast.x + 6}
          y1={luklaLast.y}
          x2={returnKtmX}
          y2={ktmY}
          stroke={EVL_CHART_COLORS.flight}
          strokeWidth="2"
          strokeDasharray="8 6"
        />

        <g>
          <circle cx={ktmX} cy={ktmY} r="6" fill={EVL_CHART_COLORS.flight} stroke="#fff" strokeWidth="1.5" />
          <text x={ktmX} y={ktmY - 12} textAnchor="middle" fill={EVL_CHART_COLORS.text} fontSize="10" fontWeight="700">
            Kathmandu
          </text>
          <text x={ktmX} y={ktmY + 22} textAnchor="middle" fill={EVL_CHART_COLORS.textMuted} fontSize="9">
            {formatElevationM(EVL_FLIGHT_ALTITUDE.m)}
          </text>
          <text x={ktmX} y={ktmY + 36} textAnchor="middle" fill={EVL_CHART_COLORS.flight} fontSize="8" fontWeight="700">
            FLIGHT
          </text>
        </g>
        <g>
          <circle cx={returnKtmX} cy={ktmY} r="6" fill={EVL_CHART_COLORS.flight} stroke="#fff" strokeWidth="1.5" />
          <text x={returnKtmX} y={ktmY - 12} textAnchor="middle" fill={EVL_CHART_COLORS.text} fontSize="10" fontWeight="700">
            Kathmandu
          </text>
          <text x={returnKtmX} y={ktmY + 22} textAnchor="middle" fill={EVL_CHART_COLORS.flight} fontSize="8" fontWeight="700">
            FLIGHT
          </text>
        </g>

        <path d={line} fill="none" stroke={`url(#${gid}-gold)`} strokeWidth="3.5" strokeLinejoin="round" strokeLinecap="round" />

        {points.map((p, i) => (
          <g key={`${p.id}-${i}`}>
            <circle
              cx={p.x}
              cy={p.y}
              r={p.isPeak ? 7 : 5}
              fill={p.isPeak ? EVL_CHART_COLORS.goldSoft : EVL_CHART_COLORS.gold}
              stroke="#fff"
              strokeWidth="1.5"
            />
            {p.isPeak ? (
              <g>
                <rect x={p.x - 72} y={p.y - 52} width={144} height={22} rx="6" fill="rgba(201,162,39,0.2)" stroke={EVL_CHART_COLORS.gold} />
                <text x={p.x} y={p.y - 37} textAnchor="middle" fill={EVL_CHART_COLORS.goldSoft} fontSize="10" fontWeight="700">
                  Highest ~{unit === "m" ? "3,880 m" : `${metresToFeet(3880).toLocaleString("en-US")} ft`}
                </text>
              </g>
            ) : null}
            <text
              x={p.x}
              y={H - pad.b + (narrow ? 14 : 18)}
              textAnchor="middle"
              fill={EVL_CHART_COLORS.textMuted}
              fontSize={narrow ? 8.5 : 9.5}
              fontWeight="600"
            >
              {p.shortLabel || p.label}
            </text>
            <text x={p.x} y={p.y - (p.isPeak ? 14 : 10)} textAnchor="middle" fill={EVL_CHART_COLORS.text} fontSize="9" fontWeight="700">
              {p.value.toLocaleString("en-US")} {unit}
            </text>
          </g>
        ))}

        <g transform={`translate(${pad.l}, ${H - 36})`}>
          <rect width={narrow ? 320 : 400} height={52} rx="8" fill={EVL_CHART_COLORS.panel} stroke={EVL_CHART_COLORS.panelStroke} />
          <line x1={16} y1={20} x2={44} y2={20} stroke={EVL_CHART_COLORS.gold} strokeWidth="3" />
          <text x={52} y={24} fill={EVL_CHART_COLORS.textMuted} fontSize="10">Gold line — Trekking route</text>
          <line x1={16} y1={38} x2={44} y2={38} stroke={EVL_CHART_COLORS.flight} strokeWidth="2" strokeDasharray="6 4" />
          <text x={52} y={42} fill={EVL_CHART_COLORS.textMuted} fontSize="10">Blue dash — Flight connection</text>
          <circle cx={narrow ? 250 : 310} cy={20} r="4" fill={EVL_CHART_COLORS.gold} />
          <text x={narrow ? 260 : 320} y={24} fill={EVL_CHART_COLORS.textMuted} fontSize="10">Markers — Trek locations</text>
        </g>

        <text x={W - pad.r} y={H - 14} textAnchor="end" fill={EVL_CHART_COLORS.textMuted} fontSize="9" fontStyle="italic">
          Elevations are approximate and provided for trekking reference.
        </text>
        <text
          x={W / 2}
          y={H - 2}
          textAnchor="middle"
          fill={EVL_CHART_COLORS.textMuted}
          fontSize="9"
          fontWeight="600"
          letterSpacing="0.18em"
        >
          AMBITION HOLIDAYS | NEPAL TREKKING
        </text>
      </svg>
    </EvlChartShell>
  );
}

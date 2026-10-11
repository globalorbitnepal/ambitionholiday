"use client";

import { EVL_ATLAS } from "@/lib/everest-view-atlas-colors";

export const ATLAS_FONT_SERIF = "Cormorant Garamond, Georgia, serif";
export const ATLAS_FONT_SANS = "Manrope, ui-sans-serif, system-ui, sans-serif";

export function AtlasScenicBackground({ gid, w, h }: { gid: string; w: number; h: number }) {
  return (
    <>
      <defs>
        <linearGradient id={`${gid}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={EVL_ATLAS.skyTop} />
          <stop offset="55%" stopColor={EVL_ATLAS.skyMid} />
          <stop offset="100%" stopColor={EVL_ATLAS.skyBottom} />
        </linearGradient>
        <linearGradient id={`${gid}-peak`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f8fbff" />
          <stop offset="100%" stopColor={EVL_ATLAS.peak} />
        </linearGradient>
        <marker id={`${gid}-arrow`} markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 Z" fill={EVL_ATLAS.route} />
        </marker>
        <marker id={`${gid}-flight-arrow`} markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
          <path d="M0,0 L7,3.5 L0,7 Z" fill={EVL_ATLAS.flight} />
        </marker>
      </defs>
      <rect width={w} height={h} fill={`url(#${gid}-sky)`} />
      <path
        d={`M0 200 L140 140 L300 95 L480 60 L660 42 L840 55 L1000 75 L${w} 75 L${w} ${h} L0 ${h} Z`}
        fill={`url(#${gid}-peak)`}
        opacity="0.35"
      />
      <path
        d={`M0 420 C200 380 380 440 520 400 C680 355 820 410 ${w} 380 L${w} ${h} L0 ${h} Z`}
        fill={EVL_ATLAS.hill}
        opacity="0.45"
      />
      <text
        x={w / 2}
        y={h * 0.48}
        textAnchor="middle"
        fill={EVL_ATLAS.watermark}
        opacity="0.055"
        fontSize="26"
        fontWeight="700"
        letterSpacing="0.35em"
        fontFamily={ATLAS_FONT_SERIF}
      >
        AMBITION HOLIDAYS
      </text>
    </>
  );
}

export function AtlasMapTitle({ title, subtitle, w }: { title: string; subtitle: string; w: number }) {
  return (
    <>
      <text x={w / 2} y={38} textAnchor="middle" fill={EVL_ATLAS.text} fontSize="22" fontWeight="700" fontFamily={ATLAS_FONT_SERIF}>
        {title}
      </text>
      <text x={w / 2} y={58} textAnchor="middle" fill={EVL_ATLAS.textMuted} fontSize="11" fontWeight="600" fontFamily={ATLAS_FONT_SANS}>
        {subtitle}
      </text>
      <text x={w / 2} y={74} textAnchor="middle" fill={EVL_ATLAS.textElev} fontSize="9.5" fontStyle="italic" fontFamily={ATLAS_FONT_SANS}>
        Schematic route map — illustrative layout, not survey accurate
      </text>
    </>
  );
}

export function AtlasMapLegend({ x, y }: { x: number; y: number }) {
  const lines = [
    { color: EVL_ATLAS.route, dash: undefined, label: "Trekking route" },
    { color: EVL_ATLAS.flight, dash: "7 5", label: "Flight connection" },
    { color: EVL_ATLAS.routeDescent, dash: undefined, label: "Return / descent leg" },
    { color: EVL_ATLAS.gold, dash: "4 3", label: "Acclimatisation (Day 3)" },
  ];
  return (
    <g>
      <rect x={x} y={y} width={248} height={108} rx="10" fill={EVL_ATLAS.panel} stroke={EVL_ATLAS.panelStroke} strokeWidth="1" />
      <text x={x + 14} y={y + 22} fontSize="12" fontWeight="700" fill={EVL_ATLAS.text} fontFamily={ATLAS_FONT_SANS}>
        Ambition Holidays
      </text>
      {lines.map((line, i) => (
        <g key={line.label}>
          <line
            x1={x + 14}
            y1={y + 38 + i * 18}
            x2={x + 44}
            y2={y + 38 + i * 18}
            stroke={line.color}
            strokeWidth={line.label.includes("Flight") ? 2.5 : 4}
            strokeDasharray={line.dash}
          />
          <text x={x + 52} y={y + 42 + i * 18} fontSize="10.5" fill={EVL_ATLAS.textMuted} fontFamily={ATLAS_FONT_SANS}>
            {line.label}
          </text>
        </g>
      ))}
    </g>
  );
}

export function AtlasDayMarker({ x, y, day, active }: { x: number; y: number; day: number; active?: boolean }) {
  const r = active ? 13 : 11;
  return (
    <g pointerEvents="none">
      <circle cx={x} cy={y} r={r} fill={EVL_ATLAS.dayFill} stroke={EVL_ATLAS.dayStroke} strokeWidth={active ? 2.5 : 1.8} />
      <text x={x} y={y + 4} textAnchor="middle" fill={EVL_ATLAS.text} fontSize="10" fontWeight="800" fontFamily={ATLAS_FONT_SANS}>
        {day}
      </text>
    </g>
  );
}

export function AtlasChartFooter({ w, y }: { w: number; y: number }) {
  return (
    <text x={w / 2} y={y} textAnchor="middle" fill={EVL_ATLAS.textMuted} fontSize="9" fontWeight="600" letterSpacing="0.12em" fontFamily={ATLAS_FONT_SANS}>
      AMBITION HOLIDAYS | NEPAL TREKKING
    </text>
  );
}

/** Shared light plot card for altitude / weather SVGs */
export function AtlasChartFrame({ gid, w, h, title, subtitle }: { gid: string; w: number; h: number; title: string; subtitle: string }) {
  return (
    <>
      <AtlasScenicBackground gid={gid} w={w} h={h} />
      <text x={w / 2} y={36} textAnchor="middle" fill={EVL_ATLAS.text} fontSize="20" fontWeight="700" fontFamily={ATLAS_FONT_SERIF}>
        {title}
      </text>
      <text x={w / 2} y={54} textAnchor="middle" fill={EVL_ATLAS.textMuted} fontSize="10.5" fontWeight="600" fontFamily={ATLAS_FONT_SANS}>
        {subtitle}
      </text>
    </>
  );
}

export function AtlasPlotRect({ x, y, width, height }: { x: number; y: number; width: number; height: number }) {
  return (
    <rect x={x} y={y} width={width} height={height} rx="8" fill="#ffffff" fillOpacity="0.72" stroke={EVL_ATLAS.panelStroke} strokeWidth="1" />
  );
}

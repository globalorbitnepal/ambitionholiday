"use client";

import { EVL_CHART_COLORS } from "@/lib/everest-view-charts";

export const EVL_FONT_SERIF = "Cormorant Garamond, Georgia, serif";
export const EVL_FONT_SANS = "Manrope, ui-sans-serif, system-ui, sans-serif";

export const EVL_LAYOUT = {
  headerY: 32,
  subtitleY: 50,
  plotTop: 68,
  legendY: 468,
};

export function EvlSvgBackground({ gid, w, h }: { gid: string; w: number; h: number }) {
  const wmY = h * 0.46;
  return (
    <>
      <defs>
        <linearGradient id={`${gid}-evl-bg`} x1="0" y1="0" x2="0.25" y2="1">
          <stop offset="0%" stopColor={EVL_CHART_COLORS.bgTop} />
          <stop offset="55%" stopColor={EVL_CHART_COLORS.bgMid} />
          <stop offset="100%" stopColor={EVL_CHART_COLORS.bgBottom} />
        </linearGradient>
        <linearGradient id="evl-gold-line" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#a8841f" />
          <stop offset="100%" stopColor={EVL_CHART_COLORS.goldSoft} />
        </linearGradient>
        <filter id={`${gid}-text-halo`} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="1" stdDeviation="1.2" floodColor="#080e18" floodOpacity="0.95" />
        </filter>
      </defs>
      <rect width={w} height={h} fill={`url(#${gid}-evl-bg)`} />
      {[0.28, 0.48, 0.68].map((t) => (
        <line key={t} x1={0} y1={h * t} x2={w} y2={h * t} stroke={EVL_CHART_COLORS.grid} strokeWidth="1" />
      ))}
      <text
        x={w / 2}
        y={wmY}
        textAnchor="middle"
        fill={EVL_CHART_COLORS.text}
        opacity="0.06"
        fontSize={Math.min(48, w * 0.044)}
        fontWeight="700"
        letterSpacing="0.28em"
        fontFamily={EVL_FONT_SERIF}
      >
        AMBITION HOLIDAYS
      </text>
    </>
  );
}

export function EvlChartHeader({ title, subtitle, w }: { title: string; subtitle: string; w: number }) {
  return (
    <>
      <text
        x={w / 2}
        y={EVL_LAYOUT.headerY}
        textAnchor="middle"
        fill={EVL_CHART_COLORS.text}
        fontSize="19"
        fontWeight="700"
        letterSpacing="0.05em"
        fontFamily={EVL_FONT_SERIF}
      >
        {title}
      </text>
      <text
        x={w / 2}
        y={EVL_LAYOUT.subtitleY}
        textAnchor="middle"
        fill={EVL_CHART_COLORS.textMuted}
        fontSize="10.5"
        fontWeight="600"
        fontFamily={EVL_FONT_SANS}
      >
        {subtitle}
      </text>
    </>
  );
}

export function EvlChartFooter({ w, h }: { w: number; h: number }) {
  return (
    <text
      x={w / 2}
      y={h - 8}
      textAnchor="middle"
      fill={EVL_CHART_COLORS.textMuted}
      fontSize="8.5"
      fontWeight="600"
      letterSpacing="0.14em"
      fontFamily={EVL_FONT_SANS}
    >
      AMBITION HOLIDAYS | NEPAL TREKKING
    </text>
  );
}

export function EvlPlotArea({ x, y, width, height }: { x: number; y: number; width: number; height: number }) {
  return (
    <rect
      x={x}
      y={y}
      width={width}
      height={height}
      rx="8"
      fill="rgba(6,12,22,0.42)"
      stroke={EVL_CHART_COLORS.panelStroke}
      strokeWidth="1"
    />
  );
}

type EvlLegendItem = { kind: "line-gold" | "line-flight" | "airport" | "day-dot"; label: string };

export function EvlLegendStrip({
  w,
  y,
  items,
  note,
}: {
  w: number;
  y: number;
  items: EvlLegendItem[];
  note?: string;
}) {
  const stripH = note ? 52 : 36;
  const x0 = (w - Math.min(w - 40, 720)) / 2;
  const stripW = Math.min(w - 40, 720);
  return (
    <g>
      <rect x={x0} y={y} width={stripW} height={stripH} rx="6" fill="rgba(8,14,24,0.55)" stroke={EVL_CHART_COLORS.panelStroke} strokeWidth="0.75" />
      {items.map((item, i) => {
        const col = i % 4;
        const row = Math.floor(i / 4);
        const ix = x0 + 14 + col * (stripW / 4);
        const iy = y + 16 + row * 18;
        return (
          <g key={item.label}>
            {item.kind === "line-gold" ? (
              <line x1={ix} y1={iy - 4} x2={ix + 22} y2={iy - 4} stroke="url(#evl-gold-line)" strokeWidth="3.5" />
            ) : null}
            {item.kind === "line-flight" ? (
              <line x1={ix} y1={iy - 4} x2={ix + 22} y2={iy - 4} stroke={EVL_CHART_COLORS.flight} strokeWidth="2" strokeDasharray="6 4" />
            ) : null}
            {item.kind === "airport" ? (
              <circle cx={ix + 8} cy={iy - 4} r="5" fill={EVL_CHART_COLORS.flight} stroke="#fff" strokeWidth="1" />
            ) : null}
            {item.kind === "day-dot" ? (
              <>
                <circle cx={ix + 8} cy={iy - 4} r="7" fill="rgba(8,14,24,0.9)" stroke={EVL_CHART_COLORS.gold} strokeWidth="1" />
                <text x={ix + 8} y={iy - 1} textAnchor="middle" fill={EVL_CHART_COLORS.goldSoft} fontSize="7" fontWeight="800">1</text>
              </>
            ) : null}
            <text x={ix + (item.kind === "day-dot" ? 20 : 28)} y={iy} fill={EVL_CHART_COLORS.textMuted} fontSize="9.5" fontFamily={EVL_FONT_SANS}>
              {item.label}
            </text>
          </g>
        );
      })}
      {note ? (
        <text x={x0 + stripW / 2} y={y + stripH - 8} textAnchor="middle" fill={EVL_CHART_COLORS.textMuted} fontSize="8.5" fontStyle="italic" fontFamily={EVL_FONT_SANS}>
          {note}
        </text>
      ) : null}
    </g>
  );
}

export function EvlDayDot({ x, y, day, hot, visible }: { x: number; y: number; day: number; hot: boolean; visible: boolean }) {
  if (!visible) return null;
  const r = hot ? 11 : 9;
  return (
    <g pointerEvents="none">
      <circle
        cx={x}
        cy={y}
        r={r}
        fill={hot ? "rgba(201,162,39,0.28)" : "rgba(8,14,24,0.92)"}
        stroke={hot ? EVL_CHART_COLORS.goldSoft : EVL_CHART_COLORS.gold}
        strokeWidth={hot ? 1.8 : 1.2}
      />
      <text x={x} y={y + 3.5} textAnchor="middle" fill={EVL_CHART_COLORS.text} fontSize="9" fontWeight="800" fontFamily={EVL_FONT_SANS}>
        {day}
      </text>
    </g>
  );
}

export function EvlMapStopLabel({
  gid,
  name,
  elevation,
  x,
  y,
  anchor,
  active,
  peakNote,
}: {
  gid: string;
  name: string;
  elevation: string;
  x: number;
  y: number;
  anchor: "start" | "middle" | "end";
  active?: boolean;
  peakNote?: string;
}) {
  const ax = anchor === "start" ? x : anchor === "end" ? x : x;
  return (
    <g filter={`url(#${gid}-text-halo)`}>
      <text x={ax} y={y} textAnchor={anchor} fill={active ? EVL_CHART_COLORS.goldSoft : EVL_CHART_COLORS.text} fontSize="11.5" fontWeight="700" fontFamily={EVL_FONT_SANS}>
        {name}
      </text>
      <text x={ax} y={y + 13} textAnchor={anchor} fill={EVL_CHART_COLORS.textMuted} fontSize="10" fontWeight="600" fontFamily={EVL_FONT_SANS}>
        {elevation}
      </text>
      {peakNote ? (
        <text x={ax} y={y + 26} textAnchor={anchor} fill={EVL_CHART_COLORS.goldSoft} fontSize="8.5" fontWeight="700" fontFamily={EVL_FONT_SANS}>
          {peakNote}
        </text>
      ) : null}
    </g>
  );
}

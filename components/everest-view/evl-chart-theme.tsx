"use client";

import { EVL_CHART_COLORS } from "@/lib/everest-view-charts";

export const EVL_FONT_SERIF = "Cormorant Garamond, Georgia, serif";
export const EVL_FONT_SANS = "Manrope, ui-sans-serif, system-ui, sans-serif";

export const EVL_LAYOUT = {
  headerY: 32,
  subtitleY: 50,
  plotTop: 68,
};

/** Vertical bands: plot → legend row → italic note → brand footer (no overlap). */
export function evlChartBands(h: number, withNote: boolean) {
  const footerY = h - 8;
  const legendY = withNote ? h - 92 : h - 52;
  return { footerY, legendY };
}

export function EvlSvgBackground({
  gid,
  w,
  h,
  watermarkY,
}: {
  gid: string;
  w: number;
  h: number;
  watermarkY?: number;
}) {
  const wmY = watermarkY ?? h * 0.36;
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
        <filter id={`${gid}-text-halo`} x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="1" stdDeviation="1.4" floodColor="#060a12" floodOpacity="0.98" />
        </filter>
      </defs>
      <rect width={w} height={h} fill={`url(#${gid}-evl-bg)`} />
      {[0.26, 0.46, 0.66].map((t) => (
        <line key={t} x1={0} y1={h * t} x2={w} y2={h * t} stroke={EVL_CHART_COLORS.grid} strokeWidth="1" />
      ))}
      <text
        x={w / 2}
        y={wmY}
        textAnchor="middle"
        fill={EVL_CHART_COLORS.text}
        opacity="0.05"
        fontSize={Math.min(44, w * 0.04)}
        fontWeight="700"
        letterSpacing="0.26em"
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

export function EvlChartFooter({ w, y }: { w: number; y: number }) {
  return (
    <text
      x={w / 2}
      y={y}
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

function LegendIcon({ kind, x, y }: { kind: EvlLegendItem["kind"]; x: number; y: number }) {
  if (kind === "line-gold") {
    return <line x1={x} y1={y} x2={x + 24} y2={y} stroke="url(#evl-gold-line)" strokeWidth="3.5" />;
  }
  if (kind === "line-flight") {
    return <line x1={x} y1={y} x2={x + 24} y2={y} stroke={EVL_CHART_COLORS.flight} strokeWidth="2" strokeDasharray="6 4" />;
  }
  if (kind === "airport") {
    return <circle cx={x + 10} cy={y} r="5" fill={EVL_CHART_COLORS.flight} stroke="#fff" strokeWidth="1" />;
  }
  return (
    <>
      <circle cx={x + 10} cy={y} r="7" fill="rgba(8,14,24,0.92)" stroke={EVL_CHART_COLORS.gold} strokeWidth="1" />
      <text x={x + 10} y={y + 3} textAnchor="middle" fill={EVL_CHART_COLORS.goldSoft} fontSize="7" fontWeight="800">1</text>
    </>
  );
}

/** One horizontal row per item — no stacked columns (prevents label collision). */
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
  const rowH = 30;
  const minSlot = items.length <= 2 ? 200 : 155;
  const totalW = Math.min(w - 32, minSlot * items.length);
  const x0 = (w - totalW) / 2;
  const slotW = totalW / items.length;
  const iconY = y + 15;

  return (
    <g>
      <rect x={x0} y={y} width={totalW} height={rowH} rx="6" fill="rgba(8,14,24,0.65)" stroke={EVL_CHART_COLORS.panelStroke} strokeWidth="0.75" />
      {items.map((item, i) => {
        const slotX = x0 + i * slotW + 10;
        const textX = slotX + (item.kind === "day-dot" || item.kind === "airport" ? 26 : 30);
        return (
          <g key={`${item.kind}-${item.label}`}>
            <LegendIcon kind={item.kind} x={slotX} y={iconY} />
            <text x={textX} y={iconY + 4} fill={EVL_CHART_COLORS.textMuted} fontSize="9" fontFamily={EVL_FONT_SANS}>
              {item.label}
            </text>
          </g>
        );
      })}
      {note ? (
        <text x={w / 2} y={y + rowH + 22} textAnchor="middle" fill={EVL_CHART_COLORS.textMuted} fontSize="8.5" fontStyle="italic" fontFamily={EVL_FONT_SANS}>
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
        fill={hot ? "rgba(201,162,39,0.28)" : "rgba(8,14,24,0.94)"}
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
}: {
  gid: string;
  name: string;
  elevation: string;
  x: number;
  y: number;
  anchor: "start" | "middle" | "end";
  active?: boolean;
}) {
  return (
    <g filter={`url(#${gid}-text-halo)`}>
      <text x={x} y={y} textAnchor={anchor} fill={active ? EVL_CHART_COLORS.goldSoft : EVL_CHART_COLORS.text} fontSize="11.5" fontWeight="700" fontFamily={EVL_FONT_SANS}>
        {name}
      </text>
      <text x={x} y={y + 14} textAnchor={anchor} fill={EVL_CHART_COLORS.textMuted} fontSize="9.5" fontWeight="600" fontFamily={EVL_FONT_SANS}>
        {elevation}
      </text>
    </g>
  );
}

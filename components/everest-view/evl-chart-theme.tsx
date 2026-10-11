"use client";

import { EVL_CHART_COLORS } from "@/lib/everest-view-charts";

export const EVL_FONT_SERIF = "Cormorant Garamond, Georgia, serif";
export const EVL_FONT_SANS = "Manrope, ui-sans-serif, system-ui, sans-serif";

export function EvlSvgBackground({ gid, w, h }: { gid: string; w: number; h: number }) {
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
      </defs>
      <rect width={w} height={h} fill={`url(#${gid}-evl-bg)`} />
      {[0.22, 0.42, 0.62, 0.82].map((t) => (
        <line key={t} x1={0} y1={h * t} x2={w} y2={h * t} stroke={EVL_CHART_COLORS.grid} strokeWidth="1" />
      ))}
      <text
        x={w / 2}
        y={h * 0.52}
        textAnchor="middle"
        fill={EVL_CHART_COLORS.text}
        opacity="0.07"
        fontSize={Math.min(52, w * 0.05)}
        fontWeight="700"
        letterSpacing="0.3em"
        fontFamily={EVL_FONT_SERIF}
      >
        AMBITION HOLIDAYS
      </text>
    </>
  );
}

export function EvlChartHeader({
  title,
  subtitle,
  w,
}: {
  title: string;
  subtitle: string;
  w: number;
}) {
  return (
    <>
      <text x={w / 2} y={36} textAnchor="middle" fill={EVL_CHART_COLORS.text} fontSize="21" fontWeight="700" letterSpacing="0.06em" fontFamily={EVL_FONT_SERIF}>
        {title}
      </text>
      <text x={w / 2} y={56} textAnchor="middle" fill={EVL_CHART_COLORS.textMuted} fontSize="11.5" fontWeight="600" fontFamily={EVL_FONT_SANS}>
        {subtitle}
      </text>
    </>
  );
}

export function EvlChartFooter({ w, h }: { w: number; h: number }) {
  return (
    <text x={w / 2} y={h - 12} textAnchor="middle" fill={EVL_CHART_COLORS.textMuted} fontSize="9" fontWeight="600" letterSpacing="0.16em" fontFamily={EVL_FONT_SANS}>
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
      rx="10"
      fill="rgba(6,12,22,0.55)"
      stroke={EVL_CHART_COLORS.panelStroke}
      strokeWidth="1"
    />
  );
}

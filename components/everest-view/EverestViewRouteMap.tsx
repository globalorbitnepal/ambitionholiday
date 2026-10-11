"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import {
  EVL_CHART_COLORS,
  EVL_ITINERARY_OVERVIEW,
  EVL_MAP_NODES,
  EVL_MAP_SUBTITLE,
  EVL_MAP_TITLE,
  EVL_WALK_SEGMENTS_OUT,
  EVL_WALK_SEGMENTS_RETURN,
  type EvlMapNode,
  type EvlWalkSegment,
} from "@/lib/everest-view-charts";
import { EvlChartShell } from "./EvlChartShell";
import { downloadSvgAsPng, formatElevationM } from "./evl-chart-utils";

const WIDE = { w: 1200, h: 720 };
const COMPACT = { w: 640, h: 980 };

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

function nodeById(nodes: EvlMapNode[]) {
  return Object.fromEntries(nodes.map((n) => [n.id, n])) as Record<string, EvlMapNode>;
}

function pos(n: EvlMapNode, compact: boolean) {
  return compact ? { x: n.cx, y: n.cy } : { x: n.x, y: n.y };
}

function buildWalkPath(segments: EvlWalkSegment[], nodes: Record<string, EvlMapNode>, compact: boolean): string {
  if (!segments.length) return "";
  const parts: string[] = [];
  segments.forEach((seg, i) => {
    const a = pos(nodes[seg.from], compact);
    const b = pos(nodes[seg.to], compact);
    if (i === 0) parts.push(`M${a.x},${a.y}`);
    if (seg.cx != null && seg.cy != null && !compact) {
      parts.push(`Q${seg.cx},${seg.cy} ${b.x},${b.y}`);
    } else {
      parts.push(`L${b.x},${b.y}`);
    }
  });
  return parts.join(" ");
}

function Background({ gid, w, h, compact }: { gid: string; w: number; h: number; compact: boolean }) {
  return (
    <>
      <defs>
        <linearGradient id={`${gid}-bg`} x1="0" y1="0" x2="0.3" y2="1">
          <stop offset="0%" stopColor={EVL_CHART_COLORS.bgTop} />
          <stop offset="55%" stopColor={EVL_CHART_COLORS.bgMid} />
          <stop offset="100%" stopColor={EVL_CHART_COLORS.bgBottom} />
        </linearGradient>
        <linearGradient id={`${gid}-gold`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#a8841f" />
          <stop offset="50%" stopColor={EVL_CHART_COLORS.gold} />
          <stop offset="100%" stopColor={EVL_CHART_COLORS.goldSoft} />
        </linearGradient>
        <marker id={`${gid}-arrow`} markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 Z" fill={EVL_CHART_COLORS.gold} />
        </marker>
        <marker id={`${gid}-flight`} markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill={EVL_CHART_COLORS.flight} opacity="0.85" />
        </marker>
      </defs>
      <rect width={w} height={h} fill={`url(#${gid}-bg)`} />
      {[0.2, 0.4, 0.6, 0.8].map((t) => (
        <line
          key={t}
          x1={0}
          y1={h * t}
          x2={w}
          y2={h * t}
          stroke={EVL_CHART_COLORS.grid}
          strokeWidth="1"
        />
      ))}
      {[0.15, 0.35, 0.55, 0.75].map((t) => (
        <ellipse
          key={t}
          cx={w * 0.55}
          cy={h * 0.42}
          rx={w * (0.35 + t * 0.08)}
          ry={h * (0.12 + t * 0.04)}
          fill="none"
          stroke={EVL_CHART_COLORS.grid}
          strokeWidth="0.75"
        />
      ))}
      <text
        x={w / 2}
        y={h * 0.48}
        textAnchor="middle"
        fill={EVL_CHART_COLORS.text}
        opacity="0.075"
        fontSize={compact ? 38 : 56}
        fontWeight="700"
        letterSpacing="0.35em"
        style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
      >
        AMBITION HOLIDAYS
      </text>
    </>
  );
}

function StopMarker({ node, compact }: { node: EvlMapNode; compact: boolean }) {
  const { x, y } = pos(node, compact);
  const isPeak = node.role === "highlight";
  const isFlight = node.role === "flight";
  const r = isPeak ? 9 : isFlight ? 7 : 7.5;
  const fill = isPeak ? EVL_CHART_COLORS.goldSoft : isFlight ? EVL_CHART_COLORS.flight : EVL_CHART_COLORS.gold;
  const labelX = compact ? x + 14 : x + (node.id === "ktm" ? -12 : 16);
  const anchor = compact ? "start" : node.id === "ktm" ? "end" : "start";
  const labelY = y - (isPeak ? 22 : 18);

  return (
    <g>
      {isPeak ? (
        <circle cx={x} cy={y} r={18} fill={EVL_CHART_COLORS.gold} opacity="0.15" />
      ) : null}
      <circle cx={x} cy={y} r={r} fill={fill} stroke="#fff" strokeWidth="2" />
      <text
        x={labelX}
        y={labelY}
        textAnchor={anchor}
        fill={EVL_CHART_COLORS.text}
        fontSize={compact ? 12 : 14}
        fontWeight="700"
        style={{ fontFamily: "var(--font-manrope), system-ui, sans-serif" }}
      >
        {node.name}
      </text>
      <text
        x={labelX}
        y={labelY + (compact ? 14 : 16)}
        textAnchor={anchor}
        fill={EVL_CHART_COLORS.textMuted}
        fontSize={compact ? 11 : 12}
        fontWeight="600"
        style={{ fontFamily: "var(--font-manrope), system-ui, sans-serif" }}
      >
        {formatElevationM(node.elevationM)}
      </text>
      {isPeak ? (
        <text
          x={x}
          y={y + 28}
          textAnchor="middle"
          fill={EVL_CHART_COLORS.goldSoft}
          fontSize="10"
          fontWeight="700"
          letterSpacing="0.12em"
        >
          HIGHEST VIEWPOINT
        </text>
      ) : null}
    </g>
  );
}

function MapLegend({ x, y, compact }: { x: number; y: number; compact: boolean }) {
  const w = compact ? 280 : 300;
  const h = compact ? 118 : 128;
  return (
    <g transform={`translate(${x},${y})`}>
      <rect width={w} height={h} rx="12" fill={EVL_CHART_COLORS.panel} stroke={EVL_CHART_COLORS.panelStroke} />
      <text x={16} y={26} fill={EVL_CHART_COLORS.text} fontSize="13" fontWeight="700">
        Route legend
      </text>
      <line x1={16} y1={44} x2={52} y2={44} stroke={`url(#evl-gold-line)`} strokeWidth="4" />
      <text x={60} y={48} fill={EVL_CHART_COLORS.textMuted} fontSize="11">
        Gold — trekking route
      </text>
      <line x1={16} y1={66} x2={52} y2={66} stroke={EVL_CHART_COLORS.flight} strokeWidth="2.5" strokeDasharray="7 5" />
      <text x={60} y={70} fill={EVL_CHART_COLORS.textMuted} fontSize="11">
        Blue dash — flight (not on foot)
      </text>
      <text x={16} y={96} fill={EVL_CHART_COLORS.textMuted} fontSize="10" fontStyle="italic">
        Schematic map — not survey accurate
      </text>
    </g>
  );
}

function ItineraryPanel({ x, y, compact }: { x: number; y: number; compact: boolean }) {
  const w = compact ? 300 : 320;
  return (
    <g transform={`translate(${x},${y})`}>
      <rect
        width={w}
        height={compact ? 268 : 280}
        rx="12"
        fill={EVL_CHART_COLORS.panel}
        stroke={EVL_CHART_COLORS.panelStroke}
      />
      <text x={16} y={28} fill={EVL_CHART_COLORS.text} fontSize="13" fontWeight="700">
        7-day overview
      </text>
      {EVL_ITINERARY_OVERVIEW.map((row, i) => (
        <g key={row.day}>
          <text x={16} y={52 + i * 34} fill={EVL_CHART_COLORS.goldSoft} fontSize="11" fontWeight="700">
            {row.day}
          </text>
          <text x={68} y={52 + i * 34} fill={EVL_CHART_COLORS.textMuted} fontSize="10.5">
            {row.summary}
          </text>
        </g>
      ))}
    </g>
  );
}

export function EverestViewRouteMap({ sectionTitle = "Everest View Luxury Trek — route map" }: { sectionTitle?: string }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const gid = useId().replace(/:/g, "");
  const compact = useNarrowLayout();
  const dims = compact ? COMPACT : WIDE;
  const nodes = useMemo(() => nodeById(EVL_MAP_NODES), []);
  const trekOut = useMemo(() => buildWalkPath(EVL_WALK_SEGMENTS_OUT, nodes, compact), [nodes, compact]);
  const trekBack = useMemo(() => buildWalkPath(EVL_WALK_SEGMENTS_RETURN, nodes, compact), [nodes, compact]);

  const ktm = pos(nodes.ktm, compact);
  const lukla = pos(nodes.lukla, compact);
  const flightOut = `M${ktm.x},${ktm.y} Q${(ktm.x + lukla.x) / 2},${(ktm.y + lukla.y) / 2 - (compact ? 40 : 60)} ${lukla.x},${lukla.y}`;
  const flightIn = `M${lukla.x},${lukla.y + 8} Q${(ktm.x + lukla.x) / 2 + 30},${(ktm.y + lukla.y) / 2 + (compact ? 20 : 30)} ${ktm.x + 8},${ktm.y}`;

  const desc =
    "Schematic seven-day lower Khumbu route: Lukla, Phakding, Monjo, Namche Bazaar, Khumjung Village and Syangboche ridge area. Dashed blue lines are Kathmandu–Lukla flights only.";

  return (
    <EvlChartShell
      sectionTitle={sectionTitle}
      downloadLabel="Download PNG"
      variant="map"
      onDownload={() => downloadSvgAsPng(svgRef.current, "everest-view-luxury-trek-route-map")}
    >
      <svg
        ref={svgRef}
        className="evl-infographic-svg"
        viewBox={`0 0 ${dims.w} ${dims.h}`}
        role="img"
        aria-labelledby={`${gid}-title`}
        aria-describedby={`${gid}-desc`}
      >
        <title id={`${gid}-title`}>{EVL_MAP_TITLE}</title>
        <desc id={`${gid}-desc`}>{desc}</desc>
        <Background gid={gid} w={dims.w} h={dims.h} compact={compact} />
        <defs>
          <linearGradient id="evl-gold-line" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#a8841f" />
            <stop offset="100%" stopColor={EVL_CHART_COLORS.goldSoft} />
          </linearGradient>
        </defs>

        <text
          x={dims.w / 2}
          y={compact ? 42 : 48}
          textAnchor="middle"
          fill={EVL_CHART_COLORS.text}
          fontSize={compact ? 20 : 26}
          fontWeight="700"
          letterSpacing="0.06em"
          style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
        >
          {EVL_MAP_TITLE}
        </text>
        <text
          x={dims.w / 2}
          y={compact ? 64 : 78}
          textAnchor="middle"
          fill={EVL_CHART_COLORS.textMuted}
          fontSize={compact ? 11 : 13}
          fontWeight="600"
          style={{ fontFamily: "var(--font-manrope), system-ui, sans-serif" }}
        >
          {EVL_MAP_SUBTITLE}
        </text>

        <path
          d={flightOut}
          fill="none"
          stroke={EVL_CHART_COLORS.flight}
          strokeWidth="2.5"
          strokeDasharray="9 7"
          markerEnd={`url(#${gid}-flight)`}
        />
        <path
          d={flightIn}
          fill="none"
          stroke={EVL_CHART_COLORS.flight}
          strokeWidth="2.5"
          strokeDasharray="9 7"
          opacity="0.85"
        />
        <text
          x={(ktm.x + lukla.x) / 2}
          y={(ktm.y + lukla.y) / 2 - (compact ? 52 : 72)}
          textAnchor="middle"
          fill={EVL_CHART_COLORS.flight}
          fontSize="11"
          fontWeight="700"
          letterSpacing="0.14em"
        >
          FLIGHT
        </text>

        <path
          d={trekOut}
          fill="none"
          stroke="url(#evl-gold-line)"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          markerEnd={`url(#${gid}-arrow)`}
        />
        <path
          d={trekBack}
          fill="none"
          stroke="url(#evl-gold-line)"
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.92"
          markerEnd={`url(#${gid}-arrow)`}
        />

        {EVL_MAP_NODES.map((node) => (
          <StopMarker key={node.id} node={node} compact={compact} />
        ))}

        {compact ? (
          <>
            <MapLegend x={24} y={dims.h - 400} compact />
            <ItineraryPanel x={24} y={dims.h - 268} compact />
          </>
        ) : (
          <>
            <MapLegend x={36} y={108} compact={false} />
            <ItineraryPanel x={848} y={108} compact={false} />
          </>
        )}

        <text
          x={dims.w / 2}
          y={dims.h - 20}
          textAnchor="middle"
          fill={EVL_CHART_COLORS.textMuted}
          fontSize="10"
          fontWeight="600"
          letterSpacing="0.2em"
        >
          AMBITION HOLIDAYS | NEPAL TREKKING
        </text>
      </svg>
    </EvlChartShell>
  );
}

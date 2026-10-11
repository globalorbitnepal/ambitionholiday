"use client";

import { useId, useMemo, useRef } from "react";
import {
  EVL_ALL_WALK_SEGMENTS,
  EVL_CHART_COLORS,
  EVL_ITINERARY_OVERVIEW,
  EVL_MAP_NODES,
  EVL_MAP_SUBTITLE,
  EVL_MAP_TITLE,
  EVL_MAP_VIEWBOX,
  EVL_STOP_DETAILS,
  segmentsForStop,
  type EvlMapNode,
  type EvlWalkSegment,
} from "@/lib/everest-view-charts";
import { EvlChartShell } from "./EvlChartShell";
import { EvlDetailCard } from "./EvlDetailCard";
import { downloadSvgAsPng, formatElevationM } from "./evl-chart-utils";
import { useEvlInteraction } from "./useEvlInteraction";
import { useSvgCardPosition } from "./useSvgCardPosition";

function nodeById() {
  return Object.fromEntries(EVL_MAP_NODES.map((n) => [n.id, n])) as Record<string, EvlMapNode>;
}

function buildWalkPath(segments: EvlWalkSegment[], nodes: Record<string, EvlMapNode>): string {
  const parts: string[] = [];
  segments.forEach((seg, i) => {
    const a = nodes[seg.from];
    const b = nodes[seg.to];
    if (i === 0) parts.push(`M${a.x},${a.y}`);
    if (seg.cx != null && seg.cy != null) parts.push(`Q${seg.cx},${seg.cy} ${b.x},${b.y}`);
    else parts.push(`L${b.x},${b.y}`);
  });
  return parts.join(" ");
}

function ItineraryFooter() {
  return (
    <div className="evl-itinerary-grid" aria-label="Seven-day route overview">
      <p className="evl-itinerary-grid-title">7-day overview</p>
      <ul>
        {EVL_ITINERARY_OVERVIEW.map((row) => (
          <li key={row.day}>
            <span>{row.day}</span>
            {row.summary}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function EverestViewRouteMap({ sectionTitle = "Everest View Luxury Trek — route map" }: { sectionTitle?: string }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const gid = useId().replace(/:/g, "");
  const nodes = useMemo(() => nodeById(), []);
  const { activeId, onPointerEnter, onPointerLeave, onActivate, dismiss, isPinned } = useEvlInteraction();

  const activeNode = activeId ? nodes[activeId] : null;
  const cardPos = useSvgCardPosition(svgRef, stageRef, activeNode?.x ?? 0, activeNode?.y ?? 0, Boolean(activeNode));

  const activeSegments = activeId ? segmentsForStop(activeId) : new Set<string>();
  const { w, h } = EVL_MAP_VIEWBOX;

  const ktm = nodes.ktm;
  const lukla = nodes.lukla;
  const flightOut = `M${ktm.x},${ktm.y} Q${(ktm.x + lukla.x) / 2 - 40},${(ktm.y + lukla.y) / 2 - 50} ${lukla.x},${lukla.y}`;
  const flightIn = `M${lukla.x + 4},${lukla.y + 6} Q${(ktm.x + lukla.x) / 2 + 50},${(ktm.y + lukla.y) / 2 + 36} ${ktm.x + 6},${ktm.y}`;

  const desc =
    "Interactive schematic map of the seven-day lower Khumbu Everest View Luxury Trek. Blue dashed lines are flights only.";

  function renderSegment(seg: EvlWalkSegment, dimmed: boolean) {
    const path = buildWalkPath([seg], nodes);
    const hot = activeSegments.has(seg.id);
    return (
      <path
        key={seg.id}
        d={path}
        fill="none"
        stroke="url(#evl-gold-line)"
        strokeWidth={hot ? 7 : 4.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={dimmed && !hot ? 0.35 : 0.95}
        className={hot ? "evl-seg-active" : undefined}
      />
    );
  }

  return (
    <EvlChartShell
      sectionTitle={sectionTitle}
      downloadLabel="Download PNG"
      variant="map"
      footer={<ItineraryFooter />}
      onDownload={async () => {
        await downloadSvgAsPng(svgRef.current, "ambition-holidays-everest-view-trek-route-map", { scale: 3 });
      }}
    >
      <div className="evl-map-stage" ref={stageRef}>
        <svg
          ref={svgRef}
          className="evl-infographic-svg evl-map-canvas"
          viewBox={`0 0 ${w} ${h}`}
          role="img"
          aria-labelledby={`${gid}-title`}
          aria-describedby={`${gid}-desc`}
          data-export-root="true"
        >
          <title id={`${gid}-title`}>{EVL_MAP_TITLE}</title>
          <desc id={`${gid}-desc`}>{desc}</desc>
          <defs>
            <linearGradient id={`${gid}-bg`} x1="0" y1="0" x2="0.2" y2="1">
              <stop offset="0%" stopColor={EVL_CHART_COLORS.bgTop} />
              <stop offset="100%" stopColor={EVL_CHART_COLORS.bgBottom} />
            </linearGradient>
            <linearGradient id="evl-gold-line" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#a8841f" />
              <stop offset="100%" stopColor={EVL_CHART_COLORS.goldSoft} />
            </linearGradient>
            <marker id={`${gid}-arrow`} markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 Z" fill={EVL_CHART_COLORS.gold} />
            </marker>
          </defs>
          <rect width={w} height={h} fill={`url(#${gid}-bg)`} />
          {[0.25, 0.45, 0.65, 0.85].map((t) => (
            <line key={t} x1={0} y1={h * t} x2={w} y2={h * t} stroke={EVL_CHART_COLORS.grid} strokeWidth="1" />
          ))}
          {[0.2, 0.45, 0.7].map((t) => (
            <ellipse
              key={t}
              cx={w * 0.52}
              cy={h * 0.48}
              rx={w * (0.28 + t * 0.12)}
              ry={h * (0.1 + t * 0.05)}
              fill="none"
              stroke={EVL_CHART_COLORS.grid}
              strokeWidth="0.75"
            />
          ))}
          <text
            x={w / 2}
            y={h * 0.5}
            textAnchor="middle"
            fill={EVL_CHART_COLORS.text}
            opacity="0.07"
            fontSize="48"
            fontWeight="700"
            letterSpacing="0.32em"
            fontFamily="Cormorant Garamond, Georgia, serif"
          >
            AMBITION HOLIDAYS
          </text>

          <text x={w / 2} y={36} textAnchor="middle" fill={EVL_CHART_COLORS.text} fontSize="22" fontWeight="700" letterSpacing="0.06em" fontFamily="Cormorant Garamond, Georgia, serif">
            {EVL_MAP_TITLE}
          </text>
          <text x={w / 2} y={58} textAnchor="middle" fill={EVL_CHART_COLORS.textMuted} fontSize="12" fontWeight="600" fontFamily="Manrope, system-ui, sans-serif">
            {EVL_MAP_SUBTITLE}
          </text>

          <g transform="translate(24, 72)">
            <rect width={248} height={88} rx="10" fill={EVL_CHART_COLORS.panel} stroke={EVL_CHART_COLORS.panelStroke} />
            <line x1={14} y1={30} x2={48} y2={30} stroke="url(#evl-gold-line)" strokeWidth="4" />
            <text x={56} y={34} fill={EVL_CHART_COLORS.textMuted} fontSize="11" fontFamily="Manrope, sans-serif">Gold — trekking route</text>
            <line x1={14} y1={52} x2={48} y2={52} stroke={EVL_CHART_COLORS.flight} strokeWidth="2.5" strokeDasharray="7 5" />
            <text x={56} y={56} fill={EVL_CHART_COLORS.textMuted} fontSize="11" fontFamily="Manrope, sans-serif">Blue dash — flight only</text>
            <text x={14} y={76} fill={EVL_CHART_COLORS.textMuted} fontSize="10" fontStyle="italic" fontFamily="Manrope, sans-serif">
              Schematic — not survey accurate
            </text>
          </g>

          <path d={flightOut} fill="none" stroke={EVL_CHART_COLORS.flight} strokeWidth="2.5" strokeDasharray="9 7" opacity={activeId && activeId !== "ktm" && activeId !== "lukla" ? 0.4 : 1} />
          <path d={flightIn} fill="none" stroke={EVL_CHART_COLORS.flight} strokeWidth="2.5" strokeDasharray="9 7" opacity={0.85} />
          <text x={(ktm.x + lukla.x) / 2 - 20} y={(ktm.y + lukla.y) / 2 - 58} textAnchor="middle" fill={EVL_CHART_COLORS.flight} fontSize="11" fontWeight="700" letterSpacing="0.14em">
            FLIGHT
          </text>

          {EVL_ALL_WALK_SEGMENTS.map((seg) => renderSegment(seg, Boolean(activeId && activeId !== "ktm")))}

          {EVL_MAP_NODES.map((node) => {
            const isActive = activeId === node.id;
            const isPeak = node.role === "highlight";
            const isFlight = node.role === "flight";
            const fill = isPeak ? EVL_CHART_COLORS.goldSoft : isFlight ? EVL_CHART_COLORS.flight : EVL_CHART_COLORS.gold;
            const detail = EVL_STOP_DETAILS[node.id];
            const labelW =
              node.id === "ridge" ? 156 : node.id === "khumjung" ? 140 : node.id === "namche" ? 128 : 112;
            const labelH = isPeak ? 50 : 38;
            return (
              <g key={node.id}>
                <line x1={node.x} y1={node.y} x2={node.labelX} y2={node.labelY} stroke={EVL_CHART_COLORS.textMuted} strokeWidth="1" opacity="0.55" />
                <rect
                  x={node.labelX - 4}
                  y={node.labelY - 16}
                  width={labelW}
                  height={labelH}
                  rx="6"
                  fill="rgba(8,14,24,0.82)"
                  stroke={isActive ? EVL_CHART_COLORS.gold : EVL_CHART_COLORS.panelStroke}
                  strokeWidth={isActive ? 2 : 1}
                />
                <text
                  x={node.labelX + 6}
                  y={node.labelY + 2}
                  fill={EVL_CHART_COLORS.text}
                  fontSize="12"
                  fontWeight="700"
                  fontFamily="Manrope, sans-serif"
                >
                  {node.name}
                </text>
                <text
                  x={node.labelX + 6}
                  y={node.labelY + 16}
                  fill={EVL_CHART_COLORS.textMuted}
                  fontSize="11"
                  fontWeight="600"
                  fontFamily="Manrope, sans-serif"
                >
                  {formatElevationM(node.elevationM)}
                </text>
                {isPeak ? (
                  <text x={node.labelX + 6} y={node.labelY + 30} fill={EVL_CHART_COLORS.goldSoft} fontSize="9" fontWeight="700" letterSpacing="0.1em">
                    HIGHEST VIEWPOINT
                  </text>
                ) : null}
                {isActive ? <circle cx={node.x} cy={node.y} r={16} fill={EVL_CHART_COLORS.gold} opacity="0.2" className="evl-no-export" /> : null}
                <circle cx={node.x} cy={node.y} r={isPeak ? 9 : 7} fill={fill} stroke="#fff" strokeWidth="2" />
                <g className="evl-no-export">
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={22}
                    fill="transparent"
                    className="evl-hit"
                    role="button"
                    tabIndex={0}
                    aria-label={`${node.name}, ${formatElevationM(node.elevationM)}. ${detail.day}. ${isPinned && activeId === node.id ? "Pinned." : "Activate for details."}`}
                    onMouseEnter={() => onPointerEnter(node.id)}
                    onMouseLeave={onPointerLeave}
                    onFocus={() => onPointerEnter(node.id)}
                    onBlur={onPointerLeave}
                    onClick={() => onActivate(node.id)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        onActivate(node.id);
                      }
                    }}
                  />
                  <rect
                    x={node.labelX - 4}
                    y={node.labelY - 16}
                    width={labelW}
                    height={labelH}
                    fill="transparent"
                    className="evl-hit"
                    role="presentation"
                    onMouseEnter={() => onPointerEnter(node.id)}
                    onMouseLeave={onPointerLeave}
                    onClick={() => onActivate(node.id)}
                  />
                </g>
              </g>
            );
          })}

          <text x={w / 2} y={h - 14} textAnchor="middle" fill={EVL_CHART_COLORS.textMuted} fontSize="10" fontWeight="600" letterSpacing="0.18em">
            AMBITION HOLIDAYS | NEPAL TREKKING
          </text>
        </svg>

        {activeNode && EVL_STOP_DETAILS[activeNode.id] ? (
          <EvlDetailCard
            name={activeNode.name}
            elevationM={activeNode.elevationM}
            day={EVL_STOP_DETAILS[activeNode.id].day}
            description={EVL_STOP_DETAILS[activeNode.id].description}
            pinned={isPinned}
            onClose={dismiss}
            style={cardPos}
          />
        ) : null}
      </div>
      <p className="evl-map-hint evl-no-export">Tap or click a stop for trek-day details. On desktop, hover for a quick preview.</p>
    </EvlChartShell>
  );
}

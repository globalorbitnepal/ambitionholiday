"use client";

import { useId, useMemo, useRef, useState } from "react";
import {
  EVL_ALL_WALK_SEGMENTS,
  EVL_CHART_COLORS,
  EVL_MAP_NODES,
  EVL_MAP_SUBTITLE,
  EVL_MAP_TITLE,
  EVL_MAP_VIEWBOX,
  EVL_STOP_DETAILS,
  segmentsForDay,
  segmentsForStop,
  type EvlMapNode,
  type EvlWalkSegment,
} from "@/lib/everest-view-charts";
import { EvlChartShell } from "./EvlChartShell";
import { EvlDayRoutePanel } from "./EvlDayRoutePanel";
import { EvlDetailCard } from "./EvlDetailCard";
import { downloadSvgAsPng, formatElevationM } from "./evl-chart-utils";
import { EvlChartFooter, EvlChartHeader, EvlSvgBackground } from "./evl-chart-theme";
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

function segmentMidpoint(seg: EvlWalkSegment, nodes: Record<string, EvlMapNode>) {
  const a = nodes[seg.from];
  const b = nodes[seg.to];
  return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 - 8 };
}

export function EverestViewRouteMap({ sectionTitle = "Everest View Luxury Trek — route map" }: { sectionTitle?: string }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const gid = useId().replace(/:/g, "");
  const nodes = useMemo(() => nodeById(), []);
  const { activeId, onPointerEnter, onPointerLeave, onActivate, dismiss, isPinned } = useEvlInteraction();
  const [activeDay, setActiveDay] = useState<number | null>(null);

  const activeNode = activeId ? nodes[activeId] : null;
  const cardPos = useSvgCardPosition(svgRef, stageRef, activeNode?.x ?? 0, activeNode?.y ?? 0, Boolean(activeNode));

  const activeSegments = useMemo(() => {
    const fromStop = activeId ? segmentsForStop(activeId) : new Set<string>();
    const fromDay = activeDay ? segmentsForDay(activeDay) : new Set<string>();
    return new Set([...fromStop, ...fromDay]);
  }, [activeDay, activeId]);
  const { w, h } = EVL_MAP_VIEWBOX;

  const ktm = nodes.ktm;
  const lukla = nodes.lukla;
  const flightOut = `M${ktm.x},${ktm.y} Q${(ktm.x + lukla.x) / 2 - 40},${(ktm.y + lukla.y) / 2 - 50} ${lukla.x},${lukla.y}`;
  const flightIn = `M${lukla.x + 4},${lukla.y + 6} Q${(ktm.x + lukla.x) / 2 + 50},${(ktm.y + lukla.y) / 2 + 36} ${ktm.x + 6},${ktm.y}`;

  const desc =
    "Interactive schematic map of the seven-day lower Khumbu Everest View Luxury Trek. Blue dashed lines are flights only.";

  const focusMode = Boolean(activeId || activeDay);

  function renderSegment(seg: EvlWalkSegment) {
    const path = buildWalkPath([seg], nodes);
    const hot = activeSegments.has(seg.id);
    const mid = segmentMidpoint(seg, nodes);
    return (
      <g key={seg.id}>
        <path
          d={path}
          fill="none"
          stroke="url(#evl-gold-line)"
          strokeWidth={hot ? 7 : 4.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={focusMode && !hot ? 0.32 : 0.95}
        />
        {(hot || !focusMode) && (
          <g>
            <rect x={mid.x - 18} y={mid.y - 9} width={36} height={16} rx="5" fill="rgba(8,14,24,0.9)" stroke={EVL_CHART_COLORS.panelStroke} />
            <text x={mid.x} y={mid.y + 2} textAnchor="middle" fill={EVL_CHART_COLORS.goldSoft} fontSize="9" fontWeight="700">
              D{seg.day}
            </text>
          </g>
        )}
      </g>
    );
  }

  return (
    <EvlChartShell
      sectionTitle={sectionTitle}
      downloadLabel="Download PNG"
      variant="map"
      footer={<EvlDayRoutePanel activeDay={activeDay} onSelectDay={(day) => setActiveDay((d) => (d === day ? null : day))} />}
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
          <EvlSvgBackground gid={gid} w={w} h={h} />
          <EvlChartHeader title={EVL_MAP_TITLE} subtitle={EVL_MAP_SUBTITLE} w={w} />

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

          <path
            d={flightOut}
            fill="none"
            stroke={EVL_CHART_COLORS.flight}
            strokeWidth={activeDay === 1 ? 3.5 : 2.5}
            strokeDasharray="9 7"
            opacity={focusMode && activeDay !== 1 ? 0.35 : 1}
          />
          <path
            d={flightIn}
            fill="none"
            stroke={EVL_CHART_COLORS.flight}
            strokeWidth={activeDay === 7 ? 3.5 : 2.5}
            strokeDasharray="9 7"
            opacity={focusMode && activeDay !== 7 ? 0.35 : 0.9}
          />
          <text x={(ktm.x + lukla.x) / 2 - 20} y={(ktm.y + lukla.y) / 2 - 58} textAnchor="middle" fill={EVL_CHART_COLORS.flight} fontSize="11" fontWeight="700" letterSpacing="0.14em">
            FLIGHT
          </text>

          {EVL_ALL_WALK_SEGMENTS.map((seg) => renderSegment(seg))}

          {activeDay === 3 ? (
            <circle
              cx={nodes.namche.x}
              cy={nodes.namche.y}
              r={26}
              fill="none"
              stroke={EVL_CHART_COLORS.goldSoft}
              strokeWidth="2"
              strokeDasharray="5 4"
              opacity="0.85"
            />
          ) : null}

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

          <EvlChartFooter w={w} h={h} />
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

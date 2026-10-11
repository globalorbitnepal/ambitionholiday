"use client";

import { useId, useMemo, useRef, useState } from "react";
import {
  EVL_CHART_COLORS,
  EVL_MAP_SUBTITLE,
  EVL_MAP_TITLE,
  EVL_STOP_DETAILS,
  segmentsForDay,
} from "@/lib/everest-view-charts";
import {
  EVL_MAP_VIEWBOX,
  EVL_ROUTE_NODES,
  EVL_ROUTE_PATHS,
  pathIdsForStop,
  type EvlRouteNode,
  type EvlRoutePath,
} from "@/lib/everest-view-route-geometry";
import { EvlAirportIcon } from "./EvlAirportIcon";
import { EvlChartShell } from "./EvlChartShell";
import { EvlDayRoutePanel } from "./EvlDayRoutePanel";
import { EvlDetailCard } from "./EvlDetailCard";
import { downloadSvgAsPng, formatElevationM } from "./evl-chart-utils";
import { EvlChartFooter, EvlChartHeader, EvlSvgBackground } from "./evl-chart-theme";
import { useEvlInteraction } from "./useEvlInteraction";
import { useSvgCardPosition } from "./useSvgCardPosition";

function nodeMap() {
  return Object.fromEntries(EVL_ROUTE_NODES.map((n) => [n.id, n])) as Record<string, EvlRouteNode>;
}

function DayBadge({ x, y, day, hot }: { x: number; y: number; day: number; hot: boolean }) {
  const w = 62;
  const h = 22;
  return (
    <g>
      <rect
        x={x - w / 2}
        y={y - h / 2}
        width={w}
        height={h}
        rx={6}
        fill={hot ? "rgba(201,162,39,0.35)" : "rgba(8,14,24,0.92)"}
        stroke={hot ? EVL_CHART_COLORS.goldSoft : EVL_CHART_COLORS.gold}
        strokeWidth={hot ? 2 : 1.2}
      />
      <text x={x} y={y + 4} textAnchor="middle" fill={EVL_CHART_COLORS.text} fontSize="11" fontWeight="800" letterSpacing="0.08em">
        DAY {day}
      </text>
    </g>
  );
}

export function EverestViewRouteMap({ sectionTitle = "Everest View Luxury Trek — route map" }: { sectionTitle?: string }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const gid = useId().replace(/:/g, "");
  const nodes = useMemo(() => nodeMap(), []);
  const { activeId, onPointerEnter, onPointerLeave, onActivate, dismiss, isPinned } = useEvlInteraction();
  const [activeDay, setActiveDay] = useState<number | null>(null);

  const activeNode = activeId ? nodes[activeId] : null;
  const cardPos = useSvgCardPosition(svgRef, stageRef, activeNode?.x ?? 0, activeNode?.y ?? 0, Boolean(activeNode));

  const activePaths = useMemo(() => {
    const fromStop = activeId ? pathIdsForStop(activeId) : new Set<string>();
    const fromDay = activeDay ? segmentsForDay(activeDay) : new Set<string>();
    return new Set([...fromStop, ...fromDay]);
  }, [activeDay, activeId]);

  const { w, h } = EVL_MAP_VIEWBOX;
  const focusMode = Boolean(activeId || activeDay);

  function renderPath(path: EvlRoutePath) {
    const hot = activePaths.has(path.id);
    const isFlight = path.kind === "flight";
    const isAcclim = path.kind === "acclimatisation";
    if (isAcclim) {
      return (
        <g key={path.id}>
          <circle cx={path.badgeX} cy={path.badgeY + 40} r={34} fill="none" stroke={EVL_CHART_COLORS.goldSoft} strokeWidth="2" strokeDasharray="6 5" opacity={focusMode && !hot ? 0.35 : 0.9} />
          <text x={path.badgeX} y={path.badgeY + 78} textAnchor="middle" fill={EVL_CHART_COLORS.textMuted} fontSize="10" fontWeight="600">
            Local exploration
          </text>
          {(hot || !focusMode) && <DayBadge x={path.badgeX} y={path.badgeY} day={path.day} hot={hot} />}
        </g>
      );
    }
    if (path.d.length < 4) return null;
    return (
      <g key={path.id}>
        <path
          d={path.d}
          fill="none"
          stroke={isFlight ? EVL_CHART_COLORS.flight : "url(#evl-gold-line)"}
          strokeWidth={hot ? (isFlight ? 3.5 : 7) : isFlight ? 2.5 : 4.5}
          strokeDasharray={isFlight ? "10 7" : undefined}
          strokeLinecap="round"
          strokeLinejoin="round"
          markerEnd={isFlight ? `url(#${gid}-flight-arrow)` : `url(#${gid}-trek-arrow)`}
          opacity={focusMode && !hot ? 0.28 : 0.96}
        />
        {isFlight && (hot || !focusMode) ? (
          <text x={path.badgeX} y={path.badgeY - 10} textAnchor="middle" fill={EVL_CHART_COLORS.flight} fontSize="10" fontWeight="700" letterSpacing="0.12em">
            DOMESTIC FLIGHT
          </text>
        ) : null}
        {(hot || !focusMode) && <DayBadge x={path.badgeX} y={path.badgeY} day={path.day} hot={hot} />}
      </g>
    );
  }

  const stopDetails: Record<string, { day: string; description: string }> = {
    ...EVL_STOP_DETAILS,
    ktm: {
      day: "Day 1 & Day 7",
      description:
        "Flight connection at Kathmandu (operational airport per your confirmed booking). Domestic flights to Lukla are subject to weather and routing.",
    },
    lukla: {
      day: "Day 1 & Day 6–7",
      description: "Lukla airport — trekking begins and ends here. Return flight to Kathmandu on Day 7 when operations allow.",
    },
  };

  return (
    <EvlChartShell
      sectionTitle={sectionTitle}
      downloadLabel="Download PNG"
      variant="map"
      footer={
        <EvlDayRoutePanel
          activeDay={activeDay}
          onSelectDay={(day) => setActiveDay((d) => (d === day ? null : day))}
        />
      }
      onDownload={async () => {
        await downloadSvgAsPng(svgRef.current, "ambition-holidays-everest-view-7-day-route-map", { scale: 3 });
      }}
    >
      <div className="evl-map-stage" ref={stageRef}>
        <svg
          ref={svgRef}
          className="evl-infographic-svg evl-map-canvas"
          viewBox={`0 0 ${w} ${h}`}
          role="img"
          aria-labelledby={`${gid}-title`}
          data-export-root="true"
        >
          <title id={`${gid}-title`}>{EVL_MAP_TITLE}</title>
          <desc>Schematic seven-day airport-to-airport Everest View Luxury Trek route. Flights shown in blue dashed lines; walking in gold.</desc>
          <defs>
            <marker id={`${gid}-trek-arrow`} markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 Z" fill={EVL_CHART_COLORS.gold} />
            </marker>
            <marker id={`${gid}-flight-arrow`} markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
              <path d="M0,0 L7,3.5 L0,7 Z" fill={EVL_CHART_COLORS.flight} />
            </marker>
          </defs>
          <EvlSvgBackground gid={gid} w={w} h={h} />
          <EvlChartHeader title={EVL_MAP_TITLE} subtitle={EVL_MAP_SUBTITLE} w={w} />

          <g transform="translate(20, 78)">
            <rect width={300} height={128} rx="10" fill={EVL_CHART_COLORS.panel} stroke={EVL_CHART_COLORS.panelStroke} />
            <line x1={14} y1={28} x2={48} y2={28} stroke="url(#evl-gold-line)" strokeWidth="4" />
            <text x={56} y={32} fill={EVL_CHART_COLORS.textMuted} fontSize="10.5">Gold solid — Trekking route</text>
            <line x1={14} y1={48} x2={48} y2={48} stroke={EVL_CHART_COLORS.flight} strokeWidth="2.5" strokeDasharray="7 5" />
            <text x={56} y={52} fill={EVL_CHART_COLORS.textMuted} fontSize="10.5">Blue dash — Flight connection</text>
            <g transform="translate(14,62)">
              <EvlAirportIcon x={8} y={8} size={16} />
            </g>
            <text x={36} y={72} fill={EVL_CHART_COLORS.textMuted} fontSize="10.5">Airport icon — Flight departure/arrival</text>
            <rect x={14} y={82} width={22} height={14} rx={4} fill="rgba(8,14,24,0.92)" stroke={EVL_CHART_COLORS.gold} strokeWidth="1" />
            <text x={25} y={93} textAnchor="middle" fill={EVL_CHART_COLORS.text} fontSize="8" fontWeight="800">D1</text>
            <text x={42} y={93} fill={EVL_CHART_COLORS.textMuted} fontSize="10.5">Numbered marker — Day route segment</text>
            <text x={14} y={116} fill={EVL_CHART_COLORS.textMuted} fontSize="10" fontStyle="italic">Schematic map — not survey accurate</text>
          </g>

          {EVL_ROUTE_PATHS.map(renderPath)}

          {EVL_ROUTE_NODES.map((node) => {
            const isActive = activeId === node.id;
            const labelW = node.isPeak ? 168 : node.isAirport ? 148 : node.id === "khumjung" ? 132 : 118;
            const labelH = node.isPeak ? 52 : node.isAirport ? 44 : 38;
            return (
              <g key={node.id}>
                <line x1={node.x} y1={node.y} x2={node.labelX} y2={node.labelY} stroke={EVL_CHART_COLORS.textMuted} strokeWidth="1" opacity="0.5" />
                {node.isAirport ? <EvlAirportIcon x={node.x} y={node.y - 14} size={18} /> : null}
                <rect
                  x={node.labelX - 4}
                  y={node.labelY - 14}
                  width={labelW}
                  height={labelH}
                  rx="6"
                  fill="rgba(8,14,24,0.9)"
                  stroke={isActive ? EVL_CHART_COLORS.gold : EVL_CHART_COLORS.panelStroke}
                  strokeWidth={isActive ? 2 : 1}
                />
                <text x={node.labelX + 6} y={node.labelY + 2} fill={EVL_CHART_COLORS.text} fontSize={node.isAirport ? "10.5" : "12"} fontWeight="700" letterSpacing={node.isAirport ? "0.04em" : "0"}>
                  {node.displayName}
                </text>
                <text x={node.labelX + 6} y={node.labelY + 16} fill={EVL_CHART_COLORS.textMuted} fontSize="11" fontWeight="600">
                  {formatElevationM(node.elevationM)}
                </text>
                {node.isPeak ? (
                  <text x={node.labelX + 6} y={node.labelY + 30} fill={EVL_CHART_COLORS.goldSoft} fontSize="9" fontWeight="700">
                    HIGHEST ~3,880 m
                  </text>
                ) : null}
                <circle cx={node.x} cy={node.y} r={node.isPeak ? 9 : 7} fill={node.isPeak ? EVL_CHART_COLORS.goldSoft : node.isAirport ? EVL_CHART_COLORS.flight : EVL_CHART_COLORS.gold} stroke="#fff" strokeWidth="2" />
                {isActive ? <circle cx={node.x} cy={node.y} r={18} fill={EVL_CHART_COLORS.gold} opacity="0.18" className="evl-no-export" /> : null}
                <g className="evl-no-export">
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={24}
                    fill="transparent"
                    className="evl-hit"
                    role="button"
                    tabIndex={0}
                    aria-label={`${node.displayName}, ${formatElevationM(node.elevationM)}`}
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
                </g>
              </g>
            );
          })}

          <EvlChartFooter w={w} h={h} />
        </svg>

        {activeNode && stopDetails[activeNode.id] ? (
          <EvlDetailCard
            name={activeNode.displayName}
            elevationM={activeNode.elevationM}
            day={stopDetails[activeNode.id].day}
            description={stopDetails[activeNode.id].description}
            pinned={isPinned}
            onClose={dismiss}
            style={cardPos}
          />
        ) : null}
      </div>
      <p className="evl-map-hint evl-no-export">Select a day card below or tap a stop on the map. Hover previews on desktop.</p>
    </EvlChartShell>
  );
}

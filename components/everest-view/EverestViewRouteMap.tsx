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
  type EvlRoutePath,
} from "@/lib/everest-view-route-geometry";
import { EvlAirportIcon } from "./EvlAirportIcon";
import { EvlChartShell } from "./EvlChartShell";
import { EvlDayRoutePanel } from "./EvlDayRoutePanel";
import { EvlDetailCard } from "./EvlDetailCard";
import { downloadSvgAsPng, formatElevationM } from "./evl-chart-utils";
import {
  EvlChartFooter,
  EvlChartHeader,
  EvlDayDot,
  EvlLegendStrip,
  EvlMapStopLabel,
  EvlSvgBackground,
  EVL_LAYOUT,
} from "./evl-chart-theme";
import { useEvlInteraction } from "./useEvlInteraction";
import { useSvgCardPosition } from "./useSvgCardPosition";

export function EverestViewRouteMap({ sectionTitle = "Everest View Luxury Trek — route map" }: { sectionTitle?: string }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const gid = useId().replace(/:/g, "");
  const nodes = useMemo(() => Object.fromEntries(EVL_ROUTE_NODES.map((n) => [n.id, n])), []);
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

  const stopDetails: Record<string, { day: string; description: string }> = {
    ...EVL_STOP_DETAILS,
    ktm: {
      day: "Day 1 & Day 7",
      description:
        "Domestic flight connection at Kathmandu (airport per your confirmed booking). Subject to weather and operational routing.",
    },
    lukla: {
      day: "Day 1 & Day 6–7",
      description: "Trekking begins and ends at Lukla airport. Return flight to Kathmandu on Day 7 when operations allow.",
    },
  };

  function renderPath(path: EvlRoutePath) {
    const hot = activePaths.has(path.id);
    const isFlight = path.kind === "flight";
    const isAcclim = path.kind === "acclimatisation";
    const showDots = !focusMode || hot;

    if (isAcclim) {
      return (
        <g key={path.id}>
          <circle
            cx={path.badgeX - 53}
            cy={path.badgeY + 18}
            r={28}
            fill="none"
            stroke={EVL_CHART_COLORS.goldSoft}
            strokeWidth="1.5"
            strokeDasharray="5 4"
            opacity={focusMode && !hot ? 0.3 : 0.85}
          />
          {showDots ? <EvlDayDot x={path.badgeX} y={path.badgeY} day={path.day} hot={hot} visible /> : null}
        </g>
      );
    }
    if (path.d.length < 4) return null;

    const flightLabel = path.id === "flight-out" ? "Outbound flight" : path.id === "flight-in" ? "Return flight" : null;

    return (
      <g key={path.id}>
        <path
          d={path.d}
          fill="none"
          stroke={isFlight ? EVL_CHART_COLORS.flight : "url(#evl-gold-line)"}
          strokeWidth={hot ? (isFlight ? 3 : 5.5) : isFlight ? 2.2 : 3.8}
          strokeDasharray={isFlight ? "9 6" : undefined}
          strokeLinecap="round"
          strokeLinejoin="round"
          markerEnd={isFlight ? `url(#${gid}-flight-arrow)` : `url(#${gid}-trek-arrow)`}
          opacity={focusMode && !hot ? 0.22 : 0.95}
        />
        {isFlight && flightLabel && showDots ? (
          <text x={path.badgeX} y={path.badgeY - 12} textAnchor="middle" fill={EVL_CHART_COLORS.flight} fontSize="8.5" fontWeight="700" letterSpacing="0.08em">
            {flightLabel}
          </text>
        ) : null}
        {showDots ? <EvlDayDot x={path.badgeX} y={path.badgeY} day={path.day} hot={hot} visible /> : null}
      </g>
    );
  }

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
          <desc>Schematic seven-day Everest View Luxury Trek. Gold lines are walking; blue dashed lines are flights.</desc>
          <defs>
            <marker id={`${gid}-trek-arrow`} markerWidth="7" markerHeight="7" refX="5.5" refY="3.5" orient="auto">
              <path d="M0,0 L7,3.5 L0,7 Z" fill={EVL_CHART_COLORS.gold} />
            </marker>
            <marker id={`${gid}-flight-arrow`} markerWidth="6" markerHeight="6" refX="4.5" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={EVL_CHART_COLORS.flight} />
            </marker>
          </defs>
          <EvlSvgBackground gid={gid} w={w} h={h} />
          <EvlChartHeader title={EVL_MAP_TITLE} subtitle={EVL_MAP_SUBTITLE} w={w} />

          {EVL_ROUTE_PATHS.map(renderPath)}

          {EVL_ROUTE_NODES.map((node) => {
            const isActive = activeId === node.id;
            const elev = `approximately ${formatElevationM(node.elevationM)}`;
            return (
              <g key={node.id}>
                <line x1={node.x} y1={node.y} x2={node.labelX} y2={node.labelY + (node.isPeak ? -8 : 4)} stroke={EVL_CHART_COLORS.textMuted} strokeWidth="0.75" opacity="0.45" />
                {node.isAirport ? <EvlAirportIcon x={node.x} y={node.y - 12} size={16} /> : null}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={node.isPeak ? 8 : 6}
                  fill={node.isPeak ? EVL_CHART_COLORS.goldSoft : node.isAirport ? EVL_CHART_COLORS.flight : EVL_CHART_COLORS.gold}
                  stroke="#fff"
                  strokeWidth="1.75"
                />
                <EvlMapStopLabel
                  gid={gid}
                  name={node.displayName}
                  elevation={elev}
                  x={node.labelX}
                  y={node.labelY}
                  anchor={node.labelAnchor}
                  active={isActive}
                />
                {isActive ? <circle cx={node.x} cy={node.y} r={16} fill={EVL_CHART_COLORS.gold} opacity="0.15" className="evl-no-export" /> : null}
                <g className="evl-no-export">
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={22}
                    fill="transparent"
                    className="evl-hit"
                    role="button"
                    tabIndex={0}
                    aria-label={`${node.displayName}, ${elev}`}
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

          <EvlLegendStrip
            w={w}
            y={EVL_LAYOUT.legendY}
            note="Schematic map — not survey accurate"
            items={[
              { kind: "line-gold", label: "Trekking route" },
              { kind: "line-flight", label: "Flight connection" },
              { kind: "airport", label: "Airport" },
              { kind: "day-dot", label: "Day segment" },
            ]}
          />
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
    </EvlChartShell>
  );
}

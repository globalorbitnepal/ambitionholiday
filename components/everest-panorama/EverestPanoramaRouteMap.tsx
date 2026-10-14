"use client";

import { useId, useMemo, useRef } from "react";
import { EVL_ATLAS_EXPORT_BG } from "@/lib/everest-view-atlas-colors";
import { EPT_MAP_SUBTITLE, EPT_MAP_TITLE } from "@/lib/everest-panorama-charts";
import {
  EPT_MAP_VIEWBOX,
  EPT_PRIMARY_DAY_PATH,
  EPT_ROUTE_NODES,
  EPT_ROUTE_PATHS,
  eptPathIdsForStop,
  type EptRouteNode,
  type EptRoutePath,
} from "@/lib/everest-panorama-route-geometry";
import { EVL_ATLAS } from "@/lib/everest-view-atlas-colors";
import { EvlAirportIcon } from "@/components/everest-view/EvlAirportIcon";
import { EvlChartShell } from "@/components/everest-view/EvlChartShell";
import { EvlDetailCard } from "@/components/everest-view/EvlDetailCard";
import { downloadSvgAsPng } from "@/components/everest-view/evl-chart-utils";
import {
  AtlasChartFooter,
  AtlasDayMarker,
  AtlasMapLegend,
  AtlasMapTitle,
  AtlasScenicBackground,
} from "@/components/everest-view/evl-atlas-theme";
import { useEvlInteraction } from "@/components/everest-view/useEvlInteraction";
import { useSvgCardPosition } from "@/components/everest-view/useSvgCardPosition";

function StopLabel({ node, active }: { node: EptRouteNode; active: boolean }) {
  const anchor = node.labelSide === "left" ? "start" : "end";
  const lx = node.labelX;
  const ly = node.labelY;
  const elev = `${node.elevationM.toLocaleString("en-US")} m`;
  return (
    <g>
      <line
        x1={node.x}
        y1={node.y}
        x2={lx + (node.labelSide === "left" ? -4 : 4)}
        y2={ly + 6}
        stroke={EVL_ATLAS.textMuted}
        strokeWidth="0.8"
        opacity="0.55"
      />
      <text
        x={lx}
        y={ly}
        textAnchor={anchor}
        fill={active ? EVL_ATLAS.gold : EVL_ATLAS.text}
        fontSize="12.5"
        fontWeight="700"
        fontFamily="Manrope, sans-serif"
      >
        {node.displayName}
      </text>
      <text
        x={lx}
        y={ly + 15}
        textAnchor={anchor}
        fill={EVL_ATLAS.textElev}
        fontSize="10.5"
        fontWeight="600"
        fontFamily="Manrope, sans-serif"
      >
        {elev}
      </text>
    </g>
  );
}

const STOP_DETAILS: Record<string, { day: string; description: string }> = {
  ktm: { day: "Days 1–2, 9–11", description: "Kathmandu hotels, sightseeing and departure. Domestic flights link Kathmandu and Lukla." },
  lukla: { day: "Days 3 & 8–9", description: "Trekking starts and ends at Lukla Airport." },
  evhotel: {
    day: "Day 5",
    description: "Premium mountain-view overnight in the Everest viewpoint area when confirmed on your booking.",
  },
  tengboche: { day: "Day 6", description: "Tengboche Monastery visit subject to opening hours." },
};

export function EverestPanoramaRouteMap({
  sectionTitle = "Everest Panorama Trek — route map",
}: {
  sectionTitle?: string;
}) {
  const svgRef = useRef<SVGSVGElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const gid = useId().replace(/:/g, "");
  const nodes = useMemo(() => Object.fromEntries(EPT_ROUTE_NODES.map((n) => [n.id, n])), []);
  const { activeId, onPointerEnter, onPointerLeave, onActivate, dismiss, isPinned } = useEvlInteraction();
  const activeNode = activeId ? nodes[activeId] : null;
  const cardPos = useSvgCardPosition(svgRef, stageRef, activeNode?.x ?? 0, activeNode?.y ?? 0, Boolean(activeNode));
  const activePaths = useMemo(() => (activeId ? eptPathIdsForStop(activeId) : new Set<string>()), [activeId]);
  const { w, h } = EPT_MAP_VIEWBOX;
  const focusMode = Boolean(activeId);

  function strokeFor(path: EptRoutePath) {
    if (path.kind === "flight") return EVL_ATLAS.flight;
    if (path.kind === "trek-descent") return EVL_ATLAS.routeDescent;
    if (path.kind === "trek-ascent") return EVL_ATLAS.routeAscent;
    return EVL_ATLAS.route;
  }

  function renderPath(path: EptRoutePath) {
    const hot = activePaths.has(path.id);
    const isFlight = path.kind === "flight";
    const showDay = (!focusMode || hot) && EPT_PRIMARY_DAY_PATH[path.day] === path.id;
    if (path.d.length < 4) return null;
    const flightTag = path.id === "flight-out" ? "FLIGHT · Outbound" : path.id === "flight-in" ? "FLIGHT · Return" : null;
    return (
      <g key={path.id}>
        <path
          d={path.d}
          fill="none"
          stroke={strokeFor(path)}
          strokeWidth={hot ? (isFlight ? 3 : 5.5) : isFlight ? 2.5 : 4.2}
          strokeDasharray={isFlight ? "9 6" : undefined}
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={focusMode && !hot ? 0.22 : 0.95}
        />
        {isFlight && flightTag && (!focusMode || hot) ? (
          <text x={path.badgeX} y={path.badgeY - 8} textAnchor="middle" fill={EVL_ATLAS.flight} fontSize="9" fontWeight="700" letterSpacing="0.06em">
            {flightTag}
          </text>
        ) : null}
        {showDay ? <AtlasDayMarker x={path.badgeX} y={path.badgeY} day={path.day} active={hot} /> : null}
      </g>
    );
  }

  return (
    <EvlChartShell
      sectionTitle={sectionTitle}
      downloadLabel="Download PNG"
      variant="map"
      onDownload={async () => {
        await downloadSvgAsPng(svgRef.current, "ambition-holidays-everest-panorama-trek-route-map", {
          scale: 3,
          background: EVL_ATLAS_EXPORT_BG,
        });
      }}
    >
      <div className="evl-map-stage evl-atlas-map" ref={stageRef}>
        <svg
          ref={svgRef}
          className="evl-infographic-svg evl-map-canvas evl-atlas-svg"
          viewBox={`0 0 ${w} ${h}`}
          role="img"
          aria-labelledby={`${gid}-title`}
          data-export-root="true"
        >
          <title id={`${gid}-title`}>{EPT_MAP_TITLE}</title>
          <AtlasScenicBackground gid={gid} w={w} h={h} />
          <AtlasMapTitle title={EPT_MAP_TITLE} subtitle={EPT_MAP_SUBTITLE} w={w} />
          <AtlasMapLegend x={24} y={92} />
          {EPT_ROUTE_PATHS.map(renderPath)}
          {EPT_ROUTE_NODES.map((node) => {
            const isActive = activeId === node.id;
            return (
              <g key={node.id}>
                {node.isAirport ? <EvlAirportIcon x={node.x} y={node.y} size={18} variant="atlas" /> : null}
                {node.isPeak ? (
                  <path
                    d={`M${node.x - 6},${node.y + 4} L${node.x},${node.y - 8} L${node.x + 6},${node.y + 4} Z`}
                    fill={EVL_ATLAS.gold}
                    stroke="#fff"
                    strokeWidth="1"
                  />
                ) : null}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={node.isPeak ? 5 : 6}
                  fill={node.isAirport ? EVL_ATLAS.markerAirport : EVL_ATLAS.markerTrek}
                  stroke="#fff"
                  strokeWidth="2"
                />
                <StopLabel node={node} active={isActive} />
                {isActive ? <circle cx={node.x} cy={node.y} r={16} fill={EVL_ATLAS.gold} opacity="0.2" className="evl-no-export" /> : null}
                <g className="evl-no-export">
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={22}
                    fill="transparent"
                    className="evl-hit"
                    role="button"
                    tabIndex={0}
                    aria-label={`${node.displayName}, ${node.elevationM} metres`}
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
          <AtlasChartFooter w={w} y={h - 8} />
        </svg>
        {activeNode && STOP_DETAILS[activeNode.id] ? (
          <EvlDetailCard
            name={activeNode.displayName}
            elevationM={activeNode.elevationM}
            day={STOP_DETAILS[activeNode.id].day}
            description={STOP_DETAILS[activeNode.id].description}
            pinned={isPinned}
            onClose={dismiss}
            style={cardPos}
          />
        ) : null}
      </div>
    </EvlChartShell>
  );
}

"use client";

import { useId, useMemo, useRef } from "react";
import { EVL_ATLAS_EXPORT_BG } from "@/lib/everest-view-atlas-colors";
import {
  EVL_MAP_SUBTITLE,
  EVL_MAP_TITLE,
  EVL_STOP_DETAILS,
} from "@/lib/everest-view-charts";
import {
  EVL_MAP_VIEWBOX,
  EVL_PRIMARY_DAY_PATH,
  EVL_ROUTE_NODES,
  EVL_ROUTE_PATHS,
  pathIdsForStop,
  type EvlRouteNode,
  type EvlRoutePath,
} from "@/lib/everest-view-route-geometry";
import { EVL_ATLAS } from "@/lib/everest-view-atlas-colors";
import { EvlAirportIcon } from "./EvlAirportIcon";
import { EvlChartShell } from "./EvlChartShell";
import { EvlDetailCard } from "./EvlDetailCard";
import { downloadSvgAsPng } from "./evl-chart-utils";
import {
  AtlasChartFooter,
  AtlasDayMarker,
  AtlasMapLegend,
  AtlasMapTitle,
  AtlasScenicBackground,
} from "./evl-atlas-theme";
import { useEvlInteraction } from "./useEvlInteraction";
import { useSvgCardPosition } from "./useSvgCardPosition";

function StopLabel({ node, gid, active }: { node: EvlRouteNode; gid: string; active: boolean }) {
  const anchor = node.labelSide === "left" ? "start" : "end";
  const lx = node.labelX;
  const ly = node.labelY;
  const elev = `${node.elevationM.toLocaleString("en-US")} m`;
  return (
    <g>
      <line x1={node.x} y1={node.y} x2={lx + (node.labelSide === "left" ? -4 : 4)} y2={ly + 6} stroke={EVL_ATLAS.textMuted} strokeWidth="0.8" opacity="0.55" />
      <text x={lx} y={ly} textAnchor={anchor} fill={active ? EVL_ATLAS.gold : EVL_ATLAS.text} fontSize="12.5" fontWeight="700" fontFamily="Manrope, sans-serif">
        {node.displayName}
      </text>
      <text x={lx} y={ly + 15} textAnchor={anchor} fill={EVL_ATLAS.textElev} fontSize="10.5" fontWeight="600" fontFamily="Manrope, sans-serif">
        {elev}
      </text>
    </g>
  );
}

export function EverestViewRouteMap({ sectionTitle = "Everest View Luxury Trek — route map" }: { sectionTitle?: string }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const gid = useId().replace(/:/g, "");
  const nodes = useMemo(() => Object.fromEntries(EVL_ROUTE_NODES.map((n) => [n.id, n])), []);
  const { activeId, onPointerEnter, onPointerLeave, onActivate, dismiss, isPinned } = useEvlInteraction();
  const activeNode = activeId ? nodes[activeId] : null;
  const cardPos = useSvgCardPosition(svgRef, stageRef, activeNode?.x ?? 0, activeNode?.y ?? 0, Boolean(activeNode));

  const activePaths = useMemo(() => (activeId ? pathIdsForStop(activeId) : new Set<string>()), [activeId]);

  const { w, h } = EVL_MAP_VIEWBOX;
  const focusMode = Boolean(activeId);

  const stopDetails: Record<string, { day: string; description: string }> = {
    ...EVL_STOP_DETAILS,
    ktm: {
      day: "Day 1 & Day 7",
      description: "Domestic flight at Kathmandu (airport per confirmed booking). Subject to weather and routing.",
    },
    lukla: {
      day: "Day 1 & Day 6–7",
      description: "Trekking starts and ends at Lukla Airport. Return flight to Kathmandu on Day 7 when operations allow.",
    },
  };

  function strokeFor(path: EvlRoutePath) {
    if (path.kind === "flight") return EVL_ATLAS.flight;
    if (path.kind === "trek-descent") return EVL_ATLAS.routeDescent;
    if (path.kind === "trek-ascent") return EVL_ATLAS.routeAscent;
    return EVL_ATLAS.route;
  }

  function renderPath(path: EvlRoutePath) {
    const hot = activePaths.has(path.id);
    const isFlight = path.kind === "flight";
    const isAcclim = path.kind === "acclimatisation";
    const showDay = (!focusMode || hot) && EVL_PRIMARY_DAY_PATH[path.day] === path.id;

    if (isAcclim) {
      return (
        <g key={path.id}>
          <circle
            cx={path.badgeX - 62}
            cy={path.badgeY + 28}
            r={26}
            fill="none"
            stroke={EVL_ATLAS.gold}
            strokeWidth="1.5"
            strokeDasharray="5 4"
            opacity={focusMode && !hot ? 0.35 : 0.9}
          />
          <text x={path.badgeX - 62} y={path.badgeY + 62} textAnchor="middle" fill={EVL_ATLAS.textMuted} fontSize="9" fontWeight="600">
            Rest day
          </text>
          {showDay ? <AtlasDayMarker x={path.badgeX} y={path.badgeY} day={path.day} active={hot} /> : null}
        </g>
      );
    }
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
          markerEnd={isFlight ? `url(#${gid}-flight-arrow)` : `url(#${gid}-arrow)`}
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
        await downloadSvgAsPng(svgRef.current, "ambition-holidays-everest-view-7-day-route-map", {
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
          <title id={`${gid}-title`}>{EVL_MAP_TITLE}</title>
          <AtlasScenicBackground gid={gid} w={w} h={h} />
          <AtlasMapTitle title={EVL_MAP_TITLE} subtitle={EVL_MAP_SUBTITLE} w={w} />
          <AtlasMapLegend x={24} y={92} />

          {EVL_ROUTE_PATHS.map(renderPath)}

          {EVL_ROUTE_NODES.map((node) => {
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
                <StopLabel node={node} gid={gid} active={isActive} />
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

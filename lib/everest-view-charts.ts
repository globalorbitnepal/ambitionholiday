/** Data model for Everest View Luxury Trek route map & altitude infographics (schematic, not survey-grade). */

import type { AltitudeStop } from "./ebc-charts";

export type EvlMapNode = {
  id: string;
  name: string;
  elevationM: number;
  /** Marker position (desktop viewBox 1040×520 route canvas). */
  x: number;
  y: number;
  /** Callout label anchor (kept away from marker to avoid overlaps). */
  labelX: number;
  labelY: number;
  role?: "flight" | "trek" | "highlight";
};

export type EvlWalkSegment = {
  id: string;
  from: string;
  to: string;
  cx?: number;
  cy?: number;
};

export type EvlStopDetail = {
  day: string;
  description: string;
};

export const EVL_CHART_COLORS = {
  bgTop: "#141e2e",
  bgMid: "#1a2840",
  bgBottom: "#121a28",
  gold: "#c9a227",
  goldSoft: "#e8d48a",
  flight: "#5b9fd4",
  text: "#f2f6fa",
  textMuted: "#9eb0c4",
  panel: "rgba(255,255,255,0.07)",
  panelStroke: "rgba(201,162,39,0.35)",
  grid: "rgba(148,176,204,0.12)",
};

export const EVL_MAP_TITLE = "EVEREST VIEW LUXURY TREK";
export const EVL_MAP_SUBTITLE = "7-Day Route Map | Khumbu Region, Nepal";
export const EVL_ALT_TITLE = "EVEREST VIEW LUXURY TREK";
export const EVL_ALT_SUBTITLE = "Route Elevation Profile | Approximate Altitudes in Metres";

export const EVL_MAP_VIEWBOX = { w: 1040, h: 520 };

/** Schematic positions — labels placed via leader lines at labelX/labelY. */
export const EVL_MAP_NODES: EvlMapNode[] = [
  { id: "ktm", name: "Kathmandu", elevationM: 1400, x: 92, y: 418, labelX: 48, labelY: 468, role: "flight" },
  { id: "lukla", name: "Lukla", elevationM: 2860, x: 228, y: 358, labelX: 168, labelY: 318, role: "trek" },
  { id: "phakding", name: "Phakding", elevationM: 2610, x: 348, y: 318, labelX: 298, labelY: 278, role: "trek" },
  { id: "monjo", name: "Monjo", elevationM: 2835, x: 438, y: 288, labelX: 388, labelY: 248, role: "trek" },
  { id: "namche", name: "Namche Bazaar", elevationM: 3440, x: 538, y: 238, labelX: 458, labelY: 188, role: "trek" },
  { id: "khumjung", name: "Khumjung Village", elevationM: 3780, x: 668, y: 178, labelX: 748, labelY: 118, role: "trek" },
  { id: "ridge", name: "Syangboche ridge", elevationM: 3880, x: 798, y: 148, labelX: 878, labelY: 88, role: "highlight" },
];

export const EVL_STOP_DETAILS: Record<string, EvlStopDetail> = {
  ktm: {
    day: "Day 1 & Day 7",
    description: "Valley city staging point. Domestic flights to Lukla operate subject to weather — not part of the walking trail.",
  },
  lukla: {
    day: "Day 1 & Day 6",
    description: "Mountain airstrip gateway to the Khumbu. Meet your team and begin or end the walking portion of the trek.",
  },
  phakding: {
    day: "Day 1 & Day 6",
    description: "River-valley lodges along the Dudh Koshi — a gentler first night out from Lukla and a common stop on the return walk.",
  },
  monjo: {
    day: "Day 2 & Day 5",
    description: "National park gateway village. Sagarmatha entry formalities are often completed here when applicable.",
  },
  namche: {
    day: "Days 2–3 & Day 5",
    description: "Sherpa capital of the Khumbu. Two planned nights support acclimatisation before and after the higher ridge day.",
  },
  khumjung: {
    day: "Day 4",
    description: "Traditional village above Namche with monastery visits when open. Distinct from the Syangboche ridge viewpoint area.",
  },
  ridge: {
    day: "Day 4",
    description: "Syangboche ridge viewpoint area — highest planned overnight (~3,880 m), subject to confirmed lodge availability.",
  },
};

export const EVL_WALK_SEGMENTS_OUT: EvlWalkSegment[] = [
  { id: "d1a", from: "lukla", to: "phakding" },
  { id: "d2a", from: "phakding", to: "monjo", cx: 392, cy: 302 },
  { id: "d2b", from: "monjo", to: "namche", cx: 488, cy: 262 },
  { id: "d4a", from: "namche", to: "khumjung", cx: 602, cy: 208 },
  { id: "d4b", from: "khumjung", to: "ridge", cx: 732, cy: 162 },
];

export const EVL_WALK_SEGMENTS_RETURN: EvlWalkSegment[] = [
  { id: "d5a", from: "ridge", to: "namche", cx: 718, cy: 192 },
  { id: "d5b", from: "namche", to: "monjo", cx: 488, cy: 262 },
  { id: "d6a", from: "monjo", to: "phakding", cx: 392, cy: 302 },
  { id: "d6b", from: "phakding", to: "lukla", cx: 288, cy: 338 },
];

export const EVL_ALL_WALK_SEGMENTS = [...EVL_WALK_SEGMENTS_OUT, ...EVL_WALK_SEGMENTS_RETURN];

/** Segments highlighted when a stop is active. */
export function segmentsForStop(stopId: string): Set<string> {
  const ids = new Set<string>();
  for (const seg of EVL_ALL_WALK_SEGMENTS) {
    if (seg.from === stopId || seg.to === stopId) ids.add(seg.id);
  }
  if (stopId === "ktm") return new Set();
  return ids;
}

export const EVL_ITINERARY_OVERVIEW: { day: string; summary: string }[] = [
  { day: "Day 1", summary: "Kathmandu → flight → Lukla → Phakding" },
  { day: "Day 2", summary: "Phakding → Monjo → Namche Bazaar" },
  { day: "Day 3", summary: "Acclimatisation around Namche Bazaar" },
  { day: "Day 4", summary: "Namche → Khumjung / Syangboche ridge area" },
  { day: "Day 5", summary: "Descend via upper Namche area → Monjo" },
  { day: "Day 6", summary: "Monjo → Phakding → Lukla" },
  { day: "Day 7", summary: "Flight Lukla → Kathmandu" },
];

export type EvlAltitudePoint = {
  id: string;
  label: string;
  shortLabel?: string;
  m: number;
  dayNote?: string;
  isPeak?: boolean;
  description: string;
};

export const EVL_TREK_ALTITUDE_POINTS: EvlAltitudePoint[] = [
  {
    id: "lukla",
    label: "Lukla",
    m: 2860,
    dayNote: "Day 1",
    description: "Start of the walking route after the flight from Kathmandu.",
  },
  { id: "phakding", label: "Phakding", m: 2610, description: "First night on the Dudh Koshi trail." },
  {
    id: "monjo",
    label: "Monjo",
    m: 2835,
    dayNote: "Day 2",
    description: "Park entrance area on the approach to Namche.",
  },
  {
    id: "namche1",
    label: "Namche Bazaar",
    shortLabel: "Namche",
    m: 3440,
    dayNote: "Days 2–3",
    description: "Acclimatisation hub in the Khumbu.",
  },
  {
    id: "khumjung",
    label: "Khumjung Village",
    shortLabel: "Khumjung",
    m: 3780,
    dayNote: "Day 4",
    description: "Village and monastery visit above Namche.",
  },
  {
    id: "ridge",
    label: "Syangboche ridge",
    shortLabel: "Ridge",
    m: 3880,
    dayNote: "Day 4",
    isPeak: true,
    description: "Highest planned overnight on the ridge viewpoint area when confirmed.",
  },
  {
    id: "namche2",
    label: "Namche (descent)",
    shortLabel: "Namche ↓",
    m: 3440,
    dayNote: "Day 5",
    description: "Descent through the upper Namche area toward Monjo.",
  },
  { id: "monjo2", label: "Monjo", m: 2835, description: "Return through the national park gateway." },
  { id: "phakding2", label: "Phakding", m: 2610, dayNote: "Day 6", description: "Valley walk back toward Lukla." },
  { id: "lukla2", label: "Lukla", m: 2860, description: "End of the walking route before the return flight." },
];

export const EVL_FLIGHT_ALTITUDE = {
  label: "Kathmandu",
  m: 1400,
  description: "Flight connection only — not part of the trekking elevation profile.",
};

export const EVEREST_VIEW_ALTITUDE_STOPS: AltitudeStop[] = EVL_TREK_ALTITUDE_POINTS.map((p) => ({
  label: p.label,
  m: p.m,
}));

/** @deprecated */
export type EverestViewMapStop = { id: string; name: string; sub: string; x: number; y: number };

export const EVEREST_VIEW_MAP_STOPS: EverestViewMapStop[] = EVL_MAP_NODES.map((n) => ({
  id: n.id,
  name: n.name,
  sub: `${n.elevationM.toLocaleString("en-US")} m`,
  x: n.x / 10,
  y: n.y / 5,
}));

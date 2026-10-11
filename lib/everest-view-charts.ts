/** Data model for Everest View Luxury Trek route map & altitude infographics (schematic, not survey-grade). */

export type EvlMapNode = {
  id: string;
  name: string;
  elevationM: number;
  /** Schematic position — wide layout (viewBox 1200×720). */
  x: number;
  y: number;
  /** Compact layout for narrow viewports. */
  cx: number;
  cy: number;
  role?: "flight" | "trek" | "highlight";
};

export type EvlWalkSegment = {
  id: string;
  from: string;
  to: string;
  /** Optional curve control point for schematic routing. */
  cx?: number;
  cy?: number;
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

/** Approximate reference elevations — schematic map only. */
export const EVL_MAP_NODES: EvlMapNode[] = [
  { id: "ktm", name: "Kathmandu", elevationM: 1400, x: 118, y: 548, cx: 100, cy: 520, role: "flight" },
  { id: "lukla", name: "Lukla", elevationM: 2860, x: 268, y: 468, cx: 220, cy: 440, role: "trek" },
  { id: "phakding", name: "Phakding", elevationM: 2610, x: 368, y: 418, cx: 300, cy: 390, role: "trek" },
  { id: "monjo", name: "Monjo", elevationM: 2835, x: 448, y: 378, cx: 360, cy: 350, role: "trek" },
  { id: "namche", name: "Namche Bazaar", elevationM: 3440, x: 548, y: 318, cx: 420, cy: 295, role: "trek" },
  { id: "khumjung", name: "Khumjung Village", elevationM: 3780, x: 698, y: 248, cx: 520, cy: 230, role: "trek" },
  {
    id: "ridge",
    name: "Syangboche ridge",
    elevationM: 3880,
    x: 798,
    y: 198,
    cx: 600,
    cy: 185,
    role: "highlight",
  },
];

export const EVL_WALK_SEGMENTS_OUT: EvlWalkSegment[] = [
  { id: "d1a", from: "lukla", to: "phakding" },
  { id: "d2a", from: "phakding", to: "monjo", cx: 408, cy: 398 },
  { id: "d2b", from: "monjo", to: "namche", cx: 498, cy: 348 },
  { id: "d4a", from: "namche", to: "khumjung", cx: 628, cy: 278 },
  { id: "d4b", from: "khumjung", to: "ridge", cx: 748, cy: 218 },
];

export const EVL_WALK_SEGMENTS_RETURN: EvlWalkSegment[] = [
  { id: "d5", from: "ridge", to: "namche", cx: 668, cy: 258 },
  { id: "d5b", from: "namche", to: "monjo", cx: 498, cy: 348 },
  { id: "d6a", from: "monjo", to: "phakding", cx: 408, cy: 398 },
  { id: "d6b", from: "phakding", to: "lukla", cx: 318, cy: 448 },
];

export const EVL_ITINERARY_OVERVIEW: { day: string; summary: string }[] = [
  { day: "Day 1", summary: "Kathmandu → flight → Lukla → Phakding" },
  { day: "Day 2", summary: "Phakding → Monjo → Namche Bazaar" },
  { day: "Day 3", summary: "Acclimatisation around Namche Bazaar" },
  { day: "Day 4", summary: "Namche → Khumjung / Syangboche ridge area" },
  { day: "Day 5", summary: "Descend via upper Namche area → Monjo" },
  { day: "Day 6", summary: "Monjo → Phakding → Lukla" },
  { day: "Day 7", summary: "Flight Lukla → Kathmandu" },
];

/** Walking-only profile points (order along the trek). Flights are separate panels. */
export type EvlAltitudePoint = {
  id: string;
  label: string;
  shortLabel?: string;
  m: number;
  dayNote?: string;
  isPeak?: boolean;
};

export const EVL_TREK_ALTITUDE_POINTS: EvlAltitudePoint[] = [
  { id: "lukla", label: "Lukla", m: 2860, dayNote: "Day 1" },
  { id: "phakding", label: "Phakding", m: 2610 },
  { id: "monjo", label: "Monjo", m: 2835, dayNote: "Day 2" },
  { id: "namche1", label: "Namche Bazaar", shortLabel: "Namche", m: 3440, dayNote: "Days 2–3" },
  { id: "khumjung", label: "Khumjung Village", shortLabel: "Khumjung", m: 3780, dayNote: "Day 4" },
  { id: "ridge", label: "Syangboche ridge", shortLabel: "Ridge", m: 3880, dayNote: "Day 4", isPeak: true },
  { id: "namche2", label: "Namche (descent)", shortLabel: "Namche", m: 3440, dayNote: "Day 5" },
  { id: "monjo2", label: "Monjo", m: 2835 },
  { id: "phakding2", label: "Phakding", m: 2610, dayNote: "Day 6" },
  { id: "lukla2", label: "Lukla", m: 2860 },
];

export const EVL_FLIGHT_ALTITUDE = { label: "Kathmandu", m: 1400 };

/** @deprecated Use EVL_TREK_ALTITUDE_POINTS via EverestViewAltitudeProfile */
import type { AltitudeStop } from "./ebc-charts";

export const EVEREST_VIEW_ALTITUDE_STOPS: AltitudeStop[] = EVL_TREK_ALTITUDE_POINTS.map((p) => ({
  label: p.label,
  m: p.m,
}));

/** @deprecated Use EVL_MAP_NODES */
export type EverestViewMapStop = { id: string; name: string; sub: string; x: number; y: number };

export const EVEREST_VIEW_MAP_STOPS: EverestViewMapStop[] = EVL_MAP_NODES.map((n) => ({
  id: n.id,
  name: n.name,
  sub: `${n.elevationM.toLocaleString("en-US")} m`,
  x: n.x / 12,
  y: n.y / 6,
}));

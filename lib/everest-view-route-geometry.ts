/**
 * Schematic airport-to-airport route geometry for the EVL map.
 * Paths are illustrative — not survey-grade coordinates.
 */

export const EVL_MAP_VIEWBOX = { w: 1080, h: 580 };

export type EvlRouteNode = {
  id: string;
  name: string;
  displayName: string;
  elevationM: number;
  x: number;
  y: number;
  labelX: number;
  labelY: number;
  isAirport?: boolean;
  isPeak?: boolean;
};

export type EvlRoutePath = {
  id: string;
  day: number;
  kind: "flight" | "trek" | "acclimatisation";
  d: string;
  /** Position for DAY N badge */
  badgeX: number;
  badgeY: number;
};

export const EVL_ROUTE_NODES: EvlRouteNode[] = [
  {
    id: "ktm",
    name: "Kathmandu",
    displayName: "KATHMANDU AIRPORT",
    elevationM: 1400,
    x: 88,
    y: 468,
    labelX: 24,
    labelY: 498,
    isAirport: true,
  },
  {
    id: "lukla",
    name: "Lukla",
    displayName: "LUKLA AIRPORT",
    elevationM: 2860,
    x: 248,
    y: 392,
    labelX: 188,
    labelY: 348,
    isAirport: true,
  },
  {
    id: "phakding",
    name: "Phakding",
    displayName: "Phakding",
    elevationM: 2610,
    x: 368,
    y: 348,
    labelX: 318,
    labelY: 302,
  },
  {
    id: "monjo",
    name: "Monjo",
    displayName: "Monjo",
    elevationM: 2835,
    x: 468,
    y: 312,
    labelX: 418,
    labelY: 268,
  },
  {
    id: "namche",
    name: "Namche Bazaar",
    displayName: "Namche Bazaar",
    elevationM: 3440,
    x: 578,
    y: 268,
    labelX: 498,
    labelY: 218,
  },
  {
    id: "khumjung",
    name: "Khumjung Village",
    displayName: "Khumjung Village",
    elevationM: 3780,
    x: 728,
    y: 188,
    labelX: 768,
    labelY: 108,
  },
  {
    id: "ridge",
    name: "Syangboche ridge area",
    displayName: "Syangboche ridge area",
    elevationM: 3880,
    x: 898,
    y: 148,
    labelX: 928,
    labelY: 72,
    isPeak: true,
  },
];

/** Separate polylines per day — return descent uses offset geometry (not shared with ascent). */
export const EVL_ROUTE_PATHS: EvlRoutePath[] = [
  {
    id: "flight-out",
    day: 1,
    kind: "flight",
    d: "M88,468 Q168,360 248,392",
    badgeX: 168,
    badgeY: 328,
  },
  {
    id: "day1-trek",
    day: 1,
    kind: "trek",
    d: "M248,392 L368,348",
    badgeX: 308,
    badgeY: 358,
  },
  {
    id: "day2-trek",
    day: 2,
    kind: "trek",
    d: "M368,348 L468,312 L578,268",
    badgeX: 518,
    badgeY: 298,
  },
  {
    id: "day3-zone",
    day: 3,
    kind: "acclimatisation",
    d: "M578,268",
    badgeX: 578,
    badgeY: 228,
  },
  {
    id: "day4-trek",
    day: 4,
    kind: "trek",
    d: "M578,268 L728,188 L898,148",
    badgeX: 798,
    badgeY: 168,
  },
  {
    id: "day5-descent",
    day: 5,
    kind: "trek",
    d: "M898,148 Q780,198 620,262 L468,312",
    badgeX: 712,
    badgeY: 218,
  },
  {
    id: "day6-trek",
    day: 6,
    kind: "trek",
    d: "M468,312 L378,378 L248,392",
    badgeX: 348,
    badgeY: 398,
  },
  {
    id: "flight-in",
    day: 7,
    kind: "flight",
    d: "M248,404 Q168,490 88,468",
    badgeX: 168,
    badgeY: 528,
  },
];

export function pathIdsForDay(day: number): Set<string> {
  const ids = EVL_ROUTE_PATHS.filter((p) => p.day === day).map((p) => p.id);
  return new Set(ids);
}

export function pathIdsForStop(stopId: string): Set<string> {
  const map: Record<string, string[]> = {
    ktm: ["flight-out", "flight-in"],
    lukla: ["day1-trek", "day6-trek", "flight-out", "flight-in"],
    phakding: ["day1-trek", "day2-trek", "day6-trek"],
    monjo: ["day2-trek", "day5-descent", "day6-trek"],
    namche: ["day2-trek", "day3-zone", "day4-trek", "day5-descent"],
    khumjung: ["day4-trek"],
    ridge: ["day4-trek", "day5-descent"],
  };
  return new Set(map[stopId] ?? []);
}

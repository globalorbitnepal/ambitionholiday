/**
 * Schematic airport-to-airport route geometry for the EVL map.
 * Paths are illustrative — not survey-grade coordinates.
 */

export const EVL_MAP_VIEWBOX = { w: 1100, h: 580 };

export type EvlRouteNode = {
  id: string;
  name: string;
  displayName: string;
  elevationM: number;
  x: number;
  y: number;
  labelX: number;
  labelY: number;
  labelAnchor: "start" | "middle" | "end";
  isAirport?: boolean;
  isPeak?: boolean;
};

export type EvlRoutePath = {
  id: string;
  day: number;
  kind: "flight" | "trek" | "acclimatisation";
  d: string;
  badgeX: number;
  badgeY: number;
};

export const EVL_ROUTE_NODES: EvlRouteNode[] = [
  {
    id: "ktm",
    name: "Kathmandu",
    displayName: "Kathmandu Airport",
    elevationM: 1400,
    x: 95,
    y: 400,
    labelX: 95,
    labelY: 458,
    labelAnchor: "middle",
    isAirport: true,
  },
  {
    id: "lukla",
    name: "Lukla",
    displayName: "Lukla Airport",
    elevationM: 2860,
    x: 255,
    y: 345,
    labelX: 198,
    labelY: 318,
    labelAnchor: "end",
    isAirport: true,
  },
  {
    id: "phakding",
    name: "Phakding",
    displayName: "Phakding",
    elevationM: 2610,
    x: 375,
    y: 315,
    labelX: 375,
    labelY: 276,
    labelAnchor: "middle",
  },
  {
    id: "monjo",
    name: "Monjo",
    displayName: "Monjo",
    elevationM: 2835,
    x: 475,
    y: 285,
    labelX: 400,
    labelY: 248,
    labelAnchor: "end",
  },
  {
    id: "namche",
    name: "Namche Bazaar",
    displayName: "Namche Bazaar",
    elevationM: 3440,
    x: 595,
    y: 248,
    labelX: 595,
    labelY: 218,
    labelAnchor: "middle",
  },
  {
    id: "khumjung",
    name: "Khumjung Village",
    displayName: "Khumjung Village",
    elevationM: 3780,
    x: 745,
    y: 168,
    labelX: 798,
    labelY: 118,
    labelAnchor: "start",
  },
  {
    id: "ridge",
    name: "Syangboche ridge area",
    displayName: "Syangboche ridge area",
    elevationM: 3880,
    x: 905,
    y: 128,
    labelX: 958,
    labelY: 98,
    labelAnchor: "start",
    isPeak: true,
  },
];

export const EVL_ROUTE_PATHS: EvlRoutePath[] = [
  {
    id: "flight-out",
    day: 1,
    kind: "flight",
    d: "M95,400 Q178,302 255,345",
    badgeX: 168,
    badgeY: 278,
  },
  {
    id: "day1-trek",
    day: 1,
    kind: "trek",
    d: "M255,345 L375,315",
    badgeX: 312,
    badgeY: 338,
  },
  {
    id: "day2-trek",
    day: 2,
    kind: "trek",
    d: "M375,315 L475,285 L595,248",
    badgeX: 518,
    badgeY: 278,
  },
  {
    id: "day3-zone",
    day: 3,
    kind: "acclimatisation",
    d: "M595,248",
    badgeX: 668,
    badgeY: 212,
  },
  {
    id: "day4-trek",
    day: 4,
    kind: "trek",
    d: "M595,248 L745,168 L905,128",
    badgeX: 812,
    badgeY: 152,
  },
  {
    id: "day5-descent",
    day: 5,
    kind: "trek",
    d: "M905,128 Q768,188 620,258 L475,285",
    badgeX: 688,
    badgeY: 212,
  },
  {
    id: "day6-trek",
    day: 6,
    kind: "trek",
    d: "M475,285 L388,358 L255,345",
    badgeX: 348,
    badgeY: 368,
  },
  {
    id: "flight-in",
    day: 7,
    kind: "flight",
    d: "M255,358 Q172,418 95,400",
    badgeX: 128,
    badgeY: 432,
  },
];

/** One visible day disc per day — avoids clutter at Lukla (Day 1 / 6 / 7). */
export const EVL_PRIMARY_DAY_PATH: Record<number, string> = {
  1: "day1-trek",
  2: "day2-trek",
  3: "day3-zone",
  4: "day4-trek",
  5: "day5-descent",
  6: "day6-trek",
  7: "flight-in",
};

export function pathIdsForDay(day: number): Set<string> {
  return new Set(EVL_ROUTE_PATHS.filter((p) => p.day === day).map((p) => p.id));
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

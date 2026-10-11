/**
 * Schematic Khumbu route — cartographic layout (not survey-grade).
 */

export const EVL_MAP_VIEWBOX = { w: 1000, h: 620 };

export type EvlRouteNode = {
  id: string;
  name: string;
  displayName: string;
  elevationM: number;
  x: number;
  y: number;
  /** Label anchor point */
  labelX: number;
  labelY: number;
  labelSide: "left" | "right";
  isAirport?: boolean;
  isPeak?: boolean;
};

export type EvlRoutePath = {
  id: string;
  day: number;
  kind: "flight" | "trek" | "trek-ascent" | "trek-descent" | "acclimatisation";
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
    x: 118,
    y: 528,
    labelX: 28,
    labelY: 518,
    labelSide: "left",
    isAirport: true,
  },
  {
    id: "lukla",
    name: "Lukla",
    displayName: "Lukla Airport",
    elevationM: 2860,
    x: 278,
    y: 468,
    labelX: 28,
    labelY: 458,
    labelSide: "left",
    isAirport: true,
  },
  {
    id: "phakding",
    name: "Phakding",
    displayName: "Phakding",
    elevationM: 2610,
    x: 398,
    y: 418,
    labelX: 418,
    labelY: 408,
    labelSide: "right",
  },
  {
    id: "monjo",
    name: "Monjo",
    displayName: "Monjo",
    elevationM: 2835,
    x: 498,
    y: 372,
    labelX: 28,
    labelY: 362,
    labelSide: "left",
  },
  {
    id: "namche",
    name: "Namche Bazaar",
    displayName: "Namche Bazaar",
    elevationM: 3440,
    x: 598,
    y: 318,
    labelX: 618,
    labelY: 308,
    labelSide: "right",
  },
  {
    id: "khumjung",
    name: "Khumjung Village",
    displayName: "Khumjung Village",
    elevationM: 3780,
    x: 738,
    y: 238,
    labelX: 758,
    labelY: 228,
    labelSide: "right",
  },
  {
    id: "ridge",
    name: "Syangboche ridge area",
    displayName: "Syangboche ridge area",
    elevationM: 3880,
    x: 858,
    y: 178,
    labelX: 878,
    labelY: 168,
    labelSide: "right",
    isPeak: true,
  },
];

/** Outbound along valley; Day 5 return on a lower, offset path. */
export const EVL_ROUTE_PATHS: EvlRoutePath[] = [
  {
    id: "flight-out",
    day: 1,
    kind: "flight",
    d: "M118,528 Q198,420 278,468",
    badgeX: 188,
    badgeY: 388,
  },
  {
    id: "day1-trek",
    day: 1,
    kind: "trek",
    d: "M278,468 L398,418",
    badgeX: 338,
    badgeY: 448,
  },
  {
    id: "day2-trek",
    day: 2,
    kind: "trek",
    d: "M398,418 L498,372 L598,318",
    badgeX: 528,
    badgeY: 352,
  },
  {
    id: "day3-zone",
    day: 3,
    kind: "acclimatisation",
    d: "M598,318",
    badgeX: 668,
    badgeY: 288,
  },
  {
    id: "day4-trek",
    day: 4,
    kind: "trek-ascent",
    d: "M598,318 L738,238 L858,178",
    badgeX: 748,
    badgeY: 208,
  },
  {
    id: "day5-descent",
    day: 5,
    kind: "trek-descent",
    d: "M858,178 Q760,248 660,298 L598,338 L498,372",
    badgeX: 678,
    badgeY: 268,
  },
  {
    id: "day6-trek",
    day: 6,
    kind: "trek-descent",
    d: "M498,372 L398,448 L278,468",
    badgeX: 368,
    badgeY: 458,
  },
  {
    id: "flight-in",
    day: 7,
    kind: "flight",
    d: "M278,488 Q198,560 118,528",
    badgeX: 188,
    badgeY: 548,
  },
];

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

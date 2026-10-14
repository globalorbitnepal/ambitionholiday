/**
 * Schematic Everest Panorama route — cartographic layout (not survey-grade).
 */

export const EPT_MAP_VIEWBOX = { w: 1000, h: 620 };

export type EptRouteNode = {
  id: string;
  name: string;
  displayName: string;
  elevationM: number;
  x: number;
  y: number;
  labelX: number;
  labelY: number;
  labelSide: "left" | "right";
  isAirport?: boolean;
  isPeak?: boolean;
};

export type EptRoutePath = {
  id: string;
  day: number;
  kind: "flight" | "trek" | "trek-ascent" | "trek-descent";
  d: string;
  badgeX: number;
  badgeY: number;
};

export const EPT_ROUTE_NODES: EptRouteNode[] = [
  {
    id: "ktm",
    name: "Kathmandu",
    displayName: "Kathmandu",
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
    name: "Khumjung",
    displayName: "Khumjung Village",
    elevationM: 3780,
    x: 718,
    y: 248,
    labelX: 738,
    labelY: 238,
    labelSide: "right",
  },
  {
    id: "evhotel",
    name: "Everest viewpoint area",
    displayName: "Everest viewpoint area",
    elevationM: 3880,
    x: 818,
    y: 198,
    labelX: 838,
    labelY: 188,
    labelSide: "right",
    isPeak: true,
  },
  {
    id: "tengboche",
    name: "Tengboche",
    displayName: "Tengboche",
    elevationM: 3860,
    x: 898,
    y: 268,
    labelX: 918,
    labelY: 258,
    labelSide: "right",
  },
];

export const EPT_ROUTE_PATHS: EptRoutePath[] = [
  {
    id: "flight-out",
    day: 3,
    kind: "flight",
    d: "M118,528 Q198,420 278,468",
    badgeX: 188,
    badgeY: 388,
  },
  {
    id: "trek-up",
    day: 4,
    kind: "trek-ascent",
    d: "M278,468 L398,418 L498,372 L598,318",
    badgeX: 448,
    badgeY: 352,
  },
  {
    id: "trek-high",
    day: 5,
    kind: "trek-ascent",
    d: "M598,318 L718,248 L818,198",
    badgeX: 748,
    badgeY: 218,
  },
  {
    id: "trek-teng",
    day: 6,
    kind: "trek",
    d: "M818,198 L898,268",
    badgeX: 858,
    badgeY: 238,
  },
  {
    id: "trek-down",
    day: 7,
    kind: "trek-descent",
    d: "M898,268 Q780,320 660,348 L498,372",
    badgeX: 698,
    badgeY: 318,
  },
  {
    id: "trek-out",
    day: 8,
    kind: "trek-descent",
    d: "M498,372 L398,448 L278,468",
    badgeX: 368,
    badgeY: 458,
  },
  {
    id: "flight-in",
    day: 9,
    kind: "flight",
    d: "M278,488 Q198,560 118,528",
    badgeX: 188,
    badgeY: 548,
  },
];

export const EPT_PRIMARY_DAY_PATH: Record<number, string> = {
  3: "flight-out",
  4: "trek-up",
  5: "trek-high",
  6: "trek-teng",
  7: "trek-down",
  8: "trek-out",
  9: "flight-in",
};

export function eptPathIdsForStop(stopId: string): Set<string> {
  const map: Record<string, string[]> = {
    ktm: ["flight-out", "flight-in"],
    lukla: ["flight-out", "trek-up", "trek-out", "flight-in"],
    phakding: ["trek-up", "trek-out"],
    monjo: ["trek-up", "trek-down", "trek-out"],
    namche: ["trek-up", "trek-high", "trek-down"],
    khumjung: ["trek-high"],
    evhotel: ["trek-high", "trek-teng"],
    tengboche: ["trek-teng", "trek-down"],
  };
  return new Set(map[stopId] ?? []);
}

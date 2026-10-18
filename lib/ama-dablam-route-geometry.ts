/**
 * Schematic Ama Dablam Base Camp luxury trek route — cartographic layout (not survey-grade).
 */

export const ADB_MAP_VIEWBOX = { w: 1000, h: 620 };

export type AdbRouteNode = {
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

export type AdbRoutePath = {
  id: string;
  day: number;
  kind: "flight" | "trek" | "trek-ascent" | "trek-descent";
  d: string;
  badgeX: number;
  badgeY: number;
};

export const ADB_ROUTE_NODES: AdbRouteNode[] = [
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
    id: "namche",
    name: "Namche Bazaar",
    displayName: "Namche Bazaar",
    elevationM: 3440,
    x: 528,
    y: 328,
    labelX: 548,
    labelY: 318,
    labelSide: "right",
  },
  {
    id: "tengboche",
    name: "Tengboche",
    displayName: "Tengboche",
    elevationM: 3860,
    x: 668,
    y: 268,
    labelX: 688,
    labelY: 258,
    labelSide: "right",
  },
  {
    id: "pangboche",
    name: "Pangboche",
    displayName: "Pangboche",
    elevationM: 3930,
    x: 778,
    y: 238,
    labelX: 798,
    labelY: 228,
    labelSide: "right",
  },
  {
    id: "adb_bc",
    name: "Ama Dablam Base Camp",
    displayName: "Ama Dablam BC (excursion)",
    elevationM: 4600,
    x: 878,
    y: 168,
    labelX: 898,
    labelY: 158,
    labelSide: "right",
    isPeak: true,
  },
];

export const ADB_ROUTE_PATHS: AdbRoutePath[] = [
  {
    id: "flight-out",
    day: 2,
    kind: "flight",
    d: "M118,528 Q198,420 278,468",
    badgeX: 188,
    badgeY: 388,
  },
  {
    id: "trek-up",
    day: 3,
    kind: "trek-ascent",
    d: "M278,468 L398,418 L528,328",
    badgeX: 448,
    badgeY: 362,
  },
  {
    id: "trek-high",
    day: 5,
    kind: "trek-ascent",
    d: "M528,328 L668,268 L778,238",
    badgeX: 698,
    badgeY: 258,
  },
  {
    id: "trek-excursion",
    day: 7,
    kind: "trek-ascent",
    d: "M778,238 L878,168",
    badgeX: 828,
    badgeY: 198,
  },
  {
    id: "trek-excursion-back",
    day: 7,
    kind: "trek-descent",
    d: "M878,168 L778,238",
    badgeX: 848,
    badgeY: 218,
  },
  {
    id: "trek-down",
    day: 8,
    kind: "trek-descent",
    d: "M778,238 L668,298 L528,328",
    badgeX: 648,
    badgeY: 308,
  },
  {
    id: "trek-out",
    day: 9,
    kind: "trek-descent",
    d: "M528,328 L398,448 L278,468",
    badgeX: 368,
    badgeY: 458,
  },
  {
    id: "flight-in",
    day: 10,
    kind: "flight",
    d: "M278,488 Q198,560 118,528",
    badgeX: 188,
    badgeY: 548,
  },
];

export const ADB_PRIMARY_DAY_PATH: Record<number, string> = {
  2: "flight-out",
  3: "trek-up",
  5: "trek-high",
  7: "trek-excursion",
  8: "trek-down",
  9: "trek-out",
  10: "flight-in",
};

export function adbPathIdsForStop(stopId: string): Set<string> {
  const map: Record<string, string[]> = {
    ktm: ["flight-out", "flight-in"],
    lukla: ["flight-out", "trek-up", "trek-out", "flight-in"],
    phakding: ["trek-up", "trek-out"],
    namche: ["trek-up", "trek-high", "trek-down", "trek-out"],
    tengboche: ["trek-high", "trek-down"],
    pangboche: ["trek-high", "trek-excursion", "trek-excursion-back", "trek-down"],
    adb_bc: ["trek-excursion", "trek-excursion-back"],
  };
  return new Set(map[stopId] ?? []);
}

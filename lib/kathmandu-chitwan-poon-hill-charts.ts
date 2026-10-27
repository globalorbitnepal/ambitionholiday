import type { AltitudeStop } from "./ebc-charts";
import { POON_HILL_MONTHLY_WEATHER } from "./poon-hill-charts";

export { POON_HILL_MONTHLY_WEATHER as KATHMANDU_CHITWAN_POON_HILL_MONTHLY_WEATHER };

/** Schematic overnight / viewpoint elevations for the 10-day itinerary. */
export const KATHMANDU_CHITWAN_POON_HILL_ALTITUDE_STOPS: AltitudeStop[] = [
  { label: "Kathmandu", m: 1400 },
  { label: "Kathmandu", m: 1400 },
  { label: "Chitwan", m: 150 },
  { label: "Chitwan", m: 150 },
  { label: "Pokhara", m: 820 },
  { label: "Ulleri", m: 2050 },
  { label: "Ghorepani", m: 2870 },
  { label: "Poon Hill", m: 3210 },
  { label: "Kathmandu", m: 1400 },
  { label: "Kathmandu", m: 1400 },
];

export type KcpMapStop = { id: string; name: string; sub: string; x: number; y: number };

export const KATHMANDU_CHITWAN_POON_HILL_MAP_STOPS: KcpMapStop[] = [
  { id: "ktm", name: "Kathmandu", sub: "~1,400 m", x: 4, y: 88 },
  { id: "ktm2", name: "Sightseeing", sub: "Day 2", x: 8, y: 84 },
  { id: "chit", name: "Chitwan", sub: "flight in", x: 16, y: 90 },
  { id: "chit2", name: "Jungle", sub: "Day 4", x: 22, y: 86 },
  { id: "pkr", name: "Pokhara", sub: "flight in", x: 30, y: 78 },
  { id: "hile", name: "Hile / Ulleri", sub: "trek start", x: 38, y: 66 },
  { id: "ghorepani", name: "Ghorepani", sub: "~2,870 m", x: 46, y: 52 },
  { id: "poon", name: "Poon Hill", sub: "~3,210 m", x: 54, y: 38 },
  { id: "ulleri", name: "Ulleri", sub: "descent", x: 62, y: 58 },
  { id: "pkr2", name: "Pokhara", sub: "return", x: 72, y: 74 },
  { id: "ktm3", name: "Kathmandu", sub: "flight", x: 86, y: 86 },
];

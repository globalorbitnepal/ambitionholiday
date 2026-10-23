import type { AltitudeStop } from "./ebc-charts";
import { POON_HILL_MONTHLY_WEATHER } from "./poon-hill-charts";

export { POON_HILL_MONTHLY_WEATHER as GHOREPANI_POONHILL_MONTHLY_WEATHER };

/** Schematic overnight / viewpoint elevations for the 9-day itinerary. */
export const GHOREPANI_POONHILL_ALTITUDE_STOPS: AltitudeStop[] = [
  { label: "Kathmandu", m: 1400 },
  { label: "Kathmandu", m: 1400 },
  { label: "Pokhara", m: 820 },
  { label: "Ulleri", m: 2050 },
  { label: "Ghorepani", m: 2870 },
  { label: "Poon Hill", m: 3210 },
  { label: "Tadapani", m: 2630 },
  { label: "Ghandruk", m: 1940 },
  { label: "Pokhara", m: 820 },
  { label: "Kathmandu", m: 1400 },
];

export type GhorepaniPoonhillMapStop = { id: string; name: string; sub: string; x: number; y: number };

export const GHOREPANI_POONHILL_MAP_STOPS: GhorepaniPoonhillMapStop[] = [
  { id: "ktm", name: "Kathmandu", sub: "~1,400 m", x: 6, y: 88 },
  { id: "ktm2", name: "Sightseeing", sub: "Day 2", x: 10, y: 84 },
  { id: "pkr", name: "Pokhara", sub: "~820 m", x: 20, y: 78 },
  { id: "hile", name: "Hile", sub: "trailhead", x: 28, y: 72 },
  { id: "ulleri", name: "Ulleri", sub: "~2,050 m", x: 36, y: 62 },
  { id: "ghorepani", name: "Ghorepani", sub: "~2,870 m", x: 46, y: 50 },
  { id: "poon", name: "Poon Hill", sub: "~3,210 m", x: 54, y: 36 },
  { id: "tadapani", name: "Tadapani", sub: "~2,630 m", x: 62, y: 48 },
  { id: "ghandruk", name: "Ghandruk", sub: "~1,940 m", x: 70, y: 60 },
  { id: "pkr2", name: "Pokhara", sub: "return", x: 78, y: 74 },
  { id: "ktm3", name: "Kathmandu", sub: "flight", x: 88, y: 86 },
];

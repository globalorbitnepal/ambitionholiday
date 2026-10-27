import type { AltitudeStop } from "./ebc-charts";
import { POON_HILL_MONTHLY_WEATHER } from "./poon-hill-charts";

export { POON_HILL_MONTHLY_WEATHER as ANNAPURNA_PANORAMA_MONTHLY_WEATHER };

/** Schematic overnight / viewpoint elevations for the 10-day itinerary. */
export const ANNAPURNA_PANORAMA_ALTITUDE_STOPS: AltitudeStop[] = [
  { label: "Kathmandu", m: 1400 },
  { label: "Kathmandu", m: 1400 },
  { label: "Ulleri", m: 2050 },
  { label: "Ghorepani", m: 2870 },
  { label: "Poon Hill", m: 3210 },
  { label: "Tadapani", m: 2630 },
  { label: "Ghandruk", m: 1940 },
  { label: "Tolkha", m: 1710 },
  { label: "Pokhara", m: 820 },
  { label: "Kathmandu", m: 1400 },
];

export type AnnapurnaPanoramaMapStop = { id: string; name: string; sub: string; x: number; y: number };

export const ANNAPURNA_PANORAMA_MAP_STOPS: AnnapurnaPanoramaMapStop[] = [
  { id: "ktm", name: "Kathmandu", sub: "~1,400 m", x: 5, y: 88 },
  { id: "ktm2", name: "Sightseeing", sub: "Day 2", x: 9, y: 84 },
  { id: "pkr", name: "Pokhara", sub: "flight in", x: 16, y: 78 },
  { id: "ulleri", name: "Ulleri", sub: "~2,050 m", x: 24, y: 68 },
  { id: "ghorepani", name: "Ghorepani", sub: "~2,870 m", x: 32, y: 54 },
  { id: "poon", name: "Poon Hill", sub: "~3,210 m", x: 40, y: 38 },
  { id: "tadapani", name: "Tadapani", sub: "~2,630 m", x: 48, y: 50 },
  { id: "ghandruk", name: "Ghandruk", sub: "~1,940 m", x: 56, y: 58 },
  { id: "tolkha", name: "Tolkha", sub: "~1,710 m", x: 64, y: 66 },
  { id: "dhampus", name: "Dhampus", sub: "~1,650 m", x: 72, y: 72 },
  { id: "pkr2", name: "Pokhara", sub: "return", x: 80, y: 78 },
  { id: "ktm3", name: "Kathmandu", sub: "flight", x: 90, y: 86 },
];

import type { AltitudeStop } from "./ebc-charts";

/** Overnight elevations and the Poon Hill viewpoint (Day 4) — schematic, not survey-grade. */
export const POON_HILL_ALTITUDE_STOPS: AltitudeStop[] = [
  { label: "Kathmandu", m: 1400 },
  { label: "Pokhara", m: 820 },
  { label: "Ulleri", m: 2050 },
  { label: "Ghorepani", m: 2870 },
  { label: "Poon Hill (viewpoint)", m: 3210 },
  { label: "Pokhara", m: 820 },
  { label: "Kathmandu", m: 1400 },
];

export type PoonHillMapStop = { id: string; name: string; sub: string; x: number; y: number };

export const POON_HILL_MAP_STOPS: PoonHillMapStop[] = [
  { id: "ktm", name: "Kathmandu", sub: "~1,400 m", x: 8, y: 86 },
  { id: "pkr", name: "Pokhara", sub: "~820 m", x: 22, y: 78 },
  { id: "hile", name: "Hile", sub: "trailhead", x: 32, y: 70 },
  { id: "ulleri", name: "Ulleri", sub: "~2,050 m", x: 42, y: 58 },
  { id: "ghorepani", name: "Ghorepani", sub: "~2,870 m", x: 54, y: 44 },
  { id: "poon", name: "Poon Hill", sub: "~3,210 m", x: 66, y: 28 },
  { id: "hile2", name: "Hile", sub: "pickup", x: 40, y: 62 },
  { id: "pkr2", name: "Pokhara", sub: "return", x: 24, y: 76 },
];

/** Ghorepani / Poon Hill reference — indicative only. */
export const POON_HILL_MONTHLY_WEATHER: { month: string; maxC: number; minC: number }[] = [
  { month: "Jan", maxC: 12, minC: -2 },
  { month: "Feb", maxC: 14, minC: 0 },
  { month: "Mar", maxC: 18, minC: 4 },
  { month: "Apr", maxC: 22, minC: 8 },
  { month: "May", maxC: 24, minC: 11 },
  { month: "Jun", maxC: 24, minC: 14 },
  { month: "Jul", maxC: 23, minC: 15 },
  { month: "Aug", maxC: 23, minC: 15 },
  { month: "Sep", maxC: 22, minC: 12 },
  { month: "Oct", maxC: 20, minC: 8 },
  { month: "Nov", maxC: 16, minC: 3 },
  { month: "Dec", maxC: 13, minC: 0 },
];

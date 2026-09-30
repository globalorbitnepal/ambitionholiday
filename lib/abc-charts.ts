import type { AltitudeStop } from "./ebc-charts";

/** Overnight and high points for the 12-day / 11-night luxury ABC itinerary. */
export const ABC_ALTITUDE_STOPS: AltitudeStop[] = [
  { label: "Kathmandu", m: 1400 },
  { label: "Kathmandu", m: 1400 },
  { label: "Pokhara", m: 822 },
  { label: "Ghandruk", m: 1940 },
  { label: "Chhomrong", m: 2170 },
  { label: "Bamboo", m: 2310 },
  { label: "Deurali", m: 3230 },
  { label: "MBC", m: 3700 },
  { label: "ABC", m: 4130 },
  { label: "Bamboo", m: 2310 },
  { label: "Jhinu Danda", m: 1780 },
  { label: "Pokhara", m: 822 },
  { label: "Kathmandu", m: 1400 },
];

export type AbcMapStop = { id: string; name: string; sub: string; x: number; y: number };

export const ABC_MAP_STOPS: AbcMapStop[] = [
  { id: "ktm", name: "Kathmandu", sub: "1,400 m", x: 10, y: 88 },
  { id: "pkr", name: "Pokhara", sub: "822 m", x: 26, y: 80 },
  { id: "ghandruk", name: "Ghandruk", sub: "1,940 m", x: 38, y: 68 },
  { id: "chhomrong", name: "Chhomrong", sub: "2,170 m", x: 48, y: 56 },
  { id: "bamboo", name: "Bamboo", sub: "2,310 m", x: 56, y: 48 },
  { id: "deurali", name: "Deurali", sub: "3,230 m", x: 64, y: 38 },
  { id: "mbc", name: "Machhapuchare BC", sub: "3,700 m", x: 72, y: 28 },
  { id: "abc", name: "Annapurna BC", sub: "4,130 m", x: 84, y: 18 },
  { id: "jhinu", name: "Jhinu Danda", sub: "1,780 m", x: 34, y: 74 },
];

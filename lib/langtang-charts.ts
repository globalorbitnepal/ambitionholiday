import type { AltitudeStop } from "./ebc-charts";

/** Key elevations along the 10-day luxury Langtang itinerary (Kyanjin Ri = excursion, not overnight). */
export const LANGTANG_ALTITUDE_STOPS: AltitudeStop[] = [
  { label: "Kathmandu", m: 1400 },
  { label: "Kathmandu", m: 1400 },
  { label: "Syabrubesi", m: 1550 },
  { label: "Lama Hotel", m: 2380 },
  { label: "Langtang Village", m: 3430 },
  { label: "Kyanjin Gompa", m: 3870 },
  { label: "Kyanjin Ri", m: 4773 },
  { label: "Lama Hotel", m: 2380 },
  { label: "Kathmandu", m: 1400 },
  { label: "Kathmandu", m: 1400 },
];

export type LangtangMapStop = { id: string; name: string; sub: string; x: number; y: number };

export const LANGTANG_MAP_STOPS: LangtangMapStop[] = [
  { id: "ktm", name: "Kathmandu", sub: "1,400 m", x: 8, y: 88 },
  { id: "syabru", name: "Syabrubesi", sub: "1,550 m", x: 22, y: 78 },
  { id: "lama1", name: "Lama Hotel", sub: "2,380 m", x: 36, y: 62 },
  { id: "langtang", name: "Langtang Village", sub: "3,430 m", x: 52, y: 48 },
  { id: "kyanjin", name: "Kyanjin Gompa", sub: "3,870 m", x: 68, y: 32 },
  { id: "kyanjinri", name: "Kyanjin Ri", sub: "4,773 m", x: 76, y: 18 },
  { id: "lama2", name: "Lama Hotel", sub: "2,380 m", x: 44, y: 58 },
];

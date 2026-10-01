import type { AltitudeStop } from "./ebc-charts";

/** Key elevations along the 15-day luxury Upper Mustang itinerary. */
export const MUSTANG_ALTITUDE_STOPS: AltitudeStop[] = [
  { label: "Kathmandu", m: 1400 },
  { label: "Kathmandu", m: 1400 },
  { label: "Pokhara", m: 822 },
  { label: "Kagbeni", m: 2800 },
  { label: "Chele", m: 3050 },
  { label: "Syangboche", m: 3800 },
  { label: "Ghami", m: 3520 },
  { label: "Tsarang", m: 3560 },
  { label: "Lo Manthang", m: 3840 },
  { label: "Lo Manthang", m: 3840 },
  { label: "Yara / Dhi", m: 3600 },
  { label: "Tangbe", m: 3000 },
  { label: "Jomsom", m: 2720 },
  { label: "Pokhara", m: 822 },
  { label: "Kathmandu", m: 1400 },
];

export type MustangMapStop = { id: string; name: string; sub: string; x: number; y: number };

export const MUSTANG_MAP_STOPS: MustangMapStop[] = [
  { id: "ktm", name: "Kathmandu", sub: "1,400 m", x: 8, y: 88 },
  { id: "pkr", name: "Pokhara", sub: "822 m", x: 20, y: 82 },
  { id: "jomsom", name: "Jomsom", sub: "2,720 m", x: 32, y: 72 },
  { id: "kagbeni", name: "Kagbeni", sub: "2,800 m", x: 40, y: 64 },
  { id: "chele", name: "Chele", sub: "3,050 m", x: 48, y: 56 },
  { id: "syang", name: "Syangboche", sub: "3,800 m", x: 56, y: 46 },
  { id: "ghami", name: "Ghami", sub: "3,520 m", x: 64, y: 40 },
  { id: "tsarang", name: "Tsarang", sub: "3,560 m", x: 72, y: 34 },
  { id: "lomanthang", name: "Lo Manthang", sub: "3,840 m", x: 82, y: 26 },
  { id: "yara", name: "Yara / Dhi", sub: "3,600 m", x: 88, y: 32 },
  { id: "tangbe", name: "Tangbe", sub: "3,000 m", x: 58, y: 58 },
];

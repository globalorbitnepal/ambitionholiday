import type { AltitudeStop } from "./ebc-charts";

/** Overnight elevations along the 7-day / 6-night Everest View Luxury Trek. */
export const EVEREST_VIEW_ALTITUDE_STOPS: AltitudeStop[] = [
  { label: "Kathmandu", m: 1400 },
  { label: "Lukla", m: 2860 },
  { label: "Phakding", m: 2610 },
  { label: "Namche Bazaar", m: 3440 },
  { label: "Namche Bazaar", m: 3440 },
  { label: "Syangboche ridge", m: 3880 },
  { label: "Monjo", m: 2835 },
  { label: "Lukla", m: 2860 },
  { label: "Kathmandu", m: 1400 },
];

export type EverestViewMapStop = { id: string; name: string; sub: string; x: number; y: number };

/** Schematic Khumbu route — lower Everest region only (no Base Camp extension). */
export const EVEREST_VIEW_MAP_STOPS: EverestViewMapStop[] = [
  { id: "ktm", name: "Kathmandu", sub: "1,400 m", x: 6, y: 90 },
  { id: "lukla", name: "Lukla", sub: "2,860 m", x: 18, y: 82 },
  { id: "phakding", name: "Phakding", sub: "2,610 m", x: 28, y: 74 },
  { id: "namche", name: "Namche Bazaar", sub: "3,440 m", x: 36, y: 58 },
  { id: "khumjung", name: "Khumjung", sub: "3,780 m", x: 52, y: 44 },
  { id: "ridge", name: "Syangboche ridge", sub: "~3,880 m", x: 62, y: 36 },
  { id: "monjo", name: "Monjo", sub: "2,835 m", x: 32, y: 68 },
];

import type { AltitudeStop } from "./ebc-charts";

export const ADB_MAP_TITLE = "AMA DABLAM BASE CAMP LUXURY TREK";
export const ADB_MAP_SUBTITLE = "12-Day Schematic Route | Khumbu Region, Nepal — not to scale";

/** Trekking + flight reference elevations (approximate). Day 7 excursion peak shown separately. */
export const AMA_DABLAM_ALTITUDE_STOPS: AltitudeStop[] = [
  { label: "Kathmandu", m: 1400 },
  { label: "Lukla (flight)", m: 2860 },
  { label: "Phakding", m: 2610 },
  { label: "Namche", m: 3440 },
  { label: "Tengboche", m: 3860 },
  { label: "Pangboche", m: 3930 },
  { label: "Ama Dablam BC (excursion)", m: 4600 },
  { label: "Lukla", m: 2860 },
  { label: "Kathmandu", m: 1400 },
];

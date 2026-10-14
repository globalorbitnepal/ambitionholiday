import type { AltitudeStop } from "./ebc-charts";

export const EPT_MAP_TITLE = "EVEREST PANORAMA TREK";
export const EPT_MAP_SUBTITLE = "11-Day Schematic Route | Khumbu Region, Nepal — not to scale";

/** Trekking + flight reference elevations (approximate). */
export const EVEREST_PANORAMA_ALTITUDE_STOPS: AltitudeStop[] = [
  { label: "Kathmandu", m: 1400 },
  { label: "Lukla (flight)", m: 2860 },
  { label: "Phakding", m: 2610 },
  { label: "Namche", m: 3440 },
  { label: "Khumjung", m: 3780 },
  { label: "Everest View Hotel", m: 3880 },
  { label: "Tengboche", m: 3860 },
  { label: "Monjo", m: 2835 },
  { label: "Lukla", m: 2860 },
  { label: "Kathmandu", m: 1400 },
];

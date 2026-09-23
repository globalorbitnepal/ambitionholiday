export type AltitudeStop = { label: string; m: number };

/** Overnight and high points for the 14-day luxury itinerary. */
export const EBC_ALTITUDE_STOPS: AltitudeStop[] = [
  { label: "Kathmandu", m: 1300 },
  { label: "Phakding", m: 2610 },
  { label: "Namche", m: 3440 },
  { label: "Everest View", m: 3880 },
  { label: "Tengboche", m: 3860 },
  { label: "Dingboche", m: 4410 },
  { label: "Dingboche", m: 4410 },
  { label: "Lobuche", m: 4910 },
  { label: "Gorakshep", m: 5164 },
  { label: "Kala Patthar", m: 5545 },
  { label: "Pheriche", m: 4240 },
  { label: "Namche", m: 3440 },
  { label: "Lukla", m: 2860 },
  { label: "Kathmandu", m: 1300 },
];

export type MonthTemp = { month: string; minC: number; maxC: number };

/** Khumbu trail reference — Namche to Dingboche band. */
export const EBC_MONTHLY_WEATHER: MonthTemp[] = [
  { month: "Jan", minC: -16, maxC: 7 },
  { month: "Feb", minC: -15, maxC: 8 },
  { month: "Mar", minC: -12, maxC: 11 },
  { month: "Apr", minC: -7, maxC: 14 },
  { month: "May", minC: -3, maxC: 16 },
  { month: "Jun", minC: 1, maxC: 17 },
  { month: "Jul", minC: 3, maxC: 17 },
  { month: "Aug", minC: 3, maxC: 17 },
  { month: "Sep", minC: 0, maxC: 16 },
  { month: "Oct", minC: -6, maxC: 13 },
  { month: "Nov", minC: -11, maxC: 10 },
  { month: "Dec", minC: -15, maxC: 7 },
];

export const EBC_MAP_STOPS = [
  { id: "lukla", name: "Lukla", sub: "2,860 m", x: 22, y: 82 },
  { id: "phakding", name: "Phakding", sub: "2,610 m", x: 34, y: 76 },
  { id: "namche", name: "Namche", sub: "3,440 m", x: 30, y: 60 },
  { id: "tengboche", name: "Tengboche", sub: "3,860 m", x: 46, y: 56 },
  { id: "dingboche", name: "Dingboche", sub: "4,410 m", x: 58, y: 48 },
  { id: "lobuche", name: "Lobuche", sub: "4,910 m", x: 54, y: 34 },
  { id: "gorakshep", name: "Gorakshep", sub: "5,164 m", x: 66, y: 26 },
  { id: "ebc", name: "Base Camp", sub: "5,364 m", x: 82, y: 28 },
  { id: "kp", name: "Kala Patthar", sub: "5,545 m", x: 62, y: 16 },
];

export function metresToFeet(m: number) {
  return Math.round(m * 3.28084);
}

export function cToF(c: number) {
  return Math.round((c * 9) / 5 + 32);
}

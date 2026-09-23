export const CHART_FRAMES = {
  map: {
    label: "Trip map",
    width: 2000,
    height: 1120,
    maxKb: 900,
    accept: "image/jpeg,image/png,.jpg,.jpeg,.png",
    hint: "JPG or PNG · 2000 × 1120 px (16:9 wide) · under 900 KB. This fills the white map frame exactly.",
  },
  altitude: {
    label: "Altitude profile",
    width: 1960,
    height: 1040,
    maxKb: 900,
    accept: "image/jpeg,image/png,.jpg,.jpeg,.png",
    hint: "JPG or PNG · 1960 × 1040 px · under 900 KB. Upload one for metres and one for feet.",
  },
  weather: {
    label: "Monthly weather",
    width: 1960,
    height: 860,
    maxKb: 900,
    accept: "image/jpeg,image/png,.jpg,.jpeg,.png",
    hint: "JPG or PNG · 1960 × 860 px · under 900 KB. This fills the weather frame exactly.",
  },
} as const;

export function chartFrameLine(
  frame: (typeof CHART_FRAMES)[keyof typeof CHART_FRAMES],
) {
  return `${frame.width} × ${frame.height} px · JPG or PNG · under ${frame.maxKb} KB`;
}

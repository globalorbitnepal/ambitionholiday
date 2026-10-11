import { EVL_ATLAS } from "@/lib/everest-view-atlas-colors";

export function EvlAirportIcon({ x, y, size = 14, variant = "atlas" }: { x: number; y: number; size?: number; variant?: "atlas" | "dark" }) {
  const s = size;
  const wing = variant === "atlas" ? EVL_ATLAS.flight : "#8ec5ef";
  const body = variant === "atlas" ? EVL_ATLAS.markerAirport : "#5b9fd4";
  return (
    <g transform={`translate(${x - s / 2},${y - s / 2})`} aria-hidden="true">
      <circle cx={s / 2} cy={s / 2} r={s / 2 + 2} fill="#fff" stroke={body} strokeWidth="1.2" />
      <path
        d={`M${s * 0.12},${s * 0.52} L${s * 0.42},${s * 0.52} L${s * 0.52},${s * 0.3} L${s * 0.6},${s * 0.52} L${s * 0.88},${s * 0.52} L${s * 0.8},${s * 0.6} L${s * 0.2},${s * 0.6} Z`}
        fill={wing}
        stroke={body}
        strokeWidth="0.5"
      />
    </g>
  );
}

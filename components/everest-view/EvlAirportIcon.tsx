export function EvlAirportIcon({ x, y, size = 14 }: { x: number; y: number; size?: number }) {
  const s = size;
  return (
    <g transform={`translate(${x - s / 2},${y - s / 2})`} aria-hidden="true">
      <rect x={0} y={s * 0.35} width={s} height={s * 0.3} rx={1.5} fill="#5b9fd4" opacity="0.35" />
      <path
        d={`M${s * 0.15},${s * 0.5} L${s * 0.45},${s * 0.5} L${s * 0.55},${s * 0.28} L${s * 0.62},${s * 0.5} L${s * 0.85},${s * 0.5} L${s * 0.78},${s * 0.58} L${s * 0.22},${s * 0.58} Z`}
        fill="#8ec5ef"
        stroke="#f2f6fa"
        strokeWidth="0.6"
      />
    </g>
  );
}

export type ItineraryMetaIconName = "meal" | "bed" | "duration" | "altitude" | "distance";

type IconProps = {
  name: ItineraryMetaIconName;
  size?: number;
  strokeWidth?: number;
};

/** Compact trek itinerary bar icons — tuned for ~24px boxes on gold meta strip. */
export function ItineraryMetaIcon({ name, size = 22, strokeWidth }: IconProps) {
  const strokeW =
    strokeWidth ?? (name === "meal" || name === "bed" ? 1.85 : 1.75);
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: strokeW,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  if (name === "meal") {
    return (
      <svg {...common}>
        <path d="M5 3v5M6.5 3v5.5M8 3v5" />
        <path d="M6.5 8.5V21" />
        <path d="M15.5 3.5c0 2.8 1.8 4.2 3.5 4.5 1.7-.3 3.5-1.7 3.5-4.5V3.5" />
        <path d="M19 8V21" />
      </svg>
    );
  }

  if (name === "bed") {
    return (
      <svg {...common}>
        <path d="M2 10v10" />
        <path d="M22 10v10" />
        <path d="M2 14h20" />
        <path d="M2 10V7.5A2.5 2.5 0 0 1 4.5 5h7.5V10" />
        <path d="M12 5h7.5A2.5 2.5 0 0 1 22 7.5V10" />
        <path d="M5.5 8.5h4a1 1 0 0 1 1 1v2.5H2" />
      </svg>
    );
  }

  if (name === "duration") {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="8.5" />
        <path d="M12 8v4.2l2.6 1.5" />
      </svg>
    );
  }

  if (name === "altitude") {
    return (
      <svg {...common}>
        <path d="M4 19l5-9 3 5 2-3 6 7H4z" />
        <path d="M14 9l2-3 2 3" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <circle cx="6" cy="17" r="2" />
      <circle cx="18" cy="7" r="2" />
      <path d="M8 17c2.5-6 6-8 8-8" />
    </svg>
  );
}

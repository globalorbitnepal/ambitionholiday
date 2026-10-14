export type ItineraryMetaIconName = "meal" | "bed" | "duration" | "altitude" | "distance";

type IconProps = {
  name: ItineraryMetaIconName;
  size?: number;
  strokeWidth?: number;
};

/** Compact trek itinerary bar icons — tuned for gold meta strip (~38px boxes). */
export function ItineraryMetaIcon({ name, size = 22, strokeWidth }: IconProps) {
  const strokeW = strokeWidth ?? (name === "meal" || name === "bed" ? 2 : 1.75);
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
        {/* Fork */}
        <path d="M6 3.5v6.5" />
        <path d="M8 3.5v6.5" />
        <path d="M10 3.5v6.5" />
        <path d="M8 10v10.5" />
        {/* Knife */}
        <path d="M16.5 3.5v5.2c0 1.65 1.05 2.8 2.5 3.1 1.45-.3 2.5-1.45 2.5-3.1V3.5" />
        <path d="M19 11.8V20.5" />
      </svg>
    );
  }

  if (name === "bed") {
    return (
      <svg {...common}>
        <path d="M2 10v11" />
        <path d="M22 10v11" />
        <path d="M2 14h20" />
        <path d="M2 14V9.5A2.5 2.5 0 0 1 4.5 7H9.5V14" />
        <path d="M9.5 7H18a2.5 2.5 0 0 1 2.5 2.5V14" />
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

"use client";

import { EVL_DAY_NAV, EVL_DAY_ROUTE, type EvlDayRouteRow } from "@/lib/everest-view-charts";

const MODE_SHORT: Record<EvlDayRouteRow["mode"], string> = {
  flight: "✈",
  trek: "Trek",
  acclimatisation: "Acclim.",
};

type EvlDayRoutePanelProps = {
  activeDay?: number | null;
  onSelectDay?: (day: number) => void;
};

export function EvlDayRoutePanel({ activeDay, onSelectDay }: EvlDayRoutePanelProps) {
  const detail = activeDay ? EVL_DAY_ROUTE.find((r) => r.day === activeDay) : null;

  return (
    <div className="evl-day-nav" aria-label="Seven-day route navigator">
      <ul className="evl-day-nav-list">
        {EVL_DAY_NAV.map((row) => {
          const isActive = activeDay === row.day;
          return (
            <li key={row.day}>
              <button
                type="button"
                className={`evl-day-nav-item${isActive ? " is-active" : ""}`}
                onClick={() => onSelectDay?.(row.day)}
                aria-pressed={isActive}
              >
                <span className="evl-day-nav-num">{row.day}</span>
                <span className="evl-day-nav-body">
                  <span className="evl-day-nav-mode">{MODE_SHORT[row.mode]}</span>
                  <span className="evl-day-nav-heading">{row.heading}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
      {detail ? (
        <div className="evl-day-nav-detail" role="status">
          <strong>Day {detail.day}</strong>
          <span>{detail.route}</span>
          {detail.overnight ? <span className="evl-day-nav-detail-meta">Overnight: {detail.overnight}</span> : null}
        </div>
      ) : null}
    </div>
  );
}

"use client";

import { EVL_DAY_ROUTE, type EvlDayRouteRow } from "@/lib/everest-view-charts";

const MODE_LABEL: Record<EvlDayRouteRow["mode"], string> = {
  flight: "Flight",
  trek: "Trekking",
  acclimatisation: "Acclimatisation",
};

type EvlDayRoutePanelProps = {
  activeDay?: number | null;
  onSelectDay?: (day: number) => void;
};

export function EvlDayRoutePanel({ activeDay, onSelectDay }: EvlDayRoutePanelProps) {
  return (
    <div className="evl-day-route-panel" aria-label="Day-by-day route">
      <p className="evl-day-route-panel-title">Day-by-day route</p>
      <ul className="evl-day-route-list">
        {EVL_DAY_ROUTE.map((row) => {
          const isActive = activeDay === row.day;
          return (
            <li key={row.day}>
              <button
                type="button"
                className={`evl-day-route-card${isActive ? " is-active" : ""}`}
                onClick={() => onSelectDay?.(row.day)}
                aria-pressed={isActive}
              >
                <div className="evl-day-route-card-head">
                  <span className="evl-day-route-num">Day {row.day}</span>
                  <span className={`evl-day-route-mode evl-day-route-mode--${row.mode}`}>{MODE_LABEL[row.mode]}</span>
                </div>
                <p className="evl-day-route-seq">{row.route}</p>
                <div className="evl-day-route-meta">
                  {row.elevationNote ? <span>{row.elevationNote}</span> : null}
                  {row.overnight ? <span>Overnight: {row.overnight}</span> : null}
                </div>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

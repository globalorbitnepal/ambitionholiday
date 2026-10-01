"use client";

import { useId, useMemo, useRef, useState } from "react";
import {
  cToF,
  EBC_ALTITUDE_STOPS,
  EBC_MAP_STOPS,
  EBC_MONTHLY_WEATHER,
  metresToFeet,
  type AltitudeStop,
} from "@/lib/ebc-charts";
import { ABC_MAP_STOPS } from "@/lib/abc-charts";
import { LANGTANG_MAP_STOPS } from "@/lib/langtang-charts";
import { MUSTANG_MAP_STOPS } from "@/lib/mustang-charts";
import { mediaSrc } from "@/lib/media-src";

function downloadExt(src: string) {
  const path = src.split("?")[0];
  const ext = path.split(".").pop()?.toLowerCase();
  if (ext && ["webp", "jpg", "jpeg", "png", "gif"].includes(ext)) return ext === "jpeg" ? "jpg" : ext;
  return "png";
}

export function UploadedChart({
  title,
  src,
  file,
  variant = "chart",
}: {
  title: string;
  src: string;
  file: string;
  variant?: "chart" | "map";
}) {
  const resolved = mediaSrc(src);
  const ext = downloadExt(src);
  const isMap = variant === "map";
  return (
    <div className={`lux-graph${isMap ? " lux-graph--map" : ""}`}>
      <div className="lux-graph-head">
        <h3>{title}</h3>
        <a className="lux-chart-dl" href={resolved} download={`${file}.${ext}`}>
          {isMap ? "Download map" : "Download PNG"}
        </a>
      </div>
      <figure className={isMap ? "lux-route-map-frame" : "lux-upload-frame"}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={resolved} alt={title} className={isMap ? "lux-route-map-img" : undefined} loading="lazy" decoding="async" />
      </figure>
    </div>
  );
}

function downloadPng(svg: SVGSVGElement | null, name: string) {
  if (!svg) return;
  const clone = svg.cloneNode(true) as SVGSVGElement;
  clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  const vb = clone.viewBox.baseVal;
  const w = Math.max(1, vb.width || 920);
  const h = Math.max(1, vb.height || 480);
  clone.setAttribute("width", String(w));
  clone.setAttribute("height", String(h));
  const xml = new XMLSerializer().serializeToString(clone);
  const url = URL.createObjectURL(new Blob([xml], { type: "image/svg+xml;charset=utf-8" }));
  const img = new Image();
  img.onload = () => {
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(w * 2);
    canvas.height = Math.round(h * 2);
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    canvas.toBlob((blob) => {
      URL.revokeObjectURL(url);
      if (!blob) return;
      const href = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = href;
      a.download = name.endsWith(".png") ? name : `${name}.png`;
      a.click();
      URL.revokeObjectURL(href);
    }, "image/png");
  };
  img.onerror = () => URL.revokeObjectURL(url);
  img.src = url;
}

function Watermark({ w, h }: { w: number; h: number }) {
  return (
    <text
      x={w / 2}
      y={h / 2}
      textAnchor="middle"
      fill="#1a2129"
      opacity="0.055"
      fontSize="26"
      fontWeight="700"
      letterSpacing="5"
      pointerEvents="none"
    >
      AMBITION HOLIDAYS
    </text>
  );
}

export function AltitudeProfileChart({
  title = "Altitude profile of Everest Base Camp Trek",
  stops = EBC_ALTITUDE_STOPS,
  maxM = 5800,
  minM = 800,
  fileName = "ebc-altitude-profile",
}: {
  title?: string;
  stops?: AltitudeStop[];
  maxM?: number;
  minM?: number;
  fileName?: string;
}) {
  const [unit, setUnit] = useState<"m" | "ft">("m");
  const svgRef = useRef<SVGSVGElement>(null);
  const gid = useId().replace(/:/g, "");
  const W = 980;
  const H = 520;
  const pad = { l: 56, r: 36, t: 44, b: 118 };
  const innerW = W - pad.l - pad.r;
  const innerH = H - pad.t - pad.b;

  const points = useMemo(
    () =>
      stops.map((stop, i) => {
        const x = pad.l + (i / (stops.length - 1)) * innerW;
        const y = pad.t + (1 - (stop.m - minM) / (maxM - minM)) * innerH;
        return { ...stop, x, y, value: unit === "m" ? stop.m : metresToFeet(stop.m) };
      }),
        [innerH, innerW, pad.l, pad.t, stops, unit, maxM, minM],
  );

  const line = points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
  const area = `${line} L${points[points.length - 1].x},${pad.t + innerH} L${points[0].x},${pad.t + innerH} Z`;

  return (
    <div className="lux-graph">
      <div className="lux-graph-head">
        <h3>{title}</h3>
        <button type="button" className="lux-chart-dl" onClick={() => downloadPng(svgRef.current, fileName)}>
          Download PNG
        </button>
      </div>
      <div className="lux-unit">
        <span>Altitude in:</span>
        <button type="button" className={unit === "m" ? "on" : ""} onClick={() => setUnit("m")}>
          Meter
        </button>
        <button type="button" className={unit === "ft" ? "on" : ""} onClick={() => setUnit("ft")}>
          Feet
        </button>
      </div>
      <svg ref={svgRef} className="lux-graph-svg" viewBox={`0 0 ${W} ${H}`} role="img" aria-label={title}>
        <defs>
          <linearGradient id={`${gid}-fill`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1a4d8c" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#d4af37" stopOpacity="0.08" />
          </linearGradient>
        </defs>
        <rect x="0" y="0" width={W} height={H} fill="#ffffff" />
        <Watermark w={W} h={H} />
        {[0, 0.25, 0.5, 0.75, 1].map((t) => {
          const y = pad.t + t * innerH;
          return <line key={t} x1={pad.l} x2={W - pad.r} y1={y} y2={y} stroke="#eef1f4" strokeWidth="1" />;
        })}
        <path d={area} fill={`url(#${gid}-fill)`} />
        <path d={line} fill="none" stroke="#1a4d8c" strokeWidth="2.2" strokeLinejoin="round" />
        {points.map((p, i) => (
          <g key={`${p.label}-${i}`}>
            <circle cx={p.x} cy={p.y} r="3.6" fill="#1a4d8c" />
            <text x={p.x} y={p.y - 10} textAnchor="middle" fill="#1a4d8c" fontSize="10" fontWeight="600">
              {p.value.toLocaleString()} {unit}
            </text>
            <text
              x={p.x}
              y={H - 14}
              textAnchor="end"
              fill="#374151"
              fontSize="11"
              fontWeight="600"
              transform={`rotate(-48 ${p.x} ${H - 14})`}
            >
              {p.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

export function MonthlyWeatherChart({ title = "Weather on the Everest Base Camp Luxury Trek" }: { title?: string }) {
  const [unit, setUnit] = useState<"c" | "f">("c");
  const svgRef = useRef<SVGSVGElement>(null);
  const gid = useId().replace(/:/g, "");
  const W = 980;
  const H = 430;
  const pad = { l: 54, r: 28, t: 40, b: 52 };
  const months = EBC_MONTHLY_WEATHER;
  const minT = -22;
  const maxT = 22;
  const innerW = W - pad.l - pad.r;
  const innerH = H - pad.t - pad.b;
  const yOf = (c: number) => pad.t + (1 - (c - minT) / (maxT - minT)) * innerH;
  const xOf = (i: number) => pad.l + (i / (months.length - 1)) * innerW;
  const maxPts = months.map((m, i) => ({ x: xOf(i), y: yOf(m.maxC), v: unit === "c" ? m.maxC : cToF(m.maxC) }));
  const minPts = months.map((m, i) => ({ x: xOf(i), y: yOf(m.minC), v: unit === "c" ? m.minC : cToF(m.minC) }));
  const line = (pts: { x: number; y: number }[]) => pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");
  const band = `${line(maxPts)} ${[...minPts].reverse().map((p) => `L${p.x},${p.y}`).join(" ")} Z`;
  const suffix = unit === "c" ? "°C" : "°F";

  return (
    <div className="lux-graph">
      <div className="lux-graph-head">
        <h3>{title}</h3>
        <button type="button" className="lux-chart-dl" onClick={() => downloadPng(svgRef.current, "ebc-monthly-weather")}>
          Download PNG
        </button>
      </div>
      <div className="lux-unit">
        <span>Temperature in:</span>
        <button type="button" className={unit === "c" ? "on" : ""} onClick={() => setUnit("c")}>
          Celsius
        </button>
        <button type="button" className={unit === "f" ? "on" : ""} onClick={() => setUnit("f")}>
          Fahrenheit
        </button>
      </div>
      <svg ref={svgRef} className="lux-graph-svg" viewBox={`0 0 ${W} ${H}`} role="img" aria-label={title}>
        <defs>
          <linearGradient id={`${gid}-band`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1a4d8c" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#d4af37" stopOpacity="0.12" />
          </linearGradient>
        </defs>
        <rect x="0" y="0" width={W} height={H} fill="#ffffff" />
        <Watermark w={W} h={H} />
        {[-20, -10, 0, 10, 20].map((c) => (
          <g key={c}>
            <line x1={pad.l} x2={W - pad.r} y1={yOf(c)} y2={yOf(c)} stroke="#eef1f4" />
            <text x={pad.l - 10} y={yOf(c) + 4} textAnchor="end" fontSize="11" fill="#6b7280">
              {unit === "c" ? c : cToF(c)}
              {suffix}
            </text>
          </g>
        ))}
        <path d={band} fill={`url(#${gid}-band)`} />
        <path d={line(maxPts)} fill="none" stroke="#1a4d8c" strokeWidth="2.2" />
        <path d={line(minPts)} fill="none" stroke="#c9a227" strokeWidth="2.2" />
        {maxPts.map((p, i) => (
          <g key={`max-${i}`}>
            <circle cx={p.x} cy={p.y} r="3.4" fill="#1a4d8c" />
            <text x={p.x} y={p.y - 10} textAnchor="middle" fill="#1a4d8c" fontSize="10" fontWeight="600">
              {p.v}
              {suffix}
            </text>
          </g>
        ))}
        {minPts.map((p, i) => (
          <g key={`min-${i}`}>
            <circle cx={p.x} cy={p.y} r="3.4" fill="#c9a227" />
            <text x={p.x} y={p.y + 16} textAnchor="middle" fill="#8a7018" fontSize="10" fontWeight="600">
              {p.v}
              {suffix}
            </text>
          </g>
        ))}
        {months.map((m, i) => (
          <text key={m.month} x={xOf(i)} y={H - 18} textAnchor="middle" fontSize="12" fill="#374151" fontWeight="600">
            {m.month}
          </text>
        ))}
      </svg>
      <p className="lux-graph-legend">
        <i className="is-max" /> Daytime high
        <i className="is-min" /> Night low — Khumbu reference only
      </p>
    </div>
  );
}

function LangtangRouteMap({ title }: { title: string }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const gid = useId().replace(/:/g, "");
  const byId = Object.fromEntries(LANGTANG_MAP_STOPS.map((s) => [s.id, s]));
  const pt = (id: string) => `${byId[id].x * 10},${byId[id].y * 6}`;
  const trekOut = ["syabru", "lama1", "langtang", "kyanjin"]
    .map((id, i) => `${i === 0 ? "M" : "L"}${pt(id)}`)
    .join(" ");
  const trekRi = `M${pt("kyanjin")} L${pt("kyanjinri")}`;
  const trekReturn = `M${pt("kyanjin")} L${pt("lama2")} L${pt("syabru")}`;

  return (
    <div className="lux-graph">
      <div className="lux-graph-head">
        <h3>{title}</h3>
        <button type="button" className="lux-chart-dl" onClick={() => downloadPng(svgRef.current, "langtang-valley-luxury-trek-route-map")}>
          Download PNG
        </button>
      </div>
      <svg ref={svgRef} className="lux-graph-svg lux-map-svg" viewBox="0 0 1000 560" role="img" aria-label={title}>
        <defs>
          <linearGradient id={`${gid}-sky`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#e4eef6" />
            <stop offset="55%" stopColor="#f4f7f9" />
            <stop offset="100%" stopColor="#e8efe4" />
          </linearGradient>
          <linearGradient id={`${gid}-peak`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f8fbff" />
            <stop offset="100%" stopColor="#7a9ab8" />
          </linearGradient>
        </defs>
        <rect width="1000" height="560" fill={`url(#${gid}-sky)`} />
        <Watermark w={1000} h={560} />
        <path d="M0 180 L120 120 L260 80 L400 50 L560 30 L720 20 L880 40 L1000 60 L1000 560 L0 560 Z" fill={`url(#${gid}-peak)`} opacity="0.4" />
        <text x="620" y="24" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1a4d8c">
          Langtang Lirung
        </text>
        <path d="M0 360 C180 320 360 380 520 340 C700 300 860 360 1000 320 L1000 560 L0 560 Z" fill="#b8c9a8" opacity="0.55" />
        <path d={trekOut} fill="none" stroke="#b42318" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        <path d={trekReturn} fill="none" stroke="#b42318" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" opacity="0.85" />
        <path d={trekRi} fill="none" stroke="#b42318" strokeWidth="3" strokeDasharray="5 5" strokeLinecap="round" />
        <path d={`M${pt("ktm")} L${pt("syabru")}`} fill="none" stroke="#1a4d8c" strokeWidth="3" strokeDasharray="9 7" />
        <path d={`M${pt("syabru")} L${pt("ktm")}`} fill="none" stroke="#8a7018" strokeWidth="3" strokeDasharray="6 6" />
        {LANGTANG_MAP_STOPS.map((stop) => (
          <g key={stop.id}>
            <circle
              cx={stop.x * 10}
              cy={stop.y * 6}
              r={stop.id === "kyanjin" ? 7 : stop.id === "kyanjinri" ? 6 : 5.5}
              fill={stop.id === "kyanjin" ? "#1a4d8c" : stop.id === "kyanjinri" ? "#6b7280" : "#c9a227"}
              stroke="#fff"
              strokeWidth="2"
            />
            <text x={stop.x * 10 + 10} y={stop.y * 6 - 8} fontSize="13" fontWeight="700" fill="#111827">
              {stop.name}
            </text>
            <text x={stop.x * 10 + 10} y={stop.y * 6 + 8} fontSize="11" fill="#4b5563">
              {stop.sub}
            </text>
          </g>
        ))}
        <g transform="translate(28 28)">
          <rect width="268" height="118" rx="10" fill="#fff" stroke="#e5d39a" />
          <text x="14" y="24" fontSize="12" fontWeight="700" fill="#1a2129">
            Ambition Holidays
          </text>
          <text x="14" y="44" fontSize="11" fill="#4b5563">
            Red solid — trekking route
          </text>
          <text x="14" y="62" fontSize="11" fill="#4b5563">
            Red dash — Kyanjin Ri viewpoint (day hike)
          </text>
          <text x="14" y="80" fontSize="11" fill="#4b5563">
            Blue dash — private 4WD (Kathmandu → Syabrubesi)
          </text>
          <text x="14" y="98" fontSize="11" fill="#4b5563">
            Gold dash — private 4WD return to Kathmandu
          </text>
        </g>
      </svg>
    </div>
  );
}

function MustangRouteMap({ title }: { title: string }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const gid = useId().replace(/:/g, "");
  const byId = Object.fromEntries(MUSTANG_MAP_STOPS.map((s) => [s.id, s]));
  const pt = (id: string) => `${byId[id].x * 10},${byId[id].y * 6}`;
  const trek = ["kagbeni", "chele", "syang", "ghami", "tsarang", "lomanthang", "yara"]
    .map((id, i) => `${i === 0 ? "M" : "L"}${pt(id)}`)
    .join(" ");
  const trekReturn = `M${pt("yara")} L${pt("tangbe")} L${pt("jomsom")}`;

  return (
    <div className="lux-graph">
      <div className="lux-graph-head">
        <h3>{title}</h3>
        <button type="button" className="lux-chart-dl" onClick={() => downloadPng(svgRef.current, "luxury-upper-mustang-trek-route-map")}>
          Download PNG
        </button>
      </div>
      <svg ref={svgRef} className="lux-graph-svg lux-map-svg" viewBox="0 0 1000 560" role="img" aria-label={title}>
        <defs>
          <linearGradient id={`${gid}-sky`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#e8dfd0" />
            <stop offset="55%" stopColor="#f4f0e8" />
            <stop offset="100%" stopColor="#e6d4bc" />
          </linearGradient>
        </defs>
        <rect width="1000" height="560" fill={`url(#${gid}-sky)`} />
        <Watermark w={1000} h={560} />
        <path d="M0 380 C200 320 400 400 600 340 C800 280 900 360 1000 300 L1000 560 L0 560 Z" fill="#c4a574" opacity="0.35" />
        <path d={trek} fill="none" stroke="#8b4513" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        <path d={trekReturn} fill="none" stroke="#8b4513" strokeWidth="4" strokeLinecap="round" opacity="0.85" />
        <path d={`M${pt("ktm")} L${pt("pkr")}`} fill="none" stroke="#1a4d8c" strokeWidth="3" strokeDasharray="9 7" />
        <path d={`M${pt("pkr")} L${pt("jomsom")}`} fill="none" stroke="#1a4d8c" strokeWidth="3" strokeDasharray="9 7" />
        <path d={`M${pt("jomsom")} L${pt("kagbeni")}`} fill="none" stroke="#8a7018" strokeWidth="3" strokeDasharray="6 6" />
        {MUSTANG_MAP_STOPS.map((stop) => (
          <g key={stop.id}>
            <circle
              cx={stop.x * 10}
              cy={stop.y * 6}
              r={stop.id === "lomanthang" ? 7 : 5.5}
              fill={stop.id === "lomanthang" ? "#1a4d8c" : "#c9a227"}
              stroke="#fff"
              strokeWidth="2"
            />
            <text x={stop.x * 10 + 10} y={stop.y * 6 - 8} fontSize="13" fontWeight="700" fill="#111827">
              {stop.name}
            </text>
            <text x={stop.x * 10 + 10} y={stop.y * 6 + 8} fontSize="11" fill="#4b5563">
              {stop.sub}
            </text>
          </g>
        ))}
        <g transform="translate(28 28)">
          <rect width="248" height="102" rx="10" fill="#fff" stroke="#e5d39a" />
          <text x="14" y="24" fontSize="12" fontWeight="700" fill="#1a2129">
            Ambition Holidays
          </text>
          <text x="14" y="44" fontSize="11" fill="#4b5563">
            Brown — trekking / highland route
          </text>
          <text x="14" y="62" fontSize="11" fill="#4b5563">
            Blue dash — domestic flights
          </text>
          <text x="14" y="80" fontSize="11" fill="#4b5563">
            Gold dash — Jomsom ground transfer
          </text>
        </g>
      </svg>
    </div>
  );
}

export function TrekRouteMap({
  title = "Everest Base Camp Luxury Trek map",
  variant = "ebc",
}: {
  title?: string;
  variant?: "ebc" | "abc" | "mustang" | "langtang";
}) {
  if (variant === "abc") return <AbcRouteMap title={title || "Annapurna Base Camp Luxury Trek map"} />;
  if (variant === "mustang") return <MustangRouteMap title={title || "Luxury Upper Mustang Trek map"} />;
  if (variant === "langtang") return <LangtangRouteMap title={title || "Langtang Valley Luxury Trek — 10 days route map"} />;
  return <EbcRouteMap title={title} />;
}

function EbcRouteMap({ title }: { title: string }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const gid = useId().replace(/:/g, "");
  const trail = EBC_MAP_STOPS.filter((s) => s.id !== "kp");
  const d = trail.map((s, i) => `${i === 0 ? "M" : "L"}${s.x * 10},${s.y * 6}`).join(" ");
  const kp = EBC_MAP_STOPS.find((s) => s.id === "kp")!;

  return (
    <div className="lux-graph">
      <div className="lux-graph-head">
        <h3>{title}</h3>
        <button type="button" className="lux-chart-dl" onClick={() => downloadPng(svgRef.current, "ebc-luxury-route-map")}>
          Download PNG
        </button>
      </div>
      <svg ref={svgRef} className="lux-graph-svg lux-map-svg" viewBox="0 0 1000 560" role="img" aria-label={title}>
        <defs>
          <linearGradient id={`${gid}-sky`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#e4eef6" />
            <stop offset="55%" stopColor="#f4f7f9" />
            <stop offset="100%" stopColor="#f6f3ea" />
          </linearGradient>
          <linearGradient id={`${gid}-peak`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f8fbff" />
            <stop offset="100%" stopColor="#8aa0b8" />
          </linearGradient>
        </defs>
        <rect width="1000" height="560" fill={`url(#${gid}-sky)`} />
        <Watermark w={1000} h={560} />
        <path d="M0 200 L80 140 L150 180 L230 90 L310 160 L400 60 L490 130 L580 40 L670 120 L760 36 L850 110 L1000 70 L1000 560 L0 560 Z" fill={`url(#${gid}-peak)`} opacity="0.45" />
        <path d="M420 90 L500 18 L560 95 Z" fill="#f4f7fb" opacity="0.85" />
        <text x="500" y="16" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1a4d8c">
          Everest
        </text>
        <path d="M0 340 C120 300 200 360 320 310 C430 270 500 330 620 300 C740 268 860 320 1000 290 L1000 560 L0 560 Z" fill="#c9d4c0" />
        <path d="M180 500 C260 470 300 430 340 400 C390 360 430 340 500 320 C560 304 600 280 640 250" fill="none" stroke="#3d6d9a" strokeWidth="7" strokeLinecap="round" opacity="0.24" />
        <path d={d} fill="none" stroke="#c9a227" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
        <path
          d={`M${trail[trail.length - 2].x * 10},${trail[trail.length - 2].y * 6} L${kp.x * 10},${kp.y * 6}`}
          fill="none"
          stroke="#1a4d8c"
          strokeWidth="3"
          strokeDasharray="8 6"
        />
        <path d="M90 520 L220 492" fill="none" stroke="#1a4d8c" strokeWidth="2" strokeDasharray="5 7" />
        <circle cx="90" cy="520" r="6" fill="#1a4d8c" />
        <text x="104" y="525" fontSize="13" fontWeight="700" fill="#1a2129">
          Kathmandu 1,300 m — flight to Lukla
        </text>
        {EBC_MAP_STOPS.map((stop) => (
          <g key={stop.id}>
            <circle cx={stop.x * 10} cy={stop.y * 6} r={stop.id === "ebc" || stop.id === "kp" ? 7 : 5.5} fill={stop.id === "ebc" ? "#1a4d8c" : "#c9a227"} stroke="#fff" strokeWidth="2" />
            <text x={stop.x * 10 + 10} y={stop.y * 6 - 8} fontSize="13" fontWeight="700" fill="#111827">
              {stop.name}
            </text>
            <text x={stop.x * 10 + 10} y={stop.y * 6 + 8} fontSize="11" fill="#4b5563">
              {stop.sub}
            </text>
          </g>
        ))}
        <g transform="translate(28 28)">
          <rect width="210" height="86" rx="10" fill="#fff" stroke="#e5d39a" />
          <text x="14" y="24" fontSize="12" fontWeight="700" fill="#1a2129">
            Ambition Holidays
          </text>
          <text x="14" y="44" fontSize="11" fill="#4b5563">
            Gold line — walking route
          </text>
          <text x="14" y="62" fontSize="11" fill="#4b5563">
            Navy dash — Kala Patthar
          </text>
          <text x="14" y="78" fontSize="11" fill="#4b5563">
            Flight — Kathmandu ↔ Lukla
          </text>
        </g>
      </svg>
    </div>
  );
}

function AbcRouteMap({ title }: { title: string }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const gid = useId().replace(/:/g, "");
  const byId = Object.fromEntries(ABC_MAP_STOPS.map((s) => [s.id, s]));
  const pt = (id: string) => `${byId[id].x * 10},${byId[id].y * 6}`;
  const trek = ["ghandruk", "chhomrong", "bamboo", "deurali", "mbc", "abc"]
    .map((id, i) => `${i === 0 ? "M" : "L"}${pt(id)}`)
    .join(" ");
  const trekReturn = `M${pt("abc")} L${pt("mbc")} L${pt("deurali")} L${pt("bamboo")} L${pt("jhinu")}`;

  return (
    <div className="lux-graph">
      <div className="lux-graph-head">
        <h3>{title}</h3>
        <button type="button" className="lux-chart-dl" onClick={() => downloadPng(svgRef.current, "abc-luxury-route-map")}>
          Download PNG
        </button>
      </div>
      <svg ref={svgRef} className="lux-graph-svg lux-map-svg" viewBox="0 0 1000 560" role="img" aria-label={title}>
        <defs>
          <linearGradient id={`${gid}-sky`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#e4eef6" />
            <stop offset="55%" stopColor="#f4f7f9" />
            <stop offset="100%" stopColor="#f6f3ea" />
          </linearGradient>
          <linearGradient id={`${gid}-peak`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f8fbff" />
            <stop offset="100%" stopColor="#8aa0b8" />
          </linearGradient>
        </defs>
        <rect width="1000" height="560" fill={`url(#${gid}-sky)`} />
        <Watermark w={1000} h={560} />
        <path d="M0 200 L80 140 L150 180 L230 90 L310 160 L400 60 L490 130 L580 40 L670 120 L760 36 L850 110 L1000 70 L1000 560 L0 560 Z" fill={`url(#${gid}-peak)`} opacity="0.45" />
        <path d="M720 70 L790 12 L860 88 Z" fill="#f4f7fb" opacity="0.85" />
        <text x="790" y="10" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1a4d8c">
          Annapurna I
        </text>
        <path d="M0 340 C120 300 200 360 320 310 C430 270 500 330 620 300 C740 268 860 320 1000 290 L1000 560 L0 560 Z" fill="#c9d4c0" />
        <path d={trek} fill="none" stroke="#b42318" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        <path d={trekReturn} fill="none" stroke="#b42318" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" opacity="0.85" />
        <path d={`M${pt("ktm")} L${pt("pkr")}`} fill="none" stroke="#1a4d8c" strokeWidth="3" strokeDasharray="9 7" />
        <path d={`M${pt("pkr")} L${pt("ghandruk")}`} fill="none" stroke="#8a7018" strokeWidth="3" strokeDasharray="6 6" />
        <path d={`M${pt("jhinu")} L${pt("pkr")}`} fill="none" stroke="#8a7018" strokeWidth="3" strokeDasharray="6 6" />
        <text x={(byId.ktm.x * 10 + byId.pkr.x * 10) / 2} y={byId.ktm.y * 6 - 10} textAnchor="middle" fontSize="12" fontWeight="700" fill="#1a4d8c">
          ✈ Flight
        </text>
        {ABC_MAP_STOPS.map((stop) => (
          <g key={stop.id}>
            <circle
              cx={stop.x * 10}
              cy={stop.y * 6}
              r={stop.id === "abc" ? 7 : 5.5}
              fill={stop.id === "abc" ? "#1a4d8c" : "#c9a227"}
              stroke="#fff"
              strokeWidth="2"
            />
            <text x={stop.x * 10 + 10} y={stop.y * 6 - 8} fontSize="13" fontWeight="700" fill="#111827">
              {stop.name}
            </text>
            <text x={stop.x * 10 + 10} y={stop.y * 6 + 8} fontSize="11" fill="#4b5563">
              {stop.sub}
            </text>
          </g>
        ))}
        <g transform="translate(28 28)">
          <rect width="248" height="102" rx="10" fill="#fff" stroke="#e5d39a" />
          <text x="14" y="24" fontSize="12" fontWeight="700" fill="#1a2129">
            Ambition Holidays
          </text>
          <text x="14" y="44" fontSize="11" fill="#4b5563">
            Red — trekking route
          </text>
          <text x="14" y="62" fontSize="11" fill="#4b5563">
            Blue dash — Kathmandu ↔ Pokhara flight
          </text>
          <text x="14" y="80" fontSize="11" fill="#4b5563">
            Gold dash — Pokhara / Ghandruk / Jhinu transfer
          </text>
        </g>
      </svg>
    </div>
  );
}

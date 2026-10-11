"use client";

import { useLayoutEffect, useState } from "react";

export function useSvgCardPosition(
  svgRef: React.RefObject<SVGSVGElement | null>,
  stageRef: React.RefObject<HTMLDivElement | null>,
  markerX: number,
  markerY: number,
  active: boolean,
) {
  const [pos, setPos] = useState({ left: 0, top: 0 });

  useLayoutEffect(() => {
    if (!active || !svgRef.current || !stageRef.current) return;
    const svg = svgRef.current;
    const stage = stageRef.current;
    const pt = svg.createSVGPoint();
    pt.x = markerX;
    pt.y = markerY;
    const ctm = svg.getScreenCTM();
    if (!ctm) return;
    const screen = pt.matrixTransform(ctm);
    const stageRect = stage.getBoundingClientRect();
    let left = screen.x - stageRect.left + 12;
    let top = screen.y - stageRect.top - 8;
    const cardW = 260;
    const cardH = 140;
    if (left + cardW > stageRect.width - 8) left = stageRect.width - cardW - 8;
    if (left < 8) left = 8;
    if (top + cardH > stageRect.height - 8) top = screen.y - stageRect.top - cardH - 16;
    if (top < 8) top = 8;
    setPos({ left, top });
  }, [active, markerX, markerY, svgRef, stageRef]);

  return pos;
}

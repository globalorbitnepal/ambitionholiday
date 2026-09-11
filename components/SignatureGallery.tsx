"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import MediaImage from "@/components/MediaImage";
import type { SignatureImage } from "@/lib/content-types";

type Props = {
  images: SignatureImage[];
};

export default function SignatureGallery({ images }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const pauseRef = useRef(false);
  const drag = useRef<{ active: boolean; startX: number; scrollLeft: number }>({
    active: false,
    startX: 0,
    scrollLeft: 0,
  });
  const [grabbing, setGrabbing] = useState(false);

  const slots = images.slice(0, 6);

  const scrollByCard = useCallback((dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector("figure");
    const step = card ? card.getBoundingClientRect().width + 14 : el.clientWidth * 0.35;
    const max = el.scrollWidth - el.clientWidth;
    let next = el.scrollLeft + dir * step;
    if (next > max - 4) next = 0;
    if (next < 0) next = max;
    el.scrollTo({ left: next, behavior: "smooth" });
  }, []);

  // Desktop auto-slide; pause while hovering / dragging / touching
  useEffect(() => {
    if (slots.length <= 1) return;

    const mq = window.matchMedia("(pointer: fine)");
    if (!mq.matches) return;

    const id = window.setInterval(() => {
      if (document.hidden || pauseRef.current || drag.current.active) return;
      scrollByCard(1);
    }, 4200);

    const onChange = () => {
      if (!mq.matches) window.clearInterval(id);
    };
    mq.addEventListener("change", onChange);
    return () => {
      window.clearInterval(id);
      mq.removeEventListener("change", onChange);
    };
  }, [slots.length, scrollByCard]);

  const onPointerDown = useCallback((event: React.PointerEvent) => {
    if (event.pointerType === "touch") return;
    const el = trackRef.current;
    if (!el) return;
    pauseRef.current = true;
    drag.current = {
      active: true,
      startX: event.clientX,
      scrollLeft: el.scrollLeft,
    };
    setGrabbing(true);
    el.setPointerCapture(event.pointerId);
  }, []);

  const onPointerMove = useCallback((event: React.PointerEvent) => {
    const el = trackRef.current;
    if (!el || !drag.current.active) return;
    el.scrollLeft = drag.current.scrollLeft - (event.clientX - drag.current.startX);
  }, []);

  const endDrag = useCallback((event: React.PointerEvent) => {
    const el = trackRef.current;
    drag.current.active = false;
    setGrabbing(false);
    if (el?.hasPointerCapture(event.pointerId)) {
      el.releasePointerCapture(event.pointerId);
    }
    window.setTimeout(() => {
      pauseRef.current = false;
    }, 1800);
  }, []);

  if (!slots.length) return null;

  return (
    <div
      className="relative min-w-0 w-full"
      onMouseEnter={() => {
        pauseRef.current = true;
      }}
      onMouseLeave={() => {
        pauseRef.current = false;
      }}
    >
      <div
        ref={trackRef}
        className={`flex items-start gap-3 overflow-x-auto scroll-smooth snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-3.5 [&::-webkit-scrollbar]:hidden ${
          grabbing ? "cursor-grabbing" : "cursor-grab"
        }`}
        style={{ touchAction: "pan-x pan-y" }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onPointerLeave={endDrag}
        role="region"
        aria-label="Signature gallery"
      >
        {slots.map((image, index) => (
          <figure
            key={image.id}
            className={`relative shrink-0 snap-start overflow-hidden rounded-[0.85rem] border border-[#c9a227]/65 shadow-[0_12px_28px_rgba(40,50,70,0.18)] ${
              index % 3 === 1
                ? "mt-3 sm:mt-5 lg:mt-6"
                : index % 3 === 2
                  ? "mt-1.5 sm:mt-2.5 lg:mt-3"
                  : ""
            }`}
            style={{
              width: "clamp(9.5rem, 42vw, 13.5rem)",
              aspectRatio: "3 / 4",
              backgroundColor: "#1e252f",
            }}
          >
            <MediaImage
              src={image.src}
              alt={image.alt}
              priority={index < 2}
              sizes="(max-width: 640px) 42vw, 216px"
              objectPosition="center 22%"
              className="pointer-events-none select-none object-cover"
            />
          </figure>
        ))}
      </div>
    </div>
  );
}

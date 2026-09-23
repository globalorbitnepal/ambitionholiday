"use client";

import Image from "next/image";
import type { StatItem } from "@/lib/content-types";

const iconBox = "flex h-11 w-11 shrink-0 items-center justify-center text-white";
const iconClass = "h-11 w-11 shrink-0";

function StatIcon({ item }: { item: StatItem }) {
  if (item.iconSrc) {
    return (
      <Image
        src={item.iconSrc}
        alt=""
        width={44}
        height={44}
        className={`${iconClass} object-contain`}
        aria-hidden="true"
        unoptimized
      />
    );
  }

  if (item.iconKey === "tripadvisor") {
    return (
      <Image
        src="/images/icons/tripadvisor.webp"
        alt=""
        width={44}
        height={44}
        className={`${iconClass} object-contain`}
        aria-hidden="true"
        priority
        unoptimized
      />
    );
  }

  if (item.iconKey === "years") {
    return (
      <svg viewBox="0 0 48 48" className={iconClass} fill="none" aria-hidden="true">
        <circle cx="24" cy="19.5" r="10.2" stroke="currentColor" strokeWidth="1.85" />
        <path
          d="M24 13.4 25.85 17.4l4.35.45-3.3 2.95.95 4.2L24 22.9l-3.85 2.1.95-4.2-3.3-2.95 4.35-.45L24 13.4Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path
          d="M17.6 28.2 14.2 40.2 24 35.4l9.8 4.8-3.4-12"
          stroke="currentColor"
          strokeWidth="1.85"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (item.iconKey === "price") {
    return (
      <svg viewBox="0 0 48 48" className={iconClass} fill="none" aria-hidden="true">
        <path
          d="M18.5 39.5H13.2a2 2 0 0 1-2-2V23.2a2 2 0 0 1 2-2h5.3"
          stroke="currentColor"
          strokeWidth="1.85"
          strokeLinejoin="round"
        />
        <path
          d="M18.5 21.2v-4.6c0-3.4 1.9-5.7 4.9-5.7.9 0 1.7.8 1.7 1.7v5.4h5.4c2.3 0 4 2 3.6 4.3l-1.9 10.8c-.4 2.1-2.2 3.6-4.3 3.6H18.5V21.2Z"
          stroke="currentColor"
          strokeWidth="1.85"
          strokeLinejoin="round"
        />
        <path d="M33.8 8.8v4.2" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
        <path
          d="M31.2 10.2 33.8 12l2.6-1.8"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <span
      className={`${iconClass} bg-white`}
      style={{
        WebkitMaskImage: "url(/images/icons/responsible-tourism.webp)",
        maskImage: "url(/images/icons/responsible-tourism.webp)",
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
      }}
      aria-hidden="true"
    />
  );
}

type Props = {
  stats: StatItem[];
};

export default function HeroStats({ stats }: Props) {
  if (!stats.length) return null;

  return (
    <div className="animate-fade-up-delay-3 w-full px-4 pb-6 sm:px-8 sm:pb-8 lg:px-10 lg:pb-10">
      <ul className="mx-auto grid max-w-6xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((feature) => (
          <li
            key={feature.id}
            className="flex min-h-[3.5rem] items-center gap-3.5 px-3 py-3.5 sm:justify-center sm:px-5 lg:px-6"
          >
            <span className={iconBox}>
              <StatIcon item={feature} />
            </span>
            <p className="min-w-0 text-left text-[0.92rem] font-medium leading-snug text-white sm:text-[0.95rem]">
              {feature.label}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

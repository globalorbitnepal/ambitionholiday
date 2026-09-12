"use client";

import { useEffect, useState } from "react";

const WORD_DELAY_MS = 420;
const HOLD_MS = 2200;
const RESET_GAP_MS = 500;

type Props = {
  words: string[];
};

export default function HeroTagline({ words }: Props) {
  const [visibleWords, setVisibleWords] = useState(0);
  const safeWords = words.length ? words : ["Discover", "Your", "Luxury", "Tour", "&", "Trek"];

  const wordsKey = safeWords.join("|");

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setVisibleWords(safeWords.length);
      return;
    }

    let cancelled = false;
    const timers: number[] = [];

    const clearTimers = () => {
      timers.forEach((id) => window.clearTimeout(id));
      timers.length = 0;
    };

    const runCycle = () => {
      if (cancelled) return;
      clearTimers();
      setVisibleWords(0);

      safeWords.forEach((_, index) => {
        timers.push(
          window.setTimeout(() => {
            if (!cancelled) setVisibleWords(index + 1);
          }, RESET_GAP_MS + index * WORD_DELAY_MS),
        );
      });

      const cycleEnd = RESET_GAP_MS + safeWords.length * WORD_DELAY_MS + HOLD_MS;
      timers.push(window.setTimeout(runCycle, cycleEnd));
    };

    runCycle();

    return () => {
      cancelled = true;
      clearTimers();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- restart animation when word list changes
  }, [wordsKey]);

  return (
    <p
      className="mb-1.5 text-center text-[1.18rem] font-bold tracking-[0.08em] text-gold sm:mb-2.5 sm:text-[1.55rem] lg:text-[1.75rem]"
      aria-label={safeWords.join(" ")}
    >
      <span className="inline-flex flex-wrap items-baseline justify-center gap-x-[0.35em]">
        {safeWords.map((word, index) => (
          <span
            key={`${word}-${index}`}
            className={`inline-block transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              index < visibleWords
                ? "translate-x-0 opacity-100"
                : "-translate-x-5 opacity-0"
            }`}
          >
            {word}
          </span>
        ))}
      </span>
    </p>
  );
}

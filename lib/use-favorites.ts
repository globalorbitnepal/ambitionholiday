"use client";

import { useCallback, useEffect, useState } from "react";

export type SavedTrip = {
  id: string;
  slug: string;
  title: string;
  heroSrc: string;
  priceUsd: number;
};

const KEY = "ambition-saved-trips";

function readSaved(): SavedTrip[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    const parsed = raw ? (JSON.parse(raw) as SavedTrip[]) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeSaved(items: SavedTrip[]) {
  window.localStorage.setItem(KEY, JSON.stringify(items));
  window.dispatchEvent(new Event("ambition-saved"));
}

export function useFavorites() {
  const [items, setItems] = useState<SavedTrip[]>([]);

  useEffect(() => {
    const sync = () => setItems(readSaved());
    sync();
    window.addEventListener("storage", sync);
    window.addEventListener("ambition-saved", sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("ambition-saved", sync);
    };
  }, []);

  const has = useCallback((id: string) => items.some((item) => item.id === id), [items]);

  const toggle = useCallback((trip: SavedTrip) => {
    const current = readSaved();
    const next = current.some((item) => item.id === trip.id)
      ? current.filter((item) => item.id !== trip.id)
      : [...current, trip];
    writeSaved(next);
    setItems(next);
  }, []);

  return { items, has, toggle };
}

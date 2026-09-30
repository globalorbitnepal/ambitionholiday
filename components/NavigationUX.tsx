"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const STALE_RELOAD_KEY = "ah-stale-reload-at";

export function isStaleBuildError(reason: unknown) {
  const text =
    reason instanceof Error
      ? `${reason.name} ${reason.message}`
      : typeof reason === "string"
        ? reason
        : "";
  return /ChunkLoadError|Loading (CSS )?chunk [\w-]+ failed|Failed to fetch dynamically imported module|Importing a module script failed|error loading dynamically imported module/i.test(
    text,
  );
}

/** Reload once per minute at most, so a missing chunk after deploy never loops. */
export function reloadForFreshBuild() {
  try {
    const last = Number(sessionStorage.getItem(STALE_RELOAD_KEY) || 0);
    if (Date.now() - last < 60_000) return false;
    sessionStorage.setItem(STALE_RELOAD_KEY, String(Date.now()));
  } catch {
    // private mode: still reload once
  }
  window.location.reload();
  return true;
}

/**
 * Top progress bar + subtle navigating state while App Router loads the next page.
 */
export default function NavigationUX() {
  const pathname = usePathname();
  const [active, setActive] = useState(false);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    document.documentElement.classList.remove("is-navigating");
    setActive(false);
    if (hideTimer.current) clearTimeout(hideTimer.current);
  }, [pathname]);

  useEffect(() => {
    const onError = (event: ErrorEvent) => {
      if (isStaleBuildError(event.error ?? event.message)) reloadForFreshBuild();
    };
    const onRejection = (event: PromiseRejectionEvent) => {
      if (isStaleBuildError(event.reason)) reloadForFreshBuild();
    };
    window.addEventListener("error", onError);
    window.addEventListener("unhandledrejection", onRejection);
    return () => {
      window.removeEventListener("error", onError);
      window.removeEventListener("unhandledrejection", onRejection);
    };
  }, []);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest("a[href]");
      if (!anchor || anchor.getAttribute("target") === "_blank") return;
      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) {
        return;
      }
      if (/^https?:\/\//i.test(href)) {
        try {
          const url = new URL(href);
          if (url.origin !== window.location.origin) return;
        } catch {
          return;
        }
      }

      document.documentElement.classList.add("is-navigating");
      setActive(true);
      if (hideTimer.current) clearTimeout(hideTimer.current);
      hideTimer.current = setTimeout(() => {
        document.documentElement.classList.remove("is-navigating");
        setActive(false);
      }, 12000);
    };

    document.addEventListener("click", onClick, true);
    return () => {
      document.removeEventListener("click", onClick, true);
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className={`route-progress ${active ? "route-progress--active" : ""}`}
    />
  );
}

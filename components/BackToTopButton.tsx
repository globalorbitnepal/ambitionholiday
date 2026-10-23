"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const SHOW_AFTER_PX = 380;

function shouldHide(pathname: string) {
  return (
    pathname.startsWith("/admin") ||
    pathname.startsWith("/orbit") ||
    pathname === "/orbit-login"
  );
}

export default function BackToTopButton() {
  const pathname = usePathname();
  const hiddenRoute = shouldHide(pathname || "");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (hiddenRoute) {
      setVisible(false);
      return;
    }

    const onScroll = () => {
      setVisible(window.scrollY > SHOW_AFTER_PX);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [hiddenRoute]);

  const scrollTop = useCallback(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: prefersReduced ? "auto" : "smooth" });
  }, []);

  if (hiddenRoute) return null;

  return (
    <button
      type="button"
      className={`site-back-to-top${visible ? " is-visible" : ""}`}
      onClick={scrollTop}
      aria-label="Back to top"
      title="Back to top"
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 5.5 6 11.5l1.4 1.4 4.6-4.6 4.6 4.6 1.4-1.4-7-7Z"
          fill="currentColor"
        />
        <path d="M11 11.5h2V19h-2v-7.5Z" fill="currentColor" opacity="0.85" />
      </svg>
    </button>
  );
}

/** Built-in review platform marks — SVG only so they never 404 (no mediaSrc png→webp rewrite). */

export function GoogleMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path fill="#4285F4" d="M23.5 12.27c0-.82-.07-1.6-.21-2.36H12v4.47h6.46a5.52 5.52 0 0 1-2.4 3.62v3h3.88c2.27-2.09 3.56-5.17 3.56-8.73Z" />
      <path fill="#34A853" d="M12 24c3.24 0 5.96-1.07 7.95-2.9l-3.88-3c-1.08.72-2.47 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.95H1.27v3.09A12 12 0 0 0 12 24Z" />
      <path fill="#FBBC05" d="M5.27 14.3A7.2 7.2 0 0 1 4.9 12c0-.8.14-1.57.37-2.3V6.61H1.27A12 12 0 0 0 0 12c0 1.94.46 3.77 1.27 5.39l4-3.09Z" />
      <path fill="#EA4335" d="M12 4.75c1.76 0 3.34.6 4.58 1.79l3.43-3.43C17.95 1.19 15.23 0 12 0 7.31 0 3.26 2.69 1.27 6.61l4 3.09C6.22 6.86 8.87 4.75 12 4.75Z" />
    </svg>
  );
}

export function TripadvisorMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-label="Tripadvisor" role="img">
      <circle cx="12" cy="12" r="11" fill="#34E0A1" />
      <circle cx="8.6" cy="10.2" r="2.35" fill="#0a0a0a" />
      <circle cx="15.4" cy="10.2" r="2.35" fill="#0a0a0a" />
      <circle cx="9.1" cy="9.6" r="0.55" fill="#fff" />
      <circle cx="15.9" cy="9.6" r="0.55" fill="#fff" />
      <path
        fill="#0a0a0a"
        d="M12 13.1c-1.35 0-2.45 1.05-2.45 2.35h4.9c0-1.3-1.1-2.35-2.45-2.35Z"
      />
      <path fill="#0a0a0a" d="M10.2 15.8h-.75a.85.85 0 0 0 0 1.7h.75v-1.7Zm4.3 0h-.75a.85.85 0 0 0 0 1.7h.75v-1.7Z" />
    </svg>
  );
}

/** Custom board logo from CMS — skip broken default owl paths that mediaSrc would rewrite to a missing webp. */
export function isBuiltinTripadvisorLogoPath(src?: string) {
  const s = (src || "").trim().toLowerCase();
  if (!s) return true;
  return s.includes("tripadvisor-owl") || s.includes("/images/icons/tripadvisor");
}

export function reviewBoardLogoSrc(src?: string, platform?: "google" | "tripadvisor") {
  const s = (src || "").trim();
  if (!s) return "";
  if (platform === "tripadvisor" && isBuiltinTripadvisorLogoPath(s)) return "";
  return s;
}

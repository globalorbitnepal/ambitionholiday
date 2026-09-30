type Props = { className?: string };

export function IconDashboard({ className }: Props) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="3" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <rect x="13" y="3" width="8" height="5" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <rect x="13" y="10" width="8" height="11" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <rect x="3" y="13" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

export function IconPackage({ className }: Props) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 8l8-4 8 4v8l-8 4-8-4V8z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M12 4v16M4 8l8 4 8-4" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

export function IconGlobe({ className }: Props) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
      <path d="M3 12h18M12 3c2.5 3 2.5 15 0 18M12 3c-2.5 3-2.5 15 0 18" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

export function IconMedia({ className }: Props) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="9" cy="10" r="2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M21 15l-5-4-4 3-3-2-6 5" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}

export function IconJournal({ className }: Props) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M6 4h12a2 2 0 012 2v14l-4-2-4 2-4-2-4 2V6a2 2 0 012-2z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}

export function IconStar({ className }: Props) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3l2.4 5.8L21 10l-4.5 4.2L17.5 21 12 18l-5.5 3 1-6.8L3 10l6.6-1.2L12 3z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconSettings({ className }: Props) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function IconChevron({ className, open }: Props & { open?: boolean }) {
  return (
    <svg
      className={className}
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      style={{ transform: open ? "rotate(90deg)" : undefined, transition: "transform 0.15s ease" }}
    >
      <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

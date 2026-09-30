"use client";

import { useEffect } from "react";
import Link from "next/link";
import { isStaleBuildError, reloadForFreshBuild } from "@/components/NavigationUX";

export default function SiteError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (isStaleBuildError(error)) reloadForFreshBuild();
  }, [error]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#070a10] px-6 text-center text-[#f7f4ef]">
      <p className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-[#c9a227]">
        Ambition Holidays
      </p>
      <h1 className="mt-3 font-[family-name:var(--font-cormorant)] text-3xl font-semibold">
        This page did not load
      </h1>
      <p className="mt-3 max-w-md text-sm text-white/65">
        Please try again. If it keeps happening, refresh the site or return home.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={() => reset()}
          className="rounded-md border border-gold/60 bg-gold/15 px-4 py-2.5 text-sm font-semibold text-gold"
        >
          Try again
        </button>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="rounded-md border border-white/20 px-4 py-2.5 text-sm font-semibold text-white/85"
        >
          Refresh
        </button>
        <Link
          href="/"
          className="rounded-md border border-white/20 px-4 py-2.5 text-sm font-semibold text-white/85"
        >
          Home
        </Link>
      </div>
    </main>
  );
}

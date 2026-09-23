"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function OrbitLoginClient() {
  const router = useRouter();
  const [passkey, setPasskey] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [reveal, setReveal] = useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/orbit/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passkey }),
      });
      if (!res.ok) {
        setError("Access denied.");
        setPasskey("");
        return;
      }
      router.replace("/orbit");
      router.refresh();
    } catch {
      setError("Unable to reach Orbit.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative flex min-h-screen overflow-hidden bg-[#05070b] text-white antialiased">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 55% at 18% 20%, rgba(201,162,39,0.18), transparent 52%), radial-gradient(ellipse 50% 40% at 88% 78%, rgba(168,134,28,0.12), transparent 55%), linear-gradient(165deg, #0c1119 0%, #05070b 48%, #030406 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.22]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cpath fill='none' stroke='%23c9a227' stroke-opacity='0.45' stroke-width='0.6' d='M0 70h140M70 0v140'/%3E%3C/svg%3E\")",
          maskImage:
            "radial-gradient(ellipse 70% 70% at 50% 45%, black 20%, transparent 75%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-10 h-[28rem] w-[28rem] rounded-full bg-gold/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 bottom-0 h-[22rem] w-[22rem] rounded-full bg-gold/5 blur-3xl"
      />

      <div className="relative z-10 mx-auto grid min-h-screen w-full max-w-6xl items-center gap-10 px-5 py-12 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:px-10">
        <section className="mx-auto w-full max-w-xl text-center lg:mx-0 lg:text-left">
          <img
            src="/images/ambition-holiday-logo.webp"
            alt="Ambition Holidays"
            className="mx-auto h-14 w-auto drop-shadow-[0_8px_24px_rgba(201,162,39,0.25)] lg:mx-0 lg:h-[4.5rem]"
          />
          <p className="mt-5 text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-gold lg:mt-8">
            Private control room
          </p>
          <h1 className="mt-2 hidden font-[family-name:var(--font-cormorant)] text-[clamp(2.8rem,7vw,4.6rem)] font-semibold leading-[0.95] tracking-tight lg:mt-3 lg:block">
            Orbit
          </h1>
          <p className="mx-auto mt-2 hidden max-w-md font-[family-name:var(--font-cormorant)] text-xl italic leading-snug text-white/70 lg:mx-0 lg:mt-4 lg:block lg:text-[1.35rem]">
            The quiet command of journeys beyond limits.
          </p>
          <div className="mx-auto mt-5 hidden h-px w-24 bg-gradient-to-r from-transparent via-gold to-transparent lg:mx-0 lg:mt-8 lg:block lg:w-36" />
          <ul className="mt-8 hidden gap-3 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-white/45 lg:flex">
            <li className="rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5">
              Journeys
            </li>
            <li className="rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5">
              Content
            </li>
            <li className="rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5">
              Media
            </li>
          </ul>
        </section>

        <section className="relative mx-auto w-full max-w-[26.5rem]">
          <div
            aria-hidden="true"
            className="absolute -inset-px rounded-[1.35rem] bg-gradient-to-br from-gold/50 via-gold/10 to-gold/25 opacity-80"
          />
          <div className="relative overflow-hidden rounded-[1.3rem] border border-gold/20 bg-[rgba(8,11,16,0.88)] p-7 shadow-[0_30px_80px_rgba(0,0,0,0.55)] backdrop-blur-xl sm:p-9">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-5 top-5 h-5 w-5 border-l border-t border-gold/70"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute right-5 top-5 h-5 w-5 border-r border-t border-gold/70"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute bottom-5 left-5 h-5 w-5 border-b border-l border-gold/70"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute bottom-5 right-5 h-5 w-5 border-b border-r border-gold/70"
            />

            <p className="text-center text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-gold">
              Ambition Holidays
            </p>
            <h2 className="mt-3 text-center font-[family-name:var(--font-cormorant)] text-[2rem] font-semibold tracking-tight">
              Enter Orbit
            </h2>
            <p className="mt-1.5 text-center text-sm text-white/50">
              Super admin access only
            </p>

            <form onSubmit={onSubmit} className="mt-8 space-y-5">
              <div>
                <label
                  htmlFor="orbit-passkey"
                  className="mb-2 block text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-white/55"
                >
                  Passkey
                </label>
                <div className="relative">
                  <input
                    id="orbit-passkey"
                    type={reveal ? "text" : "password"}
                    autoComplete="current-password"
                    value={passkey}
                    onChange={(e) => setPasskey(e.target.value)}
                    className="w-full rounded-xl border border-white/12 bg-black/45 px-4 py-3.5 pr-16 text-base text-white outline-none transition placeholder:text-white/25 focus:border-gold/70 focus:shadow-[0_0_0_3px_rgba(201,162,39,0.12)]"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setReveal((v) => !v)}
                    className="absolute inset-y-0 right-2 my-auto h-8 rounded-md px-2.5 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-gold/80 transition hover:text-gold"
                  >
                    {reveal ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {error ? (
                <p
                  className="rounded-lg border border-red-400/25 bg-red-500/10 px-3 py-2 text-sm text-red-200"
                  role="alert"
                >
                  {error}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={loading || !passkey}
                className="focus-ring group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-[#d4af37] via-[#c9a227] to-[#a8861c] py-3.5 text-sm font-bold tracking-[0.14em] text-[#1a1408] shadow-[0_12px_30px_rgba(201,162,39,0.28)] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-45 disabled:shadow-none"
              >
                {loading ? "Unlocking…" : "Enter Orbit"}
              </button>
            </form>

            <p className="mt-7 text-center text-[0.68rem] tracking-[0.08em] text-white/30">
              Authorized personnel · Encrypted session
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

import Link from "next/link";
import DuskAtmosphere from "@/components/DuskAtmosphere";
import Header from "@/components/Header";

type Props = {
  title: string;
  description: string;
};

export default function PageShell({ title, description }: Props) {
  return (
    <main className="home-light min-h-screen overflow-x-clip text-[#f7f4ef]">
      <div className="relative isolate [clip-path:inset(0)]">
        <DuskAtmosphere />
        <Header />
        <section className="relative mx-auto max-w-4xl px-5 pb-[max(6rem,calc(env(safe-area-inset-bottom)+4rem))] pt-[max(8.5rem,calc(env(safe-area-inset-top)+6.5rem))] sm:px-6 sm:pt-40 lg:px-8">
          <div className="hl-panel relative overflow-hidden rounded-[1.25rem] border border-gold/40 px-5 py-7 sm:px-8 sm:py-9">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-8 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#c9a227] to-transparent"
            />
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-gold">
              Ambition Holiday
            </p>
            <h1 className="mt-3 font-[family-name:var(--font-cormorant)] text-[clamp(1.85rem,7vw,3rem)] font-semibold tracking-tight text-white sm:text-5xl">
              {title}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">
              {description}
            </p>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/50">
              Full page content is coming next. This route is live with a proper
              SEO URL so navigation works without errors.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                href="/"
                className="focus-ring inline-flex min-h-11 items-center rounded-md border border-gold/70 bg-gold/10 px-4 py-2.5 text-sm font-semibold text-gold transition-colors hover:bg-gold/20"
              >
                Back to home
              </Link>
              <a
                href="https://wa.me/9779851148898"
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring inline-flex min-h-11 items-center rounded-md border border-gold/30 bg-white/25 px-4 py-2.5 text-sm font-semibold text-white/85 backdrop-blur-sm transition-colors hover:border-gold/55"
              >
                WhatsApp us
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

import Link from "next/link";
import SignatureGallery from "@/components/SignatureGallery";
import type { SiteContent, SignatureFeature } from "@/lib/content-types";

function FeatureIcon({ icon }: { icon: SignatureFeature["icon"] }) {
  if (icon === "hiker") {
    return (
      <svg viewBox="0 0 48 48" className="h-8 w-8 sm:h-9 sm:w-9" fill="none" aria-hidden="true">
        <circle cx="24" cy="10" r="3.2" stroke="currentColor" strokeWidth="1.7" />
        <path
          d="M20 16.5h8l2.2 8.2-4.1 2.1 2.6 12.2h-3.2l-2.2-9.4-1.6 1.6-2.8 7.8h-3.1l3.4-9.4-3.4-4.2 4.2-2.1L20 16.5Z"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
        <path d="M14 40.5h6.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    );
  }
  if (icon === "peaks") {
    return (
      <svg viewBox="0 0 48 48" className="h-8 w-8 sm:h-9 sm:w-9" fill="none" aria-hidden="true">
        <path
          d="m6 36 10.5-16 5.2 7.4L30 14l12 22H6Z"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
        <path d="m21.5 27.4 3.2-4.4 3.6 5.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 48 48" className="h-8 w-8 sm:h-9 sm:w-9" fill="none" aria-hidden="true">
      <path
        d="M10 36V20.5L24 12l14 8.5V36"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path d="M18 36V26h12v10" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M14 20.8 24 15l10 5.8" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

type Props = {
  content: SiteContent["signature"];
};

export default function SignatureSection({ content }: Props) {
  if (!content.visible) return null;

  return (
    <section className="relative text-white">
      <div className="relative mx-auto max-w-[88rem] px-4 pb-5 pt-8 sm:px-8 sm:pb-6 sm:pt-11 lg:px-10 lg:pb-7 lg:pt-12">
        <div className="grid items-center gap-7 md:gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.15fr)] lg:gap-10 xl:gap-12">
          <div className="hl-panel max-w-xl rounded-[1.25rem] border border-gold/30 px-5 py-6 sm:px-7 sm:py-7">
            <div className="mb-3 flex items-center gap-3">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-gold sm:text-[0.7rem] sm:tracking-[0.18em]">
                {content.eyebrow}
              </p>
              <span className="hidden h-px flex-1 bg-gold/45 sm:block" aria-hidden="true" />
            </div>

            <h2 className="font-[family-name:var(--font-cormorant)] text-[clamp(1.85rem,6.5vw,3.4rem)] font-semibold leading-[1.1] tracking-tight">
              <span className="block text-white">{content.headlineWhite}</span>
              <span className="mt-1 block text-gold">{content.headlineGold}</span>
            </h2>

            <div className="mt-3.5 h-px w-12 bg-gold/75 sm:mt-4 sm:w-14" aria-hidden="true" />

            <p className="mt-3.5 max-w-md text-[0.9rem] leading-relaxed text-white/78 sm:mt-4 sm:text-[1rem]">
              {content.body}
            </p>

            <Link
              href={content.ctaHref || "/luxury-treks"}
              className="focus-ring mt-6 inline-flex items-center gap-2.5 border border-gold/85 bg-gold/10 px-4 py-2.5 text-[0.78rem] font-semibold tracking-[0.06em] text-gold transition-colors hover:border-gold hover:bg-gold/20 sm:mt-7 sm:px-5 sm:text-[0.82rem]"
            >
              {content.ctaLabel}
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          <SignatureGallery images={content.images} />
        </div>

        <div className="mt-8 border-t border-gold/25 pt-6 sm:mt-10 sm:pt-8">
          <ul className="grid gap-3 sm:grid-cols-3 sm:gap-4">
            {content.features.map((feature) => (
              <li
                key={feature.id}
                className="hl-card flex items-start gap-3 rounded-2xl border border-gold/30 px-4 py-4 sm:px-5"
              >
                <span className="mt-0.5 shrink-0 text-gold">
                  <FeatureIcon icon={feature.icon} />
                </span>
                <div>
                  <p className="text-[0.92rem] font-semibold text-white sm:text-[0.98rem]">
                    {feature.title}
                  </p>
                  <p className="mt-0.5 text-[0.8rem] text-white/60 sm:text-sm">
                    {feature.subtitle}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

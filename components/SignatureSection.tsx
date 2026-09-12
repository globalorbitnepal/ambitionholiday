import Link from "next/link";
import SignatureGallery from "@/components/SignatureGallery";
import type { SiteContent, SignatureFeature, SignatureHighlight } from "@/lib/content-types";

function FeatureIcon({ icon }: { icon: SignatureFeature["icon"] }) {
  if (icon === "hiker") {
    return (
      <svg viewBox="0 0 48 48" className="h-8 w-8" fill="none" aria-hidden="true">
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
      <svg viewBox="0 0 48 48" className="h-8 w-8" fill="none" aria-hidden="true">
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
    <svg viewBox="0 0 48 48" className="h-8 w-8" fill="none" aria-hidden="true">
      <path d="M10 36V20.5L24 12l14 8.5V36" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M18 36V26h12v10" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M14 20.8 24 15l10 5.8" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function HighlightIcon({ icon }: { icon: SignatureHighlight["icon"] }) {
  if (icon === "compass") {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="8.2" stroke="currentColor" strokeWidth="1.5" />
        <path d="m14.7 9.3-1.4 4.1-4.1 1.4 1.4-4.1 4.1-1.4Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      </svg>
    );
  }
  if (icon === "heart") {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
        <path
          d="M12 19s-6.2-3.9-8.1-7.2C2.5 9.4 3.4 6.6 6.2 6.1c1.6-.3 3 .5 3.8 1.7.8-1.2 2.2-2 3.8-1.7 2.8.5 3.7 3.3 2.3 5.7C18.2 15.1 12 19 12 19Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <path d="m3.5 18.5 5.4-8.4 2.7 3.8L16 7.5l4.5 11H3.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

type Props = {
  content: SiteContent["signature"];
};

export default function SignatureSection({ content }: Props) {
  if (!content.visible) return null;

  return (
    <section className="signature-section relative text-white">
      <div className="relative mx-auto max-w-[90rem] px-4 pb-6 pt-8 sm:px-8 sm:pb-8 sm:pt-10 lg:px-10 lg:pb-9 lg:pt-12">
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.18fr)] lg:gap-8 xl:gap-10">
          <div className="sig-copy rounded-[1.7rem] border border-[#d7b24a]/55 px-6 py-7 sm:px-8 sm:py-8 lg:px-9 lg:py-9">
            <div className="mb-4 flex items-center gap-3">
              <span className="text-[#e0c45a]" aria-hidden="true">
                <HighlightIcon icon="peaks" />
              </span>
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[#e0c45a] sm:text-[0.72rem]">
                {content.eyebrow}
              </p>
              <span className="h-px flex-1 bg-[#d7b24a]/55" aria-hidden="true" />
            </div>

            <h2 className="sig-display text-[clamp(2.15rem,4.8vw,3.65rem)] font-semibold leading-[1.06] tracking-[-0.02em]">
              <span className="block text-[#f7f3ea]">{content.headlineWhite}</span>
              <span className="mt-1 block max-w-[8.6em] text-[#e4c35a]">{content.headlineGold}</span>
            </h2>

            <p className="mt-5 max-w-[34rem] text-[0.92rem] leading-[1.7] text-[#efe9dc] sm:text-[0.98rem]">
              {content.body}
            </p>

            <Link
              href={content.ctaHref || "/luxury-treks"}
              className="focus-ring mt-7 inline-flex items-center gap-3 rounded-full border border-[#e0c45a] bg-transparent px-5 py-2.5 text-[0.9rem] font-semibold text-[#e4c35a] transition-colors hover:bg-[#e0c45a]/12"
            >
              {content.ctaLabel}
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-[#e0c45a]">
                <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
                  <path d="M7.2 4.8 12.4 10 7.2 15.2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                </svg>
              </span>
            </Link>

            {content.highlights?.length ? (
              <ul className="mt-8 flex flex-wrap items-start gap-x-6 gap-y-4 border-t border-white/10 pt-5 sm:gap-x-8">
                {content.highlights.map((item, index) => (
                  <li key={item.id} className="flex items-start gap-2.5">
                    {index > 0 ? (
                      <span className="mr-1 hidden h-10 w-px bg-white/15 sm:block" aria-hidden="true" />
                    ) : null}
                    <span className="mt-0.5 text-[#e0c45a]">
                      <HighlightIcon icon={item.icon} />
                    </span>
                    <span>
                      <span className="block text-[0.92rem] font-semibold leading-tight text-white">{item.title}</span>
                      <span className="mt-0.5 block text-[0.72rem] leading-tight text-white/60">{item.subtitle}</span>
                    </span>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          <SignatureGallery images={content.images} />
        </div>

        <ul className="mt-7 grid gap-3 sm:mt-8 sm:grid-cols-3 sm:gap-4">
          {content.features.map((feature) => (
            <li key={feature.id}>
              <Link
                href={feature.href || content.ctaHref || "/luxury-treks"}
                className="sig-chip group flex items-center gap-3.5 rounded-full border border-[#d7b24a]/45 px-4 py-3.5 sm:px-5"
              >
                <span className="shrink-0 text-[#e0c45a]">
                  <FeatureIcon icon={feature.icon} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[0.95rem] font-semibold leading-tight text-white sm:text-[1rem]">
                    {feature.title}
                  </span>
                  <span className="mt-0.5 block text-[0.78rem] leading-tight text-white/58 sm:text-[0.82rem]">
                    {feature.subtitle}
                  </span>
                </span>
                <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#e0c45a]/75 text-[#e0c45a] transition-colors group-hover:bg-[#e0c45a]/12">
                  <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
                    <path d="M7.2 4.8 12.4 10 7.2 15.2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                  </svg>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

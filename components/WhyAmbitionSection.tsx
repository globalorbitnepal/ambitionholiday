import Link from "next/link";
import { useSiteContent } from "@/components/SiteContentProvider";
import MediaImage from "@/components/MediaImage";
import { mediaSrc } from "@/lib/media-src";
import type { WhyCardIcon, WhyRating } from "@/lib/content-types";

function GoldRing({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex h-[3.35rem] w-[3.35rem] shrink-0 items-center justify-center rounded-full border border-[#e0c45a] bg-black/35 text-[#e4c35a] shadow-[0_0_18px_rgba(201,162,39,0.28)]">
      {children}
    </span>
  );
}

function CardIcon({ icon, iconSrc }: { icon: WhyCardIcon; iconSrc?: string }) {
  const cls = "h-6 w-6";
  if ((icon === "custom" || iconSrc) && iconSrc) {
    return (
      <GoldRing>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={mediaSrc(iconSrc)} alt="" className="h-6 w-6 object-contain" />
      </GoldRing>
    );
  }
  if (icon === "years") {
    return (
      <GoldRing>
        <svg viewBox="0 0 24 24" className={cls} fill="none" aria-hidden="true">
          <path d="M5.8 8.2h12.4L16.6 11H7.4L5.8 8.2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M7.6 11h8.8v7.2H7.6V11Z" stroke="currentColor" strokeWidth="1.5" />
          <path d="M12 4.8 13.6 8H10.4L12 4.8Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      </GoldRing>
    );
  }
  if (icon === "tripadvisor") {
    return (
      <GoldRing>
        <svg viewBox="0 0 24 24" className={cls} fill="none" aria-hidden="true">
          <circle cx="8.2" cy="13.2" r="3.1" stroke="currentColor" strokeWidth="1.6" />
          <circle cx="15.8" cy="13.2" r="3.1" stroke="currentColor" strokeWidth="1.6" />
          <path d="M5.4 13.2h2.8M15.8 10.1V7.6h2.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </GoldRing>
    );
  }
  if (icon === "guide") {
    return (
      <GoldRing>
        <svg viewBox="0 0 24 24" className={cls} fill="none" aria-hidden="true">
          <circle cx="12" cy="6.2" r="2" stroke="currentColor" strokeWidth="1.6" />
          <path
            d="M9.6 10.2h4.8l1.4 5.2-2.6 1.3 1.6 5.1h-2l-1.4-4.1-.9.8-1.7 3.3H7.6l2-4.2-2.1-2.4 2.6-1.3 1.1-3.7Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      </GoldRing>
    );
  }
  if (icon === "stay") {
    return (
      <GoldRing>
        <svg viewBox="0 0 24 24" className={cls} fill="none" aria-hidden="true">
          <path d="M4 18V12.2h16V18" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M4 18h16M7 12.2V9.4c0-1.6 1.8-2.8 5-2.8s5 1.2 5 2.8v2.8" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      </GoldRing>
    );
  }
  if (icon === "support") {
    return (
      <GoldRing>
        <svg viewBox="0 0 24 24" className={cls} fill="none" aria-hidden="true">
          <path d="M5.8 11.2V10a6.2 6.2 0 0 1 12.4 0v1.2" stroke="currentColor" strokeWidth="1.6" />
          <rect x="4.2" y="11" width="3.4" height="5.2" rx="1.2" stroke="currentColor" strokeWidth="1.5" />
          <rect x="16.4" y="11" width="3.4" height="5.2" rx="1.2" stroke="currentColor" strokeWidth="1.5" />
          <path d="M18.1 16.2v.7a4.1 4.1 0 0 1-4.1 4.1h-.8" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </GoldRing>
    );
  }
  return (
    <GoldRing>
      <svg viewBox="0 0 24 24" className={cls} fill="none" aria-hidden="true">
        <path d="M12 20s-4.2-2.5-6.4-6.1C4.2 11.6 5.2 8.7 8 8.2c1.5-.3 2.8.5 3.5 1.7.7-1.2 2-2 3.5-1.7 2.8.5 3.8 3.4 2.4 5.7C16.2 17.5 12 20 12 20Z" stroke="currentColor" strokeWidth="1.55" strokeLinejoin="round" />
      </svg>
    </GoldRing>
  );
}

function Stars() {
  return (
    <span className="flex items-center justify-center gap-0.5 text-[#e4c35a]" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" className="h-3 w-3 fill-current">
          <path d="M10 1.8 12.3 7l5.7.6-4.3 3.7 1.3 5.6L10 14.4 4.99 16.9l1.32-5.6L2 7.6 7.7 7 10 1.8Z" />
        </svg>
      ))}
    </span>
  );
}

function GoogleMark() {
  return (
    <svg viewBox="0 0 24 24" className="h-8 w-8" aria-hidden="true">
      <path fill="#4285F4" d="M22.5 12.27c0-.78-.07-1.53-.2-2.25H12v4.26h5.9a5.05 5.05 0 0 1-2.19 3.32v2.76h3.54c2.07-1.91 3.25-4.72 3.25-8.09Z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.64l-3.54-2.76c-.98.66-2.23 1.05-3.74 1.05-2.87 0-5.3-1.94-6.17-4.54H2.18v2.85A10.99 10.99 0 0 0 12 23Z" />
      <path fill="#FBBC05" d="M5.83 13.11A6.61 6.61 0 0 1 5.48 12c0-.39.07-.76.12-1.11V8.04H2.18A11 11 0 0 0 1 12c0 1.78.43 3.46 1.18 4.96l3.65-3.85Z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.07.56 4.21 1.64l3.16-3.16C17.45 2.09 14.97 1 12 1 7.31 1 3.26 3.69 2.18 8.04l3.65 2.85C6.7 7.32 9.13 5.38 12 5.38Z" />
    </svg>
  );
}

function FacebookMark() {
  return (
    <svg viewBox="0 0 24 24" className="h-8 w-8" aria-hidden="true">
      <circle cx="12" cy="12" r="11" fill="#1877F2" />
      <path fill="#fff" d="M13.4 19.2v-6.3h2.1l.3-2.5h-2.4V8.8c0-.7.2-1.2 1.3-1.2h1.3V5.3c-.2 0-1-.1-1.9-.1-1.9 0-3.2 1.2-3.2 3.3v1.9H8.6v2.5h2.3v6.3h2.5Z" />
    </svg>
  );
}

function InstagramMark() {
  return (
    <svg viewBox="0 0 24 24" className="h-8 w-8" aria-hidden="true">
      <defs>
        <radialGradient id="ig-why" cx="30%" cy="107%" r="150%">
          <stop offset="0%" stopColor="#fdf497" />
          <stop offset="45%" stopColor="#fd5949" />
          <stop offset="60%" stopColor="#d6249f" />
          <stop offset="90%" stopColor="#285AEB" />
        </radialGradient>
      </defs>
      <rect x="2" y="2" width="20" height="20" rx="5.5" fill="url(#ig-why)" />
      <rect x="7" y="7" width="10" height="10" rx="5" fill="none" stroke="#fff" strokeWidth="1.7" />
      <circle cx="17.2" cy="6.8" r="1.05" fill="#fff" />
    </svg>
  );
}

function RatingLogo({ rating }: { rating: WhyRating }) {
  if (rating.logoSrc) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={rating.logoSrc} alt="" className="h-8 w-8 object-contain" />
    );
  }
  if (rating.brand === "tripadvisor") {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src="/images/icons/tripadvisor.png" alt="" className="h-8 w-8 object-contain brightness-0 invert" />
    );
  }
  if (rating.brand === "google") return <GoogleMark />;
  if (rating.brand === "facebook") return <FacebookMark />;
  return <InstagramMark />;
}

export default function WhyAmbitionSection() {
  const { why } = useSiteContent();
  if (!why?.visible) return null;

  const paragraphs = why.body.split("\n").filter(Boolean);

  return (
    <section className="why-section relative px-4 pb-10 pt-10 sm:px-8 sm:pb-12 sm:pt-12 lg:px-10">
      <div className="mx-auto max-w-[90rem]">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-3 flex flex-col items-center">
            <svg viewBox="0 0 48 24" className="mb-2 h-5 w-10 text-[#e4c35a]" fill="none" aria-hidden="true">
              <path d="m4 20 10.5-14 5 7.2L25 6l19 14H4Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
            </svg>
            <div className="flex items-center justify-center gap-4">
              <span className="h-px w-12 bg-[#e0c45a]/70 sm:w-16" aria-hidden="true" />
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.26em] text-[#e4c35a]">
                {why.eyebrow}
              </p>
              <span className="h-px w-12 bg-[#e0c45a]/70 sm:w-16" aria-hidden="true" />
            </div>
          </div>
          <h2 className="why-display text-[clamp(2.1rem,5.2vw,3.6rem)] font-semibold leading-[1.08] tracking-[-0.02em]">
            <span className="text-white">{why.headlineWhite} </span>
            <span className="text-[#e4c35a]">{why.headlineGold}</span>
          </h2>
          <div className="mx-auto mt-4 max-w-3xl space-y-2 text-[0.9rem] leading-relaxed text-[#efe9dc]/88 sm:text-[0.98rem]">
            {paragraphs.map((line) => (
              <p key={line.slice(0, 24)}>{line}</p>
            ))}
          </div>
          <Link
            href={why.ctaHref || "/about-us"}
            className="focus-ring mt-6 inline-flex items-center gap-2 rounded-full border border-[#e0c45a] bg-black/35 px-5 py-2.5 text-[0.9rem] font-semibold text-[#e4c35a] backdrop-blur-md transition-colors hover:bg-[#e0c45a]/12"
          >
            {why.ctaLabel}
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="mt-9 flex gap-3 overflow-x-auto pb-2 [scrollbar-width:none] snap-x snap-mandatory sm:grid sm:grid-cols-2 sm:overflow-visible sm:pb-0 lg:grid-cols-3 2xl:grid-cols-6 xl:gap-3.5 [&::-webkit-scrollbar]:hidden">
          {why.cards?.map((card) => (
            <article key={card.id} className="why-card group relative flex h-full min-w-[78vw] snap-center flex-col overflow-hidden rounded-[1.35rem] border border-[#e0c45a]/80 sm:min-w-0">
              <div className="relative aspect-[3/4.15] w-full min-h-[22rem]">
                <MediaImage
                  src={card.imageSrc}
                  alt={card.imageAlt}
                  sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 16vw"
                  quality={86}
                  className="object-cover"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, #0c0906 0%, rgba(12,9,6,0.94) 38%, rgba(12,9,6,0.2) 58%, transparent 76%)",
                  }}
                />
                <div className="absolute inset-x-0 bottom-0 grid grid-rows-[3.35rem_3.9rem_5.1rem_2rem] justify-items-center gap-y-2.5 px-3 pb-4 pt-16 text-center">
                  <div className="flex h-[3.35rem] w-[3.35rem] shrink-0 items-center justify-center">
                    <CardIcon icon={card.icon} iconSrc={card.iconSrc} />
                  </div>
                  <h3 className="flex h-full w-full items-center justify-center text-[1.02rem] font-semibold leading-snug text-white sm:text-[1.06rem]">
                    {card.title}
                  </h3>
                  <p className="line-clamp-4 h-full w-full text-[0.72rem] leading-relaxed text-white/78 sm:text-[0.74rem]">
                    {card.body}
                  </p>
                  <Link
                    href={card.href || "/about-us"}
                    className="focus-ring inline-flex h-full items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[#e4c35a] hover:text-[#f0d36a]"
                  >
                    {card.ctaLabel || "LEARN MORE"}
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-[#e0c45a]/80">
                      <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" aria-hidden="true">
                        <path d="M5 12h12M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                      </svg>
                    </span>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="why-bar mt-8 rounded-[1.35rem] border border-[#e0c45a]/70 px-5 py-5 sm:px-7 sm:py-6">
          <div className="flex flex-col items-center justify-between gap-7 lg:flex-row lg:items-center lg:gap-10">
            <div className="flex max-w-xl items-center gap-4">
              <svg viewBox="0 0 48 24" className="h-8 w-14 shrink-0 text-[#e4c35a]" fill="none" aria-hidden="true">
                <path d="m4 20 10.5-14 5 7.2L25 6l19 14H4Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
              </svg>
              <div>
                <p className="text-[1.02rem] font-semibold text-white">{why.awardTitle}</p>
                <p className="mt-1 text-[0.82rem] leading-relaxed text-white/70">{why.awardSubtitle}</p>
              </div>
            </div>

            <div className="grid w-full max-w-2xl grid-cols-2 gap-5 sm:grid-cols-4 sm:gap-6">
              {why.ratings?.map((rating) => (
                <div key={rating.id} className="flex flex-col items-center gap-1.5 text-center">
                  <RatingLogo rating={rating} />
                  <p className="text-[0.72rem] font-semibold tracking-wide text-white/90">{rating.label}</p>
                  <Stars />
                  <p className="text-[0.7rem] text-white/60">{rating.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

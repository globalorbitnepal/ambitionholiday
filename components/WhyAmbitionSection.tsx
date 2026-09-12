import Link from "next/link";
import { useSiteContent } from "@/components/SiteContentProvider";
import MediaImage from "@/components/MediaImage";
import type { WhyCardIcon, WhyRating } from "@/lib/content-types";

function CircleIcon({ children }: { children: React.ReactNode }) {
  return (
    <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full border border-gold/80 text-gold sm:h-12 sm:w-12">
      {children}
    </span>
  );
}

function CardIcon({ icon, iconSrc }: { icon: WhyCardIcon; iconSrc?: string }) {
  const cls = "h-5 w-5 sm:h-[1.35rem] sm:w-[1.35rem]";
  if (icon === "years") {
    return (
      <CircleIcon>
        <svg viewBox="0 0 24 24" className={cls} fill="none" aria-hidden="true">
          <path d="m4 18 6.2-9.4 3 4.3L16.2 8 20 18H4Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M15.2 8.2 16.4 6.4l1.7.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </CircleIcon>
    );
  }
  if (icon === "tripadvisor") {
    return (
      <CircleIcon>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={iconSrc || "/images/icons/tripadvisor.png"} alt="" className="h-6 w-6 object-contain" />
      </CircleIcon>
    );
  }
  if (icon === "custom" && iconSrc) {
    return (
      <CircleIcon>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={iconSrc} alt="" className="h-6 w-6 object-contain" />
      </CircleIcon>
    );
  }
  if (icon === "guide") {
    return (
      <CircleIcon>
        <svg viewBox="0 0 24 24" className={cls} fill="none" aria-hidden="true">
          <circle cx="12" cy="6.2" r="2" stroke="currentColor" strokeWidth="1.6" />
          <path
            d="M9.6 10.2h4.8l1.4 5.2-2.6 1.3 1.6 5.1h-2l-1.4-4.1-.9.8-1.7 3.3H7.6l2-4.2-2.1-2.4 2.6-1.3 1.1-3.7Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      </CircleIcon>
    );
  }
  if (icon === "stay") {
    return (
      <CircleIcon>
        <svg viewBox="0 0 24 24" className={cls} fill="none" aria-hidden="true">
          <path d="M4 18V11.5h16V18" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M4 18h16M6.5 11.5V8.8c0-1.7 1.6-3.1 5.5-3.1s5.5 1.4 5.5 3.1v2.7" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      </CircleIcon>
    );
  }
  if (icon === "support") {
    return (
      <CircleIcon>
        <svg viewBox="0 0 24 24" className={cls} fill="none" aria-hidden="true">
          <path
            d="M5.8 11.2V10a6.2 6.2 0 0 1 12.4 0v1.2"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <rect x="4.2" y="11" width="3.4" height="5.2" rx="1.2" stroke="currentColor" strokeWidth="1.5" />
          <rect x="16.4" y="11" width="3.4" height="5.2" rx="1.2" stroke="currentColor" strokeWidth="1.5" />
          <path d="M18.1 16.2v.7a4.1 4.1 0 0 1-4.1 4.1h-.8" stroke="currentColor" strokeWidth="1.5" />
          <text x="12" y="13.6" textAnchor="middle" fontSize="4.2" fill="currentColor" fontWeight="700">
            24/7
          </text>
        </svg>
      </CircleIcon>
    );
  }
  return (
    <CircleIcon>
      <svg viewBox="0 0 24 24" className={cls} fill="none" aria-hidden="true">
        <path
          d="M7.2 13.2c-1.6-1.7-.4-4.4 1.8-4.7 1-.2 2 .3 2.5 1.1.5-.8 1.5-1.3 2.5-1.1 2.2.3 3.4 3 .8 4.7L12 18.2 7.2 13.2Z"
          stroke="currentColor"
          strokeWidth="1.55"
          strokeLinejoin="round"
        />
        <path d="M12 10.6c.2 1 .2 1.8 0 2.7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    </CircleIcon>
  );
}

function Stars() {
  return (
    <span className="flex items-center justify-center gap-0.5 text-gold" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" className="h-3 w-3 fill-current sm:h-3.5 sm:w-3.5">
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
      <path
        fill="#fff"
        d="M13.4 19.2v-6.3h2.1l.3-2.5h-2.4V8.8c0-.7.2-1.2 1.3-1.2h1.3V5.3c-.2 0-1-.1-1.9-.1-1.9 0-3.2 1.2-3.2 3.3v1.9H8.6v2.5h2.3v6.3h2.5Z"
      />
    </svg>
  );
}

function InstagramMark() {
  return (
    <svg viewBox="0 0 24 24" className="h-8 w-8" aria-hidden="true">
      <defs>
        <radialGradient id="ig" cx="30%" cy="107%" r="150%">
          <stop offset="0%" stopColor="#fdf497" />
          <stop offset="5%" stopColor="#fdf497" />
          <stop offset="45%" stopColor="#fd5949" />
          <stop offset="60%" stopColor="#d6249f" />
          <stop offset="90%" stopColor="#285AEB" />
        </radialGradient>
      </defs>
      <rect x="2" y="2" width="20" height="20" rx="5.5" fill="url(#ig)" />
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
      <img src="/images/icons/tripadvisor.png" alt="" className="h-8 w-8 object-contain" />
    );
  }
  if (rating.brand === "google") return <GoogleMark />;
  if (rating.brand === "facebook") return <FacebookMark />;
  return <InstagramMark />;
}

export default function WhyAmbitionSection() {
  const { why } = useSiteContent();
  if (!why?.visible) return null;

  const words = why.headline.trim().split(/\s+/);
  const goldWords = words.length > 1 ? words.slice(-2).join(" ") : why.headline;
  const whiteWords = words.length > 1 ? words.slice(0, -2).join(" ") : "";

  return (
    <section className="relative border-t border-gold/20 px-4 pb-10 pt-10 sm:px-8 sm:pb-12 sm:pt-12 lg:px-10">
      <div className="mx-auto max-w-[88rem]">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-2 flex flex-col items-center">
            <svg viewBox="0 0 48 24" className="mb-2 h-5 w-10 text-gold" fill="none" aria-hidden="true">
              <path d="m4 20 10.5-14 5 7.2L25 6l19 14H4Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
            </svg>
            <div className="flex items-center justify-center gap-4">
              <span className="h-px w-10 bg-gold/70 sm:w-16" aria-hidden="true" />
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-gold sm:text-[0.72rem] sm:tracking-[0.26em]">
                {why.eyebrow}
              </p>
              <span className="h-px w-10 bg-gold/70 sm:w-16" aria-hidden="true" />
            </div>
          </div>
          <h2 className="font-[family-name:var(--font-cormorant)] text-[clamp(1.9rem,5.5vw,3.35rem)] font-semibold leading-[1.12] tracking-tight">
            {whiteWords ? <span className="text-white">{whiteWords} </span> : null}
            <span className="text-gold">{goldWords}</span>
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-[0.9rem] leading-relaxed text-white/80 sm:text-[1rem]">
            {why.body}
          </p>
        </div>

        <div className="relative z-0 mt-8 grid grid-cols-1 gap-3.5 overflow-visible sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 xl:gap-3.5">
          {why.cards?.map((card) => (
            <article
              key={card.id}
              className="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-[1.15rem] border border-gold/65 shadow-[0_18px_40px_rgba(0,0,0,0.32)]"
            >
              <div className="relative aspect-[3/4] w-full min-h-[19.5rem]">
                <MediaImage
                  src={card.imageSrc}
                  alt={card.imageAlt}
                  sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 18vw"
                  className="object-cover transition-transform duration-700 ease-out [@media(hover:hover)]:group-hover:scale-105"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-[#120e0a] via-[#120e0a]/90 to-black/10"
                />
                <div className="absolute inset-x-0 bottom-0 flex flex-col items-center px-3 pb-4 pt-16 text-center">
                  <CardIcon icon={card.icon} iconSrc={card.iconSrc} />
                  <h3 className="mt-3 font-[family-name:var(--font-cormorant)] text-[1.08rem] font-semibold leading-snug text-white sm:text-[1.14rem]">
                    {card.title}
                  </h3>
                  <p className="mt-2 min-h-[3.4rem] text-[0.72rem] leading-relaxed text-white/78 sm:text-[0.76rem]">
                    {card.body}
                  </p>
                  <Link
                    href={card.href || "/about-us"}
                    className="focus-ring mt-3 inline-flex items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-gold transition-colors hover:text-gold-soft"
                  >
                    {card.ctaLabel || "LEARN MORE"}
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-gold/80">
                      <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" aria-hidden="true">
                        <path d="M5 12h12M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 border-t border-gold/35 pt-6 sm:mt-10 sm:pt-7">
          <div className="flex flex-col items-center justify-between gap-7 lg:flex-row lg:items-center lg:gap-10">
            <div className="flex max-w-md items-center gap-3.5">
              <svg viewBox="0 0 64 64" className="h-12 w-12 shrink-0 text-gold sm:h-14 sm:w-14" fill="none" aria-hidden="true">
                <path
                  d="M18 46c3.4-6 8.2-10 14-10s10.6 4 14 10"
                  stroke="currentColor"
                  strokeWidth="1.6"
                />
                <path d="M20 22c-4 6-5 13-2 20M44 22c4 6 5 13 2 20" stroke="currentColor" strokeWidth="1.5" />
                <path d="M32 12v8M28 16h8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                <path
                  d="M25 28h14l-1.6 8H26.6L25 28Z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                />
                <path d="M28.5 36v6h7v-6" stroke="currentColor" strokeWidth="1.6" />
              </svg>
              <div>
                <p className="font-semibold text-gold">{why.awardTitle}</p>
                <p className="mt-0.5 text-sm text-white/70">{why.awardSubtitle}</p>
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


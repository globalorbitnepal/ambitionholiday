import Link from "next/link";
import { useSiteContent } from "@/components/SiteContentProvider";
import MediaImage from "@/components/MediaImage";
import type { AvailabilityRouteIcon } from "@/lib/content-types";

function RouteIcon({ icon, iconSrc }: { icon: AvailabilityRouteIcon; iconSrc?: string }) {
  const cls = "h-3.5 w-3.5 shrink-0 text-gold";
  if (icon === "custom" && iconSrc) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={iconSrc} alt="" className="h-3.5 w-3.5 object-contain" />
    );
  }
  if (icon === "temple") {
    return (
      <svg viewBox="0 0 24 24" className={cls} fill="none" aria-hidden="true">
        <path d="M12 3.8v1.6M8.2 8.2 12 5.6l3.8 2.6H8.2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M6.6 12h10.8L15.8 8.8H8.2L6.6 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M5.4 16h13.2l-1.7-3.2H7.1L5.4 16Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M9.6 16v2.8h4.8V16M6.2 19.2h11.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }
  if (icon === "trek") {
    return (
      <svg viewBox="0 0 24 24" className={cls} fill="none" aria-hidden="true">
        <circle cx="12" cy="6.2" r="1.8" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M9.8 10h4.4l1.3 4.8-2.4 1.2 1.5 4.8h-1.9l-1.3-3.8-.8.7-1.6 3.1H7.7l1.9-3.9-1.9-2.2 2.4-1.2L9.8 10Z"
          stroke="currentColor"
          strokeWidth="1.45"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  if (icon === "heli") {
    return (
      <svg viewBox="0 0 24 24" className={cls} fill="none" aria-hidden="true">
        <path d="M4 8.4h11.2M10.2 6.6v1.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path
          d="M6.6 13.8c0-2 1.5-3.4 3.6-3.4h3.2l2.5 3.4h2.4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path d="M6 16.8h10.4M8.2 13.8v3M14.8 13.8v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className={cls} fill="none" aria-hidden="true">
      <path
        d="m4 17.5 5.8-8.6 2.8 4L15.4 8l4.6 9.5H4Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PeopleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="mx-auto h-5 w-5 text-gold sm:h-6 sm:w-6" fill="none" aria-hidden="true">
      <circle cx="8.2" cy="8" r="2.1" stroke="currentColor" strokeWidth="1.45" />
      <circle cx="15.8" cy="8" r="2.1" stroke="currentColor" strokeWidth="1.45" />
      <circle cx="12" cy="7.2" r="2.3" stroke="currentColor" strokeWidth="1.45" />
      <path
        d="M4.4 18.2c.6-2.6 2.5-4 4.4-4s3.2.8 3.8 2.2"
        stroke="currentColor"
        strokeWidth="1.45"
        strokeLinecap="round"
      />
      <path
        d="M11.4 16.4c.6-1.8 2.2-2.8 3.9-2.8s3.6 1.2 4.3 3.6"
        stroke="currentColor"
        strokeWidth="1.45"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function AvailabilitySection() {
  const { availability } = useSiteContent();
  if (!availability?.visible) return null;

  return (
    <section className="relative border-t border-gold/15 px-4 pb-9 pt-5 sm:px-8 sm:pb-10 sm:pt-6 lg:px-10">
      <div className="mx-auto max-w-[88rem]">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-gold sm:text-[0.72rem]">
            {availability.eyebrow}
          </p>
          <span className="mx-auto mt-2 block h-1.5 w-1.5 rotate-45 bg-gold" aria-hidden="true" />
          <h2 className="mt-2.5 font-[family-name:var(--font-cormorant)] text-[clamp(1.85rem,5.4vw,3.25rem)] font-semibold leading-[1.1] tracking-tight">
            <span className="text-white">{availability.headlineBefore} </span>
            <span className="italic text-gold">{availability.headlineGold} </span>
            <span className="text-white">{availability.headlineAfter}</span>
          </h2>
          <p className="mx-auto mt-2.5 max-w-xl text-[0.88rem] leading-relaxed text-white/80 sm:text-[0.95rem]">
            {availability.body}
          </p>
        </div>

        <div className="relative z-0 mt-6 grid grid-cols-1 gap-4 overflow-visible md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {availability.cards?.map((card) => (
            <article
              key={card.id}
              className="avail-card-glow hl-card group flex h-full origin-center flex-col overflow-hidden rounded-[0.85rem] border border-emerald-500/40 transition-transform duration-500 ease-out [@media(hover:hover)]:hover:z-10 [@media(hover:hover)]:hover:scale-[1.02]"
            >
              {/* Full-bleed image to the top of the card */}
              <div className="relative aspect-[16/10] w-full overflow-hidden sm:aspect-[3/2]">
                <MediaImage
                  src={card.imageSrc}
                  alt={card.imageAlt}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out [@media(hover:hover)]:group-hover:scale-105"
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/55 via-black/15 to-black/35"
                  aria-hidden="true"
                />
                <div className="absolute left-3.5 top-3.5 z-10 inline-flex items-center gap-1.5 rounded-full border border-emerald-400/50 bg-black/45 px-2 py-1 backdrop-blur-sm sm:left-4 sm:top-4">
                  <span className="relative inline-flex h-2 w-2">
                    <span className="live-dot-pulse absolute inset-0 rounded-full bg-emerald-400" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)]" />
                  </span>
                  <span className="text-[0.58rem] font-semibold uppercase tracking-[0.14em] text-emerald-300">
                    Live
                  </span>
                </div>
                <div className="on-photo absolute inset-x-0 top-0 flex items-start justify-between gap-3 p-3.5 pt-10 sm:p-4 sm:pt-11">
                  <div>
                    <p className="font-[family-name:var(--font-cormorant)] text-[1.9rem] font-semibold leading-none tracking-wide text-gold drop-shadow sm:text-[2.15rem]">
                      {card.monthShort}
                    </p>
                    <p className="mt-0.5 font-[family-name:var(--font-cormorant)] text-[1rem] text-white drop-shadow sm:text-[1.08rem]">
                      {card.monthFull}
                    </p>
                  </div>
                  {card.badge ? (
                    <span className="rounded-sm border border-gold/80 bg-black/35 px-2 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-gold backdrop-blur-sm">
                      {card.badge}
                    </span>
                  ) : null}
                </div>
              </div>

              <div className="mt-3.5 flex flex-1 gap-3 px-4 pb-1 sm:gap-4 sm:px-5">
                <ul className="min-w-0 flex-1 space-y-2">
                  {(card.routes ?? []).map((route) => (
                    <li
                      key={route.id}
                      className="flex items-start gap-2 text-[0.78rem] leading-snug text-white/85 sm:text-[0.82rem]"
                    >
                      <RouteIcon icon={route.icon} iconSrc={route.iconSrc} />
                      <span>{route.label}</span>
                    </li>
                  ))}
                </ul>
                <div className="w-px shrink-0 bg-gold/40" aria-hidden="true" />
                <div className="flex w-[5.5rem] shrink-0 flex-col items-center justify-center text-center sm:w-[6rem]">
                  <PeopleIcon />
                  <p className="mt-1 font-[family-name:var(--font-cormorant)] text-[2rem] font-semibold leading-none text-gold sm:text-[2.2rem]">
                    {card.availableCount}
                  </p>
                  <p className="mt-1.5 text-[0.56rem] font-semibold uppercase leading-tight tracking-[0.08em] text-gold sm:text-[0.6rem]">
                    {card.availableLabel}
                  </p>
                </div>
              </div>

              <div className="mt-auto px-4 pb-4 pt-3 sm:px-5">
                <Link
                  href={card.ctaHref || "/luxury-treks"}
                  className="focus-ring inline-flex w-full items-center justify-center gap-2 border border-gold/80 px-3 py-2.5 text-[0.72rem] font-semibold tracking-[0.08em] text-gold transition-colors hover:border-emerald-300/70 hover:bg-emerald-400/10 hover:text-white"
                >
                  {card.ctaLabel} <span aria-hidden="true">→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

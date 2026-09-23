"use client";

import Link from "next/link";
import { useSiteContent } from "@/components/SiteContentProvider";
import type { FooterSocialNetwork } from "@/lib/content-types";
import { mediaSrc } from "@/lib/media-src";

/** Shared mark size — slightly smaller on phones so 5 logos never crop/scroll */
const TRUST_H = "h-10 sm:h-[2.88rem]";
const TRUST_W = "w-10 sm:w-[2.88rem]";
const TRUST_W_CARD = "w-[3.35rem] sm:w-[4.55rem]";
const TRUST_ICON = "h-7 w-7 sm:h-[2.15rem] sm:w-[2.15rem]";

function PeakMark({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path
        d="m3.5 17.5 5.4-8.2 3.2 4.4 2.6-3.6L20.5 17.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path d="M4 19.2h16" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function SocialIcon({ network }: { network: FooterSocialNetwork }) {
  /* Fills trust mark so social matches Members / Payments height */
  const cls = TRUST_ICON;
  if (network === "facebook") {
    return (
      <svg viewBox="0 0 24 24" className={cls} fill="currentColor" aria-hidden="true">
        <path d="M14.5 8.5V7.2c0-.7.1-1.1 1.2-1.1H17V4h-2.1C12.3 4 11 5.4 11 7.6v.9H9v2.3h2V20h3.5v-8.2h2.3l.4-2.3h-2.7Z" />
      </svg>
    );
  }
  if (network === "twitter") {
    return (
      <svg viewBox="0 0 24 24" className={cls} fill="currentColor" aria-hidden="true">
        <path d="M6.2 5.5h3l3.2 4.5L16.2 5.5H19l-4.6 5.9L19.4 18.5h-3l-3.5-4.9-4 4.9H6l4.9-6L6.2 5.5Z" />
      </svg>
    );
  }
  if (network === "instagram") {
    return (
      <svg viewBox="0 0 24 24" className={cls} fill="none" aria-hidden="true">
        <rect x="4.5" y="4.5" width="15" height="15" rx="4" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="3.4" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="16.4" cy="7.6" r="0.9" fill="currentColor" />
      </svg>
    );
  }
  if (network === "youtube") {
    return (
      <svg viewBox="0 0 24 24" className={cls} fill="currentColor" aria-hidden="true">
        <path d="M20.2 8.2a2.4 2.4 0 0 0-1.7-1.7C17 6.2 12 6.2 12 6.2s-5 0-6.5.3A2.4 2.4 0 0 0 3.8 8.2 25 25 0 0 0 3.5 12a25 25 0 0 0 .3 3.8 2.4 2.4 0 0 0 1.7 1.7c1.5.3 6.5.3 6.5.3s5 0 6.5-.3a2.4 2.4 0 0 0 1.7-1.7A25 25 0 0 0 20.5 12a25 25 0 0 0-.3-3.8ZM10.5 14.8V9.2L14.8 12l-4.3 2.8Z" />
      </svg>
    );
  }
  if (network === "linkedin") {
    return (
      <svg viewBox="0 0 24 24" className={cls} fill="currentColor" aria-hidden="true">
        <path d="M7.2 9.2H4.8V19h2.4V9.2ZM6 4.6a1.4 1.4 0 1 0 0 2.8 1.4 1.4 0 0 0 0-2.8ZM19.2 12.4c0-2.2-1.2-3.6-3.4-3.6-1.1 0-1.9.5-2.3 1.1V9.2h-2.4c0 .7 0 9.8 0 9.8h2.4v-5.5c0-.3 0-.6.1-.8.3-.6.9-1.2 1.9-1.2 1.3 0 1.9 1 1.9 2.5V19h2.4v-6.6Z" />
      </svg>
    );
  }
  return <PeakMark className={cls} />;
}

/** Clean panoramic art — natural aspect, full width, no stretch/crop */
function FooterLandscape({
  src,
  updatedAt,
}: {
  src: string;
  updatedAt: string;
}) {
  return (
    <div className="relative w-full overflow-hidden bg-[#1a140c]" aria-hidden="true">
      {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={mediaSrc(src)}
          alt=""
          loading="lazy"
          decoding="async"
          className="block h-auto w-full max-w-none object-contain object-center"
        />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-4 bg-gradient-to-b from-[#1a140c] to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-3 bg-gradient-to-t from-[#12161c]/60 to-transparent" />
    </div>
  );
}

function ColumnTitle({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-3 flex items-center gap-2 text-gold">
        {children}
        <h3 className="font-[family-name:var(--font-cormorant)] text-[1.1rem] font-semibold uppercase tracking-[0.1em]">
          {title}
        </h3>
      </div>
    </div>
  );
}

function ChevronLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href || "#"}
      prefetch={false}
      className="group flex items-start gap-2 text-[0.86rem] font-semibold text-white/80 transition-colors hover:text-gold"
    >
      <span className="mt-[0.15rem] text-gold/90 transition-transform group-hover:translate-x-0.5" aria-hidden="true">
        ›
      </span>
      <span>{label}</span>
    </Link>
  );
}

/** Brand / payment chip */
function BrandChip({
  label,
  imageSrc,
  href,
  updatedAt,
  framed,
  wide,
}: {
  label: string;
  imageSrc: string;
  href: string;
  updatedAt: string;
  /** White plate + ~5% padding so dark logos stay clear */
  framed?: boolean;
  wide?: boolean;
}) {
  if (imageSrc) {
    const size = `${TRUST_H} ${wide ? TRUST_W_CARD : TRUST_W}`;
    return (
      <Link
        href={href || "#"}
        className={
          framed
            ? `${size} inline-flex shrink-0 items-center justify-center overflow-hidden rounded-[0.3rem] bg-white p-[3px] transition-opacity hover:opacity-90`
            : `${size} inline-flex shrink-0 items-center justify-center overflow-hidden rounded-[0.3rem] transition-opacity hover:opacity-90`
        }
        title={label}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={mediaSrc(imageSrc, updatedAt)}
          alt={label}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-contain object-center"
        />
      </Link>
    );
  }

  return (
    <Link
      href={href || "#"}
      className={`${TRUST_H} inline-flex items-center justify-center px-1 transition-opacity hover:opacity-85`}
      title={label}
    >
      <span className="px-1 text-[0.62rem] font-bold tracking-wide text-white/80">{label}</span>
    </Link>
  );
}

export default function SiteFooter() {
  const { footer, header, updatedAt } = useSiteContent();
  if (!footer?.visible) return null;

  const logoSrc = footer.logoSrc || header.logoSrc || "/images/ambition-holiday-logo.webp";

  function scrollTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <footer className="relative border-t border-gold/25 bg-transparent text-white">
      <div className="border-b border-gold/25 bg-black/30 backdrop-blur-md">
        <div className="mx-auto grid max-w-[88rem] grid-cols-1 gap-4 px-4 py-3.5 sm:px-8 lg:grid-cols-3 lg:gap-0 lg:px-10 lg:py-4">
          <div className="lg:border-r lg:border-gold/15 lg:pr-6">
            <div className="mb-2 flex flex-col items-center text-center">
              <PeakMark className="mb-1 h-3.5 w-3.5 text-gold" />
              <p className="text-[0.62rem] font-bold uppercase tracking-[0.16em] text-gold">
                {footer.membersTitle}
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
              {(footer.members ?? []).map((m) => (
                <BrandChip
                  key={m.id}
                  label={m.label}
                  imageSrc={m.imageSrc}
                  href={m.href}
                  updatedAt={updatedAt}
                />
              ))}
            </div>
          </div>

          <div className="lg:border-r lg:border-gold/15 lg:px-6">
            <div className="mb-2 flex flex-col items-center text-center">
              <PeakMark className="mb-1 h-3.5 w-3.5 text-gold" />
              <p className="text-[0.62rem] font-bold uppercase tracking-[0.16em] text-gold">
                {footer.socialTitle}
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
              {(footer.socials ?? []).map((s) => (
                <Link
                  key={s.id}
                  href={s.href || "#"}
                  aria-label={s.label}
                  className={`${TRUST_H} ${TRUST_W} flex items-center justify-center rounded text-white/85 transition-colors hover:text-gold`}
                >
                  {s.iconSrc ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={mediaSrc(s.iconSrc, updatedAt)}
                      alt=""
                      className={`${TRUST_ICON} object-contain`}
                    />
                  ) : (
                    <SocialIcon network={s.network} />
                  )}
                </Link>
              ))}
            </div>
          </div>

          <div className="lg:pl-6">
            <div className="mb-2 flex flex-col items-center text-center">
              <PeakMark className="mb-1 h-3.5 w-3.5 text-gold" />
              <p className="text-[0.62rem] font-bold uppercase tracking-[0.16em] text-gold">
                {footer.paymentsTitle}
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2.5">
              {(footer.payments ?? []).map((p) => (
                <BrandChip
                  key={p.id}
                  label={p.label}
                  imageSrc={p.imageSrc}
                  href={p.href}
                  updatedAt={updatedAt}
                  wide
                />
              ))}
              <Link
                href={footer.payNowHref || "#"}
                className={`inline-flex ${TRUST_H} items-center gap-1.5 rounded border border-gold/70 px-2.5 text-[0.68rem] font-semibold tracking-wide text-gold transition-colors hover:bg-gold/10`}
              >
                <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" aria-hidden="true">
                  <rect x="5" y="10" width="14" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
                  <path d="M8 10V8a4 4 0 0 1 8 0v2" stroke="currentColor" strokeWidth="1.4" />
                </svg>
                {footer.payNowLabel}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {footer.showLandscape ? (
        <FooterLandscape
          src={footer.landscapeImageSrc || "/images/footer/ambition-art-hq.webp"}
          updatedAt={updatedAt}
        />
      ) : null}

      {/* Main columns */}
      <div className="mx-auto max-w-[88rem] px-4 pb-8 pt-8 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
          <div className="space-y-3 lg:border-r lg:border-gold/15 lg:pr-5">
            <ColumnTitle title={footer.helpTitle}>
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
                <path
                  d="M5 14v-2a7 7 0 0 1 14 0v2"
                  stroke="currentColor"
                  strokeWidth="1.4"
                />
                <rect x="3.5" y="13" width="4" height="6" rx="1" stroke="currentColor" strokeWidth="1.4" />
                <rect x="16.5" y="13" width="4" height="6" rx="1" stroke="currentColor" strokeWidth="1.4" />
                <path d="M12 19v2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </ColumnTitle>
            <p className="text-[0.84rem] font-semibold leading-relaxed text-white/85">{footer.helpBody}</p>
            <div className="space-y-1.5 pt-1">
              {(footer.phones ?? []).map((p) => (
                <a
                  key={p.id}
                  href={p.href || "#"}
                  className="flex items-center gap-2 text-[0.86rem] font-semibold text-white/90 hover:text-gold"
                >
                  <span className="text-gold" aria-hidden="true">
                    ☎
                  </span>
                  {p.label}
                </a>
              ))}
              <a
                href={footer.emailHref || `mailto:${footer.email}`}
                className="flex items-center gap-2 text-[0.86rem] font-semibold text-white/90 hover:text-gold"
              >
                <span className="text-gold" aria-hidden="true">
                  ✉
                </span>
                {footer.email}
              </a>
              <p className="flex items-start gap-2 text-[0.8rem] font-semibold text-white/70">
                <span className="text-gold" aria-hidden="true">
                  ◷
                </span>
                {footer.hours}
              </p>
            </div>
          </div>

          <div className="space-y-2.5 lg:border-r lg:border-gold/15 lg:px-5">
            <ColumnTitle title={footer.usefulTitle}>
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
                <path
                  d="M9.5 7.5 7 10l2.5 2.5M14.5 7.5 17 10l-2.5 2.5"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
                <path d="M10.5 14.5 13.5 5.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </ColumnTitle>
            {(footer.usefulLinks ?? []).map((l) => (
              <ChevronLink key={l.id} href={l.href} label={l.label} />
            ))}
          </div>

          <div className="space-y-2.5 lg:border-r lg:border-gold/15 lg:px-5">
            <ColumnTitle title={footer.adventuresTitle}>
              <PeakMark className="h-4 w-4" />
            </ColumnTitle>
            {(footer.adventureLinks ?? []).map((l) => (
              <ChevronLink key={l.id} href={l.href} label={l.label} />
            ))}
          </div>

          <div className="space-y-2.5 lg:border-r lg:border-gold/15 lg:px-5">
            <ColumnTitle title={footer.treksTitle}>
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
                <circle cx="12" cy="12" r="7.5" stroke="currentColor" strokeWidth="1.4" />
                <path d="M12 8.2V12l2.8 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </ColumnTitle>
            {(footer.trekLinks ?? []).map((l) => (
              <ChevronLink key={l.id} href={l.href} label={l.label} />
            ))}
          </div>

          <div className="space-y-3">
            <ColumnTitle title={footer.newsletterTitle}>
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
                <path
                  d="M4.5 6.5 12 12l7.5-5.5"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinejoin="round"
                />
                <rect x="4" y="6" width="16" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
              </svg>
            </ColumnTitle>
            <form
              className="flex gap-2"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <input
                type="email"
                placeholder={footer.newsletterPlaceholder}
                className="min-w-0 flex-1 rounded-md border border-gold/40 bg-white/80 px-3 py-2.5 text-sm text-[color:var(--hl-ink,#151820)] outline-none placeholder:text-[color:var(--hl-ink,#151820)]/40 focus:border-gold"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="flex h-[2.65rem] w-[2.65rem] shrink-0 items-center justify-center rounded-md bg-gold text-[#1a1f27] transition-colors hover:bg-[#d4b45a]"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                  <path d="M4 11.2 19.5 4.5 13.5 20l-2.4-6.2L4 11.2Z" />
                </svg>
              </button>
            </form>
            <label className="flex items-start gap-2 text-[0.74rem] font-semibold leading-snug text-white/65">
              <input type="checkbox" className="mt-0.5 accent-[var(--gold,#c9a227)]" />
              <span>{footer.newsletterNote}</span>
            </label>
          </div>
        </div>

        {/* Brand row — light-black premium glass */}
        <div className="hl-dark-glass relative mt-10 overflow-hidden rounded-xl">
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            aria-hidden="true"
            style={{
              backgroundImage:
                "radial-gradient(ellipse at 78% 40%, rgba(201,162,39,0.22), transparent 55%), linear-gradient(120deg, rgba(255,255,255,0.08), transparent 45%)",
            }}
          />
          <div className="relative grid grid-cols-1 items-center gap-6 px-5 py-7 sm:px-7 sm:py-8 lg:grid-cols-[minmax(11rem,auto)_1fr_minmax(10rem,14rem)] lg:gap-8">
            <div className="flex flex-col items-center lg:items-start">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={mediaSrc(logoSrc)}
                alt="Ambition Holidays"
                loading="lazy"
                decoding="async"
                className="h-16 w-auto object-contain drop-shadow-[0_4px_16px_rgba(0,0,0,0.25)] sm:h-[4.5rem]"
              />
            </div>
            <div className="text-center lg:px-4">
              <p className="mx-auto max-w-xl text-[0.95rem] font-semibold leading-relaxed text-white/90">
                {footer.mission}
              </p>
              <p className="mt-2.5 text-[1.35rem] font-semibold italic text-gold sm:text-[1.45rem]">
                {footer.missionScript}
              </p>
            </div>
            <div className="mx-auto flex w-full max-w-[14rem] items-center justify-center lg:justify-end">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={mediaSrc(footer.brandArtSrc || "/images/footer/tripadvisor-awards.webp")}
                alt="Tripadvisor Travelers' Choice Awards"
                loading="lazy"
                decoding="async"
                className="h-auto w-full max-h-[7.5rem] object-contain object-center drop-shadow-[0_6px_18px_rgba(0,0,0,0.2)] sm:max-h-[8.25rem]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Copyright bar */}
      <div className="border-t border-gold/20 bg-black/35 backdrop-blur-md">
        <div className="mx-auto flex max-w-[88rem] flex-col items-center gap-3 px-4 py-3.5 text-[0.74rem] font-semibold text-white/70 sm:flex-row sm:justify-between sm:gap-4 sm:px-8 lg:px-10">
          <p>{footer.copyright}</p>
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
            {(footer.legalLinks ?? []).map((l, i) => (
              <span key={l.id} className="inline-flex items-center gap-3">
                {i > 0 ? <span className="text-white/25" aria-hidden="true">|</span> : null}
                <Link href={l.href || "#"} prefetch={false} className="font-semibold hover:text-gold">
                  {l.label}
                </Link>
              </span>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <p className="font-semibold text-white/70">
              {footer.creditPrefix || "Developed By"}{" "}
              <a
                href={footer.creditHref || "https://theglobalorbit.com/"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold transition-colors hover:text-[#e0c45a] hover:underline"
              >
                {footer.creditName || "The Global Orbit"}
              </a>
            </p>
            <button
              type="button"
              onClick={scrollTop}
              aria-label="Back to top"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-gold/50 text-gold transition-colors hover:bg-gold/10"
            >
              <span aria-hidden="true">↑</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { NAV_ITEMS, type NavGroup, type NavItem } from "@/lib/nav";
import { luxuryCountryById, type DestShowcaseCard } from "@/lib/header-nav";
import type { LuxuryMegaCountry, LuxuryMegaCountryId } from "@/lib/luxury-mega";
import { mediaSrc } from "@/lib/media-src";
import { useSiteContent } from "@/components/SiteContentProvider";
import { DEFAULT_SITE_LOGO, headerLogoSrc } from "@/lib/media-src";
import { useFavorites } from "@/lib/use-favorites";

const WHATSAPP_URL = "https://wa.me/9779851148898";
const PHONE_DISPLAY = "+977 9851148898";

function Chevron({ open }: { open?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={`h-3 w-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
    >
      <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function hasMenu(item: NavItem) {
  return Boolean(item.groups?.length || item.children?.length);
}

function megaPanelLabels(navLabel: string) {
  if (navLabel === "Destinations") {
    return { sidebar: "Countries", content: "Destinations" };
  }
  if (navLabel === "Luxury Tour & Trek") {
    return { sidebar: "Categories", content: "Packages" };
  }
  return { sidebar: "Categories", content: "Explore" };
}

function usesLuxuryShowcase(label: string) {
  return label === "Luxury Tour & Trek";
}

function usesDestinationsShowcase(label: string) {
  return label === "Destinations";
}

function usesStackDropdown(label: string) {
  return label === "Travel Guide" || label === "Company";
}

const FROST_GLASS_CLASS =
  "relative overflow-hidden rounded-[1.7rem] border border-white/28 shadow-[0_24px_70px_rgba(0,0,0,0.32)]";
const FROST_GLASS_STYLE = {
  background:
    "linear-gradient(165deg, rgba(70,110,130,0.57) 0%, rgba(32,58,76,0.51) 48%, rgba(18,42,58,0.48) 100%)",
  backdropFilter: "blur(12px) saturate(1.35)",
  WebkitBackdropFilter: "blur(12px) saturate(1.35)",
  fontFamily: "var(--font-manrope), ui-sans-serif, system-ui, sans-serif",
} as const;

type FrostListItem = {
  title: string;
  subtitle: string;
  href: string;
  icon: "heli" | "camera" | "peaks" | "hiker" | "stupa" | "visa" | "calendar" | "pack" | "altitude" | "permit" | "about" | "legal" | "book" | "partner" | "privacy" | "terms";
};

const EXPERIENCE_LIST: FrostListItem[] = [
  {
    title: "Helicopter Tours",
    subtitle: "Breathtaking views from above",
    href: "/helicopter-tours",
    icon: "heli",
  },
  {
    title: "Photography Treks",
    subtitle: "Capture the Himalayas",
    href: "/photography-treks",
    icon: "camera",
  },
  {
    title: "Luxury Mountain Experiences",
    subtitle: "Premium journeys in nature",
    href: "/luxury-mountain-experiences",
    icon: "peaks",
  },
  {
    title: "Private Guided Expeditions",
    subtitle: "Tailor-made adventures",
    href: "/private-guided-expeditions",
    icon: "hiker",
  },
  {
    title: "Cultural Journeys",
    subtitle: "Tradition, people and heritage",
    href: "/cultural-journeys",
    icon: "stupa",
  },
];

const COMPANY_LIST: FrostListItem[] = [
  {
    title: "About Us",
    subtitle: "Our house, sister company and story",
    href: "/company",
    icon: "about",
  },
  {
    title: "Legal Documents",
    subtitle: "Licences and registrations",
    href: "/legal-documents",
    icon: "legal",
  },
  {
    title: "How to Book",
    subtitle: "From first enquiry to the trail",
    href: "/how-to-book",
    icon: "book",
  },
  {
    title: "Become a Partner",
    subtitle: "Agencies and luxury desks",
    href: "/become-a-partner",
    icon: "partner",
  },
  {
    title: "Privacy Policy",
    subtitle: "How we look after your data",
    href: "/privacy-policy",
    icon: "privacy",
  },
  {
    title: "Terms and Conditions",
    subtitle: "Booking terms, clearly written",
    href: "/terms-and-conditions",
    icon: "terms",
  },
];

const TRAVEL_GUIDE_LIST: FrostListItem[] = [
  {
    title: "Visa & Entry",
    subtitle: "Documents and arrival essentials",
    href: "/visa-and-entry",
    icon: "visa",
  },
  {
    title: "Best Time to Visit",
    subtitle: "Seasons across the Himalaya",
    href: "/best-time-to-visit",
    icon: "calendar",
  },
  {
    title: "Packing Guide",
    subtitle: "What to carry on the trail",
    href: "/packing-guide",
    icon: "pack",
  },
  {
    title: "Altitude Tips",
    subtitle: "Stay well on high routes",
    href: "/altitude-tips",
    icon: "altitude",
  },
  {
    title: "Permits & Fees",
    subtitle: "Trek permits made simple",
    href: "/permits-and-fees",
    icon: "permit",
  },
];

function frostListFor(label: string) {
  if (label === "Travel Guide") return TRAVEL_GUIDE_LIST;
  if (label === "Company") return COMPANY_LIST;
  return EXPERIENCE_LIST;
}

function FrostIcon({ name }: { name: FrostListItem["icon"] }) {
  const common = "h-[1.35rem] w-[1.35rem] text-[#e4c35a]";
  if (name === "heli") {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" aria-hidden="true">
        <path d="M4 10h12M8 10V7m8-2H8m8 5 4 3H5l2-3m1 3v3h8v-3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (name === "camera") {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" aria-hidden="true">
        <rect x="3.5" y="7" width="17" height="12.5" rx="2.2" stroke="currentColor" strokeWidth="1.7" />
        <circle cx="12" cy="13.2" r="3.2" stroke="currentColor" strokeWidth="1.7" />
        <path d="M9 7 10.4 4.8h3.2L15 7" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      </svg>
    );
  }
  if (name === "peaks") {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" aria-hidden="true">
        <path d="m3 19 6.2-10 3.3 5.2L15.2 9 21 19H3Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      </svg>
    );
  }
  if (name === "hiker") {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" aria-hidden="true">
        <circle cx="13.2" cy="5.2" r="1.5" stroke="currentColor" strokeWidth="1.7" />
        <path d="m8 21 3.2-6.2L7 12.5 9.2 8.2l4.4 2.6 2.2 4.8L18 21M11.2 14.8 14 12.2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (name === "stupa") {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" aria-hidden="true">
        <path d="M6 20h12M8 20V16h8v4M9.5 16c0-2.4 1.1-3.6 2.5-4.8 1.4 1.2 2.5 2.4 2.5 4.8M12 11.2V8.6m0 0c1.3 0 2-.7 2-1.5S13.3 5.6 12 5.6 10 6.3 10 7.1s.7 1.5 2 1.5Z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (name === "visa") {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" aria-hidden="true">
        <rect x="4" y="5" width="16" height="14" rx="1.8" stroke="currentColor" strokeWidth="1.7" />
        <circle cx="9" cy="11" r="1.7" stroke="currentColor" strokeWidth="1.6" />
        <path d="M13 10h5M13 13.5h5M6.5 16.5h11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    );
  }
  if (name === "calendar") {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" aria-hidden="true">
        <rect x="4" y="5" width="16" height="15" rx="2" stroke="currentColor" strokeWidth="1.7" />
        <path d="M8 3v4M16 3v4M4 10h16" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    );
  }
  if (name === "pack") {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" aria-hidden="true">
        <path d="M8 8V6.5A2.5 2.5 0 0 1 10.5 4h3A2.5 2.5 0 0 1 16 6.5V8M7 8h10l.8 11.2a1.6 1.6 0 0 1-1.6 1.7H7.8a1.6 1.6 0 0 1-1.6-1.7L7 8Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      </svg>
    );
  }
  if (name === "altitude") {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" aria-hidden="true">
        <path d="M4 18h16M7 18 12 7l5 11M10.2 13.2h3.6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (name === "about") {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" aria-hidden="true">
        <circle cx="12" cy="8" r="3.1" stroke="currentColor" strokeWidth="1.7" />
        <path d="M5.5 19.2c.8-3.2 3.3-5 6.5-5s5.7 1.8 6.5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    );
  }
  if (name === "legal") {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" aria-hidden="true">
        <path d="M7 20V5.8A1.8 1.8 0 0 1 8.8 4H17v13.4a1.8 1.8 0 0 1-1.8 1.6H7Z" stroke="currentColor" strokeWidth="1.7" />
        <path d="M9.4 8.2h5M9.4 11.2h5M9.4 14.2h3.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    );
  }
  if (name === "book") {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" aria-hidden="true">
        <rect x="4.2" y="5" width="15.6" height="14.2" rx="2" stroke="currentColor" strokeWidth="1.7" />
        <path d="M8 9.2h8M8 12.2h8M8 15.2h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    );
  }
  if (name === "partner") {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" aria-hidden="true">
        <circle cx="8.2" cy="8.2" r="2.3" stroke="currentColor" strokeWidth="1.7" />
        <circle cx="15.8" cy="8.2" r="2.3" stroke="currentColor" strokeWidth="1.7" />
        <path d="M3.8 19c.7-2.8 2.7-4.3 4.4-4.3 1.3 0 2.4.7 3.2 1.8.8-1.1 1.9-1.8 3.2-1.8 1.7 0 3.7 1.5 4.4 4.3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    );
  }
  if (name === "privacy") {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" aria-hidden="true">
        <path d="M12 3.6 5.5 6.4v5.3c0 4.2 2.7 7.2 6.5 8.7 3.8-1.5 6.5-4.5 6.5-8.7V6.4L12 3.6Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      </svg>
    );
  }
  if (name === "terms") {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" aria-hidden="true">
        <path d="M7 20V6.8A1.8 1.8 0 0 1 8.8 5H16v12.2a1.8 1.8 0 0 1-1.8 1.8H7Z" stroke="currentColor" strokeWidth="1.7" />
        <path d="M16 8h2.2A1.8 1.8 0 0 1 20 9.8V19" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        <path d="M9.2 9h4M9.2 12h4M9.2 15h3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className={common} fill="none" aria-hidden="true">
      <path d="M7 20V6.8A1.8 1.8 0 0 1 8.8 5H16v12.2a1.8 1.8 0 0 1-1.8 1.8H7Z" stroke="currentColor" strokeWidth="1.7" />
      <path d="M16 8h2.2A1.8 1.8 0 0 1 20 9.8V19" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M9.2 9h4M9.2 12h4M9.2 15h3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function FrostListDropdown({
  items,
  onNavigate,
  inline,
}: {
  items: FrostListItem[];
  onNavigate: () => void;
  inline?: boolean;
}) {
  return (
    <div
      className={`${inline ? "w-full" : "animate-dropdown absolute left-1/2 top-full z-50 mt-1.5 w-[min(calc(100vw-2rem),22.5rem)] -translate-x-1/2"} px-3.5 py-3.5 ${FROST_GLASS_CLASS}`}
      style={FROST_GLASS_STYLE}
      onMouseLeave={inline ? undefined : onNavigate}
    >
      <ul role="menu" className="space-y-0.5">
        {items.map((item) => (
          <li key={item.href} role="none">
            <Link
              href={item.href}
              role="menuitem"
              className="focus-ring flex items-center gap-3 rounded-2xl px-2 py-2.5 text-left transition-colors hover:bg-white/10"
              onClick={onNavigate}
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center">
                <FrostIcon name={item.icon} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[0.95rem] font-semibold leading-tight text-white">
                  {item.title}
                </span>
                <span className="mt-0.5 block text-[0.74rem] leading-snug text-white/70">
                  {item.subtitle}
                </span>
              </span>
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/35 text-white/90">
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
                  <path d="M5 12h12M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function flattenNavLinks(item: NavItem) {
  if (item.children?.length) return item.children;
  if (item.groups?.length) {
    return item.groups.flatMap((group) => group.links);
  }
  return [];
}

/** Dark gold glass — matches post-hero site frames */
const MEGA_SHELL =
  "linear-gradient(165deg, rgba(16,12,8,0.94) 0%, rgba(10,8,7,0.92) 100%)";
const MEGA_SIDE =
  "linear-gradient(180deg, rgba(18,14,10,0.55) 0%, rgba(12,10,8,0.5) 100%)";
const MEGA_MAIN = "linear-gradient(180deg, rgba(14,11,8,0.28) 0%, rgba(10,8,7,0.4) 100%)";
const DROP_SHELL =
  "linear-gradient(180deg, rgba(16,12,8,0.96) 0%, rgba(10,8,7,0.94) 100%)";

function DestGoldArrow() {
  return (
    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#c9a227] text-[#1a1408] shadow-[0_8px_18px_rgba(201,162,39,0.4)] sm:h-9 sm:w-9">
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
        <path d="M5 12h12M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </span>
  );
}

function DestinationsGlassPanel({
  destinations,
  onNavigate,
}: {
  destinations: DestShowcaseCard[];
  onNavigate: () => void;
}) {
  return (
    <div
      className={`${FROST_GLASS_CLASS} px-4 py-4 sm:px-7 sm:py-6`}
      style={FROST_GLASS_STYLE}
    >
      <div className="mb-4 flex flex-col gap-3 lg:mb-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-white/80">
            Explore the Himalayas
          </p>
          <h3
            className="mt-1 text-[clamp(1.45rem,2.6vw,2.15rem)] font-semibold leading-tight tracking-[-0.02em] text-white"
            style={{ fontFamily: "var(--font-cormorant), Times New Roman, serif" }}
          >
            Extraordinary Destinations Await
          </h3>
        </div>
        <p className="hidden items-center gap-3 text-[0.92rem] italic text-white/80 lg:flex">
          <span className="h-px w-10 bg-white/45" aria-hidden="true" />
          Four Regions. Endless Possibilities.
        </p>
      </div>

      <ul className="grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 lg:grid-cols-4 lg:gap-4">
        {destinations.map((dest) => (
          <li key={dest.id}>
            <Link
              href={dest.href}
              onClick={onNavigate}
              className="focus-ring group relative block overflow-hidden rounded-[1.15rem] border border-white/15 shadow-[0_12px_28px_rgba(0,0,0,0.28)]"
            >
              <span className="relative block aspect-[5/4] w-full">
                <Image
                  src={mediaSrc(dest.imageSrc)}
                  alt={dest.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 50vw, 18vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-3 sm:p-3.5">
                  <span className="min-w-0">
                    <span className="block text-[1.05rem] font-semibold tracking-tight text-white sm:text-[1.15rem]">
                      {dest.title}
                    </span>
                    <span className="mt-0.5 block text-[0.7rem] text-white/75 sm:text-[0.74rem]">
                      {dest.subtitle}
                    </span>
                  </span>
                  <DestGoldArrow />
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-4 flex justify-center sm:mt-5">
        <Link
          href="/destinations"
          onClick={onNavigate}
          className="focus-ring inline-flex items-center gap-2 text-[0.82rem] font-semibold text-white/85 hover:text-white"
        >
          View All Destinations
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </div>
  );
}

function LuxuryGlassPanel({
  countries,
  activeId,
  onSelect,
  onNavigate,
}: {
  countries: LuxuryMegaCountry[];
  activeId: LuxuryMegaCountryId;
  onSelect: (id: LuxuryMegaCountryId) => void;
  onNavigate: () => void;
}) {
  const country = luxuryCountryById(countries, activeId);

  return (
    <div
      className={`${FROST_GLASS_CLASS} p-3 sm:p-4`}
      style={FROST_GLASS_STYLE}
    >
      <div className="grid items-stretch gap-4 lg:grid-cols-[20.5rem_1fr]">
        <aside className="flex min-h-full flex-col rounded-[1.25rem] border border-white/12 bg-black/25 p-4">
          <p className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-white/90">
            Explore by Country
          </p>
          <p className="mt-1.5 max-w-[16rem] text-[0.78rem] leading-snug text-white/70">
            Choose a destination to view luxury tours & treks.
          </p>
          <ul className="mt-4 space-y-2.5">
            {countries.map((item) => {
              const on = item.id === country.id;
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onMouseEnter={() => onSelect(item.id)}
                    onFocus={() => onSelect(item.id)}
                    onClick={() => onSelect(item.id)}
                    className={`focus-ring relative flex h-[4.85rem] w-full items-center overflow-hidden rounded-[1.35rem] border text-left transition-shadow ${
                      on
                        ? "border-[#e8d48a]/90 shadow-[0_0_0_1px_rgba(232,212,138,0.35),0_0_22px_rgba(201,162,39,0.28)]"
                        : "border-white/10 hover:border-white/25"
                    }`}
                  >
                    <span className="absolute inset-0">
                      <Image src={mediaSrc(item.thumbSrc)} alt="" fill className="object-cover object-[center_42%]" sizes="330px" />
                      <span className="absolute inset-0 bg-gradient-to-r from-black/58 via-black/22 to-transparent" />
                    </span>
                    <span className="relative z-[1] ml-2.5 h-[2.85rem] w-[2.85rem] shrink-0 overflow-hidden rounded-full border-[1.5px] border-white/70 bg-[#101820] shadow-[0_4px_12px_rgba(0,0,0,0.45)]">
                      <Image src={mediaSrc(item.flagSrc)} alt="" fill className="object-cover object-center" sizes="46px" />
                    </span>
                    <span className="relative z-[1] min-w-0 flex-1 pl-2.5">
                      <span className="block text-[0.98rem] font-semibold leading-tight text-white drop-shadow">
                        {item.title}
                      </span>
                      <span className="mt-0.5 block text-[0.72rem] text-white/80">{item.countLabel}</span>
                    </span>
                    <span
                      className={`relative z-[1] mr-2.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                        on ? "bg-[#c9a227] text-[#1a1408]" : "bg-white/18 text-white"
                      }`}
                    >
                      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
                        <path d="M5 12h12M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
          <div className="mt-auto flex flex-col items-center px-2 pb-1 pt-7 text-white/70">
            <svg viewBox="0 0 200 58" className="h-[2.65rem] w-[10.5rem] text-white/72" fill="none" aria-hidden="true">
              <path
                d="M8 50 42 22l12 12 22-32 16 20 18-22 20 18 14-10 20 14 20 22H8Z"
                stroke="currentColor"
                strokeWidth="1.45"
                strokeLinejoin="round"
              />
              <path
                d="M76 22 92 4l14 16"
                stroke="currentColor"
                strokeWidth="1.35"
                strokeLinejoin="round"
              />
              <path
                d="M54 34l12-8 10 6M110 18l10 8 12-6"
                stroke="currentColor"
                strokeWidth="1.15"
                strokeLinejoin="round"
              />
            </svg>
            <p
              className="mt-1.5 text-center text-[0.82rem] italic tracking-[0.01em] text-white/75"
              style={{ fontFamily: "var(--font-cormorant), Times New Roman, serif" }}
            >
              One Region. Limitless Journeys.
            </p>
          </div>
        </aside>

        <div className="min-w-0">
          <div className="mb-3 flex flex-col gap-2 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-[#e4c35a]">
                {country.title}
              </p>
              <h3
                className="mt-0.5 text-[clamp(1.35rem,2.3vw,1.95rem)] font-semibold leading-tight text-white"
                style={{ fontFamily: "var(--font-cormorant), Times New Roman, serif" }}
              >
                Popular Luxury Tours & Treks
              </h3>
            </div>
            <p className="hidden items-center gap-3 text-[0.82rem] italic text-white/75 lg:flex">
              <span className="text-[0.78rem] font-semibold not-italic text-white/80">{country.countLabel}</span>
              <span className="h-px w-8 bg-white/35" aria-hidden="true" />
              {country.tagline}
            </p>
          </div>

          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {country.packages.map((pkg) => (
              <li key={pkg.title}>
                <Link
                  href={pkg.href}
                  onClick={onNavigate}
                  className="focus-ring group relative block overflow-hidden rounded-[1.05rem] border border-white/12 shadow-[0_10px_24px_rgba(0,0,0,0.28)]"
                >
                  <span className="relative block aspect-[16/10] w-full">
                    <Image
                      src={mediaSrc(pkg.imageSrc)}
                      alt={pkg.imageAlt}
                      fill
                      sizes="(max-width: 1024px) 50vw, 18vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                    <span className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                    <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-3">
                      <span>
                        <span className="block text-[0.92rem] font-semibold leading-snug text-white">
                          {pkg.title}
                        </span>
                        <span className="mt-1 flex items-center gap-3 text-[0.68rem] text-white/75">
                          <span className="inline-flex items-center gap-1">
                            <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" aria-hidden="true">
                              <rect x="4" y="5" width="16" height="15" rx="2" stroke="currentColor" strokeWidth="1.8" />
                              <path d="M8 3v4M16 3v4M4 10h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                            </svg>
                            {pkg.days}
                          </span>
                          <span className="inline-flex items-center gap-1">
                            <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" aria-hidden="true">
                              <path d="m3 18 6.5-9 3.5 5 2.5-3.5L21 18H3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                            </svg>
                            {pkg.difficulty}
                          </span>
                        </span>
                      </span>
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/35 bg-black/35 text-white">
                        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
                          <path d="M5 12h12M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                      </span>
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href={country.href}
            onClick={onNavigate}
            className="focus-ring mt-3 flex min-h-11 items-center justify-center gap-2 rounded-full border border-white/18 bg-black/20 text-[0.82rem] font-semibold text-white/90 hover:bg-black/35"
          >
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
              <rect x="3" y="3" width="7" height="7" rx="1.2" stroke="currentColor" strokeWidth="1.8" />
              <rect x="14" y="3" width="7" height="7" rx="1.2" stroke="currentColor" strokeWidth="1.8" />
              <rect x="3" y="14" width="7" height="7" rx="1.2" stroke="currentColor" strokeWidth="1.8" />
              <rect x="14" y="14" width="7" height="7" rx="1.2" stroke="currentColor" strokeWidth="1.8" />
            </svg>
            {country.viewAllLabel}
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

function DestinationsMegaPanel({
  groups,
  activeTitle,
  sidebarLabel,
  contentLabel,
  onSelectCategory,
  onNavigate,
}: {
  groups: NavGroup[];
  activeTitle: string;
  sidebarLabel: string;
  contentLabel: string;
  onSelectCategory: (title: string) => void;
  onNavigate: () => void;
}) {
  const active = groups.find((g) => g.title === activeTitle) ?? groups[0];

  return (
    <div
      className="overflow-hidden rounded-[1.15rem] border border-[#e0c45a]/80 shadow-[0_0_0_1px_rgba(224,196,90,0.28),0_0_28px_rgba(201,162,39,0.28),0_18px_44px_rgba(0,0,0,0.42)]"
      style={{
        background: MEGA_SHELL,
        fontFamily: "var(--font-manrope), ui-sans-serif, system-ui, sans-serif",
      }}
    >
      <div
        className="h-[2px] w-full"
        style={{
          background:
            "linear-gradient(90deg, transparent, #c9a227 20%, #e8d48a 50%, #c9a227 80%, transparent)",
        }}
        aria-hidden="true"
      />

      <div className="grid grid-cols-[minmax(14.5rem,17rem)_1fr]">
        <aside
          className="relative border-r border-[#e0c45a]/28 px-3 py-3.5"
          style={{ background: MEGA_SIDE }}
        >
          <p className="mb-2 px-2 text-[0.62rem] font-bold uppercase tracking-[0.18em] text-[#e4c35a]">
            {sidebarLabel}
          </p>
          <ul className="space-y-0.5">
            {groups.map((section) => {
              const on = section.title === active?.title;
              return (
                <li key={section.title}>
                  <button
                    type="button"
                    onMouseEnter={() => onSelectCategory(section.title)}
                    onFocus={() => onSelectCategory(section.title)}
                    onClick={() => onSelectCategory(section.title)}
                    className={`focus-ring flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-[0.82rem] font-bold leading-snug tracking-[0.01em] transition-colors duration-150 ${
                      on
                        ? "bg-black/40 text-[#e4c35a] shadow-[0_0_16px_rgba(201,162,39,0.18)] ring-1 ring-[#e0c45a]/55"
                        : "text-[#f7f4ef]/88 hover:bg-white/5 hover:text-[#e4c35a]"
                    }`}
                  >
                    <span className="pr-1">{section.title}</span>
                    <span
                      className={`shrink-0 text-[0.7rem] ${on ? "text-[#e4c35a]" : "text-[#e4c35a]/45"}`}
                      aria-hidden="true"
                    >
                      ›
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </aside>

        <div className="px-5 py-4 sm:px-6 sm:py-5" style={{ background: MEGA_MAIN }}>
          <div className="mb-3.5 flex items-end justify-between gap-3 border-b border-[#e0c45a]/22 pb-2.5">
            <div className="min-w-0">
              <p className="text-[0.58rem] font-bold uppercase tracking-[0.18em] text-[#e4c35a]">
                {contentLabel}
              </p>
              <h3 className="mt-0.5 text-[1.12rem] font-extrabold tracking-tight text-[#f7f4ef] sm:text-[1.2rem]">
                {active?.title}
              </h3>
            </div>
            {active ? (
              <Link
                href={active.href}
                onClick={onNavigate}
                className="focus-ring shrink-0 rounded-full border border-[#e0c45a]/70 bg-black/35 px-3 py-1 text-[0.68rem] font-bold text-[#e4c35a] transition-colors hover:bg-[#c9a227]/15"
              >
                View all →
              </Link>
            ) : null}
          </div>

          <ul className="grid grid-cols-1 gap-1.5 sm:grid-cols-2 lg:grid-cols-3">
            {(active?.links ?? []).map((child) => (
              <li key={child.label}>
                <Link
                  href={child.href}
                  onClick={onNavigate}
                  className="focus-ring group flex items-center gap-2 rounded-lg border border-transparent px-2.5 py-2.5 text-[0.88rem] font-semibold text-[#f7f4ef] transition-colors hover:border-[#e0c45a]/40 hover:bg-black/30 hover:text-[#e4c35a]"
                >
                  <span
                    className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#c9a227] shadow-[0_0_0_3px_rgba(201,162,39,0.15)]"
                    aria-hidden="true"
                  />
                  <span className="leading-snug">{child.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function Header() {
  const { header, headerNav, updatedAt } = useSiteContent();
  const logoSrc = headerLogoSrc(header.logoSrc, updatedAt);
  const { items: savedTrips } = useFavorites();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [mobileGroup, setMobileGroup] = useState<string | null>(null);
  const [megaCategory, setMegaCategory] = useState<string | null>(null);
  const [luxuryCountry, setLuxuryCountry] = useState<LuxuryMegaCountryId>("nepal");
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const navId = useId();
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
    setMobileExpanded(null);
    setMobileGroup(null);
  }, [pathname]);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        setScrolled(window.scrollY > 12);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const body = document.body;
    if (mobileOpen) {
      body.style.overflow = "hidden";
    } else {
      body.style.removeProperty("overflow");
    }
    return () => {
      body.style.removeProperty("overflow");
    };
  }, [mobileOpen]);

  useEffect(() => {
    document.body.classList.toggle("nav-mega-open", Boolean(openDropdown));
    return () => document.body.classList.remove("nav-mega-open");
  }, [openDropdown]);

  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      if (!headerRef.current?.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpenDropdown(null);
        setMobileOpen(false);
      }
    }
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  const openMegaItem = NAV_ITEMS.find(
    (item) =>
      item.label === openDropdown &&
      (usesLuxuryShowcase(item.label) || usesDestinationsShowcase(item.label)),
  );

  useEffect(() => {
    if (openMegaItem?.groups?.length) {
      setMegaCategory((current) => {
        if (current && openMegaItem.groups!.some((g) => g.title === current)) {
          return current;
        }
        return openMegaItem.groups![0].title;
      });
    } else {
      setMegaCategory(null);
    }
  }, [openMegaItem]);

  const isDestShowcase = Boolean(
    openMegaItem && usesDestinationsShowcase(openMegaItem.label),
  );
  const isLuxuryShowcase = Boolean(
    openMegaItem && usesLuxuryShowcase(openMegaItem.label),
  );

  return (
    <header
      ref={headerRef}
      className={`absolute inset-x-0 top-0 z-[80] isolate pt-[var(--safe-top)] transition-colors duration-300 ${
        scrolled || mobileOpen || openDropdown
          ? "bg-[rgba(8,12,18,0.91)] backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="relative mx-auto max-w-[92rem] px-4 sm:px-5 lg:px-6 xl:px-8">
        <div className="flex h-[5rem] flex-nowrap items-center gap-2 sm:h-[5.25rem] lg:gap-3 xl:gap-4">
          <Link href="/" className="focus-ring relative z-10 shrink-0" aria-label="Ambition Holiday home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logoSrc}
              alt="Ambition Holidays — Journeys Beyond Limits"
              width={977}
              height={258}
              fetchPriority="high"
              decoding="async"
              className="h-[2.45rem] w-auto object-contain sm:h-[2.7rem] lg:h-[2.55rem] xl:h-[2.9rem] 2xl:h-[3.16rem]"
              key={logoSrc}
              onError={(event) => {
                const img = event.currentTarget;
                if (img.dataset.fallback === "1" || img.src.includes(DEFAULT_SITE_LOGO)) return;
                img.dataset.fallback = "1";
                img.src = DEFAULT_SITE_LOGO;
              }}
            />
          </Link>

          <nav
            className="hidden min-w-0 flex-1 items-center justify-center lg:flex"
            aria-label="Primary"
          >
            <ul className="flex flex-nowrap items-center justify-center gap-0 xl:gap-0.5 2xl:gap-1">
              {NAV_ITEMS.map((item) => {
                const menu = hasMenu(item);
                const isOpen = openDropdown === item.label;
                const isWideMega = usesLuxuryShowcase(item.label) || usesDestinationsShowcase(item.label);
                const destOpen = isOpen && usesDestinationsShowcase(item.label);
                const luxuryOpen = isOpen && usesLuxuryShowcase(item.label);
                const stackOpen = isOpen && usesStackDropdown(item.label);
                const goldLineOpen = luxuryOpen || stackOpen;
                const isStack = usesStackDropdown(item.label) || Boolean(item.children?.length);
                const stackLinks = isStack ? flattenNavLinks(item) : [];

                return (
                  <li key={item.label} className={`shrink-0 ${isWideMega ? "" : "relative"}`}>
                    {menu ? (
                      <>
                        <button
                          type="button"
                          className={`focus-ring relative inline-flex items-center gap-1 whitespace-nowrap px-1.5 py-2 text-[0.72rem] font-bold tracking-[0.02em] transition-colors duration-200 xl:gap-1.5 xl:px-2 xl:text-[0.82rem] xl:tracking-[0.03em] 2xl:px-3 2xl:text-[0.95rem] 2xl:tracking-[0.04em] ${
                            destOpen
                              ? "rounded-full bg-[#c9a227] text-[#1a1408] hover:text-[#1a1408]"
                              : goldLineOpen
                                ? "rounded-md text-[#e4c35a] hover:text-[#e8d48a]"
                              : `rounded-md text-white hover:text-gold ${isOpen ? "text-gold" : ""}`
                          }`}
                          aria-expanded={isOpen}
                          aria-haspopup="true"
                          onClick={() =>
                            setOpenDropdown((current) =>
                              current === item.label ? null : item.label,
                            )
                          }
                          onMouseEnter={() => setOpenDropdown(item.label)}
                        >
                          {item.label}
                          <Chevron open={isOpen} />
                          {destOpen ? (
                            <span
                              className="absolute left-1/2 top-[calc(100%+2px)] z-[61] h-0 w-0 -translate-x-1/2 border-x-[8px] border-b-[9px] border-x-transparent border-b-[#c9a227]"
                              aria-hidden="true"
                            />
                          ) : null}
                          {goldLineOpen ? (
                            <>
                              <span
                                className="absolute inset-x-3 bottom-0 h-[2px] rounded-full bg-[#c9a227]"
                                aria-hidden="true"
                              />
                              <span
                                className="absolute left-1/2 top-[calc(100%+2px)] z-[61] h-0 w-0 -translate-x-1/2 border-x-[8px] border-b-[9px] border-x-transparent border-b-[#c9a227]"
                                aria-hidden="true"
                              />
                            </>
                          ) : null}
                        </button>
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        className="focus-ring inline-flex items-center whitespace-nowrap rounded-md px-1.5 py-2 text-[0.72rem] font-bold tracking-[0.02em] text-white transition-colors duration-200 hover:text-gold xl:px-2 xl:text-[0.82rem] xl:tracking-[0.03em] 2xl:px-3 2xl:text-[0.95rem] 2xl:tracking-[0.04em]"
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="ml-auto flex shrink-0 items-center gap-1 sm:gap-1.5 lg:gap-2">
            <Link
              href="/saved"
              aria-label="Saved packages"
              className="focus-ring relative hidden rounded-full p-1.5 text-white transition-colors hover:text-gold md:inline-flex xl:p-2"
            >
              <svg viewBox="0 0 24 24" className="h-[1.33rem] w-[1.33rem]" fill={savedTrips.length ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.9" aria-hidden="true">
                <path
                  d="M12 20.4S4.8 15.7 4.8 10.4A3.95 3.95 0 0 1 12 7.35a3.95 3.95 0 0 1 7.2 3.05c0 5.3-7.2 10-7.2 10Z"
                  strokeLinejoin="round"
                />
              </svg>
              {savedTrips.length ? (
                <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-[#c9a227] px-1 text-[0.6rem] font-bold text-[#1a1610]">
                  {savedTrips.length}
                </span>
              ) : null}
            </Link>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring hidden items-center gap-2.5 rounded-md border border-gold/80 px-2.5 py-1.5 transition-colors hover:border-gold hover:bg-white/5 lg:inline-flex"
              aria-label={`Call or WhatsApp ${PHONE_DISPLAY}`}
            >
              <span className="whatsapp-call-pulse relative flex h-9 w-9 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_0_0_0_rgba(37,211,102,0.55)]">
                <svg viewBox="0 0 24 24" className="h-[1.05rem] w-[1.05rem]" fill="currentColor" aria-hidden="true">
                  <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1.1-.2 1.2.4 2.5.6 3.8.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.8 21 3 13.2 3 3.7c0-.6.4-1 1-1H7c.6 0 1 .4 1 1 0 1.3.2 2.6.6 3.8.1.4 0 .8-.3 1.1l-2.2 2.2Z" />
                </svg>
              </span>
              <span className="hidden text-[0.78rem] font-semibold tracking-wide text-gold xl:inline 2xl:text-[0.84rem]">
                {PHONE_DISPLAY}
              </span>
            </a>

            <button
              type="button"
              className="focus-ring inline-flex rounded-md p-2 text-white lg:hidden"
              aria-expanded={mobileOpen}
              aria-controls={navId}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              onClick={() => setMobileOpen((value) => !value)}
            >
              {mobileOpen ? (
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {openMegaItem ? (
          <div
            className={`animate-dropdown absolute left-1/2 top-full z-[90] hidden w-[min(calc(100vw-2rem),86rem)] -translate-x-1/2 pt-2 lg:block ${
              isLuxuryShowcase ? "" : "max-w-[74rem]"
            }`}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            {isDestShowcase ? (
              <DestinationsGlassPanel
                destinations={headerNav.destinations}
                onNavigate={() => setOpenDropdown(null)}
              />
            ) : isLuxuryShowcase ? (
              <LuxuryGlassPanel
                countries={headerNav.luxuryCountries}
                activeId={luxuryCountry}
                onSelect={setLuxuryCountry}
                onNavigate={() => setOpenDropdown(null)}
              />
            ) : null}
          </div>
        ) : openDropdown && usesStackDropdown(openDropdown) ? (
          <div
            className="animate-dropdown absolute left-1/2 top-full z-[90] hidden -translate-x-1/2 pt-2 lg:block"
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <FrostListDropdown
              items={frostListFor(openDropdown)}
              onNavigate={() => setOpenDropdown(null)}
              inline
            />
          </div>
        ) : null}
      </div>

      <div id={navId} className={`lg:hidden ${mobileOpen ? "block" : "hidden"}`}>
        <div
          className="max-h-[calc(100dvh-4.75rem-var(--safe-top))] overflow-y-auto overscroll-contain border-t border-white/10 bg-[rgba(8,12,18,0.96)] px-4 pb-[max(2rem,var(--safe-bottom))] pt-3 backdrop-blur-lg"
          style={{ fontFamily: "var(--font-manrope), ui-sans-serif, system-ui, sans-serif" }}
        >
          <ul className="space-y-1">
            {NAV_ITEMS.map((item) => {
              const menu = hasMenu(item);
              const expanded = mobileExpanded === item.label;
              const useDestMobile = usesDestinationsShowcase(item.label);
              const useLuxuryMobile = usesLuxuryShowcase(item.label);
              const useStackMobile = usesStackDropdown(item.label);
              const stackLinks = useStackMobile ? flattenNavLinks(item) : [];

              return (
                <li key={item.label} className="border-b border-white/10">
                  {menu ? (
                    <>
                      <button
                        type="button"
                        className="focus-ring flex w-full items-center justify-between py-3.5 text-left text-[1.05rem] font-bold text-white"
                        aria-expanded={expanded}
                        onClick={() => {
                          setMobileExpanded((current) =>
                            current === item.label ? null : item.label,
                          );
                          setMobileGroup(
                            item.groups?.length ? item.groups[0].title : null,
                          );
                        }}
                      >
                        {item.label}
                        <Chevron open={expanded} />
                      </button>
                      {expanded ? (
                        useDestMobile ? (
                          <div className="mb-3">
                            <DestinationsGlassPanel
                              destinations={headerNav.destinations}
                              onNavigate={() => setMobileOpen(false)}
                            />
                          </div>
                        ) : useLuxuryMobile ? (
                          <div className="mb-3">
                            <LuxuryGlassPanel
                              countries={headerNav.luxuryCountries}
                              activeId={luxuryCountry}
                              onSelect={setLuxuryCountry}
                              onNavigate={() => setMobileOpen(false)}
                            />
                          </div>
                        ) : useStackMobile ? (
                          <div className="mb-3">
                            <FrostListDropdown
                              items={frostListFor(item.label)}
                              onNavigate={() => setMobileOpen(false)}
                              inline
                            />
                          </div>
                        ) : item.groups ? (
                          <div
                            className="animate-dropdown mb-3 overflow-hidden rounded-[1.15rem] border border-[#e0c45a]/70 p-2.5 shadow-[0_0_0_1px_rgba(224,196,90,0.22),0_14px_36px_rgba(0,0,0,0.35)]"
                            style={{ background: MEGA_SHELL }}
                          >
                            <div
                              className="mb-2 h-[2px] w-full rounded-full"
                              style={{
                                background:
                                  "linear-gradient(90deg, transparent, #c9a227 20%, #e8d48a 50%, #c9a227 80%, transparent)",
                              }}
                              aria-hidden="true"
                            />
                            <p className="mb-2 px-1 text-[0.6rem] font-bold uppercase tracking-[0.18em] text-[#e4c35a]">
                              {megaPanelLabels(item.label).sidebar}
                            </p>
                            <div className="mb-2 flex gap-1.5 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                              {item.groups.map((section) => {
                                const on = mobileGroup === section.title;
                                return (
                                  <button
                                    key={section.title}
                                    type="button"
                                    onClick={() => setMobileGroup(section.title)}
                                    className={`focus-ring shrink-0 rounded-lg px-3 py-1.5 text-[0.72rem] font-bold tracking-wide transition-colors ${
                                      on
                                        ? "bg-[#c9a227] text-[#12151c]"
                                        : "bg-black/35 text-[#f7f4ef] ring-1 ring-[#e0c45a]/35"
                                    }`}
                                  >
                                    {section.title}
                                  </button>
                                );
                              })}
                            </div>
                            {(() => {
                              const active =
                                item.groups.find((g) => g.title === mobileGroup) ??
                                item.groups[0];
                              return (
                                <div
                                  className="rounded-xl p-3 ring-1 ring-[#e0c45a]/25"
                                  style={{ background: MEGA_MAIN }}
                                >
                                  <div className="mb-2 flex items-center justify-between gap-2">
                                    <p className="text-[0.84rem] font-extrabold text-[#f7f4ef]">
                                      {active.title}
                                    </p>
                                    <Link
                                      href={active.href}
                                      className="text-[0.68rem] font-bold text-[#e4c35a]"
                                      onClick={() => setMobileOpen(false)}
                                    >
                                      View all →
                                    </Link>
                                  </div>
                                  <ul className="space-y-0.5">
                                    {active.links.map((child) => (
                                      <li key={child.label}>
                                        <Link
                                          href={child.href}
                                          className="focus-ring flex items-center gap-2 rounded-lg px-2 py-2 text-[0.86rem] font-semibold text-[#f7f4ef] hover:bg-black/30 hover:text-[#e4c35a]"
                                          onClick={() => setMobileOpen(false)}
                                        >
                                          <span
                                            className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#c9a227]"
                                            aria-hidden="true"
                                          />
                                          {child.label}
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              );
                            })()}
                          </div>
                        ) : useStackMobile && stackLinks.length ? (
                          <div
                            className="animate-dropdown mb-3 overflow-hidden rounded-xl border border-[#e0c45a]/70"
                            style={{ background: DROP_SHELL }}
                          >
                            <div
                              className="h-[2px] w-full"
                              style={{
                                background:
                                  "linear-gradient(90deg, transparent, #c9a227 25%, #e8d48a 50%, #c9a227 75%, transparent)",
                              }}
                              aria-hidden="true"
                            />
                            <ul>
                              {stackLinks.map((child, index) => (
                                <li key={child.href}>
                                  <Link
                                    href={child.href}
                                    className={`focus-ring block px-4 py-3 text-[0.9rem] font-semibold text-[#f7f4ef] hover:bg-[#c9a227]/12 hover:text-[#e4c35a] ${
                                      index < stackLinks.length - 1
                                        ? "border-b border-dashed border-[#e0c45a]/28"
                                        : ""
                                    }`}
                                    onClick={() => setMobileOpen(false)}
                                  >
                                    {child.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ) : item.children?.length ? (
                          <ul className="animate-dropdown space-y-1 pb-3 pl-3">
                            {item.children.map((child) => (
                              <li key={child.label}>
                                <Link
                                  href={child.href}
                                  className="focus-ring block py-2 text-sm text-white/75 hover:text-gold"
                                  onClick={() => setMobileOpen(false)}
                                >
                                  {child.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        ) : null
                      ) : null}
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className="focus-ring block py-3.5 text-[1.05rem] font-bold text-white hover:text-gold"
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring mt-5 flex items-center gap-3 rounded-xl border border-gold/25 bg-white/5 px-4 py-3"
          >
            <span className="whatsapp-call-pulse relative flex h-10 w-10 items-center justify-center rounded-full bg-[#25D366] text-white">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1.1-.2 1.2.4 2.5.6 3.8.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.8 21 3 13.2 3 3.7c0-.6.4-1 1-1H7c.6 0 1 .4 1 1 0 1.3.2 2.6.6 3.8.1.4 0 .8-.3 1.1l-2.2 2.2Z" />
              </svg>
            </span>
            <span>
              <span className="block text-xs text-white/70">Call or WhatsApp 24/7</span>
              <span className="text-sm font-semibold text-gold">{PHONE_DISPLAY}</span>
            </span>
          </a>
        </div>
      </div>
    </header>
  );
}

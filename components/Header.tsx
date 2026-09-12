"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { NAV_ITEMS, type NavGroup, type NavItem } from "@/lib/nav";
import { useSiteContent } from "@/components/SiteContentProvider";

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
    return { sidebar: "Regions", content: "Destinations" };
  }
  if (navLabel === "Luxury Tour & Trek") {
    return { sidebar: "Categories", content: "Packages" };
  }
  return { sidebar: "Categories", content: "Explore" };
}

function usesSidebarMega(label: string) {
  return label === "Destinations" || label === "Luxury Tour & Trek";
}

function usesStackDropdown(label: string) {
  return label === "Experiences" || label === "Travel Guide";
}

function flattenNavLinks(item: NavItem) {
  if (item.children?.length) return item.children;
  if (item.groups?.length) {
    return item.groups.flatMap((group) => group.links);
  }
  return [];
}

/** Cream–gold frosted glass — not see-through */
const MEGA_SHELL =
  "linear-gradient(148deg, rgba(255,252,245,0.94) 0%, rgba(247,236,210,0.9) 48%, rgba(232,208,150,0.78) 100%)";
const MEGA_SIDE =
  "linear-gradient(185deg, #f0e2b8 0%, #f6edd8 42%, #efe6d0 100%)";
const MEGA_MAIN = "linear-gradient(180deg, rgba(255,252,247,0.82) 0%, rgba(245,232,198,0.72) 100%)";
const DROP_SHELL =
  "linear-gradient(180deg, rgba(255,252,247,0.94) 0%, rgba(247,236,214,0.88) 55%, rgba(236,214,160,0.78) 100%)";

function StackGlassDropdown({
  links,
  onNavigate,
}: {
  links: { label: string; href: string }[];
  onNavigate: () => void;
}) {
  return (
    <div
      className="animate-dropdown absolute left-1/2 top-full z-50 mt-1.5 min-w-[15.5rem] -translate-x-1/2 overflow-hidden rounded-xl border border-[#c9a227]/40 shadow-[0_18px_42px_rgba(18,32,48,0.28)]"
      style={{
        background: DROP_SHELL,
        fontFamily: "var(--font-manrope), ui-sans-serif, system-ui, sans-serif",
      }}
      onMouseLeave={onNavigate}
    >
      <div
        className="h-[2px] w-full"
        style={{
          background:
            "linear-gradient(90deg, transparent, #c9a227 25%, #e8d48a 50%, #c9a227 75%, transparent)",
        }}
        aria-hidden="true"
      />
      <ul role="menu" className="py-1">
        {links.map((child, index) => (
          <li key={child.href} role="none">
            <Link
              href={child.href}
              role="menuitem"
              className={`focus-ring block px-4 py-2.5 text-[0.86rem] font-semibold text-[#1a1f27] transition-colors hover:bg-[#c9a227]/12 hover:text-[#8f6f12] ${
                index < links.length - 1 ? "border-b border-dashed border-[#c9a227]/28" : ""
              }`}
              onClick={onNavigate}
            >
              {child.label}
            </Link>
          </li>
        ))}
      </ul>
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
      className="overflow-hidden rounded-[1.15rem] border border-[#c9a227]/35 shadow-[0_26px_64px_rgba(18,32,48,0.3)]"
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

      <div className="grid grid-cols-[minmax(13rem,15rem)_1fr]">
        <aside
          className="relative border-r border-[#c9a227]/30 px-3 py-3.5"
          style={{ background: MEGA_SIDE }}
        >
          <p className="mb-2 px-2 text-[0.62rem] font-bold uppercase tracking-[0.18em] text-[#7a5e0c]">
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
                        ? "bg-[#fbfcfe] text-[#12151c] shadow-[0_6px_16px_rgba(40,60,85,0.12)] ring-1 ring-[#c9a227]/50"
                        : "text-[#243040] hover:bg-[#fbfcfe]/85"
                    }`}
                  >
                    <span className="pr-1">{section.title}</span>
                    <span
                      className={`shrink-0 text-[0.7rem] ${on ? "text-[#9a7b18]" : "text-[#9a7b18]/50"}`}
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
          <div className="mb-3.5 flex items-end justify-between gap-3 border-b border-[#c9a227]/22 pb-2.5">
            <div className="min-w-0">
              <p className="text-[0.58rem] font-bold uppercase tracking-[0.18em] text-[#9a7b18]">
                {contentLabel}
              </p>
              <h3 className="mt-0.5 text-[1.12rem] font-extrabold tracking-tight text-[#12151c] sm:text-[1.2rem]">
                {active?.title}
              </h3>
            </div>
            {active ? (
              <Link
                href={active.href}
                onClick={onNavigate}
                className="focus-ring shrink-0 rounded-full border border-[#c9a227]/55 bg-[#fbfcfe] px-3 py-1 text-[0.68rem] font-bold text-[#7a5e0c] transition-colors hover:bg-[#f0e4b8]"
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
                  className="focus-ring group flex items-center gap-2 rounded-lg border border-transparent px-2.5 py-2.5 text-[0.88rem] font-semibold text-[#1a1f27] transition-colors hover:border-[#c9a227]/35 hover:bg-[#fbfcfe] hover:text-[#8f6f12]"
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
  const { header } = useSiteContent();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [mobileGroup, setMobileGroup] = useState<string | null>(null);
  const [megaCategory, setMegaCategory] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const navId = useId();
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
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
    (item) => item.label === openDropdown && usesSidebarMega(item.label),
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

  const isSidebarMega = Boolean(openMegaItem?.groups?.length);
  const megaLabels = openMegaItem
    ? megaPanelLabels(openMegaItem.label)
    : { sidebar: "Categories", content: "Explore" };

  return (
    <header
      ref={headerRef}
      className={`absolute inset-x-0 top-0 z-50 pt-[var(--safe-top)] transition-colors duration-300 ${
        scrolled || mobileOpen
          ? "bg-[rgba(8,12,18,0.88)] backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="relative mx-auto max-w-[92rem] px-4 sm:px-5 lg:px-6 xl:px-8">
        <div className="flex h-[5rem] items-center gap-3 sm:h-[5.25rem] lg:gap-4">
          <Link href="/" className="focus-ring relative z-10 shrink-0" aria-label="Ambition Holiday home">
            <Image
              src={header.logoSrc}
              alt="Ambition Holidays — Journeys Beyond Limits"
              width={977}
              height={258}
              priority
              sizes="180px"
              quality={80}
              className="h-[2.60rem] w-auto object-contain sm:h-[2.83rem] lg:h-[3.16rem]"
              key={header.logoSrc}
            />
          </Link>

          <nav
            className="hidden min-w-0 flex-1 items-center justify-center xl:flex"
            aria-label="Primary"
          >
            <ul className="flex items-center gap-0.5 2xl:gap-1">
              {NAV_ITEMS.map((item) => {
                const menu = hasMenu(item);
                const isOpen = openDropdown === item.label;
                const isWideMega = usesSidebarMega(item.label);
                const isStack = usesStackDropdown(item.label) || Boolean(item.children?.length);
                const stackLinks = isStack ? flattenNavLinks(item) : [];

                return (
                  <li key={item.label} className={isWideMega ? undefined : "relative"}>
                    {menu ? (
                      <>
                        <button
                          type="button"
                          className={`focus-ring inline-flex items-center gap-1.5 rounded-md px-2.5 py-2 text-[0.90rem] font-bold tracking-[0.04em] text-white transition-colors duration-200 hover:text-gold 2xl:px-3 2xl:text-[0.97rem] ${
                            isOpen ? "text-gold" : ""
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
                        </button>
                        {isOpen && isStack && stackLinks.length ? (
                          <StackGlassDropdown
                            links={stackLinks}
                            onNavigate={() => setOpenDropdown(null)}
                          />
                        ) : null}
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        className="focus-ring inline-flex items-center rounded-md px-2.5 py-2 text-[0.90rem] font-bold tracking-[0.04em] text-white transition-colors duration-200 hover:text-gold 2xl:px-3 2xl:text-[0.97rem]"
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="ml-auto flex items-center gap-1.5 sm:gap-2 lg:gap-2.5">
            <button
              type="button"
              aria-label="Favourites"
              className="focus-ring mr-3.5 hidden rounded-full p-2 text-white transition-colors hover:text-gold md:inline-flex lg:mr-5"
            >
              <svg viewBox="0 0 24 24" className="h-[1.33rem] w-[1.33rem]" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden="true">
                <path
                  d="M12 20.4S4.8 15.7 4.8 10.4A3.95 3.95 0 0 1 12 7.35a3.95 3.95 0 0 1 7.2 3.05c0 5.3-7.2 10-7.2 10Z"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

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
              <span className="text-[0.84rem] font-semibold tracking-wide text-gold">
                {PHONE_DISPLAY}
              </span>
            </a>

            <button
              type="button"
              className="focus-ring inline-flex rounded-md p-2 text-white xl:hidden"
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
            className="animate-dropdown fixed left-1/2 top-[5rem] z-[60] hidden w-[min(calc(100vw-2rem),64rem)] -translate-x-1/2 pt-1.5 sm:top-[5.25rem] xl:block"
            onMouseLeave={() => setOpenDropdown(null)}
          >
            {isSidebarMega ? (
              <DestinationsMegaPanel
                groups={openMegaItem.groups!}
                activeTitle={megaCategory || openMegaItem.groups![0].title}
                sidebarLabel={megaLabels.sidebar}
                contentLabel={megaLabels.content}
                onSelectCategory={setMegaCategory}
                onNavigate={() => setOpenDropdown(null)}
              />
            ) : null}
          </div>
        ) : null}
      </div>

      <div id={navId} className={`xl:hidden ${mobileOpen ? "block" : "hidden"}`}>
        <div
          className="max-h-[calc(100dvh-4.75rem-var(--safe-top))] overflow-y-auto overscroll-contain border-t border-white/10 bg-[rgba(8,12,18,0.96)] px-4 pb-[max(2rem,var(--safe-bottom))] pt-3 backdrop-blur-lg"
          style={{ fontFamily: "var(--font-manrope), ui-sans-serif, system-ui, sans-serif" }}
        >
          <ul className="space-y-1">
            {NAV_ITEMS.map((item) => {
              const menu = hasMenu(item);
              const expanded = mobileExpanded === item.label;
              const useSidebarMobile = usesSidebarMega(item.label);
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
                        item.groups && useSidebarMobile ? (
                          <div
                            className="animate-dropdown mb-3 overflow-hidden rounded-[1.15rem] border border-[#c9a227]/35 p-2.5 shadow-[0_14px_36px_rgba(0,0,0,0.22)]"
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
                            <p className="mb-2 px-1 text-[0.6rem] font-bold uppercase tracking-[0.18em] text-[#7a5e0c]">
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
                                        : "bg-[#fbfcfe] text-[#2a3340] ring-1 ring-[#c9a227]/30"
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
                                  className="rounded-xl p-3 ring-1 ring-[#c9a227]/20"
                                  style={{ background: MEGA_MAIN }}
                                >
                                  <div className="mb-2 flex items-center justify-between gap-2">
                                    <p className="text-[0.84rem] font-extrabold text-[#12151c]">
                                      {active.title}
                                    </p>
                                    <Link
                                      href={active.href}
                                      className="text-[0.68rem] font-bold text-[#7a5e0c]"
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
                                          className="focus-ring flex items-center gap-2 rounded-lg px-2 py-2 text-[0.86rem] font-semibold text-[#1a1f27] hover:bg-[#fbfcfe] hover:text-[#8f6f12]"
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
                            className="animate-dropdown mb-3 overflow-hidden rounded-xl border border-[#c9a227]/40"
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
                                    className={`focus-ring block px-4 py-3 text-[0.9rem] font-semibold text-[#1a1f27] hover:bg-[#c9a227]/12 hover:text-[#8f6f12] ${
                                      index < stackLinks.length - 1
                                        ? "border-b border-dashed border-[#c9a227]/28"
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

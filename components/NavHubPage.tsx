import Link from "next/link";
import Image from "next/image";
import DuskAtmosphere from "@/components/DuskAtmosphere";
import Header from "@/components/Header";
import type { NavGroup, NavItem } from "@/lib/nav";
import { DEST_SHOWCASE } from "@/lib/dest-showcase";

const WHATSAPP_URL = "https://wa.me/9779851148898";

function hubCopy(label: string) {
  if (label === "Destinations") {
    return {
      eyebrow: "Explore the Himalayas",
      body: "Four regions. Endless possibilities — Nepal, Bhutan, Tibet, and multi-country journeys.",
    };
  }
  if (label === "Luxury Tour & Trek") {
    return {
      eyebrow: "Luxury journeys",
      body: "Lodge trails, private guiding, and elevated mountain experiences.",
    };
  }
  if (label === "Experiences") {
    return {
      eyebrow: "Signature moments",
      body: "Helicopter, private expeditions, culture, and photography.",
    };
  }
  if (label === "Travel Guide") {
    return {
      eyebrow: "Plan with confidence",
      body: "Visas, seasons, packing, altitude, and permits — clear and calm.",
    };
  }
  if (label === "Company") {
    return {
      eyebrow: "The house",
      body: "About us, how to book, partnerships and the legal pages behind Ambition Holidays.",
    };
  }
  return {
    eyebrow: "Ambition Holiday",
    body: "Premium Nepal trekking and adventure travel.",
  };
}

function GroupPanel({ group, compact }: { group: NavGroup; compact?: boolean }) {
  return (
    <section
      id={group.href.replace(/^\//, "")}
      className={`hl-card rounded-[1.15rem] border border-[#c9a227]/35 ${compact ? "p-3.5" : "p-4 sm:p-5"}`}
    >
      <div className="mb-2.5 flex flex-wrap items-center justify-between gap-2 border-b border-[#c9a227]/22 pb-2.5">
        <h2
          className={`font-extrabold tracking-tight text-white ${
            compact ? "text-[1rem]" : "text-[1.08rem]"
          }`}
        >
          {group.title}
        </h2>
        <Link href={group.href} className="focus-ring text-[0.7rem] font-bold text-gold">
          View all →
        </Link>
      </div>
      <ul className={`grid gap-0.5 ${compact ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"}`}>
        {group.links.map((child) => (
          <li key={child.href}>
            <Link
              href={child.href}
              className="focus-ring group inline-flex items-center gap-2 rounded-lg px-2 py-2 text-[0.88rem] font-semibold text-white/90 hover:bg-white/10 hover:text-gold"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#c9a227]" aria-hidden="true" />
              {child.label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function NavHubPage({ item }: { item: NavItem }) {
  const copy = hubCopy(item.label);
  const groups = item.groups ?? [];
  const compact = item.label === "Experiences" || item.label === "Travel Guide";

  return (
    <main className="home-light min-h-screen min-w-0 overflow-x-clip pb-[env(safe-area-inset-bottom)] text-[#f7f4ef]">
      <div className="relative isolate [clip-path:inset(0)]">
        <DuskAtmosphere />
        <Header />

        <section
          className={`relative mx-auto px-4 pb-14 pt-[max(8rem,calc(env(safe-area-inset-top)+6rem))] sm:px-6 lg:px-8 ${
            compact ? "max-w-3xl" : "max-w-6xl"
          }`}
        >
          <div className="hl-panel relative overflow-hidden rounded-[1.25rem] border border-gold/40">
            <div
              className="h-[2px] w-full"
              style={{
                background:
                  "linear-gradient(90deg, transparent, #c9a227 20%, #e8d48a 50%, #c9a227 80%, transparent)",
              }}
              aria-hidden="true"
            />
            <div className="px-5 py-5 sm:px-7 sm:py-6">
              <p className="text-[0.64rem] font-bold uppercase tracking-[0.18em] text-gold">
                {copy.eyebrow}
              </p>
              <h1 className="mt-1.5 text-[clamp(1.7rem,4.5vw,2.45rem)] font-extrabold tracking-tight text-white">
                {item.label === "Destinations" ? "Extraordinary Destinations Await" : item.label}
              </h1>
              <p className="mt-2 max-w-2xl text-[0.92rem] font-medium leading-relaxed text-white/80">
                {copy.body}
              </p>
            </div>
          </div>

          {item.label === "Destinations" ? (
            <div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
              {DEST_SHOWCASE.map((dest) => (
                <Link
                  key={dest.id}
                  href={dest.href}
                  className="focus-ring group relative overflow-hidden rounded-[1.15rem] border border-white/15"
                >
                  <span className="relative block aspect-[5/4] w-full">
                    <Image
                      src={dest.imageSrc}
                      alt={dest.imageAlt}
                      fill
                      sizes="(max-width: 1024px) 50vw, 22vw"
                      className="object-cover"
                    />
                    <span className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                    <span className="absolute inset-x-0 bottom-0 p-3">
                      <span className="block text-[1.05rem] font-semibold text-white">{dest.title}</span>
                      <span className="block text-[0.72rem] text-white/75">{dest.subtitle}</span>
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          ) : null}

          <div className={`mt-5 grid grid-cols-1 gap-3.5 ${compact ? "" : "lg:grid-cols-2"}`}>
            {groups.map((group) => (
              <GroupPanel key={group.title} group={group} compact={compact} />
            ))}
          </div>

          <div className="mt-7 flex flex-wrap gap-2.5">
            <Link
              href="/"
              className="focus-ring inline-flex min-h-10 items-center rounded-md border border-gold/55 bg-gold/10 px-4 py-2 text-sm font-bold text-gold"
            >
              Back to home
            </Link>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring inline-flex min-h-10 items-center rounded-md bg-[#12151c] px-4 py-2 text-sm font-bold text-white"
            >
              WhatsApp us
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}

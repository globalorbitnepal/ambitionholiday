"use client";

import Link from "next/link";
import Header from "@/components/Header";
import SiteFooter from "@/components/SiteFooter";
import DuskAtmosphere from "@/components/DuskAtmosphere";
import SiteContentProvider from "@/components/SiteContentProvider";
import { useFavorites } from "@/lib/use-favorites";
import { DEFAULT_CONTENT } from "@/lib/content-types";

export default function SavedPage() {
  const { items, toggle } = useFavorites();
  return (
    <SiteContentProvider initial={DEFAULT_CONTENT}>
      <main className="home-light relative isolate min-h-screen text-[#f7f4ef]">
        <Header />
        <section className="mx-auto max-w-5xl px-5 pb-20 pt-28">
          <p className="text-xs tracking-[0.18em] text-[#c9a227]">SAVED</p>
          <h1 className="mt-2 text-4xl font-bold">Packages you kept</h1>
          <p className="mt-2 max-w-2xl text-white/70">Heart a journey on any package page to keep it here, then share or enquire when you are ready.</p>
          {items.length ? (
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {items.map((item) => (
                <article key={item.id} className="overflow-hidden rounded-2xl border border-white/10 bg-black/25">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.heroSrc} alt={item.title} className="h-44 w-full object-cover" />
                  <div className="p-4">
                    <h2 className="text-lg font-semibold">{item.title}</h2>
                    <p className="text-sm text-[#c9a227]">USD {item.priceUsd.toLocaleString()} / person</p>
                    <div className="mt-3 flex gap-2">
                      <Link className="rounded-full bg-[#c9a227] px-4 py-2 text-sm font-bold text-[#1a1610]" href={`/${item.slug}`}>
                        Open package
                      </Link>
                      <button type="button" className="rounded-full border border-white/20 px-4 py-2 text-sm" onClick={() => toggle(item)}>
                        Remove
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p className="mt-10 text-white/65">Nothing saved yet. Open a package and tap the heart.</p>
          )}
        </section>
        <div className="relative isolate [clip-path:inset(0)]">
          <DuskAtmosphere />
          <SiteFooter />
        </div>
      </main>
    </SiteContentProvider>
  );
}

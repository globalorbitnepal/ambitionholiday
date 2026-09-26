"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { DEFAULT_CONTENT, type SiteContent } from "@/lib/content-types";
import { mergeHeaderNav } from "@/lib/header-nav";
import { normalizeSiteContent } from "@/lib/normalize-site-content";

const SiteContentContext = createContext<SiteContent | null>(null);

export function useSiteContent() {
  const raw = useContext(SiteContentContext);
  return normalizeSiteContent(raw ?? DEFAULT_CONTENT);
}

type Props = {
  initial: SiteContent;
  children: ReactNode;
  /** Public pages omit this so visitors are not polled every few seconds. */
  pollMs?: number;
};

export default function SiteContentProvider({
  initial,
  children,
  pollMs = 0,
}: Props) {
  const [content, setContent] = useState(() => normalizeSiteContent(initial));

  const refresh = useCallback(async () => {
    if (document.visibilityState === "hidden") return;
    try {
      const res = await fetch(`/api/content?t=${Date.now()}`, {
        cache: "no-store",
      });
      if (!res.ok) return;
      const data = (await res.json()) as SiteContent;
      const merged: SiteContent = {
        ...DEFAULT_CONTENT,
        ...data,
        headerNav: mergeHeaderNav(data.headerNav),
        mediaCatalog: data.mediaCatalog ?? DEFAULT_CONTENT.mediaCatalog,
        signature: {
          ...DEFAULT_CONTENT.signature,
          ...data.signature,
          stats: data.signature?.stats ?? DEFAULT_CONTENT.signature.stats,
          cards: data.signature?.cards ?? DEFAULT_CONTENT.signature.cards,
          footItems: data.signature?.footItems ?? DEFAULT_CONTENT.signature.footItems,
        },
        why: {
          ...DEFAULT_CONTENT.why,
          ...data.why,
          boards: data.why?.boards ?? DEFAULT_CONTENT.why.boards,
          reviews: data.why?.reviews ?? DEFAULT_CONTENT.why.reviews,
          stats: data.why?.stats ?? DEFAULT_CONTENT.why.stats,
        },
        experiences: {
          ...DEFAULT_CONTENT.experiences,
          ...data.experiences,
          cards: data.experiences?.cards ?? DEFAULT_CONTENT.experiences.cards,
        },
        availability: {
          ...DEFAULT_CONTENT.availability,
          ...data.availability,
          cards: data.availability?.cards ?? DEFAULT_CONTENT.availability.cards,
          footItems: data.availability?.footItems ?? DEFAULT_CONTENT.availability.footItems,
        },
        journal: {
          ...DEFAULT_CONTENT.journal,
          ...data.journal,
          videos: data.journal?.videos ?? DEFAULT_CONTENT.journal.videos,
          features: data.journal?.features ?? DEFAULT_CONTENT.journal.features,
        },
        blog: {
          ...DEFAULT_CONTENT.blog,
          ...data.blog,
          featured: data.blog?.featured ?? DEFAULT_CONTENT.blog.featured,
          sidePosts: data.blog?.sidePosts ?? DEFAULT_CONTENT.blog.sidePosts,
          posts: data.blog?.posts ?? DEFAULT_CONTENT.blog.posts,
          features: data.blog?.features ?? DEFAULT_CONTENT.blog.features,
        },
        about: {
          ...DEFAULT_CONTENT.about,
          ...data.about,
          pillars: data.about?.pillars ?? DEFAULT_CONTENT.about.pillars,
          stats: data.about?.stats ?? DEFAULT_CONTENT.about.stats,
          licenses: data.about?.licenses ?? DEFAULT_CONTENT.about.licenses,
        },
        legalDocuments: {
          ...DEFAULT_CONTENT.legalDocuments,
          ...data.legalDocuments,
          documents: data.legalDocuments?.documents ?? DEFAULT_CONTENT.legalDocuments.documents,
        },
        visa: {
          ...DEFAULT_CONTENT.visa,
          ...data.visa,
          visaFees: data.visa?.visaFees ?? DEFAULT_CONTENT.visa.visaFees,
          permitCards: data.visa?.permitCards ?? DEFAULT_CONTENT.visa.permitCards,
          parkFees: data.visa?.parkFees ?? DEFAULT_CONTENT.visa.parkFees,
          restricted: data.visa?.restricted ?? DEFAULT_CONTENT.visa.restricted,
          airportSteps: data.visa?.airportSteps ?? DEFAULT_CONTENT.visa.airportSteps,
          countries: data.visa?.countries ?? DEFAULT_CONTENT.visa.countries,
        },
        bestTime: {
          ...DEFAULT_CONTENT.bestTime,
          ...data.bestTime,
          months: data.bestTime?.months ?? DEFAULT_CONTENT.bestTime.months,
          seasons: data.bestTime?.seasons ?? DEFAULT_CONTENT.bestTime.seasons,
          regions: data.bestTime?.regions ?? DEFAULT_CONTENT.bestTime.regions,
          altitudes: data.bestTime?.altitudes ?? DEFAULT_CONTENT.bestTime.altitudes,
        },
        packing: {
          ...DEFAULT_CONTENT.packing,
          ...data.packing,
          checks: data.packing?.checks ?? DEFAULT_CONTENT.packing.checks,
          groups: data.packing?.groups ?? DEFAULT_CONTENT.packing.groups,
          documents: data.packing?.documents ?? DEFAULT_CONTENT.packing.documents,
          provided: data.packing?.provided ?? DEFAULT_CONTENT.packing.provided,
          seasons: data.packing?.seasons ?? DEFAULT_CONTENT.packing.seasons,
        },
        altitude: {
          ...DEFAULT_CONTENT.altitude,
          ...data.altitude,
          checks: data.altitude?.checks ?? DEFAULT_CONTENT.altitude.checks,
          groups: data.altitude?.groups ?? DEFAULT_CONTENT.altitude.groups,
          documents: data.altitude?.documents ?? DEFAULT_CONTENT.altitude.documents,
          provided: data.altitude?.provided ?? DEFAULT_CONTENT.altitude.provided,
          seasons: data.altitude?.seasons ?? DEFAULT_CONTENT.altitude.seasons,
        },
        permits: {
          ...DEFAULT_CONTENT.permits,
          ...data.permits,
          families: data.permits?.families ?? DEFAULT_CONTENT.permits.families,
          routes: data.permits?.routes ?? DEFAULT_CONTENT.permits.routes,
          parkFees: data.permits?.parkFees ?? DEFAULT_CONTENT.permits.parkFees,
          restricted: data.permits?.restricted ?? DEFAULT_CONTENT.permits.restricted,
          peaks: data.permits?.peaks ?? DEFAULT_CONTENT.permits.peaks,
        },
        nepal: {
          ...DEFAULT_CONTENT.nepal,
          ...data.nepal,
          categories: data.nepal?.categories ?? DEFAULT_CONTENT.nepal.categories,
        },
        bhutan: {
          ...DEFAULT_CONTENT.bhutan,
          ...data.bhutan,
          categories: data.bhutan?.categories ?? DEFAULT_CONTENT.bhutan.categories,
        },
        tibet: {
          ...DEFAULT_CONTENT.tibet,
          ...data.tibet,
          categories: data.tibet?.categories ?? DEFAULT_CONTENT.tibet.categories,
        },
        multi: {
          ...DEFAULT_CONTENT.multi,
          ...data.multi,
          categories: data.multi?.categories ?? DEFAULT_CONTENT.multi.categories,
        },
        helicopter: {
          ...DEFAULT_CONTENT.helicopter,
          ...data.helicopter,
          categories: data.helicopter?.categories ?? DEFAULT_CONTENT.helicopter.categories,
        },
        photography: {
          ...DEFAULT_CONTENT.photography,
          ...data.photography,
          categories: data.photography?.categories ?? DEFAULT_CONTENT.photography.categories,
        },
        footer: {
          ...DEFAULT_CONTENT.footer,
          ...data.footer,
          members: data.footer?.members?.some((m) => m.imageSrc)
            ? data.footer.members
            : DEFAULT_CONTENT.footer.members,
          socials: data.footer?.socials ?? DEFAULT_CONTENT.footer.socials,
          payments: data.footer?.payments ?? DEFAULT_CONTENT.footer.payments,
          phones: data.footer?.phones ?? DEFAULT_CONTENT.footer.phones,
          usefulLinks: data.footer?.usefulLinks ?? DEFAULT_CONTENT.footer.usefulLinks,
          adventureLinks: data.footer?.adventureLinks ?? DEFAULT_CONTENT.footer.adventureLinks,
          trekLinks: data.footer?.trekLinks ?? DEFAULT_CONTENT.footer.trekLinks,
          legalLinks: data.footer?.legalLinks ?? DEFAULT_CONTENT.footer.legalLinks,
        },
        tripPackages: data.tripPackages?.length ? data.tripPackages : DEFAULT_CONTENT.tripPackages,
      };
      setContent((prev) => (prev.updatedAt === merged.updatedAt ? prev : merged));
    } catch {
      // ignore network blips
    }
  }, []);

  useEffect(() => {
    setContent(normalizeSiteContent(initial));
  }, [initial]);

  useEffect(() => {
    // Public site: no focus/visibility refetch (avoids mobile hang when switching apps).
    // Orbit (pollMs > 0): keep live refresh while editing.
    if (pollMs <= 0) return;

    const onWake = () => {
      void refresh();
    };
    window.addEventListener("focus", onWake);
    document.addEventListener("visibilitychange", onWake);

    const id = window.setInterval(() => {
      void refresh();
    }, pollMs);

    return () => {
      window.removeEventListener("focus", onWake);
      document.removeEventListener("visibilitychange", onWake);
      window.clearInterval(id);
    };
  }, [pollMs, refresh]);

  return (
    <SiteContentContext.Provider value={content}>
      {children}
    </SiteContentContext.Provider>
  );
}

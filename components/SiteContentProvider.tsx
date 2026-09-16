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

const SiteContentContext = createContext<SiteContent | null>(null);

export function useSiteContent() {
  return useContext(SiteContentContext) ?? DEFAULT_CONTENT;
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
  const [content, setContent] = useState(initial);

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
          features: data.blog?.features ?? DEFAULT_CONTENT.blog.features,
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
      };
      setContent((prev) => (prev.updatedAt === merged.updatedAt ? prev : merged));
    } catch {
      // ignore network blips
    }
  }, []);

  useEffect(() => {
    setContent(initial);
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

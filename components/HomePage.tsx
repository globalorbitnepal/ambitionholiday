"use client";

import DuskAtmosphere from "@/components/DuskAtmosphere";
import Hero from "@/components/Hero";
import ExploreHubSection from "@/components/ExploreHubSection";
import LuxuryTreksSection from "@/components/LuxuryTreksSection";
import SignatureSection from "@/components/SignatureSection";
import WhyAmbitionSection from "@/components/WhyAmbitionSection";
import ExperiencesSection from "@/components/ExperiencesSection";
import AvailabilitySection from "@/components/AvailabilitySection";
import VideoJournalSection from "@/components/VideoJournalSection";
import BlogSection from "@/components/BlogSection";
import SiteFooter from "@/components/SiteFooter";
import SiteContentProvider from "@/components/SiteContentProvider";
import type { SiteContent } from "@/lib/content-types";

function HomeSections() {
  return (
    <>
      <Hero />
      <ExploreHubSection />
      <SignatureSection />
      <LuxuryTreksSection />
      <WhyAmbitionSection />
      <div className="home-light relative isolate [clip-path:inset(0)] text-[#f7f4ef]">
        <DuskAtmosphere />
        <ExperiencesSection />
        <AvailabilitySection />
        <VideoJournalSection />
        <BlogSection />
        <SiteFooter />
      </div>
    </>
  );
}

export default function HomePage({ initial }: { initial: SiteContent }) {
  return (
    <SiteContentProvider initial={initial}>
      <main className="min-w-0 overflow-x-clip pb-[env(safe-area-inset-bottom)]">
        <HomeSections />
      </main>
    </SiteContentProvider>
  );
}

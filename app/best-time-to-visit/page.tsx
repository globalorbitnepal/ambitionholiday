import type { Metadata } from "next";
import BestTimePage from "@/components/BestTimePage";
import SiteContentProvider from "@/components/SiteContentProvider";
import { readContent } from "@/lib/content";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const content = await readContent();
  const bestTime = content.bestTime;
  return {
    title: bestTime?.metaTitle || "Best Time to Visit Nepal | Ambition Holidays",
    description:
      bestTime?.metaDescription ||
      "Best time to trek and travel in Nepal — spring, autumn, monsoon rain-shadow and winter short treks. Ambition Holidays.",
    alternates: { canonical: "/best-time-to-visit" },
  };
}

export default async function BestTimeToVisitRoute() {
  const content = await readContent();
  return (
    <SiteContentProvider initial={content}>
      <BestTimePage />
    </SiteContentProvider>
  );
}

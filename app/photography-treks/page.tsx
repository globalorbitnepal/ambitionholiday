import type { Metadata } from "next";
import PhotographyPage from "@/components/PhotographyPage";
import SiteContentProvider from "@/components/SiteContentProvider";
import { readContent } from "@/lib/content";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const content = await readContent();
  const photography = content.photography;
  return {
    title: photography?.metaTitle || "Luxury Nepal Photography Treks | Ambition Holidays",
    description:
      photography?.metaDescription ||
      "Luxury Nepal photography treks — Everest, Gokyo, Annapurna, Mustang and more by Ambition Holidays.",
    alternates: { canonical: "/photography-treks" },
  };
}

export default async function PhotographyTreksRoute() {
  const content = await readContent();
  return (
    <SiteContentProvider initial={content}>
      <PhotographyPage />
    </SiteContentProvider>
  );
}

import type { Metadata } from "next";
import PackingPage from "@/components/PackingPage";
import SiteContentProvider from "@/components/SiteContentProvider";
import { readContent } from "@/lib/content";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const content = await readContent();
  const packing = content.packing;
  return {
    title: packing?.metaTitle || "Packing Guide for Nepal Treks | Ambition Holidays",
    description:
      packing?.metaDescription ||
      "Luxury packing list for Nepal trekking — layers, boots, documents and what Ambition Holidays issues in Kathmandu.",
    alternates: { canonical: "/packing-guide" },
  };
}

export default async function PackingGuideRoute() {
  const content = await readContent();
  return (
    <SiteContentProvider initial={content}>
      <PackingPage />
    </SiteContentProvider>
  );
}

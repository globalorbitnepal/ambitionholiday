import type { Metadata } from "next";
import NepalPage from "@/components/NepalPage";
import SiteContentProvider from "@/components/SiteContentProvider";
import { readContent } from "@/lib/content";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const content = await readContent();
  const nepal = content.nepal;
  return {
    title: nepal?.metaTitle || "Luxury Nepal Tours & Treks | Ambition Holidays",
    description:
      nepal?.metaDescription ||
      "Luxury Nepal packages — trekking, heritage, wildlife and helicopter journeys by Ambition Holidays.",
    alternates: { canonical: "/nepal" },
  };
}

export default async function NepalRoute() {
  const content = await readContent();
  return (
    <SiteContentProvider initial={content}>
      <NepalPage />
    </SiteContentProvider>
  );
}

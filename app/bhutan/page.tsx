import type { Metadata } from "next";
import BhutanPage from "@/components/BhutanPage";
import SiteContentProvider from "@/components/SiteContentProvider";
import { readContent } from "@/lib/content";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const content = await readContent();
  const bhutan = content.bhutan;
  return {
    title: bhutan?.metaTitle || "Luxury Bhutan Tours & Treks | Ambition Holidays",
    description:
      bhutan?.metaDescription ||
      "Luxury Bhutan packages — Paro, Thimphu, Punakha, festivals and Himalayan treks by Ambition Holidays.",
    alternates: { canonical: "/bhutan" },
  };
}

export default async function BhutanRoute() {
  const content = await readContent();
  return (
    <SiteContentProvider initial={content}>
      <BhutanPage />
    </SiteContentProvider>
  );
}

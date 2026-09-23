import type { Metadata } from "next";
import HelicopterPage from "@/components/HelicopterPage";
import SiteContentProvider from "@/components/SiteContentProvider";
import { readContent } from "@/lib/content";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const content = await readContent();
  const helicopter = content.helicopter;
  return {
    title: helicopter?.metaTitle || "Luxury Nepal Helicopter Tours | Ambition Holidays",
    description:
      helicopter?.metaDescription ||
      "Luxury Nepal helicopter tours — Everest, Annapurna and exclusive Himalayan air days by Ambition Holidays.",
    alternates: { canonical: "/helicopter-tours" },
  };
}

export default async function HelicopterToursRoute() {
  const content = await readContent();
  return (
    <SiteContentProvider initial={content}>
      <HelicopterPage />
    </SiteContentProvider>
  );
}

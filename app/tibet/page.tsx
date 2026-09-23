import type { Metadata } from "next";
import TibetPage from "@/components/TibetPage";
import SiteContentProvider from "@/components/SiteContentProvider";
import { readContent } from "@/lib/content";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const content = await readContent();
  const tibet = content.tibet;
  return {
    title: tibet?.metaTitle || "Luxury Tibet Tours | Ambition Holidays",
    description:
      tibet?.metaDescription ||
      "Luxury Tibet packages — Lhasa, Yamdrok, Everest North Face and Mount Kailash by Ambition Holidays.",
    alternates: { canonical: "/tibet" },
  };
}

export default async function TibetRoute() {
  const content = await readContent();
  return (
    <SiteContentProvider initial={content}>
      <TibetPage />
    </SiteContentProvider>
  );
}

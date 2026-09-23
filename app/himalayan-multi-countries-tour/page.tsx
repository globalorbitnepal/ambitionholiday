import type { Metadata } from "next";
import MultiCountryPage from "@/components/MultiCountryPage";
import SiteContentProvider from "@/components/SiteContentProvider";
import { readContent } from "@/lib/content";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const content = await readContent();
  const multi = content.multi;
  return {
    title: multi?.metaTitle || "Himalayan Multi-Country Luxury Tours | Ambition Holidays",
    description:
      multi?.metaDescription ||
      "Luxury Nepal, Bhutan and Tibet combination tours by Ambition Holidays.",
    alternates: { canonical: "/himalayan-multi-countries-tour" },
  };
}

export default async function HimalayanMultiCountriesRoute() {
  const content = await readContent();
  return (
    <SiteContentProvider initial={content}>
      <MultiCountryPage />
    </SiteContentProvider>
  );
}

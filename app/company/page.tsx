import type { Metadata } from "next";
import CompanyPage from "@/components/CompanyPage";
import SiteContentProvider from "@/components/SiteContentProvider";
import { readContent } from "@/lib/content";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const content = await readContent();
  const about = content.about;
  return {
    title: about?.metaTitle?.replace("About Us", "Company") || "Company | Ambition Holidays",
    description:
      about?.metaDescription ||
      "Ambition Holidays company — 10+ years in luxury Himalayan tours and treks, sister company of Ambition Himalaya Treks and Expeditions.",
    alternates: { canonical: "/company" },
  };
}

export default async function CompanyRoute() {
  const content = await readContent();
  return (
    <SiteContentProvider initial={content}>
      <CompanyPage />
    </SiteContentProvider>
  );
}

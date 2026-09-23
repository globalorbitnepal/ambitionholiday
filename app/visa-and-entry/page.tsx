import type { Metadata } from "next";
import VisaPage from "@/components/VisaPage";
import SiteContentProvider from "@/components/SiteContentProvider";
import { readContent } from "@/lib/content";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const content = await readContent();
  const visa = content.visa;
  return {
    title: visa?.metaTitle || "Visa & Entry | Ambition Holidays",
    description:
      visa?.metaDescription ||
      "Nepal tourist visas, trekking permits, park fees and Kathmandu airport — Ambition Holidays travel guide.",
    alternates: { canonical: "/visa-and-entry" },
  };
}

export default async function VisaAndEntryRoute() {
  const content = await readContent();
  return (
    <SiteContentProvider initial={content}>
      <VisaPage />
    </SiteContentProvider>
  );
}

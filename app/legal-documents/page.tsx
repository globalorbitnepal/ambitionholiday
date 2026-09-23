import type { Metadata } from "next";
import LegalDocumentsPage from "@/components/LegalDocumentsPage";
import SiteContentProvider from "@/components/SiteContentProvider";
import { readContent } from "@/lib/content";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const content = await readContent();
  const page = content.legalDocuments;
  return {
    title: page?.metaTitle || "Legal Documents | Ambition Holidays",
    description:
      page?.metaDescription ||
      "Licences and registrations for Ambition Holidays — sister company of Ambition Himalaya Treks and Expeditions.",
    alternates: { canonical: "/legal-documents" },
  };
}

export default async function LegalDocumentsRoute() {
  const content = await readContent();
  return (
    <SiteContentProvider initial={content}>
      <LegalDocumentsPage />
    </SiteContentProvider>
  );
}

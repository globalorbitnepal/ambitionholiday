import type { Metadata } from "next";
import PermitsPage from "@/components/PermitsPage";
import SiteContentProvider from "@/components/SiteContentProvider";
import { readContent } from "@/lib/content";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const content = await readContent();
  const permits = content.permits;
  return {
    title: permits?.metaTitle || "Trekking Permits & Fees in Nepal | Ambition Holidays",
    description:
      permits?.metaDescription ||
      "Official Nepal TIMS, park, restricted-area and NMA peak permit fees — Ambition Holidays.",
    alternates: { canonical: "/permits-and-fees" },
  };
}

export default async function PermitsAndFeesRoute() {
  const content = await readContent();
  return (
    <SiteContentProvider initial={content}>
      <PermitsPage />
    </SiteContentProvider>
  );
}

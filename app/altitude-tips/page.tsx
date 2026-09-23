import type { Metadata } from "next";
import AltitudePage from "@/components/AltitudePage";
import SiteContentProvider from "@/components/SiteContentProvider";
import { readContent } from "@/lib/content";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const content = await readContent();
  const altitude = content.altitude;
  return {
    title: altitude?.metaTitle || "Altitude Tips for Nepal Treks | Ambition Holidays",
    description:
      altitude?.metaDescription ||
      "Altitude sickness briefing for Nepal treks — AMS, rest days and how Ambition Holidays paces luxury itineraries.",
    alternates: { canonical: "/altitude-tips" },
  };
}

export default async function AltitudeTipsRoute() {
  const content = await readContent();
  return (
    <SiteContentProvider initial={content}>
      <AltitudePage />
    </SiteContentProvider>
  );
}

import JournalIndexPage from "@/components/JournalIndexPage";
import SiteContentProvider from "@/components/SiteContentProvider";
import { readContent } from "@/lib/content";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  title: "Journal | Ambition Holidays",
  description:
    "Himalayan travel stories, lake treks, luxury Everest guides and short adventures from Ambition Holidays.",
  alternates: { canonical: "/journal" },
};

export default async function JournalPage() {
  const content = await readContent();
  return (
    <SiteContentProvider initial={content}>
      <JournalIndexPage />
    </SiteContentProvider>
  );
}

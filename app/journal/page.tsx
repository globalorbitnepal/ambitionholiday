import type { Metadata } from "next";
import JournalIndexPage from "@/components/JournalIndexPage";
import SiteContentProvider from "@/components/SiteContentProvider";
import { blogCategories } from "@/lib/blog";
import { readContent } from "@/lib/content";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type Props = { searchParams: Promise<{ category?: string }> };

const DEFAULT_DESCRIPTION =
  "Himalayan travel stories, lake treks, luxury Everest guides and short adventures from Ambition Holidays.";

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { category } = await searchParams;
  const content = await readContent();
  const cat = category ? blogCategories(content.blog).find((item) => item.slug === category) : undefined;
  if (!cat) {
    return {
      title: "Journal | Ambition Holidays",
      description: DEFAULT_DESCRIPTION,
      alternates: { canonical: "/journal" },
      openGraph: { title: "Journal | Ambition Holidays", description: DEFAULT_DESCRIPTION, url: "/journal", type: "website" },
    };
  }
  const title = `${cat.label} | Journal | Ambition Holidays`;
  const description = cat.description || `${cat.label} articles from the Ambition Holidays Himalayan journal.`;
  return {
    title,
    description,
    alternates: { canonical: `/journal?category=${cat.slug}` },
    openGraph: { title, description, url: `/journal?category=${cat.slug}`, type: "website" },
  };
}

export default async function JournalPage({ searchParams }: Props) {
  const { category } = await searchParams;
  const content = await readContent();
  return (
    <SiteContentProvider initial={content}>
      <JournalIndexPage category={category || ""} />
    </SiteContentProvider>
  );
}

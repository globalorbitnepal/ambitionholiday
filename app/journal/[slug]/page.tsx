import type { Metadata } from "next";
import { notFound } from "next/navigation";
import JournalArticleView from "@/components/JournalArticleView";
import SiteContentProvider from "@/components/SiteContentProvider";
import { findJournalPost, publishedJournalPosts } from "@/lib/blog";
import { readContent } from "@/lib/content";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const content = await readContent();
  const post = findJournalPost(content.blog, slug);
  if (!post || post.status === "draft") {
    return { title: "Journal | Ambition Holidays" };
  }
  return {
    title: post.metaTitle || `${post.title} | Ambition Holidays`,
    description: post.metaDescription || post.excerpt,
    alternates: { canonical: `/journal/${post.slug}` },
    openGraph: {
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.excerpt,
      images: post.imageSrc ? [{ url: post.imageSrc }] : undefined,
    },
  };
}

export default async function JournalArticlePage({ params }: Props) {
  const { slug } = await params;
  const content = await readContent();
  const post = findJournalPost(content.blog, slug);
  if (!post || post.status === "draft") notFound();
  if (!publishedJournalPosts(content.blog).some((item) => item.slug === slug)) notFound();

  return (
    <SiteContentProvider initial={content}>
      <JournalArticleView post={post} />
    </SiteContentProvider>
  );
}

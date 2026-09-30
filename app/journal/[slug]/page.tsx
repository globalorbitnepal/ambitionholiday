import type { Metadata } from "next";
import { notFound } from "next/navigation";
import JournalArticleView from "@/components/JournalArticleView";
import JsonLd from "@/components/JsonLd";
import SiteContentProvider from "@/components/SiteContentProvider";
import { findJournalPost, postPlainText } from "@/lib/blog";
import { readContent } from "@/lib/content";
import { absoluteUrl, SITE_NAME, splitKeywords } from "@/lib/seo";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type Props = { params: Promise<{ slug: string }> };

function isoOrUndefined(value?: string) {
  if (!value) return undefined;
  const time = Date.parse(value);
  return Number.isNaN(time) ? undefined : new Date(time).toISOString();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const content = await readContent();
  const post = findJournalPost(content.blog, slug);
  if (!post || post.status === "draft") {
    return { title: "Journal | Ambition Holidays", robots: { index: false } };
  }
  const title = post.metaTitle || `${post.title} | ${SITE_NAME}`;
  const description = post.metaDescription || post.excerpt;
  const ogImage = post.ogImageSrc || post.imageSrc;
  const keywords = [...splitKeywords(post.metaKeywords), ...(post.focusKeyword ? [post.focusKeyword] : []), ...(post.tags ?? [])];
  const path = `/journal/${post.slug}`;
  return {
    title,
    description,
    keywords: keywords.length ? Array.from(new Set(keywords)) : undefined,
    alternates: { canonical: path },
    robots: post.noindex ? { index: false, follow: true } : undefined,
    authors: post.authorName ? [{ name: post.authorName }] : undefined,
    openGraph: {
      type: "article",
      url: path,
      siteName: SITE_NAME,
      title: post.ogTitle || post.metaTitle || post.title,
      description: post.ogDescription || description,
      images: ogImage ? [{ url: ogImage, alt: post.imageAlt || post.title }] : undefined,
      publishedTime: isoOrUndefined(post.publishedAt || post.date),
      modifiedTime: isoOrUndefined(post.updatedAt),
      section: post.category,
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.ogTitle || post.metaTitle || post.title,
      description: post.ogDescription || description,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

export default async function JournalArticlePage({ params }: Props) {
  const { slug } = await params;
  const content = await readContent();
  const post = findJournalPost(content.blog, slug);
  if (!post || post.status === "draft") notFound();

  const url = absoluteUrl(`/journal/${post.slug}`);
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.metaDescription || post.excerpt,
    image: post.imageSrc ? [absoluteUrl(post.imageSrc)] : undefined,
    datePublished: isoOrUndefined(post.publishedAt || post.date),
    dateModified: isoOrUndefined(post.updatedAt || post.publishedAt || post.date),
    author: { "@type": "Organization", name: post.authorName || SITE_NAME },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: { "@type": "ImageObject", url: absoluteUrl("/images/ambition-holiday-logo.webp") },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    articleSection: post.category,
    keywords: [post.focusKeyword, ...(post.tags ?? [])].filter(Boolean).join(", ") || undefined,
    wordCount: postPlainText(post).split(/\s+/).filter(Boolean).length,
  };

  return (
    <SiteContentProvider initial={content}>
      <JsonLd data={schema} />
      <JournalArticleView post={post} />
    </SiteContentProvider>
  );
}

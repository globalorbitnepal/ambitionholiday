import type { MetadataRoute } from "next";
import { readContent } from "@/lib/content";
import { blogCategories, publishedJournalPosts } from "@/lib/blog";
import { absoluteUrl } from "@/lib/seo";
import { tripPath } from "@/lib/trip-packages";

export const dynamic = "force-dynamic";
export const revalidate = 3600;

const STATIC_PATHS: { path: string; priority: number }[] = [
  { path: "/", priority: 1 },
  { path: "/nepal", priority: 0.9 },
  { path: "/bhutan", priority: 0.9 },
  { path: "/tibet", priority: 0.9 },
  { path: "/himalayan-multi-countries-tour", priority: 0.9 },
  { path: "/helicopter-tours", priority: 0.7 },
  { path: "/photography-treks", priority: 0.7 },
  { path: "/experiences", priority: 0.7 },
  { path: "/journal", priority: 0.8 },
  { path: "/company", priority: 0.6 },
  { path: "/contact", priority: 0.6 },
  { path: "/visa-and-entry", priority: 0.5 },
  { path: "/best-time-to-visit", priority: 0.5 },
  { path: "/packing-guide", priority: 0.5 },
  { path: "/altitude-tips", priority: 0.5 },
  { path: "/permits-and-fees", priority: 0.5 },
  { path: "/how-to-book", priority: 0.5 },
  { path: "/become-a-partner", priority: 0.4 },
  { path: "/legal-documents", priority: 0.3 },
  { path: "/privacy-policy", priority: 0.2 },
  { path: "/terms-and-conditions", priority: 0.2 },
];

function toDate(value?: string) {
  if (!value) return undefined;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const content = await readContent();
  const now = new Date();

  const pages: MetadataRoute.Sitemap = STATIC_PATHS.map(({ path, priority }) => ({
    url: absoluteUrl(path),
    lastModified: now,
    changeFrequency: "weekly",
    priority,
  }));

  const packages: MetadataRoute.Sitemap = content.tripPackages
    .filter((pkg) => pkg.status === "published" && !pkg.noindex)
    .map((pkg) => ({
      url: absoluteUrl(tripPath(pkg)),
      lastModified: toDate(pkg.updatedAt) ?? now,
      changeFrequency: "weekly",
      priority: 0.9,
    }));

  const posts: MetadataRoute.Sitemap = publishedJournalPosts(content.blog)
    .filter((post) => !post.noindex)
    .map((post) => ({
      url: absoluteUrl(post.href),
      lastModified: toDate(post.updatedAt) ?? toDate(post.publishedAt) ?? toDate(post.date) ?? now,
      changeFrequency: "monthly",
      priority: 0.7,
    }));

  const categories: MetadataRoute.Sitemap = blogCategories(content.blog).map((cat) => ({
    url: absoluteUrl(`/journal?category=${encodeURIComponent(cat.slug)}`),
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.5,
  }));

  return [...pages, ...packages, ...posts, ...categories];
}

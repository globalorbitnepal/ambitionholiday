import { JOURNAL_POSTS } from "@/lib/journal-defaults";
import type { BlogContent, BlogPost, BlogSection } from "@/lib/content-types";

export function slugifyBlog(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

export function sectionAnchor(section: BlogSection, index: number) {
  return section.id || slugifyBlog(section.heading) || `section-${index + 1}`;
}

export function decorateBlogPost(post: BlogPost, fallback?: BlogPost): BlogPost {
  const merged: BlogPost = {
    id: post.id || fallback?.id || `post-${Date.now()}`,
    title: post.title || fallback?.title || "Untitled",
    excerpt: post.excerpt ?? fallback?.excerpt ?? "",
    category: post.category || fallback?.category || "JOURNAL",
    badge: post.badge ?? fallback?.badge ?? "",
    badgeStyle: post.badgeStyle || fallback?.badgeStyle || "none",
    date: post.date || fallback?.date || "",
    readTime: post.readTime || fallback?.readTime || "",
    authorName: post.authorName || fallback?.authorName || "Ambition Holidays",
    authorAvatarSrc: post.authorAvatarSrc || fallback?.authorAvatarSrc || "/images/ambition-holiday-logo.webp",
    imageSrc: post.imageSrc || fallback?.imageSrc || JOURNAL_POSTS[0].imageSrc,
    imageAlt: post.imageAlt || fallback?.imageAlt || post.title || "Journal image",
    href: "",
    slug: "",
    status: post.status === "draft" ? "draft" : "published",
    metaTitle: post.metaTitle || fallback?.metaTitle || post.title || fallback?.title || "",
    metaDescription: post.metaDescription || fallback?.metaDescription || post.excerpt || fallback?.excerpt || "",
    sections: [],
  };
  const slug = post.slug || fallback?.slug || slugifyBlog(merged.title) || merged.id;
  const sourceSections = post.sections?.length ? post.sections : fallback?.sections ?? [];
  merged.slug = slug;
  merged.href = `/journal/${slug}`;
  merged.sections = sourceSections.map((section, index) => ({
    id: sectionAnchor(section, index),
    heading: section.heading || `Section ${index + 1}`,
    body: section.body || "",
  }));
  return merged;
}

export function allJournalPosts(blog?: BlogContent | null): BlogPost[] {
  const saved = blog?.posts?.filter((post) => post?.title);
  if (saved?.length) {
    return saved.map((post) => {
      const fallback = JOURNAL_POSTS.find((item) => item.id === post.id || item.slug === post.slug);
      return decorateBlogPost(post, fallback);
    });
  }
  return JOURNAL_POSTS.map((post) => decorateBlogPost(post));
}

export function publishedJournalPosts(blog?: BlogContent | null): BlogPost[] {
  return allJournalPosts(blog).filter((post) => post.status !== "draft");
}

export function findJournalPost(blog: BlogContent | null | undefined, slug: string) {
  return allJournalPosts(blog).find((post) => post.slug === slug);
}

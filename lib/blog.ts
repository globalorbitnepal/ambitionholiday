import { JOURNAL_POSTS } from "@/lib/journal-defaults";
import type { BlogCategory, BlogContent, BlogPost, BlogSection } from "@/lib/content-types";
import type { SeoInput } from "@/lib/seo";

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

function cleanTags(tags: unknown): string[] {
  if (!Array.isArray(tags)) return [];
  const seen = new Set<string>();
  const out: string[] = [];
  for (const raw of tags) {
    const tag = String(raw ?? "").trim();
    const key = tag.toLowerCase();
    if (!tag || seen.has(key)) continue;
    seen.add(key);
    out.push(tag);
  }
  return out;
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
    focusKeyword: post.focusKeyword ?? fallback?.focusKeyword ?? "",
    metaKeywords: post.metaKeywords ?? fallback?.metaKeywords ?? "",
    tags: cleanTags(post.tags ?? fallback?.tags),
    ogTitle: post.ogTitle ?? fallback?.ogTitle ?? "",
    ogDescription: post.ogDescription ?? fallback?.ogDescription ?? "",
    ogImageSrc: post.ogImageSrc ?? fallback?.ogImageSrc ?? "",
    noindex: Boolean(post.noindex ?? fallback?.noindex),
    publishedAt: post.publishedAt || fallback?.publishedAt || "",
    updatedAt: post.updatedAt || fallback?.updatedAt || "",
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

export function categorySlug(label: string) {
  return slugifyBlog(label) || "journal";
}

/** Saved categories first, then any category name used on a post that is not in the list yet. */
export function blogCategories(blog?: BlogContent | null): BlogCategory[] {
  const saved = (blog?.categories ?? []).filter((cat) => cat?.label?.trim());
  const out: BlogCategory[] = saved.map((cat) => ({
    id: cat.id || `cat-${categorySlug(cat.label)}`,
    label: cat.label.trim(),
    slug: cat.slug?.trim() || categorySlug(cat.label),
    description: cat.description || "",
  }));
  const known = new Set(out.map((cat) => cat.label.toLowerCase()));
  for (const post of allJournalPosts(blog)) {
    const label = post.category?.trim();
    if (!label || known.has(label.toLowerCase())) continue;
    known.add(label.toLowerCase());
    out.push({ id: `cat-${categorySlug(label)}`, label, slug: categorySlug(label), description: "" });
  }
  return out;
}

export function postPlainText(post: BlogPost) {
  return (post.sections ?? []).map((section) => section.body).join("\n\n");
}

export function estimateReadTime(post: BlogPost) {
  const words = `${post.excerpt} ${postPlainText(post)}`.trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 220))} min read`;
}

export function blogSeoInput(post: BlogPost): SeoInput {
  const firstBody = post.sections?.[0]?.body ?? "";
  return {
    focusKeyword: post.focusKeyword || "",
    title: post.title,
    metaTitle: post.metaTitle || "",
    metaDescription: post.metaDescription || "",
    slug: post.slug || "",
    intro: [post.excerpt, firstBody.split(/\n{2,}/)[0] || ""].join(" "),
    body: postPlainText(post),
    headings: (post.sections ?? []).map((section) => section.heading),
    imageSrc: post.imageSrc,
    imageAlt: post.imageAlt,
  };
}

"use client";

import { useState } from "react";
import {
  DEFAULT_CONTENT,
  type BlogBadgeStyle,
  type BlogPost,
  type BlogSection,
  type SiteContent,
} from "@/lib/content-types";
import { allJournalPosts, decorateBlogPost, slugifyBlog } from "@/lib/blog";
import { mediaSrc } from "@/lib/media-src";
import { postOrbitUpload } from "@/lib/orbit-upload-client";
import { OrbitMediaButtons } from "@/components/OrbitMediaPicker";

const inputClass =
  "w-full rounded-md border border-white/15 bg-black/35 px-3 py-2 text-sm text-white outline-none focus:border-gold/50";

const BADGE_STYLES: { id: BlogBadgeStyle; label: string }[] = [
  { id: "featured", label: "Gold (Featured)" },
  { id: "outline", label: "Outline" },
  { id: "none", label: "None" },
];

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block space-y-1.5">
      <span className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-white/50">
        {label}
      </span>
      {children}
    </label>
  );
}

async function uploadFile(file: File): Promise<string> {
  return postOrbitUpload(file);
}

function emptySection(): BlogSection {
  return { id: `section-${Date.now()}`, heading: "New heading", body: "" };
}

function emptyPost(): BlogPost {
  return decorateBlogPost({
    id: `post-${Date.now()}`,
    title: "New journal article",
    excerpt: "Short summary for the listing card and search engines.",
    category: "JOURNAL",
    badge: "",
    badgeStyle: "none",
    date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
    readTime: "6 min read",
    authorName: "Ambition Holidays",
    authorAvatarSrc: "/images/ambition-holiday-logo.webp",
    imageSrc: "/images/journal/blog-lakes.webp",
    imageAlt: "Himalayan journal cover",
    href: "",
    slug: "",
    status: "draft",
    metaTitle: "",
    metaDescription: "",
    sections: [
      {
        id: "overviews",
        heading: "Overviews",
        body: "Write the opening of this article here.",
      },
    ],
  });
}

type Props = {
  content: SiteContent;
  setContent: (next: SiteContent) => void;
  save: (next: SiteContent) => Promise<void>;
};

export default function OrbitBlogEditor({ content, setContent, save }: Props) {
  const blog = content.blog ?? DEFAULT_CONTENT.blog;
  const posts = allJournalPosts(blog);
  const [busy, setBusy] = useState<string | null>(null);
  const [openId, setOpenId] = useState<string | null>(posts[0]?.id ?? null);

  function patch(partial: Partial<SiteContent["blog"]>) {
    setContent({ ...content, blog: { ...blog, ...partial } });
  }

  function setPosts(nextPosts: BlogPost[]) {
    patch({ posts: nextPosts.map((post) => decorateBlogPost(post)) });
  }

  function updatePost(index: number, next: BlogPost) {
    const copy = [...posts];
    copy[index] = decorateBlogPost(next);
    setPosts(copy);
  }

  async function replaceCover(index: number, file: File) {
    setBusy(`cover-${index}`);
    try {
      const url = await uploadFile(file);
      updatePost(index, { ...posts[index], imageSrc: url });
      const next = {
        ...content,
        blog: {
          ...blog,
          posts: posts.map((post, i) =>
            decorateBlogPost(i === index ? { ...post, imageSrc: url } : post),
          ),
        },
      };
      setContent(next);
      await save(next);
    } catch {
      window.alert("Upload failed. Try a JPG or PNG under 12MB.");
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className="space-y-8">
      <p className="rounded-lg border border-gold/25 bg-black/25 px-3 py-2 text-sm text-white/75">
        Journal lives at <strong className="text-gold">/journal</strong>. Drafts stay hidden until you
        publish. Cover image, slug, meta title and description work like WordPress SEO.
      </p>

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={blog.visible}
          onChange={(e) => patch({ visible: e.target.checked })}
        />
        Show homepage blog teaser
      </label>

      <Field label="Eyebrow">
        <input className={inputClass} value={blog.eyebrow} onChange={(e) => patch({ eyebrow: e.target.value })} />
      </Field>
      <div className="grid gap-4 sm:grid-cols-3">
        <Field label="Headline before">
          <input className={inputClass} value={blog.headlineBefore} onChange={(e) => patch({ headlineBefore: e.target.value })} />
        </Field>
        <Field label="Headline script (gold italic)">
          <input className={inputClass} value={blog.headlineScript} onChange={(e) => patch({ headlineScript: e.target.value })} />
        </Field>
        <Field label="Headline after">
          <input className={inputClass} value={blog.headlineAfter} onChange={(e) => patch({ headlineAfter: e.target.value })} />
        </Field>
      </div>
      <Field label="Intro text">
        <textarea className={`${inputClass} min-h-20`} value={blog.body} onChange={(e) => patch({ body: e.target.value })} />
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Button label">
          <input className={inputClass} value={blog.ctaLabel} onChange={(e) => patch({ ctaLabel: e.target.value })} />
        </Field>
        <Field label="Button link">
          <input className={inputClass} value={blog.ctaHref} onChange={(e) => patch({ ctaHref: e.target.value })} />
        </Field>
      </div>

      <div>
        <div className="mb-3 flex items-center justify-between gap-3">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-white/50">
            Journal articles
          </p>
          <button
            type="button"
            className="rounded-md border border-gold/40 px-3 py-2 text-xs font-semibold text-gold"
            onClick={() => {
              const created = emptyPost();
              setPosts([created, ...posts]);
              setOpenId(created.id);
            }}
          >
            Add article
          </button>
        </div>

        <div className="space-y-4">
          {posts.map((post, index) => {
            const open = openId === post.id;
            return (
              <div key={post.id} className="rounded-lg border border-white/10 p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <button
                    type="button"
                    className="min-w-0 text-left text-sm font-semibold text-white"
                    onClick={() => setOpenId(open ? null : post.id)}
                  >
                    {post.title}
                    <span className="ml-2 text-[0.65rem] uppercase tracking-[0.12em] text-white/45">
                      {post.status === "draft" ? "Draft" : "Published"} · /journal/{post.slug}
                    </span>
                  </button>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      className="rounded border border-white/20 px-2 py-1 text-[0.65rem]"
                      onClick={() => setOpenId(open ? null : post.id)}
                    >
                      {open ? "Collapse" : "Edit"}
                    </button>
                    <button
                      type="button"
                      className="rounded border border-red-400/30 px-2 py-1 text-[0.65rem] text-red-200"
                      onClick={() => {
                        if (!window.confirm("Delete this article?")) return;
                        setPosts(posts.filter((_, i) => i !== index));
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>

                {open ? (
                  <div className="mt-4 space-y-3">
                    <div className="relative aspect-video overflow-hidden rounded-md bg-black/40">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={mediaSrc(post.imageSrc, content.updatedAt)} alt="" className="absolute inset-0 h-full w-full object-cover" />
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <label
                        className={`inline-flex cursor-pointer rounded-md border border-gold/40 px-3 py-2 text-xs font-semibold text-gold ${
                          busy === `cover-${index}` ? "opacity-50" : ""
                        }`}
                      >
                        {busy === `cover-${index}` ? "Uploading…" : "Cover / featured image"}
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          disabled={busy !== null}
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            e.target.value = "";
                            if (file) await replaceCover(index, file);
                          }}
                        />
                      </label>
                      <OrbitMediaButtons onPicked={(url) => updatePost(index, { ...post, imageSrc: url })} />
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <Field label="Status">
                        <select
                          className={inputClass}
                          value={post.status || "published"}
                          onChange={(e) =>
                            updatePost(index, {
                              ...post,
                              status: e.target.value === "draft" ? "draft" : "published",
                            })
                          }
                        >
                          <option value="published">Publish</option>
                          <option value="draft">Draft</option>
                        </select>
                      </Field>
                      <Field label="Category">
                        <input className={inputClass} value={post.category} onChange={(e) => updatePost(index, { ...post, category: e.target.value })} />
                      </Field>
                      <div className="sm:col-span-2">
                        <Field label="Title">
                          <input
                            className={inputClass}
                            value={post.title}
                            onChange={(e) => {
                              const title = e.target.value;
                              const slugLocked = Boolean(post.slug && post.slug !== slugifyBlog(post.title));
                              updatePost(index, {
                                ...post,
                                title,
                                slug: slugLocked ? post.slug : slugifyBlog(title),
                              });
                            }}
                          />
                        </Field>
                      </div>
                      <Field label="Slug">
                        <input
                          className={inputClass}
                          value={post.slug || ""}
                          onChange={(e) => updatePost(index, { ...post, slug: slugifyBlog(e.target.value) || post.id })}
                        />
                      </Field>
                      <Field label="Date">
                        <input className={inputClass} value={post.date} onChange={(e) => updatePost(index, { ...post, date: e.target.value })} />
                      </Field>
                      <Field label="Read time">
                        <input className={inputClass} value={post.readTime} onChange={(e) => updatePost(index, { ...post, readTime: e.target.value })} />
                      </Field>
                      <Field label="Author">
                        <input className={inputClass} value={post.authorName} onChange={(e) => updatePost(index, { ...post, authorName: e.target.value })} />
                      </Field>
                      <div className="sm:col-span-2">
                        <Field label="Excerpt">
                          <textarea className={`${inputClass} min-h-20`} value={post.excerpt} onChange={(e) => updatePost(index, { ...post, excerpt: e.target.value })} />
                        </Field>
                      </div>
                      <Field label="Meta title">
                        <input className={inputClass} value={post.metaTitle || ""} onChange={(e) => updatePost(index, { ...post, metaTitle: e.target.value })} />
                      </Field>
                      <Field label="Image alt">
                        <input className={inputClass} value={post.imageAlt} onChange={(e) => updatePost(index, { ...post, imageAlt: e.target.value })} />
                      </Field>
                      <div className="sm:col-span-2">
                        <Field label="Meta description">
                          <textarea
                            className={`${inputClass} min-h-20`}
                            value={post.metaDescription || ""}
                            onChange={(e) => updatePost(index, { ...post, metaDescription: e.target.value })}
                          />
                        </Field>
                      </div>
                      <Field label="Homepage badge">
                        <input className={inputClass} value={post.badge} onChange={(e) => updatePost(index, { ...post, badge: e.target.value })} />
                      </Field>
                      <Field label="Badge style">
                        <select
                          className={inputClass}
                          value={post.badgeStyle}
                          onChange={(e) => updatePost(index, { ...post, badgeStyle: e.target.value as BlogBadgeStyle })}
                        >
                          {BADGE_STYLES.map((style) => (
                            <option key={style.id} value={style.id}>
                              {style.label}
                            </option>
                          ))}
                        </select>
                      </Field>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-white/50">
                          Article sections (table of contents)
                        </p>
                        <button
                          type="button"
                          className="rounded border border-white/20 px-2 py-1 text-[0.65rem]"
                          onClick={() =>
                            updatePost(index, {
                              ...post,
                              sections: [...(post.sections ?? []), emptySection()],
                            })
                          }
                        >
                          Add heading
                        </button>
                      </div>
                      {(post.sections ?? []).map((section, sectionIndex) => (
                        <div key={section.id} className="space-y-2 rounded-md border border-white/10 p-3">
                          <div className="flex items-center justify-between gap-2">
                            <p className="text-xs text-gold">
                              {sectionIndex + 1}. {section.heading || "Untitled"}
                            </p>
                            <button
                              type="button"
                              className="text-[0.65rem] text-red-200"
                              onClick={() =>
                                updatePost(index, {
                                  ...post,
                                  sections: (post.sections ?? []).filter((_, i) => i !== sectionIndex),
                                })
                              }
                            >
                              Remove
                            </button>
                          </div>
                          <input
                            className={inputClass}
                            value={section.heading}
                            placeholder="Heading"
                            onChange={(e) => {
                              const sections = [...(post.sections ?? [])];
                              sections[sectionIndex] = { ...section, heading: e.target.value };
                              updatePost(index, { ...post, sections });
                            }}
                          />
                          <textarea
                            className={`${inputClass} min-h-28`}
                            value={section.body}
                            placeholder="Body — separate paragraphs with a blank line"
                            onChange={(e) => {
                              const sections = [...(post.sections ?? [])];
                              sections[sectionIndex] = { ...section, body: e.target.value };
                              updatePost(index, { ...post, sections });
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

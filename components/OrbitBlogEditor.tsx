"use client";

import { useState } from "react";
import {
  DEFAULT_CONTENT,
  type BlogBadgeStyle,
  type BlogPost,
  type SiteContent,
} from "@/lib/content-types";
import { mediaSrc } from "@/lib/media-src";
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
  const form = new FormData();
  form.append("file", file);
  const res = await fetch("/api/orbit/upload", { method: "POST", body: form });
  if (!res.ok) throw new Error("Upload failed");
  const data = (await res.json()) as { url?: string; error?: string };
  if (!data.url) throw new Error(data.error || "Upload failed");
  return data.url;
}

function emptyPost(partial?: Partial<BlogPost>): BlogPost {
  return {
    id: `post-${Date.now()}`,
    title: "New blog post",
    excerpt: "",
    category: "TRAVEL TIPS",
    badge: "",
    badgeStyle: "none",
    date: "Mar 1, 2025",
    readTime: "5 min",
    authorName: "",
    authorAvatarSrc: DEFAULT_CONTENT.blog.featured[0].authorAvatarSrc,
    imageSrc: DEFAULT_CONTENT.blog.sidePosts[0].imageSrc,
    imageAlt: "Blog post image",
    href: "/blog",
    ...partial,
  };
}

function PostEditor({
  list,
  index,
  post,
  showFeaturedFields,
  updatedAt,
  busy,
  onChange,
  onRemove,
  onReplaceImage,
}: {
  list: "featured" | "sidePosts";
  index: number;
  post: BlogPost;
  showFeaturedFields: boolean;
  updatedAt: string;
  busy: string | null;
  onChange: (next: BlogPost) => void;
  onRemove: () => void;
  onReplaceImage: (field: "imageSrc" | "authorAvatarSrc", file: File) => Promise<void>;
}) {
  return (
    <div className="space-y-3 rounded-lg border border-white/10 p-4">
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs font-semibold text-gold">
          {showFeaturedFields ? `Featured ${index + 1}` : `Side post ${index + 1}`}
        </p>
        <button
          type="button"
          className="rounded border border-red-400/30 px-2 py-1 text-[0.65rem] text-red-200"
          onClick={onRemove}
        >
          Remove
        </button>
      </div>

      <div className="relative aspect-video overflow-hidden rounded-md bg-black/40">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={mediaSrc(post.imageSrc, updatedAt)}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
      <label
        className={`inline-flex cursor-pointer rounded-md border border-gold/40 px-3 py-2 text-xs font-semibold text-gold ${
          busy === `${list}-imageSrc-${index}` ? "opacity-50" : ""
        }`}
      >
        {busy === `${list}-imageSrc-${index}` ? "Uploading…" : "Replace image"}
        <input
          type="file"
          accept="image/*"
          className="hidden"
          disabled={busy !== null}
          onChange={async (e) => {
            const file = e.target.files?.[0];
            e.target.value = "";
            if (!file) return;
            await onReplaceImage("imageSrc", file);
          }}
        />
      </label>
      <OrbitMediaButtons
        onPicked={async (url) => {
          onChange({ ...post, imageSrc: url });
        }}
      />

      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Title">
          <input
            className={inputClass}
            value={post.title}
            onChange={(e) => onChange({ ...post, title: e.target.value })}
          />
        </Field>
        <Field label="Category tag">
          <input
            className={inputClass}
            value={post.category}
            onChange={(e) => onChange({ ...post, category: e.target.value })}
          />
        </Field>
        {showFeaturedFields ? (
          <>
            <div className="sm:col-span-2">
              <Field label="Excerpt">
                <textarea
                  className={`${inputClass} min-h-20`}
                  value={post.excerpt}
                  onChange={(e) => onChange({ ...post, excerpt: e.target.value })}
                />
              </Field>
            </div>
            <Field label="Badge text">
              <input
                className={inputClass}
                value={post.badge}
                placeholder="★ FEATURED"
                onChange={(e) => onChange({ ...post, badge: e.target.value })}
              />
            </Field>
            <Field label="Badge style">
              <select
                className={inputClass}
                value={post.badgeStyle}
                onChange={(e) =>
                  onChange({
                    ...post,
                    badgeStyle: e.target.value as BlogBadgeStyle,
                  })
                }
              >
                {BADGE_STYLES.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Author name">
              <input
                className={inputClass}
                value={post.authorName}
                onChange={(e) => onChange({ ...post, authorName: e.target.value })}
              />
            </Field>
            <div className="space-y-2">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-white/50">
                Author avatar
              </p>
              <div className="flex items-center gap-3">
                {post.authorAvatarSrc ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={mediaSrc(post.authorAvatarSrc, updatedAt)}
                    alt=""
                    className="h-10 w-10 rounded-full object-cover"
                  />
                ) : null}
                <label
                  className={`inline-flex cursor-pointer rounded-md border border-white/20 px-3 py-2 text-xs ${
                    busy === `${list}-authorAvatarSrc-${index}` ? "opacity-50" : ""
                  }`}
                >
                  {busy === `${list}-authorAvatarSrc-${index}` ? "Uploading…" : "Replace avatar"}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    disabled={busy !== null}
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      e.target.value = "";
                      if (!file) return;
                      await onReplaceImage("authorAvatarSrc", file);
                    }}
                  />
                </label>
              </div>
            </div>
          </>
        ) : null}
        <Field label="Date">
          <input
            className={inputClass}
            value={post.date}
            onChange={(e) => onChange({ ...post, date: e.target.value })}
          />
        </Field>
        <Field label="Read time">
          <input
            className={inputClass}
            value={post.readTime}
            onChange={(e) => onChange({ ...post, readTime: e.target.value })}
          />
        </Field>
        <Field label="Link (href)">
          <input
            className={inputClass}
            value={post.href}
            onChange={(e) => onChange({ ...post, href: e.target.value })}
          />
        </Field>
        <Field label="Image alt">
          <input
            className={inputClass}
            value={post.imageAlt}
            onChange={(e) => onChange({ ...post, imageAlt: e.target.value })}
          />
        </Field>
      </div>
    </div>
  );
}

type Props = {
  content: SiteContent;
  setContent: (next: SiteContent) => void;
  save: (next: SiteContent) => Promise<void>;
};

export default function OrbitBlogEditor({ content, setContent, save }: Props) {
  const blog = content.blog ?? DEFAULT_CONTENT.blog;
  const [busy, setBusy] = useState<string | null>(null);

  function patch(partial: Partial<SiteContent["blog"]>) {
    setContent({ ...content, blog: { ...blog, ...partial } });
  }

  async function replaceImage(
    list: "featured" | "sidePosts",
    index: number,
    field: "imageSrc" | "authorAvatarSrc",
    file: File,
  ) {
    setBusy(`${list}-${field}-${index}`);
    try {
      const url = await uploadFile(file);
      const posts = [...blog[list]];
      posts[index] = { ...posts[index], [field]: url };
      const next = { ...content, blog: { ...blog, [list]: posts } };
      setContent(next);
      await save(next);
    } catch {
      window.alert("Upload failed. Try a JPG or PNG under 12MB.");
    } finally {
      setBusy(null);
    }
  }

  function updatePost(list: "featured" | "sidePosts", index: number, next: BlogPost) {
    const posts = [...blog[list]];
    posts[index] = next;
    patch({ [list]: posts });
  }

  return (
    <div className="space-y-8">
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={blog.visible}
          onChange={(e) => patch({ visible: e.target.checked })}
        />
        Show Blog section
      </label>

      <Field label="Eyebrow">
        <input
          className={inputClass}
          value={blog.eyebrow}
          onChange={(e) => patch({ eyebrow: e.target.value })}
        />
      </Field>
      <div className="grid gap-4 sm:grid-cols-3">
        <Field label="Headline before">
          <input
            className={inputClass}
            value={blog.headlineBefore}
            onChange={(e) => patch({ headlineBefore: e.target.value })}
          />
        </Field>
        <Field label="Headline script (gold italic)">
          <input
            className={inputClass}
            value={blog.headlineScript}
            onChange={(e) => patch({ headlineScript: e.target.value })}
          />
        </Field>
        <Field label="Headline after">
          <input
            className={inputClass}
            value={blog.headlineAfter}
            onChange={(e) => patch({ headlineAfter: e.target.value })}
          />
        </Field>
      </div>
      <Field label="Intro text">
        <textarea
          className={`${inputClass} min-h-20`}
          value={blog.body}
          onChange={(e) => patch({ body: e.target.value })}
        />
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Button label">
          <input
            className={inputClass}
            value={blog.ctaLabel}
            onChange={(e) => patch({ ctaLabel: e.target.value })}
          />
        </Field>
        <Field label="Button link">
          <input
            className={inputClass}
            value={blog.ctaHref}
            onChange={(e) => patch({ ctaHref: e.target.value })}
          />
        </Field>
      </div>

      <div>
        <p className="mb-3 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-white/50">
          Featured cards (large)
        </p>
        <div className="space-y-5">
          {blog.featured.map((post, index) => (
            <PostEditor
              key={post.id}
              list="featured"
              index={index}
              post={post}
              showFeaturedFields
              updatedAt={content.updatedAt}
              busy={busy}
              onChange={(next) => updatePost("featured", index, next)}
              onRemove={() =>
                patch({ featured: blog.featured.filter((_, i) => i !== index) })
              }
              onReplaceImage={(field, file) => replaceImage("featured", index, field, file)}
            />
          ))}
        </div>
        <button
          type="button"
          className="mt-4 rounded-md border border-white/20 px-3 py-2 text-xs"
          onClick={() =>
            patch({
              featured: [
                ...blog.featured,
                emptyPost({
                  badge: "★ FEATURED",
                  badgeStyle: "featured",
                  excerpt: "Short summary for the featured card.",
                  authorName: "Author name",
                  imageSrc: DEFAULT_CONTENT.blog.featured[0].imageSrc,
                }),
              ],
            })
          }
        >
          Add featured card
        </button>
      </div>

      <div>
        <p className="mb-3 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-white/50">
          Side list posts
        </p>
        <div className="space-y-5">
          {blog.sidePosts.map((post, index) => (
            <PostEditor
              key={post.id}
              list="sidePosts"
              index={index}
              post={post}
              showFeaturedFields={false}
              updatedAt={content.updatedAt}
              busy={busy}
              onChange={(next) => updatePost("sidePosts", index, next)}
              onRemove={() =>
                patch({ sidePosts: blog.sidePosts.filter((_, i) => i !== index) })
              }
              onReplaceImage={(field, file) => replaceImage("sidePosts", index, field, file)}
            />
          ))}
        </div>
        <button
          type="button"
          className="mt-4 rounded-md border border-white/20 px-3 py-2 text-xs"
          onClick={() => patch({ sidePosts: [...blog.sidePosts, emptyPost()] })}
        >
          Add side post
        </button>
      </div>
    </div>
  );
}

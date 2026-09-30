"use client";

import { useEffect, useMemo, useState } from "react";
import AdminMediaField from "@/components/admin/AdminMediaField";
import { useAdminContent } from "@/components/admin/useAdminContent";
import SeoPanel, { SeoLengthHint } from "@/components/SeoPanel";
import type { BlogCategory, BlogPost, BlogSection, SiteContent } from "@/lib/content-types";
import {
  allJournalPosts,
  blogCategories,
  blogSeoInput,
  categorySlug,
  decorateBlogPost,
  estimateReadTime,
  slugifyBlog,
} from "@/lib/blog";
import { analyzeSeo, seoScoreTone } from "@/lib/seo";

type View = "list" | "edit" | "categories";

function todayLabel() {
  return new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

function newPost(category: string): BlogPost {
  return decorateBlogPost({
    id: `post-${Date.now()}`,
    title: "New journal article",
    excerpt: "",
    category,
    badge: "",
    badgeStyle: "none",
    date: todayLabel(),
    readTime: "5 min read",
    authorName: "Ambition Holidays",
    authorAvatarSrc: "/images/ambition-holiday-logo.webp",
    imageSrc: "/images/journal/blog-lakes.webp",
    imageAlt: "",
    href: "",
    slug: `new-article-${Date.now().toString(36)}`,
    status: "draft",
    metaTitle: "",
    metaDescription: "",
    sections: [{ id: "introduction", heading: "Introduction", body: "" }],
  });
}

function uniqueSlug(slug: string, posts: BlogPost[], selfId: string) {
  const base = slugifyBlog(slug) || "article";
  let candidate = base;
  let n = 2;
  while (posts.some((post) => post.id !== selfId && post.slug === candidate)) {
    candidate = `${base}-${n}`;
    n += 1;
  }
  return candidate;
}

function ScoreBadge({ post }: { post: BlogPost }) {
  const score = analyzeSeo(blogSeoInput(post)).score;
  return <span className={`admin-badge admin-badge--${seoScoreTone(score)}`}>SEO {score}</span>;
}

function TagInput({ tags, onChange }: { tags: string[]; onChange: (next: string[]) => void }) {
  const [draft, setDraft] = useState("");
  function commit(raw: string) {
    const parts = raw.split(",").map((part) => part.trim()).filter(Boolean);
    if (!parts.length) return;
    const lower = new Set(tags.map((tag) => tag.toLowerCase()));
    onChange([...tags, ...parts.filter((part) => !lower.has(part.toLowerCase()))]);
    setDraft("");
  }
  return (
    <div className="admin-field">
      <span>Tags</span>
      <input
        value={draft}
        placeholder="Type a tag and press Enter"
        onChange={(e) => {
          if (e.target.value.includes(",")) commit(e.target.value);
          else setDraft(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            commit(draft);
          }
        }}
        onBlur={() => commit(draft)}
      />
      {tags.length ? (
        <div className="admin-tag-list">
          {tags.map((tag) => (
            <span key={tag} className="admin-tag">
              {tag}
              <button type="button" aria-label={`Remove ${tag}`} onClick={() => onChange(tags.filter((t) => t !== tag))}>
                ×
              </button>
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function SectionsEditor({ sections, onChange }: { sections: BlogSection[]; onChange: (next: BlogSection[]) => void }) {
  function update(index: number, partial: Partial<BlogSection>) {
    onChange(sections.map((section, i) => (i === index ? { ...section, ...partial } : section)));
  }
  function move(index: number, dir: -1 | 1) {
    const target = index + dir;
    if (target < 0 || target >= sections.length) return;
    const next = [...sections];
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  }
  return (
    <div className="admin-card">
      <div className="admin-section-head">
        <h2 style={{ margin: 0 }}>Article content</h2>
        <button
          type="button"
          className="admin-btn admin-btn-ghost admin-btn-sm"
          onClick={() => onChange([...sections, { id: `section-${Date.now()}`, heading: "New heading", body: "" }])}
        >
          + Add heading
        </button>
      </div>
      <p className="admin-lead" style={{ marginTop: 0 }}>
        Each heading becomes an H2 and a table-of-contents link. Leave a blank line between paragraphs.
      </p>
      {sections.map((section, index) => (
        <div key={section.id} className="admin-day">
          <div className="admin-section-head">
            <strong>
              {index + 1}. {section.heading || "Untitled"}
            </strong>
            <div className="admin-row-actions">
              <button type="button" className="admin-btn admin-btn-ghost admin-btn-sm" disabled={index === 0} onClick={() => move(index, -1)}>
                ↑
              </button>
              <button
                type="button"
                className="admin-btn admin-btn-ghost admin-btn-sm"
                disabled={index === sections.length - 1}
                onClick={() => move(index, 1)}
              >
                ↓
              </button>
              <button
                type="button"
                className="admin-btn admin-btn-danger admin-btn-sm"
                onClick={() => {
                  if (window.confirm(`Remove “${section.heading || "this section"}”?`)) {
                    onChange(sections.filter((_, i) => i !== index));
                  }
                }}
              >
                Remove
              </button>
            </div>
          </div>
          <label className="admin-field">
            <span>Heading (H2)</span>
            <input value={section.heading} onChange={(e) => update(index, { heading: e.target.value })} />
          </label>
          <label className="admin-field" style={{ marginBottom: 0 }}>
            <span>Body</span>
            <textarea style={{ minHeight: 180 }} value={section.body} onChange={(e) => update(index, { body: e.target.value })} />
          </label>
        </div>
      ))}
    </div>
  );
}

function PostEditor({
  initial,
  posts,
  categories,
  busy,
  status,
  onSave,
  onClose,
}: {
  initial: BlogPost;
  posts: BlogPost[];
  categories: BlogCategory[];
  busy: boolean;
  status: string;
  onSave: (post: BlogPost) => Promise<boolean>;
  onClose: () => void;
}) {
  const [post, setPost] = useState<BlogPost>(initial);
  const [dirty, setDirty] = useState(false);
  const [error, setError] = useState("");
  const slugTaken = posts.some((item) => item.id !== post.id && item.slug === post.slug);

  useEffect(() => {
    if (!dirty) return;
    const warn = (event: BeforeUnloadEvent) => {
      event.preventDefault();
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  function patch(partial: Partial<BlogPost>) {
    setPost((cur) => ({ ...cur, ...partial }));
    setDirty(true);
  }

  async function submit(nextStatus?: BlogPost["status"]) {
    setError("");
    if (!post.title.trim()) {
      setError("Add a title first.");
      return;
    }
    if (!post.slug || slugTaken) {
      setError("That slug is already used by another article.");
      return;
    }
    const now = new Date().toISOString();
    const status = nextStatus || post.status || "draft";
    const ok = await onSave({
      ...post,
      status,
      publishedAt: status === "published" ? post.publishedAt || now : post.publishedAt,
      updatedAt: now,
    });
    if (ok) {
      setPost((cur) => ({ ...cur, status }));
      setDirty(false);
    }
  }

  const seoInput = blogSeoInput(post);

  return (
    <>
      <div className="admin-toolbar">
        <button
          type="button"
          className="admin-btn admin-btn-ghost admin-btn-sm"
          onClick={() => {
            if (dirty && !window.confirm("You have unsaved changes. Leave without saving?")) return;
            onClose();
          }}
        >
          ← All articles
        </button>
        <h1 style={{ margin: 0 }}>{post.title || "Untitled"}</h1>
        <span className={`admin-badge ${post.status === "draft" ? "admin-badge--draft" : "admin-badge--good"}`}>
          {post.status === "draft" ? "Draft" : "Published"}
        </span>
        {dirty ? <span className="admin-badge admin-badge--ok">Unsaved changes</span> : null}
      </div>

      <div className="admin-editor">
        <div style={{ display: "grid", gap: 16 }}>
          <div className="admin-card">
            <label className="admin-field">
              <span>Title (H1)</span>
              <input
                value={post.title}
                onChange={(e) => {
                  const title = e.target.value;
                  const autoSlug = !post.slug || post.slug === slugifyBlog(post.title) || post.slug.startsWith("new-article-");
                  patch({ title, ...(autoSlug ? { slug: uniqueSlug(title, posts, post.id) } : {}) });
                }}
              />
            </label>
            <label className="admin-field">
              <span>URL slug</span>
              <input value={post.slug || ""} onChange={(e) => patch({ slug: slugifyBlog(e.target.value) })} />
            </label>
            <p className="admin-permalink">
              Permalink: /journal/{post.slug}
              {slugTaken ? <strong style={{ color: "#b42318" }}> — already used</strong> : null}
            </p>
            <label className="admin-field" style={{ marginBottom: 0 }}>
              <span>Excerpt (listing card + intro)</span>
              <textarea value={post.excerpt} onChange={(e) => patch({ excerpt: e.target.value })} />
            </label>
          </div>

          <SectionsEditor sections={post.sections ?? []} onChange={(sections) => patch({ sections })} />

          <div className="admin-card">
            <h2>SEO</h2>
            <label className="admin-field">
              <span>Focus keyword</span>
              <input
                value={post.focusKeyword || ""}
                placeholder="e.g. Everest Base Camp trek"
                onChange={(e) => patch({ focusKeyword: e.target.value })}
              />
            </label>
            <label className="admin-field">
              <span>SEO title</span>
              <input value={post.metaTitle || ""} onChange={(e) => patch({ metaTitle: e.target.value })} />
              <SeoLengthHint value={post.metaTitle || post.title} kind="title" />
            </label>
            <label className="admin-field">
              <span>Meta description</span>
              <textarea value={post.metaDescription || ""} onChange={(e) => patch({ metaDescription: e.target.value })} />
              <SeoLengthHint value={post.metaDescription || ""} kind="description" />
            </label>
            <label className="admin-field">
              <span>Meta keywords (comma separated)</span>
              <input value={post.metaKeywords || ""} onChange={(e) => patch({ metaKeywords: e.target.value })} />
            </label>
            <label className="admin-field">
              <span>Social share title (Open Graph)</span>
              <input value={post.ogTitle || ""} placeholder="Defaults to SEO title" onChange={(e) => patch({ ogTitle: e.target.value })} />
            </label>
            <label className="admin-field">
              <span>Social share description (Open Graph)</span>
              <textarea
                value={post.ogDescription || ""}
                placeholder="Defaults to meta description"
                onChange={(e) => patch({ ogDescription: e.target.value })}
              />
            </label>
            <AdminMediaField
              label="Social share image (1200 × 630)"
              hint="Leave empty to use the cover image."
              value={post.ogImageSrc || ""}
              onChange={(ogImageSrc) => patch({ ogImageSrc })}
              clearLabel="Use cover image"
            />
            <label className="admin-check">
              <input type="checkbox" checked={Boolean(post.noindex)} onChange={(e) => patch({ noindex: e.target.checked })} />
              Hide this article from Google (noindex)
            </label>
            <SeoPanel
              input={seoInput}
              path={`/journal/${post.slug}`}
              ogTitle={post.ogTitle}
              ogDescription={post.ogDescription}
              ogImageSrc={post.ogImageSrc}
            />
          </div>
        </div>

        <aside className="admin-editor-side">
          <div className="admin-card">
            <h2>Publish</h2>
            <label className="admin-field">
              <span>Status</span>
              <select value={post.status || "draft"} onChange={(e) => patch({ status: e.target.value === "published" ? "published" : "draft" })}>
                <option value="draft">Draft (hidden)</option>
                <option value="published">Published (live)</option>
              </select>
            </label>
            <label className="admin-field">
              <span>Date shown</span>
              <input value={post.date} onChange={(e) => patch({ date: e.target.value })} />
            </label>
            <label className="admin-field">
              <span>Author</span>
              <input value={post.authorName} onChange={(e) => patch({ authorName: e.target.value })} />
            </label>
            <label className="admin-field">
              <span>Read time</span>
              <input value={post.readTime} onChange={(e) => patch({ readTime: e.target.value })} />
            </label>
            <button type="button" className="admin-btn admin-btn-ghost admin-btn-sm" onClick={() => patch({ readTime: estimateReadTime(post) })}>
              Calculate read time
            </button>
            {error ? <p className="admin-error" style={{ marginTop: 12 }}>{error}</p> : null}
            {status && !error ? (
              <p className={status === "Saved" ? "admin-ok" : "admin-error"} style={{ marginTop: 12 }}>
                {status}
              </p>
            ) : null}
            <button type="button" className="admin-btn admin-btn-gold" disabled={busy} onClick={() => void submit()}>
              {busy ? "Saving…" : "Save"}
            </button>
            {post.status === "draft" ? (
              <button type="button" className="admin-btn admin-btn-ghost" style={{ width: "100%", marginTop: 8 }} disabled={busy} onClick={() => void submit("published")}>
                Save &amp; publish
              </button>
            ) : null}
            {post.status === "published" ? (
              <a
                className="admin-btn admin-btn-ghost"
                style={{ display: "block", textAlign: "center", marginTop: 8 }}
                href={`/journal/${post.slug}`}
                target="_blank"
                rel="noreferrer"
              >
                View live article
              </a>
            ) : null}
          </div>

          <div className="admin-card">
            <h2>Category &amp; tags</h2>
            <label className="admin-field">
              <span>Category</span>
              <select value={post.category} onChange={(e) => patch({ category: e.target.value })}>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.label}>
                    {cat.label}
                  </option>
                ))}
                {!categories.some((cat) => cat.label === post.category) ? <option value={post.category}>{post.category}</option> : null}
              </select>
            </label>
            <TagInput tags={post.tags ?? []} onChange={(tags) => patch({ tags })} />
          </div>

          <div className="admin-card">
            <h2>Cover image</h2>
            <AdminMediaField label="Featured image" value={post.imageSrc} onChange={(imageSrc) => patch({ imageSrc })} clearLabel="Remove" />
            <label className="admin-field" style={{ marginBottom: 0 }}>
              <span>Image alt text</span>
              <input value={post.imageAlt} onChange={(e) => patch({ imageAlt: e.target.value })} />
            </label>
          </div>

          <div className="admin-card">
            <h2>Homepage card</h2>
            <label className="admin-field">
              <span>Badge text</span>
              <input value={post.badge} placeholder="★ FEATURED" onChange={(e) => patch({ badge: e.target.value })} />
            </label>
            <label className="admin-field" style={{ marginBottom: 0 }}>
              <span>Badge style</span>
              <select value={post.badgeStyle} onChange={(e) => patch({ badgeStyle: e.target.value as BlogPost["badgeStyle"] })}>
                <option value="none">None</option>
                <option value="featured">Gold (featured)</option>
                <option value="outline">Outline</option>
              </select>
            </label>
          </div>
        </aside>
      </div>
    </>
  );
}

function CategoriesView({
  categories,
  posts,
  busy,
  status,
  onSave,
}: {
  categories: BlogCategory[];
  posts: BlogPost[];
  busy: boolean;
  status: string;
  onSave: (next: BlogCategory[], renames: Record<string, string>) => Promise<boolean>;
}) {
  const [list, setList] = useState(categories);
  const [renames, setRenames] = useState<Record<string, string>>({});
  const [name, setName] = useState("");

  function update(index: number, partial: Partial<BlogCategory>) {
    setList((cur) => cur.map((cat, i) => (i === index ? { ...cat, ...partial } : cat)));
  }

  return (
    <div className="admin-grid-2">
      <div className="admin-card">
        <h2>Categories</h2>
        {list.map((cat, index) => {
          const count = posts.filter((post) => post.category === (categories.find((c) => c.id === cat.id)?.label ?? cat.label)).length;
          return (
            <div key={cat.id} className="admin-day">
              <div className="admin-section-head">
                <strong>{cat.label || "Untitled"}</strong>
                <span className="admin-muted">{count} articles</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <label className="admin-field">
                  <span>Name</span>
                  <input
                    value={cat.label}
                    onChange={(e) => {
                      const original = categories.find((c) => c.id === cat.id)?.label;
                      if (original && original !== e.target.value) setRenames((cur) => ({ ...cur, [original]: e.target.value }));
                      update(index, { label: e.target.value });
                    }}
                  />
                </label>
                <label className="admin-field">
                  <span>Slug</span>
                  <input value={cat.slug} onChange={(e) => update(index, { slug: categorySlug(e.target.value) })} />
                </label>
              </div>
              <label className="admin-field">
                <span>Description</span>
                <textarea value={cat.description} onChange={(e) => update(index, { description: e.target.value })} />
              </label>
              <button
                type="button"
                className="admin-btn admin-btn-danger admin-btn-sm"
                disabled={count > 0}
                title={count > 0 ? "Move its articles to another category first" : ""}
                onClick={() => setList((cur) => cur.filter((_, i) => i !== index))}
              >
                Delete category
              </button>
            </div>
          );
        })}
        <div className="admin-save-row">
          {status ? <span className={status === "Saved" ? "admin-ok" : "admin-error"}>{status}</span> : null}
          <button type="button" className="admin-btn admin-btn-gold" style={{ width: "auto" }} disabled={busy} onClick={() => void onSave(list, renames)}>
            Save categories
          </button>
        </div>
      </div>
      <div className="admin-card">
        <h2>Add category</h2>
        <label className="admin-field">
          <span>Name</span>
          <input value={name} placeholder="Trek guides" onChange={(e) => setName(e.target.value)} />
        </label>
        <button
          type="button"
          className="admin-btn admin-btn-ghost"
          disabled={!name.trim() || list.some((cat) => cat.label.toLowerCase() === name.trim().toLowerCase())}
          onClick={() => {
            const label = name.trim();
            setList((cur) => [...cur, { id: `cat-${Date.now()}`, label, slug: categorySlug(label), description: "" }]);
            setName("");
          }}
        >
          Add to list
        </button>
        <p className="admin-lead">Remember to press “Save categories”. Renaming a category updates every article in it.</p>
      </div>
    </div>
  );
}

export default function AdminJournal() {
  const { content, loaded, busy, status, saveMerged } = useAdminContent();
  const [view, setView] = useState<View>("list");
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [q, setQ] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "published" | "draft">("all");
  const [catFilter, setCatFilter] = useState("all");

  const posts = useMemo(() => allJournalPosts(content.blog), [content.blog]);
  const categories = useMemo(() => blogCategories(content.blog), [content.blog]);

  const visible = useMemo(() => {
    const term = q.trim().toLowerCase();
    return posts.filter((post) => {
      if (statusFilter !== "all" && (post.status || "published") !== statusFilter) return false;
      if (catFilter !== "all" && post.category !== catFilter) return false;
      if (term && !`${post.title} ${post.slug} ${(post.tags ?? []).join(" ")}`.toLowerCase().includes(term)) return false;
      return true;
    });
  }, [posts, q, statusFilter, catFilter]);

  if (!loaded) return <p>Loading journal…</p>;

  function withPosts(latest: SiteContent, nextPosts: BlogPost[]): SiteContent {
    return { ...latest, blog: { ...latest.blog, posts: nextPosts.map((post) => decorateBlogPost(post)) } };
  }

  async function savePost(post: BlogPost) {
    return saveMerged((latest) => {
      const current = allJournalPosts(latest.blog);
      const exists = current.some((item) => item.id === post.id);
      return withPosts(latest, exists ? current.map((item) => (item.id === post.id ? post : item)) : [post, ...current]);
    });
  }

  async function removePost(post: BlogPost) {
    if (!window.confirm(`Delete “${post.title}”? This cannot be undone.`)) return;
    await saveMerged((latest) => withPosts(latest, allJournalPosts(latest.blog).filter((item) => item.id !== post.id)));
  }

  async function duplicatePost(post: BlogPost) {
    const copy: BlogPost = {
      ...post,
      id: `post-${Date.now()}`,
      title: `${post.title} (copy)`,
      slug: uniqueSlug(`${post.slug}-copy`, posts, ""),
      status: "draft",
      publishedAt: "",
    };
    await saveMerged((latest) => withPosts(latest, [copy, ...allJournalPosts(latest.blog)]));
  }

  async function saveCategories(next: BlogCategory[], renames: Record<string, string>) {
    return saveMerged((latest) => {
      const renamed = allJournalPosts(latest.blog).map((post) =>
        renames[post.category] ? { ...post, category: renames[post.category] } : post,
      );
      return {
        ...latest,
        blog: {
          ...latest.blog,
          categories: next.map((cat) => ({ ...cat, label: cat.label.trim(), slug: cat.slug || categorySlug(cat.label) })),
          posts: renamed.map((post) => decorateBlogPost(post)),
        },
      };
    });
  }

  if (view === "edit" && editing) {
    return (
      <PostEditor
        key={editing.id}
        initial={editing}
        posts={posts}
        categories={categories}
        busy={busy}
        status={status}
        onSave={savePost}
        onClose={() => {
          setEditing(null);
          setView("list");
        }}
      />
    );
  }

  const published = posts.filter((post) => post.status !== "draft").length;

  return (
    <>
      <h1>Journal &amp; blog</h1>
      <p className="admin-lead">
        {published} published · {posts.length - published} drafts. Articles go live at /journal/your-slug with full SEO,
        Open Graph and Google article schema.
      </p>
      <div className="admin-tabs">
        <button type="button" className={view === "list" ? "on" : ""} onClick={() => setView("list")}>
          Articles
        </button>
        <button type="button" className={view === "categories" ? "on" : ""} onClick={() => setView("categories")}>
          Categories
        </button>
      </div>

      {view === "categories" ? (
        <CategoriesView categories={categories} posts={posts} busy={busy} status={status} onSave={saveCategories} />
      ) : (
        <>
          <div className="admin-toolbar">
            <input className="grow" value={q} placeholder="Search title, slug or tag" onChange={(e) => setQ(e.target.value)} />
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}>
              <option value="all">All statuses</option>
              <option value="published">Published</option>
              <option value="draft">Drafts</option>
            </select>
            <select value={catFilter} onChange={(e) => setCatFilter(e.target.value)}>
              <option value="all">All categories</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.label}>
                  {cat.label}
                </option>
              ))}
            </select>
            <button
              type="button"
              className="admin-btn admin-btn-gold admin-btn-sm"
              onClick={() => {
                setEditing(newPost(categories[0]?.label || "JOURNAL"));
                setView("edit");
              }}
            >
              + New article
            </button>
          </div>
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>SEO</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {visible.map((post) => (
                  <tr key={post.id}>
                    <td>
                      <strong>{post.title}</strong>
                      <span className="admin-cell-sub">/journal/{post.slug}</span>
                    </td>
                    <td>{post.category}</td>
                    <td>
                      <span className={`admin-badge ${post.status === "draft" ? "admin-badge--draft" : "admin-badge--good"}`}>
                        {post.status === "draft" ? "Draft" : "Published"}
                      </span>
                    </td>
                    <td>
                      <ScoreBadge post={post} />
                    </td>
                    <td>
                      <div className="admin-row-actions">
                        <button
                          type="button"
                          className="admin-btn admin-btn-gold admin-btn-sm"
                          onClick={() => {
                            setEditing(post);
                            setView("edit");
                          }}
                        >
                          Edit
                        </button>
                        <button type="button" className="admin-btn admin-btn-ghost admin-btn-sm" disabled={busy} onClick={() => void duplicatePost(post)}>
                          Duplicate
                        </button>
                        {post.status !== "draft" ? (
                          <a className="admin-btn admin-btn-ghost admin-btn-sm" href={`/journal/${post.slug}`} target="_blank" rel="noreferrer">
                            View
                          </a>
                        ) : null}
                        <button type="button" className="admin-btn admin-btn-danger admin-btn-sm" disabled={busy} onClick={() => void removePost(post)}>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {!visible.length ? (
                  <tr>
                    <td colSpan={5} className="admin-muted">
                      No articles match.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
}

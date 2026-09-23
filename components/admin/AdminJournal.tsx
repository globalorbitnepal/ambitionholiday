"use client";

import { useState } from "react";
import { useAdminContent } from "@/components/admin/useAdminContent";
import type { BlogPost } from "@/lib/content-types";

export default function AdminJournal() {
  const { content, loaded, save, busy, status, setContent } = useAdminContent();
  const [openId, setOpenId] = useState<string>("");

  if (!loaded) return <p>Loading journal…</p>;

  const posts: BlogPost[] = content.blog.posts?.length
    ? content.blog.posts
    : [...content.blog.featured, ...content.blog.sidePosts];
  const current = posts.find((p) => p.id === openId) || posts[0];

  function updatePost(partial: Partial<BlogPost>) {
    if (!current) return;
    const nextPosts = posts.map((p) => (p.id === current.id ? { ...p, ...partial } : p));
    setContent({
      ...content,
      blog: { ...content.blog, posts: nextPosts },
    });
  }

  return (
    <>
      <h1>Journal</h1>
      <p className="admin-lead">Articles on the left. Open one card at a time — title, body sections, SEO.</p>
      <div className="admin-chip-row">
        {posts.map((post) => (
          <button
            key={post.id}
            type="button"
            className={`admin-chip${(current?.id || "") === post.id ? " on" : ""}`}
            onClick={() => setOpenId(post.id)}
          >
            {post.title}
          </button>
        ))}
      </div>
      {current ? (
        <div className="admin-card">
          <label className="admin-field">
            <span>Title</span>
            <input value={current.title} onChange={(e) => updatePost({ title: e.target.value })} />
          </label>
          <label className="admin-field">
            <span>Excerpt</span>
            <textarea value={current.excerpt} onChange={(e) => updatePost({ excerpt: e.target.value })} />
          </label>
          <label className="admin-field">
            <span>Status</span>
            <select
              value={current.status || "published"}
              onChange={(e) => updatePost({ status: e.target.value as BlogPost["status"] })}
            >
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </label>
          <label className="admin-field">
            <span>Meta title</span>
            <input value={current.metaTitle || ""} onChange={(e) => updatePost({ metaTitle: e.target.value })} />
          </label>
          <label className="admin-field">
            <span>Meta description</span>
            <textarea
              value={current.metaDescription || ""}
              onChange={(e) => updatePost({ metaDescription: e.target.value })}
            />
          </label>
        </div>
      ) : null}
      <div className="admin-save-row">
        {status ? <span className={status === "Saved" ? "admin-ok" : "admin-error"}>{status}</span> : null}
        <button type="button" className="admin-btn admin-btn-gold" style={{ width: "auto" }} disabled={busy} onClick={() => void save(content)}>
          Save article
        </button>
      </div>
    </>
  );
}

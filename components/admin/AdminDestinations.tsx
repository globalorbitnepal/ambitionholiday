"use client";

import Link from "next/link";
import { useState } from "react";
import AdminMediaField from "@/components/admin/AdminMediaField";
import { useAdminContent } from "@/components/admin/useAdminContent";
import type { NepalContent } from "@/lib/nepal-defaults";

const DEST = [
  { key: "nepal" as const, label: "Nepal", href: "/nepal" },
  { key: "bhutan" as const, label: "Bhutan", href: "/bhutan" },
  { key: "tibet" as const, label: "Tibet", href: "/tibet" },
  { key: "multi" as const, label: "Multi-Country", href: "/himalayan-multi-countries-tour" },
];

export default function AdminDestinations() {
  const { content, loaded, save, busy, status, setContent } = useAdminContent();
  const [open, setOpen] = useState<"nepal" | "bhutan" | "tibet" | "multi">("nepal");

  if (!loaded) return <p>Loading destinations…</p>;

  const page = content[open];

  function updatePage(partial: Partial<NepalContent>) {
    setContent({ ...content, [open]: { ...content[open], ...partial } });
  }

  return (
    <>
      <h1>Destinations</h1>
      <p className="admin-lead">Edit each country page. Open Nepal to change package boxes, then full package edit.</p>
      <div className="admin-cat-grid">
        {DEST.map((item) => (
          <button
            key={item.key}
            type="button"
            className="admin-cat"
            onClick={() => setOpen(item.key)}
            style={{ textAlign: "left", border: open === item.key ? "2px solid #c9a227" : "2px solid transparent" }}
          >
            <img src={content[item.key].coverSrc} alt="" />
            <div className="body">
              <h3 style={{ margin: 0 }}>{item.label}</h3>
              <p className="admin-lead" style={{ margin: "4px 0 0" }}>
                {content[item.key].categories.reduce((n, c) => n + c.packages.length, 0)} packages
              </p>
            </div>
          </button>
        ))}
      </div>

      <div className="admin-card" style={{ marginTop: 16 }}>
        <h2>{DEST.find((d) => d.key === open)?.label} page</h2>
        <label className="admin-field">
          <span>Headline</span>
          <input value={page.headline} onChange={(e) => updatePage({ headline: e.target.value })} />
        </label>
        <label className="admin-field">
          <span>Cover lead</span>
          <textarea value={page.coverLead} onChange={(e) => updatePage({ coverLead: e.target.value })} />
        </label>
        <AdminMediaField label="Cover image" value={page.coverSrc} onChange={(coverSrc) => updatePage({ coverSrc })} />
        <label className="admin-field">
          <span>Meta title</span>
          <input value={page.metaTitle} onChange={(e) => updatePage({ metaTitle: e.target.value })} />
        </label>
        <label className="admin-field">
          <span>Meta description</span>
          <textarea value={page.metaDescription} onChange={(e) => updatePage({ metaDescription: e.target.value })} />
        </label>
      </div>

      <h2 style={{ marginTop: 22 }}>{DEST.find((d) => d.key === open)?.label} package boxes</h2>
      <p className="admin-lead">
        Edit a card here, or open Packages to build the same full trek page. Live URL is /slug — no /trip/.
      </p>
      {page.categories.map((cat) => (
        <div key={cat.id} style={{ marginBottom: 18 }}>
          <h3>{cat.label}</h3>
          <div className="admin-pkg-grid">
            {cat.packages.map((pkg) => {
              const full = content.tripPackages.find(
                (t) => t.catalogId === pkg.id || t.slug === pkg.href.replace(/^\//, "").replace(/^trip\//, ""),
              );
              return (
                <article key={pkg.id} className="admin-pkg">
                  <img src={pkg.imageSrc} alt={pkg.imageAlt} />
                  <div className="body">
                    <p style={{ color: "#c9a227", fontSize: 12, fontWeight: 700, margin: 0 }}>{pkg.badge}</p>
                    <h3>{pkg.title}</h3>
                    <p>
                      {pkg.days} Days · {pkg.difficulty}
                    </p>
                    {full ? (
                      <Link
                        className="admin-btn admin-btn-gold"
                        href={`/admin/packages/${full.id}`}
                        style={{ display: "inline-block", width: "auto" }}
                      >
                        Edit full page
                      </Link>
                    ) : (
                      <Link className="admin-btn admin-btn-ghost" href="/admin/packages" style={{ display: "inline-block", width: "auto" }}>
                        Create full page
                      </Link>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      ))}

      <div className="admin-save-row">
        {status ? <span className={status === "Saved" ? "admin-ok" : "admin-error"}>{status}</span> : null}
        <button type="button" className="admin-btn admin-btn-gold" style={{ width: "auto" }} disabled={busy} onClick={() => void save(content)}>
          Save destination
        </button>
      </div>
    </>
  );
}

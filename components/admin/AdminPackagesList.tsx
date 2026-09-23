"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useAdminContent } from "@/components/admin/useAdminContent";
import { cloneTrekTemplate, RESERVED_PACKAGE_SLUGS, tripPath } from "@/lib/trip-packages";
import type { NepalPackage } from "@/lib/nepal-defaults";

const COUNTRIES = [
  { id: "all", label: "All" },
  { id: "nepal", label: "Nepal" },
  { id: "bhutan", label: "Bhutan" },
  { id: "tibet", label: "Tibet" },
  { id: "multi", label: "Multi Country" },
] as const;

export default function AdminPackagesList() {
  const { content, loaded, save, busy } = useAdminContent();
  const router = useRouter();
  const [country, setCountry] = useState("nepal");
  const [categoryId, setCategoryId] = useState("");
  const [q, setQ] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newSlug, setNewSlug] = useState("");

  const destKey = country === "all" ? "nepal" : (country as "nepal" | "bhutan" | "tibet" | "multi");
  const categories = content[destKey].categories;
  const activeCategory = categoryId || categories[0]?.id || "";

  const packages = useMemo(() => {
    return content.tripPackages.filter((pkg) => {
      if (country !== "all" && pkg.country !== country) return false;
      if (q && !pkg.title.toLowerCase().includes(q.toLowerCase())) return false;
      return true;
    });
  }, [content.tripPackages, country, q]);

  const catalogCards = useMemo(() => {
    const dests = country === "all" ? (["nepal", "bhutan", "tibet", "multi"] as const) : [destKey];
    const rows: { dest: typeof destKey; cat: string; card: NepalPackage }[] = [];
    for (const dest of dests) {
      for (const cat of content[dest].categories) {
        if (activeCategory && dest === destKey && cat.id !== activeCategory && country !== "all") continue;
        for (const card of cat.packages) rows.push({ dest, cat: cat.label, card });
      }
    }
    return rows;
  }, [activeCategory, content, country, destKey]);

  if (!loaded) return <p>Loading packages…</p>;

  function slugFromTitle(title: string) {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  }

  async function createPackage(fields: { title: string; slug: string; dest: typeof destKey; card?: NepalPackage }) {
    const slug = fields.slug.replace(/^\//, "").replace(/^trip\//, "");
    if (RESERVED_PACKAGE_SLUGS.includes(slug)) {
      window.alert("That URL is reserved. Choose another slug.");
      return;
    }
    const pkg = cloneTrekTemplate({
      title: fields.title,
      slug,
      country: fields.dest,
      catalogId: fields.card?.id,
      heroSrc: fields.card?.imageSrc,
      heroAlt: fields.card?.imageAlt,
      days: fields.card?.days,
      difficulty: fields.card?.difficulty,
      subtitle: fields.card?.subtitle || fields.card?.description,
      badge: fields.card?.badge,
    });
    const dest = content[fields.dest];
    const nextDest = {
      ...dest,
      categories: dest.categories.map((cat, index) => {
        const match = fields.card
          ? cat.packages.some((card) => card.id === fields.card?.id)
          : cat.id === activeCategory || (!activeCategory && index === 0);
        if (!match) return cat;
        if (fields.card) {
          return {
            ...cat,
            packages: cat.packages.map((card) =>
              card.id === fields.card?.id ? { ...card, href: tripPath(pkg), title: pkg.title } : card,
            ),
          };
        }
        return {
          ...cat,
          packages: [
            ...cat.packages,
            {
              id: pkg.catalogId,
              title: pkg.title,
              days: pkg.days,
              subtitle: pkg.subtitle,
              difficulty: pkg.difficulty,
              description: pkg.subtitle,
              badge: pkg.badge,
              href: tripPath(pkg),
              imageSrc: pkg.heroSrc,
              imageAlt: pkg.heroAlt,
            },
          ],
        };
      }),
    };
    const ok = await save({
      ...content,
      tripPackages: [...content.tripPackages, pkg],
      [fields.dest]: nextDest,
    });
    if (!ok) return;
    router.push(`/admin/packages/${pkg.id}`);
  }

  return (
    <>
      <h1>Packages</h1>
      <p className="admin-lead">
        Choose country and category, then create a full trek page — same sections as Everest Base Camp Luxury. Public URL is /your-slug (no /trip/).
      </p>
      <div className="admin-card" style={{ marginBottom: 16 }}>
        <p style={{ fontWeight: 700, marginTop: 0 }}>Create a new package page</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
          <label className="admin-field">
            <span>Title</span>
            <input
              value={newTitle}
              onChange={(e) => {
                setNewTitle(e.target.value);
                if (!newSlug) setNewSlug(slugFromTitle(e.target.value));
              }}
              placeholder="Luxury Annapurna Base Camp Trek"
            />
          </label>
          <label className="admin-field">
            <span>URL slug</span>
            <input value={newSlug} onChange={(e) => setNewSlug(e.target.value)} placeholder="annapurna-base-camp-trek" />
          </label>
          <label className="admin-field">
            <span>Category on that country page</span>
            <select value={activeCategory} onChange={(e) => setCategoryId(e.target.value)}>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.label}
                </option>
              ))}
            </select>
          </label>
        </div>
        <button
          type="button"
          className="admin-btn admin-btn-gold"
          style={{ width: "auto", marginTop: 10 }}
          disabled={busy || !newTitle.trim() || !newSlug.trim() || country === "all"}
          onClick={() =>
            void createPackage({
              title: newTitle.trim(),
              slug: newSlug.trim(),
              dest: destKey,
            })
          }
        >
          Create full package page
        </button>
        {country === "all" ? <p className="admin-lead">Pick Nepal, Bhutan, Tibet or Multi first.</p> : null}
      </div>
      <div className="admin-chip-row">
        {COUNTRIES.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`admin-chip${country === item.id ? " on" : ""}`}
            onClick={() => {
              setCountry(item.id);
              setCategoryId("");
            }}
          >
            {item.label}
          </button>
        ))}
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search package title"
          style={{ marginLeft: "auto", borderRadius: 999, border: "1px solid #d5dbe3", padding: "8px 14px" }}
        />
      </div>
      <h2>Full trek pages</h2>
      <div className="admin-pkg-grid">
        {packages.map((pkg) => (
          <article key={pkg.id} className="admin-pkg">
            <img src={pkg.heroSrc} alt={pkg.heroAlt} />
            <div className="body">
              <p style={{ color: "#c9a227", fontSize: 12, fontWeight: 700, margin: 0 }}>{pkg.badge || pkg.country}</p>
              <h3>{pkg.title}</h3>
              <p>
                {pkg.duration} · {tripPath(pkg)} · {pkg.status}
              </p>
              <Link className="admin-btn admin-btn-gold" href={`/admin/packages/${pkg.id}`} style={{ display: "inline-block", width: "auto" }}>
                Edit full page
              </Link>
            </div>
          </article>
        ))}
      </div>
      <h2 style={{ marginTop: 28 }}>Catalog cards — make a page</h2>
      <p className="admin-lead">Every Nepal, Bhutan, Tibet and multi-country box. If it has no trek page yet, create one here.</p>
      <div className="admin-pkg-grid">
        {catalogCards.map(({ dest, cat, card }) => {
          const existing = content.tripPackages.find((t) => t.catalogId === card.id || t.slug === card.href.replace(/^\//, "").replace(/^trip\//, ""));
          return (
            <article key={`${dest}-${card.id}`} className="admin-pkg">
              <img src={card.imageSrc} alt={card.imageAlt} />
              <div className="body">
                <p style={{ color: "#c9a227", fontSize: 12, fontWeight: 700, margin: 0 }}>
                  {dest} · {cat}
                </p>
                <h3>{card.title}</h3>
                <p>
                  {card.days} Days · {card.difficulty}
                </p>
                {existing ? (
                  <Link className="admin-btn admin-btn-gold" href={`/admin/packages/${existing.id}`} style={{ display: "inline-block", width: "auto" }}>
                    Edit full page
                  </Link>
                ) : (
                  <button
                    type="button"
                    className="admin-btn admin-btn-gold"
                    disabled={busy}
                    onClick={() =>
                      void createPackage({
                        title: card.title,
                        slug: card.href.replace(/^\//, "").replace(/^trip\//, "") || slugFromTitle(card.title),
                        dest,
                        card,
                      })
                    }
                  >
                    Create same-style page
                  </button>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </>
  );
}

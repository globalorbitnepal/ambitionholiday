"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAdminContent } from "@/components/admin/useAdminContent";
import {
  cleanSlugInput,
  cloneTrekTemplate,
  duplicateTrekPackage,
  isValidPackageSlug,
  packageSeoInput,
  packageSlugProblem,
  packagesSharePage,
  tripPath,
  tripSlugAliases,
  type TrekPackage,
} from "@/lib/trip-packages";
import { analyzeSeo, seoScoreTone, slugify } from "@/lib/seo";
import type { NepalPackage } from "@/lib/nepal-defaults";
import type { SiteContent } from "@/lib/content-types";

const COUNTRIES = [
  { id: "all", label: "All" },
  { id: "nepal", label: "Nepal" },
  { id: "bhutan", label: "Bhutan" },
  { id: "tibet", label: "Tibet" },
  { id: "multi", label: "Multi Country" },
] as const;

type DestKey = "nepal" | "bhutan" | "tibet" | "multi";
const DESTS: DestKey[] = ["nepal", "bhutan", "tibet", "multi"];

function cardSlug(card: NepalPackage) {
  const fromHref = (card.href || "").replace(/^\//, "").replace(/^trip\//, "");
  return isValidPackageSlug(fromHref) ? fromHref : slugify(card.title);
}

function findPageForCard(card: NepalPackage, packages: TrekPackage[]) {
  const slug = (card.href || "").replace(/^\//, "").replace(/^trip\//, "");
  return packages.find(
    (pkg) =>
      pkg.catalogId === card.id ||
      pkg.id === card.id ||
      pkg.id === `trip-${card.id}` ||
      (isValidPackageSlug(slug) && [...tripSlugAliases(pkg.slug)].includes(slug)) ||
      packagesSharePage(pkg, { id: card.id, catalogId: card.id, slug }),
  );
}

function uniqueSlug(base: string, taken: Set<string>) {
  let slug = base || "package";
  let n = 2;
  while (taken.has(slug) || packageSlugProblem(slug, [], "")) {
    slug = `${base}-${n}`;
    n += 1;
  }
  taken.add(slug);
  return slug;
}

function pageFromCard(card: NepalPackage, dest: DestKey, slug: string) {
  return cloneTrekTemplate({
    title: card.title,
    slug,
    country: dest,
    catalogId: card.id,
    heroSrc: card.imageSrc,
    heroAlt: card.imageAlt,
    days: card.days,
    difficulty: card.difficulty,
    subtitle: card.subtitle || card.description,
    badge: card.badge,
  });
}

function linkCards(latest: SiteContent, pages: TrekPackage[]) {
  const byCard = new Map(pages.map((pkg) => [pkg.catalogId, pkg]));
  const next = { ...latest };
  for (const dest of DESTS) {
    next[dest] = {
      ...latest[dest],
      categories: latest[dest].categories.map((cat) => ({
        ...cat,
        packages: cat.packages.map((card) => {
          const pkg = byCard.get(card.id);
          return pkg ? { ...card, href: tripPath(pkg) } : card;
        }),
      })),
    };
  }
  return next;
}

function SeoBadge({ pkg }: { pkg: TrekPackage }) {
  const { score } = analyzeSeo(packageSeoInput(pkg));
  return <span className={`admin-badge admin-badge--${seoScoreTone(score)}`}>SEO {score}</span>;
}

export default function AdminPackagesList() {
  const { content, loaded, busy, saveMerged } = useAdminContent();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [country, setCountry] = useState<string>("nepal");
  const [categoryId, setCategoryId] = useState("");
  const [q, setQ] = useState(searchParams.get("q") || "");
  const [newTitle, setNewTitle] = useState("");
  const [newSlug, setNewSlug] = useState("");
  const [slugTouched, setSlugTouched] = useState(false);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    setQ(searchParams.get("q") || "");
  }, [searchParams]);

  const destKey: DestKey = country === "all" ? "nepal" : (country as DestKey);
  const categories = content[destKey].categories;
  const activeCategory = categoryId || categories[0]?.id || "";

  const packages = useMemo(() => {
    const needle = q.trim().toLowerCase();
    const seen = new Set<string>();
    return content.tripPackages.filter((pkg) => {
      if (country !== "all" && pkg.country !== country) return false;
      if (needle && !`${pkg.title} ${pkg.slug}`.toLowerCase().includes(needle)) return false;
      const keys = [pkg.id, pkg.catalogId, ...tripSlugAliases(pkg.slug)].filter(Boolean);
      if (keys.some((key) => seen.has(key))) return false;
      keys.forEach((key) => seen.add(key));
      return true;
    });
  }, [content.tripPackages, country, q]);

  const catalogCards = useMemo(() => {
    const dests = country === "all" ? DESTS : [destKey];
    const needle = q.trim().toLowerCase();
    const rows: { dest: DestKey; cat: string; card: NepalPackage }[] = [];
    for (const dest of dests) {
      for (const cat of content[dest].categories) {
        if (country !== "all" && categoryId && cat.id !== categoryId) continue;
        for (const card of cat.packages) {
          if (needle && !card.title.toLowerCase().includes(needle)) continue;
          rows.push({ dest, cat: cat.label, card });
        }
      }
    }
    return rows;
  }, [categoryId, content, country, destKey, q]);

  const missing = catalogCards.filter(({ card }) => !findPageForCard(card, content.tripPackages));
  const newSlugProblem = newSlug ? packageSlugProblem(newSlug.replace(/-+$/, ""), content.tripPackages, "") : "";

  if (!loaded) return <p>Loading packages…</p>;

  async function createFromForm() {
    const slug = newSlug.trim().replace(/-+$/, "");
    const problem = packageSlugProblem(slug, content.tripPackages, "");
    if (problem) {
      window.alert(problem);
      return;
    }
    const pkg = cloneTrekTemplate({ title: newTitle.trim(), slug, country: destKey });
    const card: NepalPackage = {
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
    };
    const ok = await saveMerged((latest) => ({
      ...latest,
      tripPackages: [...latest.tripPackages, pkg],
      [destKey]: {
        ...latest[destKey],
        categories: latest[destKey].categories.map((cat, index) =>
          cat.id === activeCategory || (!activeCategory && index === 0) ? { ...cat, packages: [...cat.packages, card] } : cat,
        ),
      },
    }));
    if (ok) router.push(`/admin/packages/${pkg.id}`);
  }

  async function createForCard(dest: DestKey, card: NepalPackage) {
    const taken = new Set(content.tripPackages.map((pkg) => pkg.slug));
    const pkg = pageFromCard(card, dest, uniqueSlug(cardSlug(card), taken));
    const ok = await saveMerged((latest) =>
      linkCards({ ...latest, tripPackages: [...latest.tripPackages, pkg] }, [pkg]),
    );
    if (ok) router.push(`/admin/packages/${pkg.id}`);
  }

  async function createAllMissing() {
    if (!missing.length) return;
    if (!window.confirm(`Create ${missing.length} draft package page(s)? They stay hidden until you publish each one.`)) return;
    const taken = new Set(content.tripPackages.map((pkg) => pkg.slug));
    const pages = missing.map(({ dest, card }) => pageFromCard(card, dest, uniqueSlug(cardSlug(card), taken)));
    const ok = await saveMerged((latest) => {
      const fresh = pages.filter((pkg) => !latest.tripPackages.some((item) => item.catalogId === pkg.catalogId));
      return linkCards({ ...latest, tripPackages: [...latest.tripPackages, ...fresh] }, fresh);
    });
    if (ok) setNotice(`${pages.length} draft page(s) created. Open each one, add content, then publish.`);
  }

  async function duplicate(pkg: TrekPackage) {
    const copy = duplicateTrekPackage(pkg, content.tripPackages);
    const ok = await saveMerged((latest) => ({ ...latest, tripPackages: [...latest.tripPackages, copy] }));
    if (ok) router.push(`/admin/packages/${copy.id}`);
  }

  async function remove(pkg: TrekPackage) {
    if (!window.confirm(`Delete "${pkg.title}"? The catalog card stays, but its page ${tripPath(pkg)} will be removed.`)) return;
    const ok = await saveMerged((latest) => ({
      ...latest,
      tripPackages: latest.tripPackages.filter((item) => item.id !== pkg.id),
    }));
    if (ok) setNotice(`Deleted ${pkg.title}.`);
  }

  return (
    <>
      <h1>Packages</h1>
      <p className="admin-lead">
        Every package page uses the same layout as Everest Base Camp. Only the content, photos, map and price change. New pages start as
        drafts and go live when you publish them.
      </p>
      {notice ? <p className="admin-flash">{notice}</p> : null}

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
          className="admin-chip-search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search packages"
          style={{ marginLeft: "auto", borderRadius: 999, border: "1px solid #d5dbe3", padding: "8px 14px" }}
        />
      </div>

      <div className="admin-card" style={{ marginBottom: 16 }}>
        <p style={{ fontWeight: 700, marginTop: 0 }}>Create a new package page</p>
        <div className="admin-grid-3">
          <label className="admin-field">
            <span>Title</span>
            <input
              value={newTitle}
              onChange={(e) => {
                setNewTitle(e.target.value);
                if (!slugTouched) setNewSlug(slugify(e.target.value));
              }}
              placeholder="Luxury Annapurna Base Camp Trek"
            />
          </label>
          <label className="admin-field">
            <span>URL slug</span>
            <input
              value={newSlug}
              onChange={(e) => {
                setSlugTouched(true);
                setNewSlug(cleanSlugInput(e.target.value));
              }}
              placeholder="annapurna-base-camp-trek"
            />
            {newSlug ? <small className="admin-permalink">{`/${newSlug}`}</small> : null}
            {newSlugProblem ? <small className="admin-warn">{newSlugProblem}</small> : null}
          </label>
          <label className="admin-field">
            <span>Category on the {destKey} page</span>
            <select value={activeCategory} onChange={(e) => setCategoryId(e.target.value)} disabled={country === "all"}>
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
          disabled={busy || !newTitle.trim() || !newSlug.trim() || Boolean(newSlugProblem) || country === "all"}
          onClick={() => void createFromForm()}
        >
          Create package page (draft)
        </button>
        {country === "all" ? <p className="admin-lead">Pick Nepal, Bhutan, Tibet or Multi Country first.</p> : null}
      </div>

      <h2>Package pages ({packages.length})</h2>
      <div className="admin-pkg-grid">
        {packages.map((pkg) => (
          <article key={pkg.id} className="admin-pkg">
            <img src={pkg.heroSrc} alt={pkg.heroAlt} loading="lazy" />
            <div className="body">
              <p style={{ color: "#c9a227", fontSize: 12, fontWeight: 700, margin: 0 }}>{pkg.badge || pkg.country}</p>
              <h3>{pkg.title}</h3>
              <p>
                {pkg.duration} · {tripPath(pkg)}
              </p>
              <p className="admin-row-actions" style={{ margin: "6px 0" }}>
                <span className={`admin-badge admin-badge--${pkg.status === "published" ? "good" : "draft"}`}>{pkg.status}</span>
                <SeoBadge pkg={pkg} />
              </p>
              <div className="admin-row-actions">
                <Link className="admin-btn admin-btn-gold admin-btn-sm" href={`/admin/packages/${pkg.id}`}>
                  Edit
                </Link>
                {pkg.status === "published" ? (
                  <a className="admin-btn admin-btn-sm" href={tripPath(pkg)} target="_blank" rel="noreferrer">
                    View
                  </a>
                ) : null}
                <button type="button" className="admin-btn admin-btn-sm" disabled={busy} onClick={() => void duplicate(pkg)}>
                  Duplicate
                </button>
                <button type="button" className="admin-btn admin-btn-sm admin-btn-danger" disabled={busy} onClick={() => void remove(pkg)}>
                  Delete
                </button>
              </div>
            </div>
          </article>
        ))}
        {!packages.length ? <p className="admin-lead">No package pages here yet.</p> : null}
      </div>

      <div className="admin-section-head" style={{ marginTop: 28 }}>
        <h2 style={{ margin: 0 }}>Catalog cards ({catalogCards.length})</h2>
        <button
          type="button"
          className="admin-btn admin-btn-gold"
          style={{ width: "auto" }}
          disabled={busy || !missing.length}
          onClick={() => void createAllMissing()}
        >
          {missing.length ? `Create ${missing.length} missing page(s) as drafts` : "Every card has a page"}
        </button>
      </div>
      <p className="admin-lead">
        These are the package boxes on the Nepal, Bhutan, Tibet and Multi Country pages. Until a card&apos;s page is published, its button
        opens the enquiry form.
      </p>
      <div className="admin-pkg-grid">
        {catalogCards.map(({ dest, cat, card }) => {
          const existing = findPageForCard(card, content.tripPackages);
          return (
            <article key={`${dest}-${card.id}`} className="admin-pkg">
              <img src={card.imageSrc} alt={card.imageAlt} loading="lazy" />
              <div className="body">
                <p style={{ color: "#c9a227", fontSize: 12, fontWeight: 700, margin: 0 }}>
                  {dest} · {cat}
                </p>
                <h3>{card.title}</h3>
                <p>
                  {card.days} Days · {card.difficulty}
                </p>
                {existing ? (
                  <div className="admin-row-actions">
                    <span className={`admin-badge admin-badge--${existing.status === "published" ? "good" : "draft"}`}>{existing.status}</span>
                    <Link className="admin-btn admin-btn-gold admin-btn-sm" href={`/admin/packages/${existing.id}`}>
                      Edit page
                    </Link>
                  </div>
                ) : (
                  <button
                    type="button"
                    className="admin-btn admin-btn-gold"
                    disabled={busy}
                    onClick={() => void createForCard(dest, card)}
                  >
                    Create page
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

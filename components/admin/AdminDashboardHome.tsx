"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useAdminContent } from "@/components/admin/useAdminContent";
import type { StoredInquiry } from "@/app/api/admin/inquiries/route";
import { enrichCatalogCard, EBC_PACKAGE_ID } from "@/lib/trip-packages";

function formatWhen(iso: string) {
  try {
    return new Date(iso).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" });
  } catch {
    return iso;
  }
}

function formatDate() {
  return new Date().toLocaleDateString(undefined, { weekday: "short", day: "numeric", month: "short", year: "numeric" });
}

export default function AdminDashboardHome() {
  const { content, loaded } = useAdminContent();
  const [inquiries, setInquiries] = useState<StoredInquiry[]>([]);
  const [inqLoading, setInqLoading] = useState(true);

  useEffect(() => {
    void (async () => {
      try {
        const res = await fetch("/api/admin/inquiries", { credentials: "include", cache: "no-store" });
        if (!res.ok) return;
        const data = (await res.json()) as { items?: StoredInquiry[] };
        setInquiries(data.items ?? []);
      } finally {
        setInqLoading(false);
      }
    })();
  }, []);

  const tripPackages = loaded ? content.tripPackages : [];
  const published = tripPackages.filter((p) => p.status === "published").length;
  const posts = loaded ? [...(content.blog.posts || []), ...content.blog.featured] : [];
  const departures = loaded ? content.availability?.cards ?? [] : [];

  const nepalRegions = useMemo(() => {
    if (!loaded) return [];
    const cat = content.nepal.categories.find((c) => c.id === "trekking") ?? content.nepal.categories[0];
    if (!cat) return [];
    return cat.packages.slice(0, 6).map((card) => {
      const live = enrichCatalogCard(card, content.tripPackages);
      return {
        id: card.id,
        title: live.title.replace(/Luxury |Trek/gi, "").trim() || live.title,
        image: live.imageSrc,
        href: live.href,
      };
    });
  }, [content.nepal.categories, content.tripPackages, loaded]);

  const newInquiries = inquiries.filter((item) => {
    const t = Date.parse(item.createdAt);
    return Number.isFinite(t) && Date.now() - t < 7 * 86400000;
  }).length;

  const ebc = tripPackages.find((p) => p.id === EBC_PACKAGE_ID);
  const abc = tripPackages.find((p) => p.id === "abc-lux");

  if (!loaded) return <p className="admin-muted">Loading dashboard…</p>;

  return (
    <div className="admin-dash">
      <section className="admin-hero">
        <img src="/images/atmosphere/himalaya-gold-dusk-v2.webp" alt="" className="admin-hero-bg" />
        <div className="admin-hero-inner">
          <div>
            <h1>Welcome back, Admin</h1>
            <p>Manage treks, prices, maps and every section of your live package pages.</p>
          </div>
          <div className="admin-hero-weather">
            <strong>Kathmandu</strong>
            <span>{formatDate()}</span>
            <em>Nepal · HQ</em>
          </div>
        </div>
      </section>

      <div className="admin-stats admin-stats--premium">
        <div className="admin-stat-card" data-tone="blue">
          <span className="admin-stat-icon">✉</span>
          <b>{inquiries.length}</b>
          <span>Total enquiries</span>
          <em>+{newInquiries} this week</em>
        </div>
        <div className="admin-stat-card" data-tone="green">
          <span className="admin-stat-icon">◎</span>
          <b>{published}</b>
          <span>Live package pages</span>
          <em>{tripPackages.length} total</em>
        </div>
        <div className="admin-stat-card" data-tone="gold">
          <span className="admin-stat-icon">▣</span>
          <b>{departures.length}</b>
          <span>Departures listed</span>
        </div>
        <div className="admin-stat-card" data-tone="purple">
          <span className="admin-stat-icon">✎</span>
          <b>{posts.length}</b>
          <span>Journal posts</span>
        </div>
      </div>

      <div className="admin-dash-grid">
        <div className="admin-dash-main">
          <section className="admin-card">
            <div className="admin-card-head">
              <h2>Popular destinations</h2>
              <Link className="admin-text-link" href="/admin/destinations">Manage</Link>
            </div>
            <div className="admin-dest-row">
              {nepalRegions.map((dest) => (
                <a key={dest.id} className="admin-dest-card" href={dest.href || "/nepal"} target="_blank" rel="noreferrer">
                  <img src={dest.image} alt="" loading="lazy" />
                  <span>{dest.title}</span>
                </a>
              ))}
            </div>
          </section>

          <section className="admin-card admin-card--wide">
            <div className="admin-card-head">
              <h2>Recent enquiries</h2>
              <Link className="admin-text-link" href="/admin/contact">Contact settings</Link>
            </div>
            {inqLoading ? (
              <p className="admin-muted">Loading…</p>
            ) : inquiries.length === 0 ? (
              <p className="admin-muted">No enquiries yet — they appear when guests use the contact form.</p>
            ) : (
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>When</th>
                      <th>Guest</th>
                      <th>Interest</th>
                      <th>Travel</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inquiries.slice(0, 8).map((row) => (
                      <tr key={row.id}>
                        <td>{formatWhen(row.createdAt)}</td>
                        <td>
                          <strong>{row.name}</strong>
                          <span className="admin-cell-sub">{row.email}</span>
                        </td>
                        <td>{row.interest || row.source || "—"}</td>
                        <td>
                          {row.dates || "—"}
                          {row.travelers ? ` · ${row.travelers} pax` : ""}
                        </td>
                        <td><span className="admin-badge admin-badge--ok">New</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>

          <section className="admin-card">
            <div className="admin-card-head">
              <h2>Full-edit package pages</h2>
              <Link className="admin-text-link" href="/admin/packages">All packages</Link>
            </div>
            <p className="admin-muted">Same layout as Everest Base Camp — edit price, group discounts, itinerary, map, charts, gallery and SEO.</p>
            <div className="admin-pkg-grid admin-pkg-grid--dash">
              {[ebc, abc].filter(Boolean).map((pkg) => (
                <article key={pkg!.id} className="admin-pkg admin-pkg--featured">
                  <img src={pkg!.heroSrc} alt={pkg!.heroAlt} loading="lazy" />
                  <div className="body">
                    <h3>{pkg!.title}</h3>
                    <p>{pkg!.duration} · /{pkg!.slug}</p>
                    <div className="admin-row-actions">
                      <Link className="admin-btn admin-btn-gold admin-btn-sm" href={`/admin/packages/${pkg!.id}`}>
                        Full section edit
                      </Link>
                      <a className="admin-btn admin-btn-sm" href={`/${pkg!.slug}`} target="_blank" rel="noreferrer">
                        Live page ↗
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>

        <aside className="admin-dash-aside">
          <section className="admin-card">
            <h2>Quick actions</h2>
            <div className="admin-quick-grid">
              <Link className="admin-quick-btn" data-tone="blue" href="/admin/packages">Add / edit packages</Link>
              <Link className="admin-quick-btn" data-tone="green" href="/admin/media">Upload media</Link>
              <Link className="admin-quick-btn" data-tone="gold" href="/admin/journal">Write blog post</Link>
              <Link className="admin-quick-btn" data-tone="purple" href="/admin/reviews">Reviews</Link>
              <Link className="admin-quick-btn" data-tone="teal" href="/admin/header">Header & menus</Link>
              <Link className="admin-quick-btn" data-tone="orange" href="/admin/contact">View enquiries</Link>
            </div>
          </section>

          <section className="admin-card">
            <div className="admin-card-head">
              <h2>Upcoming departures</h2>
              <Link className="admin-text-link" href="/admin/luxury">Edit</Link>
            </div>
            <ul className="admin-booking-list">
              {departures.slice(0, 5).map((card) => (
                <li key={card.id}>
                  <div>
                    <strong>{card.title}</strong>
                    <span>{card.monthFull || card.monthShort}</span>
                  </div>
                  <em>{card.availableLabel || "Open"}</em>
                </li>
              ))}
            </ul>
            {!departures.length ? <p className="admin-muted">No departures listed.</p> : null}
          </section>

          <section className="admin-card">
            <h2>All trek pages</h2>
            <ul className="admin-mini-list">
              {tripPackages.map((pkg) => (
                <li key={pkg.id}>
                  <Link href={`/admin/packages/${pkg.id}`}>{pkg.title}</Link>
                  <span className={`admin-badge admin-badge--${pkg.status === "published" ? "good" : "draft"}`}>{pkg.status}</span>
                </li>
              ))}
            </ul>
          </section>
        </aside>
      </div>
    </div>
  );
}

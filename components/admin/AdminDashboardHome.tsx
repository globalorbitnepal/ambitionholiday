"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useAdminContent } from "@/components/admin/useAdminContent";
import type { StoredInquiry } from "@/app/api/admin/inquiries/route";

function formatWhen(iso: string) {
  try {
    return new Date(iso).toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });
  } catch {
    return iso;
  }
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

  const nepalCount = useMemo(
    () => (loaded ? content.nepal.categories.reduce((n, cat) => n + cat.packages.length, 0) : 0),
    [content.nepal.categories, loaded],
  );
  const tripCount = loaded ? content.tripPackages.length : 0;
  const posts = loaded ? [...(content.blog.posts || []), ...content.blog.featured] : [];
  const departures = loaded ? content.availability?.cards ?? [] : [];
  const payments = loaded ? content.footer?.payments ?? [] : [];

  const newInquiries = inquiries.filter((item) => {
    const t = Date.parse(item.createdAt);
    return Number.isFinite(t) && Date.now() - t < 7 * 86400000;
  }).length;

  if (!loaded) return <p>Loading dashboard…</p>;

  return (
    <>
      <h1>Dashboard</h1>
      <p className="admin-lead">Treks, enquiries, departures and payments — everything in one desk.</p>

      <div className="admin-stats admin-stats--dash">
        <div className="admin-stat admin-stat--accent">
          <b>{inquiries.length}</b>
          <span>Total enquiries</span>
          <em>{newInquiries} this week</em>
        </div>
        <div className="admin-stat">
          <b>{departures.length}</b>
          <span>Listed departures</span>
        </div>
        <div className="admin-stat">
          <b>{tripCount}</b>
          <span>Full trek packages</span>
        </div>
        <div className="admin-stat">
          <b>{nepalCount}</b>
          <span>Catalog cards</span>
        </div>
      </div>

      <div className="admin-dash-stack">
        <section className="admin-card admin-card--wide">
          <div className="admin-card-head">
            <h2>Recent enquiries</h2>
            <Link className="admin-text-link" href="/admin/contact">Contact settings</Link>
          </div>
          {inqLoading ? (
            <p className="admin-muted">Loading enquiries…</p>
          ) : inquiries.length === 0 ? (
            <p className="admin-muted">No enquiries yet. They appear here when guests submit the contact form.</p>
          ) : (
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>When</th>
                    <th>Guest</th>
                    <th>Interest</th>
                    <th>Travel</th>
                    <th>Message</th>
                  </tr>
                </thead>
                <tbody>
                  {inquiries.slice(0, 12).map((row) => (
                    <tr key={row.id}>
                      <td>{formatWhen(row.createdAt)}</td>
                      <td>
                        <strong>{row.name}</strong>
                        <span className="admin-cell-sub">{row.email}</span>
                        {row.phone ? <span className="admin-cell-sub">{row.phone}</span> : null}
                      </td>
                      <td>{row.interest || row.source || "—"}</td>
                      <td>
                        {row.dates || "—"}
                        {row.travelers ? ` · ${row.travelers} pax` : ""}
                        {row.country ? <span className="admin-cell-sub">{row.country}</span> : null}
                      </td>
                      <td className="admin-cell-msg">{row.message}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <div className="admin-grid-2">
          <section className="admin-card">
            <div className="admin-card-head">
              <h2>Departures &amp; bookings</h2>
              <Link className="admin-text-link" href="/admin/luxury">Luxury tours</Link>
            </div>
            <p className="admin-muted">Fixed-date groups shown on the homepage availability strip.</p>
            <ul className="admin-booking-list">
              {departures.slice(0, 6).map((card) => (
                <li key={card.id}>
                  <div>
                    <strong>{card.title}</strong>
                    <span>{card.monthFull || card.monthShort}</span>
                  </div>
                  <em>{card.availableLabel || card.badge || "Open"}</em>
                </li>
              ))}
            </ul>
            {departures.length === 0 ? <p className="admin-muted">No departure cards listed yet.</p> : null}
          </section>

          <section className="admin-card">
            <div className="admin-card-head">
              <h2>Payment methods</h2>
              <Link className="admin-text-link" href="/admin/header">Header &amp; footer</Link>
            </div>
            <p className="admin-muted">{content.footer.paymentsTitle || "We accept"}</p>
            <div className="admin-pay-chips">
              {payments.map((p) => (
                <span key={p.id} className="admin-pay-chip">
                  {p.label || p.id}
                </span>
              ))}
            </div>
            <p className="admin-muted admin-pay-note">
              Bank transfer and invoice details are confirmed per booking. Card logos match the live footer.
            </p>
          </section>
        </div>

        <div className="admin-grid-2">
          <section className="admin-card">
            <h2>Quick actions</h2>
            <div className="admin-chip-row">
              <Link className="admin-chip on" href="/admin/packages">Manage packages</Link>
              <Link className="admin-chip" href="/admin/packages/ebc-lux">Edit EBC Luxury Trek</Link>
              <Link className="admin-chip" href="/admin/media">Media library</Link>
              <Link className="admin-chip" href="/admin/journal">Journal ({posts.length})</Link>
              <Link className="admin-chip" href="/admin/header">Header &amp; menus</Link>
            </div>
          </section>
          <section className="admin-card">
            <h2>Live site</h2>
            <div className="admin-chip-row">
              <a className="admin-chip" href="/nepal" target="_blank" rel="noreferrer">Nepal</a>
              <a className="admin-chip" href="/everest-base-camp-trek" target="_blank" rel="noreferrer">EBC Trek</a>
              <a className="admin-chip" href="/journal" target="_blank" rel="noreferrer">Journal</a>
              <a className="admin-chip" href="/contact" target="_blank" rel="noreferrer">Contact</a>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

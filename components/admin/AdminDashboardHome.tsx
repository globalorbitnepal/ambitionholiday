"use client";

import Link from "next/link";
import { useAdminContent } from "@/components/admin/useAdminContent";

export default function AdminDashboardHome() {
  const { content, loaded } = useAdminContent();
  if (!loaded) return <p>Loading dashboard…</p>;

  const nepalCount = content.nepal.categories.reduce((n, cat) => n + cat.packages.length, 0);
  const tripCount = content.tripPackages.length;
  const posts = [...(content.blog.posts || []), ...content.blog.featured];

  return (
    <>
      <h1>Dashboard</h1>
      <p className="admin-lead">Welcome back. Here’s what’s happening with Ambition Holidays.</p>
      <div className="admin-stats">
        <div className="admin-stat">
          <b>{tripCount}</b>
          <span>Full trek packages</span>
        </div>
        <div className="admin-stat">
          <b>{nepalCount}</b>
          <span>Nepal catalog cards</span>
        </div>
        <div className="admin-stat">
          <b>{posts.length}</b>
          <span>Journal articles</span>
        </div>
        <div className="admin-stat">
          <b>4</b>
          <span>Destination pages</span>
        </div>
      </div>
      <div className="admin-grid-2">
        <div className="admin-card">
          <h2>Quick actions</h2>
          <div className="admin-chip-row">
            <Link className="admin-chip on" href="/admin/packages">
              Manage packages
            </Link>
            <Link className="admin-chip" href="/admin/packages/ebc-lux">
              Edit Everest Base Camp Luxury Trek
            </Link>
            <Link className="admin-chip" href="/admin/destinations">
              Destinations
            </Link>
            <Link className="admin-chip" href="/admin/journal">
              Add journal post
            </Link>
            <Link className="admin-chip" href="/admin/header">
              Header page (logo & menus)
            </Link>
          </div>
        </div>
        <div className="admin-card">
          <h2>Live site</h2>
          <p className="admin-lead">Open public pages without leaving the desk.</p>
          <div className="admin-chip-row">
            <a className="admin-chip" href="/nepal" target="_blank" rel="noreferrer">
              Nepal
            </a>
            <a className="admin-chip" href="/everest-base-camp-trek" target="_blank" rel="noreferrer">
              EBC Luxury Trek
            </a>
            <a className="admin-chip" href="/journal" target="_blank" rel="noreferrer">
              Journal
            </a>
            <a className="admin-chip" href="/contact" target="_blank" rel="noreferrer">
              Contact
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

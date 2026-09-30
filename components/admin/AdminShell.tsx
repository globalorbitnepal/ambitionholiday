"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import AdminSideNav from "@/components/admin/AdminSideNav";

export default function AdminShell({ children, role = "admin" }: { children: React.ReactNode; role?: "admin" | "super" }) {
  const pathname = usePathname();
  const router = useRouter();
  const [search, setSearch] = useState("");

  async function logout() {
    if (role === "super") {
      router.push("/orbit");
      return;
    }
    await fetch("/api/admin/logout", { method: "POST", credentials: "include" });
    router.replace("/admin/login");
    router.refresh();
  }

  function onSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = search.trim();
    if (!q) {
      router.push("/admin/packages");
      return;
    }
    router.push(`/admin/packages?q=${encodeURIComponent(q)}`);
  }

  const pageTitle =
    pathname === "/admin"
      ? "Dashboard"
      : pathname.startsWith("/admin/packages/")
        ? "Package editor"
        : pathname.startsWith("/admin/packages")
          ? "Tour packages"
          : "Control centre";

  return (
    <div className="admin-shell">
      <aside className="admin-side">
        <div className="admin-side-top">
          <p className="admin-side-kicker">Ambition Holidays</p>
          <a className="admin-side-live" href="/" target="_blank" rel="noreferrer">
            View live site ↗
          </a>
          {role === "super" ? <Link className="admin-side-live" href="/orbit">Orbit super-admin</Link> : null}
        </div>
        <AdminSideNav />
        <div className="admin-side-bottom">
          <button type="button" className="admin-side-signout" onClick={logout}>
            {role === "super" ? "Exit to Orbit" : "Sign out"}
          </button>
        </div>
      </aside>
      <div className="admin-main">
        <nav className="admin-mobile-nav" aria-label="Admin sections">
          <Link href="/admin" className={pathname === "/admin" ? "active" : ""}>Home</Link>
          <Link href="/admin/packages" className={pathname.startsWith("/admin/packages") ? "active" : ""}>Packages</Link>
          <Link href="/admin/media" className={pathname.startsWith("/admin/media") ? "active" : ""}>Media</Link>
          <a href="/" target="_blank" rel="noreferrer">Live</a>
          <button type="button" onClick={logout}>{role === "super" ? "Orbit" : "Out"}</button>
        </nav>
        <header className="admin-top">
          <form className="admin-top-search" onSubmit={onSearchSubmit}>
            <span className="admin-top-search-icon" aria-hidden>⌕</span>
            <input
              type="search"
              placeholder="Search packages, slugs, destinations…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <kbd>Ctrl K</kbd>
          </form>
          <div className="admin-top-actions">
            <Link className="admin-top-pill" href="/admin/contact">Enquiries</Link>
            <div className="admin-top-user">
              <span className="admin-top-avatar" aria-hidden>{role === "super" ? "S" : "A"}</span>
              <div>
                <strong>{role === "super" ? "Super admin" : "Admin"}</strong>
                <span>{pageTitle}</span>
              </div>
            </div>
          </div>
        </header>
        <div className="admin-page">{children}</div>
      </div>
    </div>
  );
}

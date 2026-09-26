"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const NAV = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/packages", label: "Packages" },
  { href: "/admin/destinations", label: "Destinations" },
  { href: "/admin/luxury", label: "Luxury Tour & Trek" },
  { href: "/admin/guide", label: "Travel Guide" },
  { href: "/admin/company", label: "Company" },
  { href: "/admin/journal", label: "Journal" },
  { href: "/admin/reviews", label: "Reviews" },
  { href: "/admin/contact", label: "Contact" },
  { href: "/admin/header", label: "Header" },
  { href: "/admin/media", label: "Media" },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST", credentials: "include" });
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <div className="admin-shell">
      <aside className="admin-side">
        <div className="admin-side-brand">
          <strong>Ambition Holidays</strong>
          <small>Control centre</small>
        </div>
        <a href="/" target="_blank" rel="noreferrer">
          View live site
        </a>
        <div className="group-label">Workspace</div>
        {NAV.map((item) => {
          const active = item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
          return (
            <Link key={item.href} href={item.href} className={active ? "active" : ""}>
              {item.label}
            </Link>
          );
        })}
        <div style={{ marginTop: "auto" }}>
          <button type="button" className="nav" onClick={logout}>
            Sign out
          </button>
        </div>
      </aside>
      <div className="admin-main">
        <header className="admin-top">
          <input type="search" placeholder="Search packages, bookings, customers…" readOnly />
          <div className="admin-top-user">
            <strong>Admin</strong>
            <span style={{ color: "#667084" }}>Staff</span>
          </div>
        </header>
        <div className="admin-page">{children}</div>
      </div>
    </div>
  );
}

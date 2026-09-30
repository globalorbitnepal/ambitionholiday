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

export default function AdminShell({ children, role = "admin" }: { children: React.ReactNode; role?: "admin" | "super" }) {
  const pathname = usePathname();
  const router = useRouter();
  const isActive = (href: string) => (href === "/admin" ? pathname === "/admin" : pathname.startsWith(href));

  async function logout() {
    if (role === "super") {
      router.push("/orbit");
      return;
    }
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
          {role === "super" ? <span className="admin-role">Super admin</span> : null}
        </div>
        <a href="/" target="_blank" rel="noreferrer">
          View live site
        </a>
        {role === "super" ? <Link href="/orbit">Back to Orbit</Link> : null}
        <div className="group-label">Workspace</div>
        {NAV.map((item) => (
          <Link key={item.href} href={item.href} className={isActive(item.href) ? "active" : ""}>
            {item.label}
          </Link>
        ))}
        <div style={{ marginTop: "auto" }}>
          <button type="button" className="nav" onClick={logout}>
            {role === "super" ? "Exit to Orbit" : "Sign out"}
          </button>
        </div>
      </aside>
      <div className="admin-main">
        <nav className="admin-mobile-nav" aria-label="Admin sections">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className={isActive(item.href) ? "active" : ""}>
              {item.label}
            </Link>
          ))}
          <a href="/" target="_blank" rel="noreferrer">
            Live site
          </a>
          <button type="button" onClick={logout}>
            {role === "super" ? "Orbit" : "Sign out"}
          </button>
        </nav>
        <header className="admin-top">
          <input type="search" placeholder="Search packages, bookings, customers…" readOnly />
          <div className="admin-top-user">
            <strong>{role === "super" ? "Super admin" : "Admin"}</strong>
            <span style={{ color: "#667084" }}>{role === "super" ? "Full access" : "Staff"}</span>
          </div>
        </header>
        <div className="admin-page">{children}</div>
      </div>
    </div>
  );
}

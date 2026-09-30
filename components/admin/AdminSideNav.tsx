"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { useAdminContent } from "@/components/admin/useAdminContent";
import {
  IconChevron,
  IconDashboard,
  IconGlobe,
  IconJournal,
  IconMedia,
  IconPackage,
  IconSettings,
  IconStar,
} from "@/components/admin/AdminNavIcons";
import { tripPath } from "@/lib/trip-packages";

const MAIN_NAV = [
  { href: "/admin", label: "Dashboard", icon: IconDashboard },
  { href: "/admin/packages", label: "Tour packages", icon: IconPackage, packagesToggle: true },
  { href: "/admin/destinations", label: "Destinations", icon: IconGlobe },
  { href: "/admin/luxury", label: "Luxury tours", icon: IconStar },
  { href: "/admin/journal", label: "Blog & news", icon: IconJournal },
  { href: "/admin/reviews", label: "Reviews", icon: IconStar },
  { href: "/admin/media", label: "Media library", icon: IconMedia },
] as const;

const MORE_NAV = [
  { href: "/admin/guide", label: "Travel guide" },
  { href: "/admin/company", label: "Company" },
  { href: "/admin/contact", label: "Enquiries & contact" },
  { href: "/admin/header", label: "Header & footer" },
] as const;

export default function AdminSideNav() {
  const pathname = usePathname();
  const { content, loaded } = useAdminContent();
  const [pkgOpen, setPkgOpen] = useState(true);

  const packages = useMemo(() => {
    if (!loaded) return [];
    return [...content.tripPackages].sort((a, b) => a.title.localeCompare(b.title));
  }, [content.tripPackages, loaded]);

  const isActive = (href: string) => (href === "/admin" ? pathname === "/admin" : pathname.startsWith(href));

  return (
    <nav className="admin-side-nav" aria-label="Admin">
      {MAIN_NAV.map((item) => {
        const Icon = item.icon;
        const active = isActive(item.href);
        return (
          <div key={item.href} className="admin-side-nav-group">
            <div className="admin-side-nav-row">
              <Link href={item.href} className={active ? "active" : ""}>
                <Icon className="admin-nav-icon" />
                {item.label}
              </Link>
              {"packagesToggle" in item && item.packagesToggle ? (
                <button
                  type="button"
                  className="admin-side-expand"
                  aria-expanded={pkgOpen}
                  aria-label="Show package list"
                  onClick={() => setPkgOpen((v) => !v)}
                >
                  <IconChevron open={pkgOpen} />
                </button>
              ) : null}
            </div>
            {"packagesToggle" in item && item.packagesToggle && pkgOpen ? (
              <div className="admin-side-pkg-list">
                {packages.map((pkg) => {
                  const editHref = `/admin/packages/${pkg.id}`;
                  const onEditor = pathname === editHref;
                  return (
                    <Link key={pkg.id} href={editHref} className={onEditor ? "active" : ""} title={tripPath(pkg)}>
                      <span className="admin-side-pkg-dot" data-status={pkg.status} />
                      <span className="admin-side-pkg-title">{pkg.title}</span>
                    </Link>
                  );
                })}
                {!packages.length ? <span className="admin-side-pkg-empty">No pages yet</span> : null}
              </div>
            ) : null}
          </div>
        );
      })}

      <div className="admin-side-divider" />
      <p className="admin-side-group-label">Website</p>
      {MORE_NAV.map((item) => (
        <Link key={item.href} href={item.href} className={isActive(item.href) ? "active" : ""}>
          <IconSettings className="admin-nav-icon" />
          {item.label}
        </Link>
      ))}

      <div className="admin-side-footer-card">
        <img src="/images/nepal/nepal-trek-ebc.webp" alt="" loading="lazy" />
        <div>
          <strong>Explore · Manage · Grow</strong>
          <span>Edit every trek page section by section.</span>
        </div>
      </div>
    </nav>
  );
}

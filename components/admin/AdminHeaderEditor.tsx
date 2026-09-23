"use client";

import AdminMediaField from "@/components/admin/AdminMediaField";
import { useAdminContent } from "@/components/admin/useAdminContent";

export default function AdminHeaderEditor() {
  const { content, loaded, save, busy, status, setContent } = useAdminContent();
  if (!loaded) return <p>Loading header…</p>;

  return (
    <>
      <h1>Header</h1>
      <p className="admin-lead">
        Logo and live navigation labels: Destinations, Luxury Tour & Trek, Travel Guide, Company, Journal, Contact.
      </p>
      <div className="admin-card">
        <AdminMediaField
          label="Header logo"
          value={content.header.logoSrc}
          onChange={(logoSrc) => setContent({ ...content, header: { ...content.header, logoSrc } })}
        />
        <ul>
          <li>Destinations — /nepal /bhutan /tibet /himalayan-multi-countries-tour</li>
          <li>Luxury Tour & Trek — mega packages</li>
          <li>Travel Guide — visa, best time, packing, altitude, permits</li>
          <li>Company — about, legal, booking, partner, privacy, terms</li>
          <li>Journal — /journal</li>
          <li>Contact — /contact</li>
        </ul>
      </div>
      <div className="admin-save-row">
        {status ? <span className={status === "Saved" ? "admin-ok" : "admin-error"}>{status}</span> : null}
        <button type="button" className="admin-btn admin-btn-gold" style={{ width: "auto" }} disabled={busy} onClick={() => void save(content)}>
          Save header
        </button>
      </div>
    </>
  );
}

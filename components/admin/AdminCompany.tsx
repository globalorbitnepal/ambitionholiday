"use client";

import { useAdminContent } from "@/components/admin/useAdminContent";

export default function AdminCompany() {
  const { content, loaded, save, busy, status, setContent } = useAdminContent();
  if (!loaded) return <p>Loading company…</p>;
  const about = content.about;

  return (
    <>
      <h1>Company</h1>
      <p className="admin-lead">About Us lives under Company. Legal documents, how to book and partner pages stay in this group.</p>
      <div className="admin-card">
        <label className="admin-field">
          <span>Headline</span>
          <input
            value={about.headline}
            onChange={(e) => setContent({ ...content, about: { ...about, headline: e.target.value } })}
          />
        </label>
        <label className="admin-field">
          <span>Lead</span>
          <textarea
            value={about.lead}
            onChange={(e) => setContent({ ...content, about: { ...about, lead: e.target.value } })}
          />
        </label>
        <label className="admin-field">
          <span>Experience title</span>
          <input
            value={about.experienceTitle}
            onChange={(e) => setContent({ ...content, about: { ...about, experienceTitle: e.target.value } })}
          />
        </label>
        <label className="admin-field">
          <span>Experience body</span>
          <textarea
            style={{ minHeight: 140 }}
            value={about.experienceBody}
            onChange={(e) => setContent({ ...content, about: { ...about, experienceBody: e.target.value } })}
          />
        </label>
        <label className="admin-field">
          <span>Sister company name</span>
          <input
            value={about.sisterName}
            onChange={(e) => setContent({ ...content, about: { ...about, sisterName: e.target.value } })}
          />
        </label>
        <label className="admin-field">
          <span>Office phone</span>
          <input
            value={about.officePhone}
            onChange={(e) => setContent({ ...content, about: { ...about, officePhone: e.target.value } })}
          />
        </label>
        <label className="admin-field">
          <span>Mobile</span>
          <input
            value={about.mobilePhone}
            onChange={(e) => setContent({ ...content, about: { ...about, mobilePhone: e.target.value } })}
          />
        </label>
        <label className="admin-field">
          <span>Email</span>
          <input
            value={about.email}
            onChange={(e) => setContent({ ...content, about: { ...about, email: e.target.value } })}
          />
        </label>
      </div>
      <div className="admin-save-row">
        {status ? <span className={status === "Saved" ? "admin-ok" : "admin-error"}>{status}</span> : null}
        <button type="button" className="admin-btn admin-btn-gold" style={{ width: "auto" }} disabled={busy} onClick={() => void save(content)}>
          Save company
        </button>
      </div>
    </>
  );
}

"use client";

import { useAdminContent } from "@/components/admin/useAdminContent";

export default function AdminContact() {
  const { content, loaded, save, busy, status, setContent } = useAdminContent();
  if (!loaded) return <p>Loading contact…</p>;

  return (
    <>
      <h1>Contact</h1>
      <p className="admin-lead">Phones, email and address used on the public contact page and footer.</p>
      <div className="admin-card">
        <label className="admin-field">
          <span>Email</span>
          <input
            value={content.footer.email}
            onChange={(e) => setContent({ ...content, footer: { ...content.footer, email: e.target.value } })}
          />
        </label>
        <label className="admin-field">
          <span>Help title</span>
          <input
            value={content.footer.helpTitle}
            onChange={(e) => setContent({ ...content, footer: { ...content.footer, helpTitle: e.target.value } })}
          />
        </label>
        <label className="admin-field">
          <span>Help body</span>
          <textarea
            value={content.footer.helpBody}
            onChange={(e) => setContent({ ...content, footer: { ...content.footer, helpBody: e.target.value } })}
          />
        </label>
        {(content.footer.phones || []).map((phone, index) => (
          <label key={phone.id} className="admin-field">
            <span>Phone {index + 1}</span>
            <input
              value={phone.label}
              onChange={(e) =>
                setContent({
                  ...content,
                  footer: {
                    ...content.footer,
                    phones: content.footer.phones.map((item, i) =>
                      i === index ? { ...item, label: e.target.value } : item,
                    ),
                  },
                })
              }
            />
          </label>
        ))}
      </div>
      <div className="admin-save-row">
        {status ? <span className={status === "Saved" ? "admin-ok" : "admin-error"}>{status}</span> : null}
        <button type="button" className="admin-btn admin-btn-gold" style={{ width: "auto" }} disabled={busy} onClick={() => void save(content)}>
          Save contact
        </button>
      </div>
    </>
  );
}

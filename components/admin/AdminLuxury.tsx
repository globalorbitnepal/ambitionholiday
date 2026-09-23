"use client";

import { useAdminContent } from "@/components/admin/useAdminContent";

export default function AdminLuxury() {
  const { content, loaded, save, busy, status, setContent } = useAdminContent();
  if (!loaded) return <p>Loading luxury tours…</p>;

  return (
    <>
      <h1>Luxury Tour & Trek</h1>
      <p className="admin-lead">Homepage journey cards and destination catalogs. Open a package for the full trek builder.</p>
      <div className="admin-card">
        <label className="admin-field">
          <span>Section headline</span>
          <input
            value={content.journeys.headlineWhite}
            onChange={(e) =>
              setContent({ ...content, journeys: { ...content.journeys, headlineWhite: e.target.value } })
            }
          />
        </label>
      </div>
      <div className="admin-pkg-grid">
        {content.tripPackages.map((pkg) => (
          <article key={pkg.id} className="admin-pkg">
            <img src={pkg.heroSrc} alt="" />
            <div className="body">
              <h3>{pkg.title}</h3>
              <p>
                {pkg.duration} · {pkg.difficulty}
              </p>
              <a className="admin-btn admin-btn-gold" href={`/admin/packages/${pkg.id}`} style={{ display: "inline-block", width: "auto" }}>
                Full edit
              </a>
            </div>
          </article>
        ))}
      </div>
      <div className="admin-save-row">
        {status ? <span className={status === "Saved" ? "admin-ok" : "admin-error"}>{status}</span> : null}
        <button type="button" className="admin-btn admin-btn-gold" style={{ width: "auto" }} disabled={busy} onClick={() => void save(content)}>
          Save
        </button>
      </div>
    </>
  );
}

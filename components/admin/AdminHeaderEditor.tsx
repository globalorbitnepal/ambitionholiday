"use client";

import OrbitHeaderEditor from "@/components/OrbitHeaderEditor";
import { useAdminContent } from "@/components/admin/useAdminContent";

export default function AdminHeaderEditor() {
  const { content, loaded, save, busy, status, setContent } = useAdminContent();
  if (!loaded) return <p>Loading header…</p>;

  return (
    <>
      <OrbitHeaderEditor content={content} onChange={setContent} />
      <div className="admin-save-row" style={{ marginTop: 24 }}>
        {status ? <span className={status === "Saved" ? "admin-ok" : "admin-error"}>{status}</span> : null}
        <button
          type="button"
          className="admin-btn admin-btn-gold"
          style={{ width: "auto" }}
          disabled={busy}
          onClick={() => void save(content)}
        >
          Save header page
        </button>
      </div>
    </>
  );
}

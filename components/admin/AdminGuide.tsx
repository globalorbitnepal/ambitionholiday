"use client";

import { useState } from "react";
import { useAdminContent } from "@/components/admin/useAdminContent";

const PAGES = [
  { id: "visa", label: "Visa & Entry", href: "/visa-and-entry" },
  { id: "bestTime", label: "Best Time to Visit", href: "/best-time-to-visit" },
  { id: "packing", label: "Packing Guide", href: "/packing-guide" },
  { id: "altitude", label: "Altitude Tips", href: "/altitude-tips" },
  { id: "permits", label: "Permits & Fees", href: "/permits-and-fees" },
] as const;

export default function AdminGuide() {
  const { content, loaded, save, busy, status, setContent } = useAdminContent();
  const [id, setId] = useState<(typeof PAGES)[number]["id"]>("visa");
  if (!loaded) return <p>Loading travel guide…</p>;

  const page = content[id];

  return (
    <>
      <h1>Travel Guide</h1>
      <p className="admin-lead">One page at a time. Headline, lead and meta — full copy stays on the live glass pages.</p>
      <div className="admin-chip-row">
        {PAGES.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`admin-chip${id === item.id ? " on" : ""}`}
            onClick={() => setId(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="admin-card">
        <label className="admin-field">
          <span>Headline</span>
          <input
            value={"headline" in page ? String(page.headline) : ""}
            onChange={(e) =>
              setContent({ ...content, [id]: { ...page, headline: e.target.value } })
            }
          />
        </label>
        <label className="admin-field">
          <span>Lead / body</span>
          <textarea
            value={page.lead}
            onChange={(e) =>
              setContent({
                ...content,
                [id]: { ...page, lead: e.target.value },
              })
            }
          />
        </label>
        <a className="admin-chip" href={PAGES.find((p) => p.id === id)?.href} target="_blank" rel="noreferrer">
          View live page
        </a>
      </div>
      <div className="admin-save-row">
        {status ? <span className={status === "Saved" ? "admin-ok" : "admin-error"}>{status}</span> : null}
        <button type="button" className="admin-btn admin-btn-gold" style={{ width: "auto" }} disabled={busy} onClick={() => void save(content)}>
          Save guide page
        </button>
      </div>
    </>
  );
}

"use client";

import { useState } from "react";
import { postOrbitUpload } from "@/lib/orbit-upload-client";

type MediaItem = { path: string; name: string; kind: string };

export default function AdminMediaField({
  label,
  value,
  onChange,
  hint,
  accept = "image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp",
  fit = "cover",
}: {
  label: string;
  value: string;
  onChange: (next: string) => void;
  hint?: string;
  accept?: string;
  fit?: "cover" | "contain";
}) {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<MediaItem[]>([]);
  const [busy, setBusy] = useState(false);

  async function loadLibrary() {
    setOpen(true);
    const res = await fetch("/api/orbit/media", { credentials: "include" });
    const data = (await res.json()) as { items?: MediaItem[] };
    setItems((data.items || []).filter((item) => item.kind === "image"));
  }

  async function onFile(file?: File) {
    if (!file) return;
    setBusy(true);
    try {
      onChange(await postOrbitUpload(file));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="admin-field">
      <span>{label}</span>
      {hint ? <small style={{ display: "block", color: "#667084", margin: "-4px 0 8px" }}>{hint}</small> : null}
      {value ? (
        <img
          src={value}
          alt=""
          style={{
            width: "100%",
            height: fit === "contain" ? 220 : 140,
            objectFit: fit,
            borderRadius: 12,
            background: "#eef2f6",
          }}
        />
      ) : null}
      <input value={value} onChange={(e) => onChange(e.target.value)} placeholder="/images/..." />
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <label className="admin-btn admin-btn-ghost" style={{ display: "inline-block" }}>
          {busy ? "Uploading…" : "Upload JPG / PNG"}
          <input
            type="file"
            accept={accept}
            hidden
            onChange={(e) => void onFile(e.target.files?.[0])}
          />
        </label>
        <button type="button" className="admin-btn admin-btn-ghost" onClick={() => void loadLibrary()}>
          Library
        </button>
        {value ? (
          <button type="button" className="admin-btn admin-btn-ghost" onClick={() => onChange("")}>
            Use built-in chart
          </button>
        ) : null}
      </div>
      {open ? (
        <div>
          <button type="button" className="admin-btn admin-btn-ghost" onClick={() => setOpen(false)}>
            Close library
          </button>
          <div className="admin-media-grid">
            {items.map((item) => (
              <button
                key={item.path}
                type="button"
                onClick={() => {
                  onChange(item.path);
                  setOpen(false);
                }}
              >
                <img src={item.path} alt={item.name} />
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

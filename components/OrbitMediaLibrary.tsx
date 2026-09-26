"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { orbitThumbSrc } from "@/lib/media-src";
import { postOrbitUpload } from "@/lib/orbit-upload-client";
import { youtubeEmbedSrc, youtubeId } from "@/lib/video-embed";
import OrbitThumb from "@/components/OrbitThumb";

type MediaKind = "image" | "video" | "other";

type MediaItem = {
  path: string;
  name: string;
  label?: string;
  displayName?: string;
  altText?: string;
  kind: MediaKind;
  bytes: number;
  updatedAt: string;
  collection: "uploads" | "site" | "remote";
};

type Filter = "all" | "uploads" | "site" | "remote" | "image" | "video";

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function formatWhen(iso: string) {
  try {
    return new Date(iso).toLocaleString();
  } catch {
    return iso;
  }
}

export default function OrbitMediaLibrary() {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  const [preview, setPreview] = useState<MediaItem | null>(null);
  const [copied, setCopied] = useState("");
  const [editName, setEditName] = useState("");
  const [editAlt, setEditAlt] = useState("");
  const [savingMeta, setSavingMeta] = useState(false);

  const refresh = useCallback(async () => {
    const res = await fetch("/api/orbit/media", { cache: "no-store", credentials: "include" });
    if (!res.ok) {
      setStatus("Could not load media library.");
      return;
    }
    const data = (await res.json()) as { items?: MediaItem[] };
    setItems(data.items ?? []);
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((item) => {
      if (filter === "uploads" && item.collection !== "uploads") return false;
      if (filter === "site" && item.collection !== "site") return false;
      if (filter === "remote" && item.collection !== "remote") return false;
      if (filter === "image" && item.kind !== "image") return false;
      if (filter === "video" && item.kind !== "video") return false;
      const label = (item.label || item.displayName || item.name).toLowerCase();
      if (q && !item.path.toLowerCase().includes(q) && !label.includes(q)) {
        return false;
      }
      return true;
    });
  }, [items, filter, query]);

  const counts = useMemo(() => {
    return {
      all: items.length,
      uploads: items.filter((i) => i.collection === "uploads").length,
      site: items.filter((i) => i.collection === "site").length,
      remote: items.filter((i) => i.collection === "remote").length,
      image: items.filter((i) => i.kind === "image").length,
      video: items.filter((i) => i.kind === "video").length,
    };
  }, [items]);

  async function onUpload(list: FileList | null) {
    if (!list?.length) return;
    setBusy(true);
    setStatus("");
    try {
      for (const file of Array.from(list)) {
        await postOrbitUpload(file);
      }
      await refresh();
      setStatus(`Saved ${list.length} file${list.length > 1 ? "s" : ""} — kept in durable library.`);
    } catch {
      setStatus("Upload failed. Images up to 12MB, video up to 32MB.");
    } finally {
      setBusy(false);
    }
  }

  async function copyPath(path: string) {
    try {
      await navigator.clipboard.writeText(path);
      setCopied(path);
      window.setTimeout(() => setCopied(""), 1600);
    } catch {
      setStatus("Copy failed.");
    }
  }

  return (
    <div className="space-y-5">
      <div>
        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-gold">
          Media library
        </p>
        <h2 className="mt-1 font-[family-name:var(--font-cormorant)] text-2xl font-semibold">
          Every image, video, and upload — kept forever
        </h2>
        <p className="mt-1.5 max-w-2xl text-sm text-white/55">
          Every site image under /images, uploads, and videos is listed here — including WebP covers
          and package photos. Open Media library from any editor to pick one.
        </p>
      </div>

      <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-gold/40 bg-gold/5 px-4 py-8 text-center transition hover:border-gold hover:bg-gold/10">
        <input
          type="file"
          accept="image/*,video/mp4,video/webm,video/quicktime"
          multiple
          className="hidden"
          disabled={busy}
          onChange={(e) => {
            void onUpload(e.target.files);
            e.currentTarget.value = "";
          }}
        />
        <span className="text-sm font-semibold text-gold">
          {busy ? "Saving to library…" : "Drop or click to add images / videos"}
        </span>
        <span className="mt-1 text-xs text-white/45">JPG, PNG, WebP, GIF, MP4, WebM, MOV</span>
      </label>

      <div className="flex flex-wrap items-center gap-2">
        {(
          [
            ["all", `All (${counts.all})`],
            ["uploads", `Uploads (${counts.uploads})`],
            ["site", `Site files (${counts.site})`],
            ["remote", `YouTube / Vimeo (${counts.remote})`],
            ["image", `Images (${counts.image})`],
            ["video", `Videos (${counts.video})`],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setFilter(id)}
            className={`rounded-full border px-3 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.12em] ${
              filter === id
                ? "border-gold bg-gold/20 text-gold"
                : "border-white/15 text-white/60 hover:border-gold/40 hover:text-gold"
            }`}
          >
            {label}
          </button>
        ))}
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search filename…"
          className="min-w-[12rem] flex-1 rounded-md border border-white/15 bg-black/35 px-3 py-1.5 text-sm text-white outline-none focus:border-gold/50"
        />
        <button
          type="button"
          onClick={() => void refresh()}
          className="rounded-md border border-white/20 px-3 py-1.5 text-xs font-semibold text-white/80 hover:border-gold/40 hover:text-gold"
        >
          Refresh
        </button>
      </div>

      {status ? <p className="text-sm text-gold/90">{status}</p> : null}

      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((item) => {
          const yt = youtubeId(item.path);
          const src = yt
            ? `https://i.ytimg.com/vi/${yt}/hqdefault.jpg`
            : orbitThumbSrc(item.path);
          return (
            <li
              key={item.path}
              className="overflow-hidden rounded-xl border border-white/10 bg-black/30"
            >
              <button
                type="button"
                onClick={() => {
                  setPreview(item);
                  setEditName(item.displayName || item.label || item.name);
                  setEditAlt(item.altText || "");
                }}
                className="relative block h-36 w-full overflow-hidden bg-[#0b1018] sm:h-40"
              >
                {item.kind === "video" && item.collection !== "remote" ? (
                  <video
                    src={src}
                    muted
                    playsInline
                    preload="metadata"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                ) : yt ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={src}
                    alt={item.name}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                ) : (
                  <OrbitThumb src={item.path} alt={item.name} />
                )}
                <span className="absolute left-2 top-2 rounded-full border border-gold/40 bg-black/65 px-2 py-0.5 text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-gold">
                  {item.kind}
                </span>
                <span className="absolute right-2 top-2 rounded-full border border-gold/30 bg-black/65 px-2 py-0.5 text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-gold/90">
                  {item.collection === "site"
                    ? "Site"
                    : item.collection === "remote"
                      ? "YouTube"
                      : "Upload"}
                </span>
              </button>
              <div className="space-y-2 p-3">
                <p className="truncate text-[0.78rem] font-medium text-white" title={item.path}>
                  {item.label || item.displayName || item.name}
                </p>
                <p className="text-[0.68rem] text-white/45">
                  {item.collection === "remote"
                    ? "Stored in CMS · Video Journal"
                    : `${formatBytes(item.bytes)} · ${formatWhen(item.updatedAt)}`}
                </p>
                <p className="truncate text-[0.65rem] text-white/35">{item.path}</p>
                <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => void copyPath(item.path)}
                  className="rounded-md border border-gold/40 px-2.5 py-1 text-[0.68rem] font-semibold text-gold hover:bg-gold/10"
                >
                  {copied === item.path ? "Copied" : "Copy path"}
                </button>
                {item.collection === "uploads" ? (
                  <button
                    type="button"
                    className="rounded-md border border-red-400/30 px-2.5 py-1 text-[0.68rem] font-semibold text-red-200"
                    onClick={async () => {
                      if (!window.confirm(`Remove ${item.name} from uploads?`)) return;
                      const res = await fetch("/api/orbit/media", {
                        method: "DELETE",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ path: item.path }),
                      });
                      if (!res.ok) {
                        setStatus("Could not delete this file.");
                        return;
                      }
                      await refresh();
                    }}
                  >
                    Delete upload
                  </button>
                ) : null}
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      {!visible.length ? (
        <p className="text-sm text-white/45">No matching media. Upload a file to start the library.</p>
      ) : null}

      {preview ? (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/88 p-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setPreview(null)}
        >
          <div
            className="relative max-h-[90dvh] w-full max-w-5xl overflow-hidden rounded-xl border border-gold/30 bg-[#0b1018]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-2.5">
              <p className="min-w-0 truncate text-sm text-white">{preview.path}</p>
              <button
                type="button"
                onClick={() => setPreview(null)}
                className="rounded-md border border-white/20 px-2 py-1 text-xs text-white/80"
              >
                Close
              </button>
            </div>
            <div className="relative aspect-video w-full bg-black">
              {youtubeId(preview.path) ? (
                <iframe
                  title={editAlt || preview.name}
                  src={youtubeEmbedSrc(youtubeId(preview.path) as string)}
                  className="absolute inset-0 h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                  allowFullScreen
                />
              ) : preview.kind === "video" ? (
                <video
                  src={orbitThumbSrc(preview.path)}
                  controls
                  playsInline
                  className="absolute inset-0 h-full w-full object-contain"
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={orbitThumbSrc(preview.path)}
                  alt={editAlt || preview.name}
                  className="absolute inset-0 h-full w-full object-contain"
                />
              )}
            </div>
            {preview.kind === "image" ? (
              <div className="space-y-3 border-t border-white/10 p-4">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-gold">
                  Library name & alt text
                </p>
                <label className="block text-xs text-white/60">
                  Display name
                  <input
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="mt-1 w-full rounded-md border border-white/15 bg-black/35 px-2.5 py-2 text-sm text-white outline-none focus:border-gold/50"
                  />
                </label>
                <label className="block text-xs text-white/60">
                  Alt text (accessibility)
                  <input
                    value={editAlt}
                    onChange={(e) => setEditAlt(e.target.value)}
                    className="mt-1 w-full rounded-md border border-white/15 bg-black/35 px-2.5 py-2 text-sm text-white outline-none focus:border-gold/50"
                  />
                </label>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    disabled={savingMeta}
                    className="rounded-md border border-gold/50 bg-gold/15 px-3 py-1.5 text-xs font-semibold text-gold disabled:opacity-50"
                    onClick={async () => {
                      setSavingMeta(true);
                      try {
                        const res = await fetch("/api/orbit/media", {
                          method: "PATCH",
                          headers: { "Content-Type": "application/json" },
                          credentials: "include",
                          body: JSON.stringify({
                            path: preview.path,
                            displayName: editName,
                            altText: editAlt,
                          }),
                        });
                        if (!res.ok) {
                          setStatus("Could not save name / alt text.");
                          return;
                        }
                        setStatus("Saved library details.");
                        await refresh();
                        setPreview({
                          ...preview,
                          displayName: editName,
                          altText: editAlt,
                          label: editName || preview.name,
                        });
                      } finally {
                        setSavingMeta(false);
                      }
                    }}
                  >
                    {savingMeta ? "Saving…" : "Save details"}
                  </button>
                  {preview.collection === "uploads" ? (
                    <button
                      type="button"
                      className="rounded-md border border-red-400/30 px-3 py-1.5 text-xs font-semibold text-red-200"
                      onClick={async () => {
                        if (!window.confirm(`Delete ${preview.name} from uploads?`)) return;
                        const res = await fetch("/api/orbit/media", {
                          method: "DELETE",
                          headers: { "Content-Type": "application/json" },
                          credentials: "include",
                          body: JSON.stringify({ path: preview.path }),
                        });
                        if (!res.ok) {
                          setStatus("Could not delete this file.");
                          return;
                        }
                        setPreview(null);
                        await refresh();
                      }}
                    >
                      Delete upload
                    </button>
                  ) : null}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}

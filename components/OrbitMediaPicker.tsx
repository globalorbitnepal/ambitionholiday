"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import OrbitThumb from "@/components/OrbitThumb";
import { postOrbitUpload } from "@/lib/orbit-upload-client";

type MediaKind = "image" | "video" | "other";

type MediaItem = {
  path: string;
  name: string;
  kind: MediaKind;
  bytes: number;
  collection: "uploads" | "site" | "remote";
};

async function uploadFile(file: File, crop?: "9x16"): Promise<string> {
  return postOrbitUpload(file, crop);
}

export function OrbitMediaPicker({
  open,
  kind = "image",
  onClose,
  onSelect,
}: {
  open: boolean;
  kind?: "image" | "video";
  onClose: () => void;
  onSelect: (path: string) => void;
}) {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [query, setQuery] = useState("");
  const [busy, setBusy] = useState(false);

  const refresh = useCallback(async () => {
    const res = await fetch("/api/orbit/media", { cache: "no-store", credentials: "include" });
    if (!res.ok) return;
    const data = (await res.json()) as { items?: MediaItem[] };
    setItems(data.items ?? []);
  }, []);

  useEffect(() => {
    if (open) void refresh();
  }, [open, refresh]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items
      .filter((item) => {
        if (item.kind !== kind) return false;
        if (q && !item.path.toLowerCase().includes(q) && !item.name.toLowerCase().includes(q)) {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (a.collection === b.collection) return a.name.localeCompare(b.name);
        if (a.collection === "uploads") return -1;
        if (b.collection === "uploads") return 1;
        return a.name.localeCompare(b.name);
      });
  }, [items, kind, query]);

  if (!open) return null;

  const panel = (
    <div className="fixed inset-0 z-[200] flex items-end justify-center bg-black/70 p-3 sm:items-center">
      <div className="flex max-h-[90dvh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-white/15 bg-[#0b1018]">
        <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
          <p className="text-sm font-semibold text-white">
            Choose {kind === "video" ? "video" : "image"} from library
            {visible.length ? ` · ${visible.length}` : ""}
          </p>
          <button
            type="button"
            className="rounded-md border border-white/20 px-3 py-1.5 text-xs text-white/70"
            onClick={onClose}
          >
            Close
          </button>
        </div>
        <div className="flex flex-wrap items-center gap-2 border-b border-white/10 px-4 py-3">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search files…"
            className="min-w-[12rem] flex-1 rounded-md border border-white/15 bg-black/35 px-3 py-2 text-sm text-white outline-none focus:border-gold/50"
          />
          <label className="cursor-pointer rounded-md border border-gold/40 px-3 py-2 text-xs font-semibold text-gold">
            {busy ? "Uploading…" : "Upload new"}
            <input
              type="file"
              accept={kind === "video" ? "video/*" : "image/*"}
              className="hidden"
              disabled={busy}
              onChange={async (e) => {
                const file = e.target.files?.[0];
                e.target.value = "";
                if (!file) return;
                setBusy(true);
                try {
                  const url = await uploadFile(file);
                  onSelect(url);
                  onClose();
                } catch {
                  window.alert("Upload failed.");
                } finally {
                  setBusy(false);
                }
              }}
            />
          </label>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto p-4">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {visible.map((item) => (
            <button
              key={item.path}
              type="button"
              onClick={() => {
                onSelect(item.path);
                onClose();
              }}
              className="overflow-hidden rounded-lg border border-white/10 bg-black/30 text-left hover:border-gold/50"
            >
              <span className="relative block h-32 w-full overflow-hidden bg-[#121820]">
                {item.kind === "image" ? (
                  <OrbitThumb src={item.path} alt="" />
                ) : (
                  <span className="flex h-full items-center justify-center text-[0.65rem] text-white/50">
                    VIDEO
                  </span>
                )}
              </span>
              <p className="truncate px-2 py-1.5 text-[0.62rem] text-white/65">{item.name}</p>
            </button>
          ))}
          {!visible.length ? (
            <p className="col-span-full py-8 text-center text-sm text-white/45">
              No matching files. Upload one to add it to the library.
            </p>
          ) : null}
          </div>
        </div>
      </div>
    </div>
  );

  if (typeof document === "undefined") return panel;
  return createPortal(panel, document.body);
}

export function OrbitMediaButtons({
  kind = "image",
  crop,
  onPicked,
}: {
  kind?: "image" | "video";
  crop?: "9x16";
  onPicked: (url: string) => void | Promise<void>;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex flex-wrap gap-2">
        <label className="cursor-pointer rounded-md border border-gold/40 px-3 py-1.5 text-xs font-semibold text-gold">
          Upload
          <input
            type="file"
            accept={kind === "video" ? "video/*" : "image/*"}
            className="hidden"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              e.target.value = "";
              if (!file) return;
              try {
                await onPicked(await uploadFile(file, crop));
              } catch {
                window.alert("Upload failed. Images up to 12MB, video up to 32MB.");
              }
            }}
          />
        </label>
        <button
          type="button"
          className="rounded-md border border-white/20 px-3 py-1.5 text-xs text-white/80"
          onClick={() => setOpen(true)}
        >
          Media library
        </button>
      </div>
      <OrbitMediaPicker
        open={open}
        kind={kind}
        onClose={() => setOpen(false)}
        onSelect={(path) => void onPicked(path)}
      />
    </>
  );
}

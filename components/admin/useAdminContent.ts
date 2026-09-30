"use client";

import { useCallback, useEffect, useState } from "react";
import { DEFAULT_CONTENT, type SiteContent } from "@/lib/content-types";

export function useAdminContent() {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    const res = await fetch(`/api/content?t=${Date.now()}`, { cache: "no-store", credentials: "include" });
    if (!res.ok) return;
    setContent((await res.json()) as SiteContent);
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const save = useCallback(async (next: SiteContent) => {
    setBusy(true);
    setStatus("");
    try {
      const res = await fetch("/api/content", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(next),
      });
      const data = (await res.json()) as SiteContent & { error?: string };
      if (!res.ok) {
        setStatus(data.error || "Save failed");
        return false;
      }
      setContent(data);
      setStatus("Saved");
      return true;
    } catch {
      setStatus("Save failed");
      return false;
    } finally {
      setBusy(false);
    }
  }, []);

  /** Re-reads the server copy and applies only this editor's change, so parallel edits elsewhere survive. */
  const saveMerged = useCallback(
    async (apply: (latest: SiteContent) => SiteContent) => {
      let latest: SiteContent | null = null;
      try {
        const res = await fetch(`/api/content?t=${Date.now()}`, { cache: "no-store", credentials: "include" });
        if (res.ok) latest = (await res.json()) as SiteContent;
      } catch {
        latest = null;
      }
      return save(apply(latest ?? content ?? DEFAULT_CONTENT));
    },
    [content, save],
  );

  return { content: content ?? DEFAULT_CONTENT, loaded: Boolean(content), status, busy, setContent, save, saveMerged };
}

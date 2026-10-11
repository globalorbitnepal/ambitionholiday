"use client";

import { useCallback, useState } from "react";

export function useEvlInteraction() {
  const [hoverId, setHoverId] = useState<string | null>(null);
  const [pinnedId, setPinnedId] = useState<string | null>(null);

  const activeId = pinnedId ?? hoverId;

  const onPointerEnter = useCallback((id: string) => {
    if (!pinnedId) setHoverId(id);
  }, [pinnedId]);

  const onPointerLeave = useCallback(() => {
    if (!pinnedId) setHoverId(null);
  }, [pinnedId]);

  const onActivate = useCallback((id: string) => {
    setPinnedId((prev) => (prev === id ? null : id));
    setHoverId(id);
  }, []);

  const dismiss = useCallback(() => {
    setPinnedId(null);
    setHoverId(null);
  }, []);

  return {
    activeId,
    pinnedId,
    hoverId,
    onPointerEnter,
    onPointerLeave,
    onActivate,
    dismiss,
    isPinned: pinnedId !== null,
  };
}

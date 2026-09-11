"use client";

import { useCallback, useEffect, useState } from "react";
import { RECENTLY_VIEWED_KEY, RECENTLY_VIEWED_MAX } from "@/lib/constants";

function readStoredIds(): string[] {
  try {
    const raw = window.localStorage.getItem(RECENTLY_VIEWED_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((id) => typeof id === "string") : [];
  } catch {
    return [];
  }
}

/** Reads/writes recently-viewed product ids in localStorage. SSR-safe: never touches storage during render. */
export function useRecentlyViewed() {
  const [ids, setIds] = useState<string[]>([]);

  useEffect(() => {
    // Reads localStorage once on mount — unavoidable client-only read, no SSR equivalent.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIds(readStoredIds());
  }, []);

  const addProductId = useCallback((id: string) => {
    setIds((prev) => {
      const next = [id, ...prev.filter((existing) => existing !== id)].slice(
        0,
        RECENTLY_VIEWED_MAX
      );
      try {
        window.localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(next));
      } catch {
        // localStorage unavailable (private mode, etc.) — in-memory state still updates.
      }
      return next;
    });
  }, []);

  return { ids, addProductId };
}

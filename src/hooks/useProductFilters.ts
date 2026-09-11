"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";

export interface ProductFilterState {
  category?: string;
  subcategory?: string;
  brand?: string;
  availability?: string;
  location?: string;
  minPrice?: string;
  maxPrice?: string;
  sort?: string;
  q?: string;
}

const KEYS: (keyof ProductFilterState)[] = [
  "category",
  "subcategory",
  "brand",
  "availability",
  "location",
  "minPrice",
  "maxPrice",
  "sort",
  "q",
];

/** Keeps /products filter state in the URL so filtered views stay shareable and bookmarkable. */
export function useProductFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const filters = useMemo<ProductFilterState>(() => {
    const state: ProductFilterState = {};
    for (const key of KEYS) {
      const value = searchParams.get(key);
      if (value) state[key] = value;
    }
    return state;
  }, [searchParams]);

  const setFilters = useCallback(
    (updates: Partial<ProductFilterState>) => {
      const params = new URLSearchParams(searchParams.toString());
      for (const [key, value] of Object.entries(updates)) {
        if (!value) {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      }
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [pathname, router, searchParams]
  );

  const clearFilters = useCallback(() => {
    router.push(pathname, { scroll: false });
  }, [pathname, router]);

  const activeCount = useMemo(
    () => KEYS.filter((key) => key !== "sort" && key !== "q" && filters[key]).length,
    [filters]
  );

  return { filters, setFilters, clearFilters, activeCount };
}

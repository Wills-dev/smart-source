"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useProductFilters } from "@/hooks/useProductFilters";
import type { SortOption } from "@/types/common";

const SORT_LABEL: Record<SortOption, string> = {
  featured: "Featured",
  newest: "Newest",
  "price-asc": "Price: Low to High",
  "price-desc": "Price: High to Low",
  "name-asc": "Name: A–Z",
};

function SortSelect() {
  const { filters, setFilters } = useProductFilters();
  const value = (filters.sort as SortOption) ?? "featured";

  return (
    <Select value={value} onValueChange={(next) => setFilters({ sort: next ?? "featured" })}>
      <SelectTrigger className="w-45">
        <span className="text-muted-foreground">Sort:</span>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(SORT_LABEL).map(([option, label]) => (
          <SelectItem key={option} value={option}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export { SortSelect };

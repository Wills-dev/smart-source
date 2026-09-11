"use client";

import { useEffect, useState } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useProductFilters } from "@/hooks/useProductFilters";
import { useDebounce } from "@/hooks/useDebounce";
import { categories } from "@/data/categories";
import { getAllBrands, getPriceBounds } from "@/lib/products";
import { NIGERIAN_LOCATIONS } from "@/types/common";
import { AVAILABILITY_LABEL } from "@/lib/constants";

interface ProductFiltersProps {
  onNavigate?: () => void;
}

/** base-ui's Select passes `string | null`; normalize to the URL-filter convention of `string | undefined`. */
function toFilterValue(value: string | null): string | undefined {
  return value && value !== "all" ? value : undefined;
}

function ProductFilters({ onNavigate }: ProductFiltersProps) {
  const { filters, setFilters, clearFilters, activeCount } = useProductFilters();
  const brands = getAllBrands();
  const priceBounds = getPriceBounds();

  const [query, setQuery] = useState(filters.q ?? "");
  const debouncedQuery = useDebounce(query, 400);

  useEffect(() => {
    if (debouncedQuery !== (filters.q ?? "")) {
      setFilters({ q: debouncedQuery || undefined });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQuery]);

  const activeCategory = categories.find((c) => c.slug === filters.category);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-foreground">Filters</span>
        {activeCount > 0 && (
          <button
            type="button"
            onClick={() => {
              clearFilters();
              setQuery("");
              onNavigate?.();
            }}
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-brand-gold"
          >
            <X className="size-3.5" />
            Clear all ({activeCount})
          </button>
        )}
      </div>

      <div className="relative">
        <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products..."
          className="pl-8"
        />
      </div>

      <FilterField label="Category">
        <Select
          value={filters.category ?? "all"}
          onValueChange={(value) =>
            setFilters({ category: toFilterValue(value), subcategory: undefined })
          }
        >
          <SelectTrigger className="w-full"><SelectValue placeholder="All Categories" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.slug}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FilterField>

      {activeCategory && (
        <FilterField label="Subcategory">
          <Select
            value={filters.subcategory ?? "all"}
            onValueChange={(value) => setFilters({ subcategory: toFilterValue(value) })}
          >
            <SelectTrigger className="w-full"><SelectValue placeholder="All Subcategories" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Subcategories</SelectItem>
              {activeCategory.subcategories.map((sub) => (
                <SelectItem key={sub.id} value={sub.slug}>
                  {sub.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FilterField>
      )}

      <FilterField label="Brand">
        <Select
          value={filters.brand ?? "all"}
          onValueChange={(value) => setFilters({ brand: toFilterValue(value) })}
        >
          <SelectTrigger className="w-full"><SelectValue placeholder="All Brands" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Brands</SelectItem>
            {brands.map((brand) => (
              <SelectItem key={brand} value={brand}>
                {brand}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FilterField>

      <FilterField label="Availability">
        <Select
          value={filters.availability ?? "all"}
          onValueChange={(value) => setFilters({ availability: toFilterValue(value) })}
        >
          <SelectTrigger className="w-full"><SelectValue placeholder="Any Availability" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any Availability</SelectItem>
            {Object.entries(AVAILABILITY_LABEL).map(([value, label]) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FilterField>

      <FilterField label="Location">
        <Select
          value={filters.location ?? "all"}
          onValueChange={(value) => setFilters({ location: toFilterValue(value) })}
        >
          <SelectTrigger className="w-full"><SelectValue placeholder="Any Location" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any Location</SelectItem>
            {NIGERIAN_LOCATIONS.map((location) => (
              <SelectItem key={location} value={location}>
                {location}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FilterField>

      <FilterField label={`Price Range (₦${priceBounds.min.toLocaleString()} – ₦${priceBounds.max.toLocaleString()})`}>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            placeholder="Min"
            defaultValue={filters.minPrice}
            onBlur={(e) => setFilters({ minPrice: e.target.value || undefined })}
          />
          <span className="text-muted-foreground">–</span>
          <Input
            type="number"
            placeholder="Max"
            defaultValue={filters.maxPrice}
            onBlur={(e) => setFilters({ maxPrice: e.target.value || undefined })}
          />
        </div>
      </FilterField>

      <Button type="button" variant="dark" onClick={onNavigate} className="mt-2 w-full lg:hidden">
        Show Results
      </Button>
    </div>
  );
}

function FilterField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      {children}
    </div>
  );
}

export { ProductFilters };

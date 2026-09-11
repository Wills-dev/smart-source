"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Search } from "lucide-react";
import {
  CommandDialog,
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { useDebounce } from "@/hooks/useDebounce";
import { searchProducts, searchCategories, popularSearches } from "@/lib/search";
import { formatPriceWithUnit } from "@/lib/currency";

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const debounced = useDebounce(query, 200);

  const products = debounced ? searchProducts(debounced, 6) : [];
  const categories = debounced ? searchCategories(debounced, 4) : [];
  const hasResults = products.length > 0 || categories.length > 0;

  function go(href: string) {
    onOpenChange(false);
    setQuery("");
    router.push(href);
  }

  return (
    <CommandDialog
      open={open}
      onOpenChange={(next) => {
        onOpenChange(next);
        if (!next) setQuery("");
      }}
      title="Search SmartSource"
      description="Search products, brands or categories"
      showCloseButton
    >
      <Command shouldFilter={false}>
        <CommandInput
          placeholder="Search products, brands or categories..."
          value={query}
          onValueChange={setQuery}
        />
        <CommandList>
          {debounced && !hasResults && (
            <CommandEmpty>No results for &ldquo;{debounced}&rdquo;.</CommandEmpty>
          )}

          {!debounced && (
            <CommandGroup heading="Popular Searches">
              {popularSearches.map((term) => (
                <CommandItem key={term} onSelect={() => setQuery(term)}>
                  <Search />
                  {term}
                </CommandItem>
              ))}
            </CommandGroup>
          )}

          {debounced && hasResults && (
            <CommandGroup heading="">
              <CommandItem onSelect={() => go(`/products?q=${encodeURIComponent(debounced)}`)}>
                <ArrowRight />
                See all results for &ldquo;{debounced}&rdquo;
              </CommandItem>
            </CommandGroup>
          )}

          {categories.length > 0 && (
            <CommandGroup heading="Categories">
              {categories.map((category) => (
                <CommandItem
                  key={category.id}
                  onSelect={() => go(`/products/${category.slug}`)}
                >
                  {category.name}
                </CommandItem>
              ))}
            </CommandGroup>
          )}

          {products.length > 0 && (
            <CommandGroup heading="Products">
              {products.map((product) => (
                <CommandItem
                  key={product.id}
                  onSelect={() => go(`/products/item/${product.slug}`)}
                >
                  <span className="flex-1 truncate">{product.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {formatPriceWithUnit(product.price, product.unit)}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </Command>
    </CommandDialog>
  );
}

export { SearchDialog };

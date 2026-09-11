import Link from "next/link";
import { PackageSearch } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/molecules/ProductCard";
import type { Product } from "@/types/product";

interface ProductGridProps {
  products: Product[];
}

function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-lg border border-dashed border-border py-20 text-center">
        <PackageSearch className="size-10 text-muted-foreground" />
        <div>
          <p className="font-medium text-foreground">No materials match your search</p>
          <p className="mt-1 max-w-sm text-sm text-muted-foreground">
            Try changing your filters or contact us and we&apos;ll help source what you need.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" render={<Link href="/products" />}>
            Clear Filters
          </Button>
          <Button variant="dark" render={<Link href="/contact" />}>
            Request a Product
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export { ProductGrid };

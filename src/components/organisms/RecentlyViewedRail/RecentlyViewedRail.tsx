"use client";

import { Container } from "@/components/atoms/Container";
import { ProductCard } from "@/components/molecules/ProductCard";
import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";
import { getProductById } from "@/lib/products";

interface RecentlyViewedRailProps {
  excludeId?: string;
}

function RecentlyViewedRail({ excludeId }: RecentlyViewedRailProps) {
  const { ids } = useRecentlyViewed();
  const products = ids
    .filter((id) => id !== excludeId)
    .map((id) => getProductById(id))
    .filter((product): product is NonNullable<typeof product> => Boolean(product));

  if (products.length === 0) return null;

  return (
    <section className="border-t border-border py-14">
      <Container>
        <h2 className="font-heading text-xl font-semibold text-foreground">Recently Viewed</h2>
        <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} variant="compact" />
          ))}
        </div>
      </Container>
    </section>
  );
}

export { RecentlyViewedRail };

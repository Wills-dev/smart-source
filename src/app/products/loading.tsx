import { Container } from "@/components/atoms/Container";
import { Skeleton } from "@/components/ui/skeleton";
import { ProductCardSkeleton } from "@/components/molecules/ProductCardSkeleton";

export default function ProductsLoading() {
  return (
    <div className="pb-20">
      <Container className="pt-8">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="mt-4 h-9 w-64" />
        <Skeleton className="mt-2 h-5 w-96 max-w-full" />
      </Container>

      <Container className="mt-8 flex flex-col gap-8 lg:flex-row">
        <aside className="hidden w-64 shrink-0 lg:block">
          <Skeleton className="h-96 w-full" />
        </aside>
        <div className="min-w-0 flex-1">
          <div className="mb-5 flex justify-between">
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-8 w-45" />
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}

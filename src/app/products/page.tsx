import type { Metadata } from "next";
import { Container } from "@/components/atoms/Container";
import { BreadcrumbsNav } from "@/components/molecules/BreadcrumbsNav";
import { ProductFilters, ProductFiltersMobile } from "@/components/organisms/ProductFilters";
import { ProductGrid } from "@/components/organisms/ProductGrid";
import { SortSelect } from "@/components/molecules/SortSelect";
import { getAllProducts, filterProducts, sortProducts } from "@/lib/products";
import { getCategoryBySlug, getSubcategoryBySlug } from "@/lib/categories";
import type { SortOption } from "@/types/common";
import type { ProductAvailability } from "@/types/product";

export const metadata: Metadata = {
  title: "All Products",
  description: "Browse SmartSource's full catalogue of construction materials — search, filter and compare by category, brand, price and availability.",
};

interface ProductsPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams;

  const categorySlug = first(params.category);
  const subcategorySlug = first(params.subcategory);
  const category = categorySlug ? getCategoryBySlug(categorySlug) : undefined;
  const subcategory =
    categorySlug && subcategorySlug
      ? getSubcategoryBySlug(categorySlug, subcategorySlug)?.subcategory
      : undefined;

  const filtered = filterProducts(getAllProducts(), {
    category: category?.id,
    subcategory: subcategory?.id,
    brand: first(params.brand),
    availability: first(params.availability) as ProductAvailability | undefined,
    location: first(params.location),
    minPrice: params.minPrice ? Number(first(params.minPrice)) : undefined,
    maxPrice: params.maxPrice ? Number(first(params.maxPrice)) : undefined,
    query: first(params.q),
  });

  const sorted = sortProducts(filtered, (first(params.sort) as SortOption) ?? "featured");

  return (
    <div className="pb-20">
      <Container className="pt-8">
        <BreadcrumbsNav items={[{ label: "Products" }]} />
      </Container>

      <Container className="mt-4">
        <h1 className="font-heading text-3xl font-semibold text-foreground sm:text-4xl">
          All Products
        </h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Search and filter SmartSource&apos;s full material catalogue by category, brand, availability and
          price.
        </p>
      </Container>

      <Container className="mt-8 flex flex-col gap-8 lg:flex-row">
        <aside className="hidden w-64 shrink-0 lg:block">
          <ProductFilters />
        </aside>

        <div className="min-w-0 flex-1">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <ProductFiltersMobile />
              <p className="text-sm text-muted-foreground">
                {sorted.length} product{sorted.length === 1 ? "" : "s"} found
              </p>
            </div>
            <SortSelect />
          </div>

          <ProductGrid products={sorted} />
        </div>
      </Container>
    </div>
  );
}

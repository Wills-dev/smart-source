import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/atoms/Container";
import { BreadcrumbsNav } from "@/components/molecules/BreadcrumbsNav";
import { ProductGrid } from "@/components/organisms/ProductGrid";
import { categories } from "@/data/categories";
import { getSubcategoryBySlug } from "@/lib/categories";
import { getProductsBySubcategory } from "@/lib/products";

export function generateStaticParams() {
  return categories.flatMap((category) =>
    category.subcategories.map((sub) => ({ category: category.slug, subcategory: sub.slug }))
  );
}

interface SubcategoryPageProps {
  params: Promise<{ category: string; subcategory: string }>;
}

export async function generateMetadata({ params }: SubcategoryPageProps): Promise<Metadata> {
  const { category, subcategory } = await params;
  const match = getSubcategoryBySlug(category, subcategory);
  if (!match) return {};
  return {
    title: `${match.subcategory.name} | ${match.category.name}`,
    description: match.subcategory.description ?? `Browse ${match.subcategory.name} from SmartSource Nigeria.`,
  };
}

export default async function SubcategoryPage({ params }: SubcategoryPageProps) {
  const { category: categorySlug, subcategory: subcategorySlug } = await params;
  const match = getSubcategoryBySlug(categorySlug, subcategorySlug);
  if (!match) notFound();

  const { category, subcategory } = match;
  const products = getProductsBySubcategory(subcategory.id);

  return (
    <div className="pb-20">
      <Container className="pt-8">
        <BreadcrumbsNav
          items={[
            { label: "Products", href: "/products" },
            { label: category.name, href: `/products/${category.slug}` },
            { label: subcategory.name },
          ]}
        />
        <h1 className="mt-4 font-heading text-3xl font-semibold text-foreground sm:text-4xl">
          {subcategory.name}
        </h1>
        {subcategory.description && (
          <p className="mt-2 max-w-2xl text-muted-foreground">{subcategory.description}</p>
        )}
      </Container>

      <Container className="mt-10">
        <p className="mb-5 text-sm text-muted-foreground">
          {products.length} product{products.length === 1 ? "" : "s"} found
        </p>
        <ProductGrid products={products} />
      </Container>
    </div>
  );
}

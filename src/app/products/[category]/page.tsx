import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/atoms/Container";
import { BreadcrumbsNav } from "@/components/molecules/BreadcrumbsNav";
import { ImageWithFallback } from "@/components/atoms/ImageWithFallback";
import { Button } from "@/components/ui/button";
import { ProductGrid } from "@/components/organisms/ProductGrid";
import { categories } from "@/data/categories";
import { getCategoryBySlug } from "@/lib/categories";
import { getProductsByCategory } from "@/lib/products";

export function generateStaticParams() {
  return categories.map((category) => ({ category: category.slug }));
}

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category: slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return {};
  return {
    title: category.name,
    description: category.description ?? `Browse ${category.name} materials from SmartSource Nigeria.`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const products = getProductsByCategory(category.id);

  return (
    <div className="pb-20">
      <section className="relative flex min-h-[36vh] items-end overflow-hidden bg-brand-charcoal">
        <ImageWithFallback src={category.image} alt={category.name} fallbackLabel={category.name} sizes="100vw" className="opacity-70" />
        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-black/10" />
        <Container className="relative pb-10">
          <BreadcrumbsNav items={[{ label: "Products", href: "/products" }, { label: category.name }]} className="mb-4 [&_*]:text-white/70 [&_span]:text-white" />
          <h1 className="font-heading text-3xl font-semibold text-white sm:text-4xl lg:text-5xl">{category.name}</h1>
          {category.description && (
            <p className="mt-3 max-w-xl text-white/80">{category.description}</p>
          )}
        </Container>
      </section>

      <Container className="mt-10">
        <h2 className="font-heading text-xl font-semibold text-foreground">Subcategories</h2>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {category.subcategories.map((sub) => (
            <Link
              key={sub.id}
              href={`/products/${category.slug}/${sub.slug}`}
              className="group flex items-center justify-between gap-2 rounded-lg border border-border bg-card px-4 py-3 text-sm font-medium text-foreground transition-colors hover:border-brand-gold/50 hover:text-brand-gold"
            >
              {sub.name}
              <ArrowRight className="size-3.5 shrink-0 transition-transform group-hover:translate-x-0.5" />
            </Link>
          ))}
        </div>
      </Container>

      <Container className="mt-14">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <h2 className="font-heading text-xl font-semibold text-foreground">
            {category.name} Products
          </h2>
          <Button variant="outline" render={<Link href={`/products?category=${category.slug}`} />}>
            Filter &amp; Sort
          </Button>
        </div>
        <ProductGrid products={products} />
      </Container>
    </div>
  );
}

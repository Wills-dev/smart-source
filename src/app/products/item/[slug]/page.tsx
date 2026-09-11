import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/atoms/Container";
import { BreadcrumbsNav } from "@/components/molecules/BreadcrumbsNav";
import { AvailabilityBadge } from "@/components/atoms/AvailabilityBadge";
import { Price } from "@/components/atoms/Price";
import { ProductGallery } from "@/components/organisms/ProductGallery";
import { ProductActions, MobileStickyActions } from "@/components/organisms/ProductActions";
import { ProductGrid } from "@/components/organisms/ProductGrid";
import { RecentlyViewedRail } from "@/components/organisms/RecentlyViewedRail";
import { products } from "@/data/products";
import { getProductBySlug, getRelatedProducts } from "@/lib/products";
import { getCategoryById, getSubcategoryById } from "@/lib/categories";
import { formatCurrency } from "@/lib/currency";
import { PRICE_DISCLAIMER } from "@/lib/constants";
import { MapPin } from "lucide-react";
import { siteConfig } from "@/config/site";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};

  const title = `${product.name} | SmartSource Nigeria`;
  return {
    title: product.name,
    description: product.shortDescription,
    openGraph: {
      title,
      description: product.shortDescription,
      images: product.images.length ? [{ url: product.images[0] }] : undefined,
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const category = getCategoryById(product.categoryId);
  const subcategory = getSubcategoryById(product.subcategoryId);
  const related = getRelatedProducts(product, 4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.shortDescription,
    image: product.images,
    brand: product.brand ? { "@type": "Brand", name: product.brand } : undefined,
    offers: {
      "@type": "Offer",
      priceCurrency: "NGN",
      price: product.price,
      availability:
        product.availability === "in-stock"
          ? "https://schema.org/InStock"
          : product.availability === "out-of-stock"
            ? "https://schema.org/OutOfStock"
            : "https://schema.org/LimitedAvailability",
      url: `${siteConfig.url}/products/item/${product.slug}`,
    },
  };

  return (
    <div className="pb-24 lg:pb-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Container className="pt-8">
        <BreadcrumbsNav
          items={[
            { label: "Products", href: "/products" },
            ...(category ? [{ label: category.name, href: `/products/${category.slug}` }] : []),
            ...(category && subcategory
              ? [{ label: subcategory.name, href: `/products/${category.slug}/${subcategory.slug}` }]
              : []),
            { label: product.name },
          ]}
        />
      </Container>

      <Container className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-2">
        <ProductGallery images={product.images} productName={product.name} />

        <div className="flex flex-col gap-5">
          {product.brand && (
            <span className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
              {product.brand}
            </span>
          )}
          <h1 className="font-heading text-2xl font-semibold text-foreground sm:text-3xl">
            {product.name}
          </h1>

          <div className="flex flex-wrap items-center gap-3">
            <Price value={product.price} unit={product.unit} size="lg" />
            <AvailabilityBadge availability={product.availability} />
          </div>

          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="size-4" />
            {product.locations.join(", ")}
          </div>

          <p className="text-sm leading-relaxed text-muted-foreground">{product.shortDescription}</p>

          <ProductActions product={product} />

          <p className="text-xs text-muted-foreground">{PRICE_DISCLAIMER}</p>
        </div>
      </Container>

      <Container className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-3">
        <div className="flex flex-col gap-10 lg:col-span-2">
          <section>
            <h2 className="font-heading text-xl font-semibold text-foreground">Description</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">{product.description}</p>
          </section>

          {product.specifications.length > 0 && (
            <section>
              <h2 className="font-heading text-xl font-semibold text-foreground">Specifications</h2>
              <dl className="mt-3 divide-y divide-border rounded-lg border border-border">
                {product.specifications.map((spec) => (
                  <div key={spec.label} className="flex justify-between gap-4 px-4 py-2.5 text-sm">
                    <dt className="text-muted-foreground">{spec.label}</dt>
                    <dd className="font-medium text-foreground">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </section>
          )}

          {product.features && product.features.length > 0 && (
            <section>
              <h2 className="font-heading text-xl font-semibold text-foreground">Features</h2>
              <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {product.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand-gold" />
                    {feature}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {product.applications && product.applications.length > 0 && (
            <section>
              <h2 className="font-heading text-xl font-semibold text-foreground">Applications</h2>
              <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {product.applications.map((application) => (
                  <li key={application} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand-gold" />
                    {application}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <aside className="flex flex-col gap-6">
          <div className="rounded-lg border border-border p-5">
            <h3 className="font-heading text-base font-semibold text-foreground">Delivery Information</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {product.deliveryInfo ??
                "Available for delivery within Lagos and selected locations nationwide. Timelines depend on quantity, product availability and destination."}
            </p>
          </div>
          {product.minimumOrder && (
            <div className="rounded-lg border border-border p-5">
              <h3 className="font-heading text-base font-semibold text-foreground">Minimum Order</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {product.minimumOrder} {product.unit}
                {product.minimumOrder > 1 ? "s" : ""} — {formatCurrency(product.price * product.minimumOrder)}{" "}
                total at listed pricing.
              </p>
            </div>
          )}
        </aside>
      </Container>

      {related.length > 0 && (
        <section className="mt-16 border-t border-border py-14">
          <Container>
            <h2 className="font-heading text-xl font-semibold text-foreground">Related Products</h2>
            <div className="mt-5">
              <ProductGrid products={related} />
            </div>
          </Container>
        </section>
      )}

      <RecentlyViewedRail excludeId={product.id} />

      <MobileStickyActions product={product} />
    </div>
  );
}

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/atoms/Container";
import { SectionHeading } from "@/components/atoms/SectionHeading";
import { Reveal } from "@/components/atoms/Reveal";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/molecules/ProductCard";
import { getWeeklyPopularProducts } from "@/lib/products";

function PopularProducts() {
  const products = getWeeklyPopularProducts(8);

  return (
    <section className="py-20 sm:py-28">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Popular This Week"
            title="Popular Products"
            description="The materials contractors and developers are sourcing most right now."
          />
          <Button variant="outline" render={<Link href="/products?sort=featured" />} className="shrink-0">
            View All Products
            <ArrowRight data-icon="inline-end" />
          </Button>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {products.map((product, index) => (
            <Reveal key={product.id} delay={index * 0.04}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

export { PopularProducts };

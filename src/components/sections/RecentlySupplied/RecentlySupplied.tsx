import { Container } from "@/components/atoms/Container";
import { SectionHeading } from "@/components/atoms/SectionHeading";
import { Reveal } from "@/components/atoms/Reveal";
import { ProductCard } from "@/components/molecules/ProductCard";
import { getRecentlySuppliedProducts } from "@/lib/products";

function RecentlySupplied() {
  const products = getRecentlySuppliedProducts(4);

  return (
    <section className="bg-muted/50 py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Recently Supplied"
          title="Materials Moving This Week"
          description="A rotating look at recent activity across SmartSource's supply network."
        />

        <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product, index) => (
            <Reveal key={product.id} delay={index * 0.05}>
              <ProductCard product={product} variant="horizontal" className="bg-card" />
            </Reveal>
          ))}
        </div>

        <p className="mt-6 text-xs text-muted-foreground">
          Sample activity for illustration — figures reflect representative catalogue rotation, not live order data.
        </p>
      </Container>
    </section>
  );
}

export { RecentlySupplied };

import { Container } from "@/components/atoms/Container";
import { SectionHeading } from "@/components/atoms/SectionHeading";
import { Reveal } from "@/components/atoms/Reveal";
import { CategoryCard } from "@/components/molecules/CategoryCard";
import { categories } from "@/data/categories";
import { getProductsByCategory } from "@/lib/products";

const FEATURED_SLUGS = [
  "cement-concrete",
  "steel-reinforcement",
  "roofing",
  "tiles-flooring",
  "electrical",
  "plumbing",
  "doors-windows",
  "paint-finishes",
];

function CategoryShowcase() {
  const featured = FEATURED_SLUGS.map((slug) => categories.find((c) => c.slug === slug)).filter(
    (c): c is (typeof categories)[number] => Boolean(c)
  );

  return (
    <section className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Browse the Catalogue"
          title="Materials, Organised by Category"
          description="From structural essentials to finishing touches — explore SmartSource's core material categories."
        />

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {featured.map((category, index) => (
            <Reveal key={category.id} delay={index * 0.05} className={index === 0 ? "col-span-2 row-span-2" : ""}>
              <CategoryCard
                category={category}
                productCount={getProductsByCategory(category.id).length}
                aspect={index === 0 ? "aspect-square sm:aspect-[4/5]" : "aspect-[4/5]"}
                className="h-full"
              />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

export { CategoryShowcase };

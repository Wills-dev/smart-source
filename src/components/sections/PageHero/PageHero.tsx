import { Container } from "@/components/atoms/Container";
import { BreadcrumbsNav, type BreadcrumbEntry } from "@/components/molecules/BreadcrumbsNav";
import { ImageWithFallback } from "@/components/atoms/ImageWithFallback";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  image?: string;
  breadcrumbs: BreadcrumbEntry[];
}

/** Shared image-led hero banner for interior pages (About, What We Do, Contact, Help, Policies). */
function PageHero({ eyebrow, title, description, image, breadcrumbs }: PageHeroProps) {
  return (
    <section className="relative flex min-h-[34vh] items-end overflow-hidden bg-brand-charcoal">
      {image && (
        <>
          <ImageWithFallback src={image} alt={title} fallbackLabel={title} sizes="100vw" className="opacity-60" />
          <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/50 to-black/20" />
        </>
      )}
      <Container className="relative pb-10">
        <BreadcrumbsNav
          items={breadcrumbs}
          className="mb-4 [&_*]:text-white/70 [&_span]:text-white"
        />
        {eyebrow && (
          <span className="mb-2 block text-xs font-medium tracking-[0.2em] text-brand-gold uppercase">
            {eyebrow}
          </span>
        )}
        <h1 className="font-heading text-3xl font-semibold text-white sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        {description && <p className="mt-3 max-w-xl text-white/80">{description}</p>}
      </Container>
    </section>
  );
}

export { PageHero };

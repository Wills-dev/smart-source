import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "cn";
import { ImageWithFallback } from "@/components/atoms/ImageWithFallback";
import type { Category } from "@/types/category";

interface CategoryCardProps {
  category: Category;
  productCount?: number;
  className?: string;
  aspect?: string;
}

function CategoryCard({ category, productCount, className, aspect = "aspect-[4/5]" }: CategoryCardProps) {
  return (
    <Link
      href={`/products/${category.slug}`}
      className={cn(
        "group relative block overflow-hidden rounded-lg bg-brand-charcoal",
        aspect,
        className
      )}
    >
      <ImageWithFallback
        src={category.image}
        alt={category.name}
        fallbackLabel={category.name}
        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
        className="transition-transform duration-700 ease-out group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 group-hover:from-black/85" />
      <div className="absolute inset-0 border-2 border-transparent transition-colors duration-300 group-hover:border-brand-gold/60" />

      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-5">
        <div>
          <h3 className="font-heading text-lg font-semibold text-white sm:text-xl">{category.name}</h3>
          {productCount !== undefined && (
            <p className="text-xs text-white/70">{productCount} products</p>
          )}
        </div>
        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-all duration-300 group-hover:bg-brand-gold group-hover:text-brand-black">
          <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </Link>
  );
}

export { CategoryCard };

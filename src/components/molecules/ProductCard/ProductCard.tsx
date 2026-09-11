import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import { cn } from "cn";
import { ImageWithFallback } from "@/components/atoms/ImageWithFallback";
import { AvailabilityBadge } from "@/components/atoms/AvailabilityBadge";
import { Price } from "@/components/atoms/Price";
import { RequestQuoteButton } from "@/components/molecules/RequestQuoteButton";
import { getCategoryById } from "@/lib/categories";
import type { Product } from "@/types/product";

type ProductCardVariant = "default" | "compact" | "horizontal" | "featured";

interface ProductCardProps {
  product: Product;
  variant?: ProductCardVariant;
  className?: string;
}

function ProductCard({ product, variant = "default", className }: ProductCardProps) {
  const category = getCategoryById(product.categoryId);
  const href = `/products/item/${product.slug}`;

  if (variant === "horizontal") {
    return (
      <div
        className={cn(
          "group flex gap-4 rounded-lg border border-border bg-card p-3 transition-colors hover:border-brand-gold/50",
          className
        )}
      >
        <Link href={href} className="relative aspect-square w-20 shrink-0 overflow-hidden rounded-md">
          <ImageWithFallback
            src={product.images[0]}
            alt={product.name}
            sizes="80px"
            className="transition-transform duration-500 group-hover:scale-105"
          />
        </Link>
        <div className="flex min-w-0 flex-1 flex-col justify-center gap-1">
          <Link href={href} className="truncate text-sm font-medium text-foreground hover:text-brand-gold">
            {product.name}
          </Link>
          <Price value={product.price} unit={product.unit} size="sm" />
        </div>
      </div>
    );
  }

  const imageAspect = variant === "featured" ? "aspect-[4/3]" : "aspect-square";

  return (
    <div
      className={cn(
        "group flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-all hover:-translate-y-0.5 hover:border-brand-gold/50 hover:shadow-md",
        className
      )}
    >
      <Link href={href} className={cn("relative block overflow-hidden bg-muted", imageAspect)}>
        <ImageWithFallback
          src={product.images[0]}
          alt={product.name}
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
          className="transition-transform duration-500 ease-out group-hover:scale-105"
        />
        {category && (
          <span className="absolute top-2.5 left-2.5 rounded-full bg-background/90 px-2.5 py-1 text-[11px] font-medium text-foreground backdrop-blur-sm">
            {category.name}
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-2.5 p-4">
        <div className="flex items-start justify-between gap-2">
          <Link href={href} className="min-w-0">
            {product.brand && (
              <span className="text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
                {product.brand}
              </span>
            )}
            <h3 className="line-clamp-2 text-sm font-medium text-foreground group-hover:text-brand-gold sm:text-base">
              {product.name}
            </h3>
          </Link>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1">
          <Price value={product.price} unit={product.unit} />
          <AvailabilityBadge availability={product.availability} className="shrink-0" />
        </div>

        {variant !== "compact" && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="size-3.5" />
            {product.locations[0]}
            {product.locations.length > 1 ? ` +${product.locations.length - 1}` : ""}
          </div>
        )}

        {variant === "featured" && (
          <p className="line-clamp-2 text-sm text-muted-foreground">{product.shortDescription}</p>
        )}

        <div className="mt-auto flex items-center justify-between gap-2 pt-2">
          <Link
            href={href}
            className="inline-flex items-center gap-1 text-sm font-medium text-foreground transition-colors group-hover:text-brand-gold"
          >
            View Product
            <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
          {variant === "featured" && (
            <RequestQuoteButton
              product={product}
              variant="ghost"
              size="sm"
              label="Quote"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export { ProductCard };
export type { ProductCardVariant };

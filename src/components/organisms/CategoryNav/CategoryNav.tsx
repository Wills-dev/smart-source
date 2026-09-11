"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "cn";
import { Container } from "@/components/atoms/Container";
import { categories } from "@/data/categories";

/** Desktop-only sticky category bar with a subcategory dropdown per pill. Mobile browsing uses the accordion inside MobileNavbar instead. */
function CategoryNav() {
  const [active, setActive] = useState<string | null>(null);
  const activeCategory = categories.find((c) => c.slug === active);

  return (
    <div
      className="sticky top-18 z-40 hidden border-b border-border bg-background/95 backdrop-blur-md md:block"
      onMouseLeave={() => setActive(null)}
    >
      <Container>
        <nav className="scrollbar-none flex items-center gap-1 overflow-x-auto py-2.5">
          <Link
            href="/products"
            className="shrink-0 rounded-full px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            All Products
          </Link>
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/products/${category.slug}`}
              onMouseEnter={() => setActive(category.slug)}
              className={cn(
                "shrink-0 rounded-full px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-colors hover:bg-muted",
                active === category.slug ? "bg-muted text-brand-gold" : "text-foreground"
              )}
            >
              {category.name}
            </Link>
          ))}
        </nav>
      </Container>

      <AnimatePresence>
        {activeCategory && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="absolute inset-x-0 top-full border-b border-border bg-popover shadow-lg"
          >
            <Container>
              <div className="grid grid-cols-2 gap-x-8 gap-y-3 py-6 sm:grid-cols-3 lg:grid-cols-6">
                {activeCategory.subcategories.map((sub) => (
                  <Link
                    key={sub.id}
                    href={`/products/${activeCategory.slug}/${sub.slug}`}
                    className="text-sm text-muted-foreground transition-colors hover:text-brand-gold"
                  >
                    {sub.name}
                  </Link>
                ))}
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export { CategoryNav };

import { products } from "@/data/products";
import type { Product, ProductAvailability } from "@/types/product";
import type { SortOption } from "@/types/common";
import { getWeeklySelection } from "@/lib/weekly";

export function getAllProducts(): Product[] {
  return products;
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id);
}

export function getProductsByCategory(categoryId: string): Product[] {
  return products.filter((product) => product.categoryId === categoryId);
}

export function getProductsBySubcategory(subcategoryId: string): Product[] {
  return products.filter((product) => product.subcategoryId === subcategoryId);
}

export function getFeaturedProducts(count = 8): Product[] {
  return products.filter((product) => product.featured).slice(0, count);
}

export function getPopularProducts(count = 8): Product[] {
  const popular = products.filter((product) => product.popular);
  return (popular.length ? popular : products).slice(0, count);
}

/** "Popular This Week" — deterministic per ISO week, see lib/weekly.ts. */
export function getWeeklyPopularProducts(count = 8): Product[] {
  const pool = products.filter((product) => product.popular);
  return getWeeklySelection(pool.length ? pool : products, count, `popular-${weekSeedSuffix()}`);
}

/** "Recently Supplied" — deterministic per ISO week, distinct seed from popular so the two rails don't mirror each other. */
export function getRecentlySuppliedProducts(count = 8): Product[] {
  const pool = products.filter((product) => product.recentlySold);
  return getWeeklySelection(pool.length ? pool : products, count, `recent-${weekSeedSuffix()}`);
}

function weekSeedSuffix(): string {
  // Re-exported indirectly via getWeeklySelection's default, but namespaced
  // per-rail so "popular" and "recent" don't select the same items.
  return new Date().toISOString().slice(0, 4);
}

export function getRelatedProducts(product: Product, count = 4): Product[] {
  return products
    .filter(
      (p) =>
        p.id !== product.id &&
        (p.subcategoryId === product.subcategoryId || p.categoryId === product.categoryId)
    )
    .sort((a, b) => {
      const aMatch = a.subcategoryId === product.subcategoryId ? 0 : 1;
      const bMatch = b.subcategoryId === product.subcategoryId ? 0 : 1;
      return aMatch - bMatch;
    })
    .slice(0, count);
}

export interface ProductFilters {
  category?: string;
  subcategory?: string;
  brand?: string;
  availability?: ProductAvailability;
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  query?: string;
}

export function filterProducts(list: Product[], filters: ProductFilters): Product[] {
  return list.filter((product) => {
    if (filters.category && product.categoryId !== filters.category) return false;
    if (filters.subcategory && product.subcategoryId !== filters.subcategory) return false;
    if (filters.brand && product.brand !== filters.brand) return false;
    if (filters.availability && product.availability !== filters.availability) return false;
    if (filters.location && !product.locations.includes(filters.location)) return false;
    if (filters.minPrice !== undefined && product.price < filters.minPrice) return false;
    if (filters.maxPrice !== undefined && product.price > filters.maxPrice) return false;
    if (filters.query) {
      const q = filters.query.toLowerCase();
      const haystack = [
        product.name,
        product.brand ?? "",
        product.shortDescription,
        ...product.tags,
      ]
        .join(" ")
        .toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  });
}

export function sortProducts(list: Product[], sort: SortOption = "featured"): Product[] {
  const sorted = [...list];
  switch (sort) {
    case "newest":
      return sorted.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "name-asc":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case "featured":
    default:
      return sorted.sort((a, b) => Number(b.featured) - Number(a.featured));
  }
}

export function getAllBrands(): string[] {
  const brands = new Set<string>();
  for (const product of products) {
    if (product.brand) brands.add(product.brand);
  }
  return Array.from(brands).sort();
}

export function getPriceBounds(): { min: number; max: number } {
  const prices = products.map((p) => p.price);
  return { min: Math.min(...prices), max: Math.max(...prices) };
}

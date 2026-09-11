import { products } from "@/data/products";
import { categories } from "@/data/categories";
import { getCategoryById, getSubcategoryById } from "@/lib/categories";
import type { Product } from "@/types/product";
import type { Category } from "@/types/category";

export interface SearchResults {
  products: Product[];
  categories: Category[];
}

export function searchProducts(query: string, limit = 8): Product[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  return products
    .filter((product) => {
      const category = getCategoryById(product.categoryId);
      const subcategory = getSubcategoryById(product.subcategoryId);
      const haystack = [
        product.name,
        product.brand ?? "",
        product.shortDescription,
        category?.name ?? "",
        subcategory?.name ?? "",
        ...product.tags,
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    })
    .slice(0, limit);
}

export function searchCategories(query: string, limit = 4): Category[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  return categories
    .filter(
      (category) =>
        category.name.toLowerCase().includes(q) ||
        category.subcategories.some((sub) => sub.name.toLowerCase().includes(q))
    )
    .slice(0, limit);
}

export function search(query: string): SearchResults {
  return {
    products: searchProducts(query),
    categories: searchCategories(query),
  };
}

export const popularSearches = [
  "Cement",
  "Roofing Sheets",
  "12mm Rebar",
  "PVC Pipes",
  "Floor Tiles",
  "Emulsion Paint",
];

import { categories } from "@/data/categories";
import type { Category, Subcategory } from "@/types/category";

export function getAllCategories(): Category[] {
  return categories;
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((category) => category.slug === slug);
}

export function getCategoryById(id: string): Category | undefined {
  return categories.find((category) => category.id === id);
}

export function getSubcategoryBySlug(
  categorySlug: string,
  subcategorySlug: string
): { category: Category; subcategory: Subcategory } | undefined {
  const category = getCategoryBySlug(categorySlug);
  if (!category) return undefined;

  const subcategory = category.subcategories.find(
    (sub) => sub.slug === subcategorySlug
  );
  if (!subcategory) return undefined;

  return { category, subcategory };
}

export function getSubcategoryById(id: string): Subcategory | undefined {
  for (const category of categories) {
    const match = category.subcategories.find((sub) => sub.id === id);
    if (match) return match;
  }
  return undefined;
}

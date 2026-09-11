export interface Subcategory {
  id: string;
  slug: string;
  name: string;
  description?: string;
  image: string;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description?: string;
  image: string;
  subcategories: Subcategory[];
}

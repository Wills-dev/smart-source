export type ProductUnit =
  | "bag"
  | "piece"
  | "length"
  | "sheet"
  | "roll"
  | "box"
  | "set"
  | "sqm"
  | "ton"
  | "litre"
  | "bucket";

export type ProductAvailability =
  | "in-stock"
  | "limited"
  | "pre-order"
  | "out-of-stock";

export interface ProductSpecification {
  label: string;
  value: string;
}

/**
 * Shaped to migrate cleanly to a CMS (Sanity/Strapi/Supabase) later —
 * keep new fields flat and serializable, no UI-only concerns here.
 */
export interface Product {
  id: string;
  slug: string;

  name: string;

  categoryId: string;
  subcategoryId: string;

  brand?: string;

  description: string;
  shortDescription: string;

  images: string[];

  price: number;
  currency: "NGN";
  unit: ProductUnit;

  availability: ProductAvailability;

  locations: string[];

  specifications: ProductSpecification[];

  features?: string[];
  applications?: string[];

  deliveryInfo?: string;
  minimumOrder?: number;

  popular?: boolean;
  recentlySold?: boolean;
  featured?: boolean;

  tags: string[];

  createdAt: string;
}

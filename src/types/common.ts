export interface HeroSlide {
  id: string;
  title: string;
  description: string;
  image: string;
  mobileImage?: string;
  href: string;
  ctaLabel: string;
  secondaryCtaLabel?: string;
  secondaryHref?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company?: string;
  industry: string;
  quote: string;
  image: string;
  /** Marks this as demo content — replace with a genuine client testimonial before launch. */
  isSample: true;
}

export interface Partner {
  id: string;
  name: string;
  logo: string;
  href?: string;
  /** Marks this as demo/placeholder content — replace with real partner logos before launch. */
  isSample: true;
}

export interface Faq {
  id: string;
  question: string;
  answer: string;
  category?: "ordering" | "quotes" | "delivery" | "payments" | "general";
}

export type MediaCategory =
  | "products"
  | "projects"
  | "warehouse"
  | "delivery"
  | "partners";

export interface MediaItem {
  id: string;
  image: string;
  category: MediaCategory;
  caption: string;
  aspect: "portrait" | "square" | "landscape" | "tall";
}

export interface NavSubItem {
  label: string;
  href: string;
  description?: string;
}

export interface NavGroup {
  label: string;
  items: NavSubItem[];
}

export interface NavItem {
  label: string;
  href: string;
}

export const NIGERIAN_LOCATIONS = [
  "Lagos",
  "Abuja",
  "Ogun",
  "Oyo",
  "Rivers",
  "Delta",
  "Anambra",
  "Enugu",
  "Kano",
  "Kaduna",
  "Nationwide",
] as const;

export type NigerianLocation = (typeof NIGERIAN_LOCATIONS)[number];

export type SortOption =
  | "featured"
  | "newest"
  | "price-asc"
  | "price-desc"
  | "name-asc";

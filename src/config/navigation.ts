import type { NavItem } from "@/types/common";

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "What We Do", href: "/what-we-do" },
  { label: "About Us", href: "/about" },
  { label: "Media", href: "/media" },
  { label: "Help", href: "/help" },
  { label: "Contact", href: "/contact" },
];

export const megaMenuGroups: { label: string; categorySlugs: string[] }[] = [
  { label: "Structural", categorySlugs: ["cement-concrete", "steel-reinforcement", "blocks-bricks"] },
  { label: "Exterior", categorySlugs: ["roofing", "doors-windows", "tools-equipment"] },
  { label: "Interior", categorySlugs: ["tiles-flooring", "paint-finishes", "sanitary-ware"] },
  { label: "Systems", categorySlugs: ["plumbing", "electrical", "timber-boards"] },
];

export const footerNav = {
  company: [
    { label: "About Us", href: "/about" },
    { label: "What We Do", href: "/what-we-do" },
    { label: "Media", href: "/media" },
    { label: "Contact", href: "/contact" },
  ] as NavItem[],
  products: [
    { label: "All Categories", href: "/products" },
    { label: "Popular Products", href: "/products?sort=featured" },
    { label: "Recently Supplied", href: "/products?sort=newest" },
  ] as NavItem[],
  help: [
    { label: "Help Center", href: "/help" },
    { label: "Delivery Policy", href: "/delivery-policy" },
    { label: "Return Policy", href: "/return-policy" },
  ] as NavItem[],
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Use", href: "/terms-of-use" },
  ] as NavItem[],
};

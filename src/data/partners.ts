import type { Partner } from "@/types/common";

/**
 * Sample/placeholder brand logos — replace with real partner/supplier logos
 * before launch. Logos are `.png` (not `.svg`) so they render through
 * next/image without needing `images.dangerouslyAllowSVG` in next.config.
 */
export const partners: Partner[] = [
  { id: "p1", name: "Dangote", logo: "/images/partners/dangote.png", isSample: true },
  { id: "p2", name: "BUA Group", logo: "/images/partners/bua.png", isSample: true },
  { id: "p3", name: "Lafarge", logo: "/images/partners/lafarge.png", isSample: true },
  { id: "p4", name: "Nigerchin", logo: "/images/partners/nigerchin.png", isSample: true },
  { id: "p5", name: "Geepee", logo: "/images/partners/geepee.png", isSample: true },
  { id: "p6", name: "Docherich", logo: "/images/partners/docherich.png", isSample: true },
  { id: "p7", name: "Tolet Aluminium", logo: "/images/partners/tolet.png", isSample: true },
  { id: "p8", name: "African Foundries", logo: "/images/partners/african-foundries.png", isSample: true },
];

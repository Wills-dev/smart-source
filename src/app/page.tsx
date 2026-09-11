import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/HeroSection";
import { CategoryShowcase } from "@/components/sections/CategoryShowcase";
import { PopularProducts } from "@/components/sections/PopularProducts";
import { TrustSection } from "@/components/sections/TrustSection";
import { RecentlySupplied } from "@/components/sections/RecentlySupplied";
import { FeaturedBanner } from "@/components/sections/FeaturedBanner";
import { WhatWeSupply } from "@/components/sections/WhatWeSupply";
import { MediaPreview } from "@/components/sections/MediaPreview";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { PartnersSection } from "@/components/sections/PartnersSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { FinalCta } from "@/components/sections/FinalCta";

export const metadata: Metadata = {
  title: "Quality Construction Materials in Nigeria",
  description:
    "SmartSource Nigeria Limited sources and supplies cement, steel, roofing, plumbing, electrical and finishing materials for contractors, developers and businesses.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CategoryShowcase />
      <PopularProducts />
      <TrustSection />
      <RecentlySupplied />
      <FeaturedBanner />
      <WhatWeSupply />
      <MediaPreview />
      <HowItWorks />
      <TestimonialsSection />
      <PartnersSection />
      <FaqSection />
      <FinalCta />
    </>
  );
}

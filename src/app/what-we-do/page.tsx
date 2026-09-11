import type { Metadata } from "next";
import {
  Boxes,
  Search,
  Layers,
  Handshake,
  Truck,
  Sparkles,
} from "lucide-react";
import { Container } from "@/components/atoms/Container";
import { SectionHeading } from "@/components/atoms/SectionHeading";
import { Reveal } from "@/components/atoms/Reveal";
import { PageHero } from "@/components/sections/PageHero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { FinalCta } from "@/components/sections/FinalCta";

export const metadata: Metadata = {
  title: "What We Do",
  description:
    "Construction material supply, project sourcing, bulk procurement and delivery coordination from SmartSource Nigeria.",
};

const SERVICES = [
  {
    icon: Boxes,
    title: "Construction Material Supply",
    description:
      "Core materials across structural, finishing, mechanical and electrical categories.",
  },
  {
    icon: Search,
    title: "Project Material Sourcing",
    description:
      "We source materials specific to your project's bill of quantities.",
  },
  {
    icon: Layers,
    title: "Bulk Procurement",
    description:
      "Consolidated pricing and coordination for large-quantity orders.",
  },
  {
    icon: Handshake,
    title: "Supplier Coordination",
    description:
      "One point of contact across our network of manufacturers and suppliers.",
  },
  {
    icon: Truck,
    title: "Delivery Support",
    description: "Coordinated delivery timing aligned to your site schedule.",
  },
  {
    icon: Sparkles,
    title: "Special Product Sourcing",
    description: "Materials not listed in our catalogue, sourced on request.",
  },
];

export default function WhatWeDoPage() {
  return (
    <div className="pb-8">
      <PageHero
        eyebrow="What We Do"
        title="Construction Material Sourcing, Simplified"
        description="From single-item enquiries to full project procurement, SmartSource handles the sourcing so you can focus on building."
        image="/images/company/what-we-do-hero.png"
        breadcrumbs={[{ label: "What We Do" }]}
      />

      <Container className="mt-16">
        <SectionHeading
          eyebrow="Our Services"
          title="What SmartSource Handles For You"
        />
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, index) => (
            <Reveal
              key={service.title}
              delay={index * 0.05}
              className="flex flex-col gap-3 rounded-lg border border-border p-7"
            >
              <service.icon className="size-6 text-brand-gold" />
              <h3 className="font-heading text-base font-semibold text-foreground">
                {service.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {service.description}
              </p>
            </Reveal>
          ))}
        </div>
      </Container>

      <div className="mt-8">
        <HowItWorks />
      </div>

      <div className="mt-16">
        <FinalCta />
      </div>
    </div>
  );
}

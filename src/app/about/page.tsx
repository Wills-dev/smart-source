import type { Metadata } from "next";
import { Container } from "@/components/atoms/Container";
import { SectionHeading } from "@/components/atoms/SectionHeading";
import { Reveal } from "@/components/atoms/Reveal";
import { ImageWithFallback } from "@/components/atoms/ImageWithFallback";
import { PageHero } from "@/components/sections/PageHero";
import { FinalCta } from "@/components/sections/FinalCta";
import {
  Target,
  Eye,
  ShieldCheck,
  Handshake,
  Gauge,
  Users,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "SmartSource Nigeria Limited sources and supplies construction materials for contractors, developers and businesses across Nigeria.",
};

const AUDIENCES = [
  "Property Developers",
  "Construction Companies",
  "Contractors",
  "Architects",
  "Engineers",
  "Procurement Teams",
  "Homeowners",
  "Retailers",
];

const VALUES = [
  {
    icon: ShieldCheck,
    title: "Reliability",
    description:
      "We follow through on what we commit to sourcing and delivering.",
  },
  {
    icon: Handshake,
    title: "Integrity",
    description: "Transparent pricing and honest communication, every time.",
  },
  {
    icon: Gauge,
    title: "Responsiveness",
    description: "Quick answers when project timelines are on the line.",
  },
  {
    icon: Users,
    title: "Partnership",
    description: "We work alongside your team, not just as a supplier.",
  },
];

export default function AboutPage() {
  return (
    <div className="pb-8">
      <PageHero
        eyebrow="About SmartSource"
        title="Always Dedicated and Devoted"
        description="Sourcing quality construction materials for projects across Nigeria — from single-home builds to large-scale developments."
        image="/images/company/about-hero.png"
        breadcrumbs={[{ label: "About Us" }]}
      />

      <Container className="mt-16 grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <Reveal>
          <SectionHeading
            eyebrow="Who We Are"
            title="A Sourcing Partner Built for Nigerian Construction"
          />
          <p className="mt-5 leading-relaxed text-muted-foreground">
            SmartSource Nigeria Limited sources and supplies construction
            materials — from structural essentials to finishing products — for
            contractors, developers, businesses and homeowners across Nigeria.
            We simplify procurement by consolidating multiple material
            categories under one point of contact.
          </p>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Our approach centres on responsiveness, transparent pricing and a
            sourcing network built to handle both single-item enquiries and full
            project bills of quantities.
          </p>
        </Reveal>
        <Reveal
          delay={0.1}
          className="relative aspect-4/3 overflow-hidden rounded-lg"
        >
          <ImageWithFallback
            src="/images/company/team.jpg"
            alt="SmartSource team"
            sizes="(min-width: 1024px) 45vw, 100vw"
          />
        </Reveal>
      </Container>

      <Container className="mt-20 grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Reveal className="rounded-lg border border-border p-8">
          <Target className="size-7 text-brand-gold" />
          <h2 className="mt-4 font-heading text-xl font-semibold text-foreground">
            Our Mission
          </h2>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            To make sourcing construction materials simple, reliable and
            transparent for every project, regardless of scale.
          </p>
        </Reveal>
        <Reveal delay={0.06} className="rounded-lg border border-border p-8">
          <Eye className="size-7 text-brand-gold" />
          <h2 className="mt-4 font-heading text-xl font-semibold text-foreground">
            Our Vision
          </h2>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            To become a trusted materials-sourcing partner for construction
            projects across Nigeria and beyond.
          </p>
        </Reveal>
      </Container>

      <Container className="mt-20">
        <SectionHeading
          eyebrow="How We Work"
          title="Consolidated Sourcing, One Point of Contact"
          align="center"
          className="mx-auto"
        />
        <p className="mx-auto mt-5 max-w-2xl text-center leading-relaxed text-muted-foreground">
          Instead of coordinating with multiple suppliers for cement, steel,
          roofing, plumbing and electrical materials separately, SmartSource
          consolidates sourcing into a single relationship — from enquiry
          through to delivery coordination.
        </p>
      </Container>

      <Container className="mt-20">
        <SectionHeading
          eyebrow="Who We Serve"
          title="Built for Every Kind of Builder"
        />
        <div className="mt-6 flex flex-wrap gap-2.5">
          {AUDIENCES.map((audience) => (
            <span
              key={audience}
              className="rounded-full border border-border bg-card px-4 py-2 text-sm text-foreground"
            >
              {audience}
            </span>
          ))}
        </div>
      </Container>

      <Container className="mt-20">
        <SectionHeading eyebrow="Our Values" title="What Guides How We Work" />
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((value, index) => (
            <Reveal
              key={value.title}
              delay={index * 0.05}
              className="flex flex-col gap-3"
            >
              <value.icon className="size-6 text-brand-gold" />
              <h3 className="font-heading text-base font-semibold text-foreground">
                {value.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {value.description}
              </p>
            </Reveal>
          ))}
        </div>
      </Container>

      <div className="mt-24">
        <FinalCta />
      </div>
    </div>
  );
}

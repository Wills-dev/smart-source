import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/atoms/Container";
import { SectionHeading } from "@/components/atoms/SectionHeading";
import { Reveal } from "@/components/atoms/Reveal";
import { Divider } from "@/components/atoms/Divider";
import { ImageWithFallback } from "@/components/atoms/ImageWithFallback";

const GROUPS = [
  {
    label: "Structural Materials",
    description: "Cement, concrete, steel reinforcement and blockwork for the building's core.",
    href: "/products/cement-concrete",
    image: "/images/company/structural.jpg",
  },
  {
    label: "Finishing Materials",
    description: "Tiles, paint, sanitary ware and surface finishes that complete a space.",
    href: "/products/tiles-flooring",
    image: "/images/company/finishing.jpg",
  },
  {
    label: "Mechanical & Plumbing",
    description: "Pipes, tanks, pumps and valves for water supply and drainage systems.",
    href: "/products/plumbing",
    image: "/images/company/mechanical.jpg",
  },
  {
    label: "Electrical Materials",
    description: "Cables, switchgear and lighting for safe, code-compliant installations.",
    href: "/products/electrical",
    image: "/images/company/electrical.jpg",
  },
  {
    label: "Roofing Systems",
    description: "Aluminium, stone-coated and longspan roofing with matching accessories.",
    href: "/products/roofing",
    image: "/images/company/roofing.jpg",
  },
  {
    label: "Tools & Equipment",
    description: "Power tools, hand tools and safety equipment to keep every crew productive.",
    href: "/products/tools-equipment",
    image: "/images/company/tools.jpg",
  },
];

function WhatWeSupply() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="What We Supply"
          title="Everything Between Foundation and Finish"
          description="A structured view of the material groups SmartSource sources for residential and commercial projects."
        />

        <div className="mt-12 flex flex-col">
          <Divider />
          {GROUPS.map((group, index) => (
            <Reveal key={group.label} delay={index * 0.04}>
              <Link
                href={group.href}
                className="group flex flex-col items-start gap-5 border-b border-border py-7 sm:flex-row sm:items-center sm:gap-8"
              >
                <span className="font-heading text-xl text-brand-gold/40 sm:w-12">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-md sm:w-40">
                  <ImageWithFallback
                    src={group.image}
                    alt={group.label}
                    sizes="160px"
                    className="transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-1.5">
                  <h3 className="font-heading text-xl font-semibold text-foreground group-hover:text-brand-gold sm:text-2xl">
                    {group.label}
                  </h3>
                  <p className="max-w-xl text-sm text-muted-foreground">{group.description}</p>
                </div>
                <ArrowUpRight className="size-5 shrink-0 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand-gold" />
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

export { WhatWeSupply };

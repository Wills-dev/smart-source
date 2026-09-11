"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/atoms/Container";
import { PartnerLogo } from "@/components/molecules/PartnerLogo";
import { partners } from "@/data/partners";

function PartnersSection() {
  const track = [...partners, ...partners];

  return (
    <section className="border-y border-border py-14">
      <Container>
        <p className="mb-8 text-center text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
          Brands &amp; Partners in Our Sourcing Network
        </p>
      </Container>

      <div
        className="overflow-hidden"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}
      >
        <motion.div
          className="flex w-max items-center gap-4"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
        >
          {track.map((partner, index) => (
            <PartnerLogo key={`${partner.id}-${index}`} partner={partner} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export { PartnersSection };

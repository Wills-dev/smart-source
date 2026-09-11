import { CheckCircle2 } from "lucide-react";
import { Container } from "@/components/atoms/Container";
import { SectionHeading } from "@/components/atoms/SectionHeading";
import { Reveal } from "@/components/atoms/Reveal";
import { StatCard } from "@/components/molecules/StatCard";
import { ImageWithFallback } from "@/components/atoms/ImageWithFallback";

const REASONS = [
  "Verified Products",
  "Competitive Pricing",
  "Nationwide Sourcing",
  "Reliable Delivery",
  "Project-Scale Procurement",
  "Responsive Support",
];

// Sample figures for illustration — replace with verified numbers before launch.
const STATS = [
  { value: "100+", label: "Material Types" },
  { value: "Nationwide", label: "Delivery Support" },
  { value: "12+", label: "Categories Sourced" },
];

function TrustSection() {
  return (
    <section className="bg-noise bg-brand-charcoal py-20 sm:py-28">
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div className="flex flex-col gap-8">
            <SectionHeading
              eyebrow="Why SmartSource"
              title="One Source. More Possibilities."
              description="From cement and steel to roofing, plumbing, electricals and finishes, SmartSource simplifies construction-material sourcing."
              tone="light"
            />

            <div className="grid grid-cols-2 gap-4">
              {REASONS.map((reason) => (
                <div key={reason} className="flex items-center gap-2 text-sm text-brand-warm-grey">
                  <CheckCircle2 className="size-4 shrink-0 text-brand-gold" />
                  {reason}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-6 border-t border-white/10 pt-8">
              {STATS.map((stat) => (
                <StatCard key={stat.label} value={stat.value} label={stat.label} tone="light" />
              ))}
            </div>
            <p className="text-xs text-brand-warm-grey/50">
              Sample figures for illustration — confirm current data before publishing.
            </p>
          </div>

          <Reveal className="relative aspect-[4/5] overflow-hidden rounded-lg">
            <ImageWithFallback
              src="/images/company/warehouse.jpg"
              alt="SmartSource warehouse and materials storage"
              sizes="(min-width: 1024px) 45vw, 100vw"
            />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

export { TrustSection };

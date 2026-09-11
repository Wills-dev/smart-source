import type { Metadata } from "next";
import { Container } from "@/components/atoms/Container";
import { PageHero } from "@/components/sections/PageHero";
import { HelpCenter } from "@/components/organisms/HelpCenter";
import { CallButton } from "@/components/molecules/CallButton";
import { RequestQuoteButton } from "@/components/molecules/RequestQuoteButton";

export const metadata: Metadata = {
  title: "Help Center",
  description: "Answers to common questions about ordering, quotes, delivery, payments and returns at SmartSource Nigeria.",
};

export default function HelpPage() {
  return (
    <div className="pb-20">
      <PageHero
        eyebrow="Help Center"
        title="How Can We Help?"
        description="Browse answers on ordering, quotes, delivery, payments and returns — or reach our team directly."
        breadcrumbs={[{ label: "Help" }]}
      />

      <Container className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <HelpCenter />
        </div>

        <aside className="flex h-fit flex-col gap-3 rounded-lg border border-border p-6">
          <h2 className="font-heading text-base font-semibold text-foreground">Still Need Help?</h2>
          <p className="text-sm text-muted-foreground">
            Our team can answer questions specific to your order or project.
          </p>
          <RequestQuoteButton label="Request a Quote" className="w-full" />
          <CallButton variant="outline" className="w-full" />
        </aside>
      </Container>
    </div>
  );
}

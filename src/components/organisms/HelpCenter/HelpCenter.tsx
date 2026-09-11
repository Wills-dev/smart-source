"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/data/faqs";

const CATEGORY_LABEL: Record<string, string> = {
  ordering: "Ordering",
  quotes: "Quotes",
  delivery: "Delivery",
  payments: "Payments",
  general: "General",
};

function HelpCenter() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return faqs;
    return faqs.filter(
      (faq) => faq.question.toLowerCase().includes(q) || faq.answer.toLowerCase().includes(q)
    );
  }, [query]);

  const grouped = useMemo(() => {
    const map = new Map<string, typeof faqs>();
    for (const faq of filtered) {
      const category = faq.category ?? "general";
      map.set(category, [...(map.get(category) ?? []), faq]);
    }
    return map;
  }, [filtered]);

  return (
    <div className="flex flex-col gap-10">
      <div className="relative max-w-md">
        <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search help topics..."
          className="h-11 pl-9"
        />
      </div>

      {filtered.length === 0 && (
        <p className="text-sm text-muted-foreground">No help topics match &ldquo;{query}&rdquo;.</p>
      )}

      {Array.from(grouped.entries()).map(([category, items]) => (
        <div key={category}>
          <h2 className="font-heading text-lg font-semibold text-foreground">
            {CATEGORY_LABEL[category] ?? category}
          </h2>
          <Accordion className="mt-3 border-t border-border">
            {items.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id}>
                <AccordionTrigger className="py-4">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      ))}
    </div>
  );
}

export { HelpCenter };

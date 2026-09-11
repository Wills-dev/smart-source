"use client";

import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { useProductFilters } from "@/hooks/useProductFilters";
import { ProductFilters } from "./ProductFilters";

function ProductFiltersMobile() {
  const [open, setOpen] = useState(false);
  const { activeCount } = useProductFilters();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <Button type="button" variant="outline" onClick={() => setOpen(true)} className="lg:hidden">
        <SlidersHorizontal data-icon="inline-start" />
        Filters
        {activeCount > 0 && (
          <span className="ml-1 flex size-4 items-center justify-center rounded-full bg-brand-gold text-[10px] text-brand-black">
            {activeCount}
          </span>
        )}
      </Button>
      <SheetContent side="left" className="w-[85vw] overflow-y-auto sm:max-w-sm">
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
          <SheetDescription className="sr-only">Filter products</SheetDescription>
        </SheetHeader>
        <div className="px-4 pb-6">
          <ProductFilters onNavigate={() => setOpen(false)} />
        </div>
      </SheetContent>
    </Sheet>
  );
}

export { ProductFiltersMobile };

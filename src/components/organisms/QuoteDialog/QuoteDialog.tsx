"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { useQuoteDialog } from "./QuoteDialogContext";
import { QuoteForm } from "./QuoteForm";

function QuoteDialog() {
  const { open, setOpen, product, close } = useQuoteDialog();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="right" className="w-full overflow-y-auto sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Request a Quote</SheetTitle>
          <SheetDescription>
            Tell us what you need and our team will respond with a tailored quotation.
          </SheetDescription>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto px-4 pb-6">
          <QuoteForm product={product} onSuccess={close} />
        </div>
      </SheetContent>
    </Sheet>
  );
}

export { QuoteDialog };

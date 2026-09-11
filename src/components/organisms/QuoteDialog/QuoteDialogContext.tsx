"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

export interface QuoteContextProduct {
  id: string;
  name: string;
}

interface QuoteDialogContextValue {
  open: boolean;
  product?: QuoteContextProduct;
  openQuote: (product?: QuoteContextProduct) => void;
  close: () => void;
  setOpen: (open: boolean) => void;
}

const QuoteDialogContext = createContext<QuoteDialogContextValue | null>(null);

export function useQuoteDialog() {
  const ctx = useContext(QuoteDialogContext);
  if (!ctx) {
    throw new Error("useQuoteDialog must be used within a QuoteDialogProvider");
  }
  return ctx;
}

export function QuoteDialogContextProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState<QuoteContextProduct | undefined>(undefined);

  const openQuote = useCallback((nextProduct?: QuoteContextProduct) => {
    setProduct(nextProduct);
    setOpen(true);
  }, []);

  const close = useCallback(() => setOpen(false), []);

  const value = useMemo(
    () => ({ open, product, openQuote, close, setOpen }),
    [open, product, openQuote, close]
  );

  return (
    <QuoteDialogContext.Provider value={value}>{children}</QuoteDialogContext.Provider>
  );
}

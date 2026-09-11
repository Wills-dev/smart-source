"use client";

import { QuoteDialogContextProvider } from "./QuoteDialogContext";
import { QuoteDialog } from "./QuoteDialog";

function QuoteDialogProvider({ children }: { children: React.ReactNode }) {
  return (
    <QuoteDialogContextProvider>
      {children}
      <QuoteDialog />
    </QuoteDialogContextProvider>
  );
}

export { QuoteDialogProvider };

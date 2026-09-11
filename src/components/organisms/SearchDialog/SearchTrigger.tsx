"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchDialog } from "./SearchDialog";

interface SearchTriggerProps {
  className?: string;
}

/** Self-contained: owns its own open state and renders the dialog alongside the trigger button. Cmd/Ctrl+K opens it globally. */
function SearchTrigger({ className }: SearchTriggerProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((prev) => !prev);
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className={className}
        onClick={() => setOpen(true)}
        aria-label="Search"
      >
        <Search />
      </Button>
      <SearchDialog open={open} onOpenChange={setOpen} />
    </>
  );
}

export { SearchTrigger };

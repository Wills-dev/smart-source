"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Logo } from "@/components/atoms/Logo";
import { CallButton } from "@/components/molecules/CallButton";
import { RequestQuoteButton } from "@/components/molecules/RequestQuoteButton";
import { SearchTrigger } from "@/components/organisms/SearchDialog";
import { mainNav } from "@/config/navigation";
import { categories } from "@/data/categories";

function MobileNavbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 flex h-16 items-center border-b border-border bg-background/95 px-4 backdrop-blur-md md:hidden">
      <div className="flex w-full items-center justify-between">
        <Logo />
        <div className="flex items-center gap-1">
          <SearchTrigger />
          <Sheet open={open} onOpenChange={setOpen}>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="Open menu"
              onClick={() => setOpen(true)}
            >
              <Menu />
            </Button>
            <SheetContent side="left" className="flex w-[85vw] flex-col overflow-y-auto sm:max-w-sm">
              <SheetHeader>
                <SheetTitle className="sr-only">Menu</SheetTitle>
                <SheetDescription className="sr-only">Site navigation</SheetDescription>
                <Logo />
              </SheetHeader>

              <nav className="flex flex-col gap-1 px-4">
                {mainNav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="rounded-md px-2 py-2.5 text-sm font-medium text-foreground hover:bg-muted"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              <div className="px-4">
                <p className="mb-1 px-2 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                  Categories
                </p>
                <Accordion>
                  {categories.map((category) => (
                    <AccordionItem key={category.id} value={category.id}>
                      <AccordionTrigger className="px-2 text-sm">
                        <Link href={`/products/${category.slug}`} onClick={() => setOpen(false)}>
                          {category.name}
                        </Link>
                      </AccordionTrigger>
                      <AccordionContent className="px-2">
                        <div className="flex flex-col gap-1">
                          {category.subcategories.map((sub) => (
                            <Link
                              key={sub.id}
                              href={`/products/${category.slug}/${sub.slug}`}
                              onClick={() => setOpen(false)}
                              className="rounded-md px-2 py-1.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
                            >
                              {sub.name}
                            </Link>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>

              <div className="mt-auto flex flex-col gap-2 border-t border-border p-4">
                <RequestQuoteButton label="Request Quote" className="w-full" />
                <CallButton variant="outline" className="w-full" />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

export { MobileNavbar };

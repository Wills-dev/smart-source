"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "cn";
import { Container } from "@/components/atoms/Container";
import { Logo } from "@/components/atoms/Logo";
import { ImageWithFallback } from "@/components/atoms/ImageWithFallback";
import { CallButton } from "@/components/molecules/CallButton";
import { RequestQuoteButton } from "@/components/molecules/RequestQuoteButton";
import { SearchTrigger } from "@/components/organisms/SearchDialog";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { mainNav, megaMenuGroups } from "@/config/navigation";
import { getCategoryBySlug } from "@/lib/categories";

function DesktopNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const [homeItem, , ...restNav] = mainNav;

  return (
    <header
      className={cn(
        "sticky top-0 z-50 hidden h-18 items-center border-b bg-background/95 backdrop-blur-md transition-shadow duration-300 md:flex",
        scrolled ? "border-border shadow-sm" : "border-transparent"
      )}
    >
      <Container className="flex items-center justify-between gap-6">
        <Logo />

        <NavigationMenu>
          <NavigationMenuList className="gap-1">
            <NavigationMenuItem>
              <NavigationMenuLink render={<Link href={homeItem.href} />}>
                {homeItem.label}
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>Products</NavigationMenuTrigger>
              <NavigationMenuContent className="w-[760px]">
                <div className="grid grid-cols-5 gap-8 p-6">
                  {megaMenuGroups.map((group) => (
                    <div key={group.label} className="flex flex-col gap-3">
                      <span className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                        {group.label}
                      </span>
                      <ul className="flex flex-col gap-2.5">
                        {group.categorySlugs.map((slug) => {
                          const category = getCategoryBySlug(slug);
                          if (!category) return null;
                          return (
                            <li key={slug}>
                              <NavigationMenuLink
                                render={<Link href={`/products/${slug}`} />}
                                className="p-0 text-sm text-foreground hover:bg-transparent hover:text-brand-gold"
                              >
                                {category.name}
                              </NavigationMenuLink>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ))}

                  <Link
                    href="/products"
                    className="group relative col-span-1 block min-h-48 overflow-hidden rounded-lg bg-brand-charcoal"
                  >
                    <ImageWithFallback
                      src="/images/categories/mega-menu-feature.jpg"
                      alt="Explore all materials"
                      sizes="200px"
                      className="transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 to-black/10" />
                    <span className="absolute inset-x-0 bottom-0 flex items-center gap-1 p-4 text-sm font-medium text-white">
                      Explore all materials
                      <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {restNav.map((item) => (
              <NavigationMenuItem key={item.href}>
                <NavigationMenuLink render={<Link href={item.href} />}>
                  {item.label}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-2">
          <SearchTrigger />
          <CallButton variant="ghost" label="Call" />
          <RequestQuoteButton label="Request Quote" />
        </div>
      </Container>
    </header>
  );
}

export { DesktopNav };

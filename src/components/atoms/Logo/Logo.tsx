import Link from "next/link";
import Image from "next/image";
import { cn } from "cn";
import { siteConfig } from "@/config/site";
import logo from "../../../../public/images/logo.png";

interface LogoProps {
  variant?: "default" | "light";
  className?: string;
}

/** Shared brand asset; a white backing keeps its dark lettering readable in the footer. */
function Logo({ variant = "default", className }: LogoProps) {
  const isLight = variant === "light";

  return (
    <Link
      href="/"
      aria-label={`${siteConfig.name} — home`}
      className={cn("inline-flex shrink-0 items-center", className)}
    >
      <span className={cn("inline-flex items-center rounded-md", isLight && "bg-white px-2 py-1.5")}>
        <Image
          src={logo}
          alt={siteConfig.name}
          sizes="(min-width: 640px) 60px, 52px"
          loading="eager"
          className="h-14 w-auto sm:h-16"
        />
      </span>
    </Link>
  );
}

export { Logo };

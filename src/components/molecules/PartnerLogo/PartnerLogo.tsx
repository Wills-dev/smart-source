import { cn } from "cn";
import { ImageWithFallback } from "@/components/atoms/ImageWithFallback";
import type { Partner } from "@/types/common";

interface PartnerLogoProps {
  partner: Partner;
  className?: string;
}

function PartnerLogo({ partner, className }: PartnerLogoProps) {
  return (
    <div
      className={cn(
        "relative flex h-16 w-36 shrink-0 items-center justify-center grayscale transition-all duration-300 hover:grayscale-0",
        className
      )}
    >
      <ImageWithFallback
        src={partner.logo}
        alt={partner.name}
        fallbackLabel={partner.name}
        sizes="144px"
        className="object-contain p-2"
      />
    </div>
  );
}

export { PartnerLogo };

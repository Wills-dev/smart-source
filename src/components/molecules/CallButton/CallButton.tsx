import { Phone } from "lucide-react";
import { cn } from "cn";
import { buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { siteConfig } from "@/config/site";
import type { VariantProps } from "class-variance-authority";

interface CallButtonProps extends VariantProps<typeof buttonVariants> {
  className?: string;
  label?: string;
}

/** tel: link to SmartSource — desktop shows the number on hover via tooltip. */
function CallButton({
  className,
  variant = "outline",
  size,
  label = "Call SmartSource",
}: CallButtonProps) {
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <a
            href={`tel:${siteConfig.contact.phone}`}
            className={cn(buttonVariants({ variant, size }), className)}
          />
        }
      >
        <Phone data-icon="inline-start" />
        {label}
      </TooltipTrigger>
      <TooltipContent>{siteConfig.contact.phoneDisplay}</TooltipContent>
    </Tooltip>
  );
}

export { CallButton };

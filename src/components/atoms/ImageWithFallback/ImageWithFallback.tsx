"use client";

import { useState } from "react";
import Image, { type ImageProps } from "next/image";
import { ImageIcon } from "lucide-react";
import { cn } from "cn";

interface ImageWithFallbackProps extends Omit<ImageProps, "onError" | "fill"> {
  fallbackLabel?: string;
}

/**
 * Always fills its (relatively positioned, sized) parent — wrap callers in a
 * `relative aspect-[…] overflow-hidden` container. No real photography exists
 * yet, so a failed load renders a designed placeholder panel instead of a
 * broken image, keeping every layout intact until real assets are dropped in.
 */
function ImageWithFallback({
  alt,
  fallbackLabel,
  className,
  src,
  ...props
}: ImageWithFallbackProps) {
  const [errored, setErrored] = useState(!src);

  if (errored) {
    return (
      <div
        className={cn(
          "absolute inset-0 flex flex-col items-center justify-center gap-2 bg-linear-to-br from-brand-charcoal via-brand-charcoal to-brand-silver/70 text-center",
          className
        )}
      >
        <ImageIcon className="size-5 text-brand-warm-grey/70" aria-hidden />
        <span className="px-4 text-[10px] font-medium tracking-wider text-brand-warm-grey/80 uppercase">
          {fallbackLabel ?? alt}
        </span>
      </div>
    );
  }

  return (
    <Image
      alt={alt}
      src={src}
      fill
      className={cn("object-cover", className)}
      onError={() => setErrored(true)}
      {...props}
    />
  );
}

export { ImageWithFallback };

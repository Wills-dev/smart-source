import { cn } from "cn";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "default" | "light";
  className?: string;
}

function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "default",
  className,
}: SectionHeadingProps) {
  const isCenter = align === "center";
  const isLight = tone === "light";

  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        isCenter && "items-center text-center",
        className
      )}
    >
      {eyebrow && (
        <span className="flex items-center gap-2 text-xs font-medium tracking-[0.2em] text-brand-gold uppercase">
          <span className="h-px w-6 bg-brand-gold" />
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          "font-heading text-3xl leading-[1.1] font-semibold tracking-tight sm:text-4xl lg:text-[2.75rem]",
          isLight ? "text-brand-white" : "text-foreground"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "max-w-xl text-base leading-relaxed",
            isLight ? "text-brand-warm-grey" : "text-muted-foreground"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}

export { SectionHeading };

import { cn } from "cn";

interface StatCardProps {
  value: string;
  label: string;
  className?: string;
  tone?: "default" | "light";
}

function StatCard({ value, label, className, tone = "default" }: StatCardProps) {
  const isLight = tone === "light";
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <span
        className={cn(
          "font-heading text-4xl font-semibold tracking-tight sm:text-5xl",
          isLight ? "text-brand-gold-light" : "text-brand-gold"
        )}
      >
        {value}
      </span>
      <span
        className={cn(
          "text-sm leading-snug",
          isLight ? "text-brand-warm-grey" : "text-muted-foreground"
        )}
      >
        {label}
      </span>
    </div>
  );
}

export { StatCard };

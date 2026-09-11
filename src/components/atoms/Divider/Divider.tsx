import { cn } from "cn";

interface DividerProps {
  className?: string;
  tone?: "gold" | "muted";
}

function Divider({ className, tone = "muted" }: DividerProps) {
  return (
    <div
      className={cn(
        "h-px w-full",
        tone === "gold" ? "bg-brand-gold/40" : "bg-border",
        className
      )}
    />
  );
}

export { Divider };

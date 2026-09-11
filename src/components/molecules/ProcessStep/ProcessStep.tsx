import { cn } from "cn";

interface ProcessStepProps {
  index: number;
  title: string;
  description: string;
  className?: string;
}

function ProcessStep({ index, title, description, className }: ProcessStepProps) {
  return (
    <div className={cn("flex flex-col gap-3 border-t border-border pt-5", className)}>
      <span className="font-heading text-3xl font-semibold text-brand-gold/30">
        {String(index).padStart(2, "0")}
      </span>
      <h3 className="font-heading text-lg font-semibold text-foreground">{title}</h3>
      <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
    </div>
  );
}

export { ProcessStep };

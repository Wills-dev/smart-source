import { cn } from "cn";

interface SocialIconProps {
  src: string;
  label: string;
  className?: string;
}

function SocialIcon({ src, label, className }: SocialIconProps) {
  // eslint-disable-next-line @next/next/no-img-element -- small static brand SVG, not a content photo
  return <img src={src} alt="" aria-hidden loading="lazy" className={cn("size-4 object-contain", className)} title={label} />;
}

export { SocialIcon };

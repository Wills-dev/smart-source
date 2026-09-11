import { cn } from "cn";

const WIDTH = {
  default: "max-w-[1320px]",
  wide: "max-w-[1400px]",
  full: "max-w-[1440px]",
  narrow: "max-w-3xl",
} as const;

interface ContainerProps extends React.ComponentProps<"div"> {
  width?: keyof typeof WIDTH;
}

function Container({ className, width = "default", ...props }: ContainerProps) {
  return (
    <div
      className={cn("mx-auto w-full px-4 sm:px-6 lg:px-8", WIDTH[width], className)}
      {...props}
    />
  );
}

export { Container };

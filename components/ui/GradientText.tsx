import { cn } from "@/lib/utils";

export function GradientText({
  children,
  className,
  animated = false,
}: {
  children: React.ReactNode;
  className?: string;
  animated?: boolean;
}) {
  return <span className={cn("gradient-text", animated && "gradient-text-animated", className)}>{children}</span>;
}

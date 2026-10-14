import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  color?: "red" | "deep" | "gold";
  variant?: 1 | 2;
}

const colors = {
  red: "bg-[radial-gradient(circle,rgba(230,57,70,0.55)_0%,rgba(230,57,70,0)_68%)]",
  deep: "bg-[radial-gradient(circle,rgba(164,22,26,0.6)_0%,rgba(164,22,26,0)_68%)]",
  gold: "bg-[radial-gradient(circle,rgba(212,175,55,0.4)_0%,rgba(212,175,55,0)_68%)]",
};

/** Soft radial orb (no CSS blur filter — cheap to paint). Pure CSS motion. */
export function GradientOrb({ className, color = "red", variant = 1 }: Props) {
  return (
    <div
      aria-hidden
      className={cn(
        "motion-decor pointer-events-none absolute rounded-full will-change-transform",
        variant === 1 ? "animate-float1" : "animate-float2",
        colors[color],
        className,
      )}
    />
  );
}

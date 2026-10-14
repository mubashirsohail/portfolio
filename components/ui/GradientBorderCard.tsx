"use client";
import { cn } from "@/lib/utils";
import { useSpotlight } from "@/components/effects/useSpotlight";

/**
 * Dark translucent card with a rotating red→gold gradient border (always on when
 * `featured`, otherwise on hover) and a cursor-following spotlight on desktop.
 */
export function GradientBorderCard({
  children,
  className,
  innerClassName,
  featured = false,
}: {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  featured?: boolean;
}) {
  const onMove = useSpotlight();
  return (
    <div
      onPointerMove={onMove}
      className={cn("group relative overflow-hidden rounded-2xl bg-white/[0.07] p-px", className)}
    >
      <span
        aria-hidden
        className={cn(
          "motion-decor pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[250%] -translate-x-1/2 -translate-y-1/2 animate-spinSlow bg-[conic-gradient(from_0deg,transparent_0deg,#E63946_70deg,#D4AF37_150deg,transparent_220deg)] transition-opacity duration-500",
          featured ? "opacity-70" : "opacity-0 group-hover:opacity-100",
        )}
      />
      <div
        className={cn(
          "relative h-full rounded-[calc(1rem-1px)] bg-gradient-to-b from-[#1b1b1b] to-card",
          innerClassName,
        )}
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100 [background:radial-gradient(360px_circle_at_var(--mx,50%)_var(--my,50%),rgba(212,175,55,0.14),transparent_60%)]"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[radial-gradient(ellipse_at_top_right,rgba(230,57,70,0.08),transparent_60%)]"
        />
        <div className="relative h-full">{children}</div>
      </div>
    </div>
  );
}

import { cn } from "@/lib/utils";

export function TechChip({
  children,
  proposed = false,
  className,
}: {
  children: React.ReactNode;
  proposed?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-medium transition-all duration-300 hover:-translate-y-0.5",
        proposed
          ? "border-dashed border-white/25 bg-white/[0.02] text-muted hover:border-gold/60 hover:text-gold-light"
          : "border-gold/30 bg-gold/[0.06] text-gold-light hover:border-gold hover:bg-gold/15 hover:shadow-[0_0_18px_-4px_rgba(212,175,55,0.5)]",
        className,
      )}
      title={proposed ? "Proposed technology — not verified as implemented" : undefined}
    >
      {children}
      {proposed && <span className="sr-only"> (proposed)</span>}
    </span>
  );
}

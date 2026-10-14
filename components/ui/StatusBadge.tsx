import { statusMeta, type ProjectStatus } from "@/data/projects";
import { cn } from "@/lib/utils";

const styles: Record<ProjectStatus, string> = {
  completed: "border-emerald-400/40 bg-emerald-400/10 text-emerald-300",
  "in-progress": "border-gold/50 bg-gold/10 text-gold-light",
  concept: "border-brand/50 bg-brand/10 text-red-300",
};

export function StatusBadge({ status, className }: { status: ProjectStatus; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-widest",
        styles[status],
        className,
      )}
    >
      <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-current" />
      {statusMeta[status].label}
    </span>
  );
}

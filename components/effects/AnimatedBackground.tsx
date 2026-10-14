import { GradientOrb } from "./GradientOrb";

/** Hero backdrop: radial black→red, gold glow, orbs, grid, vignette. Server component, CSS-only. */
export function AnimatedBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_20%_0%,rgba(164,22,26,0.55),transparent_60%),radial-gradient(ellipse_70%_60%_at_100%_100%,rgba(164,22,26,0.28),transparent_60%)]" />
      <div className="absolute right-[-10%] top-1/2 h-[60rem] w-[60rem] max-w-[140vw] -translate-y-1/2 bg-[radial-gradient(circle,rgba(212,175,55,0.2)_0%,transparent_60%)]" />
      <div className="grid-pattern absolute inset-0 opacity-70" />
      <GradientOrb color="red" className="-left-24 top-10 h-[28rem] w-[28rem]" />
      <GradientOrb color="gold" variant={2} className="right-[8%] top-[12%] h-[22rem] w-[22rem]" />
      <GradientOrb color="deep" variant={2} className="bottom-[-8rem] left-[25%] h-[30rem] w-[30rem]" />
      {/* animated light streak */}
      <div className="motion-decor absolute inset-x-0 top-[9%] h-px overflow-hidden opacity-60">
        <div className="h-px w-1/3 animate-sweep bg-gradient-to-r from-transparent via-gold to-transparent" />
      </div>
      {/* vignette + blend into next section */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(8,8,8,0.85)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-ink" />
    </div>
  );
}

/** Lighter tinted backdrop for regular sections. */
export function SectionBackdrop({ tone = "red" }: { tone?: "red" | "gold" | "none" }) {
  if (tone === "none") return null;
  const bg =
    tone === "red"
      ? "bg-[radial-gradient(ellipse_60%_50%_at_0%_50%,rgba(164,22,26,0.22),transparent_70%)]"
      : "bg-[radial-gradient(ellipse_60%_50%_at_100%_40%,rgba(212,175,55,0.1),transparent_70%)]";
  return <div aria-hidden className={`pointer-events-none absolute inset-0 -z-10 ${bg}`} />;
}

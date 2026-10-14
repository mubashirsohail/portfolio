import type { ProjectVisualKind } from "@/data/projects";
import { cn } from "@/lib/utils";

/** Original, code-drawn thumbnails (no external images → nothing to break or lazy-load). */
export function ProjectVisual({ kind, className }: { kind: ProjectVisualKind; className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("relative aspect-[16/10] w-full overflow-hidden bg-[#0d0d0d]", className)}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(164,22,26,0.5),transparent_60%),radial-gradient(ellipse_at_80%_90%,rgba(212,175,55,0.22),transparent_55%)]" />
      <div className="grid-pattern absolute inset-0 opacity-60" />
      <svg viewBox="0 0 400 250" className="absolute inset-0 h-full w-full" fill="none">
        <defs>
          <linearGradient id={`g-${kind}`} x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#E63946" />
            <stop offset="1" stopColor="#F5D76E" />
          </linearGradient>
        </defs>
        {kind === "map" && (
          <g stroke={`url(#g-${kind})`} strokeWidth="2.5" strokeLinecap="round">
            <path d="M60 190 C120 190 120 100 190 110 S300 70 340 60" strokeDasharray="2 9" />
            <circle cx="60" cy="190" r="9" fill="#080808" />
            <circle cx="60" cy="190" r="3.5" fill="#F5D76E" stroke="none" />
            <path d="M340 30c-14 0-25 11-25 25 0 18 25 38 25 38s25-20 25-38c0-14-11-25-25-25Z" fill="#080808" />
            <circle cx="340" cy="55" r="8" fill="#E63946" stroke="none" />
            <circle cx="190" cy="110" r="6" fill="#080808" />
            <circle cx="190" cy="110" r="2.5" fill="#D4AF37" stroke="none" />
          </g>
        )}
        {kind === "health" && (
          <g stroke={`url(#g-${kind})`} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="150" y="55" width="100" height="100" rx="22" fill="#0a0a0a" />
            <path d="M200 80v50M175 105h50" strokeWidth="9" stroke="#E63946" />
            <path d="M30 195h95l15-35 25 65 25-95 20 65h30l15-25h115" strokeWidth="2.5" />
          </g>
        )}
        {kind === "ai" && (
          <g stroke={`url(#g-${kind})`} strokeWidth="1.8">
            {[
              [90, 60, 200, 125], [90, 125, 200, 125], [90, 190, 200, 125],
              [90, 60, 200, 60], [90, 190, 200, 190], [200, 125, 310, 90],
              [200, 60, 310, 90], [200, 190, 310, 160], [200, 125, 310, 160],
            ].map(([a, b, c, d], i) => (
              <line key={i} x1={a} y1={b} x2={c} y2={d} opacity={0.7} />
            ))}
            {[[90, 60], [90, 125], [90, 190], [200, 60], [200, 125], [200, 190], [310, 90], [310, 160]].map(
              ([cx, cy], i) => (
                <circle key={i} cx={cx} cy={cy} r={i === 4 ? 13 : 9} fill="#080808" />
              ),
            )}
            <circle cx="200" cy="125" r="5" fill="#E63946" stroke="none" />
          </g>
        )}
        {kind === "web" && (
          <g stroke={`url(#g-${kind})`} strokeWidth="2" strokeLinecap="round">
            <rect x="60" y="42" width="280" height="166" rx="12" fill="#0a0a0a" />
            <path d="M60 70h280" />
            <circle cx="78" cy="56" r="3.5" fill="#E63946" stroke="none" />
            <circle cx="92" cy="56" r="3.5" fill="#D4AF37" stroke="none" />
            <circle cx="106" cy="56" r="3.5" fill="#F5D76E" stroke="none" />
            <path d="M84 100h110M84 120h160M84 140h90" strokeWidth="5" opacity="0.85" />
            <rect x="84" y="160" width="70" height="26" rx="13" fill="#E63946" stroke="none" />
            <rect x="260" y="90" width="58" height="96" rx="8" opacity="0.7" />
          </g>
        )}
      </svg>
    </div>
  );
}

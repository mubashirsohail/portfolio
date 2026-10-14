"use client";
import Link from "next/link";
import { useRef } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "group relative inline-flex select-none items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-3 text-sm font-semibold tracking-wide transition-[box-shadow,border-color,color] duration-300 focus-visible:outline-2";

const variants: Record<Variant, string> = {
  primary:
    "bg-gradient-to-r from-brand to-brand-deep text-white shadow-[0_8px_30px_-8px_rgba(230,57,70,0.6)] hover:shadow-[0_10px_40px_-6px_rgba(230,57,70,0.85)]",
  secondary:
    "border border-gold/70 bg-ink/80 text-gold-light hover:border-gold-light hover:shadow-[0_0_30px_-6px_rgba(212,175,55,0.6)]",
  ghost: "border border-white/15 bg-white/[0.03] text-fg hover:border-white/30 hover:bg-white/[0.07]",
};

interface Props {
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  href?: string;
  /** Opens in new tab with rel=noopener noreferrer. */
  external?: boolean;
  /** Renders a download link. */
  download?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
  type?: "button" | "submit";
  disabled?: boolean;
  magnetic?: boolean;
  "aria-label"?: string;
}

/** Button/link with magnetic hover (desktop mouse only), press scale and gradient sheen. */
export function AnimatedButton({
  children, variant = "primary", className, href, external, download, onClick,
  type = "button", disabled, magnetic = true, ...rest
}: Props) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.4 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.4 });

  const onMove = (e: React.PointerEvent) => {
    if (reduce || !magnetic || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.18);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.28);
  };
  const reset = () => { x.set(0); y.set(0); };

  const cls = cn(base, variants[variant], disabled && "pointer-events-none opacity-60", className);
  const inner = (
    <>
      {variant === "primary" && (
        <span aria-hidden className="absolute inset-0 -z-0 bg-gradient-to-r from-gold to-gold-light opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      )}
      <span className={cn("relative z-10 inline-flex items-center gap-2", variant === "primary" && "group-hover:text-ink")}>
        {children}
      </span>
    </>
  );

  let el: React.ReactNode;
  if (href && download !== undefined) {
    el = <a href={href} download={download} className={cls} {...rest}>{inner}</a>;
  } else if (href && external) {
    el = <a href={href} target="_blank" rel="noopener noreferrer" className={cls} {...rest}>{inner}</a>;
  } else if (href && /^(tel:|mailto:)/.test(href)) {
    el = <a href={href} className={cls} {...rest}>{inner}</a>;
  } else if (href) {
    el = <Link href={href} className={cls} onClick={onClick} {...rest}>{inner}</Link>;
  } else {
    el = <button type={type} onClick={onClick} disabled={disabled} className={cls} {...rest}>{inner}</button>;
  }

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      whileTap={{ scale: 0.96 }}
      onPointerMove={onMove}
      onPointerLeave={reset}
      className="inline-block"
    >
      {el}
    </motion.div>
  );
}

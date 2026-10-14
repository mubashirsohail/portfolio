"use client";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

/** Animated label + heading + gradient divider reveal. */
export function SectionHeading({
  label,
  children,
  align = "left",
  className,
  as: Tag = "h2",
}: {
  label: string;
  children: React.ReactNode;
  align?: "left" | "center";
  className?: string;
  as?: "h1" | "h2";
}) {
  const ease = [0.22, 1, 0.36, 1] as const;
  return (
    <div className={cn("mb-12 sm:mb-16", align === "center" && "text-center", className)}>
      <motion.p
        className={cn(
          "mb-4 inline-flex items-center gap-3 font-mono text-xs font-medium uppercase tracking-[0.28em] text-gold",
          align === "center" && "justify-center",
        )}
        initial={{ opacity: 0, x: -16 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.6, ease }}
      >
        <span className="relative h-px w-8 overflow-hidden bg-gold/40">
          <span className="absolute inset-y-0 left-0 w-full animate-sweep bg-gold-light motion-decor" />
        </span>
        {label}
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, ease, delay: 0.08 }}
      >
        <Tag className="font-display text-3xl font-semibold leading-[1.1] tracking-tight text-fg sm:text-4xl lg:text-5xl">
          {children}
        </Tag>
      </motion.div>
      <motion.div
        className={cn("divider-line mt-6 h-px w-24 origin-left", align === "center" && "mx-auto origin-center")}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease, delay: 0.25 }}
      />
    </div>
  );
}

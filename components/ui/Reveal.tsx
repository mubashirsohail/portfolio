"use client";
import { motion, type Variants } from "motion/react";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

const item: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease } },
};

/** Scroll-triggered fade/slide-in. Runs once. Reduced motion → opacity only (via MotionConfig). */
export function Reveal({
  children,
  className,
  delay = 0,
  x = 0,
  y = 28,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  x?: number;
  y?: number;
  as?: "div" | "li" | "section" | "article";
}) {
  const M = motion[as];
  return (
    <M
      className={className}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.2, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.7, ease, delay }}
    >
      {children}
    </M>
  );
}

/** Container whose <StaggerItem> children animate in sequence on scroll. */
export function Stagger({
  children,
  className,
  gap = 0.09,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  gap?: number;
  as?: "div" | "ul" | "ol";
}) {
  const M = motion[as];
  return (
    <M
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15, margin: "0px 0px -8% 0px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: gap } } }}
    >
      {children}
    </M>
  );
}

export function StaggerItem({
  children,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "li";
}) {
  const M = motion[as];
  return (
    <M className={cn(className)} variants={item}>
      {children}
    </M>
  );
}

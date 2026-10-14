"use client";
import { useState } from "react";
import { motion } from "motion/react";
import { process } from "@/data/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionBackdrop } from "@/components/effects/AnimatedBackground";
import { cn } from "@/lib/utils";

export function Process() {
  const [current, setCurrent] = useState(0);
  return (
    <section id="process" className="section-pad relative isolate bg-charcoal">
      <SectionBackdrop tone="gold" />
      <div className="container-x">
        <SectionHeading label="DEVELOPMENT PROCESS">
          From Idea to <span className="gradient-text">Production.</span>
        </SectionHeading>
        <ol className="grid gap-6 lg:grid-cols-4 lg:gap-0">
          {process.map((p, i) => {
            const Icon = p.icon;
            const on = current === i;
            return (
              <motion.li
                key={p.step}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 }}
                className="relative lg:px-3"
              >
                {/* connector */}
                {i < process.length - 1 && (
                  <motion.span
                    aria-hidden
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, delay: 0.3 + i * 0.2 }}
                    className="absolute left-[calc(100%-0.75rem)] top-9 z-0 hidden h-px w-6 origin-left bg-gradient-to-r from-gold to-brand lg:block"
                  />
                )}
                <motion.div
                  onViewportEnter={() => setCurrent(i)}
                  viewport={{ amount: 0.7 }}
                  className={cn(
                    "relative z-10 h-full rounded-2xl border bg-card p-6 transition-all duration-500",
                    on ? "border-gold/70 shadow-[0_0_40px_-10px_rgba(212,175,55,0.55)]" : "border-white/10",
                  )}
                >
                  <div className="mb-5 flex items-center justify-between">
                    <span className={cn("grid h-12 w-12 place-items-center rounded-xl border transition-colors duration-500", on ? "border-gold bg-gold/15 text-gold-light" : "border-white/15 text-muted")}>
                      <Icon className="h-6 w-6" />
                    </span>
                    <span className="gradient-text font-display text-4xl font-semibold">{p.step}</span>
                  </div>
                  <h3 className="font-display text-lg font-semibold">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{p.description}</p>
                </motion.div>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

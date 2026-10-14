"use client";
import { useRef } from "react";
import { motion, useScroll, useSpring, useReducedMotion } from "motion/react";
import { Building2, CalendarDays } from "lucide-react";
import { experienceGroups, role } from "@/data/experience";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { GradientBorderCard } from "@/components/ui/GradientBorderCard";
import { TechChip } from "@/components/ui/TechChip";
import { SectionBackdrop } from "@/components/effects/AnimatedBackground";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { cn } from "@/lib/utils";

export function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const wide = useMediaQuery("(min-width: 1024px)");
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 24, restDelta: 0.001 });

  return (
    <section id="experience" className="section-pad relative isolate bg-charcoal">
      <SectionBackdrop tone="red" />
      <div className="container-x">
        <SectionHeading label="CAREER JOURNEY">
          Where I&apos;ve Been <span className="gradient-text">Building.</span>
        </SectionHeading>

        <Reveal>
          <GradientBorderCard featured className="mb-14">
            <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
              <div>
                <p className="font-display text-2xl font-semibold sm:text-3xl">{role.position}</p>
                <p className="mt-2 inline-flex items-center gap-2 text-muted">
                  <Building2 className="h-4 w-4 text-gold" /> {role.organization}
                </p>
              </div>
              <p className="inline-flex w-fit items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-2 font-mono text-sm text-gold-light">
                <CalendarDays className="h-4 w-4" /> {role.period}
              </p>
            </div>
          </GradientBorderCard>
        </Reveal>

        <div ref={ref} className="relative">
          {/* track + progressive fill */}
          <div aria-hidden className="absolute bottom-0 left-4 top-0 w-px bg-white/10 lg:left-1/2" />
          <motion.div
            aria-hidden
            style={{ scaleY: reduce ? 1 : scaleY }}
            className="absolute bottom-0 left-4 top-0 w-px origin-top bg-gradient-to-b from-brand via-gold to-gold-light lg:left-1/2"
          />
          <ol className="space-y-10">
            {experienceGroups.map((g, i) => {
              const Icon = g.icon;
              const left = i % 2 === 0;
              return (
                <li key={g.id} className="relative pl-12 lg:grid lg:grid-cols-2 lg:gap-16 lg:pl-0">
                  <motion.span
                    aria-hidden
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, amount: 0.8 }}
                    transition={{ type: "spring", stiffness: 260, damping: 16 }}
                    className="absolute left-4 top-8 z-10 grid h-8 w-8 -translate-x-1/2 place-items-center rounded-full border-2 border-gold bg-ink font-mono text-xs font-bold text-gold-light shadow-[0_0_20px_-2px_rgba(212,175,55,0.6)] lg:left-1/2"
                  >
                    {i + 1}
                  </motion.span>
                  <Reveal
                    key={wide ? "wide" : "narrow"}
                    x={wide ? (left ? -48 : 48) : 0}
                    y={wide ? 0 : 28}
                    className={cn(!left && "lg:col-start-2")}
                  >
                    <GradientBorderCard>
                      <div className="p-6">
                        <div className="mb-4 flex items-center gap-3">
                          <span className="grid h-10 w-10 place-items-center rounded-lg border border-brand/40 bg-brand/10 text-red-300">
                            <Icon className="h-5 w-5" />
                          </span>
                          <h3 className="font-display text-xl font-semibold">{g.title}</h3>
                        </div>
                        <ul className="space-y-3 text-sm leading-relaxed text-muted">
                          {g.items.map((t) => (
                            <li key={t} className="flex gap-3">
                              <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                              {t}
                            </li>
                          ))}
                        </ul>
                        <div className="mt-5 flex flex-wrap gap-2">
                          {g.tags.map((t) => <TechChip key={t}>{t}</TechChip>)}
                        </div>
                      </div>
                    </GradientBorderCard>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

"use client";
import { motion } from "motion/react";
import { skillCategories } from "@/data/skills";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { GradientBorderCard } from "@/components/ui/GradientBorderCard";
import { TechChip } from "@/components/ui/TechChip";
import { SectionBackdrop } from "@/components/effects/AnimatedBackground";

const span = ["lg:col-span-3", "lg:col-span-3", "lg:col-span-2", "lg:col-span-2", "lg:col-span-2"];

export function Skills() {
  return (
    <section id="skills" className="section-pad relative isolate bg-charcoal">
      <SectionBackdrop tone="red" />
      <div className="container-x">
        <SectionHeading label="TECHNICAL SKILLS">
          A Full Stack of <span className="gradient-text">Capabilities.</span>
        </SectionHeading>
        <Stagger className="grid gap-5 md:grid-cols-2 lg:grid-cols-6">
          {skillCategories.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <StaggerItem key={cat.id} className={span[i]}>
                <motion.div whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 300, damping: 22 }} className="h-full">
                  <GradientBorderCard className="h-full">
                    <div className="group/card p-6">
                      <div className="mb-5 flex items-center gap-4">
                        <span className="grid h-12 w-12 place-items-center rounded-xl border border-gold/30 bg-gold/10 text-gold-light transition-all duration-500 group-hover:rotate-[8deg] group-hover:border-gold group-hover:shadow-[0_0_24px_-2px_rgba(212,175,55,0.55)]">
                          <Icon className="h-6 w-6" />
                        </span>
                        <div>
                          <h3 className="font-display text-lg font-semibold">{cat.title}</h3>
                          <p className="text-xs text-muted">{cat.description}</p>
                        </div>
                      </div>
                      <ul className="flex flex-wrap gap-2">
                        {cat.skills.map((s) => (
                          <li key={s}><TechChip>{s}</TechChip></li>
                        ))}
                      </ul>
                    </div>
                  </GradientBorderCard>
                </motion.div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}

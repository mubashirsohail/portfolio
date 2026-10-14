"use client";
import { motion, type Variants } from "motion/react";
import { MapPin, Briefcase, Download, ChevronDown } from "lucide-react";
import { hero, personal } from "@/data/personal";
import { AnimatedBackground } from "@/components/effects/AnimatedBackground";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { HeroVisual } from "./HeroVisual";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.35 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(8px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

export function Hero() {
  return (
    <section id="home" className="relative isolate flex min-h-[100svh] items-center overflow-hidden px-4 pb-24 pt-28 sm:px-6 lg:px-8">
      <AnimatedBackground />
      <div className="mx-auto grid w-full max-w-7xl items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.p variants={item} className="mb-6 inline-flex items-center gap-3 font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-gold sm:text-xs">
            <span aria-hidden className="h-px w-8 bg-gold" />
            {hero.eyebrow}
          </motion.p>

          <h1>
            <motion.span variants={item} className="block font-display text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
              {personal.name}
            </motion.span>
            <motion.span variants={item} className="mt-3 block font-display text-2xl font-medium sm:text-3xl">
              <span className="gradient-text gradient-text-animated">{personal.title}</span>
            </motion.span>
          </h1>

          <motion.p variants={item} className="mt-8 max-w-2xl text-xl font-semibold leading-snug text-fg sm:text-2xl">
            Building <span className="gradient-text">Scalable Digital Products</span> &amp;{" "}
            <span className="gradient-text">Intelligent AI Solutions</span>.
          </motion.p>

          <motion.p variants={item} className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            {hero.supporting}
          </motion.p>

          <motion.ul variants={item} className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-sm text-fg/90">
            <li className="inline-flex items-center gap-2"><MapPin className="h-4 w-4 text-gold" /> {hero.locationLabel}</li>
            <li className="inline-flex items-center gap-2"><Briefcase className="h-4 w-4 text-gold" /> {personal.experienceLabel}</li>
          </motion.ul>

          <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-4">
            <AnimatedButton href="/projects">{hero.primaryCta}</AnimatedButton>
            <AnimatedButton href="/#contact" variant="secondary">{hero.secondaryCta}</AnimatedButton>
            <AnimatedButton href={personal.cv.path} download={personal.cv.filename} variant="ghost">
              <Download className="h-4 w-4" /> {hero.cvCta}
            </AnimatedButton>
          </motion.div>
        </motion.div>

        <HeroVisual />
      </div>

      <motion.a
        href="#about"
        aria-label="Scroll to About section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 font-mono text-[10px] uppercase tracking-[0.3em] text-muted transition-colors hover:text-gold sm:flex"
      >
        Scroll
        <ChevronDown className="h-4 w-4 animate-bob" />
      </motion.a>
    </section>
  );
}

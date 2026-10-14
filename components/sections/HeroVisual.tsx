"use client";
import { motion } from "motion/react";
import { Brain, Cloud, Container, Workflow, Code2 } from "lucide-react";
import { personal } from "@/data/personal";
import Image from "next/image";

const chips = [
  { icon: Code2, label: "Next.js", pos: "left-[-2%] top-[14%]", delay: 0 },
  { icon: Brain, label: "Generative AI", pos: "right-[-4%] top-[22%]", delay: 1.2 },
  { icon: Cloud, label: "AWS", pos: "left-[-8%] top-[46%]", delay: 0.6 },
  { icon: Container, label: "Docker", pos: "right-[0%] bottom-[10%]", delay: 1.8 },
  { icon: Workflow, label: "n8n", pos: "right-[22%] top-[-3%]", delay: 2.4 },
];

/**
 * Abstract hero composition. The arch is a clearly replaceable portrait
 * placeholder — drop a real photo in public/images and swap the inner <div>.
 */
export function HeroVisual() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
      className="relative mx-auto aspect-[4/5] w-full max-w-[26rem] sm:max-w-[30rem]"
    >
      {/* soft golden glow */}
      <div aria-hidden className="absolute inset-[-15%] bg-[radial-gradient(circle,rgba(212,175,55,0.28),transparent_62%)]" />
      {/* rotating ring */}
      <div aria-hidden className="motion-decor absolute inset-[6%] animate-spinSlow rounded-full border border-dashed border-gold/30 [animation-duration:60s]" />
      <div aria-hidden className="absolute inset-[14%] rounded-full border border-brand/30" />

      {/* portrait placeholder arch */}
      <div className="absolute inset-x-[14%] inset-y-[4%] overflow-hidden rounded-t-[999px] rounded-b-3xl border border-gold/40 bg-gradient-to-b from-[#1c1c1c] to-ink shadow-[0_30px_80px_-20px_rgba(164,22,26,0.7)]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_25%,rgba(230,57,70,0.4),transparent_60%),radial-gradient(ellipse_at_50%_110%,rgba(212,175,55,0.35),transparent_55%)]" />
        <div className="grid-pattern absolute inset-0 opacity-70" />
        <div className="absolute inset-0 flex flex-col items-center justify-start gap-3">
          <img src={'/images/pic.png'}/>
        </div>
      </div>

      {/* code card */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[4%] left-[-4%] w-[62%] rounded-xl border border-white/10 bg-ink/85 p-4 font-mono text-[11px] leading-relaxed shadow-2xl backdrop-blur-sm sm:left-[-8%] sm:text-xs"
      >
        <div className="mb-2 flex gap-1.5" aria-hidden>
          <span className="h-2 w-2 rounded-full bg-brand" />
          <span className="h-2 w-2 rounded-full bg-gold" />
          <span className="h-2 w-2 rounded-full bg-gold-light" />
        </div>
        <p><span className="text-brand">const</span> <span className="text-gold-light">engineer</span> = {"{"}</p>
        <p className="pl-3 text-muted">role: <span className="text-gold">&quot;Full-Stack &amp; AI&quot;</span>,</p>
        <p className="pl-3 text-muted">experience: <span className="text-gold">&quot;5+ years&quot;</span>,</p>
        <p>{"}"}</p>
      </motion.div>

      {chips.map(({ icon: Icon, label, pos, delay }) => (
        <motion.div
          key={label}
          aria-hidden
          animate={{ y: [0, -9, 0] }}
          transition={{ duration: 5 + delay, repeat: Infinity, ease: "easeInOut", delay }}
          className={`absolute ${pos} hidden items-center gap-2 rounded-full border border-gold/30 bg-ink/80 px-3 py-1.5 text-xs font-medium text-gold-light backdrop-blur-sm sm:flex`}
        >
          <Icon className="h-3.5 w-3.5" /> {label}
        </motion.div>
      ))}
    </motion.div>
  );
}

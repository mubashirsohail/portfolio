import { Download, Mail, Check } from "lucide-react";
import { about, personal } from "@/data/personal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { GradientBorderCard } from "@/components/ui/GradientBorderCard";
import { TechChip } from "@/components/ui/TechChip";
import { SectionBackdrop } from "@/components/effects/AnimatedBackground";

/** Turns **keyword** markers into highlighted spans. */
function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split(/\*\*(.+?)\*\*/g).map((part, i) =>
        i % 2 ? <strong key={i} className="font-semibold text-gold-light">{part}</strong> : <span key={i}>{part}</span>,
      )}
    </>
  );
}

export function About() {
  return (
    <section id="about" className="section-pad relative isolate bg-ink">
      <SectionBackdrop tone="gold" />
      <div className="container-x grid gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <SectionHeading label={about.label}>
            Engineering the Future Through <span className="gradient-text">Code &amp; AI.</span>
          </SectionHeading>
          <div className="space-y-5 text-base leading-relaxed text-muted sm:text-lg">
            {about.paragraphs.map((p, i) => (
              <Reveal key={i} delay={i * 0.1}><p><Rich text={p} /></p></Reveal>
            ))}
          </div>
          <Reveal delay={0.3} className="mt-9 flex flex-wrap gap-4">
            <AnimatedButton href="/#contact"><Mail className="h-4 w-4" /> Get in Touch</AnimatedButton>
            <AnimatedButton href={personal.cv.path} download={personal.cv.filename} variant="secondary">
              <Download className="h-4 w-4" /> Download CV
            </AnimatedButton>
          </Reveal>
        </div>

        <div className="space-y-6">
          <GradientBorderCard featured>
            <div className="p-6 sm:p-8">
              <p className="mb-5 font-mono text-xs uppercase tracking-[0.25em] text-gold">What I focus on</p>
              <Stagger as="ul" className="grid gap-3 sm:grid-cols-2">
                {about.areas.map((a) => (
                  <StaggerItem as="li" key={a} className="flex items-start gap-3 text-sm text-fg/90">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand to-gold text-ink">
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                    {a}
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </GradientBorderCard>
          <Reveal delay={0.2}>
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-gold">Core technologies</p>
            <div className="flex flex-wrap gap-2">
              {about.techStrip.map((t) => <TechChip key={t}>{t}</TechChip>)}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

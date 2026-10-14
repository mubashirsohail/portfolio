import { strengths } from "@/data/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { SectionBackdrop } from "@/components/effects/AnimatedBackground";

export function Strengths() {
  return (
    <section id="strengths" className="section-pad relative isolate bg-charcoal">
      <SectionBackdrop tone="red" />
      <div className="container-x">
        <SectionHeading label="WHAT I BRING TO EVERY PROJECT">
          Core <span className="gradient-text">Strengths.</span>
        </SectionHeading>
        <Stagger className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {strengths.map((s) => {
            const Icon = s.icon;
            return (
              <StaggerItem key={s.title} className="group relative bg-card p-7 transition-colors duration-300 hover:bg-[#1d1d1d]">
                <span aria-hidden className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-brand to-gold transition-transform duration-500 group-hover:scale-x-100" />
                <Icon className="mb-4 h-7 w-7 text-gold transition-transform duration-300 group-hover:-translate-y-1 group-hover:text-gold-light" />
                <h3 className="font-display text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.description}</p>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}

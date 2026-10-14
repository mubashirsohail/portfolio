import { services } from "@/data/services";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { GradientBorderCard } from "@/components/ui/GradientBorderCard";
import { TechChip } from "@/components/ui/TechChip";
import { ServiceCta } from "@/components/ui/ServiceCta";
import { SectionBackdrop } from "@/components/effects/AnimatedBackground";

export function Services() {
  return (
    <section id="services" className="section-pad relative isolate bg-ink">
      <SectionBackdrop tone="gold" />
      <div className="container-x">
        <SectionHeading label="SERVICES">
          How I Can <span className="gradient-text">Help.</span>
        </SectionHeading>
        <Stagger className="grid gap-6 md:grid-cols-2">
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <StaggerItem key={s.id}>
                <GradientBorderCard className="h-full" innerClassName="flex flex-col">
                  <div className="flex h-full flex-col p-7">
                    <span className="mb-5 grid h-14 w-14 place-items-center rounded-2xl border border-gold/30 bg-gradient-to-br from-brand/25 to-gold/15 text-gold-light transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3">
                      <Icon className="h-7 w-7" />
                    </span>
                    <h3 className="font-display text-xl font-semibold">{s.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted">{s.description}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {s.tech.map((t) => <TechChip key={t}>{t}</TechChip>)}
                    </div>
                    <div className="mt-auto pt-6"><ServiceCta serviceId={s.id} /></div>
                  </div>
                </GradientBorderCard>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}

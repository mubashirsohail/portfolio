import { GraduationCap } from "lucide-react";
import { education } from "@/data/content";
import { Reveal } from "@/components/ui/Reveal";
import { GradientBorderCard } from "@/components/ui/GradientBorderCard";

export function Education() {
  return (
    <section id="education" className="relative bg-ink px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <GradientBorderCard featured>
            <div className="flex items-center gap-6 p-7 sm:p-9">
              <span className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl border border-gold/50 bg-gold/10 text-gold-light">
                <GraduationCap className="h-8 w-8" />
              </span>
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.25em] text-gold">Education</p>
                <h2 className="mt-1 font-display text-2xl font-semibold sm:text-3xl">{education.degree}</h2>
                <p className="mt-1 text-muted">{education.completion}</p>
              </div>
            </div>
          </GradientBorderCard>
        </Reveal>
      </div>
    </section>
  );
}

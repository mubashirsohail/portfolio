import { highlights } from "@/data/personal";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";

export function Highlights() {
  return (
    <section aria-label="Professional highlights" className="relative bg-charcoal px-4 py-14 sm:px-6 lg:px-8">
      <div aria-hidden className="divider-line absolute inset-x-0 top-0" />
      <div aria-hidden className="divider-line absolute inset-x-0 bottom-0" />
      <Stagger className="container-x grid grid-cols-2 gap-y-10 lg:grid-cols-4">
        {highlights.map((h, i) => (
          <StaggerItem
            key={h.caption}
            className={`px-4 text-center ${i > 0 ? "lg:border-l lg:border-white/10" : ""} ${i % 2 ? "border-l border-white/10" : ""}`}
          >
            <p className="gradient-text font-display text-3xl font-semibold leading-tight sm:text-4xl">{h.value}</p>
            {h.label && <p className="mt-1 text-sm font-semibold text-fg">{h.label}</p>}
            <p className="mt-1 text-sm text-muted">{h.caption}</p>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}

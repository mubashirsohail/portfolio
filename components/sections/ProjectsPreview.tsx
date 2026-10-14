import { ArrowRight } from "lucide-react";
import { projects } from "@/data/projects";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem, Reveal } from "@/components/ui/Reveal";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { SectionBackdrop } from "@/components/effects/AnimatedBackground";

export function ProjectsPreview() {
  return (
    <section id="projects" className="section-pad relative isolate bg-ink">
      <SectionBackdrop tone="gold" />
      <div className="container-x">
        <SectionHeading label="FEATURED PROJECTS">
          Selected <span className="gradient-text">Work &amp; Concepts.</span>
        </SectionHeading>
        <Reveal>
          <p className="-mt-6 mb-10 max-w-2xl text-sm text-muted sm:text-base">
            Each project is labelled honestly as completed, in progress, or a concept. No demos or repositories are
            shown unless they exist.
          </p>
        </Reveal>
        <Stagger as="div" className="grid gap-6 md:grid-cols-2">
          {projects.map((p) => (
            <StaggerItem key={p.slug}>
              <ProjectCard project={p} featured={p.featured} />
            </StaggerItem>
          ))}
        </Stagger>
        <Reveal className="mt-12 text-center">
          <AnimatedButton href="/projects" variant="secondary">
            View All Projects <ArrowRight className="h-4 w-4" />
          </AnimatedButton>
        </Reveal>
      </div>
    </section>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, Info } from "lucide-react";
import { getProject, projects, statusMeta } from "@/data/projects";
import { ProjectVisual } from "@/components/ui/ProjectVisual";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { TechChip } from "@/components/ui/TechChip";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { AnimatedBackground } from "@/components/effects/AnimatedBackground";
import { GradientBorderCard } from "@/components/ui/GradientBorderCard";
import { GithubIcon } from "@/components/ui/BrandIcons";
import { externalProps } from "@/lib/utils";

type Params = { slug: string };

export const dynamicParams = false;
export const generateStaticParams = () => projects.map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const p = getProject((await params).slug);
  return p ? { title: p.title, description: p.description } : {};
}

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const project = getProject((await params).slug);
  if (!project) notFound();
  const { title, category, status, description, scope, tech, visual, links } = project;
  const hasProposed = tech.some((t) => t.proposed);
  const serviceFor: Record<string, string> = {
    "full-stack": "full-stack", "healthcare-software": "full-stack", "artificial-intelligence": "ai-agents", "web-development": "full-stack",
  };
  const serviceId = serviceFor[category.toLowerCase().replace(/[^a-z]+/g, "-")] ?? "other";

  return (
    <article className="relative isolate overflow-hidden px-4 pb-24 pt-28 sm:px-6 lg:px-8">
      <AnimatedBackground />
      <div className="container-x max-w-5xl">
        <Reveal>
          <Link href="/projects" className="mb-8 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-gold-light">
            <ArrowLeft className="h-4 w-4" /> All projects
          </Link>
        </Reveal>

        <Reveal className="flex flex-wrap items-center gap-3">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-gold">{category}</span>
          <StatusBadge status={status} />
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="mt-4 font-display text-4xl font-semibold leading-tight sm:text-6xl">
            <span className="gradient-text">{title}</span>
          </h1>
        </Reveal>
        <Reveal delay={0.1}><p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted">{description}</p></Reveal>

        <Reveal delay={0.15} className="mt-10 overflow-hidden rounded-2xl border border-gold/30">
          <ProjectVisual kind={visual} />
        </Reveal>

        <div className="mt-12 grid gap-8 md:grid-cols-[1.2fr_0.8fr]">
          <Reveal>
            <h2 className="mb-4 font-display text-2xl font-semibold">Scope</h2>
            <Stagger as="ul" className="space-y-3">
              {scope.map((s) => (
                <StaggerItem as="li" key={s} className="flex items-center gap-3 text-fg/90">
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-gradient-to-br from-brand to-gold text-ink"><Check className="h-3 w-3" strokeWidth={3} /></span>
                  {s}
                </StaggerItem>
              ))}
            </Stagger>
          </Reveal>
          <Reveal delay={0.1}>
            <GradientBorderCard>
              <div className="space-y-5 p-6">
                <div>
                  <h2 className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-gold">{hasProposed ? "Proposed technologies" : "Technologies"}</h2>
                  <div className="flex flex-wrap gap-2">{tech.map((t) => <TechChip key={t.name} proposed={t.proposed}>{t.name}</TechChip>)}</div>
                </div>
                <div className="flex gap-3 rounded-lg border border-white/10 bg-white/[0.03] p-3 text-sm text-muted">
                  <Info className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                  <p>
                    <strong className="text-fg">{statusMeta[status].label}.</strong> {statusMeta[status].note}
                    {hasProposed && " Technologies marked as proposed have not been verified as implemented."}
                    {!links?.live && !links?.github && " No public repository or live demo is available."}
                  </p>
                </div>
                {(links?.github || links?.live) && (
                  <div className="flex flex-wrap gap-4 text-sm font-medium">
                    {links.github && <a href={links.github} {...externalProps} className="inline-flex items-center gap-2 text-gold-light hover:text-fg"><GithubIcon className="h-4 w-4" /> GitHub</a>}
                    {links.live && <a href={links.live} {...externalProps} className="text-gold-light hover:text-fg">Live demo ↗</a>}
                  </div>
                )}
              </div>
            </GradientBorderCard>
          </Reveal>
        </div>

        <Reveal className="mt-14 flex flex-wrap gap-4">
          <AnimatedButton href={`/?service=${serviceId}#contact`}>Discuss a Project Like This</AnimatedButton>
          <AnimatedButton href="/projects" variant="secondary">Back to Projects</AnimatedButton>
        </Reveal>
      </div>
    </article>
  );
}

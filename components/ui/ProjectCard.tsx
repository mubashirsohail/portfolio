"use client";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { GradientBorderCard } from "./GradientBorderCard";
import { ProjectVisual } from "./ProjectVisual";
import { StatusBadge } from "./StatusBadge";
import { TechChip } from "./TechChip";
import { GithubIcon } from "./BrandIcons";
import { externalProps } from "@/lib/utils";

export function ProjectCard({ project, featured = false }: { project: Project; featured?: boolean }) {
  const { slug, title, category, status, description, tech, visual, links } = project;
  const hasProposed = tech.some((t) => t.proposed);
  return (
    <GradientBorderCard featured={featured} className="h-full" innerClassName="flex flex-col">
      <Link href={`/projects/${slug}`} className="block overflow-hidden rounded-t-[calc(1rem-1px)]" tabIndex={-1} aria-hidden>
        <div className="transition-transform duration-700 ease-out group-hover:scale-[1.06]">
          <ProjectVisual kind={visual} />
        </div>
      </Link>
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-gold">{category}</span>
          <StatusBadge status={status} />
        </div>
        <h3 className="font-display text-2xl font-semibold text-fg">
          <Link href={`/projects/${slug}`} className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none">
            {title}
          </Link>
        </h3>
        <p className="text-sm leading-relaxed text-muted">{description}</p>
        <div className="flex flex-wrap gap-2">
          {tech.map((t) => (
            <TechChip key={t.name} proposed={t.proposed}>{t.name}</TechChip>
          ))}
        </div>
        {hasProposed && (
          <p className="text-xs text-neutral-500">Dashed tags are proposed technologies, not yet verified as implemented.</p>
        )}
        <div className="relative z-10 mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-2 text-sm font-medium">
          <span className="inline-flex items-center gap-1.5 text-gold-light transition-all group-hover:gap-2.5">
            View details <ArrowUpRight className="h-4 w-4" />
          </span>
          {links?.github && (
            <a href={links.github} {...externalProps} className="inline-flex items-center gap-1.5 text-muted hover:text-fg">
              <GithubIcon className="h-4 w-4" /> GitHub
            </a>
          )}
          {links?.live && (
            <a href={links.live} {...externalProps} className="inline-flex items-center gap-1.5 text-muted hover:text-fg">
              Live demo <ArrowUpRight className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>
    </GradientBorderCard>
  );
}

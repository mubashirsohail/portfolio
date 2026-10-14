"use client";
import { useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { projects, projectCategories } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";
import { cn } from "@/lib/utils";

/** Category filter + animated grid for the /projects page. */
export function ProjectsExplorer() {
  const [active, setActive] = useState("All");
  const list = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <div>
      <div role="group" aria-label="Filter projects by category" className="mb-10 flex flex-wrap gap-2">
        {projectCategories.map((c) => {
          const on = c === active;
          return (
            <button
              key={c}
              type="button"
              aria-pressed={on}
              onClick={() => setActive(c)}
              className={cn(
                "relative rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                on ? "border-transparent text-ink" : "border-white/15 text-muted hover:border-gold/60 hover:text-fg",
              )}
            >
              {on && (
                <motion.span
                  layoutId="filter-pill"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-gold to-gold-light"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative">{c}</span>
            </button>
          );
        })}
      </div>

      <p className="sr-only" role="status" aria-live="polite">
        Showing {list.length} {list.length === 1 ? "project" : "projects"}
        {active !== "All" ? ` in ${active}` : ""}.
      </p>

      <LayoutGroup>
        <motion.ul layout className="grid gap-6 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {list.map((p) => (
              <motion.li
                layout
                key={p.slug}
                initial={{ opacity: 0, scale: 0.94, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <ProjectCard project={p} featured={p.featured} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </LayoutGroup>
    </div>
  );
}

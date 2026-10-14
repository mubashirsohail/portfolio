import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectsExplorer } from "@/components/ui/ProjectsExplorer";
import { AnimatedBackground } from "@/components/effects/AnimatedBackground";

export const metadata: Metadata = {
  title: "Projects",
  description: "Selected projects and concepts by Mubashir Sohail — full-stack, healthcare software, AI and web development.",
};

export default function ProjectsPage() {
  return (
    <section className="relative isolate min-h-screen overflow-hidden px-4 pb-24 pt-32 sm:px-6 lg:px-8">
      <AnimatedBackground />
      <div className="container-x">
        <SectionHeading label="PORTFOLIO" as="h1">
          All <span className="gradient-text">Projects.</span>
        </SectionHeading>
        <ProjectsExplorer />
      </div>
    </section>
  );
}

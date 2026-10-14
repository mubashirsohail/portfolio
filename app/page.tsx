import { Hero } from "@/components/sections/Hero";
import { Highlights } from "@/components/sections/Highlights";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { ProjectsPreview } from "@/components/sections/ProjectsPreview";
import { Experience } from "@/components/sections/Experience";
import { Services } from "@/components/sections/Services";
import { Strengths } from "@/components/sections/Strengths";
import { Education } from "@/components/sections/Education";
import { Process } from "@/components/sections/Process";
import { Contact } from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Highlights />
      <About />
      <Skills />
      <ProjectsPreview />
      <Experience />
      <Services />
      <Strengths />
      <Education />
      <Process />
      <Contact />
    </>
  );
}

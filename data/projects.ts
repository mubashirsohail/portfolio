export type ProjectStatus = "completed" | "in-progress" | "concept";
export type ProjectVisualKind = "map" | "health" | "ai" | "web";

export interface ProjectTech {
  name: string;
  /** true = planned/suggested technology, not verified as implemented. */
  proposed: boolean;
}

export interface Project {
  slug: string;
  title: string;
  category: string;
  status: ProjectStatus;
  description: string;
  /** Scope bullets restate the description only — no invented features. */
  scope: string[];
  tech: ProjectTech[];
  visual: ProjectVisualKind;
  featured?: boolean;
  /** Optional links. Leave undefined until they genuinely exist. */
  links?: { github?: string; live?: string };
}

const proposed = (names: string[]): ProjectTech[] => names.map((name) => ({ name, proposed: true }));
const used = (names: string[]): ProjectTech[] => names.map((name) => ({ name, proposed: false }));

export const statusMeta: Record<ProjectStatus, { label: string; note: string }> = {
  completed: { label: "Completed", note: "Built and finished." },
  "in-progress": { label: "In Progress", note: "Ongoing work." },
  concept: { label: "Concept", note: "A design concept — no working demo or repository is published." },
};

export const projects: Project[] = [
  {
    slug: "gotogether",
    title: "GoTogether",
    category: "Full-Stack Application",
    status: "concept",
    description:
      "A location-based lift-sharing concept designed to connect lift providers and seekers through destination matching, ride preferences, verification, and reservation workflows.",
    scope: [
      "Connecting lift providers and lift seekers",
      "Destination matching",
      "Ride preferences",
      "Verification",
      "Reservation workflows",
    ],
    tech: proposed(["Next.js", "React", "Tailwind CSS", "APIs", "MySQL"]),
    visual: "map",
    featured: true,
  },
  {
    slug: "hospital-management-system",
    title: "Hospital Management System",
    category: "Healthcare Software",
    status: "concept",
    description:
      "A healthcare management system concept covering patient tokens, doctor workflows, laboratory operations, prescriptions, staff management, and administrative processes.",
    scope: [
      "Patient tokens",
      "Doctor workflows",
      "Laboratory operations",
      "Prescriptions",
      "Staff management",
      "Administrative processes",
    ],
    tech: proposed(["Next.js", "React", "Tailwind CSS", "Python", "MySQL"]),
    visual: "health",
    featured: true,
  },
  {
    slug: "ai-intelligent-automation",
    title: "AI & Intelligent Automation",
    category: "Artificial Intelligence",
    status: "in-progress",
    description:
      "AI-focused solutions involving machine learning, generative AI, AI agents, and workflow automation to address practical business requirements.",
    scope: ["Machine learning", "Generative AI", "AI agents", "Workflow automation"],
    tech: used(["Machine Learning", "Generative AI", "AI Agents", "n8n"]),
    visual: "ai",
    featured: true,
  },
  {
    slug: "personal-portfolio",
    title: "Personal Portfolio",
    category: "Web Development",
    status: "completed",
    description:
      "A responsive professional portfolio showcasing full-stack engineering, AI capabilities, technical skills, and project experience.",
    scope: ["Full-stack engineering", "AI capabilities", "Technical skills", "Project experience"],
    tech: used(["Next.js", "React", "TypeScript", "Tailwind CSS", "Motion"]),
    visual: "web",
    featured: true,
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
export const projectCategories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];

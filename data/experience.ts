import { Code2, Brain, Cloud, Workflow, type LucideIcon } from "lucide-react";

export const role = {
  organization: "Mansha Virtual Institute of Technology (MIVT)",
  position: "Full-Stack & AI Engineer",
  period: "2021 – Present",
} as const;

export interface ExperienceGroup {
  id: string;
  title: string;
  icon: LucideIcon;
  /** Source responsibilities, lightly edited for readability. */
  items: string[];
  tags: string[];
}

export const experienceGroups: ExperienceGroup[] = [
  {
    id: "full-stack",
    title: "Full-Stack Engineering",
    icon: Code2,
    items: [
      "Develop and maintain full-stack web applications using modern frontend and backend technologies.",
      "Build responsive, user-focused interfaces using HTML, Tailwind CSS, JavaScript, React, and Next.js.",
      "Develop backend services, APIs, and application logic using Python and PHP.",
    ],
    tags: ["HTML", "Tailwind CSS", "JavaScript", "React", "Next.js", "Python", "PHP"],
  },
  {
    id: "ai",
    title: "AI Engineering",
    icon: Brain,
    items: [
      "Design and implement Data Science, Machine Learning, Deep Learning, and Generative AI solutions.",
      "Develop AI agents and intelligent workflows that automate processes and solve practical business problems.",
    ],
    tags: ["Data Science", "Machine Learning", "Deep Learning", "Generative AI", "AI Agents"],
  },
  {
    id: "cloud",
    title: "Cloud & DevOps",
    icon: Cloud,
    items: [
      "Deploy and manage applications using AWS and Vercel.",
      "Use Docker and containerization to improve application portability, consistency, and deployment workflows.",
      "Work with Kubernetes and cloud-native technologies to support scalable application environments.",
    ],
    tags: ["AWS", "Vercel", "Docker", "Kubernetes"],
  },
  {
    id: "automation",
    title: "Automation & Integration",
    icon: Workflow,
    items: ["Create automated workflows and system integrations using n8n and APIs."],
    tags: ["n8n", "APIs", "Workflow Automation"],
  },
];

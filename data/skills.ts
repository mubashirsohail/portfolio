import { Code2, Brain, Cloud, Container, Workflow, type LucideIcon } from "lucide-react";

export interface SkillCategory {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: "full-stack",
    title: "Full-Stack Development",
    description: "Responsive interfaces and application logic.",
    icon: Code2,
    skills: ["HTML", "Tailwind CSS", "JavaScript", "React", "Next.js", "Python", "PHP"],
  },
  {
    id: "ai",
    title: "Artificial Intelligence",
    description: "Data-driven and generative intelligence.",
    icon: Brain,
    skills: ["Data Science", "Machine Learning", "Deep Learning", "Generative AI", "AI Agent Development"],
  },
  {
    id: "cloud",
    title: "Cloud Engineering",
    description: "Shipping and running applications in the cloud.",
    icon: Cloud,
    skills: ["AWS", "Vercel", "Cloud Deployment"],
  },
  {
    id: "devops",
    title: "DevOps & Containers",
    description: "Portable, consistent environments.",
    icon: Container,
    skills: ["Docker", "Kubernetes", "Containerization"],
  },
  {
    id: "automation",
    title: "Automation",
    description: "Connected systems and automated processes.",
    icon: Workflow,
    skills: ["n8n", "Workflow Automation", "API Integration"],
  },
];

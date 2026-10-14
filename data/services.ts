import { Layers, Bot, ServerCog, CloudCog, type LucideIcon } from "lucide-react";

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  tech: string[];
}

export const services: Service[] = [
  {
    id: "full-stack",
    title: "Full-Stack Development",
    description: "Modern, responsive web applications using React, Next.js, Tailwind CSS, Python, and PHP.",
    icon: Layers,
    tech: ["React", "Next.js", "Tailwind CSS", "Python", "PHP"],
  },
  {
    id: "ai-agents",
    title: "AI Solutions & Agent Development",
    description:
      "AI-powered features, generative AI integrations, machine learning solutions, and intelligent agent workflows.",
    icon: Bot,
    tech: ["Generative AI", "Machine Learning", "AI Agents"],
  },
  {
    id: "backend-api",
    title: "Backend & API Engineering",
    description:
      "Backend application logic, API development, authentication integration, and database-connected services.",
    icon: ServerCog,
    tech: ["Python", "PHP", "APIs", "Authentication"],
  },
  {
    id: "cloud-automation",
    title: "Cloud & Workflow Automation",
    description:
      "Cloud deployment, Docker, Kubernetes-related workflows, AWS, Vercel, n8n, and system integrations.",
    icon: CloudCog,
    tech: ["AWS", "Vercel", "Docker", "Kubernetes", "n8n"],
  },
];

/** Options for the contact form's service select. */
export const serviceOptions = [
  ...services.map((s) => ({ value: s.id, label: s.title })),
  { value: "other", label: "Something else / not sure yet" },
] as const;

export const serviceIds = serviceOptions.map((s) => s.value) as string[];

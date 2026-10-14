import {
  Network, Puzzle, Sparkles, Plug, CloudUpload, Cog, Scaling, Users, BookOpen,
  Search, Compass, Hammer, Rocket, type LucideIcon,
} from "lucide-react";

export const strengths: { title: string; description: string; icon: LucideIcon }[] = [
  { title: "Software Architecture", description: "Clear, maintainable structure that holds up as requirements grow.", icon: Network },
  { title: "Problem Solving", description: "Turning complex business requirements into practical technical solutions.", icon: Puzzle },
  { title: "AI Integration", description: "Bringing machine learning and generative AI into real products.", icon: Sparkles },
  { title: "API Development", description: "Well-defined interfaces that connect systems reliably.", icon: Plug },
  { title: "Cloud Deployment", description: "Shipping applications to AWS and Vercel with confidence.", icon: CloudUpload },
  { title: "Automation", description: "Workflows and integrations that remove repetitive manual work.", icon: Cog },
  { title: "Scalable Systems", description: "Containerized, cloud-native foundations built to scale.", icon: Scaling },
  { title: "Team Collaboration", description: "Clear communication and shared ownership across a project.", icon: Users },
  { title: "Continuous Learning", description: "Staying current across web, cloud, and AI technologies.", icon: BookOpen },
];

export const education = {
  degree: "Master of Computer Science",
  completion: "Completed 2021",
} as const;

export const process: { step: string; title: string; description: string; icon: LucideIcon }[] = [
  { step: "01", title: "Discovery", description: "Understand business needs, project goals, and user requirements.", icon: Search },
  { step: "02", title: "Architecture & Planning", description: "Plan the application structure, technology choices, and user experience.", icon: Compass },
  { step: "03", title: "Development & Integration", description: "Build responsive interfaces, backend services, and intelligent features.", icon: Hammer },
  { step: "04", title: "Testing & Deployment", description: "Validate functionality, optimize performance, and prepare for production.", icon: Rocket },
];

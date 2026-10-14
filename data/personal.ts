/**
 * Single source of truth for personal information.
 * Edit values here — components never hard-code them.
 */
export const personal = {
  name: "Mubashir Sohail",
  initials: "MS",
  title: "Full-Stack & AI Engineer",
  location: "Pakistan",
  experienceLabel: "5+ Years of Experience",
  experienceShort: "5+",
  phone: "+92 304 3600066",
  phoneHref: "tel:+923043600066",
  email: "deo.mubashirsohail@gmail.com",
  emailHref: "mailto:deo.mubashirsohail@gmail.com",
  linkedin: "https://www.linkedin.com/in/themubashirsohail",
  github: "https://github.com/mubashirsohail",
  organization: "Mansha Virtual Institute of Technology (MIVT)",
  /**
   * CV download. The PDF at `path` is generated from the verified details in
   * this file (see scripts/generate-cv.py). Replace the file with your own
   * CV at the same path to override it.
   */
  cv: {
    path: "/cv/Mubashir-Sohail-CV.pdf",
    filename: "Mubashir-Sohail-CV.pdf",
  },
  siteDescription:
    "Portfolio of Mubashir Sohail — Full-Stack & AI Engineer with 5+ years of experience building scalable web applications, AI solutions, cloud-native systems and automated workflows.",
} as const;

export const hero = {
  eyebrow: "FULL-STACK DEVELOPMENT · ARTIFICIAL INTELLIGENCE",
  heading: "Building Scalable Digital Products & Intelligent AI Solutions.",
  supporting:
    "I transform complex business requirements into practical, scalable, and production-ready technology solutions through modern web engineering, artificial intelligence, cloud technologies, and automation.",
  locationLabel: "Based in Pakistan",
  primaryCta: "Explore My Projects",
  secondaryCta: "Let's Work Together",
  cvCta: "Download My CV",
} as const;

export const about = {
  label: "ABOUT ME",
  heading: "Engineering the Future Through Code & AI.",
  /** Verbatim summary, split into shorter paragraphs. Keywords are wrapped in **double asterisks**. */
  paragraphs: [
    "**Full-Stack & AI Engineer** with **5+ years** of experience building scalable web applications, intelligent AI solutions, cloud-native systems, and automated workflows.",
    "Skilled in **React**, **Next.js**, **JavaScript**, **Python**, **PHP**, **Data Science**, **Machine Learning**, **Deep Learning**, **Generative AI**, **AI Agent Development**, **AWS**, **Vercel**, **Docker**, **Kubernetes**, and **n8n**.",
    "Passionate about transforming complex business requirements into practical, scalable, and production-ready technology solutions.",
  ],
  areas: [
    "Full-stack application development",
    "AI and machine learning solutions",
    "Intelligent agents and workflow automation",
    "Cloud-native application deployment",
    "API development and system integration",
    "Scalable, maintainable software architecture",
  ],
  techStrip: ["React", "Next.js", "Python", "PHP", "AWS", "Docker", "Kubernetes", "n8n"],
} as const;

export const nav = [
  { label: "Home", href: "/#home", id: "home" },
  { label: "About", href: "/#about", id: "about" },
  { label: "Skills", href: "/#skills", id: "skills" },
  { label: "Projects", href: "/projects", id: "projects" },
  { label: "Experience", href: "/#experience", id: "experience" },
  { label: "Services", href: "/#services", id: "services" },
  { label: "Contact", href: "/#contact", id: "contact" },
] as const;

export const contactCopy = {
  heading: "LET'S BUILD SOMETHING MEANINGFUL.",
  text: "Have an idea, a technical challenge, or an AI-powered product in mind? Let's discuss how we can turn it into a practical solution.",
} as const;

export const footerStatement =
  "Building scalable web applications, intelligent AI solutions, and automated workflows — from idea to production.";

export const highlights = [
  { value: "5+", label: "Years", caption: "Professional Experience" },
  { value: "2021", label: "Master's", caption: "Degree Completion" },
  { value: "Full Stack", label: "", caption: "Web Application Development" },
  { value: "AI Engineering", label: "", caption: "Intelligent Solutions" },
] as const;

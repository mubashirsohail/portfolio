"use client";
import { ArrowRight } from "lucide-react";
import { SELECT_SERVICE_EVENT } from "@/components/sections/ContactForm";

/** Scrolls to the contact form and preselects a service (works on the home page; deep link elsewhere). */
export function ServiceCta({ serviceId }: { serviceId: string }) {
  const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const target = document.getElementById("contact");
    if (!target) return; // not on the home page: fall through to the href deep link
    e.preventDefault();
    window.dispatchEvent(new CustomEvent(SELECT_SERVICE_EVENT, { detail: serviceId }));
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", `/?service=${serviceId}#contact`);
  };
  return (
    <a
      href={`/?service=${serviceId}#contact`}
      onClick={onClick}
      className="group/cta inline-flex items-center gap-2 text-sm font-semibold text-gold-light transition-colors hover:text-fg"
    >
      Discuss a Project
      <ArrowRight className="h-4 w-4 transition-transform group-hover/cta:translate-x-1" />
    </a>
  );
}

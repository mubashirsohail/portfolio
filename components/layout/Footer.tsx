import Link from "next/link";
import { Mail, Phone, Download } from "lucide-react";
import { footerStatement, nav, personal } from "@/data/personal";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { externalProps } from "@/lib/utils";
import { FooterReveal } from "./FooterReveal";

const social =
  "grid h-11 w-11 place-items-center rounded-full border border-white/15 text-muted transition-all duration-300 hover:-translate-y-1 hover:border-gold hover:text-gold-light hover:shadow-[0_0_24px_-4px_rgba(212,175,55,0.55)]";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden border-t border-white/5 bg-charcoal px-4 pb-8 pt-16 sm:px-6 lg:px-8">
      <div aria-hidden className="divider-line absolute inset-x-0 top-0 h-px opacity-80" />
      <div aria-hidden className="pointer-events-none absolute -bottom-40 left-1/2 h-80 w-[40rem] -translate-x-1/2 bg-[radial-gradient(ellipse,rgba(164,22,26,0.3),transparent_70%)]" />
      <FooterReveal>
        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="font-display text-2xl font-semibold uppercase tracking-[0.12em]">{personal.name}</p>
            <p className="gradient-text mt-1 text-sm font-semibold">{personal.title}</p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">{footerStatement}</p>
            <div className="mt-6 flex gap-3">
              <a href={personal.linkedin} {...externalProps} aria-label="LinkedIn profile" className={social}>
                <LinkedinIcon className="h-5 w-5" />
              </a>
              <a href={personal.github} {...externalProps} aria-label="GitHub profile" className={social}>
                <GithubIcon className="h-5 w-5" />
              </a>
              <a href={personal.emailHref} aria-label={`Email ${personal.email}`} className={social}>
                <Mail className="h-5 w-5" />
              </a>
              <a href={personal.phoneHref} aria-label={`Call ${personal.phone}`} className={social}>
                <Phone className="h-5 w-5" />
              </a>
            </div>
          </div>
          <nav aria-label="Footer">
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-gold">Navigate</p>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              {nav.map((n) => (
                <li key={n.id}>
                  <Link href={n.href} className="text-muted transition-colors hover:text-fg">{n.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-gold">Contact</p>
            <ul className="space-y-2 text-sm text-muted">
              <li><a className="hover:text-fg" href={personal.emailHref}>{personal.email}</a></li>
              <li><a className="hover:text-fg" href={personal.phoneHref}>{personal.phone}</a></li>
              <li>{personal.location}</li>
              <li className="pt-2">
                <a href={personal.cv.path} download={personal.cv.filename} className="inline-flex items-center gap-2 font-medium text-gold-light hover:text-fg">
                  <Download className="h-4 w-4" /> Download CV
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mx-auto mt-12 flex max-w-7xl flex-col items-center justify-between gap-2 border-t border-white/5 pt-6 text-xs text-neutral-500 sm:flex-row">
          <p>© {year} {personal.name}. All rights reserved.</p>
          <p>Built with Next.js, Tailwind CSS &amp; Motion.</p>
        </div>
      </FooterReveal>
    </footer>
  );
}

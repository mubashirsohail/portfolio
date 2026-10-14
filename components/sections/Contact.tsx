import { Mail, MapPin, Phone } from "lucide-react";
import { contactCopy, personal } from "@/data/personal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { GradientBorderCard } from "@/components/ui/GradientBorderCard";
import { externalProps } from "@/lib/utils";
import { ContactForm } from "./ContactForm";

const row = "group flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.02] p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/50 hover:bg-white/[0.05]";
const iconBox = "grid h-11 w-11 shrink-0 place-items-center rounded-lg border border-gold/30 bg-gold/10 text-gold-light transition-transform duration-300 group-hover:scale-110";

export function Contact() {
  return (
    <section id="contact" className="section-pad relative isolate overflow-hidden bg-ink">
      <div aria-hidden className="motion-decor pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[40rem] w-[60rem] max-w-full -translate-x-1/2 -translate-y-1/2 animate-float2 bg-[radial-gradient(ellipse,rgba(164,22,26,0.32),transparent_65%)]" />
      <div className="container-x">
        <SectionHeading label="CONTACT" as="h2">
          <span className="gradient-text">LET&apos;S BUILD SOMETHING MEANINGFUL.</span>
        </SectionHeading>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <Reveal><p className="mb-8 max-w-md text-base leading-relaxed text-muted sm:text-lg">{contactCopy.text}</p></Reveal>
            <ul className="space-y-3">
              <Reveal as="li"><div className={row}><span className={iconBox}><MapPin className="h-5 w-5" /></span><span>{personal.location}</span></div></Reveal>
              <Reveal as="li" delay={0.05}><a href={personal.phoneHref} className={row}><span className={iconBox}><Phone className="h-5 w-5" /></span><span>{personal.phone}</span></a></Reveal>
              <Reveal as="li" delay={0.1}><a href={personal.emailHref} className={row}><span className={iconBox}><Mail className="h-5 w-5" /></span><span className="break-all">{personal.email}</span></a></Reveal>
              <Reveal as="li" delay={0.15}><a href={personal.linkedin} {...externalProps} className={row}><span className={iconBox}><LinkedinIcon className="h-5 w-5" /></span><span>LinkedIn profile</span></a></Reveal>
              <Reveal as="li" delay={0.2}><a href={personal.github} {...externalProps} className={row}><span className={iconBox}><GithubIcon className="h-5 w-5" /></span><span>GitHub profile</span></a></Reveal>
            </ul>
          </div>
          <Reveal>
            <GradientBorderCard featured>
              <div className="p-6 sm:p-9"><ContactForm /></div>
            </GradientBorderCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

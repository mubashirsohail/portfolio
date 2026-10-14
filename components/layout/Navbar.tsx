"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { nav, personal } from "@/data/personal";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { cn } from "@/lib/utils";

const SECTION_IDS = nav.map((n) => n.id);

function useActiveSection(enabled: boolean) {
  const [active, setActive] = useState<string>("home");
  useEffect(() => {
    if (!enabled) return;
    const els = SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [enabled]);
  return active;
}

export function Navbar() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const sectionActive = useActiveSection(onHome);
  const active = onHome ? sectionActive : pathname.startsWith("/projects") ? "projects" : "";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  // close on route change; lock body scroll + Escape while open
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-500",
        scrolled || open
          ? "border-white/10 bg-ink/80 backdrop-blur-md"
          : "border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/#home" aria-label={`${personal.name} — home`} className="group flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-lg border border-gold/50 bg-ink font-display text-sm font-bold transition-shadow group-hover:shadow-[0_0_20px_-2px_rgba(212,175,55,0.6)]">
            <span className="gradient-text">{personal.initials}</span>
          </span>
          <span className="hidden font-display text-sm font-semibold uppercase tracking-[0.2em] sm:block">
            {personal.name}
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {nav.map((n) => (
            <Link
              key={n.id}
              href={n.href}
              aria-current={active === n.id ? "page" : undefined}
              className={cn(
                "group relative px-3 py-2 text-sm font-medium transition-colors duration-200",
                active === n.id ? "text-fg" : "text-muted hover:text-fg",
              )}
            >
              {n.label}
              <span className="absolute inset-x-3 bottom-0.5 h-px origin-left scale-x-0 bg-gold transition-transform duration-300 group-hover:scale-x-100" />
              {active === n.id && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-gradient-to-r from-brand to-gold"
                  transition={{ type: "spring", stiffness: 400, damping: 34 }}
                />
              )}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <AnimatedButton href="/#contact" className="px-5 py-2.5">Let&apos;s Talk</AnimatedButton>
          </div>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-lg border border-white/15 text-fg transition-colors hover:border-gold/60 lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            key="menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "calc(100dvh - 4rem)" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-y-auto border-t border-white/10 bg-ink/95 backdrop-blur-md lg:hidden"
          >
            <nav aria-label="Mobile" className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-6 sm:px-6">
              {nav.map((n, i) => (
                <motion.div
                  key={n.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + i * 0.05, duration: 0.4 }}
                >
                  <Link
                    href={n.href}
                    onClick={() => setOpen(false)}
                    aria-current={active === n.id ? "page" : undefined}
                    className={cn(
                      "flex items-center justify-between border-b border-white/5 py-4 font-display text-2xl",
                      active === n.id ? "gradient-text" : "text-fg",
                    )}
                  >
                    {n.label}
                    <span className="font-mono text-xs text-muted">0{i + 1}</span>
                  </Link>
                </motion.div>
              ))}
              <motion.div
                className="pt-6"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <AnimatedButton href="/#contact" className="w-full" magnetic={false} onClick={() => setOpen(false)}>
                  Let&apos;s Talk
                </AnimatedButton>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

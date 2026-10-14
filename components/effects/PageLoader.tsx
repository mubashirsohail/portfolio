"use client";
import { useEffect, useState } from "react";
import { LOADER_KEY } from "@/lib/constants";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

const DURATION = 1500;

/**
 * Intro loader, shown once per browser session. An inline script in <head> sets
 * `data-loader-seen` on <html> for repeat visits so this is hidden with CSS
 * before first paint (no flash). It never blocks the page: it auto-dismisses,
 * has pointer-events disabled, and can be skipped by any key press or click.
 */
export function PageLoader() {
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(LOADER_KEY) === "1";
      sessionStorage.setItem(LOADER_KEY, "1");
    } catch {}
    if (seen || reduce) {
      setVisible(false);
      return;
    }
    const t = setTimeout(() => setVisible(false), DURATION);
    const skip = () => setVisible(false);
    window.addEventListener("keydown", skip, { once: true });
    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", skip);
    };
  }, [reduce]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          data-page-loader
          aria-hidden
          className="pointer-events-none fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink"
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(164,22,26,0.45),transparent_60%)]" />
          <motion.div
            initial={{ opacity: 0, scale: 0.85, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative font-display text-7xl font-semibold tracking-tight sm:text-8xl"
          >
            <span className="gradient-text gradient-text-animated">MS</span>
          </motion.div>
          <div className="relative mt-8 h-px w-40 overflow-hidden bg-white/10">
            <motion.div
              className="h-full origin-left bg-gradient-to-r from-brand via-gold to-gold-light"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: (DURATION - 300) / 1000, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

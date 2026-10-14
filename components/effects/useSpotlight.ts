"use client";
import { useCallback } from "react";

/**
 * Pointer-follow spotlight. Writes --mx/--my CSS variables on the element.
 * Only reacts to a real mouse (never touch/pen) so scrolling is never affected.
 */
export function useSpotlight() {
  return useCallback((e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse") return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  }, []);
}

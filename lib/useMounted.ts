"use client";
import { useSyncExternalStore } from "react";

const noop = () => () => {};
/** True after hydration, false during SSR — hydration-safe without effects. */
export const useMounted = () =>
  useSyncExternalStore(noop, () => true, () => false);

"use client";

import { useEffect } from "react";

const loaders: Record<string, () => Promise<{ default: () => void }>> = {
  google: () => import("./inits/google"),
  meta: () => import("./inits/meta"),
  seo: () => import("./inits/seo"),
  web: () => import("./inits/web"),
};

/** Starts the template behaviour (animations, tabs, two-step form) once the markup is on screen. */
export default function LandingInit({ page }: { page: keyof typeof loaders }) {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".lpx");
    if (!root || root.dataset.inited) return;
    root.dataset.inited = "1";
    loaders[page]().then((m) => m.default());
  }, [page]);
  return null;
}

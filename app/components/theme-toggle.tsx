"use client";

import { useSyncExternalStore } from "react";
import { Switch } from "@neftaliaguilar/ui";

/**
 * The pre-hydration script in `app/layout.tsx` owns the initial value, and
 * `@neftaliaguilar/ui` reads it off `data-theme`. That attribute is the single
 * source of truth, so this subscribes to it rather than keeping a second copy
 * in React state that could drift.
 */
function subscribeToTheme(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}

function getThemeSnapshot() {
  return document.documentElement.getAttribute("data-theme") === "dark";
}

export function setTheme(dark: boolean) {
  const next = dark ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", next);
  try {
    localStorage.setItem("theme", next);
  } catch {}
}

/** Subscribes to `data-theme` on the root element — see `subscribeToTheme`. */
export function useIsDarkTheme() {
  return useSyncExternalStore(
    subscribeToTheme,
    getThemeSnapshot,
    // The server can't know the visitor's theme; the pre-hydration script sets
    // the attribute before paint, and the MutationObserver corrects this on mount.
    () => false,
  );
}

export function ThemeToggle({ className }: { className?: string }) {
  const isDark = useIsDarkTheme();

  return (
    <label className={`flex items-center gap-2 ${className ?? ""}`}>
      <span className="font-mono text-xs text-muted">
        {isDark ? "Dark" : "Light"}
      </span>
      <Switch
        checked={isDark}
        onCheckedChange={setTheme}
        aria-label="Toggle site theme"
      />
    </label>
  );
}

"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import {
  Button,
  Switch,
  Tabs,
  TextField,
  Tooltip,
  TooltipProvider,
} from "@neftaliaguilar/ui";

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

export function HeroNefUiShowcase() {
  const isDark = useSyncExternalStore(
    subscribeToTheme,
    getThemeSnapshot,
    () => false,
  );

  const toggleTheme = (dark: boolean) => {
    const next = dark ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {}
  };

  return (
    <TooltipProvider>
      <div className="overflow-hidden rounded-2xl bg-background shadow-[0_1px_2px_rgba(0,0,0,.06),0_20px_44px_-24px_rgba(0,0,0,.28)]">
        <div className="flex items-center justify-between gap-3 border-b border-border bg-surface px-4 py-2.5">
          <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
            Live · @neftaliaguilar/ui
          </span>
          <label className="flex items-center gap-2">
            <span className="font-mono text-[10px] text-muted">
              {isDark ? "Dark" : "Light"}
            </span>
            <Switch
              checked={isDark}
              onCheckedChange={toggleTheme}
              aria-label="Toggle site theme"
            />
          </label>
        </div>

        <div className="px-4 pb-4 pt-3.5">
          <Tabs defaultValue="actions">
            <Tabs.List aria-label="Component category">
              <Tabs.Trigger value="actions">Actions</Tabs.Trigger>
              <Tabs.Trigger value="forms">Forms</Tabs.Trigger>
            </Tabs.List>

            <Tabs.Content value="actions">
              <p className="mb-3 text-[13px] leading-relaxed text-muted">
                Real exports from the published package — this toggle changes
                the whole site&apos;s theme, not a sandboxed preview.
              </p>
              <div className="flex flex-wrap gap-2">
                <Button variant="solid" size="sm">
                  Solid
                </Button>
                <Button variant="soft" size="sm">
                  Soft
                </Button>
                <Button variant="outline" size="sm">
                  Outline
                </Button>
                <Tooltip content="Describes, never names">
                  <Button variant="ghost" size="sm">
                    Ghost
                  </Button>
                </Tooltip>
              </div>
            </Tabs.Content>

            <Tabs.Content value="forms">
              <div className="flex flex-col gap-3">
                <TextField label="Email" placeholder="you@example.com" />
                <Switch label="Notify on new posts" />
              </div>
            </Tabs.Content>
          </Tabs>
        </div>

        <div className="border-t border-border px-4 py-3">
          <Link
            href="/work/nef-ui"
            className="text-[13px] font-semibold text-[var(--nef-accent-text)] hover:underline"
          >
            Browse the full component library →
          </Link>
        </div>
      </div>
    </TooltipProvider>
  );
}

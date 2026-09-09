"use client";

import { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import {
  Button,
  DropdownMenu,
  Switch,
  Tabs,
  Toast,
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
  const [toastOpen, setToastOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const toggleTheme = (dark: boolean) => {
    const next = dark ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {}
  };

  const copyEmail = () => {
    navigator.clipboard?.writeText("hola@neftaliaguilar.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Toast.Provider swipeDirection="right">
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
                <Tabs.Trigger value="overlays">Overlays</Tabs.Trigger>
                <Tabs.Trigger value="feedback">Feedback</Tabs.Trigger>
              </Tabs.List>

              <Tabs.Content value="actions">
                <p className="mb-3 text-[13px] leading-relaxed text-muted">
                  Real exports from the published package — the switch above
                  changes the whole site&apos;s theme, not a sandboxed preview.
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

              <Tabs.Content value="overlays">
                <p className="mb-3 text-[13px] leading-relaxed text-muted">
                  Roving focus, typeahead, and Escape-to-close come from Radix —
                  this menu is keyboard-navigable out of the box.
                </p>
                <DropdownMenu>
                  <DropdownMenu.Trigger asChild>
                    <Button variant="outline" size="sm">
                      More actions
                    </Button>
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Content align="start">
                    <DropdownMenu.Item shortcut="⌘C" onSelect={copyEmail}>
                      {copied ? "Copied ✓" : "Copy email address"}
                    </DropdownMenu.Item>
                    <DropdownMenu.Item
                      shortcut="⌘G"
                      onSelect={() =>
                        window.open(
                          "https://github.com/NeftaAguilar/neftaliaguilar",
                          "_blank",
                        )
                      }
                    >
                      View source on GitHub
                    </DropdownMenu.Item>
                    <DropdownMenu.Separator />
                    <DropdownMenu.Item onSelect={() => toggleTheme(!isDark)}>
                      Switch to {isDark ? "light" : "dark"} theme
                    </DropdownMenu.Item>
                  </DropdownMenu.Content>
                </DropdownMenu>
              </Tabs.Content>

              <Tabs.Content value="feedback">
                <p className="mb-3 text-[13px] leading-relaxed text-muted">
                  Announced via <code>aria-live</code>, dismissible with a swipe
                  — accessible by default, not bolted on after.
                </p>
                <Button
                  variant="solid"
                  size="sm"
                  onClick={() => setToastOpen(true)}
                >
                  Show a toast
                </Button>
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

      <Toast
        open={toastOpen}
        onOpenChange={setToastOpen}
        title="Got it — thanks for reaching out"
        description="I reply within one business day, every time."
        tone="success"
      />
      <Toast.Viewport />
    </Toast.Provider>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { emailAddress, links } from "@/lib/links";
import { setTheme, useIsDarkTheme } from "@/app/components/theme-toggle";
import {
  Button,
  DropdownMenu,
  Tabs,
  Toast,
  Tooltip,
  TooltipProvider,
} from "@neftaliaguilar/ui";

export function HeroNefUiShowcase() {
  const isDark = useIsDarkTheme();
  const [toastOpen, setToastOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const copiedTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );

  useEffect(() => () => clearTimeout(copiedTimerRef.current), []);

  const copyEmail = () => {
    navigator.clipboard
      ?.writeText(emailAddress)
      .then(() => {
        setCopied(true);
        clearTimeout(copiedTimerRef.current);
        copiedTimerRef.current = setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => {});
  };

  return (
    <Toast.Provider swipeDirection="right">
      <TooltipProvider>
        <div className="overflow-hidden rounded-2xl bg-background shadow-[0_1px_2px_rgba(0,0,0,.06),0_20px_44px_-24px_rgba(0,0,0,.28)]">
          <div className="flex items-center justify-between gap-3 border-b border-border bg-surface px-4 py-2.5">
            <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
              Live · @neftaliaguilar/ui
            </span>
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
                  Real exports from the published package, not a sandboxed
                  preview — the same build the theme switch in the nav drives.
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
                  Roving focus, typeahead, and Escape-to-close come from{" "}
                  <Link href="/work/nef-ui" className="underline">
                    Radix — deliberately, with Base UI tracked as its likely
                    successor
                  </Link>
                  .
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
                        window.open(links.source, "_blank", "noopener")
                      }
                    >
                      View source on GitHub
                    </DropdownMenu.Item>
                    <DropdownMenu.Separator />
                    <DropdownMenu.Item onSelect={() => setTheme(!isDark)}>
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
            <p className="mb-1.5 font-mono text-[9.5px] uppercase tracking-[0.1em] text-muted">
              CSS Modules · Radix Primitives · Motion
            </p>
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

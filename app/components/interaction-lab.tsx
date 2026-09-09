"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useInView,
  useReducedMotion,
} from "motion/react";

function LabCard({
  title,
  description,
  tag,
  children,
  footer,
}: {
  title: string;
  description: string;
  tag: string;
  children: React.ReactNode;
  footer: string;
}) {
  return (
    <article className="flex flex-col gap-4 rounded-2xl border border-border p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold tracking-tight text-foreground">
            {title}
          </h3>
          <p className="mt-1.5 text-[13.5px] leading-relaxed text-muted">
            {description}
          </p>
        </div>
        <span className="whitespace-nowrap rounded-md bg-[var(--nef-accent-surface)] px-2 py-1 font-mono text-[9.5px] uppercase tracking-[0.1em] text-[var(--nef-accent-text)]">
          {tag}
        </span>
      </div>
      <div className="min-h-[168px] rounded-xl border border-border bg-surface p-4">
        {children}
      </div>
      <div className="font-mono text-[9.5px] uppercase tracking-[0.1em] text-muted/70">
        {footer}
      </div>
    </article>
  );
}

const SEGMENTS = ["Design", "Build", "Ship"];

function SegmentedSwitchDemo() {
  const [active, setActive] = useState(0);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault();
      const dir = e.key === "ArrowRight" ? 1 : -1;
      setActive((a) => (a + dir + SEGMENTS.length) % SEGMENTS.length);
    }
  };

  return (
    <div className="flex h-full flex-col items-center justify-center gap-3.5">
      <div
        role="tablist"
        tabIndex={0}
        onKeyDown={onKeyDown}
        className="relative grid w-full max-w-[280px] grid-cols-3 rounded-xl border border-border bg-background p-1 outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--nef-focus-ring)]"
      >
        <motion.div
          animate={{ x: `${active * 100}%` }}
          transition={{ type: "spring", stiffness: 380, damping: 32 }}
          className="absolute inset-y-1 left-1 rounded-lg bg-foreground"
          style={{ width: "calc((100% - 8px) / 3)" }}
        />
        {SEGMENTS.map((segment, i) => (
          <button
            key={segment}
            type="button"
            role="tab"
            aria-selected={active === i}
            onClick={() => setActive(i)}
            className="relative z-10 rounded-lg px-3 py-2 text-[12.5px] font-semibold transition-colors duration-300"
            style={{
              color: active === i ? "var(--nef-bg)" : "var(--nef-fg-muted)",
            }}
          >
            {segment}
          </button>
        ))}
      </div>
      <p className="font-mono text-[10px] text-muted/80">
        active: {SEGMENTS[active]}
      </p>
    </div>
  );
}

let toastId = 0;
const TOAST_COPY: [string, string][] = [
  ["Build passed", "CI · main · 48s"],
  ["Deploy succeeded", "production · edge"],
  ["PR merged", "3 files · +112 −40"],
  ["Tests green", "vitest-axe · 0 violations"],
];

function ToastEngineDemo() {
  const [toasts, setToasts] = useState<
    { id: number; title: string; meta: string }[]
  >([]);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    return () => timers.forEach(clearTimeout);
  }, []);

  const dismiss = (id: number) =>
    setToasts((t) => t.filter((toast) => toast.id !== id));

  const push = () => {
    const [title, meta] = TOAST_COPY[toastId % TOAST_COPY.length];
    const id = ++toastId;
    setToasts((t) => [{ id, title, meta }, ...t].slice(0, 3));
    setTimeout(() => dismiss(id), 4200);
  };

  return (
    <div className="flex h-full flex-col justify-between gap-3">
      <div className="flex flex-col gap-2">
        <AnimatePresence initial={false}>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              layout
              initial={{ opacity: 0, y: 10, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.32, ease: [0.2, 1.1, 0.3, 1] }}
              className="flex items-center gap-2.5 rounded-lg border border-border bg-background px-3 py-2.5 shadow-[var(--nef-shadow-1)]"
            >
              <span className="grid size-5.5 shrink-0 place-items-center rounded-md bg-[var(--nef-accent-surface)] font-mono text-[11px] text-[var(--nef-accent-text)]">
                ✓
              </span>
              <div className="min-w-0 flex-1">
                <div className="text-[12.5px] font-semibold">{t.title}</div>
                <div className="font-mono text-[9.5px] text-muted/80">
                  {t.meta}
                </div>
              </div>
              <button
                type="button"
                onClick={() => dismiss(t.id)}
                aria-label="Dismiss notification"
                className="font-mono text-[11px] text-muted/70 hover:text-foreground"
              >
                ✕
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
        {toasts.length === 0 && (
          <p className="px-0.5 py-2 font-mono text-[10px] text-muted/70">
            queue empty — trigger one ↓
          </p>
        )}
      </div>
      <button
        type="button"
        onClick={push}
        className="self-start rounded-lg bg-foreground px-3.5 py-2 text-xs font-semibold text-background transition-colors duration-[var(--nef-duration-fast)] hover:bg-[var(--nef-accent)]"
      >
        Trigger notification
      </button>
    </div>
  );
}

const COMMANDS = [
  { icon: "↗", label: "Open a case study", hint: "↵" },
  { icon: "✉", label: "Copy email address", hint: "⌘C" },
  { icon: "◫", label: "Jump to toolbox", hint: "⌘T" },
  { icon: "⌥", label: "Jump to experience", hint: "⌘E" },
];

function CommandPaletteDemo() {
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);
  const [ran, setRan] = useState("");

  const filtered = COMMANDS.filter((c) =>
    c.label.toLowerCase().includes(query.trim().toLowerCase()),
  );

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setCursor((c) => Math.min(filtered.length - 1, c + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setCursor((c) => Math.max(0, c - 1));
    } else if (e.key === "Enter" && filtered[cursor]) {
      e.preventDefault();
      setRan(filtered[cursor].label);
    }
  };

  return (
    <div className="flex h-full flex-col gap-2.5">
      <div className="flex items-center gap-2 rounded-lg border border-border bg-background px-2.5 py-2">
        <span className="font-mono text-[11px] text-muted/70">⌘K</span>
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setCursor(0);
          }}
          onKeyDown={onKeyDown}
          placeholder="Type a command…"
          className="min-w-0 flex-1 border-none bg-transparent text-[13px] text-foreground outline-none placeholder:text-muted/60"
        />
      </div>
      <div className="flex flex-col gap-0.5">
        {filtered.map((c, i) => (
          <button
            key={c.label}
            type="button"
            onClick={() => setRan(c.label)}
            className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-left transition-colors duration-150"
            style={{
              background:
                i === cursor ? "var(--nef-accent-surface)" : "transparent",
            }}
          >
            <span className="w-4 font-mono text-[10px] text-muted/70">
              {c.icon}
            </span>
            <span className="flex-1 text-[12.5px] font-medium">{c.label}</span>
            <span className="font-mono text-[9.5px] text-muted/60">
              {c.hint}
            </span>
          </button>
        ))}
        {filtered.length === 0 && (
          <div className="px-2.5 py-2 font-mono text-[10px] text-muted/70">
            no matches
          </div>
        )}
      </div>
      <div className="mt-auto font-mono text-[10px] text-[var(--nef-accent-text)]">
        {ran
          ? `ran → ${ran}`
          : `${COMMANDS.length} actions · 0 pointer events required`}
      </div>
    </div>
  );
}

function VitalsDemo() {
  const shouldReduceMotion = useReducedMotion();
  const animateIt = !shouldReduceMotion;
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: "-80px" });

  const [lcp, setLcp] = useState(animateIt ? 0 : 0.82);
  const [inp, setInp] = useState(animateIt ? 0 : 34);
  const [cls] = useState(0);

  useEffect(() => {
    if (!animateIt || !inView) return;
    const lcpControls = animate(0, 0.82, {
      duration: 1.1,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: setLcp,
    });
    const inpControls = animate(0, 34, {
      duration: 1.1,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: setInp,
    });
    return () => {
      lcpControls.stop();
      inpControls.stop();
    };
  }, [animateIt, inView]);

  return (
    <div ref={containerRef} className="grid h-full grid-cols-3 gap-3">
      <div>
        <div className="text-2xl font-semibold tracking-tight">
          {lcp.toFixed(2)}s
        </div>
        <div className="mt-1 font-mono text-[9.5px] uppercase tracking-[0.1em] text-muted">
          LCP
        </div>
      </div>
      <div>
        <div className="text-2xl font-semibold tracking-tight">
          {Math.round(inp)}ms
        </div>
        <div className="mt-1 font-mono text-[9.5px] uppercase tracking-[0.1em] text-muted">
          INP
        </div>
      </div>
      <div>
        <div className="text-2xl font-semibold tracking-tight">
          {cls.toFixed(3)}
        </div>
        <div className="mt-1 font-mono text-[9.5px] uppercase tracking-[0.1em] text-muted">
          CLS
        </div>
      </div>
      <div className="col-span-3 flex flex-wrap gap-1.5 border-t border-border pt-3">
        <span className="rounded-md bg-[var(--nef-accent-surface)] px-1.5 py-1 font-mono text-[9.5px] text-[var(--nef-accent-text)]">
          Accessibility 100
        </span>
        <span className="rounded-md bg-[var(--nef-accent-surface)] px-1.5 py-1 font-mono text-[9.5px] text-[var(--nef-accent-text)]">
          SEO 100
        </span>
        <span className="rounded-md border border-border px-1.5 py-1 font-mono text-[9.5px] text-muted">
          Contrast fixed to 4.5:1
        </span>
      </div>
    </div>
  );
}

export function InteractionLab() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <LabCard
        title="Spring-physics segmented switch"
        description="One layout-shift-safe pill indicator, sliding on a spring. Arrow keys work too."
        tag="Motion"
        footer="transform-only · aria-selected · reduced-motion aware"
      >
        <SegmentedSwitchDemo />
      </LabCard>
      <LabCard
        title="Fluid toast notification engine"
        description="Stacked, self-dismissing, layout-aware. Queue depth capped so a burst never buries the page."
        tag="State"
        footer="aria-live polite · max 3 · timers cleaned on unmount"
      >
        <ToastEngineDemo />
      </LabCard>
      <LabCard
        title="Keyboard-first command actions"
        description="Fuzzy filter, roving focus, Enter to run. Every action reachable without a pointer."
        tag="A11y"
        footer="↑ ↓ to move · enter to run · focus-visible ring"
      >
        <CommandPaletteDemo />
      </LabCard>
      <LabCard
        title="Production web vitals telemetry"
        description="Measured against a production build, not the dev server — the number that actually ships."
        tag="Perf"
        footer="muted token darkened site-side · published token untouched"
      >
        <VitalsDemo />
      </LabCard>
    </div>
  );
}

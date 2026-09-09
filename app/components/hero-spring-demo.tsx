"use client";

import { useState } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
} from "motion/react";

const PRESETS = {
  Snappy: { stiffness: 420, damping: 22 },
  Balanced: { stiffness: 220, damping: 26 },
  Gentle: { stiffness: 130, damping: 34 },
} as const;

export function HeroSpringDemo() {
  const [stiffness, setStiffness] = useState<number>(
    PRESETS.Balanced.stiffness,
  );
  const [damping, setDamping] = useState<number>(PRESETS.Balanced.damping);
  const scale = useMotionValue(1);
  const shouldReduceMotion = useReducedMotion();

  const zeta = damping / (2 * Math.sqrt(stiffness));
  const label = `ζ ${zeta.toFixed(2)} · ${zeta < 1 ? "underdamped" : "settled"}`;

  const run = () => {
    if (shouldReduceMotion) return;
    scale.jump(0.88);
    animate(scale, 1, {
      type: "spring",
      stiffness,
      damping,
      restSpeed: 0.001,
      restDelta: 0.0005,
    });
  };

  const applyPreset = (name: keyof typeof PRESETS) => {
    setStiffness(PRESETS[name].stiffness);
    setDamping(PRESETS[name].damping);
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-background shadow-[var(--nef-shadow-2)]">
      <div className="flex items-center gap-2.5 border-b border-border bg-surface px-3 py-2.5">
        <div className="flex gap-1.5">
          <span className="size-2 rounded-full bg-border-strong" />
          <span className="size-2 rounded-full bg-border-strong" />
          <span className="size-2 rounded-full bg-border-strong" />
        </div>
        <div className="flex-1 rounded-md bg-background px-2 py-1 text-center font-mono text-[10px] text-muted">
          neftaliaguilar.com/lab/spring
        </div>
      </div>

      <div className="px-5 pb-4 pt-5">
        <div className="mb-4 flex items-baseline justify-between gap-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
            Live · spring physics
          </span>
          <span className="font-mono text-[10px] text-muted/80">{label}</span>
        </div>

        <div className="mb-4.5 grid place-items-center rounded-xl border border-border bg-surface px-4 py-6">
          <motion.button
            type="button"
            onClick={run}
            style={{ scale }}
            className="inline-flex items-center gap-2 rounded-xl bg-[var(--nef-accent)] px-5 py-3.5 text-sm font-semibold text-[var(--nef-accent-fg)] shadow-[var(--nef-shadow-2)]"
          >
            <span className="size-2 rounded-sm bg-current opacity-90" />
            Run the spring
          </motion.button>
        </div>

        <div className="grid gap-3.5">
          <label className="block">
            <span className="mb-1.5 flex justify-between font-mono text-[10.5px] uppercase tracking-[0.08em] text-muted">
              Stiffness <span className="text-foreground">{stiffness}</span>
            </span>
            <input
              type="range"
              min={80}
              max={600}
              step={10}
              value={stiffness}
              onChange={(e) => setStiffness(Number(e.target.value))}
              onPointerUp={run}
              className="nef-range w-full"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 flex justify-between font-mono text-[10.5px] uppercase tracking-[0.08em] text-muted">
              Damping <span className="text-foreground">{damping}</span>
            </span>
            <input
              type="range"
              min={6}
              max={60}
              step={1}
              value={damping}
              onChange={(e) => setDamping(Number(e.target.value))}
              onPointerUp={run}
              className="nef-range w-full"
            />
          </label>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={run}
            className="rounded-lg border border-border px-3 py-2 font-mono text-xs font-semibold transition-colors duration-[var(--nef-duration-fast)] hover:border-border-strong"
          >
            Replay
          </button>
          <button
            type="button"
            onClick={() => applyPreset("Snappy")}
            className="rounded-lg border border-border px-3 py-2 font-mono text-xs text-muted transition-colors duration-[var(--nef-duration-fast)] hover:border-[var(--nef-accent)] hover:text-[var(--nef-accent-text)]"
          >
            Snappy
          </button>
          <button
            type="button"
            onClick={() => applyPreset("Gentle")}
            className="rounded-lg border border-border px-3 py-2 font-mono text-xs text-muted transition-colors duration-[var(--nef-duration-fast)] hover:border-[var(--nef-accent)] hover:text-[var(--nef-accent-text)]"
          >
            Gentle
          </button>
          <span className="ml-auto font-mono text-[10px] text-muted/70">
            motion/react · spring
          </span>
        </div>
      </div>
    </div>
  );
}

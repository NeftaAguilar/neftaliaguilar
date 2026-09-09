"use client";

import { useSyncExternalStore } from "react";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import type { BufferWeek } from "@/lib/buffer";

const reducedMotionQuery = "(prefers-reduced-motion: reduce)";

function subscribeToReducedMotion(onChange: () => void) {
  const media = window.matchMedia(reducedMotionQuery);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeToReducedMotion,
    () => window.matchMedia(reducedMotionQuery).matches,
    () => true, // Assume reduced on the server: never animate on first paint.
  );
}

/** Recharts' own tooltip props are generic over value/name types this chart
    doesn't vary; only the datum behind the hovered bar is needed. */
type ChartTooltipProps = {
  active?: boolean;
  payload?: readonly { payload?: BufferWeek }[];
};

function ChartTooltip({ active, payload }: ChartTooltipProps) {
  const point = active ? payload?.[0]?.payload : undefined;
  if (!point) return null;

  const { rangeLabel, posts } = point;
  return (
    <div className="rounded-lg border border-border bg-background px-2.5 py-1.5 shadow-[var(--nef-shadow-2)]">
      <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
        {rangeLabel}
      </p>
      <p className="text-[13px] font-semibold text-foreground">
        {posts} {posts === 1 ? "post" : "posts"}
      </p>
    </div>
  );
}

export function BufferChart({ weeks }: { weeks: BufferWeek[] }) {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <figure className="m-0">
      {/* Recharts renders SVG only; the same numbers as a table keep the
          chart readable to screen readers and to anyone who'd rather read them. */}
      <table className="sr-only">
        <caption>Posts published per week, last {weeks.length} weeks</caption>
        <thead>
          <tr>
            <th scope="col">Week</th>
            <th scope="col">Posts</th>
          </tr>
        </thead>
        <tbody>
          {weeks.map((week) => (
            <tr key={week.weekStart}>
              <th scope="row">{week.rangeLabel}</th>
              <td>{week.posts}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div aria-hidden="true" className="h-[104px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={weeks}
            margin={{ top: 4, right: 0, bottom: 0, left: 0 }}
            barCategoryGap={2}
          >
            <XAxis
              dataKey="axisLabel"
              axisLine={false}
              tickLine={false}
              // Every bucket keeps its slot; only month-opening weeks carry text.
              interval={0}
              tick={{
                fill: "var(--nef-fg-muted)",
                fontSize: 10,
                fontFamily: "var(--font-geist-mono)",
              }}
              // Recharts reserves a 30px band for ticks by default, which
              // over-pads a card this short.
              height={16}
            />
            <Tooltip
              content={ChartTooltip}
              cursor={{ fill: "var(--nef-surface)" }}
            />
            <Bar
              dataKey="posts"
              fill="var(--nef-accent)"
              radius={[4, 4, 0, 0]}
              maxBarSize={18}
              isAnimationActive={!prefersReducedMotion}
              animationDuration={600}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </figure>
  );
}

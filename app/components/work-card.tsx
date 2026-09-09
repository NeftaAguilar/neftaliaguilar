"use client";

import Link from "next/link";
import { ViewTransition } from "react";
import { motion, useReducedMotion } from "motion/react";
import type { CaseStudyMeta } from "@/lib/work";

const MotionLink = motion.create(Link);

export function WorkCard({ study }: { study: CaseStudyMeta }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <MotionLink
      href={`/work/${study.slug}`}
      className="group block rounded-2xl border border-border p-5 transition-[border-color,box-shadow] duration-[var(--nef-duration-normal)] ease-[var(--nef-ease-out)] hover:border-border-strong hover:shadow-[var(--nef-shadow-2)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--nef-focus-ring)]"
      whileHover={shouldReduceMotion ? undefined : { y: -4 }}
      whileTap={shouldReduceMotion ? undefined : { y: -1, scale: 0.99 }}
      transition={{ type: "spring", stiffness: 420, damping: 32 }}
    >
      <p className="text-sm text-muted">
        {study.role} · {study.period}
      </p>
      <ViewTransition name={`work-title-${study.slug}`}>
        <h3 className="mt-2 font-semibold text-foreground group-hover:underline">
          {study.title}
        </h3>
      </ViewTransition>
      <p className="mt-2 text-sm leading-6 text-muted">{study.summary}</p>
      {study.stack.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-2">
          {study.stack.map((tech) => (
            <li
              key={tech}
              className="rounded-md bg-surface px-2.5 py-1 text-xs font-medium text-muted"
            >
              {tech}
            </li>
          ))}
        </ul>
      )}
    </MotionLink>
  );
}

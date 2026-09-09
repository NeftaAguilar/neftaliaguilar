"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";

type Role = {
  company: string;
  role: string;
  period: string;
  location: string;
  highlights: string[];
};

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item: Variants = {
  hidden: { opacity: 0, x: -12 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
  },
};

function Entry({ job }: { job: Role }) {
  return (
    <>
      <span className="absolute -left-[27px] top-1.5 size-2 rounded-full bg-[var(--nef-accent)] shadow-[0_0_0_3px_var(--color-background)]" />
      <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline">
        <h3 className="font-semibold text-foreground">
          {job.role} · {job.company}
        </h3>
        <p className="text-sm text-muted">{job.period}</p>
      </div>
      <p className="text-sm text-muted">{job.location}</p>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-muted">
        {job.highlights.map((highlight) => (
          <li key={highlight}>{highlight}</li>
        ))}
      </ul>
    </>
  );
}

export function ExperienceTimeline({ roles }: { roles: Role[] }) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <div className="space-y-8 border-l border-border pl-6">
        {roles.map((job) => (
          <article key={job.company} className="relative">
            <Entry job={job} />
          </article>
        ))}
      </div>
    );
  }

  return (
    <motion.div
      className="space-y-8 border-l border-border pl-6"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
    >
      {roles.map((job) => (
        <motion.article key={job.company} variants={item} className="relative">
          <Entry job={job} />
        </motion.article>
      ))}
    </motion.div>
  );
}

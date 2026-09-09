"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";

type SkillGroup = {
  label: string;
  skills: string[];
};

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const groupItem: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
};

const tagContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.03, delayChildren: 0.1 } },
};

const tagItem: Variants = {
  hidden: { opacity: 0, y: 6 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
  },
};

function StaticGrid({ groups }: { groups: SkillGroup[] }) {
  return (
    <div className="grid gap-8 sm:grid-cols-2">
      {groups.map((group) => (
        <div key={group.label}>
          <h3 className="text-sm font-semibold text-foreground">
            {group.label}
          </h3>
          <ul className="mt-3 flex flex-wrap gap-2">
            {group.skills.map((skill) => (
              <li
                key={skill}
                className="rounded-md bg-surface px-2.5 py-1 text-xs font-medium text-muted"
              >
                {skill}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export function ToolboxGrid({ groups }: { groups: SkillGroup[] }) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <StaticGrid groups={groups} />;
  }

  return (
    <motion.div
      className="grid gap-8 sm:grid-cols-2"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
    >
      {groups.map((group) => (
        <motion.div key={group.label} variants={groupItem}>
          <h3 className="text-sm font-semibold text-foreground">
            {group.label}
          </h3>
          <motion.ul
            className="mt-3 flex flex-wrap gap-2"
            variants={tagContainer}
          >
            {group.skills.map((skill) => (
              <motion.li
                key={skill}
                variants={tagItem}
                className="rounded-md bg-surface px-2.5 py-1 text-xs font-medium text-muted"
              >
                {skill}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      ))}
    </motion.div>
  );
}

"use client";

import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { Button } from "@/app/ui";

const links = {
  github: "https://github.com/NeftaAguilar",
  linkedin: "https://www.linkedin.com/in/neftaliaguilaralvarez/",
  email: "mailto:hola@neftaliaguilar.com",
};

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

export function HeroIntro() {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <div>
        <p className="text-sm font-medium uppercase tracking-widest text-muted">
          Neftali Aguilar
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
          Senior Software Engineer bridging visual craft and{" "}
          <span className="font-serif font-normal italic">
            scalable frontend architecture.
          </span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
          Senior software engineer focused on design systems, interaction
          detail, and accessibility — React and TypeScript products built on
          component systems teams can trust.
        </p>
        <p className="mt-3 max-w-2xl text-sm text-muted">
          Currently deepening AI-augmented engineering: the Vercel AI SDK, RAG,
          and agentic developer workflows.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild variant="solid" size="lg">
            <Link href="#work">See my work</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <a href={links.email}>Email me</a>
          </Button>
          <Button asChild variant="ghost" size="lg">
            <a href={links.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </Button>
          <Button asChild variant="ghost" size="lg">
            <a href={links.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <motion.div variants={container} initial="hidden" animate="show">
      <motion.p
        variants={item}
        className="text-sm font-medium uppercase tracking-widest text-muted"
      >
        Neftali Aguilar
      </motion.p>
      <motion.h1
        variants={item}
        className="mt-3 text-4xl font-semibold tracking-tight text-balance sm:text-5xl"
      >
        Senior Software Engineer bridging visual craft and{" "}
        <span className="font-serif font-normal italic">
          scalable frontend architecture.
        </span>
      </motion.h1>
      <motion.p
        variants={item}
        className="mt-6 max-w-2xl text-lg leading-8 text-muted"
      >
        Senior software engineer focused on design systems, interaction detail,
        and accessibility — React and TypeScript products built on component
        systems teams can trust.
      </motion.p>
      <motion.p variants={item} className="mt-3 max-w-2xl text-sm text-muted">
        Currently deepening AI-augmented engineering: the Vercel AI SDK, RAG,
        and agentic developer workflows.
      </motion.p>
      <motion.div variants={item} className="mt-8 flex flex-wrap gap-3">
        <Button asChild variant="solid" size="lg">
          <Link href="#work">See my work</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <a href={links.email}>Email me</a>
        </Button>
        <Button asChild variant="ghost" size="lg">
          <a href={links.github} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </Button>
        <Button asChild variant="ghost" size="lg">
          <a href={links.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        </Button>
      </motion.div>
    </motion.div>
  );
}

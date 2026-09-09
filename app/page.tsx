import Link from "next/link";
import { Button } from "./ui";
import { SectionHeading } from "@/app/components/section-heading";
import { PostCard } from "@/app/components/post-card";
import { WorkCard } from "@/app/components/work-card";
import { Reveal } from "@/app/components/reveal";
import { HeroIntro } from "@/app/components/hero-intro";
import { HeroBufferCard } from "@/app/components/hero-buffer-card";
import { SkillsMarquee } from "@/app/components/skills-marquee";
import { InteractionLab } from "@/app/components/interaction-lab";
import { ToolboxGrid } from "@/app/components/toolbox-grid";
import { ExperienceTimeline } from "@/app/components/experience-timeline";
import { getLatestPosts } from "@/lib/posts";
import { getAllCaseStudies } from "@/lib/work";
import { links } from "@/lib/links";

const workflowSteps = [
  {
    title: "Plan with a frontier model",
    description:
      "Use Claude Code with advanced models for planning and architecture decisions on complex tasks and larger features.",
  },
  {
    title: "Delegate execution",
    description:
      "Hand off implementation to smaller, faster models once the plan and architecture are locked in.",
  },
  {
    title: "Iterate in the editor",
    description:
      "Use Cursor as the primary IDE, with integrated AI chat for rapid iteration and quick fixes.",
  },
  {
    title: "Review, ship, monitor",
    description:
      "An end-to-end workflow: task planning → implementation → self code review → pull request creation → monitoring and resolving review comments.",
  },
];

const experience = [
  {
    company: "Couchsurfing",
    role: "Senior Software Engineer",
    period: "Aug 2024 – Present",
    location: "Guadalajara, MX (Hybrid)",
    highlights: [
      "Key contributor to Couchsurfing's next-generation web platform, replacing a legacy application with a modern React, TypeScript, and tRPC architecture alongside a Principal Engineer and distributed teams.",
      "Shape frontend architecture within an Nx monorepo — scalable patterns, shared libraries, and reusable components consumed across product areas.",
      "Own the team's Design System end to end: component API design, token architecture, and Storybook documentation, so product teams build consistent UI without re-deriving spacing or color decisions each time.",
      "Lead performance initiatives across Lighthouse, Core Web Vitals, bundle size, and runtime behavior — treating performance as a design-system concern, not an afterthought.",
      "Investigate and resolve production issues using Grafana.",
    ],
  },
  {
    company: "SoftServe",
    role: "Software Engineer",
    period: "Oct 2023 – Aug 2024",
    location: "Remote",
    highlights: [
      "Led migration of a smart-home e-commerce platform from Ember to React/TypeScript.",
      "Built customer-facing features across Coupons, Fulfillment, and Customer workflows.",
      "Raised engineering standards via ESLint, Prettier, and testing strategy adoption.",
      "Mentored engineers on React, TypeScript, and frontend architecture.",
    ],
  },
  {
    company: "Intel",
    role: "Fullstack Developer",
    period: "Dec 2021 – Oct 2023",
    location: "Remote",
    highlights: [
      "Built and maintained internal engineering platforms used by ~100 engineers.",
      "Designed automated ticket routing workflows, reducing manual triage effort.",
      "Led migration of a corporate platform from WordPress to React/Node.js, cutting page load times from ~9s to ~3.5s.",
    ],
  },
  {
    company: "Oh Travel Marketing",
    role: "Fullstack Developer",
    period: "Apr 2018 – Dec 2021",
    location: "Puerto Vallarta, MX",
    highlights: [
      "Delivered end-to-end software for tourism and hospitality clients, from requirements through production support.",
      "Built a custom event reservation platform with dynamic pricing logic.",
    ],
  },
];

const skillGroups = [
  {
    label: "Frontend",
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "TanStack Query",
      "Storybook",
      "Tailwind CSS",
      "HeroUI",
    ],
  },
  {
    label: "Backend",
    skills: [
      "Node.js",
      "NestJS",
      "tRPC",
      "GraphQL",
      "REST APIs",
      "Prisma",
      "PostgreSQL",
    ],
  },
  {
    label: "Architecture & Engineering",
    skills: [
      "Frontend Architecture",
      "Design Systems",
      "Nx Monorepos",
      "API Design",
      "Performance Optimization",
    ],
  },
  {
    label: "DevOps & Observability",
    skills: [
      "Docker",
      "GitHub Actions",
      "CI/CD",
      "Grafana",
      "Production Debugging",
    ],
  },
  {
    label: "Testing",
    skills: ["Jest", "Cypress", "Unit Testing", "Component Testing"],
  },
  {
    label: "AI & LLM Tooling",
    skills: [
      "Vercel AI SDK",
      "RAG",
      "Claude Code",
      "Cursor",
      "Radix Primitives",
    ],
  },
];

export default function Home() {
  const latestPosts = getLatestPosts(3);
  const caseStudies = getAllCaseStudies();

  return (
    <div className="flex flex-1 flex-col bg-background text-foreground">
      {/* Hero */}
      <header className="mx-auto grid w-full max-w-5xl gap-8 px-6 pb-10 pt-12 sm:px-8 lg:grid-cols-[1.15fr_1fr] lg:items-start">
        <HeroIntro />
        <HeroBufferCard />
      </header>

      <div className="mx-auto w-full max-w-5xl px-6 sm:px-8">
        <SkillsMarquee />
      </div>

      <main
        id="main-content"
        className="mx-auto w-full max-w-5xl flex-1 px-6 sm:px-8"
      >
        {/* Interaction lab */}
        <section
          id="lab"
          aria-labelledby="lab-heading"
          className="border-t border-border py-16"
        >
          <Reveal>
            <SectionHeading
              id="lab-heading"
              eyebrow="Craft, running live"
              title="The interaction lab"
            />
            <p className="mt-4 mb-8 max-w-2xl text-base leading-7 text-muted">
              Touch anything below. Four interactions, hand-built on this
              site&apos;s own{" "}
              <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-sm">
                motion
              </code>{" "}
              dependency: springs, notification choreography, keyboard-first
              commands, and the vitals telemetry that keeps them honest.
            </p>
            <InteractionLab />
          </Reveal>
        </section>

        {/* Selected work */}
        {caseStudies.length > 0 && (
          <section
            id="work"
            aria-labelledby="work-heading"
            className="border-t border-border py-16"
          >
            <Reveal>
              <SectionHeading
                id="work-heading"
                eyebrow="Selected work"
                title="Case studies"
              />
              <div className="space-y-4">
                {caseStudies.map((study) => (
                  <WorkCard key={study.slug} study={study} />
                ))}
              </div>
              <div className="mt-6">
                <Button asChild variant="outline">
                  <Link href="/work">View all work</Link>
                </Button>
              </div>
            </Reveal>
          </section>
        )}

        {/* AI-Augmented Development Workflow */}
        <section
          id="process"
          aria-labelledby="workflow-heading"
          className="border-t border-border py-16"
        >
          <Reveal>
            <SectionHeading
              id="workflow-heading"
              eyebrow="How I build"
              title="AI-augmented development workflow"
            />
            <ol className="grid gap-6 sm:grid-cols-2">
              {workflowSteps.map((step, index) => (
                <li
                  key={step.title}
                  className="rounded-2xl border border-border p-5"
                >
                  <span className="font-mono text-sm font-medium text-[var(--nef-accent-text)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2 font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    {step.description}
                  </p>
                </li>
              ))}
            </ol>
          </Reveal>
        </section>

        {/* Skills */}
        <section
          id="toolbox"
          aria-labelledby="skills-heading"
          className="border-t border-border py-16"
        >
          <Reveal>
            <SectionHeading
              id="skills-heading"
              eyebrow="Toolbox"
              title="Skills"
            />
            <ToolboxGrid groups={skillGroups} />
          </Reveal>
        </section>

        {/* Experience & education */}
        <section
          id="experience"
          aria-labelledby="experience-heading"
          className="grid gap-10 border-t border-border py-16 lg:grid-cols-[1.3fr_1fr]"
        >
          <Reveal>
            <SectionHeading
              id="experience-heading"
              eyebrow="Experience"
              title="Where I've worked"
            />
            <ExperienceTimeline roles={experience} />
          </Reveal>

          <Reveal delay={0.1}>
            <SectionHeading eyebrow="Background" title="Education" />
            <ul className="space-y-3">
              <li className="rounded-2xl border border-border p-4">
                <p className="font-semibold text-foreground">
                  B.S. Software Engineering
                </p>
                <p className="mt-1 text-sm text-muted">
                  Universidad Tecnológica de Bahía de Banderas
                </p>
                <span className="mt-3 inline-block rounded-md bg-surface px-2 py-1 font-mono text-xs uppercase tracking-widest text-muted">
                  2014 – 2017
                </span>
              </li>
              <li className="rounded-2xl border border-border p-4">
                <p className="font-semibold text-foreground">
                  English Language Scholarship
                </p>
                <p className="mt-1 text-sm text-muted">
                  Dominican University, Chicago
                </p>
                <span className="mt-3 inline-block rounded-md bg-surface px-2 py-1 font-mono text-xs uppercase tracking-widest text-muted">
                  2014
                </span>
              </li>
              <li className="rounded-2xl border border-border bg-[var(--nef-accent-surface)] p-4">
                <p className="font-semibold text-[var(--nef-accent-text)]">
                  Asynchronous-ready
                </p>
                <p className="mt-1.5 text-sm leading-6 text-[var(--nef-accent-text)]">
                  Six years across hybrid, remote, and fully distributed teams —
                  bilingual written communication, timezone-agnostic handoffs,
                  and decisions documented where the next person can find them.
                </p>
              </li>
            </ul>
          </Reveal>
        </section>

        {/* Latest posts */}
        {latestPosts.length > 0 && (
          <section
            id="writing"
            aria-labelledby="blog-heading"
            className="border-t border-border py-16"
          >
            <Reveal>
              <SectionHeading
                id="blog-heading"
                eyebrow="Writing"
                title="Latest posts"
              />
              <div className="space-y-4">
                {latestPosts.map((post) => (
                  <PostCard key={post.slug} post={post} />
                ))}
              </div>
              <div className="mt-6">
                <Button asChild variant="outline">
                  <Link href="/blog">View all posts</Link>
                </Button>
              </div>
            </Reveal>
          </section>
        )}

        {/* Craft receipts */}
        <section
          aria-labelledby="craft-heading"
          className="border-t border-border py-16"
        >
          <Reveal>
            <SectionHeading
              id="craft-heading"
              eyebrow="Craft"
              title="How this site is built"
            />
            <p className="max-w-2xl text-base leading-7 text-muted">
              Lighthouse scores measured against a production build, not the dev
              server — the number that actually ships.
            </p>
            <dl className="mt-6 grid gap-4 border-y border-border py-6 sm:grid-cols-2">
              <div>
                <dt className="text-xs font-medium uppercase tracking-widest text-muted">
                  Accessibility
                </dt>
                <dd className="mt-1 text-2xl font-semibold text-foreground">
                  100
                </dd>
              </div>
              <div>
                <dt className="text-xs font-medium uppercase tracking-widest text-muted">
                  SEO
                </dt>
                <dd className="mt-1 text-2xl font-semibold text-foreground">
                  100
                </dd>
              </div>
            </dl>
            <ul className="mt-6 list-disc space-y-2 pl-5 text-sm leading-6 text-muted">
              <li>
                A skip-to-content link, correct heading order on every route
                (each page has exactly one h1), and focus-visible states — using
                the design system&apos;s own{" "}
                <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-sm">
                  --nef-focus-ring
                </code>{" "}
                token — on every interactive element that didn&apos;t already
                have one.
              </li>
              <li>
                The design system&apos;s default muted-text color measured 3.1:1
                against its own background — under WCAG AA&apos;s 4.5:1 for body
                text. Darkened it here (site-only override, the published token
                is unchanged) since this site leans on it for more than
                captions.
              </li>
              <li>
                Every animation on this page — the scroll reveals, the view
                transitions, the interaction lab&apos;s own motion — honors{" "}
                <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-sm">
                  prefers-reduced-motion
                </code>
                . Turn it on in your OS settings and reload.
              </li>
            </ul>
          </Reveal>
        </section>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex w-full max-w-3xl flex-col items-start justify-between gap-4 px-6 py-10 sm:flex-row sm:items-center sm:px-8">
          <p className="text-sm text-muted">
            © {new Date().getFullYear()} Neftali Aguilar.
          </p>
          <div className="flex gap-6 text-sm font-medium text-muted">
            <Link
              href="/work"
              className="rounded-sm transition-colors duration-[var(--nef-duration-normal)] ease-[var(--nef-ease-out)] hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--nef-focus-ring)]"
            >
              Work
            </Link>
            <Link
              href="/blog"
              className="rounded-sm transition-colors duration-[var(--nef-duration-normal)] ease-[var(--nef-ease-out)] hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--nef-focus-ring)]"
            >
              Blog
            </Link>
            <a
              href={links.email}
              className="rounded-sm transition-colors duration-[var(--nef-duration-normal)] ease-[var(--nef-ease-out)] hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--nef-focus-ring)]"
            >
              Email
            </a>
            <a
              href={links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-sm transition-colors duration-[var(--nef-duration-normal)] ease-[var(--nef-ease-out)] hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--nef-focus-ring)]"
            >
              GitHub
            </a>
            <a
              href={links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-sm transition-colors duration-[var(--nef-duration-normal)] ease-[var(--nef-ease-out)] hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--nef-focus-ring)]"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

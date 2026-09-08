import Link from "next/link";
import { Button } from "./ui";
import { SectionHeading } from "@/app/components/section-heading";
import { PostCard } from "@/app/components/post-card";
import { WorkCard } from "@/app/components/work-card";
import { getLatestPosts } from "@/lib/posts";
import { getAllCaseStudies } from "@/lib/work";

const links = {
  github: "https://github.com/NeftaAguilar",
  linkedin: "https://www.linkedin.com/in/neftaliaguilaralvarez/",
  email: "mailto:hola@neftaliaguilar.com",
};

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
      <header className="mx-auto w-full max-w-3xl px-6 pb-16 pt-24 sm:px-8">
        <p className="text-sm font-medium uppercase tracking-widest text-muted">
          Neftali Aguilar
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
          I build the layer where design becomes code.
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
            <Link href="/work">See my work</Link>
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
      </header>

      <main className="mx-auto w-full max-w-3xl flex-1 px-6 sm:px-8">
        {/* Selected work */}
        {caseStudies.length > 0 && (
          <section
            aria-labelledby="work-heading"
            className="border-t border-border py-16"
          >
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
          </section>
        )}

        {/* Latest posts */}
        {latestPosts.length > 0 && (
          <section
            aria-labelledby="blog-heading"
            className="border-t border-border py-16"
          >
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
          </section>
        )}

        {/* Experience */}
        <section
          aria-labelledby="experience-heading"
          className="border-t border-border py-16"
        >
          <SectionHeading
            id="experience-heading"
            eyebrow="Experience"
            title="Where I've worked"
          />
          <div className="space-y-10">
            {experience.map((job) => (
              <article key={job.company}>
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
              </article>
            ))}
          </div>
        </section>

        {/* AI-Augmented Development Workflow */}
        <section
          aria-labelledby="workflow-heading"
          className="border-t border-border py-16"
        >
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
                <span className="text-sm font-medium text-muted">
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
        </section>

        {/* Skills */}
        <section
          aria-labelledby="skills-heading"
          className="border-t border-border py-16"
        >
          <SectionHeading
            id="skills-heading"
            eyebrow="Toolbox"
            title="Skills"
          />
          <div className="grid gap-8 sm:grid-cols-2">
            {skillGroups.map((group) => (
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
        </section>

        {/* Education */}
        <section
          aria-labelledby="education-heading"
          className="border-t border-border py-16"
        >
          <SectionHeading
            id="education-heading"
            eyebrow="Background"
            title="Education"
          />
          <ul className="space-y-2 text-sm leading-6 text-muted">
            <li>
              <span className="font-medium text-foreground">
                Universidad Tecnológica de Bahía de Banderas
              </span>{" "}
              — B.S. Software Engineering (2014–2017)
            </li>
            <li>
              <span className="font-medium text-foreground">
                Dominican University, Chicago
              </span>{" "}
              — English Scholarship (2014)
            </li>
          </ul>
        </section>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex w-full max-w-3xl flex-col items-start justify-between gap-4 px-6 py-10 sm:flex-row sm:items-center sm:px-8">
          <p className="text-sm text-muted">
            © {new Date().getFullYear()} Neftali Aguilar.
          </p>
          <div className="flex gap-6 text-sm font-medium text-muted">
            <Link href="/work" className="hover:text-foreground">
              Work
            </Link>
            <Link href="/blog" className="hover:text-foreground">
              Blog
            </Link>
            <a href={links.email} className="hover:text-foreground">
              Email
            </a>
            <a
              href={links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground"
            >
              GitHub
            </a>
            <a
              href={links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

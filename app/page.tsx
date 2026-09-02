import { Button } from "./ui";

const links = {
  github: "https://github.com/NeftaAguilar",
  linkedin: "https://www.linkedin.com/in/neftaliaguilar",
  email: "mailto:hola@neftaliaguilar.com",
  npmPackage: "https://www.npmjs.com/package/@neftaliaguilar/ui",
};

const currentlyExploring = [
  "Vercel AI SDK",
  "Retrieval-Augmented Generation (RAG)",
  "AI agents & tool use",
  "LLM-powered developer workflows",
];

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
      "Shape frontend architecture within an Nx monorepo — scalable patterns, shared libraries, and reusable components.",
      "Design and expand a reusable Design System with Storybook for consistent UX across product areas.",
      "Lead performance initiatives across Lighthouse, Core Web Vitals, bundle size, and runtime behavior.",
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
    skills: ["Node.js", "NestJS", "tRPC", "GraphQL", "REST APIs", "Prisma", "PostgreSQL"],
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
    skills: ["Docker", "GitHub Actions", "CI/CD", "Grafana", "Production Debugging"],
  },
  {
    label: "Testing",
    skills: ["Jest", "Cypress", "Unit Testing", "Component Testing"],
  },
  {
    label: "AI & LLM Tooling",
    skills: ["Vercel AI SDK", "RAG", "Claude Code", "Cursor", "Radix Primitives"],
  },
];

const packageComponents = [
  { name: "Button", note: "5 variants, 3 sizes, width-stable loading" },
  { name: "TextField", note: "Label required; hint + error wiring" },
  { name: "Textarea", note: "Live character count that never truncates" },
  { name: "Select", note: "Trigger-width matching, grouping" },
  { name: "Switch", note: "Composited thumb transition" },
  { name: "Dialog", note: "Title required; focus trap and return" },
  { name: "DropdownMenu", note: "Decorative shortcuts, destructive items" },
  { name: "Tooltip", note: "Describes, never names" },
  { name: "Tabs", note: "Sliding indicator, measured in JS, moved in CSS" },
  { name: "Toast", note: "Swipe to dismiss, action altText required" },
];

function SectionHeading({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="mb-10">
      <p className="text-sm font-medium uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
        {eyebrow}
      </p>
      <h2 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-3xl">
        {title}
      </h2>
    </div>
  );
}

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-white font-sans text-zinc-900 dark:bg-black dark:text-zinc-100">
      {/* Hero */}
      <header className="mx-auto w-full max-w-3xl px-6 pb-16 pt-24 sm:px-8">
        <p className="text-sm font-medium uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
          Neftali Aguilar
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
          Senior Software Engineer, focused on the frontend.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
          I build scalable React and TypeScript products and the design systems that
          hold them together. Currently exploring AI-augmented engineering —
          the Vercel AI SDK, retrieval-augmented generation, and agentic
          developer workflows.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild variant="solid" size="lg">
            <a href={links.email}>Email me</a>
          </Button>
          <Button asChild variant="outline" size="lg">
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
        {/* Currently exploring */}
        <section aria-labelledby="exploring-heading" className="border-t border-zinc-200 py-16 dark:border-zinc-800">
          <SectionHeading eyebrow="Currently studying" title="AI engineering, deliberately" />
          <p className="max-w-2xl text-base leading-7 text-zinc-600 dark:text-zinc-400">
            Beyond day-to-day frontend architecture, I&apos;m deep in the tools and
            patterns behind AI-native products.
          </p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {currentlyExploring.map((item) => (
              <li
                key={item}
                className="rounded-full border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 dark:border-zinc-800 dark:text-zinc-300"
              >
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* AI-Augmented Development Workflow */}
        <section aria-labelledby="workflow-heading" className="border-t border-zinc-200 py-16 dark:border-zinc-800">
          <SectionHeading eyebrow="How I build" title="AI-augmented development workflow" />
          <ol className="grid gap-6 sm:grid-cols-2">
            {workflowSteps.map((step, index) => (
              <li
                key={step.title}
                className="rounded-2xl border border-zinc-200 p-5 dark:border-zinc-800"
              >
                <span className="text-sm font-medium text-zinc-400 dark:text-zinc-500">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 font-semibold text-zinc-950 dark:text-zinc-50">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </section>

        {/* Experience */}
        <section aria-labelledby="experience-heading" className="border-t border-zinc-200 py-16 dark:border-zinc-800">
          <SectionHeading eyebrow="Experience" title="Where I've worked" />
          <div className="space-y-10">
            {experience.map((job) => (
              <article key={job.company}>
                <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline">
                  <h3 className="font-semibold text-zinc-950 dark:text-zinc-50">
                    {job.role} · {job.company}
                  </h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">{job.period}</p>
                </div>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">{job.location}</p>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                  {job.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section aria-labelledby="skills-heading" className="border-t border-zinc-200 py-16 dark:border-zinc-800">
          <SectionHeading eyebrow="Toolbox" title="Skills" />
          <div className="grid gap-8 sm:grid-cols-2">
            {skillGroups.map((group) => (
              <div key={group.label}>
                <h3 className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">
                  {group.label}
                </h3>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <li
                      key={skill}
                      className="rounded-md bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* First npm package */}
        <section aria-labelledby="package-heading" className="border-t border-zinc-200 py-16 dark:border-zinc-800">
          <SectionHeading eyebrow="Open source" title="I published my first npm package" />
          <p className="max-w-2xl text-base leading-7 text-zinc-600 dark:text-zinc-400">
            <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-sm dark:bg-zinc-900">
              @neftaliaguilar/ui
            </code>{" "}
            is a small, accessible React component library built on Radix
            Primitives, styled with CSS Modules and themed with CSS custom
            properties — ten components, two runtime dependencies, one
            stylesheet. This page is built with it.
          </p>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-zinc-200 text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
                  <th className="py-2 pr-4 font-medium">Component</th>
                  <th className="py-2 font-medium">Notes</th>
                </tr>
              </thead>
              <tbody>
                {packageComponents.map((component) => (
                  <tr
                    key={component.name}
                    className="border-b border-zinc-100 dark:border-zinc-900"
                  >
                    <td className="py-2 pr-4 font-mono text-xs text-zinc-800 dark:text-zinc-200">
                      {component.name}
                    </td>
                    <td className="py-2 text-zinc-600 dark:text-zinc-400">
                      {component.note}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6">
            <Button asChild variant="outline">
              <a href={links.npmPackage} target="_blank" rel="noopener noreferrer">
                View on npm
              </a>
            </Button>
          </div>
        </section>

        {/* Education */}
        <section aria-labelledby="education-heading" className="border-t border-zinc-200 py-16 dark:border-zinc-800">
          <SectionHeading eyebrow="Background" title="Education" />
          <ul className="space-y-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
            <li>
              <span className="font-medium text-zinc-950 dark:text-zinc-50">
                Universidad Tecnológica de Bahía de Banderas
              </span>{" "}
              — B.S. Software Engineering (2014–2017)
            </li>
            <li>
              <span className="font-medium text-zinc-950 dark:text-zinc-50">
                Dominican University, Chicago
              </span>{" "}
              — English Scholarship (2014)
            </li>
          </ul>
        </section>
      </main>

      <footer className="border-t border-zinc-200 dark:border-zinc-800">
        <div className="mx-auto flex w-full max-w-3xl flex-col items-start justify-between gap-4 px-6 py-10 sm:flex-row sm:items-center sm:px-8">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            © {new Date().getFullYear()} Neftali Aguilar.
          </p>
          <div className="flex gap-6 text-sm font-medium text-zinc-600 dark:text-zinc-400">
            <a href={links.email} className="hover:text-zinc-950 dark:hover:text-zinc-50">
              Email
            </a>
            <a
              href={links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-zinc-950 dark:hover:text-zinc-50"
            >
              GitHub
            </a>
            <a
              href={links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-zinc-950 dark:hover:text-zinc-50"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

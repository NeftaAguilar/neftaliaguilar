# neftaliaguilar.com

Personal site and portfolio for Neftali Aguilar — Design Systems & Frontend
Engineering. Built as evidence of front-end craft rather than a text résumé:
interaction quality, visual detail, and ownership of a component system,
running live on the site itself.

- **Live:** https://neftaliaguilar.com
- **Stack:** Next.js 16 (App Router, Turbopack) · React 19 · TypeScript ·
  Tailwind CSS v4 · [`motion`](https://motion.dev) · MDX · Recharts
- **Design system:** consumes the author's own published component library,
  [`@neftaliaguilar/ui`](https://www.npmjs.com/package/@neftaliaguilar/ui)
  ([Storybook](https://nef-ui.vercel.app/)) — the site dogfoods its tokens
  (`--nef-*`) instead of a separate palette.

## Getting started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) (Next picks the next free
port — e.g. 3001 — if 3000 is taken).

### Environment variables

Copy `.env.example` to `.env.local` and fill in what you need:

| Variable                 | Required | Purpose                                                                                                                                                      |
| ------------------------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `BUFFER_API_KEY`         | No       | Powers the live publishing chart in the hero (`lib/buffer.ts`). Server-only. Without it, the hero falls back to the `@neftaliaguilar/ui` component showcase. |
| `BUFFER_ORGANIZATION_ID` | No       | Defaults to the first organization on the Buffer account.                                                                                                    |

## Scripts

| Command                             | What it does                     |
| ----------------------------------- | -------------------------------- |
| `pnpm dev`                          | Start the dev server (Turbopack) |
| `pnpm build`                        | Production build                 |
| `pnpm start`                        | Serve the production build       |
| `pnpm lint`                         | ESLint                           |
| `pnpm types:check`                  | `tsc --noEmit`                   |
| `pnpm format` / `pnpm format:check` | Prettier write / check           |

CI expects `lint`, `format:check`, `types:check`, and `build` to all pass
before a PR merges.

## Project structure

```
app/
  page.tsx           Home — hero, interaction lab, case studies, workflow,
                      toolbox, experience, latest posts, craft receipts
  layout.tsx          Root layout — theme pre-hydration script, persistent
                      <SiteNav>, skip-to-content link
  blog/                Blog index + [slug] MDX post pages
  work/                Case study index + [slug] MDX case study pages
  components/          Client/server components (nav, charts, MDX renderer,
                      interaction-lab demos, motion primitives, etc.)
content/
  posts/*.mdx          Blog posts (gray-matter frontmatter + MDX body)
  work/*.mdx           Case studies
lib/
  posts.ts, work.ts    Filesystem + frontmatter readers, React-cached per request
  buffer.ts            Buffer GraphQL client for the publishing chart (server-only)
  links.ts, format.ts, writing.ts   Shared constants and formatters
plan.md                Phased build plan for this redesign (source of truth
                      for what's shipped vs. pending)
```

Posts and case studies are plain MDX files on disk, not a CMS — `gray-matter`
reads the frontmatter and `next-mdx-remote` renders the body server-side.

## Content model

- **Theming:** `data-theme="light"|"dark"` on `<html>`, set by a pre-hydration
  script in `app/layout.tsx` to avoid a flash of the wrong theme. Toggled via
  `@neftaliaguilar/ui`'s `Switch`; see `app/components/theme-toggle.tsx`.
- **Charts:** `app/components/buffer-chart.tsx` and `writing-charts.tsx` wrap
  Recharts, each paired with a `sr-only` `<table>` of the same data so the
  chart is never the only way to read the numbers.
- **Motion:** all animation goes through `motion` and respects
  `prefers-reduced-motion` (`useReducedMotion`, plus a CSS override for the
  View Transitions API, which doesn't honor it on its own).
- **Interaction lab:** `app/components/interaction-lab.tsx` is a set of small,
  self-contained live demos (spring-physics switch, toast queue, command
  palette, real Lighthouse/Web Vitals numbers) proving the claims made in the
  copy around them, rather than just stating them.

## Deploy

Deployed on [Vercel](https://vercel.com). Pushing to `main` triggers a
production deploy; PRs get preview deployments automatically.

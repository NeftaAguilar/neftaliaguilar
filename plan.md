# Plan — Portfolio redesign for Buffer (Senior Design Engineer)

Goal: turn a text résumé site into evidence of front-end craft — interaction
quality, visual detail, and ownership of a component system.
Rule: 1 PR = 1 unchecked task below. Branch from main every time.

## Confirmed answers (2026-09-07)

- `NeftaAguilar/nef-ui` repo and `@neftaliaguilar/ui` npm package are both
  public: https://www.npmjs.com/package/@neftaliaguilar/ui
- Published Storybook: https://nef-ui.vercel.app/
- Published Chromatic: https://6a9dc2b26a960f6dedb965ba-txkfktqmxi.chromatic.com/
- Timeline: enough time to run the full plan (Phases 0–5).
- Palette: site adopts the design system's `--nef-*` tokens (indigo accent) —
  dogfooding, not a separate palette.

## Phase 0 — Foundations

- [x] **0.1 Fix the typography bug and add the missing CI scripts** (XS)
  - `app/globals.css`: remove `font-family: Arial, Helvetica, sans-serif` from
    `body` (line ~25); set `font-family: var(--font-geist-sans)` instead so the
    font applies globally, not only where `font-sans` is repeated.
  - `app/page.tsx`, `app/blog/page.tsx`: drop the now-redundant `font-sans`.
  - `package.json`: add `types:check` (`tsc --noEmit`), `format` /
    `format:check` (Prettier), so the pre-PR gate can run.
  - Needs from user: nothing.

- [ ] **0.2 Unify theming on the design system's tokens** (S)
  - `app/globals.css`: map the Tailwind `@theme` background/foreground/border
    colors onto `--nef-bg`, `--nef-fg`, `--nef-border`, `--nef-accent` from
    `@neftaliaguilar/ui/styles.css`.
  - Switch dark mode from `@media (prefers-color-scheme)` to the `data-theme`
    attribute (Tailwind v4 custom variant), so site and components share one
    mechanism.
  - `app/layout.tsx`: keep the pre-hydration script, but read a persisted
    preference and fall back to the OS query.
  - Verify no visual regression on `/`, `/blog`, `/blog/[slug]`.
  - Needs from user: confirm he's happy for the site palette to become the
    design system's palette (accent goes indigo `#3e63dd`).

## Phase 1 — Positioning

- [ ] **1.1 Rewrite hero + metadata as a design engineer** (S)
  - `app/page.tsx` header block and `app/layout.tsx` metadata (title,
    description, keywords, OG).
  - New angle: engineer who owns the layer where design becomes code — design
    systems, interaction, accessibility, performance — without dropping the
    senior-engineer credibility (Intel, SoftServe, Couchsurfing).
  - Add a primary CTA to `/work` alongside the existing contact buttons.
  - Reorder the page: Work → Writing → Experience → How I build → Skills →
    Education. "Currently studying (AI)" shrinks to a one-line note; it is not
    what this role is hiring for.
  - Needs from user: approve the new headline and one-paragraph bio copy —
    propose 2–3 options in the PR description.

## Phase 2 — Work section

- [ ] **2.1 `/work` index + home teaser** (M)
  - New `lib/work.ts` (typed loader, mirrors `lib/posts.ts`),
    `content/work/nef-ui.mdx`, `app/work/page.tsx`, and a `WorkCard` component
    in `app/components/`.
  - Home gets a "Selected work" section above Writing, showing the teaser.
  - Static content only in this PR — no animation yet, no playground.
  - Needs from user: nothing.

- [ ] **2.2 `nef-ui` case study page** (M)
  - `app/work/[slug]/page.tsx` reusing the MDX pipeline from
    `app/blog/[slug]/`. Structure: context → constraints → decisions →
    evidence → outcome.
  - Pull real material from the sibling repo: `CONTEXT.md` vocabulary and
    non-goals, ADR-0001/0002/0003, the Chromatic `onlyChanged` workflow, the
    a11y test setup (`vitest-axe`), the token tiering
    (Primitive → Semantic → Theme).
  - Outbound links: npm package, GitHub repo, published Storybook, Chromatic.
  - Needs from user:
    - the **published Chromatic Storybook URL** (or a decision to deploy
      `storybook-static/` to Vercel and use that);
    - confirmation the **npm package is public** and the repo is public;
    - optional: 1–2 screenshots of a Chromatic visual diff — that image is
      uniquely persuasive and cannot be reconstructed from the repo.

- [ ] **2.3 Couchsurfing entry, text only** (S)
  - Expand the Couchsurfing block in the Experience section into a short
    scoped write-up: what the design system covered, adoption, the Nx monorepo
    shape, the Lighthouse/CWV work — with numbers, no proprietary imagery.
  - Needs from user: any shareable metrics (adoption %, components shipped,
    CWV before/after) and a sanity check that none of it is confidential.

## Phase 3 — The interactive proof

- [ ] **3.0 Republish `@neftaliaguilar/ui` and bump the dependency** (XS)
  - The installed `0.1.0` predates `Card`, `HStack`, `VStack`, `Skeleton`
    (compare `dist/index.d.ts` against the repo's `src/index.ts`). The
    playground needs them. Release from the `nef-ui` repo, then bump here.
  - Note: `pnpm-workspace.yaml` has a `minimumReleaseAgeExclude` entry pinned
    to `@neftaliaguilar/ui@0.1.0` — update it to the new version or the
    install will stall.
  - Needs from user: npm publish rights / run the release.

- [ ] **3.1 Live component playground on the case study page** (M)
  - A client component (authored in **CSS Modules**, not Tailwind — deliberate,
    and matches Buffer's stack) embedded into `content/work/nef-ui.mdx`.
  - Tabbed demo using his own `Tabs`, exercising `Button` (all 5 variants,
    loading state), `Switch`, `Select`, `Dialog`, `Toast`, `Tooltip`,
    `Skeleton`.
  - Live theme + accent-token controls that rewrite `--nef-*` custom properties
    on the demo container — showing the semantic-token tier doing real work,
    which is the whole thesis of the library.
  - Keyboard-operable and screen-reader sane; this is the artifact reviewers
    will poke at hardest.
  - Needs from user: nothing.

## Phase 4 — Motion

- [ ] **4.1 CSS micro-interactions pass** (S)
  - Hover/press/focus-visible states across `PostCard`, `WorkCard`, skill and
    tag chips, footer links, using the design system's
    `--nef-duration-*` / `--nef-ease-*` tokens so the site and the components
    move with one timing language.
  - No JavaScript in this PR. Honour `prefers-reduced-motion`.
  - Needs from user: nothing.

- [ ] **4.2 Motion scroll-reveal for section entrances** (S)
  - Add `motion`; one small reusable `<Reveal>` client component
    (`whileInView`, `once: true`, ~16px rise + fade, staggered children).
  - Apply to section headings and card grids on `/` and `/work`.
  - Guard with `useReducedMotion()`; keep everything server-rendered and
    visible if JS never loads — nothing may depend on animation to be readable.
  - Budget check: confirm the added client JS in the build output is worth it,
    and say so in the PR.
  - Needs from user: nothing.

- [ ] **4.3 View Transitions between routes** (S)
  - React `<ViewTransition>` (built into the Next 16 App Router — see
    `node_modules/next/dist/docs/01-app/02-guides/view-transitions.md`,
    no dependency to install).
  - Morph the work/post card title into the detail page heading; crossfade the
    rest. Degrades to an instant swap where unsupported.
  - Needs from user: nothing.

## Phase 5 — Craft receipts

- [ ] **5.1 Accessibility and performance pass** (M)
  - Audit `/`, `/work`, `/work/[slug]`, `/blog`, `/blog/[slug]`: heading order,
    landmarks, focus-visible on every interactive element, contrast in both
    themes, keyboard path through the playground, reduced-motion behaviour.
  - Fix what the audit finds; add an `sr-only` skip link.
  - Add `app/opengraph-image.tsx` — the link preview is the first designed
    surface a recruiter sees, and today there isn't one.
  - Publish the numbers in a short "How this site is built" section: Lighthouse
    scores, CWV, JS shipped. Optional and on-message: render them with
    **Recharts**, which the JD names.
  - Needs from user: nothing.

- [ ] **5.2 (Optional) Blog post: "Shipping a component library as portfolio
      evidence"** (S)
  - `content/posts/*.mdx`, reusing the existing pipeline. Covers the Radix →
    Base UI bet, CSS Modules over Tailwind for a published package, and
    animating from `data-state` without a runtime dependency.
  - Doubles as the written-communication sample Buffer asks for.
  - Needs from user: approval of the angle before drafting.

## Risks

- **Deadline.** Phases 0–3 alone make the application materially stronger. If time runs short, ship through 3.1 and apply; 4 and 5 can land afterwards and the URL stays live.
- **Playground scope creep** — it's the fun part and could eat a week. Cap it at one screen, three tabs, two controls. Split into a second PR if the diff passes ~10 files.
- **Motion regressing the very performance he's claiming to care about.** Mitigation: 4.2 states the JS delta in the PR description; if scroll-reveal costs more than a few kB gzipped, fall back to a CSS `animation-timeline: view()` progressive enhancement.
- **Cross-repo coupling in 3.0.** If publishing is blocked, 3.1 can pin the demo to the 10 components already in `0.1.0` and drop `Card`/`Skeleton` from the showcase.
- **Theme unification (0.2) touching every page at once.** It's the one PR that can visually break the blog. Review both themes on all five routes before merging.

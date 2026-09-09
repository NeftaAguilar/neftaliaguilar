const SKILLS = [
  "React",
  "TypeScript",
  "Next.js",
  "Design systems",
  "CSS Modules",
  "Radix Primitives",
  "Motion & animation",
  "Storybook",
  "Core Web Vitals",
  "WCAG AA",
  "Nx monorepos",
  "tRPC",
  "Node.js",
  "Vercel AI SDK",
  "RAG",
];

export function SkillsMarquee() {
  return (
    <div className="overflow-hidden border-y border-border py-3">
      <div className="flex w-max animate-[marquee_42s_linear_infinite] motion-reduce:animate-none">
        {[SKILLS, SKILLS].map((group, i) => (
          <div key={i} className="flex shrink-0" aria-hidden={i === 1}>
            {group.map((skill, j) => (
              <span
                key={`${skill}-${j}`}
                className="whitespace-nowrap px-5 font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted"
              >
                {skill}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

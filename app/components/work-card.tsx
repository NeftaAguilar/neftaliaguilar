import Link from "next/link";
import type { CaseStudyMeta } from "@/lib/work";

export function WorkCard({ study }: { study: CaseStudyMeta }) {
  return (
    <Link
      href={`/work/${study.slug}`}
      className="group block rounded-2xl border border-border p-5 transition-colors hover:border-border-strong"
    >
      <p className="text-sm text-muted">
        {study.role} · {study.period}
      </p>
      <h3 className="mt-2 font-semibold text-foreground group-hover:underline">
        {study.title}
      </h3>
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
    </Link>
  );
}

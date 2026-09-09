import Link from "next/link";
import { ViewTransition } from "react";
import type { CaseStudyMeta } from "@/lib/work";

export function WorkCard({ study }: { study: CaseStudyMeta }) {
  return (
    <Link
      href={`/work/${study.slug}`}
      className="group block rounded-2xl border border-border p-5 transition-[transform,border-color,box-shadow] duration-[var(--nef-duration-normal)] ease-[var(--nef-ease-out)] hover:-translate-y-1 hover:border-border-strong hover:shadow-[var(--nef-shadow-2)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--nef-focus-ring)]"
    >
      <p className="text-sm text-muted">
        {study.role} · {study.period}
      </p>
      <ViewTransition name={`work-title-${study.slug}`}>
        <h3 className="mt-2 font-semibold text-foreground group-hover:underline">
          {study.title}
        </h3>
      </ViewTransition>
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

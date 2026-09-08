import type { Metadata } from "next";
import Link from "next/link";
import { ViewTransition } from "react";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { Button } from "@/app/ui";
import { mdxComponents } from "@/app/components/mdx-components";
import { getAllCaseStudySlugs, getCaseStudyBySlug } from "@/lib/work";

export function generateStaticParams() {
  return getAllCaseStudySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  try {
    const study = getCaseStudyBySlug(slug);
    return { title: study.title, description: study.summary };
  } catch {
    return {};
  }
}

export default async function CaseStudy({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let study;
  try {
    study = getCaseStudyBySlug(slug);
  } catch {
    notFound();
  }

  return (
    <div className="flex flex-1 flex-col bg-background text-foreground">
      <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-24 sm:px-8">
        <Button asChild variant="ghost" size="sm">
          <Link href="/work">← Back to work</Link>
        </Button>
        <article>
          <header className="mb-10 mt-8">
            <p className="text-sm text-muted">
              {study.role} · {study.period}
            </p>
            <ViewTransition name={`work-title-${study.slug}`}>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                {study.title}
              </h1>
            </ViewTransition>
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
            {study.metrics.length > 0 && (
              <dl className="mt-6 grid gap-4 border-y border-border py-6 sm:grid-cols-3">
                {study.metrics.map((metric) => (
                  <div key={metric.label}>
                    <dt className="text-xs font-medium uppercase tracking-widest text-muted">
                      {metric.label}
                    </dt>
                    <dd className="mt-1 text-sm font-medium text-foreground">
                      {metric.value}
                    </dd>
                  </div>
                ))}
              </dl>
            )}
            {study.links.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-3">
                {study.links.map((link) => (
                  <Button asChild key={link.href} variant="outline" size="sm">
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.label}
                    </a>
                  </Button>
                ))}
              </div>
            )}
          </header>
          <MDXRemote
            source={study.content}
            components={mdxComponents}
            options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
          />
        </article>
      </main>
    </div>
  );
}

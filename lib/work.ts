import fs from "node:fs";
import path from "node:path";
import { cache } from "react";
import matter from "gray-matter";

const WORK_DIR = path.join(process.cwd(), "content/work");
const MDX_EXTENSION = /\.mdx$/;

export type CaseStudyLink = {
  label: string;
  href: string;
};

export type CaseStudyMetric = {
  label: string;
  value: string;
};

export type CaseStudyMeta = {
  slug: string;
  title: string;
  role: string;
  period: string;
  summary: string;
  stack: string[];
  links: CaseStudyLink[];
  metrics: CaseStudyMetric[];
};

export type CaseStudy = CaseStudyMeta & {
  content: string;
};

// See the note in `lib/posts.ts` — the home page and `/work` both list the
// same case studies, and `cache()` keeps that to one read per request.
const readCaseStudyFile = cache((slug: string): CaseStudy => {
  const filePath = path.join(WORK_DIR, `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: data.title,
    role: data.role,
    period: data.period,
    summary: data.summary,
    stack: data.stack ?? [],
    links: data.links ?? [],
    metrics: data.metrics ?? [],
    content,
  };
});

export const getAllCaseStudySlugs = cache((): string[] => {
  const slugs: string[] = [];

  for (const file of fs.readdirSync(WORK_DIR)) {
    if (file.endsWith(".mdx")) {
      slugs.push(file.replace(MDX_EXTENSION, ""));
    }
  }

  return slugs;
});

export const getAllCaseStudies = cache((): CaseStudyMeta[] =>
  getAllCaseStudySlugs().map((slug): CaseStudyMeta => {
    const { title, role, period, summary, stack, links, metrics } =
      readCaseStudyFile(slug);
    return { slug, title, role, period, summary, stack, links, metrics };
  }),
);

export function getCaseStudyBySlug(slug: string): CaseStudy {
  return readCaseStudyFile(slug);
}

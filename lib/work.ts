import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const WORK_DIR = path.join(process.cwd(), "content/work");

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

function readCaseStudyFile(slug: string): CaseStudy {
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
}

export function getAllCaseStudySlugs(): string[] {
  return fs
    .readdirSync(WORK_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export function getAllCaseStudies(): CaseStudyMeta[] {
  return getAllCaseStudySlugs()
    .map((slug) => readCaseStudyFile(slug))
    .map((study): CaseStudyMeta => {
      const { slug, title, role, period, summary, stack, links, metrics } =
        study;
      return { slug, title, role, period, summary, stack, links, metrics };
    });
}

export function getCaseStudyBySlug(slug: string): CaseStudy {
  return readCaseStudyFile(slug);
}

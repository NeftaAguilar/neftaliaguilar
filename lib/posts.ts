import fs from "node:fs";
import path from "node:path";
import { cache } from "react";
import matter from "gray-matter";

const POSTS_DIR = path.join(process.cwd(), "content/posts");
const MDX_EXTENSION = /\.mdx$/;

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
};

export type Post = PostMeta & {
  content: string;
};

// Every route on the site reads the same handful of files. `cache()` dedupes
// the read + frontmatter parse across all callers within one request, so the
// home page asking for the latest posts costs nothing extra after the blog
// index has already listed them.
const readPostFile = cache((slug: string): Post => {
  const filePath = path.join(POSTS_DIR, `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: data.title,
    date: data.date,
    excerpt: data.excerpt,
    tags: data.tags ?? [],
    content,
  };
});

export const getAllPostSlugs = cache((): string[] => {
  const slugs: string[] = [];

  for (const file of fs.readdirSync(POSTS_DIR)) {
    if (file.endsWith(".mdx")) {
      slugs.push(file.replace(MDX_EXTENSION, ""));
    }
  }

  return slugs;
});

export const getAllPosts = cache((): PostMeta[] =>
  getAllPostSlugs()
    .map((slug): PostMeta => {
      const { title, date, excerpt, tags } = readPostFile(slug);
      return { slug, title, date, excerpt, tags };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1)),
);

export function getLatestPosts(count: number): PostMeta[] {
  return getAllPosts().slice(0, count);
}

export function getPostBySlug(slug: string): Post {
  return readPostFile(slug);
}

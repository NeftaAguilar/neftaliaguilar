import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { Button } from "@/app/ui";
import { getAllPostSlugs, getPostBySlug } from "@/lib/posts";
import { mdxComponents } from "./mdx-components";

export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  try {
    const post = getPostBySlug(slug);
    return { title: post.title, description: post.excerpt };
  } catch {
    return {};
  }
}

function formatDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let post;
  try {
    post = getPostBySlug(slug);
  } catch {
    notFound();
  }

  return (
    <div className="flex flex-1 flex-col bg-background text-foreground">
      <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-24 sm:px-8">
        <Button asChild variant="ghost" size="sm">
          <Link href="/blog">← Back to blog</Link>
        </Button>
        <article>
          <header className="mb-10 mt-8">
            <p className="text-sm text-muted">{formatDate(post.date)}</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              {post.title}
            </h1>
            {post.tags.length > 0 && (
              <ul className="mt-4 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-md bg-surface px-2.5 py-1 text-xs font-medium text-muted"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            )}
          </header>
          <MDXRemote
            source={post.content}
            components={mdxComponents}
            options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
          />
        </article>
      </main>
    </div>
  );
}

import Link from "next/link";
import { ViewTransition } from "react";
import type { PostMeta } from "@/lib/posts";

function formatDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function PostCard({ post }: { post: PostMeta }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block rounded-2xl border border-border p-5 transition-colors duration-[var(--nef-duration-normal)] ease-[var(--nef-ease-out)] hover:border-border-strong focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--nef-focus-ring)]"
    >
      <p className="text-sm text-muted">{formatDate(post.date)}</p>
      <ViewTransition name={`post-title-${post.slug}`}>
        <h3 className="mt-2 font-semibold text-foreground group-hover:underline">
          {post.title}
        </h3>
      </ViewTransition>
      <p className="mt-2 text-sm leading-6 text-muted">{post.excerpt}</p>
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
    </Link>
  );
}

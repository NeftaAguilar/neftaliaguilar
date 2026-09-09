import Link from "next/link";
import { ViewTransition } from "react";
import type { PostMeta } from "@/lib/posts";
import { formatDate } from "@/lib/format";

export function PostCard({ post }: { post: PostMeta }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block rounded-2xl border border-border p-5 transition-[transform,border-color,box-shadow] duration-[var(--nef-duration-normal)] ease-[var(--nef-ease-out)] hover:-translate-y-1 hover:border-border-strong hover:shadow-[var(--nef-shadow-2)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--nef-focus-ring)]"
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

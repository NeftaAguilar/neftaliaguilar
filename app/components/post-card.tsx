import Link from "next/link";
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
      className="group block rounded-2xl border border-zinc-200 p-5 transition-colors hover:border-zinc-300 dark:border-zinc-800 dark:hover:border-zinc-700"
    >
      <p className="text-sm text-zinc-500 dark:text-zinc-400">
        {formatDate(post.date)}
      </p>
      <h3 className="mt-2 font-semibold text-zinc-950 group-hover:underline dark:text-zinc-50">
        {post.title}
      </h3>
      <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
        {post.excerpt}
      </p>
      {post.tags.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-md bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
            >
              {tag}
            </li>
          ))}
        </ul>
      )}
    </Link>
  );
}

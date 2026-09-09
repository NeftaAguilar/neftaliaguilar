"use client";

import Link from "next/link";
import { ViewTransition } from "react";
import { motion, useReducedMotion } from "motion/react";
import type { PostMeta } from "@/lib/posts";
import { formatDate } from "@/lib/format";

const MotionLink = motion.create(Link);

export function PostCard({ post }: { post: PostMeta }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <MotionLink
      href={`/blog/${post.slug}`}
      className="group block rounded-2xl border border-border p-5 transition-[border-color,box-shadow] duration-[var(--nef-duration-normal)] ease-[var(--nef-ease-out)] hover:border-border-strong hover:shadow-[var(--nef-shadow-2)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--nef-focus-ring)]"
      whileHover={shouldReduceMotion ? undefined : { y: -4 }}
      whileTap={shouldReduceMotion ? undefined : { y: -1, scale: 0.99 }}
      transition={{ type: "spring", stiffness: 420, damping: 32 }}
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
    </MotionLink>
  );
}

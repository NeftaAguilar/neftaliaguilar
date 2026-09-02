import type { Metadata } from "next";
import { SectionHeading } from "@/app/components/section-heading";
import { PostCard } from "@/app/components/post-card";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Notes on frontend architecture, design systems, and AI-augmented engineering.",
};

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <div className="flex flex-1 flex-col bg-white font-sans text-zinc-900 dark:bg-black dark:text-zinc-100">
      <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-24 sm:px-8">
        <SectionHeading eyebrow="Writing" title="Blog" />
        <div className="space-y-4">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </main>
    </div>
  );
}

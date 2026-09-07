import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/app/ui";
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
    <div className="flex flex-1 flex-col bg-background text-foreground">
      <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-24 sm:px-8">
        <Button asChild variant="ghost" size="sm">
          <Link href="/">← Back to home</Link>
        </Button>
        <div className="mt-8">
          <SectionHeading eyebrow="Writing" title="Blog" />
        </div>
        <div className="space-y-4">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </main>
    </div>
  );
}

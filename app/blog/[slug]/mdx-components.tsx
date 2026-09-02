import type { ComponentPropsWithoutRef } from "react";
import Image from "next/image";

/**
 * Embeds a YouTube/Vimeo/etc. video by URL inside MDX content, e.g.:
 * <VideoEmbed url="https://www.youtube.com/embed/dQw4w9WgXcQ" title="Demo" />
 */
function VideoEmbed({ url, title }: { url: string; title: string }) {
  return (
    <div className="my-8 aspect-video overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800">
      <iframe
        src={url}
        title={title}
        className="h-full w-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}

export const mdxComponents = {
  h2: (props: ComponentPropsWithoutRef<"h2">) => (
    <h2
      className="mt-12 text-xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50"
      {...props}
    />
  ),
  h3: (props: ComponentPropsWithoutRef<"h3">) => (
    <h3
      className="mt-8 text-lg font-semibold tracking-tight text-zinc-950 dark:text-zinc-50"
      {...props}
    />
  ),
  p: (props: ComponentPropsWithoutRef<"p">) => (
    <p
      className="mt-4 text-base leading-7 text-zinc-600 dark:text-zinc-400"
      {...props}
    />
  ),
  ul: (props: ComponentPropsWithoutRef<"ul">) => (
    <ul
      className="mt-4 list-disc space-y-2 pl-5 text-base leading-7 text-zinc-600 dark:text-zinc-400"
      {...props}
    />
  ),
  ol: (props: ComponentPropsWithoutRef<"ol">) => (
    <ol
      className="mt-4 list-decimal space-y-2 pl-5 text-base leading-7 text-zinc-600 dark:text-zinc-400"
      {...props}
    />
  ),
  li: (props: ComponentPropsWithoutRef<"li">) => <li {...props} />,
  a: (props: ComponentPropsWithoutRef<"a">) => (
    <a
      className="font-medium text-zinc-950 underline underline-offset-2 dark:text-zinc-50"
      target={props.href?.startsWith("http") ? "_blank" : undefined}
      rel={props.href?.startsWith("http") ? "noopener noreferrer" : undefined}
      {...props}
    />
  ),
  code: (props: ComponentPropsWithoutRef<"code">) => (
    <code
      className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-sm dark:bg-zinc-900"
      {...props}
    />
  ),
  table: (props: ComponentPropsWithoutRef<"table">) => (
    <div className="mt-6 overflow-x-auto">
      <table className="w-full border-collapse text-left text-sm" {...props} />
    </div>
  ),
  thead: (props: ComponentPropsWithoutRef<"thead">) => (
    <thead
      className="border-b border-zinc-200 text-zinc-500 dark:border-zinc-800 dark:text-zinc-400"
      {...props}
    />
  ),
  th: (props: ComponentPropsWithoutRef<"th">) => (
    <th className="py-2 pr-4 font-medium" {...props} />
  ),
  tr: (props: ComponentPropsWithoutRef<"tr">) => (
    <tr className="border-b border-zinc-100 dark:border-zinc-900" {...props} />
  ),
  td: (props: ComponentPropsWithoutRef<"td">) => (
    <td className="py-2 pr-4 text-zinc-600 dark:text-zinc-400" {...props} />
  ),
  img: (props: ComponentPropsWithoutRef<"img">) => (
    <span className="my-8 block overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800">
      {/* eslint-disable-next-line @next/next/no-img-element -- MDX passes plain img props; dimensions aren't known statically */}
      <img className="w-full" alt="" {...props} />
    </span>
  ),
  VideoEmbed,
  Image,
};

import type { ComponentPropsWithoutRef } from "react";
import Image from "next/image";

function cx(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/**
 * Embeds a YouTube/Vimeo/etc. video by URL inside MDX content, e.g.:
 * <VideoEmbed url="https://www.youtube.com/embed/dQw4w9WgXcQ" title="Demo" />
 */
function VideoEmbed({ url, title }: { url: string; title: string }) {
  return (
    <div className="my-8 aspect-video overflow-hidden rounded-2xl border border-border">
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
  h2: ({ className, ...props }: ComponentPropsWithoutRef<"h2">) => (
    <h2
      className={cx(
        "mt-12 text-xl font-semibold tracking-tight text-foreground",
        className,
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }: ComponentPropsWithoutRef<"h3">) => (
    <h3
      className={cx(
        "mt-8 text-lg font-semibold tracking-tight text-foreground",
        className,
      )}
      {...props}
    />
  ),
  p: ({ className, ...props }: ComponentPropsWithoutRef<"p">) => (
    <p
      className={cx("mt-4 text-base leading-7 text-muted", className)}
      {...props}
    />
  ),
  ul: ({ className, ...props }: ComponentPropsWithoutRef<"ul">) => (
    <ul
      className={cx(
        "mt-4 list-disc space-y-2 pl-5 text-base leading-7 text-muted",
        className,
      )}
      {...props}
    />
  ),
  ol: ({ className, ...props }: ComponentPropsWithoutRef<"ol">) => (
    <ol
      className={cx(
        "mt-4 list-decimal space-y-2 pl-5 text-base leading-7 text-muted",
        className,
      )}
      {...props}
    />
  ),
  li: (props: ComponentPropsWithoutRef<"li">) => <li {...props} />,
  a: ({ className, ...props }: ComponentPropsWithoutRef<"a">) => (
    <a
      className={cx(
        "font-medium text-foreground underline underline-offset-2",
        className,
      )}
      target={props.href?.startsWith("http") ? "_blank" : undefined}
      rel={props.href?.startsWith("http") ? "noopener noreferrer" : undefined}
      {...props}
    />
  ),
  code: ({ className, ...props }: ComponentPropsWithoutRef<"code">) => (
    <code
      className={cx(
        "rounded bg-surface px-1.5 py-0.5 font-mono text-sm",
        className,
      )}
      {...props}
    />
  ),
  table: ({ className, ...props }: ComponentPropsWithoutRef<"table">) => (
    <div className="mt-6 overflow-x-auto">
      <table
        className={cx("w-full border-collapse text-left text-sm", className)}
        {...props}
      />
    </div>
  ),
  thead: ({ className, ...props }: ComponentPropsWithoutRef<"thead">) => (
    <thead
      className={cx("border-b border-border text-muted", className)}
      {...props}
    />
  ),
  th: ({ className, ...props }: ComponentPropsWithoutRef<"th">) => (
    <th className={cx("py-2 pr-4 font-medium", className)} {...props} />
  ),
  tr: ({ className, ...props }: ComponentPropsWithoutRef<"tr">) => (
    <tr className={cx("border-b border-border", className)} {...props} />
  ),
  td: ({ className, ...props }: ComponentPropsWithoutRef<"td">) => (
    <td className={cx("py-2 pr-4 text-muted", className)} {...props} />
  ),
  img: ({ className, ...props }: ComponentPropsWithoutRef<"img">) => (
    <span
      className={cx(
        "my-8 block overflow-hidden rounded-2xl border border-border",
        className,
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- MDX passes plain img props; dimensions aren't known statically */}
      <img className="w-full" alt="" {...props} />
    </span>
  ),
  VideoEmbed,
  Image,
};

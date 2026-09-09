"use client";

import dynamic from "next/dynamic";
import styles from "./mdx-playground.module.css";

/**
 * The playground pulls in most of `@neftaliaguilar/ui` (Dialog, Select,
 * TextField, Textarea, Toast, Tooltip, DropdownMenu). It appears in a single
 * case study, but `mdxComponents` is shared by every MDX route — so importing
 * it directly shipped that whole surface on every blog post too.
 *
 * Splitting it out keeps it off the critical path: it is an interactive
 * sandbox well below the fold, so there is nothing to server-render either.
 */
export const MdxPlayground = dynamic(
  () => import("./mdx-playground").then((m) => m.MdxPlayground),
  {
    ssr: false,
    loading: () => <div className={styles.placeholder} aria-hidden="true" />,
  },
);

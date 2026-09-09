import Link from "next/link";
import { getBufferStats, WEEKS_SHOWN } from "@/lib/buffer";
import { formatCompactNumber } from "@/lib/format";
import { BufferChart } from "@/app/components/buffer-chart";
import { HeroNefUiShowcase } from "@/app/components/hero-nef-ui-showcase";

const networkNames: Record<string, string> = {
  bluesky: "Bluesky",
  facebook: "Facebook",
  instagram: "Instagram",
  linkedin: "LinkedIn",
  mastodon: "Mastodon",
  pinterest: "Pinterest",
  threads: "Threads",
  tiktok: "TikTok",
  twitter: "X",
  youtube: "YouTube",
};

const freshnessFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
});

/**
 * The hero's right-hand card. Buffer's metrics come from a server-side API key,
 * so when that key isn't configured — local checkouts, forks, a Buffer outage —
 * this falls back to the design-system showcase rather than inventing numbers.
 */
export async function HeroBufferCard() {
  const stats = await getBufferStats();
  if (!stats) return <HeroNefUiShowcase />;

  const { weeks, totals, networks, metricsUpdatedAt } = stats;
  const tiles = [
    { label: "Posts", value: totals.posts },
    // `impressions` only comes back when every channel in the set reports it;
    // comments are part of the baseline trio and always do.
    totals.impressions > 0
      ? { label: "Impressions", value: totals.impressions }
      : { label: "Comments", value: totals.comments },
    { label: "Reactions", value: totals.reactions },
  ];

  return (
    <div className="overflow-hidden rounded-2xl bg-background shadow-[0_1px_2px_rgba(0,0,0,.06),0_20px_44px_-24px_rgba(0,0,0,.28)]">
      <div className="flex items-center justify-between gap-3 border-b border-border bg-surface px-4 py-2.5">
        <span className="font-mono text-xs uppercase tracking-widest text-muted">
          Buffer · last {WEEKS_SHOWN} weeks
        </span>
        {metricsUpdatedAt && (
          <span className="font-mono text-xs text-muted">
            {freshnessFormatter.format(new Date(metricsUpdatedAt))}
          </span>
        )}
      </div>

      <div className="px-4 pb-4 pt-3.5">
        <dl className="mb-3 grid grid-cols-3 gap-3">
          {tiles.map((tile) => (
            <div key={tile.label}>
              <dt className="font-mono text-xs uppercase tracking-widest text-muted">
                {tile.label}
              </dt>
              <dd className="mt-0.5 text-xl font-semibold tabular-nums text-foreground">
                {formatCompactNumber(tile.value)}
              </dd>
            </div>
          ))}
        </dl>

        <BufferChart weeks={weeks} />

        <p className="mt-3 text-xs leading-relaxed text-muted">
          Live from{" "}
          <Link
            href="https://developers.buffer.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Buffer&apos;s GraphQL API
          </Link>
          {networks.length > 0 && (
            <>
              {" "}
              across{" "}
              {networks
                .map((network) => networkNames[network] ?? network)
                .join(", ")}
            </>
          )}
          . Fetched on the server once a day.
        </p>

        <Link
          href="/blog/writing-in-public"
          className="mt-3 inline-flex items-center gap-1 rounded-sm text-xs font-semibold text-[var(--nef-accent-text)] transition-colors duration-[var(--nef-duration-fast)] ease-[var(--nef-ease-out)] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--nef-focus-ring)]"
        >
          What the numbers taught me
          <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>
    </div>
  );
}

import { cache } from "react";
import { getSentPosts } from "@/lib/buffer";
import {
  networkName,
  summariseWriting,
  type WritingSummary,
} from "@/lib/writing";
import { formatCompactNumber } from "@/lib/format";
import {
  CrossPostChart,
  EngagementScatter,
  ReachRankingChart,
  type CrossPostDatum,
  type EngagementDatum,
  type RankedDatum,
} from "@/app/components/writing-charts";

/**
 * The post embeds several of these components, and each one needs the same
 * summary. `getSentPosts` is already request-cached, so the API is hit once;
 * this caches the derivation on top so it also runs once.
 */
const loadSummary = cache(async (): Promise<WritingSummary | null> => {
  const posts = await getSentPosts();
  if (!posts || posts.length === 0) return null;

  const summary = summariseWriting(posts);
  return summary.posts.length > 0 ? summary : null;
});

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

function firstLine(text: string, max = 52) {
  const line = text.trim().split("\n")[0].trim();
  return line.length > max ? `${line.slice(0, max - 1)}…` : line;
}

/** Shown in place of a chart when the API is unreachable. The prose around it
 *  still stands, which is why the post doesn't 404 on missing data. */
function Unavailable() {
  return (
    <p className="my-8 rounded-2xl border border-dashed border-border px-4 py-6 text-center text-sm text-muted">
      Live publishing data is unavailable right now.
    </p>
  );
}

/* ------------------------------------------------------------------ */
/* Inline stats                                                        */
/* ------------------------------------------------------------------ */

/**
 * The comparisons the prose leans on, kept live so the sentences can't drift
 * from the charts underneath them as more posts go out.
 */
function readStat(summary: WritingSummary, name: string): string | null {
  const widest = summary.byNetwork[0];
  const narrowest = summary.byNetwork.at(-1);
  const topEarlier = summary.earlier[0];

  switch (name) {
    case "posts":
      return String(summary.totals.posts);
    case "impressions":
      return formatCompactNumber(summary.totals.impressions);
    case "reactions":
      return formatCompactNumber(summary.totals.reactions);
    case "firstPostDate":
      return summary.firstPostAt
        ? dateFormatter.format(new Date(summary.firstPostAt))
        : null;
    case "widestNetwork":
      return widest ? networkName(widest.network) : null;
    case "narrowestNetwork":
      return narrowest ? networkName(narrowest.network) : null;
    case "reachRatio":
      return widest && narrowest && narrowest.impressions > 0
        ? `${(widest.impressions / narrowest.impressions).toFixed(0)}×`
        : null;
    case "engagementRatio":
      return widest && narrowest && widest.averageEngagementRate > 0
        ? `${(narrowest.averageEngagementRate / widest.averageEngagementRate).toFixed(0)}×`
        : null;
    case "topEarlierImpressions":
      return topEarlier
        ? formatCompactNumber(topEarlier.metrics.impressions)
        : null;
    case "topEarlierDate":
      return topEarlier
        ? dateFormatter.format(new Date(topEarlier.sentAt))
        : null;
    default:
      return null;
  }
}

export async function Stat({ name }: { name: string }) {
  const summary = await loadSummary();
  const value = summary ? readStat(summary, name) : null;
  // An em dash rather than an empty span: a sentence with a visible gap reads
  // as missing data, which is what it is.
  return <span className="tabular-nums">{value ?? "—"}</span>;
}

/* ------------------------------------------------------------------ */
/* Charts                                                              */
/* ------------------------------------------------------------------ */

export async function CrossPostFigure() {
  const summary = await loadSummary();
  if (!summary || summary.crossPosted.length === 0) return <Unavailable />;

  const data: CrossPostDatum[] = summary.crossPosted.map((piece) => ({
    title: firstLine(piece.title, 44),
    linkedin: piece.byNetwork.linkedin ?? 0,
    twitter: piece.byNetwork.twitter ?? 0,
  }));

  return (
    <div className="my-8">
      <CrossPostChart data={data} />
    </div>
  );
}

export async function EngagementFigure() {
  const summary = await loadSummary();
  if (!summary) return <Unavailable />;

  const series = summary.byNetwork.map((network) => ({
    network: network.network,
    label: networkName(network.network),
    points: summary.posts
      .filter((post) => post.network === network.network)
      .map<EngagementDatum>((post) => ({
        title: firstLine(post.text),
        network: post.network,
        networkLabel: networkName(post.network),
        impressions: post.metrics.impressions,
        engagementRate: post.metrics.engagementRate,
      })),
  }));

  return (
    <div className="my-8">
      <EngagementScatter series={series} />
    </div>
  );
}

export async function ReachRankingFigure() {
  const summary = await loadSummary();
  if (!summary) return <Unavailable />;

  const writingIds = new Set(summary.posts.map((post) => post.id));
  const data: RankedDatum[] = summary.ranked.slice(0, 8).map((post) => ({
    title: firstLine(post.text, 46),
    impressions: post.metrics.impressions,
    networkLabel: networkName(post.network),
    isEarlier: !writingIds.has(post.id),
  }));

  return (
    <div className="my-8">
      <ReachRankingChart data={data} />
    </div>
  );
}

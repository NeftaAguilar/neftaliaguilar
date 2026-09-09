import type { BufferPost } from "@/lib/buffer";

/**
 * The first post written to share what I was learning, rather than to announce
 * something. Everything Buffer holds from before this is a different kind of
 * post — a job opening, a launch — and mixing the two would let the loudest
 * numbers on the page describe writing they didn't come from.
 */
export const WRITING_ERA_START = "2026-08-01";

export type NetworkTotals = {
  network: string;
  posts: number;
  impressions: number;
  reactions: number;
  comments: number;
  /** Mean of the per-post rates, in percent. */
  averageEngagementRate: number;
};

export type CrossPostedPiece = {
  /** First line of the longest version — enough to recognise the piece. */
  title: string;
  /** When the first of the pair went out. */
  sentAt: string;
  byNetwork: Record<string, number>;
};

export type WritingSummary = {
  posts: BufferPost[];
  /** Posts published before the writing era, newest first. */
  earlier: BufferPost[];
  firstPostAt: string | null;
  totals: { posts: number; impressions: number; reactions: number };
  byNetwork: NetworkTotals[];
  /** Pieces published to more than one network, newest first. */
  crossPosted: CrossPostedPiece[];
  /** Every post ranked by reach, writing era and earlier alike. */
  ranked: BufferPost[];
};

function isWritingEra(post: BufferPost) {
  return post.sentAt >= WRITING_ERA_START;
}

function firstLine(text: string) {
  const line = text.trim().split("\n")[0].trim();
  return line.length > 72 ? `${line.slice(0, 71)}…` : line;
}

function summariseNetworks(posts: BufferPost[]): NetworkTotals[] {
  const byNetwork = new Map<string, BufferPost[]>();
  for (const post of posts) {
    const bucket = byNetwork.get(post.network);
    if (bucket) bucket.push(post);
    else byNetwork.set(post.network, [post]);
  }

  return [...byNetwork.entries()]
    .map(([network, networkPosts]) => ({
      network,
      posts: networkPosts.length,
      impressions: sum(networkPosts, (post) => post.metrics.impressions),
      reactions: sum(networkPosts, (post) => post.metrics.reactions),
      comments: sum(networkPosts, (post) => post.metrics.comments),
      averageEngagementRate:
        sum(networkPosts, (post) => post.metrics.engagementRate) /
        networkPosts.length,
    }))
    .sort((a, b) => b.impressions - a.impressions);
}

function sum(posts: BufferPost[], read: (post: BufferPost) => number) {
  return posts.reduce((total, post) => total + read(post), 0);
}

/** Two posts count as the same piece if they went out this close together. */
const CROSS_POST_WINDOW_MS = 2 * 60 * 60 * 1000;

/**
 * Pieces published to more than one network back to back.
 *
 * Matched on publication time, not on text: only one piece so far is
 * word-for-word identical across networks — the rest are the same idea
 * rewritten to fit each one, so the wording can't do the matching. Grouping by
 * calendar day can't either; on a day with two separate pieces on one network
 * it would sum them into one bar and attribute the total to whichever piece
 * supplied the label.
 *
 * Candidate pairs are taken closest-first rather than in publication order.
 * Ordering greedily lets a stray post — a duplicate that reached nobody, say —
 * claim the partner belonging to the real one and strand it, which is exactly
 * what happens on the one day with a failed LinkedIn publish.
 *
 * Pairs only, so a piece on three networks yields the closest two. Worth
 * revisiting if a third network ever joins.
 */
function findCrossPosted(posts: BufferPost[]): CrossPostedPiece[] {
  const candidates: { gap: number; a: BufferPost; b: BufferPost }[] = [];

  for (let i = 0; i < posts.length; i++) {
    for (let j = i + 1; j < posts.length; j++) {
      const [a, b] = [posts[i], posts[j]];
      if (a.network === b.network) continue;

      const gap = Math.abs(
        new Date(a.sentAt).getTime() - new Date(b.sentAt).getTime(),
      );
      if (gap <= CROSS_POST_WINDOW_MS) candidates.push({ gap, a, b });
    }
  }

  candidates.sort((one, other) => one.gap - other.gap);

  const claimed = new Set<string>();
  const pieces: CrossPostedPiece[] = [];

  for (const { a, b } of candidates) {
    if (claimed.has(a.id) || claimed.has(b.id)) continue;
    claimed.add(a.id);
    claimed.add(b.id);

    // The longest version reads best as the label: the adapted copies are
    // usually trimmed to fit a network's limits.
    const longest = a.text.length >= b.text.length ? a : b;

    pieces.push({
      title: firstLine(longest.text),
      sentAt: a.sentAt < b.sentAt ? a.sentAt : b.sentAt,
      byNetwork: {
        [a.network]: a.metrics.impressions,
        [b.network]: b.metrics.impressions,
      },
    });
  }

  return pieces.sort((one, other) => other.sentAt.localeCompare(one.sentAt));
}

export function summariseWriting(posts: BufferPost[]): WritingSummary {
  const writing = posts.filter(isWritingEra);
  const earlier = posts.filter((post) => !isWritingEra(post));

  return {
    posts: writing,
    earlier,
    firstPostAt: writing.at(-1)?.sentAt ?? null,
    totals: {
      posts: writing.length,
      impressions: sum(writing, (post) => post.metrics.impressions),
      reactions: sum(writing, (post) => post.metrics.reactions),
    },
    byNetwork: summariseNetworks(writing),
    crossPosted: findCrossPosted(writing),
    ranked: [...posts].sort(
      (a, b) => b.metrics.impressions - a.metrics.impressions,
    ),
  };
}

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

export function networkName(network: string) {
  return networkNames[network] ?? network;
}

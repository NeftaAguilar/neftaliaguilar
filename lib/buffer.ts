import "server-only";
import { cache } from "react";

/**
 * Buffer's public API is a single GraphQL endpoint. The key is account-scoped
 * and grants access to every organization the account belongs to, so it never
 * leaves the server — this module is `server-only` for that reason.
 *
 * https://developers.buffer.com/guides/authentication
 */
const BUFFER_API_URL = "https://api.buffer.com";

/** How far back the writing page looks. Two years covers everything published. */
const ARCHIVE_MONTHS = 24;

/** Buffer refreshes post metrics once a day; polling faster only burns quota. */
const REVALIDATE_SECONDS = 60 * 60 * 24;

/** `posts` is cursor-paginated; this caps the walk so a busy account can't hang a build. */
const PAGE_SIZE = 100;
const MAX_PAGES = 10;

/**
 * Weeks, not months: at a personal publishing cadence a twelve-month view is
 * mostly empty buckets, which reads as a gap rather than as activity.
 *
 * Exported because the card and the chart both label themselves with it — the
 * window and the copy describing it must not drift apart.
 */
export const WEEKS_SHOWN = 8;

export type BufferWeek = {
  /** ISO date of the week's Monday, `YYYY-MM-DD`. The stable key. */
  weekStart: string;
  /** Sparse axis tick — the month name on the first week of a month, else `""`. */
  axisLabel: string;
  /** Full range for the tooltip, e.g. `Aug 4 – Aug 10`. */
  rangeLabel: string;
  posts: number;
};

/** The metrics this site reads. Buffer returns 0 for anything a network
 *  didn't report, so every field is a number rather than optional. */
export type BufferPostMetrics = {
  impressions: number;
  reach: number;
  reactions: number;
  comments: number;
  clicks: number;
  /** A percentage, already scaled: `8.33` means 8.33%. */
  engagementRate: number;
};

export type BufferPost = {
  id: string;
  text: string;
  /** ISO timestamp the post actually went out. */
  sentAt: string;
  /** Buffer's `channelService`, e.g. `linkedin`, `twitter`. */
  network: string;
  url: string | null;
  metrics: BufferPostMetrics;
  /** When Buffer last pulled these metrics from the network; can lag ~24h. */
  metricsUpdatedAt: string | null;
};

export type BufferStats = {
  weeks: BufferWeek[];
  totals: {
    posts: number;
    reactions: number;
    comments: number;
    /** Cross-network, but only when every channel in the set reports it. */
    impressions: number;
  };
  /** Distinct networks the posts went out on, e.g. `["linkedin", "twitter"]`. */
  networks: string[];
  /** Last time Buffer refreshed metrics from the networks — can lag ~24h. */
  metricsUpdatedAt: string | null;
  /** ISO date the window opens on. */
  since: string;
};

type PostMetric = { type: string; value: number };

type PostNode = {
  id: string;
  text: string;
  dueAt: string | null;
  sentAt: string | null;
  channelService: string | null;
  externalLink: string | null;
  metrics: PostMetric[] | null;
  metricsUpdatedAt: string | null;
};

type PostsResponse = {
  posts: {
    edges: { node: PostNode }[];
    pageInfo: { endCursor: string | null; hasNextPage: boolean };
  };
};

type OrganizationsResponse = {
  account: { organizations: { id: string }[] | null } | null;
};

const ORGANIZATIONS_QUERY = /* GraphQL */ `
  query PortfolioOrganizations {
    account {
      organizations {
        id
      }
    }
  }
`;

const POSTS_QUERY = /* GraphQL */ `
  query PortfolioSentPosts(
    $organizationId: OrganizationId!
    $start: DateTime!
    $end: DateTime!
    $first: Int!
    $after: String
  ) {
    posts(
      first: $first
      after: $after
      input: {
        organizationId: $organizationId
        filter: { status: [sent], dueAt: { start: $start, end: $end } }
      }
    ) {
      edges {
        node {
          id
          text
          dueAt
          sentAt
          channelService
          externalLink
          metricsUpdatedAt
          metrics {
            type
            value
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;

async function query<T>(
  apiKey: string,
  document: string,
  variables?: Record<string, unknown>,
): Promise<T> {
  const response = await fetch(BUFFER_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: document, variables }),
    next: { revalidate: REVALIDATE_SECONDS },
  });

  if (!response.ok) {
    throw new Error(`Buffer API returned ${response.status}`);
  }

  // GraphQL reports non-recoverable failures in `errors` with a 200 status,
  // so an `ok` response is not on its own a successful one.
  const body = (await response.json()) as {
    data?: T;
    errors?: { message: string }[];
  };

  if (body.errors?.length) {
    throw new Error(body.errors.map((error) => error.message).join("; "));
  }
  if (!body.data) {
    throw new Error("Buffer API returned no data");
  }

  return body.data;
}

const monthLabelFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  timeZone: "UTC",
});

const dayLabelFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  timeZone: "UTC",
});

const MS_PER_DAY = 24 * 60 * 60 * 1000;

/** Midnight UTC on the Monday of `date`'s week. */
function startOfWeek(date: Date) {
  const monday = new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()),
  );
  // `getUTCDay()` is 0 for Sunday, which belongs to the week that began six
  // days earlier rather than to the one starting the next day.
  const daysSinceMonday = (monday.getUTCDay() + 6) % 7;
  monday.setUTCDate(monday.getUTCDate() - daysSinceMonday);
  return monday;
}

function isoDate(date: Date) {
  return date.toISOString().slice(0, 10);
}

/**
 * The last `WEEKS_SHOWN` weeks, oldest first, pre-seeded at zero — a week with
 * nothing published is a real data point and has to keep its slot.
 */
function emptyWeeks(now: Date): BufferWeek[] {
  const currentWeek = startOfWeek(now);
  const weeks: BufferWeek[] = [];
  let lastMonthLabel = "";

  for (let offset = WEEKS_SHOWN - 1; offset >= 0; offset--) {
    const start = new Date(currentWeek.getTime() - offset * 7 * MS_PER_DAY);
    const end = new Date(start.getTime() + 6 * MS_PER_DAY);
    const month = monthLabelFormatter.format(start);

    weeks.push({
      weekStart: isoDate(start),
      // Twelve dated ticks don't fit a hero-sized card, so only the first week
      // landing in a month is labelled; the rest carry a bar without a tick.
      axisLabel: month === lastMonthLabel ? "" : month,
      rangeLabel: `${dayLabelFormatter.format(start)} – ${dayLabelFormatter.format(end)}`,
      posts: 0,
    });
    lastMonthLabel = month;
  }

  return weeks;
}

async function resolveOrganizationId(apiKey: string) {
  const configured = process.env.BUFFER_ORGANIZATION_ID;
  if (configured) return configured;

  const data = await query<OrganizationsResponse>(apiKey, ORGANIZATIONS_QUERY);
  return data.account?.organizations?.[0]?.id ?? null;
}

async function fetchSentPosts(
  apiKey: string,
  organizationId: string,
  start: string,
  end: string,
) {
  const nodes: PostNode[] = [];
  let after: string | null = null;

  for (let page = 0; page < MAX_PAGES; page++) {
    const data: PostsResponse = await query<PostsResponse>(
      apiKey,
      POSTS_QUERY,
      { organizationId, start, end, first: PAGE_SIZE, after },
    );

    for (const edge of data.posts.edges) nodes.push(edge.node);

    if (!data.posts.pageInfo.hasNextPage) return nodes;
    after = data.posts.pageInfo.endCursor;
    if (!after) return nodes;
  }

  // Falling out of the loop means the cap stopped a walk Buffer had more pages
  // for. Every total, ranking and weekly bucket downstream is then computed
  // from a partial archive, so say so rather than quietly under-reporting.
  console.warn(
    `[buffer] stopped at the ${MAX_PAGES}-page cap after ${nodes.length} posts; ` +
      "Buffer has more. Totals and rankings are incomplete — raise MAX_PAGES.",
  );

  return nodes;
}

function readMetrics(metrics: PostMetric[] | null): BufferPostMetrics {
  const totals: BufferPostMetrics = {
    impressions: 0,
    reach: 0,
    reactions: 0,
    comments: 0,
    clicks: 0,
    engagementRate: 0,
  };

  for (const metric of metrics ?? []) {
    if (metric.type in totals) {
      totals[metric.type as keyof BufferPostMetrics] = metric.value;
    }
  }

  return totals;
}

/**
 * Every sent post Buffer still has, newest first — the raw material the
 * writing page reads. `null` on the same terms as `getBufferStats`.
 */
export const getSentPosts = cache(async (): Promise<BufferPost[] | null> => {
  const apiKey = process.env.BUFFER_API_KEY;
  if (!apiKey) return null;

  try {
    const organizationId = await resolveOrganizationId(apiKey);
    if (!organizationId) return null;

    const now = new Date();
    const start = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - ARCHIVE_MONTHS, 1),
    );

    const nodes = await fetchSentPosts(
      apiKey,
      organizationId,
      start.toISOString(),
      now.toISOString(),
    );

    return nodes
      .flatMap((node) => {
        const sentAt = node.sentAt ?? node.dueAt;
        if (!sentAt || !node.channelService) return [];
        return [
          {
            id: node.id,
            text: node.text,
            sentAt,
            network: node.channelService,
            url: node.externalLink,
            metrics: readMetrics(node.metrics),
            metricsUpdatedAt: node.metricsUpdatedAt,
          },
        ];
      })
      .sort((a, b) => b.sentAt.localeCompare(a.sentAt));
  } catch (error) {
    console.warn(
      "[buffer] could not load the post archive:",
      error instanceof Error ? error.message : error,
    );
    return null;
  }
});

/**
 * Publishing activity over the last `WEEKS_SHOWN` weeks, or `null` when the
 * API key is absent or Buffer is unreachable.
 *
 * Derived from `getSentPosts()` rather than from a narrower query of its own:
 * the archive already contains these weeks, and `cache()` means the hero and
 * the writing post share one request per render instead of taking one each.
 * Callers render a fallback on `null` rather than invented numbers — a
 * portfolio stat that isn't real is worse than no stat at all.
 */
export async function getBufferStats(): Promise<BufferStats | null> {
  const posts = await getSentPosts();
  if (!posts) return null;

  const now = new Date();
  const weeks = emptyWeeks(now);
  const byWeek = new Map(weeks.map((entry) => [entry.weekStart, entry]));
  const networks = new Set<string>();
  let reactions = 0;
  let comments = 0;
  let impressions = 0;
  let metricsFreshness: string | null = null;

  for (const post of posts) {
    // The chart and the stat row read from the same window, so a card headed
    // "last N weeks" can't carry a total that quietly covers longer.
    const bucket = byWeek.get(isoDate(startOfWeek(new Date(post.sentAt))));
    if (!bucket) continue;

    bucket.posts += 1;
    networks.add(post.network);
    reactions += post.metrics.reactions;
    comments += post.metrics.comments;
    impressions += post.metrics.impressions;

    if (
      post.metricsUpdatedAt &&
      (!metricsFreshness || post.metricsUpdatedAt > metricsFreshness)
    ) {
      metricsFreshness = post.metricsUpdatedAt;
    }
  }

  const totalPosts = weeks.reduce((sum, entry) => sum + entry.posts, 0);
  if (totalPosts === 0) return null;

  return {
    weeks,
    totals: {
      posts: totalPosts,
      reactions: Math.round(reactions),
      comments: Math.round(comments),
      impressions: Math.round(impressions),
    },
    networks: [...networks].sort(),
    metricsUpdatedAt: metricsFreshness,
    since: weeks[0].weekStart,
  };
}

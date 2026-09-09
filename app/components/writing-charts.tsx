"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  Legend,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from "recharts";

const SERIES_1 = "var(--chart-series-1)";
const SERIES_2 = "var(--chart-series-2)";

const axisTick = {
  fill: "var(--nef-fg-muted)",
  fontSize: 11,
  fontFamily: "var(--font-geist-mono)",
};

const gridStroke = "var(--nef-border)";

function TooltipShell({
  title,
  rows,
}: {
  title: string;
  rows: { label: string; value: string }[];
}) {
  return (
    <div className="max-w-64 rounded-lg border border-border bg-background px-3 py-2 shadow-[var(--nef-shadow-2)]">
      <p className="mb-1 text-xs font-semibold leading-snug text-foreground">
        {title}
      </p>
      {rows.map((row) => (
        <p key={row.label} className="font-mono text-xs text-muted">
          {row.label}: <span className="text-foreground">{row.value}</span>
        </p>
      ))}
    </div>
  );
}

/** Recharts' generics don't narrow to a chart's own datum, so each tooltip
    declares the shape it actually reads. */
type TooltipProps<T> = {
  active?: boolean;
  payload?: readonly { payload?: T }[];
};

const numberFormatter = new Intl.NumberFormat("en-US");

/* ------------------------------------------------------------------ */
/* Same piece, two networks                                            */
/* ------------------------------------------------------------------ */

export type CrossPostDatum = {
  title: string;
  linkedin: number;
  twitter: number;
};

function CrossPostTooltip({ active, payload }: TooltipProps<CrossPostDatum>) {
  const point = active ? payload?.[0]?.payload : undefined;
  if (!point) return null;
  return (
    <TooltipShell
      title={point.title}
      rows={[
        { label: "LinkedIn", value: numberFormatter.format(point.linkedin) },
        { label: "X", value: numberFormatter.format(point.twitter) },
      ]}
    />
  );
}

export function CrossPostChart({ data }: { data: CrossPostDatum[] }) {
  return (
    <figure className="m-0">
      <table className="sr-only">
        <caption>Impressions for the same piece on each network</caption>
        <thead>
          <tr>
            <th scope="col">Piece</th>
            <th scope="col">LinkedIn</th>
            <th scope="col">X</th>
          </tr>
        </thead>
        <tbody>
          {data.map((piece) => (
            <tr key={piece.title}>
              <th scope="row">{piece.title}</th>
              <td>{piece.linkedin}</td>
              <td>{piece.twitter}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div aria-hidden="true" className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 4, right: 16, bottom: 0, left: 0 }}
            barGap={2}
            accessibilityLayer={false}
          >
            <CartesianGrid horizontal={false} stroke={gridStroke} />
            <XAxis
              type="number"
              tick={axisTick}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              type="category"
              dataKey="title"
              width={150}
              tick={{ ...axisTick, fontSize: 10 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              content={CrossPostTooltip}
              cursor={{ fill: "transparent" }}
            />
            <Legend
              verticalAlign="top"
              align="left"
              height={28}
              formatter={(value) => (
                <span className="text-xs text-muted">{value}</span>
              )}
            />
            <Bar
              dataKey="linkedin"
              name="LinkedIn"
              fill={SERIES_1}
              radius={[0, 4, 4, 0]}
              maxBarSize={14}
            />
            <Bar
              dataKey="twitter"
              name="X"
              fill={SERIES_2}
              radius={[0, 4, 4, 0]}
              maxBarSize={14}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/* Reach against engagement rate                                       */
/* ------------------------------------------------------------------ */

export type EngagementDatum = {
  title: string;
  network: string;
  networkLabel: string;
  impressions: number;
  engagementRate: number;
};

function EngagementTooltip({ active, payload }: TooltipProps<EngagementDatum>) {
  const point = active ? payload?.[0]?.payload : undefined;
  if (!point) return null;
  return (
    <TooltipShell
      title={point.title}
      rows={[
        { label: "Network", value: point.networkLabel },
        {
          label: "Impressions",
          value: numberFormatter.format(point.impressions),
        },
        { label: "Engagement", value: `${point.engagementRate.toFixed(2)}%` },
      ]}
    />
  );
}

export function EngagementScatter({
  series,
}: {
  series: { network: string; label: string; points: EngagementDatum[] }[];
}) {
  return (
    <figure className="m-0">
      <table className="sr-only">
        <caption>Engagement rate against impressions, by network</caption>
        <thead>
          <tr>
            <th scope="col">Post</th>
            <th scope="col">Network</th>
            <th scope="col">Impressions</th>
            <th scope="col">Engagement rate</th>
          </tr>
        </thead>
        <tbody>
          {series.flatMap((group) =>
            group.points.map((point) => (
              <tr key={`${group.network}-${point.title}`}>
                <th scope="row">{point.title}</th>
                <td>{point.networkLabel}</td>
                <td>{point.impressions}</td>
                <td>{point.engagementRate.toFixed(2)}%</td>
              </tr>
            )),
          )}
        </tbody>
      </table>

      <div aria-hidden="true" className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart
            margin={{ top: 4, right: 16, bottom: 24, left: 0 }}
            accessibilityLayer={false}
          >
            <CartesianGrid stroke={gridStroke} />
            <XAxis
              type="number"
              dataKey="impressions"
              name="Impressions"
              tick={axisTick}
              axisLine={false}
              tickLine={false}
              label={{
                value: "Impressions",
                position: "insideBottom",
                offset: -12,
                fill: "var(--nef-fg-muted)",
                fontSize: 11,
              }}
            />
            <YAxis
              type="number"
              dataKey="engagementRate"
              name="Engagement rate"
              unit="%"
              tick={axisTick}
              axisLine={false}
              tickLine={false}
              width={44}
            />
            {/* Fixed marker size: the third dimension would encode nothing. */}
            <ZAxis range={[80, 80]} />
            <Tooltip
              content={EngagementTooltip}
              cursor={{ strokeDasharray: "3 3", stroke: gridStroke }}
            />
            <Legend
              verticalAlign="top"
              align="left"
              height={28}
              formatter={(value) => (
                <span className="text-xs text-muted">{value}</span>
              )}
            />
            {series.map((group, index) => (
              <Scatter
                key={group.network}
                name={group.label}
                data={group.points}
                fill={index === 0 ? SERIES_1 : SERIES_2}
                // A 2px surface ring keeps overlapping points readable.
                stroke="var(--nef-bg)"
                strokeWidth={2}
              />
            ))}
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/* Reach ranking                                                       */
/* ------------------------------------------------------------------ */

export type RankedDatum = {
  title: string;
  impressions: number;
  networkLabel: string;
  /** Published before the writing era — coloured apart and named in the copy. */
  isEarlier: boolean;
};

function RankedTooltip({ active, payload }: TooltipProps<RankedDatum>) {
  const point = active ? payload?.[0]?.payload : undefined;
  if (!point) return null;
  return (
    <TooltipShell
      title={point.title}
      rows={[
        { label: "Network", value: point.networkLabel },
        {
          label: "Impressions",
          value: numberFormatter.format(point.impressions),
        },
      ]}
    />
  );
}

export function ReachRankingChart({ data }: { data: RankedDatum[] }) {
  return (
    <figure className="m-0">
      <table className="sr-only">
        <caption>Posts ranked by impressions</caption>
        <thead>
          <tr>
            <th scope="col">Post</th>
            <th scope="col">Network</th>
            <th scope="col">Impressions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((post) => (
            <tr key={post.title}>
              <th scope="row">{post.title}</th>
              <td>{post.networkLabel}</td>
              <td>{post.impressions}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div aria-hidden="true" className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 4, right: 44, bottom: 0, left: 0 }}
            accessibilityLayer={false}
          >
            <XAxis type="number" hide />
            <YAxis
              type="category"
              dataKey="title"
              width={170}
              tick={{ ...axisTick, fontSize: 10 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={RankedTooltip} cursor={{ fill: "transparent" }} />
            <Bar dataKey="impressions" radius={[0, 4, 4, 0]} maxBarSize={16}>
              {data.map((post) => (
                <Cell
                  key={post.title}
                  fill={post.isEarlier ? SERIES_2 : SERIES_1}
                />
              ))}
              {/* Direct labels: the axis is hidden, so the value rides the bar. */}
              <LabelList
                dataKey="impressions"
                position="right"
                className="fill-muted"
                fontSize={11}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </figure>
  );
}

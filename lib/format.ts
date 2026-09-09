// Constructing an `Intl.DateTimeFormat` is the expensive part of formatting a
// date, and `toLocaleDateString` builds a fresh one on every call. One
// module-level instance is reused by every card and post header.
const dateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

/** Formats a `YYYY-MM-DD` frontmatter date, anchored to local midnight so the
 * day never drifts backwards across timezones. */
export function formatDate(date: string): string {
  return dateFormatter.format(new Date(`${date}T00:00:00`));
}

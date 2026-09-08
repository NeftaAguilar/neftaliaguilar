export function SectionHeading({
  eyebrow,
  title,
  id,
  level = 2,
}: {
  eyebrow: string;
  title: string;
  id?: string;
  /** Use 1 when this is the page's only title (e.g. an index page). */
  level?: 1 | 2;
}) {
  const Heading = level === 1 ? "h1" : "h2";

  return (
    <div className="mb-10">
      <p className="text-sm font-medium uppercase tracking-widest text-muted">
        {eyebrow}
      </p>
      <Heading
        id={id}
        className="mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
      >
        {title}
      </Heading>
    </div>
  );
}

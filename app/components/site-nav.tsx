import { Button } from "@/app/ui";

const sections = [
  { href: "#lab", label: "Lab" },
  { href: "#work", label: "Case studies" },
  { href: "#toolbox", label: "Toolbox" },
  { href: "#experience", label: "Experience" },
  { href: "#writing", label: "Writing" },
];

export function SiteNav() {
  return (
    <nav
      aria-label="Section"
      className="sticky top-3 z-50 mx-auto flex max-w-3xl flex-wrap items-center gap-2 rounded-2xl border border-border bg-background/85 px-3 py-2 shadow-[var(--nef-shadow-1)] backdrop-blur-md"
    >
      <div className="mr-1 flex items-center gap-2.5">
        <div className="grid size-7 place-items-center rounded-lg bg-foreground text-xs font-bold tracking-tight text-background">
          NA
        </div>
        <span className="hidden text-xs font-semibold leading-tight sm:block">
          Neftali
          <br />
          Aguilar
        </span>
      </div>
      <div className="flex items-center gap-1.5 rounded-full border border-border bg-[var(--nef-accent-surface)] px-2.5 py-1">
        <span className="size-1.5 rounded-full bg-[var(--nef-accent)]" />
        <span className="font-mono text-[10px] font-medium uppercase tracking-[0.1em] text-[var(--nef-accent-text)]">
          Available · Senior Design Engineer
        </span>
      </div>
      <div className="flex-1" />
      <div className="flex flex-wrap items-center gap-0.5">
        {sections.map((section) => (
          <a
            key={section.href}
            href={section.href}
            className="rounded-lg px-2.5 py-1.5 text-[13px] text-muted transition-colors duration-[var(--nef-duration-fast)] ease-[var(--nef-ease-out)] hover:bg-surface hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--nef-focus-ring)]"
          >
            {section.label}
          </a>
        ))}
        <Button asChild variant="solid" size="sm" className="ml-1.5">
          <a href="mailto:hola@neftaliaguilar.com">Get in touch</a>
        </Button>
      </div>
    </nav>
  );
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/app/ui";
import { links } from "@/lib/links";
import { ThemeToggle } from "@/app/components/theme-toggle";

const sections = [
  { href: "#lab", label: "Lab" },
  { href: "#work", label: "Case studies" },
  { href: "#toolbox", label: "Toolbox" },
  { href: "#experience", label: "Experience" },
  { href: "#writing", label: "Writing" },
];

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      aria-label="Section"
      className={`sticky top-3 z-50 mx-auto flex w-[calc(100%-2rem)] max-w-3xl items-center gap-2 overflow-x-auto rounded-2xl border border-border bg-background/85 px-3 py-2 backdrop-blur-md transition-shadow duration-[var(--nef-duration-normal)] ease-[var(--nef-ease-out)] sm:w-[calc(100%-3rem)] ${
        scrolled
          ? "shadow-[var(--nef-shadow-3)]"
          : "shadow-[var(--nef-shadow-1)]"
      }`}
    >
      <Link
        href="/"
        className="mr-1 flex shrink-0 items-center gap-2.5 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--nef-focus-ring)]"
      >
        <div className="grid size-7 shrink-0 place-items-center rounded-lg bg-foreground text-xs font-bold tracking-tight text-background">
          NA
        </div>
        <span className="whitespace-nowrap text-xs font-semibold">
          Neftali Aguilar
        </span>
      </Link>
      <div className="flex-1" />
      {/* Outside the `sm:` group on purpose — the theme toggle is the one
          control here that has to stay reachable on a phone. */}
      <ThemeToggle className="shrink-0" />
      <div className="hidden shrink-0 items-center gap-0.5 sm:flex">
        {sections.map((section) => (
          <Link
            key={section.href}
            href={isHome ? section.href : `/${section.href}`}
            className="rounded-lg px-2.5 py-1.5 text-xs whitespace-nowrap text-muted transition-colors duration-[var(--nef-duration-fast)] ease-[var(--nef-ease-out)] hover:bg-surface hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--nef-focus-ring)]"
          >
            {section.label}
          </Link>
        ))}
        <Button asChild variant="solid" size="sm" className="ml-1.5 shrink-0">
          <a href={links.email}>Get in touch</a>
        </Button>
      </div>
    </nav>
  );
}

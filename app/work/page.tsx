import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/app/ui";
import { SectionHeading } from "@/app/components/section-heading";
import { WorkCard } from "@/app/components/work-card";
import { Reveal } from "@/app/components/reveal";
import { getAllCaseStudies } from "@/lib/work";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Case studies on design systems, component libraries, and front-end craft.",
};

export default function WorkIndex() {
  const caseStudies = getAllCaseStudies();

  return (
    <div className="flex flex-1 flex-col bg-background text-foreground">
      <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-24 sm:px-8">
        <Button asChild variant="ghost" size="sm">
          <Link href="/">← Back to home</Link>
        </Button>
        <Reveal className="mt-8">
          <SectionHeading eyebrow="Selected work" title="Work" />
          <div className="space-y-4">
            {caseStudies.map((study) => (
              <WorkCard key={study.slug} study={study} />
            ))}
          </div>
        </Reveal>
      </main>
    </div>
  );
}

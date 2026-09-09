import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { MotionConfig } from "motion/react";
import { SiteNav } from "@/app/components/site-nav";
import "@neftaliaguilar/ui/styles.css";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://neftaliaguilar.com";
const title = "Neftali Aguilar — Design Systems & Frontend Engineering";
const description =
  "Senior software engineer focused on design systems, interaction detail, and accessibility — React and TypeScript products built on component systems teams can trust.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s — Neftali Aguilar",
  },
  description,
  keywords: [
    "Neftali Aguilar",
    "Design Systems",
    "Frontend Engineering",
    "Interaction Design",
    "Accessibility",
    "React",
    "Next.js",
    "TypeScript",
    "Component Systems",
  ],
  authors: [{ name: "Neftali Aguilar", url: siteUrl }],
  creator: "Neftali Aguilar",
  openGraph: {
    type: "website",
    url: siteUrl,
    title,
    description,
    siteName: "Neftali Aguilar",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

// @neftaliaguilar/ui themes via a `data-theme` attribute rather than
// `prefers-color-scheme`. Set it before hydration to avoid a flash of the
// wrong theme, preferring a persisted choice (written by a future theme
// toggle) over the OS preference.
const themeSyncScript = `(function(){try{var s=localStorage.getItem('theme');var t=s==='light'||s==='dark'?s:(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.setAttribute('data-theme',t)}catch(e){}})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      // The script below writes `data-theme` before React hydrates, so the
      // client tree legitimately differs from the server's on this element.
      // Scoped to <html>: it does not suppress warnings for descendants.
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeSyncScript }} />
      </head>
      <body className="min-h-full flex flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-background focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-foreground focus:outline focus:outline-2 focus:outline-[var(--nef-focus-ring)]"
        >
          Skip to content
        </a>
        <SiteNav />
        <MotionConfig reducedMotion="user">{children}</MotionConfig>
        <Analytics />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
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
const title = "Neftali Aguilar — Senior Software Engineer";
const description =
  "Senior Software Engineer specializing in frontend architecture, React, TypeScript, and design systems. Currently exploring AI-augmented engineering with the Vercel AI SDK and RAG.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s — Neftali Aguilar",
  },
  description,
  keywords: [
    "Neftali Aguilar",
    "Senior Software Engineer",
    "Frontend Architecture",
    "React",
    "Next.js",
    "TypeScript",
    "Design Systems",
    "Vercel AI SDK",
    "RAG",
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
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeSyncScript }} />
      </head>
      <body className="min-h-full flex flex-col">
        {children}
        <Analytics />
      </body>
    </html>
  );
}

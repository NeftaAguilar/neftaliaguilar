"use client";

// @neftaliaguilar/ui ships client components without a "use client" directive
// in its bundle, so re-export through a directive-carrying module to give
// Next.js a clean client boundary when importing from Server Components.
export { Button } from "@neftaliaguilar/ui";

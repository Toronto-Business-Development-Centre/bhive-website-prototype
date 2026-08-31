// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Set GITHUB_PAGES_BASE (e.g. "/bhive-website-prototype/") to produce a fully
// prerendered static build for GitHub Pages instead of the Cloudflare SSR build.
const ghPagesBase = process.env.GITHUB_PAGES_BASE;

export default defineConfig({
  ...(ghPagesBase ? { nitro: false as const, vite: { base: ghPagesBase } } : {}),
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
    ...(ghPagesBase
      ? {
          router: { basepath: ghPagesBase },
          prerender: { enabled: true, crawlLinks: true },
        }
      : {}),
  },
});

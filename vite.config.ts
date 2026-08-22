// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// On Vercel we must emit the Vercel Build Output API bundle (.vercel/output)
// instead of the default Cloudflare Worker bundle, otherwise the deployment
// "succeeds" but serves nothing. Lovable's own sandbox/hosting build ignores
// this and always forces its own preset.
const vercelPreset =
  process.env.VERCEL || process.env.NITRO_PRESET === "vercel" ? "vercel" : undefined;

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  ...(vercelPreset ? { nitro: { preset: vercelPreset } } : {}),
});

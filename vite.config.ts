import { reactRouter } from "@react-router/dev/vite";
import { vercelPreset } from "@vercel/react-router/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

const reactRouterWithVercel = (reactRouter as any)({ presets: [vercelPreset()] });

export default defineConfig({
  plugins: [tailwindcss(), reactRouterWithVercel, tsconfigPaths()],
  build: {
    chunkSizeWarningLimit: 1200,
    sourcemap: false,
    rollupOptions: {
      onwarn(warning, defaultHandler) {
        if (warning.code === "SOURCEMAP_ERROR") return;
        defaultHandler(warning);
      },
    },
  },
});

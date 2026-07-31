import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 2999,
    open: true,
  },
  resolve: {
    alias: {
      "@": resolve(import.meta.dirname, "src"),
      app: resolve(import.meta.dirname, "src/app"),
      __mocked__: resolve(import.meta.dirname, "src/__mocked__"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
  },
});

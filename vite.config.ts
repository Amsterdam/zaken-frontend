import { defineConfig } from "vite";
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
      "@": resolve(__dirname, "src"),
      app: resolve(__dirname, "src/app"),
      __mocked__: resolve(__dirname, "src/__mocked__"),
    },
  },
});

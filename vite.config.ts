import { resolve } from "node:path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import packageJson from './package.json'

export default defineConfig({
  build: {
    rollupOptions: {
      external: [
        ...Object.keys(packageJson.dependencies || {}),
        ...Object.keys(packageJson.devDependencies || {}),
        /^node:/,
        /^vitechgroup:/,
      ],
    },

    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      formats: ["es", "cjs"],
      name: "index",
      fileName: "index",
    },
  },
  plugins: [dts({ rollupTypes: true })],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
});

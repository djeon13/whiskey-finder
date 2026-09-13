import { resolve } from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  base: "/whiskey-finder/",
  plugins: [tsconfigPaths(), react()],
  resolve: {
    alias: { src: resolve(__dirname, "./src") },
  },
});

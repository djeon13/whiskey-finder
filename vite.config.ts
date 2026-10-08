import { resolve } from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  base: "/whiskey-finder/",
  plugins: [tsconfigPaths(), react()],
  resolve: {
    alias: {
      src: resolve(__dirname, "./src"),
      "@assets": resolve(__dirname, "./src/assets"),
      "@components": resolve(__dirname, "./src/components"),
      "@data": resolve(__dirname, "./src/data"),
      "@fonts": resolve(__dirname, "./src/fonts"),
      "@styles": resolve(__dirname, "./src/styles"),
      "@types": resolve(__dirname, "./src/types"),
      "@utils": resolve(__dirname, "./src/utils"),
    },
  },
});

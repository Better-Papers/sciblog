import path from "path";
import { searchForWorkspaceRoot } from "vite";
import { sveltekit } from "@sveltejs/kit/vite";

/**
 * @type {import('vite').UserConfig}
 */
const config = {
  plugins: [sveltekit()],
  resolve: {
    alias: {
      $src: path.resolve("./src"),
      $comps: path.resolve("./src/lib/components"),
      $posts: path.resolve("./src/posts"),
    },
  },
  server: {
    fs: {
      allow: [searchForWorkspaceRoot(process.cwd())],
    },
  },
  build: {
    target: "esnext",
    chunkSizeWarningLimit: 1024,
  },
  assetsInclude: ["src/**/*.csv"],
};
export default config;

import { sveltekit } from "@sveltejs/kit/vite";
import path from "path";
import type { UserConfig } from "vite";

const config: UserConfig = {
  plugins: [sveltekit()],
  resolve: {
    alias: {
      $src: path.resolve("./src"),
      $posts: path.resolve("./src/posts"),
      $comps: path.resolve("./src/components"),
    },
  },
  assetsInclude: ["src/**/*.csv"],
};

export default config;

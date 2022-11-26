import { mdsvex } from "mdsvex";
import mdsvexConfig from "./mdsvex.config.js";
import adapter from "@sveltejs/adapter-static";
import path from "path";
import preprocess from "svelte-preprocess";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: [".svelte", ...mdsvexConfig.extensions],

  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: [preprocess({ postcss: true }), mdsvex(mdsvexConfig)],

  kit: {
    adapter: adapter({
      // default options are shown
      pages: "build",
      assets: "build",
      fallback: null,
    }),
    vite: {
      resolve: {
        alias: {
          $src: path.resolve("./src"),
          $posts: path.resolve("./src/posts"),
          $comps: path.resolve("./src/components"),
        },
      },
      assetsInclude: ["src/**/*.csv"],
    },

    appDir: "internal",
    prerender: { default: true },
  },
};

export default config;

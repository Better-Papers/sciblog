import slugify from "slugify";
import type { SvelteComponent } from "svelte/internal";

export type Post = {
  post: {
    default: SvelteComponent;
    metadata: { title?: string; subtitle?: string; date?: string; citekey?: string; tags?: string[] };
  };
  slug: string;
  raw: string;
};

const raw = import.meta.glob(`$posts/**/*.md`, { eager: true, as: "raw" });
const processed = import.meta.glob(`$posts/**/*.md`, { eager: true });

export const posts = Object.keys(processed)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  .filter((path) => Boolean(processed[path].metadata?.title))
  .map((path) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const title = processed[path].metadata.title as string;
    const slug = slugify(title, { lower: true });
    return { post: processed[path], raw: raw[path], slug } as Post;
  });

import { posts } from "$src/lib/slug";
import type { RequestHandler } from "@sveltejs/kit";

export const get: RequestHandler = ({ url }) => {
  const limit = Number(url.searchParams.get("limit") ?? Infinity);
  if (Number.isNaN(limit)) return { status: 400 };

  const tag = url.searchParams.get("tag");
  const filteredPosts = tag ? posts.filter((post) => post.post.metadata?.tags?.includes(tag)) : posts;

  // posts.sort((a, b) => (new Date(a.date) > new Date(b.date) ? -1 : 1));

  return {
    body: filteredPosts.slice(0, limit),
  };
};

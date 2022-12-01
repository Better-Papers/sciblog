import { posts } from "$src/lib/slug";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = ({ url }) => {
  const limit = Number(url.searchParams.get("limit") ?? Infinity);
  if (Number.isNaN(limit)) return new Response("", { status: 400 });

  const tag = url.searchParams.get("tag");
  const filteredPosts = tag ? posts.filter((post) => post.post.metadata?.tags?.includes(tag)) : posts;

  // posts.sort((a, b) => (new Date(a.date) > new Date(b.date) ? -1 : 1));
  return new Response(JSON.stringify(filteredPosts.slice(0, limit)));
};

import { posts } from "$lib/slug";
import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load: PageLoad = ({ params }) => {
  const filteredPost = posts.filter((post) => post.post.metadata.tags?.includes(params.slug));
  // const header = url.searchParams.get("header") === "false" ? false : true;
  if (!filteredPost) {
    throw error(404, "Not found.");
  }

  return { filtered: filteredPost, slug: params.slug };
};

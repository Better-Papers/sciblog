import { posts } from "$src/lib/slug";
import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load: PageLoad = ({ params }) => {
  const filteredPost = posts.find((post) => post.slug === params.slug.toLowerCase());
  // const header = url.searchParams.get("header") === "false" ? false : true;
  if (!filteredPost) {
    throw error(404, "Not found.");
  }
  console.log(filteredPost);

  return filteredPost;
};

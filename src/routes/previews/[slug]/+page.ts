import { posts } from "$src/lib/slug";
import { error, type Load } from "@sveltejs/kit";

export const load: Load = ({ params }) => {
  const filteredPost = posts.find((post) => post.slug === params.slug.toLowerCase());
  // const header = url.searchParams.get("header") === "false" ? false : true;
  if (filteredPost) {
    return { post: filteredPost };
  }
  throw error(404, "Not found.");
};

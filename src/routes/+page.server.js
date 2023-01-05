import { error } from "@sveltejs/kit";

export async function load({ fetch }) {
  const url = `/api/posts`;
  const response = await fetch(url);
  const posts = await response.json();
  if (response.ok) {
    return {
      posts,
    };
  }

  throw error(500, "Couldn't fetch posts");
}

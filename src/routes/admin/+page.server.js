import { error } from "@sveltejs/kit";

export async function load({ fetch, locals }) {
  const user = locals.user;

  if (!user) {
    throw error(401, {
      message: "You must be logged in to view this page",
    });
  }

  const url = `/api/posts`;
  const response = await fetch(url);
  const posts = await response.json();

  if (response.ok) {
    return {
      posts,
      user,
    };
  }

  throw error(500, "Couldn't fetch posts");
}

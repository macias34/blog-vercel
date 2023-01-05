import { error } from "@sveltejs/kit";

export async function load({ fetch, locals }) {
  const user = locals.user;

  if (!user) {
    throw error(401, {
      message: "You must be logged in to view this page",
    });
  }
  const url = `/api/categories`;
  const response = await fetch(url);
  const categories = await response.json();

  if (response.ok) {
    return {
      categories,
      user,
    };
  }

  throw error(500, "Couldn't fetch categories");
}

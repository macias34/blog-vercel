import { error } from "@sveltejs/kit";
import { prisma } from "$lib/Server/prisma";

export const GET = async ({ params }) => {
  const post_url = params.url;

  const post = await prisma.post.findFirst({
    where: {
      url: post_url,
    },
    include: {
      categories: true,
      thumbnail: true,
    },
  });

  if (!post) throw error(500, `Couldn't fetch post with URL : ${post_url}`);

  return new Response(JSON.stringify(post));
};

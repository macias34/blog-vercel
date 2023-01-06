import { error } from "@sveltejs/kit";
import { prisma } from "$lib/Server/prisma";
import { authController } from "$lib/Server/user.model";

export const GET = async ({ params }) => {
  const category_id = parseInt(params.id);
  try {
    const category = await prisma.category.findUnique({
      where: {
        category_id,
      },
      include: {
        posts: true,
      },
    });

    if (!category) throw error(500, "Couldn't fetch the category.");
    return new Response(JSON.stringify(category));
  } catch (err) {
    console.log(err);
    throw error(500, "Couldn't fetch the category.");
  }
};

export const PUT = async ({ request, params, locals }) => {
  authController(locals);
  try {
    const body = await request.json();
    const { label, color } = body;
    const category_id = parseInt(params.id);
    const category = await prisma.category.update({
      where: { category_id },
      data: {
        label,
        color,
      },
    });

    return new Response(
      JSON.stringify({ message: "Category updated succesfully." })
    );
  } catch (err) {
    console.log(err);
    throw error(500, "Failed to update the category.");
  }
};

export const DELETE = async ({ params, locals }) => {
  authController(locals);
  const category_id = parseInt(params.id);

  try {
    const deleteFromPosts = await prisma.postCategory.deleteMany({
      where: {
        category_id,
      },
    });

    const category = await prisma.category.delete({
      where: {
        category_id,
      },
    });

    return new Response(
      JSON.stringify({ message: "Category deleted succesfully." })
    );
  } catch (err) {
    console.log(err);
    throw error(500, "Couldn't delete the category.");
  }
};

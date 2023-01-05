import { prisma } from "$lib/Server/prisma";
import { authController } from "$lib/Server/user.model";
import { error } from "@sveltejs/kit";
import fs from "fs";
const imagesPath = ".././post_imgs/";

export const GET = async ({ params }) => {
  try {
    const fileName = params.imageName;
    const fileStream = await fs.createReadStream(imagesPath + fileName);

    return new Response(fileStream);
  } catch (err) {
    throw error(500, err);
  }
};

export const DELETE = async ({ params, locals }) => {
  authController(locals);
  try {
    const fileName = params.imageName;
    await prisma.img.delete({
      where: {
        file_name: fileName,
      },
    });
    return new Response(
      JSON.stringify({ message: "Post deleted successfuly;" })
    );
  } catch (err) {
    throw error(500, err);
  }
};

import { error } from "@sveltejs/kit";
import { proccessFile, saveFile } from "$lib/Server/files";
import { prisma } from "$lib/Server/prisma";
import { authController } from "$lib/Server/user.model";

const thumbnailsPath = "./uploads/thumbnails/";

export const POST = async ({ request, locals }) => {
  authController(locals);
  try {
    const { fileName, fileBase64, fileSrc } = await proccessFile(
      request,
      "thumbnails"
    );
    const filePath = thumbnailsPath + fileName;

    const duplicated = await prisma.thumbnail.findUnique({
      where: {
        thumbnail_url: fileSrc,
      },
    });

    if (duplicated) return new Response(JSON.stringify(duplicated));

    const thumbnail = await prisma.thumbnail.create({
      data: {
        thumbnail_url: fileSrc,
        file_name: fileName,
      },
    });

    await saveFile(filePath, fileBase64);

    return new Response(JSON.stringify(thumbnail));
  } catch (err) {
    console.log(err);
    throw error(500, "Couldn't fetch the post.");
  }
};

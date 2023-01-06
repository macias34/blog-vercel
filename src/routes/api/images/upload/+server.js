import { proccessFile, saveFile } from "$lib/Server/files";
import { calculateAspectRatioFit } from "$lib/Helpers/AdminTools";
import { error } from "@sveltejs/kit";
import { prisma } from "$lib/Server/prisma";
import Jimp from "jimp";
import { authController } from "$lib/Server/user.model";

const imagesPath = "./uploads/post_imgs/";

export async function POST({ request, locals }) {
  authController(locals);
  try {
    const { fileName, fileBase64, fileSrc } = await proccessFile(
      request,
      "images"
    );
    const filePath = imagesPath + fileName;

    const duplicated = await prisma.img.findUnique({
      where: {
        url: fileSrc,
      },
    });

    if (duplicated) return new Response(JSON.stringify(duplicated));

    await saveFile(filePath, fileBase64);
    const imageMetaData = await Jimp.read(filePath);
    const dimensions = calculateAspectRatioFit(
      imageMetaData.bitmap.width,
      imageMetaData.bitmap.height,
      512,
      512
    );

    const image = await prisma.img.create({
      data: {
        url: fileSrc,
        file_name: fileName,
        height: Math.floor(dimensions.height),
        width: Math.floor(dimensions.width),
      },
    });

    return new Response(JSON.stringify(image));
  } catch (err) {
    throw error(500, "Couldn't fetch the post.");
  }
}

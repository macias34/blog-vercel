import { error } from "@sveltejs/kit";
import { proccessFile, saveFile } from "$lib/Server/files";
import { prisma } from "$lib/Server/prisma";

const thumbnailsPath = ".././thumbnails/";

export const GET = async () => {
  try {
    const imgs = await prisma.img.findMany();

    return new Response(JSON.stringify(imgs));
  } catch (err) {
    throw error(500, err);
  }
};

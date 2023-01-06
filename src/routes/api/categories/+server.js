import { error } from "@sveltejs/kit";
import { prisma } from "$lib/Server/prisma";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
import { authController } from "$lib/Server/user.model";

export const GET = async ({ request, locals }) => {
  try {
    const categories = await prisma.category.findMany({
      include: {
        posts: true,
      },
    });

    if (!categories) throw error(500, "Couldn't fetch categories.");
    return new Response(JSON.stringify(categories));
  } catch (err) {
    console.log(err);
    throw error(500, err);
  }
};

export const POST = async ({ request, locals }) => {
  authController(locals);
  try {
    const body = await request.json();
    const { label, color } = body;
    const category = await prisma.category.create({
      data: {
        label,
        color,
      },
    });

    return new Response(
      JSON.stringify({ message: "Category added successfuly." })
    );
  } catch (err) {
    console.log(err);
    throw error(500, err);
  }
};

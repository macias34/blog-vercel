import { JWT_ACCESS_SECRET } from "$env/static/private";
import jwt from "jsonwebtoken";
import { prisma } from "$lib/Server/prisma";
import cookie from "cookie";
import { error } from "@sveltejs/kit";

const handle = async ({ event, resolve }) => {
  const authCookie = event.cookies.get("AuthorizationToken");
  if (authCookie) {
    const token = authCookie.split(" ")[1];
    try {
      const jwtUser = jwt.verify(token, JWT_ACCESS_SECRET);
      if (typeof jwtUser === "string") {
        throw new Error("Something went wrong");
      }
      const user = await prisma.user.findUnique({
        where: {
          id: jwtUser.id,
        },
      });
      if (!user) {
        throw new Error("User not found");
      }
      const sessionUser = {
        id: user.id,
        username: user.username,
      };
      event.locals.user = sessionUser;
    } catch (error) {
      console.error(error);
    }
  }
  return await resolve(event);
};

export { handle };

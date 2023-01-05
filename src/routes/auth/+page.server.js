import { redirect, fail } from "@sveltejs/kit";
import { loginUser } from "$lib/Server/user.model";

export const load = (event) => {
  const user = event.locals.user;
};

export const actions = {
  default: async (event) => {
    console.log(event);
    const formData = Object.fromEntries(await event.request.formData());

    if (!formData.username || !formData.password) {
      return fail(400, {
        error: "Missing username or password",
      });
    }

    const { username, password } = formData;

    const { error, token } = await loginUser(username, password);

    if (error) {
      return fail(401, {
        error,
      });
    }

    // Set the cookie
    event.cookies.set("AuthorizationToken", `Bearer ${token}`, {
      httpOnly: true,
      path: "/",
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24, // 1 day
    });
  },
};

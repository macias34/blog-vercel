import { createUser } from "$lib/Server/user.model";
import { error, fail } from "@sveltejs/kit";

import { redirect } from "@sveltejs/kit";

export const actions = {
  default: async (event) => {
    const formData = Object.fromEntries(await event.request.formData());

    if (!formData.username || !formData.password) {
      return fail(400, { error: "Missing username or password." });
    }

    const { username, password } = formData;

    const { error } = await createUser(username, password);

    if (error) {
      return fail(500, { error });
    }

    throw redirect(302, "/auth");
  },
};

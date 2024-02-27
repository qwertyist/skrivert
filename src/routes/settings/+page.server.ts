import type { PageServerLoad, Actions } from "./$types";
import { fail } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms";
import { addShortformSchema } from "./schema";
import { zod } from "sveltekit-superforms/adapters";
import { db } from "../../db";

export const load: PageServerLoad = async () => {
  return {
    form: await superValidate(zod(addShortformSchema)),
  };
};

export const actions: Actions = {
  default: async (event) => {
    const form = await superValidate(event, zod(addShortformSchema));
    if (!form.valid) {
      return fail(400, {
        form,
      });
    }
    return {
      form,
    };
  },
};

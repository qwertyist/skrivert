import { error } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { z } from "zod";

export const _userLoginSchema = z.object({
  username: z.string().min(2),
  password: z.string().min(4),
});

export const load = async () => {
  const form = await superValidate(zod(_userLoginSchema));
  return {
    form,
  };
};

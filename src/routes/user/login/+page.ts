import { error } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { z } from "zod";

export const _userSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
});

export const load = (async({ params, fetch }) = {});

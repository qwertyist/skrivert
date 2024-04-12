import { error } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { z } from "zod";

export const _userSchema = z
  .object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(4),
    confirmPassword: z.string().min(4),
  })
  .refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    { message: "Lösenorden måste matcha varandra!", path: ["confirmPassword"] },
  );

export const load = async () => {
  const form = await superValidate(zod(_userSchema));
  return {
    form,
  };
};

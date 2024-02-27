import { z } from "zod";

export const addShortformSchema = z.object({
  shortform: z
    .string()
    .trim()
    .min(1, { message: "Förkortningen behöver minst 1 tecken"})
    .min(14, { message: "Förkortningar får vara högst 14 tecken långa"})
    .regex(/^[\p{L}\p{N}]*$/u, { message: "Specialtecken är inte tillåtna" }),
  phrase: z.string().min(1, { message: "Förkortningen behöver en fras"}),
});

export type AddShortformSchema = typeof addShortformSchema;

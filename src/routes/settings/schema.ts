import { z } from "zod";
import { db } from "../../db";

export const checkForExistingShortform = async (shortform) => {
  console.log("check for:", shortform);
  try {
    const existing = await db.shortforms
      .where({ shortform: shortform })
      .first();
    if (existing) {
      return existing.phrase;
    }
    return null;
  } catch (err) {
    console.error("checkForExistingShortform failed:", err);
  }
};

export const addShortformSchema = z.object({
  shortform: z
    .string()
    .trim()
    .min(1, { message: "Förkortningen behöver minst 1 tecken" })
    .max(14, { message: "Förkortningar får vara högst 14 tecken långa" })
    .regex(/^[\p{L}\p{N}]*$/u, { message: "Specialtecken är inte tillåtna" }),
  phrase: z.string().min(1, { message: "Förkortningen behöver en fras" }),
});

export type AddShortformSchema = typeof addShortformSchema;

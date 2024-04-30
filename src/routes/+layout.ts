import { db } from "../db";
import { liveQuery } from "dexie";

export function load() {
  console.log("LOADING DATA.");
  try {
    const shortforms = liveQuery(async () => {
      return await db.shortforms.toArray();
    })
    console.log("shortforms", shortforms);
    return {
      shortforms
    }
  } catch (err) {
    console.error(`layout load failed loading shortforms: ${err}`);
  }
  return { shortforms: [] }
};

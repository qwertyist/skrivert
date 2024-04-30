import { db } from "../db";
import { liveQuery } from "dexie";

export function load() {
  try {
    const shortforms = liveQuery(async () => {
      return await db.shortforms.toArray();
    })
    return {
      shortforms
    }
  } catch (err) {
    console.error(`layout load failed loading shortforms: ${err}`);
  }
  return { shortforms: [] }
};

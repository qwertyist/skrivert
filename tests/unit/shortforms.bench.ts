import { bench, describe, it, expect } from "vitest";
import { merge } from "$lib/shortforms/main";
import PocketBase from "pocketbase";
import default_shortforms from "../../src/data/shortforms.se.json";
/*
describe("[pb] get all shortforms from SE base list", async () => {
const pb = new PocketBase("http://127.0.0.1:8090");
try {
  const authData = await pb.admins.authWithPassword(
    "skrivertdevel@qwertyist.se",
    "pocketbasedevelpassword",
  );
  it("auths with admin account skrivertdevel@qwertyist.se", () => {
      expect(authData.admin.email).toBe("skrivertdevel@qwertyist.se");
  });
  } catch (err) {
  console.error("pb: Failed auth as admin:", err);
}
  bench("retrieves the list of ~10000 shortforms", async () => {
  await pb.collection('shortforms').getFullList({
    sort: '-created',
  });
  })
});
*/

describe("merge lists", () => {
  const left = default_shortforms.slice(
    0,
    Math.ceil(default_shortforms.length / 2),
  );
  const right = default_shortforms.slice(
    Math.ceil(default_shortforms.length / 2),
    default_shortforms.length,
  );
  bench(
    "merge two lists with " +
      left.length +
      " + " +
      right.length +
      " shortforms with no conflicts",
    () => {
      merge(left, right);
    },
  );
});

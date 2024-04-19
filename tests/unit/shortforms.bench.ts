import { bench, describe, it, expect } from "vitest";
import PocketBase from "pocketbase";
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

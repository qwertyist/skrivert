import PocketBase from "pocketbase";

const pb = new PocketBase("http://127.0.0.1:8090");
try {
  const authData = await pb.admins.authWithPassword(
    "skrivertdevel@qwertyist.se",
    "pocketbasedevelpassword",
  );
} catch (err) {
  console.error("pb: Failed auth as admin:", err);
}

export async function removeTestUserByEmail(email: string) {
  const users = await pb.collection("users").getFullList();
  const testuser = users.find((user) => {
    return user.email == email;
  });
  if (testuser == undefined) return;
  try {
    await pb.collection("users").delete(testuser.id);
  } catch (err) {
    console.error("Couldn't remove testuser");
  }
}

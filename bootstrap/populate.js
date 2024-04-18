import dotenv from "dotenv/config";
import PocketBase from "pocketbase";
import default_shortforms from "../src/data/shortforms.se.json" with { type: "json" };

const pb = new PocketBase("http://127.0.0.1:8090");
try {
  const authData = await pb.admins.authWithPassword(
    "skrivertdevel@qwertyist.se",
    "pocketbasedevelpassword",
  );
} catch (err) {
  console.error("pb: Failed auth as admin:", err);
}
console.log(
  "Populate shortforms to [SE] baselist -",
  process.env.PUBLIC_SE_BASELIST,
);

default_shortforms.forEach(async (sf) => {
  const data = {
    shortform: sf.sf,
    phrase: sf.p,
    list: process.env.PUBLIC_SE_BASELIST,
  };
  try {
    //requestKey: null behövs för att skapa en serie av med samma request-typ (t.ex. "create")
    const record = await pb
      .collection("shortforms")
      .create(data, { requestKey: null });
  } catch (err) {
    console.error(
      "failed creating shortform",
      JSON.stringify(data),
      "err: ",
      err,
    );
  }
});

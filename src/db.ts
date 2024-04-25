import Dexie, { type Table } from "dexie";
import PocketBase from "pocketbase";
export interface Shortform {
  id?: number;
  shortform: string;
  phrase: string;
  used: Date;
}

export class SkrivertDB extends Dexie {
  shortforms!: Table<Shortform>;
  constructor() {
    super("skrivertdb");
    this.version(1).stores({
      shortforms: "++id, [&shortform+phrase], used",
      baseShortforms: "++id, [&shortform+phrase], list",
    });
    this.on("ready", (db) => {
      console.log("Do ready")
      return db.baseShortforms.count(async (count) => {
        if (count > 0) {
          console.log("baseShortforms already populated");
        } else {
          const pb = new PocketBase("http://127.0.0.1:8090/");

          try {
            const authData = await pb.admins.authWithPassword(
              "skrivertdevel@qwertyist.se",
              "pocketbasedevelpassword",
            );
            console.log("authed with", authData.admin.email);
          } catch (err) {
            console.error("[dexie][populate] failed auth as admin:", err);
          }
          let shortforms = [];
          try {
            shortforms = await pb.collection("shortforms").getFullList({
              sort: "-created",
            });
          } catch (err) {
            console.error(
              "[dexie][populate] couldn't retreive base shortforms",
              err,
            );
          }
          return db.baseShortforms.bulkAdd(shortforms);
        }
      });
    });
  }
}

export const db = new SkrivertDB();

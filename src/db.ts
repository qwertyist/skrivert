import Dexie, { type Table } from "dexie";
import PocketBase from "pocketbase";
import { pb } from "$lib/pocketbase";
export interface Shortform {
  id?: number;
  shortform: string;
  phrase: string;
  list: string;
  used: Date;
  synced: boolean;
}
export class syncingShortformClass {
  log() {
    console.log("Log inside syncingShortformClass", JSON.stringify(this));
  }
}
export class SkrivertDB extends Dexie {
  shortforms!: Table<Shortform>;
  constructor() {
    super("skrivertdb");
    this.version(1).stores({
      shortforms: "++id, [&shortform+phrase], used",
      baseShortforms: "++id, [&shortform+phrase], list",
    });

    this.shortforms.mapToClass(syncingShortformClass);
    this.on("ready", (db) => {
      console.log("Do ready");
      db.shortforms.each(shortform => {
        if (shortform.synced) return;
        console.log(`${shortform.shortform}=${shortform.phrase} in ${shortform.list} is not synced `)
      })
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
  createShortform(shortform: Shortform) {
    console.log("Will I sync?", navigator.onLine);
    shortform = { ...shortform, synced: false };
    this.shortforms
      .add(shortform)
      .then((createdId) => {
        console.log(`dexie createShotform ${createdId}`);
        pb.collection("shortforms")
          .create({shortform: shortform.shortform, phrase: shortform.phrase, used: shortform.used, list: shortform.list})
          .then((resp) => {
            console.log(`synced ${shortform} to server\n${resp}`);
            this.shortforms
              .update(createdId, { synced: true })
              .then((resp) => {
                console.log(
                  `${shortform} marked as synced in dexie db ${resp}`,
                );
              })
              .catch((err) => {
                console.error(
                  `failed marking ${shortform} as synced in dexie db:\n${err}`,
                );
              });
          });
      })
      .catch((err) => {
        console.error(`failed syncing ${shortform} to server: \n${err}`);
      })
      .catch((err) => {
        console.error(`dexie createShortform failed ${err}`);
      });
  }
}

export const db = new SkrivertDB();

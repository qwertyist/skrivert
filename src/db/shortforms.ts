import Dexie, { type Table } from "dexie";

export interface Shortform {
  sf?: string;
  p: string;
  u: Date;
}

export class Database extends Dexie {
  // 'friends' is added by dexie when declaring the stores()
  // We just tell the typing system this is the case
  lists!: Map<string, Array<Shortform>>;

  constructor() {
    super("skrivert-db");
    this.version(1).stores({
      lists: "++id, &name, &pb_id, type", // Primary key and indexed props
      shortforms: "++id, &sf, phrase, list",
    });
  }
}

export const db = new Database();

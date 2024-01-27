import Dexie, { type Table } from "dexie";

export interface Shortform {
  sf?: string;
  p: string;
  u: Date;
}

export class Database extends Dexie {
  // 'friends' is added by dexie when declaring the stores()
  // We just tell the typing system this is the case
  lists!: Map<String, Array<Shortform>>;

  constructor() {
    super("skrivert-db");
    this.version(1).stores({
      lists: "++id, shortforms", // Primary key and indexed props
    });
  }
}

export const db = new Database();

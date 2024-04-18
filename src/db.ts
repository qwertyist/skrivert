import Dexie, { type Table } from "dexie";

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
      shortforms: "++id, &shortform, phrase, used",
    });
  }
}

export const db = new SkrivertDB();

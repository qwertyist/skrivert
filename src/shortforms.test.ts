import { describe, it, expect } from "vitest";
import { merge } from "$lib/shortforms/main";
import default_shortforms from "./data/shortforms.se.json";

describe("merge shortforms 1", () => {
  const list1 = [
    { sf: "abb", p: "abbreviation", u: null },
    { sf: "abb", p: "abbreviation", u: null },
    { sf: "sf", p: "San Fransisco", u: null },
  ];
  const list2 = [
    { sf: "sf", p: "shortform", u: null },
    { sf: "sfs", p: "shortforms", u: null },
  ];
  const merged = [
    { sf: "abb", p: "abbreviation", u: null },
    { sf: "abb", p: "abbreviation", u: null },
    { sf: "sf", p: "San Fransisco", u: null },
    { sf: "sfs", p: "shortforms", u: null },
  ];
  const conflicts = [{ sf: "sf", ps: ["San Fransisco", "shortform"] }];
  it("merges two shortform lists with 1 conflicting shortform", () => {
    expect(merge(list1, list2)).toStrictEqual({ merged, conflicts });
  });
});

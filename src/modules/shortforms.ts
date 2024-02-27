import type { ShortformExportType } from "./index.d.ts";
import default_shortforms from "../data/shortforms.se.json";
export function cacheShortforms(lists: Array<string> = []) {
  let shortforms = new Map();
  console.log("Caching shortforms with lists:", lists);

  var n = 0;
  var shortforms_length = 0;
  var phrases_length = 0;
  if (lists.length < 1) {
    default_shortforms.map((sf: ShortformExportType) => {
      n += 1;
      shortforms_length += sf.sf.length;
      phrases_length += sf.p.length;
      shortforms.set(sf.sf, { phrase: sf.p, last: sf.u });
    });
    console.log("Average shortform length:", shortforms_length / n);
    console.log("Average phrases length:", phrases_length / n);
  }
  return shortforms;
}
//export function createShortform(cache: Map<string, any>, shortform, phrase) {}
export function expandShortform(
  cache: Map<string, any>,
  ShortForm: string,
): string {
  const u = new Date();
  console.log("ShortForm", ShortForm);
  const shortform = ShortForm.toLowerCase();
  if (cache.has(shortform)) {
    const phrase = cache.get(shortform).phrase;
    cache.set(shortform, { phrase: phrase, last: u });

    if (shortform.match(/(\d+)/) || ShortForm === shortform) {
      return phrase;
    } else if (ShortForm === shortform.toUpperCase() && ShortForm.length > 1) {
      return phrase.toUpperCase();
    } else if (/^\p{Lu}(\p{L}*)/u.test(ShortForm)) {
      return phrase.charAt(0).toUpperCase() + phrase.substring(1);
    } else {
      return phrase;
    }
  }
  return "";
}

import { defaultHotkeys } from "./hotkeys";
import { cacheShortforms, expandShortform } from "./shortforms";
import type { ExpanderType, KeyboardOptions } from "./index.d.ts";

const defaultExpanders: Array<ExpanderType> = [
  { key: { keyCode: 190, shiftKey: false }, symbol: ".", fullstop: true },
  { key: { keyCode: 49, shiftKey: true }, symbol: "!", fullstop: true },
  { key: { keyCode: 187, shiftKey: true }, symbol: "?", fullstop: true },
  { key: { keyCode: 187, shiftKey: false }, symbol: "+", fullstop: false },
  { key: { keyCode: 188, shiftKey: false }, symbol: ",", fullstop: false },
  { key: { keyCode: 56, shiftKey: true }, symbol: "(", fullstop: false },
  { key: { keyCode: 57, shiftKey: true }, symbol: ")", fullstop: false },
  { key: { keyCode: 50, shiftKey: true }, symbol: '"', fullstop: false },
  { key: { keyCode: 191, shiftKey: false }, symbol: "'", fullstop: false },
  { key: { keyCode: 189, shiftKey: false }, symbol: "-", fullstop: false },
  { key: { keyCode: 190, shiftKey: true }, symbol: ":", fullstop: false },
  { key: { keyCode: 188, shiftKey: false }, symbol: ",", fullstop: false },
  { key: { keyCode: 188, shiftKey: true }, symbol: ":", fullstop: false },
];

function getPreviousWord(prefix: String) {
  return prefix.split(/[\u200B\s-.,:;_!?\/"'()]/).pop() || "";
}

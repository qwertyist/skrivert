import type { ExpanderType } from "./index.d.ts";

export const defaultExpanders: Map<string, ExpanderType> = new Map();
defaultExpanders.set(" ", {
  key: { keyCode: 190, shiftKey: false },
  symbol: " ",
  fullstop: false,
});
defaultExpanders.set(".", {
  key: { keyCode: 190, shiftKey: false },
  symbol: ".",
  fullstop: true,
});
defaultExpanders.set("!", {
  key: { keyCode: 49, shiftKey: true },
  symbol: "!",
  fullstop: true,
});
defaultExpanders.set("?", {
  key: { keyCode: 187, shiftKey: true },
  symbol: "?",
  fullstop: true,
});
defaultExpanders.set("+", {
  key: { keyCode: 187, shiftKey: false },
  symbol: "+",
  fullstop: false,
});
defaultExpanders.set(",", {
  key: { keyCode: 188, shiftKey: false },
  symbol: ",",
  fullstop: false,
});
defaultExpanders.set("(", {
  key: { keyCode: 56, shiftKey: true },
  symbol: "(",
  fullstop: false,
});
defaultExpanders.set(")", {
  key: { keyCode: 57, shiftKey: true },
  symbol: ")",
  fullstop: false,
});
defaultExpanders.set('"', {
  key: { keyCode: 50, shiftKey: true },
  symbol: '"',
  fullstop: false,
});
defaultExpanders.set("'", {
  key: { keyCode: 191, shiftKey: false },
  symbol: "'",
  fullstop: false,
});
defaultExpanders.set("-", {
  key: { keyCode: 189, shiftKey: false },
  symbol: "-",
  fullstop: false,
});
defaultExpanders.set(":", {
  key: { keyCode: 190, shiftKey: true },
  symbol: ":",
  fullstop: false,
});
defaultExpanders.set(",", {
  key: { keyCode: 188, shiftKey: false },
  symbol: ",",
  fullstop: false,
});
defaultExpanders.set(";", {
  key: { keyCode: 188, shiftKey: true },
  symbol: ":",
  fullstop: false,
});

import { describe, it, expect } from "vitest";
import { parser } from "$lib/captions/main";

describe("caption parser test 0 [c:80, l:100]", () => {
  const options = {
    chars: 80,
    lines: 100,
  };
  const text = "";
  const captions = {
    blocks: [
      {
        lines: [""],
      },
    ],
  };
  it("parses" + text + " to 1 empty Block", () => {
    expect(parser(options, text)).toStrictEqual(captions);
  });
});

describe("caption parser test 1 [c:37, l:2]", () => {
  const options = {
    chars: 37,
    lines: 2,
  };
  const text =
    "Mors lilla Olle i skogen gick, rosor på kind och solsken i blick";
  const captions = {
    blocks: [
      {
        lines: [
          "Mors lilla Olle i skogen gick, rosor",
          "på kind och solsken i blick",
        ],
      },
    ],
  };
  it("parses" + text + " to two lines", () => {
    expect(parser(options, text)).toStrictEqual(captions);
  });
});

describe("caption parser test 2 [c:32, l:2]", () => {
  const options = {
    chars: 32,
    lines: 2,
  };
  const text =
    "Mors lilla Olle i skogen gick, rosor på kind och solsken i blick";
  const captions = {
    blocks: [
      {
        lines: [
          "Mors lilla Olle i skogen gick,",
          "rosor på kind och solsken i-",
        ],
      },
      {
        lines: ["-blick"],
      },
    ],
  };
  it("parses" + text + " to 2 Blocks with 2 Lines", () => {
    expect(parser(options, text)).toStrictEqual(captions);
  });
});
describe("caption parser test 3 [c:44, l:1]", () => {
  const options = {
    chars: 44,
    lines: 1,
  };
  const text =
    "Mors lilla Olle i skogen gick, rosor på kind och solsken i blick";
  const captions = {
    blocks: [
      {
        lines: ["Mors lilla Olle i skogen gick, rosor på kind-"],
      },
      {
        lines: ["-och solsken i blick"],
      },
    ],
  };
  it("parses" + text + " to 2 Blocks with 1 Line", () => {
    expect(parser(options, text)).toStrictEqual(captions);
  });
});

describe("caption parser test 4 [c:32, l:3]", () => {
  const options = {
    chars: 32,
    lines: 3,
  };
  const text =
    "Mors lilla Olle i skogen gick, rosor på kind och solsken i blick";
  const captions = {
    blocks: [
      {
        lines: [
          "Mors lilla Olle i skogen gick,",
          "rosor på kind och solsken i",
          "blick",
        ],
      },
    ],
  };
  it("parses" + text + " to 1 Block with 3 Lines", () => {
    expect(parser(options, text)).toStrictEqual(captions);
  });
});

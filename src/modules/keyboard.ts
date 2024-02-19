import Quill from "quill";
const Delta = Quill.import("delta");
const Keyboard = Quill.import("modules/keyboard");
import { defaultHotkeys } from "./hotkeys";
import { cacheShortforms, expandShortform } from "./shortforms";
import type {
  ExpanderType,
  KeyboardOptions,
  QuillRange,
  QuillContext,
} from "./index.d.ts";

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

export default class keyboard extends Keyboard {
  static DEFAULTS = {
    ...Keyboard.DEFAULTS,
    bindings: {
      ...Keyboard.DEFAULTS.bindings,
      ["list autofill"]: undefined,
    },
  };
  constructor(quill: Quill, options: KeyboardOptions) {
    super(quill, options);
    console.log("KeyboardOptions:", options);
    this.cache = cacheShortforms(options.listIds);
    this.addBindings();
    this.newSentence = true;
    console.log(defaultExpanders);
  }

  expand(range: QuillRange, context: QuillContext, expander: ExpanderType) {
    if (expander.fullstop) {
      this.newSentence = true;
    } else {
      this.newSentence = false;
    }
    const shortform = this.getPreviousWord(context.prefix);
    let phrase = expandShortform(this.cache, shortform);
    if (phrase == "") return true;
    let delta = new Delta()
      .retain(range.index - shortform.length)
      .delete(shortform.length)
      .insert(phrase + expander.symbol);
    this.quill.updateContents(delta);
    return false;
  }

  listen() {
    document.addEventListener("keydown", (e) => {
      if (e.key.length == 1) {
        if (
          (e.key.match(/\p{L}/gu) && this.newSentence) ||
          this.quill.getLength() == 1
        ) {
          e.preventDefault();
          const index = this.quill.getSelection().index;
          this.quill.insertText(index, e.key.toUpperCase());
          this.newSentence = false;
        } else if (".!?".indexOf(e.key) != -1) {
          this.newSentence = true;
        }
      }
    });
    super.listen();
  }

  getPreviousWord(prefix: String) {
    return prefix.split(/[\u200B\s-.,:;_!?\/"'()]/).pop() || "";
  }

  addBindings() {
    this.bindings[8].unshift({
      //backspace
      key: 8,
      ctrlKey: null,
      handler: function (range: QuillRange, context: QuillContext) {
        this.newSentence = false;
        // console.log("⌨ BACKSPACE - revert 'new sentence'");
        return true;
      },
    });

    this.bindings[13].unshift({
      //enter
      key: 13,
      handler: function (range: QuillRange, context: QuillContext) {
        console.log("⌨ ENTER - New sentence");
        const shortform = this.getPreviousWord(context.prefix);
        let phrase = expandShortform(this.cache, shortform);
        if (phrase == "") return true;
        let delta = new Delta()
          .retain(range.index - shortform.length)
          .delete(shortform.length)
          .insert(phrase);
        this.quill.updateContents(delta);
        this.quill.insertText(range.index + phrase.length, "\n");
        this.quill.setSelection(range.index + phrase.length + 1);
        this.newSentence = true;
        return false;
      },
    });

    defaultExpanders.forEach((expander) => {
      //console.log(expander.key);
      this.addBinding({
        key: expander.key.keyCode,
        shiftKey: expander.key.shiftKey,
        handler: function (range: QuillRange, context: QuillContext) {
          return this.expand(range, context, expander);
        },
      });
    });

    this.addBinding({
      key: 32,
      shiftKey: null,
      handler: function (range: QuillRange, context: QuillContext) {
        const shortform = this.getPreviousWord(context.prefix);
        let phrase = expandShortform(this.cache, shortform);
        if (phrase == "") return true;

        let delta = new Delta()
          .retain(range.index - shortform.length)
          .delete(shortform.length)
          .insert(phrase + " ");
        this.quill.updateContents(delta);
      },
    });

    defaultHotkeys.forEach((hk) => {
      this.addBinding({
        key: hk.key.keyCode,
        shiftKey: hk.key.shiftKey,
        ctrlKey: hk.key.ctrlKey,
        handler: function (range: QuillRange, context: QuillContext) {
          const quill = this.quill;
          return hk.action({ quill, range, context }, hk.symbol);
        },
      });
    });
    this.addBinding({
      key: 115,
      shiftKey: null,
      handler: function () {
        this.quill.setContents("");
        this.newSentence = true;
      },
    });
  }
}

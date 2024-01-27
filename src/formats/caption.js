import Quill from "quill";

let Inline = Quill.import("blots/inline");
class Caption extends Inline {
  static create(value) {
    let node = super.create(value);
    node.innerHTML = `${value}`;
    node.setAttribute("data-proc", value);
    return node;
  }
  static value(domNode) {
    return domNode.getAttribute("data-proc");
  }
}

Caption.blotName = "caption";
Caption.className = "caption";
Caption.tagName = "span";

export default Caption;

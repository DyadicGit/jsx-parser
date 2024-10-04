import { createElement } from "react";
import { AppShell, AppMenu, MenuItem, AppContent } from "./symbols";

// @ts-ignore
const symbolStore = {
  AppShell,
  AppMenu,
  MenuItem,
  AppContent,
};

interface JSXParserProps {
  value: string;
}

type Node = {
  tag: string;
  type: "openning" | "parsed";
  children: Node[];
};

export const JSXParser = ({ value }: JSXParserProps) => {
  let STACK: Node[] = [];
  const DOM: Node[] = STACK;
  const stack = [...value];

  let mightBeTag = false;
  let word: string = "";

  const openingTag = () => {
    const node = STACK[STACK.length - 1];
    if (node?.type === "openning") return node;
  };

  while (stack.length) {
    const current = stack.shift();
    if (current === "<") {
      mightBeTag = true;
      if (STACK[STACK.length - 1]?.type === "openning") {
        STACK[STACK.length - 1].children.push(word);
        word = "";
      }
      continue;
    }
    if (
      current === ">" &&
      mightBeTag &&
      STACK[STACK.length - 1]?.type === "openning"
    ) {
      STACK[STACK.length - 1].type = "parsed";

      mightBeTag = false;
      word = "";
      continue;
    }
    if (current === ">" && mightBeTag) {
      const tag: Node = { tag: word, type: "openning", children: [] };

      if (STACK[STACK.length - 1].type === "openning") {
        DOM.push(STACK);
        STACK = STACK[STACK.length - 1].children;
      } else {
        STACK.push(tag);
      }

      mightBeTag = false;
      word = "";
      continue;
    }
    if (current === "/" && mightBeTag) {
      continue;
    }
    word = word + current;
  }
  return createElement("pre", {}, value);
};

import React, {createElement, FC, ReactNode} from "react";
import {AppContent, AppMenu, AppShell, MenuItem} from "./symbols";
import ErrorBoundary from "./ErrorBoundary.tsx";

const symbolStore: Record<string, FC> = {
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
    type: "opening" | "enclosing" | "self-closing" ;
    children: (Node | string)[];
};

export const JSXParser = ({value}: JSXParserProps) => {
    const ROOT: Node[] = [{children: [], tag: "main", type: "opening"}];
    const TAG_STACK: Node[] = [...ROOT];
    const symbolsStack = [...value];

    let mightBeTag = false;
    let word: string = "";

    for (let i = 0; i < symbolsStack.length; i++) {
        const symbol = symbolsStack[i];
        const TAG = TAG_STACK[TAG_STACK.length - 1];

        // Check for closing tags </tag>
        if (symbol === "<" && symbolsStack[i + 1] === "/") {
            TAG.type = "enclosing";
            if (word.trim()) {
                TAG.children.push(word.trim());
                word = "";
            }
            i += 2; // Skip over </
            while (symbolsStack[i] !== ">") i++; // Skip till closing '>'
            TAG_STACK.pop(); // Remove the closed tag from stack
            continue;
        }

        // Handle opening tags <tag>word...
        if (symbol === "<" && symbolsStack[i + 1] !== "/") {
            mightBeTag = true;
            if (word.trim()) {
                TAG.children.push(word.trim());
                word = "";
            }
            continue;
        }

        // Handle self-closing tags
        if (symbol === "/" && symbolsStack[i + 1] === ">") {
            TAG.type = "self-closing";
            if (word.trim()) {
                TAG.children.push(word.trim());
                word = "";
            }
            TAG_STACK.pop(); // Remove the closed tag from stack
            i++; // Skip over ">"
            continue;
        }

        // Fresh start tag opening scenario
        if (symbol === ">" && mightBeTag) {
            const newTag: Node = {tag: word, type: "opening", children: []};
            if (TAG) {
                TAG.children.push(newTag);
            }
            TAG_STACK.push(newTag);
            mightBeTag = false;
            word = "";
            continue;
        }
        word += symbol;
    }

    const renderNodes = (nodes: (Node | string)[]): ReactNode => {
        if (!nodes.length) return null;

        return nodes.map((node, index) => {
            if (typeof node === "string") {
                return node;
            }
            const CustomTag = symbolStore[node.tag];
            if (CustomTag) {
                return createElement(CustomTag, {key: index}, renderNodes(node.children));
            } else {
                return createElement(node.tag, {key: index}, renderNodes(node.children));
            }
        });
    };

    console.log("%c DOM", "background-color: black; color: red; font-weight: 900;", ROOT);

    return (
        <>
            {createElement("pre", {}, value)}
            <br/>
            <ErrorBoundary>{renderNodes(ROOT)}</ErrorBoundary>
        </>
    );
};

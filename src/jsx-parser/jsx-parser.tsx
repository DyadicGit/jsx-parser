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
    type: "opening" | 'enclosing' | "parsed";
    children: (Node | string)[];
};

export const JSXParser = ({value}: JSXParserProps) => {
    const DOM: Node[] = [{children: [], tag: "main", type: 'opening'}]
    const TAG_STACK: Node[] = [...DOM];
    const symbolsStack = [...value];

    let mightBeTag = false;
    let word: string = "";


    while (symbolsStack.length) {
        const TAG = TAG_STACK[TAG_STACK.length - 1]
        const symbol = symbolsStack.shift();

        if (symbol === "<" && symbolsStack?.[symbolsStack.indexOf(symbol) + 1] === "/" && TAG?.type === 'opening') {
            TAG.type = 'enclosing';
            TAG.children.push(word);
            word = "";
            continue;
        }
        if (symbol === "<" && TAG?.type === "opening") {
            mightBeTag = true;
            TAG.children.push(word);
            word = "";
            continue;
        }
        if (symbol === "<") {
            mightBeTag = true;
            continue;
        }
        if (
            symbol === ">" &&
            TAG?.type === "enclosing"
        ) {
            TAG.type = "parsed";
            mightBeTag = false;
            word = "";
            TAG_STACK.pop()
            continue;
        }
        if (symbol === ">" && mightBeTag && TAG?.type === 'opening') {
            const newTag: Node = {tag: word, type: "opening", children: []};
            TAG.children.push(newTag);
            TAG_STACK.push(newTag);
            mightBeTag = false;
            word = "";
            continue;
        }
        if (symbol === ">" && mightBeTag) {
            const newTag: Node = {tag: word, type: "opening", children: []};
            TAG_STACK.push(newTag);
            mightBeTag = false;
            word = "";
            continue;
        }
        if (symbol === "/") {
            continue;
        }
        word = word + symbol;
    }

    const renderNodes = (nodes: (Node | string)[]): ReactNode => {
        if (!nodes.length) return null;

        return nodes.map(
            (node, index) => {
                if (typeof node === "string") {
                    return node as string;
                }
                const CustomTag = symbolStore[node.tag]
                if (!!CustomTag) {
                    return createElement(CustomTag, {key: index}, renderNodes(node.children))
                } else {
                    return createElement(node.tag, {key: index}, renderNodes(node.children));
                }
            }
        );
    }

    console.log('%c DOM', 'background-color: black; color: red; font-weight: 900;', DOM);

    return (<>
        {createElement("pre", {}, value)}
        <br/>
        <ErrorBoundary>{renderNodes(DOM)}</ErrorBoundary>
    </>);
};

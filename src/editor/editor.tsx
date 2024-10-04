import React, {
  useState,
  useRef,
  useEffect,
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
} from "react";
import { TEMPLATES } from "./templates";

export type TemplateKey = keyof typeof TEMPLATES;

export const templateKeys = Object.keys(TEMPLATES) as TemplateKey[];

const templateDefaultKey: TemplateKey = "textNode";

const StrContext = createContext([
  "",
  () => {
    throw new Error("not implemented!");
  },
] as [string, Dispatch<SetStateAction<string>>]);

export const StrProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <StrContext.Provider value={useState(TEMPLATES[templateDefaultKey])}>
      {children}
    </StrContext.Provider>
  );
};

export const useStr = () => useContext(StrContext);

export const Editor = () => {
  const [str, setStr] = useContext(StrContext);
  const [height, setHeight] = useState(40);

  const textareaRef: React.MutableRefObject<HTMLTextAreaElement | null> =
    useRef(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.max(40, textarea.scrollHeight)}px`;
      setHeight(textarea.scrollHeight);
    }
  }, [str]);

  return (
    <div className="p-2 fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-800">
      <label className="block">
        Select template:{" "}
        <select
          className="border-2 border-gray-400 mb-2"
          name="templates"
          onChange={(e) => {
            setStr(TEMPLATES[e.currentTarget.value as TemplateKey]);
          }}
        >
          {Object.keys(TEMPLATES).map((k) => (
            <option key={k} value={k}>
              {k}
            </option>
          ))}
        </select>
      </label>
      <textarea
        ref={textareaRef}
        value={str}
        onChange={(e) => setStr(e.currentTarget.value)}
        className="block w-full p-2 resize-none focus:outline-none box-border border-2 border-gray-400"
        style={{ height: `${height + 4}px` }}
        placeholder="Type jsx literal here..."
      />
    </div>
  );
};

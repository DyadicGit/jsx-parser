import { Editor, useStr } from "./editor/editor";
import { JSXParser } from "./jsx-parser/jsx-parser";

function App() {
  return (
    <main>
      <JSXParser value={useStr()[0]} />
      <Editor />
    </main>
  );
}

export default App;

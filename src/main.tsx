import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app.tsx";
import { StrProvider } from "./editor/editor.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <StrProvider>
      <App />
    </StrProvider>
  </React.StrictMode>
);

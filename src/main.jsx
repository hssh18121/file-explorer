// import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { FileProvider } from "./context/FileContext.jsx";
import { ContextMenuProvider } from "./context/MenuContext.jsx";
import { FileStructureProvider } from "./context/FIleStructureContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <FileStructureProvider>
    <ContextMenuProvider>
      <FileProvider>
        <App />
      </FileProvider>
    </ContextMenuProvider>
  </FileStructureProvider>
  // </React.StrictMode>
);

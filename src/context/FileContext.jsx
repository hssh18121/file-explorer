import { createContext, useContext, useState } from "react";

// Create context
const FileContext = createContext();

// Provider component
export function FileProvider({ children }) {
  const [activeFile, setActiveFile] = useState(null);

  return (
    <FileContext.Provider value={{ activeFile, setActiveFile }}>
      {children}
    </FileContext.Provider>
  );
}

// Custom hook for easy access
export function useFileContext() {
  return useContext(FileContext);
}

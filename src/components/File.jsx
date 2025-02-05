import { useState } from "react";
import { useFileContext } from "../context/FileContext";

function File({ name, path, isNested }) {
  const { activeFile, setActiveFile } = useFileContext();
  const [isHovered, setIsHovered] = useState(false);
  const fileId = `${path}/${name}`;
  const isActive = activeFile === fileId;

  return (
    <div
      onClick={() => setActiveFile(fileId)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        textAlign: "left",
        cursor: "pointer",
        marginLeft: isNested ? "1.5rem" : "0",
        backgroundColor: isActive
          ? "rgba(0, 0, 0, 0.5)"
          : isHovered
          ? "rgba(0, 0, 0, 0.3)"
          : "transparent",
        border: isActive ? "1px solid rgba(255, 255, 255, 0.5)" : "none",
        color: isActive ? "#fcc419" : "inherit",
      }}
      className="file"
    >
      📄 {name}
    </div>
  );
}

export default File;

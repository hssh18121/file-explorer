import { useState } from "react";
import File from "./File";

function Folder({ name, content, isNested }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ textAlign: "left", marginLeft: isNested ? "1.5rem" : "0" }} className="folder">
      <div onClick={() => setIsOpen(!isOpen)} style={{ cursor: "pointer", fontWeight: "bold" }}>
        {isOpen ? "▼" : "▶"} {name}
      </div>
      {isOpen && (
        <div>
          {Object.entries(content).map(([childName, childContent]) =>
            typeof childContent === "object" && childContent !== null && Object.keys(childContent).length > 0 ? (
              <Folder key={childName} name={childName} content={childContent} isNested={true} />
            ) : (
              <File key={childName} name={childName} isNested={true} />
            )
          )}
        </div>
      )}
    </div>
  );
}

export default Folder;

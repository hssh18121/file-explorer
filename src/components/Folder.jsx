import { useState } from "react";
import File from "./File";
import { useContextMenu } from "../context/MenuContext";
import { useFileExplorer } from "../context/FIleStructureContext";
import ChevronDown from "../assets/chevron-down.svg";
import ChevronRight from "../assets/chevron-right.svg";

function Folder({ name, children, isNested, path }) {
  const [isOpen, setIsOpen] = useState(false);
  const { menuData, openMenu, closeMenu } = useContextMenu();
  const [isHovered, setIsHovered] = useState(false);
  const { updateStructureByPath } = useFileExplorer();
  

  const toggleOpen = () => setIsOpen(!isOpen);

  // Right-click handler
  const handleRightClick = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const rect = event.currentTarget.getBoundingClientRect();
    const fixedX = rect.right - 50;

    openMenu(fixedX, event.pageY, path);
  };

  // Add new file
  const addFile = () => {
    const newFile = { name: `NewFile${children.length + 1}.js`, type: "file" };
    console.log(path);
    updateStructureByPath(path, newFile);
    setIsOpen(true);
    closeMenu();
  };

  // Add new folder
  const addFolder = () => {
    const newFolder = { name: `NewFolder${children.length + 1}`, type: "folder", children: [] };
    updateStructureByPath(path, newFolder);
    setIsOpen(true);
    closeMenu();
  };

  return (
    <div
      style={{ textAlign: "left", marginLeft: isNested ? "1.5rem" : "0" }}
      className="folder"
    >
      <div>
        <div 
          onClick={toggleOpen} 
          style={{ cursor: "pointer", fontWeight: "bold", backgroundColor: menuData && menuData.targetFolder === name
            ? "rgba(0, 0, 0, 0.5)"
            : isHovered
            ? "rgba(0, 0, 0, 0.3)"
            : "transparent", }} 
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onContextMenu={handleRightClick}
          className="folder"
        >
          <div style={{ display: "flex", alignItems: "center", gap: "5px", cursor: "pointer" }}>
            <img src={isOpen ? ChevronDown : ChevronRight} alt="Toggle Icon" width="16" height="16" /> 
            <span>{name}</span>
          </div>
          
        </div>
        
      </div>
      {isOpen && (
        <div>
          {children.map((child, index) =>
            child.type === "folder" ? (
              <Folder key={index} name={child.name} children={child.children} isNested={true} path={`${path}/${child.name}`} />
            ) : (
              <File key={index} name={child.name} isNested={true} path={path} />
            )
          )}
        </div>
      )}

      {/* Render menu only if this folder is targeted */}
      {menuData && menuData.targetFolder === path && (
        <div
          style={{
            position: "absolute",
            top: menuData.y,
            left: menuData.x,
            backgroundColor: "#1a1a1a",
            border: "1px solid gray",
            padding: "5px",
            zIndex: 1000,
            boxShadow: "2px 2px 5px rgba(0,0,0,0.3)",
          }}
          onClick={closeMenu} // Close menu on click
        >
          <div style={{ padding: "5px", cursor: "pointer" }} onClick={addFile}>
            ➕ New File...
          </div>
          <div style={{ padding: "5px", cursor: "pointer" }} onClick={addFolder}>
            📁 New Folder...
          </div>
        </div>
      )}
    </div>
  );
}

export default Folder;

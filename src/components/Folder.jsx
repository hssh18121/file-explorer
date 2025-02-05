import { useState } from "react";
import File from "./File";
import { useContextMenu } from "../context/MenuContext";
import { useFileExplorer } from "../context/FIleStructureContext";
import ChevronDown from "../assets/chevron-down.svg";
import ChevronRight from "../assets/chevron-right.svg";
import FolderIcon from "../assets/folder.svg";
import PlusIcon from "../assets/plus.svg";

function Folder({ name, children, isNested, path }) {
  const [isOpen, setIsOpen] = useState(false);
  const { menuData, openMenu, closeMenu } = useContextMenu();
  const [isHovered, setIsHovered] = useState(false);
  const { updateStructureByPath } = useFileExplorer();

  const toggleOpen = () => setIsOpen(!isOpen);

  const handleRightClick = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const rect = event.currentTarget.getBoundingClientRect();
    const fixedX = rect.right - 50;

    openMenu(fixedX, event.pageY, path);
  };

  const addFile = () => {
    const newFile = { name: `NewFile${children.length + 1}.js`, type: "file" };
    console.log(path);
    updateStructureByPath(path, newFile);
    setIsOpen(true);
    closeMenu();
  };

  const addFolder = () => {
    const newFolder = { name: `NewFolder${children.length + 1}`, type: "folder", children: [] };
    updateStructureByPath(path, newFolder);
    setIsOpen(true);
    closeMenu();
  };

  return (
    <div
      style={{ marginLeft: isNested ? "1.5rem" : "0" }}
      className="folder"
    >
      <div>
        <div 
          onClick={toggleOpen} 
          style={{ backgroundColor: menuData && menuData.targetFolder === path
            ? "rgba(0, 0, 0, 0.5)"
            : isHovered
            ? "rgba(0, 0, 0, 0.3)"
            : "transparent", }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onContextMenu={handleRightClick}
          className="folder"
        >
          <div className="folder-toggle">
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

      {menuData && menuData.targetFolder === path && (
        <div
          style={{
            top: menuData.y,
            left: menuData.x,
          }}
          className="folder-add-popup"
          onClick={closeMenu}
        >
          <div className="folder-add-popup-block" onClick={addFile}>
            <div className="folder-add-icon-wrapper">
              <img src={PlusIcon} alt="Plus Icon" width="16" height="16" />  
              <span>New File...</span>
            </div>
          </div>
          <div className="folder-add-popup-block" onClick={addFolder}>
            <div className="folder-add-icon-wrapper">
              <img src={FolderIcon} alt="Folder Icon" width="16" height="16" /> 
              <span>New Folder...</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Folder;

import { createContext, useContext, useState } from "react";
import initialStructure from "../data/fileStructure";

const FileStructureContext = createContext();

export function FileStructureProvider({ children }) {
    const [fileStructure, setFileStructure] = useState(initialStructure);

    const updateStructureByPath = (path, newChild) => {
        const pathArray = path.split('/'); // Convert path into an array of folder names

        const findAndUpdate = (node, pathArray) => {

            // If path is empty, we have found the correct parent
            if (pathArray.length === 0) {
                if (!node.children) node.children = [];
                node.children.push(newChild); // Add the new child (file/folder)
                return true;
            }

            // Recurse into children by reducing the pathArray
            if (node.children) {
                for (let child of node.children) {
                    if (child.name === pathArray[0]) {
                        return findAndUpdate(child, pathArray.slice(1));
                    }
                }
            }

            return false; // Path not found
        };

        const newStructure = JSON.parse(JSON.stringify(fileStructure)); // Deep copy of the structure
        findAndUpdate(newStructure, pathArray.slice(1)); // Start recursion with the path array

        // Update the structure state
        setFileStructure(newStructure);
    };

    return (
        <FileStructureContext.Provider value={{ fileStructure, updateStructureByPath }}>
            {children}
        </FileStructureContext.Provider>
    );
}

export function useFileExplorer() {
  return useContext(FileStructureContext);
}

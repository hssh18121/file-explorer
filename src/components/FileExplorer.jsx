import Folder from "./Folder";
import { useFileExplorer } from "../context/FIleStructureContext";

const FileExplorer = () => {
  const { fileStructure } = useFileExplorer();
  return (
    <div>
      <h2 className="file-explorer-title">File Explorer</h2>
      <div className="file-explorer">
        <Folder name={fileStructure.name} children={fileStructure.children} isNested={false} path={fileStructure.name}/>
      </div>
    </div>
  );
};

export default FileExplorer;

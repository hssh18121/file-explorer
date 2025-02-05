import Folder from "./Folder";
import fileStructure from "../data/fileStructure";
import File from "./File";

const FileExplorer = () => {
  return (
    <div>
      <h2 className="file-explorer-title">File Explorer</h2>
      <div className="file-explorer">
        {Object.entries(fileStructure).map(([name, content]) =>
          typeof content === "object" && content !== null && Object.keys(content).length > 0 ? (
            <Folder key={name} name={name} content={content} isNested={false} />
          ) : (
            <File key={name} name={name} isNested={false} />
          )
        )}
      </div>
    </div>
  );
};

export default FileExplorer;

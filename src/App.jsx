import './App.css'
import FileExplorer from './components/FileExplorer'
import "./styles.css"
import { useFileContext } from './context/FileContext'
import CloseIcon from "./assets/close.svg"

function App() {
  const { activeFile, setActiveFile } = useFileContext();

  const closeFileHandler = () => {
    setActiveFile(null);
  }

  return (
    <>
      <div className='container'>
        {/* Left Sidebar - File Explorer */}
        <div className='sidebar'>
          <FileExplorer />
        </div>

        {/* Right Content Area - File Display */}
        <div className='main'>
          {activeFile ? (
            <div>
              <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                <div
                  style={{
                    flex: 1,
                    padding: "10px",
                    color: "#fcc419",
                    borderBottom: "2px solid #fcc419",
                    fontWeight: "bold",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    fontSize: "1.25rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  {activeFile.trim().split("/").pop()}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "24px",
                      height: "24px",
                      borderRadius: "6px",
                      transition: "background-color 0.2s ease-in-out, backdrop-filter 0.2s ease-in-out",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "rgba(128, 128, 128, 0.2)"; // Light gray on hover
                      e.currentTarget.style.backdropFilter = "blur(4px)"; // Apply blur effect
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent"; // Remove background
                      e.currentTarget.style.backdropFilter = "none"; // Remove blur
                    }}
                    onClick={closeFileHandler}
                  >
                    <img src={CloseIcon} alt="Close Icon" width="16" height="16" />
                  </div>
                </div>
              </div>


              {/* File Content */}
              <div style={{ padding: "20px", fontSize: "18px" }}>
                {activeFile} {/* Display file name as content */}
              </div>
            </div>
          ) : (
            <div style={{ color: "#999", fontSize: "16px", padding: "20px" }}>Select a file to view its content</div>
          )}
        </div>
      </div>
    </>
  )
}

export default App

import './App.css'
import FileExplorer from './components/FileExplorer'
import "./styles.css"
import { useFileContext } from './context/FileContext'

function App() {
  const { activeFile } = useFileContext();

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
              {/* File Tab */}
              <div
                style={{
                  padding: "10px",
                  color: "#fcc419",
                  borderBottom: "2px solid #fcc419",
                  fontWeight: "bold",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                }}
              >
                {activeFile.trim().split("/").pop()}
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

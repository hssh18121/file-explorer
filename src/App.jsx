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
        <div style={{ flexGrow: 1, padding: "20px" }} className='main'>
          {activeFile ? (
            <div>
              {/* File Tab */}
              <div
                style={{
                  padding: "10px",
                  borderBottom: "1px solid #ddd",
                  fontWeight: "bold",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                }}
              >
                {activeFile}
              </div>

              {/* File Content */}
              <div style={{ padding: "20px", fontSize: "18px" }}>
                {activeFile} {/* Display file name as content */}
              </div>
            </div>
          ) : (
            <div style={{ color: "#999", fontSize: "16px" }}>Select a file to view its content</div>
          )}
        </div>
      </div>
    </>
  )
}

export default App

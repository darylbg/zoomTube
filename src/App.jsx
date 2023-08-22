import Sidebar from "./sections/Sidebar";
import Footer from "./sections/Footer";
import React, { useState } from "react";
import SplitPane, { Pane } from "split-pane-react";
import "split-pane-react/esm/themes/default.css";
import "./index.css";

function App() {
  const [chatToggle, setChatToggle] = useState("100%");
  const [sizes, setSizes] = useState([chatToggle, "auto"]);

  const layoutCSS = {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const handleChatToggle = (e) => {
    e.preventDefault();
    setChatToggle('80%');
  }
  return (
    <div style={{ height: "100vh" }}>
      <SplitPane split="vertical" sizes={sizes} onChange={setSizes}>
        <Pane minSize={"50%"} maxSize="80%">
          <div style={{ ...layoutCSS, background: "#1A1A1A" }}>pane1</div>
          <Footer />
        </Pane>
        <div style={{ ...layoutCSS, background: "#d5d7d9" }}>
          <div
            style={{
              height: "100%",
              width: "100%",
              backgroundColor: "white",
              border: "1px solid black",
            }}
          >
            <button>x</button>
            <Sidebar />
          </div>
        </div>
      </SplitPane>
    </div>
  );
}

export default App;

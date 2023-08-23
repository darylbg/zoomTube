import Sidebar from "./sections/Sidebar";
import Footer from "./sections/Footer";
import React, { useState, useEffect } from "react";
import SplitPane, { Pane } from "split-pane-react";
import CarretBlackIcon from "./icons/carretBlack.svg";
import "split-pane-react/esm/themes/default.css";
import "./index.css";

function App() {
  const [chatToggle, setChatToggle] = useState("75%");
  const [sizes, setSizes] = useState([chatToggle, "auto"]);

  const layoutCSS = {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  };

  useEffect(() => {
    setSizes([chatToggle, "auto"]);
  }, [chatToggle]);

  const handleChatToggle = (e) => {
    e.preventDefault();
    setChatToggle("75%");
    console.log(sizes);
  };

  const handleChatToggleOff = (e) => {
    e.preventDefault();
    setChatToggle("100%");
    console.log(chatToggle);
  };
  return (
    <div style={{ height: "100vh" }}>
      <SplitPane split="vertical" sizes={sizes} onChange={setSizes}>
        <Pane minSize={"50%"} maxSize={'95%'}>
          <div style={{ ...layoutCSS, background: "#1A1A1A" }}>
            <div className="left-view">left view</div>
            <div className="right-view">right view</div>
          </div>
          <Footer handleChatToggle={handleChatToggle} />
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
            <button onClick={handleChatToggleOff} className="close-chat-btn">
              x
            </button>
            <Sidebar />
          </div>
        </div>
      </SplitPane>
    </div>
  );
}

export default App;

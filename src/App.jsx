import Participants from "./sections/Participants";
import Chat from "./sections/Chat";
import Footer from "./sections/Footer";
import React, { useState, useEffect, useRef } from "react";
import SplitPane, { Pane } from "split-pane-react";
import Webcam from "react-webcam";
import YoutubeEmbedVideo from "youtube-embed-video";
import ViewMenu from "./components/ViewMenu";
import Dropdown from "react-bootstrap/Dropdown";
import MoreHorizontal from "feather-icons-react/build/IconComponents/MoreHorizontal";
import "split-pane-react/esm/themes/default.css";
import "./index.css";

function App() {
  const [sidebarToggle, setSidebarToggle] = useState("75%");
  const [sidebarContent, setSidebarContent] = useState("");
  const [sizes, setSizes] = useState([sidebarToggle, "auto"]);
  const [myName, setMyName] = useState("");
  const [videoId, setVideoId] = useState("");
  const [toggleVideoView, setToggleVideoView] = useState(false);
  const [viewWidth, setViewWidth] = useState(0);

  const viewRef = useRef(null);

  const layoutCSS = {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  };

  useEffect(() => {
    setSizes([sidebarToggle, "auto"]);
  }, [sidebarToggle]);

  const handleSidebarToggle = (e) => {
    e.preventDefault();
    const elName = e.currentTarget.getAttribute("data-name");
    console.log(elName);
    if (elName === "chat") {
      setSidebarContent("chat");
    } else if (elName === "participants") {
      setSidebarContent("participants");
    }
    setSidebarToggle("75%");
  };

  const handleSidebarToggleOff = (e) => {
    e.preventDefault();

    setSidebarToggle("100%");
  };

  const handleSelectedVideo = (e) => {
    e.preventDefault();
    setToggleVideoView(true);
    const selectedId = e.currentTarget.getAttribute("data-id");
    setVideoId(selectedId);
    console.log(videoId)
  };

  const handleVideoViewHide = (e) => {
    setToggleVideoView(false);
  };

  return (
    <div style={{ height: "100vh" }}>
      <SplitPane split="vertical" sizes={sizes} onChange={setSizes}>
        <Pane minSize={"50%"} maxSize={"95%"}>
          <div style={{ ...layoutCSS }} ref={viewRef}>
            <div className={`video-view ${toggleVideoView ? "" : "d-none"}`}>
              <Dropdown className="view-menu-dropdown">
                <Dropdown.Toggle variant="primary" id="dropdown-basic">
                  <MoreHorizontal />
                </Dropdown.Toggle>

                <Dropdown.Menu className="view-menu-option">
                  <Dropdown.Item onClick={handleSidebarToggle}>
                    Rename
                  </Dropdown.Item>
                  <Dropdown.Item onClick={handleVideoViewHide}>
                    Hide
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <YoutubeEmbedVideo videoId={videoId} suggestions={false} />
            </div>
            <div className="right-view">
              <ViewMenu handleSidebarToggle={handleSidebarToggle} />
              <Webcam style={{ width: "100%" }} />
            </div>
          </div>
          <Footer handleSidebarToggle={handleSidebarToggle} />
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
            <button onClick={handleSidebarToggleOff} className="close-sidebar-btn">
              x
            </button>
            {sidebarContent === "chat" ? (
              <Chat videoId={videoId} />
            ) : (
              <Participants handleSelectedVideo={handleSelectedVideo} />
            )}
          </div>
        </div>
      </SplitPane>
    </div>
  );
}

export default App;

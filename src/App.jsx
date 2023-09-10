import Participants from "./sections/Participants";
import Chat from "./sections/Chat";
import Footer from "./sections/Footer";
import React, { useState, useEffect, useRef } from "react";
import SplitPane, { Pane } from "split-pane-react";
import Webcam from "react-webcam";
import YoutubeEmbedVideo from "youtube-embed-video";
import ViewMenu from "./components/ViewMenu";
import Dropdown from "react-bootstrap/Dropdown";
import { X } from "react-bootstrap-icons";
import {
  MoreHorizontal,
  MicOff,
  // X,
} from "feather-icons-react/build/IconComponents";
import "split-pane-react/esm/themes/default.css";
import "./index.css";

function App() {
  const [sidebarToggle, setSidebarToggle] = useState("100%");
  const [sidebarContent, setSidebarContent] = useState("");
  const [sizes, setSizes] = useState([sidebarToggle, "auto"]);

  const [nameValue, setNameValue] = useState("me");
  const [myName, setMyName] = useState("me");

  const [videoNameValue, setVideoNameValue] = useState("Guest");
  const [videoName, setVideoName] = useState("Guest");

  const [videoId, setVideoId] = useState("");
  const [toggleVideoView, setToggleVideoView] = useState(false);
  const [isWebcamVisible, setIsWebcamVisible] = useState(false);
  const [isVideoVisible, setIsVideoVisible] = useState(true);

  const [paneWidth, setPaneWidth] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  const elementRef = useRef(null);

  const layoutCSS = {
    minHeight: "100%",
    display: "flex",
    flexDirection: paneWidth < 800 ? "column" : "row",
    justifyContent: "space-between",
    paddingBottom: "52px",
  };

  const mediumLayoutCss = {
    flex: "0.8",
  };

  const LargeLayoutCSS = {
    flex: "0.5",
  };

  let conditionalStyles = {};

  if (paneWidth > 1000 && toggleVideoView === false) {
    conditionalStyles = LargeLayoutCSS;
  } else if (paneWidth > 800 && toggleVideoView === false) {
    conditionalStyles = mediumLayoutCss;
  } else {
    conditionalStyles = null;
  }

  useEffect(() => {
    const handleViewPadding = () => {
      if (paneWidth > 900 && toggleVideoView == false) {
      }
    };
    handleViewPadding();
  }, [sizes, viewportWidth]);

  const handleResize = () => {
    setViewportWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setPaneWidth(elementRef.current.offsetWidth);
  }, [sizes, viewportWidth]);

  useEffect(() => {
    setSizes([sidebarToggle, "auto"]);
  }, [sidebarToggle]);

  const handleSidebarToggle = (e) => {
    e.preventDefault();
    const elName = e.currentTarget.getAttribute("data-name");
    // console.log(elName);
    if (elName === "chat") {
      setSidebarContent("chat");
    } else if (elName === "participants") {
      setSidebarContent("participants");
    }

    if (viewportWidth > 768) {
      setSidebarToggle("75%");
    } else {
      setSidebarToggle("0%");
    } 
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
    setIsVideoVisible(true);

    if (viewportWidth < 760) {
      setSidebarToggle("100%");
    }
  };

  const handleVideoViewRemove = (e) => {
    e.preventDefault();
    setIsVideoVisible(false);
    setToggleVideoView(false);
  };

  const toggleWebcamHide = (e) => {
    e.preventDefault();
    setIsWebcamVisible(false);
  };

  const toggleWebcamVisible = (e) => {
    e.preventDefault();
    setIsWebcamVisible(true);
  };

  const toggleVideoHide = (e) => {
    e.preventDefault();
    setIsVideoVisible(false);
  };

  const toggleVideoVisible = (e) => {
    e.preventDefault();
    setIsVideoVisible(true);
  };

  const handleMyNameChange = (e) => {
    e.preventDefault();
    setMyName(nameValue);
  };

  const handleClearNameInput = (e) => {
    e.preventDefault();
    setNameValue("");
  };

  const handleVideoNameChange = (e) => {
    e.preventDefault();
    setVideoName(videoNameValue);
  };

  const handleClearVideoNameInput = (e) => {
    e.preventDefault();
    setVideoNameValue("");
  };

  const handleDateFormat = (date) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(date)
      .toLocaleDateString("en-US", options)
      .replace(/\//g, "-");
  };

  return (
    <div style={{ height: "100vh", overflow: "hidden" }}>
      <SplitPane
        split="vertical"
        sizes={sizes}
        onChange={setSizes}
        className="split-pane-section"
      >
        <Pane minSize={"20%"} maxSize={"95%"}>
          <div style={{ ...layoutCSS, alignItems: "center" }} ref={elementRef}>
            <div
              style={{
                width: paneWidth < 800 ? "80%" : null,
                paddingLeft: paneWidth > 900 ? "5%" : null,
              }}
              // style={conditionalStyles}
              className={`view-wrapper ${toggleVideoView ? "" : "d-none"}`}
            >
              <div className={`video-view `}>
                <Dropdown className="view-menu-dropdown">
                  <Dropdown.Toggle variant="primary" id="dropdown-basic">
                    <MoreHorizontal />
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="view-menu-option">
                    <Dropdown.Item data-name="participants" onClick={handleSidebarToggle}>
                      Rename
                    </Dropdown.Item>
                    {isVideoVisible ? (
                      <Dropdown.Item onClick={toggleVideoHide}>
                        Hide
                      </Dropdown.Item>
                    ) : (
                      <Dropdown.Item onClick={toggleVideoVisible}>
                        Show video
                      </Dropdown.Item>
                    )}
                    <Dropdown.Item onClick={handleVideoViewRemove}>
                      Remove
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                {isVideoVisible && videoId !== '' ? (
                  <YoutubeEmbedVideo videoId={videoId} suggestions={false} />
                ) : (
                  <p
                    className="view-title"
                    style={{ fontSize: paneWidth < 800 ? "2em" : "5vw" }}
                  >
                    {videoName}
                  </p>
                )}
                <div className="view-mute-label">
                  <MicOff />
                  <p>{videoName}</p>
                </div>
              </div>
            </div>
            <div
              style={{
                width: paneWidth < 800 ? "80%" : null,
                paddingRight:
                  paneWidth > 900 && toggleVideoView === true ? "5%" : null,
              }}
              // style={conditionalStyles}
              className="view-wrapper"
            >
              <div className="right-view" style={conditionalStyles}>
                <ViewMenu handleSidebarToggle={handleSidebarToggle} />
                {isWebcamVisible ? (
                  <Webcam style={{ width: "100%" }} />
                ) : (
                  <p
                    className="view-title"
                    style={{ fontSize: paneWidth < 800 ? "2em" : "4vw" }}
                  >
                    {myName}
                  </p>
                )}
                <div className="view-mute-label">
                  <MicOff />
                  <p>{myName}</p>
                </div>
              </div>
            </div>
          </div>
          <Footer
            handleSidebarToggle={handleSidebarToggle}
            toggleWebcamVisible={toggleWebcamVisible}
            toggleWebcamHide={toggleWebcamHide}
            isWebcamVisible={isWebcamVisible}
            paneWidth={paneWidth}
            handleVideoViewRemove={handleVideoViewRemove}
          />
        </Pane>
        <div style={{ ...layoutCSS, background: "white" }}>
          <div
            style={{
              height: "100vh",
              width: "100%",
              backgroundColor: "white",
            }}
          >
            <button
              onClick={handleSidebarToggleOff}
              className={`close-sidebar-btn ${
                sidebarContent === "chat" ? "btn-box-shadow" : ""
              }`}
            >
              <X />
            </button>
            {sidebarContent === "chat" ? (
              <Chat
                videoId={videoId}
                handleDateFormat={handleDateFormat}
                paneWidth={paneWidth}
                viewportWidth={viewportWidth}
              />
            ) : (
              <Participants
                handleSelectedVideo={handleSelectedVideo}
                handleMyNameChange={handleMyNameChange}
                nameValue={nameValue}
                setNameValue={setNameValue}
                handleClearNameInput={handleClearNameInput}
                handleVideoNameChange={handleVideoNameChange}
                handleClearVideoNameInput={handleClearVideoNameInput}
                setVideoNameValue={setVideoNameValue}
                videoNameValue={videoNameValue}
                toggleVideoView={toggleVideoView}
                handleDateFormat={handleDateFormat}
              />
            )}
          </div>
        </div>
      </SplitPane>
    </div>
  );
}

export default App;

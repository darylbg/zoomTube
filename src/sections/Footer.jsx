import React, { useState, useEffect } from "react";
import MicOnIcon from "../assets/icons/micOn.svg";
import MicOffIcon from "../assets/icons/micOff.svg";
import VideoOffIcon from "../assets/icons/videoOff.svg";
import VideoOnIcon from "../assets/icons/videoOn.svg";
import ChatIcon from "../assets/icons/chat.svg";
import MoreIcon from "../assets/icons/more.svg";
import ParticipantsIcon from "../assets/icons/participants.svg";
import ReactionsIcon from "../assets/icons/reactions.svg";
import SecurityIcon from "../assets/icons/security.svg";
import SettingsIcon from "../assets/icons/settings.svg";
import ShareScreenIcon from "../assets/icons/shareScreen.svg";
import WhiteboardsIcon from "../assets/icons/whiteboards.svg";
import CarretIcon from "../assets/icons/carret.svg";
import CarretGreenIcon from "../assets/icons/carretGreen.svg";

function CollapsibleItem({
  icon,
  text,
  onClick,
  dataName,
  className,
  smallIcon,
  textStyle
}) {
  return (
    <div
      className={`'collapsible' ${className}`}
      onClick={onClick}
      data-name={dataName}
    >
      <div>
        <img src={icon} alt="Icon" />
        {smallIcon && <img src={smallIcon} alt="Small Icon" className="carret-icon" />}
      </div>
      <p style={textStyle && textStyle}>{text}</p>
    </div>
  );
}

function Footer({
  handleSidebarToggle,
  toggleWebcamHide,
  toggleWebcamVisible,
  isWebcamVisible,
  paneWidth,
  handleVideoViewRemove
}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <footer className="footer">
      <div className="footer-icons">
        {" "}
        <div>
          <div>
            <img src={MicOffIcon}></img>
          </div>
          <img className="footer-micOff-carretIcon" src={CarretIcon}></img>
          <p>Unmute</p>
        </div>
        <div
          className="cursor-pointer"
          onClick={isWebcamVisible ? toggleWebcamHide : toggleWebcamVisible}
        >
          <div>
            <img src={isWebcamVisible ? VideoOnIcon : VideoOffIcon}></img>
          </div>
          <p>Start Video</p>
        </div>
      </div>
      <div className="footer-icons">
        <CollapsibleItem
          icon={SecurityIcon}
          text="Security"
          className={`${paneWidth < 530 ? "hide-1" : ""}`}
        />
        <CollapsibleItem
          icon={ParticipantsIcon}
          text="Participants"
          dataName="participants"
          onClick={handleSidebarToggle}
          className={`cursor-pointer ${paneWidth < 530 ? "hide-1" : ""}`}
        />
        <CollapsibleItem
          icon={ShareScreenIcon}
          text="Share Screen"
          className={`${paneWidth < 750 ? "hide-1" : ""}`}
          smallIcon={CarretGreenIcon}
          textStyle={{color: '#23D959'}}
        />
        <CollapsibleItem
          icon={ChatIcon}
          text="Chat"
          dataName="chat"
          onClick={handleSidebarToggle}
          className={`cursor-pointer ${paneWidth < 750 ? "hide-1" : ""}`}
          smallIcon={CarretIcon}
        />
        <CollapsibleItem
          icon={WhiteboardsIcon}
          text="Whiteboards"
          className={`${paneWidth < 980 ? "hide-1" : ""}`}
          smallIcon={CarretIcon}
        />
        <CollapsibleItem
          icon={ReactionsIcon}
          text="Reactions"
          className={`${paneWidth < 980 ? "hide-1" : ""}`}
        />
        <CollapsibleItem
          icon={SettingsIcon}
          text="Settings"
          className={`${paneWidth < 980 ? "hide-1" : ""}`}
        />
        {paneWidth < 980 ? (
          <div className="dropup cursor-pointer" onClick={toggleMenu}>
            <div>
              <img src={MoreIcon}></img>
            </div>

            <p>More</p>
            {isOpen && (
              <div className="dropup-content" onClick={closeMenu}>
                <div className={`${paneWidth > 530 ? "hide-1" : ""}`}>
                  <p>Security</p>
                </div>
                <div
                  onClick={handleSidebarToggle}
                  data-name="participants"
                  className={`cursor-pointer ${
                    paneWidth > 530 ? "hide-1" : ""
                  }`}
                >
                  <p>Participants</p>
                </div>
                <div className={`${paneWidth > 750 ? "hide-1" : ""}`}>
                  <p>Share Screen</p>
                </div>
                <div
                  onClick={handleSidebarToggle}
                  data-name="chat"
                  className={`cursor-pointer ${
                    paneWidth > 750 ? "hide-1" : ""
                  }`}
                >
                  <p>Chat</p>
                </div>
                <div className={`${paneWidth > 980 ? "hide-1" : ""}`}>
                  <p>Whiteboards</p>
                </div>
                <div className={`${paneWidth > 980 ? "hide-1" : ""}`}>
                  <p>Reactions</p>
                </div>
                <div className={`${paneWidth > 980 ? "hide-1" : ""}`}>
                  <p>Settings</p>
                </div>
              </div>
            )}
          </div>
        ) : null}
      </div>
      <div className="footer-right-icons">
        <button className="leave-button" onClick={handleVideoViewRemove}>Leave</button>
      </div>
    </footer>
  );
}

export default Footer;

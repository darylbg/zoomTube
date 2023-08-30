import React, { useState } from "react";
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

function Footer({ handleSidebarToggle, toggleWebcamHide, toggleWebcamVisible, isWebcamVisible }) {
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
        <div onClick={isWebcamVisible ? toggleWebcamHide : toggleWebcamVisible}>
          <div>
            <img src={isWebcamVisible ? VideoOnIcon : VideoOffIcon}></img>
          </div>
          <p>Start Video</p>
        </div>
      </div>
      <div className="footer-icons">
        <div>
          <div>
            <img src={SecurityIcon}></img>
          </div>

          <p>Security</p>
        </div>
        <div onClick={handleSidebarToggle} data-name="participants">
          <div>
            <img src={ParticipantsIcon}></img>
          </div>
          <p>Participants</p>
        </div>
        <div>
          <div>
            <img src={ShareScreenIcon}></img>
          </div>
          <img className="footer-micOff-carretIcon" src={CarretGreenIcon}></img>
          <p style={{ color: "#28E567" }}>Share Screen</p>
        </div>
        <div onClick={handleSidebarToggle} data-name="chat">
          <div>
            <img src={ChatIcon}></img>
          </div>
          <img className="footer-micOff-carretIcon" src={CarretIcon}></img>
          <p>Chat</p>
        </div>
        <div>
          <div>
            <img src={WhiteboardsIcon}></img>
          </div>
          <img className="footer-micOff-carretIcon" src={CarretIcon}></img>
          <p>Whiteboards</p>
        </div>
        <div>
          <div>
            <img src={ReactionsIcon}></img>
          </div>

          <p>Reactions</p>
        </div>
        <div>
          <div>
            <img src={SettingsIcon}></img>
          </div>

          <p>Settings</p>
        </div>
        <div>
          <div>
            <img src={MoreIcon}></img>
          </div>

          <p>More</p>
        </div>
      </div>
      <div className="footer-right-icons">
        <button className="leave-button">Leave</button>
      </div>
    </footer>
  );
}

export default Footer;

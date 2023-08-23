import React, { useState } from "react";
import MicOnIcon from "../icons/micOn.svg";
import MicOffIcon from "../icons/micOff.svg";
import VideoOffIcon from "../icons/videoOff.svg";
import VideoOnIcon from "../icons/videoOn.svg";
import ChatIcon from "../icons/chat.svg";
import MoreIcon from "../icons/more.svg";
import ParticipantsIcon from "../icons/participants.svg";
import ReactionsIcon from "../icons/reactions.svg";
import SecurityIcon from "../icons/security.svg";
import SettingsIcon from "../icons/settings.svg";
import ShareScreenIcon from "../icons/shareScreen.svg";
import WhiteboardsIcon from "../icons/whiteboards.svg";
import CarretIcon from "../icons/carret.svg";
import CarretGreenIcon from "../icons/carretGreen.svg";

function Footer({handleChatToggle}) {
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
        <div>
          <div>
            <img src={VideoOffIcon}></img>
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
        <div>
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
          <p style={{color: '#28E567'}}>Share Screen</p>
        </div>
        <div
            onClick={handleChatToggle}
        >
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

import React, { useContext } from "react";
import Cam from "../img/cam.png";
import Add from "../img/add.png";
import More from "../img/more.png";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";
import "./Chat.css"; // Import the CSS file for styling

const Chat = () => {
  const { data } = useContext(ChatContext);

  return (
    <div className="chat">
      <div className="chatInfo">
        <span>{data.user?.displayName}</span>
        <div className="chatIcons">
          <img src={Cam} alt="Camera" title="Start a video call" />
          <img src={Add} alt="Add" title="Add a new user" />
          <img src={More} alt="More" title="More options" />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;


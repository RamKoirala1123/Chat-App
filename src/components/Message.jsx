import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div
      ref={ref}
      className={`message flex items-start space-x-4 ${
        message.senderId === currentUser.uid ? "justify-end" : "justify-start"
      }`}
    >
      {/* User Profile Image */}
      {message.senderId !== currentUser.uid && (
        <img
          src={data.user.photoURL}
          alt="Profile"
          className="w-10 h-10 rounded-full"
        />
      )}

      {/* Message Content */}
      <div
        className={`messageContent flex flex-col max-w-[70%] ${
          message.senderId === currentUser.uid
            ? "items-end"
            : "items-start"
        }`}
      >
        {/* Message Bubble */}
        <div
          className={`messageBubble p-3 rounded-xl text-white ${
            message.senderId === currentUser.uid
              ? "bg-blue-500 rounded-bl-none"
              : "bg-gray-300 text-black rounded-br-none"
          }`}
        >
          <p>{message.text}</p>
        </div>

        {/* Image in Message (if exists) */}
        {message.img && (
          <img
            src={message.img}
            alt="attachment"
            className="mt-2 max-w-[250px] rounded-lg"
          />
        )}

        {/* Timestamp */}
        <span className="text-xs text-gray-500 mt-1">
          {message.timestamp || "just now"}
        </span>
      </div>

      {/* User Profile Image for Current User */}
      {message.senderId === currentUser.uid && (
        <img
          src={currentUser.photoURL}
          alt="Profile"
          className="w-10 h-10 rounded-full"
        />
      )}
    </div>
  );
};

export default Message;

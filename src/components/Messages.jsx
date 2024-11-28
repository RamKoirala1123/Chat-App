import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState, useRef } from "react";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";
import Message from "./Message";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);
  const scrollRef = useRef();

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      if (doc.exists()) {
        setMessages(doc.data().messages);
      }
    });

    return () => {
      unSub();
    };
  }, [data.chatId]);

  // Scroll to the bottom every time new messages are added
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="messages flex flex-col space-y-4 p-4 max-h-[80vh] overflow-y-auto">
      {messages.map((m) => (
        <Message message={m} key={m.id} />
      ))}

      {/* This div ensures the scroll bar is always at the bottom */}
      <div ref={scrollRef} />
    </div>
  );
};

export default Messages;

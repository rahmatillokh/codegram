"use client";
import { fetchMessages } from "@/lib/fetchers";
import { useMessages, useSelectedUser, useUser } from "@/store/userStore";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import React, { useEffect } from "react";
import { shallow } from "zustand/shallow";
import MessageItem from "./MessageItem";
import { io } from "socket.io-client";

const MessagesList = () => {
  const sender = useUser((state) => state.myUser);
  const reciver = useSelectedUser((state) => state.selectedUser);
  const { messages, setMessages } = useMessages(
    (state: any) => ({
      messages: state.messages,
      setMessages: state.setMessages,
    }),
    shallow
  );

  const [parent] = useAutoAnimate();
  const socket = io("https://codegram-f640.onrender.com");

  socket.on("refresh", () => {
    fetchMessages(sender, reciver, setMessages);
  });

  useEffect(() => {
    fetchMessages(sender, reciver, setMessages);
  }, [reciver, setMessages]);

  return (
    <div
      ref={parent}
      className="w-full mb-10 flex flex-col max-h-[75vh] overflow-auto no-scrollbar"
    >
      {messages ? (
        messages.map((item: any, i: number) => (
          <MessageItem
            key={i}
            message={item.message}
            user={sender.email === item.sender ? true : false}
          />
        ))
      ) : (
        <></>
      )}
    </div>
  );
};

export default MessagesList;

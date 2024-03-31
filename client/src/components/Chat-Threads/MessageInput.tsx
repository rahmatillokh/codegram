"use client";
import { useSelectedUser } from "@/store/userStore";
import { SendMsIcon, SmileFaceIcon } from "@/utils/icons";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { io } from "socket.io-client";

const Picker = dynamic(
  () => {
    return import("emoji-picker-react");
  },
  { ssr: false }
);

const MessageInput = () => {
  const [inpValue, setInpValue] = useState("");
  const [showEmojie, setShowEmojie] = useState(false);
  const { theme } = useTheme();
  const selectedUser = useSelectedUser((state) => state.selectedUser);
  const [cookie, setCookie] = useCookies(["user"]);

  const socket = io("https://codegram-f640.onrender.com");

  function onEmojiClick(emojiObject: { emoji: string }) {
    setInpValue(inpValue + emojiObject.emoji);
    setShowEmojie(false);
  }

  function handleSubmit(e: any) {
    e.preventDefault();
    socket.emit("private message", selectedUser?.email, inpValue, cookie?.user);
    setInpValue("");
  }

  return (
    <form className="mt-auto relative" onSubmit={handleSubmit}>
      <div className="w-full mb-5 relative">
        <input
          type="text"
          value={inpValue}
          onChange={(e) => setInpValue(e.target.value)}
          placeholder="Message"
          className="input w-full pl-14 input-bordered"
        />
      </div>
      <button
        type="button"
        className="absolute top-1/2 left-5 -translate-y-1/2"
        onClick={() => setShowEmojie(!showEmojie)}
      >
        <SmileFaceIcon />
      </button>

      {showEmojie && (
        <div className="absolute bottom-full">
          <Picker onEmojiClick={onEmojiClick} />
        </div>
      )}

      <button
        type="submit"
        className="absolute top-1/2 right-5 -translate-y-1/2"
      >
        <SendMsIcon />
      </button>
    </form>
  );
};

export default MessageInput;

"use client";
import React from "react";
import TopBar from "./TopBar";
import { useSelectedUser } from "@/store/userStore";
import MessagesList from "./MessagesList";
import MessageInput from "./MessageInput";

const Messages = () => {
  const selectedUser = useSelectedUser((state) => state.selectedUser);

  return (
    <div className="bg-image messages w-full min-h-screen z-0 hidden md:w-1/2 lg:w-2/3 md:flex md:flex-col flex-col">
      <TopBar selectedUser={selectedUser} />

      <div
        className={`max-w-sm md:max-w-3xl w-full mx-auto mt-auto mb-10 ${
          selectedUser ? "" : "md:hidden"
        }`}
      >
        <MessagesList />
        <MessageInput />
      </div>
    </div>
  );
};

export default Messages;

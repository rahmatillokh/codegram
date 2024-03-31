import Messages from "@/components/Chat-Threads/Message";
import Sidebar from "@/components/Sidebar/Sidebar";
import Image from "next/image";
import logo from "@/assets/Untitled_logo_1_free-file (1).jpg";

const ChatPage = () => {
  return (
    <div className="min-h-screen">
      <div className="mx-auto flex">
        {/* SIDEBAR */}
        <Sidebar />

        {/* MESSAGES */}
        <Messages />
      </div>
    </div>
  );
};

export default ChatPage;

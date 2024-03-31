import Messages from "@/components/Chat-Threads/Message";
import Sidebar from "@/components/Sidebar/Sidebar";
import Image from "next/image";
import logo from "@/assets/Untitled_logo_1_free-file (1).jpg";

const ChatPage = () => {
  return (
    <div className="min-h-screen">
      <div className="flex items-center gap-2 absolute z-50 left-3 bottom-1">
        <Image
          src={logo}
          width={16}
          height={16}
          alt="logo"
          className="rounded-full"
        />
        <p>Powered by Kodlash Team</p>
      </div>
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

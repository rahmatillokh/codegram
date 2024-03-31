import Messages from "@/components/Chat-Threads/Message";
import Sidebar from "@/components/Sidebar/Sidebar";

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

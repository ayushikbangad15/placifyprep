import React from "react";
import ChatBot from "../components/chat/ChatBot";

const ChatBotPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex justify-center items-center p-6">
      <ChatBot />
    </div>
  );
};

export default ChatBotPage;

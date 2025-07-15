import React from "react";
import Navbar from "../../component/navBar/Navbar";
import Chat from "../../component/cards/Chat/Chat";
import "./Style.css";

function AiChat() {
  return (
    <div>
      <Navbar />
      <div className="pages">
        <Chat />
      </div>
    </div>
  );
}

export default AiChat;

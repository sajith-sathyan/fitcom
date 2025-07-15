import { useState } from "react";
import { FaPaperPlane, FaSmile } from "react-icons/fa";
import "./Style.css";

const Chat = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "BOT",
      text: "Hi, welcome to SimpleChat! Go ahead and send me a message. 😄",
      time: "12:45",
      isBot: true,
    },
    {
      id: 2,
      sender: "Sajiith",
      text: "You can change your name in the JS section!",
      time: "12:46",
      isBot: false,
    },
  ]);

  const [input, setInput] = useState("");

  const sendMessage = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const newMessage = {
      id: messages.length + 1,
      sender: "Sajiith",
      text: input,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isBot: false,
    };
    setMessages([...messages, newMessage]);
    setInput("");
  };

  return (
    <section className="chat-container">
      <header className="chat-header">
        <div className="chat-title">
          <i className="fas fa-comment-alt"></i>
          <span>Ai Assistant</span>
        </div>
        <i className="fas fa-cog settings-icon"></i>
      </header>

      <main className="chat-messages">
        {messages.map((msg) => (
          <div key={msg.id} className={`message ${msg.isBot ? "bot" : "user"}`}>
            {!msg.isBot && <div className="avatar user-avatar"></div>}
            <div className="message-content">
              <div className="message-header">
                <span className="message-sender">{msg.sender}</span>
                <span className="message-time">{msg.time}</span>
              </div>
              <div className="message-text">{msg.text}</div>
            </div>
            {msg.isBot && <div className="avatar bot-avatar"></div>}
          </div>
        ))}
      </main>

      <form className="chat-input-area" onSubmit={sendMessage}>
        <button type="button" className="emoji-button">
          <FaSmile />
        </button>
        <textarea
          className="chat-input"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={1}
        />
        <button type="submit" className="send-button">
          <FaPaperPlane />
        </button>
      </form>
    </section>
  );
};

export default Chat;

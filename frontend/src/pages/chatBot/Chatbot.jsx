import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleChat = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Floating button on bottom-right */}
      <div style={{ position: 'fixed', bottom: 20, right: 20, zIndex: 9999 }}>
        <button
          onClick={toggleChat}
          style={{
            backgroundColor: '#2563eb',
            color: 'white',
            padding: 12,
            borderRadius: '50%',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          {isOpen ? <X /> : <MessageCircle />}
        </button>
      </div>

      {/* Chat window above button, right side */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: 80,
            right: 20,
            width: 320,
            height: 400,
            backgroundColor: 'white',
            borderRadius: 16,
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
            zIndex: 9999,
            padding: 16,
          }}
        >
          <h2 style={{ marginBottom: 16, color: '#2563eb' }}>Fitcom AI Chatbot</h2>
          <p>Chatbot is working!</p>
        </div>
      )}
    </>
  );
};

export default Chatbot;

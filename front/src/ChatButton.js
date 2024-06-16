import React from 'react';
import './styles/ChatButton.css';

function ChatButton({ onClick }) {
  return (
    <div className="chat-button" onClick={onClick}>
      <div className="chat-notification">
        Hello, I can help you find the perfect size!
      </div>
      <img src="/logo.PNG" alt="SizeBot" className="chat-logo" />
      <span className="chat-title">SizeBot</span>
    </div>
  );
}

export default ChatButton;

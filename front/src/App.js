import React, { useState } from 'react';
import ChatButton from './ChatButton';
import CustomChatContainer from './ChatContainer';
import './App.css';

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isChatMinimized, setIsChatMinimized] = useState(false);

  return (
    <div className="app">
      <header className="app-header">
        <h1>SizeBot</h1>
      </header>
      <div className="content">
        <p>Welcome to the E-commerce Website!</p>
        <img src="/background.webp" alt="E-commerce Background" className="background-image"/>
      </div>
      {isChatOpen ? (
        isChatMinimized ? (
          <ChatButton onClick={() => setIsChatMinimized(false)} />
        ) : (
          <CustomChatContainer onClose={() => setIsChatOpen(false)} onMinimize={() => setIsChatMinimized(true)} />
        )
      ) : (
        <ChatButton onClick={() => setIsChatOpen(true)} />
      )}
    </div>
  );
}

export default App;

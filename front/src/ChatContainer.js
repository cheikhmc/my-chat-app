import React, { useState, useEffect } from 'react';
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
} from '@chatscope/chat-ui-kit-react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import './styles/ChatContainer.css';

function CustomChatContainer({ onClose, onMinimize }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8000/api/ws/chat');
    setSocket(ws);

    ws.onopen = () => {
      console.log('WebSocket connection established');
    };

    ws.onmessage = (event) => {
      const response = JSON.parse(event.data);
      if (response.message) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: 'agent', text: response.message },
        ]);
      } else if (response.error) {
        console.error('Error from server:', response.error);
      }
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      ws.close();
    };
  }, []);

  const sendMessage = (messageText) => {
    const newMessages = [...messages, { sender: 'user', text: messageText }];
    setMessages(newMessages);
    setInput('');

    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(
        JSON.stringify({
          history: newMessages,
        })
      );
    }
  };

  const clearChat = () => {
    setMessages([]);
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <img src="/logo.PNG" alt="SizeBot" className="chat-logo" />
        <div className="chat-header-buttons">
          <button className="chat-clear-button" onClick={clearChat}>
            Clear Chat
          </button>
          <button className="chat-minimize-button" onClick={onMinimize}>
            −
          </button>
          <button className="chat-close-button" onClick={onClose}>
            ✖
          </button>
        </div>
      </div>
      <MainContainer>
        <ChatContainer>
          <MessageList>
            {messages.map((msg, index) => (
              <Message
                key={index}
                model={{
                  message: msg.text,
                  sentTime: 'just now',
                  sender: msg.sender,
                  direction: msg.sender === 'user' ? 'outgoing' : 'incoming',
                }}
              />
            ))}
          </MessageList>
          <MessageInput
            placeholder="Type your message here..."
            value={input}
            onChange={(val) => setInput(val)}
            onSend={() => sendMessage(input)}
            attachButton={false}
          />
        </ChatContainer>
      </MainContainer>
    </div>
  );
}

export default CustomChatContainer;

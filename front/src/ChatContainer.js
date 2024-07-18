import React, { useState, useEffect, useRef } from 'react';
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
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef(null);
  const maxRetries = 5;
  let retries = 0;

  const connectWebSocket = () => {
    socketRef.current = new WebSocket('ws://localhost:8000/api/ws/chat');

    socketRef.current.onopen = () => {
      console.log('WebSocket connection established');
      setIsConnected(true);
      retries = 0;
    };

    socketRef.current.onmessage = (event) => {
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

    socketRef.current.onclose = () => {
      console.log('WebSocket connection closed');
      setIsConnected(false);
      if (retries < maxRetries) {
        setTimeout(() => {
          retries += 1;
          connectWebSocket();
        }, 1000 * retries); // Exponential backoff
      }
    };

    socketRef.current.onerror = (error) => {
      console.error('WebSocket error:', error);
      socketRef.current.close();
    };
  };

  useEffect(() => {
    connectWebSocket();

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, []);

  const sendMessage = (messageText) => {
    const newMessages = [...messages, { sender: 'user', text: messageText }];
    setMessages(newMessages);
    setInput('');

    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(
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
      {!isConnected && (
        <div className="connection-status">
          Connection lost. Trying to reconnect...
        </div>
      )}
    </div>
  );
}

export default CustomChatContainer;

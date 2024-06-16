import React, { useState } from 'react';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput } from '@chatscope/chat-ui-kit-react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import axios from 'axios';
import './ChatContainer.css';

function CustomChatContainer({ onClose, onMinimize }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async (messageText) => {
    const newMessages = [...messages, { sender: 'user', text: messageText }];
    try {
      const response = await axios.post('http://localhost:8000/api/chat', {
        history: newMessages
      });
      setMessages([...newMessages, { sender: 'agent', text: response.data.message }]);
      setInput('');
    } catch (error) {
      console.error(error);
    }
  };

  const clearChat = () => {
    setMessages([]);
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <img src="/logo.PNG" alt="SizeBot" className="chat-logo" />
        <button className="chat-clear-button" onClick={clearChat}>Clear Chat</button>
        <button className="chat-minimize-button" onClick={onMinimize}>−</button>
        <button className="chat-close-button" onClick={onClose}>✖</button>
      </div>
      <MainContainer>
        <ChatContainer>
          <MessageList>
            {messages.map((msg, index) => (
              <Message
                key={index}
                model={{
                  message: msg.text,
                  sentTime: "just now",
                  sender: msg.sender,
                  direction: msg.sender === 'user' ? 'outgoing' : 'incoming'
                }}
              />
            ))}
          </MessageList>
          <MessageInput 
            placeholder="Type your message here..." 
            value={input}
            onChange={val => setInput(val)}
            onSend={() => sendMessage(input)}
            attachButton={false}
          />
        </ChatContainer>
      </MainContainer>
    </div>
  );
}

export default CustomChatContainer;


import React, { useState, useRef, useEffect, useCallback } from 'react';
import Message from './Message';
import './ChatSession.css';

function ChatSession({ messages, onSendMessage }) {
  const [newMessage, setNewMessage] = useState('');
  const chatContainerRef = useRef(null);

  const scrollToBottom = useCallback(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      onSendMessage(newMessage.trim());
      setNewMessage('');
    }
  };

  const sortedMessages = [...messages].sort((a, b) => new Date(b.createdOn) - new Date(a.createdOn));

  return (
    <div className="chat-session">
      <div className="message-container" ref={chatContainerRef}>
        {sortedMessages.map((message, index) => (
          <Message 
            key={message.id || `${message.sender}-${index}`}
            content={message.content}
            sender={message.sender}
            createdOn={message.createdOn}
          />
        ))}
      </div>
      <div className="input-area">
        <textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => { 
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSendMessage();
            }
          }}
          placeholder="Type your message..."
          className="message-input"
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
}

export default React.memo(ChatSession);

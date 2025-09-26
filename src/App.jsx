
import React, { useState, useEffect, useCallback } from 'react';
import ChatSession from './ChatSession';
import './App.css';

const API_BASE_URL = 'http://localhost:8080';

function App() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const sessionId = 1;
  const userId = 1;

  const fetchChatHistory = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/user/chat/${sessionId}/history`);
      if (!response.ok) {
        throw new Error('Failed to fetch chat history');
      }
      const data = await response.json();
      setMessages(data.content);
    } catch (error) {
      console.error('Error fetching chat history:', error);
    } finally {
      setLoading(false);
    }
  }, [sessionId]);

  useEffect(() => {
    fetchChatHistory();
  }, [fetchChatHistory]);

  const sendMessage = async (content) => {
    try {
      const response = await fetch(`${API_BASE_URL}/user/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId: sessionId,
          userId: userId,
          userMessage: content
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to send message');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  };

  const handleSendMessage = useCallback(async (content) => {
    try {
      // Add the user's message immediately to the UI
      const userMessage = { content, sender: 'USER', createdOn: new Date().toISOString() };
      setMessages(prevMessages => [...prevMessages, userMessage]);

      // Send the message to the server
      await sendMessage(content);

      // Reload the chat history to get the bot's response
      await fetchChatHistory();
    } catch (error) {
      console.error('Failed to send message:', error);
      // Optionally, remove the user's message if the send failed
      setMessages(prevMessages => prevMessages.filter(msg => msg !== userMessage));
    }
  }, [sendMessage, fetchChatHistory]);

  if (loading) {
    return <div className="app-container">Loading...</div>;
  }

  return (
    <div className="app-container">
      <div className="chat-container">
        <ChatSession
          messages={messages}
          onSendMessage={handleSendMessage}
          onReload={fetchChatHistory}
        />
      </div>
    </div>
  );
}

export default App;

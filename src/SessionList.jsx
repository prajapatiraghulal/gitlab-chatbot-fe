
import React, { useState, useEffect } from 'react';
import ChatSession from './ChatSession';
import SessionList from './SessionList';
import './App.css';

function App() {
  const [sessions, setSessions] = useState([]);
  const [currentSessionId, setCurrentSessionId] = useState(null);
  const [loading, setLoading] = useState(true);

  // Dummy API calls
  const fetchSessions = async () => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    // Mock data - replace with actual API call
    return [
      { id: 1, name: 'New Session', messages: [] },
      { id: 2, name: 'Project Discussion', messages: [] }
    ];
  };

  const createNewSession = async () => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 300));
    // Mock response - replace with actual API call
    const newSession = { id: Date.now(), name: `Session ${Date.now()}`, messages: [] };
    setSessions(prev => [...prev, newSession]);
    setCurrentSessionId(newSession.id);
    return newSession;
  };

  const updateSessionTitle = async (sessionId, newTitle) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 200));
    // Mock response - replace with actual API call
    setSessions(prev => 
      prev.map(session => 
        session.id === sessionId ? { ...session, name: newTitle } : session
      )
    );
  };

  const fetchSessionMessages = async (sessionId) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 400));
    // Mock response - replace with actual API call
    return [];
  };

  const sendMessage = async (sessionId, message) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 300));
    // Mock response - replace with actual API call
    return { id: Date.now(), text: message, sender: 'user', timestamp: new Date() };
  };

  useEffect(() => {
    const loadSessions = async () => {
      try {
        const fetchedSessions = await fetchSessions();
        setSessions(fetchedSessions);
        if (fetchedSessions.length > 0) {
          setCurrentSessionId(fetchedSessions[0].id);
        }
      } catch (error) {
        console.error('Failed to fetch sessions:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSessions();
  }, []);

  const switchSession = (sessionId) => {
    setCurrentSessionId(sessionId);
  };

  const updateSessionMessages = (sessionId, newMessages) => {
    setSessions(prev => 
      prev.map(session => 
        session.id === sessionId ? { ...session, messages: newMessages } : session
      )
    );
  };

  const currentSession = sessions.find(session => session.id === currentSessionId);

  if (loading) {
    return <div className="app-container">Loading...</div>;
  }

  return (
    <div className="app-container">
      <SessionList
        sessions={sessions}
        currentSessionId={currentSessionId}
        onSessionClick={switchSession}
        onCreateNewSession={createNewSession}
        onUpdateSessionTitle={updateSessionTitle}
      />
      <div className="chat-container">
        {currentSession && (
          <ChatSession
            sessionId={currentSession.id}
            messages={currentSession.messages}
            onUpdateMessages={(newMessages) => updateSessionMessages(currentSession.id, newMessages)}
            onSendMessage={sendMessage}
            fetchSessionMessages={fetchSessionMessages}
          />
        )}
      </div>
    </div>
  );
}

export default App;

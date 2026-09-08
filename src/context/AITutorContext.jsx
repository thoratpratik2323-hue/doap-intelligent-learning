import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { generateSmartTutorResponse } from '../services/aiTutorEngine';
import { useTheme } from './ThemeContext';
import { useAuth } from './AuthContext';

const STORAGE_KEY = 'doap_ai_chat_sessions';

const generateTitleFromPrompt = (prompt) => {
  let clean = prompt.replace(/^(\/image|\/code|\/explain|\/interview|\/quiz)\s+/i, '').trim();
  if (clean.length > 26) {
    clean = clean.slice(0, 26) + '...';
  }
  if (prompt.startsWith('/image')) return `🎨 ${clean}`;
  if (prompt.startsWith('/code')) return `💻 ${clean}`;
  if (prompt.startsWith('/explain')) return `💡 ${clean}`;
  if (prompt.startsWith('/interview')) return `🎯 ${clean}`;
  if (prompt.startsWith('/quiz')) return `📝 ${clean}`;
  return clean.charAt(0).toUpperCase() + clean.slice(1);
};

const AITutorContext = createContext(null);

export const AITutorProvider = ({ children }) => {
  const { currentPath } = useTheme();
  const { profile } = useAuth();
  const userName = profile?.name ? profile.name.split(' ')[0] : 'there';

  // Persistent sessions
  const [sessions, setSessions] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
      } catch (e) {
        console.error('Error loading chat sessions:', e);
      }
    }
    const initialId = 'session-1';
    return [
      {
        id: initialId,
        title: "New Conversation",
        createdAt: Date.now(),
        category: "TODAY",
        messages: [
          {
            id: '1',
            sender: 'ai',
            text: `Hey ${userName} bhai! 👋 Kya haal-chaal? Bata aaj kya kaam karna hai ya kya plan hai?\n\nChahe coding ho, project building, problem solving, ya bas normal baatein — bol bhai, main poori tarah ready hoon! 🚀🔥`
          }
        ]
      }
    ];
  });

  const [activeSessionId, setActiveSessionId] = useState(() => sessions[0]?.id || 'session-1');
  const [isThinking, setIsThinking] = useState(false);
  const [activePrompt, setActivePrompt] = useState('');
  const [hasUnreadResponse, setHasUnreadResponse] = useState(false);
  const [lastFinishedPrompt, setLastFinishedPrompt] = useState('');

  // Persist sessions
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
    } catch (e) {
      console.error('Error saving sessions:', e);
    }
  }, [sessions]);

  const currentPathRef = useRef(currentPath);
  useEffect(() => {
    currentPathRef.current = currentPath;
  }, [currentPath]);

  const sessionsRef = useRef(sessions);
  useEffect(() => {
    sessionsRef.current = sessions;
  }, [sessions]);

  // When user enters /ai-tutor, clear unread flag
  useEffect(() => {
    if (currentPath === '/ai-tutor') {
      setHasUnreadResponse(false);
    }
  }, [currentPath]);

  const executeSend = useCallback(async (messageToSend, customSessionId = null) => {
    const currentInput = messageToSend.trim();
    if (!currentInput || isThinking) return;

    const targetSessionId = customSessionId || activeSessionId;
    const allSessions = sessionsRef.current;
    const currentSession = allSessions.find(s => s.id === targetSessionId) || allSessions[0];

    const userMsg = {
      id: Date.now().toString(),
      sender: 'user',
      text: currentInput
    };

    const isFirstUserMessage = (currentSession?.messages || []).filter(m => m.sender === 'user').length === 0;
    const newTitle = isFirstUserMessage && (currentSession?.title === 'New Conversation' || !currentSession?.title)
      ? generateTitleFromPrompt(currentInput)
      : currentSession?.title || 'New Conversation';

    const updatedMessages = [...(currentSession?.messages || []), userMsg];

    // Immediately save user message to session
    setSessions(prev => {
      const updated = prev.map(s => {
        if (s.id === targetSessionId) {
          return {
            ...s,
            title: newTitle,
            messages: updatedMessages
          };
        }
        return s;
      });
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });

    setIsThinking(true);
    setActivePrompt(currentInput);

    try {
      const smartReply = await generateSmartTutorResponse(
        currentInput,
        userName,
        updatedMessages
      );

      const aiMsgId = (Date.now() + 1).toString();
      const aiMsg = {
        id: aiMsgId,
        sender: 'ai',
        text: smartReply,
        isStreaming: false
      };

      setSessions(prev => {
        const updated = prev.map(s => {
          if (s.id === targetSessionId) {
            return {
              ...s,
              messages: [...s.messages, aiMsg]
            };
          }
          return s;
        });
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        } catch (e) {}
        return updated;
      });

      setIsThinking(false);
      setLastFinishedPrompt(currentInput);

      // If user is currently on another tab (e.g. /coding, /dashboard), trigger background notification!
      if (currentPathRef.current !== '/ai-tutor') {
        setHasUnreadResponse(true);
      }
    } catch (err) {
      console.error('[AITutorProvider] Error generating response in background:', err);
      setIsThinking(false);
      const errMsg = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: 'I ran into a temporary hiccup processing that in background. Please try asking again!',
        isStreaming: false
      };
      setSessions(prev => {
        const updated = prev.map(s => {
          if (s.id === targetSessionId) {
            return { ...s, messages: [...s.messages, errMsg] };
          }
          return s;
        });
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        } catch (e) {}
        return updated;
      });
    }
  }, [activeSessionId, isThinking, userName]);

  const handleNewChat = useCallback(() => {
    const newSession = {
      id: 'session-' + Date.now(),
      title: "New Conversation",
      createdAt: Date.now(),
      category: "TODAY",
      messages: [
        {
          id: '1',
          sender: 'ai',
          text: `Hey ${userName}! 👋 What would you like to explore or solve in this new session?`
        }
      ]
    };
    setSessions(prev => [newSession, ...prev]);
    setActiveSessionId(newSession.id);
  }, [userName]);

  const handleDeleteSession = useCallback((sessionId, e) => {
    if (e) e.stopPropagation();
    if (sessions.length <= 1) {
      handleNewChat();
      return;
    }
    const remaining = sessions.filter(s => s.id !== sessionId);
    setSessions(remaining);
    if (activeSessionId === sessionId) {
      setActiveSessionId(remaining[0]?.id || 'session-1');
    }
  }, [sessions, activeSessionId, handleNewChat]);

  const handleRenameSession = useCallback((sessionId, newTitle) => {
    if (newTitle && newTitle.trim()) {
      setSessions(prev => prev.map(s => s.id === sessionId ? { ...s, title: newTitle.trim() } : s));
    }
  }, []);

  const clearUnread = useCallback(() => {
    setHasUnreadResponse(false);
  }, []);

  return (
    <AITutorContext.Provider
      value={{
        sessions,
        setSessions,
        activeSessionId,
        setActiveSessionId,
        currentSession: sessions.find(s => s.id === activeSessionId) || sessions[0],
        isThinking,
        activePrompt,
        hasUnreadResponse,
        lastFinishedPrompt,
        clearUnread,
        executeSend,
        handleNewChat,
        handleDeleteSession,
        handleRenameSession
      }}
    >
      {children}
    </AITutorContext.Provider>
  );
};

export const useAITutor = () => {
  const ctx = useContext(AITutorContext);
  if (!ctx) {
    throw new Error('useAITutor must be used within an AITutorProvider');
  }
  return ctx;
};

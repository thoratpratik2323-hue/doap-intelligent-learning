import React, { useState, useEffect, useRef } from 'react';
import { 
  Plus, 
  Search, 
  Send, 
  Sparkles, 
  ChevronLeft, 
  ChevronRight, 
  Mic, 
  AlertCircle, 
  X, 
  Key, 
  Zap, 
  Check, 
  Copy,
  Volume2,
  RotateCcw,
  Trash2,
  Edit2,
  Download,
  PanelLeftClose,
  PanelLeftOpen,
  MessageSquare,
  PhoneCall
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import { generateSmartTutorResponse } from '../services/aiTutorEngine';
import { MarkdownRenderer } from '../components/MarkdownRenderer';
import { VoiceAICallModal } from '../components/Interview/VoiceAICallModal';
import { speakElevenLabs } from '../services/elevenLabsService';

const STORAGE_KEY = 'doap_ai_chat_sessions';

const generateTitleFromPrompt = (prompt) => {
  let clean = prompt.replace(/^(\/image|\/code|\/explain|\/interview)\s+/i, '').trim();
  if (clean.length > 26) {
    clean = clean.slice(0, 26) + '...';
  }
  if (prompt.startsWith('/image')) return `🎨 ${clean}`;
  if (prompt.startsWith('/code')) return `💻 ${clean}`;
  if (prompt.startsWith('/explain')) return `💡 ${clean}`;
  if (prompt.startsWith('/interview')) return `🎯 ${clean}`;
  return clean.charAt(0).toUpperCase() + clean.slice(1);
};

export const AITutor = () => {
  const { isDarkMode, activeAccentHex } = useTheme();
  const { profile } = useAuth();
  const accentHex = activeAccentHex || 'var(--doap-accent, #ffffff)';
  const userName = profile?.name ? profile.name.split(' ')[0] : 'there';

  // Initialize persistent chat sessions from localStorage
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
            text: `Hey ${userName}! 👋 I'm **DOAP AI Tutor**, your universal engineering mentor and AI assistant.\n\nAsk me anything about **coding**, **algorithms (DSA)**, **system design**, **math**, or generate images with \`/image <prompt>\`!\n\nType \`/help\` to view all commands.`
          }
        ]
      }
    ];
  });

  const [activeSessionId, setActiveSessionId] = useState(() => sessions[0]?.id || 'session-1');
  const [searchQuery, setSearchQuery] = useState('');
  const [inputText, setInputText] = useState('');
  const [baseInputText, setBaseInputText] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [editingSessionId, setEditingSessionId] = useState(null);
  const [editTitleInput, setEditTitleInput] = useState('');
  const [copiedMsgId, setCopiedMsgId] = useState(null);
  const [speakingMsgId, setSpeakingMsgId] = useState(null);

  const chipsScrollRef = useRef(null);
  const messagesEndRef = useRef(null);
  const activeStreamRef = useRef(null);

  // Settings / API Key Modal State
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [geminiKeyInput, setGeminiKeyInput] = useState(
    (typeof localStorage !== 'undefined' ? localStorage.getItem('doap_gemini_key') : '') || ''
  );
  const [keySaved, setKeySaved] = useState(false);
  const [isVoiceCallOpen, setIsVoiceCallOpen] = useState(false);

  const {
    isListening,
    transcript,
    stopListening,
    toggleListening
  } = useSpeechRecognition();

  // Current active session and messages
  const currentSession = sessions.find(s => s.id === activeSessionId) || sessions[0];
  const messages = currentSession?.messages || [];
  const [isThinking, setIsThinking] = useState(false);

  // Sync sessions to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
    } catch (e) {
      console.error('Error saving sessions:', e);
    }
  }, [sessions]);

  useEffect(() => {
    if (transcript) {
      const combined = baseInputText ? `${baseInputText} ${transcript}` : transcript;
      setInputText(combined);
    }
  }, [transcript, baseInputText]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isThinking]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleMicClick = () => {
    if (!isListening) {
      setBaseInputText(inputText);
    } else {
      stopListening();
    }
    toggleListening();
  };

  const streamResponseText = (fullText, sessionId) => {
    if (activeStreamRef.current) {
      clearInterval(activeStreamRef.current);
    }

    const aiMsgId = (Date.now() + 1).toString();
    setIsThinking(false);

    // Append blank streaming message
    setSessions(prev => prev.map(s => {
      if (s.id === sessionId) {
        return {
          ...s,
          messages: [
            ...s.messages,
            { id: aiMsgId, sender: 'ai', text: '', isStreaming: true }
          ]
        };
      }
      return s;
    }));

    let currentIndex = 0;
    const speed = 12; // ms per tick
    const charsPerTick = 4;

    activeStreamRef.current = setInterval(() => {
      currentIndex += charsPerTick;
      const currentChunk = fullText.slice(0, currentIndex);
      const isDone = currentIndex >= fullText.length;

      setSessions(prev => prev.map(s => {
        if (s.id === sessionId) {
          return {
            ...s,
            messages: s.messages.map(m => m.id === aiMsgId ? { ...m, text: currentChunk, isStreaming: !isDone } : m)
          };
        }
        return s;
      }));

      if (isDone) {
        clearInterval(activeStreamRef.current);
        activeStreamRef.current = null;
      }
    }, speed);
  };

  const executeSend = async (messageToSend) => {
    const currentInput = messageToSend.trim();
    if (!currentInput || isThinking) return;

    if (isListening) stopListening();

    if (activeStreamRef.current) {
      clearInterval(activeStreamRef.current);
      activeStreamRef.current = null;
    }

    const userMsg = {
      id: Date.now().toString(),
      sender: 'user',
      text: currentInput
    };

    const targetSessionId = activeSessionId;
    const isFirstUserMessage = (currentSession?.messages || []).filter(m => m.sender === 'user').length === 0;
    const newTitle = isFirstUserMessage && (currentSession?.title === 'New Conversation' || !currentSession?.title)
      ? generateTitleFromPrompt(currentInput)
      : currentSession?.title || 'New Conversation';

    const updatedMessages = [...(currentSession?.messages || []), userMsg];

    setSessions(prev => prev.map(s => {
      if (s.id === targetSessionId) {
        return {
          ...s,
          title: newTitle,
          messages: updatedMessages
        };
      }
      return s;
    }));

    setInputText('');
    setBaseInputText('');
    setIsThinking(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      const smartReply = await generateSmartTutorResponse(
        currentInput, 
        userName,
        updatedMessages
      );
      streamResponseText(smartReply, targetSessionId);
    } catch (err) {
      console.error('[AITutor] Error generating response:', err);
      setIsThinking(false);
      setSessions(prev => prev.map(s => {
        if (s.id === targetSessionId) {
          return {
            ...s,
            messages: [
              ...s.messages,
              {
                id: (Date.now() + 1).toString(),
                sender: 'ai',
                text: `I ran into a temporary hiccup processing that. Please try asking again!`,
                isStreaming: false
              }
            ]
          };
        }
        return s;
      }));
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    executeSend(inputText);
  };

  // Create New Chat Session
  const handleNewChat = () => {
    if (isListening) stopListening();
    if (activeStreamRef.current) {
      clearInterval(activeStreamRef.current);
      activeStreamRef.current = null;
    }
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
    setSessions([newSession, ...sessions]);
    setActiveSessionId(newSession.id);
  };

  // Delete Chat Session
  const handleDeleteSession = (sessionId, e) => {
    e.stopPropagation();
    if (sessions.length <= 1) {
      handleNewChat();
      return;
    }
    const remaining = sessions.filter(s => s.id !== sessionId);
    setSessions(remaining);
    if (activeSessionId === sessionId) {
      setActiveSessionId(remaining[0].id);
    }
  };

  // Rename Session Title
  const handleStartRename = (session, e) => {
    e.stopPropagation();
    setEditingSessionId(session.id);
    setEditTitleInput(session.title);
  };

  const handleSaveRename = (sessionId) => {
    if (editTitleInput.trim()) {
      setSessions(prev => prev.map(s => s.id === sessionId ? { ...s, title: editTitleInput.trim() } : s));
    }
    setEditingSessionId(null);
  };

  // Message Actions (Copy / Read Aloud / Regenerate)
  const handleCopyMessage = (text, msgId) => {
    navigator.clipboard.writeText(text);
    setCopiedMsgId(msgId);
    setTimeout(() => setCopiedMsgId(null), 2000);
  };

  const handleSpeakMessage = async (text, msgId) => {
    if (speakingMsgId === msgId) {
      setSpeakingMsgId(null);
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      return;
    }
    setSpeakingMsgId(msgId);
    try {
      const cleanText = text.replace(/[*_#`[\]()!]/g, '').replace(/https?:\/\/\S+/g, '');
      await speakElevenLabs(cleanText);
    } catch (e) {
      console.warn('Speech error:', e);
    } finally {
      setSpeakingMsgId(null);
    }
  };

  const handleRegenerate = (msgIndex) => {
    const lastUserMsg = [...messages.slice(0, msgIndex)].reverse().find(m => m.sender === 'user');
    if (lastUserMsg) {
      executeSend(lastUserMsg.text);
    }
  };

  const quickPrompts = [
    "🎨 /image a futuristic neon cybernetic workstation 8k",
    "💻 /code Two Sum with optimal HashMap in Python",
    "💡 /explain Quantum Computing simply with analogies",
    "🎯 /interview Google Senior Software Engineer",
    "😄 /joke",
    "🚀 /help"
  ];

  const filteredSessions = sessions.filter(s => 
    s.title && s.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div 
      className="w-full h-full min-h-0 flex-1 flex rounded-none md:rounded-[28px] overflow-hidden border-0 md:border shadow-2xl transition-all select-none"
      style={{
        backgroundColor: 'var(--doap-surface, #111111)',
        borderColor: 'var(--doap-border, #262626)'
      }}
    >
      {/* Left Conversation Drawer / Sidebar */}
      {isSidebarOpen && (
        <div 
          className="w-68 sm:w-76 border-r flex flex-col justify-between shrink-0 animate-fade-in z-20"
          style={{
            backgroundColor: 'var(--doap-surface-sec, #0c0c0c)',
            borderColor: 'var(--doap-border, #262626)'
          }}
        >
          <div className="p-3.5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs tracking-tight flex items-center gap-1.5" style={{ color: 'var(--doap-text-prim)' }}>
                <Sparkles size={14} style={{ color: accentHex }} />
                <span>Chat History</span>
              </span>
              <div className="flex items-center gap-1">
                <button 
                  onClick={handleNewChat}
                  className="px-2 py-1 rounded-lg border text-xs font-semibold flex items-center gap-1 hover:opacity-80 transition-opacity cursor-pointer"
                  style={{ borderColor: 'var(--doap-border)', color: 'var(--doap-text-prim)', backgroundColor: 'var(--doap-surface)' }}
                  title="Start New Chat"
                >
                  <Plus size={13} />
                  <span>New</span>
                </button>
                <button 
                  onClick={() => setIsSidebarOpen(false)}
                  className="w-6 h-6 rounded-lg border flex items-center justify-center transition-colors cursor-pointer hover:opacity-80"
                  style={{ borderColor: 'var(--doap-border)', color: 'var(--doap-text-sec)' }}
                  title="Hide Sidebar"
                >
                  <X size={13} />
                </button>
              </div>
            </div>

            <div className="relative">
              <Search size={12} className="absolute left-2.5 top-2.5 text-neutral-500" />
              <input 
                type="text" 
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-7 pr-2.5 py-1.5 rounded-xl text-xs font-medium focus:outline-none transition-colors border"
                style={{
                  backgroundColor: 'var(--doap-surface)',
                  borderColor: 'var(--doap-border)',
                  color: 'var(--doap-text-prim)'
                }}
              />
            </div>
          </div>

          {/* Sessions List */}
          <div className="flex-1 overflow-y-auto px-2.5 py-1 space-y-1 scrollbar-none">
            {filteredSessions.map((session) => (
              <div
                key={session.id}
                onClick={() => {
                  setActiveSessionId(session.id);
                  if (isListening) stopListening();
                }}
                className="group relative flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-all cursor-pointer border"
                style={{
                  backgroundColor: activeSessionId === session.id ? 'var(--doap-accent)' : 'transparent',
                  borderColor: activeSessionId === session.id ? 'var(--doap-accent)' : 'transparent',
                  color: activeSessionId === session.id ? '#000000' : 'var(--doap-text-sec)'
                }}
              >
                {editingSessionId === session.id ? (
                  <input
                    type="text"
                    value={editTitleInput}
                    onChange={(e) => setEditTitleInput(e.target.value)}
                    onBlur={() => handleSaveRename(session.id)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSaveRename(session.id)}
                    autoFocus
                    className="w-full bg-black/20 text-xs px-1.5 py-0.5 rounded outline-none"
                  />
                ) : (
                  <span className="truncate flex-1 font-medium pr-1">
                    {session.title || "New Conversation"}
                  </span>
                )}

                {/* Session Action Buttons */}
                <div className={`flex items-center gap-1 shrink-0 ${activeSessionId === session.id ? 'opacity-90' : 'opacity-0 group-hover:opacity-100 transition-opacity'}`}>
                  <button
                    onClick={(e) => handleStartRename(session, e)}
                    className="p-1 hover:scale-110 transition-transform cursor-pointer"
                    title="Rename"
                  >
                    <Edit2 size={11} />
                  </button>
                  <button
                    onClick={(e) => handleDeleteSession(session.id, e)}
                    className="p-1 hover:scale-110 hover:text-red-400 transition-transform cursor-pointer"
                    title="Delete Chat"
                  >
                    <Trash2 size={11} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Drawer Footer */}
          <div className="p-3 border-t flex items-center justify-between" style={{ borderColor: 'var(--doap-border)' }}>
            <button
              onClick={() => {
                if (confirm('Clear all conversation history?')) {
                  localStorage.removeItem(STORAGE_KEY);
                  handleNewChat();
                }
              }}
              className="text-[11px] text-neutral-500 hover:text-red-400 flex items-center gap-1 cursor-pointer transition-colors"
            >
              <Trash2 size={12} />
              <span>Clear History</span>
            </button>
            <span className="text-[10px] font-mono text-neutral-500">
              {sessions.length} Chats
            </span>
          </div>
        </div>
      )}

      {/* Main Chat Canvas */}
      <div className="flex-1 flex flex-col justify-between relative overflow-hidden min-w-0">
        {/* Top Header Bar */}
        <div 
          className="p-3 sm:p-3.5 flex items-center justify-between border-b shrink-0"
          style={{ borderColor: 'var(--doap-border)' }}
        >
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-1.5 rounded-xl border flex items-center justify-center transition-colors cursor-pointer hover:opacity-80"
              style={{ borderColor: 'var(--doap-border)', color: 'var(--doap-text-sec)' }}
              title={isSidebarOpen ? "Collapse history" : "Open chat history"}
            >
              {isSidebarOpen ? <PanelLeftClose size={15} /> : <PanelLeftOpen size={15} />}
            </button>

            <span className="font-bold text-xs sm:text-sm tracking-tight" style={{ color: 'var(--doap-text-prim)' }}>
              AI Tutor
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono border border-emerald-500/30 text-emerald-400 bg-emerald-500/10">
              ⚡ 120B Super-Brain
            </span>
            <span className="hidden md:inline px-2 py-0.5 rounded-full text-[10px] font-mono border border-purple-500/30 text-purple-400 bg-purple-500/10">
              🎨 Flux AI
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleNewChat}
              className="px-2.5 py-1 rounded-xl border text-xs font-semibold flex items-center gap-1.5 hover:opacity-80 transition-opacity cursor-pointer"
              style={{ borderColor: 'var(--doap-border)', backgroundColor: 'var(--doap-surface-sec)', color: 'var(--doap-text-prim)' }}
              title="Start New Chat"
            >
              <Plus size={12} />
              <span className="hidden sm:inline">New Chat</span>
            </button>

            <button
              onClick={() => setShowKeyModal(true)}
              className="px-2.5 py-1 rounded-xl border text-[11px] font-mono flex items-center gap-1.5 hover:opacity-80 transition-opacity cursor-pointer bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
            >
              <Zap size={11} className="text-emerald-400 animate-pulse" />
              <span className="hidden sm:inline">Groq 120B Active</span>
              <span className="sm:hidden">120B</span>
            </button>
          </div>
        </div>

        {/* Messages List Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 scrollbar-thin min-w-0">
          {messages.map((msg, idx) => (
            <div 
              key={msg.id || idx} 
              className={`flex items-start gap-3.5 max-w-5xl w-full mx-auto ${
                msg.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.sender === 'user' ? (
                <>
                  <div 
                    className="px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-2xl rounded-tr-xs text-xs sm:text-sm leading-relaxed border shadow-sm max-w-[85%] sm:max-w-[65%]"
                    style={{
                      backgroundColor: 'var(--doap-surface-sec, #1e1e1e)',
                      borderColor: 'var(--doap-border, #333333)',
                      color: 'var(--doap-text-prim, #ffffff)'
                    }}
                  >
                    <span className="whitespace-pre-wrap break-words font-medium">{msg.text}</span>
                  </div>

                  <div 
                    className="w-7 h-7 rounded-xl font-bold text-[10px] sm:text-[11px] flex items-center justify-center shrink-0 border shadow-xs"
                    style={{ backgroundColor: 'var(--doap-surface-sec)', borderColor: 'var(--doap-border)', color: 'var(--doap-text-prim)' }}
                  >
                    {profile?.avatar || 'PT'}
                  </div>
                </>
              ) : (
                <>
                  <div 
                    className="w-8 h-8 rounded-2xl flex items-center justify-center shrink-0 shadow-md"
                    style={{ backgroundColor: accentHex, color: 'var(--doap-bg, #000)' }}
                  >
                    <Sparkles size={16} />
                  </div>

                  <div className="flex-1 max-w-full min-w-0 space-y-2 group">
                    <div 
                      className="p-4 sm:p-6 rounded-3xl rounded-tl-xs text-sm sm:text-[15px] leading-relaxed border doap-card shadow-sm"
                      style={{
                        backgroundColor: isDarkMode ? '#111111' : '#ffffff',
                        borderColor: 'var(--doap-border, #262626)',
                        color: 'var(--doap-text-prim)'
                      }}
                    >
                      <div className="relative">
                        <MarkdownRenderer content={msg.text} isDarkMode={isDarkMode} />
                        {msg.isStreaming && (
                          <span className="inline-block w-2 h-4 ml-1 bg-emerald-400 animate-pulse rounded-xs align-middle" />
                        )}
                      </div>
                    </div>

                    {/* AI Message Action Toolbar */}
                    {!msg.isStreaming && (
                      <div className="flex items-center gap-2 pl-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleCopyMessage(msg.text, msg.id)}
                          className="px-2 py-1 rounded-lg border text-xs flex items-center gap-1 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                          style={{ borderColor: 'var(--doap-border)', backgroundColor: 'var(--doap-surface-sec)' }}
                          title="Copy message"
                        >
                          {copiedMsgId === msg.id ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                          <span className="text-[11px]">{copiedMsgId === msg.id ? 'Copied' : 'Copy'}</span>
                        </button>

                        <button
                          onClick={() => handleSpeakMessage(msg.text, msg.id)}
                          className={`px-2 py-1 rounded-lg border text-xs flex items-center gap-1 transition-colors cursor-pointer ${speakingMsgId === msg.id ? 'text-purple-400 border-purple-500' : 'text-neutral-400 hover:text-white'}`}
                          style={{ borderColor: 'var(--doap-border)', backgroundColor: 'var(--doap-surface-sec)' }}
                          title="Read aloud"
                        >
                          <Volume2 size={12} className={speakingMsgId === msg.id ? 'animate-pulse' : ''} />
                          <span className="text-[11px]">{speakingMsgId === msg.id ? 'Playing...' : 'Voice'}</span>
                        </button>

                        <button
                          onClick={() => handleRegenerate(idx)}
                          className="px-2 py-1 rounded-lg border text-xs flex items-center gap-1 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                          style={{ borderColor: 'var(--doap-border)', backgroundColor: 'var(--doap-surface-sec)' }}
                          title="Regenerate"
                        >
                          <RotateCcw size={12} />
                          <span className="text-[11px]">Retry</span>
                        </button>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          ))}

          {isThinking && (
            <div className="flex items-start gap-3.5 max-w-5xl w-full mx-auto animate-fade-in">
              <div 
                className="w-8 h-8 rounded-2xl flex items-center justify-center shrink-0 shadow-md"
                style={{ backgroundColor: accentHex, color: 'var(--doap-bg, #000)' }}
              >
                <Sparkles size={16} />
              </div>
              <div 
                className="p-4 rounded-3xl rounded-tl-xs border text-xs flex items-center gap-2"
                style={{
                  backgroundColor: 'var(--doap-surface-sec, #161616)',
                  borderColor: 'var(--doap-border)',
                  color: 'var(--doap-text-sec)'
                }}
              >
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="font-mono">AI Tutor 120B is thinking...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Bottom Input Area & Quick Chips */}
        <div 
          className="p-3 sm:p-4 border-t shrink-0 space-y-2.5 backdrop-blur-md"
          style={{ 
            backgroundColor: 'var(--doap-surface, #111111)',
            borderColor: 'var(--doap-border)' 
          }}
        >
          {/* Quick Prompts Chips Scroll */}
          <div className="relative flex items-center gap-1 max-w-4xl mx-auto">
            <button
              type="button"
              onClick={() => {
                if (chipsScrollRef.current) {
                  chipsScrollRef.current.scrollBy({ left: -200, behavior: 'smooth' });
                }
              }}
              className="w-6 h-6 rounded-full border flex items-center justify-center shrink-0 transition-all hover:scale-110 cursor-pointer shadow-xs z-10"
              style={{ backgroundColor: 'var(--doap-surface-sec)', borderColor: 'var(--doap-border)', color: 'var(--doap-text-prim)' }}
              title="Scroll left"
            >
              <ChevronLeft size={13} />
            </button>

            <div 
              ref={chipsScrollRef}
              className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1 px-1 scroll-smooth"
            >
              {quickPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => executeSend(prompt)}
                  className="px-3 py-1.5 rounded-full text-xs font-medium shrink-0 border transition-all hover:scale-105 cursor-pointer shadow-xs"
                  style={{
                    backgroundColor: 'var(--doap-surface-sec)',
                    borderColor: 'var(--doap-border)',
                    color: 'var(--doap-text-prim)'
                  }}
                >
                  {prompt}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => {
                if (chipsScrollRef.current) {
                  chipsScrollRef.current.scrollBy({ left: 200, behavior: 'smooth' });
                }
              }}
              className="w-6 h-6 rounded-full border flex items-center justify-center shrink-0 transition-all hover:scale-110 cursor-pointer shadow-xs z-10"
              style={{ backgroundColor: 'var(--doap-surface-sec)', borderColor: 'var(--doap-border)', color: 'var(--doap-text-prim)' }}
              title="Scroll right"
            >
              <ChevronRight size={13} />
            </button>
          </div>

          {/* Chat Form */}
          <form onSubmit={handleSendMessage} className="relative max-w-4xl mx-auto flex items-center gap-2">
            <div className="relative flex-1">
              <input 
                type="text" 
                placeholder={isListening ? "Listening to your voice..." : "Ask AI Tutor anything (coding, algorithms, GK, math, or /image <prompt>)..."}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="w-full pl-4 pr-10 py-2.5 sm:py-3 rounded-2xl border text-xs sm:text-sm focus:outline-none transition-all shadow-inner"
                style={{
                  backgroundColor: 'var(--doap-surface-sec, #0c0c0c)',
                  borderColor: 'var(--doap-border)',
                  color: 'var(--doap-text-prim)'
                }}
              />

              <button
                type="button"
                onClick={handleMicClick}
                className={`
                  absolute right-2.5 top-2 w-7 h-7 rounded-xl flex items-center justify-center transition-all cursor-pointer
                  ${isListening 
                    ? 'bg-white text-black' 
                    : 'text-neutral-400 hover:text-white'
                  }
                `}
                title={isListening ? "Stop listening" : "Speak using microphone"}
              >
                <Mic size={14} />
              </button>
            </div>

            <button 
              type="submit"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl flex items-center justify-center transition-all shadow-md cursor-pointer hover-glide shrink-0"
              style={{ backgroundColor: accentHex, color: 'var(--doap-bg, #000000)' }}
              title="Send Message"
            >
              <Send size={14} />
            </button>
          </form>
        </div>
      </div>

      {/* Voice Call Floating Modal */}
      {isVoiceCallOpen && (
        <VoiceAICallModal
          isOpen={isVoiceCallOpen}
          onClose={() => setIsVoiceCallOpen(false)}
          onSaveCallToChat={(logs) => {
            if (!logs || logs.length === 0) return;
            const newItems = logs.map((log, idx) => ({
              id: `voice-${Date.now()}-${idx}`,
              sender: log.role === 'user' ? 'user' : 'ai',
              text: log.text
            }));
            setSessions(prev => prev.map(s => s.id === activeSessionId ? { ...s, messages: [...s.messages, ...newItems] } : s));
          }}
          userName={userName}
        />
      )}

      {/* Key Modal */}
      {showKeyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 animate-fade-in">
          <div 
            className="w-full max-w-md rounded-3xl border p-6 space-y-4 shadow-2xl relative"
            style={{
              backgroundColor: 'var(--doap-surface, #111111)',
              borderColor: 'var(--doap-border, #262626)'
            }}
          >
            <button 
              onClick={() => setShowKeyModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-xl border hover:opacity-80 transition-opacity cursor-pointer"
              style={{ borderColor: 'var(--doap-border)', color: 'var(--doap-text-sec)' }}
            >
              <X size={15} />
            </button>

            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Zap size={18} />
              </div>
              <div>
                <h3 className="font-bold text-sm" style={{ color: 'var(--doap-text-prim)' }}>
                  AI Tutor 120B Super-Brain Active
                </h3>
                <p className="text-xs" style={{ color: 'var(--doap-text-sec)' }}>
                  Powered by Groq LPU (GPT-OSS 120B) & Flux Image AI
                </p>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 text-xs text-emerald-400">
              ⚡ <strong>120 Billion Parameters Active:</strong> Sub-150ms instant universal reasoning, coding tutor, and live image generation.
            </div>

            <button
              onClick={() => setShowKeyModal(false)}
              className="w-full py-2.5 rounded-xl text-xs font-bold transition-opacity cursor-pointer"
              style={{ backgroundColor: accentHex, color: '#000000' }}
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

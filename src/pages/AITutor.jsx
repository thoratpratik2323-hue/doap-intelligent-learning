import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { 
  Plus, 
  Search, 
  Send, 
  Sparkles, 
  ChevronLeft, 
  ChevronRight, 
  ChevronDown, 
  Mic, 
  AlertCircle, 
  X, 
  Key, 
  Zap, 
  Check, 
  Copy,
  Volume2,
  VolumeX,
  RotateCcw,
  Trash2,
  Edit2,
  Download,
  PanelLeftClose,
  PanelLeftOpen,
  MessageSquare,
  PhoneCall,
  Brain
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useAITutor } from '../context/AITutorContext';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import { MarkdownRenderer } from '../components/MarkdownRenderer';
import { VoiceAICallModal } from '../components/Interview/VoiceAICallModal';
import { RlmExecutionTree } from '../components/AITutor/RlmExecutionTree';
import { 
  speakElevenLabs, 
  stopElevenLabsAudio, 
  unlockAudioContext, 
  fallbackBrowserSpeech, 
  humanizeTextForSpeech 
} from '../services/elevenLabsService';

const STORAGE_KEY = 'doap_ai_chat_sessions';

const QUICK_PROMPTS = [
  "⚡ /rlm Optimal LRU Cache implementation with tests",
  "🧬 /refine Focus on graph cycles and recursion depth",
  "🛠️ /harness",
  "🎨 /image a futuristic neon cybernetic workstation 8k",
  "📝 /quiz Python",
  "🧮 /quiz DSA",
  "💻 /code Two Sum with optimal HashMap in Python",
  "💡 /explain Kadane's Algorithm for max subarray sum",
  "🎯 /interview Mock FAANG question on graph cycle detection",
  "😄 /joke"
];


const parseMessageWithRlm = (rawText) => {
  if (!rawText || typeof rawText !== 'string') return { rlmTrace: null, text: rawText || '' };
  const match = rawText.match(/<rlm_trace>([\s\S]*?)<\/rlm_trace>/i);
  if (match) {
    try {
      const trace = JSON.parse(match[1].trim());
      const cleanText = rawText.replace(/<rlm_trace>[\s\S]*?<\/rlm_trace>/gi, '').trim();
      return { rlmTrace: trace, text: cleanText };
    } catch (e) {
      console.warn('Failed to parse rlm_trace:', e);
    }
  }
  return { rlmTrace: null, text: rawText };
};

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

export const AITutor = () => {
  const { isDarkMode, activeAccentHex, isSidebarHidden, setIsSidebarHidden } = useTheme();
  const { profile } = useAuth();
  const accentHex = activeAccentHex || 'var(--doap-accent, #ffffff)';
  const userName = profile?.name ? profile.name.split(' ')[0] : 'there';

  // Consume persistent chat sessions and background execution from global AITutorContext
  const {
    sessions,
    setSessions,
    activeSessionId,
    setActiveSessionId,
    currentSession,
    isThinking,
    executeSend,
    handleNewChat,
    handleDeleteSession,
    handleRenameSession
  } = useAITutor();

  const [searchQuery, setSearchQuery] = useState('');
  const [inputText, setInputText] = useState('');
  const [baseInputText, setBaseInputText] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [editingSessionId, setEditingSessionId] = useState(null);
  const [editTitleInput, setEditTitleInput] = useState('');
  const [copiedMsgId, setCopiedMsgId] = useState(null);
  const [speakingMsgId, setSpeakingMsgId] = useState(null);
  const [showChatSwitcher, setShowChatSwitcher] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const chatScrollRef = useRef(null);

  const chipsScrollRef = useRef(null);
  const messagesEndRef = useRef(null);

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

  // Current active session messages
  const messages = currentSession?.messages || [];
  // Keyboard shortcuts (Ctrl+N for New Chat, Ctrl+K for Switcher)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'n') {
        e.preventDefault();
        onNewChatClick();
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setShowChatSwitcher(prev => !prev);
      } else if (e.key === 'Escape' && showChatSwitcher) {
        setShowChatSwitcher(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showChatSwitcher]);

  const handleMessagesScroll = (e) => {
    if (!e.currentTarget) return;
    const { scrollTop } = e.currentTarget;
    setShowScrollTop(scrollTop > 220);
  };


  // Cleanup speech/audio on unmount
  useEffect(() => {
    return () => {
      stopListening();
      stopElevenLabsAudio();
    };
  }, []);

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
      toggleListening();
    } else {
      stopListening();
    }
  };

  const handleSendMessage = (e) => {
    e?.preventDefault();
    const currentInput = inputText.trim();
    if (!currentInput || isThinking) return;

    if (isListening) stopListening();
    setInputText('');
    setBaseInputText('');
    executeSend(currentInput);
  };

  // Auto-send incoming prompt when navigated from Company Prep or external action
  useEffect(() => {
    try {
      const pendingPrompt = sessionStorage.getItem('doap_ai_initial_prompt');
      if (pendingPrompt && pendingPrompt.trim()) {
        sessionStorage.removeItem('doap_ai_initial_prompt');
        setTimeout(() => {
          executeSend(pendingPrompt.trim());
        }, 200);
      }
    } catch (e) {
      console.warn('[AITutor] Error auto-executing incoming prompt:', e);
    }
  }, []);

  const onNewChatClick = () => {
    if (isListening) stopListening();
    stopElevenLabsAudio();
    handleNewChat();
  };

  // Rename Session Title
  const handleStartRename = (session, e) => {
    e.stopPropagation();
    setEditingSessionId(session.id);
    setEditTitleInput(session.title);
  };

  const handleSaveRename = (sessionId) => {
    if (editTitleInput.trim()) {
      handleRenameSession(sessionId, editTitleInput.trim());
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
    // If the same message is currently playing, clicking stops it immediately
    if (speakingMsgId === msgId) {
      setSpeakingMsgId(null);
      stopElevenLabsAudio();
      return;
    }

    // Stop any existing playback and mark this message as speaking
    stopElevenLabsAudio();
    setSpeakingMsgId(msgId);
    unlockAudioContext();

    try {
      const cleanText = humanizeTextForSpeech(text);
      if (!cleanText || !cleanText.trim()) {
        setSpeakingMsgId(null);
        return;
      }

      await speakElevenLabs(
        cleanText,
        'doap',
        () => {
          // Finished playback
          setSpeakingMsgId(null);
        },
        (err) => {
          console.warn('[AITutor] Voice playback error, falling back to browser speech:', err);
          fallbackBrowserSpeech(cleanText, () => {
            setSpeakingMsgId(null);
          });
        }
      );
    } catch (e) {
      console.warn('[AITutor] Speech error:', e);
      try {
        const cleanText = humanizeTextForSpeech(text);
        fallbackBrowserSpeech(cleanText, () => {
          setSpeakingMsgId(null);
        });
      } catch (err2) {
        console.error('[AITutor] Fallback speech error:', err2);
        setSpeakingMsgId(null);
      }
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
                id="search-conversations"
                name="searchConversations"
                aria-label="Search conversations"
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
                    id="rename-session"
                    name="renameSession"
                    aria-label="Rename conversation session"
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
                  try {
                    if (typeof localStorage !== 'undefined') {
                      localStorage.removeItem(STORAGE_KEY);
                    }
                  } catch {}
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
          className="p-3 sm:p-3.5 flex items-center justify-between border-b shrink-0 sticky top-0 z-20 backdrop-blur-md"
          style={{ borderColor: 'var(--doap-border)' }}
        >
          <div className="flex items-center gap-2">
            {isSidebarHidden && (
              <button
                onClick={() => setIsSidebarHidden(false)}
                className="hidden md:flex p-1.5 px-2.5 rounded-xl border items-center gap-1.5 transition-all cursor-pointer hover:scale-105 shadow-sm mr-1"
                style={{ borderColor: 'var(--doap-border)', color: 'var(--doap-text-prim)', backgroundColor: 'var(--doap-surface-sec)' }}
                title="Show Main Navigation Sidebar (Ctrl+B)"
              >
                <PanelLeftOpen size={14} className="text-indigo-400" />
                <span className="text-xs font-mono font-semibold">Menu</span>
              </button>
            )}

            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-1.5 rounded-xl border flex items-center justify-center transition-colors cursor-pointer hover:opacity-80"
              style={{ borderColor: 'var(--doap-border)', color: 'var(--doap-text-sec)' }}
              title={isSidebarOpen ? "Collapse history" : "Open chat history"}
            >
              {isSidebarOpen ? <PanelLeftClose size={15} /> : <PanelLeftOpen size={15} />}
            </button>

            <div className="flex items-center gap-2">
              <span className="font-bold text-xs sm:text-sm tracking-tight" style={{ color: 'var(--doap-text-prim)' }}>
                AI Tutor
              </span>
              <span className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-medium">
                <Brain size={11} className="text-indigo-400" />
                <span>Prime RLM & Continual Harness Active</span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleNewChat}
              className="px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 hover:opacity-80 transition-opacity cursor-pointer shadow-xs"
              style={{ borderColor: 'var(--doap-border)', backgroundColor: 'var(--doap-surface-sec)', color: 'var(--doap-text-prim)' }}
              title="Start New Chat"
            >
              <Plus size={13} />
              <span>New Chat</span>
            </button>
          </div>
        </div>

        {/* Messages List Area */}
        <div ref={chatScrollRef} onScroll={handleMessagesScroll} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 scrollbar-thin min-w-0 relative">
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

                  {(() => {
                    const { rlmTrace, text: cleanMsgText } = parseMessageWithRlm(msg.text);
                    return (
                      <div className="flex-1 max-w-full min-w-0 space-y-2 group">
                        <div 
                          className="p-4 sm:p-6 rounded-3xl rounded-tl-xs text-sm sm:text-[15px] leading-relaxed border doap-card shadow-sm"
                          style={{
                            backgroundColor: isDarkMode ? '#111111' : '#ffffff',
                            borderColor: 'var(--doap-border, #262626)',
                            color: 'var(--doap-text-prim)'
                          }}
                        >
                          {rlmTrace && <RlmExecutionTree trace={rlmTrace} isDarkMode={isDarkMode} />}
                          <div className="relative">
                            <MarkdownRenderer content={cleanMsgText} isDarkMode={isDarkMode} />
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
                          className={`px-2 py-1 rounded-lg border text-xs flex items-center gap-1 transition-all cursor-pointer ${
                            speakingMsgId === msg.id 
                              ? 'text-purple-400 border-purple-500 bg-purple-500/10' 
                              : 'text-neutral-400 hover:text-white'
                          }`}
                          style={{ 
                            borderColor: speakingMsgId === msg.id ? undefined : 'var(--doap-border)', 
                            backgroundColor: speakingMsgId === msg.id ? undefined : 'var(--doap-surface-sec)' 
                          }}
                          title={speakingMsgId === msg.id ? "Stop voice playback" : "Read aloud with DOAP Voice"}
                        >
                          {speakingMsgId === msg.id ? (
                            <>
                              <VolumeX size={12} className="text-purple-400" />
                              <span className="text-[11px] text-purple-400 font-medium">Stop</span>
                            </>
                          ) : (
                            <>
                              <Volume2 size={12} />
                              <span className="text-[11px]">Voice</span>
                            </>
                          )}
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
                    );
                  })()}
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
                <span className="font-mono">DOAP is thinking...</span>
              </div>
            </div>
          )}

                    {/* Floating Scroll Helper Buttons */}
          <div className="fixed sm:absolute right-4 bottom-28 z-30 flex flex-col gap-1.5 pointer-events-auto">
            {showScrollTop && (
              <button
                type="button"
                onClick={() => chatScrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' })}
                className="px-2.5 py-1.5 rounded-full border text-xs font-mono flex items-center gap-1 shadow-lg bg-neutral-900/90 hover:bg-neutral-800 text-white border-neutral-700 hover:scale-105 transition-all cursor-pointer backdrop-blur-md"
                title="Scroll to Top"
              >
                <span>↑ Top</span>
              </button>
            )}
            <button
              type="button"
              onClick={() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })}
              className="px-2.5 py-1.5 rounded-full border text-xs font-mono flex items-center gap-1 shadow-lg bg-neutral-900/90 hover:bg-neutral-800 text-white border-neutral-700 hover:scale-105 transition-all cursor-pointer backdrop-blur-md"
              title="Jump to Latest Message"
            >
              <span>↓ Latest</span>
            </button>
          </div>

          <div ref={messagesEndRef} />
        </div>

        {/* Bottom Input Area & Quick Chips */}
        <div 
          className="p-3 sm:p-4 border-t shrink-0 space-y-2.5 backdrop-blur-md relative z-20"
          style={{ 
            backgroundColor: 'var(--doap-surface, #111111)',
            borderColor: 'var(--doap-border)' 
          }}
        >
          {/* Quick Chat Switcher Popover (Opens on click from bottom bar) */}
          {showChatSwitcher && (
            <div 
              className="max-w-4xl mx-auto p-3.5 rounded-2xl border shadow-2xl backdrop-blur-xl animate-fade-in z-30"
              style={{
                backgroundColor: 'var(--doap-surface-sec, #141414)',
                borderColor: 'var(--doap-border, #333333)'
              }}
            >
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-2">
                  <MessageSquare size={14} className="text-indigo-400" />
                  <span className="text-xs font-bold text-white">Switch Conversation ({sessions.length})</span>
                  <span className="text-[10px] font-mono text-neutral-400 bg-neutral-800/80 px-1.5 py-0.5 rounded">Ctrl+K</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => {
                      setShowChatSwitcher(false);
                      onNewChatClick();
                    }}
                    className="px-2 py-1 rounded-lg border text-[10px] font-bold flex items-center gap-1 bg-emerald-500/15 border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/25 transition-all cursor-pointer"
                  >
                    <Plus size={11} />
                    <span>New Chat</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowChatSwitcher(false)}
                    className="p-1 rounded-lg hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                  >
                    <X size={13} />
                  </button>
                </div>
              </div>

              {/* Search filter in popover */}
              <div className="relative mb-2">
                <Search size={12} className="absolute left-2.5 top-2.5 text-neutral-500" />
                <input
                  type="text"
                  placeholder="Search and switch chat..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-full pl-7 pr-3 py-1.5 rounded-xl text-xs bg-black/40 border border-neutral-800 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Sessions Scrollable List */}
              <div className="max-h-56 overflow-y-auto space-y-1 scrollbar-thin pr-1">
                {filteredSessions.map((session) => {
                  const isActive = session.id === activeSessionId;
                  const messageCount = session.messages?.length || 0;
                  return (
                    <div
                      key={session.id}
                      onClick={() => {
                        setActiveSessionId(session.id);
                        setShowChatSwitcher(false);
                      }}
                      className={`group flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-all cursor-pointer border ${
                        isActive 
                          ? 'border-indigo-500/50 bg-indigo-500/15 text-white shadow-xs font-semibold' 
                          : 'border-transparent hover:border-neutral-800 hover:bg-neutral-900/60 text-neutral-300'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate min-w-0">
                        <span className={`w-2 h-2 rounded-full shrink-0 ${isActive ? 'bg-indigo-400' : 'bg-neutral-600'}`} />
                        <span className="truncate font-medium">{session.title || 'New Conversation'}</span>
                        <span className="text-[10px] font-mono text-neutral-500 shrink-0">({messageCount} msgs)</span>
                      </div>

                      <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteSession(session.id, e);
                          }}
                          className="p-1 hover:text-red-400 text-neutral-500 transition-colors cursor-pointer"
                          title="Delete Chat"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quick Chat Switcher Bar (Always accessible at the bottom) */}
          <div className="flex items-center justify-between gap-2 max-w-4xl mx-auto flex-wrap">
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={onNewChatClick}
                className="px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs hover:scale-105 bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20"
                title="Start New Chat (Ctrl+N)"
              >
                <Plus size={13} />
                <span>New Chat</span>
              </button>

              <button
                type="button"
                onClick={() => setShowChatSwitcher(prev => !prev)}
                className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs hover:scale-105 ${
                  showChatSwitcher 
                    ? 'bg-indigo-500 border-indigo-500 text-white' 
                    : 'border-neutral-800 bg-neutral-900/70 text-neutral-200 hover:border-neutral-700'
                }`}
                title="Switch between your conversations (Ctrl+K)"
              >
                <MessageSquare size={13} className={showChatSwitcher ? 'text-white' : 'text-indigo-400'} />
                <span>Switch Chat ({sessions.length})</span>
                <ChevronDown size={12} className={`transition-transform duration-200 ${showChatSwitcher ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {/* Current Active Chat Title Display */}
            <div 
              onClick={() => setShowChatSwitcher(prev => !prev)}
              className="flex items-center gap-1.5 text-[11px] font-mono text-neutral-400 cursor-pointer hover:text-neutral-200 transition-colors px-2 py-1 rounded-lg hover:bg-neutral-900/50"
              title="Click to switch chat"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <span className="truncate max-w-[180px] sm:max-w-[280px]">
                {currentSession?.title || 'Active Conversation'}
              </span>
            </div>
          </div>

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
              {QUICK_PROMPTS.map((item, idx) => {
                const prompt = typeof item === 'string' ? item : item.prompt;
                const label = typeof item === 'string' ? item : item.label;
                return (
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
                    {label}
                  </button>
                );
              })}
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
                id="doap-chat-input"
                name="chatPrompt"
                aria-label="Message DOAP AI"
                placeholder={isListening ? "Listening to your voice..." : "Message DOAP AI (Ask anything from A to Z, coding, math, ideas, or /image <prompt>)..."}
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
      {showKeyModal && typeof document !== 'undefined' && createPortal(
        <div 
          onClick={(e) => { if (e.target === e.currentTarget) setShowKeyModal(false); }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fade-in"
        >
          <div 
            className="w-full max-w-md rounded-3xl border p-6 space-y-4 shadow-2xl relative my-auto"
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
                  DOAP Thinking Super-Brain Active
                </h3>
                <p className="text-xs" style={{ color: 'var(--doap-text-sec)' }}>
                  Powered by DOAP High-Speed LPU & Flux Image AI
                </p>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 text-xs text-emerald-400">
              ⚡ <strong>DOAP Thinking Active:</strong> Sub-150ms instant universal reasoning, coding mentor, and live visual generation.
            </div>

            <button
              onClick={() => setShowKeyModal(false)}
              className="w-full py-2.5 rounded-xl text-xs font-bold transition-opacity cursor-pointer"
              style={{ backgroundColor: accentHex, color: '#000000' }}
            >
              Done
            </button>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

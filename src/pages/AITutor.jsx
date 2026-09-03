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
  Terminal,
  PanelLeftClose,
  PanelLeftOpen,
  MessageSquare,
  Phone,
  PhoneCall
} from 'lucide-react';
import { INITIAL_CHAT_HISTORY } from '../data/mockData';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import { generateSmartTutorResponse } from '../services/aiTutorEngine';
import { MarkdownRenderer } from '../components/MarkdownRenderer';
import { VoiceAICallModal } from '../components/Interview/VoiceAICallModal';

export const AITutor = () => {
  const { isDarkMode, activeAccentHex } = useTheme();
  const { profile } = useAuth();
  const accentHex = activeAccentHex || 'var(--doap-accent, #ffffff)';

  const [chatHistory, setChatHistory] = useState(INITIAL_CHAT_HISTORY || []);
  const [activeChatId, setActiveChatId] = useState('1');
  const [searchQuery, setSearchQuery] = useState('');
  const [inputText, setInputText] = useState('');
  const [baseInputText, setBaseInputText] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Collapsed by default for clean full-width chat

  const chipsScrollRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Gemini API Key Modal State
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [geminiKeyInput, setGeminiKeyInput] = useState(
    (typeof localStorage !== 'undefined' ? localStorage.getItem('doap_gemini_key') : '') || ''
  );
  const [keySaved, setKeySaved] = useState(false);
  const [isVoiceCallOpen, setIsVoiceCallOpen] = useState(false);

  const {
    isListening,
    transcript,
    error: speechError,
    stopListening,
    toggleListening,
    clearError: clearSpeechError
  } = useSpeechRecognition();

  const handleSaveCallToChat = (logs) => {
    if (!logs || logs.length === 0) return;
    const newItems = logs.map((log, idx) => ({
      id: `voice-${Date.now()}-${idx}`,
      sender: log.role === 'user' ? 'user' : 'ai',
      text: log.text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }));

    setChatHistory(prev => prev.map(chat => {
      if (chat.id === activeChatId) {
        return {
          ...chat,
          messages: [...chat.messages, ...newItems]
        };
      }
      return chat;
    }));
  };

  useEffect(() => {
    if (transcript) {
      const combined = baseInputText ? `${baseInputText} ${transcript}` : transcript;
      setInputText(combined);
    }
  }, [transcript, baseInputText]);

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

  const [messages, setMessages] = useState([
    {
      id: '1',
      sender: 'ai',
      text: `Hey ${profile?.name ? profile.name.split(' ')[0] : 'there'}! 👋 I'm **✦ IP VEXA ✦**, your universal AI assistant & coding companion.\n\nI can answer **anything** (coding, DSA, math, science, general advice) and generate AI art with \`/image <prompt>\`!\n\nType \`/help\` to see all slash commands.`
    }
  ]);

  const [isThinking, setIsThinking] = useState(false);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isThinking]);

    const activeStreamRef = useRef(null);

  const streamResponseText = (fullText) => {
    if (activeStreamRef.current) {
      clearInterval(activeStreamRef.current);
    }

    const aiMsgId = (Date.now() + 1).toString();
    setIsThinking(false);

    setMessages(prev => [
      ...prev,
      {
        id: aiMsgId,
        sender: 'ai',
        text: '',
        isStreaming: true
      }
    ]);

    let currentIndex = 0;
    const speed = 10; // ms per tick
    const charsPerTick = 4; // realistic smooth token stream

    activeStreamRef.current = setInterval(() => {
      currentIndex += charsPerTick;
      const currentChunk = fullText.slice(0, currentIndex);
      const isDone = currentIndex >= fullText.length;

      setMessages(prev =>
        prev.map(m => m.id === aiMsgId ? { ...m, text: currentChunk, isStreaming: !isDone } : m)
      );

      if (isDone) {
        clearInterval(activeStreamRef.current);
        activeStreamRef.current = null;
      }
    }, speed);
  };

  const executeSend = async (messageToSend) => {
    const currentInput = messageToSend.trim();
    if (!currentInput || isThinking) return;

    if (isListening) {
      stopListening();
    }

    if (activeStreamRef.current) {
      clearInterval(activeStreamRef.current);
      activeStreamRef.current = null;
    }

    const userMsg = {
      id: Date.now().toString(),
      sender: 'user',
      text: currentInput
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInputText('');
    setBaseInputText('');
    setIsThinking(true);

    try {
      // Natural thinking delay (400ms) for realistic feel
      await new Promise(resolve => setTimeout(resolve, 400));

      const smartReply = await generateSmartTutorResponse(
        currentInput, 
        profile?.name ? profile.name.split(' ')[0] : 'there',
        newMessages
      );

      streamResponseText(smartReply);
    } catch (err) {
      console.error('[AITutor] Error generating response:', err);
      setIsThinking(false);
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text: `I ran into a temporary hiccup processing that. Please try asking again!`,
          isStreaming: false
        }
      ]);
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    executeSend(inputText);
  };

  const handleNewChat = () => {
    if (isListening) stopListening();
    const newChat = {
      id: Date.now().toString(),
      title: "New Conversation",
      category: "TODAY",
      date: "Today"
    };
    setChatHistory([newChat, ...chatHistory]);
    setActiveChatId(newChat.id);
    setMessages([
      {
        id: '1',
        sender: 'ai',
        text: `Hello! What engineering challenge or concept should we solve today?`
      }
    ]);
  };

  const handleSaveGeminiKey = (e) => {
    e.preventDefault();
    localStorage.setItem('doap_gemini_key', geminiKeyInput.trim());
    setKeySaved(true);
    setTimeout(() => {
      setKeySaved(false);
      setShowKeyModal(false);
    }, 1200);
  };

  const quickPrompts = [
    "🎨 /image a futuristic neon cybernetic workstation 8k",
    "💻 /code Two Sum with optimal HashMap in Python",
    "💡 /explain Quantum Computing simply with analogies",
    "🎯 /interview Google Senior Software Engineer",
    "😄 /joke",
    "🚀 /help"
  ];

  const categories = ["TODAY", "YESTERDAY", "PREVIOUS 7 DAYS", "OLDER"];

  const filteredHistory = (chatHistory || []).filter(item => 
    item && item.title && item.title.toLowerCase().includes((searchQuery || '').toLowerCase())
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
          className="w-64 sm:w-72 border-r flex flex-col justify-between shrink-0 animate-fade-in z-20"
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
                  className="w-6 h-6 rounded-lg border flex items-center justify-center transition-colors cursor-pointer hover:opacity-80"
                  style={{ borderColor: 'var(--doap-border)', color: 'var(--doap-text-prim)' }}
                  title="New Chat"
                >
                  <Plus size={13} />
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
                placeholder="Search chats..."
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

          <div className="flex-1 overflow-y-auto px-2.5 py-1 space-y-3 scrollbar-none">
            {categories.map((cat) => {
              const items = filteredHistory.filter(i => i.category === cat);
              if (items.length === 0) return null;

              return (
                <div key={cat} className="space-y-1">
                  <span className="px-2 text-[9px] font-mono uppercase tracking-widest block text-neutral-500">
                    {cat}
                  </span>
                  {items.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveChatId(item.id);
                        if (isListening) stopListening();
                      }}
                      className="w-full text-left px-2.5 py-1.5 rounded-xl text-xs truncate transition-colors block cursor-pointer border"
                      style={{
                        backgroundColor: activeChatId === item.id ? 'var(--doap-accent)' : 'transparent',
                        borderColor: activeChatId === item.id ? 'var(--doap-accent)' : 'transparent',
                        color: activeChatId === item.id ? '#000000' : 'var(--doap-text-sec)'
                      }}
                    >
                      {item.title}
                    </button>
                  ))}
                </div>
              );
            })}
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

            <span className="font-black text-xs sm:text-sm tracking-tight" style={{ color: 'var(--doap-text-prim)' }}>
              ✦ IP VEXA AI ✦
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono border border-emerald-500/30 text-emerald-400 bg-emerald-500/10">
              ⚡ 120B Super-Brain
            </span>
            <span className="hidden md:inline px-2 py-0.5 rounded-full text-[10px] font-mono border border-purple-500/30 text-purple-400 bg-purple-500/10">
              🎨 Flux AI Art
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowKeyModal(true)}
              className="px-2.5 py-1 rounded-xl border text-[11px] font-mono flex items-center gap-1.5 hover:opacity-80 transition-opacity cursor-pointer bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
            >
              <Zap size={11} className="text-emerald-400 animate-pulse" />
              <span className="hidden sm:inline">
                Groq 120B Active
              </span>
              <span className="sm:hidden">120B Active</span>
            </button>
          </div>
        </div>

        {/* Messages List Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 scrollbar-thin min-w-0">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
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

                  <div 
                    className="p-4 sm:p-6 rounded-3xl rounded-tl-xs text-sm sm:text-[15px] leading-relaxed border doap-card shadow-sm flex-1 max-w-full min-w-0"
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
                <Sparkles size={16} className="animate-spin" />
              </div>
              <div 
                className="p-4 rounded-2xl text-xs sm:text-sm font-mono border rounded-tl-none flex items-center gap-2"
                style={{ backgroundColor: 'var(--doap-surface-sec)', borderColor: 'var(--doap-border)', color: 'var(--doap-text-sec)' }}
              >
                <span className="w-2 h-2 rounded-full bg-current animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 rounded-full bg-current animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 rounded-full bg-current animate-bounce" style={{ animationDelay: '300ms' }} />
                <span className="ml-2 font-medium">DOAP AI is generating solution...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Messages List Area End */}

        {/* Pinned Bottom Input Area */}
        <div 
          className="p-3 sm:p-4 space-y-2.5 border-t shrink-0"
          style={{ 
            backgroundColor: 'var(--doap-surface, #111111)',
            borderColor: 'var(--doap-border)' 
          }}
        >
          {/* Quick Action Chips with Left/Right Scroll */}
          <div className="relative flex items-center gap-1.5 max-w-4xl mx-auto">
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
              onWheel={(e) => {
                if (chipsScrollRef.current && Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
                  chipsScrollRef.current.scrollLeft += e.deltaY;
                }
              }}
              className="flex-1 flex items-center gap-1.5 overflow-x-auto pb-0.5 scrollbar-none scroll-smooth touch-pan-x"
            >
              {quickPrompts.map((qp, idx) => (
                <button
                  key={idx}
                  onClick={() => executeSend(qp.replace(/^[^\s]+\s/, ''))}
                  className="px-3 py-1 rounded-full text-[11px] font-medium whitespace-nowrap border transition-all cursor-pointer hover-glide shrink-0"
                  style={{ 
                    backgroundColor: 'var(--doap-surface-sec)', 
                    borderColor: 'var(--doap-border)', 
                    color: 'var(--doap-text-prim)' 
                  }}
                >
                  {qp}
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
                placeholder={isListening ? "Listening to your voice..." : "Ask DOAP anything (coding, algorithms, system design, interview prep)..."}
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

      {/* AI Engine API Key Modal (Groq LPU / Gemini) */}
      {showKeyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in">
          <div 
            className="w-full max-w-md p-6 rounded-3xl border shadow-2xl space-y-4"
            style={{ backgroundColor: 'var(--doap-surface, #111111)', borderColor: 'var(--doap-border, #333333)' }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap size={18} style={{ color: accentHex }} />
                <h3 className="font-bold text-sm" style={{ color: 'var(--doap-text-prim)' }}>Connect AI Engine (Groq / Gemini)</h3>
              </div>
              <button onClick={() => setShowKeyModal(false)} className="hover:opacity-80 cursor-pointer">
                <X size={16} />
              </button>
            </div>

            <p className="text-xs text-neutral-400">
              Paste your <strong>Groq API Key</strong> (<code>gsk_...</code> from <a href="https://console.groq.com/keys" target="_blank" rel="noreferrer" className="text-emerald-400 underline">console.groq.com</a> for 500 tok/sec speed) or <strong>Gemini Key</strong> (<code>AIzaSy...</code>).
            </p>

            <form onSubmit={handleSaveGeminiKey} className="space-y-3">
              <input 
                type="password"
                placeholder="gsk_... or AIzaSy..."
                value={geminiKeyInput}
                onChange={(e) => setGeminiKeyInput(e.target.value)}
                className="w-full p-3 rounded-xl border text-xs font-mono focus:outline-none"
                style={{ backgroundColor: 'var(--doap-surface-sec)', borderColor: 'var(--doap-border)', color: 'var(--doap-text-prim)' }}
              />

              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl text-xs font-bold shadow-md cursor-pointer hover-glide flex items-center justify-center gap-1.5"
                  style={{ backgroundColor: accentHex, color: 'var(--doap-bg, #000)' }}
                >
                  {keySaved ? (
                    <>
                      <Check size={14} />
                      <span>Connected Successfully!</span>
                    </>
                  ) : (
                    <span>Save Key</span>
                  )}
                </button>

                {localStorage.getItem('doap_gemini_key') && (
                  <button
                    type="button"
                    onClick={() => {
                      localStorage.removeItem('doap_gemini_key');
                      setGeminiKeyInput('');
                      setShowKeyModal(false);
                    }}
                    className="px-3 py-2.5 rounded-xl border text-xs font-bold text-rose-400 border-rose-800/40 hover:bg-rose-950/40 cursor-pointer"
                  >
                    Clear
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

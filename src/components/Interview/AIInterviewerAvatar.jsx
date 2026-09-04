import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Sparkles, Bot, Mic, CheckCircle2 } from 'lucide-react';
import { speakElevenLabs, stopElevenLabsAudio, getBestNaturalVoice, humanizeTextForSpeech } from '../../services/elevenLabsService';

export const AIInterviewerAvatar = ({ questionText = '', isAiSpeaking = false, onSpeechComplete }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [speakingState, setSpeakingState] = useState('idle'); // 'idle' | 'speaking' | 'listening'
  const synthRef = useRef(typeof window !== 'undefined' ? window.speechSynthesis : null);

  useEffect(() => {
    if (questionText) {
      speakQuestion(questionText);
    }
    return () => {
      stopElevenLabsAudio();
      if (synthRef.current) synthRef.current.cancel();
    };
  }, [questionText]);

  const speakQuestion = async (text) => {
    if (isMuted) return;
    setSpeakingState('speaking');
    stopElevenLabsAudio();
    if (synthRef.current) synthRef.current.cancel();

    // Clean and humanoid-normalize text for speech
    const cleanSpeech = humanizeTextForSpeech(text);

    try {
      await speakElevenLabs(
        cleanSpeech,
        'jarvis',
        () => {
          setSpeakingState('listening');
          if (onSpeechComplete) onSpeechComplete();
        },
        () => {
          fallbackBrowserSpeech(cleanSpeech);
        }
      );
    } catch (e) {
      fallbackBrowserSpeech(cleanSpeech);
    }
  };

  const fallbackBrowserSpeech = (text) => {
    if (!synthRef.current) {
      setSpeakingState('listening');
      if (onSpeechComplete) onSpeechComplete();
      return;
    }

    const spokenHumanText = humanizeTextForSpeech(text);
    const utterance = new SpeechSynthesisUtterance(spokenHumanText);
    utterance.rate = 0.98;
    utterance.pitch = 1.0;

    const naturalVoice = getBestNaturalVoice(synthRef.current);
    if (naturalVoice) {
      utterance.voice = naturalVoice;
      utterance.lang = naturalVoice.lang || 'en-US';
    }

    utterance.onend = () => {
      setSpeakingState('listening');
      if (onSpeechComplete) onSpeechComplete();
    };
    utterance.onerror = () => {
      setSpeakingState('listening');
      if (onSpeechComplete) onSpeechComplete();
    };

    synthRef.current.speak(utterance);
  };

  const toggleMute = () => {
    if (!isMuted) {
      stopElevenLabsAudio();
      if (synthRef.current) synthRef.current.cancel();
      setIsMuted(true);
      setSpeakingState('listening');
    } else {
      setIsMuted(false);
      if (questionText) speakQuestion(questionText);
    }
  };

  return (
    <div className="rounded-3xl border border-neutral-800 bg-[#0c0e14] p-4 flex flex-col justify-between overflow-hidden relative shadow-2xl min-h-[260px]">
      {/* Top Meta Bar */}
      <div className="flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
          <div>
            <h4 className="text-xs font-bold text-white flex items-center gap-1.5 font-sans">
              <span>Alex Vance</span>
              <span className="text-[10px] font-normal text-neutral-400 font-mono">• Principal AI Lead</span>
            </h4>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold border transition-colors ${
            speakingState === 'speaking'
              ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-400 animate-pulse'
              : 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400'
          }`}>
            {speakingState === 'speaking' ? '🗣️ AI ASKING...' : '👂 LISTENING...'}
          </span>

          <button
            type="button"
            onClick={toggleMute}
            className="w-7 h-7 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white cursor-pointer transition-colors"
            title={isMuted ? "Unmute AI Interviewer" : "Mute AI Interviewer"}
          >
            {isMuted ? <VolumeX size={13} className="text-rose-400" /> : <Volume2 size={13} className="text-cyan-400" />}
          </button>
        </div>
      </div>

      {/* Futuristic Holographic Face & Acoustic Aura Feed */}
      <div className="my-auto py-6 flex flex-col items-center justify-center relative">
        {/* Glow rings */}
        <div className={`absolute w-36 h-36 rounded-full transition-all duration-700 pointer-events-none ${
          speakingState === 'speaking' 
            ? 'bg-cyan-500/15 blur-2xl scale-125 animate-pulse' 
            : 'bg-blue-500/10 blur-xl scale-100'
        }`} />

        {/* Outer Circular Ring */}
        <div className={`w-28 h-28 rounded-full border-2 flex items-center justify-center relative transition-all duration-500 ${
          speakingState === 'speaking' 
            ? 'border-cyan-400 shadow-[0_0_30px_rgba(6,182,212,0.4)] scale-105' 
            : 'border-neutral-700/80 shadow-inner'
        }`}>
          {/* Inner Avatar Graphic */}
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#121624] via-[#090b10] to-[#040508] flex items-center justify-center border border-white/10 relative overflow-hidden">
            {/* Hologram scanlines */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none" />

            <Bot 
              size={42} 
              className={`transition-all duration-300 ${
                speakingState === 'speaking' ? 'text-cyan-300 scale-110' : 'text-neutral-400'
              }`} 
            />

            {/* Speaking Audio Waves overlay */}
            {speakingState === 'speaking' && (
              <div className="absolute bottom-2 flex items-center gap-0.5">
                {[4, 12, 8, 16, 10, 6].map((h, i) => (
                  <span
                    key={i}
                    className="w-1 bg-cyan-400 rounded-full animate-pulse"
                    style={{
                      height: `${h}px`,
                      animationDelay: `${i * 0.15}s`,
                      animationDuration: '0.6s'
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        <p className="text-[11px] font-mono text-neutral-400 pt-3">
          {speakingState === 'speaking' ? 'Presenting technical question...' : 'Observing delivery and reasoning...'}
        </p>
      </div>

      {/* Replay Button */}
      <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[11px] font-mono text-neutral-500">
        <span>DOAP Cognitive Interviewer</span>
        <button
          type="button"
          onClick={() => speakQuestion(questionText)}
          className="text-cyan-400 hover:text-cyan-300 cursor-pointer font-semibold flex items-center gap-1"
        >
          <Volume2 size={12} />
          <span>Repeat Question</span>
        </button>
      </div>
    </div>
  );
};

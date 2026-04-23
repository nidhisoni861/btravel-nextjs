'use client';
import { useRef, useEffect, useState, KeyboardEvent } from 'react';
import { motion } from 'motion/react';
import { X, Send, Mic, Sparkles } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'bot';
  text: string;
}

interface ChatbotPanelProps {
  onClose: () => void;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: 'welcome',
    role: 'bot',
    text: 'Hallo! Ich bin Ihr persönlicher BeTravel-Assistent. Wie kann ich Ihnen bei Ihrer Traumreise helfen? ✈️',
  },
];

export default function ChatbotPanel({ onClose }: ChatbotPanelProps) {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    const text = input.trim();
    if (!text) return;

    const userMsg: Message = { id: `u-${Date.now()}`, role: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    setTimeout(() => {
      const botMsg: Message = {
        id: `b-${Date.now()}`,
        role: 'bot',
        text: 'Vielen Dank! Ich leite Ihre Anfrage weiter. Ein Reiseexperte wird sich in Kürze bei Ihnen melden.',
      };
      setMessages(prev => [...prev, botMsg]);
    }, 900);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.88, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.88, y: 16 }}
      transition={{ type: 'spring', stiffness: 320, damping: 26 }}
      style={{ transformOrigin: 'bottom right' }}
      className="fixed bottom-[84px] sm:bottom-[88px] right-4 sm:right-6 z-50
                 w-[calc(100vw-32px)] max-w-[370px]
                 flex flex-col
                 max-h-[calc(100vh-120px)] h-[520px] sm:h-[560px]
                 bg-white rounded-[var(--radius-panel)] shadow-2xl
                 border border-[var(--border)] overflow-hidden"
    >
      {/* ── Header ── */}
      <div className="flex items-center gap-3 px-5 py-4 bg-gradient-to-r from-[#10B981] to-[#14B8A6] shrink-0">
        <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center shrink-0">
          <Sparkles className="w-4 h-4 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-white text-sm font-semibold leading-tight">BeTravel Assistent</p>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-white/60 text-xs">Online – bereit zu helfen</span>
          </div>
        </div>
        <button
          onClick={onClose}
          aria-label="Chat schließen"
          className="w-8 h-8 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors rounded-full"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* ── Messages ── */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-[var(--sand-light)]">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`flex items-end gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.role === 'bot' && (
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#10B981] to-[#14B8A6] flex items-center justify-center shrink-0 mb-0.5">
                <Sparkles className="w-3 h-3 text-white" />
              </div>
            )}
            <div
              className={`max-w-[78%] px-4 py-2.5 text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-gradient-to-r from-[#10B981] to-[#14B8A6] text-white rounded-[14px] rounded-br-[4px]'
                  : 'bg-white text-[var(--navy)] rounded-[14px] rounded-bl-[4px] shadow-sm border border-[var(--border)]'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* ── Input ── */}
      <div className="px-4 py-3 bg-white border-t border-[var(--border)] shrink-0">
        <div className="flex items-center gap-2 bg-[var(--sand-light)] rounded-[var(--radius-control)] px-3 py-2">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Nachricht schreiben…"
            className="flex-1 bg-transparent text-[var(--navy)] text-sm placeholder:text-[var(--muted-foreground)] outline-none min-w-0"
          />
          <button
            onClick={() => setIsListening(v => !v)}
            aria-label="Spracheingabe"
            className={`w-8 h-8 shrink-0 flex items-center justify-center rounded-full transition-all ${
              isListening
                ? 'bg-[var(--navy)] text-white'
                : 'text-[var(--muted-foreground)] hover:text-[var(--navy)] hover:bg-[var(--sand)]'
            }`}
          >
            <Mic className="w-4 h-4" />
          </button>
          <button
            onClick={sendMessage}
            disabled={!input.trim()}
            aria-label="Senden"
            className="w-8 h-8 shrink-0 flex items-center justify-center bg-gradient-to-br from-[#10B981] to-[#14B8A6] text-white rounded-full transition-all hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
        <p className="text-center text-[10px] text-[var(--muted-foreground)] mt-2 leading-none">
          Powered by BeTravel AI
        </p>
      </div>
    </motion.div>
  );
}

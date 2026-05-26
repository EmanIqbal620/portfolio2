'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Sparkles, Bot, User, Copy, Check, ChevronDown, Trash2, AlertTriangle } from 'lucide-react';

const MAX_INPUT_LENGTH = 2000;

let msgId = 0;
function nextId() { return ++msgId; }

type Message = {
  id: number;
  role: 'user' | 'assistant';
  content: string;
  time: Date;
  error?: boolean;
};

const STORAGE_KEY = 'portfolio-chat';

function loadMessages(): Message[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return parsed.map((m: Record<string, unknown>) => ({ ...m, id: (m as Message).id || nextId(), time: new Date(m.time as string) }));
    }
  } catch {}
  return [];
}

function saveMessages(msgs: Message[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(msgs));
  } catch {}
}

const welcomeMessage: Message = {
  id: nextId(),
  role: 'assistant',
  content: "Hi! I'm Eman's portfolio assistant. Ask me anything about their projects, skills, or experience.",
  time: new Date(),
};

const suggestedQs = [
  'What does Eman build?',
  "What is Eman's background?",
  'Show me AI projects',
  'What makes Eman different?',
  'Why chatbot?',
  'What tech stack does Eman use?',
];

function timeStr(d: Date) {
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setCopied(true);
        } catch {}
        setTimeout(() => setCopied(false), 1500);
      }}
      className="opacity-40 hover:opacity-100 transition-opacity duration-200 text-white/40 hover:text-[#2DD4BF]"
      aria-label="Copy message"
    >
      {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
    </button>
  );
}

function TypingBubble() {
  return (
    <div className="flex justify-start">
      <div className="flex items-end gap-2 max-w-[85%]">
        <div className="w-7 h-7 rounded-lg bg-[#2DD4BF]/10 flex items-center justify-center flex-shrink-0">
          <Bot className="w-4 h-4 text-[#2DD4BF]" />
        </div>
        <div className="rounded-xl px-3.5 py-3 bg-white/[0.04] border border-white/[0.06]">
          <span className="inline-flex gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2DD4BF]/60 animate-bounce-slow" style={{ animationDelay: '0ms' }} />
            <span className="w-1.5 h-1.5 rounded-full bg-[#2DD4BF]/60 animate-bounce-slow" style={{ animationDelay: '150ms' }} />
            <span className="w-1.5 h-1.5 rounded-full bg-[#2DD4BF]/60 animate-bounce-slow" style={{ animationDelay: '300ms' }} />
          </span>
        </div>
      </div>
    </div>
  );
}

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = loadMessages();
    return saved.length ? saved : [welcomeMessage];
  });
  const [input, setInput] = useState('');
  const [streaming, setStreaming] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [newMsgWhileScrolled, setNewMsgWhileScrolled] = useState(false);
  const [confirmClear, setConfirmClear] = useState(false);
  const streamingRef = useRef(false);
  const assistantContentRef = useRef('');
  const lastStreamUpdateRef = useRef(0);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const msgContainerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  useEffect(() => {
    if (!streamingRef.current) {
      saveMessages(messages);
    }
  }, [messages]);

  useEffect(() => {
    const el = msgContainerRef.current;
    if (!el) return;
    const isAtBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 60;
    if (isAtBottom) {
      el.scrollTop = el.scrollHeight;
      setNewMsgWhileScrolled(false);
    } else if (messages.length > 1) {
      setNewMsgWhileScrolled(true);
    }
  }, [messages]);

  const scrollToBottom = () => {
    const el = msgContainerRef.current;
    if (el) el.scrollTop = el.scrollHeight;
    setNewMsgWhileScrolled(false);
  };

  const cancelStream = () => {
    if (abortRef.current) {
      abortRef.current.abort();
      abortRef.current = null;
    }
    streamingRef.current = false;
    setStreaming(false);
  };

  const send = async (text: string) => {
    if (!text.trim() || streaming) return;
    text = text.trim().slice(0, MAX_INPUT_LENGTH);

    const userMsg: Message = { id: nextId(), role: 'user', content: text.trim(), time: new Date() };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput('');
    setStreaming(true);
    streamingRef.current = true;
    assistantContentRef.current = '';
    lastStreamUpdateRef.current = 0;
    setShowSuggestions(false);

    const flushStream = () => {
      setMessages(prev => {
        const next = [...prev];
        next[next.length - 1] = { id: next[next.length - 1]?.id || nextId(), role: 'assistant', content: assistantContentRef.current, time: new Date() };
        return next;
      });
    };

    abortRef.current = new AbortController();

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: abortRef.current.signal,
        body: JSON.stringify({
          messages: updated.map(({ role, content }) => ({ role, content })),
        }),
      });

      if (!res.ok) {
        let errorMsg = 'Failed to connect';
        try {
          const err = await res.json();
          errorMsg = err.error || errorMsg;
        } catch {
          errorMsg = `Server error (${res.status})`;
        }
        setMessages(prev => [...prev, { id: nextId(), role: 'assistant', content: errorMsg, time: new Date(), error: true }]);
        setStreaming(false);
        return;
      }

      const reader = res.body?.getReader();
      if (!reader) {
        setMessages(prev => [...prev, { id: nextId(), role: 'assistant', content: 'No response from server', time: new Date(), error: true }]);
        setStreaming(false);
        return;
      }

      const decoder = new TextDecoder();

      setMessages(prev => [...prev, { id: nextId(), role: 'assistant', content: '', time: new Date() }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n').filter(l => l.trim());
        const dataLines = lines.filter(l => l.startsWith('data: '));

        if (dataLines.length > 0) {
          for (const line of dataLines) {
            try {
              const data = JSON.parse(line.slice(6));
              if (data.content) {
                assistantContentRef.current += data.content;
              }
            } catch {}
          }
        } else {
          assistantContentRef.current += chunk;
        }

        const now = Date.now();
        if (now - lastStreamUpdateRef.current > 80) {
          lastStreamUpdateRef.current = now;
          flushStream();
        }
      }

      flushStream();
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') return;
      setMessages(prev => [...prev, { id: nextId(), role: 'assistant', content: 'Network error. Check your connection.', time: new Date(), error: true }]);
    }

    streamingRef.current = false;
    setStreaming(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  };

  const handlePanelKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setOpen(false);
      return;
    }
    if (e.key === 'Tab') {
      const focusable = panelRef.current?.querySelectorAll<HTMLElement>(
        'button, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable || focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    if (inputRef.current) {
      requestAnimationFrame(() => {
        if (inputRef.current) {
          inputRef.current.style.height = 'auto';
          inputRef.current.style.height = `${Math.min(inputRef.current.scrollHeight, 96)}px`;
        }
      });
    }
  };

  return (
    <>
      {/* FAB */}
      <div className="fixed bottom-6 right-6 z-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative group"
        >
          <button
            onClick={() => setOpen(true)}
            className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-[0_0_30px_rgba(45,212,191,0.3)] ${
              open ? 'scale-0 opacity-0 pointer-events-none' : 'scale-100 opacity-100'
            }`}
            style={{
              background: 'linear-gradient(135deg, rgba(45,212,191,0.2), rgba(217,70,239,0.2))',
              border: '1px solid rgba(45,212,191,0.3)',
              backdropFilter: 'blur(16px)',
              boxShadow: '0 0 20px rgba(45,212,191,0.15)',
            }}
            aria-label="Open chat"
          >
            <motion.div
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <MessageCircle className="w-6 h-6 text-[#2DD4BF]" />
            </motion.div>
          </button>
          <div className="absolute right-16 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg whitespace-nowrap text-[12px] font-medium text-white bg-[#0A0028]/90 border border-white/[0.1] opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            Ask AI
          </div>
        </motion.div>
      </div>

      {/* Chat Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            tabIndex={-1}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            onKeyDown={handlePanelKeyDown}
            className="fixed bottom-6 right-6 z-50 w-[90vw] max-w-[400px] h-[440px] sm:h-[480px] max-h-[85dvh] rounded-2xl overflow-hidden flex flex-col"
            style={{
              background: 'rgba(10, 0, 40, 0.92)',
              backdropFilter: 'blur(24px) saturate(180%)',
              border: '1px solid rgba(45,212,191,0.15)',
              boxShadow: '0 24px 80px rgba(0,0,0,0.6), 0 0 40px rgba(45,212,191,0.06)',
            }}
          >
            {/* Header */}
            <div className="relative flex items-center justify-between px-4 py-3 border-b border-white/[0.06] flex-shrink-0">
              <div className="absolute inset-0 bg-gradient-to-r from-[#2DD4BF]/5 via-transparent to-transparent pointer-events-none" />
              <div className="flex items-center gap-2.5 relative z-10">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, rgba(45,212,191,0.25), rgba(217,70,239,0.18))' }}>
                  <Bot className="w-4 h-4 text-[#2DD4BF]" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Eman AI</p>
                  <p className="text-[10px] text-white/50">Portfolio assistant</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                {confirmClear ? (
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] text-white/40">Clear all?</span>
                    <button
                      onClick={() => { setMessages([welcomeMessage]); setShowSuggestions(true); setConfirmClear(false); try { localStorage.removeItem(STORAGE_KEY); } catch {} }}
                      className="px-2 py-1 rounded-lg text-[10px] font-medium text-red-400 hover:bg-red-500/20 active:scale-90 transition-all"
                      aria-label="Confirm clear chat"
                    >
                      Yes
                    </button>
                    <button
                      onClick={() => setConfirmClear(false)}
                      className="px-2 py-1 rounded-lg text-[10px] font-medium text-white/40 hover:text-white/60 active:scale-90 transition-all"
                      aria-label="Cancel clear chat"
                    >
                      No
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => { if (messages.length <= 1) { setMessages([welcomeMessage]); setShowSuggestions(true); try { localStorage.removeItem(STORAGE_KEY); } catch {} } else { setConfirmClear(true); } }}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-medium text-white/30 hover:text-white/60 hover:bg-white/10 active:scale-90 transition-all relative z-10 focus-visible:ring-2 focus-visible:ring-[#2DD4BF]/50"
                    aria-label="Clear chat"
                    title="Delete all messages"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Clear</span>
                  </button>
                )}
                <button
                  onClick={() => setOpen(false)}
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 active:scale-90 transition-all relative z-10 focus-visible:ring-2 focus-visible:ring-[#2DD4BF]/50"
                  aria-label="Close chat"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div ref={msgContainerRef} className="flex-1 overflow-y-auto px-4 py-3 space-y-3" style={{ scrollbarWidth: 'thin' }} role="log" aria-live="polite" aria-relevant="additions" aria-label="Chat messages">
              {messages.map((msg, idx) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} group`}
                >
                    <div className={`flex items-end gap-2.5 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    {/* Avatar */}
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      msg.role === 'user' ? 'bg-[#A855F7]/15' : msg.error ? 'bg-red-500/15' : 'bg-[#2DD4BF]/10'
                    }`}>
                      {msg.role === 'user' ? (
                        <User className="w-4 h-4 text-[#A855F7]" />
                      ) : (
                        <Bot className={`w-4 h-4 ${msg.error ? 'text-red-400' : 'text-[#2DD4BF]'}`} />
                      )}
                    </div>
                    {/* Bubble */}
                    <div>
                      <div
                        className={`rounded-xl px-3.5 py-2.5 text-sm leading-relaxed selection:bg-[#2DD4BF]/20 ${
                          msg.role === 'user'
                            ? 'bg-[#2DD4BF]/15 text-white border border-[#2DD4BF]/20 rounded-br-[4px]'
                            : msg.error
                              ? 'bg-red-500/10 text-red-300 border border-red-500/20 rounded-bl-[4px]'
                              : 'bg-white/[0.04] text-white/85 border border-white/[0.06] rounded-bl-[4px]'
                        }`}
                      >
                        {msg.error && <AlertTriangle className="w-3.5 h-3.5 inline mr-1.5 -mt-0.5 text-red-400" />}
                        {msg.content || null}
                      </div>
                      <div className={`flex items-center gap-2 mt-0.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                          <span className="text-[10px] text-white/40">{timeStr(msg.time)}</span>
                        {msg.content && !msg.error && <CopyButton text={msg.content} />}
                        {msg.error && (
                          <button
                            onClick={() => {
                              for (let i = idx - 1; i >= 0; i--) {
                                if (messages[i]?.role === 'user') {
                                  send(messages[i].content);
                                  break;
                                }
                              }
                            }}
                            className="text-[10px] font-medium text-red-400/60 hover:text-red-400 transition-colors"
                            aria-label="Retry"
                          >
                            Retry
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}

              {streaming && (
                <div className="flex items-center gap-2">
                  <TypingBubble />
                  <button
                    onClick={cancelStream}
                    className="px-2 py-1 rounded-lg text-[10px] font-medium text-white/40 border border-white/[0.08] hover:text-red-400 hover:border-red-400/30 transition-all duration-200"
                    aria-label="Stop generating"
                  >
                    Stop
                  </button>
                </div>
              )}

              <div ref={endRef} />
            </div>

            {/* Scroll to bottom indicator */}
            {newMsgWhileScrolled && (
              <button
                onClick={scrollToBottom}
                className="absolute bottom-20 left-1/2 -translate-x-1/2 z-10 w-8 h-8 rounded-full bg-[#2DD4BF]/15 border border-[#2DD4BF]/30 flex items-center justify-center text-[#2DD4BF] animate-float-medium"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            )}

            {/* Suggested questions */}
            {showSuggestions && messages.length === 1 && (
              <div className="px-4 pb-2 flex-shrink-0">
                <div className="flex flex-wrap gap-1.5">
                  {suggestedQs.map((q) => (
                    <button
                      key={q}
                      onClick={() => send(q)}
                      className="px-3 py-2 rounded-lg text-[12px] font-medium text-white/60 border border-white/[0.1] hover:text-white hover:border-[#2DD4BF]/30 hover:bg-[#2DD4BF]/8 active:scale-95 transition-all duration-200"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="px-4 py-3 border-t border-white/[0.06] flex-shrink-0">
              <div className={`rounded-xl border transition-all duration-200 ${streaming ? 'border-white/[0.08] bg-white/[0.01]' : 'border-white/[0.15] bg-white/[0.02] focus-within:border-[#2DD4BF]/60 focus-within:bg-[#2DD4BF]/[0.05]'}`}>
                {streaming && (
                  <div className="px-3 pt-2 pb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex gap-0.5">
                        <span className="w-1 h-1 rounded-full bg-[#2DD4BF]/60 animate-bounce-slow" style={{ animationDelay: '0ms' }} />
                        <span className="w-1 h-1 rounded-full bg-[#2DD4BF]/60 animate-bounce-slow" style={{ animationDelay: '150ms' }} />
                        <span className="w-1 h-1 rounded-full bg-[#2DD4BF]/60 animate-bounce-slow" style={{ animationDelay: '300ms' }} />
                      </span>
                      <span className="text-[11px] text-white/40">AI is responding<span className="animate-pulse">...</span></span>
                    </div>
                  </div>
                )}
                <div className="flex items-end gap-2 px-3 py-2">
                  <textarea
                    ref={inputRef}
                    value={input}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    onPaste={(e) => {
                      const pasted = e.clipboardData.getData('text');
                      const remaining = MAX_INPUT_LENGTH - input.length;
                      if (pasted.length > remaining) {
                        e.preventDefault();
                        const truncated = pasted.slice(0, Math.max(0, remaining));
                        setInput(prev => prev + truncated);
                      }
                    }}
                    placeholder={streaming ? '' : "Ask me anything..."}
                    rows={1}
                    maxLength={MAX_INPUT_LENGTH}
                    disabled={streaming}
                    className="flex-1 bg-transparent text-sm text-white/80 placeholder-white/50 outline-none min-w-0 resize-none max-h-24 disabled:opacity-30 disabled:cursor-not-allowed caret-[#2DD4BF]"
                    style={{ scrollbarWidth: 'none' }}
                  />
                  <div className="flex flex-col items-center gap-0.5 flex-shrink-0">
                    {input.length > MAX_INPUT_LENGTH * 0.8 && (
                      <span className={`text-[10px] font-medium ${input.length >= MAX_INPUT_LENGTH ? 'text-red-400' : 'text-white/40'}`}>
                        {input.length}/{MAX_INPUT_LENGTH}
                      </span>
                    )}
                    <button
                      onClick={() => send(input)}
                      disabled={!input.trim() || streaming}
                      className="group w-9 h-9 rounded-xl flex items-center justify-center text-white/60 hover:text-[#2DD4BF] hover:bg-[#2DD4BF]/10 transition-all active:scale-90 disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
                      aria-label="Send message"
                      title={streaming ? 'Wait for response' : !input.trim() ? 'Type a message' : 'Send message'}
                    >
                      <Send className="w-4 h-4 transition-transform duration-200 group-hover:rotate-12 group-hover:scale-110" />
                    </button>
                  </div>
                </div>
                {!streaming && (
                  <div className="px-3 pb-1.5">
                    <span className="text-[10px] text-white/20">↵ Enter to send · Shift+Enter for new line</span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

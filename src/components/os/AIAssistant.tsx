"use client";

import { useState, useRef, useEffect } from "react";
import { X, Send, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const CHIPS = [
  "Who is Gaurav?",
  "What is his tech stack?",
  "Explain Kafka project",
  "How to contact him?",
];

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello! I am Gaurav's neural helper. Ask me anything about his skills, projects, or experience.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || loading) return;

    const userMsg = text.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
    setLoading(true);

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg }),
      });

      if (res.ok) {
        const data = await res.json();
        setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: "Error communicating with uplink. Please retry." },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Uplink offline. Check network configuration." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[250] font-mono">
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 rounded-full flex items-center justify-center transition-all animate-glow-pulse select-none"
        style={{
          background: "color-mix(in srgb, var(--gt-primary) 20%, var(--gt-bg))",
          border: "2px solid var(--gt-primary)",
          color: "var(--gt-primary)",
          boxShadow: `0 0 15px var(--gt-glow)`,
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="AI Assistant"
      >
        <Sparkles size={20} />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-16 right-0 w-80 sm:w-96 h-[500px] flex flex-col rounded-2xl overflow-hidden glass z-50 shadow-[0_15px_50px_rgba(0,0,0,0.6)]"
          >
            {/* Header */}
            <div
              className="px-4 py-3 flex items-center justify-between shrink-0"
              style={{ borderBottom: "1px solid var(--gt-border)", background: "var(--gt-surface)" }}
            >
              <div className="flex items-center gap-2">
                <Sparkles size={14} style={{ color: "var(--gt-primary)" }} />
                <span className="text-xs font-bold uppercase tracking-wider text-white">AI_Assistant</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded transition-colors"
                style={{ color: "var(--gt-muted-fg)" }}
              >
                <X size={14} />
              </button>
            </div>

            {/* Message Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className="max-w-[85%] px-3.5 py-2.5 rounded-xl text-xs leading-relaxed"
                    style={{
                      background:
                        msg.role === "user"
                          ? "color-mix(in srgb, var(--gt-primary) 10%, transparent)"
                          : "var(--gt-surface)",
                      border: `1px solid ${
                        msg.role === "user"
                          ? "color-mix(in srgb, var(--gt-primary) 30%, transparent)"
                          : "var(--gt-border)"
                      }`,
                      color: msg.role === "user" ? "var(--gt-fg)" : "var(--gt-muted-fg)",
                    }}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {/* Typing loader */}
              {loading && (
                <div className="flex justify-start">
                  <div
                    className="px-4 py-3 rounded-xl flex items-center gap-1.5"
                    style={{ background: "var(--gt-surface)", border: "1px solid var(--gt-border)" }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-500 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-500 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-500 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}
              <div ref={scrollRef} />
            </div>

            {/* Chips */}
            {messages.length === 1 && (
              <div className="px-4 py-2 flex flex-wrap gap-1.5 shrink-0">
                {CHIPS.map((chip) => (
                  <button
                    key={chip}
                    onClick={() => handleSendMessage(chip)}
                    className="px-2.5 py-1 text-[9px] font-mono tracking-wider rounded border transition-all"
                    style={{
                      background: "var(--gt-surface)",
                      borderColor: "var(--gt-border)",
                      color: "var(--gt-muted-fg)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "var(--gt-primary)";
                      e.currentTarget.style.color = "var(--gt-primary)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "var(--gt-border)";
                      e.currentTarget.style.color = "var(--gt-muted-fg)";
                    }}
                  >
                    {chip}
                  </button>
                ))}
              </div>
            )}

            {/* Input form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(input);
              }}
              className="p-3 shrink-0 flex items-center gap-2"
              style={{ borderTop: "1px solid var(--gt-border)", background: "var(--gt-surface)" }}
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Gaurav..."
                className="w-full bg-transparent border-none outline-none text-xs p-1 focus:ring-0"
                style={{ color: "var(--gt-fg)" }}
                aria-label="AI message input"
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="p-1.5 rounded transition-all disabled:opacity-40"
                style={{ color: "var(--gt-primary)" }}
              >
                <Send size={14} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

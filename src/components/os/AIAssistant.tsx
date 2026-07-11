"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useWindowManager } from "@/components/os/WindowManager";
import { useSound } from "@/components/effects/useSound";

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

// This is the actual Chat UI to be rendered inside the OS Window
export function AIAssistantChat() {
  const { playTick, playBeep } = useSound();
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
        playBeep(650, "sine", 0.08);
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
    <div className="w-full h-full flex flex-col font-mono bg-[#050505] text-[var(--gt-fg)]">
      {/* Message Area */}
      <div className="flex-grow overflow-y-auto p-4 space-y-4 min-h-[300px]">
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
                color: msg.role === "user" ? "var(--gt-fg)" : "var(--gt-fg)",
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
        <div className="px-4 py-2 flex flex-wrap gap-1.5 shrink-0 border-t border-[var(--gt-border)]">
          {CHIPS.map((chip) => (
            <button
              key={chip}
              onClick={() => {
                playBeep(750, "sine", 0.04);
                handleSendMessage(chip);
              }}
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
        className="p-3 shrink-0 flex items-center gap-2 border-t animate-none"
        style={{ borderColor: "var(--gt-border)", background: "var(--gt-surface)" }}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => {
            playTick();
            setInput(e.target.value);
          }}
          placeholder="Ask about Gaurav..."
          className="w-full bg-transparent border-none outline-none text-xs p-1 focus:ring-0 focus:border-0 shadow-none outline-0"
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
    </div>
  );
}

// This is the default FAB sparkles button which opens the window
export default function AIAssistant() {
  const { openWindow } = useWindowManager();
  const { playBeep } = useSound();

  const handleClick = () => {
    playBeep(800, "sine", 0.08);
    openWindow("ai-assistant", "AI Neural Copilot");
  };

  return (
    <div className="fixed bottom-6 right-6 z-[250] font-mono">
      <motion.button
        onClick={handleClick}
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
    </div>
  );
}

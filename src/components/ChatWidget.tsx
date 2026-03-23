"use client";

import { useState } from "react";
import styles from "./ChatWidget.module.css";
import { MessageSquare, X, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState("");

    const handleSend = () => {
        if (!inputValue.trim()) return;
        setInputValue("");
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSend();
        }
    };

    return (
        <div className={styles.wrapper}>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        className={styles.chatWindow}
                    >
                        <div className={styles.header}>
                            <h3>Gaurav-AI</h3>
                            <button onClick={() => setIsOpen(false)}><X size={18} /></button>
                        </div>
                        <div className={styles.body}>
                            <div className={styles.message}>
                                <p>Hello! I&apos;m Gaurav&apos;s AI assistant. Ask me about his projects or skills!</p>
                            </div>
                        </div>
                        <div className={styles.inputArea}>
                            <input
                                type="text"
                                placeholder="Type a message..."
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                            <button className={styles.sendButton} onClick={handleSend}>
                                <Send size={18} />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                className={styles.toggleButton}
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
            >
                <MessageSquare size={24} />
            </motion.button>
        </div>
    );
}

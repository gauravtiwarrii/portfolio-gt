"use client";

import { useState } from "react";
import { Heart, BookmarkPlus, BookmarkCheck, Share2, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ActionBar() {
    const [liked, setLiked] = useState(false);
    const [saved, setSaved] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleShare = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy URL", err);
        }
    };

    return (
        <div className="mt-16 flex items-center justify-center">
            <div className="flex items-center gap-2 p-2 rounded-full bg-zinc-900/80 backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
                {/* Like Button */}
                <button
                    onClick={() => setLiked(!liked)}
                    className={`relative p-3 rounded-full transition-colors flex items-center justify-center w-11 h-11 ${liked ? "text-pink-500 bg-pink-500/10 hover:bg-pink-500/20" : "text-zinc-400 hover:bg-white/10 hover:text-white"
                        }`}
                    title="Like"
                >
                    <AnimatePresence mode="wait" initial={false}>
                        <motion.div
                            key={liked ? "liked" : "unliked"}
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.5, opacity: 0 }}
                            transition={{ duration: 0.15 }}
                        >
                            <Heart size={20} className={liked ? "fill-pink-500" : ""} />
                        </motion.div>
                    </AnimatePresence>
                </button>

                <div className="w-px h-6 bg-white/10 mx-1" />

                {/* Save Button */}
                <button
                    onClick={() => setSaved(!saved)}
                    className={`relative p-3 rounded-full transition-colors flex items-center justify-center w-11 h-11 ${saved ? "text-indigo-400 bg-indigo-400/10 hover:bg-indigo-400/20" : "text-zinc-400 hover:bg-white/10 hover:text-white"
                        }`}
                    title="Save"
                >
                    <AnimatePresence mode="wait" initial={false}>
                        <motion.div
                            key={saved ? "saved" : "unsaved"}
                            initial={{ scale: 0.5, opacity: 0, rotate: saved ? 10 : -10 }}
                            animate={{ scale: 1, opacity: 1, rotate: 0 }}
                            exit={{ scale: 0.5, opacity: 0 }}
                            transition={{ duration: 0.15 }}
                        >
                            {saved ? <BookmarkCheck size={20} className="fill-indigo-400/20" /> : <BookmarkPlus size={20} />}
                        </motion.div>
                    </AnimatePresence>
                </button>

                <div className="w-px h-6 bg-white/10 mx-1" />

                {/* Share Button */}
                <button
                    onClick={handleShare}
                    className={`relative p-3 rounded-full transition-colors flex items-center justify-center w-11 h-11 ${copied ? "text-emerald-400 bg-emerald-400/10 hover:bg-emerald-400/20" : "text-zinc-400 hover:bg-white/10 hover:text-white"
                        }`}
                    title="Copy Link"
                >
                    <AnimatePresence mode="wait" initial={false}>
                        <motion.div
                            key={copied ? "copied" : "share"}
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.5, opacity: 0 }}
                            transition={{ duration: 0.15 }}
                        >
                            {copied ? <Check size={20} /> : <Share2 size={20} />}
                        </motion.div>
                    </AnimatePresence>
                </button>
            </div>
        </div>
    );
}

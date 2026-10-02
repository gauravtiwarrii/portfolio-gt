"use client";

import { useState } from "react";
import { BookmarkCheck, BookmarkPlus, Check, Heart, Share2 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function ActionBar() {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy URL", error);
    }
  }

  return (
    <div className="article-actionbar">
      <p className="article-actionbar__label">End of note / keep for later</p>
      <div className="article-actionbar__controls">
        <button
          type="button"
          onClick={() => setLiked((value) => !value)}
          className="article-action"
          aria-label={liked ? "Unlike article" : "Like article"}
          aria-pressed={liked}
          title={liked ? "Unlike article" : "Like article"}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span key={String(liked)} initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.7, opacity: 0 }} transition={{ duration: 0.16 }}>
              <Heart size={18} fill={liked ? "currentColor" : "none"} />
            </motion.span>
          </AnimatePresence>
        </button>
        <button
          type="button"
          onClick={() => setSaved((value) => !value)}
          className="article-action"
          aria-label={saved ? "Remove saved article" : "Save article"}
          aria-pressed={saved}
          title={saved ? "Remove saved article" : "Save article"}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span key={String(saved)} initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.7, opacity: 0 }} transition={{ duration: 0.16 }}>
              {saved ? <BookmarkCheck size={18} /> : <BookmarkPlus size={18} />}
            </motion.span>
          </AnimatePresence>
        </button>
        <button
          type="button"
          onClick={handleShare}
          className="article-action"
          data-state={copied ? "copied" : undefined}
          aria-label={copied ? "Link copied" : "Copy article link"}
          title={copied ? "Link copied" : "Copy article link"}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span key={String(copied)} initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.7, opacity: 0 }} transition={{ duration: 0.16 }}>
              {copied ? <Check size={18} /> : <Share2 size={18} />}
            </motion.span>
          </AnimatePresence>
        </button>
        <span className="sr-only" aria-live="polite">{copied ? "Link copied" : ""}</span>
      </div>
    </div>
  );
}
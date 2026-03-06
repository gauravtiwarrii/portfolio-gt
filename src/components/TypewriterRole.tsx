"use client";

import { useEffect, useState } from "react";

const ROLES = [
    "Data Engineer",
    "Pipeline Architect",
    "ML Practitioner",
    "Cloud Native Dev",
    "Analytics Engineer",
];

export function useTypewriter(words: string[], speed = 80, pause = 1800) {
    const [index, setIndex] = useState(0);
    const [subIndex, setSubIndex] = useState(0);
    const [deleting, setDeleting] = useState(false);
    const [blink, setBlink] = useState(true);

    // cursor blink
    useEffect(() => {
        const id = setInterval(() => setBlink(v => !v), 530);
        return () => clearInterval(id);
    }, []);

    useEffect(() => {
        if (subIndex === words[index].length + 1 && !deleting) {
            const id = setTimeout(() => setDeleting(true), pause);
            return () => clearTimeout(id);
        }
        if (subIndex === 0 && deleting) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setDeleting(false);
             
            setIndex(i => (i + 1) % words.length);
            return;
        }
        const id = setTimeout(
            () => setSubIndex(s => s + (deleting ? -1 : 1)),
            deleting ? speed / 2 : speed
        );
        return () => clearTimeout(id);
    }, [subIndex, index, deleting, words, speed, pause]);

    return {
        text: words[index].substring(0, subIndex),
        cursor: blink ? "|" : " ",
    };
}

export default function TypewriterRole() {
    const { text, cursor } = useTypewriter(ROLES);
    return (
        <span className="font-mono text-sm md:text-base tracking-[0.3em] text-zinc-400 uppercase select-none">
            {text}
            <span className="text-indigo-400 font-bold">{cursor}</span>
        </span>
    );
}

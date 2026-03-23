"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Terminal as TerminalIcon } from "lucide-react";
import Link from "next/link";

interface TerminalLine {
    id: string;
    type: "input" | "output" | "system" | "error";
    content: string | React.ReactNode;
}

const ASCIILogo = `
  ____                                _____ _                 _ 
 / ___| __ _ _   _ _ __ __ ___   __  |_   _(_)__      ____ _ _ __(_)
| |  _ / _\` | | | | '__/ _\` \\ \\ / /    | | | |\\ \\ /\\ / / _\` | '__| |
| |_| | (_| | |_| | | | (_| |\\ V /     | | | | \\ V  V / (_| | |  | |
 \\____|\\__,_|\\__,_|_|  \\__,_| \\_/      |_| |_|  \\_/\\_/ \\__,_|_|  |_|
                                                                    
`;

export default function TerminalPage() {
    const router = useRouter();
    const [lines, setLines] = useState<TerminalLine[]>([
        { id: "1", type: "system", content: ASCIILogo },
        { id: "2", type: "system", content: "Welcome to GauravOS v1.0.0" },
        { id: "3", type: "system", content: "Type 'help' to see available commands." },
    ]);
    const [currentInput, setCurrentInput] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);

    // Focus input automatically
    useEffect(() => {
        const focusInput = () => inputRef.current?.focus();
        document.addEventListener("click", focusInput);
        focusInput();
        return () => document.removeEventListener("click", focusInput);
    }, []);

    // Scroll to bottom when lines change
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [lines]);

    const handleCommand = (cmd: string) => {
        const trimmedCmd = cmd.trim().toLowerCase();
        const newLines: TerminalLine[] = [];

        switch (trimmedCmd) {
            case "help":
                newLines.push({
                    id: Date.now().toString() + "-1",
                    type: "output",
                    content: (
                        <div className="grid grid-cols-[120px_1fr] gap-2">
                            <span className="text-cyan-400">whoami</span><span>Display personal information</span>
                            <span className="text-cyan-400">skills</span><span>List technical expertise</span>
                            <span className="text-cyan-400">cat resume.txt</span><span>Output professional experience</span>
                            <span className="text-cyan-400">projects</span><span>View featured builds</span>
                            <span className="text-cyan-400">clear</span><span>Clear the terminal screen</span>
                            <span className="text-cyan-400">gui</span><span>Exit to the standard graphical user interface</span>
                        </div>
                    )
                });
                break;
            case "whoami":
                newLines.push({
                    id: Date.now().toString() + "-1",
                    type: "output",
                    content: "Gaurav Tiwari — Data Engineer & System Architect.\nBuilding scalable data pipelines and advanced analytical systems."
                });
                break;
            case "skills":
                newLines.push({
                    id: Date.now().toString() + "-1",
                    type: "output",
                    content: (
                        <div>
                            <div className="mb-2"><span className="text-pink-400 font-bold">Languages:</span> Python, SQL, TypeScript, Java, C++</div>
                            <div className="mb-2"><span className="text-pink-400 font-bold">Data Eng:</span> PySpark, Pandas, Hadoop, Kafka, Airflow</div>
                            <div className="mb-2"><span className="text-pink-400 font-bold">Cloud:</span> AWS (S3, EMR, Redshift, EC2), Azure</div>
                            <div><span className="text-pink-400 font-bold">Web/Tools:</span> Next.js, React, Node.js, Git, Docker</div>
                        </div>
                    )
                });
                break;
            case "cat resume.txt":
                newLines.push({
                    id: Date.now().toString() + "-1",
                    type: "output",
                    content: (
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-emerald-400 font-bold underline">Data Engineer @ TechCorp</h3>
                                <p className="text-zinc-400 text-sm mb-1">2022 - Present</p>
                                <ul className="list-disc list-inside text-zinc-300">
                                    <li>Architected event-driven pipelines processing 50M+ records daily.</li>
                                    <li>Optimized PySpark jobs reducing AWS EMR costs by 35%.</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-emerald-400 font-bold underline">Junior Data Analyst @ AnalyticsInc</h3>
                                <p className="text-zinc-400 text-sm mb-1">2020 - 2022</p>
                                <ul className="list-disc list-inside text-zinc-300">
                                    <li>Built automated reporting dashboards reducing manual work by hours.</li>
                                </ul>
                            </div>
                        </div>
                    )
                });
                break;
            case "projects":
                newLines.push({
                    id: Date.now().toString() + "-1",
                    type: "output",
                    content: (
                        <div className="space-y-2">
                            <div><Link href="/projects/data-pipeline" className="text-indigo-400 hover:text-indigo-300 hover:underline">[1] Enterprise Real-Time Data Pipeline</Link></div>
                            <div><Link href="/projects/ml-fraud" className="text-indigo-400 hover:text-indigo-300 hover:underline">[2] Financial Fraud Detection Engine</Link></div>
                            <div className="mt-2 text-zinc-500">Type &apos;gui&apos; or click links to view details.</div>
                        </div>
                    )
                });
                break;
            case "gui":
            case "exit":
                newLines.push({ id: Date.now().toString() + "-1", type: "system", content: "Initiating graphical environment jump..." });
                setTimeout(() => {
                    router.push("/");
                }, 1000);
                break;
            case "clear":
                setLines([]);
                return;
            case "":
                break; // Do nothing for empty command
            default:
                newLines.push({
                    id: Date.now().toString() + "-1",
                    type: "error",
                    content: `Command not found: ${trimmedCmd}. Type 'help' for a list of commands.`
                });
        }

        setLines(prev => [
            ...prev,
            { id: Date.now().toString() + "-0", type: "input", content: `guest@gaurav.dev:~$ ${cmd}` },
            ...newLines
        ]);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleCommand(currentInput);
            setCurrentInput("");
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] text-emerald-500 p-4 sm:p-8 font-mono overflow-y-auto selection:bg-emerald-500/30 selection:text-emerald-100 flex flex-col justify-between">

            {/* Ambient subtle glow */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-emerald-900/5 blur-[150px] rounded-full" />
            </div>

            {/* CRT overlay effect */}
            <div className="fixed inset-0 pointer-events-none z-50 opacity-10 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)0%,rgba(0,0,0,1)100%)] mix-blend-overlay" />
            <div className="fixed inset-0 pointer-events-none z-50 opacity-5"
                style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, #fff 2px, #fff 4px)" }} />

            <main className="relative z-10 max-w-4xl mx-auto w-full flex-grow">
                {/* Header Navbar */}
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-emerald-500/20 text-emerald-600">
                    <div className="flex items-center gap-2">
                        <TerminalIcon size={16} />
                        <span className="text-xs uppercase tracking-widest">GauravOS Mainframe</span>
                    </div>
                    <div>
                        <Link href="/" className="text-xs hover:text-emerald-400 transition-colors uppercase tracking-widest">[ Return to GUI ]</Link>
                    </div>
                </div>

                {/* Terminal Output */}
                <div className="space-y-3 whitespace-pre-wrap break-words">
                    {lines.map((line) => (
                        <div key={line.id} className={
                            line.type === "system" ? "text-zinc-500" :
                                line.type === "error" ? "text-red-400" :
                                    line.type === "input" ? "text-zinc-300" :
                                        "text-emerald-400"
                        }>
                            {line.content}
                        </div>
                    ))}

                    {/* Active Input Line */}
                    <div className="flex items-center text-zinc-300 mt-2">
                        <span className="shrink-0 mr-2 text-emerald-500 font-bold">guest@gaurav.dev:~$</span>
                        <input
                            ref={inputRef}
                            type="text"
                            value={currentInput}
                            onChange={(e) => setCurrentInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="bg-transparent border-none outline-none w-full text-zinc-300 focus:ring-0 p-0"
                            autoComplete="off"
                            spellCheck="false"
                            autoFocus
                        />
                    </div>
                    {/* Invisible div to scroll to bottom */}
                    <div ref={bottomRef} className="h-4" />
                </div>
            </main>
        </div>
    );
}

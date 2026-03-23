"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Terminal } from "lucide-react";

const navItems = [
    { name: "home", path: "/" },
    { name: "projects", path: "/projects" },
    { name: "about", path: "/about" },
];

export default function Navbar() {
    const pathname = usePathname();
    const [time, setTime] = useState("");
    const [cpu, setCpu] = useState("12%");

    useEffect(() => {
        const updateStuff = () => {
            const now = new Date();
            setTime(now.toLocaleTimeString('en-US', { hour12: false }));
            setCpu(Math.floor(Math.random() * 20 + 5) + "%");
        };
        updateStuff();
        const interval = setInterval(updateStuff, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <nav className="fixed top-0 left-0 right-0 z-[100] w-full bg-black/80 backdrop-blur-md border-b border-teal-500/20 px-4 py-2 flex items-center justify-between font-mono text-xs text-zinc-400 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
            {/* Left: Branding & Status */}
            <div className="flex items-center gap-4">
                <Link href="/" className="flex items-center gap-2 text-teal-400 hover:text-white transition-colors group">
                    <Terminal size={14} className="group-hover:animate-pulse" />
                    <span className="font-bold tracking-tight">GT_OS v2.0</span>
                </Link>
                <div className="hidden sm:flex items-center gap-2 px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.05]">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.8)]"></div>
                    <span className="text-[10px] uppercase text-zinc-500 tracking-wider">System Online</span>
                </div>
            </div>

            {/* Center: Navigation Links */}
            <div className="hidden md:flex items-center justify-center gap-6 absolute left-1/2 -translate-x-1/2">
                {navItems.map((item) => {
                    const isActive = pathname === item.path;
                    return (
                        <Link 
                            key={item.path} 
                            href={item.path}
                            className={`group flex items-center transition-all ${isActive ? 'text-teal-400 font-bold' : 'text-zinc-500 hover:text-teal-300'}`}
                        >
                            <span className={`mr-1 text-teal-500/50 opacity-0 group-hover:opacity-100 transition-opacity ${isActive ? 'opacity-100' : ''}`}>{`[`}</span>
                            {item.name}
                            <span className={`ml-1 text-teal-500/50 opacity-0 group-hover:opacity-100 transition-opacity ${isActive ? 'opacity-100' : ''}`}>{`]`}</span>
                        </Link>
                    )
                })}
            </div>

            {/* Right: Telemetry & Contact */}
            <div className="flex items-center gap-4">
                <div className="hidden lg:flex items-center gap-4 text-[10px] text-zinc-500 bg-white/[0.02] px-3 py-1 rounded border border-white/[0.05]">
                    <div className="tracking-widest">CPU: <span className="text-teal-400/80">{cpu}</span></div>
                    <div className="tracking-widest">MEM: <span className="text-teal-400/80">4.2GB</span></div>
                    <div className="tracking-widest">NET: <span className="text-teal-400/80">14ms</span></div>
                    <div className="tracking-widest w-16">TME: <span className="text-zinc-300">{time}</span></div>
                </div>
                <Link
                    href="/contact"
                    className="px-3 py-1 bg-teal-500/10 border border-teal-500/30 text-teal-400 rounded hover:bg-teal-400 hover:text-black transition-all font-semibold uppercase tracking-wider shadow-[0_0_10px_rgba(45,212,191,0.1)] hover:shadow-[0_0_15px_rgba(45,212,191,0.4)]"
                >
                    INIT_CONTACT
                </Link>
            </div>
        </nav>
    );
}

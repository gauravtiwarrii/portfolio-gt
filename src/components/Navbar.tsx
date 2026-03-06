"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Home, User, Code, Mail, BookOpen, Search } from "lucide-react";
import styles from "./Navbar.module.css";
import MagneticButton from "./MagneticButton";

const navItems = [
    { name: "Home", path: "/", icon: <Home size={20} /> },
    { name: "Projects", path: "/projects", icon: <Code size={20} /> },
    { name: "About", path: "/about", icon: <User size={20} /> },
    { name: "Blog", path: "/#blog", icon: <BookOpen size={20} /> },
    { name: "Contact", path: "/contact", icon: <Mail size={20} /> },
];

export default function Navbar() {
    const pathname = usePathname();

    return (
        <motion.nav
            className={styles.navbar}
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            <div className={styles.container}>
                {navItems.map((item) => {
                    const isActive = pathname === item.path;
                    return (
                        <Link key={item.path} href={item.path} passHref>
                            <div className={styles.navItemWrapper}>
                                <MagneticButton className={`${styles.navItem} ${isActive ? styles.active : ""}`}>
                                    {item.icon}
                                    <span className={styles.label}>{item.name}</span>
                                    {isActive && (
                                        <>
                                            <motion.div
                                                layoutId="dynamicIslandIndicator"
                                                className={styles.activeIndicator}
                                                transition={{ type: "spring", stiffness: 400, damping: 25, mass: 0.8 }}
                                            />
                                            <motion.div
                                                layoutId="activeDotIndicator"
                                                className={styles.activeDot}
                                                transition={{ type: "spring", stiffness: 400, damping: 25, mass: 0.8 }}
                                            />
                                        </>
                                    )}
                                </MagneticButton>
                            </div>
                        </Link>
                    );
                })}

                {/* Command Palette Trigger */}
                <div className={styles.navItemWrapper}>
                    <button
                        className={`${styles.navItem} hover:bg-white/5`}
                        onClick={() => window.dispatchEvent(new Event("open-command-palette"))}
                    >
                        <Search size={18} />
                        <span className={styles.label}>Search</span>
                        <kbd className="hidden sm:inline-block ml-1 px-1.5 py-0.5 text-[10px] font-mono bg-white/10 rounded border border-white/10 text-zinc-400">⌘K</kbd>
                    </button>
                </div>
            </div>
        </motion.nav>
    );
}

"use client";

import { motion } from "framer-motion";
import styles from "./GlassCard.module.css";
import { ReactNode } from "react";

interface GlassCardProps {
    children: ReactNode;
    className?: string;
    onClick?: () => void;
}

export default function GlassCard({ children, className = "", onClick }: GlassCardProps) {
    return (
        <motion.div
            className={`${styles.card} ${className}`}
            onClick={onClick}
            whileHover={{ scale: 1.02, boxShadow: "0 8px 32px 0 rgba(0, 123, 255, 0.2)" }}
            transition={{ type: "spring", stiffness: 300 }}
        >
            {children}
        </motion.div>
    );
}

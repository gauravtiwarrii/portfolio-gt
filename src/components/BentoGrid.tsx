import styles from "./BentoGrid.module.css";
import { ReactNode } from "react";

interface BentoGridProps {
    children: ReactNode;
    className?: string;
}

export default function BentoGrid({ children, className = "" }: BentoGridProps) {
    return (
        <div className={`${styles.grid} ${className}`}>
            {children}
        </div>
    );
}

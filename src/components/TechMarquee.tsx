"use client";

import styles from "./TechMarquee.module.css";
import {
    SiPython, SiApachespark, SiApachekafka, SiAmazon, SiSnowflake,
    SiDocker, SiKubernetes, SiApacheairflow, SiReact, SiNextdotjs,
    SiTypescript, SiTerraform, SiDbt, SiPostgresql, SiMongodb
} from "react-icons/si";

const technologies = [
    { name: "Python", icon: SiPython, color: "#3776AB" },
    { name: "Spark", icon: SiApachespark, color: "#E25A1C" },
    { name: "Kafka", icon: SiApachekafka, color: "#231F20" },
    { name: "AWS", icon: SiAmazon, color: "#232F3E" },
    { name: "Snowflake", icon: SiSnowflake, color: "#29B5E8" },
    { name: "Docker", icon: SiDocker, color: "#2496ED" },
    { name: "K8s", icon: SiKubernetes, color: "#326CE5" },
    { name: "Airflow", icon: SiApacheairflow, color: "#017CEE" },
    { name: "React", icon: SiReact, color: "#61DAFB" },
    { name: "Next.js", icon: SiNextdotjs, color: "#000000" },
    { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
    { name: "Terraform", icon: SiTerraform, color: "#7B42BC" },
    { name: "dbt", icon: SiDbt, color: "#FF694B" },
    { name: "Postgres", icon: SiPostgresql, color: "#4169E1" },
    { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
];

export default function TechMarquee() {
    return (
        <div className={styles.marqueeContainer}>
            <div className={styles.marqueeContent}>
                {technologies.map((tech, index) => (
                    <div key={index} className={styles.techItem}>
                        <tech.icon size={24} className={styles.techIcon} style={{ color: tech.color }} />
                        <span>{tech.name}</span>
                    </div>
                ))}
                {/* Duplicate for infinite loop */}
                {technologies.map((tech, index) => (
                    <div key={`dup-${index}`} className={styles.techItem}>
                        <tech.icon size={24} className={styles.techIcon} style={{ color: tech.color }} />
                        <span>{tech.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

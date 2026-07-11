"use client";

import { useEffect, useRef } from "react";

const TECH_WORDS = [
  "Python", "Kafka", "Spark", "Docker", "AWS", "SQL", "Airflow", "Snowflake",
  "S3", "ETL", "dbt", "PySpark", "Redshift", "Lambda", "EC2", "RDS",
  "BigQuery", "Pandas", "NumPy", "Flask", "API", "DAG", "HDFS", "IAM",
  "PostgreSQL", "MongoDB", "React", "TypeScript", "Node.js", "Git",
  "def", "class", "import", "return", "async", "await", "SELECT", "FROM",
  "WHERE", "JOIN", "INSERT", "CREATE", "DROP", "INDEX", "GROUP BY",
  "pip", "npm", "docker", "kubectl", "terraform", "CI/CD", "JSON",
  "Schema", "Table", "Index", "Query", "Stream", "Batch", "Pipeline",
];

interface Column {
  x: number;
  y: number;
  speed: number;
  chars: string[];
  charIndex: number;
  fontSize: number;
}

export default function CodeRainBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const columnsRef = useRef<Column[]>([]);
  const isVisibleRef = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
      initColumns();
    };

    const initColumns = () => {
      const fontSize = 13;
      const cols = Math.floor(w / (fontSize * 5)); // Sparse columns
      columnsRef.current = [];

      for (let i = 0; i < cols; i++) {
        const word = TECH_WORDS[Math.floor(Math.random() * TECH_WORDS.length)];
        columnsRef.current.push({
          x: Math.random() * w,
          y: Math.random() * h - h,
          speed: 0.3 + Math.random() * 0.8,
          chars: word.split(""),
          charIndex: 0,
          fontSize,
        });
      }
    };

    resize();
    window.addEventListener("resize", resize);

    // IntersectionObserver to pause when not visible
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    observer.observe(canvas);

    // Get primary color from CSS variable
    const getColor = () => {
      const style = getComputedStyle(document.documentElement);
      return style.getPropertyValue("--gt-primary").trim() || "#00F5D4";
    };

    const draw = () => {
      if (!isVisibleRef.current) {
        animRef.current = requestAnimationFrame(draw);
        return;
      }

      ctx.fillStyle = "rgba(5, 5, 5, 0.08)";
      ctx.fillRect(0, 0, w, h);

      const primaryColor = getColor();

      columnsRef.current.forEach((col) => {
        const char = col.chars[col.charIndex % col.chars.length];

        // Lead character — bright
        ctx.font = `${col.fontSize}px "JetBrains Mono", monospace`;
        ctx.fillStyle = primaryColor;
        ctx.globalAlpha = 0.6;
        ctx.fillText(char, col.x, col.y);

        // Trail characters — faded
        for (let t = 1; t < 6; t++) {
          const trailChar = col.chars[(col.charIndex - t + col.chars.length) % col.chars.length];
          ctx.globalAlpha = Math.max(0, 0.4 - t * 0.08);
          ctx.fillText(trailChar, col.x, col.y - t * col.fontSize * 1.2);
        }

        ctx.globalAlpha = 1;

        col.y += col.speed;
        col.charIndex++;

        // Reset when off screen
        if (col.y > h + 100) {
          const word = TECH_WORDS[Math.floor(Math.random() * TECH_WORDS.length)];
          col.y = -50;
          col.x = Math.random() * w;
          col.chars = word.split("");
          col.charIndex = 0;
          col.speed = 0.3 + Math.random() * 0.8;
        }
      });

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{
        opacity: 0.12,
        mixBlendMode: "screen",
        maskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)",
        WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)",
      }}
      aria-hidden="true"
    />
  );
}

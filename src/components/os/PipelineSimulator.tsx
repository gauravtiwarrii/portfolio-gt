"use client";

import { useEffect, useState, useRef } from "react";
import { useSound } from "@/components/effects/useSound";
import { Play, Pause, AlertTriangle, Cpu } from "lucide-react";

const KafkaIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" fill="#10B981" />
    <path d="M12 7V17M12 17L8 13M12 17L16 13" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SparkIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" fill="#EF4444" />
    <path d="M13 3L5 12H12L11 21L19 12H12L13 3Z" fill="white" />
  </svg>
);

const SnowflakeIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2V22M2 12H22M12 12L5 5M12 12L19 19M12 12L5 19M12 12L19 5" stroke="#22D3EE" strokeWidth="2" strokeLinecap="round" />
    <path d="M12 5L9 8M12 5L15 8M12 19L9 16M12 19L15 16M5 12L8 9M5 12L8 15M22 12L19 9M22 12L19 15" stroke="#22D3EE" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export default function PipelineSimulator() {
  const { playWarning } = useSound();
  
  const [ingressRate, setIngressRate] = useState(5000); // events / min
  const [partitions, setPartitions] = useState(4); // Spark executors
  const [queueSize, setQueueSize] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const [logs, setLogs] = useState<string[]>([
    "[SYSTEM] Ingest queue initialized.",
    "[SYSTEM] Broker cluster reached state ACTIVE.",
  ]);
  
  const logContainerRef = useRef<HTMLDivElement | null>(null);

  // Compute metrics
  const processingCapacity = partitions * 1000; // max events / min processed
  const netRate = ingressRate - processingCapacity;
  const isAccumulating = netRate > 0;
  
  const latency = queueSize > 0 
    ? (queueSize / processingCapacity) * 60 + 1.2 
    : (ingressRate / Math.max(1, processingCapacity)) * 0.8 + 0.4;
    
  const backpressure = queueSize > 300 
    ? "CRITICAL" 
    : queueSize > 50 
    ? "WARNING" 
    : "NOMINAL";

  // Telemetry loop
  useEffect(() => {
    if (!isRunning) return;
    
    const interval = setInterval(() => {
      setQueueSize((prev) => {
        if (isAccumulating) {
          // Accumulate queue
          const increment = Math.round(netRate / 12); // updated every 5s
          return Math.min(1000, prev + increment);
        } else {
          // Empty queue
          const decrement = Math.round(Math.abs(netRate) / 12);
          return Math.max(0, prev - decrement);
        }
      });

      // Append mock logs based on system state
      setLogs((prev) => {
        const timestamp = new Date().toISOString().split("T")[1].slice(0, 8);
        const newLogs = [...prev];
        
        if (isAccumulating) {
          newLogs.push(`[${timestamp}] [WARN] Ingest rate (${ingressRate}/m) exceeds capacity (${processingCapacity}/m).`);
          newLogs.push(`[${timestamp}] [WARN] Buffer backlog accumulating. Queue size: ${queueSize + Math.round(netRate / 12)} events.`);
        } else {
          newLogs.push(`[${timestamp}] [INFO] Processing micro-batch. Spark partition offset synced.`);
          if (queueSize > 0) {
            newLogs.push(`[${timestamp}] [INFO] Clearing backlog. Active queue draining.`);
          }
        }
        
        // Randomly inject broker/offset offsets
        if (Math.random() > 0.6) {
          const randPart = Math.floor(Math.random() * partitions);
          newLogs.push(`[${timestamp}] [INFO] Kafka Partition ${randPart} rebalance offset commit [SUCCESS].`);
        }
        
        return newLogs.slice(-40); // keep last 40 lines
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [isRunning, ingressRate, partitions, isAccumulating, netRate, processingCapacity, queueSize]);

  // Handle critical sound alert
  useEffect(() => {
    if (!isRunning || backpressure !== "CRITICAL") return;
    
    // Play warning tone every 6 seconds on critical backpressure
    const warningInterval = setInterval(() => {
      playWarning();
    }, 6000);
    
    return () => clearInterval(warningInterval);
  }, [isRunning, backpressure, playWarning]);

  // Auto-scroll logs
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="p-5 font-mono text-xs select-none flex flex-col h-full bg-[#050505] text-[var(--gt-fg)]">
      {/* Simulation Controls Header */}
      <div className="flex items-center justify-between border border-[var(--gt-border)] p-3 rounded-lg bg-[var(--gt-surface)] mb-4">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsRunning(!isRunning)}
            className="w-8 h-8 rounded-full border flex items-center justify-center transition-all bg-zinc-900 border-zinc-700 hover:border-[var(--gt-primary)]"
            style={{ color: isRunning ? "var(--gt-warning)" : "var(--gt-primary)" }}
            aria-label={isRunning ? "Pause simulation" : "Play simulation"}
          >
            {isRunning ? <Pause size={12} /> : <Play size={12} />}
          </button>
          <span className="font-bold uppercase tracking-wider text-[10px]">
            Pipeline Engine: <span style={{ color: isRunning ? "var(--gt-primary)" : "var(--gt-muted-fg)" }}>{isRunning ? "ACTIVE" : "PAUSED"}</span>
          </span>
        </div>

        {/* Backpressure Badge */}
        <div className="flex items-center gap-2">
          {backpressure !== "NOMINAL" && <AlertTriangle size={14} className={backpressure === "CRITICAL" ? "text-red-500 animate-bounce" : "text-yellow-500"} />}
          <span 
            className="px-2 py-0.5 rounded font-bold uppercase text-[9px] border"
            style={{ 
              background: backpressure === "CRITICAL" ? "rgba(239, 68, 68, 0.15)" : backpressure === "WARNING" ? "rgba(234, 179, 8, 0.15)" : "rgba(34, 197, 94, 0.15)",
              borderColor: backpressure === "CRITICAL" ? "rgb(239, 68, 68)" : backpressure === "WARNING" ? "rgb(234, 179, 8)" : "rgb(34, 197, 94)",
              color: backpressure === "CRITICAL" ? "rgb(239, 68, 68)" : backpressure === "WARNING" ? "rgb(234, 179, 8)" : "rgb(34, 197, 94)"
            }}
          >
            BACKPRESSURE: {backpressure}
          </span>
        </div>
      </div>

      {/* Control Sliders & Gauges */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {/* Sliders Area */}
        <div className="md:col-span-2 border border-[var(--gt-border)] p-4 rounded-lg bg-[var(--gt-surface)] space-y-4">
          {/* Ingress Rate Slider */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[10px] uppercase">Ingress Ingestion Rate</span>
              <span className="font-bold" style={{ color: "var(--gt-primary)" }}>{ingressRate.toLocaleString()} msg/min</span>
            </div>
            <input 
              type="range" 
              min={1000} 
              max={10000} 
              step={500}
              value={ingressRate}
              onChange={(e) => setIngressRate(Number(e.target.value))}
              disabled={!isRunning}
              className="w-full h-1 rounded-lg bg-zinc-800 accent-[var(--gt-primary)] cursor-pointer"
            />
          </div>

          {/* Spark partitions slider */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[10px] uppercase">Spark Exec / Kafka Partitions</span>
              <span className="font-bold" style={{ color: "var(--gt-primary)" }}>{partitions} Cores</span>
            </div>
            <input 
              type="range" 
              min={1} 
              max={10} 
              step={1}
              value={partitions}
              onChange={(e) => setPartitions(Number(e.target.value))}
              disabled={!isRunning}
              className="w-full h-1 rounded-lg bg-zinc-800 accent-[var(--gt-primary)] cursor-pointer"
            />
          </div>
        </div>

        {/* Real-time Telemetry Stats */}
        <div className="border border-[var(--gt-border)] p-4 rounded-lg bg-[var(--gt-surface)] flex flex-col justify-between gap-2">
          <div className="flex items-center justify-between text-[11px] pb-1 border-b border-zinc-800">
            <span>Buffer Backlog:</span>
            <span className="font-bold" style={{ color: queueSize > 200 ? "rgb(239,68,68)" : "var(--gt-primary)" }}>{queueSize} events</span>
          </div>
          <div className="flex items-center justify-between text-[11px] pb-1 border-b border-zinc-800">
            <span>Stream Capacity:</span>
            <span className="font-bold">{processingCapacity.toLocaleString()} msg/min</span>
          </div>
          <div className="flex items-center justify-between text-[11px]">
            <span>End-to-End Lag:</span>
            <span className="font-bold" style={{ color: latency > 5 ? "rgb(234,179,8)" : "var(--gt-primary)" }}>{latency.toFixed(2)}s</span>
          </div>
        </div>
      </div>

      {/* Visual Pipeline Flow */}
      <div className="border border-[var(--gt-border)] p-4 rounded-lg bg-[var(--gt-surface)] mb-4 flex items-center justify-between gap-2 overflow-x-auto min-h-[90px]">
        {/* Node 1: Kafka */}
        <div className="flex flex-col items-center flex-shrink-0 text-center w-16">
          <div 
            className="w-8 h-8 rounded-full border flex items-center justify-center mb-1 font-bold text-xs"
            style={{ 
              borderColor: "var(--gt-primary)", 
              background: "color-mix(in srgb, var(--gt-primary) 10%, transparent)",
              boxShadow: "0 0 10px var(--gt-glow)"
            }}
          >
            <KafkaIcon />
          </div>
          <span className="text-[9px] font-bold">Kafka</span>
        </div>

        {/* Connector line 1 */}
        <div className="flex-1 relative h-0.5 min-w-[30px] bg-zinc-800 overflow-hidden">
          <div 
            className="absolute top-0 bottom-0 left-0 right-0 animate-pulse bg-gradient-to-r from-[var(--gt-primary)] to-transparent" 
            style={{ animationDuration: "1s" }}
          />
        </div>

        {/* Node 2: Spark */}
        <div className="flex flex-col items-center flex-shrink-0 text-center w-16">
          <div 
            className={`w-8 h-8 rounded-full border flex items-center justify-center mb-1 font-bold text-xs transition-all ${backpressure === "CRITICAL" ? "animate-pulse" : ""}`}
            style={{ 
              borderColor: backpressure === "CRITICAL" ? "rgb(239,68,68)" : backpressure === "WARNING" ? "rgb(234,179,8)" : "var(--gt-primary)",
              background: backpressure === "CRITICAL" ? "rgba(239,68,68,0.15)" : backpressure === "WARNING" ? "rgba(234,179,8,0.15)" : "color-mix(in srgb, var(--gt-primary) 10%, transparent)",
              boxShadow: backpressure === "CRITICAL" ? "0 0 15px rgba(239,68,68,0.4)" : "none"
            }}
          >
            <SparkIcon />
          </div>
          <span className="text-[9px] font-bold">Spark</span>
        </div>

        {/* Connector line 2 */}
        <div className="flex-1 relative h-0.5 min-w-[30px] bg-zinc-800 overflow-hidden">
          <div 
            className="absolute top-0 bottom-0 left-0 right-0 animate-pulse bg-gradient-to-r from-[var(--gt-primary)] to-transparent" 
            style={{ animationDuration: "1.2s" }}
          />
        </div>

        {/* Node 3: Snowflake */}
        <div className="flex flex-col items-center flex-shrink-0 text-center w-16">
          <div 
            className="w-8 h-8 rounded-full border flex items-center justify-center mb-1 font-bold text-xs"
            style={{ 
              borderColor: "var(--gt-primary)", 
              background: "color-mix(in srgb, var(--gt-primary) 10%, transparent)",
            }}
          >
            <SnowflakeIcon />
          </div>
          <span className="text-[9px] font-bold">Snowflake</span>
        </div>
      </div>

      {/* Real-time Logs Console */}
      <div className="flex-1 border border-[var(--gt-border)] rounded-lg overflow-hidden flex flex-col bg-black">
        <div className="bg-zinc-950 px-4 py-1.5 border-b border-[var(--gt-border)] font-bold text-[9px] uppercase tracking-wider text-zinc-500">
          Uplink Ingestion Log Feed
        </div>
        <div 
          ref={logContainerRef}
          className="flex-1 p-3 overflow-y-auto font-mono text-[10px] leading-relaxed text-zinc-400 space-y-1 select-text max-h-[140px] md:max-h-none"
        >
          {logs.map((log, i) => (
            <div 
              key={i} 
              className={log.includes("[WARN]") ? "text-yellow-500 font-bold" : log.includes("[SYSTEM]") ? "text-cyan-400 font-bold" : ""}
            >
              {log}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

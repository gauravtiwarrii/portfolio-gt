"use client";

/* eslint-disable react-hooks/purity */

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// ─── Floating particle constellation ─────────────────────────────────────────
function Particles() {
    const ref = useRef<THREE.Points>(null);
    // Reduce particle count on narrow screens for performance
    const count = typeof window !== "undefined" && window.innerWidth < 768 ? 600 : 1800;

    const { positions, velocities } = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const velocities = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            const i3 = i * 3;
            positions[i3] = (Math.random() - 0.5) * 40;
            positions[i3 + 1] = (Math.random() - 0.5) * 22;
            positions[i3 + 2] = (Math.random() - 0.5) * 10;
            velocities[i3] = (Math.random() - 0.5) * 0.008;
            velocities[i3 + 1] = (Math.random() - 0.5) * 0.005;
            velocities[i3 + 2] = 0;
        }
        return { positions, velocities };
    }, [count]);

    const { pointer } = useThree();

    useFrame(() => {
        if (!ref.current) return;

        // Gentle parallax based on mouse
        ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, (pointer.x * Math.PI) / 20, 0.05);
        ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, -(pointer.y * Math.PI) / 20, 0.05);

        const pos = ref.current.geometry.attributes.position.array as Float32Array;
        for (let i = 0; i < count; i++) {
            const i3 = i * 3;
            pos[i3] += velocities[i3];
            pos[i3 + 1] += velocities[i3 + 1];
            // wrap around edges
            if (pos[i3] > 20) pos[i3] = -20;
            if (pos[i3] < -20) pos[i3] = 20;
            if (pos[i3 + 1] > 11) pos[i3 + 1] = -11;
            if (pos[i3 + 1] < -11) pos[i3 + 1] = 11;
        }
        ref.current.geometry.attributes.position.needsUpdate = true;
    });

    return (
        <points ref={ref}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" args={[positions, 3]} />
            </bufferGeometry>
            <pointsMaterial
                size={0.045}
                color="#a0b4ff"
                transparent
                opacity={0.55}
                sizeAttenuation
                depthWrite={false}
            />
        </points>
    );
}

// ─── Main export ──────────────────────────────────────────────────────────────
export default function NebulaBackground() {
    return (
        <div
            aria-hidden
            style={{
                position: "fixed",
                inset: 0,
                zIndex: -1,
                pointerEvents: "none",
                overflow: "hidden",
                background: "#03030a",
            }}
        >
            {/* ── Layer 1: CSS animated gradient orbs ──────────────────────── */}
            <div className="nebula-orbs" />

            {/* ── Layer 2: Three.js particle field (transparent bg) ─────────── */}
            <Canvas
                camera={{ position: [0, 0, 10], fov: 75 }}
                dpr={[1, 1.5]}
                gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
                style={{
                    position: "absolute",
                    inset: 0,
                    background: "transparent",
                    mixBlendMode: "screen",
                }}
            >
                <Particles />
            </Canvas>

            {/* ── Layer 3: Noise texture overlay ───────────────────────────── */}
            <div className="nebula-noise" />

            {/* ── Inline styles ─────────────────────────────────────────────── */}
            <style>{`
                @keyframes orb1 {
                    0%,100% { transform: translate(0%, 0%)   scale(1);   }
                    33%     { transform: translate(4%, -6%)  scale(1.08); }
                    66%     { transform: translate(-3%, 5%)  scale(0.95); }
                }
                @keyframes orb2 {
                    0%,100% { transform: translate(0%, 0%)  scale(1);   }
                    40%     { transform: translate(-5%, 4%) scale(1.1);  }
                    70%     { transform: translate(3%, -3%) scale(0.92); }
                }
                @keyframes orb3 {
                    0%,100% { transform: translate(0%, 0%)  scale(1);    }
                    25%     { transform: translate(6%, 3%)  scale(1.06); }
                    75%     { transform: translate(-4%, -5%) scale(0.97); }
                }
                @keyframes orb4 {
                    0%,100% { transform: translate(0%, 0%)    scale(1);   }
                    50%     { transform: translate(-6%, -4%)  scale(1.12); }
                }
                @keyframes orb5 {
                    0%,100% { transform: translate(0%, 0%)  scale(1);   }
                    60%     { transform: translate(5%, 6%)  scale(1.08); }
                }

                .nebula-orbs {
                    position: absolute;
                    inset: 0;
                }

                /* Top-left — deep indigo */
                .nebula-orbs::before,
                .nebula-orbs::after {
                    content: '';
                    position: absolute;
                    border-radius: 50%;
                    filter: blur(90px);
                }

                /* Top-left: indigo */
                .nebula-orbs::before {
                    width: 55vw; height: 55vw;
                    left: -15vw; top: -15vw;
                    background: radial-gradient(circle, rgba(80,40,220,0.55) 0%, transparent 70%);
                    animation: orb1 18s ease-in-out infinite;
                }

                /* Bottom-right: teal */
                .nebula-orbs::after {
                    width: 50vw; height: 50vw;
                    right: -12vw; bottom: -12vw;
                    background: radial-gradient(circle, rgba(0,180,160,0.48) 0%, transparent 70%);
                    animation: orb2 22s ease-in-out infinite;
                }

                /* Additional orbs via child pseudo — inject as real divs */
                .nebula-orb-3 {
                    position: absolute;
                    border-radius: 50%;
                    filter: blur(80px);
                    width: 42vw; height: 42vw;
                    right: -8vw; top: -8vw;
                    background: radial-gradient(circle, rgba(20,60,200,0.42) 0%, transparent 70%);
                    animation: orb3 25s ease-in-out infinite;
                }
                .nebula-orb-4 {
                    position: absolute;
                    border-radius: 50%;
                    filter: blur(80px);
                    width: 38vw; height: 38vw;
                    left: -6vw; bottom: -6vw;
                    background: radial-gradient(circle, rgba(140,20,180,0.40) 0%, transparent 70%);
                    animation: orb4 20s ease-in-out infinite;
                }
                .nebula-orb-5 {
                    position: absolute;
                    border-radius: 50%;
                    filter: blur(100px);
                    width: 30vw; height: 30vw;
                    left: 50%; top: 50%;
                    transform: translate(-50%, -50%);
                    background: radial-gradient(circle, rgba(60,10,100,0.28) 0%, transparent 70%);
                    animation: orb5 30s ease-in-out infinite;
                }

                /* Soft centre dimmer — keeps content readable */
                .nebula-centre-dim {
                    position: absolute;
                    inset: 0;
                    background: radial-gradient(
                        ellipse 60% 55% at 50% 45%,
                        rgba(0,0,0,0.50) 0%,
                        transparent 100%
                    );
                    pointer-events: none;
                }

                /* Grain/noise texture */
                .nebula-noise {
                    position: absolute;
                    inset: 0;
                    opacity: 0.035;
                    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
                    background-size: 200px 200px;
                    pointer-events: none;
                }
            `}</style>

            {/* Real DOM orbs for extra colours */}
            <div className="nebula-orb-3" />
            <div className="nebula-orb-4" />
            <div className="nebula-orb-5" />
            <div className="nebula-centre-dim" />
        </div>
    );
}

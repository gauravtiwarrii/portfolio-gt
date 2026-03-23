"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";

// ── Individual Doodle Shape ──────────────────────────────────────────────────
interface DoodleProps {
    position: [number, number, number];
    geometry: "torus" | "octahedron" | "cone" | "torusKnot" | "dodecahedron";
    color: string;
    size: number;
    rotationSpeed: [number, number, number];
    floatSpeed: number;
    floatAmplitude: number;
    scrollFactor: number;
}

function Doodle({
    position,
    geometry,
    color,
    size,
    rotationSpeed,
    floatSpeed,
    floatAmplitude,
    scrollFactor,
}: DoodleProps) {
    const meshRef = useRef<THREE.Mesh>(null);
    const wireRef = useRef<THREE.LineSegments>(null);
    const initialY = useRef(position[1]);

    useFrame((state) => {
        if (!meshRef.current) return;
        const t = state.clock.elapsedTime;

        // Continuous rotation
        meshRef.current.rotation.x += rotationSpeed[0];
        meshRef.current.rotation.y += rotationSpeed[1];
        meshRef.current.rotation.z += rotationSpeed[2];

        // Floating motion
        meshRef.current.position.y =
            initialY.current + Math.sin(t * floatSpeed) * floatAmplitude;
        meshRef.current.position.x =
            position[0] + Math.cos(t * floatSpeed * 0.7) * (floatAmplitude * 0.3);

        // Scroll-linked parallax
        const scrollY = (typeof window !== "undefined" ? window.scrollY : 0) * 0.001;
        meshRef.current.position.y -= scrollY * scrollFactor;

        if (wireRef.current) {
            wireRef.current.rotation.copy(meshRef.current.rotation);
            wireRef.current.position.copy(meshRef.current.position);
        }
    });

    const geo = useMemo(() => {
        switch (geometry) {
            case "torus":
                return new THREE.TorusGeometry(size, size * 0.35, 8, 16);
            case "octahedron":
                return new THREE.OctahedronGeometry(size, 0);
            case "cone":
                return new THREE.ConeGeometry(size, size * 1.6, 6);
            case "torusKnot":
                return new THREE.TorusKnotGeometry(size, size * 0.25, 48, 6, 2, 3);
            case "dodecahedron":
                return new THREE.DodecahedronGeometry(size, 0);
            default:
                return new THREE.OctahedronGeometry(size, 0);
        }
    }, [geometry, size]);

    const wireGeo = useMemo(() => new THREE.WireframeGeometry(geo), [geo]);

    return (
        <group>
            <mesh ref={meshRef} position={position} geometry={geo}>
                <meshBasicMaterial
                    color={color}
                    transparent
                    opacity={0.08}
                    side={THREE.DoubleSide}
                />
            </mesh>
            <lineSegments ref={wireRef} position={position} geometry={wireGeo}>
                <lineBasicMaterial
                    color={color}
                    transparent
                    opacity={0.35}
                    linewidth={1}
                />
            </lineSegments>
        </group>
    );
}

// ── Doodle configurations ────────────────────────────────────────────────────
const DOODLES: DoodleProps[] = [
    {
        position: [-6.5, 3, -2],
        geometry: "torusKnot",
        color: "#a78bfa",
        size: 0.35,
        rotationSpeed: [0.003, 0.005, 0.002],
        floatSpeed: 0.8,
        floatAmplitude: 0.4,
        scrollFactor: 2.5,
    },
    {
        position: [7, -1, -3],
        geometry: "octahedron",
        color: "#38bdf8",
        size: 0.5,
        rotationSpeed: [0.004, 0.003, 0.005],
        floatSpeed: 0.6,
        floatAmplitude: 0.5,
        scrollFactor: 1.8,
    },
    {
        position: [-5, -4, -1],
        geometry: "dodecahedron",
        color: "#f472b6",
        size: 0.4,
        rotationSpeed: [0.002, 0.004, 0.003],
        floatSpeed: 1.0,
        floatAmplitude: 0.3,
        scrollFactor: 3.0,
    },
    {
        position: [5.5, 5, -4],
        geometry: "torus",
        color: "#34d399",
        size: 0.45,
        rotationSpeed: [0.005, 0.002, 0.004],
        floatSpeed: 0.5,
        floatAmplitude: 0.6,
        scrollFactor: 1.5,
    },
    {
        position: [-3, 7, -2],
        geometry: "cone",
        color: "#fbbf24",
        size: 0.35,
        rotationSpeed: [0.003, 0.006, 0.001],
        floatSpeed: 0.9,
        floatAmplitude: 0.35,
        scrollFactor: 2.0,
    },
    {
        position: [3, -6, -3],
        geometry: "torusKnot",
        color: "#818cf8",
        size: 0.3,
        rotationSpeed: [0.004, 0.002, 0.005],
        floatSpeed: 0.7,
        floatAmplitude: 0.45,
        scrollFactor: 2.8,
    },
    {
        position: [8, 3, -5],
        geometry: "octahedron",
        color: "#fb7185",
        size: 0.35,
        rotationSpeed: [0.002, 0.005, 0.003],
        floatSpeed: 0.55,
        floatAmplitude: 0.5,
        scrollFactor: 1.2,
    },
    {
        position: [-7, -7, -2],
        geometry: "dodecahedron",
        color: "#67e8f9",
        size: 0.3,
        rotationSpeed: [0.005, 0.003, 0.002],
        floatSpeed: 1.1,
        floatAmplitude: 0.25,
        scrollFactor: 3.5,
    },
];

// ── Main Export ──────────────────────────────────────────────────────────────
export default function FloatingDoodles() {
    // Reduce shapes on mobile
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const doodles = isMobile ? DOODLES.slice(0, 4) : DOODLES;

    return (
        <div
            aria-hidden
            style={{
                position: "fixed",
                inset: 0,
                zIndex: 0,
                pointerEvents: "none",
                overflow: "hidden",
            }}
        >
            <Canvas
                camera={{ position: [0, 0, 12], fov: 60 }}
                dpr={[1, 1.5]}
                gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
                style={{ background: "transparent" }}
            >
                <ambientLight intensity={0.4} />
                {doodles.map((doodle, i) => (
                    <Doodle key={i} {...doodle} />
                ))}
            </Canvas>
        </div>
    );
}

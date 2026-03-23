"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";
import { Float } from "@react-three/drei";

// ── Morphing Wireframe Icosahedron ───────────────────────────────────────────
function MorphingIcosahedron() {
    const meshRef = useRef<THREE.Mesh>(null);
    const wireRef = useRef<THREE.LineSegments>(null);
    const glowRef = useRef<THREE.Mesh>(null);
    const { pointer } = useThree();

    // Original icosahedron geometry for morphing
    const baseGeometry = useMemo(() => new THREE.IcosahedronGeometry(2.2, 2), []);
    const originalPositions = useMemo(
        () => new Float32Array(baseGeometry.attributes.position.array),
        [baseGeometry]
    );

    useFrame((state) => {
        if (!meshRef.current || !wireRef.current) return;

        const t = state.clock.elapsedTime;

        // Morph vertices
        const positions = baseGeometry.attributes.position.array as Float32Array;
        for (let i = 0; i < positions.length; i += 3) {
            const ox = originalPositions[i];
            const oy = originalPositions[i + 1];
            const oz = originalPositions[i + 2];

            const noise =
                Math.sin(ox * 1.5 + t * 0.8) * 0.15 +
                Math.cos(oy * 1.3 + t * 0.6) * 0.12 +
                Math.sin(oz * 1.7 + t * 0.7) * 0.1;

            const scale = 1 + noise;
            // eslint-disable-next-line react-hooks/immutability
            positions[i] = ox * scale;
            positions[i + 1] = oy * scale;
            positions[i + 2] = oz * scale;
        }
        baseGeometry.attributes.position.needsUpdate = true;
        baseGeometry.computeVertexNormals();

        // Mouse-follow rotation
        const targetRotY = pointer.x * 0.6;
        const targetRotX = -pointer.y * 0.4;
        meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetRotY + t * 0.15, 0.04);
        meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetRotX + t * 0.1, 0.04);

        wireRef.current.rotation.copy(meshRef.current.rotation);

        // Glow pulse
        if (glowRef.current) {
            glowRef.current.rotation.copy(meshRef.current.rotation);
            const s = 1 + Math.sin(t * 1.2) * 0.04;
            glowRef.current.scale.set(s, s, s);
        }
    });

    const wireGeo = useMemo(() => new THREE.WireframeGeometry(baseGeometry), [baseGeometry]);

    return (
        <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.6}>
            <group>
                {/* Solid inner fill — very subtle */}
                <mesh ref={meshRef} geometry={baseGeometry}>
                    <meshStandardMaterial
                        color="#1a1a2e"
                        transparent
                        opacity={0.25}
                        roughness={0.8}
                        metalness={0.3}
                    />
                </mesh>

                {/* Wireframe edges — the star */}
                <lineSegments ref={wireRef} geometry={wireGeo}>
                    <lineBasicMaterial
                        color="#818cf8"
                        transparent
                        opacity={0.65}
                        linewidth={1}
                    />
                </lineSegments>

                {/* Outer glow shell */}
                <mesh ref={glowRef} geometry={baseGeometry} scale={1.08}>
                    <meshBasicMaterial
                        color="#6366f1"
                        transparent
                        opacity={0.06}
                        side={THREE.BackSide}
                    />
                </mesh>
            </group>
        </Float>
    );
}

// ── Orbiting Mini Shapes ─────────────────────────────────────────────────────
function OrbitingRing() {
    const groupRef = useRef<THREE.Group>(null);

    const items = useMemo(() => {
        const count = 12;
        const radius = 3.8;
        return Array.from({ length: count }, (_, i) => {
            const angle = (i / count) * Math.PI * 2;
            return {
                x: Math.cos(angle) * radius,
                // eslint-disable-next-line react-hooks/purity
                y: (Math.random() - 0.5) * 0.6,
                z: Math.sin(angle) * radius,
                // eslint-disable-next-line react-hooks/purity
                size: 0.025 + Math.random() * 0.04,
                // eslint-disable-next-line react-hooks/purity
                speed: 0.3 + Math.random() * 0.5,
            };
        });
    }, []);

    useFrame((state) => {
        if (!groupRef.current) return;
        groupRef.current.rotation.y = state.clock.elapsedTime * 0.12;
        groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.08) * 0.1;
    });

    return (
        <group ref={groupRef}>
            {items.map((item, i) => (
                <mesh key={i} position={[item.x, item.y, item.z]}>
                    <sphereGeometry args={[item.size, 6, 6]} />
                    <meshBasicMaterial color="#a78bfa" transparent opacity={0.5} />
                </mesh>
            ))}
        </group>
    );
}

// ── Main Export ───────────────────────────────────────────────────────────────
export default function Scene3D() {
    return (
        <div
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                zIndex: 0,
            }}
        >
            <Canvas
                camera={{ position: [0, 0, 7], fov: 50 }}
                dpr={[1, 1.5]}
                gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
                style={{ background: "transparent" }}
            >
                <ambientLight intensity={0.3} />
                <pointLight position={[5, 5, 5]} intensity={0.8} color="#818cf8" />
                <pointLight position={[-5, -5, -5]} intensity={0.4} color="#6366f1" />
                <MorphingIcosahedron />
                <OrbitingRing />
            </Canvas>
        </div>
    );
}

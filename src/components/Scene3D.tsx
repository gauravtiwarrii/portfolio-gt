"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";
import { Environment, Float } from "@react-three/drei";

export default function Scene3D() {
    return (
        // Keeping the container in case we want to add a subtle foreground element later
        // But removing the large crystal object so the new responsive background is the star
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}>
            <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
                {/* Empty for now to let NebulaBackground shine */}
            </Canvas>
        </div>
    );
}

"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, Torus } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function Core() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.4;
      ref.current.rotation.y = state.clock.elapsedTime * 0.55;
    }
  });

  return (
    <Float speed={3} rotationIntensity={1} floatIntensity={0.6}>
      <Sphere ref={ref} args={[1, 64, 64]}>
        <MeshDistortMaterial
          color="#00f5ff"
          distort={0.55}
          speed={3}
          roughness={0.1}
          metalness={0.9}
          emissive="#00f5ff"
          emissiveIntensity={0.25}
        />
      </Sphere>
    </Float>
  );
}

function OrbitRing({
  radius,
  speed,
  color,
}: {
  radius: number;
  speed: number;
  color: string;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * speed;
      ref.current.rotation.z = state.clock.elapsedTime * speed * 0.7;
    }
  });

  return (
    <Torus ref={ref} args={[radius, 0.03, 16, 100]}>
      <meshBasicMaterial color={color} transparent opacity={0.7} />
    </Torus>
  );
}

export function LoadingScene3D() {
  return (
    <div className="h-40 w-40 md:h-48 md:w-48">
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} intensity={1.5} color="#00f5ff" />
        <pointLight position={[-5, -3, 2]} intensity={0.8} color="#a855f7" />
        <Core />
        <OrbitRing radius={1.55} speed={0.6} color="#00f5ff" />
        <OrbitRing radius={1.85} speed={-0.4} color="#a855f7" />
        <OrbitRing radius={2.15} speed={0.25} color="#ec4899" />
      </Canvas>
    </div>
  );
}

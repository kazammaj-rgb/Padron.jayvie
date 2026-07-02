"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Float,
  MeshDistortMaterial,
  Sphere,
  Sparkles,
  Stars,
  Torus,
  TorusKnot,
  Icosahedron,
  Ring,
} from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function CameraRig() {
  const { camera } = useThree();
  const target = useRef(new THREE.Vector3(0, 0, 8));

  useFrame((state) => {
    const mx = state.pointer.x * 1.2;
    const my = state.pointer.y * 0.7;
    target.current.set(
      mx,
      my,
      8 + Math.sin(state.clock.elapsedTime * 0.15) * 0.4
    );
    camera.position.lerp(target.current, 0.035);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

function FloatingOrb({
  position,
  color,
  scale,
  emissive,
}: {
  position: [number, number, number];
  color: string;
  scale: number;
  emissive?: string;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.16;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.7} floatIntensity={1.3}>
      <Sphere ref={meshRef} args={[1, 64, 64]} position={position} scale={scale}>
        <MeshDistortMaterial
          color={color}
          emissive={emissive ?? color}
          emissiveIntensity={0.2}
          distort={0.5}
          speed={2.8}
          roughness={0.1}
          metalness={0.9}
          transparent
          opacity={0.42}
        />
      </Sphere>
    </Float>
  );
}

function HologramRing() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = Math.PI / 2;
      ref.current.rotation.z = state.clock.elapsedTime * 0.35;
    }
  });

  return (
    <Ring ref={ref} args={[3.2, 3.35, 64]} position={[0, 0, -2]}>
      <meshBasicMaterial
        color="#00f5ff"
        transparent
        opacity={0.15}
        side={THREE.DoubleSide}
      />
    </Ring>
  );
}

function WireTorus() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.22;
      ref.current.rotation.z = state.clock.elapsedTime * 0.14;
    }
  });

  return (
    <Float speed={1.2} floatIntensity={0.9}>
      <TorusKnot ref={ref} args={[1.1, 0.26, 128, 16]} position={[2.8, -0.3, -3.5]}>
        <meshStandardMaterial
          color="#00f5ff"
          wireframe
          transparent
          opacity={0.4}
          emissive="#00f5ff"
          emissiveIntensity={0.15}
        />
      </TorusKnot>
    </Float>
  );
}

function WireIcosahedron() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = -state.clock.elapsedTime * 0.18;
      ref.current.rotation.x = state.clock.elapsedTime * 0.08;
    }
  });

  return (
    <Float speed={2.2} floatIntensity={1.1}>
      <Icosahedron ref={ref} args={[1.5]} position={[-3.2, 0.8, -4.5]}>
        <meshStandardMaterial
          color="#a855f7"
          wireframe
          transparent
          opacity={0.35}
          emissive="#a855f7"
          emissiveIntensity={0.12}
        />
      </Icosahedron>
    </Float>
  );
}

function OrbitTorus({
  radius,
  color,
  speed,
}: {
  radius: number;
  color: string;
  speed: number;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * speed;
      ref.current.rotation.y = state.clock.elapsedTime * speed * 0.5;
    }
  });

  return (
    <Torus ref={ref} args={[radius, 0.02, 8, 64]} position={[0, 0, -1]}>
      <meshBasicMaterial color={color} transparent opacity={0.25} />
    </Torus>
  );
}

function Scene() {
  return (
    <>
      <CameraRig />
      <fog attach="fog" args={["#030712", 8, 22]} />
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1.4} color="#00f5ff" />
      <pointLight position={[-10, -5, -5]} intensity={0.8} color="#a855f7" />
      <pointLight position={[0, -10, 5]} intensity={0.5} color="#ec4899" />
      <Stars radius={100} depth={60} count={4000} factor={4} saturation={0} fade speed={0.6} />
      <HologramRing />
      <OrbitTorus radius={2.8} color="#00f5ff" speed={0.2} />
      <OrbitTorus radius={3.4} color="#a855f7" speed={-0.15} />
      <FloatingOrb position={[-3.5, 1.2, -4]} color="#00f5ff" scale={1.15} />
      <FloatingOrb position={[4.2, -0.6, -5.5]} color="#a855f7" scale={0.9} emissive="#a855f7" />
      <FloatingOrb position={[0, 2.4, -6.5]} color="#ec4899" scale={0.7} emissive="#ec4899" />
      <WireTorus />
      <WireIcosahedron />
      <Sparkles count={150} scale={16} size={3} speed={0.3} color="#00f5ff" opacity={0.55} />
      <Sparkles count={80} scale={12} size={2} speed={0.45} color="#a855f7" opacity={0.4} />
    </>
  );
}

export function ThreeBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[3] opacity-55" aria-hidden>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 52 }}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        dpr={[1, 2]}
        style={{ background: "transparent" }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}

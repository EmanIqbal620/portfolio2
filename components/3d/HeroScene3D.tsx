'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Line, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { AstronautSuit, AstronautGlow } from '@/components/3d/Astronaut';

type MouseRef = { x: number; y: number; tx: number; ty: number };

function Stars({ count = 60, mouse }: { count?: number; mouse: MouseRef }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.2) * 28;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15 - 5;
    }
    return pos;
  }, [count]);

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.00008;
      mouse.tx += (mouse.x - mouse.tx) * 0.2;
      mouse.ty += (mouse.y - mouse.ty) * 0.2;
      ref.current.position.x = mouse.tx * 0.5;
      ref.current.position.y = mouse.ty * 0.4;
    }
  });

  return (
    <Points ref={ref} positions={positions}>
      <PointMaterial transparent size={0.025} sizeAttenuation depthWrite={false} color="#ffffff" opacity={0.4} />
    </Points>
  );
}

const CONSTELLATION_POINTS = [
  { x: -4.5, y: 2.1, z: -1.0 }, { x: -2.0, y: 3.5, z: -2.5 }, { x: 0.5, y: 1.0, z: 0.0 },
  { x: 3.0, y: 4.0, z: -1.5 }, { x: 5.5, y: 2.5, z: -3.0 }, { x: -1.5, y: -1.0, z: 1.0 },
  { x: 1.0, y: -2.5, z: -1.0 }, { x: 4.0, y: 0.5, z: 2.0 }, { x: -3.0, y: -3.0, z: 0.5 },
  { x: 2.5, y: -1.5, z: -2.0 }, { x: -5.0, y: 0.0, z: -1.5 }, { x: 0.0, y: 4.5, z: 1.0 },
  { x: 3.5, y: -4.0, z: -0.5 }, { x: -2.5, y: 1.5, z: 2.5 }, { x: 1.5, y: 3.0, z: -1.0 },
  { x: -0.5, y: -3.5, z: 1.5 }, { x: 4.5, y: -2.0, z: 1.0 }, { x: -4.0, y: 4.0, z: 0.0 },
  { x: 2.0, y: 2.0, z: -3.5 }, { x: -1.0, y: 0.5, z: -2.0 }, { x: 5.0, y: 3.0, z: 1.5 },
  { x: -3.5, y: -1.5, z: -1.0 }, { x: 0.5, y: -4.0, z: 2.0 }, { x: 3.0, y: 1.5, z: -0.5 },
  { x: -2.0, y: 4.5, z: 1.0 }, { x: 1.0, y: -0.5, z: -1.5 }, { x: -4.5, y: -2.5, z: 0.5 },
  { x: 4.0, y: -3.5, z: -1.0 }, { x: -1.5, y: 2.5, z: 1.5 }, { x: 2.5, y: -0.5, z: 2.5 },
  { x: -5.5, y: 1.0, z: -2.0 }, { x: 0.0, y: -1.5, z: 0.5 }, { x: 3.5, y: 3.5, z: -2.5 },
  { x: -3.0, y: -4.0, z: 1.0 }, { x: 1.5, y: 0.0, z: -1.0 }, { x: -0.5, y: 3.0, z: 2.0 },
  { x: 4.5, y: -1.0, z: 0.5 }, { x: -2.5, y: -2.0, z: -1.5 }, { x: 2.0, y: 4.0, z: 1.0 },
  { x: -1.0, y: -3.0, z: -2.5 }
];

const CONSTELLATION_CONNECTIONS = (() => {
  const conns: number[][] = [];
  for (let i = 0; i < CONSTELLATION_POINTS.length; i++) {
    for (let j = i + 1; j < CONSTELLATION_POINTS.length; j++) {
      const dx = CONSTELLATION_POINTS[i].x - CONSTELLATION_POINTS[j].x;
      const dy = CONSTELLATION_POINTS[i].y - CONSTELLATION_POINTS[j].y;
      const dz = CONSTELLATION_POINTS[i].z - CONSTELLATION_POINTS[j].z;
      if (Math.sqrt(dx * dx + dy * dy + dz * dz) < 3.5) conns.push([i, j]);
    }
  }
  return conns;
})();

function ConstellationNetwork({ mouse }: { mouse: MouseRef }) {
  const linesRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
      linesRef.current.position.x = mouse.tx * 0.4;
      linesRef.current.position.y = mouse.ty * 0.3;
    }
  });
  return (
    <group ref={linesRef} position={[0.8, 0, 0]}>
      {CONSTELLATION_CONNECTIONS.map(([a, b], i) => (
        <Line key={i} points={[[CONSTELLATION_POINTS[a].x, CONSTELLATION_POINTS[a].y, CONSTELLATION_POINTS[a].z], [CONSTELLATION_POINTS[b].x, CONSTELLATION_POINTS[b].y, CONSTELLATION_POINTS[b].z]]} color="#2DD4BF" lineWidth={0.5} transparent opacity={0.18} />
      ))}
      {CONSTELLATION_POINTS.map((p, i) => (
        <mesh key={`dot-${i}`} position={[p.x, p.y, p.z]}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshBasicMaterial color="#2DD4BF" transparent opacity={0.5} />
        </mesh>
      ))}
    </group>
  );
}

function WireframeGlobe({ mouse }: { mouse: MouseRef }) {
  const globeRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);

  const particlePositions = useMemo(() => {
    const pos = new Float32Array(30 * 3);
    for (let i = 0; i < 30; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      const r = 1.4 + Math.random() * 0.6;
      pos[i * 3] = Math.sin(phi) * Math.cos(theta) * r;
      pos[i * 3 + 1] = Math.sin(phi) * Math.sin(theta) * r;
      pos[i * 3 + 2] = Math.cos(phi) * r;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (globeRef.current) {
      globeRef.current.rotation.y = state.clock.elapsedTime * 0.15;
      globeRef.current.position.x = 4.2 + mouse.tx * 0.4;
      globeRef.current.position.y = -2.2 + mouse.ty * 0.3;
    }
    if (ringRef.current) {
      ringRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
      ringRef.current.rotation.z += 0.005;
    }
    if (particlesRef.current) particlesRef.current.rotation.y += 0.002;
  });

  return (
    <group ref={globeRef} position={[4.2, -2.2, -2]}>
      <mesh><sphereGeometry args={[1, 32, 32]} /><meshBasicMaterial color="#2DD4BF" wireframe transparent opacity={0.08} /></mesh>
      <mesh><sphereGeometry args={[0.6, 16, 16]} /><meshBasicMaterial color="#2DD4BF" transparent opacity={0.03} side={THREE.BackSide} /></mesh>
      <mesh><sphereGeometry args={[0.08, 8, 8]} /><meshBasicMaterial color="#2DD4BF" transparent opacity={0.35} /></mesh>
      <mesh ref={ringRef}><torusGeometry args={[1.6, 0.008, 8, 48]} /><meshBasicMaterial color="#2DD4BF" transparent opacity={0.08} /></mesh>
      <Points ref={particlesRef} positions={particlePositions}>
        <PointMaterial transparent size={0.02} sizeAttenuation depthWrite={false} color="#2DD4BF" opacity={0.15} />
      </Points>
    </group>
  );
}

export function BackgroundScene({ mouse }: { mouse: MouseRef }) {
  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 50 }} style={{ width: '100%', height: '100%' }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#2DD4BF" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#D946EF" />
      <Stars mouse={mouse} />
      <ConstellationNetwork mouse={mouse} />
      <WireframeGlobe mouse={mouse} />
    </Canvas>
  );
}

export function AstronautScene({ mouse }: { mouse: MouseRef }) {
  return (
    <Canvas camera={{ position: [0, 0.8, 6], fov: 45 }} style={{ width: '100%', height: '100%' }} dpr={[1, 2]} gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1.0} color="#ffffff" />
      <directionalLight position={[-3, 2, 3]} intensity={0.5} color="#2DD4BF" />
      <directionalLight position={[3, -2, 3]} intensity={0.3} color="#D946EF" />
      <AstronautGlow />
      <AstronautSuit mouse={mouse} />
    </Canvas>
  );
}

import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { TransformControls, Html } from '@react-three/drei';
import * as THREE from 'three';

export function Flower3D({ position = [0, 0, 0], artStyle = 'lowpoly' }) {
  const groupRef = useRef();
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 1.5 + position[0]) * 0.05;
    }
  });

  const isFlat = artStyle === 'lowpoly' || artStyle === 'retro_8bit';

  if (artStyle === 'retro_8bit') {
    return (
      <group ref={groupRef} position={position}>
        <mesh position={[0, 0.4, 0]} castShadow>
          <boxGeometry args={[0.08, 0.8, 0.08]} />
          <meshStandardMaterial color="#22c55e" flatShading />
        </mesh>
        <mesh position={[0.12, 0.35, 0]} castShadow>
          <boxGeometry args={[0.16, 0.08, 0.08]} />
          <meshStandardMaterial color="#16a34a" flatShading />
        </mesh>
        <mesh position={[0, 0.85, 0]} castShadow>
          <boxGeometry args={[0.2, 0.2, 0.2]} />
          <meshStandardMaterial color="#facc15" flatShading />
        </mesh>
        <mesh position={[0.2, 0.85, 0]} castShadow>
          <boxGeometry args={[0.16, 0.16, 0.16]} />
          <meshStandardMaterial color="#ef4444" flatShading />
        </mesh>
        <mesh position={[-0.2, 0.85, 0]} castShadow>
          <boxGeometry args={[0.16, 0.16, 0.16]} />
          <meshStandardMaterial color="#ef4444" flatShading />
        </mesh>
        <mesh position={[0, 1.05, 0]} castShadow>
          <boxGeometry args={[0.16, 0.16, 0.16]} />
          <meshStandardMaterial color="#ef4444" flatShading />
        </mesh>
        <mesh position={[0, 0.65, 0]} castShadow>
          <boxGeometry args={[0.16, 0.16, 0.16]} />
          <meshStandardMaterial color="#ef4444" flatShading />
        </mesh>
      </group>
    );
  }

  if (artStyle === 'synthwave') {
    return (
      <group ref={groupRef} position={position}>
        <mesh position={[0, 0.45, 0]}>
          <cylinderGeometry args={[0.03, 0.05, 0.9, 8]} />
          <meshStandardMaterial color="#0f172a" metalness={0.9} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0.95, 0]}>
          <octahedronGeometry args={[0.18, 0]} />
          <meshStandardMaterial color="#f43f5e" emissive="#f43f5e" emissiveIntensity={2.5} />
        </mesh>
        {Array.from({ length: 6 }).map((_, i) => {
          const a = (i / 6) * Math.PI * 2;
          return (
            <mesh key={i} position={[Math.cos(a) * 0.24, 0.95, Math.sin(a) * 0.24]} rotation={[0.4, -a, 0.2]}>
              <coneGeometry args={[0.12, 0.35, 4]} />
              <meshStandardMaterial color="#00f0ff" wireframe emissive="#00f0ff" emissiveIntensity={1.8} />
            </mesh>
          );
        })}
      </group>
    );
  }

  if (artStyle === 'anime') {
    return (
      <group ref={groupRef} position={position}>
        <mesh position={[0, 0.45, 0]} castShadow>
          <cylinderGeometry args={[0.04, 0.06, 0.9, 16]} />
          <meshStandardMaterial color="#4ade80" roughness={0.3} />
        </mesh>
        <group position={[0, 0.95, 0]}>
          <mesh castShadow>
            <sphereGeometry args={[0.2, 16, 16]} />
            <meshStandardMaterial color="#fef08a" roughness={0.2} emissive="#facc15" emissiveIntensity={0.4} />
          </mesh>
          {Array.from({ length: 5 }).map((_, i) => {
            const a = (i / 5) * Math.PI * 2;
            return (
              <mesh key={i} position={[Math.cos(a) * 0.25, 0, Math.sin(a) * 0.25]} rotation={[0.2, -a, 0]}>
                <sphereGeometry args={[0.18, 14, 14]} />
                <meshStandardMaterial color="#f472b6" roughness={0.3} emissive="#db2777" emissiveIntensity={0.2} />
              </mesh>
            );
          })}
        </group>
      </group>
    );
  }

  return (
    <group ref={groupRef} position={position}>
      <mesh position={[0, 0.5, 0]} castShadow>
        <cylinderGeometry args={[0.04, 0.06, 1, isFlat ? 6 : 16]} />
        <meshStandardMaterial color="#2d8a4e" roughness={0.7} flatShading={isFlat} />
      </mesh>
      <group position={[0, 1.05, 0]}>
        <mesh castShadow>
          <sphereGeometry args={[0.18, isFlat ? 8 : 16, isFlat ? 6 : 16]} />
          <meshStandardMaterial color="#ffd700" roughness={0.4} flatShading={isFlat} />
        </mesh>
        {Array.from({ length: 6 }).map((_, idx) => {
          const angle = (idx / 6) * Math.PI * 2;
          const px = Math.cos(angle) * 0.22;
          const pz = Math.sin(angle) * 0.22;
          return (
            <mesh key={idx} position={[px, -0.02, pz]} rotation={[0.2 * Math.cos(angle), -angle, 0.2 * Math.sin(angle)]} castShadow>
              <sphereGeometry args={[0.15, isFlat ? 6 : 14, isFlat ? 6 : 14]} />
              <meshStandardMaterial color="#ff6b9d" roughness={0.5} flatShading={isFlat} />
            </mesh>
          );
        })}
      </group>
    </group>
  );
}

export function Tree3D({ position = [0, 0, 0], artStyle = 'lowpoly' }) {
  const groupRef = useRef();
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.8 + position[0]) * 0.025;
    }
  });

  const isFlat = artStyle === 'lowpoly' || artStyle === 'retro_8bit';

  if (artStyle === 'retro_8bit') {
    return (
      <group ref={groupRef} position={position}>
        <mesh position={[0, 0.6, 0]} castShadow>
          <boxGeometry args={[0.28, 1.2, 0.28]} />
          <meshStandardMaterial color="#78350f" flatShading />
        </mesh>
        <mesh position={[0, 1.3, 0]} castShadow>
          <boxGeometry args={[1.3, 0.45, 1.3]} />
          <meshStandardMaterial color="#15803d" flatShading />
        </mesh>
        <mesh position={[0, 1.7, 0]} castShadow>
          <boxGeometry args={[0.95, 0.45, 0.95]} />
          <meshStandardMaterial color="#16a34a" flatShading />
        </mesh>
        <mesh position={[0, 2.1, 0]} castShadow>
          <boxGeometry args={[0.6, 0.45, 0.6]} />
          <meshStandardMaterial color="#22c55e" flatShading />
        </mesh>
      </group>
    );
  }

  if (artStyle === 'synthwave') {
    return (
      <group ref={groupRef} position={position}>
        <mesh position={[0, 0.6, 0]} castShadow>
          <cylinderGeometry args={[0.08, 0.16, 1.2, 6]} />
          <meshStandardMaterial color="#030712" metalness={0.9} roughness={0.2} />
        </mesh>
        <mesh position={[0, 1.3, 0]} castShadow>
          <coneGeometry args={[0.9, 0.9, 6]} />
          <meshStandardMaterial color="#bd00ff" wireframe emissive="#bd00ff" emissiveIntensity={1.5} />
        </mesh>
        <mesh position={[0, 1.75, 0]} castShadow>
          <coneGeometry args={[0.7, 0.8, 6]} />
          <meshStandardMaterial color="#00f0ff" wireframe emissive="#00f0ff" emissiveIntensity={1.8} />
        </mesh>
        <mesh position={[0, 2.15, 0]} castShadow>
          <coneGeometry args={[0.5, 0.7, 6]} />
          <meshStandardMaterial color="#ff007f" wireframe emissive="#ff007f" emissiveIntensity={2.0} />
        </mesh>
      </group>
    );
  }

  if (artStyle === 'anime') {
    return (
      <group ref={groupRef} position={position}>
        <mesh position={[0, 0.65, 0]} rotation={[0.08, 0, -0.05]} castShadow>
          <cylinderGeometry args={[0.12, 0.22, 1.3, 16]} />
          <meshStandardMaterial color="#92400e" roughness={0.6} />
        </mesh>
        <group position={[0, 1.6, 0]}>
          <mesh position={[0, 0.2, 0]} castShadow>
            <sphereGeometry args={[0.75, 16, 16]} />
            <meshStandardMaterial color="#f472b6" roughness={0.3} emissive="#db2777" emissiveIntensity={0.2} />
          </mesh>
          <mesh position={[0.4, 0.5, 0.2]} castShadow>
            <sphereGeometry args={[0.55, 14, 14]} />
            <meshStandardMaterial color="#fbcfe8" roughness={0.3} />
          </mesh>
          <mesh position={[-0.35, 0.45, -0.2]} castShadow>
            <sphereGeometry args={[0.5, 14, 14]} />
            <meshStandardMaterial color="#f472b6" roughness={0.3} />
          </mesh>
          <mesh position={[0, 0.85, 0]} castShadow>
            <sphereGeometry args={[0.48, 14, 14]} />
            <meshStandardMaterial color="#fda4af" roughness={0.3} />
          </mesh>
        </group>
      </group>
    );
  }

  return (
    <group ref={groupRef} position={position}>
      <mesh position={[0, 0.6, 0]} castShadow>
        <cylinderGeometry args={[0.12, 0.2, 1.2, isFlat ? 6 : 16]} />
        <meshStandardMaterial color="#8B5E3C" roughness={0.8} flatShading={isFlat} />
      </mesh>
      <group position={[0, 1.6, 0]}>
        <mesh position={[0, 0.8, 0]} castShadow>
          <coneGeometry args={[0.65, 1.1, isFlat ? 6 : 16]} />
          <meshStandardMaterial color="#4caf50" roughness={0.6} flatShading={isFlat} />
        </mesh>
        <mesh position={[0, 0.35, 0]} castShadow>
          <coneGeometry args={[0.9, 1.2, isFlat ? 6 : 16]} />
          <meshStandardMaterial color="#388e3c" roughness={0.6} flatShading={isFlat} />
        </mesh>
        <mesh position={[0, -0.15, 0]} castShadow>
          <coneGeometry args={[1.15, 1.3, isFlat ? 6 : 16]} />
          <meshStandardMaterial color="#2e7d32" roughness={0.6} flatShading={isFlat} />
        </mesh>
      </group>
    </group>
  );
}

export function Rock3D({ position = [0, 0, 0], artStyle = 'lowpoly' }) {
  const isFlat = artStyle === 'lowpoly' || artStyle === 'retro_8bit';

  if (artStyle === 'retro_8bit') {
    return (
      <group position={position}>
        <mesh position={[0, 0.25, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.7, 0.5, 0.7]} />
          <meshStandardMaterial color="#64748b" flatShading />
        </mesh>
        <mesh position={[-0.2, 0.55, 0.1]} castShadow receiveShadow>
          <boxGeometry args={[0.45, 0.35, 0.45]} />
          <meshStandardMaterial color="#94a3b8" flatShading />
        </mesh>
      </group>
    );
  }

  if (artStyle === 'synthwave') {
    return (
      <group position={position}>
        <mesh position={[0, 0.32, 0]} rotation={[0.2, 0.4, 0.1]} castShadow receiveShadow>
          <dodecahedronGeometry args={[0.5, 0]} />
          <meshStandardMaterial color="#030712" metalness={0.9} roughness={0.2} emissive="#00f0ff" emissiveIntensity={0.6} />
        </mesh>
        <mesh position={[0, 0.32, 0]} rotation={[0.2, 0.4, 0.1]} scale={1.03}>
          <dodecahedronGeometry args={[0.5, 0]} />
          <meshStandardMaterial color="#00f0ff" wireframe />
        </mesh>
      </group>
    );
  }

  if (artStyle === 'anime') {
    return (
      <group position={position}>
        <mesh position={[0, 0.3, 0]} rotation={[0, 0.3, 0]} castShadow receiveShadow>
          <sphereGeometry args={[0.5, 16, 14]} />
          <meshStandardMaterial color="#78909c" roughness={0.5} />
        </mesh>
        <mesh position={[0, 0.45, 0]} rotation={[-0.2, 0.3, 0]}>
          <sphereGeometry args={[0.42, 14, 12, 0, Math.PI * 2, 0, Math.PI / 2.5]} />
          <meshStandardMaterial color="#4ade80" roughness={0.7} />
        </mesh>
      </group>
    );
  }

  return (
    <group position={position}>
      <mesh position={[0, 0.28, 0]} rotation={[0.2, 0.5, 0.1]} castShadow receiveShadow>
        <icosahedronGeometry args={[0.45, isFlat ? 0 : 1]} />
        <meshStandardMaterial color="#78909c" roughness={0.9} metalness={0.1} flatShading={isFlat} />
      </mesh>
      <mesh position={[-0.3, 0.18, 0.1]} rotation={[0.5, 1.2, 0]} castShadow receiveShadow>
        <icosahedronGeometry args={[0.3, isFlat ? 0 : 1]} />
        <meshStandardMaterial color="#90a4ae" roughness={0.9} metalness={0.1} flatShading={isFlat} />
      </mesh>
    </group>
  );
}

export function Lamp3D({ position = [0, 0, 0], timeMode = 'night', artStyle = 'lowpoly' }) {
  const isNight = timeMode === 'night';
  const bulbIntensity = isNight ? (artStyle === 'synthwave' ? 4.5 : 3.0) : 0.8;

  if (artStyle === 'retro_8bit') {
    return (
      <group position={position}>
        <mesh position={[0, 0.9, 0]} castShadow>
          <boxGeometry args={[0.14, 1.8, 0.14]} />
          <meshStandardMaterial color="#334155" flatShading />
        </mesh>
        <mesh position={[0, 1.85, 0]} castShadow>
          <boxGeometry args={[0.35, 0.35, 0.35]} />
          <meshStandardMaterial color="#fef08a" emissive="#facc15" emissiveIntensity={bulbIntensity} flatShading />
        </mesh>
        <pointLight position={[0, 1.85, 0]} color="#fde047" intensity={isNight ? 2.5 : 0.6} distance={8} decay={2} />
      </group>
    );
  }

  if (artStyle === 'synthwave') {
    return (
      <group position={position}>
        <mesh position={[0, 1.0, 0]} castShadow>
          <cylinderGeometry args={[0.06, 0.09, 2.0, 8]} />
          <meshStandardMaterial color="#030712" metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh position={[0, 2.05, 0]}>
          <cylinderGeometry args={[0.22, 0.22, 0.4, 8]} />
          <meshStandardMaterial color="#00f0ff" wireframe emissive="#00f0ff" emissiveIntensity={2.5} />
        </mesh>
        <mesh position={[0, 2.05, 0]}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial color="#ff007f" emissive="#ff007f" emissiveIntensity={bulbIntensity} />
        </mesh>
        <pointLight position={[0, 2.05, 0]} color="#00f0ff" intensity={isNight ? 3.0 : 0.8} distance={10} decay={2} />
      </group>
    );
  }

  if (artStyle === 'anime') {
    return (
      <group position={position}>
        <mesh position={[0, 0.2, 0]} castShadow>
          <boxGeometry args={[0.45, 0.3, 0.45]} />
          <meshStandardMaterial color="#475569" roughness={0.8} />
        </mesh>
        <mesh position={[0, 0.9, 0]} castShadow>
          <cylinderGeometry args={[0.12, 0.14, 1.2, 12]} />
          <meshStandardMaterial color="#64748b" roughness={0.8} />
        </mesh>
        <mesh position={[0, 1.6, 0]} castShadow>
          <boxGeometry args={[0.45, 0.4, 0.45]} />
          <meshStandardMaterial color="#fffbeb" emissive="#fbbf24" emissiveIntensity={bulbIntensity} />
        </mesh>
        <mesh position={[0, 1.85, 0]} castShadow>
          <coneGeometry args={[0.42, 0.25, 4]} />
          <meshStandardMaterial color="#334155" roughness={0.6} />
        </mesh>
        <pointLight position={[0, 1.6, 0]} color="#ffcf48" intensity={isNight ? 2.8 : 0.6} distance={10} decay={2} />
      </group>
    );
  }

  return (
    <group position={position}>
      <mesh position={[0, 1, 0]} castShadow>
        <cylinderGeometry args={[0.04, 0.06, 2, 12]} />
        <meshStandardMaterial color={isNight ? '#2d3342' : '#555555'} metalness={0.6} roughness={0.4} />
      </mesh>
      <mesh position={[0, 2.1, 0]} castShadow>
        <cylinderGeometry args={[0.2, 0.08, 0.25, 12]} />
        <meshStandardMaterial color={isNight ? '#1e222d' : '#444444'} metalness={0.6} roughness={0.3} />
      </mesh>
      <mesh position={[0, 1.95, 0]}>
        <sphereGeometry args={[0.08, 12, 10]} />
        <meshStandardMaterial color="#fff8e1" emissive={isNight ? '#ffbe3b' : '#ffd54f'} emissiveIntensity={bulbIntensity} />
      </mesh>
      <pointLight position={[0, 1.9, 0]} color="#ffcf48" intensity={isNight ? 2.8 : 0.6} distance={10} decay={2} />
    </group>
  );
}

export function Crystal3D({ position = [0, 0, 0], artStyle = 'lowpoly' }) {
  const groupRef = useRef();
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.12;
      groupRef.current.rotation.y += 0.015;
    }
  });

  const isFlat = artStyle === 'lowpoly' || artStyle === 'retro_8bit';

  if (artStyle === 'retro_8bit') {
    return (
      <group ref={groupRef} position={position}>
        <mesh position={[0, 0.8, 0]} rotation={[0, Math.PI / 4, 0]} castShadow>
          <boxGeometry args={[0.45, 0.9, 0.45]} />
          <meshStandardMaterial color="#10b981" emissive="#059669" emissiveIntensity={0.8} flatShading />
        </mesh>
        <mesh position={[0.3, 0.5, 0.2]} rotation={[0, Math.PI / 4, 0]} castShadow>
          <boxGeometry args={[0.3, 0.6, 0.3]} />
          <meshStandardMaterial color="#34d399" emissive="#059669" emissiveIntensity={0.6} flatShading />
        </mesh>
      </group>
    );
  }

  if (artStyle === 'synthwave') {
    return (
      <group ref={groupRef} position={position}>
        <mesh position={[0, 0.9, 0]} castShadow>
          <octahedronGeometry args={[0.55, 0]} />
          <meshStandardMaterial color="#ff007f" emissive="#ff007f" emissiveIntensity={2.0} roughness={0.1} metalness={0.9} />
        </mesh>
        <mesh position={[0, 0.9, 0]} scale={1.2}>
          <ringGeometry args={[0.65, 0.72, 32]} />
          <meshBasicMaterial color="#00f0ff" side={THREE.DoubleSide} />
        </mesh>
      </group>
    );
  }

  if (artStyle === 'anime') {
    return (
      <group ref={groupRef} position={position}>
        <mesh position={[0, 0.9, 0]} castShadow>
          <octahedronGeometry args={[0.52, 0]} />
          <meshStandardMaterial color="#e879f9" roughness={0.1} emissive="#a855f7" emissiveIntensity={1.2} />
        </mesh>
        <mesh position={[0.35, 0.6, 0.2]} rotation={[0.4, 0.2, -0.3]} castShadow>
          <octahedronGeometry args={[0.32, 0]} />
          <meshStandardMaterial color="#38bdf8" roughness={0.1} emissive="#0284c7" emissiveIntensity={1.0} />
        </mesh>
      </group>
    );
  }

  return (
    <group ref={groupRef} position={position}>
      <mesh position={[0, 0.9, 0]} castShadow>
        <octahedronGeometry args={[0.5, 0]} />
        <meshStandardMaterial color="#c084fc" roughness={0.2} metalness={0.8} emissive="#6b21a8" emissiveIntensity={0.6} flatShading={isFlat} />
      </mesh>
      <mesh position={[0.35, 0.6, 0.2]} rotation={[0.4, 0.2, -0.3]} castShadow>
        <octahedronGeometry args={[0.32, 0]} />
        <meshStandardMaterial color="#e879f9" roughness={0.2} metalness={0.8} emissive="#86198f" emissiveIntensity={0.5} flatShading={isFlat} />
      </mesh>
      <mesh position={[-0.32, 0.5, -0.15]} rotation={[-0.3, 0.5, 0.4]} castShadow>
        <octahedronGeometry args={[0.28, 0]} />
        <meshStandardMaterial color="#38bdf8" roughness={0.2} metalness={0.8} emissive="#0369a1" emissiveIntensity={0.5} flatShading={isFlat} />
      </mesh>
    </group>
  );
}

export function Mushroom3D({ position = [0, 0, 0], artStyle = 'lowpoly' }) {
  const capRef = useRef();
  useFrame((state) => {
    if (capRef.current) {
      capRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 1.5 + position[2]) * 0.04;
    }
  });

  const isFlat = artStyle === 'lowpoly' || artStyle === 'retro_8bit';

  if (artStyle === 'retro_8bit') {
    return (
      <group position={position}>
        <mesh position={[0, 0.35, 0]} castShadow>
          <boxGeometry args={[0.3, 0.7, 0.3]} />
          <meshStandardMaterial color="#f1f5f9" flatShading />
        </mesh>
        <mesh position={[0, 0.85, 0]} castShadow>
          <boxGeometry args={[0.8, 0.45, 0.8]} />
          <meshStandardMaterial color="#ef4444" flatShading />
        </mesh>
        <mesh position={[0.25, 0.9, 0.25]}>
          <boxGeometry args={[0.2, 0.2, 0.2]} />
          <meshStandardMaterial color="#ffffff" flatShading />
        </mesh>
      </group>
    );
  }

  if (artStyle === 'synthwave') {
    return (
      <group position={position}>
        <mesh position={[0, 0.45, 0]} castShadow>
          <cylinderGeometry args={[0.07, 0.12, 0.9, 8]} />
          <meshStandardMaterial color="#030712" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[0, 1.0, 0]} castShadow>
          <coneGeometry args={[0.55, 0.5, 8]} />
          <meshStandardMaterial color="#00f0ff" wireframe emissive="#00f0ff" emissiveIntensity={2.0} />
        </mesh>
      </group>
    );
  }

  return (
    <group position={position}>
      <mesh position={[0, 0.45, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.14, 0.9, isFlat ? 6 : 16]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.7} flatShading={isFlat} />
      </mesh>
      <group ref={capRef} position={[0, 0.9, 0]}>
        <mesh position={[0, 0.2, 0]} castShadow>
          <sphereGeometry args={[0.55, isFlat ? 8 : 16, isFlat ? 6 : 12, 0, Math.PI * 2, 0, Math.PI / 1.7]} />
          <meshStandardMaterial color="#f472b6" roughness={0.4} emissive="#be185d" emissiveIntensity={0.35} side={THREE.DoubleSide} flatShading={isFlat} />
        </mesh>
        <mesh position={[0.2, 0.38, 0.15]}>
          <sphereGeometry args={[0.08, 8, 8]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
        <mesh position={[-0.22, 0.32, -0.1]}>
          <sphereGeometry args={[0.07, 8, 8]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      </group>
    </group>
  );
}

export function Pyramid3D({ position = [0, 0, 0], artStyle = 'lowpoly' }) {
  const topRef = useRef();
  useFrame((state) => {
    if (topRef.current) {
      topRef.current.rotation.y += 0.02;
      topRef.current.position.y = 1.35 + Math.sin(state.clock.elapsedTime * 2.5) * 0.06;
    }
  });

  if (artStyle === 'retro_8bit') {
    return (
      <group position={position}>
        <mesh position={[0, 0.2, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.4, 0.35, 1.4]} />
          <meshStandardMaterial color="#d97706" flatShading />
        </mesh>
        <mesh position={[0, 0.55, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.0, 0.35, 1.0]} />
          <meshStandardMaterial color="#f59e0b" flatShading />
        </mesh>
        <mesh position={[0, 0.9, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.6, 0.35, 0.6]} />
          <meshStandardMaterial color="#fbbf24" flatShading />
        </mesh>
      </group>
    );
  }

  if (artStyle === 'synthwave') {
    return (
      <group position={position}>
        <mesh position={[0, 0.55, 0]} rotation={[0, Math.PI / 4, 0]} castShadow receiveShadow>
          <coneGeometry args={[0.85, 1.1, 4]} />
          <meshStandardMaterial color="#bd00ff" wireframe emissive="#bd00ff" emissiveIntensity={2.0} />
        </mesh>
        <mesh ref={topRef} position={[0, 1.35, 0]} rotation={[0, Math.PI / 4, 0]}>
          <octahedronGeometry args={[0.25, 0]} />
          <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={3.0} />
        </mesh>
      </group>
    );
  }

  return (
    <group position={position}>
      <mesh position={[0, 0.55, 0]} rotation={[0, Math.PI / 4, 0]} castShadow receiveShadow>
        <coneGeometry args={[0.85, 1.1, 4]} />
        <meshStandardMaterial color="#fbbf24" roughness={0.6} metalness={0.3} flatShading />
      </mesh>
      <mesh ref={topRef} position={[0, 1.35, 0]} rotation={[0, Math.PI / 4, 0]} castShadow>
        <octahedronGeometry args={[0.25, 0]} />
        <meshStandardMaterial color="#fef08a" roughness={0.1} metalness={0.9} emissive="#d97706" emissiveIntensity={0.8} flatShading />
      </mesh>
    </group>
  );
}

export function Fountain3D({ position = [0, 0, 0], artStyle = 'lowpoly' }) {
  const waterRef = useRef();
  useFrame((state) => {
    if (waterRef.current) {
      waterRef.current.position.y = 0.85 + Math.sin(state.clock.elapsedTime * 4) * 0.08;
    }
  });

  const isFlat = artStyle === 'lowpoly' || artStyle === 'retro_8bit';

  if (artStyle === 'retro_8bit') {
    return (
      <group position={position}>
        <mesh position={[0, 0.25, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.3, 0.45, 1.3]} />
          <meshStandardMaterial color="#64748b" flatShading />
        </mesh>
        <mesh position={[0, 0.5, 0]}>
          <boxGeometry args={[1.0, 0.1, 1.0]} />
          <meshStandardMaterial color="#38bdf8" emissive="#0284c7" emissiveIntensity={0.5} flatShading />
        </mesh>
        <mesh ref={waterRef} position={[0, 0.8, 0]}>
          <boxGeometry args={[0.3, 0.5, 0.3]} />
          <meshStandardMaterial color="#7dd3fc" emissive="#0ea5e9" emissiveIntensity={0.8} flatShading />
        </mesh>
      </group>
    );
  }

  if (artStyle === 'synthwave') {
    return (
      <group position={position}>
        <mesh position={[0, 0.2, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.8, 0.9, 0.4, 8]} />
          <meshStandardMaterial color="#030712" metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh position={[0, 0.42, 0]}>
          <cylinderGeometry args={[0.72, 0.72, 0.05, 8]} />
          <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={2.0} />
        </mesh>
        <mesh ref={waterRef} position={[0, 0.85, 0]}>
          <octahedronGeometry args={[0.25, 0]} />
          <meshStandardMaterial color="#ff007f" emissive="#ff007f" emissiveIntensity={3.0} />
        </mesh>
      </group>
    );
  }

  return (
    <group position={position}>
      <mesh position={[0, 0.2, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.8, 0.9, 0.4, isFlat ? 6 : 16]} />
        <meshStandardMaterial color="#94a3b8" roughness={0.8} flatShading={isFlat} />
      </mesh>
      <mesh position={[0, 0.39, 0]}>
        <cylinderGeometry args={[0.68, 0.68, 0.04, isFlat ? 6 : 16]} />
        <meshStandardMaterial color="#38bdf8" roughness={0.1} metalness={0.2} transparent opacity={0.8} />
      </mesh>
      <mesh position={[0, 0.6, 0]} castShadow>
        <cylinderGeometry args={[0.15, 0.2, 0.8, isFlat ? 6 : 16]} />
        <meshStandardMaterial color="#cbd5e1" roughness={0.7} flatShading={isFlat} />
      </mesh>
      <mesh ref={waterRef} position={[0, 0.85, 0]}>
        <sphereGeometry args={[0.22, 14, 12]} />
        <meshStandardMaterial color="#7dd3fc" roughness={0.1} transparent opacity={0.85} emissive="#0284c7" emissiveIntensity={0.4} />
      </mesh>
    </group>
  );
}

export function Tower3D({ position = [0, 0, 0], artStyle = 'lowpoly' }) {
  const isFlat = artStyle === 'lowpoly' || artStyle === 'retro_8bit';

  if (artStyle === 'retro_8bit') {
    return (
      <group position={position}>
        <mesh position={[0, 0.9, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.8, 1.8, 0.8]} />
          <meshStandardMaterial color="#64748b" flatShading />
        </mesh>
        <mesh position={[0, 1.9, 0]} castShadow>
          <boxGeometry args={[1.0, 0.3, 1.0]} />
          <meshStandardMaterial color="#475569" flatShading />
        </mesh>
        <mesh position={[0, 2.3, 0]} castShadow>
          <boxGeometry args={[0.6, 0.6, 0.6]} />
          <meshStandardMaterial color="#ef4444" flatShading />
        </mesh>
      </group>
    );
  }

  if (artStyle === 'synthwave') {
    return (
      <group position={position}>
        <mesh position={[0, 1.0, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.35, 0.5, 2.0, 6]} />
          <meshStandardMaterial color="#030712" metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh position={[0, 1.0, 0]} scale={1.02}>
          <cylinderGeometry args={[0.35, 0.5, 2.0, 6]} />
          <meshStandardMaterial color="#00f0ff" wireframe />
        </mesh>
        <mesh position={[0, 2.2, 0]}>
          <sphereGeometry args={[0.15, 12, 12]} />
          <meshStandardMaterial color="#ff007f" emissive="#ff007f" emissiveIntensity={3.5} />
        </mesh>
      </group>
    );
  }

  if (artStyle === 'anime') {
    return (
      <group position={position}>
        <mesh position={[0, 0.6, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.4, 0.5, 1.2, 16]} />
          <meshStandardMaterial color="#dc2626" roughness={0.5} />
        </mesh>
        <mesh position={[0, 1.25, 0]} castShadow>
          <coneGeometry args={[0.7, 0.35, 4]} />
          <meshStandardMaterial color="#1e293b" roughness={0.4} />
        </mesh>
        <mesh position={[0, 1.6, 0]} castShadow>
          <cylinderGeometry args={[0.3, 0.35, 0.7, 16]} />
          <meshStandardMaterial color="#dc2626" roughness={0.5} />
        </mesh>
        <mesh position={[0, 2.05, 0]} castShadow>
          <coneGeometry args={[0.55, 0.35, 4]} />
          <meshStandardMaterial color="#1e293b" roughness={0.4} />
        </mesh>
      </group>
    );
  }

  return (
    <group position={position}>
      <mesh position={[0, 0.9, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.45, 0.55, 1.8, isFlat ? 6 : 16]} />
        <meshStandardMaterial color="#94a3b8" roughness={0.85} flatShading={isFlat} />
      </mesh>
      <mesh position={[0, 2.1, 0]} castShadow>
        <coneGeometry args={[0.55, 0.7, isFlat ? 6 : 16]} />
        <meshStandardMaterial color="#ef4444" roughness={0.6} flatShading={isFlat} />
      </mesh>
      <mesh position={[0, 1.82, 0]} castShadow>
        <cylinderGeometry args={[0.5, 0.5, 0.15, isFlat ? 6 : 16]} />
        <meshStandardMaterial color="#64748b" roughness={0.8} flatShading={isFlat} />
      </mesh>
    </group>
  );
}

export function Cactus3D({ position = [0, 0, 0], artStyle = 'lowpoly' }) {
  const isFlat = artStyle === 'lowpoly' || artStyle === 'retro_8bit';

  if (artStyle === 'retro_8bit') {
    return (
      <group position={position}>
        <mesh position={[0, 0.75, 0]} castShadow>
          <boxGeometry args={[0.3, 1.5, 0.3]} />
          <meshStandardMaterial color="#22c55e" flatShading />
        </mesh>
        <mesh position={[0.25, 0.7, 0]} castShadow>
          <boxGeometry args={[0.3, 0.2, 0.2]} />
          <meshStandardMaterial color="#16a34a" flatShading />
        </mesh>
        <mesh position={[0.35, 0.95, 0]} castShadow>
          <boxGeometry args={[0.2, 0.4, 0.2]} />
          <meshStandardMaterial color="#16a34a" flatShading />
        </mesh>
      </group>
    );
  }

  if (artStyle === 'synthwave') {
    return (
      <group position={position}>
        <mesh position={[0, 0.7, 0]} castShadow>
          <cylinderGeometry args={[0.16, 0.18, 1.4, 6]} />
          <meshStandardMaterial color="#030712" metalness={0.9} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0.7, 0]} scale={1.03}>
          <cylinderGeometry args={[0.16, 0.18, 1.4, 6]} />
          <meshStandardMaterial color="#39ff14" wireframe emissive="#39ff14" emissiveIntensity={1.5} />
        </mesh>
      </group>
    );
  }

  return (
    <group position={position}>
      <mesh position={[0, 0.7, 0]} castShadow>
        <cylinderGeometry args={[0.16, 0.18, 1.4, isFlat ? 6 : 16]} />
        <meshStandardMaterial color="#22c55e" roughness={0.8} flatShading={isFlat} />
      </mesh>
      <group position={[0.25, 0.65, 0]}>
        <mesh position={[0, 0, 0]} rotation={[0, 0, -1.2]} castShadow>
          <cylinderGeometry args={[0.1, 0.1, 0.4, isFlat ? 6 : 16]} />
          <meshStandardMaterial color="#16a34a" roughness={0.8} flatShading={isFlat} />
        </mesh>
        <mesh position={[0.15, 0.2, 0]} castShadow>
          <cylinderGeometry args={[0.1, 0.1, 0.4, isFlat ? 6 : 16]} />
          <meshStandardMaterial color="#16a34a" roughness={0.8} flatShading={isFlat} />
        </mesh>
      </group>
      <mesh position={[0, 1.45, 0]}>
        <sphereGeometry args={[0.12, 12, 10]} />
        <meshStandardMaterial color="#facc15" roughness={0.4} />
      </mesh>
    </group>
  );
}

export function Campfire3D({ position = [0, 0, 0], artStyle = 'lowpoly' }) {
  const flameRef = useRef();
  useFrame((state) => {
    if (flameRef.current) {
      flameRef.current.scale.y = 1 + Math.sin(state.clock.elapsedTime * 8) * 0.25;
      flameRef.current.scale.x = 1 + Math.cos(state.clock.elapsedTime * 6) * 0.15;
    }
  });

  if (artStyle === 'retro_8bit') {
    return (
      <group position={position}>
        <mesh position={[0, 0.1, 0]} castShadow>
          <boxGeometry args={[0.7, 0.18, 0.7]} />
          <meshStandardMaterial color="#78350f" flatShading />
        </mesh>
        <mesh ref={flameRef} position={[0, 0.4, 0]}>
          <boxGeometry args={[0.3, 0.5, 0.3]} />
          <meshStandardMaterial color="#f97316" emissive="#ea580c" emissiveIntensity={2.0} flatShading />
        </mesh>
        <pointLight position={[0, 0.5, 0]} color="#f97316" intensity={2.2} distance={6} decay={2} />
      </group>
    );
  }

  if (artStyle === 'synthwave') {
    return (
      <group position={position}>
        <mesh position={[0, 0.1, 0]}>
          <torusGeometry args={[0.35, 0.08, 8, 16]} />
          <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={2.0} />
        </mesh>
        <mesh ref={flameRef} position={[0, 0.4, 0]}>
          <octahedronGeometry args={[0.26, 0]} />
          <meshStandardMaterial color="#ff007f" emissive="#ff007f" emissiveIntensity={3.5} />
        </mesh>
        <pointLight position={[0, 0.5, 0]} color="#ff007f" intensity={2.8} distance={8} decay={2} />
      </group>
    );
  }

  return (
    <group position={position}>
      <mesh position={[0, 0.12, 0]} rotation={[Math.PI / 2, 0.4, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.08, 0.7, 8]} />
        <meshStandardMaterial color="#78350f" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.12, 0]} rotation={[Math.PI / 2, -0.4, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.08, 0.7, 8]} />
        <meshStandardMaterial color="#78350f" roughness={0.9} />
      </mesh>
      <mesh ref={flameRef} position={[0, 0.4, 0]}>
        <coneGeometry args={[0.25, 0.6, 8]} />
        <meshStandardMaterial color="#f97316" roughness={0.2} emissive="#ea580c" emissiveIntensity={1.2} transparent opacity={0.9} />
      </mesh>
      <pointLight position={[0, 0.5, 0]} color="#f97316" intensity={2.2} distance={6} decay={2} />
    </group>
  );
}

export function Monument3D({ position = [0, 0, 0], artStyle = 'lowpoly' }) {
  if (artStyle === 'retro_8bit') {
    return (
      <group position={position}>
        <mesh position={[0, 0.2, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.9, 0.4, 0.9]} />
          <meshStandardMaterial color="#475569" flatShading />
        </mesh>
        <mesh position={[0, 1.1, 0]} castShadow>
          <boxGeometry args={[0.4, 1.6, 0.4]} />
          <meshStandardMaterial color="#e2e8f0" flatShading />
        </mesh>
        <mesh position={[0, 2.05, 0]} castShadow>
          <boxGeometry args={[0.3, 0.3, 0.3]} />
          <meshStandardMaterial color="#facc15" emissive="#d97706" emissiveIntensity={0.8} flatShading />
        </mesh>
      </group>
    );
  }

  if (artStyle === 'synthwave') {
    return (
      <group position={position}>
        <mesh position={[0, 1.1, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.35, 2.0, 0.15]} />
          <meshStandardMaterial color="#030712" metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh position={[0, 1.1, 0]} scale={1.03}>
          <boxGeometry args={[0.35, 2.0, 0.15]} />
          <meshStandardMaterial color="#00f0ff" wireframe emissive="#00f0ff" emissiveIntensity={1.8} />
        </mesh>
        <mesh position={[0, 2.2, 0]}>
          <octahedronGeometry args={[0.18, 0]} />
          <meshStandardMaterial color="#ff007f" emissive="#ff007f" emissiveIntensity={3.0} />
        </mesh>
      </group>
    );
  }

  if (artStyle === 'anime') {
    return (
      <group position={position}>
        <mesh position={[-0.45, 0.9, 0]} castShadow>
          <cylinderGeometry args={[0.07, 0.08, 1.8, 16]} />
          <meshStandardMaterial color="#dc2626" roughness={0.5} />
        </mesh>
        <mesh position={[0.45, 0.9, 0]} castShadow>
          <cylinderGeometry args={[0.07, 0.08, 1.8, 16]} />
          <meshStandardMaterial color="#dc2626" roughness={0.5} />
        </mesh>
        <mesh position={[0, 1.8, 0]} castShadow>
          <boxGeometry args={[1.3, 0.14, 0.2]} />
          <meshStandardMaterial color="#1e293b" roughness={0.4} />
        </mesh>
        <mesh position={[0, 1.55, 0]} castShadow>
          <boxGeometry args={[1.1, 0.1, 0.15]} />
          <meshStandardMaterial color="#dc2626" roughness={0.5} />
        </mesh>
      </group>
    );
  }

  return (
    <group position={position}>
      <mesh position={[0, 0.15, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.8, 0.3, 0.8]} />
        <meshStandardMaterial color="#64748b" roughness={0.7} />
      </mesh>
      <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.6, 0.15, 0.6]} />
        <meshStandardMaterial color="#94a3b8" roughness={0.7} />
      </mesh>
      <mesh position={[0, 1.25, 0]} castShadow>
        <cylinderGeometry args={[0.15, 0.24, 1.6, 8]} />
        <meshStandardMaterial color="#e2e8f0" roughness={0.5} />
      </mesh>
      <mesh position={[0, 2.15, 0]} castShadow>
        <sphereGeometry args={[0.16, 14, 12]} />
        <meshStandardMaterial color="#fbbf24" roughness={0.2} metalness={0.8} emissive="#d97706" emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
}

const OBJECT_COMPONENTS = {
  flower: Flower3D,
  tree: Tree3D,
  rock: Rock3D,
  lamp: Lamp3D,
  crystal: Crystal3D,
  mushroom: Mushroom3D,
  pyramid: Pyramid3D,
  fountain: Fountain3D,
  tower: Tower3D,
  cactus: Cactus3D,
  campfire: Campfire3D,
  monument: Monument3D,
};

export function PlacedObjectWrapper({
  obj,
  artStyle: globalArtStyle = 'lowpoly',
  deleteMode,
  selected,
  onSelect,
  onDelete,
  timeMode,
  transformMode,
  setPlacedObjects
}) {
  const [hovered, setHovered] = useState(false);
  const groupRef = useRef();
  const Comp = OBJECT_COMPONENTS[obj.type];
  if (!Comp) return null;

  const currentStyle = obj.artStyle || globalArtStyle || 'lowpoly';
  const [ox, , oz] = obj.position;
  const rotY = obj.rotationY || 0;
  const scaleVal = obj.scale || 1;
  const ringColor = deleteMode ? '#ff4444' : selected ? '#4fc3f7' : timeMode === 'night' ? '#8ab4f8' : '#ffffff';
  const showRing = hovered || selected;

  const handleTransformChange = () => {
    if (groupRef.current && setPlacedObjects) {
      const pos = groupRef.current.position;
      const rot = groupRef.current.rotation;
      const scl = groupRef.current.scale;
      setPlacedObjects(prev => prev.map(o => o.id === obj.id ? {
        ...o,
        position: [pos.x, pos.y, pos.z],
        rotationY: rot.y,
        scale: Math.max(0.2, scl.x)
      } : o));
    }
  };

  return (
    <>
      {selected && !deleteMode && (
        <TransformControls
          object={groupRef}
          mode={transformMode}
          onMouseUp={handleTransformChange}
          showY={transformMode === 'translate' ? false : true}
          showX={transformMode === 'rotate' ? false : true}
          showZ={transformMode === 'rotate' ? false : true}
          size={0.6}
        />
      )}
      <group
        ref={groupRef}
        position={[ox, 0, oz]}
        rotation={[0, rotY, 0]}
        scale={[scaleVal, scaleVal, scaleVal]}
        onClick={(e) => { e.stopPropagation(); deleteMode ? onDelete(obj.id) : onSelect(obj.id); }}
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
        onPointerOut={() => setHovered(false)}
      >
        <Comp position={[0, 0, 0]} timeMode={timeMode} artStyle={currentStyle} />
        {showRing && (
          <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.65, 0.82, 32]} />
            <meshBasicMaterial color={ringColor} transparent opacity={hovered && deleteMode ? 0.9 : 0.65} />
          </mesh>
        )}
        
        {obj.message && (
          <Html position={[0, 1.8, 0]} center zIndexRange={[100, 0]}>
            <div style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', pointerEvents: 'none',
              transform: selected ? 'scale(1)' : 'scale(0.8)',
              opacity: selected ? 1 : 0.8,
              transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
            }}>
              {!selected ? (
                <div style={{
                  background: 'rgba(255,255,255,0.9)', padding: '6px', borderRadius: '50%',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.2)', fontSize: 16
                }}>💌</div>
              ) : (
                <div style={{
                  background: timeMode === 'night' ? 'rgba(20,24,34,0.9)' : 'rgba(255,255,255,0.95)',
                  backdropFilter: 'blur(10px)', color: timeMode === 'night' ? '#FFF' : '#000',
                  padding: '12px 16px', borderRadius: 16, width: 160,
                  boxShadow: '0 8px 24px rgba(0,0,0,0.3)', textAlign: 'center',
                  border: timeMode === 'night' ? '1px solid rgba(255,255,255,0.2)' : '1px solid rgba(0,0,0,0.1)'
                }}>
                  <div style={{ fontSize: 11, fontWeight: 800, color: timeMode === 'night' ? '#38bdf8' : '#007AFF', marginBottom: 4 }}>
                    DARI: {obj.senderName}
                  </div>
                  <div style={{ fontSize: 12, lineHeight: 1.4, wordWrap: 'break-word' }}>
                    "{obj.message}"
                  </div>
                </div>
              )}
            </div>
          </Html>
        )}

        <mesh position={[0, 0.6, 0]} visible={false}>
          <cylinderGeometry args={[0.9, 0.9, 1.8, 16]} />
          <meshBasicMaterial />
        </mesh>
      </group>
    </>
  );
}

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function FantasyBiome({ timeMode = 'night', onGroundTap, artStyle = 'lowpoly' }) {
  const isNight = timeMode === 'night';
  const crystalRingRef = useRef();

  useFrame(({ clock }) => {
    if (crystalRingRef.current) {
      crystalRingRef.current.rotation.y = clock.getElapsedTime() * 0.15;
    }
  });

  // 8 floating crystalline monoliths orbiting the island
  const crystalMonoliths = [
    { angle: 0, height: 4, color: '#ec4899', radius: 13 },
    { angle: (Math.PI / 4) * 1, height: 6, color: '#8b5cf6', radius: 14 },
    { angle: (Math.PI / 4) * 2, height: 3.5, color: '#38bdf8', radius: 13.5 },
    { angle: (Math.PI / 4) * 3, height: 5, color: '#a855f7', radius: 14.2 },
    { angle: (Math.PI / 4) * 4, height: 4.5, color: '#ec4899', radius: 13 },
    { angle: (Math.PI / 4) * 5, height: 7, color: '#6366f1', radius: 15 },
    { angle: (Math.PI / 4) * 6, height: 3.8, color: '#06b6d4', radius: 13.2 },
    { angle: (Math.PI / 4) * 7, height: 5.5, color: '#d946ef', radius: 14 }
  ];

  return (
    <group>
      {/* 1. Main Fantasy Ground (Interactive) */}
      <mesh
        position={[0, -0.2, 0]}
        receiveShadow
        onPointerDown={(e) => {
          if (onGroundTap) {
            e.stopPropagation();
            onGroundTap(e.point.x, e.point.z);
          }
        }}
      >
        <cylinderGeometry args={[11, 11, 0.4, 32]} />
        <meshStandardMaterial
          color={isNight ? '#1e1136' : '#581c87'}
          roughness={0.4}
          metalness={0.2}
          flatShading={artStyle === 'retro_8bit'}
        />
      </mesh>

      {/* 2. Mystical Luminous Center Pool */}
      <mesh position={[0, 0.01, 0]} receiveShadow>
        <cylinderGeometry args={[4.2, 4.2, 0.05, 32]} />
        <meshStandardMaterial
          color={isNight ? '#c084fc' : '#d8b4fe'}
          emissive={isNight ? '#9333ea' : '#7e22ce'}
          emissiveIntensity={isNight ? 1.5 : 0.4}
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>

      {/* 3. Under-island Spire */}
      <mesh position={[0, -3.8, 0]}>
        <coneGeometry args={[10.5, 7.5, 9]} />
        <meshStandardMaterial
          color={isNight ? '#0c0714' : '#2e1065'}
          roughness={0.8}
          metalness={0.3}
          flatShading={true}
        />
      </mesh>

      {/* 4. Magical Rune Ring */}
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[8.2, 8.6, 32]} />
        <meshBasicMaterial
          color={isNight ? '#e879f9' : '#c084fc'}
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* 5. Orbiting Crystal Monoliths */}
      <group ref={crystalRingRef}>
        {crystalMonoliths.map((mono, i) => {
          const x = Math.cos(mono.angle) * mono.radius;
          const z = Math.sin(mono.angle) * mono.radius;
          return (
            <mesh key={i} position={[x, mono.height / 2 - 1, z]} rotation={[0.1, mono.angle, 0.2]}>
              <octahedronGeometry args={[1.0, 0]} />
              <meshStandardMaterial
                color={mono.color}
                emissive={mono.color}
                emissiveIntensity={isNight ? 1.2 : 0.3}
                roughness={0.1}
                metalness={0.9}
                flatShading={true}
              />
            </mesh>
          );
        })}
      </group>

      {/* Ethereal Glow */}
      <pointLight
        position={[0, 2, 0]}
        color={isNight ? '#d946ef' : '#c084fc'}
        distance={24}
        intensity={isNight ? 1.4 : 0.8}
      />
    </group>
  );
}

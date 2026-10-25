import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { SoundEngine } from '../../../utils/SoundEngine';

export function FantasyBiome({ timeMode = 'night', onGroundTap }) {
  const isNight = timeMode === 'night';
  const crystalRingRef = useRef();
  const groundColor = isNight ? '#171026' : '#FAF7F2';
  const goldTrim = '#d4af37';

  useFrame(({ clock }) => {
    if (crystalRingRef.current) {
      crystalRingRef.current.rotation.y = clock.getElapsedTime() * 0.12;
    }
  });

  const crystalMonoliths = [
    { angle: 0, y: 1.5, color: '#f472b6', radius: 13.5 },
    { angle: (Math.PI / 3) * 1, y: 2.2, color: '#c084fc', radius: 14.5 },
    { angle: (Math.PI / 3) * 2, y: 1.2, color: '#38bdf8', radius: 13.8 },
    { angle: (Math.PI / 3) * 3, y: 2.5, color: '#e879f9', radius: 14.2 },
    { angle: (Math.PI / 3) * 4, y: 1.6, color: '#fda4af', radius: 13.6 },
    { angle: (Math.PI / 3) * 5, y: 2.8, color: '#818cf8', radius: 14.8 }
  ];

  return (
    <group>
      {/* 1. Kraft Mineral Floating Strata */}
      <mesh position={[0, -2.6, 0]}>
        <cylinderGeometry args={[11.5, 3.5, 4.8, 6]} />
        <meshStandardMaterial
          color={isNight ? '#0b0816' : '#7c5e3f'}
          roughness={0.9}
          flatShading={true}
        />
      </mesh>

      {/* Gold Foil Border Under Deckle Platform */}
      <mesh position={[0, -0.38, 0]}>
        <cylinderGeometry args={[11.7, 11.7, 0.06, 6]} />
        <meshStandardMaterial color={goldTrim} metalness={0.9} roughness={0.2} />
      </mesh>

      {/* 2. Main Deckle-Edge Torn Paper Platform */}
      <mesh
        position={[0, -0.2, 0]}
        receiveShadow
        onPointerDown={(e) => {
          if (onGroundTap) {
            e.stopPropagation();
            onGroundTap(e.point.x, e.point.z);
            SoundEngine.playPop();
          }
        }}
      >
        <cylinderGeometry args={[11.5, 11.5, 0.36, 6]} />
        <meshStandardMaterial
          color={groundColor}
          roughness={0.88}
          metalness={0.03}
        />
      </mesh>

      {/* Center Mystic Celestial Pool / Rune Seal */}
      <mesh position={[0, 0.015, 0]} receiveShadow>
        <cylinderGeometry args={[4.4, 4.4, 0.04, 6]} />
        <meshStandardMaterial
          color={isNight ? '#c084fc' : '#e9d5ff'}
          emissive={isNight ? '#9333ea' : '#c084fc'}
          emissiveIntensity={isNight ? 1.4 : 0.4}
          roughness={0.2}
          metalness={0.6}
        />
      </mesh>

      {/* Gold Leaf Astrolabe Ring Pattern */}
      <mesh position={[0, 0.025, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[8.2, 8.5, 6]} />
        <meshStandardMaterial color={goldTrim} metalness={0.9} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0.025, 0]} rotation={[-Math.PI / 2, 0, Math.PI / 6]}>
        <ringGeometry args={[4.5, 4.7, 6]} />
        <meshStandardMaterial color={goldTrim} metalness={0.9} roughness={0.2} />
      </mesh>

      {/* 3. Orbiting Faceted Crystal Monoliths */}
      <group ref={crystalRingRef}>
        {crystalMonoliths.map((mono, i) => {
          const x = Math.cos(mono.angle) * mono.radius;
          const z = Math.sin(mono.angle) * mono.radius;
          return (
            <group key={i} position={[x, mono.y, z]}>
              <mesh rotation={[0.2, mono.angle, 0.2]} castShadow>
                <octahedronGeometry args={[0.95, 0]} />
                <meshStandardMaterial
                  color={mono.color}
                  emissive={mono.color}
                  emissiveIntensity={isNight ? 1.4 : 0.4}
                  roughness={0.15}
                  metalness={0.7}
                  flatShading={true}
                />
              </mesh>
              {/* Gold Core Inlay */}
              <mesh scale={0.4}>
                <octahedronGeometry args={[0.95, 0]} />
                <meshStandardMaterial color={goldTrim} metalness={0.95} roughness={0.1} />
              </mesh>
            </group>
          );
        })}
      </group>

      <pointLight
        position={[0, 2.5, 0]}
        color={isNight ? '#d946ef' : '#c084fc'}
        distance={22}
        intensity={isNight ? 1.4 : 0.7}
      />
    </group>
  );
}

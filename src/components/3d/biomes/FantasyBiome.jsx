import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function FantasyBiome({ timeMode = 'night', onGroundTap, artStyle = 'lowpoly' }) {
  const isNight = timeMode === 'night';
  const crystalRingRef = useRef();

  useFrame(({ clock }) => {
    if (crystalRingRef.current) {
      crystalRingRef.current.rotation.y = clock.getElapsedTime() * 0.12;
    }
  });

  const crystalMonoliths = [
    { angle: 0, y: 1.5, color: '#ec4899', radius: 13.5 },
    { angle: (Math.PI / 3) * 1, y: 2.2, color: '#8b5cf6', radius: 14.5 },
    { angle: (Math.PI / 3) * 2, y: 1.2, color: '#38bdf8', radius: 13.8 },
    { angle: (Math.PI / 3) * 3, y: 2.5, color: '#a855f7', radius: 14.2 },
    { angle: (Math.PI / 3) * 4, y: 1.6, color: '#ec4899', radius: 13.6 },
    { angle: (Math.PI / 3) * 5, y: 2.8, color: '#6366f1', radius: 14.8 }
  ];

  return (
    <group>
      <mesh position={[0, -2.6, 0]}>
        <cylinderGeometry args={[11.5, 3.5, 4.8, 6]} />
        <meshStandardMaterial
          color={isNight ? '#0b0816' : '#2e1065'}
          roughness={0.85}
          metalness={0.2}
          flatShading={true}
        />
      </mesh>

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
        <cylinderGeometry args={[11.5, 11.5, 0.4, 6]} />
        <meshStandardMaterial
          color={isNight ? '#160d29' : '#4c1d95'}
          roughness={0.5}
          metalness={0.2}
          flatShading={artStyle === 'retro_8bit'}
        />
      </mesh>

      <mesh position={[0, 0.015, 0]} receiveShadow>
        <cylinderGeometry args={[4.2, 4.2, 0.04, 6]} />
        <meshStandardMaterial
          color={isNight ? '#c084fc' : '#d8b4fe'}
          emissive={isNight ? '#9333ea' : '#7e22ce'}
          emissiveIntensity={isNight ? 1.4 : 0.4}
          roughness={0.15}
          metalness={0.7}
        />
      </mesh>

      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[8.2, 8.6, 6]} />
        <meshBasicMaterial
          color={isNight ? '#e879f9' : '#c084fc'}
          transparent
          opacity={0.7}
        />
      </mesh>

      <group ref={crystalRingRef}>
        {crystalMonoliths.map((mono, i) => {
          const x = Math.cos(mono.angle) * mono.radius;
          const z = Math.sin(mono.angle) * mono.radius;
          return (
            <mesh key={i} position={[x, mono.y, z]} rotation={[0.2, mono.angle, 0.2]}>
              <octahedronGeometry args={[0.9, 0]} />
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

      <pointLight
        position={[0, 2, 0]}
        color={isNight ? '#d946ef' : '#c084fc'}
        distance={22}
        intensity={isNight ? 1.2 : 0.6}
      />
    </group>
  );
}

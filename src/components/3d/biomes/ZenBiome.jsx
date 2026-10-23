import React from 'react';
import * as THREE from 'three';

export function ZenBiome({ timeMode = 'night', onGroundTap, artStyle = 'lowpoly' }) {
  const isNight = timeMode === 'night';

  const zenStones = [
    { x: -5, z: -3, scale: [1.8, 1.2, 1.5], rot: 0.4 },
    { x: -4, z: -4.5, scale: [1.0, 0.8, 0.9], rot: 1.1 },
    { x: 6, z: 2, scale: [2.1, 1.5, 1.8], rot: -0.6 },
    { x: 5, z: 3.8, scale: [1.2, 0.9, 1.1], rot: 0.8 },
    { x: -2, z: 6, scale: [1.5, 1.1, 1.3], rot: 2.1 }
  ];

  return (
    <group>
      {/* 1. Main Sand Ground (Interactive) */}
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
          color={isNight ? '#334155' : '#e2d9cc'}
          roughness={0.95}
          metalness={0.0}
          flatShading={artStyle === 'retro_8bit'}
        />
      </mesh>

      {/* 2. Raked Sand Concentric Rings */}
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <ringGeometry args={[8.8, 9.2, 32]} />
        <meshBasicMaterial
          color={isNight ? '#475569' : '#d4c7b5'}
          transparent
          opacity={0.6}
        />
      </mesh>
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <ringGeometry args={[6.8, 7.2, 32]} />
        <meshBasicMaterial
          color={isNight ? '#475569' : '#d4c7b5'}
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* 3. Dark Timber Veranda Outer Ring */}
      <mesh position={[0, -0.05, 0]} receiveShadow>
        <ringGeometry args={[10.5, 11.2, 32]} />
        <meshStandardMaterial
          color={isNight ? '#1c1917' : '#573318'}
          roughness={0.7}
          metalness={0.1}
        />
      </mesh>

      {/* 4. Zen Base Island */}
      <mesh position={[0, -2.5, 0]}>
        <cylinderGeometry args={[11, 8.5, 4.6, 16]} />
        <meshStandardMaterial
          color={isNight ? '#0f172a' : '#292524'}
          roughness={0.9}
          metalness={0.1}
          flatShading={true}
        />
      </mesh>

      {/* 5. Natural Zen River Stones */}
      {zenStones.map((s, idx) => (
        <mesh
          key={idx}
          position={[s.x, s.scale[1] / 2 - 0.2, s.z]}
          rotation={[0.1, s.rot, 0.1]}
          castShadow
          receiveShadow
        >
          <dodecahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color={isNight ? '#1e293b' : '#78716c'}
            roughness={0.8}
            flatShading={true}
          />
        </mesh>
      ))}

      {/* 6. Stone Lantern Light Accent */}
      <pointLight
        position={[6, 2.5, 2]}
        color={isNight ? '#fde047' : '#ffedd5'}
        distance={18}
        intensity={isNight ? 1.0 : 0.6}
      />
    </group>
  );
}

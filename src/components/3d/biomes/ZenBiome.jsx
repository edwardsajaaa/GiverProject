import React from 'react';
import * as THREE from 'three';

export function ZenBiome({ timeMode = 'night', onGroundTap, artStyle = 'lowpoly' }) {
  const isNight = timeMode === 'night';

  const steppingStones = [
    { x: -5, z: -4, sx: 1.4, sz: 1.1 },
    { x: -3.5, z: -2.5, sx: 1.2, sz: 1.3 },
    { x: -2, z: -1, sx: 1.3, sz: 1.1 },
    { x: -0.5, z: 0.5, sx: 1.2, sz: 1.2 },
    { x: 1, z: 2, sx: 1.4, sz: 1.2 },
    { x: 2.5, z: 3.5, sx: 1.3, sz: 1.3 },
  ];

  return (
    <group>
      <mesh position={[0, -0.9, 0]} receiveShadow>
        <boxGeometry args={[23.2, 1.2, 23.2]} />
        <meshStandardMaterial
          color={isNight ? '#0c0a09' : '#292524'}
          roughness={0.9}
          metalness={0.1}
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
        <boxGeometry args={[22, 0.4, 22]} />
        <meshStandardMaterial
          color={isNight ? '#1e293b' : '#e7e2d7'}
          roughness={0.95}
          metalness={0.0}
          flatShading={artStyle === 'retro_8bit'}
        />
      </mesh>

      <mesh position={[0, 0.02, 10.5]} receiveShadow>
        <boxGeometry args={[22.4, 0.16, 1.1]} />
        <meshStandardMaterial color={isNight ? '#1c1917' : '#573318'} roughness={0.7} />
      </mesh>
      <mesh position={[0, 0.02, -10.5]} receiveShadow>
        <boxGeometry args={[22.4, 0.16, 1.1]} />
        <meshStandardMaterial color={isNight ? '#1c1917' : '#573318'} roughness={0.7} />
      </mesh>
      <mesh position={[10.5, 0.02, 0]} receiveShadow>
        <boxGeometry args={[1.1, 0.16, 20.2]} />
        <meshStandardMaterial color={isNight ? '#1c1917' : '#573318'} roughness={0.7} />
      </mesh>
      <mesh position={[-10.5, 0.02, 0]} receiveShadow>
        <boxGeometry args={[1.1, 0.16, 20.2]} />
        <meshStandardMaterial color={isNight ? '#1c1917' : '#573318'} roughness={0.7} />
      </mesh>

      {[-6, -4, -2, 0, 2, 4, 6].map((z, idx) => (
        <mesh key={idx} position={[0, 0.005, z]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[19, 0.12]} />
          <meshBasicMaterial
            color={isNight ? '#0f172a' : '#d5cebe'}
            transparent
            opacity={0.65}
          />
        </mesh>
      ))}

      {steppingStones.map((s, idx) => (
        <mesh key={idx} position={[s.x, 0.03, s.z]} rotation={[-Math.PI / 2, 0, idx * 0.2]}>
          <planeGeometry args={[s.sx, s.sz]} />
          <meshStandardMaterial
            color={isNight ? '#334155' : '#78716c'}
            roughness={0.8}
            metalness={0.1}
          />
        </mesh>
      ))}

      <group position={[7.5, 0, 7.5]}>
        <mesh position={[0, 0.4, 0]}>
          <boxGeometry args={[0.9, 0.8, 0.9]} />
          <meshStandardMaterial color="#57534e" roughness={0.9} />
        </mesh>
        <mesh position={[0, 1.1, 0]}>
          <boxGeometry args={[0.6, 0.6, 0.6]} />
          <meshStandardMaterial
            color={isNight ? '#fef08a' : '#fde047'}
            emissive={isNight ? '#ca8a04' : '#a16207'}
            emissiveIntensity={isNight ? 1.5 : 0.3}
          />
        </mesh>
        <mesh position={[0, 1.55, 0]}>
          <coneGeometry args={[0.85, 0.4, 4]} rotation={[0, Math.PI / 4, 0]} />
          <meshStandardMaterial color="#44403c" roughness={0.9} />
        </mesh>
        <pointLight
          position={[0, 1.1, 0]}
          color={isNight ? '#fde047' : '#fef08a'}
          distance={15}
          intensity={isNight ? 1.2 : 0.4}
        />
      </group>
    </group>
  );
}

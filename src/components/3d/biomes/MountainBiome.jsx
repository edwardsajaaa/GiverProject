import React, { useMemo } from 'react';
import * as THREE from 'three';

export function MountainBiome({ timeMode = 'night', onGroundTap, artStyle = 'lowpoly' }) {
  const isNight = timeMode === 'night';

  const mountainPeaks = useMemo(() => {
    const peaks = [];
    const count = 14;
    const radius = 34;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const dist = radius + (i % 3) * 6;
      const x = Math.cos(angle) * dist;
      const z = Math.sin(angle) * dist;
      const height = 22 + ((i * 7) % 16);
      const radiusBottom = 12 + ((i * 3) % 8);
      peaks.push({ x, z, height, radiusBottom, id: i });
    }
    return peaks;
  }, []);

  return (
    <group>
      <mesh position={[0, -10, 0]} receiveShadow>
        <cylinderGeometry args={[12, 34, 20, 8]} />
        <meshStandardMaterial
          color={isNight ? '#091124' : '#334155'}
          roughness={0.95}
          metalness={0.05}
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
          color={isNight ? '#1e293b' : '#e2e8f0'}
          roughness={0.9}
          metalness={0.05}
          flatShading={artStyle === 'retro_8bit'}
        />
      </mesh>

      <mesh position={[0, 0.02, 0]} receiveShadow>
        <boxGeometry args={[16, 0.05, 16]} />
        <meshStandardMaterial
          color={isNight ? '#cbd5e1' : '#ffffff'}
          roughness={0.6}
          metalness={0.05}
          flatShading={true}
        />
      </mesh>

      <mesh position={[0, -0.05, 10.6]} receiveShadow>
        <boxGeometry args={[22.6, 0.3, 1.2]} />
        <meshStandardMaterial color={isNight ? '#0f172a' : '#475569'} roughness={0.9} flatShading={true} />
      </mesh>
      <mesh position={[0, -0.05, -10.6]} receiveShadow>
        <boxGeometry args={[22.6, 0.3, 1.2]} />
        <meshStandardMaterial color={isNight ? '#0f172a' : '#475569'} roughness={0.9} flatShading={true} />
      </mesh>
      <mesh position={[10.6, -0.05, 0]} receiveShadow>
        <boxGeometry args={[1.2, 0.3, 20.2]} />
        <meshStandardMaterial color={isNight ? '#0f172a' : '#475569'} roughness={0.9} flatShading={true} />
      </mesh>
      <mesh position={[-10.6, -0.05, 0]} receiveShadow>
        <boxGeometry args={[1.2, 0.3, 20.2]} />
        <meshStandardMaterial color={isNight ? '#0f172a' : '#475569'} roughness={0.9} flatShading={true} />
      </mesh>

      {mountainPeaks.map((peak) => (
        <group key={peak.id} position={[peak.x, peak.height / 2 - 12, peak.z]}>
          <mesh castShadow={false} receiveShadow={false}>
            <coneGeometry args={[peak.radiusBottom, peak.height, 5]} />
            <meshStandardMaterial
              color={isNight ? '#091124' : '#334155'}
              roughness={0.9}
              flatShading={true}
            />
          </mesh>
          <mesh position={[0, peak.height * 0.28, 0]}>
            <coneGeometry args={[peak.radiusBottom * 0.45, peak.height * 0.45, 5]} />
            <meshStandardMaterial
              color={isNight ? '#475569' : '#f8fafc'}
              roughness={0.5}
              flatShading={true}
            />
          </mesh>
        </group>
      ))}

      <mesh position={[0, -14, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[160, 160]} />
        <meshStandardMaterial
          color={isNight ? '#0f172a' : '#f1f5f9'}
          transparent
          opacity={isNight ? 0.7 : 0.85}
          roughness={1}
        />
      </mesh>
    </group>
  );
}
